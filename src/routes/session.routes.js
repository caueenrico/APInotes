const { Router } = require("express");
const SessionsController = require('../controllers/SessionsController')

const sessionsRoutes = Router()
const sessionsControler = new SessionsController()

sessionsRoutes.post("/",sessionsControler.create)

module.exports = sessionsRoutes