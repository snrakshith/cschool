const CampusOverview = require("../models/CampusOverview.model");
const School = require("../models/School.model");

exports.createCampusOverview = async (req, res) => {
  try {
    const schoolId = await School.findById({ _id: req.body.school_id });

    if (!schoolId) {
      return res.status(500).json({
        status: false,
        message: `School with id ${req.body.school_id} is not found`,
      });
    }

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
    const schoolId = await School.findById({ _id: req.body.school_id });

    if (!schoolId) {
      return res.status(500).json({
        status: false,
        message: `School with id ${req.body.school_id} is not found`,
      });
    }

    const campusOverview = await CampusOverview.find({
      school: schoolId,
    }).populate({
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
