# Joy English ☀️ (v13)

Novedades v13 — **Rangos, insignias y tienda**:
- **🏅 8 rangos por XP total** (no por nivel): Beginner → Learner → Explorer →
  Communicator → Storyteller → Advanced → Near-Fluent → **Fluent** (rango máximo,
  35.000 XP — el sol ☀️ cierra el círculo con la marca). Banner grande en el inicio
  con insignia, barra de progreso al siguiente rango, y escalera completa en Progreso.
- **Insignias en BETA**: cada rango usa un emoji por defecto. Si existe
  `icons/ranks/<id>.png`, esa imagen se usa en su lugar automáticamente — sin tocar
  código. IDs: `beginner`, `learner`, `explorer`, `communicator`, `storyteller`,
  `advanced`, `near_fluent`, `fluent`. Recomendado: PNG cuadrado, fondo transparente,
  ≥256×256px.
- **💎 Gemas** (moneda aparte del XP, nunca se gastan tus puntos): +1 al subir de
  nivel, +5 al subir de rango, +2 al cumplir la meta diaria, +1 por cada error
  vencido en el Baúl.
- **🏪 Tienda**: 🧊 Congelador de racha (8 gemas, tope combinado de 3), ⚡ XP Doble
  ×10 respuestas (10 gemas), 🎫 Pase de palabras nuevas del día (6 gemas, ignora el
  tope diario por hoy).

## Versión anterior (v12)

