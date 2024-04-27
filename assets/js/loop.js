// ================================================================================================================================================================================
// ================================================================================================================================================================================
// ================================================================================================================================================================================

context.font = "30px Arial";

// gameplay loop is here!
function gameloop() {
    if(currentMode == GAMEMODE[0])
    {
        updateMenu();
        drawMenu();
    }
    else if(currentMode == GAMEMODE[1])
    {
        updateGame();
        drawGame();
    }
    else if(currentMode == GAMEMODE[2])
    {
        updateInstructions();
        drawInstructions();
    }
    else if(currentMode == GAMEMODE[3])
    {
        updateWinner();
        renderWinner();
    }
    window.requestAnimationFrame(gameloop);
} 
// Handle Active Browser Tag Animation
window.requestAnimationFrame(gameloop);

// ================================================================================================================================================================================
