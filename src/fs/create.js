import * as fsPromises from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const newFilePath = path.resolve(__dirname, 'files/fresh.txt');

const content = 'I am fresh and young';

const create = async () => {
  try {
    try {
      await fsPromises.writeFile(newFilePath, content, { flag: 'wx+' });
    } catch (e) {
      throw new Error('FS operation failed');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

await create();
