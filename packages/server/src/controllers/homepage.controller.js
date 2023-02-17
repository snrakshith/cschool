const HomePage = require("../models/HomePage.model");

// /get-offerings
exports.getAllOfferings = async (req, res, next) => {
  try {
  } catch (error) {
    console.error(error);
    return res?.status(404).json({
      message: "Failed to get data",
      status: false,
    });
  }
};

// /create-offerings
exports.createNewOfferings = async (req, res, next) => {
  const { name, email, phone_number, languages } = req.body;
  // const { logo } = req.file;
  // const imageMimetype = req.file.mimetype.split("/");
  // const extenstion = "." + imageMimetype[1];

  if (!name) {
    return res
      .status(400)
      .json({ status: false, message: "School name is missing" });
  }

  if (!email) {
    return res.status(400).json({ status: false, message: "email is missing" });
  }
  try {
    console.log(req.body);
    const facilities = [];
    const facility = [];
    const specialization = [];
    if (req.body.facilities != null) {
      const facilitiesFields = req.body.facilities.split(",");
      for (const row of facilitiesFields) {
        // const items = { facilityCode: row };
        facilities.push(row);
      }
    }
    if (req.body.facility != null) {
      const facilityFields = req.body.facility.split(",");
      for (const row of facilityFields) {
        const items = { facilityCode: row };
        facility.push(items);
      }
    }
    if (req.body.specialization != null) {
      const specializationFields = req.body.specialization.split(",");
      for (const row of specializationFields) {
        const items = { specializationName: row };
        specialization.push(items);
      }
    }
    const points = {
      lat: req.body.lat ? req.body.lat : "",
      long: req.body.long ? req.body.long : "",
    };
    const schoolData = {
      name,
      email,
      phone_number,
      languages,
      specialization,
      facility,
      facilities,
      // Check
      // points,
      // "school_location.lat": req.body.lat ? req.body.lat : "",
      // "school_location.long": req.body.long ? req.body.long : "",

      "courses_offered.board": req.body.board ? req.body.board : "",
      "courses_offered.eligibility_critery": req.body.eligibility_critery
        ? req.body.eligibility_critery
        : "",
      "courses_offered.class_from": req.body.class_from
        ? req.body.class_from
        : "",
      // logo,
      // logo: `${req.file.filename}${extenstion}`,
      // logo: req.file.filename + "." + imageMimetype[1],
      logo: req?.file?.filename !== "undefined" ? req?.file?.filename : "",
    };
    console.log("req.file", req.file);
    // console.log("test", `${req.file.filename}${extenstion}`);
    // console.log(req.file.filename + "." + imageMimetype[1]);

    // const data = await School.create(req.body);
    const data = await School.create(schoolData);
    console.log(data);
    await data.save();
    return res.status(201).json({
      status: false,
      message: "Successfully Onboarded",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};
