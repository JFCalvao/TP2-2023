const Application = PIXI.Application;
const Graphics = PIXI.Graphics;

const playStyle = new PIXI.TextStyle({
  fontFamily: '"Lucida Console", Monaco, monospace',
  fontSize: screen.width * 0.046875,
  align: "center",
});

const returnStyle = new PIXI.TextStyle({
  fontFamily: '"Lucida Console", Monaco, monospace',
  fontSize: screen.width * 0.02604,
  align: "center",
});

const topStyle = new PIXI.TextStyle({
  fontFamily: "Georgia",
  fontVariant: "small-caps",
  fill: "#ffffff",
  fontSize: screen.width * 0.0625,
});

const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
});

app.renderer.backgroundColor = "grey";

app.renderer.view.style.position = "absolute";

document.body.appendChild(app.view);

const conatinerTop = document.querySelector("#containerTop");
const editItens = document.querySelector("#editItens");
const btnReturnToMap = document.querySelector("#returnToMap");
const btnEditSounds = document.querySelector("#btnEditSounds");

//adicao do player e do escudo no cenarios

const player = PIXI.Sprite.from(localStorage.getItem("PERSONAGEM"));
const shield = PIXI.Sprite.from("imagens/shield.png");
const background = PIXI.Sprite.from("imagens/firebackground.png");

//adicao de sons
let bossMusic = new Howl({
  src: ["sons/fireMusic.wav"],
  volume: localStorage.getItem("MUSICA") / 100,
});

let shieldhitSound = new Howl({
  src: ["sons/hitSound.wav"],
  autoplay: false,
  volume: localStorage.getItem("VOLUME") / 100,
});

let playerhitSound = new Howl({
  src: ["sons/somDeMorte.wav"],
  autoplay: false,
  volume: localStorage.getItem("VOLUME") / 100,
});

//mudar o volume e a musica
const inputmusica = document.querySelector("#music");
const inputvolume = document.querySelector("#vol");
const porcentagem_musica = document.querySelector("#porcentagem-musica");
const porcentagem_volume = document.querySelector("#porcentagem-volume");
const h3_musica = document.querySelector("#porcentagem-musica h3");
const h3_volume = document.querySelector("#porcentagem-volume h3");

inputmusica.value = localStorage.getItem("MUSICA");
inputmusica.style.background =
  "linear-gradient(90deg, #41b8d5 " +
  inputmusica.value +
  "% , #eae8e5 " +
  inputmusica.value +
  "%)";
porcentagem_musica.style.width = `${
  (parseFloat(inputmusica.value) * 82.5) / 100 + 18.5
}%`;
h3_musica.innerHTML = inputmusica.value + "%";

let valMusicaAnterior = inputmusica.value;
inputmusica.addEventListener("mousemove", () => {
  let color = inputmusica.value;
  inputmusica.style.background =
    "linear-gradient(90deg, #41b8d5 " + color + "% , #eae8e5 " + color + "%)";
  porcentagem_musica.style.width = `${
    (parseFloat(color) * 82.5) / 100 + 18.5
  }%`;
  h3_musica.innerHTML = color + "%";

  if (valMusicaAnterior !== inputmusica.value) {
    localStorage.setItem("MUSICA", inputmusica.value);
    bossMusic.volume(localStorage.getItem("MUSICA") / 100);
  }
  valMusicaAnterior = inputmusica.value;
});

inputvolume.value = localStorage.getItem("VOLUME");
inputvolume.style.background =
  "linear-gradient(90deg, #41b8d5 " +
  inputvolume.value +
  "% , #eae8e5 " +
  inputvolume.value +
  "%)";
porcentagem_volume.style.width = `${
  (parseFloat(inputvolume.value) * 82.5) / 100 + 18.5
}%`;
h3_volume.innerHTML = inputvolume.value + "%";

let valVolumeAnterior = inputvolume.value;
inputvolume.addEventListener("mousemove", () => {
  let color = inputvolume.value;
  inputvolume.style.background =
    "linear-gradient(90deg, #41b8d5 " + color + "% , #eae8e5 " + color + "%)";
  porcentagem_volume.style.width = `${
    (parseFloat(color) * 82.5) / 100 + 18.5
  }%`;
  h3_volume.innerHTML = color + "%";

  if (valVolumeAnterior !== inputvolume.value) {
    localStorage.setItem("VOLUME", inputvolume.value);
    shieldhitSound.volume(localStorage.getItem("VOLUME") / 100);
    playerhitSound.volume(localStorage.getItem("VOLUME") / 100);
  }
  valVolumeAnterior = inputvolume.value;
});

app.stage.addChild(background);
app.stage.addChild(player);
app.stage.addChild(shield);

background.anchor.set(0.5);
background.scale.set(0.5, 0.5);
background.position.set(screen.width / 2, screen.height / 2);
background.width = screen.width;
background.height = screen.height;

