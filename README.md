# Click the Target

A simple browser game where you click a moving target as many times as you can before the timer runs out.

## How to Play

1. Open `index.html` in a browser.
2. Click **Start Game**.
3. Click the red target as many times as you can in 20 seconds.
4. Your final score is shown when time runs out.

## File Structure

| File | Purpose |
|------|---------|
| `index.html` | The page structure — score display, timer, start button, and target element |
| `style.css` | Visual styling for the page and target |
| `script.js` | All game logic |

## Game Logic (script.js)

### Variables

| Variable | Purpose |
|----------|---------|
| `score` | Tracks how many times the player has clicked the target |
| `timeLeft` | Counts down from 20 to 0 |
| `gameTimer` | Holds the reference to the 1-second countdown interval |
| `moveTimer` | Holds the reference to the interval that moves the target |

### Functions

**`moveTarget()`**
Picks a random `x` and `y` position on the screen and moves the target there using CSS `left` and `top`. It subtracts 50 from the available width/height so the target (which is 50×50 px) always stays fully visible.

**`tick()`**
Runs every 1000ms (1 second). Decrements `timeLeft` by 1 and updates the display. When `timeLeft` reaches 0, it stops both timers with `clearInterval()`, hides the target, and shows the final score.

**`startGame()`**
Resets `score` and `timeLeft` to their starting values, updates the displays, shows the target, and starts two repeating timers:
- `gameTimer` — calls `tick()` every 1 second to count down.
- `moveTimer` — calls `moveTarget()` every 800ms to keep the target moving.

### Event Listeners

- **Target click** — increments `score`, updates the score display, and immediately moves the target to a new position.
- **Start button click** — calls `startGame()`.

## Suggested Improvements

These are features you could add to extend the game. Each one includes a hint about where to start.

---

### 1. Improve the styling

The game works but looks plain. Try making it more visually appealing.

**Hints:**

- Open `style.css` and experiment with `background-color` on the `body` to give the page a theme.
- Use a Google Font (add a `<link>` tag in `index.html`) to replace the default browser font.
- Style the score and timer with larger text and a contrasting colour so they're easy to read at a glance.

---

### 2. Make the move frequency a variable

Right now `800` is written directly into the `setInterval` call in `startGame()`. If you ever want to change it, you have to hunt it down in the code. Variables make this easier to manage.

**Hints:**

- At the top of `script.js`, declare a new variable: `let moveInterval = 800;`
- Replace the hardcoded `800` in `setInterval(moveTarget, 800)` with `moveInterval`.
- Now you only need to change one place to affect the speed.

---

### 3. Add a difficulty selector

Let the player choose how fast the target moves before the game starts.

**Hints:**

- Add a `<select>` dropdown to `index.html` with three `<option>` elements (Easy, Medium, Hard).
- In `startGame()`, read the selected value with `document.getElementById("difficulty").value`.
- Use an `if/else` or `switch` statement to set `moveInterval` based on the selection — for example, Easy = 1200ms, Medium = 800ms, Hard = 500ms.

---

### 4. Make clicks worth more points on harder difficulties

Higher risk (faster target) should mean higher reward.

**Hints:**

- Add a variable called `pointsPerClick` at the top of `script.js`.
- Set its value inside `startGame()` at the same time you set `moveInterval` — for example, Easy = 1, Medium = 2, Hard = 3.
- In the target's click event listener, change `score++` to `score += pointsPerClick`.

---

### 5. Disable the Start button during a game

Clicking Start while a game is already running starts extra timers that stack on top of each other, causing the countdown to speed up and the target to move erratically.

**Hints:**

- At the start of `startGame()`, set `startBtn.disabled = true;` — this greys out the button and stops it from being clicked.
- When the game ends (inside the `if (timeLeft <= 0)` block in `tick()`), re-enable it with `startBtn.disabled = false;`.
- You can style the disabled state in CSS using the `button:disabled` selector so it's obvious to the player that the button is inactive.

---

### Timer Flow

```
[Start Game clicked]
        │
        ├─ moveTarget() called immediately
        │
        ├─ gameTimer starts  →  tick() every 1s  →  timeLeft reaches 0  →  Game Over
        │
        └─ moveTimer starts  →  moveTarget() every 800ms (while game is running)
```
