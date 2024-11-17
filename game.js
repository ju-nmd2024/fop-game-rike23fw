// Variables
let frogX = 300; // Initial position on X
let frogY = 250; // Initial position on Y
let frogColor = color(30, 130, 30);
let lilyColor = color(30, 80, 30);
let darkBlue = color(10, 150, 250);
let lightBlue = color(120, 190, 255);

let frogSpeed = 2; // Frog's speed
const bottomLimit = 430; // Limit where the frog stops
const lilyPadY = 400; // Fixed position for the lilypad
let gameState = 'start';

function setup() {
    createCanvas(800, 600);
}

function draw() {
    if (gameState === 'start') {
      startScreen();
    } else if (gameState === "game") {
      gameScreen();
    } else if (gameState === "result") {
      resultScreen();
    }
  }

function startScreen() {
    background(150, 220, 255);

    //Start screen texts
    stroke(darkBlue);
    strokeWeight(3);
    fill(lightBlue);
    textSize(25);
    text('Start game', 350, 250);
    text('Click', 345, 300 + 30);
    text('or', 400, 300 + 60);
    text('Press SPACE to continue', 270, 300 + 90);

    // Draw the button
    stroke(darkBlue);
    strokeWeight(3);
    fill(frogColor);
    rect(410, 304, 75, 35, 5);

    //Start button
    stroke(darkBlue);
    strokeWeight(3);
    fill(lightBlue);
    text('HERE', 412, 300 + 30);

} 

function mousePressed() {

    if (gameState === 'start') {
        //Start screen button
        let buttonX = 410;
        let buttonY = 304;
        let buttonWidth = 75;
        let buttonHeight = 35;

        if (mouseX > buttonX && mouseX < buttonX + buttonWidth && mouseY > buttonY && mouseY < buttonY + buttonHeight) {
            gameState = 'game';
        }

    } else if (gameState === 'result') {
        //Result screen button
        let buttonX = 253;
        let buttonY = 391; 
        let buttonWidth = 150;
        let buttonHeight = 35;

        if (mouseX > buttonX && mouseX < buttonX + buttonWidth && mouseY > buttonY && mouseY < buttonY + buttonHeight) {
            gameState = 'start';
        }
    }
}


function gameScreen() {
    clear(); // clears the path left when the frog moves
    stroke(0);
    background(150, 220, 255); //Sky

    // Draw the lilypad at the fixed position
    drawLilyPad(300, lilyPadY);

    // Make the frog move downwards
    frogY += frogSpeed;

    // Stop the frog when it reaches the bottom limit
    if (frogY >= bottomLimit) {
        frogSpeed = 0; // Stop movement
    }

    // Draw the frog in its new position
    drawFrog(frogX, frogY);
}

// Draws the lilypad
function drawLilyPad(x, y) {
    fill(lilyColor);
    arc(x, y + 80, 400, 65, 30, PI + HALF_PI);
}

// Draws the frog
function drawFrog(frogX, frogY) {
    // Body
    fill(frogColor);
    strokeWeight(2);
    ellipse(frogX, frogY + 10, 150, 100);

    // Mouth
    strokeWeight(2);
    noFill();
    arc(frogX, frogY + 10, 70, 50, 0, PI);

    // Eyes
    strokeWeight(1);
    fill(30, 70, 30);
    ellipse(frogX - 35, frogY - 33, 43, 44);
    ellipse(frogX + 35, frogY - 33, 43, 44);
    fill(255);
    ellipse(frogX - 35, frogY - 30, 40, 40);
    ellipse(frogX + 35, frogY - 30, 40, 40);

    // Pupils
    strokeWeight(1);
    fill(0);
    ellipse(frogX - 35, frogY - 30, 20, 40);
    ellipse(frogX + 35, frogY - 30, 20, 40);

    // Right leg
    fill(frogColor);
    push();
    translate(frogX + 40, frogY + 40);
    rotate(1,7,4,3);
    ellipse(0, -10, 30, 100);
    pop();
    ellipse(frogX + 40, frogY + 60, 30, 10);

    // Left leg
    push();
    translate(frogX - 40, frogY + 40);
    rotate(2,7,4,3);
    ellipse(0, 10, 30, 100);
    pop();
    ellipse(frogX - 40, frogY + 60, 30, 10);

    // You win when the frog lands safely on the lilypad
    if (frogY >= bottomLimit) {
    gameState = 'result';
  }


}

function resultScreen() {
    clear();
    background(150, 220, 255);
    stroke(250);
    strokeWeight(3);
    fill(frogColor);
    textSize(25);
    text('Game over !', 260, 300);
    text('The frog landed safely', 210, 380);
    text('Press            to play again', 185, 415);

     // Draw the button
     stroke(darkBlue);
     strokeWeight(3);
     fill(150, 220, 255);
     rect(253, 391, 75, 30, 5);
 
     //Start button
     stroke(darkBlue);
     strokeWeight(3);
     fill(lightBlue);
     text('HERE', 255, 415);

} 



