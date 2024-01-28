import path from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'node:fs/promises'

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

import { release, version } from 'os';

import { createServer as createServerHttp } from 'http';

import './files/c.js'

const random = Math.random();

let unknownObject;

if (random > 0.5) {
    const data = await readFile(path.join(__dirname, 'files/a.json'));
    unknownObject = JSON.parse(data);
} else {
    const data = await readFile(path.join(__dirname, 'files/b.json'));
    unknownObject = JSON.parse(data);
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export {
    unknownObject,
    myServer
}


