// --- CONFIG ---
const SCALE = 3;                 // How large to scale the pixel canvas
const VIRTUAL_WIDTH = 240;       // Virtual resolution width (like old handhelds)
const VIRTUAL_HEIGHT = 144;      // Virtual resolution height

const BASE_HP = 230;
const BASE_MP = 160;

// --- GLOBAL STATE ---
let gameState = "menu";          // "menu" | "charSelect" | "battle"
let menuOptions = ["New Game", "Continue"];
let selectedIndex = 0;

// Character selection
let charOptions = [];
let charIndex = 0;
let player = null;
let enemy = null;

// Battle
let battleMenuOptions = ["Attack", "Fireball", "Heal"];
let battleMenuIndex = 0;
let battleState = "playerChoice"; // "playerChoice" | "win" | "lose"
let battleMessage = "";
let lastRoll = null;             // D20 result for UI

// --- ASSET LOADING ---
function preload() {
  // Backgrounds
  bgMenu   = loadImage('image/wizzard_bg.jpg');
  bgSelect = loadImage('image/wizard_select.jpg');
  bgBattle = loadImage('image/battle_g.jpg');

  // Wizard sprites (change paths to match your files)
  imgArcane = loadImage('image/wizard_LVL1-[Converted].png');
  imgPyro   = loadImage('image/wizard_LVL2-[Converted].png');
  imgDruid  = loadImage('image/wizard_LVL3-[Converted].png');

  // Enemy sprite
  imgEnemy  = loadImage('image/enemi_wiz.png');
}

// --- SETUP ---
function setup() {
  createCanvas(VIRTUAL_WIDTH * SCALE, VIRTUAL_HEIGHT * SCALE);
  noSmooth();                    // Keep pixel look when scaling
  textFont("monospace");
  imageMode(CORNER);

  // Define 3 mage archetypes
  charOptions = [
    { 
      name: "Arcane",
      color: [170, 120, 255],
      attack: 6,
      magic: 9,
      sprite: imgArcane
    },
    {
      name: "Pyro",
      color: [255, 120, 80],
      attack: 7,
      magic: 11,
      sprite: imgPyro
    },
    {
      name: "Druid",
      color: [90, 200, 120],
      attack: 5,
      magic: 8,
      sprite: imgDruid
    }
  ];
}

// --- MAIN LOOP ---
function draw() {
  push();
  scale(SCALE);                  // All drawing is done in virtual resolution

  if (gameState === "menu") {
    drawMenu();
  } else if (gameState === "charSelect") {
    drawCharSelect();
  } else if (gameState === "battle") {
    drawBattle();
  }

  pop();
}

// --- MENU DRAWING ---
function drawMenu() {
  // Background image
  if (bgMenu) {
    image(bgMenu, 0, 0, VIRTUAL_WIDTH, VIRTUAL_HEIGHT);
  } else {
    background(0);
  }

  const cx = VIRTUAL_WIDTH / 2;

  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(12);
  text("Battle Pixels", cx, 32);

  // Menu box
  let boxWidth = 100;
  let boxHeight = menuOptions.length * 14 + 10;
  let boxX = cx - boxWidth / 2;
  let boxY = 70;

  stroke(255);
  noFill();
  rect(boxX, boxY, boxWidth, boxHeight);

  // Options
  textAlign(LEFT, CENTER);
  textSize(8);
  for (let i = 0; i < menuOptions.length; i++) {
    let y = boxY + 10 + i * 14;

    if (i === selectedIndex) {
      // Highlight for selected option
      fill(255, 255, 255, 80);
      rect(boxX + 4, y - 6, boxWidth - 8, 12);
      fill(0);
    } else {
      fill(255);
    }

    text(menuOptions[i], boxX + 8, y);
  }

  // Blinking "Press ENTER"
  let blink = frameCount % 60 < 30;
  if (blink) {
    fill(220);
    textAlign(CENTER, CENTER);
    textSize(7);
    text("Press ENTER to confirm", cx, VIRTUAL_HEIGHT - 16);
  }
}


