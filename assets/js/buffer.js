// this java script file will handle all java script functions relating to the buffer object
const COMMAND = {
    Spawn: 'Spawn',
    Attack: 'Attack',
    Move: 'Move',
    Defend: 'Defend'
};

const BUFFER_GAP = 5;
let bufferSent = false;

// buffer Layout :
//                  COMMAND , character Type , location Starting , move to location
let buffer = [];

function sendOutBuffer()
{
    if(!bufferSent)
    {
        if(HOSTMODE)
        {
            hostConnection.send(buffer);
        }
        else
        {
            msgConnection.send(buffer);
        }
        g_bufferAppends++;
        bufferSent = true;
        waitingForMove1.spriteStart.y = 32;
    }
}

function appendBufferToBuffer(t_buffer2)
{
    if(!g_selectingMove)
    {
        buffer = [].concat(buffer, t_buffer2)
        g_bufferAppends++;
    }
    else
    {
        buffer = [].concat(t_buffer2, buffer)
        g_bufferAppends++;
    }
    waitingForMove2.spriteStart.y = 32;
}

function emptyBuffer()
{
    // console.log("EMPTYING BUFFER");

    buffer = [];
    swordMoveBuffer = [];

    for(let i = 0; i < tileMap.length;i++)
    {
        tileMap[i].resetCharacter();
    }
    bufferSent = false;
    g_placementAmount++;
    g_otherPlaceAmt++;

    // decrease this at the end of every turn
    if(g_changeTimeCounter > 0)
        g_changeTimeCounter--;
    g_bufferAppends = 0;

    waitingForMove1.spriteStart.y = 0;
    waitingForMove2.spriteStart.y = 0;
}

function appendToBufferCmd(commandType)
{
    if(!bufferSent){
    console.log(tileMap[g_lastClickedTile].tileChar);
    if(commandType != COMMAND.Defend)
        g_selectingMove = true;

    if(commandType == COMMAND.Attack && tileMap[g_lastClickedTile].tileChar == 'Bow')
        g_archerShooting = true;

    for(let i = 0;i<buffer.length;i+=BUFFER_GAP)
    {   
        if(buffer[i + 2] == g_lastClickedTile)
        {
            buffer[i] = commandType;
            buffer[i + 1] = tileMap[g_lastClickedTile].tileChar;
            // buffer[i+2] = ...     dont need to reset the tile as it is already the same

            // if its defend it doesnt need a move location
            if(commandType == COMMAND.Defend)
            {
                buffer[i + 3] = -1; // push nothing as a loction to move to is not needed
                buffer[i+4] = PLAYER_NUM;
            }

            console.log(buffer); // print out the buffer for debug purposes


            return true; // not really needed mainly used to break out of function
        }
    }

    buffer.push(commandType);
    buffer.push(tileMap[g_lastClickedTile].tileChar);
    buffer.push(g_lastClickedTile);

    // if its defend it doesnt need a move location
    if(commandType == COMMAND.Defend)
    {
        buffer.push(-1); // push nothing, as a loction to move to is not needed
        buffer.push(PLAYER_NUM);
    }

    //console.log(buffer);
}
}



function appendToBuffer(commandType, tileType)
{
    if(!bufferSent)
    {
    for(let i = 0;i<buffer.length;i+=BUFFER_GAP)
    {   
        if(buffer[i + 2] == g_lastClickedTile)
        {
            buffer[i] = commandType;
            buffer[i + 1] = tileType;
            // buffer[i+2] = ...     dont need to reset the tile as it is already the same

            buffer[i + 3] = -1; // push nothing as a loction to move to is not needed
            buffer[i+4] = PLAYER_NUM;

            console.log(buffer); // print out the buffer for debug purposes
            

            return true; // not really needed mainly used to break out of function
        }
    }

    buffer.push(commandType);
    buffer.push(tileType);
    buffer.push(g_lastClickedTile);

    buffer.push(-1); // push nothing as a loction to move to is not needed
    buffer.push(PLAYER_NUM);

    console.log(buffer);
}
}



// ====================================================================================================================
//                                                  execute buffer functions
// ====================================================================================================================

function playBuffer()
{
    // console.log(buffer);
    g_bufferAppends = 0;

    for(let i = 0; i< buffer.length ; i+=BUFFER_GAP)
    {
        if(buffer[i] == COMMAND.Defend)
            defendBuffer(i);
    }
    // this will skip over repeat commands into the same tile
    let skipOverLoop = false;
    for(let i = 0 ; i < buffer.length ; i += BUFFER_GAP)
    {
        skipOverLoop = false;



        // ===========================================================
        // this is for checking for repeat commands into a tile
        // ===========================================================

        if(buffer[i] == COMMAND.Move || buffer[i] == COMMAND.Spawn)
        {
            for(let u = 0; u < buffer.length ; u += BUFFER_GAP)
            {
                if(u == i) continue;

                if(buffer[i] == COMMAND.Move)
                    if(buffer[i + 3] == buffer[u + 2])
                    {
                        skipOverLoop = true;
                        break;
                    }
                if(buffer[i] == COMMAND.Spawn)
                    if(buffer[u + 3] == buffer[i + 2])
                    {
                        skipOverLoop = true;
                        break;
                    }
                if(buffer[u] == COMMAND.Spawn && buffer[i] == COMMAND.Spawn)
                    if(buffer[u + 2] == buffer[i + 2] && !(buffer[u+1] == buffer[i+1]))
                    {
                        skipOverLoop = true;
                        break;
                    }
            }
        
            // skip over this loop iteration if repeats are detected
            if(skipOverLoop) continue;
        }

        // ===========================================================




        switch(buffer[i])
        {
            case COMMAND.Spawn:
                spawnBuffer(i);
                break;
            case COMMAND.Attack:
                attackBuffer(i);
                break;
            case COMMAND.Move:
                moveBuffer(i);
                break;
            case COMMAND.Defend:
                break;
        };
    }

    emptyBuffer();
}

