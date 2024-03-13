export function splitStringByHalf(inputString) {
  const words = inputString.split(' ');
  const middleIndex = Math.ceil(words.length / 2);
  const firstHalf = words.slice(0, middleIndex);
  const secondHalf = words.slice(middleIndex);

  return [firstHalf.join(' '), secondHalf.join(' ')];
}

export function splitStringOnSlash(inputString) {
  const parts = inputString.split(/(\s*\/\s*)/);

  if (parts.length === 1 || parts.every((part) => part.length <= 6)) {
    return [inputString];
  }

  return parts
    .filter((part) => part.trim() !== '')
    .reduce((acc, part, index, array) => {
      if (index % 2 === 0) {
        const combinedPart = part + (array[index + 1] || '');
        if (combinedPart.length > 6) {
          acc.push(combinedPart);
        }
      }
      return acc;
    }, []);
}
