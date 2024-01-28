import { fork, spawn } from "child_process";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const PATH_TO_FILE = path.join(__dirname, "files", "script.js");

const spawnChildProcess = async (args) => {
  const childProcess = fork(PATH_TO_FILE, args);
};

// Put your arguments in function call to test this functionality
spawnChildProcess(/* [someArgument1, someArgument2, ...] */);
