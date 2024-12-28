import { body } from "express-validator";
import express from "express";
import captainController from "../controllers/captain.controller.js";
import authentication from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post(
  "/register",
  [
    body("fullName.firstName")
      .isLength(3)
      .withMessage("First name is must be of 3 characters"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("phoneNumber")
      .isLength({ min: 10 })
      .withMessage("phoneNumber must be at least 10 characters long")
      .isMobilePhone("any")
      .withMessage("phoneNumber must be a valid phone number"),
    body("vehicle").notEmpty().withMessage("Vehicle details are required"),
    body("vehicle.regNumber")
      .notEmpty()
      .withMessage("Registration number is required"),
    body("vehicle.vehicleType")
      .isIn(["car", "bike", "auto"])
      .withMessage(
        "Invalid vehicle type please enter one of them: car, bike, auto"
      ),
    body("vehicle.colour").notEmpty().withMessage("Vehicle colour is required"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage(
        "Vehicle capacity must be a number greater than or equal to 1"
      ),
  ],
  captainController.register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  captainController.login
);

router.get("/profile", authentication.authenticateCaptain, captainController.getProfile);

router.post("/logout", authentication.authenticateCaptain, captainController.logoutCaptain);

export const captainRouter = router;
