import React, { FC, useEffect, useId, useState } from 'react';
import './CustomSelect.scss';
// import { Dropdown, DropdownButton } from 'react-bootstrap';
import { DropDownType } from '../../types/enums';

interface Props {
  data: string[],
  title: string,
  type?: DropDownType,
}

export const CustomSelect: FC<Props> = ({ data, title, type }) => {
  const [dropdownItem , setDropdownItem] = useState('');

  const selectId = useId();

  useEffect(() => {
    if (type === DropDownType.pair) {setDropdownItem('XRP/USDT')};
  }, [type]);

  return (
    <div className='custom-select'>
      {/* <DropdownButton
        id='dropdown-basic-button'
        size="sm"
        variant="secondary"
        title={title}
      >
        {data.map((item, idx) => (
          <Dropdown.Item 
            key={idx} 
            eventKey={idx}
            onClick={() => setDropdownItem(item)}
            active={dropdownItem === item}
          >
            {item}
          </Dropdown.Item>
        ))}
      </DropdownButton> */}

    <select className='custom-select__select' name={selectId} defaultValue={title} onChange={(e) => setDropdownItem(e.target.value)}>
      <option value={title} disabled>{title}</option>
      {data.map((item, idx) => (
        <option key={idx} value={item}>{item}</option>
      ))}
    </select>

    {(type === DropDownType.pair) && (
        <div className='custom-select__value'>
          {dropdownItem}
        </div>
      )}

    </div>

  );
};