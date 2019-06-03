const db = require('../data/dbConfig');

module.exports = {
  insert,
  findById
};

function insert(action) {
  return db('action').insert(action);
}

function findById(id){
    return db('action')
    .where({ project_id : id})
}
