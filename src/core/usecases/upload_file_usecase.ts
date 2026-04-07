import { join } from 'path';
import * as fs from 'fs';
import * as multer from 'multer';

export default function UploadFileUsecase(
  directory: string,
  file: Express.Multer.File
): string {
  const categoryAssetsPath = join(
    __dirname,
    '..',
    '..',
    '..',
    'public',
    'upload',
    directory,
  );

  try {
    // Synchronously check if directory exists, create if not
    fs.statSync(categoryAssetsPath);
  } catch (err) {
    if (err.code === 'ENOENT') {
      createDirSync(categoryAssetsPath);
    }
  }

  const originalFileName = file.originalname;
  const filePath = join(categoryAssetsPath, originalFileName);

  // Synchronously write the file
  fs.writeFileSync(filePath, file.buffer);

  return originalFileName;
}

const createDirSync = (path: string) => {
  // Synchronously create directory
  fs.mkdirSync(path, { recursive: true });
};
