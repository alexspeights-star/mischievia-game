// Mischievia game engine — Solo, Party, and Hot Seat modes.

// =====================================================================
// SETTINGS
// =====================================================================

const settings = (() => {
  const defaults = { maxCards: 10, ageRating: "teen", sound: true, animations: true };
  try {
    return Object.assign({}, defaults, JSON.parse(localStorage.getItem("mg_settings") || "{}"));
  } catch { return { ...defaults }; }
})();

function saveSettings() {
  localStorage.setItem("mg_settings", JSON.stringify(settings));
}

// =====================================================================
// RANK / SCORING DATA
// =====================================================================

const RANKS = [
  { min: 86, label: "Final Boss of Mischief" },
  { min: 74, label: "Agent of Chaos" },
  { min: 62, label: "Professional Bad Decision Maker" },
  { min: 50, label: "Group Chat Menace" },
  { min: 38, label: "Walking Red Flag" },
  { min: 26, label: "Suspiciously Quiet" },
  { min: 14, label: "Youth Group Survivor" },
  { min: 0,  label: "Sunday School Intern" }
];

const XP_PER_LEVEL = 100;

const GROWTH_NOTES = {
  temptation: "Your biggest battleground was temptation. Build the boundary before the moment gets loud.",
  gossip: "Your biggest pattern was gossip. Ask whether the story is yours to carry before you pass it on.",
  pride: "Pride kept trying to grab the steering wheel. You don't have to win every invisible courtroom.",
  fear: "Fear showed up a lot. Don't let anxiety write stories without evidence.",
  relationships: "Relationship tension was the hot zone. Boundaries are not rejection — they're protection.",
  chaos: "Chaos had your location. Peace may feel boring at first, but boring can be holy.",
  growth: "Growth led the scoreboard. Weird flex, but okay. Keep choosing the healthier thing when nobody claps."
};

const PARTY_AWARDS = [
  { key: "mostMischief", icon: "😈", label: "Most Mischievous", fn: (players) => players.reduce((a, b) => a.mischief > b.mischief ? a : b) },
  { key: "mostGrowth",   icon: "🌱", label: "Most Growth",     fn: (players) => players.reduce((a, b) => a.stats.growth > b.stats.growth ? a : b) },
  { key: "mostChaos",    icon: "🔥", label: "Most Chaotic",    fn: (players) => players.reduce((a, b) => a.stats.chaos > b.stats.chaos ? a : b) },
  { key: "mostFear",     icon: "😬", label: "Most Anxious",    fn: (players) => players.reduce((a, b) => a.stats.fear > b.stats.fear ? a : b) },
  { key: "mostGossip",   icon: "👀", label: "Biggest Instigator", fn: (players) => players.reduce((a, b) => a.stats.gossip > b.stats.gossip ? a : b) }
];

// =====================================================================
// GAME STATE
// =====================================================================

function makePlayerState(name) {
  return {
    name,
    xp: 0,
    level: 1,
    mischief: 0,
    cardsAnswered: 0,
    doubleNext: false,
    powerups: { holy: 2, angel: 2, demon: 2, redemption: 1, double: 1, confession: 1 },
    stats: { temptation: 0, gossip: 0, pride: 0, fear: 0, relationships: 0, chaos: 0, growth: 0 }
  };
}

const game = {
  mode: "solo",
  deck: [],
  currentIndex: 0,
  selectedCard: null,
  muted: !settings.sound,
  animationsOn: settings.animations,

  // Solo
  solo: null,

  // Party
  partyPlayers: [],
  partyCurrentPlayerIndex: 0,

  // Hot Seat
  hotSeatPlayers: [],
  hotSeatCurrentIndex: 0,    // who is in the hot seat
  hotSeatRound: 0,           // card round
  hotSeatPredictions: {},    // { playerName: optionLabel }
  hotSeatGuessScores: {},    // { playerName: points }
};

// =====================================================================
// UTILITY
// =====================================================================

const $ = (id) => document.getElementById(id);

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function getMischiefPercent(player) {
  const possible = Math.max(player.cardsAnswered * 10, 1);
  return Math.min(100, Math.round((player.mischief / possible) * 100));
}

function getRank(player) {
  const pct = getMischiefPercent(player);
  return (RANKS.find(r => pct >= r.min) || RANKS[RANKS.length - 1]).label;
}

function getVerdict(mischief) {
  if (mischief >= 9) return "Sinner-ish. Possibly with Wi-Fi.";
  if (mischief >= 7) return "Spiritually Suspicious.";
  if (mischief >= 5) return "Messy, but Self-Aware.";
  if (mischief >= 3) return "Mostly Fine. Slight Side-Eye.";
  if (mischief >= 1) return "Saint-ish. Don't Get Cocky.";
  return "Saint Energy. Weirdly Stable.";
}

function getTopStat(stats) {
  return Object.entries(stats).sort((a, b) => b[1] - a[1])[0] || ["growth", 0];
}

function buildDeck() {
  let pool = [...mischieviaCards];
  if (settings.ageRating === "teen") pool = pool.filter(c => c.ageRating !== "adult");
  if (settings.ageRating === "all")  pool = pool.filter(c => c.ageRating === "all");
  return shuffle(pool).slice(0, settings.maxCards);
}

// =====================================================================
// SCREEN SYSTEM
// =====================================================================

