document.addEventListener("DOMContentLoaded", async () => {
    const editor = get("editor");
    const saveBtn = get("saveBtn");
    const runCode = get("runCode");
    const timeToWait = get("timeToWait");

    // Get the current active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const currentUrl = tab.url;
    const currentHost = new URL(currentUrl).host;

    // Load saved data using chrome.storage instead of localStorage
    chrome.storage.local.get([currentHost], (result) => {
        const hostData = result[currentHost] || {};
        editor.value = hostData.code || "";
        runCode.checked = hostData.runCode || false;
        timeToWait.value = hostData.timeToWait || "";
    });

    saveBtn.addEventListener("click", () => {
        const data = {
            code: editor.value,
            runCode: runCode.checked,
            timeToWait: timeToWait.value
        };
        chrome.storage.local.set({ [currentHost]: data }, () => {
            console.log("Saved content:", data);
            showAndHide("Saved - refresh the page to run your code", 3000);
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.ctrlKey && event.key == 's') {
            event.preventDefault();
            saveBtn.click();
        }
    });
});
