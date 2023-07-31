// Função para encurtar a URL usando a API da Rebrandly
function encurtarUrl() {
    // Definir os headers necessários para a chamada da API
    let headers = {
        "Content-Type": "application/json",
        "apiKey": "d7e0ae4f5d834b2b90080076c9712c90"
    };

    // Obter o elemento de entrada da URL original
    let inputUrl = document.getElementById("input-url");
    let url = inputUrl.value;

    // Verificar se o campo da URL original está vazio
    if (!url) {
        // Se estiver vazio, mostrar o campo da URL encurtada como vazio também
        mostrarUrlEncurtada("");
        return;
    }

    // Adicionar "https://" automaticamente se não estiver presente na URL original
    if (!url.startsWith("https://") && !url.startsWith("http://")) {
        url = "https://" + url;
    }

    // Montar o objeto de requisição com a URL original e o domínio da Rebrandly
    let linkRequest = {
        destination: url,
        domain: { fullName: "rebrand.ly" }
    };

    // Enviar a requisição para a API da Rebrandly para encurtar a URL
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
        // Extrair a URL encurtada da resposta da API e mostrar no campo de URL encurtada
        let shortUrl = json.shortUrl;
        mostrarUrlEncurtada(shortUrl);
    })
    .catch(error => {
        console.error(error);
        // Em caso de erro, mostrar o campo da URL encurtada como vazio
        mostrarUrlEncurtada("");
    });
}

// Função para exibir a URL encurtada no campo apropriado
function mostrarUrlEncurtada(urlEncurtada) {
    let inputUrlEncurtada = document.getElementById("input-url-encurtada");
    inputUrlEncurtada.value = urlEncurtada;
}

// Função para copiar a URL encurtada para a área de transferência
function copiar() {
    let inputUrlEncurtada = document.getElementById("input-url-encurtada");
    let urlEncurtada = inputUrlEncurtada.value.trim();

    // Verificar se há uma URL encurtada antes de copiar
    if (urlEncurtada) {
        // Selecionar todo o texto do campo de URL encurtada
        inputUrlEncurtada.select();
        inputUrlEncurtada.setSelectionRange(0, 99999);

        // Copiar o texto selecionado para a área de transferência
        navigator.clipboard.writeText(urlEncurtada);

        // Alterar temporariamente o texto do botão para "URL copiada" por 2 segundos (2000 milissegundos)
        let button = document.querySelector(".btn");
        button.innerText = "URL copiada";
        setTimeout(function() {
            button.innerText = "Copiar";
        }, 2000);
    }
}
