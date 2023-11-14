const { Router } = require('express');
const NotesControllers = require('../controllers/NotesController');
const ensureAuthentication = require('../middleware/ensureAuthentication');

const notesRoutes = Router();
const notesControllers = new NotesControllers()

//nesse caso eu estou passando o middleware para todas as rotas possiveis
notesRoutes.use(ensureAuthentication)

notesRoutes.get("/", notesControllers.index)
notesRoutes.post("/", notesControllers.create)
notesRoutes.get("/:id", notesControllers.show)
notesRoutes.delete("/:id", notesControllers.delete)

module.exports = notesRoutes;