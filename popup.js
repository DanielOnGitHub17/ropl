document.addEventListener("DOMContentLoaded", async () => {
    const editor = get("editor");
    const saveBtn = get("saveBtn");
    const runCode = get("runCode");
    const timeToWait = get("timeToWait");

    // Get the current active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const currentUrl = tab.url;
    const currentHost = new URL(currentUrl).host;

    chrome.webNavigation.onCompleted.addListener((details) => {
        console.log("Navigation completed:", details.url);
    });

    // alert(currentHost);

    // Load saved data
    let hostData = JSON.parse(localStorage.getItem(currentHost)) || {};

    editor.value = hostData.code || "";
    runCode.checked = hostData.runCode || false;
    timeToWait.value = hostData.timeToWait || "";

    saveBtn.addEventListener("click", () => {
        const data = {
            code: editor.value,
            runCode: runCode.checked,
            timeToWait: timeToWait.value
        };
        localStorage.setItem(currentHost, JSON.stringify(data));
        console.log("Saved content:", data);
        // alert("Saved!");
    });

    document.addEventListener("keydown", (event) =>{
        if (event.ctrlKey && event.key == "s") {
            event.preventDefault();
            saveBtn.click();
        }
    });
});