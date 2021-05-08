const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

var roomHeight = innerHeight - 100;
var roomWidth = roomHeight;
var roomOffset = 140;

var speed;

var w, r, a, s, d, startButton, resetButton, highlightW, highlightR, highlightA, highlightS, highlightD, highlightStart, menu, menuOpen, endOpen, map, currentRoom, moveEnable;

const easyMap = [
    [
        new Room(['right', 'down'], roomHeight, roomWidth, roomOffset, [0, 0], false), 
        new Room(['left', 'down'], roomHeight, roomWidth, roomOffset, [0, 1], false),
        new Room(['down'], roomHeight, roomWidth, roomOffset, [0, 2], false)],
    [
        new Room(['up', 'down', 'right'], roomHeight, roomWidth, roomOffset, [1, 0], false), 
        new Room(['up', 'right', 'down', 'left'], roomHeight, roomWidth, roomOffset, [1, 1], false), 
        new Room(['up', 'left'], roomHeight, roomWidth, roomOffset, [1, 2], false)
    ],
    [
        new Room(['up'], roomHeight, roomWidth, roomOffset, [2, 0], false), 
        new Room(['up', 'right'], roomHeight, roomWidth, roomOffset, [2, 1], false), 
        new Room(['left'], roomHeight, roomWidth, roomOffset, [2, 2], true)
    ]
];

const mediumMap = [
    [
        new Room(['down', 'right'], roomHeight, roomWidth, roomOffset, [0, 0], false),
        new Room(['left', 'right'], roomHeight, roomWidth, roomOffset, [0, 1], false), 
        new Room(['left', 'down', 'right'], roomHeight, roomWidth, roomOffset, [0, 2], false), 
        new Room(['left', 'down'], roomHeight, roomWidth, roomOffset, [0, 3], false)],
    [
        new Room(['up', 'right'], roomHeight, roomWidth, roomOffset, [1, 0], false), 
        new Room(['left', 'down', 'right'], roomHeight, roomWidth, roomOffset, [1, 1], false), 
        new Room(['left', 'down', 'up'], roomHeight, roomWidth, roomOffset, [1, 2], false), 
        new Room(['down', 'up'], roomHeight, roomWidth, roomOffset, [1, 3], false)
    ],
    [
        new Room(['down', 'right'], roomHeight, roomWidth, roomOffset, [2, 0], false), 
        new Room(['left', 'up', 'right'], roomHeight, roomWidth, roomOffset, [2, 1], false), 
        new Room(['left', 'up'], roomHeight, roomWidth, roomOffset, [2, 2], false), 
        new Room(['down', 'up'], roomHeight, roomWidth, roomOffset, [2, 3], false)],
    [
        new Room(['up', 'right'], roomHeight, roomWidth, roomOffset, [3, 0], false), 
        new Room(['left'], roomHeight, roomWidth, roomOffset, [3, 1], false), 
        new Room(['right'], roomHeight, roomWidth, roomOffset, [3, 2], true), 
        new Room(['up', 'left'], roomHeight, roomWidth, roomOffset, [3, 3], false)
    ]
];

