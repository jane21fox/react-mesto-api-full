const handleErrors = (err, req, res, next) => {
  const { statusCode = 500, message, name } = err;
  if (name === 'ValidationError') {
    res.status(400)
      .send({
        // message: Object.values(err.errors).map((key) => err.errors[key].message).join(),
        message,
      });
  } else {
    res.status(statusCode)
      .send({
        message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
      });
  }
};

module.exports = {
  handleErrors,
};
