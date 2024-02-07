let minesweeperboard = [[0,1,2,3,4,5,6,7,8,9],
                        [0,1,2,3,4,5,6,7,8,9],
                        [0,1,2,3,4,5,6,7,8,9],
                        [0,1,2,3,4,5,6,7,8,9],
                        [0,1,2,3,4,5,6,7,8,9],
                        [0,1,2,3,4,5,6,7,8,9],
                        [0,1,2,3,4,5,6,7,8,9],
                        [0,1,2,3,4,5,6,7,8,9],
                        [0,1,2,3,4,5,6,7,8,9],
                        [0,1,2,3,4,5,6,7,8,9]];

let minesweeperboardrevealed = [[false,false,false,false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false,false,false,false],]
let minesweeperboardflagged =  [[false,false,false,false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false,false,false,false],
                                [false,false,false,false,false,false,false,false,false,false],]
const len = minesweeperboard.length;
var tilesRev = 0;
console.log(tilesRev);
console.log(minesweeperboard);
var flagCount = 20;
var mCout = flagCount;
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("mineCount").innerHTML = `: ${mCout}`;
    document.getElementById("flagCount").innerHTML = `: ${flagCount}`;
});
var timerr = 0;
var stopTimer = "";
async function timer(){
    while (true){
        await sleep(1000);
        if (stopTimer == "stop")
            break;
        timerr++;
        document.getElementById("stopwatch").innerHTML = `Timer: ${timerr}`;
    }
}
// initializeBoard();
document.addEventListener('contextmenu', function(noMenu) {
    noMenu.preventDefault();
    const targ = noMenu.target;
    const tilId = parseInt(targ.id);
    var imgEl = document.createElement("img");
    imgEl.width = 30;
    imgEl.height = 30;
    imgEl.src = "flag.png";
    if (!minesweeperboardflagged[Math.floor((tilId - 1) / len)][(tilId - 1) % len] && flagCount > 0 && !minesweeperboardrevealed[Math.floor((tilId - 1) / len)][(tilId - 1) % len]) {
        targ.appendChild(imgEl);
        flagCount--;
        document.getElementById("flagCount").innerHTML = `: ${flagCount}`;
        minesweeperboardflagged[Math.floor((tilId - 1) / len)][(tilId - 1) % len] = true;
    }
});
// document.addEventListener('contextmenu', function(noMen) {
//     noMen.preventDefault();
//     const tar = noMen.target;
//     const tiId = parseInt(tar.id);
//     var imageEl = document.createElement("img");
//     imageEl.width = 30;
//     imageEl.height = 30;
//     imageEl.src = "flag.png";
//     if (minesweeperboardflagged[Math.floor((tiId - 1) / len)][(tiId - 1) % len] && flagCount < 20){
//         tar.removeChild(imageEl);
//         flagCount++;
//         document.getElementById("flagCount").innerHTML = `: ${flagCount}`;
//         minesweeperboardflagged[Math.floor((tiId - 1) / len)][(tiId - 1) % len] = false;
//     }
// });
document.addEventListener('mouseover', function (event) {
    const target = event.target;
    const tileId = parseInt(target.id);
    document.getElementById(tileId).onclick = function(){
        let index = 1;
        if (tilesRev == 0){
            for (let i = 0; i < len; i++){
                for (let j = 0; j < len; j++){
                    if (index == tileId){
                        initializeBoard(i,j);
                        revealZeroes(i,j);
                    }
                    index++;
                }
            }
        isRevealed();
        timer()
        console.log(minesweeperboard);
        console.log(tilesRev);
        console.log(mineCount());
    }
    else{
        console.log(tileId);
        for (let i = 0; i < len; i++){
            for (let j = 0; j < len; j++){
                if (index == tileId){
                    minesweeperboardrevealed[i][j] = true;
                    if (minesweeperboardflagged[i][j] && flagCount < mCout){
                        flagCount++
                        document.getElementById("flagCount").innerHTML = `: ${flagCount}`;
                    }
                    // console.log(minesweeperboard[i][j])
                    if (minesweeperboard[i][j] == 0) {
                        revealZeroes(i,j);
                    }  
                }
                index++;
            }
        }
        decision = gameOver()
        if (decision == 'W'){
            document.getElementById("decision").innerHTML = "You win!"
            stopTimer = "stop"
        }
        else if (decision == 'L'){
            document.getElementById("decision").innerHTML = "You lose!"
            stopTimer = "stop"
            revealBoard();
        }
        isRevealed();
        console.log(mineCount());
        }
    }
});
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
function isRevealed(){
    let id = 0
    tilesRev = 0;
    for (let i = 0; i < len; i++){
        for (let j = 0; j < len; j++){
            id += 1;
            if (minesweeperboardrevealed[i][j]){
                let tileRevd = document.getElementById(id);
                tileRevd.innerHTML = minesweeperboard[i][j];
                tileRevd.style.backgroundColor = "white";
                switch (minesweeperboard[i][j]){
                    case "M":
                        tileRevd.style.color = "DarkRed";
                        tileRevd.style.backgroundColor= "Red"
                        break;
                    case 1:
                        tileRevd.style.color = "Blue";
                        break;
                    case 2:
                        tileRevd.style.color = "Green";
                        break;
                    case 3:
                        tileRevd.style.color = "Red";
                        break;
                    case 4:
                        tileRevd.style.color = "DarkBlue";
                        break;
                    case 5:
                        tileRevd.style.color = "Brown";
                        break;
                    case 6:
                        tileRevd.style.color = "Cyan";
                        break; 
                    case 7:
                        tileRevd.style.color = "Black";
                        break;
                    case 8:
                        tileRevd.style.color = "Gray";
                        break; 
                }
                tilesRev++;
            }
        }
    }
    console.log(tilesRev);
}
 
