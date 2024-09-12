import mongoose from "mongoose";
export function connectToDb(url){
    return mongoose.connect(url)
};
