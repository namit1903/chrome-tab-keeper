// background.js

chrome.runtime.onInstalled.addListener(() => {
  // Initialize locked tabs if not set
  chrome.storage.local.get("lockedTabs", (data) => {
    if (!data.lockedTabs) {
      chrome.storage.local.set({ lockedTabs: [] });
    }
  });
});

// On Chrome startup, open the locked tabs
chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get("lockedTabs", (data) => {
    const lockedTabs = data.lockedTabs || [];
    lockedTabs.forEach((url) => {
      chrome.tabs.create({ url });
    });
  });
});

// Listener for locking/unlocking tabs
chrome.action.onClicked.addListener((tab) => {
  chrome.storage.local.get("lockedTabs", (data) => {
    const lockedTabs = data.lockedTabs || [];
    const tabUrl = tab.url;

    if (lockedTabs.includes(tabUrl)) {
      const newTabs = lockedTabs.filter(url => url !== tabUrl);
      chrome.storage.local.set({ lockedTabs: newTabs });
    } else {
      lockedTabs.push(tabUrl);
      chrome.storage.local.set({ lockedTabs });
    }
  });
});
