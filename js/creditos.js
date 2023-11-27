const html_body = document.querySelector("body");
const porcentagemHTML = document.querySelector("#porcentagemHTML");
const porcentagemCSS = document.querySelector("#porcentagemCSS");
const porcentagemJS = document.querySelector("#porcentagemJS");

let porHTML = 21.5;
let porCSS = 34;
let porJS = 44.5;

porcentagemCSS.innerHTML = porCSS + "%";
porcentagemJS.innerHTML = porJS + "%";

const rangeHTML = document.querySelector("#rangeHTML");
const rangeCSS = document.querySelector("#rangeCSS");
const rangeJS = document.querySelector("#rangeJS");

let valorHTML;
valorHTML = (porHTML*174)/100;
valorHTML = valorHTML - 87;
let i;
for(i = 0; i <= porHTML; i = i + 0.1) {
    let val = ((i*174)/100) - 87;
    let ival = i;
    setTimeout(() => {
        rangeHTML.style.transform = `rotate(${val}deg)`;
        porcentagemHTML.innerHTML = ival.toFixed(1) + "%";
    }, (i*15));
}
setTimeout(() => {
    rangeHTML.style.transform = `rotate(${valorHTML}deg)`;
    porcentagemHTML.innerHTML = porHTML + "%";
}, (i*15) + 100);

let valorCSS;
valorCSS = (porCSS*174)/100;
valorCSS = valorCSS - 87;
let j;
for(j = 0; j <= porCSS; j = j + 0.1) {
    let val = ((j*174)/100) - 87;
    let jval = j;
    setTimeout(() => {
        rangeCSS.style.transform = `rotate(${val}deg)`;
        porcentagemCSS.innerHTML = jval.toFixed(1) + "%";
    }, (j*15));
}
setTimeout(() => {
    rangeCSS.style.transform = `rotate(${valorCSS}deg)`;
    porcentagemCSS.innerHTML = porCSS + "%";
}, (j*15) + 100);

let valorJS;
valorJS = (porJS*174)/100;
valorJS = valorJS - 87;
let k;
for(k = 0; k <= porJS; k = k + 0.1) {
    let val = ((k*174)/100) - 87;
    let kval = k;
    setTimeout(() => {
        rangeJS.style.transform = `rotate(${val}deg)`;
        porcentagemJS.innerHTML = kval.toFixed(1) + "%";
    }, (k*15));
}
setTimeout(() => {
    rangeJS.style.transform = `rotate(${valorJS}deg)`;
    porcentagemJS.innerHTML = porJS + "%";
}, (k*15) + 100);

const cardImg = document.querySelectorAll(".card-img img");

cardImg[0].style.height = `${cardImg[1].clientWidth}px`;

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

const easterEgg = document.querySelector(".img-personagemEasteregg");

easterEgg.addEventListener("click", () => {
    easterEgg.style.opacity = "0%";
    localStorage.setItem("Brasil", "imgs-personagens/personagemBrasil.png");
    var data = JSON.stringify({
        PERSONAGEM: "imgs-personagens/personagemBrasil.png",
    });

    let ajax = new XMLHttpRequest();

    ajax.open("PATCH",
      "https://sheetdb.io/api/v1/pfuk22g9ujmao/USUARIO/" +
      localStorage.getItem("USUARIO"),
      true
    );
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.setRequestHeader("Accept", "application/json");
    ajax.addEventListener("readystatechange", () => {
        if(ajax.readyState === 4 && ajax.status === 200) {
            alert("Parabéns!!! Você ganhou uma nova skin!!");
        }
    });
    ajax.send(data);
});
