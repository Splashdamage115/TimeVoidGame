// this handles the button object
function Button(Sprite, pos, size, buttonStartHeight, scaleFactor, onClickFunction)
{
    // standard initialisation
    this.sprite = Sprite;
    this.position = pos;
    this.sizeX = size.x;
    this.sizeY = size.y;
    this.buttonClicked = false;
    this.hoverOver = false;
    this.spriteStartX = 0;
    this.spriteStartY = buttonStartHeight;
    this.scaleFactor = scaleFactor;
    this.mouseDown = false;
    this.onClickFunction = onClickFunction;


    // handles the click event 
    this.click = function()
    {
        this.mouseDown = true;
        if(this.hoverOver)
        {
            console.log("clicked on button");
            // change the sprite type here
            this.setSpriteToPosition(2);
            return true;
        }
    };

    // handles all release click events
    this.releaseClick = function()
    {
        this.mouseDown = false;
        // change the game state
        if(this.hoverOver)
        {
            // do the function thats needed here!
            this.setSpriteToPosition(1);

            return this.onClickFunction();
        }
        else
        {
            this.setSpriteToPosition(0);
        }
    }


    // handles the update function of the button (checking mouse position)
    this.update = function(){
        if(this.checkMouseInButton())
           {
                //console.log("inbutton");
                this.hoverOver = true;
                this.setSpriteToPosition(1);
                //console.log(this.spriteStartX);
                if(this.mouseDown)
                {
                    this.setSpriteToPosition(2);
                }
           }
           else
           {
                this.setSpriteToPosition(0);
                this.hoverOver = false;
           }
    };

    // handles rendering of the button
    this.render = function()
    {
         //ctx.drawImage(img, sx, sy, sWidth, sHeight, x, y, width, height);
         context.drawImage(this.sprite, this.spriteStartX, this.spriteStartY, this.sizeX , this.sizeY,
            this.position.x,this.position.y,this.sizeX *  this.scaleFactor , this.sizeY * this.scaleFactor);
    };

    this.checkMouseInButton = function()
    {
        return (mousePosition.x >= this.position.x && mousePosition.x <= this.position.x + this.sizeX * this.scaleFactor &&
        mousePosition.y >= this.position.y && mousePosition.y <= this.position.y + this.sizeY * this.scaleFactor);
    };
    
    this.setSpriteToPosition = function(num)
    {
        this.spriteStartX = this.sizeX * num;
    }
}



// this is where the buttons are initialised



// =============================================================================================================================
//                                                  Menu buttons
// =============================================================================================================================
//
// this is the decleration of the play button objects
// passed variables : 
//                    (Sprite, pos, size, buttonStartHeight, scaleFactor, onClickFunction)
const buttonWidth = 64;
const buttonHeight = 32;
let standardButtons = new Image;
standardButtons.src = "assets/imgs/normalButton.png";

let buttonScaleFactor = 2;
// functions that will be executed when you press the respective buttons
let playButtonFunction = function(){ console.log("button Clicked!"); currentMode = GAMEMODE[1]; }
let IntructionsButtonFunction = function(){ console.log("Welcome to the instructions"); currentMode = GAMEMODE[2]; }


let menuButtons= [new Button(standardButtons, new Coords((canvas.width / 2 )- buttonHeight * buttonScaleFactor,100), new Coords(buttonWidth,buttonHeight), buttonHeight*2 , buttonScaleFactor, playButtonFunction) ,
                  new Button(standardButtons, new Coords((canvas.width / 2 )- buttonHeight * buttonScaleFactor,400), new Coords(buttonWidth,buttonHeight), buttonHeight*3 , buttonScaleFactor, IntructionsButtonFunction)];

// =============================================================================================================================

// =============================================================================================================================
//                                                  instructions buttons
// =============================================================================================================================
//

let currentInstructionsPageNum = 0;
const MAX_INSTRUCTION_PAGES = 2;