const SCREENS = ["screenStart","screenSettings","screenSetup","screenPartySetup",
  "screenHotSeatSetup","screenPassDevice","screenGame","screenReveal",
  "screenHotSeatPredict","screenHotSeatAnswer","screenHotSeatReveal",
  "screenRound","screenReport","screenPartyReport","screenHotSeatReport"];

function showScreen(name) {
  SCREENS.forEach(id => {
    const el = $(id);
    if (el) el.classList.remove("active");
  });
  const target = $(name);
  if (target) target.classList.add("active");
}

// =====================================================================
// SOUND ENGINE
// =====================================================================

function playTone(type) {
  if (game.muted) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const configs = {
      hover:      { freq: 360, type: "sine",     dur: 0.10, vol: 0.03 },
      select:     { freq: 520, type: "sine",     dur: 0.18, vol: 0.05 },
      mischief:   { freq: 90,  type: "sawtooth", dur: 0.22, vol: 0.06 },
      power:      { freq: 640, type: "triangle", dur: 0.22, vol: 0.05 },
      redemption: { freq: 740, type: "sine",     dur: 0.28, vol: 0.05 },
      level:      { freq: 880, type: "sine",     dur: 0.32, vol: 0.06 },
      stamp:      { freq: 160, type: "square",   dur: 0.14, vol: 0.04 },
    };

    const c = configs[type] || configs.select;
    osc.frequency.value = c.freq;
    osc.type = c.type;
    gain.gain.setValueAtTime(c.vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + c.dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + c.dur);
  } catch (_) {}
}

// Named sound functions (easy to swap with real audio later)
function playHoverSound()      { playTone("hover"); }
function playSelectSound()     { playTone("select"); }
function playPowerupSound()    { playTone("power"); }
function playMischiefSound()   { playTone("mischief"); }
function playRedemptionSound() { playTone("redemption"); }
function playLevelUpSound()    { playTone("level"); }
function playStampSound()      { playTone("stamp"); }

// =====================================================================
// TOAST
// =====================================================================

let toastTimer = null;

