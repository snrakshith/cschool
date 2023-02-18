const Misc = require("../models/Misc.model");

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
    const miscData = await Misc.create({ school, sdps });
    const data = await miscData.save();
    res.status(200).json({
      status: true,
      data,
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
    console.log("body..", req.body.school_id);

    // const getSchoolMisc = await Misc.findById({
    //   _id: req.body._id,
    // }).populate({
    //   path: "school",
    //   select: "_id",
    // });

    // if (!getSchoolMisc) {
    //   return res.status(400).json({
    //     status: false,
    //     message: `${req.body.school_id} with id is not found`,
    //   });
    // }

    const getSchoolMisc = await Misc.find({
      school: req.body.school_id,
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
