# Ivan Monster Hunt

A simple top-down prototype using the Ivan PNG frames as the playable character.

The large `assets/worldmap.jfif` has been split into smaller files in `assets/map-tiles/` so the game can draw smoothly without loading the full 10000x10000 map every frame.

If you replace `assets/worldmap.jfif`, run this from PowerShell to rebuild the tiles:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\tools\build-map-tiles.ps1
```

## Play

Open `index.html` in a browser.

- Move with `WASD` or the arrow keys.
- Hold `Shift` to sprint.
- Press `Space` or click to play Ivan's whip animation.
- On phones, drag the left thumbstick to move, hold `RUN` to sprint, and tap `WHIP` to attack.
- Hit a Mattdog four times to catch it. The first three hits switch it through crying 1, crying 2, and crying 3. On the fourth hit it enters the caught animation and follows Ivan.

## Mattdogs

The game currently spawns 20 Mattdogs across the map. Wild Mattdogs wander when far away, pause when Ivan gets close, and run if he gets too close. They are slower than Ivan so you can catch them.

## Adding More Monsters Later

Mattdog is now the first working monster type. The remaining monster placeholders are in `game.js` inside the `MONSTERS` array. When the next monster PNGs are ready, set each monster's `image`, `x`, and `y` values.

Example:

```js
{ id: "monster-2", name: "Monster 2", image: "assets/monsters/monster2.png", x: 4200, y: 5100, caught: false }
```