const hardMap = [
    [
        new Room(['down'], roomHeight, roomWidth, roomOffset, [0, 0], false), 
        new Room(['right'], roomHeight, roomWidth, roomOffset, [0, 1], true), 
        new Room(['left', 'right'], roomHeight, roomWidth, roomOffset, [0, 2], false), 
        new Room(['left', 'down', 'right'], roomHeight, roomWidth, roomOffset, [0, 3], false), 
        new Room(['left', 'down'], roomHeight, roomWidth, roomOffset, [0, 4], false)
    ],
    [
        new Room(['up', 'right', 'down'], roomHeight, roomWidth, roomOffset, [1, 0], false), 
        new Room(['left', 'down', 'right'], roomHeight, roomWidth, roomOffset, [1, 1], false), 
        new Room(['left', 'down'], roomHeight, roomWidth, roomOffset, [1, 2], false), 
        new Room(['down'], roomHeight, roomWidth, roomOffset, [1, 3], false), 
        new Room(['up', 'down'], roomHeight, roomWidth, roomOffset, [1, 4], false)
    ],
    [
        new Room(['down', 'up'], roomHeight, roomWidth, roomOffset, [2, 0], false), 
        new Room(['up', 'right'], roomHeight, roomWidth, roomOffset, [2, 1], false), 
        new Room(['left', 'up', 'right'], roomHeight, roomWidth, roomOffset, [2, 2], false), 
        new Room(['left', 'up'], roomHeight, roomWidth, roomOffset, [2, 3], false), 
        new Room(['up', 'down'], roomHeight, roomWidth, roomOffset, [2, 4], false)
    ],
    [
        new Room(['up', 'right', 'down'], roomHeight, roomWidth, roomOffset, [3, 0], false), 
        new Room(['left', 'right'], roomHeight, roomWidth, roomOffset, [3, 1], false), 
        new Room(['right', 'down', 'left'], roomHeight, roomWidth, roomOffset, [3, 2], false), 
        new Room(['down', 'left', 'right'], roomHeight, roomWidth, roomOffset, [3, 3], false), 
        new Room(['up', 'down'], roomHeight, roomWidth, roomOffset, [3, 4], false)
    ],
    [
        new Room(['up', 'right'], roomHeight, roomWidth, roomOffset, [4, 0], false), 
        new Room(['left', 'right'], roomHeight, roomWidth, roomOffset, [4, 1], false), 
        new Room(['left', 'up'], roomHeight, roomWidth, roomOffset, [4, 2], false), 
        new Room(['up', 'right'], roomHeight, roomWidth, roomOffset, [4, 3], false), 
        new Room(['left', 'up'], roomHeight, roomWidth, roomOffset, [4, 4], false)
    ]
];

var positionY, positionX;

canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    showBoard();
    if(menuOpen || endOpen){
        menu.displayBackground();
    }
});

menu = new Menu(ctx);

map = [];
copyMap(easyMap);

init();

startButton.addEventListener('click', startGame);

resetButton.addEventListener('click', () => {
    init();
});

function init(){
    clearView();
    positionX = 0;
    positionY = 0;

    showBoard();

    menuOpen = true;
    endOpen = false;
    moveEnable = false;

    getElements();

    setHighlightsToFalse();

    highlightButtons();

    menu.show();
}

function startGame() {
    var userSpeed = parseInt(menu.getValues().speed);
    var userDifficulty = parseInt(menu.getValues().difficulty);

    setSpeed(userSpeed);
    setMap(userDifficulty);

    currentRoom = map[positionY][positionX];

    menuOpen = false;
    moveEnable = true;
    menu.hide();
    showBoard();
}

function setMap(difficulty){
    if(difficulty == 0){
        copyMap(easyMap);
    }else if(difficulty == 1){
        copyMap(mediumMap);
    }else if(difficulty == 2){
        copyMap(hardMap);
    }
}

function copyMap(source){
    for(var i = 0; i < source.length; i++){
        map.push([]);
        for(var j = 0; j < source[i].length; j++){
            map[i][j] = new Room(source[i][j].doors, roomHeight, roomWidth, roomOffset, [i, j], source[i][j].exit);
        }
    }
}

function getElements() {
    w = document.querySelector('.control-w');
    r = document.querySelector('.control-r');
    a = document.querySelector('.control-a');
    s = document.querySelector('.control-s');
    d = document.querySelector('.control-d');
    startButton = document.querySelector('.start-button');
    resetButton = document.querySelector('.reset-button');
};

function setHighlightsToFalse(){
    highlightW = false;
    highlightR = false;
    highlightA = false;
    highlightS = false;
    highlightD = false;
}

function highlightButtons() {
    if(menuOpen || endOpen){
        checkW();
        checkR();
        checkA();
        checkS();
        checkD();
        checkSpace();
        requestAnimationFrame(highlightButtons);
    }
}

function checkW(){
    if(highlightW){
        w.classList.add('control-highlight');
    }else{
        w.classList.remove('control-highlight');
    }
}

function checkR(){
    if(highlightR){
        r.classList.add('control-highlight');
    }else{
        r.classList.remove('control-highlight');
    }
}

function checkA(){
    if(highlightA){
        a.classList.add('control-highlight');
    }else{
        a.classList.remove('control-highlight');
    }
}

function checkS(){
    if(highlightS){
        s.classList.add('control-highlight');
    }else{
        s.classList.remove('control-highlight');
    }
}

function checkD(){
    if(highlightD){
        d.classList.add('control-highlight');
    }else{
        d.classList.remove('control-highlight');
    }
}

