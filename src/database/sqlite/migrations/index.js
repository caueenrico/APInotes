const sqliteConnections = require('../../sqlite')
const createUsers = require('./createUsers')

async function migrationsRun() {
  const schemas = [ 
    createUsers
  ].join('')

  sqliteConnections()
    .then(db => db.exec(schemas))
    .catch(e => console.log(e))
}

module.exports = migrationsRun;