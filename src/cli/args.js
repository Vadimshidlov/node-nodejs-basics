const parseArgs = () => {
  const argumentsList = process.argv.slice(2);
  const resultList = [];

  for (let i = 0; i < argumentsList.length; i += 2) {
    const firstPart = argumentsList[i].slice(2);
    const secondPart = argumentsList[i + 1];

    const stringOfArgRepresentation = `${firstPart} is ${secondPart}`;
    resultList.push(stringOfArgRepresentation);
  }

  console.log(resultList.join(', '));
};

parseArgs();
