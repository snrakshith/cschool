const Author = require("../models/Author");

exports.getAllAuthors = async (req, res, next) => {
  const { page_limit, page } = req.query;
  try {
    console.log("+++++++++++++++++++");
    console.log("req", req.body);
    console.log("req params", req.params);
    console.log("req query", req.query);
    const authors = await Author.find()
      .skip(page * page_limit)
      .limit(page_limit)
      .sort({ createdAt: -1 });
    const totalAuthors = await Author.count();
    return res
      .status(200)
      .json({ status: true, results: totalAuthors, data: authors });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.onboardNewAuthor = async (req, res, next) => {
  const { author_name, email, phone_number } = req.body;

  if (!author_name) {
    return res
      .status(400)
      .json({ status: false, message: "Author name is missing" });
  }

  if (!email) {
    return res.status(400).json({ status: false, message: "email is missing" });
  }
  try {
    const authorData = {
      author_name,
      email,
      phone_number,
    };
    const newAuthorData = await Author.create(req.body);
    await newAuthorData.save();
    return res.status(201).json({
      status: false,
      message: "Successfully Onboarded",
      data: newAuthorData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.updateAuthorProfile = async (req, res, next) => {
  const { author_name } = req.body;
  const fieldsAllowedToUpdate = { author_name };
  try {
    // const authors = await Author.findByIdAndUpdate(req.params.id, req.body, {
    const authors = await Author.findByIdAndUpdate(
      req.params.id,
      fieldsAllowedToUpdate,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!authors) {
      return res
        .status(400)
        .json({ status: false, message: "Failed to update" });
    }
    return res.status(200).json({ status: true, data: authors });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.deleteAuthorProfile = async (req, res, next) => {
  try {
    // Delete by req body
    const authors = await Author.findByIdAndDelete(req.body);

    // Delete by params

    // const authors = await Author.findByIdAndDelete(req.params.id);
    if (!authors) {
      return res
        .status(400)
        .json({ status: false, message: "author id is incorrect" });
    }
    return res
      .status(200)
      .json({ status: true, message: "Successfully Deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

// localhost:3000/api/v1/author?author_name='rakshith'
exports.getPostsByAuthorName = async (req, res, next) => {
  const { author_name } = req.query;
  if (!author_name) {
    return res
      .status(400)
      .json({ status: false, message: "Query param is incorrect" });
  }
  try {
    console.log(req.query);
    const authors = await Author.find({ author_name });
    const totalAuthors = await Author.count();
    return res
      .status(200)
      .json({ status: true, results: totalAuthors, data: authors });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};
