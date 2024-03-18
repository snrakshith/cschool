const Media = require("./Media.model");

exports.getAllMedia = async (req, res, next) => {
  try {
    const data = await Media.find();
    return res.status(201).json({
      status: true,
      data,
    });
  } catch (error) {
    console.error(error);
    return res?.status(404).json({
      message: "Failed to get data",
      status: false,
    });
  }
};

exports.createMedia = async (req, res, next) => {
  try {
    const { school } = req.body;
    const images = [];
    if (req.body.images) {
      if (req.body.images.length > 0) {
        req.body.images.map((eachImage) => {
          images.push({
            name: eachImage.name,
            link: eachImage.link,
          });
        });
      }
    }
    const docs = [];
    if (req.body.docs) {
      if (req.body.docs.length > 0) {
        req.body.docs.map((eachDoc) => {
          docs.push({
            name: eachDoc.name,
            link: eachDoc.link,
          });
        });
      }
    }

    await Media.findOneAndUpdate(
      { school },
      { $push: { images: images } },
      { upsert: true }
    );

    res.status(200).json({
      status: true,
      message: "Succefully added",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
