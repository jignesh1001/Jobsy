import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv"

dotenv.config()

cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET // Click 'View API Keys' above to copy your API secret
    });

cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/sample.jpg")
  .then(res => console.log("cloudinary connected...", res.secure_url))
  .catch(err => console.error("Cloudinary upload error:", err));


export default cloudinary