import { createGzip } from 'zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { rm } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const PATH_TO_FILE = path.join(__dirname, 'files', 'fileToCompress.txt');
const FUTURE_PATH_TO_FILE = path.join(__dirname, 'files', 'archive.gz');

const compress = async () => {
  const readStream = createReadStream(PATH_TO_FILE);
  const writeStream = createWriteStream(FUTURE_PATH_TO_FILE);
  const gzip = createGzip();

  try {
    await pipeline(readStream, gzip, writeStream);
    await rm(PATH_TO_FILE);
  } catch (error) {
    console.log(error);
  }
};

await compress();
