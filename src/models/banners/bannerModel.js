const mongoose = require("mongoose");
const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    redirectUrl: {
      type: String,
    },
    isActive:{
        type:Boolean
    }
  },
  { timestamps: true }
);
const banners = mongoose.model("Banners", bannerSchema);
module.exports = banners;
