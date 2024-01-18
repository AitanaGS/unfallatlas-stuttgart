export function splitStringByHalf(inputString) {
  // Split the input string into an array of words
  const words = inputString.split(' ');

  // Calculate the middle index
  const middleIndex = Math.ceil(words.length / 2);

  // Create two separate arrays
  const firstHalf = words.slice(0, middleIndex);
  const secondHalf = words.slice(middleIndex);

  return [firstHalf.join(' '), secondHalf.join(' ')];
}

export function splitStringOnSlash(inputString) {
  return inputString
    .split(/(\s*\/\s*)/)
    .filter((part) => part.trim() !== '')
    .reduce(
      (acc, part, index, array) => (
        index % 2 === 0
          ? acc.push(part + (array[index + 1] || ''))
          : acc,
        acc
      ),
      []
    );

  // const containsSlash = /\//.test(inputString);

  // const result = containsSlash
  //   ? inputString
  //       .split(/(\s*\/\s*)/)
  //       .filter((part) => part.trim() !== '')
  //       .reduce((acc, part, index, array) => {
  //         if (index % 2 === 0) {
  //           acc.push(part + (array[index + 1] || ''));
  //         }
  //         return acc;
  //       }, [])
  //   : [inputString];

  // return result;
  // return /\//.test(inputString)
  //   ? inputString
  //       .split(/\s*\/\s*/)
  //       .filter((part) => part.trim() !== '')
  //   : [inputString];
  // const containsSlash = /\//.test(inputString);

  // if (containsSlash) {
  //   const separatedParts = inputString
  //     .split(/\s*\/\s*/)
  //     .filter((part) => part.trim() !== '');
  //   return separatedParts;
  // } else {
  //   return [inputString];
  // }
}
