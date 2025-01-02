import mongoose , {Schema, Document,Model} from "mongoose";
export interface IData extends Document {
    name: string;
    email: string;
    mobileno:string;
    desgination:string;
    userId:string;

}
const DataSchema=new mongoose.Schema({
    name :{type : String, require: true},
    email:{type : String, require: true},
    mobileno:{type : String, require: true},
    desgination:{type : String, require: true},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
})
const Data = mongoose.model<IData>('Data', DataSchema);
export default Data;