/** @format */

const db = require('../database/dbConfig');

module.exports = {
  findBy,
  findById,
  add,
};

function findBy(filter) {
  return db('users')
    .where(filter)
    .select();
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

async function add(user) {
  const [id] = await db('users').insert(user);

  return findById(id);
}
