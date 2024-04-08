import React, { FC, useEffect, useId, useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

interface Props {
  data: string[],
  title: string,
  value?: string,
  isSymbols?: boolean,
  handler?: (item: string) => void
}

export const CustomSelect: FC<Props> = ({ data, title, value = '', isSymbols = false, handler }) => {
  const [dropdownItem , setDropdownItem] = useState('');
  const dropdownId = useId();
  const customTitle = isSymbols ? dropdownItem : title;

  const handleChange = (item: string) => {
    if (handler) {
      handler(item);
    } else {
      setDropdownItem(() => item);
    }
  };

  useEffect(() => {
    if (isSymbols) {setDropdownItem(title)};
    if (value !== '') {setDropdownItem(value)};
  }, [isSymbols, title, value]);

  return (
    <DropdownButton
      id={dropdownId}
      variant="dark"
      title={customTitle}
      data-bs-theme='dark'
    >
      {data.map((item, idx) => (
        <Dropdown.Item
          key={idx}
          eventKey={idx}
          onClick={() => handleChange(item)}
          active={isSymbols ? customTitle === item : dropdownItem === item}
          bsPrefix='dropdown-item'
        >
          {item}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};