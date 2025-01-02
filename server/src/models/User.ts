import { model, Schema, Document, Model } from 'mongoose';
export interface IUser extends Document {
    name: string;
    email: string;
    password:String;
   
    token :String;
}
const UserSchema=new Schema<IUser>({
    name:{type : String, require: true},
    email:{type : String, require: true},
    password:{type:String,require:true},
    
    token:{type:String}
})
const User: Model<IUser> = model<IUser>('user', UserSchema);
export default User;