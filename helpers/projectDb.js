const db = require('../data/dbConfig')

module.exports = {
    get,
    findById,
    insert,
    remove
}

function get() {
    return db('project')
}

function findById(id) {
    return db('project')
    .where({id})
    .first()
}

function insert(project) {
    return db('project')
    .insert(project)
    .then(() => {
        return project
    })
}

function remove(id) {
    return db('project')
    .where({id})
    .del()
}