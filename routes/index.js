const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const redis = require('../conf/redis');

router.get('/get/:key', async function(req, res, next) {
  const value = await redis.get(req.params.key);

  if (value == null) {
    return next(createError(404, `Cannot Find ${req.params.key}`));
  }

  res.send(`${req.params.key}: ${value}`);
});

router.post('/set', async function(req, res, next) {
  await redis.set(req.body.key, req.body.value);

  res.send('success');
});

router.delete('/delete', async function(req, res, next) {
  await redis.del(req.body.key);

  res.send('success');
});

router.put('/rename', async function(req, res, next) {
  await redis.rename(req.body.old, req.body.new);

  res.send('success');
});

module.exports = router;
