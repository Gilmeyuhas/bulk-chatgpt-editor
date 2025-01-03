console.log("Background script loaded");

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ projects: {} });
  console.log("Project storage initialized.");
});
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
  
  // Initialize projects storage if not present
  chrome.storage.local.get("projects", (data) => {
    if (!data.projects) {
      chrome.storage.local.set({ projects: {} }, () => {
        console.log("Initialized empty projects storage.");
      });
    }
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getUserInfo") {
    chrome.identity.getProfileUserInfo({ accountStatus: "ANY" }, (userInfo) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        sendResponse({ error: chrome.runtime.lastError.message });
      } else {
        sendResponse({ userInfo: userInfo });
      }
    });
    return true; // Will respond asynchronously
  }
});

console.log("Background script setup complete");
