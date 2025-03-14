let inBattle = false;

const player = {
    x: 200,
    y: 0,
    width: 50,
    height: 50,
    speed: 5,
};

// Game loop function
function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(firstEvolving) {
        eatermon[currentEatermonIndex].src = eatermonEvolutions[currentEatermonIndex].src
        eatermon[currentEatermonIndex].name = eatermonEvolutions[currentEatermonIndex].name
    }
    if(finalEvolving) {
        eatermon[currentEatermonIndex].src = eatermonFinalEvolutions[currentEatermonIndex].src
        eatermon[currentEatermonIndex].name = eatermonFinalEvolutions[currentEatermonIndex].name
    }

    if (!inBattle) {
        encounter();  // Function already defined in your game
    }

    if(catching) {
        enemyImg.src = plates[0].src; // Make sure this is inside the condition where the image should update
    } else {
        loadingImages();
    }

    updateHp(); // Update UI with the new enemy's HP

    // Call the next frame
    requestAnimationFrame(gameLoop);
}


function evolve() {
    if(eatermon[currentEatermonIndex].level == eatermonEvolutions[currentEatermonIndex].levelRequried) {
        firstEvolving = true; 
        levelUpMenu = true; 
    }
    // else if(eatermon[currentEatermonIndex].level == eatermonFinalEvolutions[currentEatermonIndex].levelRequried){
    //     firstEvolving = false;
    //     finalEvolving = true; 
    // } 
    else {
        firstEvolving = false; 
    }
}
gameLoop(); 
