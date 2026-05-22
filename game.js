const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d", { alpha: false });
const loading = document.querySelector("#loading");
const launcher = document.querySelector("#launcher");
const profileList = document.querySelector("#profile-list");
const profileForm = document.querySelector("#profile-form");
const profileName = document.querySelector("#profile-name");
const profilePlay = document.querySelector("#profile-play");
const profileDelete = document.querySelector("#profile-delete");
const profileStatus = document.querySelector("#profile-status");
const profileMenu = document.querySelector("#profile-menu");
const caughtCounter = document.querySelector("#caught-counter");
const timeLabel = document.querySelector("#time-label");
const worldLabel = document.querySelector("#world-label");
const monsterSlots = [...document.querySelectorAll(".slot")];
const touchJoystick = document.querySelector("#touch-joystick");
const touchKnob = document.querySelector("#touch-knob");
const touchWhip = document.querySelector("#touch-whip");
const touchSprint = document.querySelector("#touch-sprint");
const devPanel = document.querySelector("#dev-panel");
const devClose = document.querySelector("#dev-close");
const devWorld = document.querySelector("#dev-world");
const devTools = document.querySelector("#dev-tools");
const devNpc = document.querySelector("#dev-npc");
const devNodeTarget = document.querySelector("#dev-node-target");
const devSave = document.querySelector("#dev-save");
const devNewLine = document.querySelector("#dev-new-line");
const devRespawn = document.querySelector("#dev-respawn");
const devExport = document.querySelector("#dev-export");
const devExportBuiltIn = document.querySelector("#dev-export-built-in");
const devImport = document.querySelector("#dev-import");
const devLoadBuiltIn = document.querySelector("#dev-load-built-in");
const devClear = document.querySelector("#dev-clear");
const devData = document.querySelector("#dev-data");
const devStatus = document.querySelector("#dev-status");

const MAIN_MAP = {
  width: 10000,
  height: 10000,
  tileSize: 512,
  columns: 20,
  rows: 20,
  maxCachedTiles: 420,
  tilePath: (col, row) => `assets/map-tiles/tile_${col}_${row}.jpg`,
};

const DEFAULT_WORLD_ID = "mainworld";
const WORLD_MAPS = {
  mainworld: {
    ...MAIN_MAP,
    type: "tiles",
    overview: "assets/worldmap-overview.jpg",
    fill: "#18201d",
  },
  town: {
    width: 8000,
    height: 8000,
    type: "image",
    image: "assets/maps/town/town.jfif",
    fill: "#18201d",
  },
  town_arena_entrance: {
    width: 5600,
    height: 4000,
    type: "image",
    image: "assets/maps/town/buildings/arena/entrance.jfif",
    fill: "#221712",
  },
  town_arena: {
    width: 10000,
    height: 10000,
    type: "image",
    image: "assets/maps/town/buildings/arena/arena.jfif",
    fill: "#1b1814",
  },
  town_blacksmith: {
    width: 5600,
    height: 4000,
    type: "image",
    image: "assets/maps/town/buildings/blacksmith/blacksmith.jfif",
    fill: "#211611",
  },
  town_inn: {
    width: 5600,
    height: 4000,
    type: "image",
    image: "assets/maps/town/buildings/bricksinn/main.jfif",
    fill: "#1f1710",
  },
  town_inn_rooms: {
    width: 5600,
    height: 4000,
    type: "image",
    image: "assets/maps/town/buildings/bricksinn/bricksinn.jfif",
    fill: "#1f1710",
  },
  town_mattstore: {
    width: 2678,
    height: 2350,
    type: "image",
    image: "assets/maps/town/buildings/mattstore/interior.jfif",
    fill: "#171b19",
  },
  fireworld: {
    width: 2508,
    height: 2508,
    type: "image",
    image: "assets/maps/fire/fireworld.png",
    fill: "#2b130e",
  },
  purplewaterworld: {
    width: 2508,
    height: 2508,
    type: "blank",
    fill: "#18172d",
  },
  temple: {
    width: 2508,
    height: 2508,
    type: "blank",
    fill: "#272313",
  },
  tomb: {
    width: 2508,
    height: 2508,
    type: "blank",
    fill: "#161a1e",
  },
  treeworld: {
    width: 2508,
    height: 2508,
    type: "blank",
    fill: "#142216",
  },
  home: {
    width: 2508,
    height: 2508,
    type: "blank",
    fill: "#222018",
  },
};

const PLAYER = {
  width: 129,
  height: 174,
  footOffset: 27,
  speed: 680,
  sprintSpeed: 1080,
  attackRange: 235,
  trailSpacing: 11,
  maxTrailPoints: 260,
};

const DOGMATT = {
  type: "dogmatt",
  count: 20,
  width: 112,
  height: 112,
  footOffset: 14,
  wanderSpeed: 130,
  fleeSpeed: 560,
  followSpeed: 740,
  noticeRadius: 430,
  fleeRadius: 285,
  followStopDistance: 36,
  followBackSpacing: 72,
  followSideSpacing: 52,
};

const FIREMATT = {
  type: "firematt",
  count: 10,
  width: 132,
  height: 132,
  footOffset: 16,
  wanderSpeed: 120,
  fleeSpeed: 520,
  followSpeed: 720,
  noticeRadius: 380,
  fleeRadius: 250,
  followStopDistance: 36,
  followBackSpacing: 76,
  followSideSpacing: 56,
  specialIdleMin: 10,
  specialIdleMax: 15,
};

const NPC = {
  width: 126,
  height: 168,
  footOffset: 18,
  speed: 185,
  stopDistance: 18,
  waitMin: 1.2,
  waitMax: 3.8,
  longWaitDuration: 30,
  idleCheckMin: 2.5,
  idleCheckMax: 6,
  idleAnimationChance: 0.35,
};

const MATT_CONFIGS = {
  dogmatt: DOGMATT,
  firematt: FIREMATT,
};

const WORLD_MATT_TYPES = {
  mainworld: "dogmatt",
  fireworld: "firematt",
};

const NPC_DEFS = {
  scott: {
    id: "scott",
    name: "Scott",
    homeWorld: "town_arena_entrance",
    x: 2820,
    y: 2200,
  },
  ty: {
    id: "ty",
    name: "Ty",
    homeWorld: "town_mattstore",
    x: 1360,
    y: 1160,
  },
  tom: {
    id: "tom",
    name: "Tom",
    homeWorld: "town_blacksmith",
    x: 2780,
    y: 2140,
  },
  brick: {
    id: "brick",
    name: "Brick",
    homeWorld: "town_inn",
    x: 2860,
    y: 2120,
  },
};

const NPC_IDS = Object.keys(NPC_DEFS);

const MATT_LABELS = {
  dogmatt: "Mattdogs",
  firematt: "Fire Matts",
};

const PARTICLES = {
  max: 260,
  ambientRate: 0.16,
};

const CLOCK = {
  realSecondsPerGameDay: 720,
  startHour: 6,
  nightStartHour: 20,
  nightEndHour: 6,
};

const WORLD_STORAGE_KEY = "ivan-monster-hunt-worlds-v1";
const MATT_PROGRESS_STORAGE_KEY = "ivan-monster-hunt-matt-progress-v1";
const PROFILE_STORAGE_KEY = "ivan-monster-hunt-profiles-v1";
const ACTIVE_PROFILE_STORAGE_KEY = "ivan-monster-hunt-active-profile-v1";
const MATT_PARTY_LIMIT = 6;
const WORLD_IDS = [
  "mainworld",
  "town",
  "town_arena_entrance",
  "town_arena",
  "town_blacksmith",
  "town_inn",
  "town_inn_rooms",
  "town_mattstore",
  "fireworld",
  "purplewaterworld",
  "temple",
  "tomb",
  "treeworld",
  "home",
];

const WORLD_LABELS = {
  mainworld: "Main World",
  town: "Town",
  town_arena_entrance: "Arena Entrance",
  town_arena: "Arena",
  town_blacksmith: "Blacksmith",
  town_inn: "Brick's Inn",
  town_inn_rooms: "Inn Rooms",
  town_mattstore: "Matt Store",
  fireworld: "Fireworld",
  purplewaterworld: "Purple Water World",
  temple: "Temple",
  tomb: "Tomb",
  treeworld: "Tree World",
  home: "Home",
};

const WORLD_TINTS = {
  mainworld: "rgba(255, 244, 190, 0.03)",
  town: "rgba(255, 244, 190, 0.05)",
  town_arena_entrance: "rgba(255, 244, 190, 0.04)",
  town_arena: "rgba(255, 244, 190, 0.03)",
  town_blacksmith: "rgba(255, 126, 68, 0.06)",
  town_inn: "rgba(255, 210, 126, 0.05)",
  town_inn_rooms: "rgba(255, 210, 126, 0.05)",
  town_mattstore: "rgba(150, 240, 200, 0.05)",
  fireworld: "rgba(224, 70, 38, 0.16)",
  purplewaterworld: "rgba(112, 78, 220, 0.16)",
  temple: "rgba(235, 205, 132, 0.11)",
  tomb: "rgba(80, 92, 104, 0.18)",
  treeworld: "rgba(63, 148, 88, 0.14)",
  home: "rgba(247, 221, 152, 0.1)",
};

function numberedFrames(path, count) {
  return Array.from({ length: count }, (_, index) => `${path}/${index + 1}.png`);
}

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
  firematt: {
    idle: ["assets/matts/firematt/idle/idle.png"],
    idleNormal: numberedFrames("assets/matts/firematt/idle/normal", 12),
    idleHammer: numberedFrames("assets/matts/firematt/idle/hammer", 12),
    idleNose: numberedFrames("assets/matts/firematt/idle/nose", 12),
    walking: numberedFrames("assets/matts/firematt/walking", 12),
    hit: numberedFrames("assets/matts/firematt/hit", 4),
    caught: numberedFrames("assets/matts/firematt/walking/caught", 6),
    attack: numberedFrames("assets/matts/firematt/attack", 6),
    win: numberedFrames("assets/matts/firematt/win", 9),
  },
  npcs: {
    scott: {
      idle: numberedFrames("assets/maps/town/characters/scottarena/idle", 12),
      walking: numberedFrames("assets/maps/town/characters/scottarena/walking", 7),
    },
    ty: {
      idle: ["assets/maps/town/characters/Tymattstore/idle/main.png"],
      idleSpecial: numberedFrames("assets/maps/town/characters/Tymattstore/idle/New folder", 12),
      walking: numberedFrames("assets/maps/town/characters/Tymattstore/walk", 4),
      busy: numberedFrames("assets/maps/town/characters/Tymattstore/busy", 12),
      talk: numberedFrames("assets/maps/town/characters/Tymattstore/talk", 12),
    },
    tom: {
      idle: ["assets/maps/town/characters/tomblacksmith/idle/main.png"],
      idleSpecial: numberedFrames("assets/maps/town/characters/tomblacksmith/idle/puff", 11),
      walking: numberedFrames("assets/maps/town/characters/tomblacksmith/walking", 12),
    },
    brick: {
      idle: ["assets/maps/town/characters/brickinn/idle/main.png"],
      idleSpecial: numberedFrames("assets/maps/town/characters/brickinn/idle/drink", 11),
      walking: numberedFrames("assets/maps/town/characters/brickinn/walk", 5),
    },
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
  time: 0,
  clockMinutes: CLOCK.startHour * 60,
  lastNightState: false,
  lastPreloadKey: "",
  currentWorld: DEFAULT_WORLD_ID,
  profileId: "",
  profileName: "",
  profiles: [],
  worlds: {},
  capturedParty: [],
  caughtDogmatts: -1,
  ambientTimer: 0,
  particles: [],
  screenShake: 0,
  camera: { x: 0, y: 0 },
  player: {
    x: WORLD_MAPS[DEFAULT_WORLD_ID].width / 2,
    y: WORLD_MAPS[DEFAULT_WORLD_ID].height / 2,
    width: PLAYER.width,
    height: PLAYER.height,
    speed: PLAYER.speed,
    sprintSpeed: PLAYER.sprintSpeed,
    direction: "down",
    facingX: 0,
    facingY: 1,
    moving: false,
    trail: [],
    action: "idle",
    frameTimer: 0,
    frameIndex: 0,
    attackTimer: 0,
  },
  dogmatts: [],
  npcs: [],
  dev: {
    enabled: false,
    tool: "wall",
    dragging: null,
    activeWallId: null,
    activePathId: null,
    activeNpcPathId: null,
    selectedNpcId: "scott",
    panelReady: false,
  },
};

const images = {
  worldMaps: {},
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
  firematt: {
    idle: [],
    idleNormal: [],
    idleHammer: [],
    idleNose: [],
    walking: [],
    hit: [],
    caught: [],
    attack: [],
    win: [],
  },
  npcs: {},
};

