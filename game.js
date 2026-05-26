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
    width: 2160,
    height: 2160,
    type: "image",
    image: "assets/maps/water/watertree.jfif",
    fill: "#102a35",
  },
  water_hut: {
    width: 2160,
    height: 2160,
    type: "image",
    image: "assets/maps/water/waterhut.jfif",
    fill: "#102a35",
  },
  water_cove: {
    width: 2160,
    height: 2160,
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
    image: "assets/maps/grass/grasscave.jfif",
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
};

const WORLD_MATT_TYPES = {
  mainworld: "dogmatt",
  fireworld: "firematt",
  grass_tree: "grassmatt",
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
  grass_tree: { levelMin: 12, levelMax: 12, captureDifficulty: 4.2, damageScale: 1.45, count: 1 },
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
    attackDamage: 28,
    attackRadius: 225,
    attackWindup: 0.34,
    attackCooldown: 1.65,
    staminaDamage: 8,
    knockback: 70,
    screenShake: 12,
  },
  {
    id: "spore_burst",
    name: "Spore Burst",
    action: "sporeBurst",
    effect: "sporeBurst",
    hitShape: "circle",
    attackDamage: 22,
    attackRadius: 430,
    attackWindup: 0.42,
    attackCooldown: 2.15,
    projectileCount: 18,
    projectileSpeed: 610,
    staminaDamage: 12,
    screenShake: 9,
  },
  {
    id: "thorn_fan",
    name: "Thorn Fan",
    action: "thornFan",
    effect: "thornFan",
    hitShape: "cone",
    attackDamage: 26,
    attackRadius: 660,
    attackWindup: 0.3,
    attackCooldown: 1.95,
    projectileCount: 9,
    projectileSpeed: 700,
    coneArc: Math.PI * 0.72,
    staminaDamage: 10,
    knockback: 55,
    screenShake: 10,
  },
  {
    id: "root_snare",
    name: "Root Snare",
    action: "rootSnare",
    effect: "rootSnare",
    hitShape: "beam",
    attackDamage: 27,
    attackRadius: 900,
    attackWindup: 0.5,
    attackCooldown: 2.5,
    beamWidth: 82,
    staminaDamage: 22,
    knockback: 90,
    screenShake: 12,
  },
  {
    id: "canopy_quake",
    name: "Canopy Quake",
    action: "canopyQuake",
    effect: "canopyQuake",
    hitShape: "circle",
    attackDamage: 36,
    attackRadius: 720,
    attackWindup: 0.72,
    attackCooldown: 3.35,
    staminaDamage: 20,
    knockback: 150,
    screenShake: 20,
  },
];

const WORLD_BOSS_MATTS = {
  grass_tree: {
    id: "prime-grass-matt",
    name: "Prime Grass Matt",
    type: "grassmatt",
    assetKey: "primegrassmatt",
    x: 3800,
    y: 3000,
    scale: 2.2,
    aggroRadius: 900,
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
  logan: {
    id: "logan",
    name: "Logan",
    homeWorld: "town_itemshop",
    x: 3800,
    y: 3180,
  },
};

const NPC_IDS = Object.keys(NPC_DEFS);

const MATT_LABELS = {
  dogmatt: "Mattdogs",
  firematt: "Fire Matts",
  grassmatt: "Grass Matts",
  watermatt: "Water Matts",
  rockmatt: "Rock Matts",
  mysticmatt: "Mystic Matts",
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
};

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
  logan: {
    title: "Logan's Item Shop",
    greeting: "Logan keeps the shelves stocked for long roads and bad weather.",
    buy: ["health_potion", "greater_health_potion", "stamina_tonic", "matt_snack", "capture_net", "calming_flute", "camp_brush", "focus_mint", "trail_map"],
  },
};

