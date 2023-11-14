const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

function ensureAuthentication(request, response, next) {
  const authHeader = request.headers.authorization; //aqui vai estar o tokem do usuario

  if (!authHeader) {
    throw new AppError("JWT token não informado", 401);
  }

  const [, token] = authHeader.split(" "); //geralmento o tokem vem "Bearer xxxxxxx" o que estou fazendo é elminando o "Bare" e armazenando apenas os valores do token na variavel [, token]

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret); //verificando se é um jwt valido | referente ao "{sub: user_id}" eu apenas dei um apelido para não chamar de sub e sim de user_id

    request.user = {
      id: Number(user_id),
    };
    
    return next();
  } catch {
    throw new AppError("JWT token Inválido", 401);
  }
}

module.exports = ensureAuthentication;
