const { Router } = require('express');
const TagsControllers = require('../controllers/TagsController');
const ensureAuthentication = require('../middleware/ensureAuthentication');

const tagsRoutes = Router();
const tagsControllers = new TagsControllers()

tagsRoutes.get("/", ensureAuthentication, tagsControllers.list)


module.exports = tagsRoutes;