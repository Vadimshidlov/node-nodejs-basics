import * as fs from 'node:fs';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const PATH_TO_FILE = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');

const calculateHash = async () => {
  // Write your code here
  const doItWell = async () => {
    const hash = crypto.createHash('sha256');
    const content = fs.createReadStream(PATH_TO_FILE);

    return new Promise((resolve, reject) => {
      content.on('readable', () => {
        const data = content.read();

        if (data) {
          hash.update(data);
        } else {
          resolve(hash.digest('hex'));
        }
      });

      content.on('error', reject);
    });
  };

  try {
    const hash = await doItWell();
    console.log(hash);
  } catch (error) {
    console.log(error);
  }
};

await calculateHash();
