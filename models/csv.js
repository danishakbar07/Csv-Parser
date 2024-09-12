import { Schema,model } from "mongoose";
const csvSchema = Schema({
    requestId:{
        type:String
    },
    productData:{
        type:Array,
        required:true
    },
    status:{
        type:String,
        default:'pending',
        required:true
    }
})
const csvModel = model('csvData',csvSchema)
export default csvModel;