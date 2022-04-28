ctx = quadroImagem.getContext("2d");

moldura = new Image();
foto = new Image();

moldura.src = "JSmoldura.png";
foto.src = "JSfoto.png";

moldura.onload = () => {
    quadroImagem.width = 600;
    quadroImagem.height = 600;
    render();
};

foto.onload = () => {
    quadroImagem.width = 600;
    quadroImagem.height = 600;
    render();
}

nome.oninput = render;
mudarFonte.oninput = render;
luminosidade.oninput = render;
tamanho.oninput = render;
posicaoX.oninput = render;
posicaoY.oninput = render;

function render() {
    let {luminosidade, tamanho, valorX, valorY, nome} = getFormData();
    setInitialImage(tamanho, valorX, valorY);
    setLuminosidade(luminosidade);
    setMolduraPadrao();
    setText(nome);
}

function getFormData() {
    return {
        luminosidade: luminosidade.value,
        tamanho: tamanho.value,
        valorX: posicaoX.value,
        valorY: posicaoY.value,
        nome: nome
            .value
            .toUpperCase(),
        
    }
}

function setLuminosidade(luminosidade) {
    ctx.globalCompositeOperation = luminosidade < 100
        ? "color-burn"
        : "color-dodge";

    luminosidade = luminosidade >= 100
        ? luminosidade - 100
        :  100-(100-luminosidade);
    ctx.fillStyle = "hsl(0, 50%, " + luminosidade + "%)";
    ctx.fillRect(0, 0, quadroImagem.width, quadroImagem.height);
}

function setInitialImage(tamanho, valorX, valorY) {
    ctx.clearRect(0, 0, quadroImagem.width, quadroImagem.height);
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(foto, valorX, valorY, quadroImagem.width * (tamanho/100), quadroImagem.height * (tamanho/100));

}

function setMolduraPadrao() {
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(moldura, 0, 0, quadroImagem.width, quadroImagem.height);
}

function setText(text) {
    ctx.globalCompositeOperation = "source-over";
    fonteUsar = mudarFonte.checked ? "100px Lobster, cursive" : "100px Roboto Mono, monospace"
    //ctx.font = "100px Roboto Mono, monospace";
    ctx.font = fonteUsar;
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText(text, 300, 100, 550);
}

function saveImage() {
    let link = document.getElementById('link');
    link.setAttribute('download', 'bandeira.png');
    link.setAttribute('href', ctx.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    link.click();
}

function encaminhar() {
    
    http = new XMLHttpRequest();

    imagem = quadroImagem.toDataURL()

    params = "imagem=" + imagem; 

    http.open("POST", "salvar.php", false);

    http.setRequestHeader("Content-type", "text/plain"); 

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            alert("Imagem salvada com sucesso");
        }
    }

    http.send(params);

}