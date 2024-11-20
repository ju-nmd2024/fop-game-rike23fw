// Variables
let frogX = 660; // Initial position on X
let frogY = 0; // Initial position on Y
let frogColor = color(30, 130, 30);
let lilyColor = color(30, 80, 30);
let darkBlue = color(10, 150, 250);
let lightBlue = color(120, 190, 255);
const bottomLimit = 510; // Limit where the frog stops
const lilyPadY = 480; // Fixed position for the lilypad
let lilyPadX = 300;
 
// game logic variables
let acceleration = 0.2;
let velocityY = 0.2; // Frog's speed
let gameState = 'start';

function setup() {
    createCanvas(700, 600);
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

    frogX = 660;
    frogY = 0;
    velocityY = 0.2;

    background(150, 220, 255);

    //Start screen texts
    stroke(darkBlue);
    strokeWeight(3);
    fill(lightBlue);
    textSize(25);
    text('Start game', 350, 250);
    text('Click', 345, 330);

    //Draw the button
    stroke(darkBlue);
    strokeWeight(3);
    fill(150, 220, 255);
    rect(410, 304, 75, 35, 5); 

    //Start button
    stroke(250);
    strokeWeight(3);
    fill(lightBlue);
    text('HERE', 412, 330);

}
 
function gameScreen() {
    clear(); // clears the path left when the frog moves
    stroke(0);
    background(150, 220, 255); //Sky

    // Draw the lilypad in its position
    drawLilyPad(300, lilyPadY);

    // Gravity logic
    //Reference from Flappy Demo 
    frogY = frogY + velocityY; 
    velocityY = velocityY + acceleration;
 

    //References
    //https://p5js.org/reference/p5/keyIsDown/
    //Constrols to make the frog move
    if (keyIsDown(UP_ARROW)) {
         velocityY -= 0.3; //reduces velocity by 0.3 making the landing easier
    }

    if (keyIsDown(LEFT_ARROW)) {
         frogX -= 2; //Moves to the left
    }
    if (keyIsDown(RIGHT_ARROW)) { 
         frogX += 2; //Moves to the right
    }

    //Draw the frog in its position
    drawFrog(frogX, frogY);

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



//Draws the lilypad
function drawLilyPad(x, y) {

    //Lake
    stroke(darkBlue);
    strokeWeight(2);
    fill(lightBlue);
    rect(0, 390, 800, 300);

    //Lilypad
    stroke(0);
    fill(lilyColor);
    arc(x, y + 75, 300, 65, 30, PI + HALF_PI);
}

//Draws the frog
function drawFrog(frogX, frogY) {
    //Body
    stroke(0);
    fill(frogColor);
    strokeWeight(2);
    ellipse(frogX, frogY + 10, 150, 100);

    //Mouth
    strokeWeight(2);
    noFill();
    arc(frogX, frogY + 10, 70, 50, 0, PI);

    //Eyes
    strokeWeight(1);
    fill(30, 70, 30);
    ellipse(frogX - 35, frogY - 33, 43, 44);
    ellipse(frogX + 35, frogY - 33, 43, 44);
    fill(255);
    ellipse(frogX - 35, frogY - 30, 40, 40);
    ellipse(frogX + 35, frogY - 30, 40, 40);

    //Pupils
    strokeWeight(1);
    fill(0);
    ellipse(frogX - 35, frogY - 30, 20, 40);
    ellipse(frogX + 35, frogY - 30, 20, 40);

    //Right leg
    fill(frogColor);
    push();
    translate(frogX + 40, frogY + 40);
    rotate(1,7,4,3);
    ellipse(0, -10, 30, 100);
    pop();
    ellipse(frogX + 40, frogY + 60, 30, 10);

    //Left leg
    push();
    translate(frogX - 40, frogY + 40);
    rotate(2,7,4,3);
    ellipse(0, 10, 30, 100);
    pop();
    ellipse(frogX - 40, frogY + 60, 30, 10);

    //You win when the frog lands safely on the lilypad
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
    if (frogX > lilyPadX - 150 && frogX < lilyPadX + 150) {
        text('You Won !', 260, 300);
        text('The frog landed safely on the lilypad', 110, 380);
        text('Press            to play again', 185, 415);
    } else {
        text('You Lost!', 280, 300);
        text('The frog fell into the lake', 200, 380);
        text('Press            to play again', 185, 415);
    }


    //Draw the button
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