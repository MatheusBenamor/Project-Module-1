//Botão Start
window.onload = () => {
    document.getElementById("btn-start").onclick = () => {
      game.start();
    };
  };
  
  //Imagens
  const squareWall = new Image();
  squareWall.src = "images/wall.square.png";
  
  const triangleWall = new Image();
  triangleWall.src = "images/wall.triangle.png";
  
  const circleWall = new Image();
  circleWall.src = "images/wall.triangle.png";
  
  const heartWall = new Image();
  heartWall.src = "images/wall.heart.png";
  
  const gameOverImg = new Image();
  gameOverImg.src = "images/game-over.PNG"
  
  //Áudios
  const crashSound = new Audio();
  crashSound.src = "sounds/mixkit-arcade-retro-game-over-213.wav";
  
  const gameOverSound = new Audio();
  gameOverSound.src = "sounds/mixkit-falling-game-over-1942.wav";

class Game {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.frames = 0;
    this.obstacles = [];
    this.points = 0;
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

  stop = () => {
    clearInterval(this.interval);
  };

  score = () => {
    this.points = Math.floor(this.frames / 5);
    this.ctx.font = "18px serif";
    this.ctx.textAlign = "end";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(`Score: ${this.points}`, this.canvas.width - 30, 50);
  };
}

const game = new Game();

//Background
const img = new Image();
img.src =
  "https://image.freepik.com/free-vector/pink-neon-background_53876-91656.jpg";

const backgroundImage = {
  img: img,
  x: 0,
  y: -100,
  speed: -3,

  move: function () {
    this.x += this.speed;
    this.x %= game.canvas.width;
  },

  draw: function () {
    game.ctx.drawImage(this.img, this.x, this.y);
    if (this.speed < 0) {
      game.ctx.drawImage(this.img, this.x + this.img.width, this.y);
    } else {
      game.ctx.drawImage(this.img, this.x - this.img.width, this.y);
    }
  },
};

//Formas
class Component {
  constructor(x, y) {
    this.currentShape = "heart";
    this.posX = x;
    this.posY = y;
    this.ctx = game.ctx;
  }

  square = () => {
    const height = 40;
    const width = 40;
    const color = "#FFFF66";
    const ctx = game.ctx;
    ctx.fillStyle = color;
    ctx.fillRect(this.posX, this.posY, width, height);
  };

  circle = () => {
    let x = this.posX + 20;
    let y = this.posY + 20;
    const ctx = game.ctx;
    ctx.beginPath();
    ctx.fillStyle = "#50BFE6";
    ctx.arc(x, y, 25, 0, 2 * Math.PI);
    ctx.fill();
  };

  triangle = () => {
    let x = this.posX + 20;
    let y = this.posY - 10;
    const ctx = game.ctx;
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 25, y + 50);
    ctx.lineTo(x + 25, y + 50);
    ctx.fill();
  };

  heart = () => {
    let x = this.posX + 60;
    let y = this.posY + 20;
    const ctx = game.ctx;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.fillStyle = "#FF355E";
    ctx.bezierCurveTo(x - 37.5, y - 21.5, x - 40, y - 27.5, x - 50, y - 27.5);
    ctx.bezierCurveTo(x - 65, y - 27.5, x - 65, y - 8.75, x - 65, y - 8.75);
    ctx.bezierCurveTo(x - 65, y, x - 55, y + 11, x - 37.5, y + 20);
    ctx.bezierCurveTo(x - 20, y + 11, x - 10, y, x - 10, y - 8.75);
    ctx.bezierCurveTo(x - 10, y - 8.75, x - 10, y - 27.5, x - 25, y - 27.5);
    ctx.bezierCurveTo(x - 32.5, y - 27.5, x - 37.5, y - 21.5, x - 37.5, y - 22);
    ctx.fill();
  };

  update = () => {
    //if ou switch
    this[this.currentShape]();
  };

  newPos = () => {
    this.posX += this.speedX;
    this.posY += this.speedY;
  };

  left = () => {
    return this.posX;
  };

  right = () => {
    return this.posX + this.width;
  };

  top = () => {
    return this.posY;
  };

  bottom = () => {
    return this.posY + this.height;
  };

  crashWith = (obst) => {
    const freeLeft = this.left() > obst.right();
    const freeRight = this.right() < obst.left();
    const freeTop = this.top() > obst.bottom();
    const freeBottom = this.bottom() < obst.top();
    return !(freeLeft || freeRight || freeTop || freeBottom);
  };
}

const player = new Component(10, 210);
/*player.posX
player["posX"]
player.update()
player["update"]()*/

//Obstáculos
class Wall {
  constructor(x, y) {
    this.ctx = game.ctx;
    this.posX = x;
    this.posY = y;
  }

  squareWall = () => {
    this.posX = x;
    this.posY = y;
    this.img.src = "images/wall.square.png";
  };

  circleWall = () => {
    this.posX = x;
    this.posY = y;
    this.img.src = "images/wall.circle.png";
  };

  triangleWall = () => {
    this.posX = x;
    this.posY = y;
    this.img.src = "images/wall.triangle.png";
  };
  heartWall = () => {
    this.posX = x;
    this.posY = y;
    this.img.src = "images/wall.heart.png";
  };
  draw() {
    this.game.ctx.drawImage(this.img, this.posX, this.posY);
  }
  move() {
    this.y = this.y + gameArea.speed;
  }
}

function updateGameArea() {
  game.clear();
  backgroundImage.move();
  backgroundImage.draw();
  player.update();
  //updateObstacles();
  game.score();
  checkGameOver();
}

/*function checkColision {
    if player.currentShape = "square" {
        continue
    } else {
        checkGameOver();
    }
}*/


//Se desativar isso, os pontos param de contar
/*function updateObstacles () {
    game.frames += 1;
    if (game.frames % 240 === 0) {
        createObstacle();
    }
    for (let obstacle of game.obstacles) {
        obstacle.posX -= 1;
        obstacle.update();
    }
}*/

function checkGameOver() {
  const crashed = game.obstacles.some((obstacle) => {
    return player.crashWith(obstacle);
  });
  if (crashed) {
    game.stop();
    crashSound.play();
    game.clear();
    gameOverSound.play();
    const imgGameOver = new Image();
    imgGameOver.src = "images/game-over.PNG";
  }
}


//game.start();



//Comandos
window.addEventListener("load", () => {
  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "a":
        player.currentShape = "square";
        break;
      case "s":
        player.currentShape = "circle";
        break;
      case "d":
        player.currentShape = "triangle";
        break;
      case "w":
        player.currentShape = "heart";
        break;
    }
  });
});
