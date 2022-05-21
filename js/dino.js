import {
  getCustomProperty,
  setCustomProperty,
  incrementCustomProperty,
} from "./updateCustomProperty.js";
const JUMP_SPEED = 0.45,
  GRAVITY = 0.002,
  DINO_FRAME_COUNT = 2,
  FRAME_TIME = 100,
  dinoElement = document.querySelector("[data-dino]");
let isJumping, currentFrameTime, dinoFrame, yVelocity;
export function setupDino() {
  isJumping = false;
  dinoFrame = 0;
  currentFrameTime = 0;
  yVelocity = 0;
  setCustomProperty(dinoElement, "--bottom", 0);
  window.removeEventListener("keydown", onJump);
  window.removeEventListener("click", onJump2);
  window.addEventListener("keydown", onJump);
  window.addEventListener("click", onJump2);
}
export function updateDino(delta, speedScale) {
  handleRun(delta, speedScale);
  handleJump(delta);
}
export function getDinoRect() {
  return dinoElement.getBoundingClientRect();
}
export function setDinoLose() {
  dinoElement.src = "img/dino-lose.png";
}
function handleRun(delta, speedScale) {
  if (isJumping) {
    dinoElement.src = `img/dino-stationary.png`;
    return;
  }
  if (currentFrameTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT;
    dinoElement.src = `img/dino-run-${dinoFrame}.png`;
    currentFrameTime -= FRAME_TIME;
  }
  currentFrameTime += delta * speedScale;
}
function handleJump(delta) {
  if (!isJumping) {
    return;
  }
  incrementCustomProperty(dinoElement, "--bottom", yVelocity * delta);
  if (getCustomProperty(dinoElement, "--bottom") <= 0) {
    setCustomProperty(dinoElement, "--bottom", 0);
    isJumping = false;
  }
  yVelocity -= GRAVITY * delta;
}
function onJump(e) {
  if (e.code !== "Space" || isJumping) {
    return;
  }
  yVelocity = JUMP_SPEED;
  isJumping = true;
}
function onJump2() {
  if (!isJumping) {
    yVelocity = JUMP_SPEED;
    isJumping = true;
  }
}
