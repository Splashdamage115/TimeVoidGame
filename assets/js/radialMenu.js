let radialButtonsTexture = new Image;
radialButtonsTexture.src = "assets/imgs/radialButtonBasicSS.png";

function radialButton(spriteStart, onClickFunction, offset)
{
    //                        Sprite, pos, size, buttonStartHeight, scaleFactor, onClickFunction
    this.button = new Button(radialButtonsTexture,new Coords(-100,-100),new Coords(64,18),spriteStart,1.5,function(){ return true; });
    this.offset = offset;
    this.onClickFunction = onClickFunction;
    this.show = true;

    this.showButton = function()
    {
        this.button.position = new Coords(mousePosition.x + offset.x,mousePosition.y + offset.y);
        this.show = true;
    };

    this.update = function()
    {
        if(!this.show)
            this.button.position = new Coords(-200,-200)
        this.button.update();
    };

    this.click = function()
    {
        this.button.click();
    };

    this.release = function()
    {
        if(this.button.releaseClick())
        {
            this.onClickFunction();
            hideRadialMenu();
            g_menuActive = false;
        }
    };

    this.render = function()
    {
        if(this.show)
        {
            this.button.render();
            //console.log("displaying");
        }
    };
};

const RADIALBUTTONHEIGHT = 18;

function bowSpawn()
{
    if(g_placementAmount > 0)
    {
        g_placementAmount--;
        appendToBuffer(COMMAND.Spawn,TILETYPE.Bow);
    }
        
}
function swordSpawn()
{
    if(g_placementAmount > 0)
    {
        g_placementAmount--;
        appendToBuffer(COMMAND.Spawn,TILETYPE.Sword);
    }
}
function shieldSpawn()
{
    if(g_placementAmount > 0)
    {
        g_placementAmount--;
        appendToBuffer(COMMAND.Spawn,TILETYPE.Shield);
    }
}

function attackTile()
{
    appendToBufferCmd(COMMAND.Attack);
}

function moveTile()
{
    appendToBufferCmd(COMMAND.Move);
}

function defendTile()
{
    appendToBufferCmd(COMMAND.Defend);
}

let InteractButtons = [new radialButton(RADIALBUTTONHEIGHT * 1,swordSpawn,new Coords(-48,-48)),
    new radialButton(RADIALBUTTONHEIGHT * 2,bowSpawn,new Coords(26,-16)),
    new radialButton(RADIALBUTTONHEIGHT * 3,shieldSpawn,new Coords(-48,16)),
    new radialButton(RADIALBUTTONHEIGHT * 4,attackTile,new Coords(-48,-48)),
    new radialButton(RADIALBUTTONHEIGHT * 5,moveTile,new Coords(26,-16)),
    new radialButton(RADIALBUTTONHEIGHT * 6,defendTile,new Coords(-48,16))];

function displayRadialButtons()
{
    // if more radial buttons are added change them here
    // buttons 0-2 are the standard spawn buttons
    // buttons 3-5 are the movement attack and defend buttons
    for(let i = 0;i<InteractButtons.length;i++)
    {
        InteractButtons[i].show = false;
    }

    if(tileMap[g_lastClickedTile].tileChar == TILETYPE.None)
    {
        InteractButtons[0].showButton();
        InteractButtons[1].showButton();
        InteractButtons[2].showButton();
    }
    else
    {
        InteractButtons[3].showButton();
        InteractButtons[4].showButton();
        InteractButtons[5].showButton();
    }
}

function hideRadialMenu()
{
    for(let i = 0;i<InteractButtons.length;i++)
    {
        InteractButtons[i].show = false;
    }
}

function clickRadialMenu()
{
    for(let i = 0;i<InteractButtons.length;i++)
    {
        InteractButtons[i].click();
    }
}

function releaseRadialMenu()
{
    for(let i = 0;i<InteractButtons.length;i++)
    {
        InteractButtons[i].release();
    }
}
