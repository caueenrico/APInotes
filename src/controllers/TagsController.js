const knex = require('../database/knex')

class TagsController {
  async list(request, response) {
    const {user_id} = request.params

    const tagList = await knex("tags")
    .where({user_id})

    return response.json(tagList)
  }
}

module.exports = TagsController