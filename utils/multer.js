import DatauriParser from "datauri/parser.js";
import path from "path";
import multer from "multer";
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single("image");
const parser = new DatauriParser();

//converts buffer to data url
const formatBufferTo64 = (file) => {
  return parser.format(path.extname(file.originalname).toString(), file.buffer);
};

export { multerUploads, formatBufferTo64 };
