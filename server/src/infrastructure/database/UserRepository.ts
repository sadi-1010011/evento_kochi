import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IUser } from "../../domain/entities/User";
import UserModel from './models/UserModel'

export class UserRepository implements IUserRepository {
    async findByEmail(email: string): Promise<IUser | null> {
        return await UserModel.findOne({email}).exec()
    }

    async create(user: IUser): Promise<IUser> {
        const newUser = new UserModel(user)
        const savedUser = await newUser.save()
        return savedUser.toObject() as IUser
    }
}