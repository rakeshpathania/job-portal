import { userModel } from "../db/models/user.model.js";
import { validationResult } from "express-validator";
import { createUser } from "../services/user.service.js";
import { blacklistTokenModel } from "../db/models/blacklistedToken.model.js";

const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullName, email, password, phoneNumber } = req.body;
  const isUserExists = await userModel.findOne({ email });
  if (isUserExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await userModel.hashPassword(password);
  const user = await createUser(fullName, email, hashedPassword, phoneNumber);

  const token = await user.generateAuthToken();
  res.status(201).json({ user, token });
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = await user.generateAuthToken();
  res.status(200).json({ user, token });
};

const getProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

const logout = async(req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await blacklistTokenModel.create({token: token});
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

export default {
  register,
  login,
  getProfile,
  logout
};
