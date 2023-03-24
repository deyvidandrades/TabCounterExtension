chrome.windows.getCurrent(function (window) {

    chrome.storage.sync.get(["recorde"]).then((result) => {
        carregarListaTabs(window.id, result.recorde)
    });
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

        updateUI(tabs.length, lista_janela_atual.length, lista_janelas.length, recorde.atual, recorde.anterior)
    });
}

function updateUI(numTabs, numTabsAtual, numJanelas, recorde, anterior) {
    document.getElementById('guias').innerHTML = numTabs
    document.getElementById('janelas').innerHTML = `Em ${numJanelas} janelas`

    document.getElementById('atual').innerHTML = numTabsAtual

    document.getElementById('recorde').innerHTML = recorde
    document.getElementById('anterior').innerHTML = `Anterior: ${anterior}`

    salvarDados(recorde, anterior)
}

function salvarDados(recorde, anterior) {
    chrome.storage.sync.set({"recorde": {"atual": recorde, "anterior": anterior}}).then(() => {
    });
}