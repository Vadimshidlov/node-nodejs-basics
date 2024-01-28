import { pipeline } from "node:stream/promises";
import { Transform } from "node:stream";

const readableStreamFromTerminal = process.stdin;
const writableStreamToTerminal = process.stdout;

const transformReverseStream = new Transform({
  transform(chunk, encoding, callback) {
    const chunkToString = chunk.toString().trim();

    const reversedChunk = chunkToString.split("").reverse().join("");

    const data = reversedChunk + "\n";

    callback(null, data);
  },
});

const transform = async () => {
  try {
    await pipeline(
      readableStreamFromTerminal,
      transformReverseStream,
      writableStreamToTerminal,
    );
  } catch (error) {
    console.log(error);
  }
};

await transform();
