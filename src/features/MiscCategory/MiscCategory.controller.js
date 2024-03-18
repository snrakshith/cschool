const MiscCategory = require("./MiscCategory.model");

exports.getAllMiscCategory = async (req, res, next) => {
  try {
    const data = await MiscCategory.find();
    return res.status(201).json({
      status: true,
      data,
    });

  } catch (error) {
    console.error(error);
    return res?.status(404).json({
      message: "Failed to get data",
      status: false,
    });
  }
};

exports.createMiscCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    const missingList = [] ;

    if (!name) {
      missingList.push('name')
    }

    if (missingList.length > 0) {
      return res
        .status(400)
        .json({ status: false, message: `${missingList} is missing` });
    }


    const MiscCategoryData = {

    };
    const data = await MiscCategory.create(MiscCategoryData);
    await data.save();
    return res.status(201).json({
      status: true,
      message: "Successfully Onboarded",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};
