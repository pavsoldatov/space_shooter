import spritesheetSrc from "./spritesheet.png";

export const atlas = {
  frames: {
    "1.png": {
      frame: {
        x: 0,
        y: 0,
        w: 64,
        h: 64,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 64,
        h: 64,
      },
      sourceSize: {
        w: 64,
        h: 64,
      },
      pivot: {
        x: 0.5,
        y: 0.5,
      },
    },
    "2.png": {
      frame: {
        x: 64,
        y: 0,
        w: 64,
        h: 64,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 64,
        h: 64,
      },
      sourceSize: {
        w: 64,
        h: 64,
      },
      pivot: {
        x: 0.5,
        y: 0.5,
      },
    },
    "3.png": {
      frame: {
        x: 0,
        y: 64,
        w: 64,
        h: 64,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 64,
        h: 64,
      },
      sourceSize: {
        w: 64,
        h: 64,
      },
      pivot: {
        x: 0.5,
        y: 0.5,
      },
    },
    "4.png": {
      frame: {
        x: 64,
        y: 64,
        w: 64,
        h: 64,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 64,
        h: 64,
      },
      sourceSize: {
        w: 64,
        h: 64,
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
      w: 128,
      h: 128,
    },
    scale: "1.75",
  },
};
