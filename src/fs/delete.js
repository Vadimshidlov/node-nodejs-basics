import * as fsPromises from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import errorHandler from '../libs/fs/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const remove = async () => {
  try {
    try {
      await fsPromises.rm(path.join(__dirname, 'files/fileToRemove.txt'));
    } catch (error) {
      throw Error('FS operation failed');
    }
  } catch (error) {
    errorHandler(error);
  }
};

await remove();
