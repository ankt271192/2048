var board = document.querySelector(".board");
var boxes = Array.prototype.slice.call(document.querySelectorAll(".cell"));
var score = document.querySelector(".score");
var message = board.querySelector(".message");

//Initialiasing score to zero

score.textContent = 0;

//Defining colors for each type of value

var colors = {
    '0': "#d7ccc8",
    '2': "#ede0c8",
    '4': "#FDD835",
    '8': "#FFC400",
    '16': "#f2b179",
    '32': "#FFAB00",
    '64': "#E77B1D",
    '128': "#FF6A20",
    '256': "#E8512C",
    '512': "#FF382B",
    '1024': "#CC6600",
    '2048': "#CC3300"
}

//Giving values to random cells

function initBoard() {
    var random1,random2;
    random1 = Math.floor(Math.random()*16);
    do{
        random2 = Math.floor(Math.random()*16);
    }while(random1 == random2)
    boxes[random1].textContent = 2;
    boxes[random1].style.background = colors[boxes[random1].textContent];
    boxes[random2].textContent = Math.random() > 0.5 ? 4 : 2;
    boxes[random2].style.background = colors[boxes[random2].textContent];
} 

initBoard();

//Building an array of indexes which already have values

function indexArrayVertical(event) {
    var filled = [];
    for(var i=0; i<4; i=i+1) {
        var box = [];
        for(var j=i; j<16; j=j+4)
            if(Number(boxes[j].textContent) !== 0)
                box.push(j);
        if(box.length !== 0){
            if(event.keyCode == 38)
                filled.push(box);
            else
                filled.push(box.reverse());
        }
    }
    return filled;
}

function indexArrayHorizontal(event) {
    var filled = [];
    for(var i=0; i<16; i=i+4) {
        var box = [];
        for(var j=i; j<i+4; j=j+1)
            if(Number(boxes[j].textContent) !== 0)
                box.push(j);
        if(box.length !== 0){
            if(event.keyCode == 37)
                filled.push(box);
            else
                filled.push(box.reverse());
        }
    }
    return filled;
}

//Adding value to random cell

function addElement() {
    var empty = boxes.filter(function (box) { return Number(box.textContent) === 0; })
                     .map(function (n){ return boxes.indexOf(n); });
    var random = Math.floor(Math.random() * empty.length);
    boxes[empty[random]].textContent = 2;
}

//Adding colors to cells

function addColors() {
    boxes.forEach(function(box){
        box.style.background = colors[Number(box.textContent).toString()];
    });
}

//Checking the winning condition

function didIWin() {
    boxes.forEach(function(box){
        if(Number(box.textContent) == 2048){
            message.textContent = "You Won!";
            message.style = "display: 'block';"; 
            removeEventListener("keydown", play);  //removing event handler
        }
    });
}

//Checking the game over condition

function didILose() {
    var flag = 0;
    boxes.forEach(function(box,i){
        if( i == 0 ){
            if( Number(boxes[i+4].textContent) == 0 || Number(boxes[i+4].textContent) == Number(box.textContent) ||
                    Number(boxes[i+1].textContent) == 0 || Number(boxes[i+1].textContent) == Number(box.textContent) )
                flag = 1;
        }
        else if( i == 1 || i == 2){
            if( Number(boxes[i-1].textContent) == 0 || Number(boxes[i-1].textContent) == Number(box.textContent) ||
                    Number(boxes[i+4].textContent) == 0 || Number(boxes[i+4].textContent) == Number(box.textContent) ||
                    Number(boxes[i+1].textContent) == 0 || Number(boxes[i+1].textContent) == Number(box.textContent) )
                flag = 1;
        }
        else if( i == 3 ){
            if( Number(boxes[i-1].textContent) == 0 || Number(boxes[i-1].textContent) == Number(box.textContent) ||
                    Number(boxes[i+4].textContent) == 0 || Number(boxes[i+4].textContent) == Number(box.textContent) )
                flag = 1;
        }
        else if( i == 4 || i == 8) {
            if( Number(boxes[i-4].textContent) == 0 || Number(boxes[i-4].textContent) == Number(box.textContent) ||
                    Number(boxes[i+4].textContent) == 0 || Number(boxes[i+4].textContent) == Number(box.textContent) ||
                    Number(boxes[i+1].textContent) == 0 || Number(boxes[i+1].textContent) == Number(box.textContent) )
                flag = 1;
        }
        else if( i == 12 ){
            if( Number(boxes[i-4].textContent) == 0 || Number(boxes[i-4].textContent) == Number(box.textContent) ||
                    Number(boxes[i+1].textContent) == 0 || Number(boxes[i+1].textContent) == Number(box.textContent) )
                flag = 1;
        }
        else if( i == 13 || i == 14 ){
            if( Number(boxes[i-4].textContent) == 0 || Number(boxes[i-4].textContent) == Number(box.textContent) ||
                    Number(boxes[i-1].textContent) == 0 || Number(boxes[i-1].textContent) == Number(box.textContent) ||
                    Number(boxes[i+1].textContent) == 0 || Number(boxes[i+1].textContent) == Number(box.textContent) )
                flag = 1;
        }
        else if( i == 15 ){
            if( Number(boxes[i-4].textContent) == 0 || Number(boxes[i-4].textContent) == Number(box.textContent) ||
                    Number(boxes[i-1].textContent) == 0 || Number(boxes[i-1].textContent) == Number(box.textContent) )
                flag = 1;
        }
        else if( i == 11 || i == 7 ){
            if( Number(boxes[i-4].textContent) == 0 || Number(boxes[i-4].textContent) == Number(box.textContent) ||
                    Number(boxes[i-1].textContent) == 0 || Number(boxes[i-1].textContent) == Number(box.textContent) ||
                    Number(boxes[i+4].textContent) == 0 || Number(boxes[i+4].textContent) == Number(box.textContent) )
                flag = 1;
        }
        else if( i == 5 || i == 6 || i == 9 || i == 10){
            if( Number(boxes[i-4].textContent) == 0 || Number(boxes[i-4].textContent) == Number(box.textContent) ||
                    Number(boxes[i-1].textContent) == 0 || Number(boxes[i-1].textContent) == Number(box.textContent) ||
                    Number(boxes[i+4].textContent) == 0 || Number(boxes[i+4].textContent) == Number(box.textContent) ||
                    Number(boxes[i+1].textContent) == 0 || Number(boxes[i+1].textContent) == Number(box.textContent) )
                flag = 1;
        }
    });
    if(flag == 0){
        message.textContent = "Game Over!";
        message.style = "display: 'block';";
        removeEventListener("keydown", play);  //removing event handler
    }   
}

