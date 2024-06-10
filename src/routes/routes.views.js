const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('index');
});

router.get('/home', async (req, res) => {
  res.render('home');
});

router.get('/usersList', async (req, res) => {
    res.render('usersList');
});

module.exports = router;