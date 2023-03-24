chrome.runtime.onInstalled.addListener(() => {
    //salvarDados(87, 82)
    getNumTabs()
});

chrome.tabs.onCreated.addListener((tab) => {
    getNumTabs()
});
chrome.tabs.onRemoved.addListener((tab) => {
    getNumTabs()
});

function getNumTabs() {
    chrome.tabs.query({}, function (tabs) {
        chrome.action.setBadgeText({text: `${tabs.length}`});
        chrome.action.setBadgeBackgroundColor({color: '#A9DED8'});

        chrome.storage.sync.get(["recorde"]).then((result) => {
            let recorde = result.recorde
            if (tabs.length > recorde.anterior) {
                salvarDados(tabs.length, recorde.atual)
            }
        });

    });
}

function salvarDados(recorde, anterior) {
    chrome.storage.sync.set({"recorde": {"atual": recorde, "anterior": anterior}}).then(() => {
    });
}