player.anchor.set(0.5);
shield.anchor.set(0.5);

player.scale.set(screen.width / 1920, screen.height / 1080);
shield.scale.set((screen.width / 1920) * 0.8, (screen.height / 1080) * 0.8);

player.position.set(screen.width / 2, screen.height / 2.3);
shield.position.set(screen.width / 2, screen.height / 3.3);
shield.angle = 180;

//movimentacao do escudo

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" || e.key === "w") {
    shield.angle = 180;
    shield.x = screen.width / 2;
    shield.y = screen.height / 3.3;
  }
  if (e.key === "ArrowRight" || e.key === "d") {
    shield.angle = 270;
    shield.x = screen.width / 1.74;
    shield.y = screen.height / 2.3;
  }
  if (e.key === "ArrowLeft" || e.key === "a") {
    shield.angle = 90;
    shield.y = screen.height / 2.3;
    shield.x = screen.width / 2.35;
  }
  if (e.key === "ArrowDown" || e.key === "s") {
    shield.y = screen.height / 1.75;
    shield.x = screen.width / 2;
    shield.angle = 360;
  }
});

let setIntervalId;
let scoreCounter;
let scoreCounterId;
let scoreTotal = 0;

const healthText = new PIXI.Text("Vida: 200", topStyle);
healthText.x = screen.width / 2 + screen.width / 5;
app.stage.addChild(healthText);

const scoreText = new PIXI.Text("Score: 0", topStyle);
app.stage.addChild(scoreText);

function createMenu() {
  //elementos do html
  conatinerTop.style.zIndex = "10";
  btnReturnToMap.addEventListener("click", () => {
    let expMaxRank = 100;
    let aumento1 = 400;
    let aumento2 = 500;

    let xpRankAtual = parseInt(localStorage.getItem("RANK-EXP")) + scoreTotal;
    let rankAtual = parseInt(localStorage.getItem("NIVEL-RANK"));

    for (let i = 1; i < rankAtual; i++) {
      if (i % 2 === 1) {
        expMaxRank += aumento1;
        aumento1 *= 10;
      } else {
        expMaxRank += aumento2;
        aumento2 *= 10;
      }
    }

    while (xpRankAtual >= expMaxRank) {
      rankAtual++;
      xpRankAtual = xpRankAtual - expMaxRank;
      expMaxRank = 100;
      aumento1 = 400;
      aumento2 = 500;
      for (let i = 1; i < rankAtual; i++) {
        if (i % 2 === 1) {
          expMaxRank += aumento1;
          aumento1 *= 10;
        } else {
          expMaxRank += aumento2;
          aumento2 *= 10;
        }
      }
    }
    var xml = new XMLHttpRequest();
    var data = JSON.stringify({
      NIVEL_RANK: rankAtual,
      EXP_RANK: xpRankAtual,
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
        window.location = "worldGame.html";
      }
    };
    xml.send(data);
  });

  let cont = 0;
  btnEditSounds.addEventListener("click", () => {
    if (cont === 0) {
      editItens.style.display = "flex";
      cont = 1;
    } else {
      cont = 0;
      editItens.style.display = "none";
    }
  });
  //fim dos elementos do html

  const backgroundFilter = new Graphics();
  backgroundFilter
    .beginFill("rgba(23, 23, 23, 0.74)")
    .drawRect(0, 0, screen.width, screen.height)
    .endFill();

  const playBtn = new Graphics();
  playBtn
    .beginFill("rgba(128, 38, 0, 1)")
    .lineStyle(4, "rgba(71, 21, 0, 1)")
    .drawRect(
      screen.width / 2.65,
      screen.height / 4.5,
      screen.width / 4,
      screen.height / 8
    )
    .endFill();

  const menuBtn = new Graphics();
  menuBtn
    .beginFill("rgba(128, 38, 0, 1)")
    .lineStyle(4, "rgba(71, 21, 0, 1)")
    .drawRect(
      screen.width / 2.65,
      screen.height / 2.5,
      screen.width / 4,
      screen.height / 8
    )
    .endFill();

  menuBtn.interactive = true;
  menuBtn.buttonMode = true;
  menuBtn.addEventListener("click", () => {
    let expMaxRank = 100;
    let aumento1 = 400;
    let aumento2 = 500;

    let xpRankAtual = parseInt(localStorage.getItem("RANK-EXP")) + scoreTotal;
    let rankAtual = parseInt(localStorage.getItem("NIVEL-RANK"));

    for (let i = 1; i < rankAtual; i++) {
      if (i % 2 === 1) {
        expMaxRank += aumento1;
        aumento1 *= 10;
      } else {
        expMaxRank += aumento2;
        aumento2 *= 10;
      }
    }

    while (xpRankAtual >= expMaxRank) {
      rankAtual++;
      xpRankAtual = xpRankAtual - expMaxRank;
      expMaxRank = 100;
      aumento1 = 400;
      aumento2 = 500;
      for (let i = 1; i < rankAtual; i++) {
        if (i % 2 === 1) {
          expMaxRank += aumento1;
          aumento1 *= 10;
        } else {
          expMaxRank += aumento2;
          aumento2 *= 10;
        }
      }
    }
    var xml = new XMLHttpRequest();
    var data = JSON.stringify({
      NIVEL_RANK: rankAtual,
      EXP_RANK: xpRankAtual,
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
        window.location = "index.html";
      }
    };
    xml.send(data);
  });

  const playText = new PIXI.Text("PLAY", playStyle);
  playText.x = screen.width / 2.29;
  playText.y = screen.height / 4.1;

  const menuText = new PIXI.Text("RETURN TO MENU", returnStyle);
  menuText.x = screen.width / 2.55;
  menuText.y = screen.height / 2.28;

  app.stage.addChild(backgroundFilter);
  app.stage.addChild(playBtn);
  app.stage.addChild(menuBtn);
  app.stage.addChild(playText);
  app.stage.addChild(menuText);

  playBtn.interactive = true;
  playBtn.buttonMode = true;
  playBtn.addEventListener("click", () => {
    app.stage.removeChild(backgroundFilter);
    app.stage.removeChild(playBtn);
    app.stage.removeChild(menuBtn);
    app.stage.removeChild(playText);
    app.stage.removeChild(menuText);
    setIntervalId = setInterval(createFireball, 300);
    scoreCounter = 0;
    scoreText.text = "Score: " + scoreCounter;
    scoreCounterId = setInterval(() => {
      scoreText.text = "Score:" + " " + scoreCounter;
      scoreCounter++;
    }, 250);
    player.health = 200;
    conatinerTop.style.zIndex = "-1";
    healthText.text = "Vida: " + player.health;
    cont = 0;
    editItens.style.display = "none";
    bossMusic.play();
  });
}

