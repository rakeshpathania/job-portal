import { captainModel } from "../db/models/captain.model.js";
import { createCaptain } from "../services/captain.service.js";
import { validationResult } from "express-validator";

const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullName, email, password, phoneNumber, vehicle, location, isAvailable } = req.body;
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

export default {
  register,
};
