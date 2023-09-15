const { Router } = require('express');
const UsersControllers = require('../controllers/UsersControllers');

const usersRoutes = Router();
const userControllers = new UsersControllers()

usersRoutes.post("/", userControllers.create)
usersRoutes.put("/:id", userControllers.update)

module.exports = usersRoutes;