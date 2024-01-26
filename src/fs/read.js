import * as fsPromises from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import errorHandler from '../libs/fs/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
  try {
    try {
      const content = await fsPromises.readFile(path.join(__dirname, 'files/fileToRead.txt'), { encoding: 'utf8' });

      console.log(content);
    } catch (error) {
      throw Error('FS operation failed');
    }
  } catch (error) {
    errorHandler(error);
  }
};

await read();
