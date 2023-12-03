const rank = document.querySelector("#rank");
const h2_rank = document.querySelector("#h2-rank");
const life = document.querySelector("#life");
const h2_life = document.querySelector("#h2-life");
const settings = document.querySelector(".settings");
const img_settings = document.querySelector("#img-settings");
let clickSet = 1;
const inputmusica = document.querySelector("#musica");
const inputvolume = document.querySelector("#volume");
const porcentagem_volume = document.querySelector("#porcentagem-volume");
const h3_volume = document.querySelector("#porcentagem-volume h3");
const porcentagem_musica = document.querySelector("#porcentagem-musica");
const h3_musica = document.querySelector("#porcentagem-musica h3");
const logado = document.querySelector(".logado");
const log_h1 = document.querySelector("#log-h1");
const menu_settings = document.querySelector(".menu-settings");
const tema_claro = document.querySelector(".tema-claro");
const tema_escuro = document.querySelector(".tema-escuro");
let tema = 1;
const rank_life = document.querySelectorAll(".input-box label");
const titulo_Game = document.querySelector(".titulo");
const html_body = document.querySelector("body");
const menu_options = document.querySelectorAll(".menu button");
const labelRank = document.querySelector("#labelRank");
const img_perfil = document.querySelector("#imagem-do-Perfil");
const account_img_perfil = document.querySelector("#account-imagem-do-Perfil");
const account_moldura = document.querySelector("#account-moldura");
const account_sem_moldura = document.querySelector("#sem-moldura");
const personagem = document.querySelector("#personagem");
const basePersonagem = document.querySelector(".base");
const account_personagem = document.querySelector("#account-personagem");
const btn_play = document.querySelector(".play");
const userName = document.querySelector("#nome-usuario");
const btn_sair = document.querySelector(".btn-sair");
const btn_editar = document.querySelector(".btn-editar");
const btn_salvarEdit = document.querySelector("#btn-salvarEdicoes");
const btn_cancelarEdit = document.querySelector("#btn-cancelarEdicoes");
const cont_account = document.querySelector(".container-account");
const perfil_slider = document.querySelector("#perfil-slider");
const perfilLiPerfil = document.querySelectorAll("#imgs-perfil li");
const perfilImgsPerfil = document.querySelectorAll("#imgs-perfil li img");
const moldura_slider = document.querySelector("#moldura-slider");
const perfilLiMoldura = document.querySelectorAll("#imgs-moldura li");
const perfilImgsMoldura = document.querySelectorAll("#imgs-moldura li img");
const personagem_slider = document.querySelector("#personagem-slider");
const perfilLiPersonagem = document.querySelectorAll("#imgs-personagem li");
const perfilImgsPersonagem = document.querySelectorAll(
  "#imgs-personagem li img"
);
const moldura = document.querySelector("#moldura");
let linkPuroPersonagem;

// coisas para inicializar
let statusPersonagem = {
  nivelRank: 1,
  rankExp: 0,
  vida: 200,
};

cont_account.style.width = `${titulo_Game.clientWidth}px`;

function procuraUser() {
  if (localStorage.USUARIO && localStorage.SENHA && localStorage.TEMA) {
    let encontrado = 0;
    let SHEET_ID = "1gEByqXEKcDELbHz8yWlGtUTfmEzRALi6sDJrdfgULOI";
    let SHEET_TITLE = "Página1";
    let SHEET_RANGE = "A:H";

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
        let localProcurar;
        for (let i = 0; i < listaData.table.rows.length; i++) {
          if (
            listaData.table.rows[i].c[0].v ===
              localStorage.getItem("USUARIO") &&
            listaData.table.rows[i].c[1].v ===
              "S" + localStorage.getItem("SENHA")
          ) {
            encontrado++;
            localProcurar = i;
            break;
          }
        }

        if (encontrado === 0) {
          errorAlert("Essa conta não existe!");
          localStorage.clear();
          return;
        } else if (encontrado === 1) {
          //o que eu quero que faca
          img_perfil.src = listaData.table.rows[localProcurar].c[2].v;
          if (localStorage.URL) {
            img_perfil.src = localStorage.getItem("URL");
            account_img_perfil.style.height = `${account_img_perfil.clientWidth}px`;
          }
          account_img_perfil.src = img_perfil.src;
          statusPersonagem.nivelRank =
            listaData.table.rows[localProcurar].c[3].v;
          statusPersonagem.rankExp = listaData.table.rows[localProcurar].c[4].v;
          statusPersonagem.vida = listaData.table.rows[localProcurar].c[5].v;
          userName.innerHTML = listaData.table.rows[localProcurar].c[0].v;
          moldura.src = listaData.table.rows[localProcurar].c[6].v;
          personagem.src = listaData.table.rows[localProcurar].c[7].v;
          linkPuroPersonagem = listaData.table.rows[localProcurar].c[7].v;
          //edit perfil
          account_moldura.src = moldura.src;
          account_personagem.src = personagem.src;

          iniciaPerfil();
          log_h1.innerHTML = "LOGADO";
          logado.style.backgroundColor = "#4ed638";
        }
      }
    });
  }
}
procuraUser();

