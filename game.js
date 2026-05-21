const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d", { alpha: false });
const loading = document.querySelector("#loading");
const caughtCounter = document.querySelector("#caught-counter");
const monsterSlots = [...document.querySelectorAll(".slot")];
const touchJoystick = document.querySelector("#touch-joystick");
const touchKnob = document.querySelector("#touch-knob");
const touchWhip = document.querySelector("#touch-whip");
const touchSprint = document.querySelector("#touch-sprint");

const MAP = {
  width: 10000,
  height: 10000,
  tileSize: 512,
  columns: 20,
  rows: 20,
  maxCachedTiles: 90,
  tilePath: (col, row) => `assets/map-tiles/tile_${col}_${row}.jpg`,
};

const PLAYER = {
  width: 129,
  height: 174,
  footOffset: 27,
  speed: 680,
  sprintSpeed: 1080,
  attackRange: 235,
};

const DOGMATT = {
  count: 20,
  width: 112,
  height: 112,
  footOffset: 14,
  wanderSpeed: 130,
  fleeSpeed: 560,
  followSpeed: 820,
  noticeRadius: 430,
  fleeRadius: 285,
  followStopDistance: 36,
};

const ASSETS = {
  ivan: {
    idle: ["assets/ivan/idle/1.png"],
    walking: [
      "assets/ivan/walking/1.png",
      "assets/ivan/walking/2.png",
      "assets/ivan/walking/3.png",
    ],
    whipping: [
      "assets/ivan/whipping/1.png",
      "assets/ivan/whipping/2.png",
      "assets/ivan/whipping/3.png",
      "assets/ivan/whipping/4.png",
    ],
  },
  dogmatt: {
    idle: ["assets/matts/dogmatt/idle/1.png"],
    walking: ["assets/matts/dogmatt/walking/1.png"],
    crying1: ["assets/matts/dogmatt/crying/1.png"],
    crying2: ["assets/matts/dogmatt/crying/2.png"],
    crying3: ["assets/matts/dogmatt/crying/3.png"],
    caught: [
      "assets/matts/dogmatt/caught/1.png",
      "assets/matts/dogmatt/caught/2.png",
    ],
  },
};

// Drop future monster image paths/positions here when the other monster PNGs are ready.
const MONSTERS = [
  { id: "monster-2", name: "Monster 2", image: "", x: 0, y: 0, caught: false },
  { id: "monster-3", name: "Monster 3", image: "", x: 0, y: 0, caught: false },
  { id: "monster-4", name: "Monster 4", image: "", x: 0, y: 0, caught: false },
  { id: "monster-5", name: "Monster 5", image: "", x: 0, y: 0, caught: false },
  { id: "monster-6", name: "Monster 6", image: "", x: 0, y: 0, caught: false },
];

const keys = new Set();
const tileCache = new Map();
const touchInput = {
  moveX: 0,
  moveY: 0,
  sprint: false,
  joystickPointerId: null,
  joystickCenterX: 0,
  joystickCenterY: 0,
  joystickMaxDistance: 50,
};

const state = {
  ready: false,
  lastTime: 0,
  lastPreloadKey: "",
  caughtDogmatts: 0,
  camera: { x: 0, y: 0 },
  player: {
    x: MAP.width / 2,
    y: MAP.height / 2,
    width: PLAYER.width,
    height: PLAYER.height,
    speed: PLAYER.speed,
    sprintSpeed: PLAYER.sprintSpeed,
    direction: "down",
    action: "idle",
    frameTimer: 0,
    frameIndex: 0,
    attackTimer: 0,
  },
  dogmatts: [],
};

