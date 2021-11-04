const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SALT_ROUND, JWT_SECRET } = require('../configs/index');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const NotValidAuth = require('../errors/not-valid-auth');
const AlreadyExistsErr = require('../errors/already-exists-err');

const getUsers = (req, res, next) => User.find({})
  .then((users) => res.status(200).send(users))
  .catch(next);

const getUser = (req, res, next) => {
  const { id } = req.params;
  return User.findById(id)
    .then((user) => {
      if (user) return res.status(200).send(user);
      throw new NotFoundError('Пользователь не найден');
    })
    .catch(next);
};

const getActiveUser = (req, res, next) => {
  const { _id } = req.user;
  return User.findById(_id)
    .then((user) => {
      if (user) return res.status(200).send(user);
      throw new NotFoundError('Пользователь не найден');
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  if (!email || !password) {
    throw new NotValidAuth('Невалидные данные');
  }

  User.findOne({ email })
    .then((user) => {
      if (user) throw new AlreadyExistsErr('Такой email уже зарегистрирован');
      return bcrypt.hash(password, SALT_ROUND);
    })
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) return res.status(200).send(user);
      throw new NotFoundError('Пользователь не найден');
    })
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) return res.status(200).send(user);
      throw new NotFoundError('Пользователь не найден');
    })
    .catch(next);
};

const login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;

  if (!email || !password) throw new NotValidAuth('Невалидные данные при авторизации');

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) throw new NotValidAuth('Невалидные данные при авторизации');
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new NotValidAuth('Невалидные данные при авторизации');
          }
          const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
          res.send({ token  + ' ' + JWT_SECRET});
          // res.cookie('jwt', token, {
          //   maxAge: 3600000 * 24 * 7,
          //   httpOnly: true,
          // }).send({ message: 'Ответ об успешном логин ' + token });
        });
    })
    .then((user) => res.status(201).send(user))
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  getActiveUser,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
};
