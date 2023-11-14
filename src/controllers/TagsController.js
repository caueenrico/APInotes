const knex = require('../database/knex')

class TagsController {
  async list(request, response) {
    // const {user_id} = request.params
    const user_id = request.user.id

    const tagList = await knex("tags")
    .where({user_id})
    .groupBy("name")

    return response.json(tagList)
  }
}

module.exports = TagsController