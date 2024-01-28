import * as os from "os";
import { Worker } from "worker_threads";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const PATH_TO_WORKER = path.join(__dirname, "worker.js");

const performCalculations = async () => {
  const countOfCores = os.cpus().length;
  let count = 10;
  const arrPromises = [];

  for (let i = 0; i < countOfCores; i++) {
    const promise = new Promise((resolve, reject) => {
      const worker = new Worker(PATH_TO_WORKER, {
        workerData: count++,
      });

      worker.on("message", (res) => {
        resolve(res);
      });

      worker.on("error", (err) => {
        reject(err);
      });
    });

    arrPromises.push(promise);
  }

  const res = await Promise.allSettled(arrPromises);

  const finallyResult = res.reduce((acc, el, index) => {
    const currentData = {};

    if (el.status === "fulfilled") {
      currentData.status = "resolved";
      currentData.data = el.value;

      acc.push(currentData);
      return acc;
    }

    if (el.status === "rejected") {
      currentData.status = "error";
      currentData.data = null;

      acc.push(currentData);
      return acc;
    }
  }, []);

  console.log(finallyResult);
};

await performCalculations();
