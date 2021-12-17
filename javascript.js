//Botão Start
window.onload = () => {
    document.getElementById("btn-start").onclick = () => {
      game.start();
    };
  };

//Botão Restart
/*window.onload = () => {
    document.getElementById("btn-reset").onclick = () => {
      restart();
    };
  }*/

  //Imagens
  const squareWall = new Image();
  squareWall.src = "images/wall.square.png";
  
  const triangleWall = new Image();
  triangleWall.src = "images/wall.triangle.png";
  
  const circleWall = new Image();
  circleWall.src = "images/wall.circle.png";
  
  const heartWall = new Image();
  heartWall.src = "images/wall.heart.png";
  
  const gameOverImg = new Image();
  gameOverImg.src = "images/game-over.PNG"
  
  //Áudios
  const crashSound = new Audio();
  crashSound.src = "sounds/mixkit-arcade-retro-game-over-213.wav";
  
  const gameOverSound = new Audio();
  gameOverSound.src = "sounds/mixkit-falling-game-over-1942.wav";

  const winSound = new Audio();
  winSound.src = "sounds/win-sound.wav"
  
class Game {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.frames = 0;
    this.obstacles = [];
    this.points = 0;
    this.speed = 3;
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
  constructor(x, y, currentWall) {
    this.ctx = game.ctx;
    this.posX = x;
    this.posY = y;
    this.currentWall = currentWall;
    this[currentWall]();
  }

  squareWall = () => {
    this.img = squareWall;
    this.shape = "square";
 };

  circleWall = () => {
    this.img = circleWall;
    this.shape = "circle"
  };

  triangleWall = () => {
    this.img = triangleWall;
    this.shape = "triangle"
  };
  heartWall = () => {
    this.img = heartWall;
    this.shape = "heart"
  };
  draw() {
    game.ctx.drawImage(this.img, this.posX, this.posY);
  }
  move() {
    this.posX = this.posX - game.speed;
  }
}

//Criando as paredes
function createWall() {
const wall = new Wall (game.canvas.width, 150, selectRandomWall())
game.obstacles.push(wall)
}

//Atualizando as paredes
function updateWalls() {
    game.frames += 1;
if (game.frames % 120 === 0) {
    createWall();
}
for (let obstacle of game.obstacles) {
    obstacle.move();
    obstacle.draw();
}
}

//Faz com que as paredes venham de forma aleatória
function selectRandomWall () {
    const wallTypes = ["squareWall", "circleWall", "triangleWall", "heartWall"];
    let randomWall = wallTypes[Math.floor(Math.random() * wallTypes.length)];
    let chooseWall = (`${randomWall}`);
    return chooseWall;
}

//Muda a velocidade depois de atingir um N de pontos
function speeder () {
    if (game.points === 100) {
    game.speed = 12;
    }
    if (game.points === 200){
    game.speed = 20;
    }
}  

//Jogo termina quando ganha 1.000 pontos
function winner () {
    if (game.points === 1000) {
        const winnerImg = new Image()
        winnerImg.src = "images/you-win.jpg"
        clearInterval(game.interval)
        game.clear()
        winnerImg.onload = function() {
        game.ctx.drawImage(winnerImg, 0, 0)
        }
        console.log(winnerImg)
        winSound.play();
        }
    }

    /*function gameOverScreen () {
        if (checkGameOver()) {
        clearInterval(game.interval)
        game.clear()
        ctx.drawImage(gameOverImg, 0, 0)
        console.log(gameOverImg)
        }
    }*/
    

/*function restart () {
    game.clear();
    const player = new Component(10, 210);
    player.update();
    game.obstacles = [];
    updateWalls();
    game.frames = 0;
    game.points = 0;
    game.speed = 3;
    game.start();
}*/

function updateGameArea() {
  game.clear();
  backgroundImage.move();
  backgroundImage.draw();
  game.score();
  updateWalls();
  player.update();
  speeder();
  game.score();
  checkColision ();
  winner();
  //checkGameOver();
}

//Verifica a colisão
function checkColision () {
    game.obstacles.forEach((obstacle) => {
    const crashed = player.crashWith(obstacle);
    console.log(crashed)
    if (crashed) {
    console.log("bateu!");
    //checkShape();
    }    
  });
}
 
//Checa a colisão para ver se passa ou não
/*function checkShape () {
    if (game.player.currentShape === Wall.shape) {
        continue; 
    } else {
        checkGameOver();
        }
    }*/


/*function checkColision {
1)Race car detectar colisão preciso da right
posição das figuras
    let formX = player.posX;
    let formY = player.posY;

    posição x da figura com o final da parede, quando eles forem iguais faz a colisão
    let wallX = Wall.posX;
    let wallY = Wall.posY;
    let squareSize = Wall."squareWall".width;
    let circleSize = Wall.""
    let triangleSize = 


    
2) se bateu, Verificar se as imagens são iguais
 para cada parametro ele verifica se o current shape é igual ao shape do obstaculo, se for igual passa se não game over
    se for true continua
    if ( > player.currentShape = "square" {
        continue
    } else {
        checkGameOver();
    }
}*/


/*function checkGameOver() {
  const crashed = game.obstacles.some((obstacle) => {
    return player.crashWith(obstacle);
  });
  if (crashed) {
    game.stop();
    crashSound.play();
    gameOverSound.play();
    game.clear();
    img = gameOverImg;
  }
}*/


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
