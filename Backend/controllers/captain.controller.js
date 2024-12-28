import { blacklistTokenModel } from "../db/models/blacklistedToken.model.js";
import { captainModel } from "../db/models/captain.model.js";
import { createCaptain } from "../services/captain.service.js";
import { validationResult } from "express-validator";

const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    fullName,
    email,
    password,
    phoneNumber,
    vehicle,
    location,
    isAvailable,
  } = req.body;
  const isCaptainExists = await captainModel.findOne({ email });
  if (isCaptainExists) {
    return res.status(400).json({ message: "Captain already exists" });
  }
  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await createCaptain(
    fullName,
    email,
    hashedPassword,
    phoneNumber,
    vehicle,
    location,
    isAvailable
  );
  const token = await captain.generateAuthToken();
  res.status(201).json({ captain, token });
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const captain = await captainModel.findOne({ email }).select("+password");
  if (!captain) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const isMatch = await captain.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = await captain.generateAuthToken();
  res.status(200).json({ captain, token });
};

const getProfile = async (req, res, next) => {
  const captain = req.captain;
  res.status(200).json({ captain });
};

const logoutCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await blacklistTokenModel.create({ token });
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

export default {
  register,
  login,
  getProfile,
  logoutCaptain,
};
