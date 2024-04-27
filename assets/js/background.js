function Sprite(sprite, position, frameSize, spriteStart, scaleFactor)
{
    this.spriteSheet = sprite;
    this.pos = position;
    this.frameSize = frameSize;
    this.spriteStart = spriteStart;
    this.scaleFactor = scaleFactor;

    this.changeSpriteStart = function(spriteStart)
    {
        this.spriteStart = spriteStart;
    };

    this.changeFrameTo = function(num)
    {
        this.spriteStart.x = this.frameSize.x * num;
    }

    this.render = function()
    {
        //ctx.drawImage(img, sx, sy, sWidth, sHeight, x, y, width, height);
        context.drawImage(this.spriteSheet, this.spriteStart.x, this.spriteStart.y, 
            this.frameSize.x,this.frameSize.y,this.pos.x,this.pos.y,this.frameSize.x * this.scaleFactor,this.frameSize.y * this.scaleFactor);
    };
}



function AnimatedSprite(sprite, position, frameAmt, frameSize, spriteStart, waitTime, scaleFactor)
{
    this.spriteSheet = sprite;
    this.pos = position;
    this.frameAmt = frameAmt;
    this.frameSize = frameSize;
    this.spriteStart = spriteStart;
    this.waitTime = waitTime;
    this.currentFrame = 0;
    this.currentWaitTime = 0;
    this.scaleFactor = scaleFactor;

    this.update = function()
    {
        this.currentWaitTime++;
        if(this.currentWaitTime >= this.waitTime)
        {
            this.currentWaitTime = 0;
            this.currentFrame++;
            if(this.currentFrame >= this.frameAmt)
                this.currentFrame = 0;
            
            this.spriteStart = new Coords(this.frameSize.x * this.currentFrame, this.spriteStart.y);
        }
    };

    this.render = function()
    {
        //ctx.drawImage(img, sx, sy, sWidth, sHeight, x, y, width, height);
        context.drawImage(this.spriteSheet, this.spriteStart.x, this.spriteStart.y, 
            this.frameSize.x,this.frameSize.y,this.pos.x,this.pos.y,this.frameSize.x * this.scaleFactor,this.frameSize.y * this.scaleFactor);
    };
}

// decleration of the background object
let backSprite = new Image;
backSprite.src = "assets/imgs/background.png";

// sprite, position, frameAmt, frameSize, spriteStart, waitTime, scaleFactor
let background = new AnimatedSprite(backSprite,new Coords(0,0),54,new Coords(480,854),new Coords(0,0),8,1);

// decleration of the background object
let backNight = new Image;
backNight.src = "assets/imgs/night.png";

// sprite, position, frameAmt, frameSize, spriteStart, waitTime, scaleFactor
let backgroundNight = new AnimatedSprite(backNight,new Coords(0,0),118,new Coords(480,854),new Coords(0,0),5,1);



let waitingImg = new Image;
waitingImg.src = "assets/imgs/waiting.png";

let waitingForMove1 = new AnimatedSprite(waitingImg,new Coords(360,645),9,new Coords(32,32),new Coords(0,0),6,1);
let waitingForMove2 = new AnimatedSprite(waitingImg,new Coords(420,645),9,new Coords(32,32),new Coords(0,0),6,1);

let flagsImg = new Image;
flagsImg.src = "assets/imgs/flags.png";

let flag1 = new AnimatedSprite(flagsImg,new Coords(20,30),0,new Coords(48,64),new Coords(0,0),100,2);
let flag2 = new AnimatedSprite(flagsImg,new Coords(370,30),0,new Coords(48,64),new Coords(48,64),100,2);

let placementImg = new Image;
placementImg.src = "assets/imgs/placementSS.png";

let placementAnim = new AnimatedSprite(placementImg,new Coords(40,160),12,new Coords(32,32),new Coords(0,0),6,1);

let stopWatchImg = new Image;
stopWatchImg.src = "assets/imgs/stopwatch.png";

let stopWatchAnim = new AnimatedSprite(stopWatchImg,new Coords(40,120),8,new Coords(32,32),new Coords(0,0),6,1);

let playerImg = new Image;
playerImg.src = "assets/imgs/playerImg.png";

let profileImage = new AnimatedSprite(playerImg,new Coords(40,80),1,new Coords(32,32),new Coords(0,32 * g_playerImageNo),100,1);
let profileImageOther = new AnimatedSprite(playerImg,new Coords(40,80),1,new Coords(32,32),new Coords(0,32 * OTHER_PLAYER_PORFILE_NUM),100,1);

let instructionsImg = new Image;
instructionsImg.src = "assets/imgs/instructions.png";

let instructionPage = new AnimatedSprite(instructionsImg,new Coords(0,0),6,new Coords(480,854),new Coords(0,0),10,1);


