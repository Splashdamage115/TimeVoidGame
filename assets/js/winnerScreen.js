// decleration of the background object
let winnerImg = new Image;
winnerImg.src = "assets/imgs/winnerScreen.png";

// sprite, position, frameAmt, frameSize, spriteStart, waitTime, scaleFactor
let winnerBackground = new AnimatedSprite(winnerImg,new Coords(0,0),1,new Coords(480,854),new Coords(0,0),6,1);

let winnerProfilePic = new AnimatedSprite(playerImg,new Coords(160,370),1,new Coords(32,32),new Coords(0,32 * g_playerImageNo),100,1);


function updateWinner()
{
    winnerBackground.update();

    if(SINGLEPLAYERMODE)
    {
        if(winnerNum == 1)
        {
            winnerProfilePic.spriteStart.y = g_playerImageNo * 32;
        }
        else
        {
            winnerProfilePic.spriteStart.y = OTHER_PLAYER_PORFILE_NUM * 32;
        }
    }   
    else
    {
        if(PLAYER_NUM == winnerNum)
        {
            winnerProfilePic.spriteStart.y = g_playerImageNo * 32;
        }
        else
        {
            winnerProfilePic.spriteStart.y = OTHER_PLAYER_PORFILE_NUM * 32;
        }
    }

}

function renderWinner()
{
     // clear the canvas so you can draw on top 
     context.clearRect(0, 0, canvas.width, canvas.height);
     
    winnerBackground.render();

    if(SINGLEPLAYERMODE)
    {
        if(winnerNum == 1)
        {
            context.fillText(PLAYER_NAME,200,400);
        }
        else
        {
            context.fillText(OTHER_PLAYER_NAME,200,400);
        }
    }   
    else
    {
        if(PLAYER_NUM == winnerNum)
        {
            context.fillText(PLAYER_NAME,200,400);
        }
        else
        {
            context.fillText(OTHER_PLAYER_NAME,200,400);
        }
    }
    winnerProfilePic.render();
}