/** @format */

const router = require('express').Router();
const authModel = require('./auth-model');

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await authModel.findBy({ username }).first();

    if (user) {
      return res.status(409).json({ message: 'username is taken' });
    }
    const userAdd = {
      username: username,
      password: password,
    };
    res.status(201).json(userAdd);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'server error logging in' });
  }
});

router.post('/login', async (req, res) => {});

module.exports = router;