function showToast(msg, duration = 2200) {
  const el = $("mgToast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), duration);
}

// =====================================================================
// LEVEL UP OVERLAY
// =====================================================================

function showLevelUp(level, rank) {
  const overlay = $("levelUpOverlay");
  if (!overlay || !game.animationsOn) return;
  $("levelUpText").textContent = `Level ${level}`;
  $("levelUpRank").textContent = rank;
  overlay.classList.add("active");
  playLevelUpSound();
  setTimeout(() => overlay.classList.remove("active"), 2200);
}

// =====================================================================
// EMBER PARTICLES
// =====================================================================

function spawnEmbers(count = 8) {
  if (!game.animationsOn) return;
  const container = $("mgEmbers");
  if (!container) return;
  for (let i = 0; i < count; i++) {
    const e = document.createElement("div");
    e.className = "mg-ember";
    e.style.left = `${Math.random() * 100}%`;
    e.style.bottom = `${Math.random() * 25}%`;
    e.style.setProperty("--drift", Math.random());
    const dur = 1.2 + Math.random() * 1.4;
    e.style.animationDuration = `${dur}s`;
    e.style.animationDelay = `${Math.random() * 0.6}s`;
    e.style.width = e.style.height = `${2 + Math.random() * 3}px`;
    e.style.background = Math.random() > 0.5 ? "var(--orange)" : "var(--red)";
    container.appendChild(e);
    setTimeout(() => e.remove(), (dur + 0.8) * 1000);
  }
}

// =====================================================================
// HUD UPDATE
// =====================================================================

function updateHUD(player) {
  $("levelText").textContent = player.level;
  $("xpText").textContent = player.xp;
  $("rankText").textContent = getRank(player);

  const pct = getMischiefPercent(player);
  $("mischiefPercent").textContent = `${pct}%`;
  $("mischiefFill").style.width = `${pct}%`;

  $("holyCount").textContent = player.powerups.holy;
  $("angelCount").textContent = player.powerups.angel;
  $("demonCount").textContent = player.powerups.demon;
  $("redemptionCount").textContent = player.powerups.redemption;
  $("doubleCount").textContent = player.powerups.double;
  $("confessionCount").textContent = player.powerups.confession;

  document.querySelectorAll("#mischievia-game .mg-powerup").forEach(btn => {
    const key = btn.dataset.power;
    const mapKey = key === "holy" ? "holy" : key === "angel" ? "angel" : key === "demon" ? "demon"
                  : key === "redemption" ? "redemption" : key === "double" ? "double" : "confession";
    btn.classList.toggle("used", player.powerups[mapKey] <= 0);
  });

  const di = $("doubleIndicator");
  if (di) di.style.display = player.doubleNext ? "block" : "none";
}

// =====================================================================
// CURRENT PLAYER (SOLO / PARTY)
// =====================================================================

function currentSoloPlayer() { return game.solo; }

function currentPartyPlayer() {
  return game.partyPlayers[game.partyCurrentPlayerIndex];
}

// =====================================================================
// START SCREEN
// =====================================================================

function initStartScreen() {
  const peek = $("rankPeek");
  if (peek) {
    try {
      const saved = JSON.parse(localStorage.getItem("mg_progress") || "{}");
      if (saved.rank) peek.textContent = `Last rank: ${saved.rank}`;
    } catch (_) {}
  }
}

// =====================================================================
// SETTINGS SCREEN
// =====================================================================

function initSettingsScreen() {
  $("settingCards").value = settings.maxCards;
  $("settingAge").value = settings.ageRating;
  updateToggle("settingSound", settings.sound);
  updateToggle("settingAnim", settings.animations);
}

function updateToggle(id, val) {
  const btn = $(id);
  if (!btn) return;
  btn.dataset.on = val ? "true" : "false";
  btn.textContent = val ? "ON" : "OFF";
}

$("settingSound").addEventListener("click", () => {
  settings.sound = !settings.sound;
  game.muted = !settings.sound;
  updateToggle("settingSound", settings.sound);
});

$("settingAnim").addEventListener("click", () => {
  settings.animations = !settings.animations;
  game.animationsOn = settings.animations;
  updateToggle("settingAnim", settings.animations);
});

$("saveSettings").addEventListener("click", () => {
  settings.maxCards = parseInt($("settingCards").value, 10) || 10;
  settings.ageRating = $("settingAge").value;
  saveSettings();
  showScreen("screenStart");
  initStartScreen();
});

// =====================================================================
// MODE SELECT
// =====================================================================

document.querySelectorAll("[data-mode]").forEach(btn => {
  btn.addEventListener("click", () => {
    const mode = btn.dataset.mode;
    if (mode === "settings") {
      initSettingsScreen();
      showScreen("screenSettings");
      return;
    }
    game.mode = mode;
    if (mode === "solo") {
      showScreen("screenSetup");
    } else if (mode === "party") {
      initPartySetup();
      showScreen("screenPartySetup");
    } else if (mode === "hotseat") {
      initHotSeatSetup();
      showScreen("screenHotSeatSetup");
    }
  });
});

$("backFromSetup").addEventListener("click", () => showScreen("screenStart"));

// =====================================================================
// SOLO MODE SETUP
// =====================================================================

$("beginGame").addEventListener("click", () => {
  const name = $("playerName").value.trim() || "Player";
  game.solo = makePlayerState(name);
  game.deck = buildDeck();
  game.currentIndex = 0;
  $("modeBadge").textContent = "Solo";
  showScreen("screenGame");
  renderCard(game.solo);
});

$("playerName").addEventListener("keydown", e => {
  if (e.key === "Enter") $("beginGame").click();
});

// =====================================================================
// PARTY MODE SETUP
// =====================================================================

let partyPlayerNames = [];

function initPartySetup() {
  partyPlayerNames = [];
  renderPartyPlayerList();
  $("beginParty").disabled = true;
  $("addPlayerName").value = "";

  const randomBtn = $("randomizeOrder");
  if (randomBtn) {
    randomBtn.dataset.on = "false";
    randomBtn.textContent = "OFF";
  }
}

function renderPartyPlayerList() {
  const list = $("playerList");
  list.innerHTML = partyPlayerNames.map((name, i) => `
    <li class="mg-player-item">
      <span class="mg-player-avatar">${name[0].toUpperCase()}</span>
      <span style="flex:1;margin-left:10px">${name}</span>
      <button class="mg-player-remove" data-index="${i}" aria-label="Remove ${name}">✕</button>
    </li>
  `).join("");

  list.querySelectorAll(".mg-player-remove").forEach(btn => {
    btn.addEventListener("click", () => {
      partyPlayerNames.splice(parseInt(btn.dataset.index, 10), 1);
      renderPartyPlayerList();
      $("beginParty").disabled = partyPlayerNames.length < 2;
    });
  });

  $("beginParty").disabled = partyPlayerNames.length < 2;
}

function addPartyPlayer(inputId, listFn) {
  const input = $(inputId);
  const name = input.value.trim();
  if (!name || partyPlayerNames.includes(name) || partyPlayerNames.length >= 10) {
    if (!name) showToast("Enter a name first.");
    else if (partyPlayerNames.includes(name)) showToast("That name is already in the list.");
    else showToast("Maximum 10 players.");
    return;
  }
  partyPlayerNames.push(name);
  input.value = "";
  input.focus();
  listFn();
}

$("addPlayer").addEventListener("click", () => addPartyPlayer("addPlayerName", renderPartyPlayerList));
$("addPlayerName").addEventListener("keydown", e => {
  if (e.key === "Enter") addPartyPlayer("addPlayerName", renderPartyPlayerList);
});

$("backFromPartySetup").addEventListener("click", () => showScreen("screenStart"));

$("randomizeOrder").addEventListener("click", () => {
  const btn = $("randomizeOrder");
  const isOn = btn.dataset.on === "true";
  updateToggle("randomizeOrder", !isOn);
});

$("beginParty").addEventListener("click", () => {
  let names = [...partyPlayerNames];
  const shouldRandomize = $("randomizeOrder").dataset.on === "true";
  if (shouldRandomize) names = shuffle(names);

  game.partyPlayers = names.map(n => makePlayerState(n));
  game.partyCurrentPlayerIndex = 0;
  game.deck = buildDeck();
  game.currentIndex = 0;

  showPassDevice(game.partyPlayers[0].name, "FIRST UP", "Their turn to face the music.");
});

// =====================================================================
// HOT SEAT SETUP
// =====================================================================

let hotSeatPlayerNames = [];

function initHotSeatSetup() {
  hotSeatPlayerNames = [];
  renderHotSeatPlayerList();
  $("beginHotSeat").disabled = true;
  $("addHotSeatPlayer").value = "";
}

function renderHotSeatPlayerList() {
  const list = $("hotSeatPlayerList");
  list.innerHTML = hotSeatPlayerNames.map((name, i) => `
    <li class="mg-player-item">
      <span class="mg-player-avatar">${name[0].toUpperCase()}</span>
      <span style="flex:1;margin-left:10px">${name}</span>
      <button class="mg-player-remove" data-index="${i}" aria-label="Remove ${name}">✕</button>
    </li>
  `).join("");

  list.querySelectorAll(".mg-player-remove").forEach(btn => {
    btn.addEventListener("click", () => {
      hotSeatPlayerNames.splice(parseInt(btn.dataset.index, 10), 1);
      renderHotSeatPlayerList();
      $("beginHotSeat").disabled = hotSeatPlayerNames.length < 2;
    });
  });

  $("beginHotSeat").disabled = hotSeatPlayerNames.length < 2;
}

$("addHotSeatPlayerBtn").addEventListener("click", () => {
  const input = $("addHotSeatPlayer");
  const name = input.value.trim();
  if (!name || hotSeatPlayerNames.includes(name) || hotSeatPlayerNames.length >= 10) {
    if (!name) showToast("Enter a name first.");
    else if (hotSeatPlayerNames.includes(name)) showToast("Name already added.");
    else showToast("Maximum 10 players.");
    return;
  }
  hotSeatPlayerNames.push(name);
  input.value = "";
  input.focus();
  renderHotSeatPlayerList();
});

$("addHotSeatPlayer").addEventListener("keydown", e => {
  if (e.key === "Enter") $("addHotSeatPlayerBtn").click();
});

$("backFromHotSeatSetup").addEventListener("click", () => showScreen("screenStart"));

$("beginHotSeat").addEventListener("click", () => {
  game.hotSeatPlayers = hotSeatPlayerNames.map(n => makePlayerState(n));
  game.hotSeatGuessScores = {};
  game.hotSeatPlayers.forEach(p => { game.hotSeatGuessScores[p.name] = 0; });
  game.hotSeatCurrentIndex = 0;
  game.hotSeatRound = 0;
  game.deck = buildDeck();
  game.currentIndex = 0;
  startHotSeatRound();
});

// =====================================================================
// PASS DEVICE SCREEN
// =====================================================================

function showPassDevice(playerName, kicker, subtext, onReady) {
  $("passKicker").textContent = kicker || "NEXT UP";
  $("passPlayerName").textContent = playerName;
  $("passSubtext").textContent = subtext || "Pass the device to this player.";

  const btn = $("passReady");
  // Remove old listener by cloning
  const newBtn = btn.cloneNode(true);
  btn.parentNode.replaceChild(newBtn, newBtn);
  const readyBtn = $("passReady");

  readyBtn.addEventListener("click", () => {
    if (onReady) onReady();
    else continueAfterPass();
  });

  showScreen("screenPassDevice");
}

function continueAfterPass() {
  if (game.mode === "party") {
    const player = currentPartyPlayer();
    $("modeBadge").textContent = `Party — ${player.name}`;
    showScreen("screenGame");
    renderCard(player);
  }
}

// =====================================================================
// CARD RENDERING (SOLO + PARTY)
// =====================================================================

function renderCard(player) {
  const card = game.deck[game.currentIndex];
  if (!card) return;
  game.selectedCard = card;

  const cardEl = $("card");
  if (game.animationsOn) {
    cardEl.style.animation = "none";
    void cardEl.offsetWidth;
    cardEl.style.animation = "";
  }

  $("cardProgress").textContent = `Card ${game.currentIndex + 1} / ${game.deck.length}`;
  $("cardTitle").textContent = card.title;
  $("cardScenario").textContent = card.scenario;

  const optionsEl = $("options");
  optionsEl.innerHTML = "";

  card.options.forEach(option => {
    const button = document.createElement("button");
    button.className = "mg-option";
    button.dataset.label = option.label;
    button.setAttribute("aria-label", `Option ${option.label}: ${option.text}`);
    button.innerHTML = `
      <span class="mg-letter">${option.label}</span>
      <span class="mg-option-text">${option.text}</span>
    `;
    button.addEventListener("mouseenter", playHoverSound);
    button.addEventListener("click", () => chooseOption(option, button, player));
    optionsEl.appendChild(button);
  });

  updateHUD(player);
}

// =====================================================================
// CHOOSE OPTION (SOLO + PARTY)
// =====================================================================

function chooseOption(option, buttonEl, player) {
  // Prevent double-tap
  document.querySelectorAll("#screenGame .mg-option").forEach(b => b.style.pointerEvents = "none");

  buttonEl.classList.add("selected");
  if (option.mischief >= 7) { playMischiefSound(); spawnEmbers(12); }
  else { playSelectSound(); spawnEmbers(4); }

  setTimeout(() => {
    applyChoice(option, player);
    renderReveal(option, player);
  }, 360);
}

function applyChoice(option, player) {
  const multiplier = player.doubleNext ? 2 : 1;
  player.doubleNext = false;

  player.mischief += option.mischief * multiplier;
  player.cardsAnswered += 1;
  player.xp += 15 + Math.max(0, 10 - option.mischief);

  Object.keys(player.stats).forEach(key => {
    player.stats[key] += (option.scores[key] || 0) * multiplier;
  });

  const newLevel = Math.floor(player.xp / XP_PER_LEVEL) + 1;
  if (newLevel > player.level) {
    player.level = newLevel;
    setTimeout(() => showLevelUp(player.level, getRank(player)), 800);
  }

  saveProgress(player);
}

function renderReveal(option, player) {
  playStampSound();
  $("chosenLabel").textContent = `${player.name} picked ${option.label}`;
  $("pickedLetter").textContent = option.label;
  $("pickedText").textContent = option.text;
  $("breakdownText").textContent = option.breakdown;
  $("roastText").textContent = option.roast;
  $("reflectionText").textContent = option.reflection || "";
  $("verdictText").textContent = option.verdict || getVerdict(option.mischief);

  // Score chips
  const burst = $("scoreBurst");
  burst.innerHTML = "";
  const chips = [
    { label: `😈 Mischief +${option.mischief}`, cls: "mischief", delay: 0 },
    { label: `🌱 Growth +${option.scores.growth || 0}`, cls: "growth", delay: 80 },
    { label: `⚡ XP +${15 + Math.max(0, 10 - option.mischief)}`, cls: "xp", delay: 160 }
  ];
  chips.forEach(({ label, cls, delay }) => {
    setTimeout(() => {
      const chip = document.createElement("span");
      chip.className = `mg-score-chip ${cls}`;
      chip.textContent = label;
      burst.appendChild(chip);
    }, delay);
  });

  showScreen("screenReveal");
}

// =====================================================================
// NEXT CARD (SOLO + PARTY)
// =====================================================================

$("nextCard").addEventListener("click", () => {
  game.currentIndex += 1;

  if (game.currentIndex >= game.deck.length) {
    if (game.mode === "solo") {
      renderSoloReport(game.solo);
      showScreen("screenReport");
    } else if (game.mode === "party") {
      // Move to next party player
      game.partyCurrentPlayerIndex += 1;
      if (game.partyCurrentPlayerIndex >= game.partyPlayers.length) {
        renderPartyReport();
        showScreen("screenPartyReport");
      } else {
        game.currentIndex = 0;
        game.deck = buildDeck(); // fresh deck for next player
        const next = currentPartyPlayer();
        showPassDevice(next.name, "NEXT PLAYER", `Pass the device to ${next.name}.`);
      }
    }
    return;
  }

  if (game.mode === "solo" && game.currentIndex % 5 === 0) {
    renderRoundSummary(game.solo);
    showScreen("screenRound");
    return;
  }

  if (game.mode === "solo") {
    showScreen("screenGame");
    renderCard(game.solo);
  } else if (game.mode === "party") {
    showScreen("screenGame");
    renderCard(currentPartyPlayer());
  }
});

$("continueRound").addEventListener("click", () => {
  showScreen("screenGame");
  if (game.mode === "solo") renderCard(game.solo);
  else renderCard(currentPartyPlayer());
});

// =====================================================================
// ROUND SUMMARY
// =====================================================================

function renderRoundSummary(player) {
  const pct = getMischiefPercent(player);
  $("roundStats").innerHTML = `
    <p><strong>Mischief:</strong> ${pct}%</p>
    <p><strong>Rank:</strong> ${getRank(player)}</p>
    <p><strong>XP:</strong> ${player.xp}</p>
  `;
}

// =====================================================================
// POWERUPS
// =====================================================================

function usePowerup(power) {
  const player = game.mode === "party" ? currentPartyPlayer() : game.solo;
  if (!player || player.powerups[power] <= 0) return;

  const optionButtons = [...document.querySelectorAll("#screenGame .mg-option")];
  const options = game.selectedCard ? game.selectedCard.options : [];

  if (power === "holy") {
    const chaotic = [...options].sort((a, b) => b.mischief - a.mischief)[0];
    const idx = options.indexOf(chaotic);
    optionButtons[idx]?.classList.add("removed");
    showToast("💧 Holy Water! Most chaotic option removed.");
  }

  if (power === "angel") {
    const healthiest = [...options].sort((a, b) =>
      (b.scores.growth - b.mischief) - (a.scores.growth - a.mischief)
    )[0];
    const idx = options.indexOf(healthiest);
    optionButtons[idx]?.classList.add("angel");
    showToast("🪽 Guardian Angel! Healthiest option highlighted.");
  }

  if (power === "demon") {
    const mostMischief = [...options].sort((a, b) => b.mischief - a.mischief)[0];
    const idx = options.indexOf(mostMischief);
    optionButtons[idx]?.classList.add("demon");
    showToast("😈 Demon Whisper! Most mischievous option revealed.");
  }

  if (power === "redemption") {
    player.mischief = Math.max(0, player.mischief - 5);
    playRedemptionSound();
    updateHUD(player);
    showToast("🙏 Redemption! Mischief score reduced by 5.");
  }

  if (power === "double") {
    player.doubleNext = true;
    updateHUD(player);
    showToast("🔥 Double Trouble! Next answer scores 2×.");
  }

  if (power === "confession") {
    // Reveal breakdown text of a random option as a "bonus reflection"
    if (options.length > 0) {
      const random = options[Math.floor(Math.random() * options.length)];
      showToast(`📜 Confession Card: "${random.reflection || random.breakdown}"`, 4000);
    }
  }

  player.powerups[power] -= 1;
  playPowerupSound();
  spawnEmbers(6);

  const btn = document.querySelector(`#mischievia-game .mg-powerup[data-power="${power}"]`);
  if (btn && game.animationsOn) {
    btn.classList.add("activating");
    btn.addEventListener("animationend", () => btn.classList.remove("activating"), { once: true });
  }

  updateHUD(player);
}

document.querySelectorAll("#mischievia-game .mg-powerup").forEach(btn => {
  btn.addEventListener("click", () => usePowerup(btn.dataset.power));
});

// =====================================================================
// SOLO FINAL REPORT
// =====================================================================

function renderSoloReport(player) {
  const pct = getMischiefPercent(player);
  const rank = getRank(player);
  const [topStat] = getTopStat(player.stats);
  const prettyTop = topStat.charAt(0).toUpperCase() + topStat.slice(1);

  $("reportName").textContent = `${player.name}'s Soul Report`;
  $("finalScore").textContent = `${pct}%`;
  $("finalRank").textContent = rank;
  $("mainPattern").textContent = `${prettyTop} kept showing up like it paid rent.`;
  $("growthNote").textContent = GROWTH_NOTES[topStat] || GROWTH_NOTES.growth;
  $("shareText").textContent = `${player.name} scored ${pct}% Mischief and ranked as "${rank}" in Mischievia: Saint or Sinner?`;

  renderStatGrid("statGrid", player.stats);

  localStorage.setItem("mg_progress", JSON.stringify({ rank, pct, name: player.name }));
}

function renderStatGrid(containerId, stats) {
  const max = Math.max(...Object.values(stats), 1);
  $(containerId).innerHTML = Object.entries(stats).map(([key, value]) => {
    const label = key.charAt(0).toUpperCase() + key.slice(1);
    const width = Math.round((value / max) * 100);
    return `
      <div class="mg-stat">
        <span><strong>${label}</strong><em style="color:var(--gold)">${value}</em></span>
        <div class="mg-stat-bar"><div style="width:0%" data-target="${width}"></div></div>
      </div>
    `;
  }).join("");

  // Animate bars after render
  setTimeout(() => {
    $(containerId).querySelectorAll(".mg-stat-bar div").forEach(bar => {
      bar.style.width = bar.dataset.target + "%";
    });
  }, 80);
}

$("restartGame").addEventListener("click", () => {
  showScreen("screenStart");
  initStartScreen();
});

$("copyResult").addEventListener("click", () => {
  const text = $("shareText").textContent;
  navigator.clipboard?.writeText(text).then(() => {
    showToast("Copied to clipboard!");
  }).catch(() => {
    showToast("Result: " + text);
  });
});

// =====================================================================
// PARTY FINAL REPORT
// =====================================================================

function renderPartyReport() {
  const players = game.partyPlayers;
  const sorted = [...players].sort((a, b) => b.mischief - a.mischief);

  // Awards
  const awardsEl = $("partyAwards");
  awardsEl.innerHTML = "";

  PARTY_AWARDS.forEach(award => {
    const winner = award.fn(players);
    const card = document.createElement("div");
    card.className = "mg-award-card";

    const awardsText = {
      mostMischief: `"Most likely to start a group chat and go silent."`,
      mostGrowth: `"Most likely to choose peace… then screenshot it."`,
      mostChaos: `"Most likely to say 'I'm fine' while clearly not fine."`,
      mostFear: `"Most likely to spiral before getting the facts."`,
      mostGossip: `"Most likely to spiritually side-eye somebody."`
    };

    card.innerHTML = `
      <span class="mg-award-icon">${award.icon}</span>
      <div>
        <div class="mg-award-label">${award.label}</div>
        <div class="mg-award-name">${winner.name}</div>
        <div class="mg-award-sub">${awardsText[award.key] || ""}</div>
      </div>
    `;
    awardsEl.appendChild(card);
  });

  // Scoreboard
  const scoreEl = $("partyScoreboard");
  scoreEl.innerHTML = sorted.map((p, i) => {
    const pct = getMischiefPercent(p);
    const rank = getRank(p);
    return `
      <div class="mg-score-row">
        <span class="mg-score-row-rank">#${i + 1}</span>
        <span class="mg-score-row-name">${p.name} <small style="color:var(--cream-soft);font-size:11px">${rank}</small></span>
        <span class="mg-score-row-mischief">😈 ${pct}%</span>
        <span class="mg-score-row-xp">⚡ ${p.xp} XP</span>
      </div>
    `;
  }).join("");
}

$("partyPlayAgain").addEventListener("click", () => {
  showScreen("screenStart");
  initStartScreen();
});

$("partyCopyResult").addEventListener("click", () => {
  const lines = game.partyPlayers
    .sort((a, b) => b.mischief - a.mischief)
    .map((p, i) => `#${i + 1} ${p.name}: ${getMischiefPercent(p)}% Mischief — ${getRank(p)}`);
  const text = ["Mischievia: Saint or Sinner? Party Results", "", ...lines].join("\n");
  navigator.clipboard?.writeText(text).then(() => showToast("Results copied!"))
    .catch(() => showToast("Could not copy."));
});

// =====================================================================
// HOT SEAT MODE
// =====================================================================

function startHotSeatRound() {
  if (game.currentIndex >= game.deck.length) {
    renderHotSeatReport();
    showScreen("screenHotSeatReport");
    return;
  }

  const card = game.deck[game.currentIndex];
  game.selectedCard = card;
  game.hotSeatPredictions = {};

  const hotPlayer = game.hotSeatPlayers[game.hotSeatCurrentIndex];
  const predictors = game.hotSeatPlayers.filter(p => p.name !== hotPlayer.name);

  $("hotSeatPlayerName").textContent = hotPlayer.name;
  $("hotSeatCardTitle").textContent = card.title;
  $("hotSeatScenario").textContent = card.scenario;

  // Build prediction option buttons
  const predictOpts = $("predictOptions");
  predictOpts.innerHTML = card.options.map(opt => `
    <button class="mg-predict-btn" data-label="${opt.label}" aria-label="Option ${opt.label}: ${opt.text}">
      <span class="mg-predict-letter">${opt.label}</span>
      <span>${opt.text}</span>
    </button>
  `).join("");

  // Build predictor list
  const predictList = $("predictorList");
  predictList.innerHTML = predictors.map(p => `
    <div class="mg-predictor-row" data-predictor="${p.name}">
      <span class="mg-predictor-name">${p.name}</span>
      <span class="mg-predictor-pick" id="pick-${p.name.replace(/\s/g,'_')}">Waiting…</span>
    </div>
  `).join("");

  // Track which predictor is currently picking
  let currentPredictorIndex = 0;
  const predictorNames = predictors.map(p => p.name);

  function showNextPredictor() {
    if (currentPredictorIndex >= predictorNames.length) {
      // All predicted — show pass button
      $("hotSeatPassToPlayer").style.display = "block";
      $("passToName").textContent = hotPlayer.name;
      // Disable prediction buttons
      predictOpts.querySelectorAll(".mg-predict-btn").forEach(b => b.disabled = true);
      return;
    }

    const name = predictorNames[currentPredictorIndex];
    // Highlight active predictor row
    predictList.querySelectorAll(".mg-predictor-row").forEach(row => {
      row.style.borderColor = row.dataset.predictor === name
        ? "rgba(255,200,87,.6)"
        : "var(--line)";
    });

    predictOpts.querySelectorAll(".mg-predict-btn").forEach(btn => {
      btn.classList.remove("selected-predict");
      btn.onclick = () => {
        game.hotSeatPredictions[name] = btn.dataset.label;
        const pickEl = $(`pick-${name.replace(/\s/g,'_')}`);
        if (pickEl) {
          pickEl.textContent = btn.dataset.label;
          pickEl.classList.add("voted");
        }
        playSelectSound();
        currentPredictorIndex++;
        showNextPredictor();
      };
    });
  }

  $("hotSeatPassToPlayer").style.display = "none";
  showNextPredictor();

  $("hotSeatRound").textContent = game.currentIndex + 1;
  $("hotSeatCardNum").textContent = `${game.currentIndex + 1}/${game.deck.length}`;

  showScreen("screenHotSeatPredict");
}

$("hotSeatPassToPlayer").addEventListener("click", () => {
  const hotPlayer = game.hotSeatPlayers[game.hotSeatCurrentIndex];
  showScreen("screenPassDevice");

  $("passKicker").textContent = "🔥 HOT SEAT";
  $("passPlayerName").textContent = hotPlayer.name;
  $("passSubtext").textContent = "Your turn — answer honestly. No peeking at others' predictions.";

  const btn = $("passReady");
  const newBtn = btn.cloneNode(true);
  btn.parentNode.replaceChild(newBtn, newBtn);
  $("passReady").addEventListener("click", showHotSeatAnswerScreen);
});

function showHotSeatAnswerScreen() {
  const card = game.selectedCard;
  const hotPlayer = game.hotSeatPlayers[game.hotSeatCurrentIndex];

  $("hotSeatCardTitleAnswer").textContent = card.title;
  $("hotSeatScenarioAnswer").textContent = card.scenario;
  $("hotSeatAnswerName").textContent = hotPlayer.name;
  $("hotSeatProgress").textContent = `Card ${game.currentIndex + 1} / ${game.deck.length}`;

  const opts = $("hotSeatOptions");
  opts.innerHTML = "";

  card.options.forEach(option => {
    const button = document.createElement("button");
    button.className = "mg-option";
    button.dataset.label = option.label;
    button.innerHTML = `
      <span class="mg-letter">${option.label}</span>
      <span class="mg-option-text">${option.text}</span>
    `;
    button.addEventListener("mouseenter", playHoverSound);
    button.addEventListener("click", () => {
      opts.querySelectorAll(".mg-option").forEach(b => b.style.pointerEvents = "none");
      button.classList.add("selected");
      if (option.mischief >= 7) { playMischiefSound(); spawnEmbers(12); }
      else { playSelectSound(); spawnEmbers(4); }
      setTimeout(() => hotSeatReveal(option, hotPlayer), 380);
    });
    opts.appendChild(button);
  });

  showScreen("screenHotSeatAnswer");
}

function hotSeatReveal(option, hotPlayer) {
  applyChoice(option, hotPlayer);

  $("hotRevealName").textContent = hotPlayer.name;
  $("hotRevealLetter").textContent = option.label;
  $("hotRevealText").textContent = option.text;
  $("hotRevealRoast").textContent = option.roast;
  $("hotRevealReflection").textContent = option.reflection || "";

  // Show prediction results
  const resultsEl = $("predictResults");
  const predictors = game.hotSeatPlayers.filter(p => p.name !== hotPlayer.name);

  let anyPrediction = false;
  resultsEl.innerHTML = predictors.map(p => {
    const predicted = game.hotSeatPredictions[p.name];
    if (!predicted) return "";
    anyPrediction = true;
    const correct = predicted === option.label;
    if (correct) {
      game.hotSeatGuessScores[p.name] = (game.hotSeatGuessScores[p.name] || 0) + 10;
    }
    return `
      <div class="mg-predict-result-row ${correct ? "correct" : "wrong"}">
        <span>${p.name}</span>
        <span>Guessed ${predicted} ${correct ? "✓ +10 pts" : `✗ (was ${option.label})`}</span>
      </div>
    `;
  }).join("");

  if (!anyPrediction) {
    resultsEl.innerHTML = `<p style="font-family:Arial;font-weight:700;font-size:14px;color:var(--cream-soft);text-align:center">No predictions were made.</p>`;
  }

  playStampSound();
  showScreen("screenHotSeatReveal");
}

$("nextHotSeatCard").addEventListener("click", () => {
  game.currentIndex += 1;
  // Rotate hot seat
  game.hotSeatCurrentIndex = (game.hotSeatCurrentIndex + 1) % game.hotSeatPlayers.length;

  if (game.currentIndex >= game.deck.length) {
    renderHotSeatReport();
    showScreen("screenHotSeatReport");
    return;
  }

  startHotSeatRound();
});

// =====================================================================
// HOT SEAT FINAL REPORT
// =====================================================================

function renderHotSeatReport() {
  const players = game.hotSeatPlayers;
  const guessScores = game.hotSeatGuessScores;

  // Best guesser
  const bestGuesser = Object.entries(guessScores).sort((a, b) => b[1] - a[1])[0];

  const awardsEl = $("hotSeatAwards");
  awardsEl.innerHTML = "";

  if (bestGuesser && bestGuesser[1] > 0) {
    const card = document.createElement("div");
    card.className = "mg-award-card";
    card.innerHTML = `
      <span class="mg-award-icon">🧠</span>
      <div>
        <div class="mg-award-label">Knows You Best</div>
        <div class="mg-award-name">${bestGuesser[0]}</div>
        <div class="mg-award-sub">${bestGuesser[1]} points from correct guesses</div>
      </div>
    `;
    awardsEl.appendChild(card);
  }

  const mostMischievous = [...players].sort((a, b) => b.mischief - a.mischief)[0];
  const mCard = document.createElement("div");
  mCard.className = "mg-award-card";
  mCard.innerHTML = `
    <span class="mg-award-icon">😈</span>
    <div>
      <div class="mg-award-label">Most Mischievous in the Hot Seat</div>
      <div class="mg-award-name">${mostMischievous.name}</div>
      <div class="mg-award-sub">Mischief score: ${getMischiefPercent(mostMischievous)}%</div>
    </div>
  `;
  awardsEl.appendChild(mCard);

  // Scoreboard (guess scores)
  const scoreEl = $("hotSeatScoreboard");
  const allScores = players.map(p => ({
    name: p.name,
    guessScore: guessScores[p.name] || 0,
    mischiefPct: getMischiefPercent(p)
  })).sort((a, b) => b.guessScore - a.guessScore);

  scoreEl.innerHTML = allScores.map((p, i) => `
    <div class="mg-score-row">
      <span class="mg-score-row-rank">#${i + 1}</span>
      <span class="mg-score-row-name">${p.name}</span>
      <span class="mg-score-row-xp">🧠 ${p.guessScore} pts</span>
      <span class="mg-score-row-mischief">😈 ${p.mischiefPct}%</span>
    </div>
  `).join("");
}

$("hotSeatPlayAgain").addEventListener("click", () => {
  showScreen("screenStart");
  initStartScreen();
});

// =====================================================================
// KEYBOARD SUPPORT
// =====================================================================

window.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  const labels = ["a", "b", "c", "d"];

  if (labels.includes(key)) {
    if ($("screenGame").classList.contains("active")) {
      const btn = document.querySelector(`#screenGame .mg-option[data-label="${key.toUpperCase()}"]`);
      btn?.click();
    } else if ($("screenHotSeatAnswer").classList.contains("active")) {
      const btn = document.querySelector(`#screenHotSeatAnswer .mg-option[data-label="${key.toUpperCase()}"]`);
      btn?.click();
    }
  }

  if (e.key === "Enter" || e.key === " ") {
    if ($("screenReveal").classList.contains("active")) $("nextCard").click();
    if ($("screenHotSeatReveal").classList.contains("active")) $("nextHotSeatCard").click();
  }
});

// =====================================================================
// MUTE TOGGLE
// =====================================================================

$("mgMute").addEventListener("click", () => {
  game.muted = !game.muted;
  settings.sound = !game.muted;
  $("mgMute").textContent = game.muted ? "🔇" : "🔊";
  saveSettings();
});

// =====================================================================
// SAVE PROGRESS
// =====================================================================

function saveProgress(player) {
  if (game.mode !== "solo") return;
  try {
    localStorage.setItem("mg_progress", JSON.stringify({
      rank: getRank(player),
      pct: getMischiefPercent(player),
      name: player.name,
      xp: player.xp,
      level: player.level
    }));
  } catch (_) {}
}

// =====================================================================
// INIT
// =====================================================================

initStartScreen();

// Sync mute icon with settings on load
if (game.muted) $("mgMute").textContent = "🔇";
