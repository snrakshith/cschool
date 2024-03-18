const Misc = require("../models/Misc.model");
const School = require("../models/School.model");

exports.createMisc = async (req, res) => {
  try {
    const { school } = req.body;
    const sdps = [];
    if (req.body.sdps) {
      if (req.body.sdps.length > 0) {
        req.body.sdps.map((eachSDP) => {
          sdps.push({
            name: eachSDP.name,
            availablity_status: eachSDP.availablity_status,
          });
        });
      }
    }
    const student_scholarship_programs = [];
    if (req.body.student_scholarship_programs) {
      if (req.body.student_scholarship_programs.length > 0) {
        req.body.student_scholarship_programs.map((eachSDP) => {
          student_scholarship_programs.push({
            name: eachSDP.name,
            availablity_status: eachSDP.availablity_status,
          });
        });
      }
    }
    const events = [];
    if (req.body.events) {
      if (req.body.events.length > 0) {
        req.body.events.map((eachEvent) => {
          events.push({
            name: eachEvent.name,
            availablity_status: eachEvent.availablity_status,
          });
        });
      }
    }
    const school_vas = [];
    if (req.body.school_vas) {
      if (req.body.school_vas.length > 0) {
        req.body.school_vas.map((eachVAS) => {
          school_vas.push({
            name: eachVAS.name,
            availablity_status: eachVAS.availablity_status,
          });
        });
      }
    }

    // To add obj into an array

    await Misc.findOneAndUpdate(
      { school },
      // { $push: { images: images, docs } },
      {
        $addToSet: {
          sdps,
          student_scholarship_programs,
          events,
          school_value_added_services: school_vas,
        },
      },
      { upsert: true }
    );
    res.status(200).json({
      status: true,
      message: "Successfully added ..",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.getMisc = async (req, res) => {
  try {
    const checkSchoolId = await School.findById({
      _id: req.body.school_id,
    });

    if (!checkSchoolId) {
      return res.status(400).json({
        status: false,
        message: `School with id ${req.body.school_id} is not found`,
      });
    }

    const getSchoolMisc = await Misc.find({
      // school: req.body.school_id,
      school: checkSchoolId,
    });

    res.status(200).json({
      status: true,
      data: getSchoolMisc,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.getMiscById = async (req, res) => {
  try {
    const getSchoolMisc = await Misc.findById({
      _id: req.body._id,
    }).populate({
      path: "school",
      select: "_id",
    });

    if (!getSchoolMisc) {
      return res.status(400).json({
        status: false,
        message: `${req.body.school_id} with id is not found`,
      });
    }

    res.status(200).json({
      status: true,
      data: getSchoolMisc,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
