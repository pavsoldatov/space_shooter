import background from "./background/Blue_Nebula_05-1024x1024.png";
import ship from "./ship/128x128.png";
import exhaustNormal from "./exhaust/normal/spritesheet.png";
import exhaustTurbo from "./exhaust/turbo/spritesheet.png";
import asteroid from "./meteors/Meteor_02.png";

const manifest = {
  bundles: [
    {
      name: "level-1",
      assets: [
        { name: "background", srcs: background },
        { name: "ship", srcs: ship },
        { name: "exhaustNormal", srcs: exhaustNormal },
        { name: "exhaustTurbo", srcs: exhaustTurbo },
        {
          name: "font",
          srcs: "https://pixijs.com/assets/bitmap-font/desyrel.xml",
        },
        { name: "asteroid", srcs: asteroid },
      ],
    },
  ],
};

export default manifest;
