import React, { ChangeEvent, ClipboardEvent, FC, useId, useState } from 'react';

interface Props {
  inputValue?: number | string,
  placeHolder?: string
}

export const MarketsTableInput: FC<Props> = ({ inputValue = '', placeHolder = '' }) => {
  const [value, setValue] = useState(inputValue);

  const id = useId();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;

    // Заміна коми на крапку
    newValue = newValue.replace(/,/g, '.');

    // Обмеження 2 цифр після крапки
    const [integerPart, decimalPart] = newValue.split('.');
    if (decimalPart && decimalPart.length > 2) {
      newValue = `${integerPart}.${decimalPart.slice(0, 2)}`;
    }

    // Дозволяємо вводити тільки цифри та один раз крапку
    newValue = newValue.replace(/[^\d.]/g, '');

    // Додаємо додаткову перевірку для запобігання більше ніж одній крапці
    const dotCount = newValue.split('.').length - 1;
    if (dotCount > 1) {
      const lastDotIndex = newValue.lastIndexOf('.');
      newValue = newValue.slice(0, lastDotIndex) + newValue.slice(lastDotIndex + 1);
    }

    setValue(newValue);
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const pastedValue = event.clipboardData.getData('text/plain');
    // Виконуємо ті ж перевірки для вставленого значення
    let newValue = pastedValue.replace(/,/g, '.');
    const [integerPart, decimalPart] = newValue.split('.');
    if (decimalPart && decimalPart.length > 2) {
      newValue = `${integerPart}.${decimalPart.slice(0, 2)}`;
    }
    newValue = newValue.replace(/[^\d.]/g, '');
    const dotCount = newValue.split('.').length - 1;
    if (dotCount > 1) {
      const lastDotIndex = newValue.lastIndexOf('.');
      newValue = newValue.slice(0, lastDotIndex) + newValue.slice(lastDotIndex + 1);
    }

    setValue(newValue);
  };

  return (
    <input
      id={id}
      type='text'
      value={value}
      onChange={handleInputChange}
      onPaste={handlePaste}
      placeholder={placeHolder}
      pattern='[0-9]*\.{0,1}[0-9]{0,8}'
      className='markets-table__input'
    />
  );
};