import React, { useEffect, useState } from 'react';
import TabItem from './TabItem';

const TabList = ({ lockedTabs }) => {
  const [openTabs, setOpenTabs] = useState([]);
  const [tabsLocked, setTabsLocked] = useState(lockedTabs);

  useEffect(() => {
    chrome.tabs.query({}, (tabs) => {
      const tabsUrl = tabs.map((tab) => tab.url);
      setOpenTabs(tabsUrl);
    });
  }, []);

  const updateLockedTabs = (newLockedTabs) => {
    setTabsLocked(newLockedTabs);  // Update the state
  };

  return (
    <div className="tab-list">
      <h3>Locked Tabs</h3>
      {tabsLocked.length === 0 && <p>No tabs locked</p>}
      {tabsLocked.map((url, index) => (
        <TabItem key={index} url={url} updateLockedTabs={updateLockedTabs} />
      ))}

      <h3>Open Tabs</h3>
      {openTabs.length === 0 && <p>No open tabs</p>}
      {openTabs.filter(url => !tabsLocked.includes(url)).map((url, index) => (
        <div key={index} className="tab-item">
          <span>{url}</span>
          <button onClick={() => {
            chrome.storage.local.set({ lockedTabs: [...tabsLocked, url] }, () => {
              updateLockedTabs([...tabsLocked, url]);  // Update the state after adding
            });
          }}>
            Add
          </button>
        </div>
      ))}
    </div>
  );
};

export default TabList;
