const bcrypt = require("bcrypt");
const User = require("../models/User");

const createNewUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json({
      status: false,
      message: "Username is required",
    });
  }
  const existingUser = await User.findOne({ username });
  // console.log("existingUser", existingUser);

  if (existingUser) {
    return res
      .status(401)
      .json({ status: false, message: "User already exist" });
  }

  if (!password) {
    return res.status(400).json({
      status: false,
      message: "password is required",
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      username,
      password: hashedPassword,
    };
    const UserData = await User.create(newUser);
    await UserData.save();
    return res.status(201).json({
      status: true,
      data: UserData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    // .select({ name: 1, tags: 1 })

    const allUsers = await User.find()
      .limit(10)
      .sort({ username: 1 })
      .select({ username: 1 }); // 1 means include 0 means exclude

    const totalUsers = await User.count();

    // "/.*Mosh.*/"

    const findUser = await User.find({ username: /^r/i });
    // console.log(findUser);

    return res.status(200).json({
      status: true,
      results: totalUsers,
      // data: allUsers,
      data: findUser,
    });
  } catch (error) {
    console.error(error);
    await res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const updateUsername = () => {};
module.exports = {
  createNewUser,
  getAllUsers,
};
