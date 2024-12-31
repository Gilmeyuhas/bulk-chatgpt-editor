chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "saveChat") {
    chrome.storage.local.get("projects", (data) => {
      const projects = data.projects || {};
      const projectChats = projects[message.projectName] || [];
      projectChats.push(...message.chats); // Append multiple chats
      projects[message.projectName] = projectChats;
      chrome.storage.local.set({ projects });
      sendResponse({ success: true });
    });
    return true;
  }
});