//move function

function move(event,filled,n,flag2) {
    var stop;
    for(var j=0; j < filled.length; j++){
        var ar = filled[j];
        if(event.keyCode == 38){
            if(ar[0] == 4 || ar[0] == 8 || ar[0] == 12 || ar[0] == 0)
                stop = 0;
            if(ar[0] == 5 || ar[0] == 9 || ar[0] == 13 || ar[0] == 1)
                stop = 1;
            if(ar[0] == 6 || ar[0] == 10 || ar[0] == 14 || ar[0] == 2)
                stop = 2;
            if(ar[0] == 7 || ar[0] == 11 || ar[0] == 15 || ar[0] == 3)
                stop = 3;
        }
        if(event.keyCode == 37){
            if(ar[0] == 0 || ar[0] == 1 || ar[0] == 2 || ar[0] == 3)
                stop = 0;
            if(ar[0] == 4 || ar[0] == 5 || ar[0] == 6 || ar[0] == 7)
                stop = 4;
            if(ar[0] == 8 || ar[0] == 9 || ar[0] == 10 || ar[0] == 11)
                stop = 8;
            if(ar[0] == 12 || ar[0] == 13 || ar[0] == 14 || ar[0] == 15)
                stop = 12;
        }
        if(event.keyCode == 39){
            if(ar[0] == 0 || ar[0] == 1 || ar[0] == 2 || ar[0] == 3)
                stop = 3;
            if(ar[0] == 4 || ar[0] == 5 || ar[0] == 6 || ar[0] == 7)
                stop = 7;
            if(ar[0] == 8 || ar[0] == 9 || ar[0] == 10 || ar[0] == 11)
                stop = 11;
            if(ar[0] == 12 || ar[0] == 13 || ar[0] == 14 || ar[0] == 15)
                stop = 15;
        }
        if(event.keyCode == 40){
            if(ar[0] == 0 || ar[0] == 4 || ar[0] == 8 || ar[0] == 12)
                stop = 12;
            if(ar[0] == 1 || ar[0] == 5 || ar[0] == 9 || ar[0] == 13)
                stop = 13;
            if(ar[0] == 2 || ar[0] == 6 || ar[0] == 10 || ar[0] == 14)
                stop = 14;
            if(ar[0] == 3 || ar[0] == 7 || ar[0] == 11 || ar[0] == 15)
                stop = 15;
        }
        for(var k=0; k < ar.length; k++){
            var index = ar[k];
            while(index != stop){
                if( Number(boxes[index+n].textContent) === 0){
                    var content = Number(boxes[index].textContent);
                    boxes[index].textContent = "";
                    index += n;
                    boxes[index].textContent = Number(boxes[index].textContent) + content;
                    flag2 = 1;
                }
                else if( Number(boxes[index+n].textContent) ==  Number(boxes[index].textContent) ){
                    var content = Number(boxes[index].textContent);
                    var scoreValue = Number(score.textContent);
                    boxes[index].textContent = "";
                    stop = index;
                    index += n;
                    boxes[index].textContent = content * 2;
                    score.textContent = content * 2 + scoreValue;
                    flag2 = 1;
                    break;
                }
                else {
                    break;
                }
            }
        }
    }
    return flag2;
}

//Event handler function

function play(event) {
    if(event.keyCode == 38){
        var flag2 = 0;
        var filled = indexArrayVertical(event);
        flag2 = move(event,filled,-4,flag2);
        if(flag2 == 1)
            addElement();
    }
    if(event.keyCode == 37){
        var flag2 = 0;
        var filled = indexArrayHorizontal(event);
        flag2 = move(event,filled,-1,flag2);
        if(flag2 == 1)
            addElement();
    }
    if(event.keyCode == 39){
        var flag2 = 0;
        var filled = indexArrayHorizontal(event);
        flag2 = move(event,filled,1,flag2);
        if(flag2 == 1)
            addElement();
    }
    if(event.keyCode == 40){
        var flag2 = 0;
        var filled = indexArrayVertical(event);
        flag2 = move(event,filled,4,flag2);
        if(flag2 == 1)
            addElement();
    }
    addColors();
    didIWin();
    didILose();
}

//Adding event listener

addEventListener("keydown", play);