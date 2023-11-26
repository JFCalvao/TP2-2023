const Application = PIXI.Application;
const Graphics = PIXI.Graphics;

const app = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
});  

app.renderer.backgroundColor = 'grey';

app.renderer.view.style.position = 'absolute';

document.body.appendChild(app.view)

const player = PIXI.Sprite.from(localStorage.getItem("PERSONAGEM"));
const shield = PIXI.Sprite.from('images/shieldTeste.png');

app.stage.addChild(player);
app.stage.addChild(shield);

player.anchor.set(0.5);
shield.anchor.set(0.5);

player.position.set(screen.width / 2, screen.height / 2);

shield.scale.x = 0.2;
shield.scale.y = 0.2;
shield.position.set(screen.width / 2, screen.height / 3);

shield.interactive = true;

document.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowRight')
    {
        shield.x = screen.width / 1.7;
        shield.y = screen.height / 2;

    }
    if(e.key === 'ArrowUp')
    {
        shield.x = screen.width / 2;
        shield.y = screen.height / 3;
    }
    if(e.key === 'ArrowLeft')
    {
        shield.y = screen.height / 2;
        shield.x = screen.width / 2.5;
    }
    if(e.key === 'ArrowDown')
    {
        shield.y = screen.height / 1.5;
        shield.x = screen.width / 2;
    }
})