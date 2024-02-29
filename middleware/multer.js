const multer= require('multer')


const multerStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public')
    },
    filename:(req,file,cb)=>{
const ext=file.mimetype.split('/')[1]

cb(null,`user-$-${Date.now()}.${ext}`)
    }
})

const multerFilter=(req,file,cb)=>{
    if(file.mimetype.startsWith('image'))
    {
        cb(null,true)
    }else{
        cb('not a image please upload only images ',false)
    }


}

const upload=multer({
    storage:multerStorage,
    fileFilter:multerFilter
});

module.exports=upload