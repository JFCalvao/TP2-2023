const corpoDasInfo = document.querySelector("#corpoDasInfo");
const container = document.querySelector("container");
const header = document.querySelector("header");
const porcentagemLoad = document.querySelector(".prenche-load");
const corpoLoad = document.querySelector(".load");

function calculaScore(ranque, xp) {

    if(ranque === 1) {
        return xp;
    }

    let xpJaConquistado = 100;
    let aumento1 = 500;
    let aumento2 = 1000;

    for (let i = 1; i < ranque - 1; i++) {
        if (i % 2 === 1) {
            xpJaConquistado += aumento1;
            aumento1 *= 10;
        } else {
            xpJaConquistado += aumento2;
            aumento2 *= 10;
        }
    }

    return (xpJaConquistado + xp);
}

function buscaInfo() {
    let SHEET_ID = "1gEByqXEKcDELbHz8yWlGtUTfmEzRALi6sDJrdfgULOI";
    let SHEET_TITLE = "Página1";
    let SHEET_RANGE = "A1:E101";

    let FULL_URL =
      "https://docs.google.com/spreadsheets/d/" +
      SHEET_ID +
      "/gviz/tq?sheet=" +
      SHEET_TITLE +
      "&range=" +
      SHEET_RANGE;

    let ajax = new XMLHttpRequest();

    ajax.open("GET", FULL_URL);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(null);

    let listaOrdenada = [];
    porcentagemLoad.style.width = "25%";
    ajax.addEventListener("readystatechange", function () {
      if (ajax.readyState === 4 && ajax.status === 200) {
        let listaResponse = ajax.response;
        let listaData = JSON.parse(listaResponse.substr(47).slice(0, -2));

        (listaData.table.rows).forEach(element => {
            listaOrdenada.push({
                nome: element.c[0].v,
                ranque: element.c[3].v,
                expRanque: element.c[4].v,
                avaliar: calculaScore(element.c[3].v, element.c[4].v),
            });
        });

        listaOrdenada.sort((a, b) => b.avaliar - a.avaliar);

        for(let i = 0; i < listaOrdenada.length; i++) {            let novoTr = document.createElement("tr");
            novoTr.innerHTML = `
            <td class="posicao">${i + 1}#</td>
            <td class="nomeUser">${listaOrdenada[i].nome}</td>
            <td class="ranque">${listaOrdenada[i].ranque}</td>
            <td class="score">${(calculaScore(listaOrdenada[i].ranque , listaOrdenada[i].expRanque)).toLocaleString("pt-BR")}</td>
            `;
            corpoDasInfo.appendChild(novoTr);
        };
        porcentagemLoad.style.width = "100%";
        setTimeout(() => {
            corpoLoad.style.opacity = "0%";
        }, 300);
        setTimeout(() => {
            container.style.opacity = "100%";
            header.style.opacity = "100%";
        }, 600);

        let listaEl = document.querySelectorAll("#corpoDasInfo tr");
        let tamanhoEl = 0;
        let fixed = document.querySelector(".fixed");
        listaEl.forEach(element => {
            tamanhoEl+= element.clientHeight + 5;
        })
        if(tamanhoEl < corpoDasInfo.clientHeight) {
            fixed.style.boxShadow = "none";
        }
      } 
      else {
        container.style.opacity = "0%";
        header.style.opacity = "0%";
        if(ajax.readyState === 2) {
            porcentagemLoad.style.width = "50%";
        }
        if(ajax.readyState === 3) {
            porcentagemLoad.style.width = "75%";
        }
      }
    });
} buscaInfo();

const btnRetornar = document.querySelector(".div-imgRetorno");

btnRetornar.addEventListener("click", () => {
    btnRetornar.style.webkitTransform = "rotate(-360deg)";
    btnRetornar.style.mozTransform = "rotate(-360deg)";
    btnRetornar.style.msTransform = "rotate(-360deg)";
    btnRetornar.style.oTransform = "rotate(-360deg)";
    btnRetornar.style.transform = "rotate(-360deg)";
    setTimeout(() => {
        window.location = "index.html"
    }, 500);
});
