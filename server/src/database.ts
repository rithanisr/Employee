import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const dburl:string=process.env.MONGO_URI as string;

const connectDB=async ()=>{
    try{
        await mongoose.connect(dburl)
            
        
        console.log("DB is connected")

    }catch(err){   
        console.error("Failed to connectDB",err)

    }
}
export default connectDB;