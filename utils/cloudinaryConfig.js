import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === "production" });
import cloudinary from "cloudinary";
const uploader = cloudinary.v2.uploader;
const cloudinaryConfig = (req, res, next) => {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  next();
};
export { cloudinaryConfig, uploader };
