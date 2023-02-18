const User = require("../models/User.model");
const createError = require("http-errors");
const { authSchema } = require("../utils/validations_schema");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");

exports.registerUser = async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body);

    const userExist = await User.findOne({ email: result.email });
    if (userExist)
      throw createError.Conflict(`${result.email} is already been registered`);

    // const user = new User({ email, password });
    const user = new User(result);
    const savedUser = await user.save();

    // Generate the new Access and Refresh token return it back to the user
    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);

    res.status(201).json({ data: savedUser, accessToken, refreshToken });
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
    return res.status(422).json({ status: false, message: error.message });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body);
    const user = await User.findOne({ email: result.email });

    if (!user) throw createError.NotFound("User not registered");

    const isMatch = await user.isValidPassword(result.password);

    if (!isMatch) throw createError.Unauthorized("Username/password not valid");

    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);
    return res.status(201).json({
      status: true,
      message: "logged in..",
      data: { accessToken, refreshToken, user },
    });
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    console.log(error);
    next(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    // check for refresh token in the body
    const { refreshToken } = req.body;
    if (!refreshToken) throw createError.BadRequest();

    const userId = await verifyRefreshToken(refreshToken);

    // Generate the new Access and Refresh token return it back to the user
    const accessToken = await signAccessToken(userId);
    const refToken = await signRefreshToken(userId);

    return res.status(201).json({
      status: true,
      data: {
        accessToken,
        refToken,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.logoutUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ status: false, message: "email is missing" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ status: false, message: "School name is missing" });
  }

  try {
    console.log(req.body);

    const data = await School.create(schoolData);
    console.log(data);
    await data.save();
    return res.status(201).json({
      status: false,
      message: "Successfully Onboarded",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};