function checkSpace(){
    if(highlightStart){
        startButton.classList.add('control-highlight');
        resetButton.classList.add('control-highlight');
    }else{
        startButton.classList.remove('control-highlight');
        resetButton.classList.remove('control-highlight');
    }
}

function setSpeed(userSpeed){
    if(userSpeed == 0){
        speed = roomHeight + roomOffset;
    }else{
        speed = userSpeed+20;
    }
}

window.addEventListener('keydown', e => {
    if(e.keyCode != 32){
       var char = String.fromCharCode(e.keyCode).toLowerCase();
    }else{
        var char = e.keyCode.toString();
    }

    switch(char){
        case 'w':
            goUp();
            highlightW = true;
            break;

        case 'd':
            goRight();
            highlightD = true;
            break;

        case 's':
            goDown();
            highlightS = true;
            break;

        case 'a':
            goLeft();
            highlightA = true;
            break;

        case 'r':
            resetGame();
            highlightR = true;
            break;
        
        case '32':
            highlightStart = true;    

        default:
            break;
    }
}); 

window .addEventListener('keyup', e => {
    if(e.keyCode != 32){
        var char = String.fromCharCode(e.keyCode).toLowerCase();
     }else{
         var char = e.keyCode.toString();
     }

    switch(char){
        case 'w':
            highlightW = false;
            break;

        case 'd':
            highlightD = false;
            break;

        case 's':
            highlightS = false;
            break;

        case 'a':
            highlightA = false;
            break;

        case 'r':
            highlightR = false;
            break;
        
        case '32':
            highlightStart = false; 
            spacePress();
            break;

        default:
            break;
    }
});

function spacePress(){
    if(!menuOpen && endOpen){
        init();
    }else if(menuOpen && !endOpen){
        startGame();
    }
}

function goUp(){
    if(!doAnim && moveEnable && !endOpen){
        if(currentRoom.doors.includes('up')){
            positionY -= 1;
            moveBoard([0, 1]);
        }
    }
}

function goRight(){
    if(!doAnim && moveEnable && !endOpen){
        if(currentRoom.doors.includes('right')){
            positionX += 1;
            moveBoard([-1, 0]);
        }
    }
}

function goDown(){
    if(!doAnim && moveEnable && !endOpen){
        if(currentRoom.doors.includes('down')){
            positionY += 1;
            moveBoard([0, -1]);
        }
    }
}

function goLeft(){
    if(!doAnim && moveEnable && !endOpen){
        if(currentRoom.doors.includes('left')){
            console.log(moveEnable);
            positionX -= 1;
            moveBoard([1, 0]);
        }
    }
}

function resetGame(){
    if(!menuOpen){
        init();
    }
}

function moveBoard(move){
    moveEnable = false;
    setDataForAnimLoop();
    updateBoard(move);
    currentRoom = map[positionY][positionX];
}

function endGame(){
    resetButton.classList.remove('control-highlight');
    endOpen = true;
    highlightButtons();
    menu.win();
}

function setDataForAnimLoop(){
    doAnim = true;
    moveSum = 0;
}

var doAnim = false;
var moveSum = 0
var moveLimit = roomWidth + roomOffset;

function updateBoard(move){

    if(doAnim){

        clearView();

        for(var i = 0; i < map.length; i++){
            for(var j = 0; j < map[i].length; j++){

                let room = map[i][j];

                moveRoom(room, move);

                room.show();

                if(i == 1 && j == 1){
                    moveSum += speed;
                }

                stopAnimIfEqual(moveSum, moveLimit);
            }
        }

        requestAnimationFrame(() => {
            updateBoard(move);
        });
    }else{
        moveEnable = true;
        if(currentRoom.exit == true){
            endGame();
        }
    }
    
}

function stopAnimIfEqual(sum, limit){
    if(sum >= limit){
        doAnim = false;
    }
}

function moveRoom(room, move){
    if(move[0] != 0){
        room.addToX(move[0] * speed);
    }else if(move[1] != 0){
        room.addToY(move[1] * speed);
    }
}

function clearView(){
    ctx.clearRect(0, 0, innerWidth, innerHeight);
}

function showBoard(){
    for(var i = 0; i < map.length; i++){
        for(var j = 0; j < map[i].length; j++){
            map[i][j].show();
        }
    }
}