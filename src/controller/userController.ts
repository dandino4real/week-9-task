import {Request, Response} from 'express'
import {registerSchema, options, GenerateSalt, 
    GeneratePassword, GenerateOTP, emailHtml, mailSent, GenerateSignature} from '../utils'
import User, {usersInstance} from '../model/user'
import { JwtPayload } from 'jsonwebtoken'
import { stringify } from 'querystring'
import { any } from 'joi'
import { fromAdminMail, userSubject } from '../config'


export const  Register = async(req:Request, res:Response) => {
    try{
        const {name, email, password, address, phone} = req.body

        const validateResult = registerSchema.validate(req.body, options)
        if(validateResult.error){
            console.log(validateResult.error.details[0].message)
            return res.status(400).json({
                Error: validateResult.error.details[0].message
            })
        }

        //Generate salt
        const salt = await GenerateSalt()
        const userPassword = await GeneratePassword(password, salt)

        //Generate OTP
        const {otp, expiry} = GenerateOTP()

        const userExist = await User.findOne({email}) 
        if(!userExist){
            const user = new User({
                name,
                email,
                salt,
                password: userPassword,
                phone,
                address,
                otp,
                otp_expiry: expiry,
                verified:false,
                role:'user' 
            })
            await user.save()
            //Send email to user
            const html = emailHtml(otp)
            await mailSent(fromAdminMail, email, userSubject, html)

            const newuser = (await User.findOne({email})) as unknown as usersInstance
            //Generate signature
          let signature = await GenerateSignature({
            _id: newuser._id,
            email: newuser.email,
            verified: newuser.verified
        })
        return res.status(201).json({
            message: 'User created successfully, check your email or phone number for otp verification',
            // user
            signature,
            verified: newuser.verified
        })
        }
        return res.status(400).json({
            message: 'User already exists'
        })


    }catch(err){
        res.status(500).json({
            Error: "Internal server Error",
            route: "/users/signup"
        })
    }
}