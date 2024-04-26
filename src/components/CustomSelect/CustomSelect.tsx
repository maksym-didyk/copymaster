import React, { FC, useEffect, useId, useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { SymbolType } from '../../types/types';

interface Props {
  data: SymbolType[],
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
      {data.map((item) => (
        <Dropdown.Item
          key={item.id}
          eventKey={item.id}
          onClick={() => handleChange(item.name)}
          active={isSymbols ? customTitle === item.name : dropdownItem === item.name}
          bsPrefix='dropdown-item'
        >
          {item.name}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};