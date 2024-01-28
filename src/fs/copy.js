import * as fsPromises from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const copyFolder = async (folderPath, futureFolderPath) => {
  await fsPromises.mkdir(futureFolderPath, { recursive: true });

  const folder = await fsPromises.readdir(folderPath, {
    withFileTypes: true,
  });

  for (let item of folder) {
    if (item.isDirectory()) {
      await copyFolder(path.join(folderPath, item.name), path.join(futureFolderPath, item.name));
    } else {
      await fsPromises.copyFile(path.join(folderPath, item.name), path.join(futureFolderPath, item.name));
    }
  }
};

const copy = async () => {
  try {
    try {
      const stats = await fsPromises.stat(path.join(__dirname, 'files_copy'));

      if (stats.isDirectory()) {
        throw new Error('FS operation failed');
      }
    } catch (error) {
      if (error instanceof Error && error.message === 'FS operation failed') {
        console.log(error);

        return;
      }
    }

    try {
      await fsPromises.stat(path.join(__dirname, 'files'));
    } catch (error) {
      throw new Error('FS operation failed');
    }

    await copyFolder(path.join(__dirname, 'files'), path.join(__dirname, 'files_copy'));
  } catch (error) {
    console.log(error);
  }
};

await copy();
