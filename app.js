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

// MOBILE DOUBLE-TOUCH FIX
let touchLock = false;

// ===== START GAME FUNCTION =====
function startGame() {
    gameStart = true;
    level = 0;
    h2.innerHTML = `Game Started...<br>Level: ${level}`;
    levelUp();
    startSound.play();
    bgm.play();
}




// Start on PC (keyboard)
document.addEventListener("keypress", function () {
    if (!gameStart) startGame();
});

// Start on Mobile (touch)
document.addEventListener("touchstart", function () {
    if (!gameStart && !touchLock) {
        touchLock = true;
        startGame();
        setTimeout(() => touchLock = false, 300); // prevents double triggering
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
    // console.log(gameSequence);

    userSequence = [];
    
}


function ButtonPressed(){
    userFlash(this);
    userSequence.push(this.id);

    maxScore = Math.max(maxScore, level-1);
    highScore.innerHTML = maxScore;

    checkAns(userSequence.length-1);
}

for(btn of btns){
    btn.addEventListener("click" , ButtonPressed);
}

function checkAns(index){
    if(gameSequence[index] === userSequence[index]){
        if(userSequence.length == gameSequence.length){
            winSound.play();
            setTimeout(levelUp , 800);
            
        }
    }
    else{
    h2.innerHTML = `<b>Game Over...Your score was ${level-1}<br>press any key to restart</b>`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function(){
        document.querySelector("body").style.backgroundColor = "white"
    }, 200);

    wrongSound.play();
    bgm.pause();

    reset();
}

}

function reset(){
    gameStart = false;
    gameSequence = [];
    userSequence = [];
    level = 0;
}
