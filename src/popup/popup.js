chrome.windows.getCurrent(function (window) {

    chrome.storage.sync.get(["recorde"]).then((result) => {
        carregarListaTabs(window.id, result.recorde ? result.recorde : {"atual": 0, "anterior": 0, "data": ""})
    });
});

document.getElementById("btn_zerar").addEventListener("click", function () {
    zerarRecordes()
});

function carregarListaTabs(idJanelaAtual, recorde) {
    chrome.tabs.query({}, function (tabs) {
        let lista_janelas = []
        let lista_janela_atual = []

        tabs.forEach(function (tab) {
            if (!lista_janelas.includes(tab.windowId))
                lista_janelas.push(tab.windowId)

            if (tab.windowId === idJanelaAtual)
                lista_janela_atual.push(tab)
        });

        updateUI(tabs.length, lista_janela_atual.length, lista_janelas.length, recorde.atual, recorde.anterior, recorde.data)
    });
}

function updateUI(numTabs, numTabsAtual, numJanelas, recorde, anterior, data) {
    document.getElementById('guias').innerHTML = numTabs
    document.getElementById('janelas').innerHTML = `Em ${numJanelas} janelas`

    document.getElementById('atual').innerHTML = numTabsAtual

    document.getElementById('recorde').innerHTML = recorde

    if (data !== "" && data !== undefined)
        document.getElementById('data').innerHTML = `Em ${data}`

    salvarDados(recorde, anterior)
}

function salvarDados(recorde, anterior) {
    chrome.storage.sync.set({"recorde": {"atual": recorde, "anterior": anterior}}).then(() => {
    });
}

function zerarRecordes() {
    chrome.storage.sync.set({"recorde": {"atual": 0, "anterior": 0}}).then(() => {
    });
}