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
