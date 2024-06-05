import mongoose, { Document, Schema, Model, ObjectId } from 'mongoose';
import { IUser } from '../../../domain/entities/User';
import bcrypt from 'bcrypt'

//   export interface IUserDocument extends IUser, Document {
//     // Define any additional methods if needed
//   }

export interface IUserDocument extends Document {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    status: boolean;
    // You can define any additional properties specific to your user model here
}
  
  export interface IUserModel extends Model<IUserDocument> {
    login(nameOrEmail: string, password: string): Promise<IUserDocument>;
  }  

const UserSchema: Schema = new Schema({
    //  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { 
        type: String,
        required: [true,"Name is required"], 
        unique: true
    },
    email: {
        type: String,
        required: [true,"Email is required"], 
        unique: true 
    },
    password: {
        type: String,
        required: [true,"Password is required"] 
    },
    status: {
        type: Boolean,
        default: true
    }
})

UserSchema.pre("save", async function (next) {
    if (typeof this.password === 'string') {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

UserSchema.statics.login = async function(nameOrEmail: string, password: string): Promise<IUser> {
    if(nameOrEmail==='') {
        throw new Error("Please enter name or email")
    }
    if(password==='') {
        throw new Error("Please enter password")
    }
    const user = await this.findOne(nameOrEmail.includes('@') ? { email: nameOrEmail} : { name: nameOrEmail})
    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if(!user.status) {
            throw new Error("User is Blocked!");
        }
        if(auth) {
            return user
        }
        throw new Error("Incorrect Password");
    }    
    throw new Error("Incorrect Username or Email")
}


const UserModel: IUserModel = mongoose.model<IUserDocument, IUserModel>('User', UserSchema);

export default UserModel;






