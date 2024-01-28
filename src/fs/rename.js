import * as fsPromises from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import errorHandler from '../libs/fs/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const rename = async () => {
  try {
    async function renameFile(name, newName) {
      const currentPath = path.join(__dirname, name);
      const futurePath = path.join(__dirname, newName);

      // check does the current file already exist?
      try {
        await fsPromises.access(currentPath);
      } catch (error) {
        throw Error('FS operation failed');
      }

      // check does the future file already exist?
      try {
        await fsPromises.access(futurePath);

        throw new Error('FS operation failed');
      } catch (error) {
        if (error instanceof Error && error.message === 'FS operation failed') {
          throw error;
        }
      }

      // There is change name operation;
      try {
        await fsPromises.rename(currentPath, futurePath);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
        }
      }
    }

    await renameFile('files/wrongFilename.txt', 'files/wrongFilename.md');
  } catch (error) {
    errorHandler(error);
  }
};

await rename();
