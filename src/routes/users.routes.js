const { Router } = require('express');

const UsersControllers = require('../controllers/UsersControllers');
const UserAvatarController = require('../controllers/UserAvatarController')
const ensureAuthentication = require('../middleware/ensureAuthentication');

const multer = require('multer');
const uploadConfig = require('../configs/upload')

const usersRoutes = Router();

const userControllers = new UsersControllers()
const userAvatarController = new UserAvatarController()
const upload = multer(uploadConfig.MULTER)


usersRoutes.post("/", userControllers.create)
// antes eu buscava pelo o ID do usuario agora estou fazendo pelo token 
// usersRoutes.put("/:id", ensureAuthentication, userControllers.update)
usersRoutes.put("/", ensureAuthentication, userControllers.update)
usersRoutes.patch('/avatar', ensureAuthentication, upload.single("avatar"), userAvatarController.update)


module.exports = usersRoutes;