const audio = {
  context: null,
  master: null,
  noiseBuffer: null,
  ambientStarted: false,
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
  const worldImageEntries = Object.entries(WORLD_MAPS).filter(([, map]) => map.type === "image" || map.overview);
  const [worldImages, ivanFrames, dogmattFrames, firemattFrames, npcFrames] = await Promise.all([
    Promise.all(
      worldImageEntries.map(async ([id, map]) => [id, await loadImage(map.overview || map.image)]),
    ),
    loadAnimationSet(ASSETS.ivan, PLAYER.width, PLAYER.height),
    loadAnimationSet(ASSETS.dogmatt, DOGMATT.width, DOGMATT.height),
    loadAnimationSet(ASSETS.firematt, FIREMATT.width, FIREMATT.height),
    Promise.all(
      Object.entries(ASSETS.npcs).map(async ([id, assetSet]) => [
        id,
        await loadAnimationSet(assetSet, NPC.width, NPC.height),
      ]),
    ),
  ]);

  Object.assign(images.worldMaps, Object.fromEntries(worldImages));
  Object.assign(images.ivan, ivanFrames);
  Object.assign(images.dogmatt, dogmattFrames);
  Object.assign(images.firematt, firemattFrames);
  images.npcs = Object.fromEntries(npcFrames);
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

function getWorldMapConfig(worldId = state.currentWorld) {
  return WORLD_MAPS[worldId] || WORLD_MAPS[DEFAULT_WORLD_ID];
}

function getMapWidth(worldId = state.currentWorld) {
  return getWorldMapConfig(worldId).width;
}

function getMapHeight(worldId = state.currentWorld) {
  return getWorldMapConfig(worldId).height;
}

function getMapCenter(worldId = state.currentWorld) {
  return {
    x: getMapWidth(worldId) / 2,
    y: getMapHeight(worldId) / 2,
  };
}

function clampToCurrentMap(point) {
  return {
    x: clamp(point.x, 0, getMapWidth()),
    y: clamp(point.y, 0, getMapHeight()),
  };
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function distanceBetween(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function directionToVector(direction) {
  if (direction === "left") {
    return { x: -1, y: 0 };
  }

  if (direction === "right") {
    return { x: 1, y: 0 };
  }

  if (direction === "up") {
    return { x: 0, y: -1 };
  }

  return { x: 0, y: 1 };
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

function getProfileScopedStorageKey(baseKey) {
  return state.profileId ? `${baseKey}:${state.profileId}` : baseKey;
}

function getWorldStorageKey() {
  return getProfileScopedStorageKey(WORLD_STORAGE_KEY);
}

function getMattProgressStorageKey() {
  return getProfileScopedStorageKey(MATT_PROGRESS_STORAGE_KEY);
}

function createProfile(name) {
  return {
    id: createId("profile"),
    name: name.trim().slice(0, 18) || "Ivan",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

function loadProfiles() {
  try {
    const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
    const data = saved ? JSON.parse(saved) : null;
    const profiles = Array.isArray(data?.profiles) ? data.profiles : [];

    if (profiles.length > 0) {
      return profiles.map((profile) => ({
        id: profile.id || createId("profile"),
        name: profile.name || "Ivan",
        createdAt: profile.createdAt || Date.now(),
        updatedAt: profile.updatedAt || profile.createdAt || Date.now(),
      }));
    }
  } catch (error) {
    console.warn("Could not load profiles.", error);
  }

  return [];
}

function saveProfiles() {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify({ version: 1, profiles: state.profiles }));
}

function setProfileStatus(message) {
  if (profileStatus) {
    profileStatus.textContent = message;
  }
}

function setActiveProfile(profileId) {
  const profile = state.profiles.find((item) => item.id === profileId);

  if (!profile) {
    return false;
  }

  state.profileId = profile.id;
  state.profileName = profile.name;
  localStorage.setItem(ACTIVE_PROFILE_STORAGE_KEY, profile.id);
  return true;
}

function updateProfileList() {
  if (!profileList) {
    return;
  }

  profileList.innerHTML = "";

  if (state.profiles.length === 0) {
    const empty = document.createElement("p");
    empty.className = "profile-empty";
    empty.textContent = "No profiles yet.";
    profileList.append(empty);
    return;
  }

  state.profiles.forEach((profile) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "profile-option";
    button.classList.toggle("active", profile.id === state.profileId);
    button.dataset.profileId = profile.id;

    const label = document.createElement("strong");
    label.textContent = profile.name;
    const detail = document.createElement("span");
    detail.textContent = profile.id === state.profileId ? "Selected" : "Profile";

    button.append(label, detail);
    button.addEventListener("click", () => {
      setActiveProfile(profile.id);
      updateProfileList();
      setProfileStatus(`${profile.name} selected.`);
    });
    profileList.append(button);
  });
}

function showLauncher(message = "Choose a profile to begin.") {
  if (launcher) {
    launcher.hidden = false;
  }

  if (loading) {
    loading.classList.add("hidden");
  }

  setProfileStatus(message);
  updateProfileList();
}

function hideLauncher() {
  if (launcher) {
    launcher.hidden = true;
  }
}

function addScreenShake(amount) {
  state.screenShake = Math.max(state.screenShake, amount);
}

function ensureAudio() {
  const AudioCtor = window.AudioContext || window.webkitAudioContext;

  if (!AudioCtor) {
    return null;
  }

  if (!audio.context) {
    audio.context = new AudioCtor();
    audio.master = audio.context.createGain();
    audio.master.gain.value = 0.22;
    audio.master.connect(audio.context.destination);
    audio.noiseBuffer = createNoiseBuffer();
  }

  if (audio.context.state === "suspended") {
    audio.context.resume();
  }

  if (!audio.ambientStarted) {
    startAmbientAudio();
  }

  return audio.context;
}

function createNoiseBuffer() {
  const ctx = audio.context;
  const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < data.length; i += 1) {
    data[i] = Math.random() * 2 - 1;
  }

  return buffer;
}

function startAmbientAudio() {
  const ctx = audio.context;

  if (!ctx || audio.ambientStarted) {
    return;
  }

  audio.ambientStarted = true;

  const noise = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const noiseGain = ctx.createGain();
  noise.buffer = audio.noiseBuffer;
  noise.loop = true;
  filter.type = "lowpass";
  filter.frequency.value = 420;
  noiseGain.gain.value = 0.012;
  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(audio.master);
  noise.start();

  const hum = ctx.createOscillator();
  const humGain = ctx.createGain();
  hum.type = "sine";
  hum.frequency.value = 92;
  humGain.gain.value = 0.01;
  hum.connect(humGain);
  humGain.connect(audio.master);
  hum.start();
}

function playWhipSound() {
  const ctx = ensureAudio();

  if (!ctx) {
    return;
  }

  const now = ctx.currentTime;
  const noise = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  noise.buffer = audio.noiseBuffer;
  filter.type = "highpass";
  filter.frequency.setValueAtTime(1150, now);
  filter.frequency.exponentialRampToValueAtTime(260, now + 0.12);
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(0.2, now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(audio.master);
  noise.start(now);
  noise.stop(now + 0.18);

  const snap = ctx.createOscillator();
  const snapGain = ctx.createGain();
  snap.type = "triangle";
  snap.frequency.setValueAtTime(620, now);
  snap.frequency.exponentialRampToValueAtTime(120, now + 0.11);
  snapGain.gain.setValueAtTime(0.09, now);
  snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);
  snap.connect(snapGain);
  snapGain.connect(audio.master);
  snap.start(now);
  snap.stop(now + 0.14);
}

function playHitSound(hitCount) {
  const ctx = ensureAudio();

  if (!ctx) {
    return;
  }

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(240 + hitCount * 75, now);
  osc.frequency.exponentialRampToValueAtTime(150 + hitCount * 40, now + 0.18);
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
  osc.connect(gain);
  gain.connect(audio.master);
  osc.start(now);
  osc.stop(now + 0.22);
}

function playCaptureSound() {
  const ctx = ensureAudio();

  if (!ctx) {
    return;
  }

  const notes = [330, 440, 554, 740];
  const now = ctx.currentTime;

  for (let i = 0; i < notes.length; i += 1) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const start = now + i * 0.055;
    osc.type = "triangle";
    osc.frequency.setValueAtTime(notes[i], start);
    gain.gain.setValueAtTime(0.001, start);
    gain.gain.exponentialRampToValueAtTime(0.1, start + 0.014);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.18);
    osc.connect(gain);
    gain.connect(audio.master);
    osc.start(start);
    osc.stop(start + 0.2);
  }
}

function createEmptyWorld(id) {
  return {
    id,
    walls: [],
    spawnAreas: [],
    paths: [],
    npcPaths: [],
    npcs: [],
    nodes: [],
  };
}

function createNpc(id, x, y) {
  const def = NPC_DEFS[id] || NPC_DEFS.scott;
  return {
    id: def.id,
    x,
    y,
    action: "idle",
    frameIndex: 0,
    frameTimer: 0,
    direction: "right",
    pathId: "",
    pathPointIndex: 0,
    targetPointIndex: null,
    waitTimer: randomBetween(NPC.waitMin, NPC.waitMax),
    waitMode: "point",
    idleCheckTimer: randomBetween(NPC.idleCheckMin, NPC.idleCheckMax),
  };
}

function normalizeNpc(npc, worldId) {
  const def = NPC_DEFS[npc?.id];
  const center = getMapCenter(worldId);

  if (!def) {
    return null;
  }

  return {
    id: def.id,
    x: Number.isFinite(npc.x) ? clamp(npc.x, 0, getMapWidth(worldId)) : center.x,
    y: Number.isFinite(npc.y) ? clamp(npc.y, 0, getMapHeight(worldId)) : center.y,
    action: ["idle", "walking", "idleSpecial", "busy", "talk"].includes(npc.action) ? npc.action : "idle",
    frameIndex: Number.isFinite(npc.frameIndex) ? npc.frameIndex : 0,
    frameTimer: 0,
    direction: npc.direction === "left" ? "left" : "right",
    pathId: typeof npc.pathId === "string" ? npc.pathId : "",
    pathPointIndex: Number.isFinite(npc.pathPointIndex) ? npc.pathPointIndex : 0,
    targetPointIndex: Number.isFinite(npc.targetPointIndex) ? npc.targetPointIndex : null,
    waitTimer: Number.isFinite(npc.waitTimer) ? npc.waitTimer : randomBetween(NPC.waitMin, NPC.waitMax),
    waitMode: ["point", "long"].includes(npc.waitMode) ? npc.waitMode : "point",
    idleCheckTimer: Number.isFinite(npc.idleCheckTimer)
      ? npc.idleCheckTimer
      : randomBetween(NPC.idleCheckMin, NPC.idleCheckMax),
  };
}

function normalizePath(path, prefix = "path") {
  return {
    id: typeof path?.id === "string" ? path.id : createId(prefix),
    npcId: typeof path?.npcId === "string" && NPC_DEFS[path.npcId] ? path.npcId : "",
    points: Array.isArray(path?.points)
      ? path.points
          .filter((point) => Number.isFinite(point?.x) && Number.isFinite(point?.y))
          .map((point) => ({ x: point.x, y: point.y }))
      : [],
  };
}

function normalizeWall(wall) {
  if (Array.isArray(wall?.points)) {
    return {
      id: wall.id || createId("wall"),
      points: wall.points.filter((point) => Number.isFinite(point.x) && Number.isFinite(point.y)),
      thickness: Number.isFinite(wall.thickness) ? wall.thickness : 70,
    };
  }

  if (
    Number.isFinite(wall?.x) &&
    Number.isFinite(wall?.y) &&
    Number.isFinite(wall?.width) &&
    Number.isFinite(wall?.height)
  ) {
    const rect = normalizeRect(wall);
    return {
      id: wall.id || createId("wall"),
      thickness: 70,
      points: [
        { x: rect.x, y: rect.y },
        { x: rect.x + rect.width, y: rect.y },
        { x: rect.x + rect.width, y: rect.y + rect.height },
        { x: rect.x, y: rect.y + rect.height },
        { x: rect.x, y: rect.y },
      ],
    };
  }

  return { id: createId("wall"), points: [], thickness: 70 };
}

function createDefaultWorlds() {
  const worlds = Object.fromEntries(WORLD_IDS.map((id) => [id, createEmptyWorld(id)]));
  const { x: centerX, y: centerY } = getMapCenter(DEFAULT_WORLD_ID);
  const mainNodes = [
    ["town", centerX - 780, centerY],
    ["fireworld", centerX + 520, centerY - 250],
    ["purplewaterworld", centerX + 540, centerY + 250],
    ["temple", centerX - 540, centerY - 250],
    ["tomb", centerX - 540, centerY + 250],
    ["treeworld", centerX, centerY - 620],
    ["home", centerX, centerY + 620],
  ];

  worlds[DEFAULT_WORLD_ID].nodes = mainNodes.map(([target, x, y]) => ({
    id: createId("node"),
    x,
    y,
    radius: 82,
    target,
  }));

  for (const id of WORLD_IDS) {
    if (id === DEFAULT_WORLD_ID || id === "town" || id.startsWith("town_")) {
      continue;
    }

    const center = getMapCenter(id);
    worlds[id].nodes.push({
      id: createId("node"),
      x: center.x,
      y: center.y,
      radius: 82,
      target: DEFAULT_WORLD_ID,
    });
  }

  addDefaultTownStructure(worlds);
  removeDuplicateDefaultNodes(worlds);
  return worlds;
}

function ensureNode(world, id, x, y, target, radius = 82) {
  if (!world.nodes.some((node) => node.id === id)) {
    world.nodes.push({ id, x, y, radius, target });
  }
}

function ensureNpc(world, npcId, x, y) {
  if (!world.npcs.some((npc) => npc.id === npcId)) {
    world.npcs.push(createNpc(npcId, x, y));
  }
}

function addDefaultTownStructure(worlds, sourceWorlds = null) {
  if (!worlds.town) {
    return;
  }

  const hasSaved = (worldId, key) => Boolean(sourceWorlds?.[worldId] && Array.isArray(sourceWorlds[worldId][key]));
  const maybeNode = (worldId, ...args) => {
    if (!hasSaved(worldId, "nodes")) {
      ensureNode(worlds[worldId], ...args);
    }
  };
  const maybeNpc = (worldId, ...args) => {
    if (!hasSaved(worldId, "npcs")) {
      ensureNpc(worlds[worldId], ...args);
    }
  };

  maybeNode("town", "node-town-to-mainworld", 4000, 7500, DEFAULT_WORLD_ID, 110);
  maybeNode("town", "node-town-to-arena-entrance", 6060, 1960, "town_arena_entrance", 110);
  maybeNode("town", "node-town-to-blacksmith", 2400, 2670, "town_blacksmith", 110);
  maybeNode("town", "node-town-to-inn", 3560, 4460, "town_inn", 110);
  maybeNode("town", "node-town-to-mattstore", 5200, 3840, "town_mattstore", 110);

  maybeNode("town_arena_entrance", "node-arena-entry-to-town", 760, 3560, "town", 110);
  maybeNode("town_arena_entrance", "node-arena-entry-to-arena", 4750, 2030, "town_arena", 130);
  maybeNode("town_arena", "node-arena-to-entry", 5100, 9050, "town_arena_entrance", 140);
  maybeNode("town_blacksmith", "node-blacksmith-to-town", 2800, 3660, "town", 120);
  maybeNode("town_inn", "node-inn-to-town", 2800, 3660, "town", 120);
  maybeNode("town_inn", "node-inn-to-rooms", 4920, 1520, "town_inn_rooms", 110);
  maybeNode("town_inn_rooms", "node-rooms-to-inn", 2800, 3620, "town_inn", 120);
  maybeNode("town_mattstore", "node-mattstore-to-town", 1339, 2140, "town", 95);

  maybeNpc("town_arena_entrance", "scott", 2820, 2200);
  maybeNpc("town_mattstore", "ty", 1360, 1160);
  maybeNpc("town_blacksmith", "tom", 2780, 2140);
  maybeNpc("town_inn", "brick", 2860, 2120);
}

const DEFAULT_NODE_IDS = new Set([
  "node-town-to-mainworld",
  "node-town-to-arena-entrance",
  "node-town-to-blacksmith",
  "node-town-to-inn",
  "node-town-to-mattstore",
  "node-arena-entry-to-town",
  "node-arena-entry-to-arena",
  "node-arena-to-entry",
  "node-blacksmith-to-town",
  "node-inn-to-town",
  "node-inn-to-rooms",
  "node-rooms-to-inn",
  "node-mattstore-to-town",
]);

function removeDuplicateDefaultNodes(worlds) {
  for (const world of Object.values(worlds)) {
    if (!Array.isArray(world.nodes) || world.nodes.length <= 1) {
      continue;
    }

    world.nodes = world.nodes.filter((node) => {
      if (!DEFAULT_NODE_IDS.has(node.id)) {
        return true;
      }

      return !world.nodes.some((candidate) => candidate !== node && candidate.target === node.target);
    });
  }
}

function createId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function getWorld(id = state.currentWorld) {
  if (!state.worlds[id]) {
    state.worlds[id] = createEmptyWorld(id);
  }

  return state.worlds[id];
}

function hasWorldPlacements(world) {
  return Boolean(
    world &&
      ((Array.isArray(world.walls) && world.walls.length > 0) ||
        (Array.isArray(world.spawnAreas) && world.spawnAreas.length > 0) ||
        (Array.isArray(world.paths) && world.paths.length > 0) ||
        (Array.isArray(world.nodes) && world.nodes.length > 1)),
  );
}

function isLegacyTownAsMainWorld(data) {
  const sourceWorlds = data && data.worlds ? data.worlds : data;
  return Boolean(sourceWorlds && !sourceWorlds[DEFAULT_WORLD_ID] && hasWorldPlacements(sourceWorlds.town));
}

function resolveWorldId(id, data = null) {
  if (id === "town" && isLegacyTownAsMainWorld(data)) {
    return DEFAULT_WORLD_ID;
  }

  return WORLD_IDS.includes(id) ? id : DEFAULT_WORLD_ID;
}

function normalizeNode(node, worldId) {
  const map = getWorldMapConfig(worldId);
  const center = getMapCenter(worldId);
  const nodeWasOffMap =
    !Number.isFinite(node?.x) ||
    !Number.isFinite(node?.y) ||
    node.x < 0 ||
    node.x > map.width ||
    node.y < 0 ||
    node.y > map.height;
  const target = node?.target;

  return {
    id: node?.id || createId("node"),
    x: nodeWasOffMap ? center.x : clamp(node.x, 0, map.width),
    y: nodeWasOffMap ? center.y : clamp(node.y, 0, map.height),
    radius: Number.isFinite(node?.radius) ? node.radius : 82,
    target: WORLD_IDS.includes(target) ? target : DEFAULT_WORLD_ID,
  };
}

function normalizeWorldData(data) {
  const sourceWorlds = data && data.worlds ? data.worlds : data;
  const legacyTownAsMainWorld = isLegacyTownAsMainWorld(data);
  const worlds = Object.fromEntries(WORLD_IDS.map((id) => [id, createEmptyWorld(id)]));

  for (const id of WORLD_IDS) {
    const world =
      legacyTownAsMainWorld && id === DEFAULT_WORLD_ID
        ? sourceWorlds.town
        : sourceWorlds && sourceWorlds[id]
          ? sourceWorlds[id]
          : {};
    worlds[id] = {
      id,
      walls: Array.isArray(world.walls) ? world.walls.map(normalizeWall) : [],
      spawnAreas: Array.isArray(world.spawnAreas) ? world.spawnAreas : [],
      paths: Array.isArray(world.paths) ? world.paths.map((path) => normalizePath(path, "path")) : [],
      npcPaths: Array.isArray(world.npcPaths)
        ? world.npcPaths.map((path) => normalizePath(path, "npcpath"))
        : [],
      npcs: Array.isArray(world.npcs)
        ? world.npcs.map((npc) => normalizeNpc(npc, id)).filter(Boolean)
        : [],
      nodes: Array.isArray(world.nodes) ? world.nodes.map((node) => normalizeNode(node, id)) : [],
    };
  }

  if (legacyTownAsMainWorld) {
    const center = getMapCenter("town");
    worlds.town = {
      ...createEmptyWorld("town"),
      nodes: [
        {
          id: createId("node"),
          x: center.x,
          y: center.y,
          radius: 82,
          target: DEFAULT_WORLD_ID,
        },
      ],
    };
  }

  addDefaultTownStructure(worlds, sourceWorlds);
  removeDuplicateDefaultNodes(worlds);
  return worlds;
}

function loadWorlds() {
  try {
    const saved = localStorage.getItem(getWorldStorageKey()) || localStorage.getItem(WORLD_STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      if (data.currentWorld) {
        state.currentWorld = resolveWorldId(data.currentWorld, data);
      }
      return normalizeWorldData(data);
    }
  } catch (error) {
    console.warn("Could not load saved world data.", error);
  }

  const builtInData = getBuiltInWorldData();
  if (builtInData) {
    try {
      if (builtInData.currentWorld) {
        state.currentWorld = resolveWorldId(builtInData.currentWorld, builtInData);
      }

      return normalizeWorldData(builtInData);
    } catch (error) {
      console.warn("Could not load built-in world data.", error);
    }
  }

  return createDefaultWorlds();
}

function getBuiltInWorldData() {
  return window.DEFAULT_WORLD_DATA && typeof window.DEFAULT_WORLD_DATA === "object"
    ? window.DEFAULT_WORLD_DATA
    : null;
}

function saveWorlds() {
  localStorage.setItem(
    getWorldStorageKey(),
    JSON.stringify({ version: 1, currentWorld: state.currentWorld, worlds: state.worlds }),
  );
  refreshDogmattPaths();
  refreshNpcPaths();
  setDevStatus("All placements saved.");
}

function makeCapturedPartyId(matt) {
  return matt.partyId || `${matt.sourceWorld || state.currentWorld}:${matt.originalId || matt.id}`;
}

function normalizeCapturedPartyMember(matt, fallbackIndex = 0) {
  if (!matt || !MATT_CONFIGS[matt.type]) {
    return null;
  }

  const originalId = matt.originalId || matt.id || `${matt.type}-${fallbackIndex + 1}`;
  const sourceWorld = matt.sourceWorld || state.currentWorld || DEFAULT_WORLD_ID;

  return {
    partyId: matt.partyId || `${sourceWorld}:${originalId}`,
    id: originalId,
    originalId,
    sourceWorld,
    type: matt.type,
    x: Number.isFinite(matt.x) ? matt.x : state.player.x,
    y: Number.isFinite(matt.y) ? matt.y : state.player.y,
    action: "caught",
    frameIndex: Number.isFinite(matt.frameIndex) ? matt.frameIndex : 0,
    direction: matt.direction || "right",
  };
}

function loadCapturedParty() {
  try {
    const saved =
      localStorage.getItem(getMattProgressStorageKey()) || localStorage.getItem(MATT_PROGRESS_STORAGE_KEY);
    if (!saved) {
      return [];
    }

    const data = JSON.parse(saved);
    const party = [];

    if (Array.isArray(data?.party)) {
      data.party.forEach((matt, index) => {
        const normalized = normalizeCapturedPartyMember(matt, index);
        if (normalized && !party.some((member) => member.partyId === normalized.partyId)) {
          party.push(normalized);
        }
      });
    } else if (data && typeof data.worlds === "object") {
      Object.entries(data.worlds).forEach(([worldId, worldProgress]) => {
        if (!Array.isArray(worldProgress?.matts)) {
          return;
        }

        worldProgress.matts.forEach((matt, index) => {
          if (!matt.caught) {
            return;
          }

          const normalized = normalizeCapturedPartyMember(
            { ...matt, sourceWorld: worldId, originalId: matt.id },
            index,
          );

          if (normalized && !party.some((member) => member.partyId === normalized.partyId)) {
            party.push(normalized);
          }
        });
      });
    }

    return party.slice(0, MATT_PARTY_LIMIT);
  } catch (error) {
    console.warn("Could not load captured Matt party.", error);
    return [];
  }
}

function serializeCapturedMatt(matt) {
  const normalized = normalizeCapturedPartyMember(
    {
      ...matt,
      partyId: makeCapturedPartyId(matt),
      originalId: matt.originalId || matt.id,
      sourceWorld: matt.sourceWorld || state.currentWorld,
    },
    state.capturedParty.length,
  );

  return {
    ...normalized,
    x: matt.x,
    y: matt.y,
    frameIndex: matt.frameIndex,
    direction: matt.direction,
  };
}

function syncCapturedPartyFromActiveMatts() {
  if (!Array.isArray(state.dogmatts)) {
    return;
  }

  const activeCaptured = state.dogmatts.filter((matt) => matt.caught);

  activeCaptured.forEach((matt) => {
    const serialized = serializeCapturedMatt(matt);
    const index = state.capturedParty.findIndex((member) => member.partyId === serialized.partyId);

    if (index >= 0) {
      state.capturedParty[index] = serialized;
    } else if (state.capturedParty.length < MATT_PARTY_LIMIT) {
      state.capturedParty.push(serialized);
    }
  });

  state.capturedParty = state.capturedParty.slice(0, MATT_PARTY_LIMIT);
}

function saveCapturedParty() {
  try {
    syncCapturedPartyFromActiveMatts();
    localStorage.setItem(
      getMattProgressStorageKey(),
      JSON.stringify({ version: 2, party: state.capturedParty }),
    );
  } catch (error) {
    console.warn("Could not save captured Matt party.", error);
  }
}

function hydrateCapturedMatt(saved, caughtIndex) {
  const config = getMattConfig(saved.type);
  const target = getFollowTarget(caughtIndex, config);

  return {
    id: saved.partyId,
    originalId: saved.originalId || saved.id,
    partyId: saved.partyId,
    sourceWorld: saved.sourceWorld || state.currentWorld,
    type: saved.type,
    x: target.x,
    y: target.y,
    width: config.width,
    height: config.height,
    action: "caught",
    frameTimer: 0,
    frameIndex: saved.frameIndex || 0,
    direction: saved.direction || "right",
    wanderAngle: 0,
    wanderTimer: 0,
    hitCount: 4,
    hitCooldown: 0,
    hitReactionTimer: 0,
    caught: true,
    pathId: "",
    pathPointIndex: 0,
    pathRoamMode: "offpath",
    pathRoamTarget: null,
    pathPauseTimer: 0,
    idleSpecialTimer: FIREMATT.specialIdleMin,
    lastSpecialIdleAction: "",
  };
}

function attachCapturedParty(wildMatts) {
  const capturedKeys = new Set(
    state.capturedParty.map((matt) => `${matt.sourceWorld}:${matt.originalId || matt.id}`),
  );
  const uncaughtWildMatts = wildMatts.filter(
    (matt) => !capturedKeys.has(`${state.currentWorld}:${matt.id}`),
  );
  const party = state.capturedParty
    .slice(0, MATT_PARTY_LIMIT)
    .map((matt, index) => hydrateCapturedMatt(matt, index));

  return [...uncaughtWildMatts, ...party];
}

function clearCapturedParty() {
  state.capturedParty = [];
  try {
    localStorage.setItem(getMattProgressStorageKey(), JSON.stringify({ version: 2, party: [] }));
  } catch (error) {
    console.warn("Could not clear captured Matt party.", error);
  }
}

function exportWorlds() {
  if (!devData) {
    return;
  }

  devData.value = JSON.stringify(
    { version: 1, currentWorld: state.currentWorld, worlds: state.worlds },
    null,
    2,
  );
  devData.select();
  setDevStatus("All placements exported.");
}

function exportBuiltInWorlds() {
  if (!devData) {
    return;
  }

  devData.value = `window.DEFAULT_WORLD_DATA = ${JSON.stringify(
    { version: 1, currentWorld: state.currentWorld, worlds: state.worlds },
    null,
    2,
  )};\n`;
  devData.select();
  setDevStatus("Built-in world JS exported for assets/worlds/default-worlds.js.");
}

function importWorlds() {
  if (!devData || !devData.value.trim()) {
    setDevStatus("Paste exported world data first.");
    return;
  }

  try {
    const data = JSON.parse(devData.value);
    applyWorldData(data, "World data imported.");
  } catch (error) {
    setDevStatus("Import failed: invalid JSON.");
  }
}

function loadBuiltInWorlds() {
  const builtInData = getBuiltInWorldData();

  if (!builtInData) {
    setDevStatus("No built-in world data file found.");
    return;
  }

  try {
    clearCapturedParty();
    state.dogmatts = state.dogmatts.filter((matt) => !matt.caught);
    applyWorldData(builtInData, "Built-in world data loaded.");
  } catch (error) {
    setDevStatus("Built-in world data could not be loaded.");
  }
}

function applyWorldData(data, message) {
  state.worlds = normalizeWorldData(data);

  const nextWorld = data && data.currentWorld ? resolveWorldId(data.currentWorld, data) : state.currentWorld;

  setWorld(nextWorld, false);
  saveWorlds();
  respawnWorldEnemies();
  setDevStatus(message);
}

function setDevStatus(message) {
  if (devStatus) {
    devStatus.textContent = message;
  }
}

function getWorldLabel(id) {
  return WORLD_LABELS[id] || id;
}

function updateWorldLabel() {
  if (worldLabel) {
    worldLabel.textContent = `World: ${getWorldLabel(state.currentWorld)}`;
  }
}

function getClockParts() {
  const totalMinutes = Math.floor(state.clockMinutes);
  const day = Math.floor(totalMinutes / 1440) + 1;
  const minuteOfDay = ((totalMinutes % 1440) + 1440) % 1440;
  const hour24 = Math.floor(minuteOfDay / 60);
  const minute = minuteOfDay % 60;
  const suffix = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 || 12;

  return { day, hour24, hour12, minute, suffix };
}

function isNightTime() {
  const { hour24 } = getClockParts();
  return hour24 >= CLOCK.nightStartHour || hour24 < CLOCK.nightEndHour;
}

function updateTimeLabel() {
  if (!timeLabel) {
    return;
  }

  const { day, hour12, minute, suffix } = getClockParts();
  const phase = isNightTime() ? "Night" : "Day";
  timeLabel.textContent = `${phase} ${day} - ${hour12}:${String(minute).padStart(2, "0")} ${suffix}`;
}

function updateClock(dt) {
  const wasNight = state.lastNightState;
  state.clockMinutes += dt * (1440 / CLOCK.realSecondsPerGameDay);
  const night = isNightTime();
  updateTimeLabel();

  if (night !== wasNight) {
    state.lastNightState = night;
    spawnNpcs();
  }
}

function setWorld(id, movePlayer = true) {
  if (!WORLD_IDS.includes(id)) {
    return;
  }

  if (state.ready) {
    saveCapturedParty();
  }

  state.currentWorld = id;
  state.lastPreloadKey = "";
  state.dev.activePathId = null;
  state.dev.activeNpcPathId = null;
  state.dev.activeWallId = null;

  if (movePlayer) {
    const center = getMapCenter(id);
    state.player.x = center.x;
    state.player.y = center.y;
    seedPlayerTrail();
  } else {
    const clamped = clampToCurrentMap(state.player);
    state.player.x = clamped.x;
    state.player.y = clamped.y;
  }

  if (devWorld) {
    devWorld.value = id;
  }

  if (devNodeTarget && id !== DEFAULT_WORLD_ID) {
    devNodeTarget.value = DEFAULT_WORLD_ID;
  }

  updateWorldLabel();
  setDevStatus(`Editing ${getWorldLabel(id)}.`);

  if (state.ready) {
    spawnDogmatts();
    spawnNpcs();
    updateCaughtHud(countCaughtMatts());
    syncCamera();
    preloadNearbyTiles(2);
    draw();
  }
}

function clearCurrentWorld() {
  state.worlds[state.currentWorld] = createEmptyWorld(state.currentWorld);
  state.dev.activePathId = null;
  state.dev.activeWallId = null;
  saveWorlds();
  setDevStatus(`${getWorldLabel(state.currentWorld)} cleared.`);
}

function refreshDogmattPaths() {
  const paths = getWorld().paths;

  state.dogmatts.forEach((dogmatt, index) => {
    if (dogmatt.caught) {
      return;
    }

    dogmatt.pathId = paths.length > 0 ? paths[index % paths.length].id : "";
    dogmatt.pathPointIndex = 0;
  });
}

function refreshNpcPaths() {
  const world = getWorld();
  state.npcs.forEach((npc) => {
    const path = chooseNpcPath(npc.id, world);
    npc.pathId = path ? path.id : "";
    npc.pathPointIndex = path ? (getClosestNpcPathPointIndex(npc, path) ?? 0) : 0;
    npc.targetPointIndex = null;
    scheduleNpcPointWait(npc);
  });
}

function areNpcPathsActiveForWorld(world = getWorld()) {
  return state.currentWorld !== "town" || isNightTime() || state.dev.enabled;
}

function chooseNpcPath(npcId, world = getWorld()) {
  if (!areNpcPathsActiveForWorld(world)) {
    return null;
  }

  const paths = world.npcPaths.filter((path) => path.npcId === npcId && path.points.length > 0);
  return paths.length > 0 ? paths[Math.floor(Math.random() * paths.length)] : null;
}

function getClosestNpcPathPointIndex(npc, path) {
  if (!path || path.points.length === 0) {
    return null;
  }

  let closestIndex = 0;
  let closestDistance = Infinity;

  for (let i = 0; i < path.points.length; i += 1) {
    const distance = Math.hypot(path.points[i].x - npc.x, path.points[i].y - npc.y);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = i;
    }
  }

  return closestIndex;
}

