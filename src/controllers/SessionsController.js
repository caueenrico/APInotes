const { compare } = require('bcryptjs')
const knex = require('../database/knex')
const AppError = require('../utils/AppError')

//jwt
const authConfig = require('../configs/auth')
const { sign } = require('jsonwebtoken')

class SessionsController {
  async create (request, response ){
    const {email, password} = request.body

    const user = await knex("users").where({ email }).first()
    

    if(!user){
      throw new AppError('E-mail e/ou senha incorreta', 401)

    }

    const passwordCompair = await compare(password, user.password)

    if(!passwordCompair){
      throw new AppError('senha e/ou e-mail incorreta', 401)
    }

    //jwt
    const {secret, expiresIn} = authConfig.jwt
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    return response.json({user, token})
  }
}

module.exports = SessionsController