import { Request, Response } from "express";
import { UserService } from "../../application/services/UserService";
import { UserRepository } from "../../infrastructure/database/UserRepository";

const userRepository = new UserRepository()
const userService = new UserService(userRepository)

export const createUser = async (req: Request, res: Response) => {
    console.log(req.body)
    const {email, password } = req.body

    try {
        const user = await userService.registerUser(email, password)
        if(!user){
            return res.status(400).json({error: 'User already exists'})
        }
        return res.status(201).json(user)   
    } catch (error: any) {
        return res.status(400).json({error: error.message})
    }
}