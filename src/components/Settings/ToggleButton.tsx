import React from 'react';

const ToggleButton = ({ isOn, onToggle }) => {
  return (
    <div
      data-testid="toggle-button"
      className={`min-w-[68px] min-h-[36px] flex items-center rounded-3xl p-1 cursor-pointer transition-colors duration-300 ${
        isOn ? 'bg-primary-default' : 'bg-disabled'
      }`}
      style={{ boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.4)' }}
      onClick={onToggle}
    >
      <div
        data-testid="toggle-indicator"
        className={`bg-white min-w-[30px] min-h-[30px] rounded-full shadow-md transform transition-transform duration-300 ${
          isOn ? 'translate-x-7' : 'translate-x-0'
        }`}
      ></div>
    </div>
  );
};
export default ToggleButton;
