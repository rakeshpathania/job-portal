import dotevn from "dotenv";
dotevn.config();
import jwt from "jsonwebtoken";
import { userModel } from "../db/models/user.model.js";
import { blacklistTokenModel } from "../db/models/blacklistedToken.model.js";

export const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const blacklistedToken = await blacklistTokenModel.findOne({ token });
  if (blacklistedToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
