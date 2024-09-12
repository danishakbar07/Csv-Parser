import sharp from 'sharp';
import got from 'got';
import { v4 as uuidv4 } from "uuid";
import csvModel from "../models/csv.js";
import { config } from 'dotenv';
import path from 'path';
config({path:path.resolve('.env')});
//Function to process the images in the csv file. Used sharp library for the compression process
async function processImages(productData){
    const processedData = [];
    for (const product of productData){
        const inputUrls = product['Input Image Urls'].split(',');
        const outputUrls = [];    
        for (const url of inputUrls){
            try {
                const imageBuffer = await downloadImage(url);
                const outputFilePath = `compressed/${uuidv4()}.jpg`;
                 await sharp(imageBuffer).jpeg({quality:50}).toFile(outputFilePath) // Reducing the quality to 50% as per the requirment
                 const outputFileUrl = `${process.env.SERVER_URL}${outputFilePath}` //Creating a url to access the compressed image urls
                 outputUrls.push(outputFileUrl);
            } catch (error) {
                console.log(error);     
            }   
        }
        processedData.push({
            ...product,
            outputUrls:outputUrls.join(',')
        });

    }
    return processedData;
}
// Function to download the image. Used got library for the fetch
async function downloadImage(url){
try {
    console.log(url,"urllllllllllllllllllllll");
    
    const response = await got(url,{responseType:'buffer'});
    return response.body
} catch (error) {
    console.log(error);
    throw {error:"Error downloading image"}
    
}
}
export async function processRequest (requestId){
    try {
        const request = await csvModel.findOne({requestId});
if(request){
    const processedData = await processImages(request.productData); // Async function to download and compress the images in the csv file
    request.status = 'completed';
    request.productData = processedData; // Updating the db with compressed output image urls
    await request.save();
}
    } catch (error) {
        console.log(error);
        
    }

}
//Pre processing the product data to display the data clearly
export function preProcessProductData(data){
    return data.productData.map(product=>({
     slNo:product["S.No."],
     productName:product["Product Name"],
     inputImgUrls:product["Input Image Urls"],
     outputImgUrls:product["outputUrls"],
     status:data.status
    }))
}