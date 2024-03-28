import React, { ChangeEvent, FC, FormEvent, useId, useState } from 'react';

interface Props {
  inputValue: number | string,
  handler: (newValue: number) => void
}

export const AlertsTableInputAlertPrice: FC<Props> = ({ inputValue, handler }) => {
  const [value, setValue] = useState<string | number>(inputValue);
  const [isEditing, setIsEditing] = useState(false);
  const id = useId();
  const formId = useId();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;

    // Заміна коми на крапку
    newValue = newValue.replace(/,/g, '.');

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

    setValue(newValue);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setIsEditing(() => false);
    handler(+value);
  };

  const handleButtonClick = () => {
    setIsEditing(true);
  };

  return (
    <>
    <form id={formId} onSubmit={handleSubmit}>
      <input
        id={id}
        type='text'
        value={value}
        onChange={handleInputChange}
        onBlur={handleSubmit}
        onFocus={handleButtonClick}
        size={8}
        className={`alerts-table__input-alertprice ${isEditing ? 'active' : ''}`}
        autoComplete='off' />

      <label htmlFor={id} className='btn bg-transparent cursor-pointer' onClick={handleButtonClick}>
        <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.06953 11.8129H2.625C2.50897 11.8129 2.39769 11.7668 2.31564 11.6848C2.2336 11.6028 2.1875 11.4915 2.1875 11.3754V8.93091C2.1873 8.8741 2.19831 8.81781 2.21989 8.76526C2.24148 8.71271 2.27321 8.66493 2.31328 8.62466L8.87578 2.06216C8.91649 2.02082 8.96502 1.98799 9.01853 1.96559C9.07205 1.94318 9.12949 1.93164 9.1875 1.93164C9.24552 1.93164 9.30296 1.94318 9.35647 1.96559C9.40999 1.98799 9.45851 2.02082 9.49922 2.06216L11.9383 4.50122C11.9796 4.54193 12.0124 4.59045 12.0349 4.64397C12.0573 4.69749 12.0688 4.75492 12.0688 4.81294C12.0688 4.87096 12.0573 4.92839 12.0349 4.98191C12.0124 5.03543 11.9796 5.08395 11.9383 5.12466L5.37578 11.6872C5.33551 11.7272 5.28774 11.759 5.23519 11.7805C5.18264 11.8021 5.12634 11.8131 5.06953 11.8129V11.8129Z" stroke="#8997dc" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7.4375 3.5L10.5 6.5625" stroke="#8997DC" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </label>
    </form>
    </>
  );
};