/** @format */

const router = require('express').Router();
const authModel = require('./auth-model');
const bcrypt = require('bcryptjs');
const secret = require('../Secret/secret');
const jwt = require('jsonwebtoken');

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
    const userLogin = await authModel.add(userAdd);
    res.status(201).json(userLogin);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'server error logging in' });
  }
});

router.post('/login', async (req, res) => {
  const authErr = { message: 'Invalid Credentials' };
  const { username, password } = req.body;
  try {
    const user = await authModel.findBy({ username }).first();

    if (!user) {
      console.log('not pass user');
      res.status(401).json(authErr);
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      console.log('not pass password check');
      return res.status(401).json(authErr);
    }

    const payload = {
      userId: user.id,
      username: user.username,
    };
    const token = jwt.sign(payload, secret.jwtSecret);

    res.cookie('token', token);
    res.json({
      message: `Greetings ${user.username}`,
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'server error logging in' });
  }
});

module.exports = router;
