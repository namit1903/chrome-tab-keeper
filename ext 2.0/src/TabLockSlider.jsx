import React from 'react';

const TabLockSlider = ({ isEnabled, onToggle }) => {
  return (
    <div className="slider-container">
      <label className="switch">
        <input type="checkbox" checked={isEnabled} onChange={onToggle} />
        <span className="slider"></span>
      </label>
      <span>{isEnabled ? 'Extension Enabled' : 'Extension Disabled'}</span>
    </div>
  );
};

export default TabLockSlider;
