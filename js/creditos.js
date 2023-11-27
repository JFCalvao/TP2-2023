const porcentagemHTML = document.querySelector("#porcentagemHTML");
const porcentagemCSS = document.querySelector("#porcentagemCSS");
const porcentagemJS = document.querySelector("#porcentagemJS");

let porHTML = 21.5;
let porCSS = 34;
let porJS = 44.5;

porcentagemHTML.innerHTML = porHTML + "%";
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
    setTimeout(() => {
        rangeHTML.style.transform = `rotate(${val}deg)`;
    }, (i*15));
}
setTimeout(() => {
    rangeHTML.style.transform = `rotate(${valorHTML}deg)`;
}, (i*15) + 100);

let valorCSS;
valorCSS = (porCSS*174)/100;
valorCSS = valorCSS - 87;
for(i = 0; i <= porCSS; i = i + 0.1) {
    let val = ((i*174)/100) - 87;
    setTimeout(() => {
        rangeCSS.style.transform = `rotate(${val}deg)`;
    }, (i*15));
}
setTimeout(() => {
    rangeCSS.style.transform = `rotate(${valorCSS}deg)`;
}, (i*15) + 100);

let valorJS;
valorJS = (porJS*174)/100;
valorJS = valorJS - 87;
for(i = 0; i <= porJS; i = i + 0.1) {
    let val = ((i*174)/100) - 87;
    setTimeout(() => {
        rangeJS.style.transform = `rotate(${val}deg)`;
    }, (i*15));
}
setTimeout(() => {
    rangeJS.style.transform = `rotate(${valorJS}deg)`;
}, (i*15) + 100);

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
        window.location = "paginaInicial.html"
    }, 500);
});
