import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const tipos = [
            'image/jpeg',
            'image/png',
            'image/gif'
        ];

        if (tipos.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Formato inválido'));
        }
    }
});

export default upload;