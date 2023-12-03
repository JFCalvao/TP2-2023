const body = document.querySelector("body");
const changeBtn = document.querySelector(".img-central");
const imgCentral = document.querySelector(".img-central img");
const container = document.querySelector(".container");
let signIn = true;
const barraLateral = document.querySelector(".info-lateral");
const titulo = document.querySelector(".titulo h1");
const header = document.querySelector(".form-header h1");
const inputUsuario = document.querySelector("#input-usuario");
const inputPassword = document.querySelector("#input-password");
const confirmPassword = document.querySelector("#input-confirm-password");
const password = document.querySelector("#input-password");
const submitBtn = document.querySelector("#submit-btn");
const getBtn = document.querySelector("#get-btn");
const formPost = document.querySelector("#formPost");
const formGet = document.querySelector("#formGet");

// let srcForBtn = {
//     login: ,
//     signUp:
// }

changeBtn.addEventListener("click", () => {
  if (signIn) {
    container.style.flexDirection = "row-reverse";
    imgCentral.style.transform = "rotate(180deg)";
    barraLateral.style.borderRight = "5px solid transparent";
    barraLateral.style.borderLeft = "5px solid white";
    titulo.innerHTML = "Cadastre-se";
    changeBtn.style.left = "53.5%";
    if (body.clientWidth <= 800) changeBtn.style.left = "92%";
    else if (body.clientWidth <= 1200) changeBtn.style.left = "73%";
    formPost.classList.remove("disableForm");
    formGet.classList.add("disableForm");
    signIn = false;
  } else {
    container.style.flexDirection = "row";
    imgCentral.style.transform = "rotate(0deg)";
    barraLateral.style.borderRight = "5px solid white";
    barraLateral.style.borderLeft = "5px solid transparent";
    titulo.innerHTML = "Inscreva-se";
    changeBtn.style.left = "43.5%";
    if (body.clientWidth <= 550) changeBtn.style.left = "12.5%";
    else if (body.clientWidth <= 800) changeBtn.style.left = "2.5%";
    else if (body.clientWidth <= 1200) changeBtn.style.left = "23%";
    formPost.classList.add("disableForm");
    formGet.classList.remove("disableForm");
    signIn = true;
  }
});

const inputUsuario_cadastro = document.querySelector("#input-usuario_cadastro");
const inputPassword_cadastro = document.querySelector(
  "#input-password_cadastro"
);
const input_confirm_Password = document.querySelector(
  "#input-confirm-password"
);

// meu alert
const myAlert = document.querySelector(".myAlert");
const myAlertInfo = document.querySelector(".myAlert .info");
const alertBar = document.querySelector(".barraInferior");
let alertEmExecucao = 0;

function logarAutomaticamente(usuario, senha, texto) {
  localStorage.clear();
  successAlert("Conta " + texto + " com sucesso", () => {
    localStorage.setItem("USUARIO", usuario);
    localStorage.setItem("SENHA", senha);
    localStorage.setItem("TEMA", "CLARO");
    localStorage.setItem("VOLUME", "50");
    localStorage.setItem("MUSICA", "50");
    window.location = "index.html";
  });
}

const handleSubmit = (event) => {
  event.preventDefault();

  if (
    inputUsuario_cadastro.value === "" ||
    inputPassword_cadastro.value === "" ||
    inputPassword_cadastro.value !== input_confirm_Password.value
  ) {
    warningAlert("Coloque as duas senhas iguais!");
    return;
  }

  checaSeContaExiste();
};

document.querySelector("#formPost").addEventListener("submit", handleSubmit);

