import multer, { FileFilterCallback } from 'multer';
import path from 'path';


const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, './uploads'); 
  },

  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname); 
    const filename = Date.now() + extname; 
  }
});


const fileFilter = (req: any, file: Express.Multer.File, cb: FileFilterCallback): void => {
  const filetypes = /jpeg|jpg|png|gif/; 
  const mimetype = filetypes.test(file.mimetype); 
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); 

  if (mimetype && extname) {
    cb(null, true); 
  } else {
    cb(new Error('Solo se permiten imágenes')); 
  }
};

const upload = multer({ storage, fileFilter });

export default upload;


