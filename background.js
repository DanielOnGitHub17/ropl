chrome.webNavigation.onCommitted.addListener(async (details) => {
    if (details.frameId !== 0) return;

    const url = new URL(details.url);
    const host = url.host;

    chrome.storage.local.get([host], async (result) => {
        const hostData = result[host];
        if (hostData && hostData.runCode && hostData.code) {
            const delay = parseInt(hostData.timeToWait) || 0;

            setTimeout(async () => {
                try {
                    await chrome.scripting.executeScript({
                        target: { tabId: details.tabId },
                        world: "MAIN",
                        func: (code) => eval(code),
                        args: [hostData.code]
                    });
                    console.log("ROPL: Code executed successfully");
                } catch (error) {
                    console.error("ROPL: Error executing code:", error);
                }
            }, delay);
        }
    });
});
