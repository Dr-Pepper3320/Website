# Ivan Monster Hunt

A simple top-down prototype using the Ivan PNG frames as the playable character.

The large `assets/worldmap.jfif` is now the `mainworld` map, not Town. It has been split into smaller files in `assets/map-tiles/` so the game can draw smoothly without loading the full 10000x10000 map every frame.
Dev Mode uses `assets/worldmap-overview.jpg` for `mainworld` so the whole map appears at once while editing.

Fireworld uses `assets/maps/fire/fireworld.png`. The original JFIF can stay in the same folder as a source file.

Town uses `assets/maps/town/town.jfif`. Its building interiors are wired as separate worlds for the arena entrance, arena, blacksmith, Brick's Inn, inn rooms, and Matt Store.

If you replace `assets/worldmap.jfif`, run this from PowerShell to rebuild the tiles:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\tools\build-map-tiles.ps1
```

## Play

Open `index.html` in a browser.

- Create or choose a profile in the launcher. Each profile keeps separate Dev Mode placement data and a separate 6-Matt party save.
- Move with `WASD` or the arrow keys.
- Hold `Shift` to sprint.
- Press `Space` or click to play Ivan's whip animation.
- On phones, drag the left thumbstick to move, hold `RUN` to sprint, and tap `WHIP` to attack.
- Hit a Matt four times to catch it. The first three hits switch Mattdogs through crying 1, crying 2, and crying 3. On the fourth hit it enters the caught animation and follows Ivan.
- The HUD clock runs through day and night. Town NPC paths only activate at night; interior NPC paths can run any time.
- Sound starts after the first key press, click, or touch. Whips, hits, captures, and the map ambience are generated in the browser with Web Audio.

## Mattdogs

The game currently spawns 20 Mattdogs across Main World and Fire Matts in Fireworld. Wild enemies prefer spawn areas that overlap the world's path lines, then roam along and around those paths instead of always starting at the first path point. They can pause, leave the line for a bit, and rejoin nearby.

Caught Matts follow Ivan's recent movement trail, so they line up behind the direction he is actually traveling instead of orbiting around him. When Ivan stops, they rest on their current caught frame instead of constantly cycling.

Caught Matts are saved as Ivan's traveling party, follow through portals into every world, and are limited to 6 at a time.

## Dev Mode

Press `F1` to toggle Dev Mode. Press `Esc` to close it.

- Dev Mode shows the full map at once so you can place things globally.
- `Wall`: click points to build connected wall lines that block Ivan.
- `Spawn`: drag enemy spawn areas. Press `Respawn` to rebuild Mattdogs from the current world's spawn areas.
- `Path`: click points to create an enemy path. Wild Mattdogs use paths when they are not chasing or reacting to Ivan.
- `NPC`: choose Scott, Ty, Tom, or Brick from the NPC selector, then click to place that character in the current world.
- `NPC Path`: choose an NPC, then click route points for that character. NPCs pick route points randomly and pause to hang out at stops. Town NPC paths activate at night.
- `Node`: choose a target world, then click the map to place a travel node.
- `Erase`: click a wall, spawn area, node, or path point to remove it.
- `New Line`: starts a separate wall or path. `Enter` does the same, and `Backspace` removes the last point from the active wall/path.

Press `E` near a node to enter its world. The built-in worlds include `mainworld`, `town`, the town interiors, `fireworld`, `purplewaterworld`, `temple`, `tomb`, `treeworld`, and `home`.

Dev Mode data is saved in browser `localStorage` with `Save All`. Use `Export All` and `Import` to move all wall, spawn, path, and node placements between browsers or keep backups.

Fresh browsers can also load baked-in placement data from `assets/worlds/default-worlds.js`. Put an exported object in that file as `window.DEFAULT_WORLD_DATA = { ... };`. Saved `localStorage` data still takes priority, and the Dev Mode `Load Built-In` button can overwrite the browser save with the built-in layout when you want to reset to it.

## Adding More Monsters Later

Mattdog is the first working monster type on `mainworld`, and Firematt spawns in `fireworld`. Firematt uses the root `assets/matts/firematt/idle/idle.png` as the normal idle image, then randomly plays one of the `normal`, `hammer`, or `nose` idle animation folders every 10-15 seconds.

The remaining monster placeholders are in `game.js` inside the `MONSTERS` array. When the next monster PNGs are ready, set each monster's `image`, `x`, and `y` values.

Example:

```js
{ id: "monster-2", name: "Monster 2", image: "assets/monsters/monster2.png", x: 4200, y: 5100, caught: false }
```
