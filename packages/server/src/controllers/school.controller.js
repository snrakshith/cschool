const School = require("../models/School.model");

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

exports.getSchoolById = async (req, res, next) => {
  try {
    // const school = await School.findById(req.params.schoolId);
    // const school = await School.findById(req.body.schoolId);
    // const school = await School.findById(req.query.schoolId);

    const schoolId = req.query.schoolId;
    // const school = await School.find({ schoolId });
    const school = await School.find({ schoolId });

    return res?.status(200).json({
      status: true,
      data: school,
    });
  } catch (error) {
    console.error(error);
    return res?.status(404).json({
      // message: "Failed to get data",
      message: error.message,
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
    labs,
  } = req.body;

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

  try {
    const facilities = [];
    const facility = [];

    // if (req.body.facilities != null) {
    //   const facilitiesFields = req.body.facilities.split(",");
    //   for (const row of facilitiesFields) {
    //     facilities.push(row);
    //   }
    // }
    // if (req.body.facility != null) {
    //   const facilityFields = req.body.facility.split(",");
    //   for (const row of facilityFields) {
    //     const payload = { facilityCode: row };
    //     facility.push(payload);
    //   }
    // }
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

    // const number = [];

    // if (req.body?.number !== null) {
    //   const numbers = req.body?.number.split(",");
    //   for (let item of numbers) {
    //     number.push(item);
    //   }
    // }

    // const labs = [];

    // if (req.body?.labs !== null) {
    //   const labData = req.body?.labs?.split(",");
    //   for (let item of labData) {
    //     const payload = { lab_name: item };
    //     labs.push(payload);
    //   }
    // }

    const schoolData = new School({
      name,
      phone_number,
      languages,
      specialization,
      email,
      code,
      website,
      moto,
      labs,
      // criterias,
      courses_offered: req.body.courses_offered ? req.body.courses_offered : "",
      // courses_offered: {
      //   board: req.body.board ? req.body.board : "",
      //   eligibility_critery: req.body.eligibility_critery
      //     ? req.body.eligibility_critery
      //     : "",
      //   class_from: req.body.class_from ? req.body.class_from : "",
      // },
      communication: req.body.communication ? req.body.communication : "",
      address: req.body.address ? req.body.address : "",
      specialization: req.body.specialization ? req.body.specialization : "",
    });
    // "courses_offered.board": req.body.board ? req.body.board : "",
    // "courses_offered.eligibility_critery": req.body.eligibility_critery
    //   ? req.body.eligibility_critery
    //   : "",
    // "courses_offered.class_from": req.body.class_from
    //   ? req.body.class_from
    //   : "",
    // const data = await School.create(schoolData);
    const data = await School.create(req.body);
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

// exports.deleteSchool = async (req, res, next) => {
//   const schoolId = req.params.id;

//   if (!schoolId)
//     return res.status(404).json({
//       status: false,
//       message: "No school with this id",
//     });
//   await School.findByIdAndDelete(schoolId);
//   try {
//     res.status(200).json({
//       message: `Deleted successfully ${schoolId}`,
//       status: true,
//     });
//   } catch (error) {
//     res.status(404).json({
//       message: error,
//       status: true,
//     });
//   }
// };

exports.deleteSchool = async (req, res, next) => {
  try {
    const school = await School.findById(req.body._id);

    if (!school)
      return res.status(404).json({
        status: false,
        message: "No school with this id",
      });

    await school.remove();
    res.status(200).json({
      message: `Deleted successfully`,
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};
