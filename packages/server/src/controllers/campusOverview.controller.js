const CampusOverview = require("../models/CampusOverview.model");

exports.createCampusOverview = async (req, res) => {
  try {
    const campusOverviewData = await CampusOverview.create(req.body);
    const data = await campusOverviewData.save();
    res.status(200).json({
      status: false,
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.getCampusOverview = async (req, res) => {
  try {
    const campusOverview = await CampusOverview.find().populate({
      path: "school",
      select: "_id",
    });
    res.status(200).json({
      status: true,
      data: campusOverview,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
