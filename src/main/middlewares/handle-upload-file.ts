import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { join } from 'node:path';

const upload = multer({
  dest: join(__dirname, '..', '..', '..', 'tmp'),
});

export const handleUploadFile = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const file = upload.single('file');
  file(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: 'File not found' });
    }

    const sizeInMB = Math.round(req.file.size / 1024 / 1024);

    if (sizeInMB > 1) {
      return res
        .status(400)
        .json({ message: 'File size must be smaller than 1MB' });
    }
    return next();
  });
};
