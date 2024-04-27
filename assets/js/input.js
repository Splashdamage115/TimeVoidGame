let Environment = {
    isAndroid: function() {
        return navigator.userAgent.match(/Android/i);
    },
    isBlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    isIOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    isOpera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    isWindows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    isMobile: function() {
        return (Environment.isAndroid() || Environment.isBlackBerry() || Environment.isIOS() || Environment.isOpera() || Environment.isWindows());
    }
};

if(Environment.isMobile())
{
window.addEventListener("touchend", touchEnding);
window.addEventListener('touchmove', touchMove );
window.addEventListener('touchstart', touchStartFunc);
}

else
{
window.addEventListener("mousedown", canvasClicked);
window.addEventListener("mouseup", canvasReleased);
window.addEventListener("mousemove", canvasMoved);
}




function touchStartFunc(event)
{
    lastMove = event;

    let posX = lastMove.changedTouches[0].pageX;
    let posY = lastMove.changedTouches[0].pageY;

    mousePosition = new Coords(posX- canvas.getBoundingClientRect().x , posY- canvas.getBoundingClientRect().y);

    canvasClicked();
}





function touchMove(event)
{
    lastMove = event;

    console.log(lastMove);

    let posX = lastMove.changedTouches[0].pageX;
    let posY = lastMove.changedTouches[0].pageY;

    mousePosition = new Coords(posX- canvas.getBoundingClientRect().x , posY- canvas.getBoundingClientRect().y);
}


function touchEnding(event)
{
    canvasReleased();
}

// handles on click events inside the canvas object
function canvasClicked(event)
{
    if(currentMode == GAMEMODE[0])
    {
        canvasClickedMenu();
    }
    else if(currentMode == GAMEMODE[1])
    {
        canvasClickedGame();
    }
    else if(currentMode == GAMEMODE[2])
    {
        canvasClickedInstructions();
    }
}


// handle release on canvas events
function canvasReleased(event)
{
    if(currentMode == GAMEMODE[0])
    {
        canvasReleasedMenu();
    }
    else if(currentMode == GAMEMODE[1])
    {
        canvasReleasedGame();
    }
    else if(currentMode == GAMEMODE[2])
    {
        canvasReleasedInstructions();
    }
}


// set the global mouse position
function canvasMoved(event)
{
    let e = window.event;

    let posX = e.clientX;
    let posY = e.clientY;

    mousePosition = new Coords(posX- canvas.getBoundingClientRect().x , posY- canvas.getBoundingClientRect().y);

    //console.log(mousePosition);
}

// ========================================================================================================================================================
// game click functions
function canvasClickedGame()
{
    for(let i = 0;i<tileMap.length;i++)
        tileMap[i].onclick();

    clickRadialMenu();
    EndTurnButton.click();

    if(HOSTMODE)
    {
        hostButton.click();
    }
    if(SINGLEPLAYERMODE)
            changePlayerButton.click();
    timeButton.click();
}


function canvasReleasedGame()
{
    if(g_selectingMove)
    {
        let cancontinue = false;
        for(let i = 0;i<tileMap.length;i++)
        {
            if(tileMap[i].onRelease())
            {
                if(g_archerShooting)
                {
                    cancontinue = true;
                    g_archerShooting = false;
                }
                else
                {
                    console.log(g_lastClickedTile);

                    for(let u = 0; u < moveableTilesArray[g_lastClickedTile].length;u++)
                    {
                        if(currentTime == TIME.Past)
                        {
                            if(moveableTilesArray[g_lastClickedTile][u] == i + 9)
                            {   
                                cancontinue = true;
                                break;
                            }
                        }
                        else
                        {
                            if(moveableTilesArray[g_lastClickedTile][u] == i)
                            {   
                                cancontinue = true;
                                break;
                            }
                        }
                    }
                }
                if(cancontinue)
                {
                    if(currentTime == TIME.Past)
                    {
                        buffer.push(i + 9);
                    }
                    else
                    {
                        buffer.push(i);
                    }
                    buffer.push(PLAYER_NUM);
                    g_selectingMove = false;
                }
                break;
            }
        }
    }
    else
    {
        // if you clicked on a tile, set the last clicked tile and set the manu to visible
        // if no tile was clicked hide the menu
        let hideRadial = true;
        if(!g_menuActive)
        {
            if(currentTime == TIME.Future)
            {
                for(let i = 0;i<9;i++)
                {
                    if(tileMap[i].onRelease() && (tileMap[i].character.owner == PLAYER_NUM || tileMap[i].character.owner == -1) && (tileMap[i].tileOwner == -1 || tileMap[i].tileOwner == PLAYER_NUM))
                    {
                    g_lastClickedTile = i;
                    displayRadialButtons();
                    hideRadial = false;
                    g_menuActive = true;
                    break;
                    }
        
                }
            }
            else{
                for(let i = 9;i<tileMap.length;i++)
                {
                    if(tileMap[i].onRelease() && (tileMap[i].character.owner == PLAYER_NUM || tileMap[i].character.owner == -1) && (tileMap[i].tileOwner == -1 || tileMap[i].tileOwner == PLAYER_NUM))
                    {
                        g_lastClickedTile = i;
                        displayRadialButtons();
                        hideRadial = false;
                        g_menuActive = true;
                        break;
                    }
        
                }
            }
        }
        releaseRadialMenu();

        if(hideRadial)
        {
            hideRadialMenu();
            g_menuActive = false;
        }
        //console.log("canvas released game");
        EndTurnButton.releaseClick();

        if(HOSTMODE)
    {
        hostButton.releaseClick();
    }
        if(SINGLEPLAYERMODE)
            changePlayerButton.releaseClick();
        
        timeButton.releaseClick();
    }
}

// ========================================================================================================================================================




// ========================================================================================================================================================
// menu click functions
function canvasClickedMenu()
{
    //console.log("canvas clicked menu");
    for(let i =0; i < menuButtons.length;i++)
        menuButtons[i].click();
}


function canvasReleasedMenu()
{
    //console.log("canvas released menu");
    for(let i =0; i < menuButtons.length;i++)
        menuButtons[i].releaseClick();
}

// ========================================================================================================================================================

// ========================================================================================================================================================
// menu click functions
function canvasClickedInstructions()
{
    for(let i =0; i < InstructionButtons.length;i++)
        InstructionButtons[i].click();
}


function canvasReleasedInstructions()
{
    for(let i =0; i < InstructionButtons.length;i++)
        InstructionButtons[i].releaseClick();
}

// ========================================================================================================================================================

