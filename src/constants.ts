export const constants = {
  resolution: {
    APP_WIDTH: 1280,
    APP_HEIGHT: 720,
  },
  player: {
    PLAYER_SPEED: 7,
  },
  background: {
    BACKGROUND_SPEED: 0.5,
  },
  keyboardKeys: {
    ARROW_LEFT: "ARROWLEFT",
    ARROW_RIGHT: "ARROWRIGHT",
    // SPACE: "",
  },
  animation: {
    exhaust: {
      EXHAUST_SPEED: 0.14,
    },
  },
  timers: {
    GAME_TIME: 60,
  },
  fonts: {
    FONT_NAME: "Desyrel",
    FONT_SIZE: 48,
  }
} as const;
