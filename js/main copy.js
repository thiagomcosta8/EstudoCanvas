ctx = quadroImagem.getContext("2d");

moldura = new Image();
foto = new Image();

moldura.onload = () => {
    quadroImagem.width = 600;
    quadroImagem.height = 600;
    render();
};

foto.onload = () => {
    quadroImagem.width = 600;
    quadroImagem.height = 600;
    render();
};

moldura.src = "JSmoldura.png";
foto.src = "JSfoto.png"

nome.oninput = render;
luminosidade.oninput = render;

function render() {
    let {luminosidade, nome} = getFormData();
    setInitialImage();
    setLuminosidade(luminosidade)
    setText(nome);

}

function getFormData() {
    return {
        luminosidade: luminosidade.value,
        nome: nome
            .value
            .toUpperCase(),
        causa: null
    }
}

function setLuminosidade(luminosidade) {
    ctx.globalCompositeOperation = luminosidade < 100
        ? "color-burn"
        : "color-dodge";

    luminosidade = luminosidade >= 100
        ? luminosidade - 100
        :  -luminosidade;
    ctx.fillStyle = "hsl(0, 50%, " + luminosidade + "%)";
    ctx.fillRect(0, 0, quadroImagem.width, quadroImagem.height);
}

function setInitialImage() {
    ctx.clearRect(0, 0, quadroImagem.width, quadroImagem.height);
    //ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(foto, 0, 0, quadroImagem.width, quadroImagem.height);
    ctx.drawImage(moldura, 0, 0, quadroImagem.width, quadroImagem.height);
}

function setClip() {
    ctx.globalCompositeOperation = "destination-in";
    ctx.globalCompositeOperation = "source-over";
    ctx.font = "50px Roboto Mono, monospace";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
}

function setText(text) {
    setClip();
    const configText = {
        centerX: (c.width / 2) - 0,
        centerY: c.height - 245,
        angle: text.length / 7,
        radius: 185,
        text
    }
}

function saveImage() {
    let link = document.getElementById('link');
    link.setAttribute('download', 'bandeira.png');
    link.setAttribute('href', c.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    link.click();
}