// --- CHARACTER SELECT ---
function drawCharSelect() {
  if (bgSelect) {
    image(bgSelect, 0, 0, VIRTUAL_WIDTH, VIRTUAL_HEIGHT);
  } else {
    background(20);
  }

  const cx = VIRTUAL_WIDTH / 2;

  // Title
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(10);
  text("CHOOSE YOUR WIZARD", cx, 15);

  // Current character
  let c = charOptions[charIndex];

  // Show current wizard sprite
  if (c.sprite) {
    const spriteWidth = 80;
    const spriteHeight = 80;
    image(c.sprite, cx - spriteWidth / 2, 25, spriteWidth, spriteHeight);
  }

  // Character name
  textSize(10);
  text(c.name.toUpperCase(), cx, 100);

  // Hint text
  textAlign(CENTER, CENTER);
  textSize(6);
  text("< LEFT / RIGHT to change >", cx, VIRTUAL_HEIGHT - 24);
  text("ENTER to confirm", cx, VIRTUAL_HEIGHT - 14);
}

// Draws a wizard sprite at (x, y) using the character's sprite
function drawMageSprite(x, y, character) {
  if (!character || !character.sprite) return;
  const spriteWidth = 80;
  const spriteHeight = 80;
  image(character.sprite, x - spriteWidth / 2, y - spriteHeight / 2, spriteWidth, spriteHeight);
}

// --- BATTLE ---
function drawBattle() {
  if (bgBattle) {
    image(bgBattle, 0, 0, VIRTUAL_WIDTH, VIRTUAL_HEIGHT);
  } else {
    background(5, 25, 48);
  }

  // Player mage (left)
  if (player) {
    drawMageSprite(60, VIRTUAL_HEIGHT - 55, player);
  }

  // Enemy mage (right)
  if (enemy) {
    drawMageSprite(VIRTUAL_WIDTH - 60, VIRTUAL_HEIGHT - 55, enemy);
  }

  // HP and Mana bars
  drawHPBar(8, 8, 80, player, "YOU");
  drawManaBar(8, 24, 80, player);

  drawHPBar(VIRTUAL_WIDTH - 88, 8, 80, enemy, "ENEMY");
  drawManaBar(VIRTUAL_WIDTH - 88, 24, 80, enemy);

  // Battle menu or end message
  if (battleState === "playerChoice") {
    drawBattleMenu();
  } else if (battleState === "win" || battleState === "lose") {
    drawBattleEnd();
  }

  // Battle message box + D20 display
  drawBattleMessage();
}

function drawHPBar(x, y, w, character, label) {
  if (!character) return;

  stroke(255);
  noFill();
  rect(x, y, w, 12);

  let ratio = max(character.hp, 0) / character.maxHP;
  let innerW = floor((w - 2) * ratio);

  noStroke();
  // Green-ish to red-ish depending on HP
  fill( lerp(255, 60, ratio), lerp(40, 200, ratio), 60 );
  rect(x + 1, y + 1, innerW, 10);

  fill(255);
  textSize(6);
  textAlign(LEFT, CENTER);
  text(label, x + 2, y - 4);
  textAlign(CENTER, CENTER);
  text(character.hp + "/" + character.maxHP, x + w / 2, y + 6);
}

function drawManaBar(x, y, w, character) {
  if (!character) return;

  stroke(255);
  noFill();
  rect(x, y, w, 10);

  let ratio = max(character.mp, 0) / character.maxMP;
  let innerW = floor((w - 2) * ratio);

  noStroke();
  // Blue-ish mana bar
  fill(80, 120, 255);
  rect(x + 1, y + 1, innerW, 8);

  fill(255);
  textSize(6);
  textAlign(CENTER, CENTER);
  text(character.mp + "/" + character.maxMP, x + w / 2, y + 5);
}

function drawBattleMenu() {
  let boxW = 90;
  let boxH = 38;
  let boxX = (VIRTUAL_WIDTH - boxW) / 2;
  let boxY = VIRTUAL_HEIGHT - boxH - 4;

  stroke(255);
  noFill();
  rect(boxX, boxY, boxW, boxH);

  textAlign(LEFT, CENTER);
  textSize(7);

  for (let i = 0; i < battleMenuOptions.length; i++) {
    let y = boxY + 10 + i * 10;
    if (i === battleMenuIndex) {
      fill(50, 180, 255, 80);
      rect(boxX + 4, y - 6, boxW - 8, 10);
      fill(0);
    } else {
      fill(255);
    }
    text(battleMenuOptions[i], boxX + 10, y);
  }
}

