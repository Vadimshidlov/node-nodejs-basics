import * as fsPromises from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const list = async () => {
  try {
    const getFilesNames = async (currentPath) => {
      const result = [];

      const data = await fsPromises.readdir(currentPath, { withFileTypes: true });

      for (let file of data) {
        if (file.isFile()) {
          result.push(file.name);
        } else if (file.isDirectory()) {
          const nestedFiles = await getFilesNames(path.join(currentPath, file.name));

          result.push(...nestedFiles);
        }
      }

      return result;
    };

    const finalData = await getFilesNames(path.join(__dirname, 'files'));

    console.log(finalData);
  } catch (error) {
    throw Error('FS operation failed');
  }
};

await list();
