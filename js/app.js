// Joy English ☀️ v8 — lógica del juego
// Base Clozemaster: dominio 0–100 %, repaso espaciado (1/10/30/180 días, fallo→0 %),
// rondas de nuevas + hasta 5 repasos mezclados, favoritas, resumen de ronda.
// v5: los modos se eligen al tocar JUGAR (no en el inicio) y son:
//   📖 Vocabulario — fácil: opción múltiple · difícil: escribe la palabra
//   🎧 Listening   — fácil: opción múltiple · medio: escribe la palabra oída · difícil: transcribe la oración
//   🎤 Speaking    — fácil: di la palabra · medio: di la oración · difícil: di la oración desde la traducción
// El audio se reproduce SOLO al aparecer cada frase. Meta diaria en ORACIONES.
// Sonido dopamínico al acertar. Fondo negro con amarillo de marca.

(() => {
  "use strict";

  const STORAGE_KEY = "joyenglish-v3"; // misma clave: el progreso es compatible
  const LEGACY_KEYS = ["clozequest-v2", "clozequest-v1"];
  const MAX_REVIEWS_PER_ROUND = 5;
  const DAY = 24 * 60 * 60 * 1000;
  const INTERVALS = [0, 1 * DAY, 10 * DAY, 30 * DAY, 180 * DAY];

  const MODES = {
    vocab: {
      name: "📖 Vocabulario",
      desc: "completa la palabra que falta",
      diffs: {
        easy: { label: "😌 Fácil", desc: "Opción múltiple", points: 8 },
        hard: { label: "🔥 Difícil", desc: "Escribe la palabra", points: 16 }
      }
    },
    listening: {
      name: "🎧 Listening",
      desc: "entrena tu oído",
      diffs: {
        easy: { label: "😌 Fácil", desc: "Escucha y elige la palabra", points: 10 },
        medium: { label: "🙂 Medio", desc: "Escucha y escribe la palabra", points: 16 },
        hard: { label: "🔥 Difícil", desc: "Transcribe la oración completa", points: 24 }
      }
    },
    speaking: {
      name: "🎤 Speaking",
      desc: "habla en voz alta",
      diffs: {
        easy: { label: "😌 Fácil", desc: "Di la palabra que falta", points: 12 },
        medium: { label: "🙂 Medio", desc: "Di la oración completa", points: 16 },
        hard: { label: "🔥 Difícil", desc: "Di la oración desde la traducción", points: 24 }
      }
    },
    variations: {
      name: "🔄 Variaciones",
      desc: "transforma a negativo/pregunta (con to be y modales)",
      beta: true,
      diffs: {
        easy: { label: "😌 Fácil", desc: "Elige la forma correcta", points: 14 },
        hard: { label: "🔥 Difícil", desc: "Escríbela tú", points: 24 }
      }
    }
  };

  // Umbral de palabras acertadas para dar por buena una oración completa
  const SENTENCE_THRESHOLD = { listening: 0.85, speaking: 0.85, speakingMedium: 0.75, variations: 0.85 };

  const SR = window.SpeechRecognition || window.webkitSpeechRecognition || null;

  // ---------- 🏅 Rangos (por XP total) ----------
  // Nombres en inglés a propósito: es la meta del viaje. "Fluent" es el rango tope.
  // icon = emoji de respaldo; si existe icons/ranks/<id>.png se usa esa imagen en su
  // lugar (BETA: para cuando el usuario diseñe sus propias insignias, sin tocar código).
  const RANKS = [
    { id: "beginner", name: "Beginner", min: 0, icon: "🌱" },
    { id: "learner", name: "Learner", min: 500, icon: "📖" },
    { id: "explorer", name: "Explorer", min: 1500, icon: "🧭" },
    { id: "communicator", name: "Communicator", min: 3500, icon: "💬" },
    { id: "storyteller", name: "Storyteller", min: 7000, icon: "🗣️" },
    { id: "advanced", name: "Advanced", min: 13000, icon: "🎯" },
    { id: "near_fluent", name: "Near-Fluent", min: 22000, icon: "🚀" },
    { id: "fluent", name: "Fluent", min: 35000, icon: "☀️" }
  ];

  function rankInfo(points) {
    let idx = 0;
    for (let i = 0; i < RANKS.length; i++) {
      if (points >= RANKS[i].min) idx = i;
    }
    const rank = RANKS[idx];
    const next = RANKS[idx + 1] || null;
    const pct = next ? Math.round(((points - rank.min) / (next.min - rank.min)) * 100) : 100;
    return { rank, next, idx, pct, pointsToNext: next ? next.min - points : 0 };
  }

  // ---------- 💎 Gemas y tienda ----------
  const MAX_FREEZES = 3; // techo combinado (ganados cada 7 días + comprados)
  const SHOP_ITEMS = {
    freeze: { name: "🧊 Congelador de racha", desc: "Si faltas un día, tu racha no se rompe", cost: 8 },
    doublexp: { name: "⚡ XP Doble ×10", desc: "El doble de puntos en tus próximas 10 respuestas", cost: 10 },
    skipcap: { name: "🎫 Pase de palabras nuevas", desc: "Hoy no aplica el tope de palabras nuevas", cost: 6 }
  };

  function addGems(n, reason) {
    state.gems += n;
    if (reason) showToast(`💎 +${n} gemas — ${reason}`);
  }

  // ---------- Estado persistente ----------
  const defaultSettings = () => ({
    sessionLength: 10,
    dailyGoal: 20,          // ORACIONES por día (antes eran puntos)
    newWordsPerDay: 20,     // tope de palabras NUEVAS por día (evidencia: 10-20/día
                            // es el punto óptimo; más allá satura y baja la retención)
    rate: 0.95,
    voice: "",
    sounds: true,
    liveTyping: true,       // letras verde/rojo mientras escribes
    autoplay: true,
    autoAdvance: true,
    chartView: "days"       // vista de la gráfica de actividad: days | weeks | months
  });

  const defaultState = () => ({
    version: 3,
    points: 0,
    mode: "vocab",
    difficulty: "easy",
    settings: defaultSettings(),
    streak: { count: 0, lastDate: null, freezes: 0 },
    history: {},
    progress: {},
    customDecks: [],
    favorites: [],
    recent: [],               // ids de mazos/colecciones jugados recientemente
    talkSessions: [],         // charlas libres del Baúl
    errorVault: [],           // errores de speaking guardados
    welcomed: false,          // ya vio la tarjeta de bienvenida
    pinnedCols: ["ft1"],      // colecciones incorporadas fijadas en el inicio
    records: { bestTimed: 0, bestCombo: 0, bestDays: 0, talks: 0 },
    gems: 0,                  // moneda de la tienda (independiente del XP, no se gasta el XP)
    boosts: { doubleXpAnswers: 0, skipCapDate: null }, // efectos activos comprados en la tienda
    bugReports: [],           // 🚩 errores reportados en frases, para exportar y revisar
    deckFeedback: []          // 💬 sugerencias de organización de mazos, para exportar y revisar
  });

  let state = load();

  // Clave de fecha en hora LOCAL (con UTC, "hoy" cambiaba a las 7-8 pm en América)
  function dateKey(d = new Date()) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function today() {
    return dateKey();
  }

  function normalizeState(raw) {
    const s = {
      ...defaultState(),
      ...raw,
      settings: { ...defaultSettings(), ...(raw.settings || {}) }
    };
    // Modos de versiones anteriores → los tres modos v5
    if (!MODES[s.mode]) {
      s.mode = { choice: "vocab", input: "vocab" }[s.mode] || "vocab";
    }
    if (!MODES[s.mode].diffs[s.difficulty]) s.difficulty = "easy";
    // La meta diaria pasó de puntos a oraciones
    if (s.settings.dailyGoal > 60) s.settings.dailyGoal = 20;
    if (!Array.isArray(s.customDecks)) s.customDecks = [];
    s.customDecks = s.customDecks.map((d) => ({ pinned: true, ...d }));
    if (!Array.isArray(s.favorites)) s.favorites = [];
    if (!Array.isArray(s.recent)) s.recent = [];
    if (!Array.isArray(s.talkSessions)) s.talkSessions = [];
    if (!Array.isArray(s.errorVault)) s.errorVault = [];
    if (!Array.isArray(s.deckFeedback)) s.deckFeedback = [];
    delete s.variationsCache; // ya no se usa (Variaciones dejó de depender de IA/caché)
    // La bienvenida es solo para cuentas nuevas: si ya hay progreso, no molestar
    if (raw.welcomed === undefined && (raw.points || 0) > 0) s.welcomed = true;
    if (!Array.isArray(s.pinnedCols)) s.pinnedCols = ["ft1"];
    if (!(s.settings.sessionLength > 0)) s.settings.sessionLength = 10;
    if (!s.records || typeof s.records !== "object") s.records = {};
    s.records = { bestTimed: 0, bestCombo: 0, bestDays: 0, talks: 0, ...s.records };
    s.streak = { count: 0, lastDate: null, freezes: 0, ...s.streak };
    if (typeof s.gems !== "number") s.gems = 0;
    if (!s.boosts || typeof s.boosts !== "object") s.boosts = {};
    s.boosts = { doubleXpAnswers: 0, skipCapDate: null, ...s.boosts };
    if (!Array.isArray(s.bugReports)) s.bugReports = [];
    return s;
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return normalizeState(JSON.parse(raw));

      const v2raw = localStorage.getItem("clozequest-v2");
      if (v2raw) {
        const v2 = JSON.parse(v2raw);
        return normalizeState({
          points: v2.points, mode: v2.mode, settings: v2.settings,
          streak: v2.streak, history: v2.history, progress: v2.progress
        });
      }
      const v1raw = localStorage.getItem("clozequest-v1");
      if (v1raw) {
        const v1 = JSON.parse(v1raw);
        const s = defaultState();
        s.points = v1.points || 0;
        s.streak = v1.streak || s.streak;
        return s;
      }
    } catch (e) { /* estado corrupto: se reinicia */ }
    return defaultState();
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    scheduleCloudSave();
  }

  function todayHistory() {
    return state.history[today()] || { points: 0, played: 0, correct: 0, newWords: 0 };
  }

  function newWordsRemainingToday() {
    // El 🎫 pase de la tienda está deshabilitado (ver SHOP_ITEM_DISABLED): se ignora
    // el efecto aunque state.boosts.skipCapDate haya quedado guardado de una compra
    // anterior, para que un pase ya comprado deje de aplicar en cuanto se actualice.
    const used = todayHistory().newWords || 0;
    return Math.max(0, state.settings.newWordsPerDay - used);
  }

  function getProg(colId, idx) {
    return state.progress[colId]?.[idx] || null;
  }

  function setProg(colId, idx, data) {
    if (!state.progress[colId]) state.progress[colId] = {};
    state.progress[colId][idx] = data;
  }

  function allCollections() {
    return [...COLLECTIONS, ...state.customDecks];
  }

  function findCollection(colId) {
    return allCollections().find((c) => c.id === colId) || null;
  }

  // ---------- Utilidades ----------
  const $ = (id) => document.getElementById(id);

  function parseSentence(s) {
    const m = s.t.match(/\{\{(.+?)\}\}/);
    if (!m) return { answer: s.t, before: "", after: "", full: s.t };
    return {
      answer: m[1],
      before: s.t.slice(0, m.index),
      after: s.t.slice(m.index + m[0].length),
      full: s.t.replace(/\{\{(.+?)\}\}/, "$1")
    };
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function escapeHtml(text) {
    const d = document.createElement("div");
    d.textContent = text;
    return d.innerHTML;
  }

  function normalizeWords(text) {
    return text
      .toLowerCase()
      .replace(/[’']/g, "'")
      .replace(/[^a-z0-9'\s]/g, " ")
      .split(/\s+/)
      .filter(Boolean);
  }

  // Número que cuenta hacia arriba (dopamina en los resultados)
  function countUp(el, to, prefix = "+") {
    const dur = 800, start = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - start) / dur);
      el.textContent = `${prefix}${Math.round(to * (1 - Math.pow(1 - p, 3)))}`;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function showToast(text, long = false) {
    const el = document.createElement("div");
    el.className = long ? "toast toast-long" : "toast";
    el.textContent = text;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), long ? 6000 : 1950);
  }

  // Letras en verde/rojo mientras escribes (estilo juego de mecanografía):
  // verde si la letra coincide con esa posición del objetivo, rojo si no.
  // La comparación ignora mayúsculas, igual que la corrección final.
  function colorizeTyped(typed, target) {
    let html = "";
    for (let i = 0; i < typed.length; i++) {
      const ok = i < target.length && typed[i].toLowerCase() === target[i].toLowerCase();
      html += `<span class="${ok ? "tl-ok" : "tl-bad"}">${escapeHtml(typed[i])}</span>`;
    }
    return html;
  }

  function animate(el, cls) {
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
  }

  function confetti() {
    const colors = ["#facc15", "#eab308", "#fbbf24", "#4ade80", "#60a5fa", "#f472b6"];
    for (let i = 0; i < 40; i++) {
      const p = document.createElement("div");
      p.className = "confetti-piece";
      p.style.left = `${Math.random() * 100}vw`;
      p.style.background = colors[i % colors.length];
      p.style.animationDuration = `${1.6 + Math.random() * 1.4}s`;
      p.style.animationDelay = `${Math.random() * 0.4}s`;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 3400);
    }
  }

  // ---------- Sonido dopamínico al acertar (WebAudio, sin archivos) ----------
  let audioCtx = null;

  function tone(freq, delay, dur = 0.3, vol = 0.22) {
    const t = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, t + delay);
    gain.gain.exponentialRampToValueAtTime(vol, t + delay + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + delay + dur);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(t + delay);
    osc.stop(t + delay + dur + 0.05);
  }

  function ensureAudio() {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();
  }

  // Campanitas que SUBEN de tono con tu racha: cada acierto seguido suena más agudo
  function playCorrectSound(streak = 0) {
    if (!state.settings.sounds) return;
    try {
      ensureAudio();
      const mult = Math.min(1 + streak * 0.05, 1.6);
      tone(659.25 * mult, 0);
      tone(987.77 * mult, 0.09);
    } catch (e) { /* sin audio disponible */ }
  }

  // Fanfarria para metas cumplidas y subidas de nivel
  function playFanfare() {
    if (!state.settings.sounds) return;
    try {
      ensureAudio();
      [[523.25, 0], [659.25, 0.11], [783.99, 0.22], [1046.5, 0.34]].forEach(([f, d]) =>
        tone(f, d, 0.4, 0.2));
    } catch (e) { /* sin audio disponible */ }
  }

  // ---------- Voz (TTS) ----------
  let VOICES = [];
  const PREFERRED_VOICES = [
    "google us english", "samantha", "ava", "allison", "joanna", "jenny",
    "aria", "nicky", "zira", "karen", "daniel", "alex"
  ];

  function refreshVoices() {
    if (!("speechSynthesis" in window)) return;
    VOICES = speechSynthesis.getVoices()
      .filter((v) => v.lang.replace("_", "-").toLowerCase().startsWith("en"));
  }

  if ("speechSynthesis" in window) {
    refreshVoices();
    speechSynthesis.onvoiceschanged = refreshVoices;
  }

  function bestVoice() {
    if (state.settings.voice) {
      const chosen = VOICES.find((v) => v.voiceURI === state.settings.voice);
      if (chosen) return chosen;
    }
    let best = null, bestScore = -1;
    for (const v of VOICES) {
      let score = 0;
      const name = v.name.toLowerCase();
      const idx = PREFERRED_VOICES.findIndex((p) => name.includes(p));
      if (idx !== -1) score += (PREFERRED_VOICES.length - idx) * 10;
      if (v.lang.replace("_", "-").toLowerCase() === "en-us") score += 5;
      if (!v.localService) score += 2;
      if (score > bestScore) { best = v; bestScore = score; }
    }
    return best;
  }

  function speak(text, rate) {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const v = bestVoice();
    if (v) u.voice = v;
    u.lang = "en-US";
    u.rate = rate ?? state.settings.rate;
    u.pitch = 1;
    speechSynthesis.speak(u);
  }

  function levelInfo(points) {
    const level = Math.floor(Math.sqrt(points / 100)) + 1;
    const prev = 100 * (level - 1) ** 2;
    const next = 100 * level ** 2;
    return { level, pct: Math.round(((points - prev) / (next - prev)) * 100) };
  }

  function buildChoices(collection, sentence, count) {
    const answer = parseSentence(sentence).answer;
    const notAnswer = (x) => x.word.toLowerCase() !== answer.toLowerCase();

    const localPool = collection.sentences
      .map((s) => ({ word: parseSentence(s).answer, pos: s.pos }))
      .filter(notAnswer);
    const globalPool = COLLECTIONS
      .flatMap((c) => c.sentences.map((s) => ({ word: parseSentence(s).answer, pos: s.pos })))
      .filter(notAnswer);

    const samePos = shuffle(localPool.filter((x) => x.pos === sentence.pos).map((x) => x.word));
    const local = shuffle(localPool.map((x) => x.word));
    const global = shuffle(globalPool.map((x) => x.word));

    const picked = [];
    for (const w of [...samePos, ...local, ...global]) {
      if (picked.length === count - 1) break;
      if (!picked.some((p) => p.toLowerCase() === w.toLowerCase())) picked.push(w);
    }
    return shuffle([answer, ...picked]);
  }

  // ---------- Repaso espaciado ----------
  function collectionStats(col) {
    const now = Date.now();
    let newCount = 0, review = 0, mastered = 0, masterySum = 0;
    col.sentences.forEach((_, i) => {
      const p = getProg(col.id, i);
      if (!p) { newCount++; return; }
      masterySum += p.m;
      if (p.m >= 4) mastered++;
      if (p.due <= now && p.m < 4) review++;
    });
    const total = Math.max(1, col.sentences.length);
    const pct = Math.round((masterySum / (total * 4)) * 100);
    return { newCount, review, mastered, pct };
  }

  function dueItems(cols) {
    const now = Date.now();
    const due = [];
    cols.forEach((col) => {
      col.sentences.forEach((s, i) => {
        const p = getProg(col.id, i);
        if (p && p.due <= now && p.m < 4) due.push({ colId: col.id, idx: i, s, due: p.due });
      });
    });
    due.sort((a, b) => a.due - b.due);
    return due;
  }

  function favoriteItems() {
    return state.favorites
      .map((key) => {
        const cut = key.lastIndexOf(":");
        const colId = key.slice(0, cut);
        const idx = Number(key.slice(cut + 1));
        const col = findCollection(colId);
        return col && col.sentences[idx] ? { colId, idx, s: col.sentences[idx] } : null;
      })
      .filter(Boolean);
  }

  function isCoreFastTrack(colId) {
    return /^ft\d+$/.test(colId);
  }

  function buildRound(colId) {
    const size = state.settings.sessionLength;
    game.lastRoundOmittedFresh = 0;

    if (colId === "__fav__") {
      const now = Date.now();
      const favs = favoriteItems().map((it) => {
        const p = getProg(it.colId, it.idx);
        return { ...it, order: p ? p.due : 0, isDue: !p || p.due <= now };
      });
      favs.sort((a, b) => (b.isDue - a.isDue) || (a.order - b.order));
      return shuffle(favs.slice(0, size));
    }

    const col = findCollection(colId);
    if (!col) return [];
    const due = dueItems([col]).slice(0, MAX_REVIEWS_PER_ROUND);
    const fresh = [], seen = [];
    col.sentences.forEach((s, i) => {
      const p = getProg(col.id, i);
      if (!p) fresh.push({ colId: col.id, idx: i, s });
      else if (!due.some((d) => d.idx === i)) seen.push({ colId: col.id, idx: i, s, due: p.due });
    });
    seen.sort((a, b) => a.due - b.due);

    // Tope de palabras nuevas por día: SOLO aplica al currículo base (Fast Track
    // 1-4), que es continuo y comparte el cupo entre sí a propósito. Un mazo que el
    // usuario creó — de un PDF de su clase o a mano — debe regirse únicamente por
    // "frases por ronda": lo creó para avanzarlo a su ritmo, no para que otro mazo
    // le robe cupo sin que lo note.
    let freshCapped = fresh;
    if (isCoreFastTrack(col.id)) {
      const remaining = newWordsRemainingToday();
      freshCapped = fresh.slice(0, remaining);
      // El aviso solo sale si el tope de verdad achicó ESTA ronda: una ronda de
      // tamaño 10 en un mazo de 50 no pierde nada por el tope si el cupo (remaining)
      // ya alcanzaba para llenarla igual. El número en el mensaje es cuántas frases
      // del MAZO quedan pendientes para otro día, no cuánto se acortó esta ronda.
      const sizeWithoutCap = Math.min(size, due.length + fresh.length + seen.length);
      const sizeWithCap = Math.min(size, due.length + freshCapped.length + seen.length);
      const capAffectedThisRound = sizeWithoutCap > sizeWithCap;
      game.lastRoundOmittedFresh = capAffectedThisRound ? fresh.length - freshCapped.length : 0;
    }

    return shuffle([...due, ...freshCapped, ...seen].slice(0, size));
  }

  // Congelador de racha: Duolingo encontró que ser MENOS estricto con la racha
  // (permitir saltarte un día sin perderla) aumenta el uso, no lo reduce — perder
  // una racha larga por un solo mal día desmotiva más de lo que "protege" el hábito.
  // Cada 7 días de racha activa se gana 1 congelador (tope combinado con la tienda:
  // MAX_FREEZES).
  function touchDailyStreak() {
    const t = today();
    if (state.streak.lastDate === t) return;
    const yesterday = dateKey(new Date(Date.now() - DAY));
    const twoDaysAgo = dateKey(new Date(Date.now() - 2 * DAY));

    if (state.streak.lastDate === yesterday) {
      state.streak.count += 1;
    } else if (state.streak.lastDate === twoDaysAgo && state.streak.freezes > 0) {
      state.streak.freezes -= 1;
      state.streak.count += 1;
      showToast("🧊 Faltaste un día, pero tu congelador salvó la racha");
    } else {
      state.streak.count = 1;
    }
    state.streak.lastDate = t;

    if (state.streak.count > 0 && state.streak.count % 7 === 0) {
      const before = state.streak.freezes;
      state.streak.freezes = Math.min(MAX_FREEZES, state.streak.freezes + 1);
      if (state.streak.freezes > before) showToast("🧊 ¡Ganaste un congelador de racha!");
    }
    if (state.streak.count > state.records.bestDays) state.records.bestDays = state.streak.count;

    // 🎉 Celebración de racha: una vez por día, en la PRIMERA actividad del día
    // (este punto solo se alcanza cuando lastDate acaba de cambiar).
    showStreakCelebration(state.streak.count);
  }

  // Pantalla completa de festejo por la racha de días (pedido del usuario:
  // "una animación por cada racha que haga de días"). Hitos (semana/mes/100)
  // llevan una etiqueta extra. Se cierra sola o con un toque.
  function showStreakCelebration(days) {
    const overlay = document.createElement("div");
    overlay.className = "streak-celebration";
    const milestone =
      days % 100 === 0 ? "🏆 ¡¡100 DÍAS!!" :
      days % 30 === 0 ? "🏆 ¡Un mes entero!" :
      days % 7 === 0 ? "🎉 ¡Semana completa!" : "";
    overlay.innerHTML = `
      <div class="streak-flame">🔥</div>
      <div class="streak-days">${days}</div>
      <div class="streak-label">día${days === 1 ? "" : "s"} seguido${days === 1 ? "" : "s"} practicando</div>
      ${milestone ? `<div class="streak-milestone">${milestone}</div>` : ""}`;
    document.body.appendChild(overlay);
    confetti();
    playFanfare();
    overlay.addEventListener("click", () => overlay.remove());
    setTimeout(() => overlay.remove(), 2600);
  }

  // ---------- ⏱ Formato de tiempo de práctica ----------
  function fmtPractice(secs) {
    if (!secs) return "0 min";
    if (secs < 60) return "<1 min";
    const mins = Math.floor(secs / 60);
    if (mins < 60) return `${mins} min`;
    const h = Math.floor(mins / 60);
    return `${h} h ${String(mins % 60).padStart(2, "0")} min`;
  }

  function totalPracticeSeconds() {
    let total = 0;
    Object.values(state.history).forEach((h) => { total += h.seconds || 0; });
    return total;
  }

  // ---------- Gráfica de actividad (líneas, con vista por días/semanas/meses) ----------
  const WEEKDAYS = ["D", "L", "M", "X", "J", "V", "S"];
  const MONTHS_ES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  // Serie de puntos {label, value, practiced} según la vista elegida
  function chartSeries(view) {
    const pts = [];
    if (view === "days") {
      for (let i = 13; i >= 0; i--) {
        const d = new Date(Date.now() - i * DAY);
        const h = state.history[dateKey(d)];
        pts.push({
          label: `${WEEKDAYS[d.getDay()]}${d.getDate()}`,
          value: h?.played || 0,
          practiced: (h?.played || 0) > 0 ? 1 : 0
        });
      }
    } else if (view === "weeks") {
      // Últimas 12 semanas (lunes a domingo)
      const now = new Date();
      const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - ((now.getDay() + 6) % 7));
      for (let w = 11; w >= 0; w--) {
        let sum = 0, days = 0;
        const start = new Date(monday.getTime() - w * 7 * DAY);
        for (let i = 0; i < 7; i++) {
          const h = state.history[dateKey(new Date(start.getTime() + i * DAY))];
          if (h?.played) { sum += h.played; days++; }
        }
        pts.push({ label: `${start.getDate()}/${start.getMonth() + 1}`, value: sum, practiced: days });
      }
    } else {
      // Últimos 12 meses
      const now = new Date();
      for (let m = 11; m >= 0; m--) {
        const d = new Date(now.getFullYear(), now.getMonth() - m, 1);
        const prefix = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        let sum = 0, days = 0;
        Object.entries(state.history).forEach(([k, h]) => {
          if (k.startsWith(prefix) && h.played) { sum += h.played; days++; }
        });
        pts.push({ label: MONTHS_ES[d.getMonth()], value: sum, practiced: days });
      }
    }
    return pts;
  }

  function renderChart(el) {
    const view = state.settings.chartView || "days";
    const series = chartSeries(view);
    const goal = view === "days" ? state.settings.dailyGoal : null;
    const max = Math.max(goal || 0, ...series.map((p) => p.value), 1);

    const W = 560, H = 170, PADL = 10, PADR = 10, PADT = 22, PADB = 26;
    const iw = W - PADL - PADR, ih = H - PADT - PADB;
    const x = (i) => PADL + (series.length === 1 ? iw / 2 : (i / (series.length - 1)) * iw);
    const y = (v) => PADT + ih - (v / max) * ih;

    const line = series.map((p, i) => `${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(" ");
    const area = `${PADL},${PADT + ih} ${line} ${(PADL + iw).toFixed(1)},${PADT + ih}`;
    const labelEvery = series.length > 8 ? 2 : 1;

    let svg = `<svg class="chart-svg" viewBox="0 0 ${W} ${H}" aria-hidden="true">`;
    if (goal) {
      svg += `<line x1="${PADL}" y1="${y(goal).toFixed(1)}" x2="${PADL + iw}" y2="${y(goal).toFixed(1)}" class="chart-goalline"/>`;
    }
    svg += `<polygon points="${area}" class="chart-area"/>`;
    svg += `<polyline points="${line}" class="chart-line"/>`;
    series.forEach((p, i) => {
      svg += `<circle cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="4" class="chart-dot ${goal && p.value >= goal ? "goal-met" : ""}"/>`;
      // Círculo invisible más grande encima: el punto visible (r=4) es muy
      // chico para tocarlo bien en el teléfono, esto amplía el área de toque.
      svg += `<circle cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="12" data-i="${i}" class="chart-dot-hit"/>`;
      if (i % labelEvery === 0) {
        svg += `<text x="${x(i).toFixed(1)}" y="${H - 6}" class="chart-xlabel">${p.label}</text>`;
      }
    });
    svg += "</svg>";

    el.innerHTML = `
      <div class="chart-toggle">
        ${[["days", "Días"], ["weeks", "Semanas"], ["months", "Meses"]].map(([id, name]) =>
          `<button type="button" class="word-chip ${view === id ? "selected" : ""}" data-chartview="${id}">${name}</button>`).join("")}
      </div>
      ${svg}
      <div class="chart-tooltip hidden"></div>`;

    el.querySelectorAll("[data-chartview]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.settings.chartView = btn.dataset.chartview;
        save();
        renderChart(el);
      });
    });

    // Detallito por punto (pedido del usuario): en Mac aparece al pasar el
    // mouse por encima; en teléfono (sin mouse) aparece al tocar el punto.
    const tooltip = el.querySelector(".chart-tooltip");
    const svgEl = el.querySelector(".chart-svg");
    const showTooltip = (i) => {
      const p = series[i];
      const svgRect = svgEl.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const scaleX = svgRect.width / W, scaleY = svgRect.height / H;
      tooltip.textContent = p.value > 0 ? `${p.label}: ${p.value} oraciones` : `${p.label}: sin práctica`;
      tooltip.style.left = `${x(i) * scaleX + (svgRect.left - elRect.left)}px`;
      tooltip.style.top = `${y(p.value) * scaleY + (svgRect.top - elRect.top)}px`;
      tooltip.dataset.i = String(i);
      tooltip.classList.remove("hidden");
    };
    el.querySelectorAll(".chart-dot-hit").forEach((dot) => {
      const i = Number(dot.dataset.i);
      dot.addEventListener("mouseenter", () => showTooltip(i));
      dot.addEventListener("mouseleave", () => tooltip.classList.add("hidden"));
      dot.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = !tooltip.classList.contains("hidden") && tooltip.dataset.i === String(i);
        isOpen ? tooltip.classList.add("hidden") : showTooltip(i);
      });
    });
  }

  // ---------- Pantalla de inicio ----------
  function collectionCard(col, stats, extraHtml = "") {
    const card = document.createElement("div");
    card.className = "collection-card";
    const suggestBtn = col.id === "__fav__" ? "" :
      `<button class="deck-edit-link" data-suggest="${col.id}" title="Sugerir un cambio de organización en este mazo">💬 Sugerir</button>`;
    card.innerHTML = `
      <div class="collection-top">
        <div class="collection-icon">${escapeHtml(col.icon)}</div>
        <div>
          <div class="collection-name">${escapeHtml(col.name)}</div>
          <div class="collection-desc">${escapeHtml(col.desc || "")}</div>
        </div>
      </div>
      <div class="progress-track"><div class="progress-fill" style="width:${stats.pct}%"></div></div>
      <div class="collection-bottom">
        <div class="collection-counts">
          <span class="count-new"><b>${stats.newCount}</b> nuevas</span>
          <span class="count-review"><b>${stats.review}</b> por repasar</span>
          <span class="count-mastered"><b>${stats.mastered}</b> aprendidas</span>
        </div>
        <div>
          ${extraHtml}
          ${suggestBtn}
          <button class="btn primary" data-play="${col.id}" ${col.sentences.length ? "" : "disabled"}>Jugar ▶</button>
        </div>
      </div>`;
    return card;
  }

  function favoritesStats(favs) {
    const now = Date.now();
    let newCount = 0, review = 0, mastered = 0;
    favs.forEach(({ colId, idx }) => {
      const p = getProg(colId, idx);
      if (!p) newCount++;
      else {
        if (p.m >= 4) mastered++;
        if (p.due <= now && p.m < 4) review++;
      }
    });
    return { newCount, review, mastered, pct: favs.length ? Math.round((mastered / favs.length) * 100) : 0 };
  }

  function isPinnedCol(col) {
    return col.id.startsWith("deck-") ? !!col.pinned : state.pinnedCols.includes(col.id);
  }

  function togglePinCol(id) {
    const deck = state.customDecks.find((d) => d.id === id);
    if (deck) deck.pinned = !deck.pinned;
    else if (state.pinnedCols.includes(id)) state.pinnedCols = state.pinnedCols.filter((x) => x !== id);
    else state.pinnedCols.push(id);
    save();
  }

  function bindPlayButtons(root) {
    root.querySelectorAll("[data-play]").forEach((btn) => {
      btn.addEventListener("click", () => openPlayModal(btn.dataset.play));
    });
    root.querySelectorAll("[data-edit]").forEach((btn) => {
      btn.addEventListener("click", () => openDeckEditor(btn.dataset.edit));
    });
    root.querySelectorAll("[data-pin]").forEach((btn) => {
      btn.addEventListener("click", () => {
        togglePinCol(btn.dataset.pin);
        renderHome();
        renderDecksScreen();
      });
    });
    root.querySelectorAll("[data-suggest]").forEach((btn) => {
      btn.addEventListener("click", () => openDeckSuggestModal(btn.dataset.suggest));
    });
  }

  // Pinta una insignia: emoji por defecto + imagen opcional encima (icons/ranks/<id>.png).
  // Si el archivo no existe, onerror ya está puesto en el <img> del HTML y lo oculta solo.
  function renderRankBadge(emojiEl, imgEl, rank) {
    emojiEl.textContent = rank.icon;
    imgEl.style.display = "";
    imgEl.src = `icons/ranks/${rank.id}.png`;
  }

  function renderRankBanner() {
    const { rank, next, pct, pointsToNext } = rankInfo(state.points);
    renderRankBadge($("rank-badge-emoji"), $("rank-badge-img"), rank);
    $("rank-name").textContent = rank.name;
    $("rank-progress-text").textContent = next
      ? `${pointsToNext.toLocaleString("es")} XP para ${next.name}`
      : "¡Rango máximo alcanzado! 🎉";
    $("rank-fill").style.width = `${pct}%`;
    $("rank-fill").classList.toggle("done", !next);
    $("gems-count").textContent = `💎 ${state.gems}`;
  }

  function renderHome() {
    renderRankBanner();
    const daily = todayHistory();
    $("stat-today").textContent = daily.played.toLocaleString("es");
    $("stat-streak").textContent = `🔥 ${state.streak.count}`;
    $("stat-streak-label").textContent =
      state.streak.freezes > 0 ? `Días seguidos · 🧊×${state.streak.freezes}` : "Días seguidos";

    const lvl = levelInfo(state.points);
    $("stat-level").textContent = lvl.level;
    $("stat-level-label").textContent = `Nivel · ${state.points.toLocaleString("es")} XP`;
    $("level-fill").style.width = `${lvl.pct}%`;

    // Meta diaria en ORACIONES practicadas
    const goal = state.settings.dailyGoal;
    $("goal-count").textContent = `${daily.played} / ${goal} oraciones`;
    $("goal-fill").style.width = `${Math.min(100, Math.round((daily.played / goal) * 100))}%`;
    $("goal-fill").classList.toggle("done", daily.played >= goal);

    // ⏱ Tiempo practicando (hoy + total histórico)
    $("time-today").textContent = `${fmtPractice(daily.seconds || 0)} hoy`;
    $("time-total").textContent = `Total: ${fmtPractice(totalPracticeSeconds())}`;

    renderChart($("home-chart"));

    // Mazos y colecciones usados recientemente
    const recentWrap = $("recent-list");
    recentWrap.innerHTML = "";
    const recents = state.recent.map(findCollection).filter(Boolean);
    $("recent-block").classList.toggle("hidden", recents.length === 0);
    recents.forEach((col) => {
      const view = col.id.startsWith("deck-")
        ? { ...col, desc: `${col.sentences.length} frases · mazo tuyo` }
        : col;
      recentWrap.appendChild(collectionCard(view, collectionStats(col)));
    });
    bindPlayButtons(recentWrap);

    // "Aprendidas" cuenta TODO el banco, esté fijado o no
    let totalMastered = 0;
    allCollections().forEach((c) => { totalMastered += collectionStats(c).mastered; });
    $("stat-mastered").textContent = totalMastered;

    const wrap = $("collections");
    wrap.innerHTML = "";

    const favs = favoriteItems();
    if (favs.length > 0) {
      const favCol = { id: "__fav__", icon: "⭐", name: "Favoritas",
        desc: "Las frases que marcaste con ⭐ durante el juego",
        sentences: favs.map((f) => f.s) };
      wrap.appendChild(collectionCard(favCol, favoritesStats(favs)));
    }

    // Solo lo FIJADO aparece en el inicio; el catálogo completo vive en 📚 Mazos
    const deckWrap = $("deck-list");
    deckWrap.innerHTML = "";
    const pinned = allCollections().filter(isPinnedCol);
    $("decks-empty").classList.toggle("hidden", pinned.length > 0);
    $("btn-all-decks").textContent = `📚 Todos los mazos (${allCollections().length})`;
    pinned.forEach((col) => {
      const isDeck = col.id.startsWith("deck-");
      const extra = isDeck
        ? `<button class="deck-edit-link" data-edit="${col.id}">✏️ Editar</button>` : "";
      const view = isDeck ? { ...col, desc: `${col.sentences.length} frases · mazo tuyo` } : col;
      deckWrap.appendChild(collectionCard(view, collectionStats(col), extra));
    });

    bindPlayButtons(wrap);
    bindPlayButtons(deckWrap);
  }

  const NAV_FOR_SCREEN = { home: "nav-home", decks: "nav-decks", vault: "nav-vault", stats: "nav-stats" };

  function showScreen(name) {
    ["home", "game", "results", "stats", "decks", "deck", "vault"].forEach((s) => {
      $(`screen-${s}`).classList.toggle("hidden", s !== name);
    });
    // Altura fijada por el handler del teclado (visualViewport): limpiar al
    // cambiar de pantalla, para no arrastrar un alto viejo la próxima ronda.
    $("screen-game").style.height = "";
    // La barra inferior solo se ve en las pantallas principales
    const nav = $("bottom-nav");
    nav.classList.toggle("hidden", !(name in NAV_FOR_SCREEN));
    nav.querySelectorAll("[data-nav]").forEach((b) =>
      b.classList.toggle("active", NAV_FOR_SCREEN[name] === b.id));
    if (name !== "vault" && talk.active) stopTalk(true);
  }

  // ---------- Elegir modo + dificultad al tocar Jugar ----------
  let pendingColId = null;

  function renderPlayModal() {
    const modes = $("play-modes");
    modes.innerHTML = "";
    Object.entries(MODES).forEach(([id, m]) => {
      const btn = document.createElement("button");
      btn.className = "diff-btn play-mode-btn" + (state.mode === id ? " active" : "");
      btn.innerHTML = `${m.name}${m.beta ? ' <span class="beta-badge">BETA</span>' : ""} <small>${m.desc}</small>`;
      btn.addEventListener("click", () => {
        state.mode = id;
        if (!MODES[id].diffs[state.difficulty]) state.difficulty = "easy";
        save();
        renderPlayModal();
      });
      modes.appendChild(btn);
    });

    const diffs = $("play-diffs");
    diffs.innerHTML = "";
    Object.entries(MODES[state.mode].diffs).forEach(([id, d]) => {
      const btn = document.createElement("button");
      btn.className = "diff-btn" + (state.difficulty === id ? " last-used" : "");
      btn.innerHTML = `${d.label} <small>${d.desc} · +${d.points} pts</small>`;
      btn.addEventListener("click", () => {
        state.difficulty = id;
        save();
        $("play-modal").close();
        if (pendingColId === null) return;
        if (state.mode === "variations") startVariationsRound(pendingColId);
        else startRound(pendingColId);
      });
      diffs.appendChild(btn);
    });
  }

  function openPlayModal(colId) {
    pendingColId = colId;
    renderPlayModal();
    $("play-modal").showModal();
  }

  $("btn-play-cancel").addEventListener("click", () => {
    pendingColId = null;
    $("play-modal").close();
  });

  // ---------- Ronda ----------
  const game = {
    queue: [], pos: 0, lastColId: null,
    points: 0, correct: 0, streak: 0, bestStreak: 0,
    answered: false, hintUsed: false, mustRetype: false, current: null,
    advanceTimer: null, answers: [], goalHit: false,
    wasTimed: false, timedEnd: null, timedInt: null,
    lastRoundOmittedFresh: 0 // cuántas frases frescas del mazo se quedaron fuera por el tope diario
  };

  function diffConf() {
    return MODES[state.mode].diffs[state.difficulty];
  }

  function isFullSentence() {
    return state.difficulty === "hard" && state.mode !== "vocab" && state.mode !== "variations";
  }

  // Graduación: una vez que ya reconoces la palabra (dominio ≥ 50%), Vocabulario
  // Fácil deja de darla en opción múltiple y te pide escribirla. Reconocer entre
  // 4 opciones y producir la palabra de memoria son habilidades distintas — la
  // segunda es la que de verdad se necesita para hablar (retrieval > recognition).
  function isGraduatedItem() {
    if (state.mode !== "vocab" || state.difficulty !== "easy" || !game.current) return false;
    const p = getProg(game.current.colId, game.current.idx);
    return !!p && p.m >= 2;
  }

  function isWordInput() {
    return (state.mode === "vocab" && state.difficulty === "hard") ||
           (state.mode === "listening" && state.difficulty === "medium") ||
           (state.mode === "variations" && state.difficulty === "hard") ||
           isGraduatedItem();
  }

  function isChoiceQuestion() {
    return state.difficulty === "easy" &&
           (state.mode === "vocab" || state.mode === "listening" || state.mode === "variations") &&
           !isGraduatedItem();
  }

  function basePoints() {
    // Escribir una palabra "fácil" ya graduada exige más esfuerzo que elegirla:
    // se paga como si fuera difícil, para no castigar el reto extra.
    const base = isGraduatedItem() ? MODES.vocab.diffs.hard.points : diffConf().points;
    return game.hintUsed ? Math.floor(base / 2) : base;
  }

  function beginRound(queue, colId, timed = false) {
    game.queue = queue;
    game.lastColId = colId;
    game.pos = 0;
    game.points = 0;
    game.correct = 0;
    game.streak = 0;
    game.bestStreak = 0;
    game.answers = [];
    game.goalHit = false;
    game.wasTimed = timed;
    game.timedEnd = null;
    clearInterval(game.timedInt);
    // El mazo jugado queda como "reciente" en el inicio: solo el último (al tocar
    // otro, el anterior desaparece de esta sección)
    if (colId && colId !== "__fav__") {
      state.recent = [colId];
      save();
    }
    showScreen("game");
    showQuestion();
  }

  function startRound(colId) {
    const queue = buildRound(colId);
    if (queue.length === 0) {
      const col = colId === "__fav__" ? null : findCollection(colId);
      const hasSentences = colId === "__fav__" ? favoriteItems().length > 0 : !!col?.sentences.length;
      showToast(hasSentences
        ? "🎉 Ya completaste tus palabras nuevas de hoy — vuelve mañana o repasa otro mazo"
        : "Ese mazo no tiene frases 😅");
      return;
    }
    // El tope de nuevas es GLOBAL (compartido entre todos los mazos): si ya jugaste
    // otro mazo hoy, uno nuevo puede llegar con muchas menos frases de las que tiene.
    if (game.lastRoundOmittedFresh > 0) {
      showToast(
        `🎫 Cupo diario: quedan ${game.lastRoundOmittedFresh} frases nuevas de este mazo para ` +
        `otro día. Súbelo en ⚙️ Ajustes o compra un pase en 🏪 Tienda para verlas hoy.`,
        true
      );
    }
    beginRound(queue, colId);
  }

  // (El ⚡ Contrarreloj de 60s se quitó del inicio en v31 a pedido del usuario;
  // game.wasTimed queda inerte por si algún día vuelve como reto.)

  function favKey() {
    return `${game.current.colId}:${game.current.idx}`;
  }

  function renderFavButton() {
    const faved = state.favorites.includes(favKey());
    const btn = $("btn-fav");
    btn.textContent = faved ? "⭐" : "☆";
    btn.classList.toggle("faved", faved);
  }

  // 📖 Diccionario al tocar: envuelve cada palabra en un span tocable
  // (data-word = la palabra "limpia", sin puntuación) dentro del texto dado.
  // Los espacios quedan como texto plano — no hace falta envolverlos.
  function appendTappableText(el, text) {
    text.split(/(\s+)/).forEach((part) => {
      const core = part.match(/[A-Za-z']+/);
      if (!core) { el.appendChild(document.createTextNode(part)); return; }
      const span = document.createElement("span");
      span.className = "tap-word";
      span.textContent = part;
      span.dataset.word = core[0];
      el.appendChild(span);
    });
  }

  function renderBlankSentence() {
    const { before, after, answer } = game.current.parsed;
    const el = $("sentence");
    el.classList.remove("dictation");
    el.innerHTML = "";
    appendTappableText(el, before);
    const blank = document.createElement("span");
    blank.className = "blank";
    blank.id = "blank";
    blank.textContent = "_".repeat(Math.max(4, answer.length));
    el.appendChild(blank);
    appendTappableText(el, after);
  }

  // tappable=true cuando el texto es una oración en INGLÉS real (se puede
  // tocar palabra por palabra); false para instrucciones en español.
  function renderPromptSentence(text, tappable = false) {
    const el = $("sentence");
    el.classList.add("dictation");
    el.innerHTML = "";
    if (tappable) appendTappableText(el, text);
    else el.textContent = text;
  }

  function showQuestion() {
    clearTimeout(game.advanceTimer);
    const item = game.queue[game.pos];
    game.current = { ...item, parsed: parseSentence(item.s) };
    game.answered = false;
    game.hintUsed = false;
    game.mustRetype = false;
    if (item.variations) game.current.varType = Math.random() < 0.5 ? "negative" : "question";

    const mode = state.mode;
    const d = state.difficulty;

    if (game.wasTimed) {
      $("mode-badge").textContent = "⚡ Contrarreloj · acierta todas las que puedas";
    } else if (isGraduatedItem()) {
      $("mode-badge").textContent = "🎓 Ya la reconoces — ahora escríbela";
      $("round-count").textContent = `${game.pos + 1}/${game.queue.length}`;
      $("round-fill").style.width = `${(game.pos / game.queue.length) * 100}%`;
    } else {
      $("mode-badge").textContent = `${MODES[mode].name} · ${diffConf().label}`;
      $("round-count").textContent = `${game.pos + 1}/${game.queue.length}`;
      $("round-fill").style.width = `${(game.pos / game.queue.length) * 100}%`;
    }
    $("game-points").textContent = `${game.points} pts`;
    $("game-streak").textContent = `🔥 ${game.streak}`;
    renderStreakFx();

    // Qué se ve en la tarjeta según modo + dificultad
    if (mode === "vocab") {
      renderBlankSentence();
      $("translation").textContent = game.current.s.es; // vocabulario siempre con traducción
    } else if (mode === "listening") {
      if (d === "hard") {
        renderPromptSentence("🎧 Escucha y transcribe la oración completa:");
        $("translation").textContent = "";
      } else {
        renderBlankSentence();
        $("translation").textContent = ""; // se revela al responder
      }
    } else if (mode === "speaking") {
      if (d === "hard") {
        renderPromptSentence("🎤 Di la oración completa en inglés:");
        $("translation").textContent = game.current.s.es;
      } else {
        renderBlankSentence();
        $("translation").textContent = d === "easy" ? game.current.s.es : "";
      }
    } else if (mode === "variations") {
      const type = game.current.varType;
      renderPromptSentence(type === "negative"
        ? "✏️ Escribe (o elige) la oración en NEGATIVO:"
        : "❓ Convierte la oración en PREGUNTA:");
      $("variation-base").classList.remove("hidden");
      $("variation-base").innerHTML =
        `“${escapeHtml(game.current.parsed.full)}”<br><i>${escapeHtml(game.current.s.es)}</i>`;
      $("translation").textContent = "";
    }
    if (mode !== "variations") $("variation-base").classList.add("hidden");

    const p = getProg(item.colId, item.idx);
    renderMastery(p ? p.m : 0);
    renderFavButton();

    $("feedback").textContent = "";
    $("feedback").className = "feedback";
    $("word-match").classList.add("hidden");
    $("help-panel").classList.add("hidden");
    $("word-popup").classList.add("hidden");
    $("typing-live").classList.add("hidden");
    $("typing-live").innerHTML = "";
    $("btn-next").classList.add("hidden");

    $("choices").classList.toggle("hidden", !isChoiceQuestion());
    $("input-area").classList.toggle("hidden", !(isWordInput() || (mode === "listening" && d === "hard")));
    $("speak-area").classList.toggle("hidden", mode !== "speaking");

    // En Vocabulario no hay audio: ya tenés la traducción, y escuchar la respuesta
    // sería practicar escucha, no vocabulario.
    $("btn-tts").classList.toggle("hidden", mode === "vocab");
    $("btn-tts-slow").classList.toggle("hidden", mode === "vocab");

    if (isChoiceQuestion()) {
      if (mode === "variations") renderVariationChoices();
      else renderChoices(4);
      $("kbd-hint").textContent = "Teclas 1–4 para responder · Enter para continuar";
    } else if (isWordInput() || (mode === "listening" && d === "hard")) {
      const input = $("answer-input");
      input.value = "";
      input.className = "";
      input.disabled = false;
      input.placeholder = mode === "variations"
        ? (game.current.varType === "negative" ? "Escribe la oración en negativo…" : "Escribe la pregunta…")
        : isFullSentence()
          ? "Escribe la oración completa que escuchas…"
          : mode === "listening"
            ? "Escribe la palabra que escuchas…"
            : isGraduatedItem()
              ? "La reconoces — ahora escríbela tú…"
              : "Escribe la palabra que falta…";
      $("btn-giveup").disabled = false;
      $("btn-check").disabled = false;
      input.focus();
      $("kbd-hint").textContent = "Enter para comprobar y continuar";
    } else if (mode === "speaking") {
      setupSpeaking();
      $("speak-instructions").textContent = {
        easy: "Escucha y di en voz alta LA PALABRA que falta.",
        medium: "Escucha y di la oración completa, incluyendo la palabra que falta.",
        hard: "Mira la traducción y di la oración completa en inglés."
      }[d];
      $("btn-reveal").classList.toggle("hidden", d === "hard");
      $("kbd-hint").textContent = "Pulsa 🎤 y habla en inglés";
    }

    animate($("sentence-card"), "slide-in");

    // El audio se reproduce al aparecer la frase (pedido del usuario) — EXCEPTO en
    // Vocabulario (v30): ahí no hay pista de audio antes de responder, para no
    // resolver por oído; el audio se escucha recién DESPUÉS de responder (ver
    // resolveAnswer). En speaking difícil tampoco: ahí el reto es producirla desde
    // la traducción.
    if (mode !== "vocab" && !(mode === "speaking" && d === "hard")) {
      speak(game.current.parsed.full);
    } else if (mode === "vocab") {
      // Corta cualquier audio que venga arrastrado (p. ej. la lectura de la
      // respuesta anterior si avanzaste rápido): la pregunta de vocabulario
      // SIEMPRE empieza en silencio.
      speechSynthesis.cancel?.();
    }
  }

  // La llama 🔥 crece con tu racha y la tarjeta brilla en combo
  function renderStreakFx() {
    const el = $("game-streak");
    el.classList.toggle("hot", game.streak >= 5);
    el.classList.toggle("fire", game.streak >= 10);
    $("sentence-card").classList.toggle("combo-glow", game.streak >= 5);
  }

  function renderMastery(m) {
    const pips = "●".repeat(m) + "○".repeat(4 - m);
    $("mastery-indicator").innerHTML =
      `Dominio: <span class="pips">${pips}</span> ${m * 25}%`;
  }

  function renderChoices(count) {
    const wrap = $("choices");
    wrap.innerHTML = "";
    const options = buildChoices(findCollection(game.current.colId) || COLLECTIONS[0], game.current.s, count);
    options.forEach((word, i) => {
      const btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.dataset.word = word;
      btn.innerHTML = `<span class="key">${i + 1}</span>${escapeHtml(word)}`;
      btn.classList.add("slide-in");
      btn.style.animationDelay = `${i * 60}ms`;
      btn.addEventListener("click", () => answerChoice(btn));
      wrap.appendChild(btn);
    });
  }

  // 🔄 Variaciones fácil: opciones son ORACIONES completas (la correcta + los
  // distractores que ya vinieron de Gemini junto con la variación).
  function renderVariationChoices() {
    const wrap = $("choices");
    wrap.innerHTML = "";
    const type = game.current.varType;
    const v = game.current.variations;
    const correct = type === "negative" ? v.negative : v.question;
    const distractors = (type === "negative" ? v.negative_distractors : v.question_distractors) || [];
    const options = shuffle([correct, ...distractors]);
    options.forEach((text, i) => {
      const btn = document.createElement("button");
      btn.className = "choice-btn choice-btn-sentence";
      btn.dataset.correct = text === correct ? "1" : "0";
      btn.innerHTML = `<span class="key">${i + 1}</span>${escapeHtml(text)}`;
      btn.classList.add("slide-in");
      btn.style.animationDelay = `${i * 60}ms`;
      btn.addEventListener("click", () => answerVariationChoice(btn));
      wrap.appendChild(btn);
    });
  }

  // ---------- Responder ----------
  function answerChoice(btn) {
    if (game.answered) return;
    const isCorrect =
      btn.dataset.word.toLowerCase() === game.current.parsed.answer.toLowerCase();

    document.querySelectorAll(".choice-btn").forEach((b) => {
      b.disabled = true;
      if (b.dataset.word.toLowerCase() === game.current.parsed.answer.toLowerCase()) {
        b.classList.add("correct");
      }
    });
    if (!isCorrect) btn.classList.add("wrong");

    resolveAnswer(isCorrect, basePoints());
  }

  // 🔄 Variaciones fácil: elegir entre oraciones completas (no palabras sueltas)
  function answerVariationChoice(btn) {
    if (game.answered) return;
    const isCorrect = btn.dataset.correct === "1";
    document.querySelectorAll(".choice-btn").forEach((b) => {
      b.disabled = true;
      if (b.dataset.correct === "1") b.classList.add("correct");
    });
    if (!isCorrect) btn.classList.add("wrong");
    resolveAnswer(isCorrect, basePoints());
  }

  function answerInput(giveUp = false) {
    if (game.answered) return;
    if (state.mode === "variations" && state.difficulty === "hard") { answerVariationText(giveUp); return; }
    if (isFullSentence()) { answerFullSentence(giveUp); return; }

    const input = $("answer-input");
    const guess = input.value.trim().toLowerCase();
    if (!giveUp && !guess) { input.focus(); return; }

    const isCorrect = !giveUp && guess === game.current.parsed.answer.toLowerCase();
    const pts = basePoints();

    $("btn-giveup").disabled = true;

    if (isCorrect) {
      input.disabled = true;
      $("btn-check").disabled = true;
      input.className = "ok";
      resolveAnswer(true, pts);
    } else {
      // Aprender del error: escribe la respuesta correcta para continuar
      resolveAnswer(false, 0);
      game.mustRetype = true;
      input.className = "bad";
      input.value = "";
      input.placeholder = `Escribe “${game.current.parsed.answer}” para continuar`;
      input.disabled = false;
      $("btn-check").disabled = false;
      $("btn-next").classList.add("hidden");
      input.focus();
    }
  }

  // Transcribir la oración completa (listening difícil)
  function answerFullSentence(giveUp = false) {
    const input = $("answer-input");
    const typed = input.value.trim();
    if (!giveUp && !typed) { input.focus(); return; }

    const target = normalizeWords(game.current.parsed.full);
    const answerWord = normalizeWords(game.current.parsed.answer).join(" ");
    const said = normalizeWords(typed);
    const saidPool = [...said];
    const matched = new Set();
    target.forEach((w, i) => {
      const k = saidPool.indexOf(w);
      if (k !== -1) { matched.add(i); saidPool.splice(k, 1); }
    });
    const pct = matched.size / target.length;
    const isCorrect = !giveUp && pct >= SENTENCE_THRESHOLD.listening && said.includes(answerWord);

    renderWordMatch(target, matched, `Escribiste: “${typed || "—"}”`, pct);

    input.disabled = true;
    $("btn-check").disabled = true;
    $("btn-giveup").disabled = true;
    input.className = isCorrect ? "ok" : "bad";

    resolveAnswer(isCorrect, basePoints());
  }

  // 🔄 Variaciones difícil: escribir la negativa/pregunta completa. Se compara por
  // solapamiento de palabras (como el dictado), no letra por letra: hay más de una
  // forma correcta de decir lo mismo (doesn't vs does not) y ser demasiado estricto
  // frustraría sin razón.
  // Contracciones ↔ forma larga: para que "does not" no desalinee la comparación
  // posicional frente a "doesn't" (mismo significado, distinto número de palabras).
  const CONTRACTION_EXPANSIONS = {
    "doesn't": "does not", "don't": "do not", "isn't": "is not", "aren't": "are not",
    "wasn't": "was not", "weren't": "were not", "can't": "can not", "won't": "will not",
    "haven't": "have not", "hasn't": "has not", "didn't": "did not", "couldn't": "could not",
    "wouldn't": "would not", "shouldn't": "should not"
  };
  function expandContractions(words) {
    const out = [];
    words.forEach((w) => {
      if (CONTRACTION_EXPANSIONS[w]) out.push(...CONTRACTION_EXPANSIONS[w].split(" "));
      else out.push(w);
    });
    return out;
  }

  function answerVariationText(giveUp = false) {
    const input = $("answer-input");
    const typed = input.value.trim();
    if (!giveUp && !typed) { input.focus(); return; }

    const type = game.current.varType;
    const v = game.current.variations;
    const correctText = type === "negative" ? v.negative : v.question;

    // Comparación POR POSICIÓN (no por bolsa de palabras): en Variaciones el orden
    // ES la gramática que se evalúa — "Do you think I am right?" no es lo mismo
    // que "Do I think you are right?" aunque compartan casi todas las palabras.
    const target = expandContractions(normalizeWords(correctText));
    const said = expandContractions(normalizeWords(typed));
    const matched = new Set();
    const len = Math.min(target.length, said.length);
    for (let i = 0; i < len; i++) if (said[i] === target[i]) matched.add(i);
    const pct = target.length ? matched.size / target.length : 0;
    const isCorrect = !giveUp && pct >= SENTENCE_THRESHOLD.variations;

    renderWordMatch(target, matched, `Escribiste: “${typed || "—"}”`, pct);
    $("word-match").innerHTML += `<div class="variation-official">✅ Forma esperada: “${escapeHtml(correctText)}”</div>`;

    input.disabled = true;
    $("btn-check").disabled = true;
    $("btn-giveup").disabled = true;
    input.className = isCorrect ? "ok" : "bad";

    resolveAnswer(isCorrect, basePoints());
  }

  // approx=true: viene del micrófono, cuya precisión cae con acento no nativo
  // (documentado: ~95% con hablantes nativos, ~75-80% con acento extranjero).
  // El % es solo una referencia, no un veredicto — por eso el copy lo deja claro
  // y la autoevaluación manual sigue siendo una forma válida de responder.
  function renderWordMatch(target, matched, saidLabel, pct, approx = false) {
    const wm = $("word-match");
    const suffix = approx
      ? `≈ ${Math.round(pct * 100)} % reconocido por el micrófono (aproximado — puede fallar con tu acento)`
      : `${Math.round(pct * 100)} % de la oración`;
    wm.innerHTML = target
      .map((w, i) => `<span class="${matched.has(i) ? "wm-ok" : "wm-miss"}">${escapeHtml(w)}</span>`)
      .join(" ") +
      `<span class="said">${escapeHtml(saidLabel)} · ${suffix}</span>`;
    wm.classList.remove("hidden");
  }

  function checkRetype() {
    const input = $("answer-input");
    if (input.value.trim().toLowerCase() === game.current.parsed.answer.toLowerCase()) {
      game.mustRetype = false;
      input.className = "ok";
      input.disabled = true;
      $("btn-check").disabled = true;
      $("btn-next").classList.remove("hidden");
      $("btn-next").focus();
    } else {
      input.className = "bad";
      input.select();
    }
  }

  function resolveAnswer(isCorrect, pts) {
    game.answered = true;
    const { answer, before, after, full } = game.current.parsed;
    let blank = null; // solo existe en el modo normal (huella de la palabra oculta)

    if (state.mode === "variations") {
      const type = game.current.varType;
      const v = game.current.variations;
      const correctText = type === "negative" ? v.negative : v.question;
      renderPromptSentence(correctText, true);
      $("sentence").classList.toggle("filled-correct", isCorrect);
      $("sentence").classList.toggle("filled-wrong", !isCorrect);
      // No hay traducción de la variación (se genera con reglas, no con IA) — se
      // muestra la del afirmativo original como referencia de significado.
      $("translation").textContent = game.current.s.es;
    } else {
      const sentenceEl = $("sentence");
      sentenceEl.classList.remove("dictation");
      sentenceEl.innerHTML = "";
      blank = document.createElement("span");
      blank.className = `blank ${isCorrect ? "filled-correct" : "filled-wrong"}`;
      blank.id = "blank";
      blank.textContent = answer;
      appendTappableText(sentenceEl, before);
      sentenceEl.appendChild(blank);
      appendTappableText(sentenceEl, after);
      $("translation").textContent = game.current.s.es;
    }

    const prev = getProg(game.current.colId, game.current.idx);
    const oldM = prev ? prev.m : 0;
    const newM = isCorrect ? Math.min(4, oldM + 1) : 0;
    const due = isCorrect ? Date.now() + INTERVALS[newM] : Date.now();
    setProg(game.current.colId, game.current.idx, { m: newM, due });
    renderMastery(newM);

    game.answers.push({ full, es: game.current.s.es, correct: isCorrect });

    const t = today();
    const h = state.history[t] || { points: 0, played: 0, correct: 0, newWords: 0 };
    const beforePlayed = h.played;
    h.played++;
    if (!prev && isCoreFastTrack(game.current.colId)) {
      h.newWords = (h.newWords || 0) + 1; // primera vez que se ve esta frase del currículo base
    }

    const fb = $("feedback");
    if (isCorrect) {
      game.correct++;
      game.streak++;
      game.bestStreak = Math.max(game.bestStreak, game.streak);
      h.correct++;
      // COMBO: 5 seguidas ×1.5 · 10 seguidas ×2
      const combo = game.streak >= 10 ? 2 : game.streak >= 5 ? 1.5 : 1;
      let total = Math.round(pts * combo);
      let comboTag = combo > 1 ? ` · ⚡ COMBO ×${combo}` : "";
      // ⚡ XP Doble comprado en la tienda: se consume respuesta a respuesta
      if (state.boosts.doubleXpAnswers > 0) {
        state.boosts.doubleXpAnswers--;
        total *= 2;
        comboTag += ` · ⚡×2 tienda (${state.boosts.doubleXpAnswers} quedan)`;
      }
      const msg = `✓ ¡Correcto! +${total} pts${comboTag}`;
      const levelBefore = levelInfo(state.points).level;
      const rankBefore = rankInfo(state.points).rank;
      game.points += total;
      state.points += total;
      h.points += total;
      const levelNow = levelInfo(state.points).level;
      const rankNow = rankInfo(state.points).rank;
      fb.textContent = msg;
      fb.className = "feedback ok";
      floatPoints(`+${total}`);
      if (blank) animate(blank, "pop");
      playCorrectSound(game.streak);
      navigator.vibrate?.(25);
      if (game.streak > state.records.bestCombo) state.records.bestCombo = game.streak;
      if ([5, 10, 20].includes(game.streak)) showToast(`🔥 ¡${game.streak} seguidas!`);
      if (levelNow > levelBefore) {
        addGems(1);
        showToast(`🎉 ¡Subiste al nivel ${levelNow}! · 💎+1`);
        confetti();
        playFanfare();
      }
      if (rankNow.id !== rankBefore.id) {
        addGems(5);
        showToast(`${rankNow.icon} ¡Nuevo rango: ${rankNow.name}! · 💎+5`);
        confetti();
        playFanfare();
      }
    } else {
      game.streak = 0;
      if (state.mode === "variations") {
        const type = game.current.varType;
        const v = game.current.variations;
        fb.textContent = `✗ La forma correcta era “${type === "negative" ? v.negative : v.question}”`;
      } else {
        fb.textContent = state.mode === "speaking"
          ? `✗ Faltó decir “${answer}” — escucha y repite`
          : `✗ La respuesta era “${answer}”`;
      }
      fb.className = "feedback bad";
      animate($("sentence-card"), "shake");
      navigator.vibrate?.(70);
    }

    // Meta diaria en oraciones practicadas
    if (beforePlayed < state.settings.dailyGoal && h.played >= state.settings.dailyGoal) {
      addGems(2);
      $("feedback").textContent += " · 🎯 ¡Meta diaria conseguida! · 💎+2";
      game.goalHit = true;
      confetti();
      playFanfare();
    }

    state.history[t] = h;
    touchDailyStreak();
    save();

    $("game-points").textContent = `${game.points} pts`;
    $("game-streak").textContent = `🔥 ${game.streak}`;
    renderStreakFx();

    // En Vocabulario no hay botones de audio ANTES de responder (a propósito, para no
    // resolver por oído), así que DESPUÉS de responder siempre se escucha la oración
    // correcta — acierte o falle — sin depender del ajuste "Leer la frase al responder".
    if (state.mode === "variations") {
      const type = game.current.varType;
      const v = game.current.variations;
      speak(type === "negative" ? v.negative : v.question);
    } else if (state.settings.autoplay || state.mode === "vocab") {
      speak(full);
    }
    if (state.mode === "vocab") {
      // …y ahora que ya respondiste, los botones 🔊/🐢 vuelven para reescucharla
      $("btn-tts").classList.remove("hidden");
      $("btn-tts-slow").classList.remove("hidden");
    }

    if (!game.mustRetype) {
      $("btn-next").classList.remove("hidden");
      if (state.mode !== "speaking") $("btn-next").focus();
    }

    if (game.wasTimed) {
      // En contrarreloj no hay pausa: cada segundo cuenta
      game.advanceTimer = setTimeout(nextQuestion, isCorrect ? 600 : 1100);
    } else if (isCorrect && state.settings.autoAdvance) {
      // 10s de margen real para leer/escuchar/repasar antes de seguir. Sin contador
      // visible: "Siguiente →" ya está en pantalla para continuar antes si quieres.
      game.advanceTimer = setTimeout(nextQuestion, 10000);
    }
  }

  function floatPoints(text) {
    const el = document.createElement("div");
    el.className = "float-points";
    el.textContent = text;
    el.style.left = "50%";
    el.style.top = "38%";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  }

  function nextQuestion() {
    clearTimeout(game.advanceTimer);
    speechSynthesis.cancel?.();
    stopRecording();
    game.pos++;
    if (game.pos >= game.queue.length) endRound();
    else showQuestion();
  }

  // Mejor formato de grabación que soporte el navegador (iPhone usa mp4)
  function bestAudioMime() {
    if (!window.MediaRecorder) return "";
    for (const m of ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"]) {
      if (MediaRecorder.isTypeSupported?.(m)) return m;
    }
    return "";
  }

  // ---------- Speaking ----------
  let recognition = null;
  let mediaRecorder = null;
  let recChunks = [];
  let recUrl = null;
  let recAudio = null;

  function setupSpeaking() {
    $("btn-speak").classList.toggle("hidden", !SR);
    $("btn-speak").classList.remove("listening");
    $("btn-speak").textContent = "🎤 Hablar";
    $("btn-record").textContent = "⏺ Grabarme";
    $("btn-record").classList.remove("recording");
    $("btn-play-rec").disabled = true;
    $("btn-reveal").disabled = false;
    $("selfgrade").classList.toggle("hidden", !!SR);
    if (recUrl) { URL.revokeObjectURL(recUrl); recUrl = null; }
    if (!SR) {
      $("feedback").textContent =
        "Tu navegador no tiene reconocimiento de voz (usa Chrome). Grábate y autoevalúa.";
    }
  }

  function startRecognition() {
    if (!SR || game.answered) return;
    speechSynthesis.cancel?.(); // que el micrófono no escuche a la app hablando
    try {
      recognition = new SR();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 5;

      $("btn-speak").classList.add("listening");
      $("btn-speak").textContent = "🎙 Escuchando…";

      recognition.onresult = (e) => {
        const alternatives = [...e.results[0]].map((a) => a.transcript);
        evaluateSpeech(alternatives);
      };
      recognition.onerror = (e) => {
        $("btn-speak").classList.remove("listening");
        $("btn-speak").textContent = "🎤 Hablar";
        $("feedback").textContent =
          e.error === "not-allowed"
            ? "Sin permiso de micrófono. Actívalo o usa la autoevaluación."
            : `No se pudo escuchar (${e.error}). Intenta de nuevo o autoevalúa.`;
        $("feedback").className = "feedback";
        $("selfgrade").classList.remove("hidden");
      };
      recognition.onend = () => {
        $("btn-speak").classList.remove("listening");
        $("btn-speak").textContent = "🎤 Hablar";
      };
      recognition.start();
    } catch (err) {
      $("feedback").textContent = "Error al iniciar el micrófono. Usa la autoevaluación.";
      $("selfgrade").classList.remove("hidden");
    }
  }

  function evaluateSpeech(alternatives) {
    const d = state.difficulty;
    const answerWord = normalizeWords(game.current.parsed.answer).join(" ");

    if (d === "easy") {
      const saidAnswer = alternatives.some((alt) => normalizeWords(alt).includes(answerWord));
      const transcript = alternatives[0] || "";
      renderWordMatch([answerWord], saidAnswer ? new Set([0]) : new Set(),
        `Escuché: “${transcript}”`, saidAnswer ? 1 : 0, true);
      if (game.answered) return;
      resolveAnswer(saidAnswer, basePoints());
      return;
    }

    const target = normalizeWords(game.current.parsed.full);
    let best = { matched: new Set(), pct: 0, saidAnswer: false, transcript: alternatives[0] || "" };
    for (const alt of alternatives) {
      const said = normalizeWords(alt);
      const saidPool = [...said];
      const matched = new Set();
      target.forEach((w, i) => {
        const k = saidPool.indexOf(w);
        if (k !== -1) { matched.add(i); saidPool.splice(k, 1); }
      });
      const pct = matched.size / target.length;
      const saidAnswer = said.includes(answerWord);
      if (pct > best.pct || (saidAnswer && !best.saidAnswer)) {
        best = { matched, pct, saidAnswer, transcript: alt };
      }
    }

    renderWordMatch(target, best.matched, `Escuché: “${best.transcript}”`, best.pct, true);

    if (game.answered) return;

    const threshold = d === "hard" ? SENTENCE_THRESHOLD.speaking : SENTENCE_THRESHOLD.speakingMedium;
    const isCorrect = best.saidAnswer && best.pct >= threshold;
    resolveAnswer(isCorrect, basePoints());
  }

  async function toggleRecording() {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      stopRecording();
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recChunks = [];
      const mime = bestAudioMime();
      mediaRecorder = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      mediaRecorder.ondataavailable = (e) => recChunks.push(e.data);
      mediaRecorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        if (recUrl) URL.revokeObjectURL(recUrl);
        recUrl = URL.createObjectURL(new Blob(recChunks, { type: mediaRecorder.mimeType || "audio/webm" }));
        $("btn-play-rec").disabled = false;
      };
      mediaRecorder.start();
      $("btn-record").textContent = "⏹ Detener";
      $("btn-record").classList.add("recording");
    } catch (err) {
      $("feedback").textContent = "No se pudo acceder al micrófono para grabar.";
    }
  }

  function stopRecording() {
    if (mediaRecorder && mediaRecorder.state === "recording") mediaRecorder.stop();
    $("btn-record").textContent = "⏺ Grabarme";
    $("btn-record").classList.remove("recording");
  }

  // ---------- Resultados ----------
  function endRound() {
    clearTimeout(game.advanceTimer);
    clearInterval(game.timedInt);
    speechSynthesis.cancel?.();

    const total = game.wasTimed ? game.answers.length : game.queue.length;
    countUp($("res-points"), game.points);
    $("res-correct").textContent = `${game.correct}/${total}`;
    $("res-beststreak").textContent = `🔥 ${game.bestStreak}`;

    const ratio = total ? game.correct / total : 0;
    let msg;
    if (game.wasTimed) {
      $("results-title").textContent = "⚡ ¡Se acabó el tiempo!";
      const prevBest = state.records.bestTimed;
      if (game.correct > prevBest) {
        state.records.bestTimed = game.correct;
        save();
        showToast("🏅 ¡Nuevo récord de contrarreloj!");
        confetti();
        playFanfare();
      }
      msg = `Acertaste ${game.correct} en 60 segundos. Tu récord: ${state.records.bestTimed}.`;
    } else {
      $("results-title").textContent = "¡Ronda completada!";
      if (ratio === 1) msg = "🏆 ¡Perfecto! Dominas estas frases.";
      else if (ratio >= 0.8) msg = "💪 ¡Muy bien! Casi perfecto.";
      else if (ratio >= 0.5) msg = "📚 Buen trabajo. Las falladas volverán a aparecer para repasar.";
      else msg = "🌱 Sigue practicando: la repetición es la clave.";
    }

    const daily = todayHistory();
    if (daily.played >= state.settings.dailyGoal) {
      msg += ` 🎯 Meta diaria cumplida (${daily.played} oraciones).`;
    } else {
      msg += ` Te faltan ${state.settings.dailyGoal - daily.played} oraciones para tu meta de hoy.`;
    }
    $("res-message").textContent = msg;

    const recap = $("res-recap");
    recap.innerHTML = "";
    game.answers.forEach((a) => {
      const row = document.createElement("div");
      row.className = `recap-row ${a.correct ? "ok" : "bad"}`;
      row.innerHTML = `
        <span class="recap-mark">${a.correct ? "✓" : "✗"}</span>
        <div>${escapeHtml(a.full)}<span class="es">${escapeHtml(a.es)}</span></div>`;
      recap.appendChild(row);
    });

    if (!game.wasTimed && ratio === 1 && game.queue.length >= 3) confetti();

    showScreen("results");
  }

  // ---------- Estadísticas ----------
  function renderStats() {
    renderChart($("stats-chart"));

    // Esta semana contra la anterior
    let week = 0, prevWeek = 0;
    for (let i = 0; i < 14; i++) {
      const n = state.history[dateKey(new Date(Date.now() - i * DAY))]?.played || 0;
      if (i < 7) week += n; else prevWeek += n;
    }
    const diff = week - prevWeek;
    $("stats-week").textContent =
      `Esta semana: ${week} oraciones · anterior: ${prevWeek}` +
      (diff !== 0 ? ` (${diff > 0 ? "+" : ""}${diff} ${diff > 0 ? "📈" : "📉"})` : "");

    let played = 0, correct = 0, bestDay = 0;
    Object.values(state.history).forEach((h) => {
      played += h.played;
      correct += h.correct;
      bestDay = Math.max(bestDay, h.played);
    });
    $("t-points").textContent = state.points.toLocaleString("es");
    $("t-played").textContent = played.toLocaleString("es");
    $("t-accuracy").textContent = played ? `${Math.round((correct / played) * 100)}%` : "—";
    $("t-bestday").textContent = bestDay.toLocaleString("es");

    // Frases aprendidas: un conteo simple, sin implicar que eso "es" fluidez.
    // El camino real hacia la fluidez lo marcan los rangos (🏅 más abajo).
    let totalMastered = 0;
    allCollections().forEach((c) => { totalMastered += collectionStats(c).mastered; });
    $("t-mastered").textContent = totalMastered.toLocaleString("es");
    $("t-time").textContent = fmtPractice(totalPracticeSeconds());

    // 🏅 Escalera de rangos completa
    const current = rankInfo(state.points).rank;
    const ladder = $("rank-ladder");
    ladder.innerHTML = "";
    RANKS.forEach((r) => {
      const reached = state.points >= r.min;
      const isCurrent = r.id === current.id;
      const row = document.createElement("div");
      row.className = `rank-rung ${reached ? "reached" : ""} ${isCurrent ? "current" : ""}`;
      row.innerHTML = `
        <span class="rank-badge">
          <span class="rank-badge-emoji">${r.icon}</span>
          <img class="rank-badge-img" alt="" src="icons/ranks/${r.id}.png" onerror="this.style.display='none'">
        </span>
        <div class="rank-rung-info">
          <div class="rank-rung-name">${r.name}${isCurrent ? " · tú estás aquí" : ""}</div>
          <div class="rank-rung-min">${r.min.toLocaleString("es")} XP</div>
        </div>
        ${reached ? '<span class="rank-rung-check">✓</span>' : ""}`;
      ladder.appendChild(row);
    });

    // 🏆 Récords
    $("r-days").textContent = state.records.bestDays;
    $("r-combo").textContent = state.records.bestCombo;
    $("r-talks").textContent = state.records.talks;

    const colWrap = $("collection-stats");
    colWrap.innerHTML = "";
    allCollections().forEach((col) => {
      const st = collectionStats(col);
      const div = document.createElement("div");
      div.className = "col-stat";
      div.innerHTML = `
        <div class="col-stat-top">
          <span>${escapeHtml(col.icon)} ${escapeHtml(col.name)}</span>
          <span>${st.mastered}/${col.sentences.length} aprendidas · ${st.pct}%</span>
        </div>
        <div class="progress-track"><div class="progress-fill" style="width:${st.pct}%"></div></div>`;
      colWrap.appendChild(div);
    });

    showScreen("stats");
  }

  // ---------- 🏪 Tienda ----------
  // 🎫 El pase de palabras nuevas queda deshabilitado (sigue visible en la tienda,
  // solo no se puede comprar) hasta que se rediseñe su alcance.
  const SHOP_ITEM_DISABLED = { skipcap: true };

  function canBuy(id) {
    if (SHOP_ITEM_DISABLED[id]) return false;
    if (id === "freeze") return state.streak.freezes < MAX_FREEZES;
    return true;
  }

  function buyItem(id) {
    const item = SHOP_ITEMS[id];
    if (state.gems < item.cost || !canBuy(id)) return;
    state.gems -= item.cost;
    if (id === "freeze") {
      state.streak.freezes = Math.min(MAX_FREEZES, state.streak.freezes + 1);
    } else if (id === "doublexp") {
      state.boosts.doubleXpAnswers += 10;
    } else if (id === "skipcap") {
      state.boosts.skipCapDate = today();
    }
    save();
    showToast(`${item.name} comprado ✅`);
    renderShop();
    renderHome();
  }

  function renderShop() {
    $("shop-gems").textContent =
      `💎 ${state.gems} gemas — ganas gemas al subir de nivel, de rango, ` +
      `al cumplir tu meta diaria y al vencer errores en el Baúl`;
    const wrap = $("shop-items");
    wrap.innerHTML = "";
    Object.entries(SHOP_ITEMS).forEach(([id, item]) => {
      const maxedFreeze = id === "freeze" && state.streak.freezes >= MAX_FREEZES;
      const disabled = SHOP_ITEM_DISABLED[id];
      const div = document.createElement("div");
      div.className = "shop-item" + (disabled ? " shop-item-disabled" : "");
      div.innerHTML = `
        <div class="shop-item-info">
          <div class="shop-item-name">${item.name}</div>
          <div class="shop-item-desc">${disabled ? "Deshabilitado por ahora" : item.desc}</div>
        </div>
        <button data-buy="${id}" ${disabled || state.gems < item.cost || maxedFreeze ? "disabled" : ""}>
          ${disabled ? "No disponible" : maxedFreeze ? "Al máximo" : `💎 ${item.cost}`}
        </button>`;
      wrap.appendChild(div);
    });
    wrap.querySelectorAll("[data-buy]").forEach((b) =>
      b.addEventListener("click", () => buyItem(b.dataset.buy)));
  }

  // ---------- Pestaña de mazos ----------
  function renderDecksScreen() {
    const wrap = $("decks-all-list");
    wrap.innerHTML = "";
    $("decks-all-empty").classList.add("hidden");
    allCollections().forEach((col) => {
      const isDeck = col.id.startsWith("deck-");
      const pinned = isPinnedCol(col);
      const extra =
        `<button class="deck-edit-link" data-pin="${col.id}">${pinned ? "📌 Fijado ✓" : "📌 Fijar"}</button>` +
        (isDeck ? `<button class="deck-edit-link" data-edit="${col.id}">✏️ Editar</button>` : "");
      const view = isDeck
        ? { ...col, desc: `${col.sentences.length} frases · mazo tuyo${pinned ? " · fijado" : ""}` }
        : col;
      wrap.appendChild(collectionCard(view, collectionStats(col), extra));
    });
    bindPlayButtons(wrap);
    showScreen("decks");
  }

  // ---------- Editor de mazos ----------
  const editor = { deckId: null, hiddenWordIndex: -1 };

  function currentDeck() {
    return state.customDecks.find((d) => d.id === editor.deckId) || null;
  }

  function createDeck() {
    const deck = {
      id: `deck-${Date.now()}`,
      name: "Mi mazo nuevo",
      icon: "📚",
      pinned: false,
      sentences: []
    };
    state.customDecks.push(deck);
    save();
    openDeckEditor(deck.id);
  }

  function renderPinButton() {
    const deck = currentDeck();
    if (!deck) return;
    $("btn-deck-pin").textContent = deck.pinned
      ? "📌 Fijado en el inicio ✓"
      : "📌 Fijar en el inicio";
  }

  function openDeckEditor(deckId) {
    editor.deckId = deckId;
    editor.hiddenWordIndex = -1;
    const deck = currentDeck();
    if (!deck) return;
    $("deck-title").textContent = `📚 ${deck.name}`;
    $("deck-name").value = deck.name;
    $("deck-icon").value = deck.icon;
    $("deck-sentence-en").value = "";
    $("deck-sentence-es").value = "";
    $("deck-bulk").value = "";
    $("word-chips-wrap").classList.add("hidden");
    renderPinButton();
    renderDeckSentences();
    showScreen("deck");
  }

  function renderDeckSentences() {
    const deck = currentDeck();
    if (!deck) return;
    $("deck-count").textContent = deck.sentences.length;
    $("btn-deck-play").disabled = deck.sentences.length === 0;
    const wrap = $("deck-sentences");
    wrap.innerHTML = "";
    deck.sentences.forEach((s, i) => {
      const row = document.createElement("div");
      row.className = "deck-sentence-row";
      const html = escapeHtml(s.t).replace(/\{\{(.+?)\}\}/, '<span class="hidden-word">$1</span>');
      row.innerHTML = `
        <div class="txt">${html}<span class="es">${escapeHtml(s.es)}</span></div>
        <button data-del="${i}" title="Eliminar frase">🗑</button>`;
      wrap.appendChild(row);
    });
    wrap.querySelectorAll("[data-del]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.dataset.del);
        deck.sentences.splice(idx, 1);
        delete state.progress[deck.id];
        state.favorites = state.favorites.filter((k) => !k.startsWith(`${deck.id}:`));
        save();
        renderDeckSentences();
      });
    });
  }

  function renderWordChips() {
    const text = $("deck-sentence-en").value.trim();
    const wrap = $("word-chips-wrap");
    const chips = $("word-chips");
    chips.innerHTML = "";
    const tokens = text.split(/\s+/).filter(Boolean);
    const wordTokens = tokens
      .map((tok, i) => ({ tok, i, core: (tok.match(/[A-Za-z0-9']+/) || [""])[0] }))
      .filter((x) => x.core);
    if (wordTokens.length < 2) {
      wrap.classList.add("hidden");
      editor.hiddenWordIndex = -1;
      return;
    }
    wrap.classList.remove("hidden");
    if (!wordTokens.some((x) => x.i === editor.hiddenWordIndex)) editor.hiddenWordIndex = -1;
    wordTokens.forEach(({ tok, i, core }) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "word-chip" + (editor.hiddenWordIndex === i ? " selected" : "");
      chip.textContent = core;
      chip.addEventListener("click", () => {
        editor.hiddenWordIndex = i;
        renderWordChips();
      });
      chips.appendChild(chip);
    });
  }

  function addSentenceToDeck() {
    const deck = currentDeck();
    if (!deck) return;
    const en = $("deck-sentence-en").value.trim();
    const es = $("deck-sentence-es").value.trim();
    if (!en || !es) { alert("Escribe la frase en inglés y su traducción."); return; }
    if (editor.hiddenWordIndex < 0) { alert("Toca la palabra que quieres ocultar."); return; }

    const tokens = en.split(/\s+/).filter(Boolean);
    const tok = tokens[editor.hiddenWordIndex];
    const m = tok.match(/^([^A-Za-z0-9']*)([A-Za-z0-9']+)(.*)$/);
    if (!m) { alert("Esa palabra no se puede ocultar."); return; }
    tokens[editor.hiddenWordIndex] = `${m[1]}{{${m[2]}}}${m[3]}`;

    deck.sentences.push({ t: tokens.join(" "), es, pos: "x" });
    save();
    $("deck-sentence-en").value = "";
    $("deck-sentence-es").value = "";
    editor.hiddenWordIndex = -1;
    $("word-chips-wrap").classList.add("hidden");
    renderDeckSentences();
    $("deck-sentence-en").focus();
  }

  function bulkImport() {
    const deck = currentDeck();
    if (!deck) return;
    const lines = $("deck-bulk").value.split("\n").map((l) => l.trim()).filter(Boolean);
    let added = 0;
    const errors = [];
    lines.forEach((line, n) => {
      const [en, es] = line.split("|").map((x) => (x || "").trim());
      if (en && es && /\{\{.+?\}\}/.test(en)) {
        deck.sentences.push({ t: en, es, pos: "x" });
        added++;
      } else {
        errors.push(n + 1);
      }
    });
    save();
    renderDeckSentences();
    $("deck-bulk").value = errors.length
      ? lines.filter((_, i) => errors.includes(i + 1)).join("\n")
      : "";
    alert(
      `${added} frases importadas.` +
      (errors.length
        ? `\n${errors.length} líneas no válidas se dejaron en el cuadro para corregir.\n` +
          "Formato: I {{love}} pizza. | Me encanta la pizza."
        : "")
    );
  }

  function deleteDeck() {
    const deck = currentDeck();
    if (!deck) return;
    if (!confirm(`¿Eliminar el mazo “${deck.name}” y su progreso?`)) return;
    state.customDecks = state.customDecks.filter((d) => d.id !== deck.id);
    delete state.progress[deck.id];
    state.favorites = state.favorites.filter((k) => !k.startsWith(`${deck.id}:`));
    state.recent = state.recent.filter((id) => id !== deck.id);
    save();
    renderDecksScreen();
  }

  // ---------- Ajustes ----------
  // ---------- 🚩 Reportar error en una frase ----------
  // No hay servidor: esto NO llega "en vivo" a Claude. Se guarda localmente y se
  // exporta como texto para pegarlo en el chat, o dejarlo en EnGlish DATA./Reportes/.
  let reportTarget = null; // { colId, idx, sentence, es }
  let reportReason = null;

  function openReportModal() {
    if (!game.current) return;
    reportTarget = {
      colId: game.current.colId,
      idx: game.current.idx,
      sentence: game.current.parsed.full,
      es: game.current.s.es
    };
    reportReason = null;
    $("report-sentence-preview").textContent = `“${reportTarget.sentence}” — ${reportTarget.es}`;
    $("report-note").value = "";
    $("btn-report-send").disabled = true;
    document.querySelectorAll("#report-reasons .diff-btn").forEach((b) => b.classList.remove("active"));
    $("report-modal").showModal();
  }

  document.querySelectorAll("#report-reasons .diff-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      reportReason = btn.dataset.reason;
      document.querySelectorAll("#report-reasons .diff-btn").forEach((b) =>
        b.classList.toggle("active", b === btn));
      $("btn-report-send").disabled = false;
    });
  });

  function sendReport() {
    if (!reportTarget || !reportReason) return;
    state.bugReports.push({
      id: `rep-${Date.now()}`,
      date: today(),
      colId: reportTarget.colId,
      idx: reportTarget.idx,
      sentence: reportTarget.sentence,
      es: reportTarget.es,
      reason: reportReason,
      note: $("report-note").value.trim()
    });
    save();
    showToast("🚩 Reporte guardado — expórtalo desde Ajustes cuando quieras");
    $("report-modal").close();
  }

  function reportsToMarkdown() {
    const lines = [
      "# 🚩 Reportes de errores — English Plus",
      "",
      `Exportado: ${today()} · ${state.bugReports.length} reporte(s)`,
      "",
      "Pégale este archivo a Claude en el chat para que revise y arregle cada uno.",
      ""
    ];
    state.bugReports.forEach((r, i) => {
      const col = findCollection(r.colId);
      lines.push(`## ${i + 1}. ${r.reason}`);
      lines.push(`- Mazo: ${col ? col.name : r.colId} (${r.colId}, índice ${r.idx})`);
      lines.push(`- Frase: "${r.sentence}" — ${r.es}`);
      if (r.note) lines.push(`- Detalle: ${r.note}`);
      lines.push(`- Fecha: ${r.date}`);
      lines.push("");
    });
    return lines.join("\n");
  }

  function exportReports() {
    if (!state.bugReports.length) { showToast("No tienes reportes guardados"); return; }
    const blob = new Blob([reportsToMarkdown()], { type: "text/markdown;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `joy-english-reportes-${today()}.md`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  // ---------- 💬 Sugerir un cambio de organización en un mazo ----------
  // Mismo espíritu que 🚩 Reportar: no hay servidor, se guarda local y se exporta
  // como texto para pegarlo en el chat con Claude (ej: "este mazo debería dividirse
  // en X y Y", "esta frase no encaja en este mazo").
  let suggestTarget = null; // { colId, name }

  function openDeckSuggestModal(colId) {
    const col = findCollection(colId);
    if (!col) return;
    suggestTarget = { colId, name: col.name };
    $("suggest-deck-name").textContent = `${col.icon} ${col.name}`;
    $("suggest-note").value = "";
    $("btn-suggest-send").disabled = true;
    $("suggest-modal").showModal();
  }

  function sendSuggestion() {
    if (!suggestTarget) return;
    const note = $("suggest-note").value.trim();
    if (!note) return;
    state.deckFeedback.push({
      id: `sug-${Date.now()}`,
      date: today(),
      colId: suggestTarget.colId,
      name: suggestTarget.name,
      note
    });
    save();
    showToast("💬 Sugerencia guardada — expórtala desde Ajustes cuando quieras");
    $("suggest-modal").close();
  }

  function suggestionsToMarkdown() {
    const lines = [
      "# 💬 Sugerencias de organización de mazos — English Plus",
      "",
      `Exportado: ${today()} · ${state.deckFeedback.length} sugerencia(s)`,
      "",
      "Pégale este archivo a Claude en el chat para que las revise y aplique.",
      ""
    ];
    state.deckFeedback.forEach((s, i) => {
      lines.push(`## ${i + 1}. ${s.name} (${s.colId})`);
      lines.push(s.note);
      lines.push(`- Fecha: ${s.date}`);
      lines.push("");
    });
    return lines.join("\n");
  }

  function exportSuggestions() {
    if (!state.deckFeedback.length) { showToast("No tienes sugerencias guardadas"); return; }
    const blob = new Blob([suggestionsToMarkdown()], { type: "text/markdown;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `joy-english-sugerencias-${today()}.md`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function openSettings() {
    const s = state.settings;
    const sesionSel = $("set-session");
    sesionSel.value = String(s.sessionLength);
    if (!sesionSel.value) {
      // Un valor guardado que ya no coincide con ninguna opción (restos de una
      // versión vieja) se va al valor por defecto, NUNCA a la opción más chica
      // disponible — aterrizar silenciosamente en "5" fue justo el bug reportado.
      s.sessionLength = 10;
      sesionSel.value = "10";
    }
    $("set-goal").value = s.dailyGoal;
    $("set-newwords").value = s.newWordsPerDay;
    $("report-count").textContent = state.bugReports.length;
    $("suggest-count").textContent = state.deckFeedback.length;
    $("set-rate").value = s.rate;

    refreshVoices();
    const sel = $("set-voice");
    sel.innerHTML = `<option value="">Automática (la mejor)</option>`;
    VOICES.forEach((v) => {
      const opt = document.createElement("option");
      opt.value = v.voiceURI;
      opt.textContent = `${v.name} (${v.lang})`;
      sel.appendChild(opt);
    });
    sel.value = s.voice && VOICES.some((v) => v.voiceURI === s.voice) ? s.voice : "";

    $("settings-modal").showModal();
  }

  function applySettings() {
    const s = state.settings;
    s.sessionLength = Number($("set-session").value) || 10;
    s.dailyGoal = Math.max(5, Number($("set-goal").value) || 20);
    s.newWordsPerDay = Math.max(5, Number($("set-newwords").value) || 20);
    s.rate = Number($("set-rate").value);
    s.voice = $("set-voice").value;
    save();
    renderHome();
  }

  // ---------- Eventos ----------
  $("btn-exit").addEventListener("click", () => {
    clearTimeout(game.advanceTimer);
    clearInterval(game.timedInt);
    game.timedEnd = null;
    game.wasTimed = false;
    speechSynthesis.cancel?.();
    stopRecording();
    recognition?.abort?.();
    renderHome();
    showScreen("home");
  });

  $("btn-tts").addEventListener("click", () => speak(game.current.parsed.full));
  $("btn-tts-slow").addEventListener("click", () => speak(game.current.parsed.full, 0.6));

  $("btn-fav").addEventListener("click", () => {
    const key = favKey();
    if (state.favorites.includes(key)) {
      state.favorites = state.favorites.filter((k) => k !== key);
    } else {
      state.favorites.push(key);
    }
    save();
    renderFavButton();
  });

  $("btn-report").addEventListener("click", openReportModal);
  $("btn-report-send").addEventListener("click", sendReport);
  $("btn-report-cancel").addEventListener("click", () => $("report-modal").close());
  $("btn-report-export").addEventListener("click", exportReports);
  $("suggest-note").addEventListener("input", () => {
    $("btn-suggest-send").disabled = !$("suggest-note").value.trim();
  });
  $("btn-suggest-send").addEventListener("click", sendSuggestion);
  $("btn-suggest-cancel").addEventListener("click", () => $("suggest-modal").close());
  $("btn-suggest-export").addEventListener("click", exportSuggestions);
  $("btn-suggest-clear").addEventListener("click", () => {
    if (!state.deckFeedback.length) return;
    if (!confirm(`¿Borrar las ${state.deckFeedback.length} sugerencias guardadas?`)) return;
    state.deckFeedback = [];
    save();
    $("suggest-count").textContent = "0";
    showToast("Sugerencias borradas");
  });
  $("btn-report-clear").addEventListener("click", () => {
    if (!state.bugReports.length) return;
    if (!confirm(`¿Borrar los ${state.bugReports.length} reportes guardados?`)) return;
    state.bugReports = [];
    save();
    $("report-count").textContent = "0";
    showToast("Reportes borrados");
  });

  $("btn-next").addEventListener("click", nextQuestion);
  $("btn-check").addEventListener("click", () => {
    if (game.mustRetype) checkRetype();
    else answerInput(false);
  });
  $("btn-giveup").addEventListener("click", () => answerInput(true));

  // 📖 Explicación: la gramática completa de la frase (campo s.gram). Disponible
  // antes o después de responder — pero ANTES de responder la palabra oculta se
  // tapa también DENTRO del texto (las explicaciones la nombran, ej: "'told' es
  // el pasado de to tell"); sin esto el botón regalaba la respuesta y los puntos.
  function showGrammarExplanation() {
    if (!game.current) return;
    const panel = $("help-panel");
    const { gram, es } = game.current.s;
    const { answer } = game.current.parsed;

    if (gram) {
      let text = gram, masked = false;
      if (!game.answered) {
        const re = new RegExp(answer.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
        masked = re.test(gram);
        text = gram.replace(re, "____");
      }
      panel.innerHTML = `📖 <b>Explicación</b><br>${escapeHtml(text)}` +
        (masked ? `<br><small>La palabra oculta aparece como ____ hasta que respondas.</small>` : "");
    } else {
      // Mazos propios sin explicación: no revelar la traducción en los modos donde
      // todavía está escondida (listening) — ahí sería una pista gratis.
      const translationShown = game.answered || $("translation").textContent.trim() !== "";
      panel.innerHTML = `📖 Esta frase todavía no tiene explicación de gramática guardada.` +
        (translationShown ? ` Significado: <i>${escapeHtml(es)}</i>` : "");
    }
    panel.classList.remove("hidden");
  }

  $("btn-explain").addEventListener("click", showGrammarExplanation);

  function updateLiveTyping() {
    if (!game.current) return;
    const live = $("typing-live");
    if (!state.settings.liveTyping) { live.classList.add("hidden"); return; }
    const typed = $("answer-input").value;

    if (game.mustRetype || isFullSentence()) {
      // En dictado solo se colorea lo escrito: no se revela el resto de la oración
      const target = game.mustRetype ? game.current.parsed.answer : game.current.parsed.full;
      live.classList.toggle("hidden", !typed);
      live.innerHTML = colorizeTyped(typed, target);
      return;
    }

    live.classList.add("hidden");
    const blank = $("blank");
    if (!blank || game.answered) return;
    const target = game.current.parsed.answer;
    const blankLen = Math.max(4, target.length);
    blank.innerHTML = typed
      ? colorizeTyped(typed, target) + "_".repeat(Math.max(0, blankLen - typed.length))
      : "_".repeat(blankLen);
  }

  $("answer-input").addEventListener("input", updateLiveTyping);

  $("answer-input").addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    if (game.mustRetype) checkRetype();
    else if (!game.answered) answerInput(false);
  });

  // Speaking
  $("btn-speak").addEventListener("click", startRecognition);
  $("btn-record").addEventListener("click", toggleRecording);
  $("btn-play-rec").addEventListener("click", () => {
    if (!recUrl) return;
    recAudio?.pause?.();
    recAudio = new Audio(recUrl);
    recAudio.play();
  });
  $("btn-reveal").addEventListener("click", () => {
    if (game.answered || game.hintUsed) return;
    game.hintUsed = true;
    const blank = $("blank");
    if (blank) blank.textContent = game.current.parsed.answer;
    $("feedback").textContent = "💡 Respuesta visible (puntos reducidos a la mitad). Ahora dila en voz alta.";
    $("feedback").className = "feedback";
    $("btn-reveal").disabled = true;
    $("selfgrade").classList.remove("hidden");
  });
  $("btn-speak-skip").addEventListener("click", () => {
    if (!game.answered) resolveAnswer(false, 0);
  });
  $("btn-self-ok").addEventListener("click", () => {
    if (!game.answered) resolveAnswer(true, basePoints());
  });
  $("btn-self-bad").addEventListener("click", () => {
    if (!game.answered) resolveAnswer(false, 0);
  });

  $("btn-again").addEventListener("click", () => {
    if (game.lastColId == null) { renderHome(); showScreen("home"); return; }
    openPlayModal(game.lastColId);
  });
  $("btn-home").addEventListener("click", () => {
    renderHome();
    showScreen("home");
  });

  // Estadísticas, mazos y ajustes
  $("btn-stats-back").addEventListener("click", () => {
    renderHome();
    showScreen("home");
  });
  $("btn-all-decks").addEventListener("click", renderDecksScreen);
  $("btn-decks-back").addEventListener("click", () => {
    renderHome();
    showScreen("home");
  });
  $("btn-shop").addEventListener("click", () => {
    renderShop();
    $("shop-modal").showModal();
  });
  $("btn-shop-close").addEventListener("click", () => $("shop-modal").close());

  $("btn-settings").addEventListener("click", openSettings);
  $("btn-settings-close").addEventListener("click", () => {
    applySettings();
    $("settings-modal").close();
  });
  ["set-session", "set-goal", "set-newwords", "set-voice", "set-rate"]
    .forEach((id) => $(id).addEventListener("change", applySettings));
  $("settings-modal").addEventListener("close", applySettings);

  // Editor de mazos
  $("btn-new-deck").addEventListener("click", createDeck);
  $("btn-deck-back").addEventListener("click", renderDecksScreen);
  $("btn-deck-pin").addEventListener("click", () => {
    const deck = currentDeck();
    if (!deck) return;
    deck.pinned = !deck.pinned;
    save();
    renderPinButton();
  });
  $("deck-name").addEventListener("input", () => {
    const deck = currentDeck();
    if (!deck) return;
    deck.name = $("deck-name").value.trim() || "Mi mazo";
    $("deck-title").textContent = `📚 ${deck.name}`;
    save();
  });
  $("deck-icon").addEventListener("input", () => {
    const deck = currentDeck();
    if (!deck) return;
    deck.icon = $("deck-icon").value.trim() || "📚";
    save();
  });
  $("deck-sentence-en").addEventListener("input", renderWordChips);
  $("btn-add-sentence").addEventListener("click", addSentenceToDeck);
  $("deck-sentence-es").addEventListener("keydown", (e) => {
    if (e.key === "Enter") addSentenceToDeck();
  });
  $("btn-bulk-import").addEventListener("click", bulkImport);
  $("btn-deck-play").addEventListener("click", () => {
    const deck = currentDeck();
    if (deck && deck.sentences.length) openPlayModal(deck.id);
  });
  $("btn-delete-deck").addEventListener("click", deleteDeck);

  $("btn-export").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `joy-english-progreso-${today()}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  });

  $("btn-import").addEventListener("click", () => $("import-file").click());
  $("import-file").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (data.version !== 2 && data.version !== 3) throw new Error("formato");
        state = normalizeState(data);
        save();
        $("settings-modal").close();
        renderHome();
      } catch {
        alert("El archivo no es un progreso válido de English Plus.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  });

  $("btn-reset").addEventListener("click", () => {
    if (confirm("¿Seguro? Se borrará todo tu progreso, puntos, mazos y estadísticas.")) {
      localStorage.removeItem(STORAGE_KEY);
      LEGACY_KEYS.forEach((k) => localStorage.removeItem(k));
      state = defaultState();
      save();
      $("settings-modal").close();
      renderHome();
    }
  });

  // Atajos de teclado
  document.addEventListener("keydown", (e) => {
    if ($("screen-game").classList.contains("hidden")) return;
    if (e.target === $("answer-input")) return;
    if (game.answered && !game.mustRetype && e.key === "Enter") {
      // Si "Siguiente" tiene el foco, su propio click nativo ya avanza: no duplicar
      if (document.activeElement === $("btn-next")) return;
      nextQuestion();
      return;
    }
    if (game.answered || !/^[1-4]$/.test(e.key)) return;
    if (isChoiceQuestion()) {
      const btn = document.querySelectorAll(".choice-btn")[Number(e.key) - 1];
      if (!btn) return;
      if (state.mode === "variations") answerVariationChoice(btn);
      else answerChoice(btn);
    }
  });

  // ==================================================================
  // 🎙️ BAÚL — Habla libre por temas (BETA)
  // Transcribe con SpeechRecognition, graba tu voz, y analiza localmente:
  // palabras aplicadas de tus mazos, muletillas y errores típicos.
  // ==================================================================

  const TOPICS = [
    "My day today", "My family", "My job or studies", "My favorite food",
    "A trip I took", "My plans for the future", "A movie or series I love",
    "Music I listen to", "My city", "A childhood memory",
    "Sports and health", "Something I learned this week"
  ];

  // Errores típicos de hispanohablantes (alta confianza).
  // `why` = por qué está mal, en español — se guarda junto al error en el Baúl
  // para que el Drill siempre pueda explicarte el porqué (pedido del usuario).
  const ERROR_PATTERNS = [
    { re: /\bpeople is\b/i, bad: "people is", fix: "people are",
      why: "'People' ya es plural en inglés (= personas), así que va con 'are'. El error viene de pensar en 'la gente ES', que en español es singular." },
    { re: /\bi have (\d+|twenty|thirty|forty) years?\b/i, bad: "I have … years", fix: "I am … years old",
      why: "En inglés la edad no se TIENE, se ES: 'I am 25'. 'I have 25 years' es traducción literal de 'tengo 25 años' — un nativo entendería que posees 25 años de algo." },
    { re: /\bdepend of\b/i, bad: "depend of", fix: "depend on",
      why: "El verbo va con 'ON': 'it depends on you'. Las preposiciones casi nunca se traducen literalmente — 'depender DE' te empuja al 'of', pero en inglés siempre es 'depend on'." },
    { re: /\bi am agree\b/i, bad: "I am agree", fix: "I agree",
      why: "'Agree' ya es el verbo completo ('estar de acuerdo'), no un adjetivo: 'I agree'. El 'am' sobra — viene de traducir 'ESTOY de acuerdo'." },
    { re: /\bmarried with\b/i, bad: "married with", fix: "married to",
      why: "En inglés te casas 'TO' alguien: 'married to her'. 'Married with' es calco de 'casado CON' — de hecho 'married with children' significa casado y con hijos." },
    { re: /\bexplain me\b/i, bad: "explain me", fix: "explain to me",
      why: "'Explain' necesita 'to' antes de la persona: 'explain it TO me'. No funciona como 'tell me' — decir 'explain me' suena a que te expliquen A TI como tema." },
    { re: /\bmore better\b/i, bad: "more better", fix: "better",
      why: "'Better' YA es el comparativo de 'good' — nunca lleva 'more'. Es el equivalente de decir 'más mejor' en español." },
    { re: /\bfor to \w+/i, bad: "for to + verbo", fix: "to + verbo (I came to learn)",
      why: "Para expresar propósito basta 'to + verbo': 'I came TO learn'. 'For to' es calco de 'PARA + verbo' — el 'for' sobra siempre." },
    { re: /\bthe most \w+ of all the\b/i, bad: "the most … of all the", fix: "the most … of all",
      why: "El superlativo cierra con 'of all', sin repetir 'the': 'the best of all'. Repetirlo es arrastrar el 'de todos LOS…' del español." },
    { re: /\bmake a question\b/i, bad: "make a question", fix: "ask a question",
      why: "Las preguntas se preguntan, no se hacen: 'ASK a question'. 'Make a question' es calco de 'HACER una pregunta' — 'make' es fabricar algo." },
    { re: /\bwin money\b/i, bad: "win money", fix: "earn money",
      why: "El dinero trabajado se 'EARN' ('earn money'); 'win' es solo para premios, loterías y apuestas. En español 'ganar' cubre los dos, en inglés no." },
    { re: /\bassist to\b/i, bad: "assist to", fix: "attend",
      why: "'Assist' es un falso amigo: significa AYUDAR, no asistir. Para ir a una clase o evento se usa 'attend' (sin 'to'): 'I attend class'." }
  ];

  const FILLERS = ["um", "uh", "eh", "mmm", "hmm"];

  // Palabras que ya estás aprendiendo en los mazos (dominio ≥ 25 %)
  function learnedWords() {
    const set = new Set();
    for (const [colId, entries] of Object.entries(state.progress)) {
      const col = findCollection(colId);
      if (!col) continue;
      for (const [idx, p] of Object.entries(entries)) {
        if (p.m >= 1 && col.sentences[idx]) {
          set.add(parseSentence(col.sentences[idx]).answer.toLowerCase());
        }
      }
    }
    return set;
  }

  const talk = {
    active: false, topic: null, startTs: 0, timerInt: null,
    finals: [], interim: "", rec: null, mediaRec: null, chunks: [], url: null,
    pendingSessionId: null
  };

  // ---------- 🎧 Guardado de audios del Baúl (IndexedDB, sin backend) ----------
  // localStorage no alcanza para audio; IndexedDB guarda los Blob grabados
  // localmente en este navegador, indexados por el id de cada charla.
  const AUDIO_DB = "joy-english-audio";
  const AUDIO_STORE = "clips";

  function openAudioDB() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(AUDIO_DB, 1);
      req.onupgradeneeded = () => req.result.createObjectStore(AUDIO_STORE);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async function saveTalkAudio(id, blob) {
    try {
      const db = await openAudioDB();
      await new Promise((resolve, reject) => {
        const tx = db.transaction(AUDIO_STORE, "readwrite");
        tx.objectStore(AUDIO_STORE).put(blob, id);
        tx.oncomplete = resolve;
        tx.onerror = () => reject(tx.error);
      });
    } catch (e) { /* IndexedDB no disponible: la charla se guarda igual, solo sin audio */ }
  }

  async function loadTalkAudio(id) {
    try {
      const db = await openAudioDB();
      return await new Promise((resolve, reject) => {
        const req = db.transaction(AUDIO_STORE, "readonly").objectStore(AUDIO_STORE).get(id);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => reject(req.error);
      });
    } catch (e) { return null; }
  }

  async function deleteTalkAudio(id) {
    try {
      const db = await openAudioDB();
      db.transaction(AUDIO_STORE, "readwrite").objectStore(AUDIO_STORE).delete(id);
    } catch (e) { /* nada que borrar */ }
  }

  function renderTopics() {
    const wrap = $("topic-chips");
    wrap.innerHTML = "";
    TOPICS.forEach((t) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "word-chip" + (talk.topic === t ? " selected" : "");
      chip.textContent = t;
      chip.addEventListener("click", () => setTopic(t));
      wrap.appendChild(chip);
    });
  }

  function setTopic(t) {
    talk.topic = t;
    $("talk-topic").textContent = `🗣 ${t}`;
    $("btn-talk").disabled = false;
    renderTopics();
  }

  function fmtTime(sec) {
    return `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, "0")}`;
  }

  async function startTalk() {
    speechSynthesis.cancel?.(); // que el micrófono no escuche a la app hablando
    talk.active = true;
    talk.finals = [];
    talk.interim = "";
    talk.startTs = Date.now();
    talk.chunks = [];
    talk.pendingSessionId = null;
    talk.learned = learnedWords(); // para el contador en vivo de palabras aplicadas
    if (talk.url) { URL.revokeObjectURL(talk.url); talk.url = null; }
    $("talk-audio").classList.add("hidden");
    $("talk-audio").removeAttribute("src");
    $("talk-applied-live").classList.remove("hidden");
    $("talk-applied-live").textContent = "✨ 0";

    $("btn-talk").textContent = "⏹ Terminar";
    $("btn-talk").classList.add("listening");
    $("talk-timer").classList.remove("hidden");
    $("talk-live").classList.remove("hidden");
    $("talk-live").innerHTML = "🎙 Te escucho… habla con calma.";
    $("talk-results").classList.add("hidden");

    talk.timerInt = setInterval(() => {
      $("talk-timer").textContent = `⏱ ${fmtTime((Date.now() - talk.startTs) / 1000)}`;
    }, 500);

    // Grabadora (para reescuchar tu voz)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mime = bestAudioMime();
      talk.mediaRec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      talk.mediaRec.ondataavailable = (e) => talk.chunks.push(e.data);
      talk.mediaRec.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        if (talk.chunks.length) {
          const blob = new Blob(talk.chunks, { type: talk.mediaRec.mimeType || "audio/webm" });
          talk.url = URL.createObjectURL(blob);
          // Reproductor completo: pausa, adelantar, volumen y silencio
          const player = $("talk-audio");
          player.src = talk.url;
          player.classList.remove("hidden");
          // El blob recién queda listo acá (async), después de que analyzeAndShow ya
          // creó la entrada en talkSessions — se guarda con el mismo id para poder
          // mostrarlo luego en "Charlas anteriores".
          if (talk.pendingSessionId) {
            saveTalkAudio(talk.pendingSessionId, blob).then(renderTalkHistory);
          }
        }
      };
      talk.mediaRec.start();
    } catch (e) { /* sin grabadora: seguimos solo con transcripción */ }

    // Transcripción continua
    if (SR) {
      const startRec = () => {
        talk.rec = new SR();
        talk.rec.lang = "en-US";
        talk.rec.continuous = true;
        talk.rec.interimResults = true;
        talk.rec.onresult = (e) => {
          talk.interim = "";
          for (let i = e.resultIndex; i < e.results.length; i++) {
            if (e.results[i].isFinal) talk.finals.push(e.results[i][0].transcript.trim());
            else talk.interim += e.results[i][0].transcript;
          }
          $("talk-live").innerHTML =
            escapeHtml(talk.finals.join(" ")) +
            (talk.interim ? ` <span class="interim">${escapeHtml(talk.interim)}…</span>` : "");
          // Contador en vivo de palabras de tus mazos que vas aplicando
          const spoken = normalizeWords(talk.finals.join(" ") + " " + talk.interim);
          const liveApplied = new Set(spoken.filter((w) => talk.learned.has(w)));
          $("talk-applied-live").textContent = `✨ ${liveApplied.size}`;
        };
        talk.rec.onend = () => { if (talk.active) { try { talk.rec.start(); } catch (e) {} } };
        talk.rec.onerror = (e) => {
          if (e.error === "not-allowed" || e.error === "service-not-allowed") {
            $("talk-live").innerHTML =
              "⚠️ Sin permiso de micrófono. Usa el <b>modo prueba</b> de abajo para analizar un texto escrito.";
            stopTalk(true);
          }
          // "no-speech", "aborted" o "network": onend reinicia solo, sin cortar tu charla
        };
        talk.rec.start();
      };
      try { startRec(); } catch (e) {}
    } else {
      $("talk-live").innerHTML =
        "⚠️ Este navegador no transcribe voz (usa Chrome). Puedes grabarte igual, o usar el modo prueba.";
    }
  }

  function stopTalk(silent = false) {
    if (!talk.active) return;
    talk.active = false;
    clearInterval(talk.timerInt);
    try { talk.rec?.stop(); } catch (e) {}
    try { if (talk.mediaRec?.state === "recording") talk.mediaRec.stop(); } catch (e) {}
    $("btn-talk").textContent = "🎤 Empezar a hablar";
    $("btn-talk").classList.remove("listening");
    $("talk-applied-live").classList.add("hidden");

    if (silent) return;
    const seconds = (Date.now() - talk.startTs) / 1000;
    // Incluye también lo que quedó "a medio transcribir" al pulsar Terminar
    const transcript = `${talk.finals.join(" ")} ${talk.interim}`.trim();
    if (!transcript) {
      $("talk-live").innerHTML = "No escuché nada 😅 — inténtalo de nuevo o usa el modo prueba.";
      return;
    }
    talk.pendingSessionId = `talk-${Date.now()}`;
    analyzeAndShow(transcript, seconds, false, talk.pendingSessionId);
  }

  function analyzeTalk(text, seconds) {
    const words = normalizeWords(text);
    const unique = new Set(words);
    const learned = learnedWords();
    const applied = [...unique].filter((w) => learned.has(w));
    const fillers = words.filter((w) => FILLERS.includes(w)).length;
    const issues = [];
    for (const p of ERROR_PATTERNS) {
      if (p.re.test(text)) issues.push({ bad: p.bad, fix: p.fix, why: p.why });
    }
    return {
      words: words.length,
      unique: unique.size,
      wpm: seconds ? Math.round((words.length / seconds) * 60) : null,
      applied, fillers, issues
    };
  }

  function analyzeAndShow(transcript, seconds, isDemo, sessionId) {
    const r = analyzeTalk(transcript, seconds);
    talk.lastTranscript = transcript;
    $("ai-results").classList.add("hidden");
    $("ai-error").classList.add("hidden");

    $("tm-seconds").textContent = seconds ? fmtTime(seconds) : "—";
    $("tm-words").textContent = r.words;
    $("tm-wpm").textContent = r.wpm ?? "—";
    $("tm-applied").textContent = r.applied.length;

    // Transcripción con las palabras aprendidas resaltadas
    const appliedSet = new Set(r.applied);
    $("talk-transcript").innerHTML = transcript
      .split(/(\s+)/)
      .map((tok) => {
        const core = (tok.toLowerCase().match(/[a-z0-9']+/) || [""])[0];
        return appliedSet.has(core)
          ? `<span class="aplicada">${escapeHtml(tok)}</span>`
          : escapeHtml(tok);
      })
      .join("");

    $("talk-applied").innerHTML = r.applied.length
      ? `✨ Aplicaste <b>${r.applied.length}</b> palabras de tus mazos: ` +
        r.applied.map((w) => `<span class="applied-chip">${escapeHtml(w)}</span>`).join(" ")
      : "Aún no usaste palabras de tus mazos — intenta meter algunas en tu próxima charla 💪";

    const issuesEl = $("talk-issues");
    issuesEl.innerHTML = "";
    if (r.fillers > 2) {
      const d = document.createElement("div");
      d.className = "issue-row";
      d.innerHTML = `🗯 Usaste <b>${r.fillers}</b> muletillas (um, eh…). Intenta pausar en silencio.`;
      issuesEl.appendChild(d);
    }
    r.issues.forEach((iss) => {
      const d = document.createElement("div");
      d.className = "issue-row";
      d.innerHTML = `⚠️ Dijiste <b>“${escapeHtml(iss.bad)}”</b> → mejor: <span class="fix">“${escapeHtml(iss.fix)}”</span> · guardado en tu baúl`;
      issuesEl.appendChild(d);
      addVaultError(iss.bad, iss.fix, true, iss.why || "");
    });
    if (!r.issues.length && r.fillers <= 2) {
      const d = document.createElement("div");
      d.className = "issue-row";
      d.style.borderColor = "rgba(74, 222, 128, .4)";
      d.style.background = "rgba(74, 222, 128, .08)";
      d.innerHTML = "✅ No detecté errores típicos. ¡Sigue así!";
      issuesEl.appendChild(d);
    }

    $("talk-results").classList.remove("hidden");
    $("talk-results").scrollIntoView({ behavior: "smooth", block: "start" });

    state.talkSessions.unshift({
      id: sessionId || null,
      date: today(), topic: talk.topic || "(texto de prueba)",
      transcript, seconds: Math.round(seconds || 0),
      wpm: r.wpm, words: r.words, applied: r.applied, demo: isDemo
    });
    // Al recortar a las últimas 15, borra también el audio guardado de las que quedan afuera
    state.talkSessions.slice(15).forEach((old) => { if (old.id) deleteTalkAudio(old.id); });
    state.talkSessions = state.talkSessions.slice(0, 15);
    if (!isDemo) {
      state.records.talks++;
      touchDailyStreak(); // hablar libre también mantiene tu racha de días
    }
    save();
    renderTalkHistory();
    renderVaultErrors();
    analizarConIA(); // se dispara solo, sin esperar el botón; si el server de IA está apagado, muestra el error ahí mismo y el botón queda para reintentar
  }

  // ---------- 🤖 Análisis profundo con IA (opcional, servidor local) ----------
  const AI_SERVER = "http://localhost:4546";

  // ---------- 🔄 Variaciones (BETA): negativo/pregunta por REGLAS, sin IA ----------
  // A propósito NO usa el servidor de IA: transforma con gramática pura en JS, al
  // instante y sin depender de nada externo. Alcance honesto: solo frases con
  // "to be" (is/am/are/was/were, incluidas sus contracciones it's/that's/he's...)
  // o un verbo modal (can/could/will/would/shall/should/may/might/must), que son
  // los únicos casos donde invertir sujeto-verbo es 100% mecánico y confiable sin
  // arriesgar un error gramatical. Frases con verbos léxicos (do-support: love,
  // work, go...) o con "have/has/had" (ambiguo entre auxiliar y verbo principal)
  // se EXCLUYEN de este modo — no vale la pena arriesgar enseñar mal.
  const VAR_BE_WORDS = ["am", "is", "are", "was", "were"];
  const VAR_MODAL_WORDS = ["can", "could", "will", "would", "shall", "should", "may", "might", "must"];
  const VAR_BE_SWAP = { is: "are", are: "is", am: "are", was: "were", were: "was" };
  const VAR_CONTRACTIONS = {
    "i'm": ["I", "am"], "you're": ["you", "are"], "we're": ["we", "are"], "they're": ["they", "are"],
    "it's": ["it", "is"], "that's": ["that", "is"], "he's": ["he", "is"], "she's": ["she", "is"],
    "there's": ["there", "is"], "what's": ["what", "is"], "who's": ["who", "is"],
    "i'll": ["I", "will"], "you'll": ["you", "will"], "he'll": ["he", "will"], "she'll": ["she", "will"],
    "we'll": ["we", "will"], "they'll": ["they", "will"], "it'll": ["it", "will"], "that'll": ["that", "will"]
  };
  // Palabras que, al pasar de primera posición (mayúscula por ser inicio de
  // oración) a segunda posición en la pregunta, deben ir en minúscula — salvo
  // nombres propios, que no están en esta lista y por eso quedan como estaban.
  const VAR_LOWERABLE_STARTS = [
    "he", "she", "it", "we", "they", "you", "this", "that", "these", "those", "there",
    "the", "a", "an", "my", "your", "his", "her", "our", "their", "its"
  ];
  // Verbos de "pensar/decir" que casi siempre anuncian una cláusula incrustada
  // ("I THINK you are right" — el to-be real pertenece a esa cláusula, no a la
  // oración principal). Si aparecen antes del to-be/modal encontrado, la frase
  // se descarta: invertir ahí produciría una pregunta rota ("Are I think you...?").
  const VAR_CLAUSE_VERBS = [
    "think", "thinks", "know", "knows", "believe", "believes", "feel", "feels",
    "hope", "hopes", "guess", "guesses", "suppose", "supposes", "say", "says", "said",
    "tell", "tells", "told", "hear", "hears", "heard", "see", "sees", "saw",
    "want", "wants", "wanted", "need", "needs", "needed", "like", "likes", "liked",
    "love", "loves", "loved", "hate", "hates", "hated", "wish", "wishes", "wished"
  ];

  function tokenizeForVariation(text) {
    const raw = text.replace(/[.!?]+\s*$/, "").split(/\s+/);
    const tokens = [];
    raw.forEach((tok) => {
      const clean = tok.replace(/[,;:]$/, "");
      const expanded = VAR_CONTRACTIONS[clean.toLowerCase()];
      if (expanded) {
        // Preserva la mayúscula original ("It's" al inicio de oración → "It" no
        // "it"), aunque el diccionario de contracciones esté en minúsculas.
        const first = /^[A-Z]/.test(clean) ? varCapitalize(expanded[0]) : expanded[0];
        tokens.push(first, ...expanded.slice(1));
      } else tokens.push(clean);
    });
    return tokens;
  }

  function varCapitalize(w) {
    return w.charAt(0).toUpperCase() + w.slice(1);
  }

  // Intenta transformar UNA oración afirmativa a negativo/pregunta con reglas
  // fijas. Devuelve null si no encuentra un "to be"/modal confiable — esa frase
  // simplemente no entra en la ronda de Variaciones.
  function tryLocalVariation(fullSentence) {
    const lower = fullSentence.toLowerCase();
    if (/\?\s*$/.test(fullSentence)) return null;               // ya es pregunta
    if (/\bnot\b|n't|\bnever\b/.test(lower)) return null;        // ya es negativa
    if (/\b(have|has|had)\b/.test(lower)) return null;           // ambiguo: ¿auxiliar o verbo principal?
    if (/'d\b/.test(lower)) return null;                         // 'd ambiguo: ¿had o would?

    const tokens = tokenizeForVariation(fullSentence);
    if (tokens.length < 2) return null;

    let idx = -1, isModal = false;
    for (let i = 1; i < tokens.length; i++) {
      const lw = tokens[i].toLowerCase();
      if (VAR_BE_WORDS.includes(lw)) { idx = i; break; }
      if (VAR_MODAL_WORDS.includes(lw)) { idx = i; isModal = true; break; }
    }
    if (idx === -1) return null; // ni to-be ni modal: no arriesgamos con verbos léxicos

    const verb = tokens[idx];
    const verbLower = verb.toLowerCase();
    const subjectTokens = tokens.slice(0, idx);
    const restTokens = tokens.slice(idx + 1);
    const restStr = restTokens.join(" ");

    // "I THINK you are right" — el to-be encontrado pertenece a una cláusula
    // incrustada, no a la oración principal; invertir ahí da una pregunta rota
    // ("Are I think you right?"). Si aparece un verbo de pensar/decir ANTES del
    // to-be/modal, mejor no arriesgar.
    if (subjectTokens.slice(1).some((w) => VAR_CLAUSE_VERBS.includes(w.toLowerCase()))) return null;
    const subjectAffirm = subjectTokens.join(" ");

    // Sujeto al pasar a 2ª posición en la pregunta: mismo texto, salvo que sea
    // una de las palabras "minusculeables" (pronombre/artículo) — los nombres
    // propios (no están en la lista) quedan con su mayúscula intacta.
    const subjectForQ = subjectTokens.slice();
    const firstLower = subjectForQ[0].toLowerCase();
    if (firstLower === "i") subjectForQ[0] = "I";
    else if (VAR_LOWERABLE_STARTS.includes(firstLower)) subjectForQ[0] = firstLower;
    const subjectQ = subjectForQ.join(" ");

    const negWord = verbLower === "can" ? "cannot" : `${verbLower} not`;
    const negative = `${subjectAffirm} ${negWord}${restStr ? " " + restStr : ""}.`;
    const question = `${varCapitalize(verbLower)} ${subjectQ}${restStr ? " " + restStr : ""}?`;

    const affirmClean = fullSentence.replace(/[.!?]+\s*$/, "");
    const negCalque = verbLower === "can"
      ? negative.replace("cannot", "can no")
      : negative.replace(/\bnot\b/, "no");
    const quDecoy2 = (!isModal && VAR_BE_SWAP[verbLower])
      ? `${varCapitalize(VAR_BE_SWAP[verbLower])} ${subjectQ}${restStr ? " " + restStr : ""}?`
      : `Do ${subjectQ} ${verbLower}${restStr ? " " + restStr : ""}?`;

    return {
      negative, negative_es: null,
      question, question_es: null,
      // Distractores deterministas (errores típicos), sin IA:
      // 1) olvidar la negación por completo · 2) calco "no" del español
      negative_distractors: [`${affirmClean}.`, negCalque],
      // 1) agregar "?" sin invertir · 2) concordancia/auxiliar equivocado
      question_distractors: [`${affirmClean}?`, quDecoy2]
    };
  }

  // Arma la ronda con las frases del mazo que SÍ se pueden transformar con
  // reglas; las demás quedan afuera (no es un fallo, es el alcance del modo).
  function startVariationsRound(colId) {
    const queue = buildRound(colId);
    if (queue.length === 0) {
      const col = colId === "__fav__" ? null : findCollection(colId);
      const hasSentences = colId === "__fav__" ? favoriteItems().length > 0 : !!col?.sentences.length;
      showToast(hasSentences
        ? "🎉 Ya completaste tus palabras nuevas de hoy — vuelve mañana o repasa otro mazo"
        : "Ese mazo no tiene frases 😅");
      return;
    }
    if (game.lastRoundOmittedFresh > 0) {
      showToast(
        `🎫 Cupo diario: quedan ${game.lastRoundOmittedFresh} frases nuevas de este mazo para ` +
        `otro día. Súbelo en ⚙️ Ajustes o compra un pase en 🏪 Tienda para verlas hoy.`,
        true
      );
    }
    const prepared = [];
    queue.forEach((item) => {
      const v = tryLocalVariation(parseSentence(item.s).full);
      if (v) prepared.push({ ...item, variations: v });
    });
    if (!prepared.length) {
      showToast(
        "🔄 Este mazo todavía no tiene frases con \"to be\" o verbos modales " +
        "(can/will/should…) para Variaciones — prueba con otro mazo.",
        true
      );
      return;
    }
    beginRound(prepared, colId);
  }

  async function analizarConIA() {
    const btn = $("btn-ai-analyze");
    btn.disabled = true;
    btn.textContent = "🤖 Analizando…";
    $("ai-error").classList.add("hidden");
    $("ai-results").classList.add("hidden");
    try {
      const res = await fetch(`${AI_SERVER}/api/analyze-talk`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transcript: talk.lastTranscript,
          topic: talk.topic || "",
          learnedWords: [...learnedWords()],
          knownErrors: state.errorVault.map((e) => ({ id: e.id, bad: e.bad, fix: e.fix }))
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error analizando el texto.");
      renderAIResults(data.resultado);
    } catch (e) {
      $("ai-error").textContent =
        `⚠️ ${e.message === "Failed to fetch"
          ? "No pude conectar con el servidor de IA. ¿Está encendido? (npm start en joy-english/)"
          : e.message}`;
      $("ai-error").classList.remove("hidden");
    } finally {
      btn.disabled = false;
      btn.textContent = "🤖 Análisis profundo con IA";
    }
  }

  function renderAIResults(r) {
    $("ai-fluidez").textContent = `${r.fluidez}/10`;
    $("ai-comentario").textContent = r.comentario;
    $("ai-mejorada").textContent = r.version_mejorada;

    const wrap = $("ai-nuevos");
    wrap.innerHTML = "";
    (r.errores_nuevos || []).forEach((err) => {
      const d = document.createElement("div");
      d.className = "issue-row";
      d.innerHTML = `⚠️ Dijiste <b>“${escapeHtml(err.dijo)}”</b> → mejor: <span class="fix">“${escapeHtml(err.mejor)}”</span>` +
        `<br><small style="color:var(--text-dim)">${escapeHtml(err.explicacion)}</small> · guardado en tu baúl`;
      wrap.appendChild(d);
      addVaultError(err.dijo, err.mejor, true, err.explicacion);
    });
    const repetidos = (r.errores_repetidos || [])
      .map((id) => state.errorVault.find((x) => x.id === id)?.bad)
      .filter(Boolean);
    if (repetidos.length) {
      const d = document.createElement("div");
      d.className = "issue-row";
      d.innerHTML = `🔁 Volviste a repetir: ${repetidos.map((b) => `<b>“${escapeHtml(b)}”</b>`).join(", ")}`;
      wrap.appendChild(d);
    }

    $("ai-results").classList.remove("hidden");
    renderVaultErrors();
  }

  // ---------- Baúl de errores ----------
  function addVaultError(bad, fix, auto = false, explicacion = "") {
    const exists = state.errorVault.some(
      (e) => e.bad.toLowerCase() === bad.toLowerCase());
    if (exists) return;
    state.errorVault.unshift({
      id: `err-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      bad, fix, date: today(), auto, fixed: false, explicacion
    });
    save();
  }

  function renderVaultErrors() {
    const list = $("vault-list");
    list.innerHTML = "";
    $("vault-count").textContent = state.errorVault.length;
    state.errorVault.forEach((e) => {
      const row = document.createElement("div");
      row.className = "vault-row" + (e.fixed ? " fixed" : "");
      row.innerHTML = `
        <div class="txt"><span class="bad-part">“${escapeHtml(e.bad)}”</span> →
          <span class="fix-part">“${escapeHtml(e.fix)}”</span>
          <small style="color:var(--text-dim)"> · ${e.date}${e.auto ? " · detectado" : ""}</small>
          ${e.explicacion ? `<br><small style="color:var(--text-dim)">${escapeHtml(e.explicacion)}</small>` : ""}</div>
        <button data-say="${e.id}" title="Escuchar la forma correcta">🔊</button>
        <button data-fix="${e.id}" title="${e.fixed ? "Marcar pendiente" : "¡Vencido!"}">${e.fixed ? "↩" : "✓"}</button>
        <button data-delerr="${e.id}" title="Eliminar">🗑</button>`;
      list.appendChild(row);
    });
    list.querySelectorAll("[data-say]").forEach((b) => b.addEventListener("click", () => {
      const e = state.errorVault.find((x) => x.id === b.dataset.say);
      if (e) speak(e.fix);
    }));
    list.querySelectorAll("[data-fix]").forEach((b) => b.addEventListener("click", () => {
      const e = state.errorVault.find((x) => x.id === b.dataset.fix);
      if (e) {
        e.fixed = !e.fixed;
        if (e.fixed) { showToast("🏆 ¡Error vencido!"); playCorrectSound(5); confetti(); }
        save();
        renderVaultErrors();
      }
    }));
    list.querySelectorAll("[data-delerr]").forEach((b) => b.addEventListener("click", () => {
      state.errorVault = state.errorVault.filter((x) => x.id !== b.dataset.delerr);
      save();
      renderVaultErrors();
    }));

    // Repaso previo: errores pendientes arriba del todo
    const pending = state.errorVault.filter((e) => !e.fixed).slice(0, 5);
    $("vault-review").classList.toggle("hidden", pending.length === 0);
    const rl = $("vault-review-list");
    rl.innerHTML = "";
    pending.forEach((e) => {
      const row = document.createElement("div");
      row.className = "vault-row";
      row.innerHTML = `<div class="txt">Di <span class="fix-part">“${escapeHtml(e.fix)}”</span>, no <span class="bad-part">“${escapeHtml(e.bad)}”</span>` +
        (e.explicacion ? `<br><small style="color:var(--text-dim)">${escapeHtml(e.explicacion)}</small>` : "") +
        `</div>`;
      rl.appendChild(row);
    });
  }

  // Object URLs de los audios de "Charlas anteriores" — se revocan en cada
  // render para no acumular memoria (renderTalkHistory se llama seguido).
  let talkHistoryUrls = [];

  function renderTalkHistory() {
    const wrap = $("talk-history");
    talkHistoryUrls.forEach((u) => URL.revokeObjectURL(u));
    talkHistoryUrls = [];
    wrap.innerHTML = "";
    if (state.talkSessions.length === 0) {
      wrap.innerHTML = `<div class="talk-history-row">Aquí quedarán tus charlas: tema, duración y palabras aplicadas.</div>`;
      return;
    }
    state.talkSessions.forEach((s) => {
      const row = document.createElement("div");
      row.className = "talk-history-row";
      row.innerHTML = `<div><b>${escapeHtml(s.topic)}</b> · ${s.date} · ${s.words} palabras` +
        (s.wpm ? ` · ${s.wpm} ppm` : "") +
        ` · ✨ ${s.applied.length} aplicadas${s.demo ? " · ⌨️ texto" : ""}</div>` +
        (s.id ? `<audio class="talk-history-audio" controls preload="none" data-audio="${s.id}"></audio>` : "");
      wrap.appendChild(row);
    });
    // Los audios se cargan aparte (async) desde IndexedDB; si una charla no tiene
    // clip guardado (modo prueba, o el navegador no dejó grabar), se quita el player.
    wrap.querySelectorAll("[data-audio]").forEach(async (audioEl) => {
      const blob = await loadTalkAudio(audioEl.dataset.audio);
      if (blob) {
        const url = URL.createObjectURL(blob);
        talkHistoryUrls.push(url);
        audioEl.src = url;
      } else {
        audioEl.remove();
      }
    });
  }

  // 🏋️ Entrenamiento de errores: escribes la forma correcta; 3 aciertos = vencido
  const drill = { items: [], pos: 0, awaitingNext: false };

  function startDrill() {
    const pending = state.errorVault.filter((e) => !e.fixed);
    if (!pending.length) { showToast("🏆 No tienes errores pendientes"); return; }
    drill.items = shuffle(pending);
    drill.pos = 0;
    $("drill-panel").classList.remove("hidden");
    showDrillItem();
  }

  function stopDrill() {
    $("drill-panel").classList.add("hidden");
  }

  function showDrillItem() {
    drill.awaitingNext = false;
    const e = drill.items[drill.pos];
    $("drill-progress").textContent =
      `Error ${drill.pos + 1} de ${drill.items.length} · aciertos: ${e.drillWins || 0}/3 para vencerlo`;
    $("drill-bad").textContent = `❌ “${e.bad}”`;
    renderDrillWhy(e);
    const input = $("drill-input");
    input.value = "";
    input.className = "";
    input.disabled = false;
    input.focus();
    $("drill-feedback").textContent = "";
    $("drill-feedback").className = "feedback";
    $("drill-live").classList.add("hidden");
    $("drill-live").innerHTML = "";
    $("btn-drill-check").textContent = "Comprobar";
  }

  // 💡 El porqué del error, SIEMPRE visible al practicarlo (pedido del usuario:
  // "que me explique por qué está mal, para no volver a repetir"). Los errores de
  // patrones locales y los de la IA ya traen explicación; a los que no tienen
  // (p. ej. agregados a mano), se la pide a Gemini UNA vez y queda guardada.
  function renderDrillWhy(e) {
    const box = $("drill-why");
    if (e.explicacion) {
      box.innerHTML = `💡 ${escapeHtml(e.explicacion)}` +
        (e.ejemplos?.length
          ? `<div class="drill-why-ej">${e.ejemplos.map((x) => `“${escapeHtml(x)}”`).join(" · ")}</div>`
          : "");
      box.classList.remove("hidden");
      return;
    }
    box.innerHTML = "🤖 Preguntándole a la IA por qué está mal…";
    box.classList.remove("hidden");
    const id = e.id;
    fetchErrorExplanation(e)
      .then((r) => {
        e.explicacion = r.explicacion || "";
        e.ejemplos = Array.isArray(r.ejemplos) ? r.ejemplos.slice(0, 2) : [];
        save();
        renderVaultErrors(); // la lista del baúl también muestra el porqué ahora
        if (drill.items[drill.pos]?.id === id) renderDrillWhy(e);
      })
      .catch(() => {
        if (drill.items[drill.pos]?.id === id) {
          box.innerHTML =
            "💡 Este error no tiene explicación guardada. Enciende el servidor de IA " +
            "(doble clic en “Iniciar English Plus”) y vuelve a practicarlo para que te explique el porqué.";
        }
      });
  }

  async function fetchErrorExplanation(e) {
    const res = await fetch(`${AI_SERVER}/api/explain-error`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bad: e.bad, fix: e.fix })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Sin explicación.");
    return data.resultado;
  }

  // ---------- 📖 Diccionario al tocar una palabra ----------
  // En memoria, no persistido: es barato de volver a pedir y así no infla el
  // progreso guardado con miles de palabras sueltas.
  const wordDefCache = {};

  async function showWordPopup(span) {
    const word = span.dataset.word;
    if (!word) return;
    const popup = $("word-popup");
    popup.classList.remove("hidden");
    const key = word.toLowerCase();
    if (wordDefCache[key]) { renderWordPopup(word, wordDefCache[key]); return; }
    popup.innerHTML = `<div class="word-popup-loading">🔎 Buscando “${escapeHtml(word)}”…</div>`;
    try {
      const sentence = game.current?.parsed?.full || $("sentence").textContent;
      const res = await fetch(`${AI_SERVER}/api/define-word`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word, sentence })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Sin definición.");
      wordDefCache[key] = data.resultado;
      renderWordPopup(word, data.resultado);
    } catch (err) {
      popup.innerHTML = `<div class="word-popup-loading">⚠️ ${escapeHtml(
        err.message === "Failed to fetch"
          ? "Enciende el servidor de IA (\"Iniciar English Plus\") para usar el diccionario."
          : err.message
      )}</div>`;
    }
  }

  function renderWordPopup(word, r) {
    const popup = $("word-popup");
    popup.classList.remove("hidden");
    popup.innerHTML = `
      <div class="word-popup-top">
        <span class="word-popup-word">${escapeHtml(word)} <span class="word-popup-pos">${escapeHtml(r.tipo || "")}</span></span>
        <button type="button" class="word-popup-close" title="Cerrar">✕</button>
      </div>
      <div class="word-popup-tr">${escapeHtml(r.traduccion)}</div>
      <div class="word-popup-def">${escapeHtml(r.definicion)}</div>`;
    popup.querySelector(".word-popup-close").addEventListener("click", () => popup.classList.add("hidden"));
  }

  // Delegado en document: las palabras tocables se recrean en cada pregunta
  document.addEventListener("click", (e) => {
    const span = e.target.closest(".tap-word");
    if (span) { showWordPopup(span); return; }
    // Tocar afuera de una palabra y afuera del popup lo cierra
    if (!e.target.closest("#word-popup")) $("word-popup")?.classList.add("hidden");
    // Tocar afuera de un punto del gráfico cierra su detallito
    if (!e.target.closest(".chart-dot-hit")) {
      document.querySelectorAll(".chart-tooltip").forEach((t) => t.classList.add("hidden"));
    }
  });

  function checkDrill() {
    if (drill.awaitingNext) { nextDrillItem(); return; }
    const e = drill.items[drill.pos];
    const typed = $("drill-input").value.trim();
    if (!typed) { $("drill-input").focus(); return; }
    const ok = normalizeWords(typed).join(" ") === normalizeWords(e.fix).join(" ");
    const fb = $("drill-feedback");
    if (ok) {
      e.drillWins = (e.drillWins || 0) + 1;
      $("drill-input").className = "ok";
      fb.className = "feedback ok";
      playCorrectSound(e.drillWins * 2);
      if (e.drillWins >= 3 && !e.fixed) {
        e.fixed = true;
        addGems(1);
        fb.textContent = "🏆 ¡3 aciertos — error VENCIDO! · 💎+1";
        confetti();
        playFanfare();
      } else {
        fb.textContent = `✓ ¡Bien! (${e.drillWins}/3 para vencerlo)`;
      }
    } else {
      $("drill-input").className = "bad";
      fb.className = "feedback bad";
      fb.textContent = `✗ La forma correcta es: “${e.fix}”`;
    }
    save();
    renderVaultErrors();
    drill.awaitingNext = true;
    $("drill-input").disabled = true;
    $("btn-drill-check").textContent = "Siguiente →";
  }

  function nextDrillItem() {
    drill.pos++;
    if (drill.pos >= drill.items.length) {
      stopDrill();
      showToast("🏋️ ¡Práctica completada!");
      return;
    }
    showDrillItem();
  }

  function renderVault() {
    renderTopics();
    renderVaultErrors();
    renderTalkHistory();
    showScreen("vault");
  }

  // Eventos del Baúl
  $("btn-talk").addEventListener("click", () => {
    if (talk.active) stopTalk();
    else startTalk();
  });
  $("btn-topic-random").addEventListener("click", () => {
    setTopic(TOPICS[Math.floor(Math.random() * TOPICS.length)]);
  });
  $("topic-custom").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.value.trim()) setTopic(e.target.value.trim());
  });
  $("topic-custom").addEventListener("change", (e) => {
    if (e.target.value.trim()) setTopic(e.target.value.trim());
  });
  $("btn-talk-demo").addEventListener("click", () => {
    const text = $("talk-demo-text").value.trim();
    if (!text) return;
    if (!talk.topic) setTopic("(texto de prueba)");
    analyzeAndShow(text, 0, true);
  });
  $("btn-ai-analyze").addEventListener("click", analizarConIA);
  $("btn-vault-add").addEventListener("click", () => {
    const bad = $("vault-err-text").value.trim();
    const fix = $("vault-err-fix").value.trim();
    if (!bad || !fix) { alert("Escribe el error y su corrección."); return; }
    addVaultError(bad, fix, false);
    $("vault-err-text").value = "";
    $("vault-err-fix").value = "";
    renderVaultErrors();
  });

  $("btn-drill").addEventListener("click", startDrill);
  $("btn-drill-check").addEventListener("click", checkDrill);
  $("btn-drill-stop").addEventListener("click", stopDrill);
  $("btn-drill-say").addEventListener("click", () => {
    const e = drill.items[drill.pos];
    if (e) speak(e.fix);
  });
  $("drill-input").addEventListener("input", () => {
    const dl = $("drill-live");
    if (!state.settings.liveTyping) { dl.classList.add("hidden"); return; }
    const e = drill.items[drill.pos];
    if (!e || drill.awaitingNext) return;
    const typed = $("drill-input").value;
    dl.classList.toggle("hidden", !typed);
    dl.innerHTML = colorizeTyped(typed, e.fix);
  });
  $("drill-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") checkDrill();
  });


  // Navegación inferior
  $("nav-home").addEventListener("click", () => { renderHome(); showScreen("home"); });
  $("nav-decks").addEventListener("click", renderDecksScreen);
  $("nav-vault").addEventListener("click", renderVault);
  $("nav-stats").addEventListener("click", renderStats);

  // ---------- 📱 Teclado del teléfono: la pregunta SIEMPRE arriba ----------
  // Aunque #screen-game tiene overflow:hidden (v43), iOS igual "empuja" (pan)
  // la página entera para acomodar el teclado. Esto lo cancela activamente:
  // cuando el teclado achica el viewport VISIBLE, la pantalla de juego se
  // redimensiona a esa altura (así .play-area scrollea por dentro y el campo de
  // escritura queda a la vista) y la ventana se re-ancla arriba (scroll 0).
  // Al cerrarse el teclado, el mismo handler restaura todo.
  //
  // En la PWA instalada (standalone), iOS dibuja SU PROPIA barra de
  // "Autocompletar" (flechas ↑↓ + botón "Listo") flotando ENCIMA del
  // contenido, sin restarle esa altura a `visualViewport` — por eso, sin este
  // ajuste, esa barra tapa los botones "No sé"/"Comprobar" aunque el cálculo
  // de altura sea correcto (confirmado con capturas reales del usuario; el
  // truco `_inputAccessoryView = null` que se probó antes NO funciona en
  // standalone, solo sirve en apps nativas tipo Cordova/Capacitor). La única
  // forma confiable es restarle ese espacio a mano.
  const IOS_STANDALONE = window.navigator.standalone === true;
  const AUTOFILL_BAR_HEIGHT = 46; // alto típico del toolbar nativo de iOS

  if (window.visualViewport) {
    const vv = window.visualViewport;
    let vvRaf = 0;
    const pinGameScreen = () => {
      cancelAnimationFrame(vvRaf);
      vvRaf = requestAnimationFrame(() => {
        const gameEl = $("screen-game");
        if (gameEl.classList.contains("hidden")) { gameEl.style.height = ""; return; }
        const keyboardOpen = vv.height < window.innerHeight - 60;
        const extra = keyboardOpen && IOS_STANDALONE ? AUTOFILL_BAR_HEIGHT : 0;
        gameEl.style.height = keyboardOpen ? `${vv.height - extra}px` : "";
        if (window.scrollY !== 0 || vv.offsetTop > 0) window.scrollTo(0, 0);
        if (keyboardOpen && document.activeElement === $("answer-input")) {
          // que el campo quede visible dentro del área scrolleable interna
          $("answer-input").scrollIntoView({ block: "nearest" });
        }
      });
    };
    vv.addEventListener("resize", pinGameScreen);
    vv.addEventListener("scroll", pinGameScreen);
  }

  // ---------- ⏱ Tiempo de práctica ----------
  // Suma 1 segundo al día actual mientras la pestaña está visible Y estás
  // practicando de verdad: dentro de una ronda o hablando en el Baúl.
  // Se guarda cada 15s (y con cada save() normal del juego).
  let practiceTicks = 0;
  setInterval(() => {
    if (document.hidden) return;
    const playing = !$("screen-game").classList.contains("hidden");
    if (!playing && !talk.active) return;
    const t = today();
    const h = state.history[t] || { points: 0, played: 0, correct: 0, newWords: 0 };
    h.seconds = (h.seconds || 0) + 1;
    state.history[t] = h;
    if (++practiceTicks % 15 === 0) save();
  }, 1000);

  // ---------- ☁️ Sincronizar progreso con Google (Firebase, opcional) ----------
  // js/firebase-sync.js (módulo aparte, ver ese archivo) expone window.JoyCloud
  // cuando termina de cargar. Si no carga (sin internet, CDN bloqueado, etc.)
  // el botón queda oculto y la app sigue funcionando 100% local, como siempre.
  let cloudUser = null;
  let cloudSaveTimer = null;

  function scheduleCloudSave() {
    if (!cloudUser || !window.JoyCloud) return;
    clearTimeout(cloudSaveTimer);
    // Se agrupa en una sola escritura cada pocos segundos: save() se llama
    // muy seguido (cada respuesta, cada ajuste) y no hace falta subir TODO
    // eso a la nube al instante.
    cloudSaveTimer = setTimeout(() => {
      window.JoyCloud.saveState(cloudUser.uid, state).catch((e) => {
        console.warn("English Plus — no se pudo guardar en la nube:", e);
      });
    }, 3000);
  }

  function renderGoogleSigninButton() {
    const btn = $("btn-google-signin");
    const status = $("google-signin-status");
    if (!btn || !status) return;
    if (cloudUser) {
      status.textContent = `☁️ ${cloudUser.displayName || cloudUser.email}`;
      btn.textContent = "Cerrar sesión";
    } else {
      status.textContent = "☁️ Sin sincronizar";
      btn.textContent = cloudReady ? "Iniciar sesión con Google" : "Cargando…";
    }
  }

  async function handleGoogleAuthChange(user) {
    cloudUser = user;
    renderGoogleSigninButton();
    if (!user) return;
    try {
      const cloudState = await window.JoyCloud.loadState(user.uid);
      if (cloudState) {
        // Ya había progreso guardado en la nube (ej. entraste desde otro
        // dispositivo antes) — ese es el que manda.
        state = normalizeState(cloudState);
        save();
        renderHome();
        showToast(`☁️ Progreso cargado — ¡hola, ${user.displayName?.split(" ")[0] || "de nuevo"}!`, true);
      } else {
        // Primera vez con esta cuenta: sube lo que ya tenías en este navegador.
        await window.JoyCloud.saveState(user.uid, state);
        showToast("☁️ Tu progreso ahora se sincroniza con tu cuenta de Google", true);
      }
    } catch (e) {
      console.warn("English Plus — error sincronizando con la nube:", e);
      showToast("⚠️ No se pudo sincronizar con la nube. Sigue guardado en este navegador.", true);
    }
  }

  let cloudReady = false;
  window.addEventListener("joycloud-ready", () => {
    cloudReady = true;
    renderGoogleSigninButton();
    window.JoyCloud.onAuthChange(handleGoogleAuthChange);
  });

  $("btn-google-signin").addEventListener("click", async () => {
    if (!cloudReady || !window.JoyCloud) {
      showToast("⚠️ La sincronización con Google no cargó. Revisa tu conexión y vuelve a intentar.", true);
      return;
    }
    if (cloudUser) {
      if (confirm("¿Cerrar sesión de Google? Tu progreso sigue guardado en este navegador.")) {
        window.JoyCloud.signOutUser();
      }
      return;
    }
    const btn = $("btn-google-signin");
    btn.disabled = true;
    try {
      await window.JoyCloud.signIn();
    } catch (e) {
      console.warn("English Plus — error al iniciar sesión con Google:", e);
      showToast(`⚠️ No se pudo iniciar sesión (${e.code || e.message || "error desconocido"})`, true);
    } finally {
      btn.disabled = false;
    }
  });

  // ---------- Inicio ----------
  renderHome();
  if (location.hash === "#vault") renderVault();
  else showScreen("home");
})();
