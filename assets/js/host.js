let hostpos = new Peer();
let hostNum;
let hostConnection;

let waitingForBuffers = false;

hostpos.on('open', function(id) {
    console.log('My host ID is: ' + id);
    hostNum = hostpos.id;
});



document.getElementById("host_button").addEventListener("click", function() { document.getElementById("connectText").innerHTML = "host id: " + hostNum ;});

hostpos.on('connection', function(conn) { SINGLEPLAYERMODE = false; alert("Peer connected"); HOSTMODE = true; hostConnection = conn; hostConnection.on('data', function(data) { 
  //alert('Received : ' + data);
    if(data[0] == "Name")
    {
      
      // host peer handshake (sync)
      OTHER_PLAYER_NAME = data[1];
      if(OTHER_PLAYER_NAME.length > 7)
        OTHER_PLAYER_NAME = OTHER_PLAYER_NAME[0]+OTHER_PLAYER_NAME[1]+OTHER_PLAYER_NAME[2]+OTHER_PLAYER_NAME[3]+OTHER_PLAYER_NAME[5]+"...";
      OTHER_PLAYER_PORFILE_NUM = data[2];
      profileImageOther.spriteStart.y = OTHER_PLAYER_PORFILE_NUM * 32;
      profileImageOther.pos.x = 410;
      document.getElementById("hostLobbyText").innerHTML = "Player :" + OTHER_PLAYER_NAME + "   🟢" ;
    }
    else{
     console.log(data); 
    appendBufferToBuffer(data);
    }
    }
    );
    hostConnection.send(["Name", PLAYER_NAME]);
     });

document.getElementById("Hosthello").addEventListener("click", function() { hostConnection.send("Hello!"); });


document.getElementById("StartGame").addEventListener("click", function() { 
    if(!SINGLEPLAYERMODE)
        hostConnection.send("startgame");
    //location.replace("game.html");
    document.getElementById("the_canvas").style.display = "block";
    document.getElementById("hostLobbyScreen").style.display = "none";
  });

  document.getElementById("SyncHost").addEventListener("click", function() 
{
  hostConnection.send(["Name", PLAYER_NAME, g_playerImageNo]);
  document.getElementById("hostPG").style.display = "none";
  document.getElementById("hostLobbyScreen").style.display = "block";
});