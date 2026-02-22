import { k } from "./kaboomCtx";

k.loadSprite("Generic_Home_1_Layer_1", "Generic_Home_1_Layer_1.png", {
  sliceX: 14,
  sliceY: 13,
});

k.loadSprite("Generic_Home_1_Layer_2", "Generic_Home_1_Layer_2_.png", {
  sliceX: 14,
  sliceY: 13,
});

k.loadSprite("samuel", "Samuel_16x16.png", {
  sliceX: 48,
  sliceY: 18,
  anims: {
    // Idle animations (short loops)
    "idle-down": { from: 0, to: 5, loop: true, speed: 3 },
    "idle-up": { from: 6, to: 11, loop: true, speed: 3 },
    "idle-side": { from: 12, to: 17, loop: true, speed: 3 },

    // Walk animations
    "walk-down": { from: 48, to: 53, loop: true, speed: 8 },
    "walk-up": { from: 96, to: 101, loop: true, speed: 8 },
    "walk-side": { from: 144, to: 149, loop: true, speed: 8 },
  },
});
