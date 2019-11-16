const { config, uploader } = require("cloudinary");

const cloudinaryConfig = (req, res, next) => {
  config({
    cloud_name: "db2rnmspi",
    api_key: "885114184925268",
    api_secret: "cAnTaK77JbMWZeufMv8Tx4-oGKQ"
  });
  next();
};

module.exports = { cloudinaryConfig, uploader };
