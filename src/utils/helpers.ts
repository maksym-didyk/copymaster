export const capitalizeFirstLetter = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const milisecondsToDate = (miliseconds: number): string => {
  const dateObject = new Date(miliseconds);

  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1; // Months are 0 indexed, so we add 1
  const day = dateObject.getDate();

  return `${day}.${month}.${year}`;
};