Novedades v11-v12 (implementación del feedback de producto del 2026-07-14):
- **Banco de frases 4× más grande**: 839 frases (antes 200), con **variedad de contexto
  real** — 95% de las palabras ya tienen entre 2 y 5 frases distintas, tomadas de
  [Tatoeba.org](https://tatoeba.org) (CC BY 2.0 FR, atribuida en el footer). La
  investigación en adquisición de vocabulario es clara: ver una palabra en contextos
  variados genera conocimiento generalizable; memorizar una única frase, no. Los
  índices de las primeras 50 frases de cada colección no se tocaron — tu progreso
  guardado sigue siendo válido byte a byte.
- **🎓 Graduación automática**: en Vocabulario Fácil, cuando ya reconoces una palabra
  (dominio ≥ 50%), deja de dártela en opción múltiple y te pide escribirla — recordar
  activamente retiene mucho más que reconocer entre opciones (efecto testing).
- **🧊 Congelador de racha**: cada 7 días de racha ganas 1 (máx. 2); si faltas un solo
  día, se consume uno y tu racha sigue viva en vez de resetearse a 1.
- **Tope de palabras nuevas por día** (20 por defecto, ajustable en Ajustes): la
  evidencia dice que 10-20 nuevas al día es el punto óptimo para no saturar la
  retención; pasado eso, la app te lo dice y te ofrece repasar en su lugar.
- **⚡ Contrarreloj** quedó como reto principal (se quitó 🎲 Reto sorpresa).
- Copy más honesto en Speaking: el % de reconocimiento de voz ahora se marca como
  aproximado (la precisión del navegador cae con acento no nativo, es una limitación
  real de la tecnología, no tuya).

## Versión anterior (v10)

Novedades v10:
- **Mazos reorganizados**: TODO el catálogo (Fast Tracks + tus mazos) vive en la pestaña
  📚 Mazos; con 📌 Fijar eliges cuáles aparecen en el Inicio. Recientes se mantiene.
- **🎲 Reto sorpresa**: mazo, modo y dificultad al azar con un toque.
- **⚡ Contrarreloj 60s**: opción múltiple con todo el banco, avance instantáneo,
  récord guardado y celebración al superarlo.
- **🏋️ Drill del Baúl**: practica tus errores escribiendo la forma correcta;
  3 aciertos = error vencido automáticamente.
- **Progreso mejorado**: barra 🌟 "Camino a la fluidez" (% del banco aprendido) y
  bloque 🏅 Récords (racha de días, mejor combo, contrarreloj, charlas libres).
- **Más dopamina**: puntos que cuentan hacia arriba en resultados, tarjeta que brilla
  en combo (5+), llama 🔥 que crece con la racha. Las charlas del Baúl ahora también
  mantienen tu racha de días.
- **IA retirada de la interfaz** (decisión de no pagar API por ahora). El servidor
  `server.js` queda dormido en la carpeta por si se quiere reactivar en el futuro;
  no se carga ni afecta a la app.

## Versiones anteriores



Novedades v8 (auditoría profunda): fechas en hora **local** (los puntos del día ya no se
reinician por la tarde), reproductor completo para **tu voz grabada** en el Baúl (pausa,
adelantar, silenciar), transcript **sin pérdida de la última frase**, contador en vivo ✨
de palabras aplicadas mientras hablas, 🔊 para escuchar la forma correcta de cada error
guardado, comparativa semanal en Progreso, bienvenida para cuentas nuevas, acceso directo
del ícono al Baúl, y varios bugs arreglados (doble salto con Enter, TTS colándose en el
micrófono, grabación compatible con iPhone).

Novedades v7: **navegación inferior** tipo app (Inicio · Mazos · Baúl · Progreso) y la
pestaña **🎙️ Baúl (BETA)** — habla libre por temas con transcripción en vivo, grabación
de tu voz, análisis local (palabras/minuto, palabras de tus mazos aplicadas ✨, muletillas
y errores típicos de hispanohablantes con corrección) y un **baúl de errores** persistente
que repasas antes de cada charla y marcas como vencidos 🏆. Incluye modo prueba por texto
sin micrófono. El análisis profundo con IA se conectará en una próxima versión.

Novedades v6: sección **🕐 Recientes** en el inicio (todo mazo que juegues queda a un
toque), botón **💡 Ayuda** con 3 niveles de pista y explicación al responder,
**⚡ COMBO** (5 seguidas ×1.5, 10 seguidas ×2), sonido que sube de tono con tu racha,
fanfarria + confeti al subir de nivel o cumplir la meta, carteles de hitos y vibración
en el teléfono.

App para aprender inglés al estilo [Clozemaster](https://www.clozemaster.com/l/eng-spa):
completas la palabra que falta en frases reales, con traducción al español.
**100 % gratis y sin límites.** El objetivo: fluidez por exposición masiva + repaso espaciado.

## Cómo jugar

```bash
python3 -m http.server 8944 --directory /Users/adam/Claude
# luego abre http://localhost:8944/joy-english/
```

## Mecánicas (copiadas de Clozemaster)

- **Fluency Fast Track**: 200 frases en 4 colecciones por frecuencia real de la palabra
  oculta (1–500, 500–2000, 2000–5000, 5000+), de fácil a difícil.
- **Dominio por frase**: 0 → 25 → 50 → 75 → 100 % (4 aciertos). Un fallo vuelve a 0 %.
- **Repaso espaciado**: intervalos de **1, 10, 30 y 180 días**.
- **Rondas**: frases nuevas + hasta 5 repasos pendientes, mezclados automáticamente.
- **⭐ Favoritas** y **resumen de la ronda** al terminar, como en Clozemaster.

## Modos de juego (se eligen al tocar Jugar)

| Modo | 😌 Fácil | 🙂 Medio | 🔥 Difícil |
|---|---|---|---|
| 📖 **Vocabulario** | opción múltiple · 8 pts | — | escribe la palabra · 16 pts |
| 🎧 **Listening** | escucha y elige · 10 pts | escucha y escribe la palabra · 16 pts | transcribe la oración · 24 pts |
| 🎤 **Speaking** | di la palabra · 12 pts | di la oración completa · 16 pts | di la oración desde la traducción · 24 pts |

- El **audio se reproduce solo** al aparecer cada frase (salvo Speaking difícil, donde el
  reto es producirla tú). 🔊 y 🐢 la repiten normal o lenta.
- **Sonido dopamínico** al acertar (se puede apagar en Ajustes) y confeti en metas.
- La **meta diaria se mide en oraciones practicadas** (configurable); la gráfica de
  14 días muestra oraciones por día. La XP sube tu nivel y nunca se reinicia.
- Si fallas escribiendo una palabra, debes **reescribir la correcta** para continuar.
- Fondo **negro** con el amarillo de la marca Joy.

Ideas futuras guardadas en [IDEAS.md](IDEAS.md) (random challenge, reto "5 veces
fluido", contrarreloj, modo conversación…).

## 📚 Mazos propios

- Pestaña **"Todos los mazos"**: crea mazos ilimitados (frase → toca la palabra a ocultar →
  traducción) o importa en masa: `She {{sings}} very well. | Ella canta muy bien.`
- Con **📌 Fijar** eliges cuáles aparecen en el inicio; el resto queda en su pestaña.
- También puedes pedirle a Claude colecciones fijas para el dashboard (`js/data.js`).

## Progreso

- **Puntos hoy** se reinician cada día (con meta diaria y confeti al cumplirla 🎯);
  la **XP total nunca se pierde** y sube tu **nivel**.
- **Aprendidas** = frases que llegaron al 100 % de dominio.
- Gráfica de 14 días en el inicio, racha de días, estadísticas completas, export/import.
- Voz: elige entre todas las voces en inglés de tu navegador o deja "Automática (la mejor)".
- Animaciones suaves (confeti, pulso al acertar, sacudida al fallar) — sin sonidos.
- `localStorage` clave `joyenglish-v3` (migra desde ClozeQuest v1/v2 sin perder nada).

## Estructura

```
joy-english/
├── index.html      # inicio, juego, resultados, estadísticas, mazos, editor, ajustes
├── css/styles.css  # tema amarillo (marca Joy)
└── js/
    ├── data.js     # banco de frases fijo (agrega colecciones aquí)
    └── app.js      # toda la lógica
```
