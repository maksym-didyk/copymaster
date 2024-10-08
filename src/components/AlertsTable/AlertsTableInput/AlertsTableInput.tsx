import React, { FC, FormEvent, useId, useState } from 'react';

interface Props {
  inputValue?: string,
  placeHolder?: string,
  handler: (newValue: string) => void
}

export const AlertsTableInput: FC<Props> = ({ inputValue = '', placeHolder = '', handler }) => {
  const [value, setValue] = useState(inputValue);
  const id = useId();
  const formId = useId();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    handler(value);
  };

  return (
    <form id={formId} onSubmit={handleSubmit}>
      <input
        id={id}
        type='text'
        maxLength={200}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onBlur={handleSubmit}
        placeholder={value ? '' : placeHolder}
        className='alerts-table__input-comment'
      />
    </form>
  );
};