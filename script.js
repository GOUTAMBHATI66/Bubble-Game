function makeBubble(){
    let bubble = "";

    for(let i=1; i<56; i++){
        bubble += `<div class="bubble">${parseInt(Math.random()*10)}</div>`
    }

    document.querySelector('.panel-main').innerHTML = bubble;
}

let time = 30;
function changeTime(){
    var timeInt = setInterval(function() {
        if(time > 0){
            time--;
            document.querySelector('#timer').innerHTML = time;
        }
        else{
            clearInterval(timeInt);
            document.querySelector('.panel-main').innerHTML = `<h1>Game Over</h1>`;
        }
    },1000)
}

let hitNum;
function getNewHit(){
    hitNum = parseInt(Math.random()*10);
    document.querySelector('#hit').textContent = hitNum;
}

let score = 0;
let highscore = 0;
const existingHighScore = localStorage.getItem('highscore');
function increaseScore(){
    score += 10;
    if(score>existingHighScore){
        highscore = score;
        document.getElementById('highscoreID').textContent = highscore.toString()
        localStorage.setItem('highscore',highscore);
    }
    document.querySelector('#score').textContent = score;
}

document.querySelector('.panel-main').addEventListener('click',function(details){
    let clickedNum = Number(details.target.textContent);
    if(clickedNum === hitNum){
        increaseScore();
        getNewHit();
        makeBubble();
    }
})

const startBtn = document.querySelector('.btn');
const restartBtn = document.getElementById('btn2');

startBtn.addEventListener('click',() => {
    getNewHit();
    changeTime();
    makeBubble();
    startBtn.classList.add('remove');
    restartBtn.classList.add('active');
})

// working of restart button
restartBtn.addEventListener('click', () => {
    function workRestart(){
        time = 31;
        score = 0;
        hitNum = parseInt(Math.random()*10);
        document.querySelector('#hit').textContent = hitNum;
        document.querySelector('#score').textContent = score;
        getNewHit();
        makeBubble();
    }

   if(time != 0){
    workRestart();
   }
   else {
    workRestart();
    changeTime();
   }
})

if(existingHighScore === null){
    localStorage.setItem('highscore',highscore.toString());
}
else{
    document.getElementById('highscoreID').textContent = existingHighScore.toString()
}