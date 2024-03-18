const Brochure = require("../../models/glance-view/others/Brochure.model");

exports.createBrochure = async (req, res, next) => {
  try {
    const { topic, published_date, link, school } = req.body;

    const missingList = [];

    if (!topic) {
      missingList.push("topic");
    }

    if (!published_date) {
      missingList.push("published_date");
    }

    if (missingList.length > 0) {
      return res
        .status(400)
        .json({ status: false, message: `${missingList} is missing` });
    }

    const brochure = new Brochure({
      topic,
      published_date,
      link,
      school,
    });

    // const newBrochure = await brochure.crea();
    const newBrochure = await brochure.save();
    res.status(201).json({
      status: true,
      data: {
        newBrochure,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: true,
      message: error.message,
    });
  }
};

exports.getAllBrochure = async (req, res, next) => {
  try {
    const brochure = await Brochure.find().populate("school");
    const totalBrochure = await Brochure.count();
    res.status(200).json({
      total_brochure: totalBrochure,
      data: brochure,
    });
  } catch (error) {
    res.status(500).json({
      status: true,
      message: error.message,
    });
  }
};

exports.getBrochureById = async (req, res, next) => {
  try {
    const { brochure_id } = req.body;
    const brochure = await Brochure.findById({ _id: brochure_id });

    if (!brochure) {
      return res.status(500).json({
        status: true,
        message: `Brochure ${brochure_id} with this id is not found`,
      });
    }

    // const brochure = await Brochure.findById({ _id: brochure_id }).select("");
    // const brochure = await Brochure.findById({ _id: brochure_id }).populate({
    //   path: "school",
    // });
    // const brochure = await Brochure.findById({ _id: brochure_id }).populate({
    //   path: "school",
    //   select: "phone_number -moto",
    // });
    res.status(200).json({
      data: brochure,
    });
  } catch (error) {
    res.status(500).json({
      status: true,
      message: error.message,
    });
  }
};

exports.getBrochureBySchoolId = async (req, res, next) => {
  try {
    const { school_id } = req.body;

    // Finds all the records
    // const brochure = await Brochure.find({ school: school_id });

    // Finds all the records
    const brochure = await Brochure.findOne({ school: school_id });

    // const brochure = await Brochure.findOne({ topic: req.body.topic });

    // Finds a records by Id
    // const brochure = await Brochure.findById({ school: school_id });

    res.status(200).json({
      data: brochure,
    });
  } catch (error) {
    res.status(500).json({
      status: true,
      message: error.message,
    });
  }
};

exports.updateBrochureById = async (req, res, next) => {
  try {
    const { brochure_id, published_date, link, topic } = req.body;
    const checkbrochure = await Brochure.findById({ _id: brochure_id });

    if (!checkbrochure) {
      return res.status(500).json({
        status: true,
        message: `Brochure ${brochure_id} with this id is not found`,
      });
    }

    // Finds a records by Id
    const filterFields = { _id: brochure_id };
    const updateFields = { published_date, link, topic };
    const options = { new: true };

    const brochure = await Brochure.findByIdAndUpdate(
      filterFields,
      updateFields,
      options
    );

    res.status(200).json({
      data: brochure,
    });
  } catch (error) {
    res.status(500).json({
      status: true,
      message: error.message,
    });
  }
};
