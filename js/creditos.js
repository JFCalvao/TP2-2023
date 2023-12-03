const html_body = document.querySelector("body");
const porcentagemHTML = document.querySelector("#porcentagemHTML");
const porcentagemCSS = document.querySelector("#porcentagemCSS");
const porcentagemJS = document.querySelector("#porcentagemJS");

let porHTML = 15.3;
let porCSS = 26.5;
let porJS = 58.2;

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

// meu alert
const myAlert = document.querySelector(".myAlert");
const myAlertInfo = document.querySelector(".myAlert .info");
const alertBar = document.querySelector(".barraInferior");
let alertEmExecucao = 0;

const easterEgg = document.querySelector(".img-personagemEasteregg");

easterEgg.addEventListener("click", () => {

    if(!localStorage.USUARIO) {
        errorAlert("Logue para desbloquear o easterEgg");
        return;
    }

    if(localStorage.Brasil) {
        easterEgg.style.opacity = "0%";
        localStorage.setItem("Brasil", "imgs-personagens/personagemBrasil.png");
        successAlert("Você ganhou uma nova skin denovo!!!");
    }

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
            successAlert("Parabéns!!! Você ganhou uma nova skin!!");
        }
    });
    ajax.send(data);
});

function successAlert(text, doSomething) {
    if (alertEmExecucao) {
      return;
    }
    alertEmExecucao = 1;
  
    myAlertInfo.innerHTML = `<img id="imgSuccess" src="imagens/circular3points.png"><section><h3>${text}</h3></section><div class="barraInferior"></div>`;
    myAlert.style.backgroundColor = "rgb(91, 82, 117)";
    myAlert.style.opacity = "100%";
    alertBar.style.backgroundColor = "rgb(114, 230, 133)";
  
    setTimeout(() => {
      alertBar.style.width = "95%";
      setTimeout(() => {
        let imgAlert = document.querySelector("#imgSuccess");
        imgAlert.classList.add("successFilter");
        imgAlert.style.rotate = "180deg";
        setTimeout(() => {
          imgAlert.src = "imagens/success.svg";
          imgAlert.style.rotate = "360deg";
        }, 150);
      }, 1000);
    }, 350);
  
    setTimeout(() => {
      if (doSomething) {
        doSomething();
      } else {
        myAlert.style.opacity = "0%";
        setTimeout(() => {
          alertBar.style.width = "0%";
        }, 100);
        setTimeout(() => {
          alertEmExecucao = 0;
        }, 1000);
      }
    }, 2500);
  }
  
  function warningAlert(text) {
    if (alertEmExecucao) {
      return;
    }
    alertEmExecucao = 1;
  
    myAlertInfo.innerHTML = `<img id="imgWarning" src="imagens/warningWait.svg"><section><h3>${text}</h3></section><div class="barraInferior"></div>`;
    myAlert.style.backgroundColor = "rgb(91, 82, 117)";
    myAlert.style.opacity = "100%";
    alertBar.style.backgroundColor = "rgb(230, 209, 114)";
  
    setTimeout(() => {
      alertBar.style.width = "95%";
      setTimeout(() => {
        let imgAlert = document.querySelector("#imgWarning");
        imgAlert.classList.add("warningFilter");
        imgAlert.style.rotate = "180deg";
        setTimeout(() => {
          imgAlert.src = "imagens/warning.svg";
          imgAlert.style.rotate = "360deg";
        }, 150);
      }, 1000);
    }, 350);
  
    setTimeout(() => {
      myAlert.style.opacity = "0%";
      setTimeout(() => {
        alertBar.style.width = "0%";
      }, 100);
      setTimeout(() => {
        alertEmExecucao = 0;
      }, 1000);
    }, 2500);
  }
  
  function errorAlert(text) {
    if (alertEmExecucao) {
      return;
    }
    alertEmExecucao = 1;
  
    myAlertInfo.innerHTML = `<img id="imgError" src="imagens/circle-error.svg"><section><h3>${text}</h3></section><div class="barraInferior"></div>`;
    myAlert.style.backgroundColor = "rgb(91, 82, 117)";
    myAlert.style.opacity = "100%";
    alertBar.style.backgroundColor = "rgb(230, 131, 114)";
  
    setTimeout(() => {
      alertBar.style.width = "95%";
      setTimeout(() => {
        let imgAlert = document.querySelector("#imgError");
        imgAlert.classList.add("errorFilter");
        imgAlert.style.rotate = "180deg";
        setTimeout(() => {
          imgAlert.src = "imagens/error.svg";
          imgAlert.style.rotate = "360deg";
        }, 150);
      }, 1000);
    }, 350);
  
    setTimeout(() => {
      myAlert.style.opacity = "0%";
      setTimeout(() => {
        alertBar.style.width = "0%";
      }, 100);
      setTimeout(() => {
        alertEmExecucao = 0;
      }, 1000);
    }, 2500);
  }
