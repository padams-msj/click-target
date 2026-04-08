// Grab the elements from the HTML page
const target = document.getElementById("target");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("startBtn");

// Keep track of the score, time, and timers
let score = 0;
let timeLeft = 20;
let gameTimer;
let moveTimer;

// Move the target to a random spot on the screen
// We subtract 50 because the target is 50x50 pixels, so this keeps it fully visible
function moveTarget() {
	const x = Math.random() * (window.innerWidth - 50);
	const y = Math.random() * (window.innerHeight - 50);

	target.style.left = x + "px";
	target.style.top = y + "px";
}

// Called every second to count down the timer
function tick() {
	timeLeft--;
	timeDisplay.textContent = timeLeft;

	// If time runs out, end the game
	// clearInterval() stops the specified timer from running
	if (timeLeft <= 0) {
		clearInterval(gameTimer);
		clearInterval(moveTimer);
		target.style.display = "none";
		alert("Game Over! Score: " + score);
	}
}

// Reset everything and kick off the game
function startGame() {
	score = 0;
	timeLeft = 20;

	scoreDisplay.textContent = score;
	timeDisplay.textContent = timeLeft;

	target.style.display = "block";
	moveTarget();

	//every 1000 milliseconds (1 second), call the tick function to update the timer
	gameTimer = setInterval(tick, 1000);

	//every 800 milliseconds, move the target to a new random location
	moveTimer = setInterval(moveTarget, 800);
}

// When the player clicks the target, add a point and move it
target.addEventListener("click", function () {
	score++;
	scoreDisplay.textContent = score;
	moveTarget();
});

// When the Start button is clicked, begin the game
startBtn.addEventListener("click", startGame);
