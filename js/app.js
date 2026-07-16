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
    }
  };

  // Umbral de palabras acertadas para dar por buena una oración completa
  const SENTENCE_THRESHOLD = { listening: 0.85, speaking: 0.85, speakingMedium: 0.75 };

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
    autoAdvance: true
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
    bugReports: []            // 🚩 errores reportados en frases, para exportar y revisar
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

  const POS_NAMES = {
    v: "un verbo", n: "un sustantivo", adj: "un adjetivo", adv: "un adverbio",
    prep: "una preposición", conj: "una conjunción", pron: "un pronombre", x: "una palabra"
  };

  // Busca otra frase del banco que use la misma palabra oculta
  function findExample(word, excludeT) {
    for (const col of allCollections()) {
      for (const s of col.sentences) {
        const p = parseSentence(s);
        if (p.answer.toLowerCase() === word.toLowerCase() && s.t !== excludeT) {
          return { s, p };
        }
      }
    }
    return null;
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
  }

  // ---------- Gráfica (oraciones por día) ----------
  const WEEKDAYS = ["D", "L", "M", "X", "J", "V", "S"];

  function renderChart(el) {
    el.innerHTML = "";
    const days = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(Date.now() - i * DAY);
      const key = dateKey(d);
      days.push({ label: `${WEEKDAYS[d.getDay()]}<br>${d.getDate()}`, data: state.history[key] });
    }
    const goal = state.settings.dailyGoal;
    const max = Math.max(goal, ...days.map((d) => d.data?.played || 0));

    const line = document.createElement("div");
    line.className = "chart-goal-line";
    line.style.bottom = `${Math.round(30 + (goal / max) * 86)}px`;
    line.title = `Meta: ${goal} oraciones`;
    el.appendChild(line);

    days.forEach((d) => {
      const n = d.data?.played || 0;
      const col = document.createElement("div");
      col.className = "chart-col";
      col.innerHTML = `
        ${n ? `<div class="chart-value">${n}</div>` : ""}
        <div class="chart-bar ${n >= goal ? "goal-met" : ""}"
             style="height:${Math.round((n / max) * 100)}%"></div>
        <div class="chart-label">${d.label}</div>`;
      el.appendChild(col);
    });
  }

  // ---------- Pantalla de inicio ----------
  function collectionCard(col, stats, extraHtml = "") {
    const card = document.createElement("div");
    card.className = "collection-card";
    card.innerHTML = `
      <div class="collection-top">
        <div class="collection-icon">${col.icon}</div>
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
    $("welcome-card").classList.toggle("hidden", state.welcomed);
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
      btn.innerHTML = `${m.name} <small>${m.desc}</small>`;
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
        if (pendingColId !== null) startRound(pendingColId);
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
    advanceTimer: null, answers: [], goalHit: false, helpLevel: 0,
    wasTimed: false, timedEnd: null, timedInt: null,
    lastRoundOmittedFresh: 0 // cuántas frases frescas del mazo se quedaron fuera por el tope diario
  };

  function diffConf() {
    return MODES[state.mode].diffs[state.difficulty];
  }

  function isFullSentence() {
    return state.difficulty === "hard" && state.mode !== "vocab";
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
           isGraduatedItem();
  }

  function isChoiceQuestion() {
    return state.difficulty === "easy" && (state.mode === "vocab" || state.mode === "listening") &&
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

  // ⚡ Contrarreloj: 60 segundos de opción múltiple con TODO el banco
  const TIMED_MS = 60000;

  function startTimedChallenge() {
    state.mode = "vocab";
    state.difficulty = "easy";
    save();
    const pool = [];
    allCollections().forEach((col) =>
      col.sentences.forEach((s, i) => pool.push({ colId: col.id, idx: i, s })));
    if (!pool.length) return;
    beginRound(shuffle(pool).slice(0, 60), null, true);
    game.timedEnd = Date.now() + TIMED_MS;
    game.timedInt = setInterval(() => {
      const left = Math.max(0, game.timedEnd - Date.now());
      $("round-count").textContent = `⚡ ${Math.ceil(left / 1000)}s`;
      $("round-fill").style.width = `${(left / TIMED_MS) * 100}%`;
      if (left <= 0) { clearInterval(game.timedInt); endRound(); }
    }, 250);
  }

  function favKey() {
    return `${game.current.colId}:${game.current.idx}`;
  }

  function renderFavButton() {
    const faved = state.favorites.includes(favKey());
    const btn = $("btn-fav");
    btn.textContent = faved ? "⭐" : "☆";
    btn.classList.toggle("faved", faved);
  }

  function renderBlankSentence() {
    const { before, after, answer } = game.current.parsed;
    const el = $("sentence");
    el.classList.remove("dictation");
    el.innerHTML = "";
    const blank = document.createElement("span");
    blank.className = "blank";
    blank.id = "blank";
    blank.textContent = "_".repeat(Math.max(4, answer.length));
    el.append(document.createTextNode(before), blank, document.createTextNode(after));
  }

  function renderPromptSentence(text) {
    const el = $("sentence");
    el.classList.add("dictation");
    el.textContent = text;
  }

  function showQuestion() {
    clearTimeout(game.advanceTimer);
    const item = game.queue[game.pos];
    game.current = { ...item, parsed: parseSentence(item.s) };
    game.answered = false;
    game.hintUsed = false;
    game.mustRetype = false;
    game.helpLevel = 0;

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
    }

    const p = getProg(item.colId, item.idx);
    renderMastery(p ? p.m : 0);
    renderFavButton();

    $("feedback").textContent = "";
    $("feedback").className = "feedback";
    $("word-match").classList.add("hidden");
    $("help-panel").classList.add("hidden");
    $("typing-live").classList.add("hidden");
    $("typing-live").innerHTML = "";
    $("btn-next").classList.add("hidden");

    $("choices").classList.toggle("hidden", !isChoiceQuestion());
    $("input-area").classList.toggle("hidden", !(isWordInput() || (mode === "listening" && d === "hard")));
    $("speak-area").classList.toggle("hidden", mode !== "speaking");

    if (isChoiceQuestion()) {
      renderChoices(4);
      $("kbd-hint").textContent = "Teclas 1–4 para responder · Enter para continuar";
    } else if (isWordInput() || (mode === "listening" && d === "hard")) {
      const input = $("answer-input");
      input.value = "";
      input.className = "";
      input.disabled = false;
      input.placeholder = isFullSentence()
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

    // El audio se reproduce SOLO al aparecer la frase (pedido del usuario)
    // En speaking difícil no: ahí el reto es producirla desde la traducción.
    if (!(mode === "speaking" && d === "hard")) {
      speak(game.current.parsed.full);
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

  function answerInput(giveUp = false) {
    if (game.answered) return;
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

    const sentenceEl = $("sentence");
    sentenceEl.classList.remove("dictation");
    sentenceEl.innerHTML = "";
    const blank = document.createElement("span");
    blank.className = `blank ${isCorrect ? "filled-correct" : "filled-wrong"}`;
    blank.id = "blank";
    blank.textContent = answer;
    sentenceEl.append(document.createTextNode(before), blank, document.createTextNode(after));
    $("translation").textContent = game.current.s.es;

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
      animate(blank, "pop");
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
      fb.textContent = state.mode === "speaking"
        ? `✗ Faltó decir “${answer}” — escucha y repite`
        : `✗ La respuesta era “${answer}”`;
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

    if (state.settings.autoplay) speak(full);

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
    $("r-timed").textContent = state.records.bestTimed;
    $("r-talks").textContent = state.records.talks;

    const colWrap = $("collection-stats");
    colWrap.innerHTML = "";
    allCollections().forEach((col) => {
      const st = collectionStats(col);
      const div = document.createElement("div");
      div.className = "col-stat";
      div.innerHTML = `
        <div class="col-stat-top">
          <span>${col.icon} ${escapeHtml(col.name)}</span>
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
      "# 🚩 Reportes de errores — Joy English",
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
    $("set-rate").value = s.rate;
    $("set-sounds").checked = s.sounds;
    $("set-livetyping").checked = s.liveTyping;
    $("set-autoplay").checked = s.autoplay;
    $("set-autoadvance").checked = s.autoAdvance;

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
    s.sounds = $("set-sounds").checked;
    s.liveTyping = $("set-livetyping").checked;
    s.autoplay = $("set-autoplay").checked;
    s.autoAdvance = $("set-autoadvance").checked;
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

  // 💡 Ayuda por niveles: pistas graduales sin regalar la respuesta.
  // Tras responder, da una explicación gratis de la palabra.
  function showHelp() {
    if (!game.current) return;
    const panel = $("help-panel");
    const { answer, full } = game.current.parsed;
    const es = game.current.s.es;
    const posName = POS_NAMES[game.current.s.pos] || POS_NAMES.x;

    if (game.answered) {
      const ex = findExample(answer, game.current.s.t);
      panel.innerHTML =
        `📖 «<b>${escapeHtml(answer)}</b>» es ${posName}. Significado en contexto: <i>${escapeHtml(es)}</i>` +
        (ex ? `<br>Otro ejemplo: “${escapeHtml(ex.p.full)}” — <i>${escapeHtml(ex.s.es)}</i>` : "");
      panel.classList.remove("hidden");
      return;
    }

    game.hintUsed = true; // pedir ayuda reduce los puntos a la mitad (una sola vez)
    game.helpLevel = Math.min(3, game.helpLevel + 1);

    const fullTask = isFullSentence() ||
      (state.mode === "speaking" && state.difficulty !== "easy");
    const hints = [];
    if (fullTask) {
      hints.push(`La oración tiene <b>${normalizeWords(full).length}</b> palabras y significa: <i>${escapeHtml(es)}</i>`);
      hints.push(`Empieza así: “<b>${escapeHtml(full.split(" ").slice(0, 3).join(" "))}…</b>”`);
      hints.push("🐢 Escúchala lenta una vez más.");
      if (game.helpLevel === 3) speak(full, 0.6);
    } else {
      hints.push(`La palabra oculta es <b>${posName}</b> y la oración significa: <i>${escapeHtml(es)}</i>`);
      hints.push(`Empieza con “<b>${escapeHtml(answer[0])}</b>” y tiene <b>${answer.length}</b> letras.`);
      const ex = findExample(answer, game.current.s.t);
      hints.push(ex
        ? `Otra frase con la misma palabra: “${escapeHtml(ex.p.before)}____${escapeHtml(ex.p.after)}” — <i>${escapeHtml(ex.s.es)}</i>`
        : `Piensa en cómo lo dirías tú: <i>${escapeHtml(es)}</i>`);
    }

    panel.innerHTML =
      `💡 <b>Ayuda ${game.helpLevel}/3</b> <small>(puntos a la mitad)</small><br>` +
      hints.slice(0, game.helpLevel).map((x) => `• ${x}`).join("<br>");
    panel.classList.remove("hidden");
  }

  $("btn-help").addEventListener("click", showHelp);

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
    if (game.wasTimed) { startTimedChallenge(); return; }
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
  ["set-session", "set-goal", "set-newwords", "set-voice", "set-rate", "set-sounds", "set-livetyping", "set-autoplay", "set-autoadvance"]
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
        alert("El archivo no es un progreso válido de Joy English.");
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
      if (btn) answerChoice(btn);
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

  // Errores típicos de hispanohablantes (alta confianza)
  const ERROR_PATTERNS = [
    { re: /\bpeople is\b/i, bad: "people is", fix: "people are" },
    { re: /\bi have (\d+|twenty|thirty|forty) years?\b/i, bad: "I have … years", fix: "I am … years old" },
    { re: /\bdepend of\b/i, bad: "depend of", fix: "depend on" },
    { re: /\bi am agree\b/i, bad: "I am agree", fix: "I agree" },
    { re: /\bmarried with\b/i, bad: "married with", fix: "married to" },
    { re: /\bexplain me\b/i, bad: "explain me", fix: "explain to me" },
    { re: /\bmore better\b/i, bad: "more better", fix: "better" },
    { re: /\bfor to \w+/i, bad: "for to + verbo", fix: "to + verbo (I came to learn)" },
    { re: /\bthe most \w+ of all the\b/i, bad: "the most … of all the", fix: "the most … of all" },
    { re: /\bmake a question\b/i, bad: "make a question", fix: "ask a question" },
    { re: /\bwin money\b/i, bad: "win money", fix: "earn money" },
    { re: /\bassist to\b/i, bad: "assist to", fix: "attend" }
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
    finals: [], interim: "", rec: null, mediaRec: null, chunks: [], url: null
  };

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
          talk.url = URL.createObjectURL(
            new Blob(talk.chunks, { type: talk.mediaRec.mimeType || "audio/webm" }));
          // Reproductor completo: pausa, adelantar, volumen y silencio
          const player = $("talk-audio");
          player.src = talk.url;
          player.classList.remove("hidden");
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
    analyzeAndShow(transcript, seconds, false);
  }

  function analyzeTalk(text, seconds) {
    const words = normalizeWords(text);
    const unique = new Set(words);
    const learned = learnedWords();
    const applied = [...unique].filter((w) => learned.has(w));
    const fillers = words.filter((w) => FILLERS.includes(w)).length;
    const issues = [];
    for (const p of ERROR_PATTERNS) {
      if (p.re.test(text)) issues.push({ bad: p.bad, fix: p.fix });
    }
    return {
      words: words.length,
      unique: unique.size,
      wpm: seconds ? Math.round((words.length / seconds) * 60) : null,
      applied, fillers, issues
    };
  }

  function analyzeAndShow(transcript, seconds, isDemo) {
    const r = analyzeTalk(transcript, seconds);

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
      addVaultError(iss.bad, iss.fix, true);
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
      date: today(), topic: talk.topic || "(texto de prueba)",
      transcript, seconds: Math.round(seconds || 0),
      wpm: r.wpm, words: r.words, applied: r.applied, demo: isDemo
    });
    state.talkSessions = state.talkSessions.slice(0, 15);
    if (!isDemo) {
      state.records.talks++;
      touchDailyStreak(); // hablar libre también mantiene tu racha de días
    }
    save();
    renderTalkHistory();
    renderVaultErrors();
  }

  // ---------- Baúl de errores ----------
  function addVaultError(bad, fix, auto = false) {
    const exists = state.errorVault.some(
      (e) => e.bad.toLowerCase() === bad.toLowerCase());
    if (exists) return;
    state.errorVault.unshift({
      id: `err-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      bad, fix, date: today(), auto, fixed: false
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
          <small style="color:var(--text-dim)"> · ${e.date}${e.auto ? " · detectado" : ""}</small></div>
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
      row.innerHTML = `<div class="txt">Di <span class="fix-part">“${escapeHtml(e.fix)}”</span>, no <span class="bad-part">“${escapeHtml(e.bad)}”</span></div>`;
      rl.appendChild(row);
    });
  }

  function renderTalkHistory() {
    const wrap = $("talk-history");
    wrap.innerHTML = "";
    if (state.talkSessions.length === 0) {
      wrap.innerHTML = `<div class="talk-history-row">Aquí quedarán tus charlas: tema, duración y palabras aplicadas.</div>`;
      return;
    }
    state.talkSessions.forEach((s) => {
      const row = document.createElement("div");
      row.className = "talk-history-row";
      row.innerHTML = `<b>${escapeHtml(s.topic)}</b> · ${s.date} · ${s.words} palabras` +
        (s.wpm ? ` · ${s.wpm} ppm` : "") +
        ` · ✨ ${s.applied.length} aplicadas${s.demo ? " · ⌨️ texto" : ""}`;
      wrap.appendChild(row);
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
  $("btn-vault-add").addEventListener("click", () => {
    const bad = $("vault-err-text").value.trim();
    const fix = $("vault-err-fix").value.trim();
    if (!bad || !fix) { alert("Escribe el error y su corrección."); return; }
    addVaultError(bad, fix, false);
    $("vault-err-text").value = "";
    $("vault-err-fix").value = "";
    renderVaultErrors();
  });

  $("btn-welcome-ok").addEventListener("click", () => {
    state.welcomed = true;
    save();
    $("welcome-card").classList.add("hidden");
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

  $("btn-timed-challenge").addEventListener("click", startTimedChallenge);

  // Navegación inferior
  $("nav-home").addEventListener("click", () => { renderHome(); showScreen("home"); });
  $("nav-decks").addEventListener("click", renderDecksScreen);
  $("nav-vault").addEventListener("click", renderVault);
  $("nav-stats").addEventListener("click", renderStats);

  // ---------- Inicio ----------
  renderHome();
  if (location.hash === "#vault") renderVault();
  else showScreen("home");
})();