// meu alert
const myAlert = document.querySelector(".myAlert");
const myAlertInfo = document.querySelector(".myAlert .info");
const alertBar = document.querySelector(".barraInferior");
let alertEmExecucao = 0;

let expMaxRank = 100;

function iniciaPerfil() {
  expMaxRank = 100;
  let aumento1 = 400;
  let aumento2 = 500;

  h2_life.innerHTML = statusPersonagem.vida + "/200";
  life.style.width = `${statusPersonagem.vida / 2}%`;

  labelRank.innerHTML = "Rank " + statusPersonagem.nivelRank;
  for (let i = 1; i < statusPersonagem.nivelRank; i++) {
    if (i % 2 === 1) {
      expMaxRank += aumento1;
      aumento1 *= 10;
    } else {
      expMaxRank += aumento2;
      aumento2 *= 10;
    }
  }

  localStorage.setItem("RANK-EXP", statusPersonagem.rankExp);
  localStorage.setItem("NIVEL-RANK", statusPersonagem.nivelRank);

  localStorage.setItem("PERSONAGEM", personagem.src);
  rank.style.width = `${statusPersonagem.rankExp / (expMaxRank / 100)}%`;
  if (localStorage.MUSICA) {
    inputmusica.value = localStorage.getItem("MUSICA");
    let color = inputmusica.value;
    inputmusica.style.background =
      "linear-gradient(90deg, #41b8d5 " + color + "% , #eae8e5 " + color + "%)";
    porcentagem_musica.style.width = `${
      (parseFloat(color) * 87.5) / 100 + 12.5
    }%`;
    h3_musica.innerHTML = color + "%";
  }
  if (localStorage.VOLUME) {
    inputvolume.value = localStorage.getItem("VOLUME");
    let color = inputvolume.value;
    inputvolume.style.background =
      "linear-gradient(90deg, #41b8d5 " + color + "% , #eae8e5 " + color + "%)";
    porcentagem_volume.style.width = `${
      (parseFloat(color) * 87.5) / 100 + 12.5
    }%`;
    h3_volume.innerHTML = color + "%";
  }
  if (linkPuroPersonagem === "imgs-personagens/personagemBrasil.png") {
    localStorage.setItem("Brasil", linkPuroPersonagem);
  }
  let easterEggImg = document.querySelector("#easterEgg img");
  if (localStorage.Brasil) {
    easterEggImg.style.pointerEvents = "all";
    easterEggImg.src = localStorage.getItem("Brasil");
  } else {
    easterEggImg.style.pointerEvents = "none";
  }
  h2_rank.innerHTML = statusPersonagem.rankExp + "/" + expMaxRank;
  log_h1.innerHTML = "DESLOGADO";
  logado.style.backgroundColor = "tomato";
  tema_claro.style.border = "5px solid black";
  tema_claro.style.transform = "scale(0.95)";
  if (localStorage.TEMA) {
    if (localStorage.getItem("TEMA") === "CLARO") {
      tema = 0;
      temaClaro();
    } else {
      tema = 1;
      temaEscuro();
    }
  }
}
iniciaPerfil();

settings.addEventListener("click", () => {
  if (clickSet) {
    img_settings.style.transform = "rotate(180deg)";
    menu_settings.style.left = "73.5%";
    clickSet = 0;
  } else {
    img_settings.style.transform = "rotate(0deg)";
    menu_settings.style.left = "100%";
    clickSet = 1;
  }
});

let valMusicaAnterior = inputmusica.value;
inputmusica.addEventListener("mousemove", () => {
  let color = inputmusica.value;
  inputmusica.style.background =
    "linear-gradient(90deg, #41b8d5 " + color + "% , #eae8e5 " + color + "%)";
  porcentagem_musica.style.width = `${
    (parseFloat(color) * 87.5) / 100 + 12.5
  }%`;
  h3_musica.innerHTML = color + "%";
  //falta fazer algo com o valor desse input para mudar a musica
  if (valMusicaAnterior !== inputmusica.value) {
    localStorage.setItem("MUSICA", inputmusica.value);
  }
  valMusicaAnterior = inputmusica.value;
});

