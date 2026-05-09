const mongoose = require("mongoose");
const { Schema } = mongoose;
const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Course name is required"],
      unique: [true, "Course name already exists"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Course image is required"],
    },
    price: {
      type: Number,
      required: [true, "Course price is required"],
    },
    duration: {
      type: Number,
      required: [true, "Course duration is required"],
    },
    students: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false },
);
module.exports = mongoose.model("Course", courseSchema);
