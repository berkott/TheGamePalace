"use strict";

let canvas;
let canvasContext;
let go = 1;
let score = 0;
let screen = 1;

window.onload = function start() {
    canvas = document.getElementById("myCanvas");
    canvasContext = canvas.getContext("2d");
    if (go == 1){
        setInterval(function() {
			draw();
			moveAll();
			checkKey();
            }, 25);
	}
};

let playerX = 250;

function moveAll(){
	if (screen == 2) {
		movePlayer();
		moveBall();
	}
}

function movePlayer(){
	let playerSpeed = 10;
	if (arrowLeft === true ){
		playerX = playerX - playerSpeed;
	}
	if (arrowRight === true) {
		playerX = playerX + playerSpeed;
	}
	if (playerX<0){
		playerX = 0;
	}
	if (playerX>500){
		playerX = 500;
	}
}

let ballX = 290;
let ballY = 50;
let ballSpeed = 15;

let ballDirX = (Math.random()/2)+.25;
let ballDirY = 1 - ballDirX;

function moveBall(){
	ballX = ballX + (ballDirX * ballSpeed);
	ballY = ballY + (ballDirY * ballSpeed);
	
	if (ballX > 580){
		ballDirX = ballDirX * -1;
	}
	
	if (ballX < 0){
		ballDirX = ballDirX * -1;
	}
	
	if (ballY < 0){
		ballDirY = ballDirY * -1;
	}
	
	if (ballY > 520 && ballY<540 && ballX > playerX && ballX < playerX + 100){
		ballDirY = ballDirY * -1;
		score = score + 10;
		ballSpeed = ballSpeed + 1;
	} 
	
	if (ballY > 600) {
		screen = 3;
		ballX = 290;
		ballY = 50;
		ballSpeed = 15;
		ballSpeed = 15;
		ballDirX = (Math.random()/2)+.25;
		ballDirY = 1 - ballDirX;
		playerX = 250;
	}
}

function draw(){
	if (screen == 1) {
		canvasContext.fillStyle = "#cccccc";
		canvasContext.fillRect(0, 0, canvas.width, canvas.height);
		canvasContext.font = "100px Comic Sans MS";
		canvasContext.fillStyle = "#000000";
		canvasContext.textAlign = "center";
		canvasContext.fillText("Pong", canvas.width/2, 200);
		canvasContext.font = "50px Comic Sans MS";
		canvasContext.fillText("Press 1 to begin", canvas.width/2, 400);
	}
	
	if (screen == 2) {
		canvasContext.fillStyle = "#cccccc";
		canvasContext.fillRect(0, 0, canvas.width, canvas.height);
		canvasContext.fillStyle = "#000000";
		canvasContext.fillRect(playerX, 540, 100, 20);
		let ball = new Image();
		ball.src = "../Images/ball.png";
		canvasContext.drawImage(ball, ballX, ballY);
		canvasContext.font = "20px Comic Sans MS";
		canvasContext.fillStyle = "#000000";
		canvasContext.textAlign = "left";
		canvasContext.fillText("Score: " + score, 5, 20);
	}
	
	if (screen == 3) {		
		canvasContext.fillStyle = "#cccccc";
		canvasContext.fillRect(0, 0, canvas.width, canvas.height);
		canvasContext.font = "70px Comic Sans MS";
		canvasContext.fillStyle = "#000000";
		canvasContext.textAlign = "center";
		canvasContext.fillText("Press 1 to restart", canvas.width/2, 250);
		canvasContext.font = "60px Comic Sans MS";
		canvasContext.fillText("Your score was: " + score, canvas.width/2, 350);
	}
}

let arrowRight = false;
let arrowLeft = false;

function checkKey() {
    document.onkeydown = function myFunction() {
        switch (event.keyCode) {
            case 37:
                arrowLeft = true;
                arrowRight = false;
                break;
            case 39:
                arrowLeft = false;
                arrowRight = true;
                break;
			case 49:
				if (screen != 2){
					score = 0;
				}
				screen = 2;
        }
    };
    document.onkeyup = function myFunction() {
        switch (event.keyCode) {
            case 37:
                arrowLeft = false;
                break;
            case 39:
                arrowRight = false;
                break;
        }
    };
}
