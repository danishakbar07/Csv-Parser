import {v4 as uuidv4} from 'uuid';
import fs from 'fs'
import csvModel from '../models/csv.js';
import { processRequest,preProcessProductData } from '../services/csv.js';
import { parse } from 'csv-parse';
export function renderHome(req,res){
    res.render('home')
}
export function handleUploadedFile (req,res){
    try {
        console.log(req.file);
        const csvFile = req.file.path;
        const requestId = uuidv4(); // Creating a unique id using uuid library
        const productData = [];
        //Used file modue along with csv- parser to read and parse csv file
        //start
        fs.createReadStream(csvFile)
        .pipe(parse({columns:true,delimiter:','}))
        .on('data',(row)=>{
            productData.push(row)
        }).on('end',async ()=>{
        await csvModel.create({
            requestId,
            productData
        })
        //end
        res.json({requestId});
        processRequest(requestId); //Async function to process the csv file in the background
        }) 
    } catch (error) {
        console.log(error);
        res.status(500).json("Server Interrupted. Please try again later")
    }

};
export async function handleStatusCheck(req,res){
    const {requestId} = req.params;
    const request = await csvModel.findOne({requestId});
    if (request){
        const processedProductData = preProcessProductData(request)
        res.render('outputCsvFile',processedProductData);
    }else{
        res.status(404).json({error:"Request not found"});
    }
}