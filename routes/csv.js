import { Router } from "express";
import multer from 'multer';
import { handleUploadedFile,handleStatusCheck,renderHome } from "../controllers/csv.js";
const router = Router();
//Setting up multer to upload files
//Start
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        console.log("fileeee"+file);
        
        return cb(null,'./uploads')
    },
    filename:function(req,file,cb){
        const fileName = `${Date.now()}-${file.originalname}`
        return cb(null,fileName)
    }  
});
const upload = multer({storage:storage});
//End
router.get('/',renderHome)
router.post('/upload',upload.single('file'), handleUploadedFile); //To handle uploaded file
router.get('/status/:requestId',handleStatusCheck); // To get the status of uploaded file
export default router;