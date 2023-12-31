# CS50 Final Project -- 2D Spaceshooter game
#### Video Demo:  <https://www.youtube.com/watch?v=FpL848wBABQ>
#### Description:
Spaceshooter is a 2D game written in Typescript with Pixi.js. The objective of the game is to shoot down things. At Level 1, your objective, as a player, is to shoot down asteroids. At Level 2, the objective is to shoot down the “spawn”.

This game has been an excellent opportunity for me to improve on Objected-Oriented Programming and some other patterns such as:

1.	Factory: asteroids are spawned and animation is created using a Factory pattern
2.	Singleton which took the form of both a class and a mixin/decorator. A Singleton class was used for the Asset Manager to make all the assets available from one place while the mixin was used to share components across different levels of the game (e.g. some UI elements, the player's ship)
3.	Object Pooling: asteroids and projectiles are reused when killed or disappear, ie their position is reset to a random horizontal location.
4.	Collision detection: implemented Axis-aligned Bounding Box collision for projectiles. The projectiles can collide with the asteroids, the “spawn”, the player, and other projectiles (such as the one shot by the spawn). It was not optimized to the "T", but the result was sufficient for my use case.

#### Challenges:
The key challenge was applying the OOP pattern which I am not totally confident with. Also, it was my first encounter with the Pixi.js library, albeit not the first one with the Typescript. Another limiting factor was constantly choosing between Composition and Inheritance.

#### Misc:
How to run locally:
1. Clone the repo
2. Run `pnpm i` to install dependencies
3. Run `pnpm dev` to open the game at `http://localhost:5173/`

The game is won when:
- You have destroyed all asteroids (8 hits)

The game is lost when:
- 60 seconds have lapsed;
- You are out of ammo and the 60 seconds of game time are still going;

Level 1:
![Preview image of how the game looks](https://github.com/pavsoldatov/space_shooter/assets/80415302/7106afdd-8aa7-455f-b13b-d54c6984bb71)

Level 2:
![image](https://github.com/pavsoldatov/space_shooter/assets/80415302/2c237e14-7a17-457a-8cee-1e6ed964334b)

