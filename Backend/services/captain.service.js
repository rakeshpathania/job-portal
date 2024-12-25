import { captainModel } from "../db/models/captain.model.js";

const createCaptain = async (fullName, email, password, phoneNumber, vehicle, location, isAvailable) => {
  if (
    !fullName?.firstName ||
    !email ||
    !password ||
    !phoneNumber ||
    !vehicle
  ) {
    throw new Error("All fields are required");
  }

  const { vehicleType, colour, regNumber, capacity } = vehicle;
  const { firstName, lastName } = fullName;

  const captain = await captainModel.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    password,
    phoneNumber,
    vehicle: {
      vehicleType,
      colour,
      regNumber,
      capacity
    },
    location: {
      lat: location?.latitude || 0,
      long: location?.longitude || 0
    },
    isAvailable
  });

  return captain;
};

export { createCaptain };
