// these are the functions to control the game loop
function updateInstructions()
{
    background.update();
    
    for(let i =0; i < InstructionButtons.length;i++)
        InstructionButtons[i].update();

    instructionPage.update();
}
        
function drawInstructions()
{
    // clear the canvas so you can draw on top 
    context.clearRect(0, 0, canvas.width, canvas.height);

    background.render();

    for(let i =0; i < InstructionButtons.length;i++)
        InstructionButtons[i].render();

    instructionPage.render();
}