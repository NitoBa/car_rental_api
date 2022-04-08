import multer from 'multer';
import { randomBytes } from 'node:crypto';
import { resolve } from 'node:path';

export default {
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', '..', folder),
        filename: (req, file, cb) => {
          const fileHash = randomBytes(16).toString('hex');
          const fileName = `${fileHash}-${file.originalname}`;
          return cb(null, fileName);
        },
      }),
    };
  },
};
