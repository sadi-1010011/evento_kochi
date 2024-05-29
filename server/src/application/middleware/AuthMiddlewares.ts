import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../../infrastructure/database/models/UserModel";

const JWT_KEY: any = process.env.JWT_SUPER_KEY;

interface CustomRequest extends Request {
  user?: any;
}

export const checkUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, JWT_KEY, async (err: any, decodedToken: any) => {
      if (err) {
        res.json({ status: false });
      } else {
        const user = await UserModel.findById(
          (decodedToken as { id: string }).id
        );
        if (user) {
          req.user = user; // assign user to req.user
        }
      }
      next();
    });
  } else {
    next();
  }
};
