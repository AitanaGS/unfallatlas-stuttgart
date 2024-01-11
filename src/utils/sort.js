export const sortArrayByReferenceArray = (referenceArray) => {
  return (a, b) => {
    const indexA = referenceArray.indexOf(a);
    const indexB = referenceArray.indexOf(b);

    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }

    if (indexA === -1) {
      return -1;
    }

    return 1;
  };
};
