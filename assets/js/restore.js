if(localStorage.getItem("NAME") == null)
{
    document.getElementById("the_canvas").style.display = "none";
    document.getElementById("hostPG").style.display = "none";
    document.getElementById("peer").style.display = "none";
    document.getElementById("reset_name_data_Wrapper").style.display = "block";
    document.getElementById("home").style.display = "none";
    document.getElementById("hostLobbyScreen").style.display = "none";
    document.getElementById("peerLobbyScreen").style.display = "none";
    document.getElementById("Restore_data_").style.display = "none";
}
else
{
    document.getElementById("the_canvas").style.display = "none";
    document.getElementById("hostPG").style.display = "none";
    document.getElementById("peer").style.display = "none";
    document.getElementById("home").style.display = "none";
    document.getElementById("reset_name_data_Wrapper").style.display = "none";
    document.getElementById("hostLobbyScreen").style.display = "none";
    document.getElementById("peerLobbyScreen").style.display = "none";
    document.getElementById("Restore_data_").style.display = "block";
}

function restoreSaveData()
{
    PLAYER_NAME = localStorage.getItem("NAME");
    g_playerImageNo = localStorage.getItem("IMAGE");

    profileImage.spriteStart.y = g_playerImageNo * 32;

    document.getElementById("Restore_data_").style.display = "none";
    document.getElementById("reset_name_data_Wrapper").style.display = "none";
    document.getElementById("home").style.display = "block";
}

function deleteSaveData()
{
    localStorage.clear();
    document.getElementById("Restore_data_").style.display = "none";
    document.getElementById("reset_name_data_Wrapper").style.display = "block";
}

document.getElementById("Restore_Save_Data_").addEventListener("click", restoreSaveData);
document.getElementById("Delete_Save_Data_").addEventListener("click", deleteSaveData);