function drawBattleEnd() {
  let msg = battleState === "win" ? "YOU WON!" : "YOU WERE DEFEATED...";
  let sub = "Press ENTER to return to menu";

  fill(0, 0, 0, 200);
  stroke(255);
  let w = 140;
  let h = 40;
  let x = (VIRTUAL_WIDTH - w) / 2;
  let y = 40;
  rect(x, y, w, h);

  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(9);
  text(msg, VIRTUAL_WIDTH / 2, y + 14);
  textSize(7);
  text(sub, VIRTUAL_WIDTH / 2, y + 26);
}

function drawBattleMessage() {
  let boxW = VIRTUAL_WIDTH - 8;
  let boxH = 22;
  let boxX = 4;
  let boxY = 40;

  stroke(255);
  noFill();
  rect(boxX, boxY, boxW, boxH);

  noStroke();
  fill(255);
  textAlign(LEFT, CENTER);
  textSize(7);
  text(battleMessage, boxX + 4, boxY + 11);

  // D20 display above the box (if there was a roll)
  if (lastRoll !== null) {
    textAlign(RIGHT, CENTER);
    textSize(6);
    text("D20: " + lastRoll, boxX + boxW - 2, boxY - 4);
  }
}

// --- BATTLE LOGIC ---
function startBattleWith(selectedChar) {
  // Player (make copies so we don't overwrite charOptions)
  player = {
    name: selectedChar.name,
    maxHP: BASE_HP,
    hp: BASE_HP,
    maxMP: BASE_MP,
    mp: BASE_MP,
    attack: selectedChar.attack,
    magic: selectedChar.magic,
    color: selectedChar.color.slice(),
    sprite: selectedChar.sprite
  };

  // Enemy wizard
  enemy = {
    name: "Dark Mage",
    maxHP: BASE_HP,
    hp: BASE_HP,
    maxMP: BASE_MP,
    mp: BASE_MP,
    attack: 8,
    magic: 12,
    color: [200, 60, 80],
    sprite: imgEnemy
  };

  battleMenuIndex = 0;
  battleState = "playerChoice";
  battleMessage = "A " + enemy.name + " appears!";
  lastRoll = null;
  gameState = "battle";
}

function getManaCost(action) {
  if (action === "Attack") return 5;
  if (action === "Fireball") return 20;
  if (action === "Heal") return 25;
  return 0;
}

function rollD20() {
  // Integer 1–20
  return floor(random(1, 21));
}

// D20 outcome:
// 1–5   => 0
// 6–15  => base - 5 (min 0)
// 16–20 => full base
function applyD20Outcome(baseValue, roll) {
  if (roll <= 5) {
    return 0;
  } else if (roll <= 15) {
    return max(baseValue - 5, 0);
  } else {
    return baseValue;
  }
}

function playerChooseAction() {
  let action = battleMenuOptions[battleMenuIndex];
  let cost = getManaCost(action);

  // Not enough mana: backlash rule
  if (player.mp < cost) {
    player.hp -= 20;
    player.hp = max(player.hp, 0);
    player.mp = player.maxMP;  // refill mana bar
    lastRoll = null;

    if (player.hp <= 0) {
      battleState = "lose";
      battleMessage = "You overload your magic and collapse!";
    } else {
      battleState = "playerChoice";
      battleMessage = "Mana backlash! You take 20 dmg but your mana surges back!";
    }
    return;
  }

  // Spend mana
  player.mp -= cost;

  // Roll D20
  let roll = rollD20();
  lastRoll = roll;

  let base, value;

  if (action === "Attack") {
    base = player.attack + floor(random(-1, 2));
    base = max(base, 1);
    value = applyD20Outcome(base, roll);

    enemy.hp -= value;
    enemy.hp = max(enemy.hp, 0);

    if (roll <= 5) {
      battleMessage = "You swing your staff, but miss! (roll " + roll + ")";
    } else if (roll <= 15) {
      battleMessage = "You strike for " + value + " dmg. (partial, roll " + roll + ")";
    } else {
      battleMessage = "You hit HARD for " + value + " dmg! (roll " + roll + ")";
    }

  } else if (action === "Fireball") {
    base = player.magic + floor(random(0, 3));
    base = max(base, 2);
    value = applyD20Outcome(base, roll);

    enemy.hp -= value;
    enemy.hp = max(enemy.hp, 0);

    if (roll <= 5) {
      battleMessage = "Your fireball fizzles out... (roll " + roll + ")";
    } else if (roll <= 15) {
      battleMessage = "Fireball scorches for " + value + " dmg. (partial, roll " + roll + ")";
    } else {
      battleMessage = "CRITICAL FIREBALL! " + value + " dmg! (roll " + roll + ")";
    }

  } else if (action === "Heal") {
// HEAL IS PURELY RESTORATIVE NOW
    base = 6 + floor(random(0, 4));  // base heal amount
    base = max(base, 1);
    value = applyD20Outcome(base, roll);

    player.hp = min(player.hp + value, player.maxHP);

    if (roll <= 5) {
      battleMessage = "Your healing spell fails... (roll " + roll + ")";
    } else if (roll <= 15) {
      battleMessage = "You heal " + value + " HP. (partial, roll " + roll + ")";
    } else {
      battleMessage = "You restore " + value + " HP! (roll " + roll + ")";
    }
  }

  // Check if enemy is defeated
  if (enemy.hp <= 0) {
    enemy.hp = 0;
    battleState = "win";
    battleMessage = "The " + enemy.name + " is defeated!";
    return;
  }

  // Enemy's turn if still alive
  enemyTurn();
}

