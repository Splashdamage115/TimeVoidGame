let winnerNum = checkWinner();

// these are the functions to control the game loop
function updateGame()
{
    background.update();
    backgroundNight.update();
    waitingForMove1.update();
    waitingForMove2.update();

    for (let i = 0;i<tileMap.length;i++)
        tileMap[i].update();
    
    for (let i = 0;i<InteractButtons.length;i++)
        InteractButtons[i].update();

    EndTurnButton.update();

    if(HOSTMODE)
    {
        hostButton.update();
    }
    if(SINGLEPLAYERMODE)
        changePlayerButton.update();
    else
    {
        profileImageOther.update();
    }

    timeButton.update();

    //flag1.update();
    //flag2.update();

    winnerNum = checkWinner();
    if(winnerNum != -1)
    {
        currentMode = GAMEMODE[3];
        alert("The winner is " + winnerNum);
    }

    placementAnim.update();
    stopWatchAnim.update();
    profileImage.update();
}
        
function drawGame()
{
    // clear the canvas so you can draw on top 
    context.clearRect(0, 0, canvas.width, canvas.height);


    if(currentTime == TIME.Future)
        background.render();
    else
        backgroundNight.render();
    // put the past background rendering here

    // objects are to be rendered in a certain order
    if(currentTime == TIME.Future)
    {
    tileMap[7].render();
    tileMap[6].render();
    tileMap[8].render();
    tileMap[0].render();
    tileMap[1].render();
    tileMap[2].render();
    tileMap[3].render();
    tileMap[5].render();
    tileMap[4].render();
    }
    else
    {
    tileMap[13].render();
    tileMap[15].render();
    tileMap[16].render();
    tileMap[17].render();
    tileMap[9].render();
    tileMap[10].render();
    tileMap[11].render();
    tileMap[13].render();
    tileMap[12].render();
    tileMap[14].render();
    }
    //for (let i = 0;i<tileMap.length;i++)
    //    tileMap[i].render();
    for (let i = 0;i<InteractButtons.length;i++)
        InteractButtons[i].render();

    EndTurnButton.render();

    if(g_selectingMove)
        drawLineToMouse();

    if(HOSTMODE)
    {
        hostButton.render();
    }
    if(!SINGLEPLAYERMODE)
        context.fillText(PLAYER_NAME,80,105); 
    else
        if(PLAYER_NUM == 1)
            context.fillText(PLAYER_NAME,80,105);
         
    context.fillText(g_placementAmount,80,185); 
    context.fillText(currentTime,80,145); 
    if(g_changeTimeCounter > 0)
        context.fillText(g_changeTimeCounter,15,795); 

    profileImage.render();
    if(SINGLEPLAYERMODE)
    {
        changePlayerButton.render();
        if(PLAYER_NUM == 0)
        {
            context.fillText(OTHER_PLAYER_NAME,80,105);
            profileImageOther.render();
        }
    }
    timeButton.render();
    if(!SINGLEPLAYERMODE)
    {
        profileImageOther.render();
        context.fillText(OTHER_PLAYER_NAME,300,105);
        waitingForMove1.render();
        waitingForMove2.render();
    }

    flag1.render();
    flag2.render();

    placementAnim.render();
    stopWatchAnim.render();
}

function inBounds()
{
    let boundNum = -1;
    let cancontinue = false;
    for(let i =0;i<tileMap.length;i++)
    {
        if(mousePosition.x >= tileMap[i].tilePos.x && mousePosition.x <= tileMap[i].tilePos.x + tileMap[i].tileSize.x)
        {
            if(mousePosition.y >= tileMap[i].tilePos.y && mousePosition.y <= tileMap[i].tilePos.y + tileMap[i].tileSize.y)
            {
                if(g_archerShooting)
                {
                    cancontinue = true;
                }
                else{
                    // this will check if that current tile is accessible by this tile
                    for(let u = 0; u < moveableTilesArray[g_lastClickedTile].length;u++)
                    {
                        if(currentTime == TIME.Past)
                        {
                            //console.log(moveableTilesArray[g_lastClickedTile]);
                            console.log(i);
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
                    //
                }

                // changes pen colour if you are clicking a tie that you can move to
                if(cancontinue)
                {
                    context.strokeStyle = "green"; 
                }
                // returns the number anyways so that it can clip to it
                boundNum = i;
                break;
            }
        }
    }
    return boundNum;
}

function drawLineToMouse()
{
    context.strokeStyle = "red"; 

    let boundNum = inBounds();
    context.beginPath();
    context.moveTo(tileMap[g_lastClickedTile].tilePos.x + tileMap[g_lastClickedTile].tileSize.x / 2, tileMap[g_lastClickedTile].tilePos.y + tileMap[g_lastClickedTile].tileSize.y / 2);
    if(boundNum == -1)
    {
        context.lineTo(mousePosition.x, mousePosition.y);
    }
    else
    {
        context.lineTo(tileMap[boundNum].tilePos.x + tileMap[boundNum].tileSize.x / 2, tileMap[boundNum].tilePos.y + tileMap[boundNum].tileSize.y / 2);
    }
    context.stroke();
}

function checkWinner()
{
    let winnerNum = tileMap[0].tileOwner;
    letWinnerDeclared = false;
    for(let i = 0; i < 9; i++)
    {
        if(tileMap[i].tileOwner == winnerNum)
        {

            if(i == 8)
            {
                winnerDeclared = true;
            }
        }
        else
        {
            winnerNum = -1;
            break;
        }
    }
        if(winnerNum == -1)
        {
            winnerNum = tileMap[9].tileOwner;

        for(let i = 9; i < tileMap.length; i++)
        {
        if(tileMap[i].tileOwner == winnerNum)
        {

            if(i == tileMap.length)
            {
                winnerDeclared = true;
            }
        }
        else
        {
            winnerNum = -1;
            break;
        }
    }
}

    if(winnerDeclared)
        return winnerNum;
    return -1;
}
