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
const moneyCounter = document.querySelector("#money-counter");
const playerCounter = document.querySelector("#player-counter");
const healthCounter = document.querySelector("#health-counter");
const staminaCounter = document.querySelector("#stamina-counter");
const xpCounter = document.querySelector("#xp-counter");
const healthFill = document.querySelector("#health-fill");
const staminaFill = document.querySelector("#stamina-fill");
const xpFill = document.querySelector("#xp-fill");
const healthMeter = document.querySelector(".vital.health");
const staminaMeter = document.querySelector(".vital.stamina");
const xpMeter = document.querySelector(".vital.xp");
const timeLabel = document.querySelector("#time-label");
const worldLabel = document.querySelector("#world-label");
const monsterSlots = [...document.querySelectorAll(".slot")];
const inventoryButton = document.querySelector("#inventory-button");
const shopOverlay = document.querySelector("#shop-overlay");
const shopTitle = document.querySelector("#shop-title");
const shopMoney = document.querySelector("#shop-money");
const shopClose = document.querySelector("#shop-close");
const shopTabs = document.querySelector("#shop-tabs");
const shopList = document.querySelector("#shop-list");
const shopMessage = document.querySelector("#shop-message");
const pauseMenu = document.querySelector("#pause-menu");
const pauseMenuClose = document.querySelector("#pause-menu-close");
const pauseMenuTabs = document.querySelector("#pause-menu-tabs");
const pauseMenuTitle = document.querySelector("#pause-menu-title");
const pauseMenuSubtitle = document.querySelector("#pause-menu-subtitle");
const pauseMenuContent = document.querySelector("#pause-menu-content");
const pauseMenuMessage = document.querySelector("#pause-menu-message");
const newGameIntro = document.querySelector("#new-game-intro");
const introClose = document.querySelector("#intro-close");
const arenaBattleUi = document.querySelector("#arena-battle-ui");
const arenaBattleTitle = document.querySelector("#arena-battle-title");
const arenaBattleStats = document.querySelector("#arena-battle-stats");
const arenaBattleActions = document.querySelector("#arena-battle-actions");
const arenaBattleLog = document.querySelector("#arena-battle-log");
const gameToast = document.querySelector("#game-toast");
const touchJoystick = document.querySelector("#touch-joystick");
const touchKnob = document.querySelector("#touch-knob");
const touchInventory = document.querySelector("#touch-inventory");
const touchWhip = document.querySelector("#touch-whip");
const touchSprint = document.querySelector("#touch-sprint");
const followerCommandBar = document.querySelector("#follower-command-bar");
const followerCommandStatus = document.querySelector("#follower-command-status");
const followerCommandButtons = [...document.querySelectorAll("[data-follower-command]")];
const devPanel = document.querySelector("#dev-panel");
const devClose = document.querySelector("#dev-close");
const devWorld = document.querySelector("#dev-world");
const devTools = document.querySelector("#dev-tools");
const devNpc = document.querySelector("#dev-npc");
const devNodeTarget = document.querySelector("#dev-node-target");
const devNodeName = document.querySelector("#dev-node-name");
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
const INN_RECOVERY_WORLD_ID = "town_inn";
const INN_RECOVERY_POINT = { x: 2860, y: 2500 };
const INN_RECOVERY_MESSAGE =
  "Brick: Easy now. You limped back here and passed out. I nursed you back to health. Stay a minute before chasing trouble again.";
const NEW_GAME_START_POINT = { x: 1120, y: 5760 };
const NEW_GAME_INTRO_MESSAGE =
  "Welcome to Matt Game. Follow Brick's lead, capture Matts, visit Ty to tame followers, and use the menu tabs to track your map, missions, journal, skills, and party.";
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
    image: "assets/maps/town/buildings/bricksinn/bricksinn.png",
    fill: "#1f1710",
  },
  town_mattstore: {
    width: 2678,
    height: 2350,
    type: "image",
    image: "assets/maps/town/buildings/mattstore/interior.jfif",
    fill: "#171b19",
  },
  town_itemshop: {
    width: 7600,
    height: 6000,
    type: "image",
    image: "assets/maps/town/buildings/itemshop/my-project-page-1.jfif",
    fill: "#191915",
  },
  fireworld: {
    width: 2508,
    height: 2508,
    type: "image",
    image: "assets/maps/fire/fireworld.png",
    fill: "#2b130e",
  },
  purplewaterworld: {
    width: 7600,
    height: 6000,
    type: "image",
    image: "assets/maps/water/waterworld.jfif",
    fill: "#102a35",
  },
  water_tree: {
    width: 7600,
    height: 6000,
    type: "image",
    image: "assets/maps/water/watertree.jfif",
    fill: "#102a35",
  },
  water_hut: {
    width: 7600,
    height: 6000,
    type: "image",
    image: "assets/maps/water/waterhut.jfif",
    fill: "#102a35",
  },
  water_cove: {
    width: 7600,
    height: 6000,
    type: "image",
    image: "assets/maps/water/watercove.jfif",
    fill: "#102a35",
  },
  temple: {
    width: 7600,
    height: 6000,
    type: "image",
    image: "assets/maps/temple/temple.jfif",
    fill: "#272313",
  },
  tomb: {
    width: 7600,
    height: 6000,
    type: "image",
    image: "assets/maps/tomb/tomb.jfif",
    fill: "#161a1e",
  },
  treeworld: {
    width: 7600,
    height: 6000,
    type: "image",
    image: "assets/maps/grass/grassworld.jfif",
    fill: "#172515",
  },
  grass_tree: {
    width: 7600,
    height: 6000,
    type: "image",
    image: "assets/maps/grass/grasstree.jfif",
    fill: "#172515",
  },
  grass_camp: {
    width: 7600,
    height: 6000,
    type: "image",
    image: "assets/maps/grass/grasscamp.jfif",
    fill: "#172515",
  },
  grass_cave: {
    width: 7600,
    height: 6000,
    type: "image",
    image: "assets/maps/grass/evilcave.jpg",
    rescuedImage: "assets/maps/grass/grasscave.jfif",
    fill: "#172515",
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
  maxHealth: 100,
  maxStamina: 100,
  staminaRegen: 24,
  sprintStaminaCost: 28,
  whipStaminaCost: 12,
  damageInvulnerableTime: 0.85,
  trailSpacing: 11,
  maxTrailPoints: 260,
  idleFlourishMin: 5,
  idleFlourishMax: 10,
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
  attackRadius: 150,
  attackDamage: 18,
  attackCooldown: 1.9,
  attackWindup: 0.28,
  specialIdleMin: 10,
  specialIdleMax: 15,
};

const GRASSMATT = {
  type: "grassmatt",
  count: 14,
  width: 132,
  height: 132,
  footOffset: 16,
  wanderSpeed: 135,
  fleeSpeed: 535,
  followSpeed: 725,
  noticeRadius: 410,
  fleeRadius: 270,
  followStopDistance: 36,
  followBackSpacing: 76,
  followSideSpacing: 56,
  attackRadius: 145,
  attackDamage: 14,
  attackCooldown: 1.75,
  attackWindup: 0.24,
};

const WATERMATT = {
  type: "watermatt",
  count: 14,
  width: 132,
  height: 132,
  footOffset: 16,
  wanderSpeed: 125,
  fleeSpeed: 545,
  followSpeed: 730,
  noticeRadius: 415,
  fleeRadius: 275,
  followStopDistance: 36,
  followBackSpacing: 76,
  followSideSpacing: 56,
  attackRadius: 155,
  attackDamage: 16,
  attackCooldown: 1.85,
  attackWindup: 0.26,
};

const ROCKMATT = {
  type: "rockmatt",
  count: 12,
  width: 142,
  height: 142,
  footOffset: 18,
  wanderSpeed: 98,
  fleeSpeed: 455,
  followSpeed: 650,
  noticeRadius: 390,
  fleeRadius: 250,
  followStopDistance: 38,
  followBackSpacing: 84,
  followSideSpacing: 60,
  attackRadius: 160,
  attackDamage: 20,
  attackCooldown: 2.05,
  attackWindup: 0.32,
};

const MYSTICMATT = {
  type: "mysticmatt",
  count: 10,
  width: 136,
  height: 136,
  footOffset: 18,
  wanderSpeed: 118,
  fleeSpeed: 500,
  followSpeed: 700,
  noticeRadius: 430,
  fleeRadius: 270,
  followStopDistance: 38,
  followBackSpacing: 80,
  followSideSpacing: 58,
  attackRadius: 170,
  attackDamage: 17,
  attackCooldown: 1.7,
  attackWindup: 0.26,
  specialIdleMin: 5,
  specialIdleMax: 10,
  floatDuration: 10,
};

const DEMENTED_MATT = {
  type: "dementedmatt",
  count: 0,
  width: 150,
  height: 150,
  footOffset: 20,
  wanderSpeed: 190,
  chaseSpeed: 360,
  fleeSpeed: 0,
  followSpeed: 740,
  noticeRadius: 980,
  fleeRadius: 0,
  followStopDistance: 38,
  followBackSpacing: 82,
  followSideSpacing: 58,
  attackRadius: 175,
  attackDamage: 16,
  attackCooldown: 1.08,
  attackWindup: 0.18,
  defeatHits: 4,
  bloodlusted: true,
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
  grassmatt: GRASSMATT,
  watermatt: WATERMATT,
  rockmatt: ROCKMATT,
  mysticmatt: MYSTICMATT,
  dementedmatt: DEMENTED_MATT,
};

const FOLLOWER_ASSIST = {
  searchRadius: 760,
  leashRadius: 980,
  attackRange: 138,
  strikeCooldown: 1.15,
  bondCooldown: 8,
  bondFriendship: 1,
  bondXp: 7,
};

const FOLLOWER_COMMAND_LABELS = {
  follow: "Following",
  stay: "Staying",
  guard: "Guarding",
  attack: "Attack target",
};
const FOLLOWER_COMMAND_KEYS = {
  q: "follow",
  r: "stay",
  f: "guard",
  t: "attack",
};
const FOLLOWER_COMMAND_TARGET_RADIUS = 96;

const PRIME_MYSTIC_GRAVITY_WELL = {
  duration: 4.3,
  radius: 980,
  pullStrength: 760,
  followerDamage: 14,
  followerAttackRange: 116,
  followerAttackCooldown: 0.72,
};

const WORLD_MATT_TYPES = {
  mainworld: "dogmatt",
  fireworld: "firematt",
  treeworld: "grassmatt",
  grass_tree: "grassmatt",
  grass_cave: "grassmatt",
  purplewaterworld: "watermatt",
  water_tree: "watermatt",
  water_hut: "watermatt",
  water_cove: "watermatt",
  tomb: "rockmatt",
  temple: "mysticmatt",
};

const WORLD_ENCOUNTER_PROFILES = {
  mainworld: { levelMin: 1, levelMax: 3, captureDifficulty: 1, damageScale: 0.85, count: 20 },
  fireworld: { levelMin: 4, levelMax: 8, captureDifficulty: 2.3, damageScale: 1.08, count: 10 },
  treeworld: { levelMin: 5, levelMax: 9, captureDifficulty: 2.4, damageScale: 1.1, count: 12, eliteChance: 0.1 },
  grass_tree: { levelMin: 12, levelMax: 12, captureDifficulty: 4.2, damageScale: 1.45, count: 1 },
  grass_cave: { levelMin: 7, levelMax: 11, captureDifficulty: 2.9, damageScale: 1.16, count: 8, eliteChance: 0.12 },
  purplewaterworld: { levelMin: 3, levelMax: 7, captureDifficulty: 2, damageScale: 1.02, count: 14 },
  water_tree: { levelMin: 5, levelMax: 9, captureDifficulty: 2.4, damageScale: 1.08, count: 5 },
  water_hut: { levelMin: 7, levelMax: 11, captureDifficulty: 2.8, damageScale: 1.14, count: 5 },
  water_cove: { levelMin: 10, levelMax: 15, captureDifficulty: 3.4, damageScale: 1.25, count: 6, eliteChance: 0.14 },
  tomb: { levelMin: 7, levelMax: 12, captureDifficulty: 3.1, damageScale: 1.22, count: 12, eliteChance: 0.1 },
  temple: { levelMin: 8, levelMax: 14, captureDifficulty: 3.5, damageScale: 1.2, count: 10, eliteChance: 0.16 },
};

const PRIME_GRASS_MATT_MUSIC = "assets/maps/grass/music/Steel Lightning Choir.mp3";

const PRIME_GRASS_MATT_ATTACKS = [
  {
    id: "vine_hammer",
    name: "Vine Hammer",
    action: "vineHammer",
    effect: "vineHammer",
    hitShape: "circle",
    attackDamage: 31,
    attackRadius: 275,
    attackWindup: 0.3,
    attackCooldown: 1.35,
    minRange: 0,
    maxRange: 350,
    weight: 1.35,
    staminaDamage: 12,
    knockback: 85,
    screenShake: 13,
  },
  {
    id: "spore_burst",
    name: "Spore Burst",
    action: "sporeBurst",
    effect: "sporeBurst",
    hitShape: "circle",
    attackDamage: 26,
    attackRadius: 510,
    attackWindup: 0.38,
    attackCooldown: 1.85,
    minRange: 160,
    maxRange: 610,
    weight: 1.25,
    projectileCount: 24,
    projectileSpeed: 710,
    staminaDamage: 16,
    screenShake: 10,
  },
  {
    id: "thorn_fan",
    name: "Thorn Fan",
    action: "thornFan",
    effect: "thornFan",
    hitShape: "cone",
    attackDamage: 31,
    attackRadius: 760,
    attackWindup: 0.28,
    attackCooldown: 1.65,
    minRange: 260,
    maxRange: 850,
    weight: 1.45,
    projectileCount: 11,
    projectileSpeed: 805,
    coneArc: Math.PI * 0.84,
    staminaDamage: 12,
    knockback: 65,
    screenShake: 11,
  },
  {
    id: "root_snare",
    name: "Root Snare",
    action: "rootSnare",
    effect: "rootSnare",
    hitShape: "beam",
    attackDamage: 34,
    attackRadius: 1040,
    attackWindup: 0.44,
    attackCooldown: 2.05,
    minRange: 420,
    maxRange: 1060,
    weight: 1.55,
    beamWidth: 112,
    staminaDamage: 26,
    knockback: 105,
    screenShake: 14,
  },
  {
    id: "canopy_quake",
    name: "Canopy Quake",
    action: "canopyQuake",
    effect: "canopyQuake",
    hitShape: "circle",
    attackDamage: 43,
    attackRadius: 820,
    attackWindup: 0.68,
    attackCooldown: 2.85,
    minRange: 0,
    maxRange: 820,
    weight: 0.9,
    staminaDamage: 28,
    knockback: 170,
    screenShake: 22,
  },
];

const PRIME_FIRE_MATT_ATTACKS = [
  {
    id: "fire_breath",
    name: "Fire Breath",
    action: "fireBreath",
    effect: "fireBreath",
    hitShape: "cone",
    attackDamage: 38,
    attackRadius: 880,
    attackWindup: 0.4,
    attackCooldown: 1.7,
    minRange: 300,
    maxRange: 920,
    weight: 1.55,
    coneArc: Math.PI * 0.7,
    staminaDamage: 20,
    knockback: 90,
    screenShake: 14,
  },
  {
    id: "tail_swipe",
    name: "Tail Swipe",
    action: "tailSwipe",
    effect: "tailFireWall",
    hitShape: "cone",
    attackDamage: 39,
    attackRadius: 615,
    attackWindup: 0.34,
    attackCooldown: 1.85,
    minRange: 120,
    maxRange: 620,
    weight: 1.35,
    coneArc: Math.PI * 1.12,
    staminaDamage: 23,
    knockback: 135,
    screenShake: 17,
  },
  {
    id: "ember_claw",
    name: "Ember Claw",
    action: "swipe",
    effect: "emberSwipe",
    hitShape: "circle",
    attackDamage: 33,
    attackRadius: 325,
    attackWindup: 0.22,
    attackCooldown: 1.2,
    minRange: 0,
    maxRange: 350,
    weight: 1.45,
    staminaDamage: 13,
    knockback: 70,
    screenShake: 10,
  },
  {
    id: "magma_roar",
    name: "Magma Roar",
    action: "fireBreath",
    effect: "magmaRoar",
    hitShape: "circle",
    attackDamage: 46,
    attackRadius: 730,
    attackWindup: 0.64,
    attackCooldown: 2.65,
    minRange: 0,
    maxRange: 740,
    weight: 0.95,
    staminaDamage: 30,
    knockback: 175,
    screenShake: 23,
  },
];

const PRIME_ROCK_MATT_ATTACKS = [
  {
    id: "granite_punch",
    name: "Granite Punch",
    action: "punch",
    effect: "granitePunch",
    hitShape: "circle",
    attackDamage: 39,
    attackRadius: 360,
    attackWindup: 0.26,
    attackCooldown: 1.25,
    minRange: 0,
    maxRange: 380,
    weight: 1.45,
    staminaDamage: 18,
    knockback: 120,
    screenShake: 13,
  },
  {
    id: "rock_throw",
    name: "Rock Throw",
    action: "rockThrow",
    effect: "rockThrow",
    hitShape: "targetCircle",
    attackDamage: 38,
    attackRadius: 190,
    attackWindup: 0.43,
    attackCooldown: 1.75,
    minRange: 360,
    maxRange: 1060,
    weight: 1.35,
    projectileSpeed: 1080,
    staminaDamage: 21,
    knockback: 135,
    screenShake: 15,
  },
  {
    id: "rolling_crush",
    name: "Rolling Crush",
    action: "rollAttack",
    effect: "rollingCrush",
    hitShape: "charge",
    attackDamage: 44,
    attackRadius: 840,
    attackWindup: 0.4,
    attackCooldown: 2.1,
    minRange: 240,
    maxRange: 900,
    weight: 1.45,
    beamWidth: 185,
    staminaDamage: 27,
    knockback: 190,
    screenShake: 20,
  },
  {
    id: "tomb_quake",
    name: "Tomb Quake",
    action: "punch",
    effect: "tombQuake",
    hitShape: "circle",
    attackDamage: 49,
    attackRadius: 760,
    attackWindup: 0.68,
    attackCooldown: 2.85,
    minRange: 0,
    maxRange: 760,
    weight: 1,
    staminaDamage: 34,
    knockback: 210,
    screenShake: 26,
  },
];

const PRIME_WATER_MATT_ATTACKS = [
  {
    id: "surge_bite",
    name: "Surge Bite",
    action: "waveBlast",
    effect: "surgeBite",
    hitShape: "circle",
    attackDamage: 31,
    attackRadius: 295,
    attackWindup: 0.24,
    attackCooldown: 1.2,
    minRange: 0,
    maxRange: 330,
    weight: 1.45,
    staminaDamage: 14,
    knockback: 75,
    screenShake: 10,
  },
  {
    id: "tidal_lance",
    name: "Tidal Lance",
    action: "waterShot",
    effect: "tidalLance",
    hitShape: "beam",
    attackDamage: 35,
    attackRadius: 1010,
    attackWindup: 0.4,
    attackCooldown: 1.9,
    minRange: 300,
    maxRange: 1040,
    weight: 1.5,
    beamWidth: 112,
    staminaDamage: 21,
    knockback: 105,
    screenShake: 13,
  },
  {
    id: "bubble_cage",
    name: "Bubble Cage",
    action: "acidRain",
    effect: "bubbleCage",
    hitShape: "targetCircle",
    attackDamage: 28,
    attackRadius: 220,
    attackWindup: 0.46,
    attackCooldown: 2,
    minRange: 180,
    maxRange: 820,
    weight: 1.25,
    staminaDamage: 27,
    knockback: 55,
    screenShake: 11,
  },
  {
    id: "moon_tide",
    name: "Moon Tide",
    action: "waveBlast",
    effect: "moonTide",
    hitShape: "circle",
    attackDamage: 42,
    attackRadius: 735,
    attackWindup: 0.66,
    attackCooldown: 2.75,
    minRange: 0,
    maxRange: 740,
    weight: 0.95,
    staminaDamage: 31,
    knockback: 165,
    screenShake: 22,
  },
];

const PRIME_MYSTIC_MATT_ATTACKS = [
  {
    id: "mystic_swipe",
    name: "Mystic Swipe",
    action: "swipe",
    effect: "mysticSwipe",
    hitShape: "cone",
    attackDamage: 46,
    attackRadius: 430,
    attackWindup: 0.24,
    attackCooldown: 1.1,
    minRange: 0,
    maxRange: 470,
    weight: 1.65,
    coneArc: Math.PI * 0.95,
    staminaDamage: 22,
    knockback: 120,
    screenShake: 16,
  },
  {
    id: "mystic_pull",
    name: "Mystic Pull",
    action: "mysticPull",
    effect: "mysticPull",
    hitShape: "circle",
    attackDamage: 24,
    attackRadius: PRIME_MYSTIC_GRAVITY_WELL.radius,
    attackWindup: 0.58,
    attackCooldown: 3.2,
    minRange: 120,
    maxRange: 1040,
    weight: 1.25,
    gravityDuration: PRIME_MYSTIC_GRAVITY_WELL.duration,
    gravityRadius: PRIME_MYSTIC_GRAVITY_WELL.radius,
    pullStrength: PRIME_MYSTIC_GRAVITY_WELL.pullStrength,
    staminaDamage: 36,
    knockback: -70,
    screenShake: 24,
  },
  {
    id: "teleport_blast",
    name: "Teleport Blast",
    action: "teleportBlast",
    effect: "teleportBlast",
    hitShape: "circle",
    attackDamage: 54,
    attackRadius: 390,
    attackWindup: 0.52,
    attackCooldown: 2.55,
    minRange: 280,
    maxRange: 1180,
    weight: 1.5,
    staminaDamage: 28,
    knockback: 185,
    screenShake: 26,
  },
];

const WORLD_BOSS_MATTS = {
  fireworld: {
    id: "prime-fire-matt",
    name: "Prime Fire Matt",
    type: "firematt",
    assetKey: "primefirematt",
    x: 1254,
    y: 1254,
    scale: 4.4,
    levelMin: 15,
    levelMax: 16,
    captureDifficulty: 4.6,
    damageScale: 1.58,
    aggroRadius: 930,
    walkSpeed: 186,
    rushSpeed: 248,
    preferredDistance: 440,
    closeDistance: 230,
    moveIntervalMin: 0.42,
    moveIntervalMax: 1.12,
    preBattleRoam: true,
    introAction: "spawn",
    introFrameDuration: 0.095,
    introMessage: "Prime Fire Matt erupts from the fireworld.",
    requiresCaptured: { type: "firematt", count: 10 },
    attacks: PRIME_FIRE_MATT_ATTACKS,
  },
  tomb: {
    id: "prime-rock-matt",
    name: "Prime Rock Matt",
    type: "rockmatt",
    assetKey: "primerockmatt",
    x: 3800,
    y: 3100,
    scale: 4.35,
    levelMin: 14,
    levelMax: 15,
    captureDifficulty: 4.5,
    damageScale: 1.55,
    aggroRadius: 980,
    walkSpeed: 158,
    rushSpeed: 214,
    preferredDistance: 475,
    closeDistance: 270,
    moveIntervalMin: 0.5,
    moveIntervalMax: 1.28,
    preBattleRoam: true,
    introMessage: "Prime Rock Matt shakes loose from the tomb stone.",
    attacks: PRIME_ROCK_MATT_ATTACKS,
  },
  water_tree: {
    id: "prime-water-matt",
    name: "Prime Water Matt",
    type: "watermatt",
    assetKey: "primewatermatt",
    x: 3800,
    y: 3000,
    scale: 4.2,
    levelMin: 13,
    levelMax: 14,
    captureDifficulty: 4.35,
    damageScale: 1.48,
    aggroRadius: 925,
    walkSpeed: 172,
    rushSpeed: 230,
    preferredDistance: 455,
    closeDistance: 250,
    moveIntervalMin: 0.46,
    moveIntervalMax: 1.18,
    suppressNormalSpawns: true,
    attacks: PRIME_WATER_MATT_ATTACKS,
  },
  temple: {
    id: "prime-mystic-matt",
    name: "Prime Mystic Matt",
    type: "mysticmatt",
    assetKey: "primemysticmatt",
    x: 3800,
    y: 3000,
    scale: 4.75,
    levelMin: 20,
    levelMax: 20,
    captureDifficulty: 7.4,
    captureHitsBonus: 3,
    damageScale: 1.92,
    aggroRadius: 1080,
    walkSpeed: 184,
    rushSpeed: 254,
    preferredDistance: 470,
    closeDistance: 255,
    moveIntervalMin: 0.38,
    moveIntervalMax: 1.02,
    introMessage: "Prime Mystic Matt bends the temple air around Ivan.",
    attacks: PRIME_MYSTIC_MATT_ATTACKS,
  },
  grass_tree: {
    id: "prime-grass-matt",
    name: "Prime Grass Matt",
    type: "grassmatt",
    assetKey: "primegrassmatt",
    x: 3800,
    y: 3000,
    scale: 4.4,
    aggroRadius: 970,
    walkSpeed: 174,
    rushSpeed: 232,
    preferredDistance: 445,
    closeDistance: 255,
    moveIntervalMin: 0.44,
    moveIntervalMax: 1.15,
    musicTrack: PRIME_GRASS_MATT_MUSIC,
    musicMode: "primeGrassMatt",
    suppressNormalSpawns: true,
    attacks: PRIME_GRASS_MATT_ATTACKS,
  },
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
  brock: {
    id: "brock",
    name: "Brock",
    homeWorld: "town_inn",
    x: 2409,
    y: 2466,
  },
  wizard: {
    id: "wizard",
    name: "The Wizard",
    homeWorld: "grass_cave",
    x: 1717.098445595855,
    y: 1558.8452997779423,
    scale: 2,
  },
  logan: {
    id: "logan",
    name: "Logan",
    homeWorld: "town_itemshop",
    x: 3800,
    y: 3180,
  },
};

const NPC_IDS = Object.keys(NPC_DEFS);
const BROCK_CAPTURED_WORLD_ID = "grass_cave";
const BROCK_FREE_PATH_WORLD_ID = "town_inn";
const BROCK_FREE_PATH_WORLD_IDS = new Set([BROCK_FREE_PATH_WORLD_ID, BROCK_CAPTURED_WORLD_ID]);
const BROCK_FREE_PATH_ID = "brock-free-path";
const BROCK_MISSION_STATUS = {
  LOCKED: "",
  TALK_TO_BRICK: "talk_to_brick",
  SEARCH_GRASSLAND: "search_grassland",
  RESCUED: "rescued",
};
const BROCK_MISSION_STATUSES = new Set(Object.values(BROCK_MISSION_STATUS));
const BROCK_MISSION_TITLE = "Brock Is Missing";
const BROCK_MISSION_BRICK_DIALOGUE =
  "Brick: Ivan, I need you. My brother Brock is missing. Last time I saw him, he was in the Grassland. That is all I know. Please go there and start looking.";
const BROCK_MISSION_REACH_OUT =
  "Brick reaches out: Ivan, come back to the inn. My brother Brock is missing, and I need your help.";
const BROCK_MISSION_SEARCH_OBJECTIVE = "Objective: Go to the Grassland and start looking for Brock.";
const BROCK_RESCUE_DIALOGUE =
  "Brock: Ivan... I was jumped by some magical energy. I woke up tied up down here. Please, free me before whoever did this comes back.";
const BROCK_CAVE_LANTERN = {
  innerRadius: 130,
  outerRadius: 290,
  darkness: 0.96,
};
const BROCK_RESCUE_RADIUS = 170;
const WIZARD_NPC_ID = "wizard";
const WIZARD_AMBUSH_SCRIPT = "brock-rescue-ambush";
const WIZARD_GRASS_CAVE_PATH_ID = "wizard-grass-cave-path";
const WIZARD_GRASS_CAVE_DEFAULT_PATH = [
  { x: 1717.098445595855, y: 1558.8452997779423 },
  { x: 2529.8297557364917, y: 2482.6054774241306 },
];
const DEMENTED_MATT_TYPE = "dementedmatt";
const DEMENTED_ESSENSE_ITEM_ID = "demented_essense";
const DEMENTED_MATT_AMBUSH_COUNT = 3;
const DEMENTED_MATT_AMBUSH_OFFSETS = [
  { x: -140, y: 74 },
  { x: 28, y: -128 },
  { x: 162, y: 92 },
];
const WIZARD_AMBUSH_WARNING =
  "The Wizard: You should have left him in the dark. Now run.";
const BROCK_DEFAULT_FREE_PATH = [
  { x: 2409.178386380459, y: 2466.3212435233163 },
  { x: 2860, y: 2120 },
  { x: 3288.5270170244257, y: 2350.8512213175427 },
  { x: 3090.155440414507, y: 2555.144337527757 },
  { x: 2409.178386380459, y: 2466.3212435233163 },
];

const MATT_LABELS = {
  dogmatt: "Mattdogs",
  firematt: "Fire Matts",
  grassmatt: "Grass Matts",
  watermatt: "Water Matts",
  rockmatt: "Rock Matts",
  mysticmatt: "Mystic Matts",
  dementedmatt: "Demented Matts",
};

const ITEM_DEFS = {
  arena_ticket: {
    id: "arena_ticket",
    name: "Arena Battle Ticket",
    description: "A single-use ticket Scott accepts at the arena door.",
    price: 60,
    sellPrice: 30,
    stackable: true,
  },
  matt_snack: {
    id: "matt_snack",
    name: "Matt Snack",
    description: "Ty's bait. The next wild Matt capture takes one fewer hit.",
    price: 20,
    sellPrice: 10,
    stackable: true,
  },
  matt_charm: {
    id: "matt_charm",
    name: "Matt Charm",
    description: "A little bell charm. Ty pays more for captured Matts.",
    price: 90,
    sellPrice: 45,
    stackable: true,
  },
  capture_net: {
    id: "capture_net",
    name: "Capture Net",
    description: "A field net that helps secure the next wild Matt capture.",
    price: 34,
    sellPrice: 17,
    stackable: true,
  },
  calming_flute: {
    id: "calming_flute",
    name: "Calming Flute",
    description: "A reed flute tuned to Matt calls. Wild Matts take fewer hits to calm.",
    price: 160,
    sellPrice: 80,
    unique: true,
  },
  matt_treat: {
    id: "matt_treat",
    name: "Matt Treat",
    description: "Raises friendship for every Matt in your party.",
    price: 42,
    sellPrice: 21,
    stackable: true,
    use: { friendship: 8 },
  },
  camp_brush: {
    id: "camp_brush",
    name: "Camp Brush",
    description: "A soft brush for one Matt. Builds a stronger bond from the Bond tab.",
    price: 36,
    sellPrice: 18,
    stackable: true,
    bondOnly: true,
    use: { friendship: 5 },
  },
  focus_mint: {
    id: "focus_mint",
    name: "Focus Mint",
    description: "A sharp mint Matts love. Adds friendship and a little training XP.",
    price: 48,
    sellPrice: 24,
    stackable: true,
    bondOnly: true,
    use: { friendship: 6 },
  },
  bond_ribbon: {
    id: "bond_ribbon",
    name: "Bond Ribbon",
    description: "A ribbon braided with arena knots. Friendship gains are stronger.",
    price: 170,
    sellPrice: 85,
    unique: true,
  },
  memory_locket: {
    id: "memory_locket",
    name: "Memory Locket",
    description: "A tiny locket for Matt keepsakes. Bonded Matts start arena battles with more energy.",
    price: 220,
    sellPrice: 110,
    unique: true,
  },
  trade_ledger: {
    id: "trade_ledger",
    name: "Ty's Trade Ledger",
    description: "Ty's price notes. Captured Matts sell for even more.",
    price: 210,
    sellPrice: 105,
    unique: true,
  },
  grass_matt_adoption: {
    id: "grass_matt_adoption",
    name: "Grass Matt Adoption",
    description: "Ty places a Grass Matt directly into your party.",
    price: 190,
    sellPrice: 0,
    mattType: "grassmatt",
  },
  water_matt_adoption: {
    id: "water_matt_adoption",
    name: "Water Matt Adoption",
    description: "Ty places a Water Matt directly into your party.",
    price: 205,
    sellPrice: 0,
    mattType: "watermatt",
  },
  rock_matt_adoption: {
    id: "rock_matt_adoption",
    name: "Rock Matt Adoption",
    description: "Ty places a Rock Matt directly into your party.",
    price: 230,
    sellPrice: 0,
    mattType: "rockmatt",
  },
  mystic_matt_adoption: {
    id: "mystic_matt_adoption",
    name: "Mystic Matt Adoption",
    description: "Ty places a Mystic Matt directly into your party.",
    price: 260,
    sellPrice: 0,
    mattType: "mysticmatt",
  },
  health_potion: {
    id: "health_potion",
    name: "Health Potion",
    description: "Restores 40 health when used from your inventory.",
    price: 28,
    sellPrice: 14,
    stackable: true,
    use: { health: 40 },
  },
  greater_health_potion: {
    id: "greater_health_potion",
    name: "Greater Health Potion",
    description: "Restores 75 health when used from your inventory.",
    price: 55,
    sellPrice: 28,
    stackable: true,
    use: { health: 75 },
  },
  stamina_tonic: {
    id: "stamina_tonic",
    name: "Stamina Tonic",
    description: "Restores 55 stamina when used from your inventory.",
    price: 24,
    sellPrice: 12,
    stackable: true,
    use: { stamina: 55 },
  },
  ember_salve: {
    id: "ember_salve",
    name: "Ember Salve",
    description: "Tom's burn salve. Restores a strong burst of health.",
    price: 44,
    sellPrice: 22,
    stackable: true,
    use: { health: 58 },
  },
  river_tea: {
    id: "river_tea",
    name: "River Tea",
    description: "Brick's cooling tea. Restores health and stamina.",
    price: 38,
    sellPrice: 19,
    stackable: true,
    use: { health: 22, stamina: 42 },
  },
  hearty_stew: {
    id: "hearty_stew",
    name: "Hearty Stew",
    description: "A heavy inn stew for dangerous roads.",
    price: 52,
    sellPrice: 26,
    stackable: true,
    use: { health: 48, stamina: 34 },
  },
  inn_elixir: {
    id: "inn_elixir",
    name: "Inn Elixir",
    description: "A rare bottle Brick keeps for emergencies.",
    price: 95,
    sellPrice: 48,
    stackable: true,
    use: { health: 95, stamina: 80 },
  },
  guard_armor: {
    id: "guard_armor",
    name: "Guard Armor",
    description: "Light armor that reduces wild Matt damage.",
    price: 120,
    sellPrice: 60,
    unique: true,
    armor: 0.18,
  },
  steel_armor: {
    id: "steel_armor",
    name: "Steel Armor",
    description: "Heavy armor that sharply reduces wild Matt damage.",
    price: 220,
    sellPrice: 110,
    unique: true,
    armor: 0.34,
  },
  tempered_plate: {
    id: "tempered_plate",
    name: "Tempered Plate",
    description: "Tom's best plate. It greatly cuts wild Matt damage.",
    price: 360,
    sellPrice: 180,
    unique: true,
    armor: 0.46,
  },
  iron_whip: {
    id: "iron_whip",
    name: "Iron Whip",
    description: "Tom's reinforced whip head. Increases whip reach.",
    price: 150,
    sellPrice: 75,
    unique: true,
  },
  whetstone: {
    id: "whetstone",
    name: "Spark Whetstone",
    description: "A forge stone that adds more reach to Ivan's whip.",
    price: 125,
    sellPrice: 62,
    unique: true,
  },
  swift_boots: {
    id: "swift_boots",
    name: "Swift Boots",
    description: "Tom's fitted boots. Raises walk and sprint speed.",
    price: 135,
    sellPrice: 68,
    unique: true,
  },
  trail_map: {
    id: "trail_map",
    name: "Old Trail Map",
    description: "Brick's marked roads. Ivan moves faster across the field.",
    price: 145,
    sellPrice: 72,
    unique: true,
  },
  arena_handbook: {
    id: "arena_handbook",
    name: "Arena Handbook",
    description: "Scott's notes on Matt battles. Arena wins grant more XP.",
    price: 180,
    sellPrice: 90,
    unique: true,
  },
  sparring_gloves: {
    id: "sparring_gloves",
    name: "Sparring Gloves",
    description: "Soft arena wraps. Losses still teach your Matt a little.",
    price: 155,
    sellPrice: 78,
    unique: true,
  },
  inn_meal: {
    id: "inn_meal",
    name: "Hot Inn Meal",
    description: "Brick's road meal. Restores some health and stamina.",
    price: 25,
    sellPrice: 12,
    stackable: true,
    use: { health: 25, stamina: 20 },
  },
  coffee_flask: {
    id: "coffee_flask",
    name: "Coffee Flask",
    description: "Strong inn coffee. Restores stamina.",
    price: 35,
    sellPrice: 17,
    stackable: true,
    use: { stamina: 45 },
  },
  room_key: {
    id: "room_key",
    name: "Inn Room Key",
    description: "A keepsake key from Brick's Inn.",
    price: 75,
    sellPrice: 38,
    unique: true,
  },
  demented_essense: {
    id: "demented_essense",
    name: "DementedEssense",
    description: "A warped residue left behind by a defeated Demented Matt. Brick wants Scott to see it.",
    sellPrice: 0,
    stackable: true,
  },
};

const INVENTORY_CATEGORIES = [
  { id: "all", label: "All", description: "Everything Ivan is carrying." },
  { id: "consumable", label: "Recovery", description: "Health, stamina, meals, and field restoratives." },
  { id: "capture", label: "Capture", description: "Tools and passives that help tame wild Matts." },
  { id: "gear", label: "Gear", description: "Permanent upgrades and passive combat equipment." },
  { id: "bond", label: "Bond", description: "Items for caring for captured Matts and followers." },
  { id: "key", label: "Key", description: "Tickets, keepsakes, and special-use items." },
  { id: "misc", label: "Misc", description: "Anything that does not fit the other shelves." },
];

const INVENTORY_CATEGORY_ORDER = Object.fromEntries(INVENTORY_CATEGORIES.map((category, index) => [category.id, index]));

const SHOP_DEFS = {
  scott: {
    title: "Scott's Arena Desk",
    greeting: "Tickets are required past the arena gate.",
    buy: ["arena_ticket", "arena_handbook", "sparring_gloves", "bond_ribbon", "memory_locket", "focus_mint", "health_potion", "greater_health_potion", "stamina_tonic", "matt_treat"],
  },
  ty: {
    title: "Ty's Matt Store",
    greeting: "Ty buys captured Matts and sells Matt-handling gear.",
    buy: ["matt_snack", "capture_net", "calming_flute", "matt_treat", "camp_brush", "focus_mint", "bond_ribbon", "memory_locket", "matt_charm", "trade_ledger", "grass_matt_adoption", "water_matt_adoption", "rock_matt_adoption", "mystic_matt_adoption", "health_potion", "stamina_tonic"],
    buysMatts: true,
  },
  tom: {
    title: "Tom's Blacksmith",
    greeting: "Tom sells permanent field upgrades.",
    buy: ["iron_whip", "whetstone", "swift_boots", "guard_armor", "steel_armor", "tempered_plate", "ember_salve", "greater_health_potion"],
  },
  brick: {
    title: "Brick's Inn Counter",
    greeting: "Brick keeps travelers supplied.",
    buy: ["inn_meal", "hearty_stew", "coffee_flask", "river_tea", "inn_elixir", "camp_brush", "focus_mint", "trail_map", "room_key", "health_potion", "stamina_tonic"],
  },
  brock: {
    title: "Brock's Corner",
    greeting: "Brock is back at the inn, still piecing together what happened in the cave.",
    buy: [],
  },
  logan: {
    title: "Logan's Item Shop",
    greeting: "Logan keeps the shelves stocked for long roads and bad weather.",
    buy: ["health_potion", "greater_health_potion", "stamina_tonic", "matt_snack", "capture_net", "calming_flute", "camp_brush", "focus_mint", "trail_map"],
  },
};

const NPC_DIALOGUE = {
  scott: {
    speaker: "Scott",
    role: "Arena captain",
    mood: "measured, competitive, and watching your stance",
    intro:
      "Scott keeps one boot on the arena gate and one eye on the old roads. He says the arena was built to teach Matts restraint before the worlds split apart.",
    topics: [
      {
        id: "arena",
        label: "The Arena",
        text:
          "The arena is not just for showing off. When a Matt learns to fight without hurting the bond, it remembers who it is. The old trainers called that the first rule.",
      },
      {
        id: "tickets",
        label: "Tickets",
        text:
          "A ticket buys a clean match, a witness, and a gate seal. If anyone skips the seal, the arena starts listening to the wrong side of the world.",
      },
      {
        id: "worlds",
        label: "The Split",
        text:
          "Fire, water, roots, stone. Those doors used to be roads. Now they behave like moods. Bring back strong Matts and maybe the roads will remember us.",
      },
    ],
  },
  ty: {
    speaker: "Ty",
    role: "Matt handler",
    mood: "careful, patient, and always counting paw prints",
    intro:
      "Ty smells faintly of grain, rainwater, and ink. Every Matt he buys or sells gets marked in a careful ledger full of little paw prints.",
    services: ["Tame captured Matts", "Rename bonded Matts", "Set an active follower"],
    topics: [
      {
        id: "matts",
        label: "Matt Care",
        text:
          "Do not think of Matts as loot. Feed them, travel with them, let them win sometimes. Friendship changes how they stand in the arena.",
      },
      {
        id: "followers",
        label: "Followers",
        text:
          "A follower is not just a Matt walking behind you. I watch how it answers your voice, give it a name, and teach it where to stand when a fight turns ugly.",
      },
      {
        id: "naming",
        label: "Naming",
        text:
          "Names matter. A wild Matt hears a command. A named Matt hears a person. Keep the name short, say it often, and it will start looking for you before the road does.",
      },
      {
        id: "battle_bonds",
        label: "Battle Bonds",
        text:
          "When a tamed Matt helps you in the field, its bond grows fast. It will not finish a capture for you, but it can stagger a wild Matt and keep pressure off your feet.",
      },
      {
        id: "store",
        label: "The Store",
        text:
          "I sell gear because careless captures make mean Matts. Rock Matts need patience, Mystic Matts need quiet, and both are cheaper to befriend than to fix.",
      },
      {
        id: "lore",
        label: "Old Matt Names",
        text:
          "The oldest notes do not say monster. They say Matt, like it was a family name. I think someone forgot they were kin and called them wild.",
      },
    ],
  },
  tom: {
    speaker: "Tom",
    role: "Blacksmith",
    mood: "blunt, warm, and smelling of forge smoke",
    intro:
      "Tom's blacksmith shop sounds like a heartbeat. Every tool on his wall has a notch from some traveler who came back changed.",
    topics: [
      {
        id: "forge",
        label: "The Forge",
        text:
          "Fire Matts keep a forge honest. Too much heat and steel gets proud. Too little and it lies. Same with people, if you ask me.",
      },
      {
        id: "gear",
        label: "Gear",
        text:
          "Armor buys time, not courage. Boots buy distance, not direction. The whip is for calming Matts, not punishing them. Remember that.",
      },
      {
        id: "ruins",
        label: "The Ruins",
        text:
          "The tomb keeps Rock Matts close to the ground. The temple lets Mystic Matts float like they remember being lighter than a body. Both places know our names.",
      },
    ],
  },
  brick: {
    speaker: "Brick",
    role: "Innkeeper",
    mood: "steady, watchful, and already pouring another cup",
    intro:
      "Brick runs the inn like a lighthouse. His counter is covered in cups, maps, and rumors from people who swear the worlds move when nobody is looking.",
    topics: [
      {
        id: "inn",
        label: "The Inn",
        text:
          "Travelers need three things: food, a locked door, and somebody who believes them when they say the road changed behind them.",
      },
      {
        id: "rumors",
        label: "Rumors",
        text:
          "Water Matts hum near moonlit doors. Grass Matts sleep facing old roots. If a Mystic Matt floats without blinking, the temple is dreaming again.",
      },
      {
        id: "home",
        label: "Home",
        text:
          "Home is not the safest map. It is the place you can find again. That is why I keep maps even when they disagree with each other.",
      },
    ],
  },
  brock: {
    speaker: "Brock",
    role: "Recovering traveler",
    mood: "tired, grateful, and listening for footsteps",
    intro:
      "Brock sits near the inn wall with a blanket around his shoulders. He keeps thanking Ivan, then stopping like he is trying to remember a voice from underground.",
    topics: [
      {
        id: "cave",
        label: "The Cave",
        text:
          "The cave did not feel empty. I heard boots, then a voice that sounded like it was smiling at a locked door. After that, nothing until you found me.",
      },
      {
        id: "wizard",
        label: "The Wizard",
        text:
          "I only saw the edge of his robe. He kept saying Brock was bait, like he knew someone would come. He wanted a witness more than a prisoner.",
      },
      {
        id: "inn",
        label: "The Inn",
        text:
          "Brick keeps pretending he is just mad at me for worrying him. That is how I know he was scared. I am staying close to the counter for a while.",
      },
    ],
  },
  logan: {
    speaker: "Logan",
    role: "Item keeper",
    mood: "quick, practical, and impossible to understock",
    intro:
      "Logan keeps the item shop neat enough to find bandages in the dark. He claims every good expedition starts with checking your pockets twice.",
    topics: [
      {
        id: "supplies",
        label: "Supplies",
        text:
          "Potions keep you standing, snacks keep Matts listening, and a trail map keeps the road from pretending it never met you.",
      },
      {
        id: "town",
        label: "Town Trade",
        text:
          "Town looks quiet from the street, but every counter here knows something. Brick hears rumors, Tom hears steel, and I hear empty bags.",
      },
      {
        id: "wilds",
        label: "Northern Wilds",
        text:
          "The northern road is still sealed. When it opens, bring warmth, patience, and more supplies than pride says you need.",
      },
    ],
  },
};

const NPC_MISSIONS = {
  scott: {
    id: "scott-fire-trial",
    title: "Arena Fire Trial",
    briefing:
      "Scott wants proof you can handle heat before he trusts you with tougher brackets. Capture a Fire Matt and show it at the arena desk.",
    requirements: [{ type: "firematt", count: 1 }],
    rewardCoins: 120,
    rewardItems: [{ id: "arena_handbook", count: 1 }],
    completeText:
      "Scott taps the arena rail twice. Good. Fire listens to you without eating the leash. Take my handbook.",
  },
  ty: {
    id: "ty-new-ledger",
    title: "Ty's New Ledger",
    briefing:
      "Ty is rebuilding the old Matt records. Capture one Grass Matt, one Water Matt, and one Mystic Matt so he can compare how their markings changed after the split.",
    requirements: [
      { type: "grassmatt", count: 1 },
      { type: "watermatt", count: 1 },
      { type: "mysticmatt", count: 1 },
    ],
    rewardCoins: 210,
    rewardItems: [
      { id: "trade_ledger", count: 1 },
      { id: "matt_treat", count: 2 },
    ],
    completeText:
      "Ty writes for a long time before smiling. The water lines, root lines, and temple marks still match. They came from the same first family.",
  },
  tom: {
    id: "tom-forge-proof",
    title: "Forge Proof",
    briefing:
      "Tom needs a Fire Matt's heat signature and a Rock Matt's tomb grit to temper a safer whip edge.",
    requirements: [
      { type: "firematt", count: 1 },
      { type: "rockmatt", count: 1 },
    ],
    rewardCoins: 150,
    rewardItems: [
      { id: "whetstone", count: 1 },
      { id: "ember_salve", count: 2 },
    ],
    completeText:
      "Tom cools the steel against tomb grit and nods. This edge should calm without cutting deeper than it has to.",
  },
  brick: {
    id: "brick-road-rumors",
    title: "Road Rumors",
    briefing:
      "Brick wants a Water Matt and a Grass Matt in town long enough to see which old roads they react to.",
    requirements: [
      { type: "watermatt", count: 1 },
      { type: "grassmatt", count: 1 },
    ],
    rewardCoins: 95,
    rewardItems: [
      { id: "trail_map", count: 1 },
      { id: "inn_elixir", count: 1 },
    ],
    completeText:
      "Brick marks two roads on your map. If both Matts watched the same hill, then the hill is not done moving.",
  },
};

const INTRO_QUESTS = {
  intro_wake_brick: {
    id: "intro_wake_brick",
    npcId: "brick",
    title: "Wake Up at Brick's Inn",
    objective: "Talk to Brick at the inn.",
    dialogue:
      "Brick: Easy, Ivan. I found you in the woods badly beaten and burned. Looked like Fire Matt work. You are in my inn now. I keep the rooms and recovery beds. Ty runs the Matt Store for capture jobs and bonding. Scott manages the arena. Logan stocks supplies. Tom handles forge work. First thing: prove you can still handle a calm capture.",
    actionLabel: "Ask how to help",
    next: "intro_bring_5_doggmatts",
  },
  intro_bring_5_doggmatts: {
    id: "intro_bring_5_doggmatts",
    npcId: "brick",
    title: "Brick's Recovery Test",
    objective: "Capture 5 Doggmatts, then return to Brick.",
    briefing: "Brick wants you to capture 5 Doggmatts before he lets you roam too far from the inn.",
    readyText: "Brick: Five Doggmatts and steady hands. Good. Take this room key. If the road knocks you flat again, you have a place to recover. Go see Ty at the Matt Store next.",
    requirements: [{ type: "dogmatt", count: 5 }],
    rewardItems: [{ id: "room_key", count: 1 }],
    next: "intro_go_to_ty",
  },
  intro_go_to_ty: {
    id: "intro_go_to_ty",
    npcId: "ty",
    title: "Go to Ty",
    objective: "Talk to Ty at the Matt Store.",
    dialogue: "Ty: Brick sent you? Good. I handle capture records and bonding. We will go one Matt at a time so your ledger stays clean.",
    actionLabel: "Start Ty's captures",
    next: "ty_capture_grass",
  },
  ty_capture_grass: {
    id: "ty_capture_grass",
    npcId: "ty",
    title: "Ty's Grass Capture",
    objective: "Capture 1 Grass Matt, then return to Ty.",
    briefing: "Ty wants a Grass Matt first. Watch how it moves around roots and open paths.",
    readyText: "Ty: Grass Matt first, just like the old ledgers. Next is Fire Matt. Do not rush the heat.",
    requirements: [{ type: "grassmatt", count: 1 }],
    next: "ty_capture_fire",
  },
  ty_capture_fire: {
    id: "ty_capture_fire",
    npcId: "ty",
    title: "Ty's Fire Capture",
    objective: "Capture 1 Fire Matt, then return to Ty.",
    briefing: "Ty wants a Fire Matt. Keep distance and do not let panic guide the whip.",
    readyText: "Ty: Fire Matt logged. That burn pattern matches what Brick described, but this one is ordinary field heat. Next, Water Matt.",
    requirements: [{ type: "firematt", count: 1 }],
    next: "ty_capture_water",
  },
  ty_capture_water: {
    id: "ty_capture_water",
    npcId: "ty",
    title: "Ty's Water Capture",
    objective: "Capture 1 Water Matt, then return to Ty.",
    briefing: "Ty wants a Water Matt so you learn the rhythm of a slower capture.",
    readyText: "Ty: Water Matt recorded. Good hands. Now bring me a Rock Matt.",
    requirements: [{ type: "watermatt", count: 1 }],
    next: "ty_capture_rock",
  },
  ty_capture_rock: {
    id: "ty_capture_rock",
    npcId: "ty",
    title: "Ty's Rock Capture",
    objective: "Capture 1 Rock Matt, then return to Ty.",
    briefing: "Ty wants a Rock Matt. They test patience more than speed.",
    readyText: "Ty: Rock Matt recorded. Last capture lesson: Mystic Matt. Stay calm if the air feels wrong.",
    requirements: [{ type: "rockmatt", count: 1 }],
    next: "ty_capture_mystic",
  },
  ty_capture_mystic: {
    id: "ty_capture_mystic",
    npcId: "ty",
    title: "Ty's Mystic Capture",
    objective: "Capture 1 Mystic Matt, then return to Ty.",
    briefing: "Ty wants a Mystic Matt to finish the capture sequence.",
    readyText: "Ty: Mystic Matt recorded. That completes the capture order. Now we talk bonding.",
    requirements: [{ type: "mysticmatt", count: 1 }],
    next: "ty_bonding_tutorial",
  },
  ty_bonding_tutorial: {
    id: "ty_bonding_tutorial",
    npcId: "ty",
    title: "Ty's Bonding Lesson",
    objective: "Talk to Ty about why bonding matters.",
    dialogue:
      "Ty: A captured Matt is not finished work. Bonding is how it learns your voice instead of just your commands. A better bond means steadier arena turns, stronger follower help, and new skills that only open when a Matt trusts you.",
    actionLabel: "Take Ty's starter kit",
    rewardItems: [
      { id: "matt_treat", count: 2 },
      { id: "camp_brush", count: 1 },
    ],
    rewardMatts: [
      { type: "dogmatt", name: "Ty's Pup", friendship: 12 },
    ],
    next: "ty_bonding_tame_follower",
  },
  ty_bonding_tame_follower: {
    id: "ty_bonding_tame_follower",
    npcId: "ty",
    title: "Ty's Taming Lesson",
    objective: "Use Ty's Followers tab to tame one Matt into an active follower.",
    briefing:
      "Ty: First lesson is taming. Open Followers, pick a captured Matt, and let me teach it a name. A tamed Matt can follow you, rest, or be renamed.",
    readyText:
      "Ty: Good. Once a Matt knows its name, it stops being cargo and starts being a partner. Now we care for that bond directly.",
    readyWhen: "has_tamed_follower",
    actionLabel: "Learn care",
    next: "ty_bonding_care",
  },
  ty_bonding_care: {
    id: "ty_bonding_care",
    npcId: "ty",
    title: "Ty's Care Lesson",
    objective: "Use the Bond tab to care for, treat, brush, mint, or spar with a Matt once.",
    briefing:
      "Ty: Open Bond. Care is free once per Matt each day. Treats, brushes, mints, sparring, walking together, and field assists all raise friendship. Higher friendship improves arena stats and unlocks bond skills.",
    readyText:
      "Ty: See the bond move? Small care, repeated often, changes how a Matt fights and follows. Do not save it only for emergencies.",
    readyWhen: "bond_care_used",
    actionLabel: "Learn follower commands",
    next: "ty_bonding_field_commands",
  },
  ty_bonding_field_commands: {
    id: "ty_bonding_field_commands",
    npcId: "ty",
    title: "Ty's Field Bonding Lesson",
    objective: "Talk to Ty about follower commands and field bonding.",
    dialogue:
      "Ty: In the field, a follower can return, stay, guard you, or attack a target you choose. Walking with it builds trust over time, and helping in fights gives friendship and XP. Scott handles the arena side, where that bond becomes health, power, energy, and ability unlocks.",
    actionLabel: "Go to Scott",
    next: "intro_go_to_scott",
  },
  intro_go_to_scott: {
    id: "intro_go_to_scott",
    npcId: "scott",
    title: "Go to Scott",
    objective: "Talk to Scott at the arena.",
    dialogue: "Scott: Ty sent you for the arena lesson. The arena is for restraint, not showing off. I will give you one free practice battle against me.",
    actionLabel: "Accept practice",
    next: "scott_practice_battle",
  },
  scott_practice_battle: {
    id: "scott_practice_battle",
    npcId: "scott",
    title: "Scott's Practice Battle",
    objective: "Fight Scott in one free practice arena battle.",
    dialogue: "Scott: Pick one of your captured Matts. Win or lose, the point is learning turns, energy, and bonds.",
    actionLabel: "Start practice",
    practiceBattle: true,
    next: "intro_go_to_logan",
  },
  intro_go_to_logan: {
    id: "intro_go_to_logan",
    npcId: "logan",
    title: "Go to Logan",
    objective: "Talk to Logan at the General Store.",
    dialogue: "Logan: Scott sent you because empty pockets end more adventures than monsters do. Bring me a small variety of Matts so I know what supplies you will actually need.",
    actionLabel: "Take Logan's request",
    next: "logan_capture_variety",
  },
  logan_capture_variety: {
    id: "logan_capture_variety",
    npcId: "logan",
    title: "Logan's Supply Survey",
    objective: "Capture 1 each: Dogg, Grass, Fire, Water, Rock, and Mystic Matt. Return to Logan.",
    briefing: "Logan wants a field sample from every basic Matt type before stocking you for longer routes.",
    readyText: "Logan: That is enough variety to pack smart. Here is your pay, plus a few things from the useful shelf. Take your next problem to Tom.",
    requirements: [
      { type: "dogmatt", count: 1 },
      { type: "grassmatt", count: 1 },
      { type: "firematt", count: 1 },
      { type: "watermatt", count: 1 },
      { type: "rockmatt", count: 1 },
      { type: "mysticmatt", count: 1 },
    ],
    rewardCoins: 180,
    randomRewardItems: [
      { id: "health_potion", count: 2 },
      { id: "stamina_tonic", count: 2 },
      { id: "matt_snack", count: 2 },
      { id: "capture_net", count: 1 },
      { id: "camp_brush", count: 1 },
    ],
    randomRewardCount: 3,
    next: "intro_go_to_tom",
  },
  intro_go_to_tom: {
    id: "intro_go_to_tom",
    npcId: "tom",
    title: "Go to Tom",
    objective: "Talk to Tom at the Blacksmith.",
    dialogue: "Tom: Logan says you can follow instructions. Good. Bring me a couple of Matts with useful heat and grit, and I can see what your gear needs next.",
    actionLabel: "Take Tom's request",
    next: "tom_capture_request",
  },
  tom_capture_request: {
    id: "tom_capture_request",
    npcId: "tom",
    title: "Tom's Forge Sample",
    objective: "Capture 1 Fire Matt and 1 Rock Matt, then return to Tom.",
    briefing: "Tom wants a Fire Matt and a Rock Matt for a first forge sample.",
    readyText: "Tom: That will do. Heat, grit, and a trainer who can listen. Your intro work is finished. Now the roads are yours.",
    requirements: [
      { type: "firematt", count: 1 },
      { type: "rockmatt", count: 1 },
    ],
    next: "intro_complete",
  },
  intro_complete: {
    id: "intro_complete",
    title: "Introduction Complete",
    objective: "Explore Matt Game.",
  },
};

const INTRO_QUEST_SEQUENCE = [
  "intro_wake_brick",
  "intro_bring_5_doggmatts",
  "intro_go_to_ty",
  "ty_capture_grass",
  "ty_capture_fire",
  "ty_capture_water",
  "ty_capture_rock",
  "ty_capture_mystic",
  "ty_bonding_tutorial",
  "ty_bonding_tame_follower",
  "ty_bonding_care",
  "ty_bonding_field_commands",
  "intro_go_to_scott",
  "scott_practice_battle",
  "intro_go_to_logan",
  "logan_capture_variety",
  "intro_go_to_tom",
  "tom_capture_request",
  "intro_complete",
];

const INTRO_WORLD_UNLOCKS = [
  {
    questId: "intro_wake_brick",
    worlds: ["town_inn", "town_inn_rooms", "town", "mainworld"],
  },
  {
    questId: "intro_go_to_ty",
    worlds: ["town_mattstore"],
  },
  {
    questId: "ty_capture_grass",
    worlds: ["treeworld"],
  },
  {
    questId: "ty_capture_fire",
    worlds: ["fireworld"],
  },
  {
    questId: "ty_capture_water",
    worlds: ["purplewaterworld"],
  },
  {
    questId: "ty_capture_rock",
    worlds: ["tomb"],
  },
  {
    questId: "ty_capture_mystic",
    worlds: ["temple"],
  },
  {
    questId: "intro_go_to_scott",
    worlds: ["town_arena_entrance"],
  },
  {
    questId: "scott_practice_battle",
    worlds: ["town_arena"],
  },
  {
    questId: "intro_go_to_logan",
    worlds: ["town_itemshop"],
  },
  {
    questId: "intro_go_to_tom",
    worlds: ["town_blacksmith"],
  },
];

const MATT_SELL_VALUES = {
  dogmatt: 35,
  firematt: 85,
  grassmatt: 70,
  watermatt: 75,
  rockmatt: 95,
  mysticmatt: 120,
  dementedmatt: 140,
};

const ARENA_OPPONENTS = [
  { id: "scott", name: "Scott", mattType: "firematt", title: "Arena Captain", strategy: "pressure" },
  { id: "ty", name: "Ty", mattType: "grassmatt", title: "Matt Handler", strategy: "control" },
  { id: "tom", name: "Tom", mattType: "firematt", title: "Forge Brawler", strategy: "guard" },
  { id: "brick", name: "Brick", mattType: "watermatt", title: "Inn Bruiser", strategy: "tempo" },
  { id: "tom", name: "Tom", mattType: "rockmatt", title: "Stone Circuit Smith", strategy: "guard" },
  { id: "ty", name: "Ty", mattType: "mysticmatt", title: "Mystic Matt Handler", strategy: "control" },
];

const FRIENDSHIP_RANKS = [
  { min: 0, name: "Wary", hp: 0, power: 0, energy: 0, crit: 0.04, xp: 1 },
  { min: 18, name: "Friendly", hp: 6, power: 2, energy: 4, crit: 0.06, xp: 1.05 },
  { min: 38, name: "Loyal", hp: 12, power: 4, energy: 8, crit: 0.08, xp: 1.1 },
  { min: 62, name: "Bonded", hp: 20, power: 7, energy: 12, crit: 0.11, xp: 1.18 },
  { min: 86, name: "Heartbound", hp: 30, power: 11, energy: 18, crit: 0.15, xp: 1.3 },
];

const ARENA_STATUS_LABELS = {
  burn: "Burn",
  regen: "Regen",
  weaken: "Weaken",
  guard: "Guard",
  focus: "Focus",
  mist: "Mist",
  snare: "Snare",
  soaked: "Soaked",
  thorns: "Thorns",
};

const ARENA_ABILITIES = {
  dogmatt: [
    {
      id: "scrappy_bite",
      name: "Scrappy Bite",
      power: 18,
      cost: 14,
      cooldown: 0,
      element: "body",
      text: "lunges in with a quick bite",
      detail: "Fast damage with a small crit bonus.",
      crit: 0.04,
    },
    {
      id: "pack_howl",
      name: "Pack Howl",
      power: 10,
      heal: 12,
      shield: 8,
      cost: 22,
      cooldown: 1,
      element: "heart",
      text: "howls and rallies back",
      detail: "Deals light damage, heals, and adds a shield.",
      selfStatus: [{ id: "focus", turns: 2, amount: 4 }],
    },
    {
      id: "tail_feint",
      name: "Tail Feint",
      power: 14,
      cost: 18,
      cooldown: 1,
      element: "body",
      text: "feints through the strike",
      detail: "Adds Mist, making the next counter easier to dodge.",
      selfStatus: [{ id: "mist", turns: 1, amount: 28 }],
    },
    {
      id: "loyal_rush",
      name: "Loyal Rush",
      power: 28,
      cost: 34,
      cooldown: 2,
      element: "heart",
      friendship: 35,
      text: "charges because it trusts you",
      detail: "A bond-locked heavy hit with bonus crit.",
      crit: 0.12,
    },
    {
      id: "guardian_snap",
      name: "Guardian Snap",
      power: 20,
      shield: 18,
      cost: 28,
      cooldown: 2,
      element: "body",
      level: 5,
      friendship: 55,
      text: "guards you with a sharp snap",
      detail: "Good damage plus a strong shield.",
      selfStatus: [{ id: "guard", turns: 2, amount: 5 }],
    },
    {
      id: "heartpack_breaker",
      name: "Heartpack Breaker",
      power: 38,
      heal: 10,
      cost: 48,
      cooldown: 3,
      element: "heart",
      level: 8,
      friendship: 78,
      text: "breaks through with full pack spirit",
      detail: "A high-bond finisher that also heals.",
      crit: 0.16,
      pierce: 10,
    },
  ],
  firematt: [
    {
      id: "coal_burst",
      name: "Coal Burst",
      power: 22,
      cost: 18,
      cooldown: 0,
      element: "fire",
      text: "erupts in hot sparks",
      detail: "Reliable fire damage.",
    },
    {
      id: "hammer_flare",
      name: "Hammer Flare",
      power: 18,
      cost: 24,
      cooldown: 1,
      element: "fire",
      text: "slams a burning arc",
      detail: "Applies Burn for damage over time.",
      targetStatus: [{ id: "burn", turns: 2, amount: 7 }],
    },
    {
      id: "forge_guard",
      name: "Forge Guard",
      power: 10,
      heal: 12,
      shield: 16,
      cost: 24,
      cooldown: 1,
      element: "metal",
      text: "hardens behind heat shimmer",
      detail: "Heals and raises a shield.",
      selfStatus: [{ id: "guard", turns: 2, amount: 6 }],
    },
    {
      id: "cinder_mark",
      name: "Cinder Mark",
      power: 24,
      cost: 31,
      cooldown: 2,
      element: "fire",
      friendship: 30,
      text: "marks the target with ember light",
      detail: "Burns and weakens the enemy's next blows.",
      targetStatus: [
        { id: "burn", turns: 2, amount: 5 },
        { id: "weaken", turns: 2, amount: 5 },
      ],
    },
    {
      id: "anvil_comet",
      name: "Anvil Comet",
      power: 36,
      cost: 44,
      cooldown: 3,
      element: "metal",
      level: 6,
      friendship: 52,
      text: "drops like a forged star",
      detail: "Heavy piercing damage through shields.",
      pierce: 18,
      crit: 0.08,
    },
    {
      id: "phoenix_heat",
      name: "Phoenix Heat",
      power: 16,
      heal: 26,
      cost: 46,
      cooldown: 3,
      element: "fire",
      level: 9,
      friendship: 76,
      text: "stands back up in bright heat",
      detail: "Damage, healing, and regeneration.",
      selfStatus: [{ id: "regen", turns: 3, amount: 8 }],
      targetStatus: [{ id: "burn", turns: 2, amount: 6 }],
    },
  ],
  grassmatt: [
    {
      id: "vine_lash",
      name: "Vine Lash",
      power: 19,
      cost: 16,
      cooldown: 0,
      element: "grass",
      text: "snaps a vine across the arena",
      detail: "Efficient grass damage.",
    },
    {
      id: "root_snare",
      name: "Root Snare",
      power: 15,
      cost: 22,
      cooldown: 1,
      element: "grass",
      text: "snags the enemy in roots",
      detail: "Weakens and slows enemy energy recovery.",
      targetStatus: [
        { id: "weaken", turns: 2, amount: 5 },
        { id: "snare", turns: 2, amount: 6 },
      ],
    },
    {
      id: "bloom_mend",
      name: "Bloom Mend",
      power: 8,
      heal: 20,
      cost: 25,
      cooldown: 1,
      element: "grass",
      text: "blooms and recovers",
      detail: "A strong heal with gentle regeneration.",
      selfStatus: [{ id: "regen", turns: 2, amount: 6 }],
    },
    {
      id: "thorn_wall",
      name: "Thorn Wall",
      power: 12,
      shield: 22,
      cost: 30,
      cooldown: 2,
      element: "grass",
      friendship: 28,
      text: "raises a bristling wall",
      detail: "Shields and punishes attackers.",
      selfStatus: [
        { id: "guard", turns: 2, amount: 4 },
        { id: "thorns", turns: 2, amount: 5 },
      ],
    },
    {
      id: "sunroot_surge",
      name: "Sunroot Surge",
      power: 32,
      heal: 10,
      cost: 41,
      cooldown: 3,
      element: "grass",
      level: 6,
      friendship: 55,
      text: "pulls old sunlight from the floor",
      detail: "Heavy damage that also restores health.",
      targetStatus: [{ id: "snare", turns: 2, amount: 8 }],
    },
    {
      id: "ancient_grove",
      name: "Ancient Grove",
      power: 24,
      heal: 24,
      shield: 16,
      cost: 50,
      cooldown: 3,
      element: "grass",
      level: 9,
      friendship: 80,
      text: "turns the arena quiet and green",
      detail: "A high-bond sustain move with damage, heal, and shield.",
      selfStatus: [{ id: "regen", turns: 3, amount: 7 }],
    },
  ],
  watermatt: [
    {
      id: "tide_crash",
      name: "Tide Crash",
      power: 20,
      cost: 17,
      cooldown: 0,
      element: "water",
      text: "crashes forward with a wave",
      detail: "Reliable water damage.",
    },
    {
      id: "mist_veil",
      name: "Mist Veil",
      power: 12,
      cost: 22,
      cooldown: 1,
      element: "water",
      text: "vanishes into cool mist",
      detail: "Adds a strong dodge chance.",
      selfStatus: [{ id: "mist", turns: 2, amount: 34 }],
    },
    {
      id: "bubble_barrage",
      name: "Bubble Barrage",
      power: 16,
      cost: 21,
      cooldown: 1,
      element: "water",
      text: "pelts the enemy with bubbles",
      detail: "Soaks the enemy, making follow-up hits stronger.",
      targetStatus: [{ id: "soaked", turns: 2, amount: 5 }],
    },
    {
      id: "riptide_pull",
      name: "Riptide Pull",
      power: 26,
      cost: 33,
      cooldown: 2,
      element: "water",
      friendship: 32,
      text: "drags the tempo sideways",
      detail: "Damage plus Snare and Weaken.",
      targetStatus: [
        { id: "snare", turns: 2, amount: 8 },
        { id: "weaken", turns: 1, amount: 7 },
      ],
    },
    {
      id: "moonwell",
      name: "Moonwell",
      power: 10,
      heal: 30,
      cost: 42,
      cooldown: 3,
      element: "water",
      level: 6,
      friendship: 54,
      text: "opens a cool moonlit well",
      detail: "Big heal, cleanse, and Mist.",
      cleanse: true,
      selfStatus: [{ id: "mist", turns: 1, amount: 24 }],
    },
    {
      id: "leviathan_ring",
      name: "Leviathan Ring",
      power: 36,
      cost: 50,
      cooldown: 3,
      element: "water",
      level: 9,
      friendship: 78,
      text: "rings the arena with deep water",
      detail: "A high-bond finisher that pierces shields.",
      targetStatus: [{ id: "soaked", turns: 3, amount: 7 }],
      pierce: 12,
      crit: 0.1,
    },
  ],
  rockmatt: [
    {
      id: "stone_jab",
      name: "Stone Jab",
      power: 21,
      cost: 17,
      cooldown: 0,
      element: "stone",
      text: "steps in with a blunt stone jab",
      detail: "Reliable rock damage.",
    },
    {
      id: "granite_guard",
      name: "Granite Guard",
      power: 10,
      shield: 24,
      cost: 24,
      cooldown: 1,
      element: "stone",
      text: "plants itself behind granite plates",
      detail: "Adds a strong shield and Guard.",
      selfStatus: [{ id: "guard", turns: 2, amount: 7 }],
    },
    {
      id: "gravel_snare",
      name: "Gravel Snare",
      power: 16,
      cost: 23,
      cooldown: 1,
      element: "stone",
      text: "kicks gravel under the enemy",
      detail: "Damage plus Snare.",
      targetStatus: [{ id: "snare", turns: 2, amount: 8 }],
    },
    {
      id: "faultline",
      name: "Faultline",
      power: 28,
      cost: 35,
      cooldown: 2,
      element: "stone",
      friendship: 34,
      text: "cracks the floor in a sharp line",
      detail: "Heavy hit that weakens the target.",
      targetStatus: [{ id: "weaken", turns: 2, amount: 7 }],
      pierce: 8,
    },
    {
      id: "obsidian_shell",
      name: "Obsidian Shell",
      power: 14,
      shield: 34,
      cost: 42,
      cooldown: 3,
      element: "stone",
      level: 6,
      friendship: 56,
      text: "wraps itself in dark stone",
      detail: "Big shield with Thorns.",
      selfStatus: [
        { id: "guard", turns: 2, amount: 8 },
        { id: "thorns", turns: 2, amount: 6 },
      ],
    },
    {
      id: "mountain_verdict",
      name: "Mountain Verdict",
      power: 40,
      cost: 52,
      cooldown: 3,
      element: "stone",
      level: 9,
      friendship: 80,
      text: "drops the weight of the tomb",
      detail: "A high-bond finisher with strong shield pierce.",
      pierce: 22,
      crit: 0.08,
    },
  ],
  mysticmatt: [
    {
      id: "arcane_pulse",
      name: "Arcane Pulse",
      power: 20,
      cost: 16,
      cooldown: 0,
      element: "mystic",
      text: "rings the air with a purple pulse",
      detail: "Reliable mystic damage.",
    },
    {
      id: "veil_drift",
      name: "Veil Drift",
      power: 12,
      cost: 23,
      cooldown: 1,
      element: "mystic",
      text: "floats out of phase",
      detail: "Adds Mist and Focus.",
      selfStatus: [
        { id: "mist", turns: 2, amount: 30 },
        { id: "focus", turns: 2, amount: 4 },
      ],
    },
    {
      id: "star_bind",
      name: "Star Bind",
      power: 17,
      cost: 25,
      cooldown: 1,
      element: "mystic",
      text: "threads star light around the enemy",
      detail: "Snare and Weaken together.",
      targetStatus: [
        { id: "snare", turns: 2, amount: 7 },
        { id: "weaken", turns: 1, amount: 5 },
      ],
    },
    {
      id: "rune_mend",
      name: "Rune Mend",
      power: 8,
      heal: 26,
      cost: 34,
      cooldown: 2,
      element: "mystic",
      friendship: 35,
      text: "draws a healing rune in the air",
      detail: "Healing, cleanse, and light damage.",
      cleanse: true,
      selfStatus: [{ id: "regen", turns: 2, amount: 6 }],
    },
    {
      id: "astral_break",
      name: "Astral Break",
      power: 35,
      cost: 45,
      cooldown: 3,
      element: "mystic",
      level: 6,
      friendship: 58,
      text: "splits the target's aura",
      detail: "Piercing hit with bonus crit.",
      pierce: 16,
      crit: 0.14,
    },
    {
      id: "temple_echo",
      name: "Temple Echo",
      power: 30,
      heal: 18,
      shield: 18,
      cost: 54,
      cooldown: 3,
      element: "mystic",
      level: 9,
      friendship: 82,
      text: "answers with the temple's old voice",
      detail: "A high-bond sustain finisher with Focus.",
      selfStatus: [{ id: "focus", turns: 3, amount: 8 }],
      targetStatus: [{ id: "weaken", turns: 2, amount: 8 }],
    },
  ],
};

const ARENA_WIN_XP = 38;
const ARENA_MAX_ENERGY = 100;
const FRIENDSHIP_WALK_SECONDS = 45;

const MUSIC_TRACKS = Array.isArray(window.GAME_MUSIC_TRACKS) && window.GAME_MUSIC_TRACKS.length > 0
  ? window.GAME_MUSIC_TRACKS
  : [
  "assets/music/Campfire Spell.mp3",
  "assets/music/Lantern Ruins.mp3",
  "assets/music/Riverstone Lullaby.mp3",
];
const MOBILE_WORLD_SCALE = 0.5;

const PARTICLES = {
  max: 520,
  ambientRate: 0.16,
};

const CLOCK = {
  realSecondsPerGameDay: 720,
  startHour: 6,
  nightStartHour: 20,
  nightEndHour: 6,
};

const WORLD_STORAGE_KEY = "ivan-monster-hunt-worlds-v2";
const MATT_PROGRESS_STORAGE_KEY = "ivan-monster-hunt-matt-progress-v1";
const ECONOMY_STORAGE_KEY = "ivan-monster-hunt-economy-v1";
const PROFILE_STORAGE_KEY = "ivan-monster-hunt-profiles-v1";
const ACTIVE_PROFILE_STORAGE_KEY = "ivan-monster-hunt-active-profile-v1";
const NEW_GAME_INTRO_STORAGE_KEY = "ivan-monster-hunt-new-game-intro-v1";
const WAYSTONE_NODE_KIND = "waystone";
const WAYSTONE_DEFAULT_REWARD = "random";
const INTRO_START_WORLD_ID = "town_inn";
const INTRO_NPC_IDS = ["brick", "ty", "scott", "logan", "tom"];
const MATT_PARTY_LIMIT = 6;
const STARTING_COINS = 120;
const SHOP_INTERACT_RADIUS = 310;
const MAX_PLAYER_LEVEL = 50;
const WORLD_IDS = [
  "mainworld",
  "town",
  "town_arena_entrance",
  "town_arena",
  "town_blacksmith",
  "town_inn",
  "town_inn_rooms",
  "town_mattstore",
  "town_itemshop",
  "fireworld",
  "purplewaterworld",
  "water_tree",
  "water_hut",
  "water_cove",
  "temple",
  "tomb",
  "treeworld",
  "grass_tree",
  "grass_camp",
  "grass_cave",
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
  town_itemshop: "Item Shop",
  fireworld: "Fireworld",
  purplewaterworld: "Water World",
  water_tree: "Water Tree",
  water_hut: "Water Hut",
  water_cove: "Water Cove",
  temple: "Temple",
  tomb: "Tomb",
  treeworld: "Grass World",
  grass_tree: "Grass Tree",
  grass_camp: "Grass Camp",
  grass_cave: "Grass Cave",
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
  town_itemshop: "rgba(255, 230, 150, 0.05)",
  fireworld: "rgba(224, 70, 38, 0.16)",
  purplewaterworld: "rgba(52, 170, 218, 0.14)",
  water_tree: "rgba(52, 170, 218, 0.12)",
  water_hut: "rgba(52, 170, 218, 0.12)",
  water_cove: "rgba(52, 170, 218, 0.12)",
  temple: "rgba(235, 205, 132, 0.11)",
  tomb: "rgba(80, 92, 104, 0.18)",
  treeworld: "rgba(86, 178, 76, 0.13)",
  grass_tree: "rgba(86, 178, 76, 0.11)",
  grass_camp: "rgba(86, 178, 76, 0.11)",
  grass_cave: "rgba(86, 178, 76, 0.11)",
  home: "rgba(247, 221, 152, 0.1)",
};

const PAUSE_MENU_TABS = [
  { id: "character", label: "Character", title: "Character" },
  { id: "skills", label: "Skills", title: "Skill Tree" },
  { id: "inventory", label: "Inventory", title: "Inventory" },
  { id: "map", label: "Map", title: "Map" },
  { id: "journal", label: "Journal", title: "Journal" },
  { id: "missions", label: "Missions", title: "Missions" },
  { id: "party", label: "Party", title: "Party" },
];

const SKILL_BRANCH_DEFS = {
  Explorer: {
    label: "Explorer",
    description: "Movement, stamina, map sense, and staying nimble while the field gets mean.",
  },
  Survivor: {
    label: "Survivor",
    description: "Health, armor discipline, recovery items, and lasting longer against dangerous Matts.",
  },
  Hunter: {
    label: "Hunter",
    description: "Whip control, capture odds, boss pressure, and better rewards from hard catches.",
  },
  Bond: {
    label: "Bond",
    description: "Follower combat, friendship growth, arena tempo, and turning captured Matts into partners.",
  },
  Pack: {
    label: "Pack",
    description: "Inventory mastery, stronger supplies, and better trade value from every shop run.",
  },
};

const PLAYER_SKILLS = {
  trail_runner: {
    id: "trail_runner",
    name: "Trail Runner",
    branch: "Explorer",
    tier: 1,
    maxRank: 3,
    description: "Move faster and sprint longer.",
    perRank: "+30 walk speed, +45 sprint speed, +8 stamina",
  },
  steady_breath: {
    id: "steady_breath",
    name: "Steady Breath",
    branch: "Explorer",
    tier: 2,
    maxRank: 3,
    requires: { trail_runner: 1 },
    description: "Recover stamina faster and spend less while sprinting.",
    perRank: "+7 stamina regen, -2 sprint drain",
  },
  pathfinder: {
    id: "pathfinder",
    name: "Pathfinder",
    branch: "Explorer",
    tier: 3,
    maxRank: 3,
    requires: { steady_breath: 1 },
    description: "Read terrain better and keep your pace through long routes.",
    perRank: "+18 walk speed, +28 sprint speed, +2 stamina regen",
  },
  evasive_stride: {
    id: "evasive_stride",
    name: "Evasive Stride",
    branch: "Explorer",
    tier: 4,
    maxRank: 2,
    requires: { pathfinder: 2 },
    description: "Recover from hits cleanly and create a bigger escape window.",
    perRank: "+10% post-hit safety, +14 sprint speed",
  },
  field_endurance: {
    id: "field_endurance",
    name: "Field Endurance",
    branch: "Survivor",
    tier: 1,
    maxRank: 3,
    description: "Increase Ivan's maximum health.",
    perRank: "+14 max health",
  },
  iron_will: {
    id: "iron_will",
    name: "Iron Will",
    branch: "Survivor",
    tier: 2,
    maxRank: 3,
    requires: { field_endurance: 1 },
    description: "Reduce wild Matt damage before armor is applied.",
    perRank: "-6% wild damage",
  },
  field_medic: {
    id: "field_medic",
    name: "Field Medic",
    branch: "Survivor",
    tier: 3,
    maxRank: 3,
    requires: { field_endurance: 2 },
    description: "Squeeze more recovery out of health items.",
    perRank: "+9% health restored from items",
  },
  last_stand: {
    id: "last_stand",
    name: "Last Stand",
    branch: "Survivor",
    tier: 4,
    maxRank: 2,
    requires: { iron_will: 2, field_medic: 1 },
    description: "Toughen up for boss fights and other heavy hits.",
    perRank: "+10 max health, +3% damage reduction",
  },
  whip_mastery: {
    id: "whip_mastery",
    name: "Whip Mastery",
    branch: "Hunter",
    tier: 1,
    maxRank: 3,
    description: "Extend whip reach and make field captures less exhausting.",
    perRank: "+28 whip range, capture XP bonus",
  },
  calm_hands: {
    id: "calm_hands",
    name: "Calm Hands",
    branch: "Hunter",
    tier: 2,
    maxRank: 3,
    requires: { whip_mastery: 1 },
    description: "Improve capture odds against stronger Matts.",
    perRank: "+6% capture chance",
  },
  clean_capture: {
    id: "clean_capture",
    name: "Clean Capture",
    branch: "Hunter",
    tier: 3,
    maxRank: 3,
    requires: { whip_mastery: 2 },
    description: "Stagger wild Matts faster and earn better capture training.",
    perRank: "+18 whip range, +4 capture XP, rank 2 trims a capture hit",
  },
  prime_study: {
    id: "prime_study",
    name: "Boss Study",
    branch: "Hunter",
    tier: 4,
    maxRank: 3,
    requires: { calm_hands: 2, clean_capture: 1 },
    description: "Learn boss Matt tells so their openings are easier to punish.",
    perRank: "+4% boss capture chance, -5% boss damage",
  },
  matt_mentor: {
    id: "matt_mentor",
    name: "Matt Mentor",
    branch: "Bond",
    tier: 1,
    maxRank: 3,
    description: "Captured Matts gain more friendship and arena XP.",
    perRank: "+15% Matt XP and +1 friendship rewards",
  },
  pack_leader: {
    id: "pack_leader",
    name: "Pack Leader",
    branch: "Bond",
    tier: 2,
    maxRank: 3,
    requires: { matt_mentor: 1 },
    description: "Followers assist more often and bond faster in field fights.",
    perRank: "-8% assist cooldown, +2 follower assist XP",
  },
  follow_through: {
    id: "follow_through",
    name: "Follow Through",
    branch: "Bond",
    tier: 3,
    maxRank: 3,
    requires: { pack_leader: 2 },
    description: "Follower strikes pressure targets harder and reward more friendship.",
    perRank: "+35 assist range, +1 assist friendship",
  },
  arena_instinct: {
    id: "arena_instinct",
    name: "Arena Instinct",
    branch: "Bond",
    tier: 4,
    maxRank: 3,
    requires: { matt_mentor: 2 },
    description: "Start arena battles sharper and hit harder.",
    perRank: "+3 arena energy, +2 arena power",
  },
  quartermaster: {
    id: "quartermaster",
    name: "Quartermaster",
    branch: "Pack",
    tier: 1,
    maxRank: 3,
    description: "Keep your pack organized and make every carried supply count.",
    perRank: "+4% item recovery, better inventory readouts",
  },
  field_alchemy: {
    id: "field_alchemy",
    name: "Field Alchemy",
    branch: "Pack",
    tier: 2,
    maxRank: 3,
    requires: { quartermaster: 1 },
    description: "Boost health and stamina restored by consumables.",
    perRank: "+7% all consumable recovery",
  },
  merchant_sense: {
    id: "merchant_sense",
    name: "Merchant Sense",
    branch: "Pack",
    tier: 3,
    maxRank: 3,
    requires: { quartermaster: 2 },
    description: "Read shop value better when buying and selling.",
    perRank: "-4% shop prices, +8% item sell value",
  },
  provisioner: {
    id: "provisioner",
    name: "Provisioner",
    branch: "Pack",
    tier: 4,
    maxRank: 2,
    requires: { field_alchemy: 2, merchant_sense: 1 },
    description: "Hybrid foods and drinks become emergency-grade supplies.",
    perRank: "+10% recovery on items that restore health and stamina",
  },
};

function numberedFrames(path, count) {
  return Array.from({ length: count }, (_, index) => `${path}/${index + 1}.png`);
}

const DEMENTED_MATT_RUNNING_FRAMES = numberedFrames("assets/addedcharacters/dementedmatt/running", 17);

const ASSETS = {
  ivan: {
    idle: numberedFrames("assets/ivan/idle", 12),
    breathing: numberedFrames("assets/ivan/breathing", 12),
    walking: numberedFrames("assets/ivan/walking", 7),
    sprinting: numberedFrames("assets/ivan/sprinting", 8),
    whipping: numberedFrames("assets/ivan/whipping", 5),
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
  grassmatt: {
    idle: ["assets/matts/grassmatt/idle/1.png"],
    walking: numberedFrames("assets/matts/grassmatt/walk", 5),
    caught: numberedFrames("assets/matts/grassmatt/caught", 6),
    attack: numberedFrames("assets/matts/grassmatt/attack", 11),
  },
  primegrassmatt: {
    idle: numberedFrames("assets/maps/grass/characters/primematt/idle", 4),
    walking: numberedFrames("assets/maps/grass/characters/primematt/walking", 12),
    vineHammer: numberedFrames("assets/maps/grass/characters/primematt/attack/vinehammer", 11),
    sporeBurst: numberedFrames("assets/maps/grass/characters/primematt/attack/sporeburst", 7),
    thornFan: numberedFrames("assets/maps/grass/characters/primematt/attack/thornfan", 8),
    rootSnare: numberedFrames("assets/maps/grass/characters/primematt/attack/rootsnare", 8),
    canopyQuake: numberedFrames("assets/maps/grass/characters/primematt/attack/canopyquake", 12),
  },
  primefirematt: {
    idle: numberedFrames("assets/maps/fire/firemattprime/idle", 12),
    walking: numberedFrames("assets/maps/fire/firemattprime/walking", 12),
    spawn: numberedFrames("assets/maps/fire/firemattprime/spawn", 11),
    fireBreath: numberedFrames("assets/maps/fire/firemattprime/attack/firebreath", 11),
    swipe: numberedFrames("assets/maps/fire/firemattprime/attack/swipe", 7),
    tailSwipe: numberedFrames("assets/maps/fire/firemattprime/attack/tailswipe", 12),
  },
  primerockmatt: {
    idle: numberedFrames("assets/maps/tomb/rockmattprime/idle", 12),
    walking: numberedFrames("assets/maps/tomb/rockmattprime/walking", 12),
    punch: numberedFrames("assets/maps/tomb/rockmattprime/attack/punch", 12),
    rockThrow: numberedFrames("assets/maps/tomb/rockmattprime/attack/rockthrow", 11),
    rollAttack: numberedFrames("assets/maps/tomb/rockmattprime/attack/rollattack", 15),
  },
  primewatermatt: {
    idle: numberedFrames("assets/maps/water/primewatermatt/idle", 2),
    walking: numberedFrames("assets/maps/water/primewatermatt/walking", 12),
    caught: numberedFrames("assets/maps/water/primewatermatt/idle", 2),
    attack: numberedFrames("assets/maps/water/primewatermatt/attack/waveblast", 9),
    acidRain: numberedFrames("assets/maps/water/primewatermatt/attack/acidrain", 8),
    waterShot: numberedFrames("assets/maps/water/primewatermatt/attack/watershot", 9),
    waveBlast: numberedFrames("assets/maps/water/primewatermatt/attack/waveblast", 9),
  },
  primemysticmatt: {
    idle: numberedFrames("assets/maps/temple/primemysticmatt/idle/loop", 7),
    idleEnd: numberedFrames("assets/maps/temple/primemysticmatt/idle/end", 7),
    walking: numberedFrames("assets/maps/temple/primemysticmatt/walking", 10),
    caught: numberedFrames("assets/maps/temple/primemysticmatt/idle/loop", 7),
    attack: numberedFrames("assets/maps/temple/primemysticmatt/attack/swipe", 4),
    swipe: numberedFrames("assets/maps/temple/primemysticmatt/attack/swipe", 4),
    mysticPull: numberedFrames("assets/maps/temple/primemysticmatt/attack/mysticpull", 8),
    teleportBlast: numberedFrames("assets/maps/temple/primemysticmatt/attack/teleportblast", 1),
  },
  watermatt: {
    idle: numberedFrames("assets/matts/watermatt/idle/loop", 12),
    walking: numberedFrames("assets/matts/watermatt/walking", 12),
    caught: numberedFrames("assets/matts/watermatt/caught", 8),
    attack: numberedFrames("assets/matts/watermatt/attack", 10),
  },
  rockmatt: {
    idle: ["assets/matts/rockmatt/idle/1.png"],
    walking: numberedFrames("assets/matts/rockmatt/walking", 12),
    caught: numberedFrames("assets/matts/rockmatt/caught", 12),
    attack: numberedFrames("assets/matts/rockmatt/attack", 12),
  },
  mysticmatt: {
    idle: ["assets/matts/mysticmatt/idle/float/1.png"],
    mysticIdleStart: numberedFrames("assets/matts/mysticmatt/idle/start", 9),
    mysticIdleFloat: numberedFrames("assets/matts/mysticmatt/idle/float", 8),
    mysticIdleStop: numberedFrames("assets/matts/mysticmatt/idle/stop", 9),
    walking: numberedFrames("assets/matts/mysticmatt/walking", 10),
    caught: numberedFrames("assets/matts/mysticmatt/caught", 8),
    attack: numberedFrames("assets/matts/mysticmatt/attack", 6),
  },
  dementedmatt: {
    walking: DEMENTED_MATT_RUNNING_FRAMES,
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
    brock: {
      idle: ["assets/addedcharacters/brock/free.png"],
      walking: numberedFrames("assets/addedcharacters/brock/walking", 6),
      captured: numberedFrames("assets/addedcharacters/brock/captured", 12),
    },
    wizard: {
      idle: ["assets/addedcharacters/darkwizard/main.png"],
      walking: numberedFrames("assets/addedcharacters/darkwizard/walking", 7),
      disappear: numberedFrames("assets/addedcharacters/darkwizard/disappear", 9),
    },
    logan: {
      idle: ["assets/maps/town/characters/loganstore/idle/main.png"],
      idleSpecial: numberedFrames("assets/maps/town/characters/loganstore/idle", 12),
      walking: numberedFrames("assets/maps/town/characters/loganstore/walking", 7),
    },
  },
};

const EFFECT_ASSETS = {
  primeSporeThorn: "assets/maps/grass/characters/primematt/attack/sporeburst/thorn.png",
  primeThornFan: "assets/maps/grass/characters/primematt/attack/thornfan/thorn.png",
  primeRockThrow: "assets/maps/tomb/rockmattprime/attack/rockthrow/rock.png",
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
  lastProfileTouch: 0,
  worlds: {},
  capturedParty: [],
  coins: STARTING_COINS,
  inventory: {},
  missions: {},
  intro: null,
  storyFlags: {},
  captureStats: { byType: {} },
  playerProgress: { level: 1, xp: 0, skillPoints: 0, skills: {} },
  arenaStats: { wins: 0, losses: 0, streak: 0, bestStreak: 0, rankPoints: 0 },
  friendshipCare: {},
  friendshipWalkTimer: 0,
  primeMysticGravityWell: null,
  followerCommand: {
    mode: "follow",
    targeting: false,
    targetId: "",
    stayPoint: null,
  },
  activeShopId: "",
  shopTab: "buy",
  pauseMenuTab: "character",
  inventoryCategory: "all",
  activeDialogueTopic: "",
  arena: {
    active: false,
    phase: "idle",
    opponent: null,
    playerMattId: "",
    playerMatt: null,
    playerHp: 0,
    opponentHp: 0,
    playerMaxHp: 0,
    opponentMaxHp: 0,
    playerEnergy: 0,
    opponentEnergy: 0,
    playerShield: 0,
    opponentShield: 0,
    playerStatuses: {},
    opponentStatuses: {},
    playerCooldowns: {},
    opponentCooldowns: {},
    turn: 1,
    log: [],
    turnLocked: false,
    introPractice: false,
  },
  toastTimer: null,
  caughtDogmatts: -1,
  nodeTravelCooldown: 0,
  nodeTravelExitWorld: "",
  nodeTravelExitNodeId: "",
  ambientTimer: 0,
  particles: [],
  screenShake: 0,
  camera: { x: 0, y: 0 },
  cameraFocus: null,
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
    action: "breathing",
    frameTimer: 0,
    frameIndex: 0,
    idleFlourishTimer: PLAYER.idleFlourishMin,
    attackTimer: 0,
    health: PLAYER.maxHealth,
    stamina: PLAYER.maxStamina,
    damageCooldown: 0,
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
    activeNodeId: null,
    selectedNpcId: "scott",
    panelReady: false,
  },
};

let followerCommandUiKey = "";

const images = {
  worldMaps: {},
  ivan: {
    idle: [],
    breathing: [],
    walking: [],
    sprinting: [],
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
  grassmatt: {
    idle: [],
    walking: [],
    caught: [],
    attack: [],
  },
  primegrassmatt: {
    idle: [],
    walking: [],
    vineHammer: [],
    sporeBurst: [],
    thornFan: [],
    rootSnare: [],
    canopyQuake: [],
  },
  primefirematt: {
    idle: [],
    walking: [],
    spawn: [],
    fireBreath: [],
    swipe: [],
    tailSwipe: [],
  },
  primerockmatt: {
    idle: [],
    walking: [],
    punch: [],
    rockThrow: [],
    rollAttack: [],
  },
  primewatermatt: {
    idle: [],
    walking: [],
    caught: [],
    attack: [],
    acidRain: [],
    waterShot: [],
    waveBlast: [],
  },
  primemysticmatt: {
    idle: [],
    idleEnd: [],
    walking: [],
    caught: [],
    attack: [],
    swipe: [],
    mysticPull: [],
    teleportBlast: [],
  },
  watermatt: {
    idle: [],
    walking: [],
    caught: [],
    attack: [],
  },
  rockmatt: {
    idle: [],
    walking: [],
    caught: [],
    attack: [],
  },
  mysticmatt: {
    idle: [],
    mysticIdleStart: [],
    mysticIdleFloat: [],
    mysticIdleStop: [],
    walking: [],
    caught: [],
    attack: [],
  },
  dementedmatt: {
    walking: [],
  },
  effects: {},
  npcs: {},
};

const audio = {
  context: null,
  master: null,
  noiseBuffer: null,
  ambientStarted: false,
  musicElement: null,
  musicStarted: false,
  currentTrack: "",
  musicMode: "ambient",
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

function getWorldImageEntries() {
  const entries = [];

  Object.entries(WORLD_MAPS).forEach(([id, map]) => {
    if (map.type === "image" || map.overview) {
      entries.push([id, map.overview || map.image]);
    }

    if (map.rescuedImage) {
      entries.push([`${id}:rescued`, map.rescuedImage]);
    }
  });

  return entries;
}

async function loadAssets() {
  const worldImageEntries = getWorldImageEntries();
  const [
    worldImages,
    ivanFrames,
    dogmattFrames,
    firemattFrames,
    grassmattFrames,
    primegrassmattFrames,
    primefiremattFrames,
    primerockmattFrames,
    primewatermattFrames,
    primemysticmattFrames,
    watermattFrames,
    rockmattFrames,
    mysticmattFrames,
    dementedmattFrames,
    effectImages,
    npcFrames,
  ] = await Promise.all([
    Promise.all(
      worldImageEntries.map(async ([id, src]) => [id, await loadImage(src)]),
    ),
    loadAnimationSet(ASSETS.ivan, PLAYER.width, PLAYER.height),
    loadAnimationSet(ASSETS.dogmatt, DOGMATT.width, DOGMATT.height),
    loadAnimationSet(ASSETS.firematt, FIREMATT.width, FIREMATT.height),
    loadAnimationSet(ASSETS.grassmatt, GRASSMATT.width, GRASSMATT.height),
    loadAnimationSet(ASSETS.primegrassmatt, GRASSMATT.width, GRASSMATT.height),
    loadAnimationSet(ASSETS.primefirematt, FIREMATT.width, FIREMATT.height),
    loadAnimationSet(ASSETS.primerockmatt, ROCKMATT.width, ROCKMATT.height),
    loadAnimationSet(ASSETS.primewatermatt, WATERMATT.width, WATERMATT.height),
    loadAnimationSet(ASSETS.primemysticmatt, MYSTICMATT.width, MYSTICMATT.height),
    loadAnimationSet(ASSETS.watermatt, WATERMATT.width, WATERMATT.height),
    loadAnimationSet(ASSETS.rockmatt, ROCKMATT.width, ROCKMATT.height),
    loadAnimationSet(ASSETS.mysticmatt, MYSTICMATT.width, MYSTICMATT.height),
    loadAnimationSet(ASSETS.dementedmatt, DEMENTED_MATT.width, DEMENTED_MATT.height),
    Promise.all(
      Object.entries(EFFECT_ASSETS).map(async ([id, path]) => [id, await loadImage(path)]),
    ),
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
  Object.assign(images.grassmatt, grassmattFrames);
  Object.assign(images.primegrassmatt, primegrassmattFrames);
  Object.assign(images.primefirematt, primefiremattFrames);
  Object.assign(images.primerockmatt, primerockmattFrames);
  Object.assign(images.primewatermatt, primewatermattFrames);
  Object.assign(images.primemysticmatt, primemysticmattFrames);
  Object.assign(images.watermatt, watermattFrames);
  Object.assign(images.rockmatt, rockmattFrames);
  Object.assign(images.mysticmatt, mysticmattFrames);
  Object.assign(images.dementedmatt, dementedmattFrames);
  images.effects = Object.fromEntries(effectImages);
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

function isMobileCameraView() {
  return window.matchMedia?.("(pointer: coarse)")?.matches || window.innerWidth <= 760;
}

function getWorldRenderScale() {
  return state.dev.enabled || !isMobileCameraView() ? 1 : MOBILE_WORLD_SCALE;
}

function getCameraViewWidth() {
  return canvas.clientWidth / getWorldRenderScale();
}

function getCameraViewHeight() {
  return canvas.clientHeight / getWorldRenderScale();
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getWorldMapConfig(worldId = state.currentWorld) {
  return WORLD_MAPS[worldId] || WORLD_MAPS[DEFAULT_WORLD_ID];
}

function getWorldMapImageKey(worldId = state.currentWorld) {
  if (worldId === BROCK_CAPTURED_WORLD_ID && isBrockRescueMapRevealed()) {
    return `${worldId}:rescued`;
  }

  return worldId;
}

function getWorldMapImage(worldId = state.currentWorld) {
  return images.worldMaps[getWorldMapImageKey(worldId)] || images.worldMaps[worldId] || null;
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

function getScopedStorageKey(baseKey, profileId = state.profileId) {
  return profileId ? `${baseKey}:${profileId}` : baseKey;
}

function getProfileScopedStorageKey(baseKey) {
  return getScopedStorageKey(baseKey);
}

function getWorldStorageKey() {
  return getProfileScopedStorageKey(WORLD_STORAGE_KEY);
}

function getMattProgressStorageKey() {
  return getProfileScopedStorageKey(MATT_PROGRESS_STORAGE_KEY);
}

function getEconomyStorageKey() {
  return getProfileScopedStorageKey(ECONOMY_STORAGE_KEY);
}

function getNewGameIntroStorageKey() {
  return getProfileScopedStorageKey(NEW_GAME_INTRO_STORAGE_KEY);
}

function hasProfileScopedStorage(baseKey, profileId = state.profileId) {
  if (!profileId) {
    return false;
  }

  try {
    return Boolean(localStorage.getItem(getScopedStorageKey(baseKey, profileId)));
  } catch (error) {
    console.warn(`Could not check ${baseKey}.`, error);
    return false;
  }
}

function hasProfileScopedGameProgress(profileId = state.profileId) {
  return Boolean(
    hasProfileScopedStorage(WORLD_STORAGE_KEY, profileId) ||
      hasProfileScopedStorage(ECONOMY_STORAGE_KEY, profileId) ||
      hasProfileScopedStorage(MATT_PROGRESS_STORAGE_KEY, profileId) ||
      hasProfileScopedStorage(NEW_GAME_INTRO_STORAGE_KEY, profileId),
  );
}

function hasLegacyGameProgress() {
  try {
    return Boolean(
      localStorage.getItem(WORLD_STORAGE_KEY) ||
        localStorage.getItem(ECONOMY_STORAGE_KEY) ||
        localStorage.getItem(MATT_PROGRESS_STORAGE_KEY) ||
        localStorage.getItem(NEW_GAME_INTRO_STORAGE_KEY),
    );
  } catch (error) {
    console.warn("Could not check legacy profile progress.", error);
    return false;
  }
}

function shouldUseLegacyProfileStorage(profileId = state.profileId) {
  if (!profileId || hasProfileScopedGameProgress(profileId)) {
    return false;
  }

  const firstProfileId = state.profiles[0]?.id || "";
  return state.profiles.length <= 1 && profileId === firstProfileId && hasLegacyGameProgress();
}

function readJsonStorageValue(storageKey) {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.warn(`Could not read ${storageKey}.`, error);
    return null;
  }
}

function readProfileStorage(baseKey, profileId, allowLegacy = false) {
  const scopedData = profileId ? readJsonStorageValue(getScopedStorageKey(baseKey, profileId)) : null;

  if (scopedData) {
    return scopedData;
  }

  return allowLegacy ? readJsonStorageValue(baseKey) : null;
}

function getProfilePartyFromData(data) {
  if (Array.isArray(data?.party)) {
    return data.party.filter((matt) => matt?.type && MATT_CONFIGS[matt.type]);
  }

  const party = [];
  if (data && typeof data.worlds === "object") {
    Object.entries(data.worlds).forEach(([worldId, worldProgress]) => {
      if (!Array.isArray(worldProgress?.matts)) {
        return;
      }

      worldProgress.matts.forEach((matt) => {
        if (matt?.caught && matt.type && MATT_CONFIGS[matt.type]) {
          party.push({ ...matt, sourceWorld: worldId, originalId: matt.id });
        }
      });
    });
  }

  return party.slice(0, MATT_PARTY_LIMIT);
}

function getCaptureTypeCounts(captureStats = {}, party = []) {
  const counts = {};

  if (captureStats?.byType && typeof captureStats.byType === "object") {
    Object.keys(MATT_CONFIGS).forEach((type) => {
      const count = Math.max(0, Math.floor(Number(captureStats.byType[type]) || 0));
      if (count > 0) {
        counts[type] = count;
      }
    });
  }

  const partyCounts = {};
  party.forEach((matt) => {
    if (matt?.type && MATT_CONFIGS[matt.type]) {
      partyCounts[matt.type] = (partyCounts[matt.type] || 0) + 1;
    }
  });

  Object.entries(partyCounts).forEach(([type, count]) => {
    counts[type] = Math.max(counts[type] || 0, count);
  });

  return counts;
}

function getCaptureTotal(captureStats = {}, party = []) {
  return Object.values(getCaptureTypeCounts(captureStats, party)).reduce((total, count) => total + count, 0);
}

function getCaptureTypeSummary(captureStats = {}, party = []) {
  return Object.entries(getCaptureTypeCounts(captureStats, party))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([type, count]) => `${MATT_LABELS[type] || "Matts"} ${count}`)
    .join(" | ");
}

function getInventoryTotals(inventory = {}) {
  const normalized = normalizeInventory(inventory);
  const entries = Object.entries(normalized);

  return {
    itemTypes: entries.length,
    totalStacks: entries.reduce((total, [, count]) => total + count, 0),
  };
}

function formatProfileTime(timestamp) {
  if (!timestamp) {
    return "Never played";
  }

  const seconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
  if (seconds < 60) {
    return "Just now";
  }
  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ago`;
  }
  if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours}h ago`;
  }
  if (seconds < 604800) {
    const days = Math.floor(seconds / 86400);
    return `${days}d ago`;
  }

  return new Date(timestamp).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function getProfileSummary(profile) {
  const isLiveProfile = profile?.id === state.profileId && state.ready;
  const allowLegacy = shouldUseLegacyProfileStorage(profile?.id);
  const worldData = isLiveProfile
    ? { currentWorld: state.currentWorld }
    : readProfileStorage(WORLD_STORAGE_KEY, profile?.id, allowLegacy);
  const economyData = isLiveProfile
    ? {
        coins: state.coins,
        inventory: state.inventory,
        captureStats: state.captureStats,
        playerProgress: state.playerProgress,
        arenaStats: state.arenaStats,
      }
    : readProfileStorage(ECONOMY_STORAGE_KEY, profile?.id, allowLegacy);
  const progressData = isLiveProfile
    ? { party: state.capturedParty }
    : readProfileStorage(MATT_PROGRESS_STORAGE_KEY, profile?.id, allowLegacy);
  const party = isLiveProfile ? state.capturedParty : getProfilePartyFromData(progressData);
  const playerProgress = normalizePlayerProgress(economyData?.playerProgress);
  const arenaStats = normalizeArenaStats(economyData?.arenaStats);
  const inventory = getInventoryTotals(economyData?.inventory);
  const activeFollower = party.find((matt) => matt?.follower);
  const strongestMatt = party.reduce(
    (best, matt) => (!best || getMattLevel(matt) > getMattLevel(best) ? matt : best),
    null,
  );
  const captureTotal = getCaptureTotal(economyData?.captureStats, party);
  const currentWorld = resolveWorldId(
    worldData?.currentWorld || (isLiveProfile ? state.currentWorld : DEFAULT_WORLD_ID),
    worldData || {},
  );

  return {
    currentWorld,
    level: playerProgress.level,
    xp: playerProgress.xp,
    coins: Math.max(0, Math.floor(Number(economyData?.coins) || (economyData ? 0 : STARTING_COINS))),
    skillPoints: playerProgress.skillPoints,
    partyCount: party.length,
    tamedCount: party.filter((matt) => matt?.tamed).length,
    captureTotal,
    captureTypeSummary: getCaptureTypeSummary(economyData?.captureStats, party),
    followerName: activeFollower ? getCapturedMattDisplayName(activeFollower) : "",
    strongestMattName: strongestMatt ? getCapturedMattDisplayName(strongestMatt) : "",
    strongestMattLevel: strongestMatt ? getMattLevel(strongestMatt) : 0,
    arenaRank: getArenaRankTitle(arenaStats.rankPoints),
    arenaRecord: `${arenaStats.wins}W-${arenaStats.losses}L`,
    inventoryTypes: inventory.itemTypes,
    inventoryStacks: inventory.totalStacks,
    lastPlayed: profile?.updatedAt || profile?.createdAt || 0,
    hasProgress: Boolean(economyData || progressData || party.length),
  };
}

function getActiveProfileSummary() {
  const profile = state.profiles.find((item) => item.id === state.profileId) || {
    id: state.profileId,
    name: state.profileName || "Ivan",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  return getProfileSummary(profile);
}

function makeProfilePill(text, className = "") {
  const pill = document.createElement("span");
  pill.className = `profile-pill ${className}`.trim();
  pill.textContent = text;
  return pill;
}

function touchActiveProfile(force = false) {
  if (!state.profileId) {
    return;
  }

  const now = Date.now();
  if (!force && now - state.lastProfileTouch < 30000) {
    return;
  }

  const profile = state.profiles.find((item) => item.id === state.profileId);
  if (!profile) {
    return;
  }

  profile.updatedAt = now;
  state.lastProfileTouch = now;
  saveProfiles();
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
    const summary = getProfileSummary(profile);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "profile-option";
    button.classList.toggle("active", profile.id === state.profileId);
    button.dataset.profileId = profile.id;

    const main = document.createElement("div");
    main.className = "profile-option-main";
    const label = document.createElement("strong");
    label.textContent = profile.name;
    const detail = document.createElement("span");
    detail.textContent = summary.hasProgress
      ? `${getWorldLabel(summary.currentWorld)} | ${formatProfileTime(summary.lastPlayed)}`
      : `Fresh save | ${formatProfileTime(summary.lastPlayed)}`;
    main.append(label, detail);

    const meta = document.createElement("div");
    meta.className = "profile-meta";
    meta.append(
      makeProfilePill(`Lv ${summary.level}`, "level"),
      makeProfilePill(`${summary.coins}c`, "coins"),
      makeProfilePill(`${summary.partyCount}/${MATT_PARTY_LIMIT} party`, "party"),
      makeProfilePill(summary.arenaRank, "arena"),
    );

    const progress = document.createElement("div");
    progress.className = "profile-progress";
    const captureLine = document.createElement("span");
    captureLine.textContent = summary.captureTotal > 0
      ? `${summary.captureTotal} captured${summary.captureTypeSummary ? ` | ${summary.captureTypeSummary}` : ""}`
      : "No captures yet";
    const followerLine = document.createElement("span");
    followerLine.textContent = summary.followerName
      ? `Follower: ${summary.followerName}`
      : summary.strongestMattName
        ? `Top Matt: ${summary.strongestMattName} Lv ${summary.strongestMattLevel}`
        : profile.id === state.profileId
          ? "Selected"
          : "Ready";
    progress.append(captureLine, followerLine);

    button.append(main, meta, progress);
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

function hasProfileGameProgress(profileId = state.profileId, { allowLegacy = shouldUseLegacyProfileStorage(profileId) } = {}) {
  if (hasProfileScopedGameProgress(profileId)) {
    return true;
  }

  return Boolean(allowLegacy && hasLegacyGameProgress());
}

function shouldShowNewGameIntro() {
  try {
    return !localStorage.getItem(getNewGameIntroStorageKey()) && !hasProfileGameProgress();
  } catch (error) {
    console.warn("Could not check intro state.", error);
    return false;
  }
}

function markNewGameIntroSeen() {
  try {
    localStorage.setItem(getNewGameIntroStorageKey(), "seen");
  } catch (error) {
    console.warn("Could not save intro state.", error);
  }
}

function isIntroOpen() {
  return Boolean(newGameIntro && !newGameIntro.hidden);
}

function showNewGameIntro() {
  if (!newGameIntro) {
    setGameMessage(NEW_GAME_INTRO_MESSAGE, 9000);
    markNewGameIntroSeen();
    return;
  }

  keys.clear();
  touchInput.sprint = false;
  resetTouchJoystick();
  newGameIntro.hidden = false;
  document.body.classList.add("intro-open");
}

function closeNewGameIntro() {
  if (newGameIntro) {
    newGameIntro.hidden = true;
  }

  document.body.classList.remove("intro-open");
  markNewGameIntroSeen();
  saveEconomy();
  setGameMessage(NEW_GAME_INTRO_MESSAGE, 7200);
}

function getNewGameStartPoint() {
  const townNode = state.worlds?.[DEFAULT_WORLD_ID]?.nodes?.find((node) => node.target === "town");
  if (townNode) {
    return {
      x: clamp(townNode.x + townNode.radius + 260, 0, getMapWidth()),
      y: clamp(townNode.y, 0, getMapHeight()),
    };
  }

  return {
    x: clamp(NEW_GAME_START_POINT.x, 0, getMapWidth()),
    y: clamp(NEW_GAME_START_POINT.y, 0, getMapHeight()),
  };
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

  startMusic();

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

function startMusic() {
  if (audio.musicStarted || MUSIC_TRACKS.length === 0) {
    return;
  }

  audio.musicStarted = true;
  playNextMusicTrack();
}

function chooseNextMusicTrack() {
  if (MUSIC_TRACKS.length <= 1) {
    return MUSIC_TRACKS[0] || "";
  }

  const choices = MUSIC_TRACKS.filter((track) => track !== audio.currentTrack);
  return choices[Math.floor(Math.random() * choices.length)];
}

function playMusicTrack(track, { loop = false, volume = 0.34, mode = "ambient" } = {}) {
  if (!track) {
    audio.musicStarted = false;
    return;
  }

  if (audio.musicElement && audio.currentTrack === track && audio.musicMode === mode) {
    audio.musicElement.loop = loop;
    audio.musicElement.volume = volume;
    return;
  }

  if (audio.musicElement) {
    audio.musicElement.pause();
    audio.musicElement.removeAttribute("src");
    audio.musicElement.load();
  }

  audio.currentTrack = track;
  audio.musicMode = mode;
  audio.musicStarted = true;

  const music = new Audio(track);
  music.loop = loop;
  music.volume = volume;
  music.preload = "auto";
  if (!loop) {
    music.addEventListener("ended", playNextMusicTrack, { once: true });
  }
  audio.musicElement = music;

  const playResult = music.play();
  if (playResult && typeof playResult.catch === "function") {
    playResult.catch((error) => {
      audio.musicStarted = false;
      audio.currentTrack = "";
      audio.musicMode = "ambient";
      console.warn("Could not start music.", error);
    });
  }
}

function playNextMusicTrack() {
  const track = chooseNextMusicTrack();
  if (!track) {
    audio.musicStarted = false;
    return;
  }

  playMusicTrack(track);
}

function startPrimeGrassMattMusic() {
  ensureAudio();
  playMusicTrack(PRIME_GRASS_MATT_MUSIC, { loop: true, volume: 0.48, mode: "primeGrassMatt" });
}

function startBossMusic(matt) {
  if (!matt?.musicTrack) {
    return;
  }

  ensureAudio();
  playMusicTrack(matt.musicTrack, { loop: true, volume: matt.musicVolume || 0.48, mode: matt.musicMode || "bossMatt" });
}

function resumeAmbientMusicFromPrimeGrassMatt() {
  if (audio.musicMode !== "primeGrassMatt") {
    return;
  }

  audio.musicStarted = false;
  audio.musicMode = "ambient";
  startMusic();
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
    brock: { capturedPosition: null, freePath: [] },
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
    action: ["idle", "walking", "idleSpecial", "busy", "talk", "disappear"].includes(npc.action)
      ? npc.action
      : "idle",
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

function normalizeBrockPoint(point, worldId) {
  if (!Number.isFinite(point?.x) || !Number.isFinite(point?.y)) {
    return null;
  }

  return {
    x: clamp(point.x, 0, getMapWidth(worldId)),
    y: clamp(point.y, 0, getMapHeight(worldId)),
  };
}

function normalizeBrockData(data, worldId) {
  return {
    capturedPosition: normalizeBrockPoint(data?.capturedPosition, worldId),
    freePath: Array.isArray(data?.freePath)
      ? data.freePath.map((point) => normalizeBrockPoint(point, worldId)).filter(Boolean)
      : [],
  };
}

function canPlaceCapturedBrock(worldId = state.currentWorld) {
  return worldId === BROCK_CAPTURED_WORLD_ID;
}

function canEditBrockFreePath(worldId = state.currentWorld) {
  return BROCK_FREE_PATH_WORLD_IDS.has(worldId);
}

function seedDefaultBrockData(world) {
  if (!world || world.id !== BROCK_FREE_PATH_WORLD_ID) {
    return;
  }

  world.brock = normalizeBrockData(
    {
      capturedPosition: world.brock?.capturedPosition || null,
      freePath: world.brock?.freePath?.length ? world.brock.freePath : BROCK_DEFAULT_FREE_PATH,
    },
    BROCK_FREE_PATH_WORLD_ID,
  );
}

function normalizeNodeName(name) {
  return typeof name === "string" ? name.trim().slice(0, 40) : "";
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
  seedDefaultBrockData(worlds.town_inn);
  removeDuplicateDefaultNodes(worlds);
  applyCoreWorldFixups(worlds);
  return worlds;
}

function ensureNode(world, id, x, y, target, radius = 82) {
  if (!world.nodes.some((node) => node.id === id)) {
    world.nodes.push({ id, x, y, radius, target });
  }
}

function upsertNodeByTarget(world, id, x, y, target, radius = 82, extra = {}) {
  if (!world) {
    return;
  }

  if (!Array.isArray(world.nodes)) {
    world.nodes = [];
  }

  const existing = world.nodes.find((node) => node.id === id || node.target === target);
  if (existing) {
    Object.assign(existing, { id, x, y, radius, target, ...extra });
  } else {
    world.nodes.push({ id, x, y, radius, target, ...extra });
  }
}

function removeNodesByTarget(world, target) {
  if (!world || !Array.isArray(world.nodes)) {
    return;
  }

  world.nodes = world.nodes.filter((node) => node.target !== target);
}

function applyCoreWorldFixups(worlds) {
  upsertNodeByTarget(
    worlds.town,
    "node-mplkvcoq-ayqdbh",
    5924.500370096225,
    6578.830495928942,
    "town_itemshop",
    82,
    { name: "Item Shop" },
  );
  const northernWildsNode = worlds.town?.nodes?.find((node) => node.id === "node-mplkncue-uzzk25");
  if (northernWildsNode) {
    northernWildsNode.locked = true;
  }
  upsertNodeByTarget(worlds.town_itemshop, "node-itemshop-to-town", 3800, 5480, "town", 120);
  if (worlds.town_itemshop) {
    ensureNpc(worlds.town_itemshop, "logan", 3800, 3180);
  }
  if (worlds.town_inn) {
    ensureNpc(worlds.town_inn, "brock", 2409, 2466);
  }
  upsertNodeByTarget(
    worlds.purplewaterworld,
    "node-mphqjey8-q6qlfc",
    3440.2664692820135,
    5431.532198371577,
    DEFAULT_WORLD_ID,
  );
  upsertNodeByTarget(
    worlds.purplewaterworld,
    "node-mplkp1uj-3j2inr",
    584.6039970392302,
    515.1739452257588,
    "water_tree",
    82,
    { name: "Water Tree" },
  );
  upsertNodeByTarget(
    worlds.purplewaterworld,
    "node-mplkq0pt-9bpmfb",
    2112.361213915618,
    4552.183567727609,
    "water_hut",
    82,
    { name: "Water Hut" },
  );
  upsertNodeByTarget(
    worlds.purplewaterworld,
    "node-mplkqfe9-4aafb1",
    7010.954848260548,
    3388.60103626943,
    "water_cove",
    82,
    { name: "Water Cove" },
  );
  removeNodesByTarget(worlds.water_tree, DEFAULT_WORLD_ID);
  removeNodesByTarget(worlds.water_hut, DEFAULT_WORLD_ID);
  removeNodesByTarget(worlds.water_cove, DEFAULT_WORLD_ID);
  upsertNodeByTarget(worlds.water_tree, "node-water-tree-to-waterworld", 3800, 5400, "purplewaterworld", 120);
  upsertNodeByTarget(worlds.water_hut, "node-water-hut-to-waterworld", 3800, 5400, "purplewaterworld", 120);
  upsertNodeByTarget(worlds.water_cove, "node-water-cove-to-waterworld", 3800, 5400, "purplewaterworld", 120);
  upsertNodeByTarget(
    worlds.treeworld,
    "node-mphql4r8-37rdm8",
    3191.5618060695783,
    5564.766839378239,
    DEFAULT_WORLD_ID,
  );
  upsertNodeByTarget(
    worlds.treeworld,
    "node-mplkr96r-1u2rha",
    842.1909696521095,
    994.8186528497409,
    "grass_tree",
    82,
    { name: "Grass Tree" },
  );
  upsertNodeByTarget(
    worlds.treeworld,
    "node-mplksae0-6h6yx9",
    6078.312361213915,
    2442.635085122132,
    "grass_camp",
    82,
    { name: "Grass Camp" },
  );
  upsertNodeByTarget(
    worlds.treeworld,
    "node-mplksv63-ryq8f7",
    6207.105847520355,
    359.7335307179867,
    "grass_cave",
    82,
    { name: "Grass Cave" },
  );
  removeNodesByTarget(worlds.grass_tree, DEFAULT_WORLD_ID);
  removeNodesByTarget(worlds.grass_camp, DEFAULT_WORLD_ID);
  removeNodesByTarget(worlds.grass_cave, DEFAULT_WORLD_ID);
  upsertNodeByTarget(worlds.grass_tree, "node-grass-tree-to-grassworld", 3800, 5480, "treeworld", 120);
  upsertNodeByTarget(worlds.grass_camp, "node-grass-camp-to-grassworld", 3800, 5480, "treeworld", 120);
  upsertNodeByTarget(worlds.grass_cave, "node-grass-cave-to-grassworld", 3800, 5480, "treeworld", 120);
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
  maybeNode("town", "node-mplkvcoq-ayqdbh", 5924.500370096225, 6578.830495928942, "town_itemshop", 82);

  maybeNode("town_arena_entrance", "node-arena-entry-to-town", 760, 3560, "town", 110);
  maybeNode("town_arena_entrance", "node-arena-entry-to-arena", 4750, 2030, "town_arena", 130);
  maybeNode("town_arena", "node-arena-to-entry", 5100, 9050, "town_arena_entrance", 140);
  maybeNode("town_blacksmith", "node-blacksmith-to-town", 2800, 3660, "town", 120);
  maybeNode("town_inn", "node-inn-to-town", 2800, 3660, "town", 120);
  maybeNode("town_inn", "node-inn-to-rooms", 4920, 1520, "town_inn_rooms", 110);
  maybeNode("town_inn_rooms", "node-rooms-to-inn", 2800, 3620, "town_inn", 120);
  maybeNode("town_mattstore", "node-mattstore-to-town", 1339, 2140, "town", 95);
  maybeNode("town_itemshop", "node-itemshop-to-town", 3800, 5480, "town", 120);

  maybeNpc("town_arena_entrance", "scott", 2820, 2200);
  maybeNpc("town_mattstore", "ty", 1360, 1160);
  maybeNpc("town_blacksmith", "tom", 2780, 2140);
  maybeNpc("town_inn", "brick", 2860, 2120);
  maybeNpc("town_itemshop", "logan", 3800, 3180);
}

const DEFAULT_NODE_IDS = new Set([
  "node-town-to-mainworld",
  "node-town-to-arena-entrance",
  "node-town-to-blacksmith",
  "node-town-to-inn",
  "node-town-to-mattstore",
  "node-mplkvcoq-ayqdbh",
  "node-arena-entry-to-town",
  "node-arena-entry-to-arena",
  "node-arena-to-entry",
  "node-blacksmith-to-town",
  "node-inn-to-town",
  "node-inn-to-rooms",
  "node-rooms-to-inn",
  "node-mattstore-to-town",
  "node-itemshop-to-town",
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
  const waystone = isWaystoneNode(node);
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
    radius: Number.isFinite(node?.radius) ? node.radius : waystone ? 74 : 82,
    target: waystone ? "" : WORLD_IDS.includes(target) ? target : DEFAULT_WORLD_ID,
    name: normalizeNodeName(node?.name),
    locked: Boolean(node?.locked),
    kind: waystone ? WAYSTONE_NODE_KIND : undefined,
    questionId: waystone ? String(node?.questionId || "") : undefined,
    reward: waystone ? normalizeWaystoneReward(node?.reward) : undefined,
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
    const hasBrockData = Boolean(world && Object.prototype.hasOwnProperty.call(world, "brock"));
    worlds[id] = {
      id,
      walls: Array.isArray(world.walls) ? world.walls.map(normalizeWall) : [],
      spawnAreas: Array.isArray(world.spawnAreas) ? world.spawnAreas : [],
      paths: Array.isArray(world.paths) ? world.paths.map((path) => normalizePath(path, "path")) : [],
      npcPaths: Array.isArray(world.npcPaths)
        ? world.npcPaths.map((path) => normalizePath(path, "npcpath"))
        : [],
      brock: normalizeBrockData(world.brock, id),
      npcs: Array.isArray(world.npcs)
        ? world.npcs.map((npc) => normalizeNpc(npc, id)).filter(Boolean)
        : [],
      nodes: Array.isArray(world.nodes) ? world.nodes.map((node) => normalizeNode(node, id)) : [],
    };

    if (id === BROCK_FREE_PATH_WORLD_ID && !hasBrockData) {
      seedDefaultBrockData(worlds[id]);
    }
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
  applyCoreWorldFixups(worlds);
  return worlds;
}

function loadWorlds({ allowLegacy = shouldUseLegacyProfileStorage() } = {}) {
  try {
    const saved = localStorage.getItem(getWorldStorageKey()) || (allowLegacy ? localStorage.getItem(WORLD_STORAGE_KEY) : null);
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
  touchActiveProfile();
  refreshDogmattPaths();
  refreshNpcPaths();
  setDevStatus("All placements saved.");
}

function normalizeInventory(inventory) {
  const normalized = {};

  if (!inventory || typeof inventory !== "object") {
    return normalized;
  }

  Object.entries(inventory).forEach(([itemId, count]) => {
    if (!ITEM_DEFS[itemId]) {
      return;
    }

    const amount = Math.floor(Number(count));
    if (amount > 0) {
      normalized[itemId] = ITEM_DEFS[itemId].unique ? 1 : amount;
    }
  });

  return normalized;
}

function normalizeMissions(missions) {
  const normalized = {};

  if (!missions || typeof missions !== "object") {
    return normalized;
  }

  Object.values(NPC_MISSIONS).forEach((mission) => {
    if (missions[mission.id]?.completed) {
      normalized[mission.id] = { completed: true };
    }
  });

  return normalized;
}

function createDefaultIntroState(introComplete = false) {
  return {
    activeQuestId: introComplete ? "intro_complete" : "intro_wake_brick",
    introComplete: Boolean(introComplete),
    captureProgress: {},
    rewards: {},
    lessonFlags: {},
  };
}

function normalizeIntroState(intro, hasSavedEconomy = false) {
  if (!intro || typeof intro !== "object") {
    return createDefaultIntroState(hasSavedEconomy);
  }

  const activeQuestId = INTRO_QUESTS[intro.activeQuestId] ? intro.activeQuestId : "intro_wake_brick";
  const captureProgress = {};
  if (intro.captureProgress && typeof intro.captureProgress === "object") {
    Object.entries(intro.captureProgress).forEach(([questId, counts]) => {
      if (!INTRO_QUESTS[questId] || !counts || typeof counts !== "object") {
        return;
      }
      captureProgress[questId] = {};
      Object.keys(MATT_CONFIGS).forEach((type) => {
        const count = Math.max(0, Math.floor(Number(counts[type]) || 0));
        if (count > 0) {
          captureProgress[questId][type] = count;
        }
      });
    });
  }

  const rewards = {};
  if (intro.rewards && typeof intro.rewards === "object") {
    Object.entries(intro.rewards).forEach(([questId, granted]) => {
      if (INTRO_QUESTS[questId] && granted) {
        rewards[questId] = true;
      }
    });
  }

  const lessonFlags = {};
  if (intro.lessonFlags && typeof intro.lessonFlags === "object") {
    ["bondCareUsed"].forEach((flagId) => {
      if (intro.lessonFlags[flagId]) {
        lessonFlags[flagId] = true;
      }
    });
  }

  const introComplete = Boolean(intro.introComplete || activeQuestId === "intro_complete");
  return {
    activeQuestId: introComplete ? "intro_complete" : activeQuestId,
    introComplete,
    captureProgress,
    rewards,
    lessonFlags,
  };
}

function normalizeStoryFlags(flags) {
  const status = BROCK_MISSION_STATUSES.has(flags?.brockMissionStatus)
    ? flags.brockMissionStatus
    : BROCK_MISSION_STATUS.LOCKED;
  return {
    brockRescued: Boolean(flags?.brockRescued),
    brockRescueConversationSeen: Boolean(flags?.brockRescueConversationSeen || flags?.brockRescued),
    brockMissionStatus: Boolean(flags?.brockRescued) ? BROCK_MISSION_STATUS.RESCUED : status,
    brockRescueMapPending: Boolean(flags?.brockRescueMapPending),
    brockRescueMapRevealed: Boolean(flags?.brockRescueMapRevealed),
    wizardAmbushStarted: Boolean(flags?.wizardAmbushStarted),
    wizardAmbushComplete: Boolean(flags?.wizardAmbushComplete),
    wizardDementedMattPending: Boolean(flags?.wizardDementedMattPending),
    wizardDementedMattsSpawned: Boolean(flags?.wizardDementedMattsSpawned),
    brockWizardTalkSeen: Boolean(flags?.brockWizardTalkSeen),
    brickWizardTalkSeen: Boolean(flags?.brickWizardTalkSeen),
    dementedEssenseFound: Boolean(flags?.dementedEssenseFound),
    dementedEssenseShownToBrick: Boolean(flags?.dementedEssenseShownToBrick),
    dementedEssenseDiscussedWithScott: Boolean(flags?.dementedEssenseDiscussedWithScott),
  };
}

function isBrockRescued() {
  return Boolean(state.storyFlags?.brockRescued);
}

function isBrockRescueMapRevealed() {
  return isBrockRescued() && Boolean(state.storyFlags?.brockRescueMapRevealed);
}

function maybeRevealBrockRescueMapOnReturn(worldId, previousWorldId) {
  if (
    worldId !== BROCK_CAPTURED_WORLD_ID ||
    previousWorldId === worldId ||
    !isBrockRescued() ||
    !state.storyFlags?.brockRescueMapPending
  ) {
    return false;
  }

  state.storyFlags = normalizeStoryFlags({
    ...state.storyFlags,
    brockRescueMapPending: false,
    brockRescueMapRevealed: true,
  });
  saveEconomy();
  return true;
}

function setBrockMissionStatus(status) {
  const nextStatus = BROCK_MISSION_STATUSES.has(status) ? status : BROCK_MISSION_STATUS.LOCKED;
  state.storyFlags = normalizeStoryFlags({
    ...state.storyFlags,
    brockMissionStatus: nextStatus,
  });
  saveEconomy();
  updateCaughtHud(countCaughtMatts(), true);
}

function setBrockRescued(rescued = true) {
  const previousStatus = state.storyFlags?.brockMissionStatus;
  const nextFlags = {
    ...state.storyFlags,
    brockRescued: Boolean(rescued),
    brockRescueConversationSeen: rescued ? true : false,
    brockRescueMapPending: rescued ? true : false,
    brockRescueMapRevealed: false,
    brockMissionStatus: rescued
      ? BROCK_MISSION_STATUS.RESCUED
      : previousStatus === BROCK_MISSION_STATUS.RESCUED
        ? BROCK_MISSION_STATUS.SEARCH_GRASSLAND
        : previousStatus,
  };

  if (!rescued) {
    nextFlags.wizardAmbushStarted = false;
    nextFlags.wizardAmbushComplete = false;
    nextFlags.wizardDementedMattPending = false;
    nextFlags.wizardDementedMattsSpawned = false;
    nextFlags.brockWizardTalkSeen = false;
    nextFlags.brickWizardTalkSeen = false;
    nextFlags.dementedEssenseFound = false;
    nextFlags.dementedEssenseShownToBrick = false;
    nextFlags.dementedEssenseDiscussedWithScott = false;
  }

  state.storyFlags = normalizeStoryFlags({
    ...nextFlags,
  });
  saveEconomy();
  updateCaughtHud(countCaughtMatts(), true);
}

function hasSeenBrockRescueConversation() {
  return Boolean(state.storyFlags?.brockRescueConversationSeen);
}

function canStartBrockMission() {
  return isIntroComplete() && !isBrockRescued();
}

function getBrockMissionStatus() {
  if (!canStartBrockMission()) {
    return isBrockRescued() ? BROCK_MISSION_STATUS.RESCUED : BROCK_MISSION_STATUS.LOCKED;
  }

  if (state.storyFlags?.brockMissionStatus === BROCK_MISSION_STATUS.RESCUED) {
    return BROCK_MISSION_STATUS.SEARCH_GRASSLAND;
  }

  return state.storyFlags?.brockMissionStatus || BROCK_MISSION_STATUS.TALK_TO_BRICK;
}

function hasDementedEssenseForBrick() {
  return hasItem(DEMENTED_ESSENSE_ITEM_ID) && !state.storyFlags?.dementedEssenseShownToBrick;
}

function isPostBrockStoryActive() {
  if (!isBrockRescued()) {
    return false;
  }

  return Boolean(
    !state.storyFlags?.brockWizardTalkSeen ||
      !state.storyFlags?.brickWizardTalkSeen ||
      hasDementedEssenseForBrick() ||
      (state.storyFlags?.dementedEssenseShownToBrick && !state.storyFlags?.dementedEssenseDiscussedWithScott),
  );
}

function getPostBrockStoryGuideId() {
  if (!isBrockRescued()) {
    return "";
  }

  if (state.storyFlags?.dementedEssenseShownToBrick && !state.storyFlags?.dementedEssenseDiscussedWithScott) {
    return "scott";
  }
  if (hasDementedEssenseForBrick()) {
    return "brick";
  }
  if (!state.storyFlags?.brockWizardTalkSeen) {
    return "brock";
  }
  if (!state.storyFlags?.brickWizardTalkSeen) {
    return "brick";
  }
  return "";
}

function isBrockMissionActive() {
  const status = getBrockMissionStatus();
  return (
    status === BROCK_MISSION_STATUS.TALK_TO_BRICK ||
    status === BROCK_MISSION_STATUS.SEARCH_GRASSLAND ||
    isPostBrockStoryActive()
  );
}

function getBrockMissionObjectiveText() {
  const status = getBrockMissionStatus();
  if (status === BROCK_MISSION_STATUS.TALK_TO_BRICK) {
    return "Objective: Talk to Brick at the inn about Brock.";
  }

  if (status === BROCK_MISSION_STATUS.SEARCH_GRASSLAND) {
    return BROCK_MISSION_SEARCH_OBJECTIVE;
  }

  if (status === BROCK_MISSION_STATUS.RESCUED) {
    const guideId = getPostBrockStoryGuideId();
    if (guideId === "brick" && hasDementedEssenseForBrick()) {
      return "Objective: Bring DementedEssense to Brick at the inn.";
    }
    if (guideId === "brock" || guideId === "brick") {
      return "Objective: Check on Brick and Brock at the inn about the wizard.";
    }
    if (guideId === "scott") {
      return "Objective: Talk to Scott at the arena about DementedEssense.";
    }
  }

  return "";
}

function ensureBrockMissionStarted() {
  if (!canStartBrockMission()) {
    return false;
  }

  if (!state.storyFlags?.brockMissionStatus) {
    state.storyFlags = normalizeStoryFlags({
      ...state.storyFlags,
      brockMissionStatus: BROCK_MISSION_STATUS.TALK_TO_BRICK,
    });
    updateCaughtHud(countCaughtMatts(), true);
    return true;
  }

  return false;
}

function startBrockMissionSearch() {
  if (!canStartBrockMission()) {
    renderActiveOverlay("Brock's trail is not ready yet.");
    return;
  }

  if (getBrockMissionStatus() === BROCK_MISSION_STATUS.TALK_TO_BRICK) {
    setBrockMissionStatus(BROCK_MISSION_STATUS.SEARCH_GRASSLAND);
  }

  renderActiveOverlay(`${BROCK_MISSION_BRICK_DIALOGUE} ${BROCK_MISSION_SEARCH_OBJECTIVE}`);
  setGameMessage(BROCK_MISSION_SEARCH_OBJECTIVE, 7200);
}

function getNearbyCapturedBrock() {
  if (getBrockMissionStatus() !== BROCK_MISSION_STATUS.SEARCH_GRASSLAND) {
    return null;
  }

  const brock = getCapturedBrockPosition();
  if (!brock) {
    return null;
  }

  return Math.hypot(brock.x - state.player.x, brock.y - state.player.y) <= BROCK_RESCUE_RADIUS ? brock : null;
}

function showBrockRescueConversation() {
  state.storyFlags = normalizeStoryFlags({
    ...state.storyFlags,
    brockRescueConversationSeen: true,
  });
  saveEconomy();
  openStoryOverlay("Brock", BROCK_RESCUE_DIALOGUE, "Press E near Brock to free him.");
  setGameMessage("Brock asks you to free him.", 7200);
}

function maybeStartBrockRescueConversation() {
  if (
    state.dev.enabled ||
    isIntroOpen() ||
    isPauseMenuOpen() ||
    isShopOpen() ||
    state.arena.active ||
    isBossIntroPlaying() ||
    hasSeenBrockRescueConversation()
  ) {
    return false;
  }

  if (!getNearbyCapturedBrock()) {
    return false;
  }

  showBrockRescueConversation();
  return true;
}

function tryRescueNearbyBrock() {
  const brock = getNearbyCapturedBrock();
  if (!brock) {
    return false;
  }

  if (!hasSeenBrockRescueConversation()) {
    showBrockRescueConversation();
    return true;
  }

  setBrockRescued(true);
  spawnCaptureEffect({ x: brock.x, y: brock.y });
  addScreenShake(4);
  startWizardAmbushAfterBrockRescue();
  setGameMessage("Brock is free. A dark figure moves deeper in the cave.", 7800);
  draw();
  return true;
}

function getIntroState() {
  if (!state.intro) {
    state.intro = createDefaultIntroState(false);
  }
  return state.intro;
}

function isIntroComplete() {
  return Boolean(getIntroState().introComplete);
}

function isIntroChainActive() {
  return !isIntroComplete();
}

function getIntroQuestIndex(questId) {
  const index = INTRO_QUEST_SEQUENCE.indexOf(questId);
  return index === -1 ? 0 : index;
}

function hasReachedIntroQuest(questId) {
  if (isIntroComplete()) {
    return true;
  }

  return getIntroQuestIndex(getActiveIntroQuest().id) >= getIntroQuestIndex(questId);
}

function getUnlockedIntroWorldIds() {
  if (!isIntroChainActive()) {
    return new Set(WORLD_IDS);
  }

  const unlocked = new Set();
  INTRO_WORLD_UNLOCKS.forEach((unlock) => {
    if (hasReachedIntroQuest(unlock.questId)) {
      unlock.worlds.forEach((worldId) => unlocked.add(worldId));
    }
  });
  return unlocked;
}

function canEnterWorldDuringIntro(worldId) {
  return !isIntroChainActive() || getUnlockedIntroWorldIds().has(worldId);
}

function getIntroWorldLockedMessage(worldId) {
  const label = getWorldLabel(worldId);
  return `${label} is not open yet. ${getIntroObjectiveText()}`;
}

function getActiveIntroQuest() {
  const intro = getIntroState();
  return INTRO_QUESTS[intro.activeQuestId] || INTRO_QUESTS.intro_wake_brick;
}

function getIntroQuestProgress(quest = getActiveIntroQuest()) {
  const intro = getIntroState();
  const progress = intro.captureProgress[quest.id] || {};
  const counts = {};
  Object.keys(MATT_CONFIGS).forEach((type) => {
    counts[type] = Math.max(0, Math.floor(Number(progress[type]) || 0));
  });
  return counts;
}

function getIntroRequirementCount(requirement, quest = getActiveIntroQuest()) {
  return Math.min(getIntroQuestProgress(quest)[requirement.type] || 0, requirement.count);
}

function getIntroHeldRequirementCount(requirement) {
  return state.capturedParty.filter((matt) => matt.type === requirement.type).length;
}

function isIntroQuestReady(quest = getActiveIntroQuest()) {
  if (quest?.readyWhen && !isIntroLessonRequirementMet(quest.readyWhen)) {
    return false;
  }

  if (!quest || !Array.isArray(quest.requirements) || quest.requirements.length === 0) {
    return true;
  }
  return quest.requirements.every((requirement) => getIntroRequirementCount(requirement, quest) >= requirement.count);
}

function canTurnInIntroMatt(quest = getActiveIntroQuest()) {
  return Boolean(
    quest?.requirements?.some(
      (requirement) =>
        getIntroRequirementCount(requirement, quest) < requirement.count &&
        state.capturedParty.some((matt) => matt.type === requirement.type),
    ),
  );
}

function canUseIntroQuestAction(quest = getActiveIntroQuest()) {
  if (quest?.readyWhen) {
    return isIntroLessonRequirementMet(quest.readyWhen);
  }

  if (!quest?.requirements?.length) {
    return true;
  }

  return isIntroQuestReady(quest) || canTurnInIntroMatt(quest);
}

function isIntroLessonRequirementMet(requirementId) {
  if (requirementId === "has_tamed_follower") {
    return state.capturedParty.some((matt) => matt.tamed && matt.follower);
  }

  if (requirementId === "bond_care_used") {
    return Boolean(getIntroState().lessonFlags?.bondCareUsed);
  }

  return true;
}

function markIntroLessonFlag(flagId) {
  const intro = getIntroState();
  intro.lessonFlags = intro.lessonFlags || {};

  if (flagId === "bond_care_used") {
    intro.lessonFlags.bondCareUsed = true;
    saveIntroProgress();
  }
}

function getIntroObjectiveText() {
  if (isIntroComplete()) {
    return getBrockMissionObjectiveText() || "Objective: Explore Matt Game.";
  }

  const quest = getActiveIntroQuest();
  if (quest.readyWhen && !isIntroQuestReady(quest)) {
    return `Objective: ${quest.objective || "Complete Ty's bonding lesson."}`;
  }

  if (quest.readyWhen && isIntroQuestReady(quest)) {
    const npcName = NPC_DEFS[quest.npcId]?.name || "the right person";
    return `Objective: Return to ${npcName} for the next bonding step.`;
  }

  if (quest.requirements?.length && isIntroQuestReady(quest)) {
    const npcName = NPC_DEFS[quest.npcId]?.name || "the right person";
    return `Objective: Return to ${npcName} for your reward.`;
  }

  if (quest.requirements?.length) {
    const progress = quest.requirements
      .map((requirement) => `${getIntroRequirementCount(requirement, quest)}/${requirement.count} ${MATT_LABELS[requirement.type] || "Matt"}`)
      .join(", ");
    return `Objective: ${quest.objective || "Capture and turn in Matts."} Turned in: ${progress}.`;
  }

  return `Objective: ${quest.objective || "Keep following the tutorial."}`;
}

function saveIntroProgress() {
  saveEconomy();
  updateCaughtHud(countCaughtMatts(), true);
}

function setIntroQuest(questId) {
  const intro = getIntroState();
  const nextQuest = INTRO_QUESTS[questId] || INTRO_QUESTS.intro_complete;
  intro.activeQuestId = nextQuest.id;
  intro.introComplete = nextQuest.id === "intro_complete";
  if (!intro.captureProgress[nextQuest.id]) {
    intro.captureProgress[nextQuest.id] = {};
  }
  saveIntroProgress();
  setGameMessage(getIntroObjectiveText(), 6200);
}

function getIntroQuestRewardText(quest) {
  const rewards = [];
  if (quest.rewardCoins) {
    rewards.push(`${quest.rewardCoins} coins`);
  }
  (quest.rewardItems || []).forEach((reward) => {
    const item = ITEM_DEFS[reward.id];
    if (item) {
      rewards.push(`${item.name}${reward.count > 1 ? ` x${reward.count}` : ""}`);
    }
  });
  (quest.rewardMatts || []).forEach((reward) => {
    if (MATT_CONFIGS[reward.type]) {
      rewards.push(reward.name || MATT_LABELS[reward.type] || "Starter Matt");
    }
  });
  if (quest.randomRewardItems?.length) {
    rewards.push(`${quest.randomRewardCount || 1} random supplies`);
  }
  return rewards.join(", ") || "Tutorial progress";
}

function addRewardMattToParty(reward) {
  if (!reward || !MATT_CONFIGS[reward.type] || state.capturedParty.length >= MATT_PARTY_LIMIT) {
    return null;
  }

  const originalId = reward.id || `${reward.type}-ty-lesson-${Date.now()}`;
  const member = normalizeCapturedPartyMember(
    {
      id: originalId,
      originalId,
      sourceWorld: "town_mattstore",
      type: reward.type,
      name: reward.name,
      x: state.player.x,
      y: state.player.y,
      direction: state.player.direction === "left" ? "left" : "right",
      friendship: reward.friendship || 0,
      tamed: Boolean(reward.tamed),
      follower: Boolean(reward.follower),
    },
    state.capturedParty.length,
  );

  if (!member) {
    return null;
  }

  state.capturedParty.push(member);
  state.dogmatts.push(hydrateCapturedMatt(member, state.capturedParty.length - 1));
  saveCapturedParty();
  updateCaughtHud(countCaughtMatts(), true);
  return member;
}

function grantIntroRewards(quest) {
  const intro = getIntroState();
  if (!quest || intro.rewards[quest.id]) {
    return [];
  }

  const granted = [];
  if (quest.rewardCoins) {
    state.coins += quest.rewardCoins;
    granted.push(`${quest.rewardCoins} coins`);
  }
  (quest.rewardItems || []).forEach((reward) => {
    addItem(reward.id, reward.count || 1);
    const item = ITEM_DEFS[reward.id];
    granted.push(`${item?.name || reward.id}${(reward.count || 1) > 1 ? ` x${reward.count || 1}` : ""}`);
  });
  (quest.rewardMatts || []).forEach((reward) => {
    const member = addRewardMattToParty(reward);
    if (member) {
      granted.push(getCapturedMattDisplayName(member));
    }
  });
  if (quest.randomRewardItems?.length) {
    const pool = [...quest.randomRewardItems];
    const count = Math.min(pool.length, quest.randomRewardCount || 1);
    for (let index = 0; index < count; index += 1) {
      const pickIndex = Math.floor(Math.random() * pool.length);
      const reward = pool.splice(pickIndex, 1)[0];
      addItem(reward.id, reward.count || 1);
      const item = ITEM_DEFS[reward.id];
      granted.push(`${item?.name || reward.id}${(reward.count || 1) > 1 ? ` x${reward.count || 1}` : ""}`);
    }
  }
  intro.rewards[quest.id] = true;
  updateEconomyHud();
  return granted;
}

function removeCapturedMattFromParty(partyId) {
  const index = state.capturedParty.findIndex((matt) => matt.partyId === partyId);
  if (index === -1) {
    return null;
  }

  const [matt] = state.capturedParty.splice(index, 1);
  state.dogmatts = state.dogmatts.filter((candidate) => candidate.partyId !== partyId);
  saveCapturedParty();
  updateCaughtHud(countCaughtMatts(), true);
  return matt;
}

function turnInOneIntroMatt(quest = getActiveIntroQuest()) {
  if (!quest?.requirements?.length) {
    return null;
  }

  const requirement = quest.requirements.find((candidate) => {
    return getIntroRequirementCount(candidate, quest) < candidate.count &&
      state.capturedParty.some((matt) => matt.type === candidate.type);
  });

  if (!requirement) {
    return null;
  }

  const matt = state.capturedParty.find((candidate) => candidate.type === requirement.type);
  if (!matt) {
    return null;
  }

  const removed = removeCapturedMattFromParty(matt.partyId);
  if (!removed) {
    return null;
  }

  const intro = getIntroState();
  intro.captureProgress[quest.id] = intro.captureProgress[quest.id] || {};
  intro.captureProgress[quest.id][requirement.type] = Math.min(
    requirement.count,
    (intro.captureProgress[quest.id][requirement.type] || 0) + 1,
  );
  saveIntroProgress();
  return removed;
}

function advanceIntroQuest(questId = getActiveIntroQuest().id) {
  const quest = INTRO_QUESTS[questId];
  if (!quest || quest.id !== getActiveIntroQuest().id) {
    renderActiveOverlay(getIntroObjectiveText());
    return;
  }

  let turnedIn = null;
  if (quest.requirements?.length && !isIntroQuestReady(quest)) {
    turnedIn = turnInOneIntroMatt(quest);
    if (!turnedIn) {
      renderActiveOverlay(`Bring an eligible Matt to ${NPC_DEFS[quest.npcId]?.name || "the quest giver"}. ${getIntroObjectiveText()}`);
      return;
    }

    if (!isIntroQuestReady(quest)) {
      renderActiveOverlay(`${NPC_DEFS[quest.npcId]?.name || "Quest"} accepted ${getCapturedMattDisplayName(turnedIn)}. ${getIntroObjectiveText()}`);
      return;
    }
  }

  if (quest.readyWhen && !isIntroQuestReady(quest)) {
    renderActiveOverlay(getIntroObjectiveText());
    return;
  }

  if (quest.practiceBattle) {
    startIntroPracticeBattle();
    return;
  }

  const granted = grantIntroRewards(quest);
  const nextQuestId = quest.next || "intro_complete";
  setIntroQuest(nextQuestId);
  const startedBrockMission = nextQuestId === "intro_complete" && ensureBrockMissionStarted();
  if (nextQuestId === "intro_complete") {
    getIntroState().introComplete = true;
    saveIntroProgress();
  }
  const detail = granted.length ? ` Reward: ${granted.join(", ")}.` : "";
  const handoff = turnedIn ? `${NPC_DEFS[quest.npcId]?.name || "Quest"} accepted ${getCapturedMattDisplayName(turnedIn)}. ` : "";
  const brockHandoff = startedBrockMission ? ` ${BROCK_MISSION_REACH_OUT} ${getBrockMissionObjectiveText()}` : "";
  renderActiveOverlay(`${handoff}${quest.readyText || quest.dialogue || "Done."}${detail}${brockHandoff}`);
}

function recordIntroCapture(type) {
  if (!isIntroChainActive() || !type || !MATT_CONFIGS[type]) {
    return;
  }

  const quest = getActiveIntroQuest();
  if (!quest.requirements?.some((requirement) => requirement.type === type)) {
    return;
  }

  saveIntroProgress();
  setGameMessage(getIntroObjectiveText(), 7200);
}

function normalizeCaptureStats(stats) {
  const byType = {};

  if (stats?.byType && typeof stats.byType === "object") {
    Object.keys(MATT_CONFIGS).forEach((type) => {
      const count = Math.max(0, Math.floor(Number(stats.byType[type]) || 0));
      if (count > 0) {
        byType[type] = count;
      }
    });
  }

  state.capturedParty.forEach((matt) => {
    if (!matt?.type || !MATT_CONFIGS[matt.type]) {
      return;
    }

    const partyCount = state.capturedParty.filter((candidate) => candidate.type === matt.type).length;
    byType[matt.type] = Math.max(byType[matt.type] || 0, partyCount);
  });

  return { byType };
}

function normalizeArenaStats(stats) {
  return {
    wins: Math.max(0, Math.floor(Number(stats?.wins) || 0)),
    losses: Math.max(0, Math.floor(Number(stats?.losses) || 0)),
    streak: Math.max(0, Math.floor(Number(stats?.streak) || 0)),
    bestStreak: Math.max(0, Math.floor(Number(stats?.bestStreak) || 0)),
    rankPoints: Math.max(0, Math.floor(Number(stats?.rankPoints) || 0)),
  };
}

function normalizePlayerProgress(progress) {
  const normalizedSkills = {};
  if (progress?.skills && typeof progress.skills === "object") {
    Object.entries(PLAYER_SKILLS).forEach(([skillId, skill]) => {
      const rank = clamp(Math.floor(Number(progress.skills[skillId]) || 0), 0, skill.maxRank);
      if (rank > 0) {
        normalizedSkills[skillId] = rank;
      }
    });
  }

  return {
    level: clamp(Math.floor(Number(progress?.level) || 1), 1, MAX_PLAYER_LEVEL),
    xp: Math.max(0, Math.floor(Number(progress?.xp) || 0)),
    skillPoints: Math.max(0, Math.floor(Number(progress?.skillPoints) || 0)),
    skills: normalizedSkills,
  };
}

function normalizeFriendshipCare(care) {
  const normalized = {};

  if (!care || typeof care !== "object") {
    return normalized;
  }

  Object.entries(care).forEach(([partyId, day]) => {
    const cleanDay = Math.max(0, Math.floor(Number(day) || 0));
    if (partyId && cleanDay > 0) {
      normalized[partyId] = cleanDay;
    }
  });

  return normalized;
}

function loadEconomy({ allowLegacy = shouldUseLegacyProfileStorage() } = {}) {
  try {
    const saved =
      localStorage.getItem(getEconomyStorageKey()) || (allowLegacy ? localStorage.getItem(ECONOMY_STORAGE_KEY) : null);
    if (saved) {
      const data = JSON.parse(saved);
      state.coins = Math.max(0, Math.floor(Number(data.coins) || 0));
      state.inventory = normalizeInventory(data.inventory);
      state.missions = normalizeMissions(data.missions);
      state.intro = normalizeIntroState(data.intro, true);
      state.storyFlags = normalizeStoryFlags(data.storyFlags);
      ensureBrockMissionStarted();
      state.captureStats = normalizeCaptureStats(data.captureStats);
      state.playerProgress = normalizePlayerProgress(data.playerProgress);
      state.arenaStats = normalizeArenaStats(data.arenaStats);
      state.friendshipCare = normalizeFriendshipCare(data.friendshipCare);
      return;
    }
  } catch (error) {
    console.warn("Could not load economy.", error);
  }

  state.coins = STARTING_COINS;
  state.inventory = {};
  state.missions = {};
  state.intro = createDefaultIntroState(false);
  state.storyFlags = normalizeStoryFlags();
  ensureBrockMissionStarted();
  state.captureStats = normalizeCaptureStats();
  state.playerProgress = normalizePlayerProgress();
  state.arenaStats = normalizeArenaStats();
  state.friendshipCare = {};
}

function saveEconomy() {
  try {
    localStorage.setItem(
      getEconomyStorageKey(),
      JSON.stringify({
        version: 5,
        coins: state.coins,
        inventory: state.inventory,
        missions: state.missions,
        intro: state.intro,
        storyFlags: state.storyFlags,
        captureStats: state.captureStats,
        playerProgress: state.playerProgress,
        arenaStats: state.arenaStats,
        friendshipCare: state.friendshipCare,
      }),
    );
    touchActiveProfile();
  } catch (error) {
    console.warn("Could not save economy.", error);
  }
}

function updateEconomyHud() {
  if (moneyCounter) {
    moneyCounter.textContent = `Coins: ${state.coins}`;
  }

  if (shopMoney) {
    shopMoney.textContent = `Coins: ${state.coins} | Ivan Lv ${getPlayerLevel()} | SP ${getPlayerSkillPoints()}`;
  }
}

function getPlayerLevel() {
  return clamp(Math.floor(Number(state.playerProgress?.level) || 1), 1, MAX_PLAYER_LEVEL);
}

function getPlayerSkillPoints() {
  return Math.max(0, Math.floor(Number(state.playerProgress?.skillPoints) || 0));
}

function getPlayerXpToNext(level = getPlayerLevel()) {
  return 70 + level * 40 + Math.floor(level * level * 4);
}

function getSkillRank(skillId) {
  return clamp(Math.floor(Number(state.playerProgress?.skills?.[skillId]) || 0), 0, PLAYER_SKILLS[skillId]?.maxRank || 0);
}

function getSkillBonus(skillId, perRank) {
  return getSkillRank(skillId) * perRank;
}

function updatePlayerProgressHud() {
  const level = getPlayerLevel();
  const xp = Math.max(0, Math.floor(Number(state.playerProgress?.xp) || 0));
  const nextXp = getPlayerXpToNext(level);
  const xpRatio = level >= MAX_PLAYER_LEVEL ? 1 : clamp(xp / Math.max(1, nextXp), 0, 1);

  if (playerCounter) {
    const next = level >= MAX_PLAYER_LEVEL ? "MAX" : `${xp} / ${nextXp}`;
    playerCounter.textContent = `Lv ${level} - XP ${next} - SP ${getPlayerSkillPoints()}`;
  }

  if (xpCounter) {
    xpCounter.textContent = level >= MAX_PLAYER_LEVEL ? "MAX" : `${Math.round(xpRatio * 100)}%`;
  }

  if (xpFill) {
    xpFill.style.width = `${xpRatio * 100}%`;
  }

  if (xpMeter) {
    xpMeter.setAttribute("aria-valuemin", "0");
    xpMeter.setAttribute("aria-valuemax", level >= MAX_PLAYER_LEVEL ? "100" : String(nextXp));
    xpMeter.setAttribute("aria-valuenow", level >= MAX_PLAYER_LEVEL ? "100" : String(xp));
  }
}

function awardPlayerXp(amount, reason = "") {
  const gained = Math.max(0, Math.floor(Number(amount) || 0));
  if (gained <= 0) {
    return { gained: 0, leveled: false };
  }

  const progress = normalizePlayerProgress(state.playerProgress);
  let leveled = false;
  let level = progress.level;
  let xp = progress.xp + gained;
  let skillPoints = progress.skillPoints;

  while (level < MAX_PLAYER_LEVEL && xp >= getPlayerXpToNext(level)) {
    xp -= getPlayerXpToNext(level);
    level += 1;
    skillPoints += 1;
    leveled = true;
  }

  if (level >= MAX_PLAYER_LEVEL) {
    xp = 0;
  }

  state.playerProgress = { ...progress, level, xp, skillPoints };
  saveEconomy();
  updateEconomyHud();
  updatePlayerProgressHud();
  updatePlayerStatusHud();

  if (leveled) {
    setGameMessage(`Ivan reached Lv ${level}. Skill point gained.`);
  } else if (reason) {
    setGameMessage(`Ivan gained ${gained} XP from ${reason}.`);
  }

  return { gained, leveled, level };
}

function getSpentSkillPoints() {
  return Object.values(state.playerProgress?.skills || {}).reduce((total, rank) => total + Math.max(0, Math.floor(Number(rank) || 0)), 0);
}

function getSkillRequirementText(skill) {
  if (!skill?.requires) {
    return "";
  }

  return Object.entries(skill.requires)
    .map(([skillId, rank]) => `${PLAYER_SKILLS[skillId]?.name || skillId} ${rank}`)
    .join(", ");
}

function canUnlockSkill(skillId) {
  const skill = PLAYER_SKILLS[skillId];
  if (!skill) {
    return { ok: false, reason: "Unknown skill." };
  }
  if (getSkillRank(skillId) >= skill.maxRank) {
    return { ok: false, reason: "Max rank." };
  }
  if (getPlayerSkillPoints() <= 0) {
    return { ok: false, reason: "Need 1 skill point." };
  }

  for (const [requiredId, requiredRank] of Object.entries(skill.requires || {})) {
    if (getSkillRank(requiredId) < requiredRank) {
      return { ok: false, reason: `Needs ${getSkillRequirementText(skill)}.` };
    }
  }

  return { ok: true, reason: "" };
}

function unlockSkill(skillId) {
  const check = canUnlockSkill(skillId);
  const skill = PLAYER_SKILLS[skillId];
  if (!check.ok || !skill) {
    renderActiveOverlay(check.reason || "That skill cannot be learned yet.");
    return;
  }

  state.playerProgress = normalizePlayerProgress(state.playerProgress);
  const previousMaxHealth = getPlayerMaxHealth();
  const previousMaxStamina = getPlayerMaxStamina();
  state.playerProgress.skillPoints -= 1;
  state.playerProgress.skills[skillId] = getSkillRank(skillId) + 1;
  const healthGain = Math.max(0, getPlayerMaxHealth() - previousMaxHealth);
  const staminaGain = Math.max(0, getPlayerMaxStamina() - previousMaxStamina);
  state.player.health = Math.min(getPlayerMaxHealth(), (state.player.health || 0) + healthGain);
  state.player.stamina = Math.min(getPlayerMaxStamina(), (state.player.stamina || 0) + staminaGain);
  saveEconomy();
  updateEconomyHud();
  updatePlayerProgressHud();
  updatePlayerStatusHud();
  renderActiveOverlay(`${skill.name} increased to rank ${getSkillRank(skillId)}.`);
}

function resetPlayerSkills() {
  const spent = getSpentSkillPoints();
  if (spent <= 0) {
    renderActiveOverlay("No learned skills to reset.");
    return;
  }

  state.playerProgress = normalizePlayerProgress(state.playerProgress);
  state.playerProgress.skillPoints += spent;
  state.playerProgress.skills = {};
  state.player.health = Math.min(state.player.health || 0, getPlayerMaxHealth());
  state.player.stamina = Math.min(state.player.stamina || 0, getPlayerMaxStamina());
  saveEconomy();
  updateEconomyHud();
  updatePlayerProgressHud();
  updatePlayerStatusHud();
  renderActiveOverlay(`Skills reset. Refunded ${spent} skill point${spent === 1 ? "" : "s"}.`);
}

function getPlayerMaxHealth() {
  return PLAYER.maxHealth +
    (hasItem("guard_armor") ? 15 : 0) +
    (hasItem("steel_armor") ? 30 : 0) +
    (hasItem("tempered_plate") ? 45 : 0) +
    getSkillBonus("field_endurance", 14) +
    getSkillBonus("last_stand", 10);
}

function getPlayerMaxStamina() {
  return PLAYER.maxStamina +
    (hasItem("swift_boots") ? 20 : 0) +
    (hasItem("trail_map") ? 12 : 0) +
    getSkillBonus("trail_runner", 8);
}

function updatePlayerStatusHud() {
  const maxHealth = getPlayerMaxHealth();
  const maxStamina = getPlayerMaxStamina();
  state.player.health = clamp(state.player.health ?? maxHealth, 0, maxHealth);
  state.player.stamina = clamp(state.player.stamina ?? maxStamina, 0, maxStamina);
  const healthRatio = clamp(state.player.health / Math.max(1, maxHealth), 0, 1);
  const staminaRatio = clamp(state.player.stamina / Math.max(1, maxStamina), 0, 1);

  if (healthCounter) {
    healthCounter.textContent = `${Math.ceil(state.player.health)} / ${maxHealth}`;
  }

  if (staminaCounter) {
    staminaCounter.textContent = `${Math.ceil(state.player.stamina)} / ${maxStamina}`;
  }

  if (healthFill) {
    healthFill.style.width = `${healthRatio * 100}%`;
  }

  if (staminaFill) {
    staminaFill.style.width = `${staminaRatio * 100}%`;
  }

  if (healthMeter) {
    healthMeter.setAttribute("aria-valuemin", "0");
    healthMeter.setAttribute("aria-valuemax", String(maxHealth));
    healthMeter.setAttribute("aria-valuenow", String(Math.ceil(state.player.health)));
  }

  if (staminaMeter) {
    staminaMeter.setAttribute("aria-valuemin", "0");
    staminaMeter.setAttribute("aria-valuemax", String(maxStamina));
    staminaMeter.setAttribute("aria-valuenow", String(Math.ceil(state.player.stamina)));
  }
}

function getItemCount(itemId) {
  return Math.max(0, Math.floor(state.inventory[itemId] || 0));
}

function hasItem(itemId) {
  return getItemCount(itemId) > 0;
}

function addItem(itemId, amount = 1) {
  if (!ITEM_DEFS[itemId]) {
    return;
  }

  const nextAmount = getItemCount(itemId) + amount;
  state.inventory[itemId] = ITEM_DEFS[itemId].unique ? Math.min(1, nextAmount) : nextAmount;
}

function removeItem(itemId, amount = 1) {
  const nextAmount = getItemCount(itemId) - amount;
  if (nextAmount > 0) {
    state.inventory[itemId] = nextAmount;
  } else {
    delete state.inventory[itemId];
  }
}

function getWhipAttackRange() {
  return PLAYER.attackRange +
    (hasItem("iron_whip") ? 80 : 0) +
    (hasItem("whetstone") ? 35 : 0) +
    getSkillBonus("whip_mastery", 28) +
    getSkillBonus("clean_capture", 18);
}

function getPlayerWalkSpeed() {
  return PLAYER.speed +
    (hasItem("swift_boots") ? 130 : 0) +
    (hasItem("trail_map") ? 55 : 0) +
    getSkillBonus("trail_runner", 30) +
    getSkillBonus("pathfinder", 18);
}

function getPlayerSprintSpeed() {
  return PLAYER.sprintSpeed +
    (hasItem("swift_boots") ? 160 : 0) +
    (hasItem("trail_map") ? 70 : 0) +
    getSkillBonus("trail_runner", 45) +
    getSkillBonus("pathfinder", 28) +
    getSkillBonus("evasive_stride", 14);
}

function getPlayerStaminaRegen() {
  return PLAYER.staminaRegen + getSkillBonus("steady_breath", 7) + getSkillBonus("pathfinder", 2);
}

function getPlayerSprintStaminaCost() {
  return Math.max(8, PLAYER.sprintStaminaCost - getSkillBonus("steady_breath", 2) - getSkillBonus("pathfinder", 1));
}

function getArmorDamageReduction() {
  const reductions = ["guard_armor", "steel_armor", "tempered_plate"]
    .filter(hasItem)
    .map((itemId) => ITEM_DEFS[itemId].armor || 0);
  const armorReduction = reductions.length > 0 ? Math.max(...reductions) : 0;
  return clamp(armorReduction + getSkillBonus("iron_will", 0.06) + getSkillBonus("last_stand", 0.03), 0, 0.78);
}

function hashStringSeed(text) {
  return String(text || "")
    .split("")
    .reduce((hash, char) => ((hash * 31 + char.charCodeAt(0)) % 2147483647) || 1, 17);
}

function getWorldEncounterProfile(worldId = state.currentWorld) {
  const mattType = WORLD_MATT_TYPES[worldId] || "";
  if (!mattType) {
    return null;
  }

  const config = getMattConfig(mattType);
  return {
    mattType,
    levelMin: 1,
    levelMax: 3,
    captureDifficulty: 1,
    damageScale: 1,
    count: config.count,
    eliteChance: 0,
    ...(WORLD_ENCOUNTER_PROFILES[worldId] || {}),
  };
}

function rollWildMattLevel(profile, random = Math.random) {
  const min = clamp(Math.floor(profile?.levelMin || 1), 1, 50);
  const max = clamp(Math.floor(profile?.levelMax || min), min, 50);
  let level = min + Math.floor(random() * (max - min + 1));

  if (profile?.eliteChance && random() < profile.eliteChance) {
    level += Math.max(1, Math.ceil((max - min + 1) * 0.3));
  }

  return clamp(level, 1, 50);
}

function getWildMattCaptureHits(matt) {
  if (Number.isFinite(matt?.defeatHits)) {
    return clamp(Math.round(matt.defeatHits), 2, 12);
  }

  const level = getMattLevel(matt);
  const difficulty = Number(matt?.captureDifficulty) || 1;
  if (matt?.boss) {
    const underLevelPenalty = Math.max(0, 10 - getPlayerLevel());
    const bossBonus = Math.max(0, Math.floor(Number(matt.captureHitsBonus) || 0));
    return clamp(Math.round(9 + difficulty + level / 4 + underLevelPenalty * 1.15 + bossBonus), 12, 24);
  }

  return clamp(Math.round(2 + difficulty + level / 9), 3, 8);
}

function getWildMattCaptureChance(matt) {
  const level = getMattLevel(matt);
  const difficulty = Number(matt?.captureDifficulty) || 1;
  if (matt?.boss) {
    const underLevelPenalty = Math.max(0, 10 - getPlayerLevel()) * 0.035;
    const base = 0.72 - difficulty * 0.055 - level * 0.009 - underLevelPenalty;
    return clamp(base, 0.12, 0.72);
  }

  const base = 0.98 - difficulty * 0.07 - level * 0.012;
  return clamp(base, 0.34, 0.94);
}

function getCaptureHitThreshold(matt = null) {
  let threshold = matt ? getWildMattCaptureHits(matt) : 4;
  if (Number.isFinite(matt?.defeatHits)) {
    return Math.max(2, threshold);
  }
  if (hasItem("matt_snack")) {
    threshold -= 1;
  }
  if (hasItem("capture_net")) {
    threshold -= 1;
  }
  if (hasItem("calming_flute")) {
    threshold -= 1;
  }
  if (getSkillRank("clean_capture") >= 2) {
    threshold -= 1;
  }
  if (matt?.boss && getSkillRank("prime_study") >= 2) {
    threshold -= 1;
  }
  return Math.max(2, threshold);
}

function getCaptureAttemptChance(matt, { snackUsed = false, netUsed = false, fluteUsed = false } = {}) {
  let chance = getWildMattCaptureChance(matt);
  if (snackUsed) {
    chance += 0.08;
  }
  if (netUsed) {
    chance += 0.22;
  }
  if (fluteUsed) {
    chance += 0.14;
  }
  chance += getSkillBonus("calm_hands", 0.06);
  chance += getSkillBonus("clean_capture", 0.03);
  if (matt?.boss) {
    chance += getSkillBonus("prime_study", 0.04);
  }
  return clamp(chance, 0.18, 0.98);
}

function getWildMattAttackDamage(matt, config = getMattConfig(matt?.type)) {
  const base = config.attackDamage || 0;
  if (base <= 0) {
    return 0;
  }

  const level = getMattLevel(matt);
  const difficulty = Math.max(1, Number(matt?.captureDifficulty) || 1);
  const scale = Math.max(0.4, Number(matt?.damageScale) || 1);
  const bossStudy = matt?.boss ? getSkillBonus("prime_study", 0.05) : 0;
  return Math.max(1, Math.round(base * scale * (1 + (level - 1) * 0.045 + (difficulty - 1) * 0.055) * (1 - bossStudy)));
}

function getMattSellValue(type, matt = null) {
  const baseValue = MATT_SELL_VALUES[type] || 25;
  const charmBonus = hasItem("matt_charm") ? 0.2 : 0;
  const ledgerBonus = hasItem("trade_ledger") ? 0.15 : 0;
  const levelBonus = matt ? Math.max(0, getMattLevel(matt) - 1) * 0.035 : 0;
  const difficultyBonus = matt ? (Math.max(1, Number(matt.captureDifficulty) || 1) - 1) * 0.05 : 0;
  return Math.round(baseValue * (1 + charmBonus + ledgerBonus + levelBonus + difficultyBonus));
}

function makeCapturedPartyId(matt) {
  return matt.partyId || `${matt.sourceWorld || state.currentWorld}:${matt.originalId || matt.id}`;
}

function sanitizeMattName(name) {
  return String(name || "")
    .replace(/[^\w\s'.-]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 20);
}

function getCapturedMattDisplayName(matt) {
  return sanitizeMattName(matt?.name) || MATT_LABELS[matt?.type] || "Captured Matt";
}

function getFollowerStatusLine(matt) {
  if (!matt?.tamed) {
    return "Untamed. Bring this Matt to Ty to make it a follower.";
  }

  const role = matt.follower ? "Active follower" : "Tamed follower";
  return `${role} | ${getFriendshipLine(matt)} | Lv ${getMattLevel(matt)}`;
}

function getCapturedBossVisualMeta(matt) {
  const sourceWorld = matt?.sourceWorld || state.currentWorld || DEFAULT_WORLD_ID;
  const originalId = matt?.originalId || matt?.id || "";
  const boss = WORLD_BOSS_MATTS[sourceWorld];

  if (!boss || boss.type !== matt?.type || (boss.id !== originalId && boss.id !== matt?.id)) {
    return null;
  }

  return {
    assetKey: boss.assetKey || boss.type,
    scale: boss.scale || 1,
    name: boss.name || "",
  };
}

function getCapturedMattVisualMeta(matt) {
  const bossVisual = getCapturedBossVisualMeta(matt);
  const requestedAssetKey = matt?.assetKey || bossVisual?.assetKey || "";
  const assetKey = requestedAssetKey && ASSETS[requestedAssetKey] ? requestedAssetKey : "";
  const directScale = Number(matt?.scale);
  const bossScale = Number(bossVisual?.scale);
  const scale = Number.isFinite(directScale) && directScale > 0
    ? directScale
    : Number.isFinite(bossScale) && bossScale > 0
      ? bossScale
      : 1;

  return {
    assetKey,
    scale,
    name: bossVisual?.name || "",
  };
}

function shouldCapturedMattUseWalkingLoop(matt) {
  return matt?.assetKey === "primegrassmatt";
}

function shouldUseWildFollowerFrames(matt) {
  return Boolean(matt?.tamed && matt.follower && (matt.caught || matt.partyId));
}

function getCapturedMattRestAction(matt) {
  if (shouldUseWildFollowerFrames(matt)) {
    const frameSet = images[matt.assetKey || matt.type] || images[matt.type] || {};
    return frameSet.idle?.length > 0 ? "idle" : getFollowerMoveAction(matt);
  }

  return shouldCapturedMattUseWalkingLoop(matt) ? "walking" : "caught";
}

function getCapturedMattTravelAction(matt) {
  if (shouldUseWildFollowerFrames(matt)) {
    return getFollowerMoveAction(matt);
  }

  return shouldCapturedMattUseWalkingLoop(matt) ? "walking" : "caught";
}

function normalizeFollowerSelection(party) {
  let activeFollowerFound = false;
  return party.map((matt) => {
    const tamed = Boolean(matt.tamed);
    const follower = tamed && Boolean(matt.follower) && !activeFollowerFound;

    if (follower) {
      activeFollowerFound = true;
    }

    return { ...matt, tamed, follower };
  });
}

function syncCapturedMattRuntime(updated) {
  if (!updated || !Array.isArray(state.dogmatts)) {
    return;
  }

  state.dogmatts.forEach((candidate) => {
    if (candidate.partyId === updated.partyId) {
      candidate.name = updated.name || "";
      candidate.tamed = Boolean(updated.tamed);
      candidate.follower = Boolean(updated.follower);
      candidate.level = updated.level;
      candidate.xp = updated.xp;
      candidate.friendship = updated.friendship;
      candidate.assetKey = updated.assetKey || "";
      candidate.scale = Number(updated.scale) || 1;
      if (candidate.caught && shouldUseWildFollowerFrames(candidate) && candidate.action === "caught") {
        setAction(candidate, getCapturedMattRestAction(candidate));
      }
    } else if (updated.follower && candidate.caught) {
      candidate.follower = false;
      if (!shouldCapturedMattUseWalkingLoop(candidate) && ["idle", "walking"].includes(candidate.action)) {
        setAction(candidate, "caught");
      }
    }
  });
}

function updateCapturedMattById(partyId, updater) {
  const partyIndex = state.capturedParty.findIndex((matt) => matt.partyId === partyId);
  if (partyIndex === -1) {
    return null;
  }

  const nextParty = state.capturedParty.map((matt, index) => {
    if (index !== partyIndex) {
      return matt;
    }

    return normalizeCapturedPartyMember({ ...matt, ...updater(matt) }, index);
  });
  state.capturedParty = normalizeFollowerSelection(nextParty.filter(Boolean)).slice(0, MATT_PARTY_LIMIT);
  const updated = state.capturedParty.find((matt) => matt.partyId === partyId);
  state.capturedParty.forEach(syncCapturedMattRuntime);
  saveCapturedParty();
  updateCaughtHud(countCaughtMatts());
  updateFollowerCommandUi(true);
  return updated;
}

function normalizeCapturedPartyMember(matt, fallbackIndex = 0) {
  if (!matt || !MATT_CONFIGS[matt.type]) {
    return null;
  }

  const originalId = matt.originalId || matt.id || `${matt.type}-${fallbackIndex + 1}`;
  const sourceWorld = matt.sourceWorld || state.currentWorld || DEFAULT_WORLD_ID;
  const level = clamp(Math.floor(Number(matt.level) || 1), 1, 50);
  const xp = Math.max(0, Math.floor(Number(matt.xp) || 0));
  const friendship = clamp(Math.floor(Number(matt.friendship) || 0), 0, 100);
  const captureDifficulty = Math.max(1, Number(matt.captureDifficulty) || 1);
  const tamed = Boolean(matt.tamed);
  const visualMeta = getCapturedMattVisualMeta({ ...matt, originalId, sourceWorld });
  const visualName = sanitizeMattName(matt.name || visualMeta.name);
  const assetKey = visualMeta.assetKey;

  return {
    partyId: matt.partyId || `${sourceWorld}:${originalId}`,
    id: originalId,
    originalId,
    sourceWorld,
    type: matt.type,
    assetKey,
    scale: visualMeta.scale,
    name: visualName,
    tamed,
    follower: tamed && Boolean(matt.follower),
    x: Number.isFinite(matt.x) ? matt.x : state.player.x,
    y: Number.isFinite(matt.y) ? matt.y : state.player.y,
    action: getCapturedMattTravelAction({ assetKey }),
    frameIndex: Number.isFinite(matt.frameIndex) ? matt.frameIndex : 0,
    direction: matt.direction || "right",
    level,
    xp,
    friendship,
    captureDifficulty,
  };
}

function loadCapturedParty({ allowLegacy = shouldUseLegacyProfileStorage() } = {}) {
  try {
    const saved =
      localStorage.getItem(getMattProgressStorageKey()) ||
      (allowLegacy ? localStorage.getItem(MATT_PROGRESS_STORAGE_KEY) : null);
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

    return normalizeFollowerSelection(party.slice(0, MATT_PARTY_LIMIT));
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
    assetKey: normalized.assetKey,
    scale: normalized.scale,
    level: normalized.level,
    xp: normalized.xp,
    friendship: normalized.friendship,
    captureDifficulty: normalized.captureDifficulty,
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
    state.capturedParty = normalizeFollowerSelection(state.capturedParty).slice(0, MATT_PARTY_LIMIT);
    state.capturedParty.forEach(syncCapturedMattRuntime);
    localStorage.setItem(
      getMattProgressStorageKey(),
      JSON.stringify({ version: 2, party: state.capturedParty }),
    );
    touchActiveProfile();
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
    assetKey: saved.assetKey || "",
    name: sanitizeMattName(saved.name),
    tamed: Boolean(saved.tamed),
    follower: Boolean(saved.tamed && saved.follower),
    x: target.x,
    y: target.y,
    width: config.width,
    height: config.height,
    scale: Number(saved.scale) || 1,
    action: getCapturedMattTravelAction(saved),
    frameTimer: 0,
    frameIndex: saved.frameIndex || 0,
    direction: saved.direction || "right",
    level: saved.level || 1,
    xp: saved.xp || 0,
    friendship: saved.friendship || 0,
    captureDifficulty: saved.captureDifficulty || 1,
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
    idleSpecialTimer: config.specialIdleMin || FIREMATT.specialIdleMin,
    mysticFloatTimer: 0,
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
  state.captureStats = { byType: {} };
  try {
    localStorage.setItem(getMattProgressStorageKey(), JSON.stringify({ version: 2, party: [] }));
    saveEconomy();
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

function getShopDef(shopId = state.activeShopId) {
  return SHOP_DEFS[shopId] || null;
}

function getNearbyShopNpc() {
  let closest = null;
  let bestDistance = Infinity;

  for (const npc of state.npcs) {
    if (!SHOP_DEFS[npc.id]) {
      continue;
    }

    const distance = Math.hypot(npc.x - state.player.x, npc.y - state.player.y);
    if (distance <= SHOP_INTERACT_RADIUS && distance < bestDistance) {
      closest = npc;
      bestDistance = distance;
    }
  }

  return closest;
}

function openShop(shopId) {
  const shop = getShopDef(shopId);
  if (!shop || !shopOverlay) {
    return false;
  }

  closePauseMenu();
  keys.clear();
  touchInput.sprint = false;
  resetTouchJoystick();
  state.activeShopId = shopId;
  state.shopTab = "talk";
  state.activeDialogueTopic = "";
  document.body.classList.add("shop-open");
  shopOverlay.hidden = false;
  renderShop(shop.greeting);
  return true;
}

function openInventory() {
  if (state.arena.active && state.arena.phase !== "idle") {
    return;
  }

  openPauseMenu("inventory", "Inventory opened.");
}

function closeShop() {
  state.activeShopId = "";
  state.shopTab = "buy";
  state.activeDialogueTopic = "";
  document.body.classList.remove("shop-open");
  if (shopOverlay) {
    shopOverlay.hidden = true;
  }
  if (shopMessage) {
    shopMessage.textContent = "";
  }
}

function isShopOpen() {
  return Boolean(shopOverlay && !shopOverlay.hidden);
}

function tryOpenNearbyShop() {
  const npc = getNearbyShopNpc();
  return npc ? openShop(npc.id) : false;
}

function setShopTab(tab) {
  state.shopTab = tab;
  state.activeDialogueTopic = "";
  renderShop();
}

function getInventoryCategory(itemId) {
  const item = ITEM_DEFS[itemId];
  if (!item) {
    return "misc";
  }
  if (itemId === "arena_ticket" || itemId === "room_key" || itemId === DEMENTED_ESSENSE_ITEM_ID || item.mattType) {
    return "key";
  }
  if (item.bondOnly || itemId === "bond_ribbon" || itemId === "memory_locket" || item.use?.friendship) {
    return "bond";
  }
  if (
    itemId === "matt_snack" ||
    itemId === "matt_charm" ||
    itemId === "capture_net" ||
    itemId === "calming_flute" ||
    itemId === "trade_ledger"
  ) {
    return "capture";
  }
  if (item.armor || item.unique) {
    return "gear";
  }
  if (item.use?.health || item.use?.stamina) {
    return "consumable";
  }
  return "misc";
}

function getInventoryCategoryDef(categoryId) {
  return INVENTORY_CATEGORIES.find((category) => category.id === categoryId) || INVENTORY_CATEGORIES[0];
}

function getInventoryCategoryLabel(categoryId) {
  return getInventoryCategoryDef(categoryId).label;
}

function getItemRoleLabel(itemId) {
  const item = ITEM_DEFS[itemId];
  const category = getInventoryCategory(itemId);
  if (!item) {
    return "Unknown";
  }
  if (item.armor) {
    return "Armor";
  }
  if (itemId === "iron_whip" || itemId === "whetstone") {
    return "Whip Upgrade";
  }
  if (itemId === "swift_boots" || itemId === "trail_map") {
    return "Travel Gear";
  }
  if (item.use?.health && item.use?.stamina) {
    return "Meal";
  }
  if (item.use?.health) {
    return "Health";
  }
  if (item.use?.stamina) {
    return "Stamina";
  }
  if (item.bondOnly) {
    return "Single Matt Care";
  }
  if (item.use?.friendship) {
    return "Party Bond";
  }
  if (category === "capture") {
    return "Capture Aid";
  }
  if (category === "key") {
    return "Key Item";
  }
  if (category === "gear") {
    return "Passive Gear";
  }
  return getInventoryCategoryLabel(category);
}

function getItemEffectText(itemId) {
  const item = ITEM_DEFS[itemId];
  if (!item) {
    return "";
  }

  const effects = [];
  if (item.use?.health) {
    effects.push(`+${Math.round(item.use.health * getItemRecoveryMultiplier(itemId, "health"))} health`);
  }
  if (item.use?.stamina) {
    effects.push(`+${Math.round(item.use.stamina * getItemRecoveryMultiplier(itemId, "stamina"))} stamina`);
  }
  if (item.use?.friendship) {
    effects.push(`+${getFriendshipGain(item.use.friendship)} friendship`);
  }
  if (item.armor) {
    effects.push(`${Math.round(item.armor * 100)}% armor`);
  }
  if (itemId === "iron_whip") {
    effects.push("+80 whip reach");
  }
  if (itemId === "whetstone") {
    effects.push("+35 whip reach");
  }
  if (itemId === "swift_boots") {
    effects.push("+speed and stamina");
  }
  if (itemId === "trail_map") {
    effects.push("+travel speed");
  }
  if (itemId === "arena_handbook") {
    effects.push("+arena power, +arena XP");
  }
  if (itemId === "sparring_gloves") {
    effects.push("arena loss XP");
  }
  if (itemId === "matt_snack") {
    effects.push("-1 capture hit");
  }
  if (itemId === "capture_net") {
    effects.push("-1 capture hit, +capture chance");
  }
  if (itemId === "calming_flute") {
    effects.push("-1 capture hit, +capture chance");
  }
  if (itemId === "matt_charm") {
    effects.push("+Matt sale value");
  }
  if (itemId === "trade_ledger") {
    effects.push("+Matt sale value");
  }
  if (itemId === "bond_ribbon") {
    effects.push("+bond gains");
  }
  if (itemId === "memory_locket") {
    effects.push("+arena energy");
  }

  return effects.join(" | ");
}

function getShopItemPrice(itemId) {
  const item = ITEM_DEFS[itemId];
  if (!item) {
    return 0;
  }
  const discount = getSkillBonus("merchant_sense", 0.04);
  return Math.max(1, Math.round(item.price * (1 - discount)));
}

function getItemSellValue(itemId) {
  const item = ITEM_DEFS[itemId];
  if (!item) {
    return 0;
  }
  if (!item.sellPrice) {
    return 0;
  }
  const bonus = getSkillBonus("merchant_sense", 0.08);
  return Math.max(0, Math.round(item.sellPrice * (1 + bonus)));
}

function getItemRecoveryMultiplier(itemId, recoveryType = "") {
  const item = ITEM_DEFS[itemId];
  if (!item?.use) {
    return 1;
  }

  let multiplier = 1;
  multiplier += getSkillBonus("quartermaster", 0.04);
  multiplier += getSkillBonus("field_alchemy", 0.07);
  if (recoveryType === "health") {
    multiplier += getSkillBonus("field_medic", 0.09);
  }
  if (item.use.health && item.use.stamina) {
    multiplier += getSkillBonus("provisioner", 0.1);
  }
  return multiplier;
}

function getInventoryEntries(categoryId = "all") {
  return Object.entries(state.inventory)
    .filter(([itemId, count]) => ITEM_DEFS[itemId] && count > 0)
    .filter(([itemId]) => categoryId === "all" || getInventoryCategory(itemId) === categoryId)
    .sort(([a], [b]) => {
      const categoryDiff = (INVENTORY_CATEGORY_ORDER[getInventoryCategory(a)] ?? 99) - (INVENTORY_CATEGORY_ORDER[getInventoryCategory(b)] ?? 99);
      if (categoryDiff !== 0) {
        return categoryDiff;
      }
      return ITEM_DEFS[a].name.localeCompare(ITEM_DEFS[b].name);
    });
}

function getInventorySummary() {
  const entries = getInventoryEntries("all");
  const totalStacks = entries.reduce((total, [, count]) => total + count, 0);
  const categoryCounts = Object.fromEntries(INVENTORY_CATEGORIES.map((category) => [category.id, 0]));
  entries.forEach(([itemId]) => {
    const category = getInventoryCategory(itemId);
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  });

  return {
    itemTypes: entries.length,
    totalStacks,
    consumables: categoryCounts.consumable || 0,
    gear: categoryCounts.gear || 0,
    bond: categoryCounts.bond || 0,
    sellValue: entries.reduce((total, [itemId, count]) => total + getItemSellValue(itemId) * count, 0),
    categoryCounts,
  };
}

function makeShopButton(label, action, id, disabled = false) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.dataset.action = action;
  if (id !== undefined && id !== null) {
    button.dataset.id = id;
  }
  button.disabled = disabled;
  return button;
}

function appendItemRow(parent, itemId, mode) {
  const item = ITEM_DEFS[itemId];
  if (!item) {
    return;
  }

  const count = getItemCount(itemId);
  const price = getShopItemPrice(itemId);
  const sellValue = getItemSellValue(itemId);
  const row = document.createElement("article");
  row.className = "shop-item";

  const info = document.createElement("div");
  const title = document.createElement("strong");
  title.textContent = item.name;
  const detail = document.createElement("span");
  detail.textContent = mode === "buy"
    ? `${getItemRoleLabel(itemId)}. ${item.description} Price: ${price} coins${item.unique ? " each profile" : ""}.`
    : `${getItemRoleLabel(itemId)}. ${item.description} You own ${count}. Sell: ${sellValue} coins.`;
  info.append(title, detail);

  const owned = document.createElement("em");
  owned.textContent = `x${count}`;

  let action;
  if (mode === "buy") {
    action = makeShopButton(
      "Buy",
      "buy-item",
      itemId,
      state.coins < price ||
        (item.unique && count > 0) ||
        (item.mattType && state.capturedParty.length >= MATT_PARTY_LIMIT),
    );
  } else if (mode === "sell") {
    action = makeShopButton("Sell", "sell-item", itemId, count <= 0 || sellValue <= 0);
  } else if (item.bondOnly) {
    action = makeShopButton("Bond", "shop-tab", "bond", count <= 0 || state.capturedParty.length === 0);
  } else if (item.use) {
    action = makeShopButton("Use", "use-item", itemId, count <= 0);
  } else {
    action = makeShopButton("Owned", "", itemId, true);
  }

  row.append(info, owned, action);
  parent.append(row);
}

function appendEmptyShopMessage(parent, message) {
  const empty = document.createElement("p");
  empty.className = "shop-empty";
  empty.textContent = message;
  parent.append(empty);
}

function appendShopTextCard(parent, titleText, detailText, action = null) {
  const row = document.createElement("article");
  row.className = "shop-item";

  const info = document.createElement("div");
  const title = document.createElement("strong");
  title.textContent = titleText;
  const detail = document.createElement("span");
  detail.textContent = detailText;
  info.append(title, detail);

  row.append(info);
  if (action) {
    row.append(document.createElement("em"), action);
  }
  parent.append(row);
}

function getShopTabLabel(tab) {
  return {
    talk: "Talk",
    mission: "Mission",
    buy: "Buy",
    sell: "Sell",
    inventory: "Bag",
    followers: "Followers",
    bond: "Bond",
    skills: "Skills",
  }[tab] || tab;
}

function getShopTabs(shop) {
  if (!shop) {
    return ["inventory", "bond", "skills"];
  }

  const tabs = ["talk", "mission", "buy", "sell", "inventory"];
  if (state.activeShopId === "ty") {
    tabs.push("followers");
  }
  tabs.push("bond", "skills");
  return tabs;
}

function renderIntroTalk(parent, shopId) {
  const quest = getActiveIntroQuest();
  const isQuestNpc = quest.npcId === shopId;
  const speaker = NPC_DEFS[shopId]?.name || shopId;
  const scene = document.createElement("section");
  scene.className = "dialogue-scene";

  const speakerCard = document.createElement("aside");
  speakerCard.className = "dialogue-speaker";
  const portrait = document.createElement("div");
  portrait.className = "dialogue-portrait";
  portrait.textContent = speaker.slice(0, 1).toUpperCase();
  const speakerName = document.createElement("strong");
  speakerName.textContent = speaker;
  const role = document.createElement("span");
  role.textContent = NPC_DIALOGUE[shopId]?.role || getShopDef(shopId)?.title || "Town guide";
  const mood = document.createElement("em");
  mood.textContent = isQuestNpc ? "tutorial lead" : "waiting";
  speakerCard.append(portrait, speakerName, role, mood);

  const conversation = document.createElement("div");
  conversation.className = "dialogue-conversation";
  const line = document.createElement("p");
  line.className = "dialogue-line";
  if (isQuestNpc) {
    line.textContent = isIntroQuestReady(quest)
      ? quest.readyText || quest.dialogue || quest.briefing || getIntroObjectiveText()
      : quest.briefing || quest.dialogue || getIntroObjectiveText();
  } else {
    const activeNpc = NPC_DEFS[quest.npcId]?.name || "your current guide";
    line.textContent = `${speaker}: Keep your focus on the tutorial. ${activeNpc} is handling your next step.`;
  }
  conversation.append(line);

  const note = document.createElement("p");
  note.className = "dialogue-note";
  note.textContent = getIntroObjectiveText();
  conversation.append(note);

  const choices = document.createElement("div");
  choices.className = "dialogue-choices";
  if (isQuestNpc) {
    const label = quest.practiceBattle
      ? "Start Practice"
      : quest.requirements?.length
        ? isIntroQuestReady(quest) ? "Claim Reward" : "Turn In 1 Matt"
        : quest.actionLabel || "Continue";
    choices.append(makeShopButton(label, "intro-advance", quest.id, !canUseIntroQuestAction(quest)));
  }
  choices.append(makeShopButton("Mission", "shop-tab", "mission"), makeShopButton("Trade", "shop-tab", "buy"));
  if (shopId === "ty") {
    choices.append(makeShopButton("Followers", "shop-tab", "followers"));
  }
  conversation.append(choices);
  scene.append(speakerCard, conversation);
  parent.append(scene);
}

function renderBrockMissionTalk(parent) {
  const status = getBrockMissionStatus();
  const scene = document.createElement("section");
  scene.className = "dialogue-scene";

  const speakerCard = document.createElement("aside");
  speakerCard.className = "dialogue-speaker";
  const portrait = document.createElement("div");
  portrait.className = "dialogue-portrait";
  portrait.textContent = "B";
  const speakerName = document.createElement("strong");
  speakerName.textContent = "Brick";
  const role = document.createElement("span");
  role.textContent = "Inn keeper";
  const mood = document.createElement("em");
  mood.textContent = status === BROCK_MISSION_STATUS.TALK_TO_BRICK ? "worried" : "waiting for news";
  speakerCard.append(portrait, speakerName, role, mood);

  const conversation = document.createElement("div");
  conversation.className = "dialogue-conversation";
  const line = document.createElement("p");
  line.className = "dialogue-line";
  line.textContent = status === BROCK_MISSION_STATUS.TALK_TO_BRICK
    ? BROCK_MISSION_BRICK_DIALOGUE
    : "Brick: Last I saw Brock, he was in the Grassland. Start there and look for anything that does not belong.";
  conversation.append(line);

  const note = document.createElement("p");
  note.className = "dialogue-note";
  note.textContent = getBrockMissionObjectiveText();
  conversation.append(note);

  const choices = document.createElement("div");
  choices.className = "dialogue-choices";
  if (status === BROCK_MISSION_STATUS.TALK_TO_BRICK) {
    choices.append(makeShopButton("Start Looking", "brock-mission-advance"));
  }
  choices.append(makeShopButton("Mission", "shop-tab", "mission"), makeShopButton("Trade", "shop-tab", "buy"));
  conversation.append(choices);
  scene.append(speakerCard, conversation);
  parent.append(scene);
}

function getPostBrockStoryTalk(shopId) {
  if (!isBrockRescued()) {
    return null;
  }

  if (shopId === "brock" && !state.storyFlags?.brockWizardTalkSeen) {
    return {
      id: "brock-wizard-talk",
      speaker: "Brock",
      role: "Recovering traveler",
      mood: "shaken, grateful, and trying to remember",
      line:
        "Brock: I heard the wizard before I saw him. He kept saying I was bait, like he wanted you to pull me free and follow the trail. Those demented Matts were not wild. They were pushed past wild.",
      note: "Brock is safe at the inn, but he remembers the wizard setting a trap.",
      actionLabel: "Let Brock Rest",
    };
  }

  if (shopId === "brick" && !state.storyFlags?.brickWizardTalkSeen) {
    return {
      id: "brick-wizard-talk",
      speaker: "Brick",
      role: "Innkeeper",
      mood: "protective and angry under the calm",
      line:
        "Brick: Brock made it back because of you. Now tell me about this wizard. If he used my brother as bait, he is not just hiding in that cave. He is testing who comes running.",
      note: "Brick wants every detail about the wizard's ambush.",
      actionLabel: "Describe the Wizard",
    };
  }

  if (shopId === "brick" && hasDementedEssenseForBrick()) {
    return {
      id: "brick-essense-talk",
      speaker: "Brick",
      role: "Innkeeper",
      mood: "grim and studying the strange residue",
      line:
        "Brick: That came out of one of those demented Matts? It is not blood, and it is not normal Matt magic. Scott knows arena seals better than anyone. Take the DementedEssense to him and ask what was broken.",
      note: "Objective: Talk to Scott at the arena about DementedEssense.",
      actionLabel: "Take It to Scott",
    };
  }

  if (
    shopId === "brick" &&
    state.storyFlags?.dementedEssenseShownToBrick &&
    !state.storyFlags?.dementedEssenseDiscussedWithScott
  ) {
    return {
      id: "",
      speaker: "Brick",
      role: "Innkeeper",
      mood: "waiting for Scott's answer",
      line:
        "Brick: Scott needs to see that DementedEssense. If the wizard is twisting Matts through failed seals, the arena captain will know what signs to look for.",
      note: "Objective: Talk to Scott at the arena about DementedEssense.",
      actionLabel: "",
    };
  }

  if (
    shopId === "scott" &&
    state.storyFlags?.dementedEssenseShownToBrick &&
    !state.storyFlags?.dementedEssenseDiscussedWithScott
  ) {
    return {
      id: "scott-essense-talk",
      speaker: "Scott",
      role: "Arena captain",
      mood: "grim, alert, and no longer casual",
      line:
        "Scott: Brick sent you with this? The arena seals are built to teach restraint. This DementedEssense feels like restraint got ripped out and burned. If the wizard can do that on purpose, every Matt road needs watching.",
      note: "Scott starts studying the DementedEssense for a trail back to the wizard.",
      actionLabel: "Let Scott Study It",
    };
  }

  return null;
}

function renderPostBrockStoryTalk(parent, shopId) {
  const talk = getPostBrockStoryTalk(shopId);
  if (!talk) {
    return false;
  }

  const scene = document.createElement("section");
  scene.className = "dialogue-scene";

  const speakerCard = document.createElement("aside");
  speakerCard.className = "dialogue-speaker";
  const portrait = document.createElement("div");
  portrait.className = "dialogue-portrait";
  portrait.textContent = talk.speaker.slice(0, 1).toUpperCase();
  const speakerName = document.createElement("strong");
  speakerName.textContent = talk.speaker;
  const role = document.createElement("span");
  role.textContent = talk.role;
  const mood = document.createElement("em");
  mood.textContent = talk.mood;
  speakerCard.append(portrait, speakerName, role, mood);

  const conversation = document.createElement("div");
  conversation.className = "dialogue-conversation";
  const line = document.createElement("p");
  line.className = "dialogue-line";
  line.textContent = talk.line;
  conversation.append(line);

  if (talk.note) {
    const note = document.createElement("p");
    note.className = "dialogue-note";
    note.textContent = talk.note;
    conversation.append(note);
  }

  const choices = document.createElement("div");
  choices.className = "dialogue-choices";
  if (talk.id && talk.actionLabel) {
    choices.append(makeShopButton(talk.actionLabel, "post-brock-story", talk.id));
  }
  choices.append(makeShopButton("Mission", "shop-tab", "mission"), makeShopButton("Trade", "shop-tab", "buy"));
  conversation.append(choices);
  scene.append(speakerCard, conversation);
  parent.append(scene);
  return true;
}

function handlePostBrockStoryAction(actionId) {
  const nextFlags = { ...state.storyFlags };
  let message = "";

  if (actionId === "brock-wizard-talk") {
    nextFlags.brockWizardTalkSeen = true;
    message = "Brock remembers the wizard setting a trap.";
  } else if (actionId === "brick-wizard-talk") {
    nextFlags.brickWizardTalkSeen = true;
    message = "Brick is watching for the wizard's next move.";
  } else if (actionId === "brick-essense-talk") {
    nextFlags.dementedEssenseShownToBrick = true;
    message = "Brick sends you to Scott with the DementedEssense.";
  } else if (actionId === "scott-essense-talk") {
    nextFlags.dementedEssenseDiscussedWithScott = true;
    message = "Scott starts studying the DementedEssense.";
  } else {
    return false;
  }

  state.storyFlags = normalizeStoryFlags(nextFlags);
  saveEconomy();
  updateCaughtHud(countCaughtMatts(), true);
  setGameMessage(message, 6200);
  renderShop();
  return true;
}

function renderTalk(parent, shopId) {
  if (isIntroChainActive() && INTRO_NPC_IDS.includes(shopId)) {
    renderIntroTalk(parent, shopId);
    return;
  }

  if (renderPostBrockStoryTalk(parent, shopId)) {
    return;
  }

  if (shopId === "brick" && isBrockMissionActive() && getBrockMissionStatus() !== BROCK_MISSION_STATUS.RESCUED) {
    renderBrockMissionTalk(parent);
    return;
  }

  const dialogue = NPC_DIALOGUE[shopId];
  if (!dialogue) {
    appendEmptyShopMessage(parent, "They do not have much to say right now.");
    return;
  }

  const topic = dialogue.topics.find((candidate) => candidate.id === state.activeDialogueTopic);
  const speaker = dialogue.speaker || shopId;
  const title = dialogue.role || getShopDef(shopId)?.title || "Traveler";
  const activeFollower = state.capturedParty.find((matt) => matt.follower);
  const scene = document.createElement("section");
  scene.className = "dialogue-scene";

  const speakerCard = document.createElement("aside");
  speakerCard.className = "dialogue-speaker";
  const portrait = document.createElement("div");
  portrait.className = "dialogue-portrait";
  portrait.textContent = speaker.slice(0, 1).toUpperCase();
  const speakerName = document.createElement("strong");
  speakerName.textContent = speaker;
  const role = document.createElement("span");
  role.textContent = title;
  const mood = document.createElement("em");
  mood.textContent = dialogue.mood || "listening";
  speakerCard.append(portrait, speakerName, role, mood);

  if (Array.isArray(dialogue.services) && dialogue.services.length > 0) {
    const services = document.createElement("ul");
    dialogue.services.slice(0, 4).forEach((service) => {
      const item = document.createElement("li");
      item.textContent = service;
      services.append(item);
    });
    speakerCard.append(services);
  }

  const conversation = document.createElement("div");
  conversation.className = "dialogue-conversation";
  const line = document.createElement("p");
  line.className = "dialogue-line";
  line.textContent = topic ? topic.text : dialogue.intro;
  conversation.append(line);

  if (shopId === "ty") {
    const note = document.createElement("p");
    note.className = "dialogue-note";
    note.textContent = activeFollower
      ? `${getCapturedMattDisplayName(activeFollower)} is currently your active follower.`
      : "Ty can tame one captured Matt into an active follower.";
    conversation.append(note);
  }

  const choices = document.createElement("div");
  choices.className = "dialogue-choices";

  if (topic) {
    choices.append(
      makeShopButton("Back", "talk-back"),
      makeShopButton("Mission", "shop-tab", "mission"),
      makeShopButton("Trade", "shop-tab", "buy"),
    );
    if (shopId === "ty") {
      choices.append(makeShopButton("Followers", "shop-tab", "followers"));
    }
    conversation.append(choices);
    scene.append(speakerCard, conversation);
    parent.append(scene);
    return;
  }

  dialogue.topics.forEach((candidate) => {
    choices.append(makeShopButton(candidate.label, "talk-topic", candidate.id));
  });
  choices.append(makeShopButton("Mission", "shop-tab", "mission"), makeShopButton("Trade", "shop-tab", "buy"));
  if (shopId === "ty") {
    choices.append(makeShopButton("Followers", "shop-tab", "followers"));
  }
  conversation.append(choices);
  scene.append(speakerCard, conversation);
  parent.append(scene);
}

function getMissionDef(shopId = state.activeShopId) {
  return NPC_MISSIONS[shopId] || null;
}

function isMissionComplete(mission) {
  return Boolean(mission && state.missions[mission.id]?.completed);
}

function getCapturedMattTypeCount(type) {
  return state.capturedParty.filter((matt) => matt.type === type).length;
}

function getCapturedMattTotal(type) {
  const tracked = Math.max(0, Math.floor(Number(state.captureStats?.byType?.[type]) || 0));
  return Math.max(tracked, getCapturedMattTypeCount(type));
}

function recordCapturedMattType(type) {
  if (!type || !MATT_CONFIGS[type]) {
    return;
  }

  if (!state.captureStats || typeof state.captureStats !== "object") {
    state.captureStats = { byType: {} };
  }
  if (!state.captureStats.byType || typeof state.captureStats.byType !== "object") {
    state.captureStats.byType = {};
  }

  state.captureStats.byType[type] = getCapturedMattTotal(type) + 1;
}

function canCompleteMission(mission) {
  return Boolean(
    mission &&
      !isMissionComplete(mission) &&
      mission.requirements.every((requirement) => getCapturedMattTypeCount(requirement.type) >= requirement.count),
  );
}

function getMissionRewardText(mission) {
  const rewards = [];
  if (mission.rewardCoins) {
    rewards.push(`${mission.rewardCoins} coins`);
  }
  mission.rewardItems.forEach((reward) => {
    const item = ITEM_DEFS[reward.id];
    if (item) {
      rewards.push(`${item.name}${reward.count > 1 ? ` x${reward.count}` : ""}`);
    }
  });
  return rewards.join(", ");
}

function renderIntroMission(parent, shopId) {
  const quest = getActiveIntroQuest();
  const isQuestNpc = quest.npcId === shopId;
  appendShopTextCard(parent, quest.title, getIntroObjectiveText());

  if (!isQuestNpc) {
    const activeNpc = NPC_DEFS[quest.npcId]?.name || "your current guide";
    appendShopTextCard(parent, "Current Guide", `Talk to ${activeNpc} to continue the tutorial chain.`);
    return;
  }

  if (quest.requirements?.length) {
    quest.requirements.forEach((requirement) => {
      const held = getIntroHeldRequirementCount(requirement);
      appendShopTextCard(
        parent,
        MATT_LABELS[requirement.type] || "Matt",
        `${getIntroRequirementCount(requirement, quest)} / ${requirement.count} turned in. You have ${held}.`,
      );
    });
  } else if (quest.readyWhen) {
    appendShopTextCard(
      parent,
      isIntroQuestReady(quest) ? "Lesson Complete" : "Lesson Step",
      isIntroQuestReady(quest)
        ? quest.readyText || "Ty is ready for the next bonding step."
        : quest.briefing || quest.objective || "Complete the bonding step.",
    );
  } else {
    appendShopTextCard(parent, "Next Step", quest.dialogue || quest.briefing || "Talk to continue.");
  }

  appendShopTextCard(
    parent,
    "Reward",
    getIntroQuestRewardText(quest),
    makeShopButton(
      quest.practiceBattle
        ? "Start Practice"
        : quest.requirements?.length
          ? isIntroQuestReady(quest) ? "Claim Reward" : "Turn In 1 Matt"
          : quest.actionLabel || "Continue",
      "intro-advance",
      quest.id,
      !canUseIntroQuestAction(quest),
    ),
  );
}

function renderBrockMission(parent, shopId) {
  const status = getBrockMissionStatus();
  const objective = getBrockMissionObjectiveText();
  appendShopTextCard(parent, BROCK_MISSION_TITLE, objective);

  if (status === BROCK_MISSION_STATUS.RESCUED) {
    if (!isPostBrockStoryActive()) {
      appendShopTextCard(parent, "Brock Is Safe", "Brock is back at Brick's Inn. The cave feels quieter, but the wizard's trail is still open.");
      return;
    }

    const guideId = getPostBrockStoryGuideId();
    const guideName = NPC_DEFS[guideId]?.name || "your current guide";
    if (shopId !== guideId) {
      appendShopTextCard(parent, "Current Guide", `Talk to ${guideName} to continue the wizard aftermath.`);
      return;
    }

    appendShopTextCard(
      parent,
      "Next Conversation",
      objective || `${guideName} has more to say about the wizard.`,
      makeShopButton("Talk", "shop-tab", "talk"),
    );
    return;
  }

  if (shopId !== "brick") {
    appendShopTextCard(parent, "Current Guide", "Brick is waiting at the inn with the details about Brock.");
    return;
  }

  appendShopTextCard(
    parent,
    "Brick's Lead",
    status === BROCK_MISSION_STATUS.TALK_TO_BRICK
      ? "Brick needs to tell Ivan what happened before the search starts."
      : "Brock was last seen in the Grassland. Start there and look for any sign of where he went.",
    status === BROCK_MISSION_STATUS.TALK_TO_BRICK
      ? makeShopButton("Hear Brick Out", "brock-mission-advance")
      : null,
  );
}

function renderMission(parent, shopId) {
  if (isIntroChainActive() && INTRO_NPC_IDS.includes(shopId)) {
    renderIntroMission(parent, shopId);
    return;
  }

  if (isBrockMissionActive()) {
    renderBrockMission(parent, shopId);
    return;
  }

  const mission = getMissionDef(shopId);
  if (!mission) {
    appendEmptyShopMessage(parent, "No work available right now.");
    return;
  }

  if (isMissionComplete(mission)) {
    appendShopTextCard(parent, mission.title, mission.completeText);
    return;
  }

  appendShopTextCard(parent, mission.title, mission.briefing);
  mission.requirements.forEach((requirement) => {
    const count = getCapturedMattTypeCount(requirement.type);
    appendShopTextCard(
      parent,
      MATT_LABELS[requirement.type] || "Matt",
      `${Math.min(count, requirement.count)} / ${requirement.count} captured in your party.`,
    );
  });
  appendShopTextCard(
    parent,
    "Reward",
    getMissionRewardText(mission),
    makeShopButton("Turn In", "complete-mission", mission.id, !canCompleteMission(mission)),
  );
}

function completeMission(missionId) {
  const mission = Object.values(NPC_MISSIONS).find((candidate) => candidate.id === missionId);
  if (!canCompleteMission(mission)) {
    renderActiveOverlay("You still need the requested Matts in your party.");
    return;
  }

  state.missions[mission.id] = { completed: true };
  state.coins += mission.rewardCoins || 0;
  mission.rewardItems.forEach((reward) => addItem(reward.id, reward.count || 1));
  saveEconomy();
  updateEconomyHud();
  updatePlayerStatusHud();
  awardPlayerXp(90 + (mission.rewardCoins || 0), "mission work");
  renderActiveOverlay(mission.completeText);
}

function getFriendshipRank(friendship = 0) {
  const value = clamp(Math.floor(Number(friendship) || 0), 0, 100);
  let rank = FRIENDSHIP_RANKS[0];

  FRIENDSHIP_RANKS.forEach((candidate) => {
    if (value >= candidate.min) {
      rank = candidate;
    }
  });

  return rank;
}

function getFriendshipGain(amount) {
  const base = Math.max(0, Math.floor(Number(amount) || 0));
  if (base <= 0) {
    return 0;
  }

  return base + (hasItem("bond_ribbon") ? Math.max(1, Math.ceil(base * 0.25)) : 0);
}

function getFriendshipLine(matt) {
  const friendship = clamp(Math.floor(Number(matt?.friendship) || 0), 0, 100);
  const rank = getFriendshipRank(friendship);
  return `${rank.name} bond ${friendship}/100`;
}

function getFriendshipBonusLine(matt) {
  const rank = getFriendshipRank(matt?.friendship || 0);
  return `Bond bonuses: +${rank.hp} HP, +${rank.power} power, +${rank.energy} energy, ${Math.round(rank.crit * 100)}% crit.`;
}

function syncCapturedMattProgress(updated) {
  state.dogmatts.forEach((candidate) => {
    if (candidate.partyId === updated.partyId) {
      candidate.level = updated.level;
      candidate.xp = updated.xp;
      candidate.friendship = updated.friendship;
    }
  });

  if (state.arena.playerMattId === updated.partyId) {
    state.arena.playerMatt = updated;
  }
}

function applyCapturedMattProgress(partyId, { friendship = 0, xp = 0 } = {}) {
  const partyIndex = state.capturedParty.findIndex((matt) => matt.partyId === partyId);
  if (partyIndex === -1) {
    return null;
  }

  const matt = state.capturedParty[partyIndex];
  const mentorRank = getSkillRank("matt_mentor");
  const friendshipGain = getFriendshipGain(friendship + (friendship > 0 ? mentorRank : 0));
  const xpGain = Math.max(0, Math.floor((Number(xp) || 0) * (1 + mentorRank * 0.15)));
  let level = getMattLevel(matt);
  let nextXp = Math.max(0, Math.floor(Number(matt.xp) || 0)) + xpGain;
  let leveled = false;

  while (level < 50 && nextXp >= getMattXpToNext(level)) {
    nextXp -= getMattXpToNext(level);
    level += 1;
    leveled = true;
  }

  const updated = {
    ...matt,
    level,
    xp: nextXp,
    friendship: clamp((matt.friendship || 0) + friendshipGain, 0, 100),
  };

  state.capturedParty[partyIndex] = updated;
  syncCapturedMattProgress(updated);
  saveCapturedParty();
  updateCaughtHud(countCaughtMatts());
  return { matt: updated, friendshipGain, xpGain, leveled };
}

function getCareDay() {
  return getClockParts().day;
}

function canCareForMatt(matt) {
  return Boolean(matt && state.friendshipCare[matt.partyId] !== getCareDay() && (matt.friendship || 0) < 100);
}

function careForMatt(partyId) {
  const matt = state.capturedParty.find((candidate) => candidate.partyId === partyId);
  if (!canCareForMatt(matt)) {
    renderActiveOverlay("That Matt has already had focused care today.");
    return;
  }

  state.friendshipCare[partyId] = getCareDay();
  const result = applyCapturedMattProgress(partyId, { friendship: 4 });
  markIntroLessonFlag("bond_care_used");
  saveEconomy();
  renderActiveOverlay(`${getArenaMattName(result?.matt || matt)} settles in. Friendship +${result?.friendshipGain || 0}.`);
}

function useBondItemOnMatt(partyId, itemId, friendship, xp = 0) {
  const item = ITEM_DEFS[itemId];
  if (!item || getItemCount(itemId) <= 0) {
    renderActiveOverlay("You do not have that bond item.");
    return;
  }

  const result = applyCapturedMattProgress(partyId, { friendship, xp });
  if (!result) {
    renderActiveOverlay("That Matt is no longer in your party.");
    return;
  }

  removeItem(itemId);
  markIntroLessonFlag("bond_care_used");
  saveEconomy();
  updateEconomyHud();
  renderActiveOverlay(
    `${getArenaMattName(result.matt)} enjoyed ${item.name}. Friendship +${result.friendshipGain}${xp ? `, XP +${result.xpGain}` : ""}.`,
  );
}

function sparWithMatt(partyId) {
  const staminaCost = 25;
  if (state.player.stamina < staminaCost) {
    renderActiveOverlay("Ivan is too tired to spar right now.");
    return;
  }

  const result = applyCapturedMattProgress(partyId, { friendship: 3, xp: 16 });
  if (!result) {
    renderActiveOverlay("That Matt is no longer in your party.");
    return;
  }

  state.player.stamina = Math.max(0, state.player.stamina - staminaCost);
  markIntroLessonFlag("bond_care_used");
  const ivanProgress = awardPlayerXp(12 + getPlayerLevel(), "sparring");
  updatePlayerStatusHud();
  renderActiveOverlay(
    result.leveled
      ? `${getArenaMattName(result.matt)} sparred hard and reached Lv ${result.matt.level}. Ivan XP +${ivanProgress.gained}.`
      : `${getArenaMattName(result.matt)} sparred with Ivan. XP +${result.xpGain}, friendship +${result.friendshipGain}. Ivan XP +${ivanProgress.gained}.`,
  );
}

function promptForMattName(matt, message = "Name this Matt") {
  const currentName = getCapturedMattDisplayName(matt);
  const entered = window.prompt(`${message}:`, currentName);
  if (entered === null) {
    return "";
  }

  return sanitizeMattName(entered) || currentName;
}

function tameCapturedMatt(partyId) {
  if (state.activeShopId !== "ty") {
    renderActiveOverlay("Ty needs to do the taming work.");
    return;
  }

  const matt = state.capturedParty.find((candidate) => candidate.partyId === partyId);
  if (!matt) {
    renderActiveOverlay("That Matt is no longer in your party.");
    return;
  }

  const name = promptForMattName(matt, "Ty asks what name this Matt should learn");
  if (!name) {
    renderActiveOverlay("Ty waits until you have a name ready.");
    return;
  }

  const updated = updateCapturedMattById(partyId, (current) => ({
    name,
    tamed: true,
    follower: true,
    friendship: Math.max(current.friendship || 0, 24),
    xp: current.xp || 0,
  }));

  renderActiveOverlay(
    updated
      ? `Ty tamed ${getCapturedMattDisplayName(updated)}. They are now your active follower.`
      : "Ty could not find that Matt.",
  );
}

function renameCapturedMatt(partyId) {
  const matt = state.capturedParty.find((candidate) => candidate.partyId === partyId);
  if (!matt) {
    renderActiveOverlay("That Matt is no longer in your party.");
    return;
  }

  if (!matt.tamed && state.activeShopId !== "ty") {
    renderActiveOverlay("Take this Matt to Ty before renaming it.");
    return;
  }

  const name = promptForMattName(matt, "Choose a new Matt name");
  if (!name) {
    return;
  }

  const updated = updateCapturedMattById(partyId, () => ({ name }));
  renderActiveOverlay(updated ? `${getCapturedMattDisplayName(updated)} knows their name now.` : "That Matt is no longer in your party.");
}

function setActiveFollower(partyId) {
  const matt = state.capturedParty.find((candidate) => candidate.partyId === partyId);
  if (!matt) {
    renderActiveOverlay("That Matt is no longer in your party.");
    return;
  }

  if (!matt.tamed) {
    renderActiveOverlay("Ty needs to tame that Matt before it can fight as a follower.");
    return;
  }

  state.capturedParty = state.capturedParty.map((candidate) => ({
    ...candidate,
    follower: candidate.partyId === partyId,
  }));
  state.capturedParty.forEach(syncCapturedMattRuntime);
  saveCapturedParty();
  resetFollowerCommandState("follow");
  updateFollowerCommandUi(true);
  renderActiveOverlay(`${getCapturedMattDisplayName(matt)} is now your active follower.`);
}

function clearActiveFollower(partyId = "") {
  const matt = state.capturedParty.find((candidate) => candidate.partyId === partyId);
  state.capturedParty = state.capturedParty.map((candidate) => ({ ...candidate, follower: false }));
  state.capturedParty.forEach(syncCapturedMattRuntime);
  saveCapturedParty();
  resetFollowerCommandState("follow");
  updateFollowerCommandUi(true);
  renderActiveOverlay(
    matt
      ? `${getCapturedMattDisplayName(matt)} is resting from follower duty.`
      : "Your follower is resting.",
  );
}

function resetFollowerCommandState(mode = "follow") {
  state.followerCommand.mode = FOLLOWER_COMMAND_LABELS[mode] ? mode : "follow";
  state.followerCommand.targeting = false;
  state.followerCommand.targetId = "";
  state.followerCommand.stayPoint = null;
}

function getActiveFollowerPartyMember() {
  return state.capturedParty.find((matt) => matt.tamed && matt.follower) || null;
}

function getActiveFollowerRuntime() {
  return (
    state.dogmatts.find(
      (matt) => matt.caught && matt.tamed && matt.follower && !matt.arenaBattler && !matt.arenaOpponent,
    ) || null
  );
}

function hasActiveFollower() {
  return Boolean(getActiveFollowerPartyMember() || getActiveFollowerRuntime());
}

function getActiveFollowerDisplayName() {
  return getCapturedMattDisplayName(getActiveFollowerRuntime() || getActiveFollowerPartyMember() || { name: "Follower" });
}

function updateFollowerCommandUi(force = false) {
  if (!followerCommandBar) {
    return;
  }

  const follower = getActiveFollowerRuntime();
  const partyFollower = getActiveFollowerPartyMember();
  const active = follower || partyFollower;

  if (!active) {
    resetFollowerCommandState("follow");
    followerCommandBar.hidden = true;
    followerCommandUiKey = "";
    return;
  }

  const mode = FOLLOWER_COMMAND_LABELS[state.followerCommand.mode] ? state.followerCommand.mode : "follow";
  const label = state.followerCommand.targeting ? "Choose target" : FOLLOWER_COMMAND_LABELS[mode];
  const key = [
    active.partyId || active.id,
    mode,
    state.followerCommand.targeting ? "targeting" : "",
    state.followerCommand.targetId,
    state.dev.enabled ? "dev" : "",
    state.arena.active ? "arena" : "",
  ].join(":");

  if (!force && followerCommandUiKey === key) {
    return;
  }

  followerCommandUiKey = key;
  followerCommandBar.hidden = false;

  if (followerCommandStatus) {
    followerCommandStatus.textContent = `${getCapturedMattDisplayName(active)} - ${label}`;
  }

  for (const button of followerCommandButtons) {
    const command = button.dataset.followerCommand;
    button.classList.toggle("active", !state.followerCommand.targeting && command === mode);
    button.classList.toggle("targeting", command === "attack" && state.followerCommand.targeting);
    button.disabled = false;
  }
}

function setFollowerCommandMode(mode, options = {}) {
  if (!FOLLOWER_COMMAND_LABELS[mode]) {
    return false;
  }

  const follower = getActiveFollowerRuntime();
  if (!hasActiveFollower()) {
    resetFollowerCommandState("follow");
    updateFollowerCommandUi(true);
    if (!options.silent) {
      setGameMessage("Ty needs to tame a Matt before you can command a follower.");
    }
    return false;
  }

  state.followerCommand.mode = mode;
  state.followerCommand.targeting = false;
  state.followerCommand.targetId = "";

  if (mode === "follow") {
    state.followerCommand.stayPoint = null;
    if (follower) {
      follower.returnBoostTimer = 2.5;
      const target = getFollowTarget(0, getMattConfig(follower.type));
      if (Math.hypot(target.x - follower.x, target.y - follower.y) > 2200) {
        follower.x = clamp(target.x + randomBetween(-60, 60), 0, getMapWidth());
        follower.y = clamp(target.y + randomBetween(-60, 60), 0, getMapHeight());
      }
    }
    if (!options.silent) {
      setGameMessage(`${getActiveFollowerDisplayName()} returns to Ivan.`);
    }
  } else if (mode === "stay") {
    state.followerCommand.stayPoint = follower
      ? { x: follower.x, y: follower.y }
      : { x: state.player.x, y: state.player.y };
    if (!options.silent) {
      setGameMessage(`${getActiveFollowerDisplayName()} holds this spot.`);
    }
  } else if (mode === "guard") {
    state.followerCommand.stayPoint = null;
    if (!options.silent) {
      setGameMessage(`${getActiveFollowerDisplayName()} will guard nearby targets.`);
    }
  } else if (mode === "attack") {
    state.followerCommand.stayPoint = null;
    state.followerCommand.targeting = true;
    if (!options.silent) {
      setGameMessage("Tap or click a wild Matt for your follower to attack.");
    }
  }

  updateFollowerCommandUi(true);
  return true;
}

function isFollowerCommandTargetCandidate(target) {
  if (!target || target.caught || target.arenaBattler || target.arenaOpponent || target.introPlaying) {
    return false;
  }

  return !target.boss || target.awakened || target.hitCount > 0 || target.attackTimer > 0;
}

function getFollowerCommandTargetAt(point) {
  let bestTarget = null;
  let bestDistance = Infinity;

  for (const target of state.dogmatts) {
    if (!isFollowerCommandTargetCandidate(target)) {
      continue;
    }

    const config = getMattConfig(target.type);
    const scale = Number(target.scale) || 1;
    const radius = Math.max(FOLLOWER_COMMAND_TARGET_RADIUS, config.width * scale * 0.65);
    const distance = Math.hypot(target.x - point.x, target.y - point.y);

    if (distance <= radius && distance < bestDistance) {
      bestDistance = distance;
      bestTarget = target;
    }
  }

  return bestTarget;
}

function handleFollowerTargetPointer(event) {
  if (!state.followerCommand.targeting) {
    return false;
  }

  event.preventDefault();
  const target = getFollowerCommandTargetAt(screenToWorld(event.clientX, event.clientY));

  if (!target) {
    setGameMessage("No wild Matt targeted. Tap directly on one, or press Q to call your follower back.");
    updateFollowerCommandUi(true);
    return true;
  }

  state.followerCommand.mode = "attack";
  state.followerCommand.targeting = false;
  state.followerCommand.targetId = target.id;
  state.followerCommand.stayPoint = null;
  setGameMessage(`${getActiveFollowerDisplayName()} attacks ${target.name || MATT_LABELS[target.type] || "that Matt"}.`);
  updateFollowerCommandUi(true);
  return true;
}

function renderFollowerActions(parent, matt, makeButton) {
  const actions = document.createElement("div");
  actions.className = "follower-actions";

  if (!matt.tamed) {
    actions.append(makeButton("Tame", "tame-matt", matt.partyId, state.activeShopId !== "ty"));
  } else {
    actions.append(
      makeButton("Follow", "set-follower", matt.partyId, matt.follower),
      makeButton("Rest", "clear-follower", matt.partyId, !matt.follower),
      makeButton("Rename", "rename-matt", matt.partyId),
    );
  }

  parent.append(actions);
}

function renderFollowers(parent) {
  if (state.activeShopId !== "ty") {
    appendEmptyShopMessage(parent, "Only Ty can manage Matt followers.");
    return;
  }

  if (state.capturedParty.length === 0) {
    appendEmptyShopMessage(parent, "Capture a Matt, then bring it to Ty to tame it as a follower.");
    return;
  }

  appendShopTextCard(
    parent,
    "Follower Stable",
    "Ty can tame one active follower at a time. Tamed followers help in overworld fights, earn bond and XP, and can be renamed here.",
  );

  state.capturedParty.forEach((matt) => {
    const row = document.createElement("article");
    row.className = `shop-item follower-item${matt.follower ? " active" : ""}`;

    const info = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = getCapturedMattDisplayName(matt);
    const detail = document.createElement("span");
    detail.textContent = `${getFollowerStatusLine(matt)} | ${getWorldLabel(matt.sourceWorld || DEFAULT_WORLD_ID)}`;
    info.append(title, detail);

    const status = document.createElement("em");
    status.textContent = matt.follower ? "Active" : matt.tamed ? "Tamed" : "Wild";

    row.append(info, status);
    renderFollowerActions(row, matt, makeShopButton);
    parent.append(row);
  });
}

function renderBond(parent) {
  if (state.capturedParty.length === 0) {
    appendEmptyShopMessage(parent, "Capture or adopt a Matt before working on friendship.");
    return;
  }

  appendShopTextCard(
    parent,
    "Friendship",
    "Care is once per Matt each day. Treats, brushes, mints, walking together, and arena battles deepen bonds.",
  );

  state.capturedParty.forEach((matt) => {
    const row = document.createElement("article");
    row.className = "shop-item bond-item";

    const info = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = getCapturedMattDisplayName(matt);
    const detail = document.createElement("span");
    detail.textContent = `Lv ${getMattLevel(matt)} | XP ${matt.xp || 0}/${getMattXpToNext(getMattLevel(matt))} | ${getFollowerStatusLine(matt)}. ${getFriendshipBonusLine(matt)}`;
    info.append(title, detail);

    row.append(
      info,
      makeShopButton("Care", "bond-care", matt.partyId, !canCareForMatt(matt)),
      makeShopButton("Treat", "bond-treat", matt.partyId, getItemCount("matt_treat") <= 0 || (matt.friendship || 0) >= 100),
      makeShopButton("Brush", "bond-brush", matt.partyId, getItemCount("camp_brush") <= 0 || (matt.friendship || 0) >= 100),
      makeShopButton("Mint", "bond-mint", matt.partyId, getItemCount("focus_mint") <= 0 || (matt.friendship || 0) >= 100),
      makeShopButton("Spar", "bond-spar", matt.partyId, state.player.stamina < 25),
    );
    parent.append(row);
  });
}

function renderSkills(parent) {
  const level = getPlayerLevel();
  const xp = Math.max(0, Math.floor(Number(state.playerProgress?.xp) || 0));
  const next = level >= MAX_PLAYER_LEVEL ? "max level" : `${xp}/${getPlayerXpToNext(level)} XP`;
  appendShopTextCard(
    parent,
    `Ivan Lv ${level}`,
    `${next}. Skill points: ${getPlayerSkillPoints()}. Skills spent: ${getSpentSkillPoints()}.`,
    makeShopButton("Reset", "reset-skills", null, getSpentSkillPoints() <= 0),
  );

  let currentBranch = "";
  Object.values(PLAYER_SKILLS).forEach((skill) => {
    if (skill.branch !== currentBranch) {
      currentBranch = skill.branch;
      const heading = document.createElement("h3");
      heading.textContent = currentBranch;
      parent.append(heading);
    }

    const rank = getSkillRank(skill.id);
    const check = canUnlockSkill(skill.id);
    const row = document.createElement("article");
    row.className = "shop-item skill-item";

    const info = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = `${skill.branch}: ${skill.name}`;
    const detail = document.createElement("span");
    const requirement = getSkillRequirementText(skill);
    detail.textContent = `Rank ${rank}/${skill.maxRank}. ${skill.description} ${skill.perRank}${requirement ? `. Requires ${requirement}` : ""}.`;
    info.append(title, detail);

    const owned = document.createElement("em");
    owned.textContent = rank >= skill.maxRank ? "Max" : `${rank}/${skill.maxRank}`;
    const label = rank >= skill.maxRank ? "Max" : getPlayerSkillPoints() <= 0 ? "No SP" : check.ok ? "Learn" : "Locked";
    row.append(info, owned, makeShopButton(label, "learn-skill", skill.id, !check.ok));
    parent.append(row);
  });
}

function appendCapturedMattRows(parent) {
  if (!getShopDef()?.buysMatts) {
    return;
  }

  const heading = document.createElement("h3");
  heading.textContent = "Captured Matts";
  parent.append(heading);

  if (state.capturedParty.length === 0) {
    appendEmptyShopMessage(parent, "No captured Matts to sell.");
    return;
  }

  state.capturedParty.forEach((matt) => {
    const value = getMattSellValue(matt.type, matt);
    const row = document.createElement("article");
    row.className = "shop-item";

    const info = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = getCapturedMattDisplayName(matt);
    const detail = document.createElement("span");
    detail.textContent = `Lv ${getMattLevel(matt)} | ${getFollowerStatusLine(matt)}. ${getWorldLabel(matt.sourceWorld || DEFAULT_WORLD_ID)} capture. Ty pays ${value} coins.`;
    info.append(title, detail);

    const owned = document.createElement("em");
    owned.textContent = "Matt";
    const action = makeShopButton("Sell", "sell-matt", matt.partyId);

    row.append(info, owned, action);
    parent.append(row);
  });
}

function renderShop(message = "") {
  const shop = getShopDef();
  updateEconomyHud();

  if (shopTitle) {
    shopTitle.textContent = shop ? shop.title : "Inventory";
  }

  if (shopTabs) {
    shopTabs.innerHTML = "";
    const tabs = getShopTabs(shop);
    tabs.forEach((tab) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = getShopTabLabel(tab);
      button.classList.toggle("active", state.shopTab === tab);
      button.dataset.tab = tab;
      shopTabs.append(button);
    });
  }

  if (!shopList) {
    return;
  }

  shopList.innerHTML = "";

  if (state.shopTab === "talk" && shop) {
    renderTalk(shopList, state.activeShopId);
  } else if (state.shopTab === "mission" && shop) {
    renderMission(shopList, state.activeShopId);
  } else if (state.shopTab === "buy" && shop) {
    shop.buy.forEach((itemId) => appendItemRow(shopList, itemId, "buy"));
  } else if (state.shopTab === "sell" && shop) {
    const entries = getInventoryEntries();
    if (entries.length === 0 && !shop.buysMatts) {
      appendEmptyShopMessage(shopList, "Nothing to sell yet.");
    } else {
      entries.forEach(([itemId]) => appendItemRow(shopList, itemId, "sell"));
      appendCapturedMattRows(shopList);
    }
  } else if (state.shopTab === "followers") {
    renderFollowers(shopList);
  } else if (state.shopTab === "bond") {
    renderBond(shopList);
  } else if (state.shopTab === "skills") {
    renderSkills(shopList);
  } else {
    const entries = getInventoryEntries();
    if (entries.length === 0) {
      appendEmptyShopMessage(shopList, "Your pack is empty.");
    } else {
      entries.forEach(([itemId]) => appendItemRow(shopList, itemId, "inventory"));
    }
  }

  if (shopMessage) {
    shopMessage.textContent = message || "";
  }
}

function isPauseMenuOpen() {
  return Boolean(pauseMenu && !pauseMenu.hidden);
}

function renderActiveOverlay(message = "") {
  if (isPauseMenuOpen()) {
    renderPauseMenu(message);
  } else {
    renderShop(message);
  }
}

function openStoryOverlay(titleText, detailText, message = "Close when ready.") {
  if (!shopOverlay || !shopList) {
    setGameMessage(detailText, 7200);
    return;
  }

  closePauseMenu();
  keys.clear();
  touchInput.sprint = false;
  resetTouchJoystick();
  state.activeShopId = "";
  state.shopTab = "story";
  state.activeDialogueTopic = "";
  document.body.classList.add("shop-open");
  shopOverlay.hidden = false;
  updateEconomyHud();

  if (shopTitle) {
    shopTitle.textContent = titleText;
  }

  if (shopTabs) {
    shopTabs.innerHTML = "";
  }

  shopList.innerHTML = "";
  appendShopTextCard(shopList, titleText, detailText);

  if (shopMessage) {
    shopMessage.textContent = message;
  }
}

function makeMenuButton(label, action, id, disabled = false) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.dataset.action = action;
  if (id !== undefined && id !== null) {
    button.dataset.id = id;
  }
  button.disabled = disabled;
  return button;
}

function appendMenuEmpty(parent, message) {
  const empty = document.createElement("p");
  empty.className = "menu-empty";
  empty.textContent = message;
  parent.append(empty);
}

function appendMenuCard(parent, titleText, detailText = "", className = "") {
  const card = document.createElement("article");
  card.className = `menu-card ${className}`.trim();
  const title = document.createElement("strong");
  title.textContent = titleText;
  card.append(title);
  if (detailText) {
    const detail = document.createElement("span");
    detail.textContent = detailText;
    card.append(detail);
  }
  parent.append(card);
  return card;
}

function appendMenuStat(parent, label, value, detail = "", ratio = null) {
  const stat = document.createElement("article");
  stat.className = "menu-stat";
  const title = document.createElement("strong");
  title.textContent = label;
  const amount = document.createElement("em");
  amount.textContent = value;
  stat.append(title, amount);

  if (Number.isFinite(ratio)) {
    const meter = document.createElement("i");
    meter.className = "menu-meter";
    const fill = document.createElement("b");
    fill.style.width = `${clamp(ratio * 100, 0, 100)}%`;
    meter.append(fill);
    stat.append(meter);
  }

  if (detail) {
    const small = document.createElement("span");
    small.textContent = detail;
    stat.append(small);
  }

  parent.append(stat);
}

function appendMenuRow(parent, titleText, detailText, metaText = "", action = null, className = "") {
  const row = document.createElement("article");
  row.className = `menu-row ${className}`.trim();
  const info = document.createElement("div");
  const title = document.createElement("strong");
  title.textContent = titleText;
  const detail = document.createElement("span");
  detail.textContent = detailText;
  info.append(title, detail);
  const meta = document.createElement("em");
  meta.textContent = metaText;
  row.append(info, meta);
  if (action) {
    row.append(action);
  }
  parent.append(row);
  return row;
}

function createMenuGrid(parent) {
  const grid = document.createElement("div");
  grid.className = "menu-grid";
  parent.append(grid);
  return grid;
}

function appendMenuPillRow(parent, pills = []) {
  const row = document.createElement("div");
  row.className = "menu-pill-row";
  pills.filter(Boolean).forEach((pill) => row.append(pill));
  parent.append(row);
  return row;
}

function getPartyOverview() {
  const party = state.capturedParty;
  const follower = party.find((matt) => matt?.follower);
  const strongest = party.reduce((best, matt) => (!best || getMattLevel(matt) > getMattLevel(best) ? matt : best), null);
  const closest = party.reduce(
    (best, matt) => (!best || (matt?.friendship || 0) > (best?.friendship || 0) ? matt : best),
    null,
  );

  return {
    total: party.length,
    tamed: party.filter((matt) => matt?.tamed).length,
    follower,
    strongest,
    closest,
  };
}

function renderPauseCharacter(parent) {
  const grid = createMenuGrid(parent);
  const maxHealth = getPlayerMaxHealth();
  const maxStamina = getPlayerMaxStamina();
  const level = getPlayerLevel();
  const xp = Math.max(0, Math.floor(Number(state.playerProgress?.xp) || 0));
  const nextXp = level >= MAX_PLAYER_LEVEL ? 1 : getPlayerXpToNext(level);
  const profileSummary = getActiveProfileSummary();

  const stats = appendMenuCard(grid, "Ivan", `${getWorldLabel(state.currentWorld)} | ${timeLabel?.textContent || ""}`, "full compact");
  const statGrid = document.createElement("div");
  statGrid.className = "menu-stat-grid";
  appendMenuStat(statGrid, "Level", String(level), `${xp}/${nextXp} XP`, level >= MAX_PLAYER_LEVEL ? 1 : xp / nextXp);
  appendMenuStat(statGrid, "Health", `${Math.ceil(state.player.health)}/${maxHealth}`, "", state.player.health / maxHealth);
  appendMenuStat(statGrid, "Stamina", `${Math.ceil(state.player.stamina)}/${maxStamina}`, "", state.player.stamina / maxStamina);
  appendMenuStat(statGrid, "Coins", String(state.coins), `${getPlayerSkillPoints()} skill point${getPlayerSkillPoints() === 1 ? "" : "s"}`);
  stats.append(statGrid);

  const profile = appendMenuCard(
    grid,
    "Profile",
    `${state.profileName || "Ivan"} | ${formatProfileTime(profileSummary.lastPlayed)}`,
    "wide profile-card",
  );
  const profileGrid = document.createElement("div");
  profileGrid.className = "menu-stat-grid";
  appendMenuStat(profileGrid, "World", getWorldLabel(profileSummary.currentWorld), profileSummary.arenaRank);
  appendMenuStat(profileGrid, "Party", `${profileSummary.partyCount}/${MATT_PARTY_LIMIT}`, `${profileSummary.tamedCount} tamed`);
  appendMenuStat(profileGrid, "Captured", String(profileSummary.captureTotal), profileSummary.captureTypeSummary || "Start hunting");
  appendMenuStat(profileGrid, "Pack", String(profileSummary.inventoryStacks), `${profileSummary.inventoryTypes} item types`);
  profile.append(profileGrid);
  appendMenuPillRow(profile, [
    makeMenuPill(`Arena ${profileSummary.arenaRecord}`, "capture"),
    makeMenuPill(profileSummary.followerName ? `Follower ${profileSummary.followerName}` : "No active follower", "bond"),
    profileSummary.strongestMattName
      ? makeMenuPill(`Top Matt ${profileSummary.strongestMattName} Lv ${profileSummary.strongestMattLevel}`, "gear")
      : makeMenuPill("Build your party", "effect"),
  ]);

  appendMenuCard(
    grid,
    "Hunter",
    `Walk ${Math.round(getPlayerWalkSpeed())} | Sprint ${Math.round(getPlayerSprintSpeed())} | Whip reach ${Math.round(getWhipAttackRange())}`,
    "wide",
  );
  appendMenuCard(
    grid,
    "Protection",
    `${Math.round(getArmorDamageReduction() * 100)}% damage reduction | Max party ${MATT_PARTY_LIMIT}`,
    "compact",
  );

  const party = appendMenuCard(grid, "Party", "", "full");
  if (state.capturedParty.length === 0) {
    appendMenuEmpty(party, "No Matts traveling with Ivan.");
  } else {
    const table = document.createElement("div");
    table.className = "menu-table";
    state.capturedParty.forEach((matt) => {
      const mattLevel = getMattLevel(matt);
      appendMenuRow(
        table,
        getCapturedMattDisplayName(matt),
        `${MATT_LABELS[matt.type] || "Matt"} | ${getFollowerStatusLine(matt)} | Origin: ${getWorldLabel(matt.sourceWorld || DEFAULT_WORLD_ID)}`,
        `Lv ${mattLevel}`,
      );
    });
    party.append(table);
  }
}

function makeMenuPill(text, className = "") {
  const pill = document.createElement("span");
  pill.className = `menu-pill ${className}`.trim();
  pill.textContent = text;
  return pill;
}

function getInventoryActionButton(itemId, count = getItemCount(itemId)) {
  const item = ITEM_DEFS[itemId];
  if (!item) {
    return null;
  }
  if (item.bondOnly) {
    return makeMenuButton("Party", "pause-tab", "party", count <= 0 || state.capturedParty.length === 0);
  }
  if (item.use) {
    return makeMenuButton("Use", "use-item", itemId, count <= 0);
  }
  if (item.unique || item.armor) {
    return makeMenuButton("Passive", "", itemId, true);
  }
  return null;
}

function appendInventoryItem(parent, itemId, count) {
  const item = ITEM_DEFS[itemId];
  if (!item) {
    return;
  }

  const category = getInventoryCategory(itemId);
  const card = document.createElement("article");
  card.className = `menu-inventory-item ${category}`;

  const header = document.createElement("header");
  const titleWrap = document.createElement("div");
  const title = document.createElement("strong");
  title.textContent = item.name;
  const description = document.createElement("p");
  description.textContent = item.description;
  titleWrap.append(title, description);
  header.append(titleWrap, makeMenuPill(getItemRoleLabel(itemId), category));

  const meta = document.createElement("div");
  meta.className = "menu-item-meta";
  meta.append(makeMenuPill(`x${count}`), makeMenuPill(`${getItemSellValue(itemId) * count}c value`));
  const effectText = getItemEffectText(itemId);
  if (effectText) {
    meta.append(makeMenuPill(effectText, "effect"));
  }

  const action = getInventoryActionButton(itemId, count);
  card.append(header, meta);
  if (action) {
    const actions = document.createElement("div");
    actions.className = "menu-actions";
    actions.append(action);
    card.append(actions);
  }
  parent.append(card);
}

function renderPauseInventory(parent) {
  const grid = createMenuGrid(parent);
  const summary = getInventorySummary();
  let activeCategory = INVENTORY_CATEGORIES.some((category) => category.id === state.inventoryCategory)
    ? state.inventoryCategory
    : "all";
  if (activeCategory !== "all" && (summary.categoryCounts[activeCategory] || 0) <= 0) {
    activeCategory = "all";
  }
  state.inventoryCategory = activeCategory;

  const overview = appendMenuCard(grid, "Pack Overview", `${summary.itemTypes} item type${summary.itemTypes === 1 ? "" : "s"} | ${summary.totalStacks} total carried`, "full compact");
  const statGrid = document.createElement("div");
  statGrid.className = "menu-stat-grid inventory-stats";
  appendMenuStat(statGrid, "Recovery", String(summary.consumables), "usable supplies");
  appendMenuStat(statGrid, "Gear", String(summary.gear), "passives owned");
  appendMenuStat(statGrid, "Bond", String(summary.bond), "care items");
  appendMenuStat(statGrid, "Value", `${summary.sellValue}c`, `Merchant Sense ${getSkillRank("merchant_sense")}/3`);
  overview.append(statGrid);

  const shelves = appendMenuCard(grid, "Shelves", getInventoryCategoryDef(activeCategory).description, "full compact");
  const filters = document.createElement("div");
  filters.className = "menu-filter-row";
  INVENTORY_CATEGORIES.forEach((category) => {
    const count = category.id === "all" ? summary.itemTypes : summary.categoryCounts[category.id] || 0;
    if (category.id !== "all" && count <= 0) {
      return;
    }
    const button = makeMenuButton(`${category.label} ${count}`, "inventory-category", category.id);
    button.classList.toggle("active", category.id === activeCategory);
    filters.append(button);
  });
  shelves.append(filters);

  const entries = getInventoryEntries(activeCategory);
  const list = document.createElement("div");
  list.className = "menu-inventory-list";
  if (entries.length === 0) {
    appendMenuEmpty(list, activeCategory === "all" ? "Your pack is empty." : `No ${getInventoryCategoryLabel(activeCategory).toLowerCase()} items right now.`);
    grid.append(list);
    return;
  }

  entries.forEach(([itemId, count]) => appendInventoryItem(list, itemId, count));
  grid.append(list);
}

function getSkillBranches() {
  const branchIds = Object.keys(SKILL_BRANCH_DEFS);
  const extraBranches = [...new Set(Object.values(PLAYER_SKILLS)
    .map((skill) => skill.branch)
    .filter((branch) => !branchIds.includes(branch)))];

  return [...branchIds, ...extraBranches].map((branch) => ({
    branch,
    def: SKILL_BRANCH_DEFS[branch] || { label: branch, description: "" },
    skills: Object.values(PLAYER_SKILLS)
      .filter((skill) => skill.branch === branch)
      .sort((a, b) => (a.tier || 0) - (b.tier || 0) || a.name.localeCompare(b.name)),
  })).filter((group) => group.skills.length > 0);
}

function getBranchSkillTotals(skills) {
  return skills.reduce(
    (totals, skill) => {
      totals.spent += getSkillRank(skill.id);
      totals.max += skill.maxRank;
      return totals;
    },
    { spent: 0, max: 0 },
  );
}

function appendSkillNode(parent, skill) {
  const rank = getSkillRank(skill.id);
  const check = canUnlockSkill(skill.id);
  const mastered = rank >= skill.maxRank;
  const requirement = getSkillRequirementText(skill);
  const node = document.createElement("article");
  node.className = [
    "menu-skill-node",
    mastered ? "mastered" : "",
    check.ok ? "available" : "",
    rank > 0 && !mastered ? "learned" : "",
    !check.ok && rank <= 0 ? "locked" : "",
  ].filter(Boolean).join(" ");

  const header = document.createElement("header");
  const title = document.createElement("strong");
  title.textContent = skill.name;
  header.append(title, makeMenuPill(`Rank ${rank}/${skill.maxRank}`, mastered ? "mastered" : ""));

  const detail = document.createElement("p");
  detail.textContent = skill.description;

  const footer = document.createElement("footer");
  const effect = document.createElement("span");
  effect.textContent = skill.perRank;
  footer.append(effect);
  if (requirement && !mastered) {
    const requires = document.createElement("span");
    requires.textContent = `Requires ${requirement}`;
    footer.append(requires);
  }

  const label = mastered ? "Max" : getPlayerSkillPoints() <= 0 ? "No SP" : check.ok ? "Learn" : "Locked";
  const action = makeMenuButton(label, "learn-skill", skill.id, !check.ok);
  node.append(header, detail, footer, action);
  parent.append(node);
}

function renderPauseSkills(parent) {
  const grid = createMenuGrid(parent);
  const level = getPlayerLevel();
  const xp = Math.max(0, Math.floor(Number(state.playerProgress?.xp) || 0));
  const next = level >= MAX_PLAYER_LEVEL ? "MAX" : `${xp}/${getPlayerXpToNext(level)} XP`;
  const summary = appendMenuCard(
    grid,
    `Ivan Lv ${level}`,
    `${next}. Skill points: ${getPlayerSkillPoints()}. Skills spent: ${getSpentSkillPoints()}.`,
    "full compact",
  );
  const statGrid = document.createElement("div");
  statGrid.className = "menu-stat-grid skill-stats";
  appendMenuStat(statGrid, "SP", String(getPlayerSkillPoints()), "available");
  appendMenuStat(statGrid, "Spent", String(getSpentSkillPoints()), "learned ranks");
  appendMenuStat(statGrid, "Branches", String(getSkillBranches().length), "paths open");
  appendMenuStat(statGrid, "Recovery", `${Math.round((getItemRecoveryMultiplier("health_potion", "health") - 1) * 100)}%`, "item bonus");
  summary.append(statGrid);
  const actions = document.createElement("div");
  actions.className = "menu-actions";
  actions.append(makeMenuButton("Reset", "reset-skills", null, getSpentSkillPoints() <= 0));
  summary.append(actions);

  getSkillBranches().forEach(({ branch, def, skills }) => {
    const totals = getBranchSkillTotals(skills);
    const section = document.createElement("section");
    section.className = "menu-skill-branch";
    const header = document.createElement("header");
    const title = document.createElement("h3");
    title.textContent = def.label || branch;
    const detail = document.createElement("span");
    detail.textContent = `${def.description} ${totals.spent}/${totals.max} ranks learned.`;
    header.append(title, detail);
    const branchMeter = document.createElement("i");
    branchMeter.className = "menu-meter branch-meter";
    const fill = document.createElement("b");
    fill.style.width = `${totals.max > 0 ? clamp((totals.spent / totals.max) * 100, 0, 100) : 0}%`;
    branchMeter.append(fill);
    const track = document.createElement("div");
    track.className = "menu-skill-track";
    skills.forEach((skill) => appendSkillNode(track, skill));
    section.append(header, branchMeter, track);
    grid.append(section);
  });
}

function drawPauseMap(canvas) {
  const map = getWorldMapConfig();
  const width = canvas.width;
  const height = canvas.height;
  const mapRatio = map.width / Math.max(1, map.height);
  const canvasRatio = width / Math.max(1, height);
  const drawWidth = canvasRatio > mapRatio ? height * mapRatio : width;
  const drawHeight = canvasRatio > mapRatio ? height : width / mapRatio;
  const offsetX = (width - drawWidth) / 2;
  const offsetY = (height - drawHeight) / 2;
  const scaleX = drawWidth / map.width;
  const scaleY = drawHeight / map.height;
  const mapCtx = canvas.getContext("2d");

  mapCtx.clearRect(0, 0, width, height);
  mapCtx.fillStyle = map.fill || "#18201d";
  mapCtx.fillRect(0, 0, width, height);

  const image = getWorldMapImage();
  if (image) {
    mapCtx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
  }

  mapCtx.fillStyle = WORLD_TINTS[state.currentWorld] || "rgba(255, 255, 255, 0.04)";
  mapCtx.fillRect(offsetX, offsetY, drawWidth, drawHeight);

  const drawDot = (x, y, radius, fill, stroke = "rgba(8, 13, 12, 0.78)") => {
    mapCtx.beginPath();
    mapCtx.arc(offsetX + x * scaleX, offsetY + y * scaleY, radius, 0, Math.PI * 2);
    mapCtx.fillStyle = fill;
    mapCtx.strokeStyle = stroke;
    mapCtx.lineWidth = 2;
    mapCtx.fill();
    mapCtx.stroke();
  };

  getWorld().nodes.forEach((node) => drawDot(node.x, node.y, isWaystoneNode(node) ? 6 : 5, node.locked ? "#ff7a5c" : isWaystoneNode(node) ? "#ffd66f" : "#8bd3ff"));
  state.npcs.forEach((npc) => drawDot(npc.x, npc.y, 4, "#a0d8ff"));
  const capturedBrockPoint = getCapturedBrockPosition();
  if (capturedBrockPoint) {
    drawDot(capturedBrockPoint.x, capturedBrockPoint.y, 5, "#ffb36d");
  }
  const rescuedBrock = getRescuedBrockActor();
  if (rescuedBrock) {
    drawDot(rescuedBrock.x, rescuedBrock.y, 5, "#7cd8ff");
  }
  state.dogmatts.forEach((matt) => drawDot(matt.x, matt.y, matt.boss ? 7 : 4, matt.caught ? "#79f1b9" : "#9cec6e"));
  drawDot(state.player.x, state.player.y, 7, "#fff0a8", "rgba(8, 13, 12, 0.92)");
}

function renderPauseMap(parent) {
  const grid = createMenuGrid(parent);
  const mapCard = appendMenuCard(grid, getWorldLabel(state.currentWorld), `${Math.round(getMapWidth())} x ${Math.round(getMapHeight())}`, "menu-map-wrap");
  const canvasEl = document.createElement("canvas");
  canvasEl.className = "menu-map-canvas";
  canvasEl.width = 900;
  canvasEl.height = 560;
  mapCard.append(canvasEl);
  const legend = document.createElement("div");
  legend.className = "menu-map-legend";
  [
    ["#fff0a8", "Ivan"],
    ["#9cec6e", "Matts"],
    ["#8bd3ff", "Nodes"],
    ["#a0d8ff", "NPCs"],
  ].forEach(([color, label]) => {
    const item = document.createElement("span");
    const dot = document.createElement("i");
    dot.style.background = color;
    item.append(dot, document.createTextNode(label));
    legend.append(item);
  });
  mapCard.append(legend);

  appendMenuCard(
    grid,
    "World",
    `${state.npcs.length} NPC${state.npcs.length === 1 ? "" : "s"} | ${state.dogmatts.filter((matt) => !matt.caught).length} wild Matt${state.dogmatts.filter((matt) => !matt.caught).length === 1 ? "" : "s"}`,
    "compact",
  );
  appendMenuCard(grid, "Position", `${Math.round(state.player.x)}, ${Math.round(state.player.y)}`, "compact");
  appendMenuCard(
    grid,
    "Connections",
    getWorld().nodes.filter((node) => !isWaystoneNode(node)).map((node) => getWorldLabel(node.target)).join(", ") || "None",
    "compact",
  );
  appendMenuCard(grid, "Waystones", String(countWaystones()), "compact");
  window.requestAnimationFrame(() => drawPauseMap(canvasEl));
}

function renderPauseJournal(parent) {
  const grid = createMenuGrid(parent);
  appendMenuCard(
    grid,
    state.profileName || "Ivan",
    `${timeLabel?.textContent || ""} | ${getWorldLabel(state.currentWorld)} | Arena ${getArenaRankTitle()}`,
    "full",
  );

  Object.values(NPC_DIALOGUE).forEach((dialogue) => {
    const card = appendMenuCard(grid, dialogue.speaker || dialogue.title || "Journal", `${dialogue.role || "Town voice"} | ${dialogue.intro}`, "wide");
    if (Array.isArray(dialogue.services) && dialogue.services.length > 0) {
      const serviceLine = document.createElement("p");
      serviceLine.textContent = `Services: ${dialogue.services.join(", ")}`;
      card.append(serviceLine);
    }
    dialogue.topics.slice(0, 3).forEach((topic) => {
      const line = document.createElement("p");
      line.textContent = `${topic.label}: ${topic.text}`;
      card.append(line);
    });
  });
}

function getMissionProgressText(mission) {
  return mission.requirements
    .map((requirement) => {
      const count = Math.min(getCapturedMattTypeCount(requirement.type), requirement.count);
      return `${MATT_LABELS[requirement.type] || "Matt"} ${count}/${requirement.count}`;
    })
    .join(", ");
}

function renderPauseMissions(parent) {
  const grid = createMenuGrid(parent);
  if (isIntroChainActive()) {
    const quest = getActiveIntroQuest();
    appendMenuRow(
      grid,
      quest.title,
      `${getIntroObjectiveText()} ${quest.requirements?.length ? quest.requirements.map((requirement) => `${MATT_LABELS[requirement.type] || "Matt"} turned in ${getIntroRequirementCount(requirement, quest)}/${requirement.count}, held ${getIntroHeldRequirementCount(requirement)}`).join(", ") : ""}`,
      isIntroQuestReady(quest) ? "Ready" : "Active",
      null,
      "full",
    );
    return;
  }

  if (isBrockMissionActive()) {
    appendMenuRow(
      grid,
      BROCK_MISSION_TITLE,
      getBrockMissionObjectiveText(),
      "Active",
      null,
      "full",
    );
    return;
  }

  Object.values(NPC_MISSIONS).forEach((mission) => {
    const completed = isMissionComplete(mission);
    const ready = canCompleteMission(mission);
    const status = completed ? "Complete" : ready ? "Ready" : "Active";
    const action = !completed && ready ? makeMenuButton("Turn In", "complete-mission", mission.id) : null;
    appendMenuRow(
      grid,
      mission.title,
      `${mission.briefing} Reward: ${getMissionRewardText(mission)}. ${getMissionProgressText(mission)}.`,
      status,
      action,
      "full",
    );
  });
}

function renderPauseParty(parent) {
  const grid = createMenuGrid(parent);
  if (state.capturedParty.length === 0) {
    appendMenuCard(grid, "Party", "No Matts traveling with Ivan.", "full");
    return;
  }

  const overview = getPartyOverview();
  const overviewCard = appendMenuCard(
    grid,
    "Party Overview",
    `${overview.total}/${MATT_PARTY_LIMIT} slots filled | ${overview.tamed} ready followers`,
    "full compact profile-card",
  );
  const overviewStats = document.createElement("div");
  overviewStats.className = "menu-stat-grid";
  appendMenuStat(overviewStats, "Active", overview.follower ? getCapturedMattDisplayName(overview.follower) : "None", "field follower");
  appendMenuStat(
    overviewStats,
    "Strongest",
    overview.strongest ? `Lv ${getMattLevel(overview.strongest)}` : "None",
    overview.strongest ? getCapturedMattDisplayName(overview.strongest) : "",
  );
  appendMenuStat(
    overviewStats,
    "Closest",
    overview.closest ? `${overview.closest.friendship || 0}/100` : "0/100",
    overview.closest ? getCapturedMattDisplayName(overview.closest) : "bond progress",
    overview.closest ? (overview.closest.friendship || 0) / 100 : 0,
  );
  appendMenuStat(overviewStats, "Captures", String(getCaptureTotal(state.captureStats, state.capturedParty)), getCaptureTypeSummary(state.captureStats, state.capturedParty) || "keep hunting");
  overviewCard.append(overviewStats);

  state.capturedParty.forEach((matt) => {
    const mattLevel = getMattLevel(matt);
    const mattXp = Math.max(0, Math.floor(Number(matt.xp) || 0));
    const nextXp = getMattXpToNext(mattLevel);
    const friendship = clamp(Math.floor(Number(matt.friendship) || 0), 0, 100);
    const rank = getFriendshipRank(friendship);
    const card = appendMenuCard(
      grid,
      getCapturedMattDisplayName(matt),
      `${MATT_LABELS[matt.type] || "Matt"} | ${getWorldLabel(matt.sourceWorld || DEFAULT_WORLD_ID)} | ${getFollowerStatusLine(matt)}`,
      "full menu-party-card",
    );
    appendMenuPillRow(card, [
      makeMenuPill(matt.tamed ? "Tamed" : "Untamed", matt.tamed ? "bond" : "capture"),
      makeMenuPill(matt.follower ? "Active follower" : "Resting", matt.follower ? "effect" : ""),
      makeMenuPill(`Origin ${getWorldLabel(matt.sourceWorld || DEFAULT_WORLD_ID)}`, "gear"),
      makeMenuPill(`Difficulty ${Math.round((Number(matt.captureDifficulty) || 1) * 10) / 10}`, "capture"),
    ]);
    const statGrid = document.createElement("div");
    statGrid.className = "menu-stat-grid";
    appendMenuStat(statGrid, "Level", String(mattLevel), `${mattXp}/${nextXp} XP`, mattXp / nextXp);
    appendMenuStat(statGrid, "Bond", rank.name, `${friendship}/100`, friendship / 100);
    appendMenuStat(statGrid, "Battle HP", String(getArenaMattMaxHp(matt)), getFriendshipBonusLine(matt));
    appendMenuStat(statGrid, "Power", `+${getArenaMattPowerBonus(matt)}`, `${Math.round(getArenaMattCritChance(matt) * 100)}% crit`);
    card.append(statGrid);
    const actions = document.createElement("div");
    actions.className = "menu-actions";
    actions.append(
      makeMenuButton("Care", "bond-care", matt.partyId, !canCareForMatt(matt)),
      makeMenuButton("Treat", "bond-treat", matt.partyId, getItemCount("matt_treat") <= 0 || (matt.friendship || 0) >= 100),
      makeMenuButton("Brush", "bond-brush", matt.partyId, getItemCount("camp_brush") <= 0 || (matt.friendship || 0) >= 100),
      makeMenuButton("Mint", "bond-mint", matt.partyId, getItemCount("focus_mint") <= 0 || (matt.friendship || 0) >= 100),
      makeMenuButton("Spar", "bond-spar", matt.partyId, state.player.stamina < 25),
    );
    if (matt.tamed) {
      actions.append(
        makeMenuButton("Follow", "set-follower", matt.partyId, matt.follower),
        makeMenuButton("Rest", "clear-follower", matt.partyId, !matt.follower),
        makeMenuButton("Rename", "rename-matt", matt.partyId),
      );
    }
    card.append(actions);
  });
}

function renderPauseMenu(message = "") {
  if (!pauseMenuContent) {
    return;
  }

  const tabDef = PAUSE_MENU_TABS.find((tab) => tab.id === state.pauseMenuTab) || PAUSE_MENU_TABS[0];
  state.pauseMenuTab = tabDef.id;
  updateEconomyHud();
  updatePlayerProgressHud();
  updatePlayerStatusHud();

  if (pauseMenuTitle) {
    pauseMenuTitle.textContent = tabDef.title;
  }
  if (pauseMenuSubtitle) {
    pauseMenuSubtitle.textContent = `${getWorldLabel(state.currentWorld)} | Ivan Lv ${getPlayerLevel()} | Coins ${state.coins}`;
  }
  if (pauseMenuTabs) {
    pauseMenuTabs.innerHTML = "";
    PAUSE_MENU_TABS.forEach((tab) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = tab.label;
      button.dataset.tab = tab.id;
      button.classList.toggle("active", tab.id === state.pauseMenuTab);
      pauseMenuTabs.append(button);
    });
  }

  pauseMenuContent.innerHTML = "";

  if (tabDef.id === "character") {
    renderPauseCharacter(pauseMenuContent);
  } else if (tabDef.id === "skills") {
    renderPauseSkills(pauseMenuContent);
  } else if (tabDef.id === "inventory") {
    renderPauseInventory(pauseMenuContent);
  } else if (tabDef.id === "map") {
    renderPauseMap(pauseMenuContent);
  } else if (tabDef.id === "journal") {
    renderPauseJournal(pauseMenuContent);
  } else if (tabDef.id === "missions") {
    renderPauseMissions(pauseMenuContent);
  } else if (tabDef.id === "party") {
    renderPauseParty(pauseMenuContent);
  }

  if (pauseMenuMessage) {
    pauseMenuMessage.textContent = message || "";
  }
}

function openPauseMenu(tab = state.pauseMenuTab || "character", message = "") {
  if (!pauseMenu || (state.arena.active && state.arena.phase !== "idle")) {
    return;
  }

  closeShop();
  state.pauseMenuTab = PAUSE_MENU_TABS.some((candidate) => candidate.id === tab) ? tab : "character";
  pauseMenu.hidden = false;
  document.body.classList.add("pause-open");
  keys.clear();
  touchInput.sprint = false;
  resetTouchJoystick();
  renderPauseMenu(message);
}

function closePauseMenu() {
  if (!pauseMenu) {
    return;
  }

  pauseMenu.hidden = true;
  document.body.classList.remove("pause-open");
  if (pauseMenuMessage) {
    pauseMenuMessage.textContent = "";
  }
}

function createArenaState() {
  return {
    active: false,
    phase: "idle",
    opponent: null,
    playerMattId: "",
    playerMatt: null,
    playerHp: 0,
    opponentHp: 0,
    playerMaxHp: 0,
    opponentMaxHp: 0,
    playerEnergy: 0,
    opponentEnergy: 0,
    playerShield: 0,
    opponentShield: 0,
    playerStatuses: {},
    opponentStatuses: {},
    playerCooldowns: {},
    opponentCooldowns: {},
    turn: 1,
    log: [],
    turnLocked: false,
    introPractice: false,
  };
}

function resetArenaBattle(clearActors = false) {
  state.arena = createArenaState();
  hideArenaBattleUi();

  if (clearActors && state.currentWorld === "town_arena") {
    state.npcs = [];
    state.dogmatts = attachCapturedParty([]);
  }
}

function getMattLevel(matt) {
  return clamp(Math.floor(Number(matt?.level) || 1), 1, 50);
}

function getMattXpToNext(level) {
  return 30 + getMattLevel({ level }) * 18;
}

function getArenaAbilities(type) {
  return ARENA_ABILITIES[type] || ARENA_ABILITIES.dogmatt;
}

function getArenaAbilityId(ability) {
  return ability.id || ability.name.toLowerCase().replace(/[^a-z0-9]+/g, "_");
}

function isArenaAbilityUnlocked(ability, matt, side = "player") {
  if (side === "opponent") {
    return true;
  }

  const level = getMattLevel(matt);
  const friendship = Math.floor(Number(matt?.friendship) || 0);
  return level >= (ability.level || 1) && friendship >= (ability.friendship || 0);
}

function getArenaAbilityLockReason(ability, matt, side = "player") {
  if (isArenaAbilityUnlocked(ability, matt, side)) {
    return "";
  }

  const needs = [];
  if (ability.level && getMattLevel(matt) < ability.level) {
    needs.push(`Lv ${ability.level}`);
  }
  if (ability.friendship && (matt?.friendship || 0) < ability.friendship) {
    needs.push(`${ability.friendship} bond`);
  }
  return `Needs ${needs.join(" and ")}`;
}

function getArenaMattMaxHp(matt, opponentBoost = 0) {
  const level = getMattLevel(matt);
  const rank = getFriendshipRank(matt?.friendship || 0);
  const friendship = Math.floor((Number(matt?.friendship) || 0) / 5);
  return 70 + level * 12 + friendship + rank.hp + opponentBoost;
}

function getArenaMattPowerBonus(matt, opponentBoost = 0) {
  const handbookBonus = hasItem("arena_handbook") ? 4 : 0;
  const instinctBonus = opponentBoost === 0 ? getSkillBonus("arena_instinct", 2) : 0;
  const tacticsBonus = opponentBoost === 0 ? getSkillBonus("pack_leader", 1) + getSkillBonus("follow_through", 1) : 0;
  const rank = getFriendshipRank(matt?.friendship || 0);
  return getMattLevel(matt) * 3 + Math.floor((Number(matt?.friendship) || 0) / 12) + rank.power + opponentBoost + handbookBonus + instinctBonus + tacticsBonus;
}

function getArenaMattCritChance(matt, ability = {}) {
  const rank = getFriendshipRank(matt?.friendship || 0);
  return clamp(rank.crit + (ability.crit || 0), 0.02, 0.45);
}

function getArenaInitialEnergy(matt, opponentBoost = 0, includePlayerItems = true) {
  const rank = getFriendshipRank(matt?.friendship || 0);
  const locketBonus = includePlayerItems && hasItem("memory_locket") ? 6 : 0;
  const instinctBonus = includePlayerItems ? getSkillBonus("arena_instinct", 3) : 0;
  const leaderBonus = includePlayerItems ? getSkillBonus("pack_leader", 1) : 0;
  return clamp(62 + rank.energy + Math.floor(getMattLevel(matt) / 3) + opponentBoost + locketBonus + instinctBonus + leaderBonus, 0, ARENA_MAX_ENERGY);
}

function getArenaRankTitle(points = state.arenaStats.rankPoints) {
  if (points >= 160) {
    return "Crown Circuit";
  }
  if (points >= 90) {
    return "Gold Circuit";
  }
  if (points >= 42) {
    return "Silver Circuit";
  }
  if (points >= 14) {
    return "Bronze Circuit";
  }
  return "Open Circuit";
}

function getArenaRecordText() {
  const stats = normalizeArenaStats(state.arenaStats);
  return `${getArenaRankTitle(stats.rankPoints)} | ${stats.wins}W-${stats.losses}L | streak ${stats.streak} | best ${stats.bestStreak}`;
}

function getCapturedPartyPeakLevel() {
  return state.capturedParty.reduce((highest, matt) => Math.max(highest, getMattLevel(matt)), 1);
}

function chooseArenaOpponent(playerMatt, waitingOpponent = null) {
  const base = waitingOpponent?.id
    ? ARENA_OPPONENTS.find((opponent) => opponent.id === waitingOpponent.id) || waitingOpponent
    : ARENA_OPPONENTS[Math.floor(Math.random() * ARENA_OPPONENTS.length)];
  const streakBoost = Math.min(5, Math.floor((state.arenaStats.streak || 0) / 2));
  const rankBoost = Math.min(6, Math.floor((state.arenaStats.rankPoints || 0) / 35));
  const partyLevelPressure = Math.min(3, Math.max(0, getCapturedPartyPeakLevel() - getMattLevel(playerMatt)));
  const level = clamp(
    getMattLevel(playerMatt) + Math.floor(randomBetween(0, 4)) + streakBoost + rankBoost + partyLevelPressure,
    1,
    50,
  );
  return {
    ...base,
    level,
    friendship: clamp(38 + Math.floor(randomBetween(0, 40)) + streakBoost * 3, 0, 100),
  };
}

function getArenaMattName(matt) {
  return matt?.name || MATT_LABELS[matt?.type] || "Matt";
}

function appendArenaStatus(parent) {
  const arena = state.arena;
  const playerName = getArenaMattName(arena.playerMatt);
  const opponentName = arena.opponent
    ? `${arena.opponent.name}'s ${MATT_LABELS[arena.opponent.mattType] || "Matt"}`
    : "Opponent";

  const status = document.createElement("article");
  status.className = "shop-item";

  const info = document.createElement("div");
  const title = document.createElement("strong");
  title.textContent = `${playerName} vs ${opponentName}`;
  const detail = document.createElement("span");
  detail.textContent = `Your HP ${arena.playerHp}/${arena.playerMaxHp} | Their HP ${arena.opponentHp}/${arena.opponentMaxHp}`;
  info.append(title, detail);

  const round = document.createElement("em");
  round.textContent = arena.phase === "won" ? "Won" : arena.phase === "lost" ? "Lost" : "Battle";
  status.append(info, round);
  parent.append(status);
}

function appendArenaLog(parent) {
  if (!state.arena.log.length) {
    return;
  }

  const log = document.createElement("p");
  log.className = "shop-empty";
  log.textContent = state.arena.log.slice(0, 4).join(" ");
  parent.append(log);
}

function renderArenaSelect(message = "Choose your Matt for the arena.") {
  state.activeShopId = "";
  state.shopTab = "arena";
  state.arena.active = true;
  state.arena.phase = "select";
  document.body.classList.add("arena-active");

  if (shopOverlay) {
    shopOverlay.hidden = false;
  }
  if (shopTitle) {
    shopTitle.textContent = state.arena.opponent
      ? `${state.arena.opponent.name} - ${state.arena.opponent.title}`
      : "Arena Battle";
  }
  if (shopTabs) {
    shopTabs.innerHTML = "";
  }
  if (!shopList) {
    return;
  }

  shopList.innerHTML = "";
  appendShopTextCard(shopList, "Arena Record", getArenaRecordText());

  if (state.capturedParty.length === 0) {
    appendEmptyShopMessage(shopList, "You need at least one captured Matt before you can battle.");
    shopList.append(makeShopButton("Leave Arena", "arena-leave"));
  } else {
    state.capturedParty.forEach((matt) => {
      const row = document.createElement("article");
      row.className = "shop-item";

      const info = document.createElement("div");
      const title = document.createElement("strong");
      title.textContent = getCapturedMattDisplayName(matt);
      const detail = document.createElement("span");
      const unlocked = getArenaAbilities(matt.type).filter((ability) => isArenaAbilityUnlocked(ability, matt)).length;
      detail.textContent = `Lv ${getMattLevel(matt)} | XP ${matt.xp || 0}/${getMattXpToNext(getMattLevel(matt))} | ${getFriendshipLine(matt)} | ${unlocked}/${getArenaAbilities(matt.type).length} abilities. ${getFriendshipBonusLine(matt)}`;
      info.append(title, detail);

      row.append(info, document.createElement("em"), makeShopButton("Battle", "arena-select-matt", matt.partyId));
      shopList.append(row);
    });
  }

  if (shopMessage) {
    shopMessage.textContent = message;
  }
}

function hideArenaBattleUi() {
  if (arenaBattleUi) {
    arenaBattleUi.hidden = true;
  }
  document.body.classList.remove("arena-active");
}

function getArenaBattleCenter() {
  return {
    x: getMapWidth("town_arena") / 2,
    y: getMapHeight("town_arena") / 2,
  };
}

function createArenaMattActor(matt, x, y, side, caught = false) {
  const type = matt.mattType || matt.type;
  const config = getMattConfig(type);
  return {
    id: side === "opponent" ? `arena-${matt.id}-${type}` : `arena-player-${matt.partyId || matt.id}`,
    originalId: matt.originalId || matt.id,
    partyId: matt.partyId || "",
    sourceWorld: matt.sourceWorld || state.currentWorld,
    type,
    x,
    y,
    baseX: x,
    baseY: y,
    width: config.width,
    height: config.height,
    action: "idle",
    frameTimer: 0,
    frameIndex: 0,
    direction: side === "player" ? "right" : "left",
    caught,
    arenaBattler: true,
    arenaSide: side,
    arenaLungeTimer: 0,
    arenaHitTimer: 0,
    level: matt.level || 1,
    xp: matt.xp || 0,
    friendship: matt.friendship || 0,
    hitCount: 0,
    hitCooldown: 0,
    hitReactionTimer: 0,
    wanderAngle: 0,
    wanderTimer: 0,
    pathId: "",
    pathPointIndex: 0,
    pathRoamMode: "offpath",
    pathRoamTarget: null,
    pathPauseTimer: 0,
    idleSpecialTimer: config.specialIdleMin || FIREMATT.specialIdleMin,
    mysticFloatTimer: 0,
    lastSpecialIdleAction: "",
  };
}

function spawnArenaBattleActors(opponent, playerMatt = null) {
  if (state.currentWorld !== "town_arena") {
    return;
  }

  const center = getArenaBattleCenter();
  state.player.x = center.x - 380;
  state.player.y = center.y + 250;
  state.player.direction = "right";
  state.player.facingX = 1;
  state.player.facingY = 0;
  seedPlayerTrail();
  syncCamera();

  const npcX = clamp(center.x + 390, 0, getMapWidth());
  const npcY = clamp(center.y - 120, 0, getMapHeight());
  const opponentMattX = clamp(center.x + 220, 0, getMapWidth());
  const opponentMattY = clamp(center.y + 70, 0, getMapHeight());
  const playerMattX = clamp(center.x - 230, 0, getMapWidth());
  const playerMattY = clamp(center.y + 70, 0, getMapHeight());
  const npc = createNpc(opponent.id, npcX, npcY);
  npc.direction = "left";

  const arenaMatt = createArenaMattActor(opponent, opponentMattX, opponentMattY, "opponent", false);
  const selectedMatt = playerMatt
    ? createArenaMattActor(playerMatt, playerMattX, playerMattY, "player", true)
    : null;
  state.npcs = [npc];
  state.dogmatts = selectedMatt ? [selectedMatt, arenaMatt] : [arenaMatt];
}

function getArenaActor(side) {
  return state.dogmatts.find((matt) => matt.arenaBattler && matt.arenaSide === side);
}

function getArenaPowerColor(type) {
  return {
    dogmatt: "#ffe8a6",
    firematt: "#ff714d",
    grassmatt: "#8df26d",
    watermatt: "#61d7ff",
  }[type] || "#fff0a8";
}

function playArenaAttackEffect(side, ability) {
  const attacker = getArenaActor(side);
  const defender = getArenaActor(side === "player" ? "opponent" : "player");
  if (!attacker || !defender) {
    return;
  }

  attacker.arenaLungeTimer = 0.42;
  defender.arenaHitTimer = 0.34;
  const color = getArenaPowerColor(attacker.type);
  const dx = defender.x - attacker.x;
  const dy = defender.y - attacker.y;
  const distance = Math.hypot(dx, dy) || 1;
  const moveX = dx / distance;
  const moveY = dy / distance;

  for (let i = 0; i < 30; i += 1) {
    const progress = i / 29;
    addParticle({
      type: i % 4 === 0 ? "ring" : "spark",
      x: attacker.x + dx * progress + randomBetween(-26, 26),
      y: attacker.y - 55 + dy * progress + randomBetween(-22, 22),
      vx: moveX * randomBetween(70, 190) + randomBetween(-44, 44),
      vy: moveY * randomBetween(40, 140) + randomBetween(-88, 18),
      gravity: 220,
      life: randomBetween(0.28, 0.72),
      size: ability.heal ? randomBetween(5, 12) : randomBetween(4, 9),
      color,
    });
  }

  spawnHitEffect(defender, 2);
}

function spawnFloatingBattleText(target, text, color = "#fff0a8") {
  if (!target) {
    return;
  }

  addParticle({
    type: "text",
    text,
    x: target.x,
    y: target.y - getMattConfig(target.type).height - 18,
    vx: randomBetween(-8, 8),
    vy: -48,
    gravity: 18,
    life: 0.95,
    size: 18,
    color,
  });
}

function getArenaRecoverAbility() {
  return {
    id: "catch_breath",
    name: "Catch Breath",
    power: 0,
    cost: 0,
    cooldown: 0,
    energyGain: 34,
    shield: 6,
    element: "heart",
    text: "catches its breath",
    detail: "Restore energy and gain a small shield.",
  };
}

function getArenaDisplayedAbilities(matt, side = "player") {
  return [...getArenaAbilities(matt?.type || matt?.mattType), getArenaRecoverAbility()].filter((ability) =>
    side === "opponent" || isArenaAbilityUnlocked(ability, matt, side) || side === "player",
  );
}

function getArenaSideKeys(side) {
  return side === "player"
    ? {
        hp: "playerHp",
        maxHp: "playerMaxHp",
        energy: "playerEnergy",
        shield: "playerShield",
        statuses: "playerStatuses",
        cooldowns: "playerCooldowns",
      }
    : {
        hp: "opponentHp",
        maxHp: "opponentMaxHp",
        energy: "opponentEnergy",
        shield: "opponentShield",
        statuses: "opponentStatuses",
        cooldowns: "opponentCooldowns",
      };
}

function getArenaSideMatt(side) {
  const arena = state.arena;
  if (side === "player") {
    return arena.playerMatt;
  }

  return arena.opponent
    ? {
        type: arena.opponent.mattType,
        level: arena.opponent.level,
        friendship: arena.opponent.friendship,
      }
    : null;
}

function getArenaSideName(side) {
  const arena = state.arena;
  if (side === "player") {
    return getArenaMattName(arena.playerMatt);
  }
  return arena.opponent ? `${arena.opponent.name}'s Matt` : "Opponent";
}

function getArenaStatusAmount(side, statusId) {
  const keys = getArenaSideKeys(side);
  return Math.max(0, Math.floor(Number(state.arena[keys.statuses]?.[statusId]?.amount) || 0));
}

function formatArenaStatuses(side) {
  const statuses = state.arena[getArenaSideKeys(side).statuses] || {};
  const entries = Object.entries(statuses).filter(([, status]) => status.turns > 0);
  if (!entries.length) {
    return "steady";
  }

  return entries
    .map(([id, status]) => `${ARENA_STATUS_LABELS[id] || id} ${status.turns}`)
    .join(", ");
}

function applyArenaStatus(side, status) {
  if (!status?.id) {
    return;
  }

  const keys = getArenaSideKeys(side);
  const statuses = state.arena[keys.statuses];
  const current = statuses[status.id] || { turns: 0, amount: 0 };
  statuses[status.id] = {
    turns: Math.max(current.turns || 0, Math.max(1, status.turns || 1)),
    amount: Math.max(current.amount || 0, Math.max(0, status.amount || 0)),
  };
}

function cleanseArenaStatuses(side) {
  const statuses = state.arena[getArenaSideKeys(side).statuses];
  ["burn", "weaken", "snare", "soaked"].forEach((statusId) => {
    delete statuses[statusId];
  });
}

function getArenaAbilityUseState(side, ability) {
  const arena = state.arena;
  const matt = getArenaSideMatt(side);
  const keys = getArenaSideKeys(side);
  const cooldown = Math.max(0, Math.floor(Number(arena[keys.cooldowns][getArenaAbilityId(ability)]) || 0));
  const cost = Math.max(0, Math.floor(Number(ability.cost) || 0));
  const energy = Math.max(0, Math.floor(Number(arena[keys.energy]) || 0));
  const lockReason = getArenaAbilityLockReason(ability, matt, side);

  if (lockReason) {
    return { disabled: true, reason: lockReason, cost, cooldown, energy };
  }
  if (cooldown > 0) {
    return { disabled: true, reason: `Cooldown ${cooldown}`, cost, cooldown, energy };
  }
  if (energy < cost) {
    return { disabled: true, reason: `Needs ${cost} energy`, cost, cooldown, energy };
  }

  return { disabled: false, reason: "", cost, cooldown, energy };
}

function payArenaAbilityCost(side, ability) {
  const arena = state.arena;
  const keys = getArenaSideKeys(side);
  arena[keys.energy] = clamp((arena[keys.energy] || 0) - (ability.cost || 0), 0, ARENA_MAX_ENERGY);
  if (ability.cooldown) {
    arena[keys.cooldowns][getArenaAbilityId(ability)] = ability.cooldown + 1;
  }
}

function tickArenaCooldowns(side) {
  const cooldowns = state.arena[getArenaSideKeys(side).cooldowns];
  Object.keys(cooldowns).forEach((abilityId) => {
    cooldowns[abilityId] = Math.max(0, cooldowns[abilityId] - 1);
    if (cooldowns[abilityId] <= 0) {
      delete cooldowns[abilityId];
    }
  });
}

function applyArenaSupportEffects(side, ability) {
  const arena = state.arena;
  const keys = getArenaSideKeys(side);
  const matt = getArenaSideMatt(side);
  const rank = getFriendshipRank(matt?.friendship || 0);
  const result = { heal: 0, shield: 0, energy: 0, textParts: [] };

  if (ability.cleanse) {
    cleanseArenaStatuses(side);
    result.textParts.push("cleanses bad effects");
  }

  if (ability.heal) {
    result.heal = Math.round(ability.heal + rank.power);
    arena[keys.hp] = clamp(arena[keys.hp] + result.heal, 0, arena[keys.maxHp]);
    result.textParts.push(`recovers ${result.heal}`);
  }

  if (ability.shield) {
    result.shield = Math.round(ability.shield + Math.floor(rank.hp / 4));
    arena[keys.shield] = clamp((arena[keys.shield] || 0) + result.shield, 0, 80);
    result.textParts.push(`gains ${result.shield} shield`);
  }

  if (ability.energyGain) {
    result.energy = Math.round(ability.energyGain + Math.floor(rank.energy / 2));
    arena[keys.energy] = clamp((arena[keys.energy] || 0) + result.energy, 0, ARENA_MAX_ENERGY);
    result.textParts.push(`restores ${result.energy} energy`);
  }

  (ability.selfStatus || []).forEach((status) => applyArenaStatus(side, status));
  if (ability.selfStatus?.length) {
    result.textParts.push(
      ability.selfStatus.map((status) => ARENA_STATUS_LABELS[status.id] || status.id).join(", "),
    );
  }

  return result;
}

function resolveArenaAbility(side, ability) {
  const arena = state.arena;
  const defenderSide = side === "player" ? "opponent" : "player";
  const attackerKeys = getArenaSideKeys(side);
  const defenderKeys = getArenaSideKeys(defenderSide);
  const attacker = getArenaSideMatt(side);
  const defender = getArenaSideMatt(defenderSide);
  const attackerName = getArenaSideName(side);
  const defenderName = getArenaSideName(defenderSide);
  const support = applyArenaSupportEffects(side, ability);
  const dodgeChance = ability.power > 0 ? clamp(getArenaStatusAmount(defenderSide, "mist") / 100, 0, 0.48) : 0;

  if (dodgeChance > 0 && Math.random() < dodgeChance) {
    return {
      damage: 0,
      blocked: 0,
      heal: support.heal,
      shield: support.shield,
      energy: support.energy,
      dodged: true,
      text: `${defenderName} slips through ${ability.name}. ${support.textParts.join(". ")}`.trim(),
    };
  }

  let damage = 0;
  let crit = false;
  if (ability.power > 0) {
    const variance = Math.floor(randomBetween(0, 10));
    damage = Math.round(ability.power + getArenaMattPowerBonus(attacker, side === "opponent" ? 5 : 0) + variance);
    damage += getArenaStatusAmount(side, "focus");
    damage += getArenaStatusAmount(defenderSide, "soaked");
    damage -= getArenaStatusAmount(side, "weaken");
    damage -= getArenaStatusAmount(defenderSide, "guard");

    if (Math.random() < getArenaMattCritChance(attacker, ability)) {
      crit = true;
      damage = Math.round(damage * 1.45);
    }

    damage = Math.max(4, damage);
  }

  let blocked = 0;
  if (damage > 0) {
    const pierce = Math.min(arena[defenderKeys.shield] || 0, ability.pierce || 0);
    arena[defenderKeys.shield] = Math.max(0, (arena[defenderKeys.shield] || 0) - pierce);
    blocked = Math.min(arena[defenderKeys.shield] || 0, damage);
    arena[defenderKeys.shield] = Math.max(0, (arena[defenderKeys.shield] || 0) - blocked);
    damage -= blocked;
    arena[defenderKeys.hp] = clamp(arena[defenderKeys.hp] - damage, 0, arena[defenderKeys.maxHp]);
  }

  (ability.targetStatus || []).forEach((status) => applyArenaStatus(defenderSide, status));

  let thornDamage = 0;
  if (damage > 0 && getArenaStatusAmount(defenderSide, "thorns") > 0) {
    thornDamage = getArenaStatusAmount(defenderSide, "thorns");
    arena[attackerKeys.hp] = clamp(arena[attackerKeys.hp] - thornDamage, 0, arena[attackerKeys.maxHp]);
  }

  const effectText = [];
  if (crit) {
    effectText.push("critical");
  }
  if (blocked) {
    effectText.push(`${blocked} blocked`);
  }
  if (ability.targetStatus?.length) {
    effectText.push(
      ability.targetStatus.map((status) => ARENA_STATUS_LABELS[status.id] || status.id).join(", "),
    );
  }
  if (thornDamage) {
    effectText.push(`${thornDamage} thorn recoil`);
  }
  effectText.push(...support.textParts);

  return {
    damage,
    blocked,
    heal: support.heal,
    shield: support.shield,
    energy: support.energy,
    crit,
    thornDamage,
    dodged: false,
    text: `${attackerName} uses ${ability.name} and ${ability.text}${ability.power > 0 ? ` for ${damage}` : ""}.${effectText.length ? ` ${effectText.join(". ")}.` : ""}`,
  };
}

function tickArenaStatuses(side) {
  const arena = state.arena;
  const keys = getArenaSideKeys(side);
  const statuses = arena[keys.statuses];
  const name = getArenaSideName(side);
  const logs = [];

  if (statuses.burn?.turns > 0) {
    const damage = statuses.burn.amount || 5;
    arena[keys.hp] = clamp(arena[keys.hp] - damage, 0, arena[keys.maxHp]);
    logs.push(`${name} takes ${damage} burn damage.`);
    spawnFloatingBattleText(getArenaActor(side), `-${damage}`, "#ff7b55");
  }

  if (statuses.regen?.turns > 0) {
    const heal = statuses.regen.amount || 5;
    arena[keys.hp] = clamp(arena[keys.hp] + heal, 0, arena[keys.maxHp]);
    logs.push(`${name} regenerates ${heal}.`);
    spawnFloatingBattleText(getArenaActor(side), `+${heal}`, "#8ff3c5");
  }

  Object.keys(statuses).forEach((statusId) => {
    statuses[statusId].turns -= 1;
    if (statuses[statusId].turns <= 0) {
      delete statuses[statusId];
    }
  });

  return logs;
}

function regenerateArenaEnergy(side) {
  const arena = state.arena;
  const keys = getArenaSideKeys(side);
  const matt = getArenaSideMatt(side);
  const rank = getFriendshipRank(matt?.friendship || 0);
  const snarePenalty = getArenaStatusAmount(side, "snare");
  const amount = Math.max(10, 18 + Math.floor(rank.energy / 2) - snarePenalty);
  arena[keys.energy] = clamp((arena[keys.energy] || 0) + amount, 0, ARENA_MAX_ENERGY);
}

function advanceArenaRound() {
  const arena = state.arena;
  const logs = [...tickArenaStatuses("player"), ...tickArenaStatuses("opponent")];

  logs.reverse().forEach((line) => arena.log.unshift(line));
  if (arena.opponentHp <= 0) {
    finishArenaBattle(true);
    return false;
  }
  if (arena.playerHp <= 0) {
    finishArenaBattle(false);
    return false;
  }

  regenerateArenaEnergy("player");
  regenerateArenaEnergy("opponent");
  tickArenaCooldowns("player");
  tickArenaCooldowns("opponent");
  arena.turn += 1;
  arena.turnLocked = false;
  return true;
}

function chooseOpponentArenaAbility() {
  const arena = state.arena;
  const opponentMatt = getArenaSideMatt("opponent");
  const abilities = getArenaDisplayedAbilities(opponentMatt, "opponent");
  const usable = abilities.filter((ability) => !getArenaAbilityUseState("opponent", ability).disabled);
  const pool = usable.length ? usable : [getArenaRecoverAbility()];
  const hpRatio = arena.opponentHp / Math.max(1, arena.opponentMaxHp);
  const playerShield = arena.playerShield || 0;

  return pool
    .map((ability) => {
      let score = (ability.power || 0) + randomBetween(0, 12);
      if (hpRatio < 0.45 && ability.heal) {
        score += ability.heal * 1.2;
      }
      if (playerShield > 18 && ability.pierce) {
        score += ability.pierce;
      }
      if (arena.opponentEnergy < 18 && ability.energyGain) {
        score += 40;
      }
      if (arena.opponent?.strategy === "control" && ability.targetStatus?.length) {
        score += 12;
      }
      if (arena.opponent?.strategy === "guard" && (ability.shield || ability.selfStatus?.some((status) => status.id === "guard"))) {
        score += 10;
      }
      if (arena.opponent?.strategy === "pressure" && ability.power >= 26) {
        score += 10;
      }
      return { ability, score };
    })
    .sort((a, b) => b.score - a.score)[0].ability;
}

function startIntroPracticeBattle() {
  const quest = getActiveIntroQuest();
  if (quest.id !== "scott_practice_battle") {
    return;
  }

  const playerMatt = state.capturedParty[0];
  if (!playerMatt) {
    renderActiveOverlay("Scott: Bring at least one captured Matt so we can practice properly.");
    return;
  }

  const waitingOpponent = {
    id: "scott",
    name: "Scott",
    mattType: "dogmatt",
    title: "Practice Coach",
    strategy: "guard",
    level: Math.max(1, getMattLevel(playerMatt)),
    friendship: 30,
  };

  if (state.currentWorld !== "town_arena") {
    setWorld("town_arena", true, "town_arena_entrance");
  }

  resetArenaBattle(false);
  state.arena.opponent = waitingOpponent;
  startArenaBattle(playerMatt.partyId);
  state.arena.introPractice = true;
  saveIntroProgress();
}

function startArenaBattle(partyId) {
  const playerMatt = state.capturedParty.find((matt) => matt.partyId === partyId);
  if (!playerMatt) {
    renderArenaSelect("That Matt is not in your party anymore.");
    return;
  }

  const opponent = chooseArenaOpponent(playerMatt, state.arena.opponent);
  const playerMaxHp = getArenaMattMaxHp(playerMatt);
  const opponentMaxHp = getArenaMattMaxHp(
    { level: opponent.level, friendship: opponent.friendship },
    18,
  );

  state.arena = {
    active: true,
    phase: "battle",
    opponent,
    playerMattId: partyId,
    playerMatt,
    playerHp: playerMaxHp,
    opponentHp: opponentMaxHp,
    playerMaxHp,
    opponentMaxHp,
    playerEnergy: getArenaInitialEnergy(playerMatt),
    opponentEnergy: getArenaInitialEnergy({ level: opponent.level, friendship: opponent.friendship }, 8, false),
    playerShield: 0,
    opponentShield: 0,
    playerStatuses: {},
    opponentStatuses: {},
    playerCooldowns: {},
    opponentCooldowns: {},
    turn: 1,
    log: [
      `${opponent.name} enters with a Lv ${opponent.level} ${MATT_LABELS[opponent.mattType] || "Matt"} and a ${getFriendshipRank(opponent.friendship).name} arena bond.`,
      `${getArenaMattName(playerMatt)} enters with ${getFriendshipLine(playerMatt)}.`,
    ],
    turnLocked: false,
  };

  closeShop();
  spawnArenaBattleActors(opponent, playerMatt);
  renderArenaBattle("Pick an ability.");
}

function awardArenaXp(won = true) {
  const arena = state.arena;
  const matt = state.capturedParty.find((candidate) => candidate.partyId === arena.playerMattId);
  if (!matt) {
    return "";
  }

  const rank = getFriendshipRank(matt.friendship || 0);
  const handbook = hasItem("arena_handbook") ? 1.25 : 1;
  const baseGained = won
    ? ARENA_WIN_XP + arena.opponent.level * 4 + Math.min(18, (state.arenaStats.streak || 0) * 3)
    : hasItem("sparring_gloves")
      ? Math.max(8, Math.round((ARENA_WIN_XP + arena.opponent.level * 2) * 0.35))
      : 0;
  const gained = Math.round(baseGained * handbook * rank.xp);
  const friendship = won ? 8 + Math.min(4, Math.floor((state.arenaStats.streak || 0) / 2)) : hasItem("sparring_gloves") ? 3 : 2;
  const result = applyCapturedMattProgress(arena.playerMattId, { xp: gained, friendship });

  if (!result) {
    return "";
  }

  const pieces = [`${getArenaMattName(result.matt)} gained ${result.xpGain} XP`, `friendship +${result.friendshipGain}`];
  if (result.leveled) {
    pieces.push(`reached Lv ${result.matt.level}`);
  }
  return `${pieces.join(" and ")}.`;
}

function finishArenaBattle(won) {
  const arena = state.arena;
  const introPractice = Boolean(arena.introPractice);
  arena.phase = won ? "won" : "lost";
  arena.turnLocked = false;

  const stats = normalizeArenaStats(state.arenaStats);
  if (introPractice) {
    arena.log.unshift("Scott: Good. Practice is for learning, not chasing a record. Level up before serious arena battles, then go see Logan.");
    setIntroQuest("intro_go_to_logan");
    saveEconomy();
    updateEconomyHud();
    renderArenaBattle(won ? "Practice won. Scott sends you to Logan." : "Practice finished. Scott sends you to Logan.");
    return;
  }

  if (won) {
    stats.wins += 1;
    stats.streak += 1;
    stats.bestStreak = Math.max(stats.bestStreak, stats.streak);
    stats.rankPoints += 5 + Math.min(8, Math.floor(stats.streak / 2));
  } else {
    stats.losses += 1;
    stats.streak = 0;
    stats.rankPoints += hasItem("sparring_gloves") ? 1 : 0;
  }
  state.arenaStats = stats;

  const progress = awardArenaXp(won);
  const coinReward = won
    ? 42 + arena.opponent.level * 5 + Math.min(60, stats.streak * 6)
    : hasItem("sparring_gloves")
      ? 8
      : 0;
  const playerXp = won ? 55 + arena.opponent.level * 9 + Math.min(45, stats.streak * 5) : 18 + arena.opponent.level * 3;
  const playerProgress = awardPlayerXp(playerXp, won ? "arena win" : "arena lesson");
  state.coins += coinReward;
  saveEconomy();
  updateEconomyHud();

  const playerXpText = playerProgress.gained ? ` Ivan XP +${playerProgress.gained}.` : "";
  const result = coinReward > 0 ? `${progress} Coins +${coinReward}.${playerXpText}` : `${progress}${playerXpText}`;
  arena.log.unshift(won ? `Arena win. ${result}` : `Arena loss. ${result}`);
  renderArenaBattle(won ? "You won the arena battle." : "You lost the arena battle.");
}

function appendArenaHpMeter(parent, label, hp, maxHp, side) {
  const meter = document.createElement("div");
  meter.className = `arena-hp-meter ${side}`;

  const name = document.createElement("span");
  name.textContent = label;

  const track = document.createElement("i");
  const fill = document.createElement("b");
  fill.style.width = `${clamp((hp / Math.max(1, maxHp)) * 100, 0, 100)}%`;
  track.append(fill);

  const value = document.createElement("em");
  const keys = getArenaSideKeys(side);
  const energy = state.arena[keys.energy] || 0;
  const shield = state.arena[keys.shield] || 0;
  value.textContent = `${hp}/${maxHp} | E ${energy} | Sh ${shield} | ${formatArenaStatuses(side)}`;

  meter.append(name, track, value);
  parent.append(meter);
}

function arenaUseAbility(index) {
  const arena = state.arena;
  if (!arena.active || arena.phase !== "battle" || arena.turnLocked) {
    return;
  }

  const playerAbilities = getArenaDisplayedAbilities(arena.playerMatt, "player");
  const playerAbility = playerAbilities[index];
  if (!playerAbility) {
    return;
  }

  const useState = getArenaAbilityUseState("player", playerAbility);
  if (useState.disabled) {
    renderArenaBattle(useState.reason);
    return;
  }

  arena.turnLocked = true;
  payArenaAbilityCost("player", playerAbility);
  if (playerAbility.power > 0) {
    playArenaAttackEffect("player", playerAbility);
  }
  renderArenaBattle(`${getArenaMattName(arena.playerMatt)} uses ${playerAbility.name}.`);

  window.setTimeout(() => {
    if (!state.arena.active || state.arena.phase !== "battle") {
      return;
    }

    const playerResult = resolveArenaAbility("player", playerAbility);
    arena.log.unshift(playerResult.text);
    if (playerResult.dodged) {
      spawnFloatingBattleText(getArenaActor("opponent"), "Dodge", "#d9f7ff");
    } else if (playerResult.damage > 0) {
      spawnFloatingBattleText(getArenaActor("opponent"), `-${playerResult.damage}`, playerResult.crit ? "#ffd166" : "#ff9b77");
    }
    if (playerResult.heal) {
      spawnFloatingBattleText(getArenaActor("player"), `+${playerResult.heal}`, "#8ff3c5");
    }
    if (playerResult.energy) {
      spawnFloatingBattleText(getArenaActor("player"), `+${playerResult.energy}E`, "#8bd3ff");
    }
    if (playerResult.shield) {
      spawnFloatingBattleText(getArenaActor("player"), `+${playerResult.shield}Sh`, "#c8f7a1");
    }

    if (arena.opponentHp <= 0) {
      finishArenaBattle(true);
      return;
    }
    if (arena.playerHp <= 0) {
      finishArenaBattle(false);
      return;
    }

    const opponentAbility = chooseOpponentArenaAbility();
    payArenaAbilityCost("opponent", opponentAbility);
    if (opponentAbility.power > 0) {
      playArenaAttackEffect("opponent", opponentAbility);
    }
    renderArenaBattle(`${arena.opponent.name}'s Matt uses ${opponentAbility.name}.`);

    window.setTimeout(() => {
      if (!state.arena.active || state.arena.phase !== "battle") {
        return;
      }

      const opponentResult = resolveArenaAbility("opponent", opponentAbility);
      arena.log.unshift(opponentResult.text);
      if (opponentResult.dodged) {
        spawnFloatingBattleText(getArenaActor("player"), "Dodge", "#d9f7ff");
      } else if (opponentResult.damage > 0) {
        spawnFloatingBattleText(getArenaActor("player"), `-${opponentResult.damage}`, opponentResult.crit ? "#ffd166" : "#ff9b77");
      }
      if (opponentResult.heal) {
        spawnFloatingBattleText(getArenaActor("opponent"), `+${opponentResult.heal}`, "#8ff3c5");
      }
      if (opponentResult.energy) {
        spawnFloatingBattleText(getArenaActor("opponent"), `+${opponentResult.energy}E`, "#8bd3ff");
      }
      if (opponentResult.shield) {
        spawnFloatingBattleText(getArenaActor("opponent"), `+${opponentResult.shield}Sh`, "#c8f7a1");
      }

      if (arena.playerHp <= 0) {
        finishArenaBattle(false);
        return;
      }

      if (advanceArenaRound()) {
        renderArenaBattle(arena.log[0] || "Pick another ability.");
      }
    }, 520);
  }, 440);
}

function renderArenaBattle(message = "") {
  const arena = state.arena;
  if (!arenaBattleUi) {
    return;
  }

  document.body.classList.add("arena-active");
  arenaBattleUi.hidden = false;
  if (arenaBattleTitle) {
    arenaBattleTitle.textContent = arena.opponent
      ? `${arena.opponent.name} - ${arena.opponent.title} | Turn ${arena.turn}`
      : "Arena Battle";
  }
  if (arenaBattleStats) {
    const playerName = getArenaMattName(arena.playerMatt);
    const opponentName = arena.opponent
      ? `${arena.opponent.name}'s ${MATT_LABELS[arena.opponent.mattType] || "Matt"}`
      : "Opponent";
    arenaBattleStats.innerHTML = "";
    appendArenaHpMeter(arenaBattleStats, playerName, arena.playerHp, arena.playerMaxHp, "player");
    appendArenaHpMeter(arenaBattleStats, opponentName, arena.opponentHp, arena.opponentMaxHp, "opponent");
  }
  if (arenaBattleLog) {
    arenaBattleLog.textContent = message || arena.log[0] || "";
  }
  if (!arenaBattleActions) {
    return;
  }

  arenaBattleActions.innerHTML = "";
  if (arena.phase === "battle") {
    getArenaDisplayedAbilities(arena.playerMatt, "player").forEach((ability, index) => {
      const useState = getArenaAbilityUseState("player", ability);
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.action = "arena-ability";
      button.dataset.id = String(index);
      button.disabled = arena.turnLocked || useState.disabled;
      button.title = useState.reason || `${ability.detail || ability.text} Cost ${useState.cost}.`;

      const label = document.createElement("strong");
      label.textContent = ability.name;
      const detail = document.createElement("span");
      detail.textContent = useState.reason || `Pow ${ability.power || 0} | Cost ${useState.cost} | CD ${ability.cooldown || 0}`;
      button.append(label, detail);
      arenaBattleActions.append(button);
    });
  } else {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Leave Arena";
    button.dataset.action = "arena-leave";
    arenaBattleActions.append(button);
  }
}

function openArenaBattle() {
  if (state.currentWorld !== "town_arena") {
    return;
  }

  resetArenaBattle(false);
  const waitingOpponent = {
    ...ARENA_OPPONENTS[Math.floor(Math.random() * ARENA_OPPONENTS.length)],
    level: 1,
    friendship: 35,
  };
  state.arena.active = true;
  state.arena.phase = "select";
  state.arena.opponent = waitingOpponent;
  spawnArenaBattleActors(waitingOpponent);
  renderArenaSelect(`${waitingOpponent.name} is waiting with ${MATT_LABELS[waitingOpponent.mattType] || "a Matt"}. Choose your Matt.`);
}

function leaveArena() {
  resetArenaBattle(true);
  closeShop();
  if (state.currentWorld === "town_arena") {
    setWorld("town_arena_entrance", true, "town_arena");
    setGameMessage("You step back out of the arena.");
    saveWorlds();
  }
}

function addPurchasedMattToParty(type) {
  if (!MATT_CONFIGS[type] || state.capturedParty.length >= MATT_PARTY_LIMIT) {
    return false;
  }

  const originalId = `${type}-ty-${Date.now()}`;
  const member = normalizeCapturedPartyMember(
    {
      id: originalId,
      originalId,
      sourceWorld: "town_mattstore",
      type,
      x: state.player.x,
      y: state.player.y,
      direction: state.player.direction === "left" ? "left" : "right",
      friendship: 24,
    },
    state.capturedParty.length,
  );

  if (!member) {
    return false;
  }

  state.capturedParty.push(member);
  state.dogmatts.push(hydrateCapturedMatt(member, state.capturedParty.length - 1));
  saveCapturedParty();
  updateCaughtHud(countCaughtMatts());
  return true;
}

function buyShopItem(itemId) {
  const shop = getShopDef();
  const item = ITEM_DEFS[itemId];
  const price = getShopItemPrice(itemId);

  if (!shop || !item || !shop.buy.includes(itemId)) {
    return;
  }

  if (item.unique && hasItem(itemId)) {
    renderShop(`You already own ${item.name}.`);
    return;
  }

  if (state.coins < price) {
    renderShop(`Not enough coins for ${item.name}.`);
    return;
  }

  if (item.mattType && state.capturedParty.length >= MATT_PARTY_LIMIT) {
    renderShop(`Party full: ${MATT_PARTY_LIMIT} Matts max.`);
    return;
  }

  state.coins -= price;
  if (item.mattType) {
    addPurchasedMattToParty(item.mattType);
  } else {
    addItem(itemId);
  }
  saveEconomy();
  updateEconomyHud();
  updatePlayerStatusHud();
  renderShop(`Bought ${item.name}.`);
}

function sellInventoryItem(itemId) {
  const item = ITEM_DEFS[itemId];
  const sellValue = getItemSellValue(itemId);
  if (!item || getItemCount(itemId) <= 0) {
    return;
  }

  if (sellValue <= 0) {
    renderShop(`${item.name} cannot be sold.`);
    return;
  }

  removeItem(itemId);
  state.coins += sellValue;
  saveEconomy();
  updateEconomyHud();
  updatePlayerStatusHud();
  renderShop(`Sold ${item.name} for ${sellValue} coins.`);
}

function useInventoryItem(itemId) {
  const item = ITEM_DEFS[itemId];
  if (!item?.use || getItemCount(itemId) <= 0) {
    return;
  }

  if (item.bondOnly) {
    if (isPauseMenuOpen()) {
      state.pauseMenuTab = "party";
      renderPauseMenu(`${item.name} works best when used with a specific Matt.`);
    } else {
      state.shopTab = "bond";
      renderShop(`${item.name} works best when used with a specific Matt.`);
    }
    return;
  }

  const maxHealth = getPlayerMaxHealth();
  const maxStamina = getPlayerMaxStamina();
  let used = false;

  if (item.use.health && state.player.health < maxHealth) {
    state.player.health = clamp(state.player.health + item.use.health * getItemRecoveryMultiplier(itemId, "health"), 0, maxHealth);
    used = true;
  }

  if (item.use.stamina && state.player.stamina < maxStamina) {
    state.player.stamina = clamp(state.player.stamina + item.use.stamina * getItemRecoveryMultiplier(itemId, "stamina"), 0, maxStamina);
    used = true;
  }

  if (item.use.friendship && state.capturedParty.length > 0) {
    const friendshipGain = getFriendshipGain(item.use.friendship);
    state.capturedParty = state.capturedParty.map((matt) => ({
      ...matt,
      friendship: clamp((matt.friendship || 0) + friendshipGain, 0, 100),
    }));
    state.dogmatts.forEach((matt) => {
      if (matt.caught) {
        matt.friendship = clamp((matt.friendship || 0) + friendshipGain, 0, 100);
      }
    });
    saveCapturedParty();
    used = true;
  }

  if (!used) {
    renderActiveOverlay(`${item.name} is not needed right now.`);
    return;
  }

  removeItem(itemId);
  saveEconomy();
  updateEconomyHud();
  updatePlayerStatusHud();
  renderActiveOverlay(`Used ${item.name}.`);
}

function sellCapturedMatt(partyId) {
  const shop = getShopDef();
  if (!shop?.buysMatts) {
    return;
  }

  const index = state.capturedParty.findIndex((matt) => matt.partyId === partyId);
  if (index === -1) {
    renderShop("That Matt is no longer in your party.");
    return;
  }

  const [matt] = state.capturedParty.splice(index, 1);
  const value = getMattSellValue(matt.type, matt);
  state.coins += value;
  state.dogmatts = state.dogmatts.filter((candidate) => candidate.partyId !== partyId);
  saveCapturedParty();
  saveEconomy();
  updateCaughtHud(countCaughtMatts());
  updateEconomyHud();
  renderShop(`Ty bought ${getCapturedMattDisplayName(matt)} for ${value} coins.`);
}

function setDevStatus(message) {
  if (devStatus) {
    devStatus.textContent = message;
  }
}

function setGameMessage(message, duration = 2200) {
  if (shopMessage) {
    shopMessage.textContent = message;
  }

  if (!gameToast || !message) {
    return;
  }

  gameToast.textContent = message;
  gameToast.hidden = false;
  window.clearTimeout(state.toastTimer);
  state.toastTimer = window.setTimeout(() => {
    gameToast.hidden = true;
  }, duration);
}

function getWorldLabel(id) {
  return WORLD_LABELS[id] || id;
}

function isWaystoneNode(node) {
  return node?.kind === WAYSTONE_NODE_KIND || node?.type === WAYSTONE_NODE_KIND;
}

function normalizeWaystoneReward(reward) {
  return ["xp", "item", "random"].includes(reward) ? reward : WAYSTONE_DEFAULT_REWARD;
}

function countWaystones(world = getWorld()) {
  return Array.isArray(world?.nodes) ? world.nodes.filter(isWaystoneNode).length : 0;
}

function countAllWaystones() {
  return Object.values(state.worlds || {}).reduce((total, world) => total + countWaystones(world), 0);
}

function getWaystoneCountStatus(world = getWorld()) {
  return `Waystones: ${countWaystones(world)} here / ${countAllWaystones()} total.`;
}

function getDefaultWaystoneName(world = getWorld()) {
  return `Waystone ${countWaystones(world) + 1}`;
}

function getNodeLabel(node) {
  if (isWaystoneNode(node)) {
    return normalizeNodeName(node?.name) || "Waystone";
  }

  return normalizeNodeName(node?.name) || getWorldLabel(node?.target);
}

function updateWorldLabel() {
  if (worldLabel) {
    worldLabel.textContent = getWorldLabel(state.currentWorld);
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
    spawnScriptedWizardIfNeeded();
  }
}

function getTransitionSpawnNode(destinationWorldId, fromWorldId = "") {
  const destination = state.worlds[destinationWorldId];
  return fromWorldId
    ? destination?.nodes?.find((node) => node.target === fromWorldId)
    : null;
}

function getTransitionSpawnPoint(destinationWorldId, fromWorldId = "") {
  const matchingNode = getTransitionSpawnNode(destinationWorldId, fromWorldId);
  if (matchingNode) {
    return { x: matchingNode.x, y: matchingNode.y };
  }

  return getMapCenter(destinationWorldId);
}

function maybeShowBrockMissionArrivalHint(worldId, previousWorldId = "") {
  if (
    previousWorldId !== worldId &&
    worldId === BROCK_CAPTURED_WORLD_ID &&
    getBrockMissionStatus() === BROCK_MISSION_STATUS.SEARCH_GRASSLAND &&
    !isBrockRescued()
  ) {
    setGameMessage("The Grass Cave goes almost black. Keep Ivan's lantern close and look for Brock.", 7600);
    return;
  }

  if (
    previousWorldId !== worldId &&
    worldId === "treeworld" &&
    getBrockMissionStatus() === BROCK_MISSION_STATUS.SEARCH_GRASSLAND
  ) {
    setGameMessage("You reached the Grassland. Start looking for any sign of Brock.", 7200);
  }
}

function setWorld(id, movePlayer = true, fromWorldId = "") {
  if (!WORLD_IDS.includes(id)) {
    return;
  }

  const previousWorld = state.currentWorld;
  if (state.ready) {
    saveCapturedParty();
    saveEconomy();
  }

  closeShop();
  closePauseMenu();
  clearPrimeMysticGravityWell();
  state.cameraFocus = null;
  state.currentWorld = id;
  state.lastPreloadKey = "";
  state.dev.activePathId = null;
  state.dev.activeNpcPathId = null;
  state.dev.activeWallId = null;
  state.dev.activeNodeId = null;
  maybeRevealBrockRescueMapOnReturn(id, previousWorld);

  if (movePlayer) {
    const arrivalNode = getTransitionSpawnNode(id, fromWorldId);
    const spawnPoint = getTransitionSpawnPoint(id, fromWorldId);
    state.player.x = spawnPoint.x;
    state.player.y = spawnPoint.y;
    state.nodeTravelCooldown = Math.max(state.nodeTravelCooldown || 0, 0.25);
    state.nodeTravelExitWorld = arrivalNode ? id : "";
    state.nodeTravelExitNodeId = arrivalNode?.id || "";
    seedPlayerTrail();
  } else {
    const clamped = clampToCurrentMap(state.player);
    state.player.x = clamped.x;
    state.player.y = clamped.y;
    state.nodeTravelCooldown = Math.max(state.nodeTravelCooldown || 0, 0.25);
    state.nodeTravelExitWorld = "";
    state.nodeTravelExitNodeId = "";
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
    spawnScriptedWizardIfNeeded();
    spawnPendingDementedMattAmbushIfNeeded();
    updateCaughtHud(countCaughtMatts());
    maybeShowBrockMissionArrivalHint(id, previousWorld);
    syncCamera();
    preloadNearbyTiles(2);
    draw();
  }

  if (previousWorld === "grass_tree" && id !== "grass_tree") {
    resumeAmbientMusicFromPrimeGrassMatt();
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
  const world = getWorld();
  const paths = world.paths;

  state.dogmatts.forEach((dogmatt, index) => {
    if (dogmatt.caught) {
      return;
    }

    const path = paths.length > 0 ? paths[index % paths.length] : null;
    const spawnArea = getContainingSpawnArea(dogmatt, world.spawnAreas);

    dogmatt.pathId = path ? path.id : "";
    dogmatt.pathDirection = dogmatt.pathDirection === -1 ? -1 : 1;
    dogmatt.spawnAreaId = spawnArea ? spawnArea.id : "";
    dogmatt.pathPauseTimer = 0;

    if (spawnArea) {
      dogmatt.pathRoamMode = "spawn";
      dogmatt.pathRoamTarget = chooseSpawnRoamTarget(spawnArea);
    } else if (path) {
      reacquireMattPathTarget(dogmatt, path);
    } else {
      dogmatt.pathPointIndex = 0;
      dogmatt.pathRoamMode = "";
      dogmatt.pathRoamTarget = null;
    }
  });
}

function getWorldBrockData(world = getWorld()) {
  if (!world.brock || typeof world.brock !== "object") {
    world.brock = normalizeBrockData(null, world.id);
  }

  return world.brock;
}

function getBrockFreePath(world = getWorld()) {
  const brock = getWorldBrockData(world);
  if (!canEditBrockFreePath(world.id) || !brock.freePath?.length) {
    return null;
  }

  return {
    id: BROCK_FREE_PATH_ID,
    npcId: "brock",
    points: brock.freePath,
  };
}

function findNpcPathById(id, world = getWorld()) {
  if (id === BROCK_FREE_PATH_ID) {
    return getBrockFreePath(world);
  }

  return world.npcPaths.find((candidate) => candidate.id === id) || null;
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

  if (npcId === "brock") {
    const brockPath = getBrockFreePath(world);
    if (brockPath) {
      return brockPath;
    }
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

function getWizardAmbushPath(world = getWorld()) {
  const placedPath =
    world.npcPaths.find(
      (path) => path.npcId === WIZARD_NPC_ID && path.id === WIZARD_GRASS_CAVE_PATH_ID && path.points.length > 0,
    ) || world.npcPaths.find((path) => path.npcId === WIZARD_NPC_ID && path.points.length > 0);

  return placedPath || { id: WIZARD_GRASS_CAVE_PATH_ID, npcId: WIZARD_NPC_ID, points: WIZARD_GRASS_CAVE_DEFAULT_PATH };
}

function getWizardAmbushSpawnPoint(world = getWorld(), path = getWizardAmbushPath(world)) {
  const placedWizard = world.npcs.find((npc) => npc.id === WIZARD_NPC_ID);
  return placedWizard || path?.points?.[0] || NPC_DEFS[WIZARD_NPC_ID];
}

function isWizardAmbushActive() {
  return (
    state.currentWorld === BROCK_CAPTURED_WORLD_ID &&
    isBrockRescued() &&
    state.storyFlags?.wizardAmbushStarted &&
    !state.storyFlags?.wizardAmbushComplete
  );
}

function spawnScriptedWizardIfNeeded() {
  if (!isWizardAmbushActive()) {
    return false;
  }

  if (state.npcs.some((npc) => npc.id === WIZARD_NPC_ID && npc.script === WIZARD_AMBUSH_SCRIPT)) {
    return true;
  }

  const world = getWorld();
  const path = getWizardAmbushPath(world);
  const spawnPoint = getWizardAmbushSpawnPoint(world, path);
  const startIndex = path.points.length > 0 ? getClosestNpcPathPointIndex(spawnPoint, path) ?? 0 : 0;
  const npc = createNpc(WIZARD_NPC_ID, spawnPoint.x, spawnPoint.y);
  npc.script = WIZARD_AMBUSH_SCRIPT;
  npc.scriptState = "walking";
  npc.pathId = path.id;
  npc.pathPointIndex = startIndex;
  npc.targetPointIndex = Math.min(startIndex + 1, path.points.length - 1);
  npc.waitTimer = 0;
  npc.waitMode = "point";
  state.npcs.push(npc);
  spawnCaptureEffect(npc);
  addScreenShake(3);
  return true;
}

function startWizardAmbushAfterBrockRescue() {
  if (state.currentWorld !== BROCK_CAPTURED_WORLD_ID || state.storyFlags?.wizardAmbushStarted) {
    return;
  }

  state.storyFlags = normalizeStoryFlags({
    ...state.storyFlags,
    wizardAmbushStarted: true,
    wizardAmbushComplete: false,
    wizardDementedMattPending: false,
    wizardDementedMattsSpawned: false,
  });
  saveEconomy();
  spawnScriptedWizardIfNeeded();
}

function finishWizardAmbush(wizard) {
  if (!state.storyFlags?.wizardAmbushComplete) {
    state.storyFlags = normalizeStoryFlags({
      ...state.storyFlags,
      wizardAmbushComplete: true,
      wizardDementedMattPending: true,
      wizardDementedMattsSpawned: false,
    });
    saveEconomy();
    setGameMessage(WIZARD_AMBUSH_WARNING, 5200);
    spawnCaptureEffect(wizard);
    addScreenShake(7);
  }

  wizard.scriptState = "disappearing";
  wizard.targetPointIndex = null;
  wizard.scriptTimer = 0;
  setAction(wizard, "disappear");
}

function createDementedMatt(index, origin) {
  const config = DEMENTED_MATT;
  const offset = DEMENTED_MATT_AMBUSH_OFFSETS[index % DEMENTED_MATT_AMBUSH_OFFSETS.length];
  const x = clamp((origin?.x || state.player.x) + offset.x, 80, getMapWidth() - 80);
  const y = clamp((origin?.y || state.player.y) + offset.y, 80, getMapHeight() - 80);
  const level = 10 + index;
  const matt = {
    id: `${DEMENTED_MATT_TYPE}-ambush-${index + 1}`,
    originalId: `${DEMENTED_MATT_TYPE}-ambush-${index + 1}`,
    name: "Demented Matt",
    type: DEMENTED_MATT_TYPE,
    assetKey: DEMENTED_MATT_TYPE,
    x,
    y,
    width: config.width,
    height: config.height,
    scale: 1.28,
    action: "walking",
    frameTimer: index * 0.06,
    frameIndex: index % DEMENTED_MATT_RUNNING_FRAMES.length,
    direction: x > state.player.x ? "left" : "right",
    wanderAngle: 0,
    wanderTimer: 0,
    level,
    xp: 0,
    friendship: 0,
    captureDifficulty: 4.2,
    defeatHits: config.defeatHits,
    captureChance: 0,
    captureHitsRequired: 0,
    damageScale: 1.28,
    hitCount: 0,
    hitCooldown: 0,
    hitReactionTimer: 0,
    attackCooldown: 0.2 + index * 0.22,
    attackTimer: 0,
    attackElapsed: 0,
    attackApplied: false,
    caught: false,
    bloodlusted: true,
    pathId: "",
    pathPointIndex: 0,
    pathDirection: 1,
    spawnAreaId: "",
    pathRoamMode: "bloodlust",
    pathRoamTarget: null,
    pathPauseTimer: 0,
    pathPanicTimer: 0,
  };

  matt.captureChance = getWildMattCaptureChance(matt);
  matt.captureHitsRequired = getWildMattCaptureHits(matt);
  return matt;
}

function getDementedMattAmbushOrigin() {
  const path = getWizardAmbushPath();
  return path?.points?.[path.points.length - 1] || getCapturedBrockPosition() || state.player;
}

function spawnDementedMattAmbush(origin = getDementedMattAmbushOrigin()) {
  if (
    state.currentWorld !== BROCK_CAPTURED_WORLD_ID ||
    !isBrockRescued() ||
    state.storyFlags?.wizardDementedMattsSpawned
  ) {
    return false;
  }

  const capturedMatts = state.dogmatts.filter((matt) => matt.caught);
  const dementedMatts = Array.from({ length: DEMENTED_MATT_AMBUSH_COUNT }, (_, index) =>
    createDementedMatt(index, origin),
  );
  state.dogmatts = [...dementedMatts, ...capturedMatts];
  state.storyFlags = normalizeStoryFlags({
    ...state.storyFlags,
    wizardDementedMattPending: false,
    wizardDementedMattsSpawned: true,
  });
  saveEconomy();

  dementedMatts.forEach((matt) => spawnCaptureEffect(matt));
  addScreenShake(10);
  setGameMessage("Three demented Matts tear out of the dark.", 7600);
  updateCaughtHud(countCaughtMatts());
  return true;
}

function spawnPendingDementedMattAmbushIfNeeded() {
  if (!state.storyFlags?.wizardDementedMattPending || state.storyFlags?.wizardDementedMattsSpawned) {
    return false;
  }

  return spawnDementedMattAmbush();
}

function completeWizardDisappear(wizard) {
  spawnDementedMattAmbush(wizard);
  wizard.removeAfterScript = true;
}

function updateScriptedWizard(wizard, dt) {
  const frames = getNpcFrames(wizard);
  const frameDuration = wizard.action === "walking" ? 0.11 : 0.14;

  if (wizard.scriptState === "disappearing") {
    if (frames.length > 0) {
      wizard.frameTimer += dt;
      if (wizard.frameTimer >= frameDuration) {
        wizard.frameTimer = 0;
        if (wizard.frameIndex < frames.length - 1) {
          wizard.frameIndex += 1;
        } else {
          completeWizardDisappear(wizard);
        }
      }
    } else {
      completeWizardDisappear(wizard);
    }
    return;
  }

  const path = findNpcPathById(wizard.pathId, getWorld()) || getWizardAmbushPath();
  if (!path || path.points.length <= 1) {
    finishWizardAmbush(wizard);
    return;
  }

  normalizeNpcPathProgress(wizard, path);
  if (!Number.isFinite(wizard.targetPointIndex)) {
    wizard.targetPointIndex = Math.min(wizard.pathPointIndex + 1, path.points.length - 1);
  }

  const target = path.points[wizard.targetPointIndex];
  if (!target || wizard.pathPointIndex >= path.points.length - 1) {
    finishWizardAmbush(wizard);
    return;
  }

  const dx = target.x - wizard.x;
  const dy = target.y - wizard.y;
  const distance = Math.hypot(dx, dy) || 1;

  if (distance <= NPC.stopDistance) {
    wizard.x = target.x;
    wizard.y = target.y;
    wizard.pathPointIndex = wizard.targetPointIndex;
    if (wizard.pathPointIndex >= path.points.length - 1) {
      finishWizardAmbush(wizard);
      return;
    }
    wizard.targetPointIndex = wizard.pathPointIndex + 1;
  } else {
    const speed = Math.min(NPC.speed * dt, distance);
    wizard.x = clamp(wizard.x + (dx / distance) * speed, 0, getMapWidth());
    wizard.y = clamp(wizard.y + (dy / distance) * speed, 0, getMapHeight());
    wizard.direction = dx < 0 ? "left" : "right";
    setAction(wizard, "walking");
  }

  if (frames.length > 0) {
    advanceAnimation(wizard, frames.length, frameDuration, dt);
  }
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
  if (state.dev.tool === "brock-path") {
    if (!canEditBrockFreePath()) {
      setDevStatus("Brock free path belongs in Grass Cave or Brick's Inn. Switch worlds first.");
      return;
    }

    const brock = getWorldBrockData();
    brock.freePath = [];
    saveWorlds();
    refreshNpcPaths();
    setDevStatus("Brock free path cleared. Click his new route points.");
    return;
  }

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

  if (state.dev.tool === "brock-path") {
    const brock = getWorldBrockData(world);
    if (brock.freePath.length > 0) {
      brock.freePath.pop();
      saveWorlds();
      refreshNpcPaths();
      setDevStatus("Last Brock free path point removed.");
      return;
    }
  }

  if (state.dev.tool === "brock-captured") {
    if (!canPlaceCapturedBrock()) {
      setDevStatus("Captured Brock belongs in Grass Cave. Switch to Grass Cave first.");
      return;
    }

    const brock = getWorldBrockData(world);
    if (brock.capturedPosition) {
      brock.capturedPosition = null;
      saveWorlds();
      setDevStatus("Captured Brock position cleared.");
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

  devNodeName?.addEventListener("input", () => {
    const world = getWorld();
    const node = world.nodes.find((candidate) => candidate.id === state.dev.activeNodeId);

    if (node) {
      node.name = normalizeNodeName(devNodeName.value);
      saveWorlds();
      setDevStatus(`${isWaystoneNode(node) ? "Waystone" : "Node"} renamed to ${getNodeLabel(node)}. ${getWaystoneCountStatus()}`);
    }
  });

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
  document.body.classList.toggle("dev-open", enabled);

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

  if (tool !== "node" && tool !== "waystone") {
    state.dev.activeNodeId = null;
  }

  if (devNodeTarget) {
    devNodeTarget.disabled = tool === "waystone";
  }

  if (devNodeName) {
    devNodeName.placeholder = tool === "waystone" ? "Example: Moon Waystone" : "Example: Fire Gate";
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
        : tool === "brock-captured"
          ? " Switch to Grass Cave, then click where captured Brock should appear."
          : tool === "brock-path"
            ? " Switch to Grass Cave or Brick's Inn, then click Brock's free-walk route. New Line clears it."
        : tool === "npc"
          ? " Click to place the selected NPC."
          : tool === "node"
            ? " Type a node name, choose its target, then click the map."
            : tool === "waystone"
              ? ` Type a name if you want one, then click the map. ${getWaystoneCountStatus()}`
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

  const scale = getWorldRenderScale();
  return {
    x: state.camera.x + (clientX - rect.left) / scale,
    y: state.camera.y + (clientY - rect.top) / scale,
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

  if (state.dev.tool === "brock-captured") {
    if (!canPlaceCapturedBrock()) {
      setDevStatus("Captured Brock belongs in Grass Cave. Switch to Grass Cave first.");
      return;
    }

    const brock = getWorldBrockData(world);
    brock.capturedPosition = { x: point.x, y: point.y };
    saveWorlds();
    setDevStatus(`Captured Brock position set at ${Math.round(point.x)}, ${Math.round(point.y)}.`);
    return;
  }

  if (state.dev.tool === "brock-path") {
    if (!canEditBrockFreePath()) {
      setDevStatus("Free Brock path belongs in Grass Cave or Brick's Inn. Switch worlds first.");
      return;
    }

    const brock = getWorldBrockData(world);
    brock.freePath.push({ x: point.x, y: point.y });
    const npc = world.npcs.find((candidate) => candidate.id === "brock");
    if (npc) {
      npc.pathId = BROCK_FREE_PATH_ID;
      npc.pathPointIndex = 0;
      npc.targetPointIndex = null;
    }
    saveWorlds();
    refreshNpcPaths();
    setDevStatus(`Brock free path point added (${brock.freePath.length}).`);
    return;
  }

  if (state.dev.tool === "node" || state.dev.tool === "waystone") {
    const isWaystoneTool = state.dev.tool === "waystone";
    const target = isWaystoneTool ? "" : devNodeTarget?.value || "town";
    const requestedName = normalizeNodeName(devNodeName?.value);
    const existingNode = world.nodes.find(
      (candidate) =>
        isWaystoneNode(candidate) === isWaystoneTool &&
        Math.hypot(candidate.x - point.x, candidate.y - point.y) <= candidate.radius + 30,
    );
    const name = requestedName || (isWaystoneTool ? existingNode?.name || getDefaultWaystoneName(world) : "");

    if (existingNode) {
      if (isWaystoneTool) {
        existingNode.kind = WAYSTONE_NODE_KIND;
        existingNode.target = "";
        existingNode.radius = existingNode.radius || 74;
        existingNode.questionId = existingNode.questionId || "";
        existingNode.reward = normalizeWaystoneReward(existingNode.reward);
      } else {
        delete existingNode.kind;
        delete existingNode.questionId;
        delete existingNode.reward;
        existingNode.target = target;
        existingNode.radius = existingNode.radius || 82;
      }
      existingNode.name = name;
      state.dev.activeNodeId = existingNode.id;
      if (devNodeName) {
        devNodeName.value = existingNode.name;
      }
      saveWorlds();
      setDevStatus(
        isWaystoneTool
          ? `${getNodeLabel(existingNode)} waystone updated. ${getWaystoneCountStatus()}`
          : `${getNodeLabel(existingNode)} node updated. Target: ${getWorldLabel(target)}.`,
      );
      return;
    }

    const node = {
      id: createId(isWaystoneTool ? "waystone" : "node"),
      x: point.x,
      y: point.y,
      radius: isWaystoneTool ? 74 : 82,
      target,
      name,
      kind: isWaystoneTool ? WAYSTONE_NODE_KIND : undefined,
      questionId: isWaystoneTool ? "" : undefined,
      reward: isWaystoneTool ? WAYSTONE_DEFAULT_REWARD : undefined,
    };

    world.nodes.push(node);
    state.dev.activeNodeId = node.id;
    saveWorlds();
    setDevStatus(
      isWaystoneTool
        ? `${getNodeLabel(node)} waystone added. ${getWaystoneCountStatus()}`
        : `${getNodeLabel(node)} node added. Target: ${getWorldLabel(target)}.`,
    );
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

  const brock = getWorldBrockData(world);
  if (
    canPlaceCapturedBrock() &&
    brock.capturedPosition &&
    Math.hypot(brock.capturedPosition.x - point.x, brock.capturedPosition.y - point.y) < hitRadius
  ) {
    brock.capturedPosition = null;
    saveWorlds();
    setDevStatus("Captured Brock position erased.");
    return;
  }

  if (canEditBrockFreePath() && brock.freePath.length > 0) {
    const brockPointIndex = brock.freePath.findIndex(
      (pathPoint) => Math.hypot(pathPoint.x - point.x, pathPoint.y - point.y) < hitRadius,
    );

    if (brockPointIndex !== -1) {
      brock.freePath.splice(brockPointIndex, 1);
      saveWorlds();
      refreshNpcPaths();
      setDevStatus("Brock free path point erased.");
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
      const erased = collection[index];
      collection.splice(index, 1);
      saveWorlds();
      setDevStatus(
        name === "nodes" && isWaystoneNode(erased)
          ? `Waystone erased. ${getWaystoneCountStatus()}`
          : `${name} item erased.`,
      );
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
  const viewWidth = getCameraViewWidth();
  const viewHeight = getCameraViewHeight();
  const maxX = Math.max(0, getMapWidth() - viewWidth);
  const maxY = Math.max(0, getMapHeight() - viewHeight);
  let target = state.player;

  if (state.cameraFocus?.type === "matt") {
    const focusedMatt = state.dogmatts.find((matt) => matt.id === state.cameraFocus.id);
    if (focusedMatt && !focusedMatt.caught) {
      const config = getMattConfig(focusedMatt.type);
      const scale = getInnActorScale() * (Number(focusedMatt.scale) || 1);
      target = { x: focusedMatt.x, y: focusedMatt.y - config.height * scale * 0.32 };
    } else {
      state.cameraFocus = null;
    }
  }

  state.camera.x = clamp(target.x - viewWidth / 2, 0, maxX);
  state.camera.y = clamp(target.y - viewHeight / 2, 0, maxY);
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
  return getWorldEncounterProfile()?.mattType || "";
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

function copyPoint(point) {
  return point ? { x: point.x, y: point.y } : null;
}

function getContainingSpawnArea(point, spawnAreas = getWorld().spawnAreas) {
  return spawnAreas.find((area) => pointInRect(point, normalizeRect(area))) || null;
}

function chooseSpawnRoamTarget(area, random = Math.random) {
  return area ? randomPointInArea(area, random) : null;
}

function normalizePathPointIndex(index, path) {
  const count = path?.points?.length || 0;
  if (count === 0) {
    return 0;
  }

  return ((index % count) + count) % count;
}

function setMattPathTarget(matt, path, index) {
  if (!path || !Array.isArray(path.points) || path.points.length === 0) {
    matt.pathRoamTarget = null;
    return;
  }

  matt.pathRoamMode = "path";
  matt.pathPointIndex = normalizePathPointIndex(index, path);
  matt.pathRoamTarget = copyPoint(path.points[matt.pathPointIndex]);
}

function reacquireMattPathTarget(matt, path) {
  const closestPathPoint = findClosestPathPoint(matt, path);
  setMattPathTarget(matt, path, closestPathPoint ? closestPathPoint.index : 0);
}

function getNextMattPathPointIndex(matt, path) {
  const direction = matt.pathDirection === -1 ? -1 : 1;
  return normalizePathPointIndex((matt.pathPointIndex || 0) + direction, path);
}

function scheduleFiremattSpecialIdle(firematt, random = Math.random) {
  firematt.idleSpecialTimer =
    FIREMATT.specialIdleMin + random() * (FIREMATT.specialIdleMax - FIREMATT.specialIdleMin);
}

function scheduleMysticMattSpecialIdle(matt, random = Math.random) {
  matt.idleSpecialTimer =
    MYSTICMATT.specialIdleMin + random() * (MYSTICMATT.specialIdleMax - MYSTICMATT.specialIdleMin);
  matt.mysticFloatTimer = 0;
}

function isBossCaptured(worldId, boss) {
  return state.capturedParty.some((matt) => matt.sourceWorld === worldId && (matt.originalId || matt.id) === boss.id);
}

function hasWorldBossRequirement(boss) {
  return !boss?.requiresCaptured || getCapturedMattTotal(boss.requiresCaptured.type) >= boss.requiresCaptured.count;
}

function createBossMatt(worldId, profile, random = Math.random) {
  const boss = WORLD_BOSS_MATTS[worldId];
  if (!boss || isIntroChainActive()) {
    return null;
  }

  if (isBossCaptured(worldId, boss)) {
    return null;
  }

  if (!hasWorldBossRequirement(boss)) {
    return null;
  }

  const config = getMattConfig(boss.type);
  const bossProfile = {
    ...profile,
    levelMin: boss.levelMin ?? profile.levelMin,
    levelMax: boss.levelMax ?? profile.levelMax,
    captureDifficulty: boss.captureDifficulty ?? profile.captureDifficulty,
    damageScale: boss.damageScale ?? profile.damageScale,
  };
  const level = rollWildMattLevel(bossProfile, random);
  const hasIntro = Boolean(boss.introAction);
  const matt = {
    id: boss.id,
    originalId: boss.id,
    name: boss.name,
    type: boss.type,
    assetKey: boss.assetKey || boss.type,
    x: clamp(boss.x, 0, getMapWidth()),
    y: clamp(boss.y, 0, getMapHeight()),
    width: config.width,
    height: config.height,
    scale: boss.scale || 1,
    action: hasIntro ? boss.introAction : "idle",
    frameTimer: 0,
    frameIndex: 0,
    direction: "left",
    level,
    xp: 0,
    friendship: 0,
    captureDifficulty: bossProfile.captureDifficulty,
    captureChance: 0,
    captureHitsRequired: 0,
    captureHitsBonus: boss.captureHitsBonus || 0,
    damageScale: bossProfile.damageScale,
    hitCount: 0,
    hitCooldown: 0,
    hitReactionTimer: 0,
    attackCooldown: 0.8,
    attackTimer: 0,
    attackElapsed: 0,
    attackApplied: false,
    caught: false,
    boss: true,
    rooted: true,
    bossWalkSpeed: boss.walkSpeed || config.wanderSpeed,
    bossRushSpeed: boss.rushSpeed || boss.walkSpeed || config.wanderSpeed,
    bossPreferredDistance: boss.preferredDistance || 360,
    bossCloseDistance: boss.closeDistance || 220,
    bossMoveTimer: 0,
    bossMoveIntervalMin: boss.moveIntervalMin || 0.8,
    bossMoveIntervalMax: boss.moveIntervalMax || 1.8,
    bossMoveMode: "orbit",
    bossOrbitDirection: random() < 0.5 ? -1 : 1,
    preBattleRoam: Boolean(boss.preBattleRoam),
    introPlaying: hasIntro,
    introAction: boss.introAction || "",
    introFrameDuration: boss.introFrameDuration || 0.1,
    introMessage: boss.introMessage || "",
    musicTrack: boss.musicTrack || "",
    musicMode: boss.musicMode || "",
    musicVolume: boss.musicVolume || 0,
    awakened: false,
    aggroRadius: boss.aggroRadius || config.noticeRadius,
    attacks: boss.attacks || [],
    pathId: "",
    pathPointIndex: 0,
    pathDirection: 1,
    spawnAreaId: "",
    pathRoamMode: "boss",
    pathRoamTarget: null,
    pathPauseTimer: 0,
    pathPanicTimer: 0,
  };
  matt.captureChance = getWildMattCaptureChance(matt);
  matt.captureHitsRequired = getWildMattCaptureHits(matt);
  if (matt.introPlaying) {
    state.cameraFocus = { type: "matt", id: matt.id };
    if (matt.introMessage) {
      setGameMessage(matt.introMessage, 2600);
    }
  }
  return matt;
}

function finishBossIntro(matt) {
  if (!matt?.introPlaying) {
    return;
  }

  matt.introPlaying = false;
  matt.frameTimer = 0;
  matt.frameIndex = 0;
  setAction(matt, matt.preBattleRoam ? "walking" : "idle");
  if (state.cameraFocus?.type === "matt" && state.cameraFocus.id === matt.id) {
    state.cameraFocus = null;
  }
}

function isBossIntroPlaying() {
  return state.dogmatts.some((matt) => matt.introPlaying);
}

function awakenBossMatt(matt) {
  if (!matt?.boss || matt.awakened) {
    return;
  }

  finishBossIntro(matt);
  matt.awakened = true;
  matt.attackCooldown = 0.25;
  matt.activeAttack = null;
  matt.attackTarget = null;
  setAction(matt, "walking");
  startBossMusic(matt);
  setGameMessage(`${matt.name || "The boss"} wakes up.`);
}

function spawnDogmatts() {
  const profile = getWorldEncounterProfile();
  const type = profile?.mattType || "";
  if (!type) {
    state.dogmatts = attachCapturedParty([]);
    return;
  }

  const config = getMattConfig(type);
  const random = seededRandom(4281 + hashStringSeed(state.currentWorld));
  const dogmatts = [];
  const nearbyDogmatts = 6;
  const spawnAreas = getWorld().spawnAreas;
  const paths = getWorld().paths;
  const pathSpawnAreas = getPathLinkedSpawnAreas(spawnAreas, paths);
  const activeSpawnAreas = pathSpawnAreas.length > 0 ? pathSpawnAreas : spawnAreas;
  const mapWidth = getMapWidth();
  const mapHeight = getMapHeight();
  const margin = Math.min(600, Math.max(80, Math.min(mapWidth, mapHeight) * 0.12));
  const boss = WORLD_BOSS_MATTS[state.currentWorld];
  const bossMatt = createBossMatt(state.currentWorld, profile, random);

  if (bossMatt) {
    state.dogmatts = attachCapturedParty([bossMatt]);
    return;
  }

  if (boss?.suppressNormalSpawns) {
    state.dogmatts = attachCapturedParty([]);
    return;
  }

  for (let index = 0; index < (profile.count || config.count); index += 1) {
    let x = margin + random() * Math.max(1, mapWidth - margin * 2);
    let y = margin + random() * Math.max(1, mapHeight - margin * 2);
    let spawnArea = null;

    if (activeSpawnAreas.length > 0) {
      spawnArea = activeSpawnAreas[Math.floor(random() * activeSpawnAreas.length)];
      const spawnPoint = randomPointInArea(spawnArea, random);
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
    const pathPointIndex = closestPathPoint ? closestPathPoint.index : 0;
    const pathRoamTarget = spawnArea
      ? chooseSpawnRoamTarget(spawnArea, random)
      : copyPoint(path?.points?.[pathPointIndex]);
    const level = rollWildMattLevel(profile, random);
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
      level,
      xp: 0,
      friendship: 0,
      captureDifficulty: profile.captureDifficulty,
      captureChance: getWildMattCaptureChance({ level, captureDifficulty: profile.captureDifficulty }),
      captureHitsRequired: getWildMattCaptureHits({ level, captureDifficulty: profile.captureDifficulty }),
      damageScale: profile.damageScale,
      hitCount: 0,
      hitCooldown: 0,
      hitReactionTimer: 0,
      attackCooldown: 0.35 + random() * 1.2,
      attackTimer: 0,
      attackElapsed: 0,
      attackApplied: false,
      caught: false,
      pathId: path ? path.id : "",
      pathPointIndex,
      pathDirection: random() < 0.5 ? -1 : 1,
      spawnAreaId: spawnArea ? spawnArea.id : "",
      pathRoamMode: spawnArea ? "spawn" : "path",
      pathRoamTarget,
      pathPauseTimer: random() > 0.76 ? 0.6 + random() * 1.9 : 0,
      pathPanicTimer: 0,
    };

    if (type === "firematt") {
      scheduleFiremattSpecialIdle(matt, random);
    }

    if (type === "mysticmatt") {
      scheduleMysticMattSpecialIdle(matt, random);
    }

    dogmatts.push(matt);
  }

  state.dogmatts = attachCapturedParty(dogmatts);
}

function trySpawnUnlockedWorldBoss(capturedMatt) {
  const boss = WORLD_BOSS_MATTS[state.currentWorld];
  if (isIntroChainActive() || !boss || capturedMatt?.boss || !hasWorldBossRequirement(boss) || isBossCaptured(state.currentWorld, boss)) {
    return false;
  }

  if (state.dogmatts.some((matt) => matt.boss && !matt.caught)) {
    return false;
  }

  spawnDogmatts();
  return true;
}

function canSpawnNpc(npcId) {
  if (npcId === WIZARD_NPC_ID) {
    return false;
  }

  return npcId !== "brock" || isBrockRescued();
}

function spawnNpcs() {
  const world = getWorld();
  const npcs = world.npcs.filter((npc) => canSpawnNpc(npc.id));

  if (state.currentWorld === "town" && isNightTime()) {
    for (const npcId of NPC_IDS) {
      if (!canSpawnNpc(npcId)) {
        continue;
      }

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
    Math.floor((state.camera.x + getCameraViewWidth()) / map.tileSize) + buffer,
    0,
    map.columns - 1,
  );
  const top = clamp(
    Math.floor(state.camera.y / map.tileSize) - buffer,
    0,
    map.rows - 1,
  );
  const bottom = clamp(
    Math.floor((state.camera.y + getCameraViewHeight()) / map.tileSize) + buffer,
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

function getIvanFrames(action) {
  return images.ivan[action] || images.ivan.breathing || images.ivan.idle || [];
}

function schedulePlayerIdleFlourish(player) {
  player.idleFlourishTimer = randomBetween(PLAYER.idleFlourishMin, PLAYER.idleFlourishMax);
}

function updatePlayerRestAnimation(player, dt) {
  const breathingFrames = getIvanFrames("breathing");
  const idleFrames = getIvanFrames("idle");
  const restAction = breathingFrames.length > 0 ? "breathing" : "idle";

  if (player.action === "idle" && idleFrames.length > 1) {
    player.frameTimer += dt;
    if (player.frameTimer >= 0.095) {
      player.frameTimer = 0;
      if (player.frameIndex < idleFrames.length - 1) {
        player.frameIndex += 1;
      } else {
        setAction(player, restAction);
        schedulePlayerIdleFlourish(player);
      }
    }
    return;
  }

  if (player.action !== restAction) {
    setAction(player, restAction);
    schedulePlayerIdleFlourish(player);
  }

  player.idleFlourishTimer -= dt;
  if (player.idleFlourishTimer <= 0 && idleFrames.length > 1) {
    setAction(player, "idle");
    return;
  }

  if (breathingFrames.length > 0) {
    advanceAnimation(player, breathingFrames.length, 0.13, dt);
  }
}

function getPlayerFrameDuration(action) {
  if (action === "whipping" || action === "sprinting") {
    return 0.075;
  }
  if (action === "walking") {
    return 0.105;
  }
  return 0.13;
}

function updatePlayer(dt) {
  const player = state.player;
  const maxHealth = getPlayerMaxHealth();
  const maxStamina = getPlayerMaxStamina();
  player.health = clamp(player.health ?? maxHealth, 0, maxHealth);
  player.stamina = clamp(player.stamina ?? maxStamina, 0, maxStamina);
  player.damageCooldown = Math.max(0, (player.damageCooldown || 0) - dt);

  if (state.dev.enabled || isIntroOpen() || isShopOpen() || isPauseMenuOpen() || isBossIntroPlaying() || (state.arena.active && state.arena.phase !== "idle")) {
    player.moving = false;
    player.stamina = Math.min(maxStamina, player.stamina + getPlayerStaminaRegen() * dt);
    updatePlayerRestAnimation(player, dt);
    updatePlayerTrail();
    updatePlayerStatusHud();
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
  const sprinting = moving && (keys.has("shift") || touchInput.sprint) && player.stamina > 0;

  if (moving) {
    player.speed = getPlayerWalkSpeed();
    player.sprintSpeed = getPlayerSprintSpeed();
    const speed = sprinting ? player.sprintSpeed : player.speed;
    moveWithWalls(player, moveX * speed * dt, moveY * speed * dt, 28);
    player.facingX = moveX;
    player.facingY = moveY;

    if (sprinting) {
      player.stamina = Math.max(0, player.stamina - getPlayerSprintStaminaCost() * dt);
    }

    if (Math.abs(moveX) > Math.abs(moveY)) {
      player.direction = moveX > 0 ? "right" : "left";
    } else {
      player.direction = moveY > 0 ? "down" : "up";
    }
  }

  if (!sprinting) {
    player.stamina = Math.min(maxStamina, player.stamina + getPlayerStaminaRegen() * dt);
  }

  if (player.attackTimer > 0) {
    player.attackTimer = Math.max(0, player.attackTimer - dt);
    setAction(player, "whipping");
  } else if (moving) {
    setAction(player, sprinting ? "sprinting" : "walking");
  } else {
    updatePlayerRestAnimation(player, dt);
    updatePlayerTrail();
    updatePlayerStatusHud();
    return;
  }

  const frames = getIvanFrames(player.action);
  if (frames.length > 0) {
    advanceAnimation(player, frames.length, getPlayerFrameDuration(player.action), dt);
  }
  updatePlayerTrail();
  updatePlayerStatusHud();
}

function cryingActionForHits(hitCount) {
  if (hitCount <= 0) {
    return "";
  }

  return `crying${Math.min(hitCount, 3)}`;
}

function getMattHitAction(matt) {
  const frameSet = images[matt.assetKey || matt.type] || images[matt.type] || {};

  if (matt.type === "dogmatt") {
    return cryingActionForHits(matt.hitCount);
  }

  if (matt.boss && !frameSet.hit) {
    return matt.awakened && frameSet.walking?.length > 0 ? "walking" : "idle";
  }

  if (frameSet.hit && frameSet.hit.length > 0) {
    return "hit";
  }

  if (frameSet.attack && frameSet.attack.length > 0) {
    return "attack";
  }

  return "idle";
}

function facePlayer(matt) {
  matt.direction = state.player.x < matt.x ? "left" : "right";
}

function knockOutPlayer() {
  const maxHealth = getPlayerMaxHealth();
  const maxStamina = getPlayerMaxStamina();

  keys.clear();
  touchInput.sprint = false;
  resetTouchJoystick();

  if (state.currentWorld !== INN_RECOVERY_WORLD_ID) {
    setWorld(INN_RECOVERY_WORLD_ID, false);
  }

  state.player.x = clamp(INN_RECOVERY_POINT.x, 0, getMapWidth());
  state.player.y = clamp(INN_RECOVERY_POINT.y, 0, getMapHeight());
  state.player.health = maxHealth;
  state.player.stamina = maxStamina;
  state.player.damageCooldown = PLAYER.damageInvulnerableTime;
  state.player.attackTimer = 0;
  state.player.moving = false;
  setAction(state.player, "breathing");
  seedPlayerTrail();
  syncCamera();
  addScreenShake(12);
  setGameMessage(INN_RECOVERY_MESSAGE, 7200);
  updatePlayerStatusHud();
  draw();
}

function damagePlayer(amount, sourceMatt) {
  if (state.player.damageCooldown > 0 || state.player.health <= 0) {
    return "ignored";
  }

  const damage = Math.max(1, Math.round(amount * (1 - getArmorDamageReduction())));
  state.player.health = Math.max(0, state.player.health - damage);
  state.player.damageCooldown = PLAYER.damageInvulnerableTime * (1 + getSkillBonus("evasive_stride", 0.1));
  addScreenShake(7);
  setGameMessage(`Lv ${getMattLevel(sourceMatt)} ${sourceMatt.name || MATT_LABELS[sourceMatt.type] || "Matt"} hit Ivan for ${damage}.`);
  updatePlayerStatusHud();

  if (state.player.health <= 0) {
    knockOutPlayer();
    return "defeated";
  }

  return "damaged";
}

function drainPlayerStamina(amount) {
  if (!amount) {
    return;
  }

  state.player.stamina = Math.max(0, (state.player.stamina || 0) - amount);
  updatePlayerStatusHud();
}

function knockPlayerAwayFrom(point, amount) {
  if (!amount) {
    return;
  }

  const dx = state.player.x - point.x;
  const dy = state.player.y - point.y;
  const distance = Math.hypot(dx, dy) || 1;
  moveWithWalls(state.player, (dx / distance) * amount, (dy / distance) * amount, 28);
  seedPlayerTrail();
}

function angleDifference(a, b) {
  return Math.atan2(Math.sin(a - b), Math.cos(a - b));
}

function getPrimeAttackTarget(matt) {
  return matt.attackTarget || { x: state.player.x, y: state.player.y };
}

function isPlayerHitByMattAttack(matt, attack) {
  const dx = state.player.x - matt.x;
  const dy = state.player.y - matt.y;
  const distance = Math.hypot(dx, dy) || 1;

  if (attack.hitShape === "cone") {
    const target = getPrimeAttackTarget(matt);
    const attackAngle = Math.atan2(target.y - matt.y, target.x - matt.x);
    const playerAngle = Math.atan2(dy, dx);
    const arc = attack.coneArc || Math.PI * 0.65;
    return distance <= (attack.attackRadius || 0) && Math.abs(angleDifference(playerAngle, attackAngle)) <= arc / 2;
  }

  if (attack.hitShape === "beam") {
    const target = getPrimeAttackTarget(matt);
    const beamDistance = distanceToSegment(state.player, matt, target);
    return beamDistance <= (attack.beamWidth || 72) || Math.hypot(state.player.x - target.x, state.player.y - target.y) <= 88;
  }

  if (attack.hitShape === "targetCircle") {
    const target = getPrimeAttackTarget(matt);
    return Math.hypot(state.player.x - target.x, state.player.y - target.y) <= (attack.attackRadius || 120);
  }

  if (attack.hitShape === "charge") {
    const target = getPrimeAttackTarget(matt);
    const chargeDistance = distanceToSegment(state.player, matt, target);
    return (
      chargeDistance <= (attack.beamWidth || 120) ||
      Math.hypot(state.player.x - target.x, state.player.y - target.y) <= 130
    );
  }

  return distance <= (attack.attackRadius || 0) + 42;
}

function getBossPressure(matt) {
  if (!matt?.boss) {
    return 0;
  }

  const threshold = Math.max(1, getCaptureHitThreshold(matt) - 1);
  return clamp((Math.max(0, Number(matt.hitCount) || 0)) / threshold, 0, 1);
}

function getPrimeAttackPalette(matt, attack = {}) {
  if (attack.effect?.includes("mystic") || attack.effect === "teleportBlast" || matt?.assetKey === "primemysticmatt") {
    return {
      main: "rgba(196, 111, 255, 0.92)",
      alt: "rgba(244, 209, 255, 0.86)",
      dark: "rgba(82, 29, 137, 0.68)",
    };
  }
  if (matt?.type === "firematt") {
    return {
      main: "rgba(255, 111, 53, 0.92)",
      alt: "rgba(255, 223, 140, 0.86)",
      dark: "rgba(157, 45, 28, 0.66)",
    };
  }
  if (matt?.type === "rockmatt") {
    return {
      main: "rgba(220, 198, 157, 0.9)",
      alt: "rgba(255, 238, 188, 0.82)",
      dark: "rgba(93, 83, 70, 0.62)",
    };
  }
  if (matt?.type === "watermatt") {
    return {
      main: "rgba(91, 212, 255, 0.9)",
      alt: "rgba(214, 250, 255, 0.84)",
      dark: "rgba(32, 96, 145, 0.62)",
    };
  }

  return {
    main: "rgba(151, 255, 111, 0.9)",
    alt: "rgba(245, 255, 161, 0.82)",
    dark: "rgba(58, 127, 53, 0.62)",
  };
}

function spawnPrimeAttackAmbient(matt, attack, target, originX, originY) {
  if (!matt?.boss) {
    return;
  }

  const palette = getPrimeAttackPalette(matt, attack);
  const angle = Math.atan2(target.y - matt.y, target.x - matt.x);
  const distance = Math.hypot(target.x - matt.x, target.y - matt.y);
  const ringCount = attack.hitShape === "targetCircle" || attack.effect === "mysticPull" ? 3 : 1;

  for (let i = 0; i < ringCount; i += 1) {
    addParticle({
      type: "ring",
      x: i === 0 ? target.x : originX,
      y: i === 0 ? target.y : originY,
      vx: 0,
      vy: 0,
      life: 0.36 + i * 0.08,
      size: 40 + i * 38,
      color: i % 2 === 0 ? palette.main : palette.alt,
    });
  }

  if (attack.hitShape === "beam" || attack.hitShape === "charge" || attack.effect === "teleportBlast") {
    addParticle({
      type: "beam",
      x: originX,
      y: originY,
      x2: target.x,
      y2: target.y - 30,
      life: 0.24,
      size: attack.beamWidth ? Math.min(42, attack.beamWidth * 0.32) : 28,
      color: palette.main,
    });
  }

  for (let i = 0; i < 10; i += 1) {
    const along = distance > 0 ? randomBetween(0.18, 0.92) * distance : 0;
    const side = randomBetween(-70, 70);
    const perp = angle + Math.PI / 2;
    addParticle({
      type: "spark",
      x: originX + Math.cos(angle) * along + Math.cos(perp) * side,
      y: originY + Math.sin(angle) * along + Math.sin(perp) * side,
      vx: Math.cos(angle) * randomBetween(20, 130) + Math.cos(perp) * randomBetween(-60, 60),
      vy: Math.sin(angle) * randomBetween(20, 130) + Math.sin(perp) * randomBetween(-60, 60) - randomBetween(20, 90),
      gravity: randomBetween(40, 190),
      life: randomBetween(0.32, 0.72),
      size: randomBetween(4, 10),
      color: Math.random() < 0.55 ? palette.main : palette.alt,
    });
  }
}

function spawnPrimeAttackWindupEffect(matt, attack, dt) {
  if (!matt?.boss || !attack) {
    return;
  }

  matt.primeWindupParticleTimer = Math.max(0, (matt.primeWindupParticleTimer || 0) - dt);
  if (matt.primeWindupParticleTimer > 0) {
    return;
  }

  matt.primeWindupParticleTimer = 0.055;
  const palette = getPrimeAttackPalette(matt, attack);
  const target = getPrimeAttackTarget(matt);
  const originX = matt.x;
  const originY = matt.y - 62 * (Number(matt.scale) || 1);
  const angle = Math.atan2(target.y - matt.y, target.x - matt.x);
  const radius = randomBetween(48, 130);

  addParticle({
    type: "spark",
    x: originX + Math.cos(angle + randomBetween(-1.4, 1.4)) * radius,
    y: originY + Math.sin(angle + randomBetween(-1.4, 1.4)) * radius,
    vx: Math.cos(angle) * randomBetween(30, 110),
    vy: Math.sin(angle) * randomBetween(30, 110) - randomBetween(10, 70),
    gravity: randomBetween(20, 120),
    life: randomBetween(0.34, 0.62),
    size: randomBetween(4, 9),
    color: Math.random() < 0.5 ? palette.main : palette.alt,
  });

  if (attack.hitShape === "targetCircle" || attack.effect === "mysticPull") {
    addParticle({
      type: "ring",
      x: target.x + randomBetween(-30, 30),
      y: target.y + randomBetween(-30, 30),
      vx: 0,
      vy: 0,
      life: 0.22,
      size: randomBetween(16, 34),
      color: palette.dark,
    });
  }
}

function clearPrimeMysticGravityWell() {
  state.primeMysticGravityWell = null;
  state.dogmatts.forEach((matt) => {
    matt.mysticBerserkTimer = 0;
    matt.mysticBerserkCooldown = 0;
  });
}

function startPrimeMysticGravityWell(matt, attack) {
  const duration = attack.gravityDuration || PRIME_MYSTIC_GRAVITY_WELL.duration;
  state.primeMysticGravityWell = {
    bossId: matt.id,
    x: matt.x,
    y: matt.y,
    life: duration,
    maxLife: duration,
    radius: attack.gravityRadius || PRIME_MYSTIC_GRAVITY_WELL.radius,
    pullStrength: attack.pullStrength || PRIME_MYSTIC_GRAVITY_WELL.pullStrength,
    pulseTimer: 0,
    messageShown: false,
  };

  state.dogmatts.forEach((candidate) => {
    if (candidate.caught && !candidate.arenaBattler && !candidate.arenaOpponent) {
      candidate.mysticBerserkTimer = duration;
      candidate.mysticBerserkCooldown = 0;
      candidate.caughtAnimationPaused = false;
    }
  });
}

function getPrimeMysticTeleportPoint(matt, distance = 165) {
  const angleToBoss = Math.atan2(matt.y - state.player.y, matt.x - state.player.x);
  const options = [0, Math.PI * 0.42, -Math.PI * 0.42, Math.PI * 0.82, -Math.PI * 0.82];

  for (const offset of options) {
    const angle = angleToBoss + offset;
    const x = clamp(state.player.x + Math.cos(angle) * distance, 80, getMapWidth() - 80);
    const y = clamp(state.player.y + Math.sin(angle) * distance, 80, getMapHeight() - 80);
    if (Math.hypot(x - state.player.x, y - state.player.y) > 82) {
      return { x, y };
    }
  }

  return {
    x: clamp(state.player.x + distance, 80, getMapWidth() - 80),
    y: clamp(state.player.y, 80, getMapHeight() - 80),
  };
}

function spawnPrimeMysticTeleportBurst(x, y, size = 78) {
  for (let i = 0; i < 3; i += 1) {
    addParticle({
      type: "ring",
      x,
      y: y - 36,
      vx: 0,
      vy: 0,
      life: 0.34 + i * 0.09,
      size: size + i * 42,
      color: i % 2 === 0 ? "rgba(196, 111, 255, 0.9)" : "rgba(244, 209, 255, 0.78)",
    });
  }

  for (let i = 0; i < 28; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    addParticle({
      type: i % 4 === 0 ? "slash" : "spark",
      x: x + Math.cos(angle) * randomBetween(8, 62),
      y: y - randomBetween(12, 90) + Math.sin(angle) * randomBetween(8, 54),
      vx: Math.cos(angle) * randomBetween(110, 360),
      vy: Math.sin(angle) * randomBetween(110, 360) - randomBetween(80, 220),
      gravity: 330,
      life: randomBetween(0.32, 0.74),
      size: randomBetween(8, 24),
      color: Math.random() < 0.55 ? "rgba(196, 111, 255, 0.92)" : "rgba(244, 209, 255, 0.88)",
      rotation: angle,
      spin: randomBetween(-5, 5),
    });
  }
}

function performPrimeMysticTeleportBlast(matt, attack) {
  spawnPrimeMysticTeleportBurst(matt.x, matt.y, 58);
  const destination = getPrimeMysticTeleportPoint(matt);
  matt.x = destination.x;
  matt.y = destination.y;
  matt.attackTarget = { x: state.player.x, y: state.player.y };
  matt.activeAttack = { ...attack, action: "swipe", hitShape: "circle", effect: "mysticSwipe" };
  matt.frameIndex = 0;
  matt.frameTimer = 0;
  facePlayer(matt);
  setAction(matt, "swipe");
  spawnPrimeMysticTeleportBurst(matt.x, matt.y, 86);
  spawnPrimeAttackEffect(matt, { ...attack, effect: "mysticSwipe", hitShape: "circle" });
  addScreenShake(attack.screenShake || 24);

  if (!isPlayerHitByMattAttack(matt, { ...attack, hitShape: "circle", attackRadius: attack.attackRadius || 390 })) {
    return;
  }

  if (damagePlayer(getWildMattAttackDamage(matt, attack), matt) === "defeated") {
    return;
  }
  drainPlayerStamina(attack.staminaDamage || 0);
  knockPlayerAwayFrom(matt, attack.knockback || 0);
}

function addImageProjectile(imageKey, x, y, angle, speed, size, life) {
  addParticle({
    type: "image",
    imageKey,
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life,
    size,
    rotation: angle + Math.PI / 2,
  });
}

function spawnPrimeAttackEffect(matt, attack) {
  const target = getPrimeAttackTarget(matt);
  const originX = matt.x;
  const originY = matt.y - 60 * (Number(matt.scale) || 1);
  spawnPrimeAttackAmbient(matt, attack, target, originX, originY);

  if (attack.effect === "mysticSwipe") {
    const centerAngle = Math.atan2(target.y - matt.y, target.x - matt.x);
    for (let i = 0; i < 9; i += 1) {
      const angle = centerAngle + randomBetween(-0.7, 0.7);
      addParticle({
        type: "slash",
        x: matt.x + Math.cos(centerAngle) * randomBetween(90, 260),
        y: matt.y - randomBetween(30, 110) + Math.sin(centerAngle) * randomBetween(40, 190),
        vx: Math.cos(angle) * randomBetween(130, 340),
        vy: Math.sin(angle) * randomBetween(130, 340) - randomBetween(20, 100),
        life: randomBetween(0.18, 0.34),
        size: randomBetween(28, 58),
        color: Math.random() < 0.5 ? "rgba(196, 111, 255, 0.94)" : "rgba(244, 209, 255, 0.9)",
        rotation: angle,
        spin: randomBetween(-4, 4),
      });
    }
    addScreenShake(attack.screenShake || 14);
    return;
  }

  if (attack.effect === "mysticPull") {
    const radius = attack.gravityRadius || PRIME_MYSTIC_GRAVITY_WELL.radius;
    for (let i = 0; i < 6; i += 1) {
      addParticle({
        type: "ring",
        x: matt.x,
        y: matt.y - 18,
        vx: 0,
        vy: 0,
        life: 0.72 + i * 0.08,
        size: 80 + i * (radius / 9),
        color: i % 2 === 0 ? "rgba(196, 111, 255, 0.8)" : "rgba(80, 34, 143, 0.72)",
      });
    }
    for (let i = 0; i < 42; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const distance = randomBetween(120, radius);
      addParticle({
        type: "spark",
        x: matt.x + Math.cos(angle) * distance,
        y: matt.y + Math.sin(angle) * distance - randomBetween(0, 80),
        vx: -Math.cos(angle) * randomBetween(160, 420),
        vy: -Math.sin(angle) * randomBetween(160, 420) - randomBetween(20, 120),
        gravity: 110,
        life: randomBetween(0.68, 1.35),
        size: randomBetween(5, 14),
        color: Math.random() < 0.55 ? "rgba(196, 111, 255, 0.92)" : "rgba(244, 209, 255, 0.86)",
      });
    }
    addScreenShake(attack.screenShake || 20);
    return;
  }

  if (attack.effect === "teleportBlast") {
    spawnPrimeMysticTeleportBurst(target.x, target.y, 64);
    addScreenShake(attack.screenShake || 18);
    return;
  }

  if (attack.effect === "surgeBite") {
    const centerAngle = Math.atan2(target.y - matt.y, target.x - matt.x);
    for (let i = 0; i < 6; i += 1) {
      addParticle({
        type: "slash",
        x: originX + Math.cos(centerAngle) * (70 + i * 16),
        y: matt.y - 42 + Math.sin(centerAngle) * (70 + i * 16),
        vx: Math.cos(centerAngle) * randomBetween(120, 260),
        vy: Math.sin(centerAngle) * randomBetween(120, 260) - 26,
        life: 0.22 + i * 0.02,
        size: 46 + i * 8,
        color: i % 2 === 0 ? "rgba(99, 217, 255, 0.94)" : "rgba(213, 249, 255, 0.9)",
        rotation: centerAngle + (i - 2.5) * 0.14,
      });
    }
    for (let i = 0; i < 14; i += 1) {
      const angle = centerAngle + randomBetween(-0.9, 0.9);
      addParticle({
        type: "spark",
        x: target.x + randomBetween(-34, 34),
        y: target.y - randomBetween(8, 56),
        vx: Math.cos(angle) * randomBetween(90, 270),
        vy: Math.sin(angle) * randomBetween(80, 230) - randomBetween(60, 170),
        gravity: 260,
        life: randomBetween(0.32, 0.68),
        size: randomBetween(6, 14),
        color: "rgba(91, 201, 255, 0.9)",
      });
    }
    addScreenShake(attack.screenShake || 9);
    return;
  }

  if (attack.effect === "tidalLance") {
    addParticle({
      type: "beam",
      x: originX,
      y: originY,
      x2: target.x,
      y2: target.y - 28,
      vx: 0,
      vy: 0,
      life: 0.34,
      size: attack.beamWidth || 92,
      color: "rgba(99, 221, 255, 0.86)",
    });
    const angle = Math.atan2(target.y - originY, target.x - originX);
    const length = Math.hypot(target.x - originX, target.y - originY);
    for (let i = 0; i < 26; i += 1) {
      const along = randomBetween(40, length);
      const side = randomBetween(-48, 48);
      const perp = angle + Math.PI / 2;
      addParticle({
        type: "spark",
        x: originX + Math.cos(angle) * along + Math.cos(perp) * side,
        y: originY + Math.sin(angle) * along + Math.sin(perp) * side,
        vx: Math.cos(angle) * randomBetween(80, 240),
        vy: Math.sin(angle) * randomBetween(80, 240) - randomBetween(30, 130),
        gravity: 160,
        life: randomBetween(0.3, 0.66),
        size: randomBetween(7, 16),
        color: Math.random() < 0.5 ? "rgba(74, 184, 255, 0.86)" : "rgba(211, 249, 255, 0.88)",
      });
    }
    addScreenShake(attack.screenShake || 12);
    return;
  }

  if (attack.effect === "bubbleCage") {
    addParticle({
      type: "ring",
      x: target.x,
      y: target.y,
      vx: 0,
      vy: 0,
      life: 0.58,
      size: 58,
      color: "rgba(151, 232, 255, 0.9)",
    });
    addParticle({
      type: "ring",
      x: target.x,
      y: target.y,
      vx: 0,
      vy: 0,
      life: 0.76,
      size: attack.attackRadius || 170,
      color: "rgba(84, 190, 255, 0.58)",
    });
    for (let i = 0; i < 24; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = randomBetween(26, attack.attackRadius || 170);
      addParticle({
        type: "ring",
        x: target.x + Math.cos(angle) * radius,
        y: target.y + Math.sin(angle) * radius - randomBetween(4, 54),
        vx: Math.cos(angle) * randomBetween(10, 70),
        vy: -randomBetween(40, 130),
        gravity: -40,
        life: randomBetween(0.42, 0.9),
        size: randomBetween(7, 20),
        color: "rgba(168, 237, 255, 0.72)",
      });
    }
    addScreenShake(attack.screenShake || 9);
    return;
  }

  if (attack.effect === "moonTide") {
    for (let i = 0; i < 5; i += 1) {
      addParticle({
        type: "ring",
        x: matt.x,
        y: matt.y,
        vx: 0,
        vy: 0,
        life: 0.62 + i * 0.08,
        size: 88 + i * 70,
        color: i % 2 === 0 ? "rgba(78, 192, 255, 0.74)" : "rgba(232, 253, 255, 0.62)",
      });
    }
    for (let i = 0; i < 34; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = randomBetween(70, attack.attackRadius || 620);
      addParticle({
        type: "spark",
        x: matt.x + Math.cos(angle) * radius,
        y: matt.y + Math.sin(angle) * radius - randomBetween(8, 64),
        vx: Math.cos(angle) * randomBetween(60, 230),
        vy: Math.sin(angle) * randomBetween(60, 230) - randomBetween(80, 220),
        gravity: 260,
        life: randomBetween(0.38, 0.82),
        size: randomBetween(8, 18),
        color: Math.random() < 0.55 ? "rgba(81, 191, 255, 0.88)" : "rgba(225, 251, 255, 0.86)",
      });
    }
    addScreenShake(attack.screenShake || 18);
    return;
  }

  if (attack.effect === "fireBreath") {
    const centerAngle = Math.atan2(target.y - matt.y, target.x - matt.x);
    const arc = attack.coneArc || Math.PI * 0.55;
    for (let i = 0; i < 34; i += 1) {
      const angle = centerAngle - arc / 2 + arc * Math.random();
      const speed = randomBetween(360, 780);
      const reach = randomBetween(46, 112);
      addParticle({
        type: "spark",
        x: originX + Math.cos(angle) * reach,
        y: originY + Math.sin(angle) * reach,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - randomBetween(20, 90),
        gravity: randomBetween(60, 180),
        life: randomBetween(0.32, 0.68),
        size: randomBetween(12, 28),
        color: Math.random() < 0.45 ? "rgba(255, 224, 104, 0.96)" : "rgba(255, 82, 43, 0.95)",
      });
    }
    addParticle({
      type: "beam",
      x: originX,
      y: originY,
      x2: target.x,
      y2: target.y - 34,
      life: 0.22,
      size: 58,
      color: "rgba(255, 94, 42, 0.88)",
    });
    addScreenShake(attack.screenShake || 10);
    return;
  }

  if (attack.effect === "tailFireWall") {
    const centerAngle = Math.atan2(target.y - matt.y, target.x - matt.x);
    const perp = centerAngle + Math.PI / 2;
    const wallCenterX = matt.x + Math.cos(centerAngle) * 285;
    const wallCenterY = matt.y + Math.sin(centerAngle) * 285;
    const wallHalf = 340;
    addParticle({
      type: "beam",
      x: wallCenterX + Math.cos(perp) * wallHalf,
      y: wallCenterY + Math.sin(perp) * wallHalf,
      x2: wallCenterX - Math.cos(perp) * wallHalf,
      y2: wallCenterY - Math.sin(perp) * wallHalf,
      life: 0.44,
      size: 82,
      color: "rgba(255, 110, 35, 0.92)",
    });
    for (let i = 0; i < 28; i += 1) {
      const offset = randomBetween(-wallHalf, wallHalf);
      addParticle({
        type: "spark",
        x: wallCenterX + Math.cos(perp) * offset,
        y: wallCenterY + Math.sin(perp) * offset,
        vx: Math.cos(centerAngle) * randomBetween(70, 210),
        vy: Math.sin(centerAngle) * randomBetween(70, 210) - randomBetween(110, 250),
        gravity: 360,
        life: randomBetween(0.36, 0.74),
        size: randomBetween(10, 24),
        color: Math.random() < 0.5 ? "rgba(255, 205, 82, 0.96)" : "rgba(255, 64, 35, 0.95)",
      });
    }
    addScreenShake(attack.screenShake || 12);
    return;
  }

  if (attack.effect === "emberSwipe") {
    const centerAngle = Math.atan2(target.y - matt.y, target.x - matt.x);
    for (let i = 0; i < 5; i += 1) {
      addParticle({
        type: "slash",
        x: originX + Math.cos(centerAngle) * (80 + i * 18),
        y: matt.y - 44 + Math.sin(centerAngle) * (80 + i * 18),
        vx: Math.cos(centerAngle) * randomBetween(120, 240),
        vy: Math.sin(centerAngle) * randomBetween(120, 240) - 30,
        life: 0.22 + i * 0.025,
        size: 48 + i * 8,
        color: "rgba(255, 160, 58, 0.94)",
        rotation: centerAngle + (i - 2) * 0.18,
      });
    }
    addScreenShake(attack.screenShake || 8);
    return;
  }

  if (attack.effect === "magmaRoar") {
    for (let i = 0; i < 5; i += 1) {
      addParticle({
        type: "ring",
        x: matt.x,
        y: matt.y,
        vx: 0,
        vy: 0,
        life: 0.52 + i * 0.07,
        size: 92 + i * 68,
        color: i % 2 === 0 ? "rgba(255, 95, 45, 0.88)" : "rgba(255, 214, 91, 0.78)",
      });
    }
    for (let i = 0; i < 30; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      addParticle({
        type: "spark",
        x: matt.x + Math.cos(angle) * randomBetween(36, 160),
        y: matt.y + Math.sin(angle) * randomBetween(20, 120),
        vx: Math.cos(angle) * randomBetween(180, 460),
        vy: Math.sin(angle) * randomBetween(180, 460) - randomBetween(120, 260),
        gravity: 420,
        life: randomBetween(0.42, 0.86),
        size: randomBetween(8, 22),
        color: "rgba(255, 104, 42, 0.94)",
      });
    }
    addScreenShake(attack.screenShake || 16);
    return;
  }

  if (attack.effect === "granitePunch") {
    const centerAngle = Math.atan2(target.y - matt.y, target.x - matt.x);
    const impactX = matt.x + Math.cos(centerAngle) * 190;
    const impactY = matt.y + Math.sin(centerAngle) * 190;
    addParticle({
      type: "ring",
      x: impactX,
      y: impactY,
      vx: 0,
      vy: 0,
      life: 0.34,
      size: 54,
      color: "rgba(218, 205, 176, 0.9)",
    });
    for (let i = 0; i < 16; i += 1) {
      const angle = centerAngle + randomBetween(-1.2, 1.2);
      addParticle({
        type: "spark",
        x: impactX + randomBetween(-28, 28),
        y: impactY - randomBetween(18, 64),
        vx: Math.cos(angle) * randomBetween(130, 360),
        vy: Math.sin(angle) * randomBetween(90, 280) - randomBetween(80, 210),
        gravity: 520,
        life: randomBetween(0.36, 0.7),
        size: randomBetween(5, 12),
        color: Math.random() < 0.5 ? "rgba(184, 173, 148, 0.92)" : "rgba(237, 223, 180, 0.9)",
      });
    }
    addScreenShake(attack.screenShake || 10);
    return;
  }

  if (attack.effect === "rockThrow") {
    const targetY = target.y - 38;
    const angle = Math.atan2(targetY - originY, target.x - originX);
    const distance = Math.hypot(target.x - originX, targetY - originY);
    const speed = attack.projectileSpeed || 820;
    addImageProjectile("primeRockThrow", originX, originY, angle, speed, 118, clamp(distance / speed + 0.18, 0.42, 1.15));
    addParticle({
      type: "ring",
      x: target.x,
      y: target.y,
      vx: 0,
      vy: 0,
      life: 0.52,
      size: 42,
      color: "rgba(218, 205, 176, 0.85)",
    });
    for (let i = 0; i < 18; i += 1) {
      const sprayAngle = Math.random() * Math.PI * 2;
      addParticle({
        type: "spark",
        x: target.x + randomBetween(-30, 30),
        y: target.y - randomBetween(8, 44),
        vx: Math.cos(sprayAngle) * randomBetween(80, 320),
        vy: Math.sin(sprayAngle) * randomBetween(80, 320) - randomBetween(100, 240),
        gravity: 560,
        life: randomBetween(0.4, 0.82),
        size: randomBetween(5, 13),
        color: "rgba(196, 184, 158, 0.92)",
      });
    }
    addScreenShake(attack.screenShake || 12);
    return;
  }

  if (attack.effect === "rollingCrush") {
    const centerAngle = Math.atan2(target.y - matt.y, target.x - matt.x);
    const chargeLength = Math.min(attack.attackRadius || 650, Math.hypot(target.x - matt.x, target.y - matt.y) + 130);
    const endX = matt.x + Math.cos(centerAngle) * chargeLength;
    const endY = matt.y + Math.sin(centerAngle) * chargeLength;
    addParticle({
      type: "beam",
      x: matt.x,
      y: matt.y - 18,
      x2: endX,
      y2: endY - 18,
      life: 0.34,
      size: attack.beamWidth || 140,
      color: "rgba(190, 181, 156, 0.62)",
    });
    for (let i = 0; i < 28; i += 1) {
      const along = randomBetween(40, chargeLength);
      const side = randomBetween(-80, 80);
      const perp = centerAngle + Math.PI / 2;
      addParticle({
        type: "spark",
        x: matt.x + Math.cos(centerAngle) * along + Math.cos(perp) * side,
        y: matt.y + Math.sin(centerAngle) * along + Math.sin(perp) * side - randomBetween(0, 36),
        vx: Math.cos(perp) * randomBetween(-120, 120),
        vy: randomBetween(-260, -80),
        gravity: 620,
        life: randomBetween(0.36, 0.74),
        size: randomBetween(7, 16),
        color: Math.random() < 0.5 ? "rgba(150, 143, 126, 0.9)" : "rgba(222, 209, 174, 0.88)",
      });
    }
    addScreenShake(attack.screenShake || 16);
    return;
  }

  if (attack.effect === "tombQuake") {
    for (let i = 0; i < 5; i += 1) {
      addParticle({
        type: "ring",
        x: matt.x,
        y: matt.y,
        vx: 0,
        vy: 0,
        life: 0.62 + i * 0.08,
        size: 92 + i * 72,
        color: i % 2 === 0 ? "rgba(177, 168, 146, 0.78)" : "rgba(246, 225, 166, 0.58)",
      });
    }
    for (let i = 0; i < 34; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = randomBetween(70, attack.attackRadius || 580);
      addParticle({
        type: "spark",
        x: matt.x + Math.cos(angle) * radius,
        y: matt.y + Math.sin(angle) * radius,
        vx: Math.cos(angle) * randomBetween(60, 220),
        vy: randomBetween(-360, -120),
        gravity: 680,
        life: randomBetween(0.45, 0.9),
        size: randomBetween(7, 18),
        color: "rgba(202, 190, 160, 0.9)",
      });
    }
    addScreenShake(attack.screenShake || 20);
    return;
  }

  if (attack.effect === "sporeBurst") {
    const count = attack.projectileCount || 16;
    for (let i = 0; i < count; i += 1) {
      const angle = (i / count) * Math.PI * 2;
      addImageProjectile(
        "primeSporeThorn",
        originX + Math.cos(angle) * 72,
        originY + Math.sin(angle) * 72,
        angle,
        attack.projectileSpeed || 560,
        92,
        0.82,
      );
    }
    addScreenShake(attack.screenShake || 8);
    return;
  }

  if (attack.effect === "thornFan") {
    const count = attack.projectileCount || 7;
    const centerAngle = Math.atan2(target.y - matt.y, target.x - matt.x);
    const arc = attack.coneArc || Math.PI * 0.62;
    for (let i = 0; i < count; i += 1) {
      const percent = count <= 1 ? 0.5 : i / (count - 1);
      const angle = centerAngle - arc / 2 + arc * percent;
      addImageProjectile(
        "primeThornFan",
        originX + Math.cos(angle) * 86,
        originY + Math.sin(angle) * 86,
        angle,
        attack.projectileSpeed || 640,
        112,
        0.78,
      );
    }
    addScreenShake(attack.screenShake || 8);
    return;
  }

  if (attack.effect === "rootSnare") {
    addParticle({
      type: "beam",
      x: originX,
      y: originY,
      x2: target.x,
      y2: target.y - 28,
      vx: 0,
      vy: 0,
      life: 0.36,
      size: attack.beamWidth || 78,
      color: "rgba(236, 255, 180, 0.94)",
    });
    addParticle({
      type: "ring",
      x: target.x,
      y: target.y,
      vx: 0,
      vy: 0,
      life: 0.42,
      size: 26,
      color: "rgba(236, 255, 180, 0.88)",
    });
    addScreenShake(attack.screenShake || 10);
    return;
  }

  if (attack.effect === "canopyQuake") {
    for (let i = 0; i < 4; i += 1) {
      addParticle({
        type: "ring",
        x: matt.x,
        y: matt.y,
        vx: 0,
        vy: 0,
        life: 0.7 + i * 0.08,
        size: 80 + i * 54,
        color: i % 2 === 0 ? "rgba(184, 255, 119, 0.78)" : "rgba(255, 244, 161, 0.72)",
      });
    }
    addScreenShake(attack.screenShake || 16);
    return;
  }

  if (attack.effect === "vineHammer") {
    addParticle({
      type: "ring",
      x: target.x,
      y: target.y,
      vx: 0,
      vy: 0,
      life: 0.36,
      size: 52,
      color: "rgba(138, 255, 99, 0.88)",
    });
    for (let i = 0; i < 8; i += 1) {
      const angle = (i / 8) * Math.PI * 2;
      addParticle({
        type: "slash",
        x: target.x + Math.cos(angle) * 22,
        y: target.y + Math.sin(angle) * 22,
        vx: Math.cos(angle) * 140,
        vy: Math.sin(angle) * 140,
        life: 0.24,
        size: 34,
        color: "rgba(183, 255, 112, 0.9)",
        rotation: angle,
      });
    }
    addScreenShake(attack.screenShake || 10);
  }
}

function applyMattAttackImpact(matt, attack) {
  spawnPrimeAttackEffect(matt, attack);

  if (attack.effect === "teleportBlast") {
    performPrimeMysticTeleportBlast(matt, attack);
    return;
  }

  if (attack.effect === "mysticPull") {
    startPrimeMysticGravityWell(matt, attack);
  }

  if (!isPlayerHitByMattAttack(matt, attack)) {
    return;
  }

  if (damagePlayer(getWildMattAttackDamage(matt, attack), matt) === "defeated") {
    return;
  }
  drainPlayerStamina(attack.staminaDamage || 0);
  knockPlayerAwayFrom(matt, attack.knockback || 0);
}

function chooseMattAttack(matt, config) {
  if (!Array.isArray(matt.attacks) || matt.attacks.length === 0) {
    return config;
  }

  const distance = Math.hypot(state.player.x - matt.x, state.player.y - matt.y);
  const scoredAttacks = matt.attacks
    .map((attack) => {
      const maxRange = attack.maxRange || attack.attackRadius || config.attackRadius || 0;
      const minRange = Math.max(0, attack.minRange || 0);
      if (distance > maxRange + 90 || distance < Math.max(0, minRange - 90)) {
        return { attack, score: 0 };
      }

      const sweetSpot = Number.isFinite(attack.sweetSpot)
        ? attack.sweetSpot
        : minRange + Math.max(1, maxRange - minRange) * 0.55;
      const rangeWidth = Math.max(1, maxRange - minRange);
      const rangeFit = clamp(1 - Math.abs(distance - sweetSpot) / rangeWidth, 0.18, 1);
      const repeatPenalty = attack.id && attack.id === matt.lastAttackId ? 0.28 : 1;
      return {
        attack,
        score: rangeFit * (attack.weight || 1) * repeatPenalty,
      };
    })
    .filter((entry) => entry.score > 0);
  const candidates = scoredAttacks.length > 0
    ? scoredAttacks
    : matt.attacks.map((attack) => ({ attack, score: attack.id === matt.lastAttackId ? 0.25 : 1 }));
  const totalScore = candidates.reduce((sum, entry) => sum + entry.score, 0) || 1;
  let roll = Math.random() * totalScore;
  let attack = candidates[candidates.length - 1].attack;

  for (const entry of candidates) {
    roll -= entry.score;
    if (roll <= 0) {
      attack = entry.attack;
      break;
    }
  }

  matt.lastAttackId = attack.id;
  matt.activeAttackId = attack.id;
  matt.activeAttackName = attack.name;
  return { ...config, ...attack };
}

function getMattAttackTriggerRadius(matt, config) {
  const baseRadius = config.attackRadius || 0;
  const specialRadius = Array.isArray(matt.attacks)
    ? Math.max(0, ...matt.attacks.map((attack) => attack.maxRange || attack.attackRadius || 0))
    : 0;
  return Math.max(baseRadius, specialRadius);
}

function startMattAttack(matt, config) {
  const attackConfig = chooseMattAttack(matt, config);
  matt.activeAttack = attackConfig;
  matt.attackTarget = { x: state.player.x, y: state.player.y };
  matt.attackTimer = Math.max(0.45, (attackConfig.attackWindup || 0.24) + 0.42);
  matt.attackElapsed = 0;
  matt.attackApplied = false;
  const pressureCooldownScale = matt.boss ? 1 - getBossPressure(matt) * 0.16 : 1;
  matt.attackCooldown = (attackConfig.attackCooldown || 1.8) * pressureCooldownScale;
  matt.frameIndex = 0;
  matt.frameTimer = 0;
  matt.primeWindupParticleTimer = 0;
  facePlayer(matt);
  setAction(matt, attackConfig.action || "attack");
}

function updateMattAttack(matt, config, distance, dt) {
  if (!config.attackDamage || !config.attackRadius) {
    return false;
  }

  matt.attackCooldown = Math.max(0, (matt.attackCooldown || 0) - dt);

  if (matt.attackTimer > 0) {
    matt.attackTimer = Math.max(0, matt.attackTimer - dt);
    matt.attackElapsed = (matt.attackElapsed || 0) + dt;
    facePlayer(matt);

    const activeAttack = matt.activeAttack || config;
    spawnPrimeAttackWindupEffect(matt, activeAttack, dt);
    setAction(matt, activeAttack.action || "attack");
    if (!matt.attackApplied && matt.attackElapsed >= (activeAttack.attackWindup || 0.24)) {
      matt.attackApplied = true;
      applyMattAttackImpact(matt, activeAttack);
    }

    return true;
  }

  if (distance <= getMattAttackTriggerRadius(matt, config) && matt.attackCooldown <= 0) {
    startMattAttack(matt, config);
    return true;
  }

  return false;
}

function isFiremattSpecialIdle(action) {
  return action === "idleNormal" || action === "idleHammer" || action === "idleNose";
}

function isMysticMattSpecialIdle(action) {
  return action === "mysticIdleStart" || action === "mysticIdleFloat" || action === "mysticIdleStop";
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
  if (action !== "idle") {
    setAction(matt, action);
    return;
  }

  if (matt.type === "firematt" && !matt.boss) {
    if (isFiremattSpecialIdle(matt.action)) {
      return;
    }

    matt.idleSpecialTimer = Math.max(0, (matt.idleSpecialTimer || 0) - dt);

    if (matt.idleSpecialTimer <= 0) {
      setAction(matt, getFiremattSpecialIdleAction(matt));
      return;
    }

    setAction(matt, "idle");
    return;
  }

  if (matt.type === "mysticmatt" && !matt.boss) {
    if (isMysticMattSpecialIdle(matt.action)) {
      return;
    }

    matt.idleSpecialTimer = Math.max(0, (matt.idleSpecialTimer || 0) - dt);

    if (matt.idleSpecialTimer <= 0) {
      matt.mysticFloatTimer = MYSTICMATT.floatDuration;
      setAction(matt, "mysticIdleStart");
      return;
    }

    setAction(matt, "idle");
    return;
  }

  setAction(matt, "idle");
}

function updateMattPathRoam(matt, path, config, dt) {
  if (!path || !Array.isArray(path.points) || path.points.length === 0) {
    return false;
  }

  const world = getWorld();
  const currentSpawnArea = getContainingSpawnArea(matt, world.spawnAreas);

  if (matt.pathPauseTimer > 0) {
    matt.pathPauseTimer = Math.max(0, matt.pathPauseTimer - dt);
    setWildMattBaseAction(matt, "idle", dt);
    return false;
  }

  if (!matt.pathDirection) {
    matt.pathDirection = Math.random() < 0.5 ? -1 : 1;
  }

  if (currentSpawnArea && matt.pathRoamMode !== "path") {
    matt.spawnAreaId = currentSpawnArea.id;
    matt.pathRoamMode = "spawn";

    if (
      !matt.pathRoamTarget ||
      !pointInRect(matt.pathRoamTarget, normalizeRect(currentSpawnArea)) ||
      Math.random() < dt * 0.08
    ) {
      if (Math.random() < 0.24) {
        reacquireMattPathTarget(matt, path);
      } else {
        matt.pathRoamTarget = chooseSpawnRoamTarget(currentSpawnArea);
      }
    }
  } else if (!matt.pathRoamTarget || matt.pathRoamMode !== "path") {
    reacquireMattPathTarget(matt, path);
  }

  const target = matt.pathRoamTarget;
  if (!target) {
    return false;
  }

  const dx = target.x - matt.x;
  const dy = target.y - matt.y;
  const distance = Math.hypot(dx, dy) || 1;

  if (distance < 26) {
    if (matt.pathRoamMode === "spawn" && currentSpawnArea) {
      if (Math.random() < 0.42) {
        matt.pathPauseTimer = 0.5 + Math.random() * 1.8;
      }

      if (Math.random() < 0.34) {
        reacquireMattPathTarget(matt, path);
      } else {
        matt.pathRoamTarget = chooseSpawnRoamTarget(currentSpawnArea);
      }
    } else {
      if (currentSpawnArea && Math.random() < 0.38) {
        matt.pathRoamMode = "spawn";
        matt.spawnAreaId = currentSpawnArea.id;
        matt.pathRoamTarget = chooseSpawnRoamTarget(currentSpawnArea);
      } else {
        if (Math.random() < 0.36) {
          matt.pathPauseTimer = 0.45 + Math.random() * 1.6;
        }

        setMattPathTarget(matt, path, getNextMattPathPointIndex(matt, path));
      }
    }

    return false;
  }

  const roamSpeed = config.wanderSpeed * (matt.pathRoamMode === "spawn" ? 0.78 : 1);
  const moveX = dx / distance;
  const moveY = dy / distance;
  matt.x = clamp(matt.x + moveX * roamSpeed * dt, 0, getMapWidth());
  matt.y = clamp(matt.y + moveY * roamSpeed * dt, 0, getMapHeight());
  matt.direction = moveX < 0 ? "left" : "right";
  return true;
}

function updateAwakenedBossMovement(matt, config, distance, dt) {
  if (!matt.boss || !matt.awakened || matt.attackTimer > 0) {
    return false;
  }

  matt.bossMoveTimer = Math.max(0, (matt.bossMoveTimer || 0) - dt);
  const safeDistance = distance || 1;
  const preferredDistance = matt.bossPreferredDistance || 360;
  const closeDistance = matt.bossCloseDistance || 220;
  const pressure = getBossPressure(matt);

  if (matt.bossMoveTimer <= 0) {
    const modes = safeDistance > preferredDistance * 1.45
      ? pressure > 0.45 ? ["rush", "rush", "rush", "flank"] : ["rush", "rush", "flank"]
      : safeDistance < closeDistance
        ? pressure > 0.55 ? ["retreat", "flank", "rush"] : ["retreat", "retreat", "flank"]
        : pressure > 0.55 ? ["orbit", "flank", "rush", "rush", "retreat"] : ["orbit", "flank", "rush", "retreat"];
    matt.bossMoveMode = modes[Math.floor(Math.random() * modes.length)];
    matt.bossOrbitDirection = Math.random() < 0.5 ? -1 : 1;
    const timerScale = 1 - pressure * 0.16;
    matt.bossMoveTimer = randomBetween(
      (matt.bossMoveIntervalMin || 0.8) * timerScale,
      (matt.bossMoveIntervalMax || 1.8) * timerScale,
    );
  }

  const toPlayerX = (state.player.x - matt.x) / safeDistance;
  const toPlayerY = (state.player.y - matt.y) / safeDistance;
  const orbitDirection = matt.bossOrbitDirection || 1;
  const tangentX = -toPlayerY * orbitDirection;
  const tangentY = toPlayerX * orbitDirection;
  let moveX = tangentX;
  let moveY = tangentY;
  let speed = (matt.bossWalkSpeed || config.wanderSpeed) * (1 + pressure * 0.12);

  if (matt.bossMoveMode === "rush") {
    moveX = toPlayerX * (1.05 + pressure * 0.12) + tangentX * 0.18;
    moveY = toPlayerY * (1.05 + pressure * 0.12) + tangentY * 0.18;
    speed = (matt.bossRushSpeed || speed * 1.25) * (1 + pressure * 0.08);
  } else if (matt.bossMoveMode === "retreat") {
    moveX = -toPlayerX * 0.82 + tangentX * 0.62;
    moveY = -toPlayerY * 0.82 + tangentY * 0.62;
    speed *= 1.1;
  } else if (matt.bossMoveMode === "flank") {
    moveX = tangentX * 1.18 + toPlayerX * (safeDistance > preferredDistance ? 0.36 : -0.18);
    moveY = tangentY * 1.18 + toPlayerY * (safeDistance > preferredDistance ? 0.36 : -0.18);
    speed *= 1.18;
  } else if (safeDistance > preferredDistance) {
    moveX = toPlayerX * 0.82 + tangentX * 0.42;
    moveY = toPlayerY * 0.82 + tangentY * 0.42;
  } else if (safeDistance < closeDistance) {
    moveX = -toPlayerX * 0.72 + tangentX * 0.68;
    moveY = -toPlayerY * 0.72 + tangentY * 0.68;
  }

  const magnitude = Math.hypot(moveX, moveY) || 1;
  const beforeX = matt.x;
  const beforeY = matt.y;
  moveWithWalls(matt, (moveX / magnitude) * speed * dt, (moveY / magnitude) * speed * dt, Math.max(36, config.width * 0.42));

  const moved = Math.hypot(matt.x - beforeX, matt.y - beforeY) > 0.5;
  if (!moved) {
    matt.bossOrbitDirection *= -1;
  } else {
    matt.direction = matt.x < beforeX ? "left" : "right";
  }

  setWildMattBaseAction(matt, "walking", dt);
  return moved;
}

function isBloodlustedMatt(matt, config = getMattConfig(matt?.type)) {
  return Boolean(matt?.bloodlusted || config.bloodlusted);
}

function updateBloodlustedMattMovement(matt, config, distance, dt) {
  if (matt.caught || matt.attackTimer > 0) {
    return false;
  }

  facePlayer(matt);

  const stopDistance = Math.max(72, (config.attackRadius || 140) * 0.72);
  if (distance <= stopDistance) {
    setWildMattBaseAction(matt, "walking", dt);
    return false;
  }

  const moveX = (state.player.x - matt.x) / distance;
  const moveY = (state.player.y - matt.y) / distance;
  const beforeX = matt.x;
  const beforeY = matt.y;
  moveWithWalls(
    matt,
    moveX * (config.chaseSpeed || config.wanderSpeed) * dt,
    moveY * (config.chaseSpeed || config.wanderSpeed) * dt,
    Math.max(32, config.width * 0.34),
  );
  matt.direction = matt.x < beforeX ? "left" : "right";
  setWildMattBaseAction(matt, "walking", dt);
  return Math.hypot(matt.x - beforeX, matt.y - beforeY) > 0.5;
}

function updateDormantBossRoam(matt, config, distance, dt) {
  if (!matt.boss || !matt.preBattleRoam || matt.awakened) {
    return false;
  }

  if (distance <= (matt.aggroRadius || config.noticeRadius)) {
    facePlayer(matt);
  }

  if (matt.pathPauseTimer > 0) {
    matt.pathPauseTimer = Math.max(0, matt.pathPauseTimer - dt);
    setAction(matt, "idle");
    return false;
  }

  matt.wanderTimer = Math.max(0, (matt.wanderTimer || 0) - dt);
  if (matt.wanderTimer <= 0) {
    if (Math.random() < 0.34) {
      matt.pathPauseTimer = randomBetween(0.85, 1.8);
      setAction(matt, "idle");
      return false;
    }

    const playerAngle = Math.atan2(state.player.y - matt.y, state.player.x - matt.x);
    matt.wanderAngle = Math.random() < 0.55 ? playerAngle + randomBetween(-1.25, 1.25) : Math.random() * Math.PI * 2;
    matt.wanderTimer = randomBetween(1.1, 2.7);
  }

  const moveX = Math.cos(matt.wanderAngle || 0);
  const moveY = Math.sin(matt.wanderAngle || 0);
  const beforeX = matt.x;
  const beforeY = matt.y;
  moveWithWalls(matt, moveX * (matt.bossWalkSpeed || config.wanderSpeed) * 0.68 * dt, moveY * (matt.bossWalkSpeed || config.wanderSpeed) * 0.68 * dt, Math.max(34, config.width * 0.4));
  if (Math.hypot(matt.x - beforeX, matt.y - beforeY) <= 0.5) {
    matt.wanderAngle = (matt.wanderAngle || 0) + Math.PI * 0.65;
    matt.wanderTimer = 0.4;
    setAction(matt, "idle");
    return false;
  }

  matt.direction = matt.x < beforeX ? "left" : "right";
  setAction(matt, "walking");
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
  dogmatt.pathPanicTimer = Math.max(0, (dogmatt.pathPanicTimer || 0) - dt);

  if (dogmatt.introPlaying) {
    setAction(dogmatt, dogmatt.introAction || "spawn");
    return;
  }

  if (dogmatt.rooted) {
    if (!dogmatt.awakened) {
      if (updateDormantBossRoam(dogmatt, config, distance, dt)) {
        return;
      }

      if (dogmatt.boss && dogmatt.preBattleRoam && dogmatt.pathPauseTimer > 0) {
        return;
      }

      setWildMattBaseAction(dogmatt, "idle", dt);
      return;
    }

    if (!dogmatt.caught && dogmatt.hitReactionTimer <= 0 && updateMattAttack(dogmatt, config, distance, dt)) {
      return;
    }

    if (distance <= (dogmatt.aggroRadius || config.noticeRadius)) {
      facePlayer(dogmatt);
    }

    if (dogmatt.hitReactionTimer > 0) {
      setAction(dogmatt, getMattHitAction(dogmatt));
    } else {
      updateAwakenedBossMovement(dogmatt, config, distance, dt);
      setWildMattBaseAction(dogmatt, dogmatt.boss ? "walking" : "idle", dt);
    }
    return;
  }

  if (dogmatt.pathPanicTimer > 0) {
    const moveX = dx / distance;
    const moveY = dy / distance;
    dogmatt.x = clamp(dogmatt.x + moveX * config.fleeSpeed * dt, 0, getMapWidth());
    dogmatt.y = clamp(dogmatt.y + moveY * config.fleeSpeed * dt, 0, getMapHeight());
    dogmatt.direction = moveX < 0 ? "left" : "right";
    moving = true;
  } else if (!dogmatt.caught && dogmatt.hitReactionTimer <= 0 && updateMattAttack(dogmatt, config, distance, dt)) {
    return;
  } else if (!dogmatt.caught && isBloodlustedMatt(dogmatt, config)) {
    moving = updateBloodlustedMattMovement(dogmatt, config, distance, dt);
  } else if (distance < config.fleeRadius) {
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

  if (dogmatt.hitReactionTimer > 0) {
    setAction(dogmatt, getMattHitAction(dogmatt));
  } else if (dogmatt.hitCount > 0 && dogmatt.type === "dogmatt") {
    setAction(dogmatt, cryingActionForHits(dogmatt.hitCount));
  } else if (moving) {
    setAction(dogmatt, "walking");
  }
}

function getFollowerMoveAction(matt) {
  const frameSet = images[matt.assetKey || matt.type] || images[matt.type] || {};
  return frameSet.walking?.length > 0 ? "walking" : "caught";
}

function getFollowerAttackAction(matt) {
  const frameSet = images[matt.assetKey || matt.type] || images[matt.type] || {};
  return frameSet.attack?.length > 0 ? "attack" : "caught";
}

function isFollowerCombatTarget(target, allowCalm = false) {
  if (!target || target.caught || target.arenaBattler || target.arenaOpponent || target.introPlaying) {
    return false;
  }

  if (!isFollowerCommandTargetCandidate(target)) {
    return false;
  }

  return allowCalm || Boolean(target.awakened || target.hitCount > 0 || target.hitReactionTimer > 0 || target.attackTimer > 0);
}

function getFollowerCombatTarget(follower) {
  if (!follower?.tamed || !follower.follower || state.arena.active || isIntroOpen() || isShopOpen() || isPauseMenuOpen()) {
    return null;
  }

  if (state.followerCommand.mode === "stay") {
    return null;
  }

  if (state.followerCommand.mode === "attack" && state.followerCommand.targetId) {
    const target = state.dogmatts.find((candidate) => candidate.id === state.followerCommand.targetId);
    if (target && isFollowerCommandTargetCandidate(target)) {
      const playerDistance = Math.hypot(target.x - state.player.x, target.y - state.player.y);
      const followerDistance = Math.hypot(target.x - follower.x, target.y - follower.y);
      const manualRange = target.boss ? FOLLOWER_ASSIST.leashRadius * 1.3 : FOLLOWER_ASSIST.leashRadius * 1.75;

      if (playerDistance <= manualRange || followerDistance <= manualRange) {
        return target;
      }
    }

    state.followerCommand.targetId = "";
    state.followerCommand.mode = "guard";
    updateFollowerCommandUi(true);
    setGameMessage(`${getCapturedMattDisplayName(follower)} lost the target and switched to guard.`);
    return null;
  }

  const guardMode = state.followerCommand.mode === "guard";
  let bestTarget = null;
  let bestScore = Infinity;

  for (const target of state.dogmatts) {
    if (target === follower || !isFollowerCombatTarget(target, guardMode)) {
      continue;
    }

    const playerDistance = Math.hypot(target.x - state.player.x, target.y - state.player.y);
    const followerDistance = Math.hypot(target.x - follower.x, target.y - follower.y);
    const searchRadius = guardMode
      ? FOLLOWER_ASSIST.searchRadius * 0.9
      : target.boss
        ? FOLLOWER_ASSIST.leashRadius
        : FOLLOWER_ASSIST.searchRadius;

    if (playerDistance > searchRadius && followerDistance > FOLLOWER_ASSIST.leashRadius) {
      continue;
    }

    const score = followerDistance + playerDistance * 0.35 - (target.boss ? 220 : 0);
    if (score < bestScore) {
      bestScore = score;
      bestTarget = target;
    }
  }

  return bestTarget;
}

function spawnFollowerStrikeEffect(follower, target) {
  const colors = {
    dogmatt: "rgba(255, 214, 128, 0.9)",
    firematt: "rgba(255, 112, 72, 0.92)",
    grassmatt: "rgba(132, 255, 105, 0.92)",
    watermatt: "rgba(104, 207, 255, 0.92)",
    rockmatt: "rgba(220, 190, 132, 0.92)",
    mysticmatt: "rgba(204, 153, 255, 0.92)",
  };
  const color = colors[follower.type] || "rgba(255, 238, 143, 0.92)";
  const angle = Math.atan2(target.y - follower.y, target.x - follower.x);

  addParticle({
    type: "beam",
    x: follower.x,
    y: follower.y - 44,
    x2: target.x,
    y2: target.y - 54,
    life: 0.18,
    size: 14,
    color,
  });
  addParticle({
    type: "ring",
    x: target.x,
    y: target.y - 34,
    vx: 0,
    vy: 0,
    life: 0.28,
    size: 44,
    color,
  });

  for (let i = 0; i < 10; i += 1) {
    const spread = angle + randomBetween(-0.9, 0.9);
    addParticle({
      type: "slash",
      x: target.x + Math.cos(spread) * randomBetween(4, 22),
      y: target.y - randomBetween(24, 76) + Math.sin(spread) * 12,
      vx: Math.cos(spread) * randomBetween(70, 190),
      vy: Math.sin(spread) * randomBetween(70, 190),
      life: randomBetween(0.14, 0.26),
      size: randomBetween(12, 28),
      color,
      rotation: spread,
      spin: randomBetween(-5, 5),
    });
  }
}

function getFollowerAssistRange() {
  return FOLLOWER_ASSIST.attackRange + getSkillBonus("follow_through", 35);
}

function getFollowerAssistCooldown() {
  return Math.max(0.48, FOLLOWER_ASSIST.strikeCooldown * (1 - getSkillBonus("pack_leader", 0.08)));
}

function getFollowerAssistBondFriendship() {
  return FOLLOWER_ASSIST.bondFriendship + getSkillBonus("follow_through", 1);
}

function getFollowerAssistBondXp() {
  return FOLLOWER_ASSIST.bondXp + getSkillBonus("pack_leader", 2) + getSkillBonus("follow_through", 1);
}

function rewardFollowerAssistBond(follower) {
  if (!follower.partyId || follower.assistBondTimer > 0) {
    return;
  }

  follower.assistBondTimer = FOLLOWER_ASSIST.bondCooldown;
  const result = applyCapturedMattProgress(follower.partyId, {
    friendship: getFollowerAssistBondFriendship(),
    xp: getFollowerAssistBondXp(),
  });

  if (result?.leveled) {
    setGameMessage(`${getCapturedMattDisplayName(result.matt)} grew to Lv ${result.matt.level} by fighting beside Ivan.`);
  }
}

function followerStrikeTarget(follower, target) {
  const captureHitThreshold = getCaptureHitThreshold(target);
  const previousHits = Math.max(0, Math.floor(Number(target.hitCount) || 0));
  const progressed = previousHits < captureHitThreshold - 1;
  target.hitCount = Math.min(captureHitThreshold - 1, previousHits + 1);
  target.hitCooldown = Math.max(target.hitCooldown || 0, 0.18);
  target.hitReactionTimer = Math.max(target.hitReactionTimer || 0, target.boss ? 0.24 : 0.34);
  if (target.boss) {
    target.attackCooldown = Math.min(target.attackCooldown || 0, 0.2);
    target.bossMoveTimer = 0;
  }
  target.pathPanicTimer = target.rooted ? 0 : Math.max(target.pathPanicTimer || 0, 1.8);
  target.pathRoamTarget = null;
  target.frameIndex = 0;
  target.frameTimer = 0;
  setAction(target, getMattHitAction(target));
  spawnFollowerStrikeEffect(follower, target);
  spawnHitEffect(target, Math.max(1, target.hitCount));
  addScreenShake(target.boss ? 7 : 3);
  if (progressed) {
    rewardFollowerAssistBond(follower);
  }

  follower.assistMessageTimer = Math.max(0, follower.assistMessageTimer || 0);
  if (follower.assistMessageTimer <= 0) {
    follower.assistMessageTimer = 3.8;
    setGameMessage(
      progressed
        ? `${getCapturedMattDisplayName(follower)} helped stagger ${target.name || MATT_LABELS[target.type] || "the Matt"}.`
        : `${target.name || MATT_LABELS[target.type] || "That Matt"} is ready for Ivan's capture strike.`,
    );
  }
}

function updateCombatFollower(follower, target, config, dt) {
  follower.assistCooldown = Math.max(0, (follower.assistCooldown || 0) - dt);
  follower.assistBondTimer = Math.max(0, (follower.assistBondTimer || 0) - dt);
  follower.assistMessageTimer = Math.max(0, (follower.assistMessageTimer || 0) - dt);

  const dx = target.x - follower.x;
  const dy = target.y - follower.y;
  const distance = Math.hypot(dx, dy) || 1;
  const assistRange = getFollowerAssistRange();

  if (distance > assistRange) {
    const speed = Math.min((config.followSpeed + 210) * dt, distance - assistRange + 18);
    follower.x = clamp(follower.x + (dx / distance) * speed, 0, getMapWidth());
    follower.y = clamp(follower.y + (dy / distance) * speed, 0, getMapHeight());
    follower.direction = dx < 0 ? "left" : "right";
    follower.caughtAnimationPaused = false;
    setAction(follower, getFollowerMoveAction(follower));
    return true;
  }

  follower.direction = dx < 0 ? "left" : "right";
  follower.caughtAnimationPaused = false;
  if (follower.assistCooldown <= 0) {
    follower.assistCooldown = getFollowerAssistCooldown();
    followerStrikeTarget(follower, target);
    setAction(follower, getFollowerAttackAction(follower));
  } else {
    setAction(follower, getCapturedMattTravelAction(follower));
  }

  return true;
}

function updateStayFollower(follower, config, dt) {
  if (!state.followerCommand.stayPoint) {
    state.followerCommand.stayPoint = { x: follower.x, y: follower.y };
  }

  const target = state.followerCommand.stayPoint;
  const dx = target.x - follower.x;
  const dy = target.y - follower.y;
  const distance = Math.hypot(dx, dy) || 1;

  if (distance > Math.max(18, config.followStopDistance * 0.75)) {
    const speed = Math.min((config.followSpeed + 90) * dt, distance);
    follower.x = clamp(follower.x + (dx / distance) * speed, 0, getMapWidth());
    follower.y = clamp(follower.y + (dy / distance) * speed, 0, getMapHeight());
    follower.direction = dx < 0 ? "left" : "right";
    follower.caughtAnimationPaused = false;
    setAction(follower, getFollowerMoveAction(follower));
    return true;
  }

  follower.caughtAnimationPaused = !shouldUseWildFollowerFrames(follower);
  setAction(follower, getCapturedMattRestAction(follower));
  if (follower.caughtAnimationPaused && shouldCapturedMattUseWalkingLoop(follower)) {
    follower.frameIndex = 0;
    follower.frameTimer = 0;
  }
  return true;
}

function pullEntityToward(entity, x, y, radius, strength, dt, collisionRadius = 28) {
  const dx = x - entity.x;
  const dy = y - entity.y;
  const distance = Math.hypot(dx, dy) || 1;
  if (distance > radius || distance < 24) {
    return false;
  }

  const falloff = clamp(1 - distance / radius, 0.08, 1);
  const amount = Math.min(distance - 18, strength * (0.35 + falloff) * dt);
  if (amount <= 0) {
    return false;
  }

  moveWithWalls(entity, (dx / distance) * amount, (dy / distance) * amount, collisionRadius);
  return true;
}

function spawnPrimeMysticGravityWellAmbient(well, dt) {
  well.pulseTimer = Math.max(0, (well.pulseTimer || 0) - dt);
  if (well.pulseTimer > 0) {
    return;
  }

  well.pulseTimer = 0.075;
  const progress = 1 - well.life / Math.max(1, well.maxLife);
  const swirl = progress * Math.PI * 4;

  if (Math.random() < 0.42) {
    addParticle({
      type: "ring",
      x: well.x,
      y: well.y - 18,
      vx: 0,
      vy: 0,
      life: 0.42,
      size: randomBetween(90, 210),
      color: Math.random() < 0.5 ? "rgba(196, 111, 255, 0.68)" : "rgba(74, 31, 134, 0.62)",
    });
  }

  for (let i = 0; i < 5; i += 1) {
    const angle = swirl + Math.random() * Math.PI * 2;
    const distance = randomBetween(120, well.radius || PRIME_MYSTIC_GRAVITY_WELL.radius);
    addParticle({
      type: "spark",
      x: well.x + Math.cos(angle) * distance,
      y: well.y + Math.sin(angle) * distance - randomBetween(12, 80),
      vx: -Math.cos(angle) * randomBetween(110, 300),
      vy: -Math.sin(angle) * randomBetween(110, 300) - randomBetween(10, 100),
      gravity: 80,
      life: randomBetween(0.42, 0.9),
      size: randomBetween(4, 10),
      color: Math.random() < 0.6 ? "rgba(196, 111, 255, 0.9)" : "rgba(244, 209, 255, 0.82)",
    });
  }
}

function updatePrimeMysticGravityWell(dt) {
  const well = state.primeMysticGravityWell;
  if (!well) {
    return;
  }

  const boss = state.dogmatts.find((matt) => matt.id === well.bossId && !matt.caught);
  if (!boss) {
    clearPrimeMysticGravityWell();
    return;
  }

  well.life = Math.max(0, well.life - dt);
  well.x = boss.x;
  well.y = boss.y;
  const radius = well.radius || PRIME_MYSTIC_GRAVITY_WELL.radius;
  const pullStrength = well.pullStrength || PRIME_MYSTIC_GRAVITY_WELL.pullStrength;
  const affectedFollowers = state.dogmatts.filter((matt) => matt.caught && !matt.arenaBattler && !matt.arenaOpponent);

  spawnPrimeMysticGravityWellAmbient(well, dt);
  if (pullEntityToward(state.player, well.x, well.y, radius, pullStrength, dt, 28)) {
    state.player.stamina = Math.max(0, state.player.stamina - 4.5 * dt);
    seedPlayerTrail();
    updatePlayerStatusHud();
  }

  affectedFollowers.forEach((matt) => {
    matt.mysticBerserkTimer = Math.max(matt.mysticBerserkTimer || 0, well.life);
    pullEntityToward(matt, well.x, well.y, radius, pullStrength * 0.88, dt, Math.max(32, getMattConfig(matt.type).width * 0.35));
  });

  if (!well.messageShown && affectedFollowers.length > 0) {
    well.messageShown = true;
    setGameMessage("Prime Mystic Matt turns Ivan's Matts against him.");
  }

  if (well.life <= 0) {
    clearPrimeMysticGravityWell();
  }
}

function isPrimeMysticBerserk(matt) {
  return Boolean(matt?.caught && (matt.mysticBerserkTimer || 0) > 0);
}

function spawnBerserkFollowerStrikeEffect(follower) {
  const angle = Math.atan2(state.player.y - follower.y, state.player.x - follower.x);
  addParticle({
    type: "beam",
    x: follower.x,
    y: follower.y - 42,
    x2: state.player.x,
    y2: state.player.y - 48,
    life: 0.18,
    size: 20,
    color: "rgba(196, 111, 255, 0.88)",
  });

  for (let i = 0; i < 12; i += 1) {
    const spread = angle + randomBetween(-0.85, 0.85);
    addParticle({
      type: "slash",
      x: state.player.x + Math.cos(spread) * randomBetween(12, 52),
      y: state.player.y - randomBetween(16, 86) + Math.sin(spread) * randomBetween(8, 32),
      vx: Math.cos(spread) * randomBetween(90, 230),
      vy: Math.sin(spread) * randomBetween(90, 230) - randomBetween(20, 120),
      life: randomBetween(0.14, 0.3),
      size: randomBetween(16, 36),
      color: Math.random() < 0.55 ? "rgba(196, 111, 255, 0.94)" : "rgba(244, 209, 255, 0.9)",
      rotation: spread,
      spin: randomBetween(-5, 5),
    });
  }
}

function getBerserkFollowerDamage(follower) {
  return Math.round(
    PRIME_MYSTIC_GRAVITY_WELL.followerDamage +
      getMattLevel(follower) * 1.15 +
      Math.floor((Number(follower.friendship) || 0) / 18),
  );
}

function updateBerserkCapturedMatt(dogmatt, config, dt) {
  dogmatt.mysticBerserkTimer = Math.max(0, (dogmatt.mysticBerserkTimer || 0) - dt);
  dogmatt.mysticBerserkCooldown = Math.max(0, (dogmatt.mysticBerserkCooldown || 0) - dt);
  if (!isPrimeMysticBerserk(dogmatt)) {
    return false;
  }

  const dx = state.player.x - dogmatt.x;
  const dy = state.player.y - dogmatt.y;
  const distance = Math.hypot(dx, dy) || 1;
  const attackRange = PRIME_MYSTIC_GRAVITY_WELL.followerAttackRange + Math.min(60, getMattLevel(dogmatt) * 2);
  dogmatt.caughtAnimationPaused = false;

  if (distance > attackRange) {
    const speed = Math.min((config.followSpeed + 300) * dt, distance - attackRange + 22);
    dogmatt.x = clamp(dogmatt.x + (dx / distance) * speed, 0, getMapWidth());
    dogmatt.y = clamp(dogmatt.y + (dy / distance) * speed, 0, getMapHeight());
    dogmatt.direction = dx < 0 ? "left" : "right";
    setAction(dogmatt, getFollowerMoveAction(dogmatt));
    return true;
  }

  dogmatt.direction = dx < 0 ? "left" : "right";
  if (dogmatt.mysticBerserkCooldown <= 0) {
    dogmatt.mysticBerserkCooldown = PRIME_MYSTIC_GRAVITY_WELL.followerAttackCooldown;
    spawnBerserkFollowerStrikeEffect(dogmatt);
    const source = {
      ...dogmatt,
      name: `Enthralled ${getCapturedMattDisplayName(dogmatt)}`,
    };
    if (damagePlayer(getBerserkFollowerDamage(dogmatt), source) !== "defeated") {
      knockPlayerAwayFrom(dogmatt, 54);
      drainPlayerStamina(8);
    }
    setAction(dogmatt, getFollowerAttackAction(dogmatt));
  } else {
    setAction(dogmatt, getCapturedMattTravelAction(dogmatt));
  }

  return true;
}

function updateCaughtDogmatt(dogmatt, dt, caughtIndex) {
  const config = getMattConfig(dogmatt.type);
  if (updateBerserkCapturedMatt(dogmatt, config, dt)) {
    return;
  }

  if (dogmatt.tamed && dogmatt.follower && state.followerCommand.mode === "stay") {
    updateStayFollower(dogmatt, config, dt);
    return;
  }

  const combatTarget = getFollowerCombatTarget(dogmatt);
  if (combatTarget && updateCombatFollower(dogmatt, combatTarget, config, dt)) {
    return;
  }

  dogmatt.returnBoostTimer = Math.max(0, (dogmatt.returnBoostTimer || 0) - dt);
  const target = getFollowTarget(caughtIndex, config);
  const dx = target.x - dogmatt.x;
  const dy = target.y - dogmatt.y;
  const distance = Math.hypot(dx, dy) || 1;
  let moved = false;

  if (distance > config.followStopDistance) {
    const catchup = Math.min(620, distance * 2.6);
    const returnBoost = dogmatt.returnBoostTimer > 0 ? 520 : 0;
    const speed = Math.min((config.followSpeed + catchup + returnBoost) * dt, distance);
    dogmatt.x = clamp(dogmatt.x + (dx / distance) * speed, 0, getMapWidth());
    dogmatt.y = clamp(dogmatt.y + (dy / distance) * speed, 0, getMapHeight());
    dogmatt.direction = dx < 0 ? "left" : "right";
    moved = true;
  }

  const resting = !state.player.moving && !moved;
  dogmatt.caughtAnimationPaused = resting && !shouldUseWildFollowerFrames(dogmatt);
  setAction(dogmatt, resting ? getCapturedMattRestAction(dogmatt) : getCapturedMattTravelAction(dogmatt));

  if (dogmatt.caughtAnimationPaused && shouldCapturedMattUseWalkingLoop(dogmatt)) {
    dogmatt.frameIndex = 0;
    dogmatt.frameTimer = 0;
  }
}

function getMattFrames(matt) {
  const frameSet = images[matt.assetKey || matt.type] || images[matt.type] || images.dogmatt;
  if (shouldUseWildFollowerFrames(matt) && matt.action === "caught") {
    return frameSet.idle || frameSet.walking || frameSet.attack || images.dogmatt.idle;
  }
  if (matt.caught && shouldCapturedMattUseWalkingLoop(matt) && matt.action === "caught" && frameSet.walking?.length) {
    return frameSet.walking;
  }
  return frameSet[matt.action] || frameSet.attack || frameSet.idle || frameSet.walking || images.dogmatt.idle;
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

  if (matt.introPlaying) {
    matt.frameTimer += dt;

    if (matt.frameTimer >= (matt.introFrameDuration || 0.1)) {
      matt.frameTimer = 0;

      if (matt.frameIndex < frames.length - 1) {
        matt.frameIndex += 1;
      } else {
        finishBossIntro(matt);
      }
    }

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

  if (matt.type === "mysticmatt" && !matt.boss && isMysticMattSpecialIdle(matt.action)) {
    const frameDuration = matt.action === "mysticIdleFloat" ? 0.11 : 0.09;
    matt.frameTimer += dt;

    if (matt.action === "mysticIdleFloat") {
      matt.mysticFloatTimer = Math.max(0, (matt.mysticFloatTimer || MYSTICMATT.floatDuration) - dt);
    }

    if (matt.frameTimer >= frameDuration) {
      matt.frameTimer = 0;

      if (matt.action === "mysticIdleStart") {
        if (matt.frameIndex < frames.length - 1) {
          matt.frameIndex += 1;
        } else {
          matt.mysticFloatTimer = MYSTICMATT.floatDuration;
          setAction(matt, "mysticIdleFloat");
        }
      } else if (matt.action === "mysticIdleFloat") {
        matt.frameIndex = (matt.frameIndex + 1) % frames.length;
      } else if (matt.frameIndex < frames.length - 1) {
        matt.frameIndex += 1;
      } else {
        setAction(matt, "idle");
        scheduleMysticMattSpecialIdle(matt);
      }
    }

    if (matt.action === "mysticIdleFloat" && matt.mysticFloatTimer <= 0) {
      setAction(matt, "mysticIdleStop");
    }

    return;
  }

  if (matt.assetKey === "primegrassmatt") {
    const frameDuration = matt.action === "idle" ? 0.16 : 0.085;
    advanceAnimation(matt, frames.length, frameDuration, dt);
    return;
  }

  const frameDuration =
    matt.action === "caught" ? 0.16 : matt.type === "dogmatt" && matt.action !== "attack" ? 0.2 : 0.095;
  advanceAnimation(matt, frames.length, frameDuration, dt);
}

function updateArenaBattler(matt, dt) {
  matt.arenaLungeTimer = Math.max(0, (matt.arenaLungeTimer || 0) - dt);
  matt.arenaHitTimer = Math.max(0, (matt.arenaHitTimer || 0) - dt);

  const lungeProgress = matt.arenaLungeTimer > 0
    ? Math.sin((1 - matt.arenaLungeTimer / 0.42) * Math.PI)
    : 0;
  const hitShake = matt.arenaHitTimer > 0 ? Math.sin(matt.arenaHitTimer * 80) * 6 : 0;
  const side = matt.arenaSide === "player" ? 1 : -1;
  matt.x = matt.baseX + side * lungeProgress * 86 + hitShake;
  matt.y = matt.baseY;

  if (matt.arenaLungeTimer > 0 && getMattFrames({ ...matt, action: "attack" })?.length) {
    setAction(matt, "attack");
  } else if (matt.arenaHitTimer > 0 && getMattFrames({ ...matt, action: "hit" })?.length) {
    setAction(matt, "hit");
  } else if (matt.caught) {
    setAction(matt, "caught");
  } else {
    setWildMattBaseAction(matt, "idle", dt);
  }
}

function updateDogmatts(dt) {
  let caughtIndex = 0;

  for (const dogmatt of state.dogmatts) {
    if (dogmatt.arenaBattler || dogmatt.arenaOpponent) {
      updateArenaBattler(dogmatt, dt);
    } else if (dogmatt.caught) {
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

function updateCaughtHud(caughtCount, force = false) {
  updateFollowerCommandUi();

  if (!force && state.caughtDogmatts === caughtCount) {
    return;
  }

  state.caughtDogmatts = caughtCount;

  if (caughtCounter) {
    caughtCounter.textContent = isIntroChainActive()
      ? getIntroObjectiveText()
      : getBrockMissionObjectiveText() || `Matts caught: ${caughtCount} / ${MATT_PARTY_LIMIT}`;
  }

  monsterSlots.forEach((slot, index) => {
    slot.classList.toggle("caught", index < caughtCount);
  });
}

function addParticle(particle) {
  state.particles.push({
    maxLife: particle.life,
    vx: 0,
    vy: 0,
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
    x: state.camera.x + randomBetween(0, getCameraViewWidth()),
    y: state.camera.y + randomBetween(0, getCameraViewHeight()),
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
    const reach = randomBetween(48, getWhipAttackRange() * 0.85);
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
  if (npc.script === WIZARD_AMBUSH_SCRIPT) {
    updateScriptedWizard(npc, dt);
    return;
  }

  const world = getWorld();
  let path = npc.pathId ? findNpcPathById(npc.pathId, world) : null;
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

  state.npcs = state.npcs.filter((npc) => !npc.removeAfterScript);
}

function updateFriendshipWalking(dt) {
  if (!state.player.moving || state.capturedParty.length === 0 || state.arena.active || isIntroOpen() || isShopOpen() || isPauseMenuOpen()) {
    return;
  }

  state.friendshipWalkTimer += dt;
  if (state.friendshipWalkTimer < FRIENDSHIP_WALK_SECONDS) {
    return;
  }

  state.friendshipWalkTimer %= FRIENDSHIP_WALK_SECONDS;
  const gain = getFriendshipGain(1);
  state.capturedParty = state.capturedParty.map((matt) => ({
    ...matt,
    friendship: clamp((matt.friendship || 0) + gain, 0, 100),
  }));
  state.dogmatts.forEach((matt) => {
    if (matt.caught) {
      matt.friendship = clamp((matt.friendship || 0) + gain, 0, 100);
    }
  });
  saveCapturedParty();
}

function update(dt) {
  state.time += dt;
  updateClock(dt);
  updatePlayer(dt);
  updateAutomaticNodeTravel(dt);
  maybeStartBrockRescueConversation();
  updateNpcs(dt);
  updatePrimeMysticGravityWell(dt);
  updateDogmatts(dt);
  updateFriendshipWalking(dt);
  updateParticles(dt);
  syncCamera();
  preloadNearbyTilesIfNeeded(2);
}

function isDementedMatt(matt) {
  return matt?.type === DEMENTED_MATT_TYPE;
}

function defeatDementedMatt(matt) {
  state.dogmatts = state.dogmatts.filter((candidate) => candidate !== matt && candidate.id !== matt.id);
  addItem(DEMENTED_ESSENSE_ITEM_ID, 1);
  state.storyFlags = normalizeStoryFlags({
    ...state.storyFlags,
    dementedEssenseFound: true,
  });

  spawnCaptureEffect(matt);
  playCaptureSound();
  addScreenShake(10);
  const progress = awardPlayerXp(Math.round(36 + getMattLevel(matt) * 7), "demented matt defeated");
  saveEconomy();
  updateEconomyHud();
  updateCaughtHud(countCaughtMatts(), true);
  setGameMessage(
    `Demented Matt dropped DementedEssense. Bring it to Brick. Ivan XP +${progress.gained}${progress.leveled ? `, Lv ${progress.level}` : ""}.`,
    8200,
  );
}

function hitDogmatt(dogmatt) {
  const captureHitThreshold = getCaptureHitThreshold(dogmatt);
  awakenBossMatt(dogmatt);
  dogmatt.hitCooldown = 0.25;
  dogmatt.hitReactionTimer = dogmatt.boss ? 0.32 : 0.55;
  if (dogmatt.boss) {
    dogmatt.attackCooldown = Math.min(dogmatt.attackCooldown || 0, 0.22);
    dogmatt.bossMoveTimer = 0;
  }
  dogmatt.pathPanicTimer = dogmatt.rooted || isBloodlustedMatt(dogmatt) ? 0 : Math.max(dogmatt.pathPanicTimer || 0, 2.2);
  dogmatt.pathRoamTarget = null;
  dogmatt.hitCount += 1;
  dogmatt.frameIndex = 0;
  dogmatt.frameTimer = 0;
  spawnHitEffect(dogmatt, dogmatt.hitCount);
  addScreenShake(5);

  if (dogmatt.hitCount >= captureHitThreshold) {
    if (isDementedMatt(dogmatt)) {
      defeatDementedMatt(dogmatt);
      return;
    }

    if (state.capturedParty.length >= MATT_PARTY_LIMIT) {
      dogmatt.hitCount = captureHitThreshold - 1;
      setAction(dogmatt, getMattHitAction(dogmatt));
      playHitSound(dogmatt.hitCount);
      setDevStatus(`Party full: ${MATT_PARTY_LIMIT} Matts max.`);
      return;
    }

    const snackUsed = hasItem("matt_snack");
    const netUsed = hasItem("capture_net");
    const fluteUsed = hasItem("calming_flute");
    const fluteBonus = fluteUsed ? 6 : 0;
    const captureChance = getCaptureAttemptChance(dogmatt, { snackUsed, netUsed, fluteUsed });

    if (snackUsed) {
      removeItem("matt_snack");
      setGameMessage("Matt Snack used.");
    }

    if (netUsed) {
      removeItem("capture_net");
      setGameMessage("Capture Net used.");
    }

    saveEconomy();
    updateEconomyHud();

    if (Math.random() > captureChance) {
      dogmatt.hitCount = Math.max(0, captureHitThreshold - 1);
      dogmatt.pathPanicTimer = dogmatt.rooted ? 0 : Math.max(dogmatt.pathPanicTimer || 0, 3.5);
      dogmatt.attackCooldown = Math.min(dogmatt.attackCooldown || 0, 0.3);
      setAction(dogmatt, getMattHitAction(dogmatt));
      playHitSound(dogmatt.hitCount);
      setGameMessage(
        `Lv ${getMattLevel(dogmatt)} ${dogmatt.name || MATT_LABELS[dogmatt.type] || "Matt"} resisted capture (${Math.round(captureChance * 100)}%).`,
      );
      return;
    }

    dogmatt.hitCount = captureHitThreshold;
    dogmatt.caught = true;
    dogmatt.sourceWorld = state.currentWorld;
    dogmatt.originalId = dogmatt.originalId || dogmatt.id;
    dogmatt.partyId = makeCapturedPartyId(dogmatt);
    dogmatt.friendship = Math.max(dogmatt.friendship || 0, 14 + (snackUsed ? 4 : 0) + (netUsed ? 2 : 0) + fluteBonus);
    setAction(dogmatt, "caught");
    recordCapturedMattType(dogmatt.type);
    recordIntroCapture(dogmatt.type);
    state.capturedParty.push(serializeCapturedMatt(dogmatt));
    state.capturedParty = state.capturedParty.slice(0, MATT_PARTY_LIMIT);
    if (dogmatt.boss) {
      clearPrimeMysticGravityWell();
      resumeAmbientMusicFromPrimeGrassMatt();
    }
    spawnCaptureEffect(dogmatt);
    playCaptureSound();
    addScreenShake(10);
    const ivanProgress = awardPlayerXp(
      Math.round(
        24 +
          getMattLevel(dogmatt) * 6 +
          (Number(dogmatt.captureDifficulty) || 1) * 10 +
          getSkillBonus("whip_mastery", 5) +
          getSkillBonus("clean_capture", 4),
      ),
      "capture",
    );
    setGameMessage(
      `Captured Lv ${getMattLevel(dogmatt)} ${dogmatt.name || MATT_LABELS[dogmatt.type] || "Matt"} (${Math.round(captureChance * 100)}%). Ivan XP +${ivanProgress.gained}${ivanProgress.leveled ? `, Lv ${ivanProgress.level}` : ""}.`,
    );
    updateCaughtHud(countCaughtMatts());
    saveEconomy();
    saveCapturedParty();
    trySpawnUnlockedWorldBoss(dogmatt);
    return;
  }

  playHitSound(dogmatt.hitCount);
  setAction(dogmatt, getMattHitAction(dogmatt));
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

    if (inWhipArc && distance < getWhipAttackRange()) {
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
  const viewWidth = getCameraViewWidth();
  const viewHeight = getCameraViewHeight();
  ctx.fillStyle = map.fill || "#18201d";
  ctx.fillRect(0, 0, viewWidth, viewHeight);

  if (map.type === "image") {
    const image = getWorldMapImage();
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
  ctx.fillRect(0, 0, viewWidth, viewHeight);
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

  const overviewImage = getWorldMapImage();
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
  if (["grass_tree", "grass_cave"].includes(state.currentWorld)) {
    return 2.2;
  }

  return ["town_blacksmith", "town_arena_entrance"].includes(state.currentWorld) ? 3 : getInnActorScale();
}

function getMattRenderScale(dogmatt) {
  const worldScale = state.currentWorld === "town_arena_entrance" ? 2 : getInnActorScale();
  return worldScale * (Number(dogmatt.scale) || 1);
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
  const frames = getIvanFrames(player.action);
  if (!frames.length) {
    return;
  }
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
  const scale = getMattRenderScale(dogmatt);
  const screenX = dogmatt.x - state.camera.x;
  const screenY = dogmatt.y - state.camera.y;

  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.24)";
  ctx.beginPath();
  ctx.ellipse(screenX, screenY + 6, config.width * 0.3 * scale, config.height * 0.1 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawWorldBossHealthBar(dogmatt, screenX, screenY, config, scale) {
  const maxHealth = Math.max(1, dogmatt.captureHitsRequired || getWildMattCaptureHits(dogmatt));
  const currentHealth = clamp(maxHealth - (dogmatt.hitCount || 0), 0, maxHealth);
  const ratio = currentHealth / maxHealth;
  const width = 230;
  const height = 32;
  const x = clamp(Math.round(screenX - width / 2), 12, Math.max(12, canvas.clientWidth - width - 12));
  const rawY = Math.round(screenY - config.height * scale - 48);
  const y = clamp(rawY, 18, Math.max(18, canvas.clientHeight - height - 18));
  const fillColor =
    dogmatt.assetKey === "primefirematt" ? "#ff6f3e" :
    dogmatt.assetKey === "primerockmatt" ? "#c8b88a" :
    "#8ff36b";

  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "rgba(7, 10, 9, 0.76)";
  ctx.strokeStyle = "rgba(255, 238, 143, 0.38)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(0, 0, width, height, 7);
  } else {
    ctx.rect(0, 0, width, height);
  }
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#fff8cc";
  ctx.font = "900 12px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(`${dogmatt.name} Lv ${getMattLevel(dogmatt)}`, width / 2, 13);

  ctx.fillStyle = "rgba(255, 255, 255, 0.13)";
  ctx.fillRect(12, 20, width - 24, 7);
  ctx.fillStyle = fillColor;
  ctx.fillRect(12, 20, (width - 24) * ratio, 7);
  ctx.restore();
}

function drawFollowerBadge(dogmatt, screenX, screenY, config, scale) {
  const name = getCapturedMattDisplayName(dogmatt);
  const width = 164;
  const height = 28;
  const x = Math.round(screenX - width / 2);
  const y = Math.round(screenY - config.height * scale - 34);
  const bondRatio = clamp((dogmatt.friendship || 0) / 100, 0, 1);

  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "rgba(7, 10, 9, 0.72)";
  ctx.strokeStyle = "rgba(121, 241, 185, 0.52)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(0, 0, width, height, 7);
  } else {
    ctx.rect(0, 0, width, height);
  }
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#fff8cc";
  ctx.font = "800 11px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(`${name} | Follower`, width / 2, 12);
  ctx.fillStyle = "rgba(255, 255, 255, 0.13)";
  ctx.fillRect(10, 19, width - 20, 5);
  ctx.fillStyle = "#79f1b9";
  ctx.fillRect(10, 19, (width - 20) * bondRatio, 5);
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = "rgba(121, 241, 185, 0.68)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(screenX, screenY + 6, config.width * scale * 0.28, config.height * scale * 0.08, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawFollowerCommandMarker(dogmatt, screenX, screenY, config, scale) {
  if (dogmatt.caught || dogmatt.arenaBattler || !isFollowerCommandTargetCandidate(dogmatt)) {
    return;
  }

  const selected = state.followerCommand.targetId === dogmatt.id;
  const targetable = state.followerCommand.targeting && hasActiveFollower();
  if (!selected && !targetable) {
    return;
  }

  const pulse = 0.5 + Math.sin(state.time * 7) * 0.5;
  const color = selected ? "rgba(255, 111, 88, 0.92)" : "rgba(255, 221, 112, 0.68)";
  const radiusX = config.width * scale * (selected ? 0.44 : 0.36);
  const radiusY = config.height * scale * (selected ? 0.13 : 0.1);

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = selected ? 4 : 3;
  ctx.beginPath();
  ctx.ellipse(screenX, screenY + 8, radiusX + pulse * 4, radiusY + pulse * 2, 0, 0, Math.PI * 2);
  ctx.stroke();

  if (selected) {
    ctx.fillStyle = "#ffe5d1";
    ctx.font = "900 12px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgba(18, 16, 14, 0.84)";
    ctx.strokeText("TARGET", screenX, screenY - config.height * scale - 30);
    ctx.fillText("TARGET", screenX, screenY - config.height * scale - 30);
  }

  ctx.restore();
}

function drawDogmatt(dogmatt) {
  const config = getMattConfig(dogmatt.type);
  const frames = getMattFrames(dogmatt);
  if (!frames || frames.length === 0) {
    return;
  }

  const sprite = frames[dogmatt.frameIndex % frames.length];
  const scale = getMattRenderScale(dogmatt);
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
  drawFollowerCommandMarker(dogmatt, screenX, screenY, config, scale);

  if (dogmatt.caught && dogmatt.follower && !dogmatt.arenaBattler) {
    drawFollowerBadge(dogmatt, screenX, screenY, config, scale);
  } else if (!dogmatt.caught && !dogmatt.arenaBattler && dogmatt.boss) {
    drawWorldBossHealthBar(dogmatt, screenX, screenY, config, scale);
  } else if (!dogmatt.caught && !dogmatt.arenaBattler) {
    const difficulty = Math.max(1, Number(dogmatt.captureDifficulty) || 1);
    const label = dogmatt.boss || dogmatt.name
      ? `${dogmatt.name || MATT_LABELS[dogmatt.type] || "Matt"} Lv ${getMattLevel(dogmatt)}`
      : `Lv ${getMattLevel(dogmatt)}`;
    ctx.save();
    ctx.font = "800 13px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgba(18, 16, 14, 0.82)";
    ctx.fillStyle = difficulty >= 3 ? "#ffb36d" : difficulty >= 2 ? "#f7f1d0" : "#baf7ce";
    ctx.strokeText(label, screenX, screenY - config.height * scale - 12);
    ctx.fillText(label, screenX, screenY - config.height * scale - 12);
    ctx.restore();
  }
}

function getNpcRenderScale(npc) {
  const npcScale = Number(NPC_DEFS[npc.id]?.scale) || 1;

  if (state.currentWorld === "town_blacksmith" && npc.id === "tom") {
    return 3 * npcScale;
  }

  if (state.currentWorld === "town_arena_entrance" && ["tom", "scott"].includes(npc.id)) {
    return 3 * npcScale;
  }

  return getInnActorScale() * npcScale;
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

function getCapturedBrockPosition(world = getWorld()) {
  if (!canPlaceCapturedBrock(world.id) || isBrockRescued()) {
    return null;
  }

  const brock = getWorldBrockData(world);
  return brock.capturedPosition || null;
}

function getRescuedBrockActor(world = getWorld()) {
  if (!canPlaceCapturedBrock(world.id) || !isBrockRescued()) {
    return null;
  }

  const brock = getWorldBrockData(world);
  const route = Array.isArray(brock.freePath) ? brock.freePath : [];
  if (route.length === 0) {
    return brock.capturedPosition ? { ...brock.capturedPosition, direction: "down", frameIndex: 0 } : null;
  }

  if (route.length === 1) {
    return { ...route[0], direction: "down", frameIndex: 0 };
  }

  const segments = [];
  let totalLength = 0;
  for (let i = 0; i < route.length; i += 1) {
    const from = route[i];
    const to = route[(i + 1) % route.length];
    const length = Math.hypot(to.x - from.x, to.y - from.y);
    if (length > 0) {
      segments.push({ from, to, length });
      totalLength += length;
    }
  }

  if (segments.length === 0 || totalLength <= 0) {
    return { ...route[0], direction: "down", frameIndex: 0 };
  }

  let travel = (state.time * NPC.speed) % totalLength;
  let segment = segments[0];
  for (const candidate of segments) {
    if (travel <= candidate.length) {
      segment = candidate;
      break;
    }
    travel -= candidate.length;
  }

  const ratio = clamp(travel / segment.length, 0, 1);
  const dx = segment.to.x - segment.from.x;
  const dy = segment.to.y - segment.from.y;
  return {
    x: segment.from.x + dx * ratio,
    y: segment.from.y + dy * ratio,
    direction: Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? "left" : "right") : dy < 0 ? "up" : "down",
    frameIndex: Math.floor(state.time / 0.11),
  };
}

function getCapturedBrockFrames() {
  const brockFrames = images.npcs.brock || {};
  return brockFrames.captured || brockFrames.idle || [];
}

function getRescuedBrockFrames() {
  const brockFrames = images.npcs.brock || {};
  return brockFrames.walking || brockFrames.idle || [];
}

function getCapturedBrockRenderScale() {
  return state.currentWorld === BROCK_CAPTURED_WORLD_ID ? getPlayerRenderScale() : getInnActorScale();
}

function drawCapturedBrockShadow(point) {
  const scale = getCapturedBrockRenderScale();
  const screenX = point.x - state.camera.x;
  const screenY = point.y - state.camera.y;

  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  ctx.beginPath();
  ctx.ellipse(screenX, screenY + 8, NPC.width * 0.3 * scale, NPC.height * 0.09 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawCapturedBrock(point) {
  const frames = getCapturedBrockFrames();
  if (!frames || frames.length === 0) {
    return;
  }

  const sprite = frames[Math.floor(state.time / 0.14) % frames.length];
  const scale = getCapturedBrockRenderScale();
  const screenX = Math.round(point.x - state.camera.x);
  const screenY = Math.round(point.y - state.camera.y);

  ctx.save();
  ctx.translate(screenX, screenY);
  ctx.scale(scale, scale);
  ctx.drawImage(sprite, -NPC.width / 2, -NPC.height + NPC.footOffset);
  ctx.restore();

  drawCapturedBrockRescuePrompt(point, screenX, screenY, scale);
}

function drawCapturedBrockRescuePrompt(point, screenX, screenY, scale) {
  if (
    getBrockMissionStatus() !== BROCK_MISSION_STATUS.SEARCH_GRASSLAND ||
    Math.hypot(point.x - state.player.x, point.y - state.player.y) > BROCK_RESCUE_RADIUS
  ) {
    return;
  }

  const rescueReady = hasSeenBrockRescueConversation();
  const label = isMobileCameraView()
    ? rescueReady
      ? "Tap: Free Brock"
      : "Tap: Talk to Brock"
    : rescueReady
      ? "E: Free Brock"
      : "E: Talk to Brock";
  const width = 178;
  const height = 32;
  const x = Math.round(screenX - width / 2);
  const y = Math.round(screenY - NPC.height * scale - 42);

  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "rgba(8, 13, 12, 0.78)";
  ctx.strokeStyle = "rgba(255, 215, 132, 0.5)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(0, 0, width, height, 8);
  } else {
    ctx.rect(0, 0, width, height);
  }
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#fff1b6";
  ctx.font = "900 13px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(label, width / 2, 21);
  ctx.restore();
}

function drawRescuedBrock(actor) {
  const frames = getRescuedBrockFrames();
  if (!frames || frames.length === 0) {
    return;
  }

  const sprite = frames[actor.frameIndex % frames.length];
  const scale = getCapturedBrockRenderScale();
  const screenX = Math.round(actor.x - state.camera.x);
  const screenY = Math.round(actor.y - state.camera.y);

  ctx.save();
  ctx.translate(screenX, screenY);
  ctx.scale(scale, scale);
  if (actor.direction === "left") {
    ctx.scale(-1, 1);
  }
  ctx.drawImage(sprite, -NPC.width / 2, -NPC.height + NPC.footOffset);
  ctx.restore();
}

function drawArenaNameplate(actor, label, hp, maxHp, color) {
  if (!actor) {
    return;
  }

  const config = getMattConfig(actor.type);
  const x = Math.round(actor.x - state.camera.x);
  const y = Math.round(actor.y - state.camera.y - config.height - 34);
  const width = 190;
  const hpRatio = clamp(hp / Math.max(1, maxHp), 0, 1);

  ctx.save();
  ctx.translate(x - width / 2, y);
  ctx.fillStyle = "rgba(8, 13, 12, 0.72)";
  ctx.strokeStyle = "rgba(255, 238, 143, 0.32)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(0, 0, width, 34, 7);
  } else {
    ctx.rect(0, 0, width, 34);
  }
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#fff8cc";
  ctx.font = "800 12px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(label, width / 2, 13);

  ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
  ctx.fillRect(12, 21, width - 24, 6);
  ctx.fillStyle = color;
  ctx.fillRect(12, 21, (width - 24) * hpRatio, 6);
  ctx.restore();
}

function drawArenaBattleLabels() {
  if (!state.arena.active || !["battle", "won", "lost"].includes(state.arena.phase)) {
    return;
  }

  drawArenaNameplate(
    getArenaActor("player"),
    `${getArenaMattName(state.arena.playerMatt)} Lv ${getMattLevel(state.arena.playerMatt)}`,
    state.arena.playerHp,
    state.arena.playerMaxHp,
    "#79f1b9",
  );
  drawArenaNameplate(
    getArenaActor("opponent"),
    `${state.arena.opponent.name}'s Matt Lv ${state.arena.opponent.level}`,
    state.arena.opponentHp,
    state.arena.opponentMaxHp,
    "#ff9b77",
  );
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

  const mattOverviewColors = {
    dogmatt: "rgba(255, 196, 116, 0.86)",
    firematt: "rgba(255, 96, 66, 0.86)",
    grassmatt: "rgba(118, 232, 96, 0.86)",
    watermatt: "rgba(77, 195, 238, 0.86)",
  };

  for (const dogmatt of state.dogmatts) {
    ctx.fillStyle = dogmatt.caught
      ? "rgba(143, 243, 197, 0.9)"
      : mattOverviewColors[dogmatt.type] || "rgba(255, 196, 116, 0.86)";
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

  const capturedBrockPoint = getCapturedBrockPosition();
  if (capturedBrockPoint) {
    ctx.fillStyle = "rgba(255, 179, 109, 0.92)";
    ctx.strokeStyle = "rgba(20, 25, 22, 0.78)";
    ctx.lineWidth = 16;
    ctx.beginPath();
    ctx.arc(capturedBrockPoint.x, capturedBrockPoint.y, 58, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  const rescuedBrock = getRescuedBrockActor();
  if (rescuedBrock) {
    ctx.fillStyle = "rgba(124, 216, 255, 0.92)";
    ctx.strokeStyle = "rgba(20, 25, 22, 0.78)";
    ctx.lineWidth = 16;
    ctx.beginPath();
    ctx.arc(rescuedBrock.x, rescuedBrock.y, 58, 0, Math.PI * 2);
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

    if (particle.type === "image") {
      const image = images.effects[particle.imageKey];
      if (!image) {
        continue;
      }

      const height = particle.size;
      const width = height * (image.naturalWidth || image.width || 1) / Math.max(1, image.naturalHeight || image.height || 1);
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      ctx.drawImage(image, -width / 2, -height / 2, width, height);
      ctx.restore();
      continue;
    }

    if (particle.type === "beam") {
      const pulse = 1 - Math.abs(progress - 0.5) * 1.4;
      ctx.save();
      ctx.globalAlpha = Math.max(0.18, alpha);
      ctx.lineCap = "round";
      ctx.strokeStyle = "rgba(255, 255, 235, 0.22)";
      ctx.lineWidth = particle.size * (1.35 + pulse * 0.4);
      ctx.beginPath();
      ctx.moveTo(particle.x, particle.y);
      ctx.lineTo(particle.x2, particle.y2);
      ctx.stroke();
      ctx.strokeStyle = particle.color;
      ctx.lineWidth = particle.size * (0.45 + pulse * 0.25);
      ctx.beginPath();
      ctx.moveTo(particle.x, particle.y);
      ctx.lineTo(particle.x2, particle.y2);
      ctx.stroke();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.95)";
      ctx.lineWidth = Math.max(4, particle.size * 0.12);
      ctx.beginPath();
      ctx.moveTo(particle.x, particle.y);
      ctx.lineTo(particle.x2, particle.y2);
      ctx.stroke();
      ctx.restore();
      continue;
    }

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

    if (particle.type === "text") {
      ctx.font = `900 ${particle.size}px Inter, system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.lineWidth = 4;
      ctx.strokeStyle = "rgba(8, 13, 12, 0.84)";
      ctx.fillStyle = particle.color;
      ctx.strokeText(particle.text, particle.x, particle.y);
      ctx.fillText(particle.text, particle.x, particle.y);
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

function isBrockSearchLanternActive() {
  return (
    state.currentWorld === BROCK_CAPTURED_WORLD_ID &&
    getBrockMissionStatus() === BROCK_MISSION_STATUS.SEARCH_GRASSLAND &&
    !isBrockRescued()
  );
}

function drawBrockSearchLantern() {
  if (!isBrockSearchLanternActive()) {
    return;
  }

  const viewWidth = getCameraViewWidth();
  const viewHeight = getCameraViewHeight();
  const x = state.player.x - state.camera.x;
  const y = state.player.y - state.camera.y - 22;
  const { innerRadius, outerRadius, darkness } = BROCK_CAVE_LANTERN;

  ctx.save();

  const shadow = ctx.createRadialGradient(x, y, innerRadius * 0.25, x, y, outerRadius);
  shadow.addColorStop(0, "rgba(0, 0, 0, 0)");
  shadow.addColorStop(0.34, "rgba(0, 0, 0, 0.04)");
  shadow.addColorStop(0.6, "rgba(0, 0, 0, 0.58)");
  shadow.addColorStop(1, `rgba(0, 0, 0, ${darkness})`);
  ctx.fillStyle = shadow;
  ctx.fillRect(0, 0, viewWidth, viewHeight);

  const warmth = ctx.createRadialGradient(x, y, 0, x, y, outerRadius * 0.78);
  warmth.addColorStop(0, "rgba(255, 215, 132, 0.24)");
  warmth.addColorStop(0.48, "rgba(255, 164, 76, 0.09)");
  warmth.addColorStop(1, "rgba(255, 164, 76, 0)");
  ctx.fillStyle = warmth;
  ctx.fillRect(0, 0, viewWidth, viewHeight);

  ctx.restore();
}

function getNearbyNode(predicate = () => true) {
  return getWorld().nodes.find(
    (node) => predicate(node) && Math.hypot(node.x - state.player.x, node.y - state.player.y) <= node.radius + 44,
  );
}

function getOverlappingNode(predicate = () => true) {
  return getWorld().nodes.find(
    (node) => predicate(node) && Math.hypot(node.x - state.player.x, node.y - state.player.y) <= node.radius + 28,
  );
}

function getNearbyWaystone() {
  return getNearbyNode(isWaystoneNode);
}

function activateWaystoneNode(node) {
  if (!node || !isWaystoneNode(node)) {
    return false;
  }

  if (node.locked) {
    setGameMessage(`${getNodeLabel(node)} is quiet and locked for now.`);
    state.nodeTravelCooldown = Math.max(state.nodeTravelCooldown || 0, 0.75);
    return false;
  }

  state.nodeTravelCooldown = Math.max(state.nodeTravelCooldown || 0, 0.75);
  spawnCaptureEffect({ x: node.x, y: node.y });
  addScreenShake(3);
  setGameMessage(`${getNodeLabel(node)} is ready for a question. No question has been added yet.`);
  return true;
}

function tryInteractNearbyWaystone() {
  return activateWaystoneNode(getNearbyWaystone());
}

function tryEnterNode(node = getNearbyNode((candidate) => !isWaystoneNode(candidate))) {

  if (!node) {
    return false;
  }

  if (isWaystoneNode(node)) {
    return activateWaystoneNode(node);
  }

  if (node.locked) {
    setGameMessage(`${getNodeLabel(node)} is locked for now.`);
    state.nodeTravelCooldown = Math.max(state.nodeTravelCooldown || 0, 0.75);
    return false;
  }

  if (!canEnterWorldDuringIntro(node.target)) {
    setGameMessage(getIntroWorldLockedMessage(node.target), 5200);
    state.nodeTravelCooldown = Math.max(state.nodeTravelCooldown || 0, 0.9);
    return false;
  }

  if (state.currentWorld === "town_arena_entrance" && node.target === "town_arena") {
    if (isIntroChainActive()) {
      setGameMessage("Scott will open the arena when the tutorial reaches practice.");
      state.nodeTravelCooldown = Math.max(state.nodeTravelCooldown || 0, 0.9);
      return false;
    }

    if (!hasItem("arena_ticket")) {
      setGameMessage("Scott sells arena tickets. Buy one before entering.");
      state.nodeTravelCooldown = Math.max(state.nodeTravelCooldown || 0, 0.9);
      return false;
    }

    removeItem("arena_ticket");
    saveEconomy();
    updateEconomyHud();
    setGameMessage("Arena ticket used.");
  }

  saveCapturedParty();
  const fromWorld = state.currentWorld;
  setWorld(node.target, true, fromWorld);
  if (node.target === "town_arena") {
    window.setTimeout(openArenaBattle, 0);
  }
  spawnCaptureEffect(state.player);
  playCaptureSound();
  addScreenShake(8);
  saveWorlds();
  return true;
}

function updateAutomaticNodeTravel(dt) {
  state.nodeTravelCooldown = Math.max(0, (state.nodeTravelCooldown || 0) - dt);

  if (
    state.dev.enabled ||
    isIntroOpen() ||
    isShopOpen() ||
    isPauseMenuOpen() ||
    isBossIntroPlaying() ||
    (state.arena.active && state.arena.phase !== "idle")
  ) {
    return;
  }

  const node = getOverlappingNode((candidate) => !isWaystoneNode(candidate));
  if (
    state.nodeTravelExitNodeId &&
    state.currentWorld === state.nodeTravelExitWorld &&
    node?.id === state.nodeTravelExitNodeId
  ) {
    return;
  }

  if (!node) {
    state.nodeTravelExitWorld = "";
    state.nodeTravelExitNodeId = "";
    return;
  }

  if (state.nodeTravelCooldown > 0) {
    return;
  }

  tryEnterNode(node);
}

function drawWorldNodes() {
  const nearbyNode = getNearbyNode();
  ctx.save();
  ctx.translate(-state.camera.x, -state.camera.y);

  for (const node of getWorld().nodes) {
    const active = node === nearbyNode;
    const locked = Boolean(node.locked);
    const waystone = isWaystoneNode(node);
    ctx.globalAlpha = active ? 0.9 : waystone ? 0.5 : 0.38;
    ctx.fillStyle = locked
      ? active
        ? "rgba(170, 170, 170, 0.22)"
        : "rgba(120, 120, 120, 0.16)"
      : waystone
        ? active
          ? "rgba(255, 220, 123, 0.3)"
          : "rgba(255, 189, 92, 0.18)"
        : active
          ? "rgba(143, 243, 197, 0.25)"
          : "rgba(150, 108, 255, 0.2)";
    ctx.strokeStyle = locked
      ? active
        ? "rgba(230, 230, 230, 0.82)"
        : "rgba(190, 190, 190, 0.55)"
      : waystone
        ? active
          ? "rgba(255, 244, 181, 0.96)"
          : "rgba(255, 206, 112, 0.78)"
        : active
          ? "rgba(143, 243, 197, 0.95)"
          : "rgba(210, 188, 255, 0.72)";
    ctx.lineWidth = active ? 4 : 2;
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    if (waystone) {
      ctx.save();
      ctx.translate(node.x, node.y);
      ctx.rotate(Math.PI / 4);
      ctx.strokeStyle = locked ? "rgba(230, 230, 230, 0.7)" : "rgba(255, 244, 181, 0.88)";
      ctx.lineWidth = active ? 5 : 3;
      const markSize = node.radius * 0.48;
      ctx.strokeRect(-markSize / 2, -markSize / 2, markSize, markSize);
      ctx.restore();
    }

    if (active) {
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#f7f1d0";
      ctx.font = "800 18px Inter, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(locked ? `${getNodeLabel(node)} locked` : getNodeLabel(node), node.x, node.y - node.radius - 14);
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

function drawBrockEditorObjects(world) {
  if (!canEditBrockFreePath(world.id) && !canPlaceCapturedBrock(world.id)) {
    return;
  }

  const brock = getWorldBrockData(world);
  const labelSize = Math.max(42, Math.min(150, getMapWidth() * 0.012));

  if (canEditBrockFreePath(world.id) && brock.freePath.length > 0) {
    ctx.strokeStyle = "rgba(80, 226, 214, 0.9)";
    ctx.fillStyle = "rgba(80, 226, 214, 0.92)";
    ctx.lineWidth = 34;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();

    brock.freePath.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });

    ctx.stroke();

    for (const point of brock.freePath) {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 52, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = "#d9fffb";
    ctx.font = `900 ${labelSize}px Inter, system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText("Free Brock", brock.freePath[0].x, brock.freePath[0].y - 86);
  }

  if (canPlaceCapturedBrock(world.id) && brock.capturedPosition) {
    ctx.fillStyle = "rgba(255, 147, 92, 0.35)";
    ctx.strokeStyle = "rgba(255, 232, 184, 0.96)";
    ctx.lineWidth = 28;
    ctx.beginPath();
    ctx.arc(brock.capturedPosition.x, brock.capturedPosition.y, 70, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#ffe8b8";
    ctx.font = `900 ${labelSize}px Inter, system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText("Captured Brock", brock.capturedPosition.x, brock.capturedPosition.y - 96);
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

  drawBrockEditorObjects(world);

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
    const waystone = isWaystoneNode(node);
    ctx.fillStyle = waystone ? "rgba(255, 193, 87, 0.32)" : "rgba(172, 123, 255, 0.28)";
    ctx.strokeStyle = waystone ? "rgba(255, 241, 176, 0.96)" : "rgba(230, 210, 255, 0.95)";
    ctx.lineWidth = 34;
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    if (waystone) {
      ctx.save();
      ctx.translate(node.x, node.y);
      ctx.rotate(Math.PI / 4);
      ctx.strokeStyle = "rgba(91, 61, 24, 0.72)";
      ctx.lineWidth = 22;
      const markSize = node.radius * 0.62;
      ctx.strokeRect(-markSize / 2, -markSize / 2, markSize, markSize);
      ctx.restore();
    }
    ctx.fillStyle = waystone ? "#fff1b4" : "#f6edff";
    const labelSize = Math.max(46, Math.min(170, getMapWidth() * 0.014));
    ctx.font = `800 ${labelSize}px Inter, system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText(getNodeLabel(node), node.x, node.y + labelSize * 0.18);
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
  const capturedBrockPoint = getCapturedBrockPosition();
  if (capturedBrockPoint) {
    actors.push({ type: "capturedBrock", y: capturedBrockPoint.y, entity: capturedBrockPoint });
  }
  const rescuedBrock = getRescuedBrockActor();
  if (rescuedBrock) {
    actors.push({ type: "rescuedBrock", y: rescuedBrock.y, entity: rescuedBrock });
  }
  actors.push({ type: "player", y: state.player.y, entity: state.player });
  actors.sort((a, b) => a.y - b.y);

  for (const actor of actors) {
    if (actor.type === "player") {
      drawPlayerShadow();
    } else if (actor.type === "npc") {
      drawNpcShadow(actor.entity);
    } else if (actor.type === "capturedBrock") {
      drawCapturedBrockShadow(actor.entity);
    } else if (actor.type === "rescuedBrock") {
      drawCapturedBrockShadow(actor.entity);
    } else {
      drawDogmattShadow(actor.entity);
    }
  }

  for (const actor of actors) {
    if (actor.type === "player") {
      drawPlayer();
    } else if (actor.type === "npc") {
      drawNpc(actor.entity);
    } else if (actor.type === "capturedBrock") {
      drawCapturedBrock(actor.entity);
    } else if (actor.type === "rescuedBrock") {
      drawRescuedBrock(actor.entity);
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
  ctx.scale(getWorldRenderScale(), getWorldRenderScale());
  drawMap();
  drawFutureMonsterMarkers();
  drawWorldNodes();
  drawActors();
  drawArenaBattleLabels();
  drawParticles();
  drawBrockSearchLantern();
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
  if (!state.ready || state.dev.enabled || isIntroOpen() || isShopOpen() || isPauseMenuOpen() || isBossIntroPlaying() || (state.arena.active && state.arena.phase !== "idle")) {
    return;
  }

  if (state.player.stamina < PLAYER.whipStaminaCost) {
    setGameMessage("Ivan is too tired to swing.");
    return;
  }

  state.player.stamina = Math.max(0, state.player.stamina - PLAYER.whipStaminaCost);
  updatePlayerStatusHud();
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

  if ((key === "escape" || key === "enter" || key === " ") && isIntroOpen()) {
    event.preventDefault();
    closeNewGameIntro();
    return;
  }

  if (key === "escape" && isPauseMenuOpen()) {
    event.preventDefault();
    closePauseMenu();
    return;
  }

  if (key === "escape" && isShopOpen()) {
    event.preventDefault();
    if (state.arena.active) {
      leaveArena();
    } else {
      closeShop();
    }
    return;
  }

  if (key === "escape" && state.arena.active) {
    event.preventDefault();
    leaveArena();
    return;
  }

  if (isTypingTarget(event.target)) {
    return;
  }

  if (isIntroOpen()) {
    event.preventDefault();
    return;
  }

  if (isPauseMenuOpen()) {
    event.preventDefault();
    return;
  }

  if (isShopOpen()) {
    event.preventDefault();
    return;
  }

  if (state.arena.active && state.arena.phase !== "idle") {
    event.preventDefault();
    return;
  }

  if (isBossIntroPlaying()) {
    event.preventDefault();
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

  if (state.followerCommand.targeting && key === "escape") {
    event.preventDefault();
    setFollowerCommandMode("follow");
    return;
  }

  const followerCommand = FOLLOWER_COMMAND_KEYS[key];
  if (followerCommand && !event.repeat) {
    event.preventDefault();
    setFollowerCommandMode(followerCommand);
    return;
  }

  if (key === "escape" && !event.repeat) {
    event.preventDefault();
    openPauseMenu("character");
    return;
  }

  ensureAudio();

  if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(key)) {
    event.preventDefault();
  }

  if (key === "i" && !event.repeat) {
    event.preventDefault();
    openInventory();
    return;
  }

  if (key === "k" && !event.repeat) {
    event.preventDefault();
    openPauseMenu("skills");
    return;
  }

  if (key === "m" && !event.repeat) {
    event.preventDefault();
    openPauseMenu("map");
    return;
  }

  if (key === "j" && !event.repeat) {
    event.preventDefault();
    openPauseMenu("journal");
    return;
  }

  if (key === "e" && !event.repeat) {
    event.preventDefault();
    if (!state.dev.enabled) {
      tryRescueNearbyBrock() || tryInteractNearbyWaystone() || tryOpenNearbyShop();
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
  saveEconomy();
  keys.clear();
  touchInput.sprint = false;
  resetTouchJoystick();
  if (touchSprint) {
    touchSprint.classList.remove("active");
  }
});

canvas.addEventListener("pointerdown", (event) => {
  if (isIntroOpen() || isPauseMenuOpen() || isBossIntroPlaying()) {
    event.preventDefault();
    return;
  }

  if (state.dev.enabled) {
    handleDevPointerDown(event);
    return;
  }

  if (handleFollowerTargetPointer(event)) {
    return;
  }

  if (event.pointerType !== "mouse") {
    if (tryRescueNearbyBrock() || tryOpenNearbyShop()) {
      event.preventDefault();
      return;
    }
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

for (const button of followerCommandButtons) {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    ensureAudio();
    setFollowerCommandMode(button.dataset.followerCommand);
  });
}

inventoryButton?.addEventListener("click", () => {
  openInventory();
});

touchInventory?.addEventListener("click", (event) => {
  event.preventDefault();
  openInventory();
});

pauseMenuClose?.addEventListener("click", () => {
  closePauseMenu();
});

introClose?.addEventListener("click", () => {
  closeNewGameIntro();
});

newGameIntro?.addEventListener("click", (event) => {
  if (event.target === newGameIntro) {
    closeNewGameIntro();
  }
});

pauseMenuTabs?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-tab]");
  if (!button) {
    return;
  }

  state.pauseMenuTab = button.dataset.tab;
  renderPauseMenu();
});

pauseMenuContent?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button || button.disabled) {
    return;
  }

  const { action, id } = button.dataset;
  if (action === "pause-tab") {
    state.pauseMenuTab = id;
    renderPauseMenu();
  } else if (action === "inventory-category") {
    state.inventoryCategory = INVENTORY_CATEGORIES.some((category) => category.id === id) ? id : "all";
    renderPauseMenu();
  } else if (action === "use-item") {
    useInventoryItem(id);
  } else if (action === "complete-mission") {
    completeMission(id);
  } else if (action === "intro-advance") {
    advanceIntroQuest(id);
  } else if (action === "brock-mission-advance") {
    startBrockMissionSearch();
  } else if (action === "bond-care") {
    careForMatt(id);
  } else if (action === "bond-treat") {
    useBondItemOnMatt(id, "matt_treat", 12);
  } else if (action === "bond-brush") {
    useBondItemOnMatt(id, "camp_brush", 16, 5);
  } else if (action === "bond-mint") {
    useBondItemOnMatt(id, "focus_mint", 8, 18);
  } else if (action === "bond-spar") {
    sparWithMatt(id);
  } else if (action === "set-follower") {
    setActiveFollower(id);
  } else if (action === "clear-follower") {
    clearActiveFollower(id);
  } else if (action === "rename-matt") {
    renameCapturedMatt(id);
  } else if (action === "learn-skill") {
    unlockSkill(id);
  } else if (action === "reset-skills") {
    resetPlayerSkills();
  }
});

pauseMenu?.addEventListener("click", (event) => {
  if (event.target === pauseMenu) {
    closePauseMenu();
  }
});

shopClose?.addEventListener("click", () => {
  if (state.arena.active) {
    leaveArena();
  } else {
    closeShop();
  }
});

shopTabs?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-tab]");
  if (button) {
    setShopTab(button.dataset.tab);
  }
});

shopList?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button || button.disabled) {
    return;
  }

  const { action, id } = button.dataset;
  if (action === "buy-item") {
    buyShopItem(id);
  } else if (action === "sell-item") {
    sellInventoryItem(id);
  } else if (action === "use-item") {
    useInventoryItem(id);
  } else if (action === "sell-matt") {
    sellCapturedMatt(id);
  } else if (action === "talk-topic") {
    state.activeDialogueTopic = id;
    renderShop();
  } else if (action === "talk-back") {
    state.activeDialogueTopic = "";
    renderShop();
  } else if (action === "post-brock-story") {
    handlePostBrockStoryAction(id);
  } else if (action === "shop-tab") {
    setShopTab(id);
  } else if (action === "complete-mission") {
    completeMission(id);
  } else if (action === "intro-advance") {
    advanceIntroQuest(id);
  } else if (action === "brock-mission-advance") {
    startBrockMissionSearch();
  } else if (action === "bond-care") {
    careForMatt(id);
  } else if (action === "bond-treat") {
    useBondItemOnMatt(id, "matt_treat", 12);
  } else if (action === "bond-brush") {
    useBondItemOnMatt(id, "camp_brush", 16, 5);
  } else if (action === "bond-mint") {
    useBondItemOnMatt(id, "focus_mint", 8, 18);
  } else if (action === "bond-spar") {
    sparWithMatt(id);
  } else if (action === "tame-matt") {
    tameCapturedMatt(id);
  } else if (action === "set-follower") {
    setActiveFollower(id);
  } else if (action === "clear-follower") {
    clearActiveFollower(id);
  } else if (action === "rename-matt") {
    renameCapturedMatt(id);
  } else if (action === "learn-skill") {
    unlockSkill(id);
  } else if (action === "reset-skills") {
    resetPlayerSkills();
  } else if (action === "arena-select-matt") {
    startArenaBattle(id);
  } else if (action === "arena-ability") {
    arenaUseAbility(Number(id));
  } else if (action === "arena-leave") {
    leaveArena();
  }
});

arenaBattleActions?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button || button.disabled) {
    return;
  }

  const { action, id } = button.dataset;
  if (action === "arena-ability") {
    arenaUseAbility(Number(id));
  } else if (action === "arena-leave") {
    leaveArena();
  }
});

window.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

function preventMobilePageZoom(event) {
  if (event.touches?.length > 1) {
    event.preventDefault();
  }
}

document.addEventListener("touchmove", preventMobilePageZoom, { passive: false });
document.addEventListener("gesturestart", (event) => event.preventDefault());
document.addEventListener("gesturechange", (event) => event.preventDefault());
document.addEventListener("gestureend", (event) => event.preventDefault());

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

  touchActiveProfile(true);

  state.ready = false;
  hideLauncher();
  closeShop();
  closePauseMenu();

  if (loading) {
    loading.textContent = `Loading ${state.profileName}...`;
    loading.classList.remove("hidden");
  }

  const allowLegacy = shouldUseLegacyProfileStorage(profileId);
  const isFreshSave = !hasProfileGameProgress(profileId, { allowLegacy });
  const showIntro = shouldShowNewGameIntro();
  state.currentWorld = DEFAULT_WORLD_ID;
  state.worlds = loadWorlds({ allowLegacy });
  state.capturedParty = loadCapturedParty({ allowLegacy });
  loadEconomy({ allowLegacy });
  if (isIntroChainActive() && getActiveIntroQuest().id === "intro_wake_brick") {
    state.capturedParty = [];
    state.captureStats = normalizeCaptureStats();
  }
  const startsInIntro = isFreshSave && isIntroChainActive();
  if (startsInIntro) {
    state.currentWorld = INTRO_START_WORLD_ID;
  } else if (isFreshSave) {
    state.currentWorld = DEFAULT_WORLD_ID;
  }
  state.caughtDogmatts = -1;
  state.clockMinutes = CLOCK.startHour * 60;
  state.lastNightState = isNightTime();
  state.dogmatts = [];
  state.npcs = [];
  state.particles = [];
  state.screenShake = 0;
  state.primeMysticGravityWell = null;
  state.cameraFocus = null;
  resetArenaBattle(false);

  const start = startsInIntro
    ? { ...INN_RECOVERY_POINT }
    : isFreshSave
      ? getNewGameStartPoint()
      : getMapCenter(state.currentWorld);
  state.player.x = start.x;
  state.player.y = start.y;
  state.player.direction = "down";
  state.player.facingX = 0;
  state.player.facingY = 1;
  state.player.action = "breathing";
  state.player.frameIndex = 0;
  state.player.frameTimer = 0;
  schedulePlayerIdleFlourish(state.player);
  state.player.moving = false;
  state.player.health = getPlayerMaxHealth();
  state.player.stamina = getPlayerMaxStamina();
  state.player.damageCooldown = 0;
  seedPlayerTrail();
  initDevPanel();
  updateTimeLabel();
  updateEconomyHud();
  updatePlayerProgressHud();
  updatePlayerStatusHud();

  if (new URLSearchParams(window.location.search).has("dev")) {
    setDevMode(true);
  }

  try {
    await assetsReady;
    spawnDogmatts();
    spawnNpcs();
    spawnScriptedWizardIfNeeded();
    spawnPendingDementedMattAmbushIfNeeded();
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

    if (isFreshSave && isIntroChainActive()) {
      window.setTimeout(() => openShop("brick"), 0);
    } else if (showIntro) {
      showNewGameIntro();
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
  localStorage.removeItem(getEconomyStorageKey());
  localStorage.removeItem(getNewGameIntroStorageKey());
  saveProfiles();
  setActiveProfile(state.profiles[0].id);
  updateProfileList();
  setProfileStatus(`${deleted?.name || "Profile"} deleted.`);
});

profileMenu?.addEventListener("click", () => {
  if (state.ready) {
    saveCapturedParty();
    saveEconomy();
    saveWorlds();
  }

  state.ready = false;
  closeShop();
  closePauseMenu();
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
