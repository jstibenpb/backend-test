const express = require('express');

const controller = require('./controller/index');

const router = express.Router();

router.get('/api/v1/find', (req, res) => {
  controller.findPlaces(res, req.query, req.requestInfo, req.user);
});

router.get('/api/v1/list', (req, res) => {
  controller.listTransactions(res, req.query, req.requestInfo, req.user);
});

module.exports = router;
