// import  dotenv from "dotenv";
// import path from "path";

const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(`./src/environments/.env.${process.env.NODE_ENV}`),
});

// export const options = {
module.exports = options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cschool Backend API",
      version: "1.0.0",
      description: "Cschool Backend API Repository Swagger Documentation.",
    },
    servers: [
      {
        // url: process.env.BASE_URL,
        url: "http://localhost:5000/",
      },
    ],
  },
  // apis: ["../routes/school.routes.js"],
  apis: ["../server.js"],

  // apis: [path.join(process.cwd(), `/routes/school.routes.js`)],
};
