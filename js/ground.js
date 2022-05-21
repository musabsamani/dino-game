import {
  getCustomProperty,
  setCustomProperty,
  incrementCustomProperty,
} from "./updateCustomProperty.js";
const SPEED = 0.05,
  ground = document.querySelectorAll("[data-ground]");
export function setupGround() {
  setCustomProperty(ground[0], "--left", 0);
  setCustomProperty(ground[1], "--left", 300);
}
export function updateGround(delta, speedScale) {
  ground.forEach((ground) => {
    incrementCustomProperty(ground, "--left", delta * SPEED * speedScale * -1);
    if (getCustomProperty(ground, "--left") <= -300) {
      incrementCustomProperty(ground, "--left", 600);
    }
  });
}
