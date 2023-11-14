
require("express-async-errors")
require("dotenv/config")

const migrationsRun = require('./database/sqlite/migrations')
const AppError = require('./utils/AppError')
const uploadConfig = require('./configs/upload')

const cors = require('cors')
const express = require("express")
const routes = require("./routes")

migrationsRun()

const app = express()
app.use(cors())
app.use(express.json()) //aqui estou informando qual em qual formato vou receber as informações

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER)) //para que a imagem aparece quando chamar essa rota

app.use(routes)

app.use((error, request, response, next) => {
  if(error instanceof AppError){
    response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  return response.status(500).json({
    status: 'error',
    message: "Internal Server Error"
  })
})

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))