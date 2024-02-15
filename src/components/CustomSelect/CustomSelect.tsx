import React, { FC, useEffect, useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

interface Props {
  data: string[],
  title: string,
  isSymbols?: boolean,
  handler?: (item: string) => void
}

export const CustomSelect: FC<Props> = ({ data, title, isSymbols = false, handler }) => {
  const [dropdownItem , setDropdownItem] = useState('');

  const handleChange = (item: string) => {
    if (handler) {
      handler(item);
    } else {
      setDropdownItem(() => item)
    }
  }

  // const selectId = useId();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const customTitle = isSymbols ? dropdownItem : title;

  useEffect(() => {
    if (isSymbols) {setDropdownItem(title)};
  }, [isSymbols, title]);

  return (
    <DropdownButton
      id='dropdown-basic-button'
      variant="dark"
      title={title}
      data-bs-theme='dark'
    >
      {data.map((item, idx) => (
        <Dropdown.Item 
          key={idx} 
          eventKey={idx}
          onClick={() => handleChange(item)}
          active={title === item}
          bsPrefix='dropdown-item'
        >
          {item}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};