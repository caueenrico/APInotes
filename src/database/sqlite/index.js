const sqlite3 = require('sqlite3') //drive de fato
const sqlite = require('sqlite') //uso para me conectar
const path = require('path')

async function sqliteConnections(){
  const database = await sqlite.open({
    filename: path.resolve(__dirname, "..", "database.db"),
    driver : sqlite3.Database
  })

  return database;
  
}

module.exports = sqliteConnections;

//SGBD - 