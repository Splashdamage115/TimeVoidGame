const TILETYPE = {
    None: 'None',
    Sword: 'Sword',
    Bow: 'Bow',
    Shield: 'Shield'
};

  
function Tile(pos, size)
{
    this.sprite = new Sprite(tileImg,pos,size,new Coords(0,0),1);
    this.tilePos = pos;
    this.tileSize = size;
    this.insideTile = false;
    this.tileNum = -1;
    this.tileChar = TILETYPE.None;
    this.character = new CharacterType(new Sprite(blankSheet,new Coords(this.tilePos.x, this.tilePos.y - 39),new Coords(92,104),new Coords(0,PLAYER_NUM * 104),1), 1, CHARACTER.None,-1);
    this.tileOwner = -1;
    this.ownerCounter = 0;
    this.previousOwner = -1;

    this.damageCharacter = function()
    {
        if(this.character.takeDamage(1))
        {
            //console.log("resetting tile");
            this.tileChar = TILETYPE.None;
            this.character = new CharacterType(new Sprite(blankSheet,new Coords(this.tilePos.x, this.tilePos.y - 39),new Coords(92,104),new Coords(0,PLAYER_NUM * 104),1), 1, CHARACTER.None,-1);
        }
    };

    this.increaseHealth = function()
    {
        this.character.health++;
    };

    this.increaseHealthPermanently = function()
    {
        this.character.maxHealth++;
    };

    this.resetCharacter = function()
    {
        //console.log(this.character.owner);
        this.character.resetHealth();
        if(this.character.owner == this.previousOwner && this.character.owner != -1)
        {
            this.ownerCounter++;
            if(this.ownerCounter == 3)
            {
                console.log("changing owner number");
                this.tileOwner = this.character.owner;
                this.sprite.spriteStart.y = (this.tileOwner + 1) * this.tileSize.y;
            }
        }
        else
        {
            this.ownerCounter = 0;
        }
        if(this.character.owner != -1)
            this.previousOwner = this.character.owner;
    };

    this.update = function()
    {
        // this checks if the mouse is inside the tile
        if(PointToSquare(mousePosition.x,mousePosition.y,this.tilePos.x,this.tilePos.y,this.tileSize.x,this.tileSize.y))
        {
            //console.log("attempting change state");
            this.sprite.changeFrameTo(1);
            this.insideTile = true;
        }
        else
        {
            this.sprite.changeFrameTo(0);
            this.insideTile = false;
        }
    };


    this.onclick = function()
    {
        // this might end up doing nothing!
        if(this.insideTile)
        {
            console.log("clicked tile ", this.tileNum);
        }
    }

    this.onRelease = function()
    {
        if(this.insideTile)
        {
            //console.log("make menu appear at ", this.tileNum);
            return true;
        }
    };



    this.setTile = function(tileType)
    {
        this.tileChar = tileType;
    };


    this.render = function()
    {
        this.sprite.render();
        this.character.render();
    };
}




let tileImg = new Image;
tileImg.src = "assets/imgs/Tile.png";

// =========================================================================================================================================================================
//                                                  Decleration of the tile map
// =========================================================================================================================================================================

//                      pos                                                              , size
let tileMap = [new Tile(new Coords((canvas.width/4) - 45.5    ,  canvas.height/2 - 131.5), new Coords(91,63)),
               new Tile(new Coords(canvas.width/2 - 45.5      ,  canvas.height/2 - 131.5), new Coords(91,63)),
               new Tile(new Coords((canvas.width/4) * 3 - 45.5,  canvas.height/2 - 131.5), new Coords(91,63)),
               new Tile(new Coords((canvas.width/8) * 3 - 45.5,  340)                    , new Coords(91,63)),
               new Tile(new Coords(canvas.width/2 - 45.5      ,  canvas.height/2 - 45.5) , new Coords(91,63)),
               new Tile(new Coords((canvas.width/8) * 5 - 45.5,  340)                    , new Coords(91,63)),
               new Tile(new Coords((canvas.width/8) * 3 - 45.5,  250)                    , new Coords(91,63)),
               new Tile(new Coords(canvas.width/2 - 45.5      ,  canvas.height/2 - 217)  , new Coords(91,63)),
               new Tile(new Coords((canvas.width/8) * 5 - 45.5,  250)                    , new Coords(91,63)),
               // past tiles
               new Tile(new Coords((canvas.width/4) - 45.5    ,  canvas.height/2 - 131.5), new Coords(91,63)),
               new Tile(new Coords(canvas.width/2 - 45.5      ,  canvas.height/2 - 131.5), new Coords(91,63)),
               new Tile(new Coords((canvas.width/4) * 3 - 45.5,  canvas.height/2 - 131.5), new Coords(91,63)),
               new Tile(new Coords((canvas.width/8) * 3 - 45.5,  340)                    , new Coords(91,63)),
               new Tile(new Coords(canvas.width/2 - 45.5      ,  canvas.height/2 - 45.5) , new Coords(91,63)),
               new Tile(new Coords((canvas.width/8) * 5 - 45.5,  340)                    , new Coords(91,63)),
               new Tile(new Coords((canvas.width/8) * 3 - 45.5,  250)                    , new Coords(91,63)),
               new Tile(new Coords(canvas.width/2 - 45.5      ,  canvas.height/2 - 217)  , new Coords(91,63)),
               new Tile(new Coords((canvas.width/8) * 5 - 45.5,  250)                    , new Coords(91,63))];

// =========================================================================================================================================================================
// this sets the number within the tile to its number in the tileMap
setTileNumber();
function setTileNumber()
{
    for(let i = 0;i < tileMap.length;i++)
    {
        tileMap[i].tileNum = i;
    }
}
// =========================================================================================================================================================================
