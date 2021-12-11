class Game {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.frames = 0;
    this.obstacles = [];
  }
  start = () => {
    this.canvas.width = 626;
    this.canvas.height = 300;
    this.ctx = this.canvas.getContext("2d");
    document.getElementById("game-area").appendChild(this.canvas);
    this.interval = setInterval(updateGameArea, 40);
  };

  //Vai limpar a tela, para dar a impressão de movimentação
  clear = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };
}

const game = new Game();

const img = new Image();
img.src = 'https://image.freepik.com/free-vector/pink-neon-background_53876-91656.jpg';

const backgroundImage = {
    img: img,
    x: 0,
    y: -100,
    speed: -2,
  
    move: function() {
      this.x += this.speed;
      this.x %= game.canvas.width;
    },
  
    draw: function() {
      game.ctx.drawImage(this.img, this.x, this.y);
      if (this.speed < 0) {
        game.ctx.drawImage(this.img, this.x + this.img.width, this.y);
      } else {
        game.ctx.drawImage(this.img, this.x - this.img.width, this.y);
      }
    },
  };

class Component {
  constructor(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.posX = x;
    this.posY = y;
    this.speedX = 0;
    this.speedY = 0;
    //Não preciso do speed pois minhas formas ficarão paradas
  }

  update = () => {
    const ctx = game.ctx;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.posX, this.posY, this.width, this.height);
  };

  newPos = () => {
    this.posX += this.speedX;
    this.posY += this.speedY;
  };
}

const player = new Component(40, 40, "#FFFF66", 10, 210);
const circle = new Component();
const triangle = new Component();

//função responsável pelo movimento
function updateGameArea() {
  game.clear();
  backgroundImage.move();
  backgroundImage.draw();
  player.update();
}

function createObstacle() {
  const posX = game.canvas.width;
}

game.start();

window.addEventListener("load", () => {
  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "a":
        player.color = "red";
        break;
      case "s":
        player.color = "yellow";
        break;
      case "d":
        player.color = "blue";
        break;
    }
  });
});

//class Formas {

//fazer método para cada um
//método draw e fazer 1 por 1

/*//Forma Círculo
    ctx.beginPath();
    ctx.fillStyle = '#50BFE6'
    ctx.arc(150, 150, 25, 0, 2 * Math.PI);
    ctx.fill ();
    ctx.stroke();

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

    //Forma Triângulo
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.moveTo(75,50);
    ctx.lineTo(50,100);
    ctx.lineTo(100,100);
    ctx.fill();
    

    //Obstáculo quadrado
    ctx.strokeStyle = '#FFFF66'
    ctx.rect(220, 20, 40, 40);
    ctx.stroke();
    */
