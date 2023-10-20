import spritesheetSrc from "./spritesheet.png";

export const atlas = {
  frames: {
    "1.png": {
      frame: {
        x: 0,
        y: 0,
        w: 32,
        h: 32,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 32,
        h: 32,
      },
      sourceSize: {
        w: 32,
        h: 32,
      },
      pivot: {
        x: 0.5,
        y: 0.5,
      },
    },
    "2.png": {
      frame: {
        x: 32,
        y: 0,
        w: 32,
        h: 32,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 32,
        h: 32,
      },
      sourceSize: {
        w: 32,
        h: 32,
      },
      pivot: {
        x: 0.5,
        y: 0.5,
      },
    },
    "3.png": {
      frame: {
        x: 0,
        y: 32,
        w: 32,
        h: 32,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 32,
        h: 32,
      },
      sourceSize: {
        w: 32,
        h: 32,
      },
      pivot: {
        x: 0.5,
        y: 0.5,
      },
    },
    "4.png": {
      frame: {
        x: 32,
        y: 32,
        w: 32,
        h: 32,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 32,
        h: 32,
      },
      sourceSize: {
        w: 32,
        h: 32,
      },
      pivot: {
        x: 0.5,
        y: 0.5,
      },
    },
  },
  animations: {
    sequence: ["1.png", "2.png", "3.png", "4.png"],
  },
  meta: {
    app: "http://free-tex-packer.com",
    version: "0.6.7",
    image: spritesheetSrc,
    format: "RGBA8888",
    size: {
      w: 64,
      h: 64,
    },
    scale: "2",
  },
};
