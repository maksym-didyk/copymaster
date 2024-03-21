import React, { FC, FormEvent, useId, useState } from 'react';

interface Props {
  inputValue?: string,
  placeHolder?: string,
  handler: (newValue: string) => void
}

export const AlertsTableInput: FC<Props> = ({ inputValue = '', placeHolder = '', handler }) => {
  const [value, setValue] = useState(inputValue);
  const id = useId();
  // const customValue = handler ? inputValue : value;

  // const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const newValue = event.target.value;

  //   if (handler) {
  //     handler(newValue);
  //   } else {
  //     setValue(newValue);
  //   }
  // };

  const handleInputBlur = (event: FormEvent) => {
    event.preventDefault();
    handler(value);
  };

  return (
    <form onSubmit={handleInputBlur}>
      <input
        id={id}
        type='text'
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onBlur={handleInputBlur}
        placeholder={value ? '' : placeHolder}
        className='alerts-table__input-comment'
      />
    </form>
  );
};