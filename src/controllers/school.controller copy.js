const School = require("../models/School.model");
const { autoSchoolId } = require("../utils/auto_generated");
// const geocoder = require("../utils/geocoder");

// get list of active schools

// basic info
// courses_offered

/**
 *  @access Public
 *  @description details by school id
 */

// getAllSchools

// /api/v1/school/all
exports.getAllSchools = async (req, res, next) => {
  try {
    const allSchools = await School.find();
    const totalSchools = await School.count();
    return res?.status(200).json({
      status: true,
      data: allSchools,
      totalSchools,
    });
  } catch (error) {
    console.error(error);
    return res?.status(404).json({
      message: "Failed to get data",
      status: false,
    });
  }
};
exports.getAllAuthors = async (req, res, next) => {
  const { page_limit, page } = req.query;
  try {
    console.log(req.query);
    const authors = await Author.find()
      .skip(page * page_limit)
      .limit(page_limit)
      .sort({ author_name: -1 });
    const totalAuthors = await Author.count();
    return res
      .status(200)
      .json({ status: true, results: totalAuthors, data: authors });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.onboardNewSchool = async (req, res, next) => {
  const {
    name,
    email,
    phone_number,
    languages,
    teacher_strength,
    number_of_students,
    moto,
    code,
    website,
  } = req.body;
  // const { logo } = req.file;
  // const imageMimetype = req.file.mimetype.split("/");
  // const extenstion = "." + imageMimetype[1];

  // if (!name) {
  //   return res
  //     .status(400)
  //     .json({ status: false, message: "School name is missing" });
  // }

  // if (!email) {
  //   return res.status(400).json({ status: false, message: "email is missing" });
  // }

  const missingList = [];

  if (!name) {
    missingList.push("name");
  }
  if (!phone_number) {
    missingList.push("phone_number");
  }
  if (!email) {
    missingList.push("email");
  }
  if (missingList.length > 0) {
    return res
      .status(400)
      .json({ status: false, message: `${missingList} is missing` });
  }

  // const duplicatePhoneNumber = await School.findOne({
  //   phone_number,
  // });

  // if (duplicatePhoneNumber) {
  //   res.status(400).json({
  //     status: false,
  //     message: "E11000 duplicate key Phone number already present",
  //   });
  // }

  try {
    // const duplicateValues = await School.findOne({
    //   // phone_number,
    //   // email,
    //   name,
    // });
    // if (duplicateValues) {
    //   return res.status(400).json({
    //     status: false,
    //     message: `E11000 duplicate key present in record`,
    //   });
    // }

    const facilities = [];
    const facility = [];

    if (req.body.facilities != null) {
      const facilitiesFields = req.body.facilities.split(",");
      for (const row of facilitiesFields) {
        facilities.push(row);
      }
    }
    if (req.body.facility != null) {
      const facilityFields = req.body.facility.split(",");
      for (const row of facilityFields) {
        const payload = { facilityCode: row };
        facility.push(payload);
      }
    }
    // if (req.body.specialization != null) {
    //   const specializationFields = req.body.specialization.split(",");
    //   for (const row of specializationFields) {
    //     // console.log(row);
    //     const payload = { specializationName: row, languageName: row };
    //     specialization.push(payload);
    //   }
    // }
    const specialization = [];
    console.log("specializationFields", req?.body);
    if (req.body.specialization) {
      if (req.body.specialization?.length > 0) {
        req.body.specialization?.map((item) => {
          specialization.push({
            specializationName: item.specializationName,
            languageName: item.languageName,
          });
        });
      }
    }

    const criterias = [];
    if (req.body.criterias) {
      if (req.body.criterias.length > 0) {
        req.body.criterias.map((eachCriteria) => {
          criterias.push({
            criteriaName: eachCriteria.criteriaName,
          });
        });
      }
    }

    const number = [];

    if (req.body?.number !== null) {
      const numbers = req.body?.number.split(",");
      for (let item of numbers) {
        number.push(item);
      }
    }

    const labs = [];

    if (req.body?.labs !== null) {
      const labData = req.body?.labs?.split(",");
      for (let item of labData) {
        const payload = { lab_name: item };
        labs.push(payload);
      }
    }

    const points = {
      lat: req.body.lat ? req.body.lat : "",
      long: req.body.long ? req.body.long : "",
    };
    const schoolData = {
      name,
      code,
      email,
      website,
      phone_number,
      languages,
      specialization,
      facility,
      facilities,
      number,
      teacher_strength,
      number_of_students,
      moto,
      labs,
      criterias,
      "courses_offered.board": req.body.board ? req.body.board : "",
      "courses_offered.eligibility_critery": req.body.eligibility_critery
        ? req.body.eligibility_critery
        : "",
      "courses_offered.class_from": req.body.class_from
        ? req.body.class_from
        : "",

      // Check
      // points,
      // "school_location.lat": req.body.lat ? req.body.lat : "",
      // "school_location.long": req.body.long ? req.body.long : "",
      // logo,
      // logo: `${req.file.filename}${extenstion}`,
      // logo: req.file.filename + "." + imageMimetype[1],
      // logo: req?.file?.filename !== "undefined" ? req?.file?.filename : "",
    };
    // console.log("req.file", req.file);
    // console.log("test", `${req.file.filename}${extenstion}`);
    // console.log(req.file.filename + "." + imageMimetype[1]);

    // const data = await School.create(req.body);

    const data = await School.create(schoolData);
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

// @desc      Get bootcamps within a radius
// @route     GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access    Private
exports.getSchoolsInRadius = async (req, res, next) => {
  const { pincode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(pincode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;

  const schools = await School.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    success: true,
    count: schools.length,
    data: schools,
  });
};
