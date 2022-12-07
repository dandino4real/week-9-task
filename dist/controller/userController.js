"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = void 0;
const utils_1 = require("../utils");
const user_1 = __importDefault(require("../model/user"));
const config_1 = require("../config");
const Register = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body;
        const validateResult = utils_1.registerSchema.validate(req.body, utils_1.options);
        if (validateResult.error) {
            console.log(validateResult.error.details[0].message);
            return res.status(400).json({
                Error: validateResult.error.details[0].message
            });
        }
        //Generate salt
        const salt = await (0, utils_1.GenerateSalt)();
        const userPassword = await (0, utils_1.GeneratePassword)(password, salt);
        //Generate OTP
        const { otp, expiry } = (0, utils_1.GenerateOTP)();
        const userExist = await user_1.default.findOne({ email });
        if (!userExist) {
            const user = new user_1.default({
                name,
                email,
                salt,
                password: userPassword,
                phone,
                address,
                otp,
                otp_expiry: expiry,
                verified: false,
                role: 'user'
            });
            await user.save();
            //Send email to user
            const html = (0, utils_1.emailHtml)(otp);
            await (0, utils_1.mailSent)(config_1.fromAdminMail, email, config_1.userSubject, html);
            const newuser = (await user_1.default.findOne({ email }));
            //Generate signature
            let signature = await (0, utils_1.GenerateSignature)({
                _id: newuser._id,
                email: newuser.email,
                verified: newuser.verified
            });
            return res.status(201).json({
                message: 'User created successfully, check your email or phone number for otp verification',
                // user
                signature,
                verified: newuser.verified
            });
        }
        return res.status(400).json({
            message: 'User already exists'
        });
    }
    catch (err) {
        res.status(500).json({
            Error: "Internal server Error",
            route: "/users/signup"
        });
    }
};
exports.Register = Register;
