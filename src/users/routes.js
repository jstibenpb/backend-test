const express = require('express');

const controller = require('./controller/index');

const router = express.Router();

router.post('/api/v1/signup', (req, res) => {
  controller.signUp(res, req.body);
});

router.post('/api/v1/login', (req, res) => {
  controller.logIn(res, req.body);
});

module.exports = router;