let valVolumeAnterior = inputvolume.value;
inputvolume.addEventListener("mousemove", () => {
  let color = inputvolume.value;
  inputvolume.style.background =
    "linear-gradient(90deg, #41b8d5 " + color + "% , #eae8e5 " + color + "%)";
  porcentagem_volume.style.width = `${
    (parseFloat(color) * 87.5) / 100 + 12.5
  }%`;
  h3_volume.innerHTML = color + "%";

  //falta fazer algo com o valor desse input para mudar o volume
  if (valVolumeAnterior !== inputvolume.value) {
    localStorage.setItem("VOLUME", inputvolume.value);
  }
  valVolumeAnterior = inputvolume.value;
});

let editar = 0;
btn_editar.addEventListener("click", () => {
  cont_account.style.width = `${titulo_Game.clientWidth}px`;
  account_moldura.style.height = `${account_moldura.clientWidth}px`;
  account_img_perfil.style.height = `${account_img_perfil.clientWidth}px`;
  if (editar === 0) {
    cont_account.style.top = "24%";
    editar = 1;
    btn_editar.innerHTML = "X";
  } else {
    cont_account.style.top = "100%";
    editar = 0;
    btn_editar.innerHTML = "EDITAR";
  }
});

//Corrige o scroll(slider) do menu de perfil
let tamImgsPerfil =
  (perfilLiPerfil.length * 3 - perfil_slider.clientWidth * 0.0625) / 100;
perfil_slider.addEventListener("mousemove", () => {
  let valor_translate = -(perfil_slider.value * tamImgsPerfil);
  perfilLiPerfil.forEach(
    (element) => (element.style.transform = `translateX(${valor_translate}rem)`)
  );
});

perfilImgsPerfil.forEach((element) =>
  element.addEventListener("click", () => {
    account_img_perfil.src = element.src;
  })
);

let tamMoldura =
  (perfilLiMoldura.length * 3 - moldura_slider.clientWidth * 0.0625) / 100;
moldura_slider.addEventListener("mousemove", () => {
  let valor_translate = -(moldura_slider.value * tamMoldura);
  perfilLiMoldura.forEach(
    (element) => (element.style.transform = `translateX(${valor_translate}rem)`)
  );
});

perfilImgsMoldura.forEach((element) =>
  element.addEventListener("click", () => {
    account_moldura.src = element.src;
  })
);

account_sem_moldura.addEventListener("click", () => {
  account_moldura.src = "imagens/imagem-sem-nada.webp";
  account_moldura.style.height = `${account_moldura.clientWidth}px`;
});

let tamPersonagem =
  (perfilLiPersonagem.length * 3 - personagem_slider.clientWidth * 0.0625) /
  100;
personagem_slider.addEventListener("mousemove", () => {
  let valor_translate = -(personagem_slider.value * tamPersonagem);
  perfilLiPersonagem.forEach(
    (element) => (element.style.transform = `translateX(${valor_translate}rem)`)
  );
});

perfilImgsPersonagem.forEach((element) =>
  element.addEventListener("click", () => {
    account_personagem.src = element.src;
  })
);

perfilImgsPersonagem[4].addEventListener("click", () => {
  account_personagem.src = perfilImgsPersonagem[4].src;
});

btn_sair.addEventListener("click", deslogar);
function deslogar() {
  if (!localStorage.USUARIO || !localStorage.SENHA || !localStorage.TEMA) {
    errorAlert("Você já está deslogado!");
    return;
  }

  localStorage.clear();
  statusPersonagem.nivelRank = 1;
  statusPersonagem.rankExp = 0;
  statusPersonagem.vida = 200;
  userName.innerHTML = "username";
  img_perfil.src = "imagens/img-perfil.png";
  moldura.src = "imagens/imagem-sem-nada.webp";
  personagem.src = "imgs-personagens/bolafumante.png";
  account_moldura.src = moldura.src;
  account_moldura.style.height = `${account_moldura.clientWidth}px`;
  account_img_perfil.src = img_perfil.src;
  mensagem.value = "";
  account_personagem.src = personagem.src;
  iniciaPerfil();
}

