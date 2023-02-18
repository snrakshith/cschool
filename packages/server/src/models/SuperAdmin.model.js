const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const SuperAdminSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      required: true,
      default: "STARTER",
      enum: ["STARTER", "PRO", "ENTERPRISE"],
    },
  },
  {
    timestamps: true,
  }
);

SuperAdminSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

SuperAdminSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoose.model("SuperAdmin", SuperAdminSchema);
