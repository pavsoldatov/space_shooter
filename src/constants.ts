export const constants = {
  resolution: {
    APP_WIDTH: 1280,
    APP_HEIGHT: 720,
  },
  paddings: {
    top: 10,
    left: 10,    
  },
  player: {
    PLAYER_SPEED: 9,
  },
  background: {
    BACKGROUND_SPEED: 0.5,
  },
  keyboardKeys: {
    ARROW_LEFT: "ARROWLEFT",
    ARROW_RIGHT: "ARROWRIGHT",
  },
  animation: {
    exhaust: {
      EXHAUST_SPEED: 0.14,
    },
  },
  timers: {
    GAME_TIME: 60,
    SHOOTING_DELAY: 0.75 // seconds
  },
  fonts: {
    FONT_NAME: "Desyrel",
    FONT_SIZE: 48,
  },
  winCondition: {
    NUM_HITS: 8,
  }
} as const;
