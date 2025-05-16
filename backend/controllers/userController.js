import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';


const createToken = (id) => {
   return jwt.sign({id}, process.env.JWT_SECRET);
}

const register = async (req, res) => {
   const {name, email, password} = req.body;
   if (!name || !email || !password) {
      return res.json({success: false, message: 'please provide name, email and password'});
   }
   try {
      const existingUser = await userModel.findOne({email});
      if (existingUser) {
         return res.json({success: false, message: 'user with email already exists'});
      }

      if (!validator.isEmail(email)) {
         return res.json({success: false, message: 'enter a valid email'});
      }
      if (password.length < 8) {
         return res.json({success: false, message: 'enter a strong password'});
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new userModel({
         name, 
         email,
         password: hashedPassword
      });
      const user = newUser.save();

      const token = createToken(user._id);
      return res.json({success: true,token, message: 'user registered'});
   } catch (error) {
      return res.json({success: false, message: error.message});
   }
}

const login = async (req, res) => {
   try {

      const {email, password} = req.body;
      if (!email || !password) {
         return res.json({success: false, message: 'enter email and password'});
      }

      const user = await userModel.findOne({email});
      if (!user) {
         return res.json({success: false, message: 'user does not exists'});
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
         return res.json({success: false, message: 'invalid password'});
      }

      const token = createToken(user._id);

      return res.json({success: true, message: 'logged in successfully', token});
      
   } catch (error) {
      return res.json({success: false, message: error.message});
   }
}

const adminLogin = async (req, res) => {
   try {

      const {email, password} = req.body;
      
      if (!email || !password) {
         return res.json({success: false, message: 'enter email and password'});
      }

      if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
         return res.json({success: false, message: 'invalid credentials !'});
      }

      const token = createToken('admin');

      return res.json({success: true, message: 'logged in successfully', token});
      
   } catch (error) {
      return res.json({success: false, message: error.message});
   }
}


export {register, login, adminLogin};