// Wait for the DOM to load completely
window.addEventListener("load", () => {
  const chatListSelector = ".chat-list-item"; // Replace with the actual selector for chat list items

  function addCheckboxesToChats() {
    const chatItems = document.querySelectorAll(chatListSelector);

    chatItems.forEach((chatItem) => {
      if (!chatItem.querySelector(".chat-checkbox")) {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "chat-checkbox";
        checkbox.style.marginRight = "10px";
        checkbox.dataset.chatId = chatItem.innerText.trim(); // Use chat text or another unique identifier
        chatItem.prepend(checkbox);
      }
    });
  }

  // Observe changes in the chat list to add checkboxes dynamically
  const chatList = document.querySelector(chatListSelector)?.parentNode; // Adjust as needed
  if (chatList) {
    const observer = new MutationObserver(addCheckboxesToChats);
    observer.observe(chatList, { childList: true });
  }

  // Initialize checkboxes for currently loaded chats
  addCheckboxesToChats();
});

