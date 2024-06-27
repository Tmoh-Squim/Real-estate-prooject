import multer from "multer";

const storage = multer.diskStorage({
    destination:function (req,res,cb) {
        cb(null,"uploads/")
    },
    filename:function (req,file,cb) {
        const name = file.originalname;
        const uniqueSuffix = Date.now() + 'squimstech';
        cb(null,uniqueSuffix+name)
    }
})

export default multer({storage:storage})