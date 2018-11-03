"use strict";

let canvas;
let canvasContext;
let go = 1;
let score = 0;
let screen = 1;
let gameover = false;

window.onload = function start() {
    canvas = document.getElementById("myCanvas");
    canvasContext = canvas.getContext("2d");
    if (go == 1){
        setInterval(function() {
			moveAll();
			draw();
			checkKey();
            }, 100);
	}
};

function moveAll(){
	if (screen == 2) {
		moveSnake();
		checkApple();
		checkGameover();
	}
}

let unit = 20;

let snake = {
	length: 1,
	x: 400,
	y: 400,
	trail:[]
};

let apple = {
	x:20+(20*(Math.round(Math.random()*37))),
	y:20+(20*(Math.round(Math.random()*37)))
};

function checkApple(){ 	
	if (snake.x>=apple.x && snake.x<apple.x+unit && snake.y>=apple.y && snake.y<apple.y+unit){
		apple.x = 20+(20*(Math.round(Math.random()*37)));
		apple.y = 20+(20*(Math.round(Math.random()*37)));
		for (let i = 0; i < snake.trail.length; i++){
			if (apple.x == snake.trail[i].x && apple.y == snake.trail[i].y){
				apple.x = 20+(20*(Math.round(Math.random()*37)));
				apple.y = 20+(20*(Math.round(Math.random()*37)));
			}
		}
		snake.length+=2;
		score += 10;
	}
}

function moveSnake() {
	if (arrowUp === true){
		snake.y -= unit;
	}
	if (arrowDown === true){
		snake.y += unit;
	}
	if (arrowRight === true){
		snake.x += unit;
	}
	if (arrowLeft === true){
		snake.x -= unit;
	}

	if (snake.x < 0 || snake.x > canvas.width-unit || snake.y < 0 || snake.y > canvas.height-unit) {
		gameover = true;
	}
	
	snake.trail.push({x:snake.x, y:snake.y});
	
	while (snake.trail.length>snake.length){
		snake.trail.shift();
	}
	
	for (let i = 2; i < snake.trail.length; i++){
		if(snake.trail[1].x == snake.trail[i].x && snake.trail[1].y == snake.trail[i].y){
			gameover = true;
		}	
	}
}

function checkGameover(){
	if(gameover === true){
		snake.length = 1;
		snake.x = 400;
		snake.y = 400;
		snake.trail = [];
		apple.x = 20+(20*(Math.round(Math.random()*37)));
		apple.y = 20+(20*(Math.round(Math.random()*37)));
		arrowUp = false;
		arrowDown = false;
		arrowRight = false;
		arrowLeft = false;
		screen = 3;
	}
}


function draw(){
	if (screen == 1) {
		canvasContext.fillStyle = "#336600";
		canvasContext.fillRect(0, 0, canvas.width, canvas.height);
		canvasContext.fillStyle = "#ffffff";
		canvasContext.textAlign = "center";
		canvasContext.fillText("Snake", canvas.width/2, 300);
		canvasContext.font = "100px Comic Sans MS";
		canvasContext.fillText("Press 1 to begin", canvas.width/2, 500);
	}
	
	if (screen == 2) {
		canvasContext.fillStyle = "#336600";
		canvasContext.fillRect(0, 0, canvas.width, canvas.height);
		
		canvasContext.fillStyle = "#66ff33";
		for (let i = 0; i < snake.trail.length; i++){
			canvasContext.fillRect(snake.trail[i].x, snake.trail[i].y, unit, unit);
		}
		
		canvasContext.fillStyle = "#ff0000";
		canvasContext.fillRect(apple.x, apple.y, unit, unit);
		
		canvasContext.font = "20px Comic Sans MS";
		canvasContext.fillStyle = "#ffffff";
		canvasContext.textAlign = "left";
		canvasContext.fillText("Score: " + score, 5, 20);
	}
		
	if (screen == 3) {		
		canvasContext.fillStyle = "#336600";
		canvasContext.fillRect(0, 0, canvas.width, canvas.height);
		canvasContext.font = "70px Comic Sans MS";
		canvasContext.fillStyle = "#ffffff";
		canvasContext.textAlign = "center";
		canvasContext.fillText("Press 1 to restart", canvas.width/2, 300);
		canvasContext.fillText("Your score was: " + score, canvas.width/2, 500);
	}
}

let arrowUp = false;
let arrowDown = false;
let arrowRight = false;
let arrowLeft = false;

function checkKey() {
    document.onkeydown = function myFunction() {
        switch (event.keyCode) {
            case 38:
				if (arrowDown === false){
					arrowUp = true;
					arrowDown = false;
					arrowRight = false;
					arrowLeft = false;
				}
				break;
            case 37:
				if (arrowRight === false){
					arrowLeft = true;
					arrowRight = false;
					arrowUp = false;
					arrowDown = false;
				}
				break;
            case 39:
				if (arrowLeft === false){
					arrowRight = true;
					arrowLeft = false;    
					arrowUp = false;
					arrowDown = false;
				}
				break;
            case 40:
                if (arrowUp === false){
					arrowDown = true;
					arrowUp = false;
					arrowRight = false;
					arrowLeft = false;
				}
				break;
			case 49:
				if (gameover === true){
					gameover = false;
					score = 0;
				}
				screen = 2;
        }
    };
}
