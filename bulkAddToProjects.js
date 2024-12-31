async function bulkAddToProjects(projectName) {
  console.log("bulkAddToProjects.js loaded");
  console.log("Adding to project:", projectName);

  const selectedConversations = [...document.querySelectorAll(".conversation-checkbox:checked")];
  if (!selectedConversations.length) {
    console.error("No conversations selected.");
    alert("Please select at least one conversation.");
    return;
  }

  console.log(`Selected conversations for project ${projectName}:`, selectedConversations);

  // Update local storage
  chrome.storage.local.get("projects", (data) => {
    const projects = data.projects || {};
    if (!projects[projectName]) {
      projects[projectName] = [];
    }

    const newChats = selectedConversations.map((checkbox) => checkbox.dataset.index);
    projects[projectName] = [...new Set([...projects[projectName], ...newChats])];

    chrome.storage.local.set({ projects }, () => {
      console.log(`Successfully added chats to project "${projectName}":`, newChats);
      alert(`Successfully added ${newChats.length} chats to project "${projectName}".`);
    });
  });
}

