import bigDecimal from 'js-big-decimal';

export const capitalizeFirstLetter = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const milisecondsToDate = (miliseconds: number): string => {
  const dateObject = new Date(miliseconds);

  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObject.getDate().toString().padStart(2, '0');

  return `${day}.${month}.${year}`;
};

export const showProgress = (value: number) => {
  return value < 30 ? '' : `${value}%`;
};

export const takeAverage = (partNumber: number | bigDecimal, number: number | bigDecimal) => {
  if (number === 0) { return 0 }
  const numPart = (partNumber instanceof bigDecimal) ? partNumber : new bigDecimal(partNumber);
  const numAll = (number instanceof bigDecimal) ? number : new bigDecimal(number);

  return Number(numPart.divide(numAll).multiply(new bigDecimal('100')).round().getValue());
}

export const searchByName = (array: any, searchTerm: any) => {
  return array.filter((item: { name: string; }) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}