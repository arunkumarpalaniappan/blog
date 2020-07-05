import React, {useState} from 'react';
import useDarkMode from 'use-dark-mode';
import ToggleButton from 'react-toggle-button'

const Check = () => (
    <svg width="14" height="10" viewBox="0 0 14 11" xmlns="http://www.w3.org/2000/svg">
      <title>
      Switch Color Theme
      </title>
      <path
        d="M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0"
        fill="#fff" fillRule="evenodd"
      />
    </svg>
  );
  
const X = () => (
    <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
      <title>
        Switch Color Theme
      </title>
      <path
        d="M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12"
        fill="#fff" fillRule="evenodd"
      />
    </svg>
  );

const DarkModeToggle = () => {
  const darkMode = useDarkMode(false);
  const [value, setValue] = useState(darkMode.value);
  return (
    <div className={'theme-toggle-button'}>
      Dark Theme :  <ToggleButton
                            inactiveLabel={<X/>}
                            activeLabel={<Check/>}
                            value={value}
                            onToggle={(value) => {
                               if(!value) darkMode.enable();
                               else darkMode.disable();
                               setValue(!value);
                            }} />
    </div>
  );
};

export default DarkModeToggle;
