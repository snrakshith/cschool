const JWT = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: "30s",
        issuer: "cschool",
        audience: userId,
      };

      JWT.sign(payload, secret, options, (error, token) => {
        if (error) {
          console.log(error.message);
          return reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },

  // middleware
  verifyAccessToken: (req, res, next) => {
    // if (!req.headers["authorization"]) throw createError.Unauthorized();
    if (!req.headers["authorization"]) return next(createError.Unauthorized());

    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
      if (error) {
        return next(createError.Unauthorized());

        // const message =
        //   error.name === "JsonWebTokenError" ? "Unauthorized" : error.message;
        // return next(message);
      }
      req.payload = payload;
      next();
    });
  },
};
