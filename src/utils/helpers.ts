import bigDecimal from 'js-big-decimal';

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

export const showProgress = (value: number) => {
  return value < 30 ? '' : `${value}%`;
};

export const takeAverage = (partNumber: number | bigDecimal, number: number | bigDecimal) => {
  const numPart = (partNumber instanceof bigDecimal) ? partNumber : new bigDecimal(partNumber);
  const numAll = (number instanceof bigDecimal) ? number : new bigDecimal(number);

  return Number(numPart.divide(numAll).multiply(new bigDecimal('100')).getValue());
}