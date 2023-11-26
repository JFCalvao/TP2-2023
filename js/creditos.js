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
rangeHTML.style.transform = `rotate(${valorHTML}deg)`;

let valorCSS;
valorCSS = (porCSS*174)/100;
valorCSS = valorCSS - 87;
rangeCSS.style.transform = `rotate(${valorCSS}deg)`;

let valorJS;
valorJS = (porJS*174)/100;
valorJS = valorJS - 87;
rangeJS.style.transform = `rotate(${valorJS}deg)`;

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
        window.location = "http://127.0.0.1:5500/paginaInicial.html"
    }, 500);
});