const images = {
  ivan: {
    idle: [],
    walking: [],
    whipping: [],
  },
  dogmatt: {
    idle: [],
    walking: [],
    crying1: [],
    crying2: [],
    crying3: [],
    caught: [],
  },
};

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Could not load ${src}`));
    img.src = src;
  });
}

function createScaledSprite(img, width, height) {
  const sprite = document.createElement("canvas");
  sprite.width = width;
  sprite.height = height;

  const spriteCtx = sprite.getContext("2d");
  spriteCtx.imageSmoothingEnabled = true;
  spriteCtx.imageSmoothingQuality = "high";
  spriteCtx.drawImage(img, 0, 0, sprite.width, sprite.height);

  return sprite;
}

async function loadAnimationSet(assetSet, width, height) {
  const entries = await Promise.all(
    Object.entries(assetSet).map(async ([action, paths]) => {
      const frames = await Promise.all(paths.map(loadImage));
      return [action, frames.map((frame) => createScaledSprite(frame, width, height))];
    }),
  );

  return Object.fromEntries(entries);
}

async function loadAssets() {
  const [ivanFrames, dogmattFrames] = await Promise.all([
    loadAnimationSet(ASSETS.ivan, PLAYER.width, PLAYER.height),
    loadAnimationSet(ASSETS.dogmatt, DOGMATT.width, DOGMATT.height),
  ]);

  Object.assign(images.ivan, ivanFrames);
  Object.assign(images.dogmatt, dogmattFrames);
}

function resizeCanvas() {
  const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 1.5));
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "medium";
  syncCamera();
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function distanceBetween(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function setAction(actor, action) {
  if (actor.action === action) {
    return;
  }

  actor.action = action;
  actor.frameIndex = 0;
  actor.frameTimer = 0;
}

function advanceAnimation(actor, frameCount, frameDuration, dt) {
  actor.frameTimer += dt;

  if (actor.frameTimer >= frameDuration) {
    actor.frameTimer = 0;
    actor.frameIndex = (actor.frameIndex + 1) % frameCount;
  }
}

function seededRandom(seed) {
  let value = seed % 2147483647;

  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function syncCamera() {
  const viewWidth = canvas.clientWidth;
  const viewHeight = canvas.clientHeight;
  const maxX = Math.max(0, MAP.width - viewWidth);
  const maxY = Math.max(0, MAP.height - viewHeight);
  state.camera.x = clamp(state.player.x - viewWidth / 2, 0, maxX);
  state.camera.y = clamp(state.player.y - viewHeight / 2, 0, maxY);
}

function spawnDogmatts() {
  const random = seededRandom(4281);
  const dogmatts = [];
  const nearbyDogmatts = 6;

  for (let index = 0; index < DOGMATT.count; index += 1) {
    let x = 600 + random() * (MAP.width - 1200);
    let y = 600 + random() * (MAP.height - 1200);

    if (index < nearbyDogmatts) {
      const angle = (index / nearbyDogmatts) * Math.PI * 2;
      const radius = index % 2 === 0 ? 320 : 500;
      x = state.player.x + Math.cos(angle) * radius;
      y = state.player.y + Math.sin(angle) * radius;
    } else if (Math.hypot(x - state.player.x, y - state.player.y) < 850) {
      x = clamp(x + 1200, 600, MAP.width - 600);
      y = clamp(y - 900, 600, MAP.height - 600);
    }

    dogmatts.push({
      id: `dogmatt-${index + 1}`,
      x,
      y,
      width: DOGMATT.width,
      height: DOGMATT.height,
      action: "walking",
      frameTimer: random() * 0.18,
      frameIndex: 0,
      direction: random() > 0.5 ? "right" : "left",
      wanderAngle: random() * Math.PI * 2,
      wanderTimer: 0.8 + random() * 2.4,
      hitCount: 0,
      hitCooldown: 0,
      caught: false,
    });
  }

  state.dogmatts = dogmatts;
}

function tileKey(col, row) {
  return `${col},${row}`;
}

function loadTile(col, row) {
  const key = tileKey(col, row);
  const cached = tileCache.get(key);

  if (cached) {
    cached.lastUsed = performance.now();
    return cached;
  }

  const tile = {
    col,
    row,
    image: new Image(),
    loaded: false,
    failed: false,
    lastUsed: performance.now(),
    promise: null,
  };

  tile.image.decoding = "async";
  tile.promise = new Promise((resolve) => {
    tile.image.onload = () => {
      tile.loaded = true;
      resolve(tile);
    };
    tile.image.onerror = () => {
      tile.failed = true;
      resolve(tile);
    };
  });
  tile.image.src = MAP.tilePath(col, row);

  tileCache.set(key, tile);
  pruneTileCache();
  return tile;
}

function getTileRange(buffer = 0) {
  const left = clamp(
    Math.floor(state.camera.x / MAP.tileSize) - buffer,
    0,
    MAP.columns - 1,
  );
  const right = clamp(
    Math.floor((state.camera.x + canvas.clientWidth) / MAP.tileSize) + buffer,
    0,
    MAP.columns - 1,
  );
  const top = clamp(
    Math.floor(state.camera.y / MAP.tileSize) - buffer,
    0,
    MAP.rows - 1,
  );
  const bottom = clamp(
    Math.floor((state.camera.y + canvas.clientHeight) / MAP.tileSize) + buffer,
    0,
    MAP.rows - 1,
  );

  return { left, right, top, bottom };
}

function preloadNearbyTiles(buffer = 1) {
  const range = getTileRange(buffer);
  return preloadTileRange(range);
}

function preloadTileRange(range) {
  const promises = [];

  for (let row = range.top; row <= range.bottom; row += 1) {
    for (let col = range.left; col <= range.right; col += 1) {
      promises.push(loadTile(col, row).promise);
    }
  }

  return promises;
}

function preloadNearbyTilesIfNeeded(buffer = 1) {
  const range = getTileRange(buffer);
  const key = `${range.left},${range.right},${range.top},${range.bottom}`;

  if (key === state.lastPreloadKey) {
    return [];
  }

  state.lastPreloadKey = key;
  return preloadTileRange(range);
}

function pruneTileCache() {
  if (tileCache.size <= MAP.maxCachedTiles) {
    return;
  }

  const overflow = tileCache.size - MAP.maxCachedTiles;
  const oldest = [...tileCache.entries()]
    .sort((a, b) => a[1].lastUsed - b[1].lastUsed)
    .slice(0, overflow);

  for (const [key, tile] of oldest) {
    tile.image.onload = null;
    tile.image.onerror = null;
    tile.image.src = "";
    tileCache.delete(key);
  }
}

function updatePlayer(dt) {
  const player = state.player;
  const keyboardX =
    (keys.has("arrowright") || keys.has("d") ? 1 : 0) -
    (keys.has("arrowleft") || keys.has("a") ? 1 : 0);
  const keyboardY =
    (keys.has("arrowdown") || keys.has("s") ? 1 : 0) -
    (keys.has("arrowup") || keys.has("w") ? 1 : 0);
  const inputX = clamp(keyboardX + touchInput.moveX, -1, 1);
  const inputY = clamp(keyboardY + touchInput.moveY, -1, 1);

  const distance = Math.hypot(inputX, inputY) || 1;
  const moveX = inputX / distance;
  const moveY = inputY / distance;
  const moving = inputX !== 0 || inputY !== 0;

  if (moving) {
    const speed = keys.has("shift") || touchInput.sprint ? player.sprintSpeed : player.speed;
    player.x = clamp(player.x + moveX * speed * dt, 0, MAP.width);
    player.y = clamp(player.y + moveY * speed * dt, 0, MAP.height);

    if (Math.abs(moveX) > Math.abs(moveY)) {
      player.direction = moveX > 0 ? "right" : "left";
    } else {
      player.direction = moveY > 0 ? "down" : "up";
    }
  }

  if (player.attackTimer > 0) {
    player.attackTimer = Math.max(0, player.attackTimer - dt);
    setAction(player, "whipping");
  } else {
    setAction(player, moving ? "walking" : "idle");
  }

  if (!moving && player.action === "idle") {
    player.frameIndex = 0;
  }

  const frameDuration = player.action === "whipping" ? 0.075 : 0.13;
  advanceAnimation(player, images.ivan[player.action].length, frameDuration, dt);
}

function cryingActionForHits(hitCount) {
  if (hitCount <= 0) {
    return "";
  }

  return `crying${Math.min(hitCount, 3)}`;
}

function updateWildDogmatt(dogmatt, dt) {
  const player = state.player;
  const dx = dogmatt.x - player.x;
  const dy = dogmatt.y - player.y;
  const distance = Math.hypot(dx, dy) || 1;
  let moving = false;

  dogmatt.hitCooldown = Math.max(0, dogmatt.hitCooldown - dt);

  if (distance < DOGMATT.fleeRadius) {
    const moveX = dx / distance;
    const moveY = dy / distance;
    dogmatt.x = clamp(dogmatt.x + moveX * DOGMATT.fleeSpeed * dt, 0, MAP.width);
    dogmatt.y = clamp(dogmatt.y + moveY * DOGMATT.fleeSpeed * dt, 0, MAP.height);
    dogmatt.direction = moveX < 0 ? "left" : "right";
    moving = true;
  } else if (distance < DOGMATT.noticeRadius) {
    setAction(dogmatt, "idle");
  } else {
    dogmatt.wanderTimer -= dt;

    if (dogmatt.wanderTimer <= 0) {
      dogmatt.wanderAngle = Math.random() * Math.PI * 2;
      dogmatt.wanderTimer = 0.7 + Math.random() * 2.2;
    }

    const moveX = Math.cos(dogmatt.wanderAngle);
    const moveY = Math.sin(dogmatt.wanderAngle);
    dogmatt.x = clamp(dogmatt.x + moveX * DOGMATT.wanderSpeed * dt, 0, MAP.width);
    dogmatt.y = clamp(dogmatt.y + moveY * DOGMATT.wanderSpeed * dt, 0, MAP.height);
    dogmatt.direction = moveX < 0 ? "left" : "right";
    moving = true;
  }

  if (dogmatt.hitCount > 0) {
    setAction(dogmatt, cryingActionForHits(dogmatt.hitCount));
  } else if (moving) {
    setAction(dogmatt, "walking");
  }
}

function updateCaughtDogmatt(dogmatt, dt, caughtIndex) {
  const angle = caughtIndex * 1.65;
  const ring = Math.floor(caughtIndex / 7);
  const radius = 92 + ring * 48;
  const targetX = state.player.x + Math.cos(angle) * radius;
  const targetY = state.player.y + Math.sin(angle) * radius;
  const dx = targetX - dogmatt.x;
  const dy = targetY - dogmatt.y;
  const distance = Math.hypot(dx, dy) || 1;

  if (distance > DOGMATT.followStopDistance) {
    const speed = Math.min(DOGMATT.followSpeed * dt, distance);
    dogmatt.x = clamp(dogmatt.x + (dx / distance) * speed, 0, MAP.width);
    dogmatt.y = clamp(dogmatt.y + (dy / distance) * speed, 0, MAP.height);
    dogmatt.direction = dx < 0 ? "left" : "right";
  }

  setAction(dogmatt, "caught");
}

function updateDogmatts(dt) {
  let caughtIndex = 0;

  for (const dogmatt of state.dogmatts) {
    if (dogmatt.caught) {
      updateCaughtDogmatt(dogmatt, dt, caughtIndex);
      caughtIndex += 1;
    } else {
      updateWildDogmatt(dogmatt, dt);
    }

    const frameDuration = dogmatt.action === "caught" ? 0.16 : 0.2;
    advanceAnimation(dogmatt, images.dogmatt[dogmatt.action].length, frameDuration, dt);
  }

  updateCaughtHud(caughtIndex);
}

function updateCaughtHud(caughtCount) {
  if (state.caughtDogmatts === caughtCount) {
    return;
  }

  state.caughtDogmatts = caughtCount;

  if (caughtCounter) {
    caughtCounter.textContent = `Mattdogs caught: ${caughtCount} / ${DOGMATT.count}`;
  }

  if (monsterSlots[0]) {
    monsterSlots[0].classList.toggle("caught", caughtCount > 0);
  }
}

function update(dt) {
  updatePlayer(dt);
  updateDogmatts(dt);
  syncCamera();
  preloadNearbyTilesIfNeeded(2);
}

function hitDogmatt(dogmatt) {
  dogmatt.hitCooldown = 0.25;
  dogmatt.hitCount += 1;
  dogmatt.frameIndex = 0;
  dogmatt.frameTimer = 0;

  if (dogmatt.hitCount >= 4) {
    dogmatt.hitCount = 4;
    dogmatt.caught = true;
    setAction(dogmatt, "caught");
    updateCaughtHud(state.caughtDogmatts + 1);
    return;
  }

  setAction(dogmatt, cryingActionForHits(dogmatt.hitCount));
}

function applyWhipHit() {
  let closestDogmatt = null;
  let closestDistance = Infinity;

  for (const dogmatt of state.dogmatts) {
    if (dogmatt.caught || dogmatt.hitCooldown > 0) {
      continue;
    }

    const distance = distanceBetween(state.player, dogmatt);

    if (distance < PLAYER.attackRange && distance < closestDistance) {
      closestDogmatt = dogmatt;
      closestDistance = distance;
    }
  }

  if (closestDogmatt) {
    hitDogmatt(closestDogmatt);
  }
}

function drawMap() {
  ctx.fillStyle = "#18201d";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  const range = getTileRange();

  for (let row = range.top; row <= range.bottom; row += 1) {
    for (let col = range.left; col <= range.right; col += 1) {
      const tile = loadTile(col, row);
      const worldX = col * MAP.tileSize;
      const worldY = row * MAP.tileSize;
      const screenX = Math.round(worldX - state.camera.x);
      const screenY = Math.round(worldY - state.camera.y);

      if (tile.loaded) {
        ctx.drawImage(tile.image, screenX, screenY);
      } else {
        ctx.fillStyle = "#18201d";
        ctx.fillRect(screenX, screenY, MAP.tileSize, MAP.tileSize);
      }
    }
  }
}

function drawFutureMonsterMarkers() {
  ctx.save();
  ctx.translate(-state.camera.x, -state.camera.y);

  for (const monster of MONSTERS) {
    if (!monster.image || monster.caught) {
      continue;
    }

    ctx.fillStyle = "rgba(245, 222, 135, 0.8)";
    ctx.beginPath();
    ctx.arc(monster.x, monster.y, 18, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawPlayerShadow() {
  const player = state.player;
  const screenX = player.x - state.camera.x;
  const screenY = player.y - state.camera.y;

  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  ctx.beginPath();
  ctx.ellipse(screenX, screenY + 10, 42, 16, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawPlayer() {
  const player = state.player;
  const frames = images.ivan[player.action];
  const sprite = frames[player.frameIndex % frames.length];
  const screenX = Math.round(player.x - state.camera.x);
  const screenY = Math.round(player.y - state.camera.y);
  const facingLeft = player.direction === "left";

  ctx.save();
  ctx.translate(screenX, screenY);

  if (facingLeft) {
    ctx.scale(-1, 1);
  }

  ctx.drawImage(sprite, -player.width / 2, -player.height + PLAYER.footOffset);
  ctx.restore();
}

function drawDogmattShadow(dogmatt) {
  const screenX = dogmatt.x - state.camera.x;
  const screenY = dogmatt.y - state.camera.y;

  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.24)";
  ctx.beginPath();
  ctx.ellipse(screenX, screenY + 6, 34, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawDogmatt(dogmatt) {
  const frames = images.dogmatt[dogmatt.action];
  const sprite = frames[dogmatt.frameIndex % frames.length];
  const screenX = Math.round(dogmatt.x - state.camera.x);
  const screenY = Math.round(dogmatt.y - state.camera.y);
  const facingLeft = dogmatt.direction === "left";

  ctx.save();
  ctx.translate(screenX, screenY);

  if (facingLeft) {
    ctx.scale(-1, 1);
  }

  ctx.drawImage(sprite, -DOGMATT.width / 2, -DOGMATT.height + DOGMATT.footOffset);
  ctx.restore();
}

function drawActors() {
  const actors = state.dogmatts.map((dogmatt) => ({
    type: "dogmatt",
    y: dogmatt.y,
    entity: dogmatt,
  }));

  actors.push({ type: "player", y: state.player.y, entity: state.player });
  actors.sort((a, b) => a.y - b.y);

  for (const actor of actors) {
    if (actor.type === "player") {
      drawPlayerShadow();
    } else {
      drawDogmattShadow(actor.entity);
    }
  }

  for (const actor of actors) {
    if (actor.type === "player") {
      drawPlayer();
    } else {
      drawDogmatt(actor.entity);
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  drawMap();
  drawFutureMonsterMarkers();
  drawActors();
}

function loop(time) {
  if (!state.ready) {
    return;
  }

  const dt = Math.min((time - state.lastTime) / 1000 || 0, 0.05);
  state.lastTime = time;

  update(dt);
  draw();
  requestAnimationFrame(loop);
}

function updateTouchJoystick(clientX, clientY) {
  const dx = clientX - touchInput.joystickCenterX;
  const dy = clientY - touchInput.joystickCenterY;
  const distance = Math.hypot(dx, dy);
  const limitedDistance = Math.min(distance, touchInput.joystickMaxDistance);
  const angle = Math.atan2(dy, dx);
  const knobX = Math.cos(angle) * limitedDistance;
  const knobY = Math.sin(angle) * limitedDistance;

  touchInput.moveX = distance > 6 ? knobX / touchInput.joystickMaxDistance : 0;
  touchInput.moveY = distance > 6 ? knobY / touchInput.joystickMaxDistance : 0;

  if (touchJoystick) {
    touchJoystick.style.setProperty("--knob-x", `${knobX}px`);
    touchJoystick.style.setProperty("--knob-y", `${knobY}px`);
  }
}

function resetTouchJoystick() {
  touchInput.moveX = 0;
  touchInput.moveY = 0;
  touchInput.joystickPointerId = null;

  if (touchJoystick) {
    touchJoystick.classList.remove("active");
    touchJoystick.style.setProperty("--knob-x", "0px");
    touchJoystick.style.setProperty("--knob-y", "0px");
  }
}

function startTouchJoystick(event) {
  if (!touchJoystick || touchInput.joystickPointerId !== null) {
    return;
  }

  event.preventDefault();
  const rect = touchJoystick.getBoundingClientRect();
  touchInput.joystickPointerId = event.pointerId;
  touchInput.joystickCenterX = rect.left + rect.width / 2;
  touchInput.joystickCenterY = rect.top + rect.height / 2;
  touchInput.joystickMaxDistance = Math.max(42, rect.width * 0.38);
  touchJoystick.classList.add("active");
  touchJoystick.setPointerCapture(event.pointerId);
  updateTouchJoystick(event.clientX, event.clientY);
}

function moveTouchJoystick(event) {
  if (event.pointerId !== touchInput.joystickPointerId) {
    return;
  }

  event.preventDefault();
  updateTouchJoystick(event.clientX, event.clientY);
}

function stopTouchJoystick(event) {
  if (event.pointerId !== touchInput.joystickPointerId) {
    return;
  }

  event.preventDefault();
  resetTouchJoystick();
}

function bindTouchButton(button, onPress, onRelease) {
  if (!button) {
    return;
  }

  button.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    button.classList.add("active");
    button.setPointerCapture(event.pointerId);
    onPress();
  });

  const release = (event) => {
    event.preventDefault();
    button.classList.remove("active");
    if (onRelease) {
      onRelease();
    }
  };

  button.addEventListener("pointerup", release);
  button.addEventListener("pointercancel", release);
  button.addEventListener("lostpointercapture", () => {
    button.classList.remove("active");
    if (onRelease) {
      onRelease();
    }
  });
}

function triggerWhip() {
  if (!state.ready) {
    return;
  }

  state.player.attackTimer = 0.32;
  state.player.frameIndex = 0;
  state.player.frameTimer = 0;
  setAction(state.player, "whipping");
  applyWhipHit();
}

window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();

  if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(key)) {
    event.preventDefault();
  }

  if (key === " ") {
    if (!event.repeat) {
      triggerWhip();
    }
    return;
  }

  keys.add(key);
});

window.addEventListener("keyup", (event) => {
  keys.delete(event.key.toLowerCase());
});

window.addEventListener("blur", () => {
  keys.clear();
  touchInput.sprint = false;
  resetTouchJoystick();
  if (touchSprint) {
    touchSprint.classList.remove("active");
  }
});

canvas.addEventListener("pointerdown", () => {
  triggerWhip();
});

if (touchJoystick) {
  touchJoystick.addEventListener("pointerdown", startTouchJoystick);
  touchJoystick.addEventListener("pointermove", moveTouchJoystick);
  touchJoystick.addEventListener("pointerup", stopTouchJoystick);
  touchJoystick.addEventListener("pointercancel", stopTouchJoystick);
  touchJoystick.addEventListener("lostpointercapture", resetTouchJoystick);
}

bindTouchButton(touchWhip, triggerWhip);
bindTouchButton(
  touchSprint,
  () => {
    touchInput.sprint = true;
  },
  () => {
    touchInput.sprint = false;
  },
);

window.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

window.addEventListener("resize", () => {
  resizeCanvas();
  state.lastPreloadKey = "";
  if (state.ready) {
    draw();
    preloadNearbyTiles(2);
  }
});

resizeCanvas();
loadAssets()
  .then(async () => {
    spawnDogmatts();
    syncCamera();
    updateCaughtHud(0);
    loading.textContent = "Loading nearby map...";
    await Promise.all(preloadNearbyTiles(1));
    state.ready = true;
    loading.classList.add("hidden");
    state.lastTime = performance.now();
    requestAnimationFrame(loop);
  })
  .catch((error) => {
    loading.textContent = error.message;
    console.error(error);
  });
