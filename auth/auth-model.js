/** @format */

const db = require('../database/dbConfig');
const bcrypt = require('bcryptjs');

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
  user.password = await bcrypt.hash(user.password, 10);
  const [id] = await db('users').insert(user);

  return findById(id);
}
