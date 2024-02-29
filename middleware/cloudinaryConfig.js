

const cloudinaryModule = require('cloudinary');
const cloudinary = cloudinaryModule.v2;
require('dotenv').config()
cloudinary.config({ 
  //  cloud_name: "dpagwp2y8",
  //   api_key: "222669724394958",
  //   api_secret:"EZ0r6NZqZ49PICGHAv7uQuC-dmg"
  cloud_name:'dc6cv54k9',
  api_key:'596865293149792',
  api_secret:'uQK3UmEOaLb2wxvKZ1ITz9td1DM'
  });



let uploadMedia = async(file) => {
    // if()
  // console.log("file path ", file.path);
  // console.log(process.env.CLOUDINARY_CLOUD_NAME+" jghghgh")
    if (file.path) {
      
      // if (isImageFile || isVideoFile) {              
      const uploadRes = await cloudinary.uploader.upload(file.path, {
        // use_filename: true,
        resource_type: 'auto'
      });

      if (uploadRes) {
        return uploadRes;
      }
  }
    return false;
}
module.exports=uploadMedia