function normalizeNpcPathProgress(npc, path) {
  if (!path || path.points.length === 0) {
    npc.pathPointIndex = 0;
    npc.targetPointIndex = null;
    return;
  }

  if (!Number.isInteger(npc.pathPointIndex) || npc.pathPointIndex < 0 || npc.pathPointIndex >= path.points.length) {
    npc.pathPointIndex = getClosestNpcPathPointIndex(npc, path) ?? 0;
  }

  if (
    Number.isFinite(npc.targetPointIndex) &&
    (!Number.isInteger(npc.targetPointIndex) ||
      npc.targetPointIndex < 0 ||
      npc.targetPointIndex >= path.points.length ||
      Math.abs(npc.targetPointIndex - npc.pathPointIndex) !== 1)
  ) {
    npc.targetPointIndex = null;
  }
}

function chooseAdjacentNpcPathPoint(npc, path, direction) {
  if (!path || path.points.length <= 1) {
    return null;
  }

  normalizeNpcPathProgress(npc, path);

  const currentIndex = npc.pathPointIndex;
  const previousIndex = currentIndex > 0 ? currentIndex - 1 : null;
  const nextIndex = currentIndex < path.points.length - 1 ? currentIndex + 1 : null;

  if (direction === "previous") {
    return previousIndex ?? nextIndex;
  }

  if (direction === "next") {
    return nextIndex ?? previousIndex;
  }

  const options = [previousIndex, nextIndex].filter(Number.isFinite);
  return options.length > 0 ? options[Math.floor(Math.random() * options.length)] : null;
}

