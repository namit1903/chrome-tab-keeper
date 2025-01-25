import React, { useState, useEffect } from 'react';
import TabLockSlider from './TabLockSlider';
import TabList from './TabList';
import './popup.css';

const App = () => {
  const [lockedTabs, setLockedTabs] = useState([]);
  const [isExtensionEnabled, setIsExtensionEnabled] = useState(true);

  useEffect(() => {
    chrome.storage.local.get('lockedTabs', (data) => {
      setLockedTabs(data.lockedTabs || []);
    });
  }, []);

  const handleToggleExtension = () => {
    setIsExtensionEnabled((prevState) => !prevState);
  };

  return (
    <div className="popup-container">
      <TabLockSlider isEnabled={isExtensionEnabled} onToggle={handleToggleExtension} />
      <TabList lockedTabs={lockedTabs} />
    </div>
  );
};

export default App;
