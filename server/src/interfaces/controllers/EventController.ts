import { Request, Response } from "express";
import { UserService } from "../../application/services/UserService";
import { UserRepository } from "../../infrastructure/database/UserRepository";

const userRepository = new UserRepository()
const userService = new UserService(userRepository)

export const getEvent = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        // const event =
    } catch (error) {
        
    }
}