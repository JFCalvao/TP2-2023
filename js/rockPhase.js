const Application = PIXI.Application;
const Graphics = PIXI.Graphics;

const app = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
});  

app.renderer.backgroundColor = 'grey';

app.renderer.view.style.position = 'absolute';

document.body.appendChild(app.view)

//adicao do player e do escudo no cenarios

const player = PIXI.Sprite.from(localStorage.getItem("PERSONAGEM"));
const shield = PIXI.Sprite.from('imagens/shield.png');
const background = PIXI.Sprite.from('imagens/rockbackground.png');

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
background.position.set(screen.width / 2, screen.height / 2)
background.width = screen.width;
background.height = screen.height;

player.anchor.set(0.5);
shield.anchor.set(0.5);
shield.scale.set(0.8, 0.8);

player.position.set(screen.width / 2, screen.height / 2.3);

shield.position.set(screen.width / 2, screen.height / 3.3);
shield.angle = 180;

//movimentacao do escudo

document.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowUp')
    {
        shield.angle = 180;
        shield.x = screen.width / 2;
        shield.y = screen.height / 3.3;
    }
    if(e.key === 'ArrowRight')
    {
        shield.angle = 270;
        shield.x = screen.width / 1.74;
        shield.y = screen.height / 2.3;

    }
    if(e.key === 'ArrowLeft')
    {
        shield.angle = 90;
        shield.y = screen.height / 2.3;
        shield.x = screen.width / 2.35;
    }
    if(e.key === 'ArrowDown')
    {
        shield.y = screen.height / 1.75;
        shield.x = screen.width / 2;
        shield.angle = 360;
    }
})

//o que decide em quanto tempo sera spawnada o projetil

setInterval(createRockball, 400);

//spawna o projetil

function createRockball() {
    const rockball = PIXI.Sprite.from('imagens/rockball.png');
    rockball.cont = 0;
    rockball.hitMark = 1;
    rockball.sound = 1;
    rockball.anchor.set(0.5);
    rockball.scale.set(0.3, 0.3);
    let direcao = decisaoDeSpawn(rockball);

    app.stage.addChild(rockball);

    app.ticker.add(delta => gameLoop(delta, rockball, direcao))
}

//spawna o projetil em um dos 4 lugares possiveis

function decisaoDeSpawn(rockball) {
    let decisor = getRndInteger(0, 4);

    switch (decisor) {
        case 0:
        rockball.position.set(screen.width, screen.height / 2.3); 
        rockball.angle = 310; break;
        case 1:
        rockball.position.set(screen.width / 2, 0);
        rockball.angle = 220; break;
        case 2:
        rockball.position.set(0, screen.height / 2.3);
        rockball.angle = 140; break;
        case 3:
        rockball.position.set(screen.width / 2, screen.height);
        rockball.angle = 40; break;
    }

    return decisor;
}

//geracao de um numero inteiro(necessario para a decisao do spawn)

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

//game loop

function gameLoop(delta, rockball, direcao) {
    switch (direcao) {
        case 0:
            rockball.x -= 1; break;
        case 1:
            rockball.y += 1; break;
        case 2:
            rockball.x += 1; break;
        case 3:
            rockball.y -= 1; break;
        }

        if(colisao(shield, rockball)) {
            app.stage.removeChild(rockball);
            rockball.hitMark = 0;

            if(rockball.sound == 1) {
                shieldhitSound.play();
                rockball.sound = 0;
            }
        }
        
        if(colisao(player, rockball)) {
            app.stage.removeChild(rockball);
            if(rockball.cont == 0 && rockball.hitMark == 1) { 
                rockball.cont++; 
                rockball.sound = 0;
                playerhitSound.play();
            }
        }
}

//mecanica de colisao retangular entre os objetos a e b

function colisao(a , b) {
    let hitboxA = a.getBounds();
    let hitboxB = b.getBounds();

        return hitboxA.x + hitboxA.width > hitboxB.x &&
               hitboxA.x < hitboxB.x + hitboxB.width &&
               hitboxA.y + hitboxA.height > hitboxB.y &&
               hitboxA.y < hitboxB.y + hitboxB.height;
}