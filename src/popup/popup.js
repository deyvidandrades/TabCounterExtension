chrome.windows.getCurrent(function (window) {
  chrome.storage.sync.get(["recorde"]).then((result) => {
    carregarListaTabs(window.id, result.recorde ? result.recorde : { atual: 0, anterior: 0, data: "" });
  });
});

document.getElementById("btn_zerar").addEventListener("click", function () {
  zerarRecordes();
});

//Localization
document.getElementById("guias_abertas").innerText = chrome.i18n.getMessage("guias_abertas");
document.getElementById("guias_janela_atual").innerText = chrome.i18n.getMessage("guias_janela_atual");
document.getElementById("recorde_atual").innerText = chrome.i18n.getMessage("recorde_atual");
document.getElementById("resumo").innerText = chrome.i18n.getMessage("resumo");
document.getElementById("criado_por").innerText = chrome.i18n.getMessage("criado_por");

function carregarListaTabs(idJanelaAtual, recorde) {
  chrome.tabs.query({}, function (tabs) {
    let lista_janelas = [];
    let lista_janela_atual = [];

    tabs.forEach(function (tab) {
      if (!lista_janelas.includes(tab.windowId)) lista_janelas.push(tab.windowId);

      if (tab.windowId === idJanelaAtual) lista_janela_atual.push(tab);
    });

    updateUI(tabs.length, lista_janela_atual.length, lista_janelas.length, recorde.atual, recorde.anterior, recorde.data);
  });
}

function updateUI(numTabs, numTabsAtual, numJanelas, recorde, anterior, data) {
  document.getElementById("guias").innerHTML = numTabs;
  document.getElementById("janelas").innerHTML = `${chrome.i18n.getMessage("em")} ${numJanelas} ${chrome.i18n.getMessage("janelas")}`;

  document.getElementById("atual").innerHTML = numTabsAtual;

  document.getElementById("recorde").innerHTML = recorde;

  if (data !== "" && data !== undefined) document.getElementById("data").innerHTML = `${chrome.i18n.getMessage("em")} ${data}`;

  salvarDados(recorde, anterior, data);
}

function salvarDados(recorde, anterior, data) {
  chrome.storage.sync.set({ recorde: { atual: recorde, anterior: anterior, data: data } }).then(() => {});
}

function zerarRecordes() {
  chrome.storage.sync.set({ recorde: { atual: 0, anterior: 0, data: "" } }).then(() => {});
}
