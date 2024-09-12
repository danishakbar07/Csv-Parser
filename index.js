import express, { urlencoded } from 'express';
import path from 'path';
import { config } from 'dotenv';
import { connectToDb } from './connection.js';
import csvRouter from './routes/csv.js';
const app = express();
config({path:path.resolve('.env')}); // Configured to access environment variables
connectToDb(process.env.MONGODB_URL).then(()=>console.log(`MongoDb connected successfully`)
).catch((error)=>console.log(error)
)
app.use(express.json()); //To parse body of http methods such as post    
app.use(urlencoded({extended:true})); //To parse form data
app.use('/compressed',express.static(path.resolve('compressed'))) // To serve static files
app.set('view engine','hbs'); //Setting up handlebars as view engine
app.set('views',path.resolve('./views'))
app.use('/',csvRouter) // Enabling router
console.log(path.resolve());
const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`Server started at port 3000`)
);