tema_claro.addEventListener("click", temaClaro);
function temaClaro() {
  if (tema === 1) return;

  userName.style.color = "black";
  rank_life[0].style.color = "black";
  rank_life[1].style.color = "black";
  titulo_Game.style.color = "#081930";
  html_body.style.backgroundImage = "url(imagens/dia-papel_de_parede.gif)";
  basePersonagem.style.border = "3px solid #22ff00";
  basePersonagem.style.boxShadow = "0px 5px 15px #22ff00";
  menu_options.forEach((element) => {
    element.style.color = "#4ed638";
    element.style.webkitTextStroke = "3px #339c23";
    element.addEventListener("mouseover", () => {
      element.style.textShadow = "0px 0px 20px #22ff00";
    });
    element.addEventListener("mouseout", () => {
      element.style.textShadow = "0px 0px 20px transparent";
    });
  });

  tema_claro.style.border = "5px solid black";
  tema_claro.style.transform = "scale(0.95)";

  tema_escuro.style.border = "0px solid white";
  tema_escuro.style.transform = "scale(1)";
  tema = 1;
  localStorage.setItem("TEMA", "CLARO");
  myAlert.style.border = "2px solid rgba(255,255,255, 0)";
}

tema_escuro.addEventListener("click", temaEscuro);
function temaEscuro() {
  if (tema === 0) return;

  userName.style.color = "white";
  rank_life[0].style.color = "white";
  rank_life[1].style.color = "white";
  titulo_Game.style.color = "#FAFF00";
  html_body.style.backgroundImage = "url(imagens/noite-papel_de_parede.gif)";
  basePersonagem.style.border = "3px solid #cdcdcd";
  basePersonagem.style.boxShadow = "0px 5px 15px #cdcdcd";
  menu_options.forEach((element) => {
    element.style.color = "#ffffff";
    element.style.webkitTextStroke = "3px #8b8b8b";
    element.addEventListener("mouseover", () => {
      element.style.textShadow = "0px 0px 20px #cdcdcd";
    });
    element.addEventListener("mouseover", () => {
      element.style.textShadow = "0px 0px 20px #cdcdcd";
    });
    element.addEventListener("mouseout", () => {
      element.style.textShadow = "0px 0px 20px transparent";
    });
  });

  tema_escuro.style.border = "5px solid white";
  tema_escuro.style.transform = "scale(0.95)";

  tema_claro.style.border = "0px solid black";
  tema_claro.style.transform = "scale(1)";
  tema = 0;
  localStorage.setItem("TEMA", "ESCURO");
  myAlert.style.border = "2px solid rgba(255,255,255, 1)";
}