function spawnBuffer(currentPos)
{
    switch(buffer[currentPos + 1])
    {
        case TILETYPE.Bow:
            tileMap[buffer[currentPos + 2]].tileChar = buffer[currentPos + 1];
            console.log("Spawned bow @ ", buffer[currentPos + 2]);
            //                                          new CharacterType(new Sprite(blankSheet,new Coords(this.tilePos.x, this.tilePos.y - 39),new Coords(92,104),new Coords(0,0),1), 1, CHARACTER.None);
            tileMap[buffer[currentPos + 2]].character = new CharacterType(new Sprite(charSprite,new Coords(tileMap[buffer[currentPos + 2]].tilePos.x, tileMap[buffer[currentPos + 2]].tilePos.y - 39),new Coords(92,104),new Coords(92 * 1,buffer[currentPos + 4] * 104),1),1,CHARACTER.Bow,buffer[currentPos + 4]);
            break;
        case TILETYPE.Sword:
            tileMap[buffer[currentPos + 2]].tileChar = buffer[currentPos + 1];
            console.log("Spawned Sword @ ", buffer[currentPos + 2]);
            tileMap[buffer[currentPos + 2]].character = new CharacterType(new Sprite(charSprite,new Coords(tileMap[buffer[currentPos + 2]].tilePos.x, tileMap[buffer[currentPos + 2]].tilePos.y - 39),new Coords(92,104),new Coords(92 * 2,buffer[currentPos + 4] * 104),1),1,CHARACTER.Sword,buffer[currentPos + 4]);
            break;
        case TILETYPE.Shield:
            tileMap[buffer[currentPos + 2]].tileChar = buffer[currentPos + 1];
            console.log("Spawned Shield @ ", buffer[currentPos + 2]);
            tileMap[buffer[currentPos + 2]].character = new CharacterType(new Sprite(charSprite,new Coords(tileMap[buffer[currentPos + 2]].tilePos.x, tileMap[buffer[currentPos + 2]].tilePos.y - 39),new Coords(92,104),new Coords(92 * 3,buffer[currentPos + 4] * 104),1),1,CHARACTER.Shield,buffer[currentPos + 4]);
            break;
    };
}

function attackBuffer(currentPos)
{
    tileMap[buffer[currentPos+3]].damageCharacter();

    // add movement to the array to move the sword to the end
    if(buffer[currentPos + 1] == TILETYPE.Sword)
    {
        buffer.push(COMMAND.Move);
        buffer.push(buffer[currentPos+1]);
        buffer.push(buffer[currentPos+2]);
        buffer.push(buffer[currentPos+3]);
    }
}

function moveBuffer(currentPos)
{
    //console.log("moving ", buffer[currentPos + 1], " from ", buffer[currentPos + 2], " to ", buffer[currentPos + 3]);

    //console.log(tileMap[buffer[currentPos + 2]].tileChar);
    //console.log(tileMap[buffer[currentPos + 3]].tileChar);
    if(tileMap[buffer[currentPos + 3]].tileChar == CHARACTER.None)
    {
        tileMap[buffer[currentPos + 3]].tileChar = tileMap[buffer[currentPos + 2]].tileChar;
        tileMap[buffer[currentPos + 3]].character = tileMap[buffer[currentPos + 2]].character;
        tileMap[buffer[currentPos + 3]].character.Sprite.pos = new Coords(tileMap[buffer[currentPos + 3]].tilePos.x, tileMap[buffer[currentPos + 3]].tilePos.y - 39);

        tileMap[buffer[currentPos + 2]].tileChar = CHARACTER.None;
        tileMap[buffer[currentPos + 2]].character = new CharacterType(new Sprite(blankSheet,new Coords(tileMap[buffer[currentPos + 2]].tilePos.x, tileMap[buffer[currentPos + 2]].tilePos.y - 39),new Coords(92,104),new Coords(0,PLAYER_NUM * 104),1),1,CHARACTER.Shield,-1);
    }
}
function defendBuffer(currentPos)
{
    // incease the defense health by an extra 1 if defending
    if(buffer[currentPos + 1] == TILETYPE.Shield)
    {
        tileMap[buffer[currentPos + 2]].increaseHealth();
    }
    tileMap[buffer[currentPos + 2]].increaseHealth();
}

// ====================================================================================================================