//spawna o projetil
createMenu();

function createFireball() {
  const fireball = PIXI.Sprite.from("imagens/bolaDeFogo.png");
  fireball.cont = 0;
  fireball.gameState = 1;
  fireball.hitMark = 1;
  fireball.sound = 1;
  fireball.anchor.set(0.5);
  fireball.scale.set(0.5, 0.5);
  let direcao = decisaoDeSpawn(fireball);

  app.stage.addChild(fireball);

  app.ticker.add((delta) => gameLoop(delta, fireball, direcao));
}

//spawna o projetil em um dos 4 lugares possiveis

function decisaoDeSpawn(fireball) {
  let decisor = getRndInteger(0, 4);

  switch (decisor) {
    case 0:
      fireball.position.set(screen.width, screen.height / 2.3);
      fireball.angle = 360;
      break;
    case 1:
      fireball.position.set(screen.width / 2, 0);
      fireball.angle = 270;
      break;
    case 2:
      fireball.position.set(0, screen.height / 2.3);
      fireball.angle = 180;
      break;
    case 3:
      fireball.position.set(screen.width / 2, screen.height);
      fireball.angle = 90;
      break;
  }

  return decisor;
}

//geracao de um numero inteiro(necessario para a decisao do spawn)

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//game loop

function gameLoop(delta, fireball, direcao) {
  switch (direcao) {
    case 0:
      fireball.x -= 5;
      break;
    case 1:
      fireball.y += 5;
      break;
    case 2:
      fireball.x += 5;
      break;
    case 3:
      fireball.y -= 5;
      break;
  }

  if (colisao(shield, fireball)) {
    app.stage.removeChild(fireball);
    fireball.hitMark = 0;

    if (fireball.sound == 1) {
      shieldhitSound.play();
      fireball.sound = 0;
    }
  }

  if (colisao(player, fireball)) {
    app.stage.removeChild(fireball);
    if (fireball.cont == 0 && fireball.hitMark == 1) {
      fireball.cont++;
      fireball.sound = 0;
      player.health -= 50;
      healthText.text = "Vida: " + player.health;
      playerhitSound.play();

      if (player.health === 0) {
        clearInterval(setIntervalId);
        clearInterval(scoreCounterId);
        scoreTotal += parseInt(scoreCounter) - 1;
        bossMusic.stop();
        createMenu();
      }
    }
  }

  if (player.health === 0 && fireball.gameState === 1) {
    app.stage.removeChild(fireball);
    fireball.gameState = 0;
    fireball.hitmark = 0;
    fireball.cont++;
    fireball.sound = 0;
  }
}

//mecanica de colisao retangular entre os objetos a e b

function colisao(a, b) {
  let hitboxA = a.getBounds();
  let hitboxB = b.getBounds();

  return (
    hitboxA.x + hitboxA.width > hitboxB.x &&
    hitboxA.x < hitboxB.x + hitboxB.width &&
    hitboxA.y + hitboxA.height > hitboxB.y &&
    hitboxA.y < hitboxB.y + hitboxB.height
  );
}