function holdNpcAtPathPoint(npc, path) {
  normalizeNpcPathProgress(npc, path);
  const point = path.points[npc.pathPointIndex];
  npc.x = point.x;
  npc.y = point.y;
  npc.targetPointIndex = null;
}

function scheduleNpcPointWait(npc) {
  npc.waitMode = "point";
  npc.waitTimer = randomBetween(NPC.waitMin, NPC.waitMax);
  npc.idleCheckTimer = randomBetween(NPC.idleCheckMin, NPC.idleCheckMax);
}

function scheduleNpcLongWait(npc) {
  npc.waitMode = "long";
  npc.waitTimer = NPC.longWaitDuration;
  npc.idleCheckTimer = randomBetween(NPC.idleCheckMin, NPC.idleCheckMax);
  setAction(npc, "idle");
}

function maybeTriggerNpcIdleAnimation(npc, dt) {
  if (["idleSpecial", "busy", "talk"].includes(npc.action)) {
    return;
  }

  npc.idleCheckTimer -= dt;

  if (npc.idleCheckTimer > 0) {
    return;
  }

  if (Math.random() < NPC.idleAnimationChance) {
    setAction(npc, chooseNpcIdleAction(npc));
  }

  npc.idleCheckTimer = randomBetween(NPC.idleCheckMin, NPC.idleCheckMax);
}

function chooseNpcPathAction(npc, path) {
  if (!path || path.points.length <= 1) {
    scheduleNpcLongWait(npc);
    return;
  }

  const roll = Math.random();

  if (roll < 0.2) {
    setAction(npc, chooseNpcIdleAction(npc));
    scheduleNpcPointWait(npc);
    return;
  }

  if (roll < 0.55) {
    npc.targetPointIndex = chooseAdjacentNpcPathPoint(npc, path, "next");
    scheduleNpcPointWait(npc);
    return;
  }

  if (roll < 0.85) {
    npc.targetPointIndex = chooseAdjacentNpcPathPoint(npc, path, "previous");
    scheduleNpcPointWait(npc);
    return;
  }

  scheduleNpcLongWait(npc);
}

function respawnWorldEnemies() {
  saveCapturedParty();
  spawnDogmatts();
  updateCaughtHud(countCaughtMatts());
  const mattType = getCurrentMattType();
  const label = MATT_LABELS[mattType] || "No enemies";
  setDevStatus(`${label} respawned. Captured party kept.`);
}

function startNewEditorLine() {
  state.dev.activeWallId = null;
  state.dev.activePathId = null;
  state.dev.activeNpcPathId = null;
  setDevStatus("Started a new wall/path line.");
}

function undoActiveEditorPoint() {
  const world = getWorld();

  if (state.dev.tool === "wall" && state.dev.activeWallId) {
    const wall = world.walls.find((candidate) => candidate.id === state.dev.activeWallId);

    if (wall) {
      wall.points.pop();
      if (wall.points.length === 0) {
        world.walls = world.walls.filter((candidate) => candidate !== wall);
        state.dev.activeWallId = null;
      }
      saveWorlds();
      setDevStatus("Last wall point removed.");
      return;
    }
  }

  if (state.dev.tool === "path" && state.dev.activePathId) {
    const path = world.paths.find((candidate) => candidate.id === state.dev.activePathId);

    if (path) {
      path.points.pop();
      if (path.points.length === 0) {
        world.paths = world.paths.filter((candidate) => candidate !== path);
        state.dev.activePathId = null;
      }
      saveWorlds();
      setDevStatus("Last path point removed.");
      return;
    }
  }

  if (state.dev.tool === "npcpath" && state.dev.activeNpcPathId) {
    const path = world.npcPaths.find((candidate) => candidate.id === state.dev.activeNpcPathId);

    if (path) {
      path.points.pop();
      if (path.points.length === 0) {
        world.npcPaths = world.npcPaths.filter((candidate) => candidate !== path);
        state.dev.activeNpcPathId = null;
      }
      saveWorlds();
      setDevStatus("Last NPC path point removed.");
      return;
    }
  }

  setDevStatus("No active line point to remove.");
}

function initDevPanel() {
  if (state.dev.panelReady) {
    if (devWorld) {
      devWorld.value = state.currentWorld;
    }

    if (devNodeTarget) {
      devNodeTarget.value = state.currentWorld === DEFAULT_WORLD_ID ? "town" : DEFAULT_WORLD_ID;
    }

    updateWorldLabel();
    return;
  }

  state.dev.panelReady = true;

  if (devWorld) {
    devWorld.innerHTML = WORLD_IDS.map(
      (id) => `<option value="${id}">${getWorldLabel(id)}</option>`,
    ).join("");
    devWorld.value = state.currentWorld;
    devWorld.addEventListener("change", () => {
      setWorld(devWorld.value);
      saveWorlds();
    });
  }

  if (devNodeTarget) {
    devNodeTarget.innerHTML = WORLD_IDS.map(
      (id) => `<option value="${id}">${getWorldLabel(id)}</option>`,
    ).join("");
    devNodeTarget.value = state.currentWorld === DEFAULT_WORLD_ID ? "town" : DEFAULT_WORLD_ID;
  }

  if (devNpc) {
    devNpc.innerHTML = NPC_IDS.map(
      (id) => `<option value="${id}">${NPC_DEFS[id].name}</option>`,
    ).join("");
    devNpc.value = state.dev.selectedNpcId;
    devNpc.addEventListener("change", () => {
      state.dev.selectedNpcId = devNpc.value;
      state.dev.activeNpcPathId = null;
      setDevStatus(`${NPC_DEFS[devNpc.value]?.name || "NPC"} selected.`);
    });
  }

  if (devTools) {
    devTools.addEventListener("click", (event) => {
      const button = event.target.closest("[data-tool]");

      if (button) {
        setDevTool(button.dataset.tool);
      }
    });
  }

  devClose?.addEventListener("click", () => setDevMode(false));
  devSave?.addEventListener("click", saveWorlds);
  devNewLine?.addEventListener("click", startNewEditorLine);
  devRespawn?.addEventListener("click", respawnWorldEnemies);
  devExport?.addEventListener("click", exportWorlds);
  devExportBuiltIn?.addEventListener("click", exportBuiltInWorlds);
  devImport?.addEventListener("click", importWorlds);
  devLoadBuiltIn?.addEventListener("click", loadBuiltInWorlds);
  devClear?.addEventListener("click", clearCurrentWorld);
  setDevTool(state.dev.tool);
  updateWorldLabel();
}

function setDevMode(enabled) {
  state.dev.enabled = enabled;

  if (devPanel) {
    devPanel.hidden = !enabled;
  }

  if (enabled) {
    resetTouchJoystick();
    setDevStatus(`${getWorldLabel(state.currentWorld)}: ${state.dev.tool} tool ready.`);
  } else {
    state.dev.dragging = null;
    state.dev.activePathId = null;
  }
}

function setDevTool(tool) {
  state.dev.tool = tool;
  state.dev.dragging = null;

  if (tool !== "path") {
    state.dev.activePathId = null;
  }

  if (tool !== "npcpath") {
    state.dev.activeNpcPathId = null;
  }

  if (tool !== "wall") {
    state.dev.activeWallId = null;
  }

  if (devTools) {
    for (const button of devTools.querySelectorAll("[data-tool]")) {
      button.classList.toggle("active", button.dataset.tool === tool);
    }
  }

  const extra =
    tool === "wall"
      ? " Click points. New Line starts another wall."
      : tool === "npcpath"
        ? " Click points for the selected NPC route. New Line starts another route."
        : tool === "npc"
          ? " Click to place the selected NPC."
          : "";
  setDevStatus(`${getWorldLabel(state.currentWorld)}: ${tool} tool selected.${extra}`);
}

function isTypingTarget(target) {
  return ["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(target?.tagName);
}

function screenToWorld(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();

  if (state.dev.enabled) {
    const view = getDevMapView();
    return {
      x: clamp((clientX - rect.left - view.offsetX) / view.scale, 0, getMapWidth()),
      y: clamp((clientY - rect.top - view.offsetY) / view.scale, 0, getMapHeight()),
    };
  }

  return {
    x: state.camera.x + clientX - rect.left,
    y: state.camera.y + clientY - rect.top,
  };
}

function getDevMapView() {
  const mapWidth = getMapWidth();
  const mapHeight = getMapHeight();
  const scale = Math.min(canvas.clientWidth / mapWidth, canvas.clientHeight / mapHeight);
  return {
    scale,
    offsetX: (canvas.clientWidth - mapWidth * scale) / 2,
    offsetY: (canvas.clientHeight - mapHeight * scale) / 2,
  };
}

function normalizeRect(rect) {
  const x = Math.min(rect.x, rect.x + rect.width);
  const y = Math.min(rect.y, rect.y + rect.height);
  return {
    ...rect,
    x,
    y,
    width: Math.abs(rect.width),
    height: Math.abs(rect.height),
  };
}

function pointInRect(point, rect, padding = 0) {
  return (
    point.x >= rect.x - padding &&
    point.x <= rect.x + rect.width + padding &&
    point.y >= rect.y - padding &&
    point.y <= rect.y + rect.height + padding
  );
}

function distanceToSegment(point, a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const lengthSq = dx * dx + dy * dy;

  if (lengthSq === 0) {
    return Math.hypot(point.x - a.x, point.y - a.y);
  }

  const t = clamp(((point.x - a.x) * dx + (point.y - a.y) * dy) / lengthSq, 0, 1);
  const x = a.x + dx * t;
  const y = a.y + dy * t;
  return Math.hypot(point.x - x, point.y - y);
}

function distanceToRect(point, rect) {
  const dx = Math.max(rect.x - point.x, 0, point.x - (rect.x + rect.width));
  const dy = Math.max(rect.y - point.y, 0, point.y - (rect.y + rect.height));
  return Math.hypot(dx, dy);
}

function segmentNearRect(a, b, rect, padding = 0) {
  if (pointInRect(a, rect, padding) || pointInRect(b, rect, padding)) {
    return true;
  }

  const corners = [
    { x: rect.x, y: rect.y },
    { x: rect.x + rect.width, y: rect.y },
    { x: rect.x + rect.width, y: rect.y + rect.height },
    { x: rect.x, y: rect.y + rect.height },
  ];

  return corners.some((corner) => distanceToSegment(corner, a, b) <= padding);
}

function pathOverlapsSpawnArea(path, area, padding = 120) {
  if (!path || !Array.isArray(path.points) || path.points.length === 0) {
    return false;
  }

  const rect = normalizeRect(area);

  if (path.points.some((point) => pointInRect(point, rect, padding) || distanceToRect(point, rect) <= padding)) {
    return true;
  }

  for (let i = 1; i < path.points.length; i += 1) {
    if (segmentNearRect(path.points[i - 1], path.points[i], rect, padding)) {
      return true;
    }
  }

  return false;
}

function getPathLinkedSpawnAreas(spawnAreas, paths) {
  if (!spawnAreas.length || !paths.length) {
    return [];
  }

  return spawnAreas.filter((area) => paths.some((path) => pathOverlapsSpawnArea(path, area)));
}

function randomPointInArea(area, random) {
  const rect = normalizeRect(area);
  return {
    x: rect.x + 40 + random() * Math.max(1, rect.width - 80),
    y: rect.y + 40 + random() * Math.max(1, rect.height - 80),
  };
}

function findClosestPathPoint(point, path) {
  if (!path || !Array.isArray(path.points) || path.points.length === 0) {
    return null;
  }

  let bestPoint = path.points[0];
  let bestIndex = 0;
  let bestDistance = Infinity;

  path.points.forEach((candidate, index) => {
    const distance = Math.hypot(candidate.x - point.x, candidate.y - point.y);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestPoint = candidate;
      bestIndex = index;
    }
  });

  return { point: bestPoint, index: bestIndex, distance: bestDistance };
}

