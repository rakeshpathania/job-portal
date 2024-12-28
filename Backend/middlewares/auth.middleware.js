import dotevn from "dotenv";
dotevn.config();
import jwt from "jsonwebtoken";
import { userModel } from "../db/models/user.model.js";
import { captainModel } from "../db/models/captain.model.js";
import { blacklistTokenModel } from "../db/models/blacklistedToken.model.js";

const authenticateUser = async (req, res, next) => {
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
    if(!user){
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const authenticateCaptain = async (req, res, next) => {
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
    const captain = await captainModel.findById(decoded._id);
    if (!captain) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.captain = captain;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};




export default {
  authenticateUser,
  authenticateCaptain
}


