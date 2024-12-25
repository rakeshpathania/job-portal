import mongoose from "mongoose";
import  jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const captainSchema = mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least of 3 characters"],
    },
    lastName: {
      type: String,
      minlength: [3, "Last name must be at least of 3 characters"],
    },
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  phoneNumber: { type: String, required: true, unique: true },
  socketId: { type: String },
  isAvailable: { type: Boolean, default: false },
  vehicle: {
    colour: {
      type: String,
      required: true,
      minlength: [3, "Colour must be at least of 3 characters"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["bike", "car", "auto"],
    },
    regNumber: { type: String, required: true, unique: true },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least of 1"],
      max: 6,
    },
  },
  location: {
    lat: {
      type: Number,
    },
    long: {
      type: Number,
    },
  },
});

captainSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign(
    { _id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: "24h" } // or any duration you prefer
  );
  return token;
};

captainSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

captainSchema.statics.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const captainModel = mongoose.model("captain", captainSchema);
