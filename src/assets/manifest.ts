import background1 from "./background/Blue_Nebula_05-1024x1024.png";
import background2 from "./background/Purple_Nebula_01-1024x1024.png";
import playerShip from "./ship/128x128.png";
import exhaustNormal from "./exhaust/normal/spritesheet.png";
import exhaustTurbo from "./exhaust/turbo/spritesheet.png";
import asteroid from "./meteors/Meteor_02.png";
import enemyShip from "./ship/enemy.png";

export const manifest = {
  bundles: [
    {
      name: "menu",
      assets: [
        { name: "background", srcs: background1 },
        {
          name: "font",
          srcs: "https://pixijs.com/assets/bitmap-font/desyrel.xml",
        },
      ],
    },
    {
      name: "level-1",
      assets: [
        { name: "background", srcs: background1 },
        { name: "playerShip", srcs: playerShip },
        { name: "exhaustNormal", srcs: exhaustNormal },
        { name: "exhaustTurbo", srcs: exhaustTurbo },
        {
          name: "font",
          srcs: "https://pixijs.com/assets/bitmap-font/desyrel.xml",
        },
        { name: "asteroid", srcs: asteroid },
      ],
    },
    {
      name: "level-2",
      assets: [
        { name: "background2", srcs: background2 },
        { name: "enemyShip", srcs: enemyShip },
      ],
    },
  ],
};