let homeButtonFunc = function(){ console.log("button Clicked!"); currentMode = GAMEMODE[0]; }
let leftButtonFunc = function(){ console.log("left"); 
if(currentInstructionsPageNum > 0)
    currentInstructionsPageNum--;
instructionPage.spriteStart.y = instructionPage.frameSize.y * currentInstructionsPageNum;
 }
let rightButtonFunc = function(){ console.log("right");

if(currentInstructionsPageNum < MAX_INSTRUCTION_PAGES)
    currentInstructionsPageNum++;

 instructionPage.spriteStart.y = instructionPage.frameSize.y * currentInstructionsPageNum;
 }

let InstructionButtons= [new Button(standardButtons, new Coords((canvas.width / 2 )- buttonHeight * buttonScaleFactor,750), new Coords(buttonWidth,buttonHeight), buttonHeight*4 , buttonScaleFactor, homeButtonFunc) ,
                         new Button(standardButtons, new Coords(20,750), new Coords(buttonWidth,buttonHeight), buttonHeight*5 , buttonScaleFactor, leftButtonFunc),
                         new Button(standardButtons, new Coords((canvas.width - buttonWidth - 80 ),750), new Coords(buttonWidth,buttonHeight), buttonHeight*6 , buttonScaleFactor, rightButtonFunc)];

// =============================================================================================================================


// =============================================================================================================================
//

let endTurnFunc = function(){ 
    if(SINGLEPLAYERMODE)
        playBuffer();
    else
    {
        console.log("sendTurn");
        sendOutBuffer();
    }
}

let EndTurnButton= new Button(standardButtons, new Coords(340,750), new Coords(buttonWidth,buttonHeight), buttonHeight*1 , buttonScaleFactor, endTurnFunc);


                         
// =============================================================================================================================

let hostTurnButton = function(){ 
console.log("endTurn");
if(g_bufferAppends >= 2 && !SINGLEPLAYERMODE)
{
    hostConnection.send("endturn");
    playBuffer();
}
else if(SINGLEPLAYERMODE)
    playBuffer();
  }

let hostButton= new Button(standardButtons, new Coords(340,680), new Coords(buttonWidth,buttonHeight), buttonHeight*9 , buttonScaleFactor, hostTurnButton);

// =============================================================================================================================

let changeTime = function()
{ 
    if(g_changeTimeCounter == 0)
    {
    console.log("Changed time");
    if(currentTime == TIME.Future)
    {
        currentTime = TIME.Past;
    }
    else if(currentTime == TIME.Past)
    {
        currentTime = TIME.Future;
    }

    g_changeTimeCounter = CHANGE_TIME_INTERVAL;
}
}
    
let timeButton= new Button(standardButtons, new Coords(40,750), new Coords(buttonWidth,buttonHeight), buttonHeight*7 , buttonScaleFactor, changeTime);

// =============================================================================================================================

let changePlayer = function()
{ 
    console.log("changed players");
    if(PLAYER_NUM == 0)
    {
        PLAYER_NUM = 1;
        flag1.spriteStart = new Coords(0,0);
        flag2.spriteStart = new Coords(flag2.frameSize.x,flag2.frameSize.y);
    }
    else
    {
        PLAYER_NUM = 0;
        flag1.spriteStart = new Coords(0,flag1.frameSize.y);
        flag2.spriteStart = new Coords(flag2.frameSize.x,0);
    }
    let Timeholder = otherPlayersTime;
    otherPlayersTime = currentTime;
    currentTime = Timeholder;

    let cooldownHolder = g_changeTimeCounterOther;
    g_changeTimeCounterOther = g_changeTimeCounter;
    g_changeTimeCounter = cooldownHolder;

    let holder = g_otherPlaceAmt;
    g_otherPlaceAmt = g_placementAmount;
    g_placementAmount = holder;
}
    
let changePlayerButton= new Button(standardButtons, new Coords(40,680), new Coords(buttonWidth,buttonHeight), buttonHeight*8 , buttonScaleFactor, changePlayer);

// =============================================================================================================================
