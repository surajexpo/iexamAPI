const mongoose = require("mongoose");
const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique:true,trim: true
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
      default:""
    },
    isActive:{
        type:Boolean,
        default:true
    }
  },
  { timestamps: true }
);
const banners = mongoose.model("Banners", bannerSchema);
module.exports = banners;
