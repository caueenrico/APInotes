const AppError = require('../utils/AppError')
const { hash, compare } = require("bcryptjs")

const sqliteConnections = require('../database/sqlite');

class UsersControllers {
  async create(request,response) {
    const { name, email, password} = request.body;

    const database = await sqliteConnections();

    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)",[email])

    if(checkUserExists){
      throw new AppError('usuario já exite')
    }

    const hashedPassword = await hash(password, 8) //criptografando as senhas dos usuarios

    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    )
    
    response.status(200).json()
  }

  async update(request, response){
    const {name, email, password, oldPassword} = request.body
    //const {id} = request.params antes
    const user_id = request.user.id
  


    const database = await sqliteConnections()
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])

    if(!user){
      throw new AppError('usuario não existe')
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])
    console.table(userWithUpdatedEmail)

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
     throw new AppError("Este e-mail já está em uso.")
    }

    if(password && !oldPassword){
      throw new AppError('voce precisa informar a senha antiga')
    }

    if(password && oldPassword){
      const checkOldPassword = await compare(oldPassword, user.password);
      

      if(!checkOldPassword){
        throw new AppError('senha antiga invalida')
      }

      user.password = await hash(password, 8)
    }

    user.name = name ?? user.name
    user.email = email ?? user.name
   
    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`, 
      [user.name, user.email, user.password, user_id]
    )

    return response.json()
  }

  
}

module.exports = UsersControllers;

/**
 * -> no maximo um controller deve conter 5 funções
 * index - GET para listar varios usuarios
 * show - GET para exibir um registro especifico
 * create - POST oara criar um registro
 * update - PUT para atualizar um registro
 * delete - DELETE para remover um registro
 */