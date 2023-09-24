import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected)
    {
        console.log("mongodb is already connected")
        return;
    }
    try {
        await mongoose.connect(process.env.MONOGODB_URI,{
            dbName : 'shared_prompt',
            useNewUrlParser : true,
            useUnifiedTopology : true
        })

        isConnected = true
        console.log("mongodb connected")
    } catch (error) {
        console.log(error)
    }
}