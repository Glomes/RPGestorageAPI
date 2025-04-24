import multer from 'multer';
import path from 'path';
//codigo externo integrado a api


const imagensFolder = '../uploads/imagens';
const pdfsFolder = '../uploads/pdfs';


import fs from 'fs';
if (!fs.existsSync(imagensFolder)) {
  fs.mkdirSync(imagensFolder, { recursive: true });
}
if (!fs.existsSync(pdfsFolder)) {
  fs.mkdirSync(pdfsFolder, { recursive: true });
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    // Se for imagem (jpg, jpeg, png), salva na pasta 'imagens'
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
      cb(null, imagensFolder);
    }
    // Se for PDF, salva na pasta 'pdfs'
    else if (ext === '.pdf') {
      cb(null, pdfsFolder);
    } else {
      cb(new Error('Tipo de arquivo não permitido. Aceite imagens (jpg, jpeg, png) e PDF.'), false);
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${file.originalname}`; // Nome único para evitar conflitos
    cb(null, filename);
  }
});


const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.pdf') {
    cb(null, true); // Arquivo permitido
  } else {
    cb(new Error('Tipo de arquivo não permitido. Aceite imagens (jpg, jpeg, png) e PDF.'), false); // Arquivo não permitido
  }
};


const upload = multer({
  storage: storage,
  fileFilter: fileFilter 
});

export default upload;
