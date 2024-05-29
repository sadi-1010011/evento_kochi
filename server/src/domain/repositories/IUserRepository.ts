import { IUser } from '../entities/User'

export interface IUserRepository {
    findByEmail(email: string): Promise<IUser | null>
    create(user: IUser): Promise<IUser>;
}   