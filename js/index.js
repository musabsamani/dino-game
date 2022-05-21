import { updateGround, setupGround } from "./ground.js";
import { updateDino, setupDino, getDinoRect, setDinoLose } from "./dino.js";
import { updateCactus, setupCactus, getCactusRects } from "./cactus.js";
const SPEED_SCALE_INCREASE = 0.00001,
  WORLD_WIDTH = 100,
  WORLD_HEIGHT = 30,
  worldElement = document.querySelector("[data-world]"),
  scoreElement = document.querySelector("[data-score]"),
  startScreenElement = document.querySelector("[data-start-screen]");
setPixelToWorldScale();
window.addEventListener("resize", setPixelToWorldScale);
window.addEventListener("click", handleStart, { once: true });
let lastTime, speedScale, score;
function update(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }
  const delta = time - lastTime;
  updateGround(delta, speedScale);
  updateDino(delta, speedScale);
  updateCactus(delta, speedScale);
  updateSpeedScale(delta);
  updateScore(delta);
  if (checkLose()) {
    return handleLose();
  }
  lastTime = time;
  window.requestAnimationFrame(update);
}
function checkLose() {
  const dinoRect = getDinoRect();
  return getCactusRects().some((rect) => isCollision(rect, dinoRect));
}
function isCollision(rect1, rect2) {
  return (
    rect1.left + 5 < rect2.right &&
    rect1.top + 15 < rect2.bottom &&
    rect1.right - 5 > rect2.left &&
    rect1.bottom > rect2.top
  );
}
function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE;
}
function updateScore(delta) {
  score += delta * 0.01;
  scoreElement.textContent = Math.floor(score);
}
function handleStart() {
  lastTime = null;
  score = 0;
  setupGround();
  setupDino();
  setupCactus();
  speedScale = 1;
  startScreenElement.classList.add("hide");
  window.requestAnimationFrame(update);
}
function handleLose() {
  setDinoLose();
  setTimeout(() => {
    window.addEventListener("click", handleStart, { once: true });
    startScreenElement.innerHTML = "you lose !!!<br>Tap any where to start";
    startScreenElement.classList.remove("hide");
  }, 100);
}
function setPixelToWorldScale() {
  let worldToPixelScale;
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH;
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
  }
  worldElement.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
  worldElement.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}
