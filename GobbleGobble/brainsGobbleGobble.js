"use strict";

let canvas;
let canvasContext;
let play = 1;
 
window.onload = function start() {
    canvas = document.getElementById("myCanvas");
    canvasContext = canvas.getContext("2d");
    if (play === 1){
        setInterval(function() {
          draw();
          moveAll();
		  checkKey();
            }, 25);
	}
};

let restart = false;

function moveAll() {
	if (villainx<herox+40 && villainx+50>herox && villainy<heroy+40 && villainy+50>heroy){
		play++;
	}
	if (restart === true) {
		herox = 100;
		heroy = 100;
		villainx = 375;
		villainy = 275;
		restart = false;
		play = 1;	
		score = 0;
	}
	if (play===1) {
		movePlayer();
		villainMove();
		checkOff();
	}
}
	
let herox = 100;
let heroy = 100;
let villainx = 375;
let villainy = 275;

function movePlayer() {
    let speed = 5;
    let digSpeed = 3.54;

    let speedx = 0;
    let speedy = 0;

    if (arrowUp === true) {
        speedy = -speed;
    }
    if (arrowDown === true) {
        speedy = speed;
    }
    if (arrowLeft === true) {
        speedx = -speed;
    }
    if (arrowRight === true) {
        speedx = speed;
    }

    if (speedx !== 0 && speedy !== 0) {
        speedx = Math.sign(speedx) * digSpeed;
        speedy = Math.sign(speedy) * digSpeed;
    }
    herox = herox + speedx;
    heroy = heroy + speedy;
}

function checkOff() {
    if (herox > 760) {
        herox = 760;
    }
    if (herox < 0) {
        herox = 0;
    }
    if (heroy > 560) {
        heroy = 560;
    }
    if (heroy < 0) {
        heroy = 0;
    }
	if (villainx > 750) {
        villainx = 750;
    }
    if (villainx < 0) {
        villainx = 0;
    }
    if (villainy > 550) {
        villainy = 550;
    }
    if (villainy < 0) {
        villainy = 0;
    }
}

let lose = false;

function villainMove(){
	let dx = herox - villainx;
	let dy = heroy - villainy;
	let vspeed = 2;
	
	if (score>49 && score<98){
		vspeed = 2.5;
	}
	if (score>99 && score<148){
		vspeed = 3;
	}
	if (score>149 && score<198){
		vspeed = 3.5;
	}
	if (score>199 && score<248){
		vspeed = 4;
	}
	if (score>249 && score<298){
		vspeed = 4.5;
	}
	if (score>299){
		vspeed = 5;
	}
	
	let ratio =	Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) / vspeed;
	let villainTravelx = villainx+dx/ratio;
	let villainTravely = villainy+dy/ratio;
	villainx = villainTravelx;
	villainy = villainTravely;
}

function villain(start){
    if(villainx<herox+40 && villainx+50>herox && villainy<heroy+40 && villainy+50>heroy){
        return false;
    } else{
		return true;
	}
}

let applex = Math.random()*760;
let appley = Math.random()*560;

let score = 0;

function apple(){
	if(herox<applex+40 && herox+40>applex && heroy<appley+40 && heroy+40>appley){
		score=score+10;
		applex = Math.random()*760;
		appley = Math.random()*560;
	}
	return score;
}

let menu = true;

function draw() {
	let start = villain(true);
	let scoreYes = apple(0);
	if (menu === false){
	if (start === true){
		canvasContext.fillStyle = "#33cc33";
		canvasContext.fillRect(0, 0, canvas.width, canvas.height);
		let player = new Image();
		player.src = "../Images/Player.png";
		canvasContext.drawImage(player, herox, heroy);
		let villain = new Image();
		villain.src = "../Images/Villain.png";
		canvasContext.drawImage(villain, villainx, villainy);
		let apple = new Image();
		apple.src = "../Images/apple.png";
		canvasContext.drawImage(apple, applex, appley);
		canvasContext.font = "20px Comic Sans MS";
		canvasContext.fillStyle = "White";
		canvasContext.textAlign = "left";
		canvasContext.fillText("Score: " + scoreYes, 5, 20);
	}
	if (start === false){
		canvasContext.fillStyle = "#33cc33";
		canvasContext.fillRect(0, 0, canvas.width, canvas.height);
		canvasContext.font = "80px Comic Sans MS";
		canvasContext.fillStyle = "White";
		canvasContext.textAlign = "center";
		canvasContext.fillText("Press 1 to restart", canvas.width/2, 250);
		canvasContext.fillText("Your score was: " + score, canvas.width/2, 350);
	}
	}else if(menu === true){
		canvasContext.fillStyle = "#33cc33";
		canvasContext.fillRect(0, 0, canvas.width, canvas.height);
		canvasContext.font = "100px Comic Sans MS";
		canvasContext.fillStyle = "White";
		canvasContext.textAlign = "center";
		canvasContext.fillText("Gobble Gobble", canvas.width/2, 200);
		canvasContext.font = "50px Comic Sans MS";
		canvasContext.fillText("Press 1 to begin", canvas.width/2, 400);
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
                arrowUp = true;
                arrowDown = false;
                break;
            case 37:
                arrowLeft = true;
                arrowRight = false;
                break;
            case 39:
                arrowLeft = false;
                arrowRight = true;
                break;
            case 40:
                arrowDown = true;
                arrowUp = false;
                break;
			case 49:
				if (villainx<herox+40 && villainx+50>herox && villainy<heroy+40 && villainy+50>heroy){
					restart = true;
				}
				menu = false;
        }
    };
    document.onkeyup = function myFunction() {
        switch (event.keyCode) {
            case 38:
                arrowUp = false;
                break;
            case 37:
                arrowLeft = false;
                break;
            case 39:
                arrowRight = false;
                break;
            case 40:
                arrowDown = false;
                break
        }
    };
}