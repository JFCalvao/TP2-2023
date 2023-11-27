const Application = PIXI.Application;
const Graphics = PIXI.Graphics;

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
const background = PIXI.Sprite.from("imagens/firebackground.png");
// const backgroundFilter = new Graphics();

// backgroundFilter.beginFill('grey')
// .drawRect(0, 0, screen.width, screen.height)
// .alpha(0.4)
// .endFill;

app.stage.addChild(background);
//app.stage.addChild(backgroundFilter);
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

//o que decide em quanto tempo sera spawnada o projetil

setInterval(createFireball, 300);

//spawna o projetil

function createFireball() {
  const fireball = PIXI.Sprite.from("imagens/fireball.png");
  fireball.cont = 0;
  fireball.hitMark = 1;
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
  }

  if (colisao(player, fireball)) {
    app.stage.removeChild(fireball);
    if (fireball.cont == 0 && fireball.hitMark == 1) {
      window.alert("hit!");
      fireball.cont++;
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
