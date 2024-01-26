const parseEnv = () => {
  const arr = Object.entries(process.env);

  const resultArr = [];

  for (let element of arr) {
    const key = element[0];
    const value = element[1];

    if (key.startsWith('RSS_')) {
      const str = `${key}=${value}`;
      resultArr.push(str);
    }
  }

  console.log(resultArr.join('; '));
};

parseEnv();
