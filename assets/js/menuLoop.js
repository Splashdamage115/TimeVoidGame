// these are the functions to control the menu loop

// update all occurences involving the menu
function updateMenu()
{
    background.update();
    
    for(let i =0; i < menuButtons.length;i++)
        menuButtons[i].update();

}
        
// draw the menu to the screen
function drawMenu()
{
    // clear the canvas so you can draw on top 
    context.clearRect(0, 0, canvas.width, canvas.height);

    // draws the global background object to the screen
    background.render();

    // draw all of the menu buttons to the screen
    for(let i =0; i < menuButtons.length;i++)
        menuButtons[i].render();
}