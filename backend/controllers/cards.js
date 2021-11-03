const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');

const getCards = (req, res, next) => Card.find({})
  .populate(['owner', 'likes'])
  .then((cards) => res.status(200).send(cards))
  .catch(next);

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  return Card.defineOwnerAndDelete(cardId, req.user._id)
    .then((card) => {
      if (card) return res.status(200).send(card);
      throw new NotFoundError('Карточка не найдена');
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const cardInfo = {
    name,
    link,
    owner: {
      _id: req.user._id,
    },
  };
  return Card.create(cardInfo)
    .then((card) => res.status(200).send(card))
    .catch(next);
};

const setCardLike = (req, res, next) => {
  const { cardId } = req.params;
  return Card.findByIdAndUpdate(
    cardId,
    {
      $addToSet: { likes: req.user._id },
    },
    {
      new: true,
    },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card) return res.status(200).send(card);
      throw new NotFoundError('Карточка не найдена');
    })
    .catch(next);
};

const deleteCardLike = (req, res, next) => {
  const { cardId } = req.params;
  return Card.findByIdAndUpdate(
    cardId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card) return res.status(200).send(card);
      throw new NotFoundError('Карточка не найдена');
    })
    .catch(next);
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  setCardLike,
  deleteCardLike,
};
