// A Middleware Function takes in 3 parameters

const logger = (res, req, next) => {
  // Core Logic goes in here..
  console.log("Logger..");
  next();
};

module.exports = logger;
