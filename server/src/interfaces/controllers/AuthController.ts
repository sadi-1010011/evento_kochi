import { Request, Response, NextFunction } from "express";
import UserModel from "../../infrastructure/database/models/UserModel";
import jwt from "jsonwebtoken";
import { UserRepository } from "../../infrastructure/database/UserRepository";
import { UserService } from "../../application/services/UserService";
import { IUser } from "../../domain/entities/User";
import dotenv from 'dotenv'
dotenv.config()

const userRepository = new UserRepository()
const userService = new UserService(userRepository)

const JWT_KEY: any = process.env.JWT_SECRET_KEY;


interface AdminUser {
    id: number;
    email: string;
    password: string;
}
             
const adminUsers: AdminUser[]=[
  {   
    id: 1,
    email: 'admin@gmail.com',
    password: 'admin123',
  },
  {
    id: 2,
    email: 'basith@gmail.com',
    password: 'basith123'
  }
]    

const maxAge = 3 * 25 * 60 * 60;

const createToken = (id: string): string => {
  return jwt.sign({ id },JWT_KEY , {
    expiresIn: maxAge * 1000,
  });
};

interface ErrorObject {
    name?: string;
    email?: string;
    password?: string;
    [key: string]: string | undefined;
}

interface ErrorProperties {
    properties: ErrorProperty;
}
interface ErrorProperty {
    path: keyof { name: string; email: string; password: string };
    message: string;
}

const errors: Record<string, string> = {};

const handleErrors = (err: any) => {
  let errors = { name: "", email: "", password: "" };

  if(err.message === "User is Blocked!") errors.email = err.message

  if (err.message === "Please enter name or email!") errors.email = err.message;

  if (err.message === "Password cannot be empty!") errors.email = err.message;

  if (err.message === "incorrect Username or Email") errors.email = err.message;

  if (err.message === "incorrect Password") errors.password = err.message;

  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }
  if (err.message.includes("User validation failed")) {
    Object.values<ErrorProperties>(err.errors).forEach(({ properties }: {properties: ErrorProperty}) => {
      errors[properties.path] = properties.message;
    })
  }
  return errors;
};

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { nameOrEmail, password } = req.body;
    
    const user = await userService.login( nameOrEmail, password);
    if(user){
        const token = createToken(user._id.toString());
    
        res.cookie("jwt", token, {
        //   withCredentials: true,
          httpOnly: false,
          maxAge: maxAge * 1000,
        });
        res.status(200).json({user: user._id, created: true});
    }
  } catch (error) {
    console.log(error)
    const errors = handleErrors(error);
    console.log(errors)
    res.json({ errors, created: false });
  }
};

export const userSignup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user: IUser = req.body;
    console.log(JWT_KEY)
    try {
        const newUser = await userService.registerUser(user)
        const token = createToken(newUser._id.toString())

        res.cookie("jwt", token, {
        httpOnly: false,
        maxAge: maxAge * 1000,
        });
        res.status(201).json({ user: newUser._id, created: true });
    } catch (error: any) {
        const errors = handleErrors(error);
        res.json({ errors, created: false });
    }
};

