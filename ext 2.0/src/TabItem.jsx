import React from 'react';

const TabItem = ({ url, updateLockedTabs }) => {
  const handleRemove = () => {
    chrome.storage.local.get("lockedTabs", (data) => {
      const newTabs = data.lockedTabs.filter(tab => tab !== url);
      chrome.storage.local.set({ lockedTabs: newTabs }, () => {
        updateLockedTabs(newTabs);  // Update state after removal
      });
    });
  };

  return (
    <div className="tab-item">
      <span>{url}</span>
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
};

export default TabItem;
