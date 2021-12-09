class Game {
constructor(){
    this.canvas

}
    start = () => {

    }
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//class Formas{
//Forma Círculo

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



//}