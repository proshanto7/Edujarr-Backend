const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false, // Exclude password from query results by default
      trim: true,
    },
    phone: {
      type: Number,
      unique: [false, "Phone Number already exists"],
      trim: true,
    },

    otp: {
      type: String,
      trim: true,
    },
    otpExpiry: {
      type: Date,
    },
    forgotPasswordOtp: {
      type: String,
      trim: true,
    },
    forgotPasswordOtpExpiry: {
      type: Date,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "editor", "admin"],
      default: "user",
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields
    versionKey: false, // Exclude __v field
  },
);
//  Exclude password from query results
userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.otp; // Exclude otp from query results
    delete ret.password; // Exclude password from query results
    delete ret.otpExpiry; // Exclude otpExpiry from query results
    delete ret.forgotPasswordOtp; // Exclude forgotPasswordOtp from query results
    delete ret.forgotPasswordOtpExpiry; // Exclude forgotPasswordOtpExpiry from query results
    return ret;
  },
});

module.exports = mongoose.model("User", userSchema);
