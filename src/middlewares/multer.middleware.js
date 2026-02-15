

// This code is used for file uploading in backend using Multer(Middleware)
// stores it in disk and assign unique filename
import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"./public/temp")

    },
    filename: function (req,file,cb){
        
        cb(null, file.originalname)
    }
})
export const upload = multer({
    storage,
})

