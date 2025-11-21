let gameSequence = [];
let userSequence = [];

let gameStart = false;
let level = 0; 

let color = ["red" , "green" , "purple" , 'yellow'];

let h2 = document.querySelector("h2");
let btns = document.querySelectorAll(".btn");
let h3 = document.querySelector("h3");
let maxScore = 0;
let highScore = document.querySelector(".highScore");




// Sound files
let startSound = new Audio("sounds/start.mp3");
let winSound = new Audio("sounds/win.mp3");
let loseSound = new Audio("sounds/lose.mp3");
let wrongSound = new Audio("sounds/wrong.mp3");
let bgm = new Audio("sounds/bgm.mp3");
bgm.loop = true;

// Game Start
document.addEventListener("keypress" , function(){
    if(gameStart == false){
        gameStart = true;
        level = 0;
        h2.innerHTML = `Game Started...<br>Level: ${level}`;
        levelUp();
        startSound.play();
        bgm.play();
    }
});


// Game Flash 
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash")
    }  , 250);
};

// User Flash 
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash")
    }  , 250);
};

// level Up
function levelUp(){
    level++;
    let randomint = Math.floor(Math.random() * 4);
    let randomColor = color[randomint];
    let randomButton = document.querySelector(`.${randomColor}`);
    gameFlash(randomButton);
    gameSequence.push(randomColor);
    h2.innerHTML = `Game Started...<br>Level: ${level}`;
    console.log(gameSequence);

    userSequence = [];
    
}


function ButtonPressed(){
    // console.log(this.id); press button id
    userFlash(this);
    userSequence.push(this.id);

    maxScore = Math.max(maxScore, level);
    highScore.innerHTML = maxScore;


    checkAns(userSequence.length-1);

}

for(btn of btns){
    btn.addEventListener("click" , ButtonPressed);
}

function checkAns(index){
    if(gameSequence[index] === userSequence[index]){
        if(userSequence.length == gameSequence.length){
            setTimeout(levelUp , 1000);
            winSound.play();
            
        }
    }
    else{
        h2.innerHTML = `<b>Game Over...Your score was ${level}<br>press any key to restart</b>`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){document.querySelector("body").style.backgroundColor = "white" }, 200);
        reset();
        wrongSound.play();
        bgm.pause();
    }
}

function reset(){
    gameStart = false;
    gameSequence = [];
    userSequence = [];
    level = 0;
}