function isPointNearWall(point, wall, padding = 0) {
  if (!Array.isArray(wall.points) || wall.points.length === 0) {
    return false;
  }

  if (wall.points.length === 1) {
    return Math.hypot(point.x - wall.points[0].x, point.y - wall.points[0].y) <= wall.thickness / 2 + padding;
  }

  for (let i = 1; i < wall.points.length; i += 1) {
    if (distanceToSegment(point, wall.points[i - 1], wall.points[i]) <= wall.thickness / 2 + padding) {
      return true;
    }
  }

  return false;
}

function isBlockedAt(x, y, radius = 24) {
  const world = getWorld();
  return world.walls.some((wall) => isPointNearWall({ x, y }, wall, radius));
}

function moveWithWalls(actor, dx, dy, radius = 24) {
  const nextX = clamp(actor.x + dx, 0, getMapWidth());

  if (!isBlockedAt(nextX, actor.y, radius)) {
    actor.x = nextX;
  }

  const nextY = clamp(actor.y + dy, 0, getMapHeight());

  if (!isBlockedAt(actor.x, nextY, radius)) {
    actor.y = nextY;
  }
}

function findPathById(id) {
  return getWorld().paths.find((path) => path.id === id);
}

function handleDevPointerDown(event) {
  const point = screenToWorld(event.clientX, event.clientY);
  const world = getWorld();
  event.preventDefault();

  if (state.dev.tool === "spawn") {
    state.dev.dragging = {
      tool: state.dev.tool,
      startX: point.x,
      startY: point.y,
      currentX: point.x,
      currentY: point.y,
    };
    canvas.setPointerCapture(event.pointerId);
    return;
  }

  if (state.dev.tool === "wall") {
    let wall = state.dev.activeWallId
      ? world.walls.find((candidate) => candidate.id === state.dev.activeWallId)
      : null;

    if (!wall) {
      wall = { id: createId("wall"), points: [], thickness: 70 };
      world.walls.push(wall);
      state.dev.activeWallId = wall.id;
    }

    wall.points.push({ x: point.x, y: point.y });
    saveWorlds();
    setDevStatus(`Wall point added (${wall.points.length}). New Line starts another wall.`);
    return;
  }

  if (state.dev.tool === "path") {
    let path = state.dev.activePathId ? findPathById(state.dev.activePathId) : null;

    if (!path) {
      path = { id: createId("path"), points: [] };
      world.paths.push(path);
      state.dev.activePathId = path.id;
    }

    path.points.push({ x: point.x, y: point.y });
    saveWorlds();
    setDevStatus(`Path point added (${path.points.length}).`);
    return;
  }

  if (state.dev.tool === "npc") {
    const npcId = devNpc?.value || state.dev.selectedNpcId || "scott";
    let npc = world.npcs.find((candidate) => candidate.id === npcId);

    if (!npc) {
      npc = createNpc(npcId, point.x, point.y);
      world.npcs.push(npc);
    } else {
      npc.x = point.x;
      npc.y = point.y;
      npc.pathPointIndex = 0;
      npc.waitTimer = randomBetween(NPC.waitMin, NPC.waitMax);
    }

    state.npcs = world.npcs;
    saveWorlds();
    setDevStatus(`${NPC_DEFS[npcId]?.name || "NPC"} placed.`);
    return;
  }

  if (state.dev.tool === "npcpath") {
    const npcId = devNpc?.value || state.dev.selectedNpcId || "scott";
    let path = state.dev.activeNpcPathId
      ? world.npcPaths.find((candidate) => candidate.id === state.dev.activeNpcPathId)
      : null;

    if (!path || path.npcId !== npcId) {
      path = { id: createId("npcpath"), npcId, points: [] };
      world.npcPaths.push(path);
      state.dev.activeNpcPathId = path.id;
    }

    path.points.push({ x: point.x, y: point.y });
    const npc = world.npcs.find((candidate) => candidate.id === npcId);
    if (npc) {
      npc.pathId = path.id;
      npc.pathPointIndex = 0;
      npc.targetPointIndex = null;
    }
    saveWorlds();
    setDevStatus(`${NPC_DEFS[npcId]?.name || "NPC"} path point added (${path.points.length}).`);
    return;
  }

  if (state.dev.tool === "node") {
    const target = devNodeTarget?.value || "town";
    world.nodes.push({
      id: createId("node"),
      x: point.x,
      y: point.y,
      radius: 82,
      target,
    });
    saveWorlds();
    setDevStatus(`Node to ${getWorldLabel(target)} added.`);
    return;
  }

  if (state.dev.tool === "erase") {
    eraseNearestDevObject(point);
  }
}

function handleDevPointerMove(event) {
  if (!state.dev.dragging) {
    return;
  }

  const point = screenToWorld(event.clientX, event.clientY);
  state.dev.dragging.currentX = point.x;
  state.dev.dragging.currentY = point.y;
}

function handleDevPointerUp(event) {
  if (!state.dev.dragging) {
    return;
  }

  const drag = state.dev.dragging;
  const rect = normalizeRect({
    id: createId(drag.tool),
    x: drag.startX,
    y: drag.startY,
    width: drag.currentX - drag.startX,
    height: drag.currentY - drag.startY,
  });
  state.dev.dragging = null;

  if (rect.width < 18 || rect.height < 18) {
    setDevStatus("Drag a larger area.");
    return;
  }

  const world = getWorld();

  world.spawnAreas.push(rect);
  setDevStatus("Spawn area added.");

  saveWorlds();
  event.preventDefault();
}

function eraseNearestDevObject(point) {
  const world = getWorld();
  const hitRadius = getEditorHitRadius();

  for (const wall of world.walls) {
    const pointIndex = wall.points.findIndex(
      (wallPoint) => Math.hypot(wallPoint.x - point.x, wallPoint.y - point.y) < hitRadius,
    );

    if (pointIndex !== -1) {
      wall.points.splice(pointIndex, 1);
      if (wall.points.length === 0) {
        world.walls = world.walls.filter((candidate) => candidate !== wall);
      }
      saveWorlds();
      setDevStatus("Wall point erased.");
      return;
    }

    if (isPointNearWall(point, wall, hitRadius * 0.45)) {
      world.walls = world.walls.filter((candidate) => candidate !== wall);
      saveWorlds();
      setDevStatus("Wall line erased.");
      return;
    }
  }

  const collections = [
    ["spawnAreas", world.spawnAreas],
    ["nodes", world.nodes],
  ];

  for (const [name, collection] of collections) {
    const index = collection.findIndex((item) => {
      if (name === "nodes") {
        return Math.hypot(item.x - point.x, item.y - point.y) <= item.radius + 18;
      }

      return pointInRect(point, item, 8);
    });

    if (index !== -1) {
      collection.splice(index, 1);
      saveWorlds();
      setDevStatus(`${name} item erased.`);
      return;
    }
  }

  for (const path of world.paths) {
    const pointIndex = path.points.findIndex(
      (pathPoint) => Math.hypot(pathPoint.x - point.x, pathPoint.y - point.y) < hitRadius,
    );

    if (pointIndex !== -1) {
      path.points.splice(pointIndex, 1);
      if (path.points.length === 0) {
        world.paths = world.paths.filter((candidate) => candidate !== path);
      }
      saveWorlds();
      setDevStatus("Path point erased.");
      return;
    }
  }

  for (const path of world.npcPaths) {
    const pointIndex = path.points.findIndex(
      (pathPoint) => Math.hypot(pathPoint.x - point.x, pathPoint.y - point.y) < hitRadius,
    );

    if (pointIndex !== -1) {
      path.points.splice(pointIndex, 1);
      if (path.points.length === 0) {
        world.npcPaths = world.npcPaths.filter((candidate) => candidate !== path);
      }
      saveWorlds();
      setDevStatus("NPC path point erased.");
      return;
    }
  }

  const npcIndex = world.npcs.findIndex((npc) => Math.hypot(npc.x - point.x, npc.y - point.y) < hitRadius);
  if (npcIndex !== -1) {
    const [npc] = world.npcs.splice(npcIndex, 1);
    state.npcs = world.npcs;
    saveWorlds();
    setDevStatus(`${NPC_DEFS[npc.id]?.name || "NPC"} erased.`);
    return;
  }

  setDevStatus("Nothing nearby to erase.");
}

function getEditorHitRadius() {
  if (!state.dev.enabled) {
    return 28;
  }

  return Math.max(28, 16 / getDevMapView().scale);
}

function syncCamera() {
  const viewWidth = canvas.clientWidth;
  const viewHeight = canvas.clientHeight;
  const maxX = Math.max(0, getMapWidth() - viewWidth);
  const maxY = Math.max(0, getMapHeight() - viewHeight);
  state.camera.x = clamp(state.player.x - viewWidth / 2, 0, maxX);
  state.camera.y = clamp(state.player.y - viewHeight / 2, 0, maxY);
}

function seedPlayerTrail() {
  const player = state.player;
  const points = [];

  for (let i = 0; i < PLAYER.maxTrailPoints; i += 1) {
    points.push({
      x: player.x - player.facingX * i * PLAYER.trailSpacing,
      y: player.y - player.facingY * i * PLAYER.trailSpacing,
      facingX: player.facingX,
      facingY: player.facingY,
    });
  }

  player.trail = points;
}

function updatePlayerTrail() {
  const player = state.player;
  const last = player.trail[0];

  if (!last || distanceBetween(player, last) >= PLAYER.trailSpacing) {
    player.trail.unshift({
      x: player.x,
      y: player.y,
      facingX: player.facingX,
      facingY: player.facingY,
    });
  }

  if (player.trail.length > PLAYER.maxTrailPoints) {
    player.trail.length = PLAYER.maxTrailPoints;
  }
}

function getTrailPoint(distanceBack) {
  const trail = state.player.trail;

  if (trail.length === 0) {
    return {
      x: state.player.x,
      y: state.player.y,
      facingX: state.player.facingX,
      facingY: state.player.facingY,
    };
  }

  let traveled = 0;

  for (let i = 1; i < trail.length; i += 1) {
    const current = trail[i - 1];
    const next = trail[i];
    const segment = distanceBetween(current, next);

    if (traveled + segment >= distanceBack) {
      const amount = segment === 0 ? 0 : (distanceBack - traveled) / segment;
      return {
        x: current.x + (next.x - current.x) * amount,
        y: current.y + (next.y - current.y) * amount,
        facingX: current.facingX,
        facingY: current.facingY,
      };
    }

    traveled += segment;
  }

  return trail[trail.length - 1];
}

function getFollowTarget(caughtIndex, config = DOGMATT) {
  const row = Math.floor(caughtIndex / 3);
  const lane = (caughtIndex % 3) - 1;
  const trailPoint = getTrailPoint(115 + row * config.followBackSpacing);
  const sideWave = state.player.moving ? Math.sin(state.time * 2.4 + caughtIndex * 1.7) * 8 : 0;
  const sideOffset = lane * config.followSideSpacing + sideWave;
  const perpX = -trailPoint.facingY;
  const perpY = trailPoint.facingX;

  return {
    x: clamp(trailPoint.x + perpX * sideOffset, 0, getMapWidth()),
    y: clamp(trailPoint.y + perpY * sideOffset, 0, getMapHeight()),
  };
}

function getCurrentMattType() {
  return WORLD_MATT_TYPES[state.currentWorld] || "";
}

function getMattConfig(type) {
  return MATT_CONFIGS[type] || DOGMATT;
}

function chooseRandomPath(paths, random = Math.random) {
  if (!paths.length) {
    return null;
  }

  return paths[Math.floor(random() * paths.length)];
}

function choosePathRoamTarget(matt, path, random = Math.random) {
  if (!path || !Array.isArray(path.points) || path.points.length === 0) {
    return null;
  }

  const anchor = path.points[Math.floor(random() * path.points.length)];
  const angle = random() * Math.PI * 2;
  const radius = 35 + random() * 155;

  return {
    x: clamp(anchor.x + Math.cos(angle) * radius, 0, getMapWidth()),
    y: clamp(anchor.y + Math.sin(angle) * radius, 0, getMapHeight()),
  };
}

function scheduleFiremattSpecialIdle(firematt, random = Math.random) {
  firematt.idleSpecialTimer =
    FIREMATT.specialIdleMin + random() * (FIREMATT.specialIdleMax - FIREMATT.specialIdleMin);
}

function spawnDogmatts() {
  const type = getCurrentMattType();
  if (!type) {
    state.dogmatts = attachCapturedParty([]);
    return;
  }

  const config = getMattConfig(type);
  const random = seededRandom(4281);
  const dogmatts = [];
  const nearbyDogmatts = 6;
  const spawnAreas = getWorld().spawnAreas;
  const paths = getWorld().paths;
  const pathSpawnAreas = getPathLinkedSpawnAreas(spawnAreas, paths);
  const activeSpawnAreas = pathSpawnAreas.length > 0 ? pathSpawnAreas : spawnAreas;
  const mapWidth = getMapWidth();
  const mapHeight = getMapHeight();
  const margin = Math.min(600, Math.max(80, Math.min(mapWidth, mapHeight) * 0.12));

  for (let index = 0; index < config.count; index += 1) {
    let x = margin + random() * Math.max(1, mapWidth - margin * 2);
    let y = margin + random() * Math.max(1, mapHeight - margin * 2);

    if (activeSpawnAreas.length > 0) {
      const area = activeSpawnAreas[Math.floor(random() * activeSpawnAreas.length)];
      const spawnPoint = randomPointInArea(area, random);
      x = clamp(spawnPoint.x, 0, mapWidth);
      y = clamp(spawnPoint.y, 0, mapHeight);
    } else if (index < nearbyDogmatts) {
      const angle = (index / nearbyDogmatts) * Math.PI * 2;
      const radius = index % 2 === 0 ? 320 : 500;
      x = clamp(state.player.x + Math.cos(angle) * radius, 0, mapWidth);
      y = clamp(state.player.y + Math.sin(angle) * radius, 0, mapHeight);
    } else if (Math.hypot(x - state.player.x, y - state.player.y) < 850) {
      x = clamp(x + 1200, margin, mapWidth - margin);
      y = clamp(y - 900, margin, mapHeight - margin);
    }

    const path = chooseRandomPath(paths, random);
    const closestPathPoint = path ? findClosestPathPoint({ x, y }, path) : null;
    const matt = {
      id: `${type}-${index + 1}`,
      type,
      x,
      y,
      width: config.width,
      height: config.height,
      action: "walking",
      frameTimer: random() * 0.18,
      frameIndex: 0,
      direction: random() > 0.5 ? "right" : "left",
      wanderAngle: random() * Math.PI * 2,
      wanderTimer: 0.8 + random() * 2.4,
      hitCount: 0,
      hitCooldown: 0,
      hitReactionTimer: 0,
      caught: false,
      pathId: path ? path.id : "",
      pathPointIndex: closestPathPoint ? closestPathPoint.index : 0,
      pathRoamMode: random() > 0.28 ? "path" : "offpath",
      pathRoamTarget: path ? choosePathRoamTarget(null, path, random) : null,
      pathPauseTimer: random() > 0.76 ? 0.6 + random() * 1.9 : 0,
    };

    if (type === "firematt") {
      scheduleFiremattSpecialIdle(matt, random);
    }

    dogmatts.push(matt);
  }

  state.dogmatts = attachCapturedParty(dogmatts);
}

