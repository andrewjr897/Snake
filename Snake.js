
var canvas = document.getElementById("html-canvas");
//canvas.width = canvas.clientWidth;
//canvas.height = canvas.clientHeight;
var ctx = canvas.getContext("2d");


//ctx.beginPath();
//ctx.fillRect(10,10,5,5);

var interval = 50;
var currentDirection = 'down';
var currentToken = [100, 100];
currentToken[0] = Math.random()*(295-5)+5;
currentToken[1] = Math.random()*(295-5)+5;
var snake = [];
var snakeLength = 3;
var pause = false;
var score = 0;

var x = 50;
var y = 50;
var gameStatus = document.getElementById( 'gameStatus' );
var scoreN = document.getElementById( 'score' );

for(let i = 0; i<21; i++){
    snake.push([x, y]);
    y -= 1;
}

document.addEventListener('keydown', function(event) {

    if(event.keyCode == 37) {
        currentDirection = 'left';
    }
    else if(event.keyCode == 39) {
        currentDirection = 'right';
    }
    else if(event.keyCode == 38) {
        currentDirection = 'up';
    }
    else if(event.keyCode == 40) {
        currentDirection = 'down';
    }

});

function runningGame(){

    setTimeout(function(){

        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

        for(let i = 0; i<snake.length; i++){
            ctx.fillStyle = 'green';
            ctx.fillRect(snake[i][0], snake[i][1], 4, 4);
        }

        ctx.fillStyle = 'red';
        ctx.fillRect(currentToken[0], currentToken[1], 4, 4);

        let snakeCopy = JSON.parse(JSON.stringify(snake));
        snakeCopy.pop();
        
        if(currentDirection == 'up'){
            snake[0][1] -= 1;
        }else if(currentDirection == 'down'){
            snake[0][1] += 1;
        }else if(currentDirection == 'left'){
            snake[0][0] -= 1;
        }else if(currentDirection == 'right'){
            snake[0][0] += 1;
        }
        
        snake.splice(1,snake.length-1);
        snake = snake.concat(snakeCopy);

        if(checkForToken(snake, currentToken)){

            let x1 = JSON.parse(JSON.stringify(snake[snake.length-1][0]));
            let x2 = JSON.parse(JSON.stringify(snake[snake.length-2][0]));
            let y1 = JSON.parse(JSON.stringify(snake[snake.length-1][1]));
            let y2 = JSON.parse(JSON.stringify(snake[snake.length-2][1]));

            if(x1 != x2){
                if((x1-x2) > 0){
                    for(let i = 0; i<50; i++){
                        snake.push([x1, y1]);
                        x1 += 1;
                    }
                }else{
                    for(let i = 0; i<50; i++){
                        snake.push([x1, y1]);
                        x1 -= 1;
                    }
                }
            }else if((y1-y2) > 0){
                for(let i = 0; i<50; i++){
                    snake.push([x1, y1]);
                    y1 += 1;
                }
            }else{
                for(let i = 0; i<50; i++){
                    snake.push([x1, y1]);
                    y1 -= 1;
                } 
            }
        }

        if(checkForLoss(snake)){
            console.log("loss");
            gameStatus.innerHTML = 'GAME OVER';
        }else if(pause){

        }else runningGame();
       
    }, interval);
}

runningGame();


function checkForLoss(array){

    if(array[0][0] >= canvas.clientWidth | array[0][0] <= 0){
        return true;
    }else if(array[0][1] >= canvas.clientHeight | array[0][1] <= 0){
        return true;
    }
    for(let j = 1; j<array.length; j++){
        if(array[0][0] == array[j][0] & array[0][1] == array[j][1]){
            return true;
        }
    }
    return false;

}

function checkForToken(array, currentToken){

    if(array[0][0] <= (currentToken[0]+4) & array[0][0] >= (currentToken[0]-4)){
        if(array[0][1] <= (currentToken[1]+4) & array[0][1] >= (currentToken[1]-4)){
            currentToken[0] = Math.random()*(295-5)+5;
            currentToken[1] = Math.random()*(295-5)+5;

            interval = interval/1.2;

            score += 10;
            scoreN.innerHTML = "score: "+score;

            return true;


        }
    }
    return false;

}


function pauseGame(){

    let button = document.getElementById( 'pauseButton' );

    if(pause){

        pause = false;
        runningGame();
        button.innerHTML = 'Pause';
        gameStatus.innerHTML = '';

    }else{
        pause = true;
        button.innerHTML = 'Unpause';
        gameStatus.innerHTML = 'PAUSED';
    }

}

function resetPressed(){

    snake.splice(0, snake.length);

    let xR = 50;
    let yR = 50;

    for(let i = 0; i<21; i++){
        snake.push([xR, yR]);
        yR -= 1;
    }

    gameStatus.innerHTML = '';
    interval = 50;
    currentDirection = 'down';

    runningGame();

}
