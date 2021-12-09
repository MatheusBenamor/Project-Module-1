class Game {
constructor(){
    this.canvas = document.createElement('canvas')
    this.frames = 0;
    this.obstacles = [];
}
    start = () => {
        this.canvas.width = 800;
        this.canvas.height = 300;
        this.ctx = this.canvas.getContext('2d')
        document.getElementById('game-area').appendChild(this.canvas);
        this.interval = setInterval(updateGameArea, 40);
    }

    //Vai limpar a tela, para dar a impressão de movimentação
    clear = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

const game = new Game();

class Component {
    constructor(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.posX = x;
        this.posY = y;
        this.speedX = 0;
        this.speedY = 0;
                
    }

    update = () => {
        const ctx = game.ctx;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posX, this.posY, this.width, this.height);
    }

    newPos = () => {
        this.posX += this.speedX;
        this.posY += this.speedY;
    }
}

const player = new Component(40, 40, "#FFFF66", 10, 210);
const circle = new Component();
const triangle = new Component();

//função responsável pelo movimento
function updateGameArea() {
    game.clear();
    player.update();
}

function createObstacle() {
    const posX = game.canvas.width;
    
}


game.start();

window.addEventListener('load', () => {
document.addEventListener('keydown', (e) => {
    switch (e.key) {
    case 'a':
     Component.color = 'purple';
     break;
   case 's':
     Component.color = 'red';
     break;
   case 'd':
     Component.color = 'blue';
     break;

    }
})
})

//class Formas{
//Forma Círculo
// circle = new Component(150, 150, 25, 0, 20 * Math.PI);
/*
ctx.beginPath();
ctx.fillStyle = '#50BFE6'
ctx.arc(150, 150, 25, 0, 2 * Math.PI);
ctx.fill ();
ctx.stroke();



//Forma triângulo

//Forma quadrado
ctx.fillStyle = '#FFFF66';
ctx.fillRect(75, 40, 40, 40);

//Forma Coração
ctx.beginPath();
ctx.moveTo(75,40);
ctx.fillStyle = '#FF355E';
ctx.bezierCurveTo(37.5,18.5,35,12.5,25,12.5);
ctx.bezierCurveTo(10,12.5,10,31.25,10,31.25);
ctx.bezierCurveTo(10,40,20,51,37.5,60);
ctx.bezierCurveTo(55,51,65,40,65,31.25);
ctx.bezierCurveTo(65,31.25,65,12.5,50,12.5);
ctx.bezierCurveTo(42.5,12.5,37.5,18.5,37.5,18);
ctx.fill();


*/

