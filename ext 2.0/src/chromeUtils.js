export const fetchTabs = () => {
  return new Promise((resolve) => {
    chrome.tabs.query({}, (tabs) => {
      resolve(tabs.map((tab) => ({ title: tab.title, url: tab.url })));
    });
  });
};

export const getLockedTabs = () => {
  return new Promise((resolve) => {
    chrome.storage.local.get("lockedTabs", (data) => {
      resolve(data.lockedTabs || []);
    });
  });
};

export const addLockedTab = (url) => {
  chrome.storage.local.get("lockedTabs", (data) => {
    const updatedTabs = [...(data.lockedTabs || []), url];
    chrome.storage.local.set({ lockedTabs: updatedTabs });
  });
};

export const removeLockedTab = (url) => {
  chrome.storage.local.get("lockedTabs", (data) => {
    const updatedTabs = (data.lockedTabs || []).filter((tab) => tab !== url);
    chrome.storage.local.set({ lockedTabs: updatedTabs });
  });
};