function checaSeContaExiste() {
  let SHEET_ID = "1gEByqXEKcDELbHz8yWlGtUTfmEzRALi6sDJrdfgULOI";
  let SHEET_TITLE = "Página1";
  let SHEET_RANGE = "A:A";

  let FULL_URL =
    "https://docs.google.com/spreadsheets/d/" +
    SHEET_ID +
    "/gviz/tq?sheet=" +
    SHEET_TITLE +
    "&range=" +
    SHEET_RANGE;

  var ajax = new XMLHttpRequest();

  ajax.open("GET", FULL_URL);
  ajax.setRequestHeader("Content-Type", "application/json");
  ajax.send(null);

  ajax.addEventListener("readystatechange", function () {
    if (this.readyState == 4 && this.status == 200) {
      let listaResponse = ajax.response;
      let listaData = JSON.parse(listaResponse.substr(47).slice(0, -2));

      for (let i = 0; i < listaData.table.rows.length; i++) {
        if (listaData.table.rows[i].c[0].v === inputUsuario_cadastro.value) {
          errorAlert("essa conta já existe!!!");
          return 1;
        }
      }

      cadastraUser();
    }
  });

  return 0;
}

function cadastraUser() {
  let username = inputUsuario_cadastro.value;
  let password = "S" + inputPassword_cadastro.value;
  fetch("https://sheetdb.io/api/v1/pfuk22g9ujmao", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      USUARIO: username,
      SENHA: password,
      FOTO_PERFIL: "imagens/img-perfil.png",
      NIVEL_RANK: "1",
      EXP_RANK: "0",
      VIDA: "200",
      MOLDURA: "imagens/imagem-sem-nada.webp",
      PERSONAGEM: "imgs-personagens/bolafumante.png",
    }),
  });
  logarAutomaticamente(
    inputUsuario_cadastro.value,
    inputPassword_cadastro.value,
    "cadastrada"
  );
}

let encontrado = 0;

const getData = (event) => {
  event.preventDefault();
  let SHEET_ID = "1gEByqXEKcDELbHz8yWlGtUTfmEzRALi6sDJrdfgULOI";
  let SHEET_TITLE = "Página1";
  let SHEET_RANGE = "A:B";

  let FULL_URL =
    "https://docs.google.com/spreadsheets/d/" +
    SHEET_ID +
    "/gviz/tq?sheet=" +
    SHEET_TITLE +
    "&range=" +
    SHEET_RANGE;

  var ajax = new XMLHttpRequest();

  ajax.open("GET", FULL_URL);
  ajax.setRequestHeader("Content-Type", "application/json");
  ajax.send(null);

  ajax.addEventListener("readystatechange", function () {
    if (this.readyState == 4 && this.status == 200) {
      let listaResponse = ajax.response;
      let listaData = JSON.parse(listaResponse.substr(47).slice(0, -2));

      for (let i = 0; i < listaData.table.rows.length; i++) {
        if (
          listaData.table.rows[i].c[0].v === inputUsuario.value &&
          listaData.table.rows[i].c[1].v.toString() ===
            "S" + inputPassword.value
        ) {
          encontrado++;
          break;
        }
      }

      if (encontrado === 0) {
        errorAlert("Essa conta não existe!!!");
        inputPassword.value = "";
        return;
      } else if (encontrado === 1) {
        //o que eu quero que faca
        logarAutomaticamente(inputUsuario.value, inputPassword.value, "logada");
      }
    }
  });
};

document.querySelector("#formGet").addEventListener("submit", getData);

const btnRetornar = document.querySelector(".div-imgRetorno");

btnRetornar.addEventListener("click", () => {
  btnRetornar.style.webkitTransform = "rotate(-360deg)";
  btnRetornar.style.mozTransform = "rotate(-360deg)";
  btnRetornar.style.msTransform = "rotate(-360deg)";
  btnRetornar.style.oTransform = "rotate(-360deg)";
  btnRetornar.style.transform = "rotate(-360deg)";
  setTimeout(() => {
    window.location = "index.html";
  }, 500);
});

function successAlert(text, doSomething) {
  if(alertEmExecucao) {
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
    if(doSomething) {
      doSomething();
    }
    else {
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
  if(alertEmExecucao) {
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
  if(alertEmExecucao) {
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