const NPC_DIALOGUE = {
  scott: {
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
    intro:
      "Ty smells faintly of grain, rainwater, and ink. Every Matt he buys or sells gets marked in a careful ledger full of little paw prints.",
    topics: [
      {
        id: "matts",
        label: "Matt Care",
        text:
          "Do not think of Matts as loot. Feed them, travel with them, let them win sometimes. Friendship changes how they stand in the arena.",
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
  logan: {
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

const MATT_SELL_VALUES = {
  dogmatt: 35,
  firematt: 85,
  grassmatt: 70,
  watermatt: 75,
  rockmatt: 95,
  mysticmatt: 120,
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
  max: 260,
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

const PLAYER_SKILLS = {
  trail_runner: {
    id: "trail_runner",
    name: "Trail Runner",
    branch: "Explorer",
    maxRank: 3,
    description: "Move faster and sprint longer.",
    perRank: "+30 walk speed, +45 sprint speed, +8 stamina",
  },
  steady_breath: {
    id: "steady_breath",
    name: "Steady Breath",
    branch: "Explorer",
    maxRank: 3,
    requires: { trail_runner: 1 },
    description: "Recover stamina faster and spend less while sprinting.",
    perRank: "+7 stamina regen, -2 sprint drain",
  },
  field_endurance: {
    id: "field_endurance",
    name: "Field Endurance",
    branch: "Survivor",
    maxRank: 3,
    description: "Increase Ivan's maximum health.",
    perRank: "+14 max health",
  },
  iron_will: {
    id: "iron_will",
    name: "Iron Will",
    branch: "Survivor",
    maxRank: 3,
    requires: { field_endurance: 1 },
    description: "Reduce wild Matt damage before armor is applied.",
    perRank: "-6% wild damage",
  },
  whip_mastery: {
    id: "whip_mastery",
    name: "Whip Mastery",
    branch: "Hunter",
    maxRank: 3,
    description: "Extend whip reach and make field captures less exhausting.",
    perRank: "+28 whip range, capture XP bonus",
  },
  calm_hands: {
    id: "calm_hands",
    name: "Calm Hands",
    branch: "Hunter",
    maxRank: 3,
    requires: { whip_mastery: 1 },
    description: "Improve capture odds against stronger Matts.",
    perRank: "+6% capture chance",
  },
  matt_mentor: {
    id: "matt_mentor",
    name: "Matt Mentor",
    branch: "Bond",
    maxRank: 3,
    description: "Captured Matts gain more friendship and arena XP.",
    perRank: "+15% Matt XP and +1 friendship rewards",
  },
  arena_instinct: {
    id: "arena_instinct",
    name: "Arena Instinct",
    branch: "Bond",
    maxRank: 3,
    requires: { matt_mentor: 1 },
    description: "Start arena battles sharper and hit harder.",
    perRank: "+3 arena energy, +2 arena power",
  },
};

function numberedFrames(path, count) {
  return Array.from({ length: count }, (_, index) => `${path}/${index + 1}.png`);
}

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
  watermatt: {
    idle: ["assets/matts/watermatt/idle/1.png"],
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
  coins: STARTING_COINS,
  inventory: {},
  missions: {},
  playerProgress: { level: 1, xp: 0, skillPoints: 0, skills: {} },
  arenaStats: { wins: 0, losses: 0, streak: 0, bestStreak: 0, rankPoints: 0 },
  friendshipCare: {},
  friendshipWalkTimer: 0,
  activeShopId: "",
  shopTab: "buy",
  pauseMenuTab: "character",
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
  },
  toastTimer: null,
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

async function loadAssets() {
  const worldImageEntries = Object.entries(WORLD_MAPS).filter(([, map]) => map.type === "image" || map.overview);
  const [
    worldImages,
    ivanFrames,
    dogmattFrames,
    firemattFrames,
    grassmattFrames,
    primegrassmattFrames,
    watermattFrames,
    rockmattFrames,
    mysticmattFrames,
    effectImages,
    npcFrames,
  ] = await Promise.all([
    Promise.all(
      worldImageEntries.map(async ([id, map]) => [id, await loadImage(map.overview || map.image)]),
    ),
    loadAnimationSet(ASSETS.ivan, PLAYER.width, PLAYER.height),
    loadAnimationSet(ASSETS.dogmatt, DOGMATT.width, DOGMATT.height),
    loadAnimationSet(ASSETS.firematt, FIREMATT.width, FIREMATT.height),
    loadAnimationSet(ASSETS.grassmatt, GRASSMATT.width, GRASSMATT.height),
    loadAnimationSet(ASSETS.primegrassmatt, GRASSMATT.width, GRASSMATT.height),
    loadAnimationSet(ASSETS.watermatt, WATERMATT.width, WATERMATT.height),
    loadAnimationSet(ASSETS.rockmatt, ROCKMATT.width, ROCKMATT.height),
    loadAnimationSet(ASSETS.mysticmatt, MYSTICMATT.width, MYSTICMATT.height),
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
  Object.assign(images.watermatt, watermattFrames);
  Object.assign(images.rockmatt, rockmattFrames);
  Object.assign(images.mysticmatt, mysticmattFrames);
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

function getEconomyStorageKey() {
  return getProfileScopedStorageKey(ECONOMY_STORAGE_KEY);
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
  upsertNodeByTarget(worlds.water_tree, "node-water-tree-to-waterworld", 1080, 1940, "purplewaterworld", 120);
  upsertNodeByTarget(worlds.water_hut, "node-water-hut-to-waterworld", 1080, 1940, "purplewaterworld", 120);
  upsertNodeByTarget(worlds.water_cove, "node-water-cove-to-waterworld", 1080, 1940, "purplewaterworld", 120);
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
    name: normalizeNodeName(node?.name),
    locked: Boolean(node?.locked),
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
  applyCoreWorldFixups(worlds);
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

function loadEconomy() {
  try {
    const saved = localStorage.getItem(getEconomyStorageKey()) || localStorage.getItem(ECONOMY_STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      state.coins = Math.max(0, Math.floor(Number(data.coins) || 0));
      state.inventory = normalizeInventory(data.inventory);
      state.missions = normalizeMissions(data.missions);
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
  state.playerProgress = normalizePlayerProgress();
  state.arenaStats = normalizeArenaStats();
  state.friendshipCare = {};
}

function saveEconomy() {
  try {
    localStorage.setItem(
      getEconomyStorageKey(),
      JSON.stringify({
        version: 4,
        coins: state.coins,
        inventory: state.inventory,
        missions: state.missions,
        playerProgress: state.playerProgress,
        arenaStats: state.arenaStats,
        friendshipCare: state.friendshipCare,
      }),
    );
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
  if (!playerCounter) {
    return;
  }

  const level = getPlayerLevel();
  const xp = Math.max(0, Math.floor(Number(state.playerProgress?.xp) || 0));
  const next = level >= MAX_PLAYER_LEVEL ? "MAX" : `${xp} / ${getPlayerXpToNext(level)}`;
  playerCounter.textContent = `Ivan Lv ${level} - XP ${next} - SP ${getPlayerSkillPoints()}`;
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
  state.playerProgress.skillPoints -= 1;
  state.playerProgress.skills[skillId] = getSkillRank(skillId) + 1;
  if (skillId === "field_endurance") {
    state.player.health = Math.min(getPlayerMaxHealth(), (state.player.health || 0) + 14);
  }
  if (skillId === "trail_runner") {
    state.player.stamina = Math.min(getPlayerMaxStamina(), (state.player.stamina || 0) + 8);
  }
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
    getSkillBonus("field_endurance", 14);
}

function getPlayerMaxStamina() {
  return PLAYER.maxStamina + (hasItem("swift_boots") ? 20 : 0) + (hasItem("trail_map") ? 12 : 0) + getSkillBonus("trail_runner", 8);
}

function updatePlayerStatusHud() {
  const maxHealth = getPlayerMaxHealth();
  const maxStamina = getPlayerMaxStamina();
  state.player.health = clamp(state.player.health ?? maxHealth, 0, maxHealth);
  state.player.stamina = clamp(state.player.stamina ?? maxStamina, 0, maxStamina);

  if (healthCounter) {
    healthCounter.textContent = `Health: ${Math.ceil(state.player.health)} / ${maxHealth}`;
  }

  if (staminaCounter) {
    staminaCounter.textContent = `Stamina: ${Math.ceil(state.player.stamina)} / ${maxStamina}`;
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
    getSkillBonus("whip_mastery", 28);
}

function getPlayerWalkSpeed() {
  return PLAYER.speed + (hasItem("swift_boots") ? 130 : 0) + (hasItem("trail_map") ? 55 : 0) + getSkillBonus("trail_runner", 30);
}

function getPlayerSprintSpeed() {
  return PLAYER.sprintSpeed + (hasItem("swift_boots") ? 160 : 0) + (hasItem("trail_map") ? 70 : 0) + getSkillBonus("trail_runner", 45);
}

function getPlayerStaminaRegen() {
  return PLAYER.staminaRegen + getSkillBonus("steady_breath", 7);
}

function getPlayerSprintStaminaCost() {
  return Math.max(10, PLAYER.sprintStaminaCost - getSkillBonus("steady_breath", 2));
}

function getArmorDamageReduction() {
  const reductions = ["guard_armor", "steel_armor", "tempered_plate"]
    .filter(hasItem)
    .map((itemId) => ITEM_DEFS[itemId].armor || 0);
  const armorReduction = reductions.length > 0 ? Math.max(...reductions) : 0;
  return clamp(armorReduction + getSkillBonus("iron_will", 0.06), 0, 0.72);
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
  const level = getMattLevel(matt);
  const difficulty = Number(matt?.captureDifficulty) || 1;
  if (matt?.boss) {
    const underLevelPenalty = Math.max(0, 10 - getPlayerLevel());
    return clamp(Math.round(9 + difficulty + level / 4 + underLevelPenalty * 1.15), 12, 24);
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
  if (hasItem("matt_snack")) {
    threshold -= 1;
  }
  if (hasItem("capture_net")) {
    threshold -= 1;
  }
  if (hasItem("calming_flute")) {
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
  return Math.max(1, Math.round(base * scale * (1 + (level - 1) * 0.045 + (difficulty - 1) * 0.055)));
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
    level,
    xp,
    friendship,
    captureDifficulty,
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
  state.activeShopId = shopId;
  state.shopTab = "talk";
  state.activeDialogueTopic = "";
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

function getInventoryEntries() {
  return Object.entries(state.inventory)
    .filter(([itemId, count]) => ITEM_DEFS[itemId] && count > 0)
    .sort(([a], [b]) => ITEM_DEFS[a].name.localeCompare(ITEM_DEFS[b].name));
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
  const row = document.createElement("article");
  row.className = "shop-item";

  const info = document.createElement("div");
  const title = document.createElement("strong");
  title.textContent = item.name;
  const detail = document.createElement("span");
  detail.textContent = mode === "buy"
    ? `${item.description} Price: ${item.price} coins${item.unique ? " each profile" : ""}.`
    : `${item.description} You own ${count}. Sell: ${item.sellPrice} coins.`;
  info.append(title, detail);

  const owned = document.createElement("em");
  owned.textContent = `x${count}`;

  let action;
  if (mode === "buy") {
    action = makeShopButton(
      "Buy",
      "buy-item",
      itemId,
      state.coins < item.price ||
        (item.unique && count > 0) ||
        (item.mattType && state.capturedParty.length >= MATT_PARTY_LIMIT),
    );
  } else if (mode === "sell") {
    action = makeShopButton("Sell", "sell-item", itemId, count <= 0);
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
    bond: "Bond",
    skills: "Skills",
  }[tab] || tab;
}

function renderTalk(parent, shopId) {
  const dialogue = NPC_DIALOGUE[shopId];
  if (!dialogue) {
    appendEmptyShopMessage(parent, "They do not have much to say right now.");
    return;
  }

  const topic = dialogue.topics.find((candidate) => candidate.id === state.activeDialogueTopic);
  if (topic) {
    appendShopTextCard(parent, topic.label, topic.text, makeShopButton("Back", "talk-back"));
    appendShopTextCard(parent, "Work", "Ask what they need from the wild roads.", makeShopButton("Mission", "shop-tab", "mission"));
    appendShopTextCard(parent, "Trade", "Open their goods and services.", makeShopButton("Buy", "shop-tab", "buy"));
    return;
  }

  appendShopTextCard(parent, shopTitle?.textContent || "Talk", dialogue.intro);
  dialogue.topics.forEach((candidate) => {
    appendShopTextCard(
      parent,
      candidate.label,
      "Ask about this.",
      makeShopButton("Ask", "talk-topic", candidate.id),
    );
  });
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

function renderMission(parent, shopId) {
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
  const ivanProgress = awardPlayerXp(12 + getPlayerLevel(), "sparring");
  updatePlayerStatusHud();
  renderActiveOverlay(
    result.leveled
      ? `${getArenaMattName(result.matt)} sparred hard and reached Lv ${result.matt.level}. Ivan XP +${ivanProgress.gained}.`
      : `${getArenaMattName(result.matt)} sparred with Ivan. XP +${result.xpGain}, friendship +${result.friendshipGain}. Ivan XP +${ivanProgress.gained}.`,
  );
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
    title.textContent = matt.name || MATT_LABELS[matt.type] || "Captured Matt";
    const detail = document.createElement("span");
    detail.textContent = `Lv ${getMattLevel(matt)} | XP ${matt.xp || 0}/${getMattXpToNext(getMattLevel(matt))} | ${getFriendshipLine(matt)}. ${getFriendshipBonusLine(matt)}`;
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
    title.textContent = matt.name || MATT_LABELS[matt.type] || "Captured Matt";
    const detail = document.createElement("span");
    detail.textContent = `Lv ${getMattLevel(matt)} | ${getFriendshipLine(matt)}. ${getWorldLabel(matt.sourceWorld || DEFAULT_WORLD_ID)} capture. Ty pays ${value} coins.`;
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
    const tabs = shop ? ["talk", "mission", "buy", "sell", "inventory", "bond", "skills"] : ["inventory", "bond", "skills"];
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

function renderPauseCharacter(parent) {
  const grid = createMenuGrid(parent);
  const maxHealth = getPlayerMaxHealth();
  const maxStamina = getPlayerMaxStamina();
  const level = getPlayerLevel();
  const xp = Math.max(0, Math.floor(Number(state.playerProgress?.xp) || 0));
  const nextXp = level >= MAX_PLAYER_LEVEL ? 1 : getPlayerXpToNext(level);

  const stats = appendMenuCard(grid, "Ivan", `${getWorldLabel(state.currentWorld)} | ${timeLabel?.textContent || ""}`, "full compact");
  const statGrid = document.createElement("div");
  statGrid.className = "menu-stat-grid";
  appendMenuStat(statGrid, "Level", String(level), `${xp}/${nextXp} XP`, level >= MAX_PLAYER_LEVEL ? 1 : xp / nextXp);
  appendMenuStat(statGrid, "Health", `${Math.ceil(state.player.health)}/${maxHealth}`, "", state.player.health / maxHealth);
  appendMenuStat(statGrid, "Stamina", `${Math.ceil(state.player.stamina)}/${maxStamina}`, "", state.player.stamina / maxStamina);
  appendMenuStat(statGrid, "Coins", String(state.coins), `${getPlayerSkillPoints()} skill point${getPlayerSkillPoints() === 1 ? "" : "s"}`);
  stats.append(statGrid);

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
      appendMenuRow(
        table,
        matt.name || MATT_LABELS[matt.type] || "Captured Matt",
        `Lv ${getMattLevel(matt)} | ${getFriendshipLine(matt)} | ${getWorldLabel(matt.sourceWorld || DEFAULT_WORLD_ID)}`,
        `${matt.xp || 0}/${getMattXpToNext(getMattLevel(matt))}`,
      );
    });
    party.append(table);
  }
}

function renderPauseInventory(parent) {
  const grid = createMenuGrid(parent);
  const card = appendMenuCard(grid, "Pack", `${getInventoryEntries().length} item type${getInventoryEntries().length === 1 ? "" : "s"}`, "full");
  const table = document.createElement("div");
  table.className = "menu-table";
  const entries = getInventoryEntries();

  if (entries.length === 0) {
    appendMenuEmpty(card, "Your pack is empty.");
    return;
  }

  entries.forEach(([itemId]) => {
    const item = ITEM_DEFS[itemId];
    const count = getItemCount(itemId);
    const action = item.bondOnly
      ? makeMenuButton("Party", "pause-tab", "party", state.capturedParty.length === 0)
      : item.use
        ? makeMenuButton("Use", "use-item", itemId, count <= 0)
        : null;
    appendMenuRow(table, item.name, item.description, `x${count}`, action);
  });
  card.append(table);
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
  summary.append(makeMenuButton("Reset", "reset-skills", null, getSpentSkillPoints() <= 0));

  let currentBranch = "";
  Object.values(PLAYER_SKILLS).forEach((skill) => {
    if (skill.branch !== currentBranch) {
      currentBranch = skill.branch;
      const heading = document.createElement("h3");
      heading.className = "menu-branch";
      heading.textContent = currentBranch;
      grid.append(heading);
    }

    const rank = getSkillRank(skill.id);
    const check = canUnlockSkill(skill.id);
    const requirement = getSkillRequirementText(skill);
    const label = rank >= skill.maxRank ? "Max" : getPlayerSkillPoints() <= 0 ? "No SP" : check.ok ? "Learn" : "Locked";
    const rowClass = rank >= skill.maxRank ? "menu-skill maxed" : check.ok ? "menu-skill" : "menu-skill locked";
    appendMenuRow(
      grid,
      skill.name,
      `Rank ${rank}/${skill.maxRank}. ${skill.description} ${skill.perRank}${requirement ? `. Requires ${requirement}` : ""}.`,
      rank >= skill.maxRank ? "Max" : `${rank}/${skill.maxRank}`,
      makeMenuButton(label, "learn-skill", skill.id, !check.ok),
      rowClass,
    );
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

  const image = images.worldMaps[state.currentWorld];
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

  getWorld().nodes.forEach((node) => drawDot(node.x, node.y, 5, node.locked ? "#ff7a5c" : "#8bd3ff"));
  state.npcs.forEach((npc) => drawDot(npc.x, npc.y, 4, "#a0d8ff"));
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
  appendMenuCard(grid, "Connections", getWorld().nodes.map((node) => getWorldLabel(node.target)).join(", ") || "None", "compact");
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
    const card = appendMenuCard(grid, dialogue.title || "Journal", dialogue.intro, "wide");
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

  state.capturedParty.forEach((matt) => {
    const card = appendMenuCard(
      grid,
      matt.name || MATT_LABELS[matt.type] || "Captured Matt",
      `Lv ${getMattLevel(matt)} | XP ${matt.xp || 0}/${getMattXpToNext(getMattLevel(matt))} | ${getFriendshipLine(matt)}. ${getFriendshipBonusLine(matt)}`,
      "full",
    );
    const actions = document.createElement("div");
    actions.className = "menu-actions";
    actions.append(
      makeMenuButton("Care", "bond-care", matt.partyId, !canCareForMatt(matt)),
      makeMenuButton("Treat", "bond-treat", matt.partyId, getItemCount("matt_treat") <= 0 || (matt.friendship || 0) >= 100),
      makeMenuButton("Brush", "bond-brush", matt.partyId, getItemCount("camp_brush") <= 0 || (matt.friendship || 0) >= 100),
      makeMenuButton("Mint", "bond-mint", matt.partyId, getItemCount("focus_mint") <= 0 || (matt.friendship || 0) >= 100),
      makeMenuButton("Spar", "bond-spar", matt.partyId, state.player.stamina < 25),
    );
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
  const rank = getFriendshipRank(matt?.friendship || 0);
  return getMattLevel(matt) * 3 + Math.floor((Number(matt?.friendship) || 0) / 12) + rank.power + opponentBoost + handbookBonus + instinctBonus;
}

function getArenaMattCritChance(matt, ability = {}) {
  const rank = getFriendshipRank(matt?.friendship || 0);
  return clamp(rank.crit + (ability.crit || 0), 0.02, 0.45);
}

function getArenaInitialEnergy(matt, opponentBoost = 0, includePlayerItems = true) {
  const rank = getFriendshipRank(matt?.friendship || 0);
  const locketBonus = includePlayerItems && hasItem("memory_locket") ? 6 : 0;
  const instinctBonus = includePlayerItems ? getSkillBonus("arena_instinct", 3) : 0;
  return clamp(62 + rank.energy + Math.floor(getMattLevel(matt) / 3) + opponentBoost + locketBonus + instinctBonus, 0, ARENA_MAX_ENERGY);
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
      title.textContent = matt.name || MATT_LABELS[matt.type] || "Captured Matt";
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
  arena.phase = won ? "won" : "lost";
  arena.turnLocked = false;

  const stats = normalizeArenaStats(state.arenaStats);
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

  if (!shop || !item || !shop.buy.includes(itemId)) {
    return;
  }

  if (item.unique && hasItem(itemId)) {
    renderShop(`You already own ${item.name}.`);
    return;
  }

  if (state.coins < item.price) {
    renderShop(`Not enough coins for ${item.name}.`);
    return;
  }

  if (item.mattType && state.capturedParty.length >= MATT_PARTY_LIMIT) {
    renderShop(`Party full: ${MATT_PARTY_LIMIT} Matts max.`);
    return;
  }

  state.coins -= item.price;
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
  if (!item || getItemCount(itemId) <= 0) {
    return;
  }

  removeItem(itemId);
  state.coins += item.sellPrice;
  saveEconomy();
  updateEconomyHud();
  updatePlayerStatusHud();
  renderShop(`Sold ${item.name} for ${item.sellPrice} coins.`);
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
    state.player.health = clamp(state.player.health + item.use.health, 0, maxHealth);
    used = true;
  }

  if (item.use.stamina && state.player.stamina < maxStamina) {
    state.player.stamina = clamp(state.player.stamina + item.use.stamina, 0, maxStamina);
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
  renderShop(`Ty bought ${matt.name || "a Matt"} for ${value} coins.`);
}

function setDevStatus(message) {
  if (devStatus) {
    devStatus.textContent = message;
  }
}

function setGameMessage(message) {
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
  }, 2200);
}

function getWorldLabel(id) {
  return WORLD_LABELS[id] || id;
}

function getNodeLabel(node) {
  return normalizeNodeName(node?.name) || getWorldLabel(node?.target);
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

function getTransitionSpawnPoint(destinationWorldId, fromWorldId = "") {
  const destination = state.worlds[destinationWorldId];
  const matchingNode = fromWorldId
    ? destination?.nodes?.find((node) => node.target === fromWorldId)
    : null;

  if (matchingNode) {
    return { x: matchingNode.x, y: matchingNode.y };
  }

  return getMapCenter(destinationWorldId);
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
  state.currentWorld = id;
  state.lastPreloadKey = "";
  state.dev.activePathId = null;
  state.dev.activeNpcPathId = null;
  state.dev.activeWallId = null;
  state.dev.activeNodeId = null;

  if (movePlayer) {
    const spawnPoint = getTransitionSpawnPoint(id, fromWorldId);
    state.player.x = spawnPoint.x;
    state.player.y = spawnPoint.y;
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

  devNodeName?.addEventListener("input", () => {
    const world = getWorld();
    const node = world.nodes.find((candidate) => candidate.id === state.dev.activeNodeId);

    if (node) {
      node.name = normalizeNodeName(devNodeName.value);
      saveWorlds();
      setDevStatus(`Node renamed to ${getNodeLabel(node)}.`);
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

  if (tool !== "node") {
    state.dev.activeNodeId = null;
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
          : tool === "node"
            ? " Type a node name, choose its target, then click the map."
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

  if (state.dev.tool === "node") {
    const target = devNodeTarget?.value || "town";
    const name = normalizeNodeName(devNodeName?.value);
    const existingNode = world.nodes.find(
      (candidate) => Math.hypot(candidate.x - point.x, candidate.y - point.y) <= candidate.radius + 30,
    );

    if (existingNode) {
      existingNode.target = target;
      existingNode.name = name;
      state.dev.activeNodeId = existingNode.id;
      if (devNodeName) {
        devNodeName.value = existingNode.name;
      }
      saveWorlds();
      setDevStatus(`${getNodeLabel(existingNode)} node updated. Target: ${getWorldLabel(target)}.`);
      return;
    }

    const node = {
      id: createId("node"),
      x: point.x,
      y: point.y,
      radius: 82,
      target,
      name,
    };

    world.nodes.push(node);
    state.dev.activeNodeId = node.id;
    saveWorlds();
    setDevStatus(`${getNodeLabel(node)} node added. Target: ${getWorldLabel(target)}.`);
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
  const viewWidth = getCameraViewWidth();
  const viewHeight = getCameraViewHeight();
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

function createBossMatt(worldId, profile, random = Math.random) {
  const boss = WORLD_BOSS_MATTS[worldId];
  if (!boss) {
    return null;
  }

  const config = getMattConfig(boss.type);
  const level = rollWildMattLevel(profile, random);
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
    action: "idle",
    frameTimer: 0,
    frameIndex: 0,
    direction: "left",
    level,
    xp: 0,
    friendship: 0,
    captureDifficulty: profile.captureDifficulty,
    captureChance: 0,
    captureHitsRequired: 0,
    damageScale: profile.damageScale,
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
  return matt;
}

function awakenBossMatt(matt) {
  if (!matt?.boss || matt.awakened) {
    return;
  }

  matt.awakened = true;
  matt.attackCooldown = 0.25;
  matt.activeAttack = null;
  matt.attackTarget = null;
  startPrimeGrassMattMusic();
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
  const bossMatt = createBossMatt(state.currentWorld, profile, random);

  if (bossMatt) {
    state.dogmatts = attachCapturedParty([bossMatt]);
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

  if (state.dev.enabled || isShopOpen() || isPauseMenuOpen() || (state.arena.active && state.arena.phase !== "idle")) {
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
    return "idle";
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
  const center = getMapCenter(state.currentWorld);
  state.player.x = center.x;
  state.player.y = center.y;
  state.player.health = maxHealth;
  state.player.stamina = maxStamina;
  state.player.damageCooldown = PLAYER.damageInvulnerableTime;
  seedPlayerTrail();
  addScreenShake(12);
  setGameMessage("Ivan got knocked back to a safe spot.");
  updatePlayerStatusHud();
}

function damagePlayer(amount, sourceMatt) {
  if (state.player.damageCooldown > 0 || state.player.health <= 0) {
    return;
  }

  const damage = Math.max(1, Math.round(amount * (1 - getArmorDamageReduction())));
  state.player.health = Math.max(0, state.player.health - damage);
  state.player.damageCooldown = PLAYER.damageInvulnerableTime;
  addScreenShake(7);
  setGameMessage(`Lv ${getMattLevel(sourceMatt)} ${sourceMatt.name || MATT_LABELS[sourceMatt.type] || "Matt"} hit Ivan for ${damage}.`);
  updatePlayerStatusHud();

  if (state.player.health <= 0) {
    knockOutPlayer();
  }
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

  return distance <= (attack.attackRadius || 0) + 42;
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

  if (!isPlayerHitByMattAttack(matt, attack)) {
    return;
  }

  damagePlayer(getWildMattAttackDamage(matt, attack), matt);
  drainPlayerStamina(attack.staminaDamage || 0);
  knockPlayerAwayFrom(matt, attack.knockback || 0);
}

function chooseMattAttack(matt, config) {
  if (!Array.isArray(matt.attacks) || matt.attacks.length === 0) {
    return config;
  }

  const distance = Math.hypot(state.player.x - matt.x, state.player.y - matt.y);
  const reachableAttacks = matt.attacks.filter((attack) => distance <= (attack.attackRadius || config.attackRadius || 0) + 80);
  const candidates = reachableAttacks.length > 0 ? reachableAttacks : matt.attacks;
  const options = candidates.filter((attack) => attack.id !== matt.lastAttackId);
  const attackPool = options.length > 0 ? options : candidates;
  const attack = attackPool[Math.floor(Math.random() * attackPool.length)];
  matt.lastAttackId = attack.id;
  matt.activeAttackId = attack.id;
  matt.activeAttackName = attack.name;
  return { ...config, ...attack };
}

function getMattAttackTriggerRadius(matt, config) {
  const baseRadius = config.attackRadius || 0;
  const specialRadius = Array.isArray(matt.attacks)
    ? Math.max(0, ...matt.attacks.map((attack) => attack.attackRadius || 0))
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
  matt.attackCooldown = attackConfig.attackCooldown || 1.8;
  matt.frameIndex = 0;
  matt.frameTimer = 0;
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

  if (matt.type === "firematt") {
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

  if (matt.type === "mysticmatt") {
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

  if (dogmatt.rooted) {
    if (!dogmatt.awakened) {
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
      setWildMattBaseAction(dogmatt, "idle", dt);
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
  const frameSet = images[matt.assetKey || matt.type] || images[matt.type] || images.dogmatt;
  return frameSet[matt.action] || frameSet.attack || frameSet.idle || images.dogmatt.idle;
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

  if (matt.type === "mysticmatt" && isMysticMattSpecialIdle(matt.action)) {
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

function updateFriendshipWalking(dt) {
  if (!state.player.moving || state.capturedParty.length === 0 || state.arena.active || isShopOpen() || isPauseMenuOpen()) {
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
  updateNpcs(dt);
  updateDogmatts(dt);
  updateFriendshipWalking(dt);
  updateParticles(dt);
  syncCamera();
  preloadNearbyTilesIfNeeded(2);
}

function hitDogmatt(dogmatt) {
  const captureHitThreshold = getCaptureHitThreshold(dogmatt);
  awakenBossMatt(dogmatt);
  dogmatt.hitCooldown = 0.25;
  dogmatt.hitReactionTimer = 0.55;
  dogmatt.pathPanicTimer = dogmatt.rooted ? 0 : Math.max(dogmatt.pathPanicTimer || 0, 2.2);
  dogmatt.pathRoamTarget = null;
  dogmatt.hitCount += 1;
  dogmatt.frameIndex = 0;
  dogmatt.frameTimer = 0;
  spawnHitEffect(dogmatt, dogmatt.hitCount);
  addScreenShake(5);

  if (dogmatt.hitCount >= captureHitThreshold) {
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
    state.capturedParty.push(serializeCapturedMatt(dogmatt));
    state.capturedParty = state.capturedParty.slice(0, MATT_PARTY_LIMIT);
    if (dogmatt.boss) {
      resumeAmbientMusicFromPrimeGrassMatt();
    }
    spawnCaptureEffect(dogmatt);
    playCaptureSound();
    addScreenShake(10);
    const ivanProgress = awardPlayerXp(
      Math.round(24 + getMattLevel(dogmatt) * 6 + (Number(dogmatt.captureDifficulty) || 1) * 10 + getSkillBonus("whip_mastery", 5)),
      "capture",
    );
    setGameMessage(
      `Captured Lv ${getMattLevel(dogmatt)} ${dogmatt.name || MATT_LABELS[dogmatt.type] || "Matt"} (${Math.round(captureChance * 100)}%). Ivan XP +${ivanProgress.gained}${ivanProgress.leveled ? `, Lv ${ivanProgress.level}` : ""}.`,
    );
    updateCaughtHud(countCaughtMatts());
    saveCapturedParty();
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
  if (["grass_tree", "grass_cave"].includes(state.currentWorld)) {
    return 2.2;
  }

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
  const scale = getInnActorScale() * (Number(dogmatt.scale) || 1);
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
  const scale = getInnActorScale() * (Number(dogmatt.scale) || 1);
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

  if (!dogmatt.caught && !dogmatt.arenaBattler) {
    const difficulty = Math.max(1, Number(dogmatt.captureDifficulty) || 1);
    const label = dogmatt.boss ? `${dogmatt.name} Lv ${getMattLevel(dogmatt)}` : `Lv ${getMattLevel(dogmatt)}`;
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

  if (node.locked) {
    setGameMessage(`${getNodeLabel(node)} is locked for now.`);
    return false;
  }

  if (state.currentWorld === "town_arena_entrance" && node.target === "town_arena") {
    if (!hasItem("arena_ticket")) {
      setGameMessage("Scott sells arena tickets. Buy one before entering.");
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

function drawWorldNodes() {
  const nearbyNode = getNearbyNode();
  ctx.save();
  ctx.translate(-state.camera.x, -state.camera.y);

  for (const node of getWorld().nodes) {
    const active = node === nearbyNode;
    const locked = Boolean(node.locked);
    ctx.globalAlpha = active ? 0.88 : 0.38;
    ctx.fillStyle = locked
      ? active
        ? "rgba(170, 170, 170, 0.22)"
        : "rgba(120, 120, 120, 0.16)"
      : active
        ? "rgba(143, 243, 197, 0.25)"
        : "rgba(150, 108, 255, 0.2)";
    ctx.strokeStyle = locked
      ? active
        ? "rgba(230, 230, 230, 0.82)"
        : "rgba(190, 190, 190, 0.55)"
      : active
        ? "rgba(143, 243, 197, 0.95)"
        : "rgba(210, 188, 255, 0.72)";
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
      ctx.fillText(locked ? `${getNodeLabel(node)} locked` : `E: ${getNodeLabel(node)}`, node.x, node.y - node.radius - 14);
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
  ctx.scale(getWorldRenderScale(), getWorldRenderScale());
  drawMap();
  drawFutureMonsterMarkers();
  drawWorldNodes();
  drawActors();
  drawArenaBattleLabels();
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
  if (!state.ready || state.dev.enabled || isShopOpen() || isPauseMenuOpen() || (state.arena.active && state.arena.phase !== "idle")) {
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
      if (!tryOpenNearbyShop()) {
        tryEnterNode();
      }
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
  if (isPauseMenuOpen()) {
    event.preventDefault();
    return;
  }

  if (state.dev.enabled) {
    handleDevPointerDown(event);
    return;
  }

  if (event.pointerType !== "mouse") {
    if (tryOpenNearbyShop() || tryEnterNode()) {
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
  } else if (action === "use-item") {
    useInventoryItem(id);
  } else if (action === "complete-mission") {
    completeMission(id);
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
  } else if (action === "shop-tab") {
    setShopTab(id);
  } else if (action === "complete-mission") {
    completeMission(id);
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

  const profile = state.profiles.find((item) => item.id === state.profileId);
  if (profile) {
    profile.updatedAt = Date.now();
    saveProfiles();
  }

  state.ready = false;
  hideLauncher();
  closeShop();
  closePauseMenu();

  if (loading) {
    loading.textContent = `Loading ${state.profileName}...`;
    loading.classList.remove("hidden");
  }

  state.currentWorld = DEFAULT_WORLD_ID;
  state.worlds = loadWorlds();
  state.capturedParty = loadCapturedParty();
  loadEconomy();
  state.caughtDogmatts = -1;
  state.clockMinutes = CLOCK.startHour * 60;
  state.lastNightState = isNightTime();
  state.dogmatts = [];
  state.npcs = [];
  state.particles = [];
  state.screenShake = 0;
  resetArenaBattle(false);

  const start = getMapCenter(state.currentWorld);
  state.player.x = start.x;
  state.player.y = start.y;
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
  localStorage.removeItem(getEconomyStorageKey());
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
