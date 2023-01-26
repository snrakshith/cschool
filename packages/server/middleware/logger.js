// Middleware goes in here..

const logger = async (req, res, next) => {
  console.log(`Executed middleware`);
  next();
};
module.exports = logger;
