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

function logarAutomaticamente(usuario, senha) {
  localStorage.clear();
  if (window.confirm("Deseja logar na conta?")) {
    localStorage.setItem("USUARIO", usuario);
    localStorage.setItem("SENHA", senha);
    localStorage.setItem("TEMA", "CLARO");
    location.href = "../paginaInicial.html";
  } else {
    localStorage.clear();
  }
}

const handleSubmit = (event) => {
  event.preventDefault();

  if (
    inputUsuario_cadastro.value === "" ||
    inputPassword_cadastro.value === "" ||
    inputPassword_cadastro.value !== input_confirm_Password.value
  ) {
    window.alert("Coloque as duas senhas iguais!");
    return;
  }
  
  checaSeContaExiste()
  
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
        if (
          listaData.table.rows[i].c[0].v === inputUsuario_cadastro.value
        ) {
          alert("essa conta já existe!!!");
          return 1;
        }
      }

      cadastraUser();
    }
  });

  return 0;
}

function cadastraUser() {
  fetch("https://sheetdb.io/api/v1/pfuk22g9ujmao", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      USUARIO: inputUsuario_cadastro.value,
      SENHA: inputPassword_cadastro.value,
      FOTO_PERFIL: "../imagens/img-perfil.png",
      NIVEL_RANK: "1",
      EXP_RANK: "0",
      VIDA: "200",
      MOLDURA: "../imagens/imagem-sem-nada.webp",
    }),
    });
    logarAutomaticamente(
      inputUsuario_cadastro.value,
      inputPassword_cadastro.value
    );
}

// const handleGet = (event) => {
//     event.preventDefault();

//     let SHEET_ID = "1gEByqXEKcDELbHz8yWlGtUTfmEzRALi6sDJrdfgULOI";
//     let SHEET_TITLE = "TP2-dataBase";
//     let SHEET_RANGE = "A:F";

//     let FULL_URL =( "https://docs.google.com/spreadsheets/d/" + SHEET_ID + "/gviz/tq?sheet=" + SHEET_TITLE + "&range=" + SHEET_RANGE);

//     fetch(FULL_URL)
//     .then(res => res.text())
//     .then(rep => {
//         let data = JSON.parse(rep.substr(47).slice(0,-2));

//         console.log(data.table.rows[1].c);

//         data.table.rows.forEach(row => {
//             console.log(row.c[0].v === inputUsuario1.value);
//             console.log(row.c[1].v === inputPassword1.value);
//             console.log(row.c[1].v);
//             if(row.c[0].v === inputUsuario1.value) {
//                 if(row.c[1].v === inputPassword1.value)
//                 {
//                     console.log("Pode logar");
//                 }
//             }
//         })

//     });

// }

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
          listaData.table.rows[i].c[1].v.toString() === inputPassword.value
        ) {
          encontrado++;
          break;
        }
      }

      if (encontrado === 0) {
        window.alert("Essa conta não existe!");
        inputPassword.value = "";
        return;
      } else if (encontrado === 1) {
        //o que eu quero que faca
        logarAutomaticamente(inputUsuario.value, inputPassword.value);
      }
    }
  });
};

document.querySelector("#formGet").addEventListener("submit", getData);
