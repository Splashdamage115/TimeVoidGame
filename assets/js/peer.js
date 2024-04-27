var msgConnection;
var peer = new Peer();

peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
});

function recievedData(data)
{
  alert(data);
    //alert('Received : ' + data); console.log(data);
    if(data == "Hello!")
    {
      alert("says hello!");
    }
    else if(data == "startgame")
    {
      document.getElementById("the_canvas").style.display = "block";
      document.getElementById("peerLobbyScreen").style.display = "none";

    }
    else if(data == "endturn")
    {
      playBuffer();
    }
    else if(data[0] == "Name")
    {
      // host peer handshake (sync)
      OTHER_PLAYER_NAME = data[1];
      if(OTHER_PLAYER_NAME.length > 7)
        OTHER_PLAYER_NAME = OTHER_PLAYER_NAME[0]+OTHER_PLAYER_NAME[1]+OTHER_PLAYER_NAME[2]+OTHER_PLAYER_NAME[3]+OTHER_PLAYER_NAME[5]+"...";
      OTHER_PLAYER_PORFILE_NUM = data[2];
      profileImageOther.spriteStart.y = OTHER_PLAYER_PORFILE_NUM * 32;
      profileImageOther.pos.x = 410;
      document.getElementById("peerLobbyText").innerHTML = "Host :" + OTHER_PLAYER_NAME + "   🟢" ;
      flag1.spriteStart = new Coords(0,flag1.frameSize.y);
      flag2.spriteStart = new Coords(flag1.frameSize.x,0);
    }
    else
    {
      appendBufferToBuffer(data);
    }
}


document.getElementById("connect_Button").addEventListener("click", function() { SINGLEPLAYERMODE = false;PLAYER_NUM = 0; msgConnection = peer.connect(document.getElementById("HostConnection").value);
    msgConnection.on('data', recievedData); });


    // this should never be called...
peer.on('connection', function(conn) { console.log("connected to host"); });

document.getElementById("Sync").addEventListener("click", function() 
{
    msgConnection.send(["Name", PLAYER_NAME, g_playerImageNo]);
    document.getElementById("peer").style.display = "none";
    document.getElementById("peerLobbyScreen").style.display = "block";
});



document.getElementById("hello").addEventListener("click", function() { msgConnection.send("Hello!"); });


