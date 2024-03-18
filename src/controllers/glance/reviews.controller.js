const Reviews = require("../../models/glance-view/others/Reviews.model");

exports.createReviews = async (req, res, next) => {
  try {
    const { medium, school_rating, comment, created_date } = req.body;
    const missingList = [];

    if (!medium) {
      missingList.push("medium");
    }
    if (!school_rating) {
      missingList.push("school_rating");
    }
    if (!comment) {
      missingList.push("comment");
    }

    if (missingList.length > 0) {
      return res.status(400).json({
        status: false,
        message: `${missingList} is missing.`,
      });
    }
    const review = await Reviews.create(req.body);
    const data = await review.save();
    res.status(201).json({
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

exports.getReviewsBySchoolId = async (req, res, next) => {
  try {
    const { school_id } = req.body;

    if (!school_id) {
      return res.status(400).json({
        status: false,
        message: `school_id is missing.`,
      });
    }

    const review = await Reviews.find({ school: school_id })
      .populate({
        path: "school user",
        select: "name email email",
      })
      .sort({ created_date: "-1" });

    res.status(201).json({
      status: true,
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
