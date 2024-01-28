import * as fs from "node:fs";
import { pipeline } from "node:stream/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const PATH_TO_FILE = path.join(__dirname, "files", "fileToWrite.txt");

const write = async () => {
  const readableFromTerminalStream = process.stdin;
  const writableToFileStream = fs.createWriteStream(PATH_TO_FILE, {
    flags: "a",
  });

  try {
    await pipeline(readableFromTerminalStream, writableToFileStream);
  } catch (error) {
    console.log(error);
  }
};

await write();
