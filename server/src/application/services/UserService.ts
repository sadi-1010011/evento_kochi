import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IUser } from "../../domain/entities/User";
import { hashPassword } from "../../infrastructure/hashing/hash";
import { validateEmail, validatePassword } from "../../infrastructure/validation/validateUser";

export class UserService {
    constructor(private userRepository: IUserRepository) {}

    async registerUser(email: string, password: string): Promise<IUser | null> {
        if(!validateEmail(email) || !validatePassword(password)){
            throw new Error('invalid email or password')
        }

        const existingUser = await this.userRepository.findByEmail(email)
        if(existingUser){
            return null
        }

        const hashedPassword = await hashPassword(password);
        const newUser: IUser = { email, password: hashedPassword }
        return await this.userRepository.create(newUser)
    }
}
