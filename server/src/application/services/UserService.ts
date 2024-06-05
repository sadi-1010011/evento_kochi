import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IUser } from "../../domain/entities/User";
import { hashPassword } from "../../infrastructure/hashing/hash";
import { validateEmail, validatePassword } from "../../infrastructure/validation/validateUser";
import UserModel from "../../infrastructure/database/models/UserModel";

export class UserService {
    constructor(private userRepository: IUserRepository) {}

    async registerUser(user: IUser): Promise<IUser> {
        return await this.userRepository.createUser(user);
    }
 
    async login(nameOrEmail: string, password: string): Promise<IUser | null> {
        return await this.userRepository.login(nameOrEmail, password);
    }

    // async registerUser(name: string, email: string, password: string): Promise<IUser | null> {
    //     if(!validateEmail(email) || !validatePassword(password)){
    //         throw new Error('invalid email or password')
    //     }

    //     const existingUser = await this.userRepository.findByEmail(email)
    //     if(existingUser){
    //         return null
    //     }

    //     const hashedPassword = await hashPassword(password);
    //     const newUser: IUser = { name, email , password: hashedPassword }
    //     return await this.userRepository.create(newUser)
    // }

}

