const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const User = require('../model/userModel')
const { promisify} = require('util');  
const jwt = require('jsonwebtoken');

const signup = catchAsync(async(req, res, next) => {
    const newUser = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        role:req.body.role
    })
    const token = jwt.sign({userId:User._ID}, process.env.jwt_SECRET)
    res.status(200).json({
        status:"success",
        token,
        message:newUser
    })
})


const login = catchAsync(async(req, res, next) => {
    const {email, password} = req.body
    if(!email || !password) {
        return next(new AppError('place provide email and password'))
    }
    const user = await User.findOne({email});
    const token = jwt.sign({userId:User._ID}, process.env.jwt_SECRET)
    res.status(200).json({
        status:"success",
        token,
        data:user
    })
})

const protect = catchAsync(async(req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token){
        return next(new AppError('You are not logged in! Please log in to get access', 401))};
    const verify = await promisify(jwt.verify)(token, process.env.jwt_SECRET)
    const currentUser = await User.findOne(verify.UserId)
    if (!currentUser) {
        return next(new AppError('place valid provide userId'))}
        req.User = currentUser;
        next();
})

const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.User.role)) {
          console.log(roles);
        return next(new AppError('You do not have permission to perform this action', 403));}
      next();
    };
  };

module.exports = {signup,login,protect,restrictTo}