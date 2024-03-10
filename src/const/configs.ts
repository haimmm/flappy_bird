export const sizes = {
  width: 800,
  height: 600,
};

export const scenes = {
  bootScene: "scene-boot",
  menuScene: "scene-menu",
  scoresScene: "scene-scores",
  gameScene: "scene-game",
  gameoverScene: "scene-gameover",
} as const;

export const sprites = {
  bird: {
    position: [sizes.width * 0.1, sizes.height * 0.5],
    origin: [0, 0],
    velocity: [0, 250],
    gravity: [0, 600],
    image: {
      width: 16,
      height: 16,
    },
  },

  pipe: {
    position: [sizes.width * 0.9, sizes.height * 0.9], //y generated in class
    origin: [0, 0],
    velocity: [200, 0],
    gravity: [0],
    image: {
      width: 128,
      height: 1000,
      grid: {
        columns: 4,
        rows: 2,
      },
    },
  },
};