function enemyTurn() {
  // Aggressive AI: prefers Fireball strongly if it has mana
  let choice;
  if (enemy.mp >= 20 && random() < 0.8) {
    choice = "Fireball";
  } else {
    choice = "Attack";
  }

  if (choice === "Fireball" && enemy.mp >= 20) {
    enemy.mp -= 20;
    let dmg = enemy.magic + floor(random(0, 3));
    dmg = max(dmg, 2);
    player.hp -= dmg;
    player.hp = max(player.hp, 0);
    battleMessage += " Enemy casts DARK BOLT for " + dmg + " dmg!";
  } else {
    // Basic attack (no mana cost)
    let dmg = enemy.attack + floor(random(-1, 2));
    dmg = max(dmg, 1);
    player.hp -= dmg;
    player.hp = max(player.hp, 0);
    battleMessage += " Enemy hits back for " + dmg + " dmg!";
  }

  // Small mana regen so it can keep casting
  enemy.mp = min(enemy.mp + 5, enemy.maxMP);

  if (player.hp <= 0) {
    player.hp = 0;
    battleState = "lose";
    battleMessage = "You collapse... the " + enemy.name + " wins.";
  } else {
    battleState = "playerChoice";
  }
}

// --- INPUT ---
function keyPressed() {
  if (gameState === "menu") {
    handleMenuInput();
  } else if (gameState === "charSelect") {
    handleCharSelectInput();
  } else if (gameState === "battle") {
    handleBattleInput();
  }
}

function handleMenuInput() {
  if (keyCode === UP_ARROW) {
    selectedIndex = (selectedIndex - 1 + menuOptions.length) % menuOptions.length;
  } else if (keyCode === DOWN_ARROW) {
    selectedIndex = (selectedIndex + 1) % menuOptions.length;
  } else if (keyCode === ENTER || key === " ") {
    handleMenuSelection();
  }
}

function handleMenuSelection() {
  const choice = menuOptions[selectedIndex];

  if (choice === "New Game") {
    gameState = "charSelect";
  } else if (choice === "Continue") {
    console.log("Continue (not implemented yet)");
  }
}

function handleCharSelectInput() {
  if (keyCode === LEFT_ARROW) {
    charIndex = (charIndex - 1 + charOptions.length) % charOptions.length;
  } else if (keyCode === RIGHT_ARROW) {
    charIndex = (charIndex + 1) % charOptions.length;
  } else if (keyCode === ENTER || key === " ") {
    startBattleWith(charOptions[charIndex]);
  } else if (key === "m" || key === "M") {
    // go back if needed
    gameState = "menu";
  }
}

function handleBattleInput() {
  if (battleState === "playerChoice") {
    if (keyCode === UP_ARROW) {
      battleMenuIndex =
        (battleMenuIndex - 1 + battleMenuOptions.length) %
        battleMenuOptions.length;
    } else if (keyCode === DOWN_ARROW) {
      battleMenuIndex =
        (battleMenuIndex + 1) % battleMenuOptions.length;
    } else if (keyCode === ENTER || key === " ") {
      playerChooseAction();
    }
  } else if (battleState === "win" || battleState === "lose") {
    if (keyCode === ENTER || key === " ") {
      // back to menu after battle
      gameState = "menu";
    }
  }
}