const mongoose = require('mongoose');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/gm.test(link);
      },
      message: 'Ссылка не соответствует шаблону',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

cardSchema.statics.defineOwnerAndDelete = function (cardId, userId) {
  return this.findById(cardId)
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (card.owner._id.valueOf() !== userId) {
        throw new ForbiddenError('Не достаточно прав для удаления карточки');
      }
      return this.findByIdAndRemove(cardId).populate(['owner', 'likes']);
    });
};

module.exports = mongoose.model('card', cardSchema);