btn_play.addEventListener("click", function () {
  if (!localStorage.USUARIO) {
    errorAlert("Logue antes de tentar jogar!");
    // window.alert("Logue antes de tentar jogar!");
    return;
  }

  window.location = "worldGame.html";
  // statusPersonagem.rankExp += 100;

  // if (statusPersonagem.rankExp >= expMaxRank) {
  //   statusPersonagem.nivelRank++;
  //   statusPersonagem.rankExp = statusPersonagem.rankExp - expMaxRank;
  // }
  // var xml = new XMLHttpRequest();
  // var data = JSON.stringify({
  //   NIVEL_RANK: statusPersonagem.nivelRank,
  //   EXP_RANK: statusPersonagem.rankExp,
  // });
  // xml.open(
  //   "PATCH",
  //   "https://sheetdb.io/api/v1/pfuk22g9ujmao/USUARIO/" +
  //     localStorage.getItem("USUARIO"),
  //   true
  // );
  // xml.setRequestHeader("Content-type", "application/json");
  // xml.setRequestHeader("Accept", "application/json");
  // xml.onreadystatechange = function () {
  //   if (xml.readyState === 4 && xml.status === 200) {
  //     alert(xml.responseText);
  //     procuraUser();
  //   }
  // };
  // xml.send(data);
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

const ocupaBotaoCarrinho = document.querySelector("#ocupa-botao-carrinho");
const ocupaBotaoCarrinho_div = document.querySelector(
  "#ocupa-botao-carrinho #texto-div"
);
const carrinhoContainer = document.querySelector("#carrinho-container");

let disable = 0;
ocupaBotaoCarrinho.addEventListener("mouseover", () => {
  disable = 0;
  let texto = document.querySelector("#texto-div");
  texto.style.visibility = "visible";
  carrinhoContainer.style.justifyContent = "flex-end";
  carrinhoContainer.style.width = "47%";
  ocupaBotaoCarrinho_div.innerHTML = "";
  setTimeout(() => {
    if (disable) {
      return;
    } else {
      setTimeout(() => {
        ocupaBotaoCarrinho_div.innerHTML = `<h4>C|</h4>`;
      }, 100);
      setTimeout(() => {
        ocupaBotaoCarrinho_div.innerHTML = `<h4>CO|</h4>`;
      }, 200);
      setTimeout(() => {
        ocupaBotaoCarrinho_div.innerHTML = `<h4>COM|</h4>`;
      }, 300);
      setTimeout(() => {
        ocupaBotaoCarrinho_div.innerHTML = `<h4>COMP|</h4>`;
      }, 400);
      setTimeout(() => {
        ocupaBotaoCarrinho_div.innerHTML = `<h4>COMPR|</h4>`;
      }, 500);
      setTimeout(() => {
        ocupaBotaoCarrinho_div.innerHTML = `<h4>COMPRA|</h4>`;
      }, 600);
      setTimeout(() => {
        ocupaBotaoCarrinho_div.innerHTML = `<h4>COMPRAR|</h4>`;
      }, 700);
    }
  }, 100);
  // ocupaBotaoCarrinho.innerHTML = `<div id="texto-div"><h4>COMPRAR</h4></div>`;
});

ocupaBotaoCarrinho.addEventListener("mouseout", () => {
  disable = 1;
  setTimeout(() => {
    let texto = document.querySelector("#texto-div");
    texto.style.visibility = "hidden";
  }, 100);
  carrinhoContainer.style.width = "2.4rem";
  if (html_body.clientHeight <= 700) {
    carrinhoContainer.style.width = "2rem";
  }
  ocupaBotaoCarrinho_div.innerHTML = "";
});

ocupaBotaoCarrinho.addEventListener("click", () => {
  carrinhoContainer.style.justifyContent = "flex-end";
  carrinhoContainer.style.width = "47%";
  desabilitar = true;
});

const mensagem = document.querySelector("#mensagem");
let perfilURL = "nada";
btn_salvarEdit.addEventListener("click", () => {
  if (!localStorage.getItem("USUARIO")) {
    warningAlert("Logue para poder editar o perfil!");
    return;
  }

  if (
    moldura.src === account_moldura.src &&
    img_perfil.src === account_img_perfil.src &&
    personagem.src === account_personagem.src
  ) {
    return;
  }

  if (perfilURL !== "nada") {
    localStorage.setItem("URL", perfilURL);
    img_perfil.src = perfilURL;
    if (
      moldura.src !== account_moldura.src ||
      personagem.src !== account_personagem.src
    ) {
      var xml = new XMLHttpRequest();
      var data = JSON.stringify({
        MOLDURA: account_moldura.src,
        PERSONAGEM: account_personagem.src,
      });
      xml.open(
        "PATCH",
        "https://sheetdb.io/api/v1/pfuk22g9ujmao/USUARIO/" +
          localStorage.getItem("USUARIO"),
        true
      );
      xml.setRequestHeader("Content-type", "application/json");
      xml.setRequestHeader("Accept", "application/json");
      xml.onreadystatechange = function () {
        if (xml.readyState === 4 && xml.status === 200) {
          if (mensagem.value !== "" && mensagem.value !== " ") {
            successAlert(mensagem.value);
          }
          procuraUser();
        }
      };
      xml.send(data);
    }
    return;
  }
  if (localStorage.URL) {
    localStorage.removeItem("URL");
  }
  var xml = new XMLHttpRequest();
  var data = JSON.stringify({
    FOTO_PERFIL: account_img_perfil.src,
    MOLDURA: account_moldura.src,
    PERSONAGEM: account_personagem.src,
  });
  xml.open(
    "PATCH",
    "https://sheetdb.io/api/v1/pfuk22g9ujmao/USUARIO/" +
      localStorage.getItem("USUARIO"),
    true
  );
  xml.setRequestHeader("Content-type", "application/json");
  xml.setRequestHeader("Accept", "application/json");
  xml.onreadystatechange = function () {
    if (xml.readyState === 4 && xml.status === 200) {
      if (mensagem.value !== "" && mensagem.value !== " ") {
        successAlert(mensagem.value);
      }
      procuraUser();
    }
  };
  xml.send(data);
});

btn_cancelarEdit.addEventListener("click", () => {
  account_moldura.src = moldura.src;
  account_moldura.style.height = `${account_moldura.clientWidth}px`;
  account_img_perfil.src = img_perfil.src;
  mensagem.value = "";
  account_personagem.src = personagem.src;
});

const inputFile = document.querySelector("#inputFile");

inputFile.addEventListener("change", (e) => {
  const fileList = e.target.files;

  for (const file of fileList) {
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      account_img_perfil.style.height = `${account_img_perfil.clientWidth}px`;
      account_img_perfil.src = event.target.result;
      perfilURL = account_img_perfil.src;
    });
    reader.readAsDataURL(file);
  }
});
