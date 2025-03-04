// game.js
// Set up canvas
 const canvas = document.getElementById('gameCanvas');
 const ctx = canvas.getContext('2d');
 let inBattle = false;

 var character = document.querySelector(".character");
 var map = document.querySelector(".map");

var x = 0; 
var y = 0; 

var held_directions = []; 

var speed = 1; 
const player = {
    x: 200,
    y: 0,
    width: 50,
    height: 50,
    speed: 5,
    // color: 'darkcyan',
    src: 'images/player.png'
};

// Assuming you have an image element with id "Player" in your HTML
const playerImage = new Image();
playerImage.src = player.src;  // Set the player's image source

// You might want to wait for the image to load before drawing
playerImage.onload = function() {
    // Once the image is loaded, you can call the drawing function
    drawPlayer();
};


// Function to draw player on canvas
function drawPlayer() {
    if (playerImage.complete) {
        ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
    }
}

const placeCharacter = () => {
    var pixelSize = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(`--pixel-size`)
    );

    const held_direction = held_directions[0];
    if(held_direction) {
        if (held_direction === directions.right) {x += speed;}
        if (held_direction === directions.left) {x -= speed;}
        if (held_direction === directions.down) {y += speed;}
        if (held_direction === directions.up) {y -= speed;}
        character.setAttribute("facing", held_direction); 
    }
    character.setAttribute("walking", held_direction ? "true" : 
    "false");

    var camera_left = pixelSize * 66; 
    var camera_top = pixelSize * 42; 

    map.style.transform = `translate3d( ${-x*pixelSize+camera_left}px, 
    ${-y*pixelSize+camera_top}px, 0 )`;

    character.style.transform = `translate3d( ${x*pixelSize}px, 
    ${y*pixelSize}px, 0 )`;
}

const step = () => {
    placeCharacter();
    window.requestAnimationFrame(() => {
        step();
    })
}
step(); 

const directions = {
    up: "up",
    down: "down",
    left: "left",
    right: "right",
}

const keys = {
    38: directions.up,
    37: directions.left,
    39: directions.right, 
    40: directions.down,
}

document.addEventListener("keydown", (e) => {
    var dir = keys[e.which]; 
    if (dir && held_directions.indexOf(dir) === -1) {
        held_directions.unshift(dir)
    }
})


document.addEventListener("keyup", (e) => {
    var dir = keys[e.which]; 
   var index = held_directions.indexOf(dir);
   if (index > -1) {
    held_directions.splice(index, 1)
   }
})

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// Game loop function
function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw the player
    // updatePlayerPosition();
    drawGrass();
    drawPlayer();
    if (!inBattle) {
        encounter();
    }    loadingImages();
    // console.log(pickNum);
    if(catching) {
        enemyImg.src = plates[0].src; // Show the plate image
    }
    updateHp(); // Update UI with the new enemy's HP
    // battleMenu();
    // Call next frame
    requestAnimationFrame(gameLoop);
}



// Start game loop
gameLoop();


