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
  fontSize: screen.width * 0.0625
})


const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
});

app.renderer.backgroundColor = "grey";

app.renderer.view.style.position = "absolute";

document.body.appendChild(app.view);

//adicao do player e do escudo no cenarios

const player = PIXI.Sprite.from(localStorage.getItem("PERSONAGEM"));
const shield = PIXI.Sprite.from("imagens/shield.png");
const background = PIXI.Sprite.from("imagens/rockbackground.png");

//adicao de sons

const bossMusic = new Howl({
  src: ['sons/rockMusic.wav'],
  volume: (localStorage.getItem("MUSICA")/100)
});

const shieldhitSound = new Howl({
  src: ["sons/hitSound.wav"],
  autoplay: true,
  volume: localStorage.getItem("VOLUME") / 100,
});

const playerhitSound = new Howl({
  src: ["sons/somDeMorte.wav"],
  autoplay: true,
  volume: localStorage.getItem("VOLUME") / 100,
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
  if (e.key === "ArrowUp") {
    shield.angle = 180;
    shield.x = screen.width / 2;
    shield.y = screen.height / 3.3;
  }
  if (e.key === "ArrowRight") {
    shield.angle = 270;
    shield.x = screen.width / 1.74;
    shield.y = screen.height / 2.3;
  }
  if (e.key === "ArrowLeft") {
    shield.angle = 90;
    shield.y = screen.height / 2.3;
    shield.x = screen.width / 2.35;
  }
  if (e.key === "ArrowDown") {
    shield.y = screen.height / 1.75;
    shield.x = screen.width / 2;
    shield.angle = 360;
  }
});

let setIntervalId;
let scoreCounter;
let scoreCounterId;
let scoreTotal = 0;

const healthText = new PIXI.Text('Vida: 200', topStyle);
healthText.x = screen.width / 2 + screen.width / 5;
app.stage.addChild(healthText);

const scoreText = new PIXI.Text('Score: 0', topStyle);
app.stage.addChild(scoreText);

function createMenu() {
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

    if (xpRankAtual >= expMaxRank) {
        rankAtual++;
        xpRankAtual = xpRankAtual - expMaxRank;
      }
      // console.log(rankAtual);
      // console.log(xpRankAtual);
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
          // alert(xml.responseText);
          // alert(scoreTotal);
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
    setIntervalId = setInterval(createRockball, 400);
    scoreCounter = 0;
    scoreText.text = 'Score: 0';
    scoreCounterId = setInterval(() => {
      scoreText.text = 'Score:' + ' ' + scoreCounter;
      scoreCounter++;
      }, 1000)
      player.health = 200;
      bossMusic.play();
  });
}

//spawna o projetil
createMenu();

function createRockball() {
  const rockball = PIXI.Sprite.from("imagens/rockball.png");
  rockball.cont = 0;
  rockball.hitMark = 1;
  rockball.sound = 1;
  rockball.anchor.set(0.5);
  rockball.scale.set(0.3, 0.3);
  let direcao = decisaoDeSpawn(rockball);

  app.stage.addChild(rockball);

  app.ticker.add((delta) => gameLoop(delta, rockball, direcao));
}

//spawna o projetil em um dos 4 lugares possiveis

function decisaoDeSpawn(rockball) {
  let decisor = getRndInteger(0, 4);

  switch (decisor) {
    case 0:
      rockball.position.set(screen.width, screen.height / 2.3);
      rockball.angle = 310;
      break;
    case 1:
      rockball.position.set(screen.width / 2, 0);
      rockball.angle = 220;
      break;
    case 2:
      rockball.position.set(0, screen.height / 2.3);
      rockball.angle = 140;
      break;
    case 3:
      rockball.position.set(screen.width / 2, screen.height);
      rockball.angle = 40;
      break;
  }

  return decisor;
}

//geracao de um numero inteiro(necessario para a decisao do spawn)

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//game loop

function gameLoop(delta, rockball, direcao) {
  switch (direcao) {
    case 0:
      rockball.x -= 1;
      break;
    case 1:
      rockball.y += 1;
      break;
    case 2:
      rockball.x += 1;
      break;
    case 3:
      rockball.y -= 1;
      break;
  }

  if (colisao(shield, rockball)) {
    app.stage.removeChild(rockball);
    rockball.hitMark = 0;

    if (rockball.sound == 1) {
      shieldhitSound.play();
      rockball.sound = 0;
    }
  }

  if (colisao(player, rockball)) {
    app.stage.removeChild(rockball);
    if (rockball.cont == 0 && rockball.hitMark == 1) {
      rockball.cont++;
      rockball.sound = 0;
      player.health -= 50;
      healthText.text = 'Vida: ' + player.health;
      playerhitSound.play();

      if (player.health === 0) {
        clearInterval(setIntervalId);
        clearInterval(scoreCounterId);
        scoreTotal+= parseInt(scoreCounter) - 1;
        bossMusic.stop();
        createMenu();
      }
    }
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
