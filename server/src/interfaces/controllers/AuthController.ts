// const UserModel = require("../Models/UserModel");
// const jwt = require("jsonwebtoken");
// const bcrypt = require('bcrypt')
// const adminUsers=[
//   {
//     id: 1,
//     email: 'admin@gmail.com',
//     password: 'admin123',
//   },
//   {
//     id: 2,
//     email: 'basith@gmail.com',
//     password: 'basith123'
//   }
// ]    

// const maxAge = 3 * 25 * 60 * 60;

// const createToken = (id) => {
//   return jwt.sign({ id }, "basithsupersecretkey", {
//     expiresIn: maxAge * 1000,
//   });
// };

// const handleErrors = (err) => {
//   let errors = { name: "", email: "", password: "" };

//   if(err.message === "User is Blocked!")
//     errors.email = err.message

//   if (err.message === "Please enter name or email!")
//     errors.email = err.message;

//   if (err.message === "Password cannot be empty!")
//     errors.email = err.message;

//   if (err.message === "incorrect Username or Email")
//     errors.email = "Email is not registered";

//   if (err.message === "incorrect Password")
//     errors.password = "Password incorrect";

//   if (err.code === 11000) {
//     errors.email = "Email is already registered";
//     return errors;
//   }
//   if (err.message.includes("Users validation failed")) {
//     Object.values(err.errors).forEach(({ properties }) => {
//       errors[properties.path] = properties.message;
//     });
//   }
//   return errors;
// };

// module.exports.login = async (req, res, next) => {
//   try {
//     const { name, email, password } = req.body;
    
//     const user = await UserModel.login(name, email, password);
//     const token = createToken(user._id);

//     res.cookie("jwt", token, {
//       withCredentials: true,
//       httpOnly: false,
//       maxAge: maxAge * 1000,
//     });
//     res.status(200).json(user);
//   } catch (error) {
//     const errors = handleErrors(error);
//     res.json({ errors, created: false });
//   }
// };

// module.exports.signup = async (req, res, next) => {
//   try {
//     const { name, email, password } = req.body;
//     const user = await UserModel.create({ name, email, password });
//     const token = createToken(user._id);

//     res.cookie("jwt", token, {
//       withCredentials: true,
//       httpOnly: false,
//       maxAge: maxAge * 1000,
//     });
//     res.status(201).json({ user: user._id, created: true });
//   } catch (error) {
//     const errors = handleErrors(error);
//     res.json({ errors, created: false });
//   }
// };