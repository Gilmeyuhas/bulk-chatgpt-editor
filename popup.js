function loadGlobalsThenExecute(tabId, secondaryScript, func, args = []) {
  console.log("Loading globals and secondary script:", secondaryScript);

  // Load globals.js and utils.js first
  chrome.scripting.executeScript(
    {
      target: { tabId: tabId },
      files: ["globals.js", "utils.js"],
    },
    () => {
      console.log("Loaded globals.js and utils.js");

      // Load the secondary script
      chrome.scripting.executeScript(
        {
          target: { tabId: tabId },
          files: [secondaryScript],
        },
        () => {
          console.log(`Executed script: ${secondaryScript}`);

          // Execute the inline function after loading scripts
          chrome.scripting.executeScript(
            {
              target: { tabId: tabId },
              func: func,
              args: args,
            },
            (results) => {
              console.log("Function executed with results:", results);
            }
          );
        }
      );
    }
  );
}

function addButtonListener(buttonId, scriptName) {
  document.getElementById(buttonId).addEventListener("click", () => {
    console.log(`Button clicked: ${buttonId}, executing script: ${scriptName}`);
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (tab) {
        loadGlobalsThenExecute(tab.id, scriptName, () => {
          console.log(`Script executed for button: ${buttonId}`);
        });
      } else {
        console.error("No active tab found.");
      }
    });
  });
}


// Handle "Add to Project" logic
document.getElementById("add-to-project").addEventListener("click", () => {
  const projectName = document.getElementById("project-name").value.trim();
  console.log("Add to Project clicked. Project Name:", projectName);

  if (!projectName) {
    alert("Please enter a project name.");
    console.error("Project name is empty.");
    return;
  }

  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (tab) {
      console.log("Executing bulkAddToProjects.js with projectName:", projectName);

      loadGlobalsThenExecute(
        tab.id,
        "bulkAddToProjects.js",
        (name) => {
          // This function runs in the context of the target tab
          console.log("Running bulkAddToProjects for project:", name);
          bulkAddToProjects(name);
        },
        [projectName]
      );
    } else {
      console.error("No active tab found.");
    }
  });
});
function initializeButtons() {
  addButtonListener("add-checkboxes", "addCheckboxes.js");
  addButtonListener("bulk-delete", "bulkDeleteConversations.js");
  addButtonListener("toggle-checkboxes", "toggleCheckboxes.js");
  addButtonListener("remove-checkboxes", "removeCheckboxes.js");
}

document.addEventListener("DOMContentLoaded", function () {
  initializeButtons();
});

