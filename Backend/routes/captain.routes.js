import express from "express";
import { body } from "express-validator";
import {registerCaptain} from "../controllers/captain.controller.js";


const router = express.Router();

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage
    ('First name must be atleast 3 characters long'),
    body('password').isLength({min: 6}).withMessage
    ('Password name must be atleast 6 characters long'),
    body('vehicle.color').isLength({min: 3})
    .withMessage('Color must be alteast 3 characters long'),
    body('vehicle.plate').isLength({min: 3})
    .withMessage('Plate must be alteast 3 characters long'),
    body('vehicle.capacity').isInt({min: 1})
    .withMessage('Capacity must be alteast 3 characters long'),
    body('vehicle.vehicleType').isIn(['car', 'motorcyle', 'auto'])
    .withMessage('Invalid vehicle type'),
],
    registerCaptain // action performed if validation check go wrong
)


export default router;