function spawnNpcs() {
  const world = getWorld();
  const npcs = [...world.npcs];

  if (state.currentWorld === "town" && isNightTime()) {
    for (const npcId of NPC_IDS) {
      if (npcs.some((npc) => npc.id === npcId)) {
        continue;
      }

      const path = chooseNpcPath(npcId, world);
      if (!path || path.points.length === 0) {
        continue;
      }

      const start = path.points[Math.floor(Math.random() * path.points.length)];
      const npc = createNpc(npcId, start.x, start.y);
      npc.pathId = path.id;
      npc.pathPointIndex = path.points.indexOf(start);
      npc.waitTimer = randomBetween(NPC.waitMin, NPC.waitMax);
      npcs.push(npc);
    }
  }

  state.npcs = npcs;
  refreshNpcPaths();
}

function tileKey(col, row) {
  return `${state.currentWorld}:${col},${row}`;
}

function loadTile(col, row) {
  const map = getWorldMapConfig();
  if (map.type !== "tiles") {
    return null;
  }

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
  tile.image.src = map.tilePath(col, row);

  tileCache.set(key, tile);
  pruneTileCache();
  return tile;
}

function getTileRange(buffer = 0) {
  const map = getWorldMapConfig();
  if (map.type !== "tiles") {
    return { left: 0, right: -1, top: 0, bottom: -1 };
  }

  const left = clamp(
    Math.floor(state.camera.x / map.tileSize) - buffer,
    0,
    map.columns - 1,
  );
  const right = clamp(
    Math.floor((state.camera.x + canvas.clientWidth) / map.tileSize) + buffer,
    0,
    map.columns - 1,
  );
  const top = clamp(
    Math.floor(state.camera.y / map.tileSize) - buffer,
    0,
    map.rows - 1,
  );
  const bottom = clamp(
    Math.floor((state.camera.y + canvas.clientHeight) / map.tileSize) + buffer,
    0,
    map.rows - 1,
  );

  return { left, right, top, bottom };
}

function preloadNearbyTiles(buffer = 1) {
  if (getWorldMapConfig().type !== "tiles") {
    return [];
  }

  const range = getTileRange(buffer);
  return preloadTileRange(range);
}

function preloadTileRange(range) {
  const promises = [];

  for (let row = range.top; row <= range.bottom; row += 1) {
    for (let col = range.left; col <= range.right; col += 1) {
      const tile = loadTile(col, row);
      if (tile) {
        promises.push(tile.promise);
      }
    }
  }

  return promises;
}

function preloadNearbyTilesIfNeeded(buffer = 1) {
  if (getWorldMapConfig().type !== "tiles") {
    state.lastPreloadKey = "";
    return [];
  }

  const range = getTileRange(buffer);
  const key = `${range.left},${range.right},${range.top},${range.bottom}`;

  if (key === state.lastPreloadKey) {
    return [];
  }

  state.lastPreloadKey = key;
  return preloadTileRange(range);
}

function pruneTileCache() {
  const maxCachedTiles = WORLD_MAPS[DEFAULT_WORLD_ID].maxCachedTiles;
  if (tileCache.size <= maxCachedTiles) {
    return;
  }

  const overflow = tileCache.size - maxCachedTiles;
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

  if (state.dev.enabled) {
    player.moving = false;
    setAction(player, "idle");
    advanceAnimation(player, images.ivan[player.action].length, 0.13, dt);
    updatePlayerTrail();
    return;
  }

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
  player.moving = moving;

  if (moving) {
    const speed = keys.has("shift") || touchInput.sprint ? player.sprintSpeed : player.speed;
    moveWithWalls(player, moveX * speed * dt, moveY * speed * dt, 28);
    player.facingX = moveX;
    player.facingY = moveY;

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
  updatePlayerTrail();
}

function cryingActionForHits(hitCount) {
  if (hitCount <= 0) {
    return "";
  }

  return `crying${Math.min(hitCount, 3)}`;
}

function isFiremattSpecialIdle(action) {
  return action === "idleNormal" || action === "idleHammer" || action === "idleNose";
}

function getFiremattSpecialIdleAction(firematt) {
  const actions = ["idleNormal", "idleHammer", "idleNose"];
  const index = Math.floor(randomBetween(0, actions.length));
  const previousIndex = actions.indexOf(firematt.lastSpecialIdleAction);
  const nextIndex = index === previousIndex ? (index + 1) % actions.length : index;
  firematt.lastSpecialIdleAction = actions[nextIndex];
  return actions[nextIndex];
}

function setWildMattBaseAction(matt, action, dt) {
  if (matt.type !== "firematt" || action !== "idle") {
    setAction(matt, action);
    return;
  }

  if (isFiremattSpecialIdle(matt.action)) {
    return;
  }

  matt.idleSpecialTimer = Math.max(0, (matt.idleSpecialTimer || 0) - dt);

  if (matt.idleSpecialTimer <= 0) {
    setAction(matt, getFiremattSpecialIdleAction(matt));
    return;
  }

  setAction(matt, "idle");
}

function updateMattPathRoam(matt, path, config, dt) {
  if (!path || !Array.isArray(path.points) || path.points.length === 0) {
    return false;
  }

  if (matt.pathPauseTimer > 0) {
    matt.pathPauseTimer = Math.max(0, matt.pathPauseTimer - dt);
    setWildMattBaseAction(matt, "idle", dt);
    return false;
  }

  if (!matt.pathRoamTarget || Math.random() < dt * 0.18) {
    if (matt.pathRoamMode !== "offpath" && Math.random() < 0.32) {
      matt.pathRoamMode = "offpath";
    } else {
      matt.pathRoamMode = "path";
    }

    if (matt.pathRoamMode === "path") {
      matt.pathPointIndex = Math.floor(Math.random() * path.points.length);
      matt.pathRoamTarget = path.points[matt.pathPointIndex];
    } else {
      matt.pathRoamTarget = choosePathRoamTarget(matt, path);
    }
  }

  const target = matt.pathRoamTarget;
  const dx = target.x - matt.x;
  const dy = target.y - matt.y;
  const distance = Math.hypot(dx, dy) || 1;

  if (distance < 26) {
    if (Math.random() < 0.36) {
      matt.pathPauseTimer = 0.45 + Math.random() * 1.6;
    }

    if (matt.pathRoamMode === "path" && Math.random() < 0.58) {
      const step = Math.random() < 0.5 ? -1 : 1;
      matt.pathPointIndex = (matt.pathPointIndex + step + path.points.length) % path.points.length;
      matt.pathRoamTarget = path.points[matt.pathPointIndex];
    } else {
      matt.pathRoamMode = Math.random() < 0.48 ? "offpath" : "path";
      matt.pathRoamTarget =
        matt.pathRoamMode === "offpath"
          ? choosePathRoamTarget(matt, path)
          : path.points[Math.floor(Math.random() * path.points.length)];
    }

    return false;
  }

  const roamSpeed = config.wanderSpeed * (matt.pathRoamMode === "offpath" ? 0.72 : 1);
  const moveX = dx / distance;
  const moveY = dy / distance;
  matt.x = clamp(matt.x + moveX * roamSpeed * dt, 0, getMapWidth());
  matt.y = clamp(matt.y + moveY * roamSpeed * dt, 0, getMapHeight());
  matt.direction = moveX < 0 ? "left" : "right";
  return true;
}

function updateWildDogmatt(dogmatt, dt) {
  const config = getMattConfig(dogmatt.type);
  const player = state.player;
  const dx = dogmatt.x - player.x;
  const dy = dogmatt.y - player.y;
  const distance = Math.hypot(dx, dy) || 1;
  let moving = false;

  dogmatt.hitCooldown = Math.max(0, dogmatt.hitCooldown - dt);
  dogmatt.hitReactionTimer = Math.max(0, (dogmatt.hitReactionTimer || 0) - dt);

  if (distance < config.fleeRadius) {
    const moveX = dx / distance;
    const moveY = dy / distance;
    dogmatt.x = clamp(dogmatt.x + moveX * config.fleeSpeed * dt, 0, getMapWidth());
    dogmatt.y = clamp(dogmatt.y + moveY * config.fleeSpeed * dt, 0, getMapHeight());
    dogmatt.direction = moveX < 0 ? "left" : "right";
    moving = true;
  } else if (distance < config.noticeRadius) {
    setWildMattBaseAction(dogmatt, "idle", dt);
  } else {
    const path = dogmatt.pathId
      ? getWorld().paths.find((candidate) => candidate.id === dogmatt.pathId)
      : null;

    if (path && path.points.length > 0) {
      moving = updateMattPathRoam(dogmatt, path, config, dt);
    } else {
      dogmatt.wanderTimer -= dt;

      if (dogmatt.wanderTimer <= 0) {
        dogmatt.wanderAngle = Math.random() * Math.PI * 2;
        dogmatt.wanderTimer = 0.7 + Math.random() * 2.2;
      }

      const moveX = Math.cos(dogmatt.wanderAngle);
      const moveY = Math.sin(dogmatt.wanderAngle);
      dogmatt.x = clamp(dogmatt.x + moveX * config.wanderSpeed * dt, 0, getMapWidth());
      dogmatt.y = clamp(dogmatt.y + moveY * config.wanderSpeed * dt, 0, getMapHeight());
      dogmatt.direction = moveX < 0 ? "left" : "right";
      moving = true;
    }
  }

  if (dogmatt.type === "firematt" && dogmatt.hitReactionTimer > 0) {
    setAction(dogmatt, "hit");
  } else if (dogmatt.hitCount > 0 && dogmatt.type === "dogmatt") {
    setAction(dogmatt, cryingActionForHits(dogmatt.hitCount));
  } else if (moving) {
    setAction(dogmatt, "walking");
  }
}

function updateCaughtDogmatt(dogmatt, dt, caughtIndex) {
  const config = getMattConfig(dogmatt.type);
  const target = getFollowTarget(caughtIndex, config);
  const dx = target.x - dogmatt.x;
  const dy = target.y - dogmatt.y;
  const distance = Math.hypot(dx, dy) || 1;
  let moved = false;

  if (distance > config.followStopDistance) {
    const catchup = Math.min(620, distance * 2.6);
    const speed = Math.min((config.followSpeed + catchup) * dt, distance);
    dogmatt.x = clamp(dogmatt.x + (dx / distance) * speed, 0, getMapWidth());
    dogmatt.y = clamp(dogmatt.y + (dy / distance) * speed, 0, getMapHeight());
    dogmatt.direction = dx < 0 ? "left" : "right";
    moved = true;
  }

  dogmatt.caughtAnimationPaused = !state.player.moving && !moved;
  setAction(dogmatt, "caught");
}

function getMattFrames(matt) {
  const frameSet = images[matt.type] || images.dogmatt;
  return frameSet[matt.action] || frameSet.idle || images.dogmatt.idle;
}

function advanceMattAnimation(matt, dt) {
  const frames = getMattFrames(matt);
  if (!frames || frames.length === 0) {
    return;
  }

  if (matt.caught && matt.caughtAnimationPaused) {
    matt.frameIndex = clamp(Math.floor(matt.frameIndex || 0), 0, frames.length - 1);
    matt.frameTimer = 0;
    return;
  }

  if (matt.type === "firematt" && isFiremattSpecialIdle(matt.action)) {
    matt.frameTimer += dt;

    if (matt.frameTimer >= 0.095) {
      matt.frameTimer = 0;

      if (matt.frameIndex < frames.length - 1) {
        matt.frameIndex += 1;
      } else {
        setAction(matt, "idle");
        scheduleFiremattSpecialIdle(matt);
      }
    }

    return;
  }

  const frameDuration = matt.action === "caught" ? 0.16 : matt.type === "firematt" ? 0.095 : 0.2;
  advanceAnimation(matt, frames.length, frameDuration, dt);
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

    advanceMattAnimation(dogmatt, dt);
  }

  updateCaughtHud(countCaughtMatts());
}

function countCaughtMatts() {
  return state.capturedParty.length;
}

function updateCaughtHud(caughtCount) {
  if (state.caughtDogmatts === caughtCount) {
    return;
  }

  state.caughtDogmatts = caughtCount;

  if (caughtCounter) {
    caughtCounter.textContent = `Matts caught: ${caughtCount} / ${MATT_PARTY_LIMIT}`;
  }

  monsterSlots.forEach((slot, index) => {
    slot.classList.toggle("caught", index < caughtCount);
  });
}

function addParticle(particle) {
  state.particles.push({
    maxLife: particle.life,
    gravity: 0,
    spin: 0,
    rotation: 0,
    ...particle,
  });

  if (state.particles.length > PARTICLES.max) {
    state.particles.splice(0, state.particles.length - PARTICLES.max);
  }
}

function spawnAmbientMotes(dt) {
  state.ambientTimer -= dt;

  if (state.ambientTimer > 0) {
    return;
  }

  state.ambientTimer = PARTICLES.ambientRate + Math.random() * 0.12;

  if (state.particles.length > PARTICLES.max - 40) {
    return;
  }

  addParticle({
    type: "mote",
    x: state.camera.x + randomBetween(0, canvas.clientWidth),
    y: state.camera.y + randomBetween(0, canvas.clientHeight),
    vx: randomBetween(-6, 12),
    vy: randomBetween(-26, -8),
    life: randomBetween(1.6, 3.4),
    size: randomBetween(2, 5),
    color: "rgba(255, 238, 143, 0.9)",
  });
}

