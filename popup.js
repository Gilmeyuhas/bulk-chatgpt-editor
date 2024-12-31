document.getElementById("saveChats").addEventListener("click", () => {
  const projectName = document.getElementById("projectName").value.trim();
  if (!projectName) {
    document.getElementById("status").innerText = "Please enter a project name.";
    return;
  }

  // Get selected chats from the content script
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getSelectedChats" }, (response) => {
      if (response && response.chats.length > 0) {
        chrome.runtime.sendMessage(
          { action: "saveChat", projectName, chats: response.chats },
          (res) => {
            if (res.success) {
              document.getElementById("status").innerText = "Chats saved successfully!";
            } else {
              document.getElementById("status").innerText = "Failed to save chats.";
            }
          }
        );
      } else {
        document.getElementById("status").innerText = "No chats selected.";
      }
    });
  });
});

