const router = require('express').Router();
const cardsRouter = require('./cards');
const usersRouter = require('./users');
const NotFoundError = require('../errors/not-found-err');

router.use('/cards', cardsRouter);
router.use('/users', usersRouter);
router.use('*', (req, res, next) => {
  const err = new NotFoundError('Метод не найден');
  next(err);
});

module.exports = router;
