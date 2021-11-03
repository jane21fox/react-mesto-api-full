const SALT_ROUND = 10;
const { JWT_SECRET = 'dev-key' } = process.env;

module.exports = {
  SALT_ROUND,
  JWT_SECRET,
};
