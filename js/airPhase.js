const Application = PIXI.Application;
const Graphics = PIXI.Graphics;

const style = new PIXI.TextStyle({
  fontFamily: 'Encode Sans',
  fontSize: 48
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
const background = PIXI.Sprite.from("imagens/airbackground.jpg");

//adicao de sons

const shieldhitSound = new Howl({
  src: ['sons/hitSound.wav'],
  autoplay: true,
  volume: (localStorage.getItem("VOLUME")/100),
});

const playerhitSound = new Howl({
  src: ['sons/somDeMorte.wav'],
  autoplay: true,
  volume: (localStorage.getItem("VOLUME")/100),
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
shield.scale.set(0.8, 0.8);

player.position.set(screen.width / 2, screen.height / 2.3);
shield.position.set(screen.width / 2, screen.height / 3.3);
shield.angle = 180;

//movimentacao do escudo

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" || e.key === "W") {
    shield.angle = 180;
    shield.x = screen.width / 2;
    shield.y = screen.height / 3.3;
  }
  if (e.key === "ArrowRight" || e.key ===  "D") {
    shield.angle = 270;
    shield.x = screen.width / 1.74;
    shield.y = screen.height / 2.3;
  }
  if (e.key === "ArrowLeft" || e.key === "A") {
    shield.angle = 90;
    shield.y = screen.height / 2.3;
    shield.x = screen.width / 2.35;
  }
  if (e.key === "ArrowDown" || e.key === "S") {
    shield.y = screen.height / 1.75;
    shield.x = screen.width / 2;
    shield.angle = 360;
  }
});

function createMenu() {
  const backgroundFilter = new Graphics();
  backgroundFilter.beginFill('rgba(23, 23, 23, 0.74)')
  .drawRect(0, 0, screen.width, screen.height)
  .endFill();

  const playBtn = new Graphics();
  playBtn.beginFill('rgba(128, 38, 0, 1)')
  .lineStyle(4, 'rgba(71, 21, 0, 1)')
  .drawRect(screen.width / 2.65, screen.height / 4.5, screen.width / 4, screen.height / 8)
  .endFill();
  
  const menuBtn = new Graphics();
  playBtn.beginFill('rgba(128, 38, 0, 1)')
  .lineStyle(4, 'rgba(71, 21, 0, 1)')
  .drawRect(screen.width / 2.65, screen.height / 2.5, screen.width / 4, screen.height / 8)
  .endFill();
  
  const playText = new PIXI.Text('PLAY', style);
  playText.x = screen.width / 3;
  playText.y = screen.height / 3.9;
  
  const menuText = new PIXI.Text('RETURN TO MENU', style);
  playText.x = screen.width / 2.2;
  playText.y = screen.height / 3.9;
  
  app.stage.addChild(backgroundFilter);
  app.stage.addChild(playBtn);
  app.stage.addChild(menuBtn);
  app.stage.addChild(playText);
  app.stage.addChild(menuText);
}

// setInterval(createAirball, 1000);
//spawna o projetil
createMenu();

function createAirball() {
  const airball = PIXI.Sprite.from("imagens/airball.png");
  airball.cont = 0;
  airball.hitMark = 1;
  airball.sound = 1;
  airball.anchor.set(0.5);
  airball.scale.set(0.3, 0.3);
  let direcao = decisaoDeSpawn(airball);

  app.stage.addChild(airball);

  app.ticker.add((delta) => gameLoop(delta, airball, direcao));
}

//spawna o projetil em um dos 4 lugares possiveis

function decisaoDeSpawn(airball) {
  let decisor = getRndInteger(0, 4);

  switch (decisor) {
    case 0:
      airball.position.set(screen.width, screen.height / 2.3);
      airball.angle = 90;
      break;
    case 1:
      airball.position.set(screen.width / 2, 0);
      airball.angle = 360;
      break;
    case 2:
      airball.position.set(0, screen.height / 2.3);
      airball.angle = 270;
      break;
    case 3:
      airball.position.set(screen.width / 2, screen.height);
      airball.angle = 180;
      break;
  }

  return decisor;
}

//geracao de um numero inteiro(necessario para a decisao do spawn)

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//game loop

function gameLoop(delta, airball, direcao) {
  switch (direcao) {
    case 0:
      airball.x -= 12;
      break;
    case 1:
      airball.y += 12;
      break;
    case 2:
      airball.x += 12;
      break;
    case 3:
      airball.y -= 12;
      break;
  }

  if (colisao(shield, airball)) {
    app.stage.removeChild(airball);
    airball.hitMark = 0;

    if(airball.sound == 1) {
      shieldhitSound.play();
      airball.sound = 0;
    }
  }

  if (colisao(player, airball)) {
    app.stage.removeChild(airball);
    if (airball.cont == 0 && airball.hitMark == 1) {
      airball.cont++;
      airball.sound = 0;
      playerhitSound.play();
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
