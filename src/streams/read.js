import * as fs from "node:fs";
import { pipeline } from "node:stream/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const PATH_TO_FILE = path.join(__dirname, "files", "fileToRead.txt");

const read = async () => {
  const readFromFileStream = fs.createReadStream(PATH_TO_FILE);
  const writableToTerminal = process.stdout;

  try {
    await pipeline(readFromFileStream, writableToTerminal);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("ReadStream error");
    }
  }
};

await read();
