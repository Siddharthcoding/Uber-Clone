import userModel from "../models/user.model.js";
import createUser from "../services/user.service.js";
import { validationResult } from "express-validator";
import blacklistTokenModel from "../models/blacklistToken.model.js";

export const registerUser = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { fullname, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({email});
    
    if(isUserAlreadyExist) {
        return res.status(400).json({message: 'User already exist'});
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });
}

export const loginUser = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { email, password } = req.body;

    // check user with this email exists and bring its password too
    const user = await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const token = user.generateAuthToken();
    res.cookie('token', token);

    res.status(200).json({token, user});
}

// the profile of user that has logged in should only be visible
// so we add a middleware to check which user has logged in
export const getUserProfile = async(req, res, next) =>{
    res.status(200).json(req.user);
}

export const logoutUser = async (req, res, next) =>{
    res.clearCookie('token');
    const token =
    req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    await blacklistTokenModel.create({token});
    
    res.status(200).json({message: 'Log Out'});
}