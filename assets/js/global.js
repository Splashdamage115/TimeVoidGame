let PLAYER_NAME = "";
let OTHER_PLAYER_NAME = "Player 2";
let OTHER_PLAYER_PORFILE_NUM = Math.floor(Math.random() * 10);
let PLAYER_NUM = 1;
let HOSTMODE = false;
let SINGLEPLAYERMODE = true;

// controls the current game mode of the game, change these to change game mode
const GAMEMODE = ["menu","game", "instructions", "winner"];
let currentMode = "menu";
const TIME = {
    Future: 'Future',
    Past: 'Past'
}

let currentTime = TIME.Future;
let otherPlayersTime = TIME.Future;
let moveableTilesArray = [[6,3],[6,8,3,5],[8,5],[0,1,4],[3,5],[4,1,2],[0,1,7],[6,8],[7,1,2],  [15,12],[15,17,12,14],[17,14],[9,10,13],[12,14],[13,10,11],[9,10,16],[15,17],[16,10,11]];

context.imageSmoothingEnabled = false;

let g_playerImageNo = 0;

let g_lastClickedTile = -1;
let g_selectingMove = false;
let g_menuActive = false;
let g_archerShooting = false;
let g_bufferAppends = 0;
let g_placementAmount = 1;
let g_otherPlaceAmt = 1;
let g_changeTimeCounter = 0;
let g_changeTimeCounterOther = 0;
const CHANGE_TIME_INTERVAL = 2;


// standard coordinate object
function Coords(x,y){
    this.x = x;
    this.y = y;

    // functions
    this.set = function(t_x,t_y)
    {
        x = t_x;
        y = t_y;
    };
}


// mouse position used by most objects
let mousePosition = new Coords(0,0);

 function PointToSquare(t_posX1 , t_posY1 , t_posX2 , t_posY2 , t_width , t_height)
{
    let type = (t_posX1 >= t_posX2 && t_posX1 <= t_posX2 + t_width && t_posY1 >= t_posY2 && t_posY1 <= t_posY2 + t_height);
    return type;
}

let charSprite = new Image();
charSprite.src = "assets/imgs/charSheet.png";

let blankSheet = new Image();
blankSheet.src = "assets/imgs/blank.png";