function spawnWhipEffect() {
  const player = state.player;
  const facing = directionToVector(player.direction);
  const forwardX = player.facingX || facing.x;
  const forwardY = player.facingY || facing.y;
  const perpX = -forwardY;
  const perpY = forwardX;
  const originX = player.x + forwardX * 42;
  const originY = player.y + forwardY * 28;

  for (let i = 0; i < 22; i += 1) {
    const arc = (i / 21 - 0.5) * 2.2;
    const reach = randomBetween(48, PLAYER.attackRange * 0.85);
    const side = Math.sin(arc) * 82;

    addParticle({
      type: "slash",
      x: originX + forwardX * reach + perpX * side,
      y: originY + forwardY * reach + perpY * side,
      vx: forwardX * randomBetween(120, 260) + perpX * randomBetween(-70, 70),
      vy: forwardY * randomBetween(120, 260) + perpY * randomBetween(-70, 70),
      life: randomBetween(0.14, 0.26),
      size: randomBetween(8, 18),
      color: "rgba(255, 238, 175, 0.95)",
      rotation: Math.atan2(forwardY, forwardX) + arc,
      spin: randomBetween(-5, 5),
    });
  }
}

function spawnHitEffect(target, hitCount) {
  const colors = ["#ffe8a6", "#f8ae73", "#e9706f"];

  for (let i = 0; i < 18; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = randomBetween(80, 280);

    addParticle({
      type: "spark",
      x: target.x + randomBetween(-18, 18),
      y: target.y - randomBetween(22, 72),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 80,
      gravity: 360,
      life: randomBetween(0.32, 0.62),
      size: randomBetween(3, 7),
      color: colors[Math.min(hitCount - 1, colors.length - 1)],
    });
  }
}

function spawnCaptureEffect(target) {
  for (let i = 0; i < 42; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = randomBetween(100, 360);

    addParticle({
      type: i % 4 === 0 ? "ring" : "spark",
      x: target.x,
      y: target.y - 52,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 80,
      gravity: 260,
      life: randomBetween(0.55, 1.05),
      size: randomBetween(4, 12),
      color: i % 3 === 0 ? "#8ff3c5" : "#fff0a8",
    });
  }
}

function updateParticles(dt) {
  spawnAmbientMotes(dt);

  for (const particle of state.particles) {
    particle.life -= dt;
    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;
    particle.vy += particle.gravity * dt;
    particle.rotation += particle.spin * dt;
  }

  state.particles = state.particles.filter((particle) => particle.life > 0);
  state.screenShake = Math.max(0, state.screenShake - dt * 34);
}

function getNpcFrames(npc) {
  const frameSet = images.npcs[npc.id];
  if (!frameSet) {
    return [];
  }

  return frameSet[npc.action] || frameSet.idle || [];
}

function chooseNpcIdleAction(npc) {
  const frameSet = images.npcs[npc.id] || {};
  const options = ["idleSpecial", "busy", "talk"].filter(
    (action) => Array.isArray(frameSet[action]) && frameSet[action].length > 0,
  );
  return options.length > 0 ? options[Math.floor(Math.random() * options.length)] : "idle";
}

function updateNpc(npc, dt) {
  const world = getWorld();
  let path = npc.pathId ? world.npcPaths.find((candidate) => candidate.id === npc.pathId) : null;
  let moving = false;

  if (!path || !areNpcPathsActiveForWorld(world)) {
    path = chooseNpcPath(npc.id, world);
    npc.pathId = path ? path.id : "";
    npc.targetPointIndex = null;
    if (path) {
      npc.pathPointIndex = getClosestNpcPathPointIndex(npc, path) ?? 0;
    }
  }

  if (path && path.points.length > 0) {
    normalizeNpcPathProgress(npc, path);

    if (!Number.isFinite(npc.targetPointIndex)) {
      holdNpcAtPathPoint(npc, path);
      npc.waitTimer -= dt;

      if (npc.waitMode === "long") {
        maybeTriggerNpcIdleAnimation(npc, dt);
      }

      if (npc.waitTimer <= 0) {
        chooseNpcPathAction(npc, path);
      }
    }

    const target = Number.isFinite(npc.targetPointIndex) ? path.points[npc.targetPointIndex] : null;

    if (!target) {
      if (npc.action === "walking") {
        setAction(npc, "idle");
      }

      const frames = getNpcFrames(npc);
      if (frames.length > 0) {
        const duration = npc.action === "walking" ? 0.11 : 0.14;

        if (["idleSpecial", "busy", "talk"].includes(npc.action)) {
          npc.frameTimer += dt;
          if (npc.frameTimer >= duration) {
            npc.frameTimer = 0;
            if (npc.frameIndex < frames.length - 1) {
              npc.frameIndex += 1;
            } else {
              setAction(npc, "idle");
            }
          }
        } else {
          advanceAnimation(npc, frames.length, duration, dt);
        }
      }

      return;
    }

    const dx = target.x - npc.x;
    const dy = target.y - npc.y;
    const distance = Math.hypot(dx, dy) || 1;

    if (distance <= NPC.stopDistance) {
      npc.pathPointIndex = npc.targetPointIndex;
      holdNpcAtPathPoint(npc, path);
      scheduleNpcPointWait(npc);
    } else {
      const speed = Math.min(NPC.speed * dt, distance);
      npc.x = clamp(npc.x + (dx / distance) * speed, 0, getMapWidth());
      npc.y = clamp(npc.y + (dy / distance) * speed, 0, getMapHeight());
      npc.direction = dx < 0 ? "left" : "right";
      moving = true;
    }
  } else {
    npc.waitTimer -= dt;
    if (npc.waitTimer <= 0) {
      setAction(npc, chooseNpcIdleAction(npc));
      npc.waitTimer = randomBetween(5, 12);
    }
  }

  if (moving) {
    setAction(npc, "walking");
  } else if (npc.action === "walking") {
    setAction(npc, "idle");
  }

  const frames = getNpcFrames(npc);
  if (frames.length > 0) {
    const duration = npc.action === "walking" ? 0.11 : 0.14;

    if (["idleSpecial", "busy", "talk"].includes(npc.action)) {
      npc.frameTimer += dt;
      if (npc.frameTimer >= duration) {
        npc.frameTimer = 0;
        if (npc.frameIndex < frames.length - 1) {
          npc.frameIndex += 1;
        } else {
          setAction(npc, "idle");
        }
      }
    } else {
      advanceAnimation(npc, frames.length, duration, dt);
    }
  }
}

function updateNpcs(dt) {
  for (const npc of state.npcs) {
    updateNpc(npc, dt);
  }
}

function update(dt) {
  state.time += dt;
  updateClock(dt);
  updatePlayer(dt);
  updateNpcs(dt);
  updateDogmatts(dt);
  updateParticles(dt);
  syncCamera();
  preloadNearbyTilesIfNeeded(2);
}

function hitDogmatt(dogmatt) {
  dogmatt.hitCooldown = 0.25;
  dogmatt.hitReactionTimer = 0.55;
  dogmatt.hitCount += 1;
  dogmatt.frameIndex = 0;
  dogmatt.frameTimer = 0;
  spawnHitEffect(dogmatt, dogmatt.hitCount);
  addScreenShake(5);

  if (dogmatt.hitCount >= 4) {
    if (state.capturedParty.length >= MATT_PARTY_LIMIT) {
      dogmatt.hitCount = 3;
      setAction(dogmatt, dogmatt.type === "firematt" ? "hit" : cryingActionForHits(dogmatt.hitCount));
      playHitSound(dogmatt.hitCount);
      setDevStatus(`Party full: ${MATT_PARTY_LIMIT} Matts max.`);
      return;
    }

    dogmatt.hitCount = 4;
    dogmatt.caught = true;
    dogmatt.sourceWorld = state.currentWorld;
    dogmatt.originalId = dogmatt.originalId || dogmatt.id;
    dogmatt.partyId = makeCapturedPartyId(dogmatt);
    setAction(dogmatt, "caught");
    state.capturedParty.push(serializeCapturedMatt(dogmatt));
    state.capturedParty = state.capturedParty.slice(0, MATT_PARTY_LIMIT);
    spawnCaptureEffect(dogmatt);
    playCaptureSound();
    addScreenShake(10);
    updateCaughtHud(countCaughtMatts());
    saveCapturedParty();
    return;
  }

  playHitSound(dogmatt.hitCount);
  setAction(dogmatt, dogmatt.type === "firematt" ? "hit" : cryingActionForHits(dogmatt.hitCount));
}

function applyWhipHit() {
  let closestDogmatt = null;
  let bestScore = Infinity;
  const facing = directionToVector(state.player.direction);
  const forwardX = state.player.facingX || facing.x;
  const forwardY = state.player.facingY || facing.y;

  for (const dogmatt of state.dogmatts) {
    if (dogmatt.caught || dogmatt.hitCooldown > 0) {
      continue;
    }

    const dx = dogmatt.x - state.player.x;
    const dy = dogmatt.y - state.player.y;
    const distance = Math.hypot(dx, dy) || 1;
    const dot = (dx / distance) * forwardX + (dy / distance) * forwardY;
    const inWhipArc = distance < 92 || dot > 0.12;

    if (inWhipArc && distance < PLAYER.attackRange) {
      const score = distance - dot * 80;

      if (score < bestScore) {
        bestScore = score;
        closestDogmatt = dogmatt;
      }
    }
  }

  if (closestDogmatt) {
    hitDogmatt(closestDogmatt);
  }
}

