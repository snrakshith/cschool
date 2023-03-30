const SummerCamp = require("./SummerCamp.model");

exports.getAllSummerCamp = async (req, res, next) => {
  try {
    const data = await SummerCamp.find();
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

exports.createSummerCamp = async (req, res, next) => {
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


    const SummerCampData = {

    };
    const data = await SummerCamp.create(SummerCampData);
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
