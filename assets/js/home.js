//document.getElementById("the_canvas").style.display = "none";
//document.getElementById("hostPG").style.display = "none";
//document.getElementById("peer").style.display = "none";
//document.getElementById("home").style.display = "block";
//document.getElementById("hostLobbyScreen").style.display = "none";
//document.getElementById("peerLobbyScreen").style.display = "none";

function host()    
{
    document.getElementById("the_canvas").style.display = "none";
    document.getElementById("hostPG").style.display = "block";
    document.getElementById("peer").style.display = "none";
    document.getElementById("home").style.display = "none";
    //location.replace("game.html");
}

function connect()
{
    document.getElementById("the_canvas").style.display = "none";
    document.getElementById("hostPG").style.display = "none";
    document.getElementById("peer").style.display = "block";
    document.getElementById("home").style.display = "none";
    //location.replace("game.html");
}

document.getElementById("submit").addEventListener('click', confirmData);
function handleForm(event) { 
    let e = window.event;
    e.preventDefault();
 }  




function confirmData()
{
     // on confirm set the name
     PLAYER_NAME = document.getElementById("playerName").value;
     if(PLAYER_NAME.length > 7)
         PLAYER_NAME = PLAYER_NAME[0]+PLAYER_NAME[1]+PLAYER_NAME[2]+PLAYER_NAME[3]+PLAYER_NAME[4]+"..."; 
     localStorage.setItem("NAME", PLAYER_NAME);
 


     // on confirm set the image
     g_playerImageNo = parseInt(document.getElementById("profileImage").value);
     profileImage.spriteStart.y = g_playerImageNo * 32;
     localStorage.setItem("IMAGE", g_playerImageNo);
 


     // make the form dissapear
     document.getElementById("reset_name_data_Wrapper").style.display = "none";
     document.getElementById("home").style.display = "block";
}

//document.getElementById("confirmName").addEventListener("click", confirmData);


function startGameButton()
{
    if(!SINGLEPLAYERMODE)
        hostConnection.send("startgame");
    //location.replace("game.html");
    document.getElementById("the_canvas").style.display = "block";
    document.getElementById("home").style.display = "none";
}

document.getElementById("StartGameS").addEventListener("click", startGameButton);