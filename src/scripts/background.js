chrome.runtime.onInstalled.addListener(() => {
  //salvarDados(87, 82)
  getNumTabs();
});

chrome.tabs.onCreated.addListener((tab) => {
  getNumTabs();
});
chrome.tabs.onRemoved.addListener((tab) => {
  getNumTabs();
});

function getNumTabs() {
  chrome.tabs.query({}, function (tabs) {
    chrome.action.setBadgeText({ text: `${tabs.length}` });
    chrome.action.setBadgeBackgroundColor({ color: "#72cfd6" });

    chrome.storage.sync.get(["recorde"]).then((result) => {
      let recorde = result.recorde;
      if (recorde) {
        if (tabs.length > recorde.anterior) {
          salvarDados(tabs.length, recorde.atual, formatarData());
        }
      }
    });
  });
}

function salvarDados(recorde, anterior, data) {
  chrome.storage.sync.set({ recorde: { atual: recorde, anterior: anterior, data: data } }).then(() => {});
}

function formatarData(date = new Date()) {
  const dia = date.toLocaleString("default", { day: "2-digit" });
  const mes = date.toLocaleString("default", { month: "2-digit" });
  const ano = date.toLocaleString("default", { year: "numeric" });

  return [dia, mes, ano].join("/");
}
