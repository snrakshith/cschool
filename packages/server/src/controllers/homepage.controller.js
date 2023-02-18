const HomePage = require("../models/HomePage.model");

exports.createFeatures = async (req, res, next) => {
  try {
    const { name, description, card_type } = req.body;

    const missingList = [];

    if (!name) {
      missingList.push("name");
    }
    if (!description) {
      missingList.push("description");
    }
    if (!card_type) {
      missingList.push("card_type");
    }

    if (missingList.length > 0) {
      return res
        .status(400)
        .json({ status: false, message: `${missingList} is missing` });
    }

    const homepageData = {
      name,
      description,
      card_type,
    };

    const data = await HomePage.create(homepageData);
    await data.save();
    return res.status(201).json({
      status: true,
      message: "Successfully created",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.getAllFeatures = async (req, res, next) => {
  try {
    const homepage = await HomePage.find().sort({ createdAt: -1 });
    const totalItems = await HomePage.countDocuments();
    return res?.status(200).json({
      total: totalItems,
      data: homepage,
      status: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};