function drawMap() {
  const map = getWorldMapConfig();
  ctx.fillStyle = map.fill || "#18201d";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  if (map.type === "image") {
    const image = images.worldMaps[state.currentWorld];
    if (image) {
      ctx.drawImage(
        image,
        Math.round(-state.camera.x),
        Math.round(-state.camera.y),
        map.width,
        map.height,
      );
    }
  } else if (map.type === "tiles") {
    const range = getTileRange();

    for (let row = range.top; row <= range.bottom; row += 1) {
      for (let col = range.left; col <= range.right; col += 1) {
        const tile = loadTile(col, row);
        const worldX = col * map.tileSize;
        const worldY = row * map.tileSize;
        const screenX = Math.round(worldX - state.camera.x);
        const screenY = Math.round(worldY - state.camera.y);

        if (tile && tile.loaded) {
          ctx.drawImage(tile.image, screenX, screenY);
        } else {
          ctx.fillStyle = map.fill || "#18201d";
          ctx.fillRect(screenX, screenY, map.tileSize, map.tileSize);
        }
      }
    }
  }

  ctx.fillStyle = WORLD_TINTS[state.currentWorld] || "rgba(255, 255, 255, 0)";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

function drawMapOverview() {
  ctx.fillStyle = "#0b0f0d";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  const map = getWorldMapConfig();
  const view = getDevMapView();
  ctx.save();
  ctx.translate(view.offsetX, view.offsetY);
  ctx.scale(view.scale, view.scale);
  ctx.fillStyle = map.fill || "#18201d";
  ctx.fillRect(0, 0, map.width, map.height);

  const overviewImage = images.worldMaps[state.currentWorld];
  if (overviewImage) {
    ctx.drawImage(overviewImage, 0, 0, map.width, map.height);
  }

  ctx.fillStyle = WORLD_TINTS[state.currentWorld] || "rgba(255, 255, 255, 0)";
  ctx.fillRect(0, 0, map.width, map.height);
  drawOverviewActors();
  drawWorldEditorObjects();
  ctx.restore();
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

function getInnActorScale() {
  return ["town_inn", "town_inn_rooms", "town_mattstore"].includes(state.currentWorld) ? 2 : 1;
}

function getPlayerRenderScale() {
  return ["town_blacksmith", "town_arena_entrance"].includes(state.currentWorld) ? 3 : getInnActorScale();
}

function drawPlayerShadow() {
  const player = state.player;
  const scale = getPlayerRenderScale();
  const screenX = player.x - state.camera.x;
  const screenY = player.y - state.camera.y;

  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  ctx.beginPath();
  ctx.ellipse(screenX, screenY + 10, 42 * scale, 16 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawPlayer() {
  const player = state.player;
  const frames = images.ivan[player.action];
  const sprite = frames[player.frameIndex % frames.length];
  const scale = getPlayerRenderScale();
  const screenX = Math.round(player.x - state.camera.x);
  const screenY = Math.round(player.y - state.camera.y);
  const facingLeft = player.direction === "left";

  ctx.save();
  ctx.translate(screenX, screenY);
  ctx.scale(scale, scale);

  if (facingLeft) {
    ctx.scale(-1, 1);
  }

  ctx.drawImage(sprite, -player.width / 2, -player.height + PLAYER.footOffset);
  ctx.restore();
}

function drawDogmattShadow(dogmatt) {
  const config = getMattConfig(dogmatt.type);
  const scale = getInnActorScale();
  const screenX = dogmatt.x - state.camera.x;
  const screenY = dogmatt.y - state.camera.y;

  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.24)";
  ctx.beginPath();
  ctx.ellipse(screenX, screenY + 6, config.width * 0.3 * scale, config.height * 0.1 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawDogmatt(dogmatt) {
  const config = getMattConfig(dogmatt.type);
  const frames = getMattFrames(dogmatt);
  if (!frames || frames.length === 0) {
    return;
  }

  const sprite = frames[dogmatt.frameIndex % frames.length];
  const scale = getInnActorScale();
  const screenX = Math.round(dogmatt.x - state.camera.x);
  const screenY = Math.round(dogmatt.y - state.camera.y);
  const facingLeft = dogmatt.direction === "left";

  ctx.save();
  ctx.translate(screenX, screenY);
  ctx.scale(scale, scale);

  if (facingLeft) {
    ctx.scale(-1, 1);
  }

  ctx.drawImage(sprite, -config.width / 2, -config.height + config.footOffset);
  ctx.restore();
}

function getNpcRenderScale(npc) {
  if (state.currentWorld === "town_blacksmith" && npc.id === "tom") {
    return 3;
  }

  if (state.currentWorld === "town_arena_entrance" && ["tom", "scott"].includes(npc.id)) {
    return 3;
  }

  return getInnActorScale();
}

function drawNpcShadow(npc) {
  const scale = getNpcRenderScale(npc);
  const screenX = npc.x - state.camera.x;
  const screenY = npc.y - state.camera.y;

  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.24)";
  ctx.beginPath();
  ctx.ellipse(screenX, screenY + 7, NPC.width * 0.28 * scale, NPC.height * 0.09 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawNpc(npc) {
  const frames = getNpcFrames(npc);
  if (!frames || frames.length === 0) {
    return;
  }

  const sprite = frames[npc.frameIndex % frames.length];
  const scale = getNpcRenderScale(npc);
  const screenX = Math.round(npc.x - state.camera.x);
  const screenY = Math.round(npc.y - state.camera.y);

  ctx.save();
  ctx.translate(screenX, screenY);
  ctx.scale(scale, scale);

  if (npc.direction === "left") {
    ctx.scale(-1, 1);
  }

  ctx.drawImage(sprite, -NPC.width / 2, -NPC.height + NPC.footOffset);
  ctx.restore();
}

function drawOverviewActors() {
  ctx.save();
  ctx.fillStyle = "rgba(255, 238, 143, 0.96)";
  ctx.strokeStyle = "rgba(20, 25, 22, 0.86)";
  ctx.lineWidth = 22;
  ctx.beginPath();
  ctx.arc(state.player.x, state.player.y, 70, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  for (const dogmatt of state.dogmatts) {
    ctx.fillStyle = dogmatt.caught
      ? "rgba(143, 243, 197, 0.9)"
      : dogmatt.type === "firematt"
        ? "rgba(255, 96, 66, 0.86)"
        : "rgba(255, 196, 116, 0.86)";
    ctx.strokeStyle = "rgba(20, 25, 22, 0.76)";
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.arc(dogmatt.x, dogmatt.y, 46, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  for (const npc of state.npcs) {
    ctx.fillStyle = "rgba(124, 205, 255, 0.9)";
    ctx.strokeStyle = "rgba(20, 25, 22, 0.76)";
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.arc(npc.x, npc.y, 46, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  ctx.restore();
}

function drawParticles() {
  ctx.save();
  ctx.translate(-state.camera.x, -state.camera.y);

  for (const particle of state.particles) {
    const progress = 1 - particle.life / particle.maxLife;
    const alpha = Math.max(0, 1 - progress);
    ctx.globalAlpha = alpha;

    if (particle.type === "slash") {
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      ctx.strokeStyle = particle.color;
      ctx.lineWidth = Math.max(2, particle.size * 0.22);
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-particle.size, 0);
      ctx.quadraticCurveTo(0, -particle.size * 0.35, particle.size, 0);
      ctx.stroke();
      ctx.restore();
      continue;
    }

    if (particle.type === "ring") {
      ctx.strokeStyle = particle.color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size + progress * 26, 0, Math.PI * 2);
      ctx.stroke();
      continue;
    }

    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size * (1 - progress * 0.45), 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
  ctx.globalAlpha = 1;
}

function getNearbyNode() {
  return getWorld().nodes.find(
    (node) => Math.hypot(node.x - state.player.x, node.y - state.player.y) <= node.radius + 44,
  );
}

function tryEnterNode() {
  const node = getNearbyNode();

  if (!node) {
    return false;
  }

  saveCapturedParty();
  setWorld(node.target);
  spawnCaptureEffect(state.player);
  playCaptureSound();
  addScreenShake(8);
  saveWorlds();
  return true;
}

function drawWorldNodes() {
  const nearbyNode = getNearbyNode();
  ctx.save();
  ctx.translate(-state.camera.x, -state.camera.y);

  for (const node of getWorld().nodes) {
    const active = node === nearbyNode;
    ctx.globalAlpha = active ? 0.88 : 0.38;
    ctx.fillStyle = active ? "rgba(143, 243, 197, 0.25)" : "rgba(150, 108, 255, 0.2)";
    ctx.strokeStyle = active ? "rgba(143, 243, 197, 0.95)" : "rgba(210, 188, 255, 0.72)";
    ctx.lineWidth = active ? 4 : 2;
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    if (active) {
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#f7f1d0";
      ctx.font = "800 18px Inter, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`E: ${getWorldLabel(node.target)}`, node.x, node.y - node.radius - 14);
    }
  }

  ctx.restore();
  ctx.globalAlpha = 1;
}

function drawRect(rect, fill, stroke) {
  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = state.dev.enabled ? 34 : 3;
  ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
  ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
}

function drawWall(wall) {
  if (!Array.isArray(wall.points) || wall.points.length === 0) {
    return;
  }

  ctx.strokeStyle = "rgba(255, 180, 147, 0.92)";
  ctx.fillStyle = "rgba(255, 180, 147, 0.95)";
  ctx.lineWidth = wall.thickness || 70;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();

  wall.points.forEach((point, index) => {
    if (index === 0) {
      ctx.moveTo(point.x, point.y);
    } else {
      ctx.lineTo(point.x, point.y);
    }
  });

  ctx.stroke();

  ctx.lineWidth = 12;
  ctx.strokeStyle = "rgba(120, 38, 35, 0.55)";
  ctx.stroke();

  for (const point of wall.points) {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 56, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawWorldEditorObjects() {
  const world = getWorld();

  for (const wall of world.walls) {
    drawWall(wall);
  }

  for (const area of world.spawnAreas) {
    drawRect(area, "rgba(88, 221, 147, 0.22)", "rgba(145, 255, 190, 0.9)");
  }

  for (const path of world.paths) {
    ctx.strokeStyle = "rgba(91, 184, 255, 0.92)";
    ctx.fillStyle = "rgba(91, 184, 255, 0.92)";
    ctx.lineWidth = 44;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();

    path.points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });

    ctx.stroke();

    for (const point of path.points) {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 62, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (const path of world.npcPaths) {
    const npcName = NPC_DEFS[path.npcId]?.name || "NPC";
    const active = state.currentWorld !== "town" || isNightTime();
    ctx.strokeStyle = active ? "rgba(255, 210, 91, 0.92)" : "rgba(255, 210, 91, 0.36)";
    ctx.fillStyle = active ? "rgba(255, 210, 91, 0.92)" : "rgba(255, 210, 91, 0.42)";
    ctx.lineWidth = 38;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();

    path.points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });

    ctx.stroke();

    for (const point of path.points) {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 56, 0, Math.PI * 2);
      ctx.fill();
    }

    if (path.points[0]) {
      ctx.fillStyle = "#fff3c2";
      const labelSize = Math.max(42, Math.min(150, getMapWidth() * 0.012));
      ctx.font = `800 ${labelSize}px Inter, system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(npcName, path.points[0].x, path.points[0].y - 82);
    }
  }

  for (const npc of world.npcs) {
    ctx.fillStyle = "rgba(124, 205, 255, 0.32)";
    ctx.strokeStyle = "rgba(190, 235, 255, 0.95)";
    ctx.lineWidth = 28;
    ctx.beginPath();
    ctx.arc(npc.x, npc.y, 64, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#e8f7ff";
    const labelSize = Math.max(44, Math.min(150, getMapWidth() * 0.012));
    ctx.font = `900 ${labelSize}px Inter, system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText(NPC_DEFS[npc.id]?.name || npc.id, npc.x, npc.y - 92);
  }

  for (const node of world.nodes) {
    ctx.fillStyle = "rgba(172, 123, 255, 0.28)";
    ctx.strokeStyle = "rgba(230, 210, 255, 0.95)";
    ctx.lineWidth = 34;
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#f6edff";
    const labelSize = Math.max(46, Math.min(170, getMapWidth() * 0.014));
    ctx.font = `800 ${labelSize}px Inter, system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText(getWorldLabel(node.target), node.x, node.y + labelSize * 0.18);
  }

  if (state.dev.dragging) {
    const drag = state.dev.dragging;
    const rect = normalizeRect({
      x: drag.startX,
      y: drag.startY,
      width: drag.currentX - drag.startX,
      height: drag.currentY - drag.startY,
    });
    const isWall = drag.tool === "wall";
    drawRect(
      rect,
      isWall ? "rgba(221, 87, 73, 0.18)" : "rgba(88, 221, 147, 0.16)",
      isWall ? "rgba(255, 180, 147, 0.9)" : "rgba(145, 255, 190, 0.9)",
    );
  }
}

function drawDevLayer() {
  if (!state.dev.enabled) {
    return;
  }

  ctx.save();
  ctx.translate(-state.camera.x, -state.camera.y);
  drawWorldEditorObjects();

  ctx.restore();
}

function drawActors() {
  const actors = state.dogmatts.map((dogmatt) => ({
    type: "dogmatt",
    y: dogmatt.y,
    entity: dogmatt,
  }));

  state.npcs.forEach((npc) => {
    actors.push({ type: "npc", y: npc.y, entity: npc });
  });
  actors.push({ type: "player", y: state.player.y, entity: state.player });
  actors.sort((a, b) => a.y - b.y);

  for (const actor of actors) {
    if (actor.type === "player") {
      drawPlayerShadow();
    } else if (actor.type === "npc") {
      drawNpcShadow(actor.entity);
    } else {
      drawDogmattShadow(actor.entity);
    }
  }

  for (const actor of actors) {
    if (actor.type === "player") {
      drawPlayer();
    } else if (actor.type === "npc") {
      drawNpc(actor.entity);
    } else {
      drawDogmatt(actor.entity);
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  if (state.dev.enabled) {
    drawMapOverview();
    return;
  }

  ctx.save();
  if (state.screenShake > 0) {
    ctx.translate(
      randomBetween(-state.screenShake, state.screenShake),
      randomBetween(-state.screenShake, state.screenShake),
    );
  }
  drawMap();
  drawFutureMonsterMarkers();
  drawWorldNodes();
  drawActors();
  drawParticles();
  drawDevLayer();
  ctx.restore();
}

function loop(time) {
  if (!state.ready) {
    state.loopStarted = false;
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
  ensureAudio();
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
    ensureAudio();
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
  if (!state.ready || state.dev.enabled) {
    return;
  }

  playWhipSound();
  spawnWhipEffect();
  addScreenShake(3);
  state.player.attackTimer = 0.32;
  state.player.frameIndex = 0;
  state.player.frameTimer = 0;
  setAction(state.player, "whipping");
  applyWhipHit();
}

window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();

  if (key === "f1") {
    event.preventDefault();
    setDevMode(!state.dev.enabled);
    return;
  }

  if (key === "escape" && state.dev.enabled) {
    event.preventDefault();
    setDevMode(false);
    return;
  }

  if (isTypingTarget(event.target)) {
    return;
  }

  if (state.dev.enabled) {
    if (key === "enter") {
      event.preventDefault();
      startNewEditorLine();
      return;
    }

    if (key === "backspace") {
      event.preventDefault();
      undoActiveEditorPoint();
      return;
    }

    return;
  }

  ensureAudio();

  if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(key)) {
    event.preventDefault();
  }

  if (key === "e" && !event.repeat) {
    event.preventDefault();
    if (!state.dev.enabled) {
      tryEnterNode();
    }
    return;
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
  saveCapturedParty();
  keys.clear();
  touchInput.sprint = false;
  resetTouchJoystick();
  if (touchSprint) {
    touchSprint.classList.remove("active");
  }
});

canvas.addEventListener("pointerdown", (event) => {
  if (state.dev.enabled) {
    handleDevPointerDown(event);
    return;
  }

  triggerWhip();
});

canvas.addEventListener("pointermove", handleDevPointerMove);
canvas.addEventListener("pointerup", handleDevPointerUp);
canvas.addEventListener("pointercancel", handleDevPointerUp);

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

async function startGameForProfile(profileId) {
  if (!setActiveProfile(profileId)) {
    setProfileStatus("Choose a profile first.");
    return;
  }

  const profile = state.profiles.find((item) => item.id === state.profileId);
  if (profile) {
    profile.updatedAt = Date.now();
    saveProfiles();
  }

  state.ready = false;
  hideLauncher();

  if (loading) {
    loading.textContent = `Loading ${state.profileName}...`;
    loading.classList.remove("hidden");
  }

  state.currentWorld = DEFAULT_WORLD_ID;
  state.worlds = loadWorlds();
  state.capturedParty = loadCapturedParty();
  state.caughtDogmatts = -1;
  state.clockMinutes = CLOCK.startHour * 60;
  state.lastNightState = isNightTime();
  state.dogmatts = [];
  state.npcs = [];
  state.particles = [];
  state.screenShake = 0;

  const start = getMapCenter(state.currentWorld);
  state.player.x = start.x;
  state.player.y = start.y;
  state.player.action = "idle";
  state.player.frameIndex = 0;
  state.player.frameTimer = 0;
  state.player.moving = false;
  seedPlayerTrail();
  initDevPanel();
  updateTimeLabel();

  if (new URLSearchParams(window.location.search).has("dev")) {
    setDevMode(true);
  }

  try {
    await assetsReady;
    spawnDogmatts();
    spawnNpcs();
    syncCamera();
    updateCaughtHud(countCaughtMatts());

    if (loading) {
      loading.textContent = "Loading nearby map...";
    }

    await Promise.all(preloadNearbyTiles(1));
    state.ready = true;
    if (loading) {
      loading.classList.add("hidden");
    }
    state.lastTime = performance.now();

    if (!state.loopStarted) {
      state.loopStarted = true;
      requestAnimationFrame(loop);
    }
  } catch (error) {
    if (loading) {
      loading.textContent = error.message;
    }
    console.error(error);
  }
}

function initializeProfiles() {
  state.profiles = loadProfiles();

  if (state.profiles.length === 0) {
    state.profiles.push(createProfile("Ivan"));
    saveProfiles();
  }

  const activeProfileId = localStorage.getItem(ACTIVE_PROFILE_STORAGE_KEY);
  setActiveProfile(activeProfileId || state.profiles[0].id);
  updateProfileList();
  showLauncher(`Ready as ${state.profileName}.`);
}

profileForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = profileName?.value.trim() || "";

  if (!name) {
    setProfileStatus("Name the new profile first.");
    return;
  }

  const profile = createProfile(name);
  state.profiles.push(profile);
  saveProfiles();
  setActiveProfile(profile.id);
  if (profileName) {
    profileName.value = "";
  }
  updateProfileList();
  setProfileStatus(`${profile.name} created.`);
});

profilePlay?.addEventListener("click", () => {
  startGameForProfile(state.profileId);
});

profileDelete?.addEventListener("click", () => {
  if (!state.profileId || state.profiles.length <= 1) {
    setProfileStatus("Keep at least one profile.");
    return;
  }

  const deleted = state.profiles.find((profile) => profile.id === state.profileId);
  state.profiles = state.profiles.filter((profile) => profile.id !== state.profileId);
  localStorage.removeItem(getWorldStorageKey());
  localStorage.removeItem(getMattProgressStorageKey());
  saveProfiles();
  setActiveProfile(state.profiles[0].id);
  updateProfileList();
  setProfileStatus(`${deleted?.name || "Profile"} deleted.`);
});

profileMenu?.addEventListener("click", () => {
  if (state.ready) {
    saveCapturedParty();
    saveWorlds();
  }

  state.ready = false;
  showLauncher("Choose a profile.");
});

const assetsReady = loadAssets();
resizeCanvas();
initializeProfiles();
assetsReady.catch((error) => {
  if (loading) {
    loading.textContent = error.message;
    loading.classList.remove("hidden");
  }
  console.error(error);
});