function mineCount(){
    let mCount = 0;
    for (let i = 0; i < len; i++){
        for (let j = 0; j < len; j++){
            if (minesweeperboard[i][j] == "M")
                mCount++;
        }
    }
    return mCount;
}

// console.log(minesweeperboard)

function revealZeroes(x,y){
    let stack = [];
    stack.push([x, y]);
    while (stack.length !== 0) {
        let curPos = stack.pop();
        let xpos = curPos[0];  
        let ypos = curPos[1];  
        if (!(minesweeperboard[xpos][ypos] == "M" || minesweeperboardflagged[xpos][ypos]))
            minesweeperboardrevealed[xpos][ypos] = true;
        if (minesweeperboard[xpos][ypos] == 0) {
            if (xpos + 1 < len && !minesweeperboardrevealed[xpos + 1][ypos])
                stack.push([xpos + 1, ypos]);
            if (ypos + 1 < len && !minesweeperboardrevealed[xpos][ypos + 1])
                stack.push([xpos, ypos + 1]);
            if (xpos + 1 < len && ypos + 1 < len && !minesweeperboardrevealed[xpos + 1][ypos + 1])
                stack.push([xpos + 1, ypos + 1]);
            if (xpos - 1 >= 0 && !minesweeperboardrevealed[xpos - 1][ypos])
                stack.push([xpos - 1, ypos]);
            if (ypos - 1 >= 0 && !minesweeperboardrevealed[xpos][ypos - 1])
                stack.push([xpos, ypos - 1]);
            if (xpos - 1 >= 0 && ypos - 1 >= 0 && !minesweeperboardrevealed[xpos - 1][ypos - 1])
                stack.push([xpos - 1, ypos - 1]);
            if (xpos + 1 < len && ypos - 1 >= 0 && !minesweeperboardrevealed[xpos + 1][ypos - 1])
                stack.push([xpos + 1, ypos - 1]);
            if (xpos - 1 >= 0 && ypos + 1 < len && !minesweeperboardrevealed[xpos - 1][ypos + 1])
                stack.push([xpos - 1, ypos + 1]);
        }
        // console.log(stack);
    }
}

function initializeBoard(x,y){
    for (let i = 0; i < mCout; i++){
        let xpos = Math.floor(Math.random()*(10-1));
        let ypos = Math.floor(Math.random()*(10-1));
        while (minesweeperboard[xpos][ypos] == "M" || (xpos == x && ypos == y) || (xpos == x+1 && ypos == y) ||
        (xpos == x && ypos == y+1) || (xpos == x+1 && ypos == y+1) || (xpos == x-1 && ypos == y) || (xpos == x && ypos == y-1) ||
        (xpos == x-1 && ypos == y-1) || (xpos == x+1 && ypos == y-1) || (xpos == x-1 && ypos == y+1)){
            xpos = Math.floor(Math.random()*(10-1));
            ypos = Math.floor(Math.random()*(10-1));
        }
        minesweeperboard[xpos][ypos] = "M"
    }
    checkIfAdjacent();
}

function checkIfAdjacent(){
    const row = minesweeperboard.length
    for (let i = 0; i < row; i++){
        for (let j = 0; j < row; j++){
            // console.log(minesweeperboard[i][j]);
            if (minesweeperboard[i][j] != "M"){
                minesweeperboard[i][j] = isAdjacent(i,j);
            }
        }
    }
}

function isAdjacent(xpos, ypos) {
    const row = minesweeperboard.length;
    let adjCount = 0;
    if (xpos + 1 < row && minesweeperboard[xpos + 1][ypos] == "M")
        adjCount++;
    if (ypos + 1 < row && minesweeperboard[xpos][ypos + 1] == "M")
        adjCount++;
    if (xpos + 1 < row && ypos + 1 < row && minesweeperboard[xpos + 1][ypos + 1] == "M")
        adjCount++;
    if (xpos - 1 >= 0 && minesweeperboard[xpos - 1][ypos] == "M")
        adjCount++;
    if (ypos - 1 >= 0 && minesweeperboard[xpos][ypos - 1] == "M")
        adjCount++;
    if (xpos - 1 >= 0 && ypos - 1 >= 0 && minesweeperboard[xpos - 1][ypos - 1] == "M")
        adjCount++;
    if (xpos + 1 < row && ypos - 1 >= 0 && minesweeperboard[xpos + 1][ypos - 1] == "M")
        adjCount++;
    if (xpos - 1 >= 0 && ypos + 1 < row && minesweeperboard[xpos - 1][ypos + 1] == "M")
        adjCount++;

    return adjCount;
}


function gameOver(){
    let revCount = 0;
    for (let i = 0; i < len; i++){
        for (let j = 0; j < len; j++){
            if (minesweeperboard[i][j] == "M" && minesweeperboardrevealed[i][j]){
                return 'L';
            }
            if (minesweeperboardrevealed[i][j])
                revCount++;
        }
    }
    if (revCount >= 100-mCout)
        return 'W'
    return 'NA'
}


function revealBoard(){
    for (let i = 0; i < len; i++){
        for (let j = 0; j < len; j++){
            minesweeperboardrevealed[i][j] = true;
        }
    }
}

function restartGame() {
    location.reload();
}

