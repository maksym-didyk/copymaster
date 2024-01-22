import React, { ChangeEvent, ClipboardEvent, FC } from 'react';

interface Props {
  inputValue: number | string,
  setInputValue: (value: number | string) => void,
}

export const CalculatorInput: FC<Props> = ({ inputValue, setInputValue }) => {

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;

    // Заміна коми на крапку
    newValue = newValue.replace(/,/g, '.');

    // // Обмеження 8 символів перед крапкою
    // const dotIndex = newValue.indexOf('.');
    // if (dotIndex !== -1) {
    //   let integerPart = newValue.substring(0, dotIndex);
    //   const decimalPart = newValue.substring(dotIndex + 1);
    //   if (integerPart.length > 8) {
    //     integerPart = integerPart.slice(0, 8);
    //   }
    //   newValue = `${integerPart}.${decimalPart}`;
    // }

    // Обмеження 8 цифр після крапки
    const [integerPart, decimalPart] = newValue.split('.');
    if (decimalPart && decimalPart.length > 8) {
      newValue = `${integerPart}.${decimalPart.slice(0, 8)}`;
    }

    // Дозволяємо вводити тільки цифри та один раз крапку
    newValue = newValue.replace(/[^\d.]/g, '');

    // Додаємо додаткову перевірку для запобігання більше ніж одній крапці
    const dotCount = newValue.split('.').length - 1;
    if (dotCount > 1) {
      const lastDotIndex = newValue.lastIndexOf('.');
      newValue = newValue.slice(0, lastDotIndex) + newValue.slice(lastDotIndex + 1);
    }

    setInputValue(newValue);
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const pastedValue = event.clipboardData.getData('text/plain');
    // Виконуємо ті ж перевірки для вставленого значення
    let newValue = pastedValue.replace(/,/g, '.');
    const [integerPart, decimalPart] = newValue.split('.');
    if (decimalPart && decimalPart.length > 8) {
      newValue = `${integerPart}.${decimalPart.slice(0, 8)}`;
    }
    newValue = newValue.replace(/[^\d.]/g, '');
    const dotCount = newValue.split('.').length - 1;
    if (dotCount > 1) {
      const lastDotIndex = newValue.lastIndexOf('.');
      newValue = newValue.slice(0, lastDotIndex) + newValue.slice(lastDotIndex + 1);
    }

    setInputValue(newValue);
  };

  return (
    <input
      type='text'
      value={inputValue}
      onChange={handleInputChange}
      onPaste={handlePaste}
      placeholder=''
      pattern='[0-9]*\.{0,1}[0-9]{0,8}'
      className='calculator__input'
    />
  );
};