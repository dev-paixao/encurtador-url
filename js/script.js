function encurtarUrl() {
    // Headers
    let headers = {
        "Content-Type": "application/json",
        "apiKey": "d7e0ae4f5d834b2b90080076c9712c90"
    };

    // Dados
    let inputUrl = document.getElementById("input-url");
    let url = inputUrl.value;

    // Verificar se o link existe
    if (!url) {
        mostrarUrlEncurtada("");
        return;
    }

    // Adicionar "https://" automaticamente se não estiver presente
    if (!url.startsWith("https://") && !url.startsWith("http://")) {
        url = "https://" + url;
    }

    let linkRequest = {
        destination: url,
        domain: { fullName: "rebrand.ly" }
    };

    fetch("https://api.rebrandly.com/v1/links", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(linkRequest)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao encurtar a URL");
            }
            return response.json();
        })
        .then(json => {
            let shortUrl = json.shortUrl;
            mostrarUrlEncurtada(shortUrl);
        })
        .catch(error => {
            console.error(error);
            mostrarUrlEncurtada("");
        });
}

function mostrarUrlEncurtada(urlEncurtada) {
    let inputUrlEncurtada = document.getElementById("input-url-encurtada");
    inputUrlEncurtada.value = urlEncurtada;
}

function copiar() {
    let inputUrlEncurtada = document.getElementById("input-url-encurtada");

    inputUrlEncurtada.select();
    inputUrlEncurtada.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(inputUrlEncurtada.value);
}

