import { IUser } from '../entities/User'

export interface IUserRepository {
    findByEmail(email: string): Promise<IUser | null>
    createUser(user: IUser): Promise<IUser>;
    login(nameOrEmail: string, password: string): Promise<IUser | null>;
}   