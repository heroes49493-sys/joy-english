// Joy English ☀️ — banco de frases (Fluency Fast Track)
// Como Clozemaster: las colecciones agrupan frases según la FRECUENCIA de la palabra oculta
// en el inglés real, y dentro de cada colección van ordenadas de más fácil a más difícil.
// Formato: t = frase con {{palabra}} oculta, es = traducción, pos = tipo de palabra
// pos: v = verbo, n = sustantivo, adj = adjetivo, adv = adverbio, prep = preposición, conj = conjunción, pron = pronombre
//
// Las primeras 50 frases de cada colección son las originales (NO reordenar ni insertar
// frases antes de ellas: el progreso de los usuarios se guarda por ÍNDICE). Desde 2026-07,
// cada palabra tiene varias frases más de ejemplo — muchas tomadas de Tatoeba.org (licencia
// CC BY 2.0 FR, atribución obligatoria: https://tatoeba.org) para dar variedad de contexto
// real, en vez de memorizar siempre la misma frase para la misma palabra.

const COLLECTIONS = [
  {
    id: "ft1",
    name: "Fast Track 1 · Palabras 1–500",
    desc: "Las palabras más usadas del inglés: la base de la fluidez",
    icon: "🚀",
    sentences: [
      {
        t: "I {{am}} very happy today.",
        es: "Estoy muy feliz hoy.",
        pos: "v",
        gram: "'am' es la forma de 'to be' (ser/estar) en presente para la primera persona singular: 'I am'. Es irregular — no existe 'I be'."
      },
      {
        t: "This is {{my}} house.",
        es: "Esta es mi casa.",
        pos: "pron",
        gram: "'my' (mi/mis) es un adjetivo POSESIVO: siempre va antes de un sustantivo ('my house') y nunca cambia con el plural ('my houses', no 'mys')."
      },
      {
        t: "We {{are}} good friends.",
        es: "Somos buenos amigos.",
        pos: "v",
        gram: "'are' es la forma de 'to be' (ser/estar) en presente para 'you/we/they'. Junto con 'am' e 'is', forma el verbo más irregular del inglés."
      },
      {
        t: "He {{is}} at work now.",
        es: "Él está en el trabajo ahora.",
        pos: "v",
        gram: "'is' es la forma de 'to be' (ser/estar) en presente para 'he/she/it' (tercera persona singular). Junto con 'am' y 'are', forma el verbo más irregular del inglés."
      },
      {
        t: "I {{want}} more coffee.",
        es: "Quiero más café.",
        pos: "v",
        gram: "'want' es la forma base (infinitivo sin 'to') de 'to want' (querer). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "She {{has}} a new car.",
        es: "Ella tiene un auto nuevo.",
        pos: "v",
        gram: "'has' es la forma de 'to have' (tener) en presente para 'he/she/it' (tercera persona singular) — la única forma irregular de 'have' en presente simple."
      },
      {
        t: "I {{like}} this song.",
        es: "Me gusta esta canción.",
        pos: "v",
        gram: "'like' es la forma base (infinitivo sin 'to') de 'to like' (gustar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "We {{go}} to the park on Sundays.",
        es: "Vamos al parque los domingos.",
        pos: "v",
        gram: "'go' es la forma base (infinitivo sin 'to') de 'to go' (ir). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "I {{know}} the answer.",
        es: "Sé la respuesta.",
        pos: "v",
        gram: "'know' es la forma base (infinitivo sin 'to') de 'to know' (saber / conocer). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Can you {{see}} the moon?",
        es: "¿Puedes ver la luna?",
        pos: "v",
        gram: "'see' es la forma base (infinitivo sin 'to') de 'to see' (ver). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "I {{think}} you are right.",
        es: "Creo que tienes razón.",
        pos: "v",
        gram: "'think' es la forma base (infinitivo sin 'to') de 'to think' (pensar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "They {{come}} from Mexico.",
        es: "Ellos vienen de México.",
        pos: "v",
        gram: "'come' es la forma base (infinitivo sin 'to') de 'to come' (venir). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "What {{time}} is it?",
        es: "¿Qué hora es?",
        pos: "n",
        gram: "'time' (tiempo) es normalmente INCONTABLE ('time flies'), pero se vuelve contable cuando significa 'una vez/ocasión': 'three times' (tres veces)."
      },
      {
        t: "Today is a {{good}} day.",
        es: "Hoy es un buen día.",
        pos: "adj",
        gram: "'good' (bueno) tiene comparativo y superlativo IRREGULARES: good → better → best (no se dice 'gooder' ni 'goodest')."
      },
      {
        t: "My house is very {{small}}.",
        es: "Mi casa es muy pequeña.",
        pos: "adj",
        gram: "'small' (pequeño) es un adjetivo regular; comparativo 'smaller', superlativo 'smallest' — adjetivo corto, se agrega '-er/-est' directamente."
      },
      {
        t: "The {{people}} here are friendly.",
        es: "La gente aquí es amable.",
        pos: "n",
        gram: "'people' (personas/gente) es el plural IRREGULAR de 'person' — no se dice 'persons' en el uso normal. Se comporta como un sustantivo plural: 'people are...', nunca 'people is...'."
      },
      {
        t: "I {{work}} from Monday to Friday.",
        es: "Trabajo de lunes a viernes.",
        pos: "v",
        gram: "'work' es la forma base (infinitivo sin 'to') de 'to work' (trabajar / funcionar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Please {{give}} me the book.",
        es: "Por favor, dame el libro.",
        pos: "v",
        gram: "'give' es la forma base (infinitivo sin 'to') de 'to give' (dar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "I can't {{find}} my phone.",
        es: "No puedo encontrar mi teléfono.",
        pos: "v",
        gram: "'find' es la forma base (infinitivo sin 'to') de 'to find' (encontrar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Where}} do you live?",
        es: "¿Dónde vives?",
        pos: "adv",
        gram: "'where' (dónde) es un adverbio interrogativo (y también conjunción) usado para preguntar o hablar de lugar: 'Where do you live?'."
      },
      {
        t: "He works {{every}} day.",
        es: "Él trabaja todos los días.",
        pos: "adj",
        gram: "'every' (cada/todo) es un cuantificador que SIEMPRE va con sustantivo singular y verbo en singular: 'every day', 'every student has...' (nunca 'every students')."
      },
      {
        t: "She {{tells}} me everything.",
        es: "Ella me cuenta todo.",
        pos: "v",
        gram: "'tells' es la forma de tercera persona singular (he/she/it) de 'to tell' (decir / contar) en presente simple: se agrega '-s' (o '-es') a la base."
      },
      {
        t: "I want to {{ask}} you something.",
        es: "Quiero preguntarte algo.",
        pos: "v",
        gram: "'ask' es la forma base (infinitivo sin 'to') de 'to ask' (preguntar / pedir). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Your keys are {{in}} the car.",
        es: "Tus llaves están en el auto.",
        pos: "prep",
        gram: "'in' se usa para espacios delimitados (in a room), meses/años/estaciones (in July, in 2024) y periodos largos de tiempo — distinto de 'on' (días) y 'at' (horas puntuales)."
      },
      {
        t: "We {{eat}} together every night.",
        es: "Comemos juntos todas las noches.",
        pos: "v",
        gram: "'eat' es la forma base (infinitivo sin 'to') de 'to eat' (comer). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Please {{look}} at this photo.",
        es: "Por favor, mira esta foto.",
        pos: "v",
        gram: "'look' es la forma base (infinitivo sin 'to') de 'to look' (mirar / parecer). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "I {{feel}} very tired.",
        es: "Me siento muy cansado.",
        pos: "v",
        gram: "'feel' es la forma base (infinitivo sin 'to') de 'to feel' (sentir). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Don't {{say}} that word.",
        es: "No digas esa palabra.",
        pos: "v",
        gram: "'say' es la forma base (infinitivo sin 'to') de 'to say' (decir). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "He {{gets}} home late.",
        es: "Él llega tarde a casa.",
        pos: "v",
        gram: "'gets' es la forma de tercera persona singular (he/she/it) de 'to get' (conseguir / llegar a) en presente simple: se agrega '-s' (o '-es') a la base."
      },
      {
        t: "I will {{call}} you tomorrow.",
        es: "Te llamaré mañana.",
        pos: "v",
        gram: "'call' es la forma base (infinitivo sin 'to') de 'to call' (llamar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "We can {{do}} it together.",
        es: "Podemos hacerlo juntos.",
        pos: "v",
        gram: "'do' es la forma base (infinitivo sin 'to') de 'to do' (hacer). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "She {{makes}} the best cakes.",
        es: "Ella hace los mejores pasteles.",
        pos: "v",
        gram: "'makes' es la forma de tercera persona singular (he/she/it) de 'to make' (hacer / fabricar) en presente simple: se agrega '-s' (o '-es') a la base."
      },
      {
        t: "I have to {{leave}} now.",
        es: "Tengo que irme ahora.",
        pos: "v",
        gram: "'leave' es la forma base (infinitivo sin 'to') de 'to leave' (irse / dejar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{How}} old are you?",
        es: "¿Cuántos años tienes?",
        pos: "adv",
        gram: "'how' (cómo) es un adverbio interrogativo, usado para preguntar por el modo, cantidad o estado: 'How are you?', 'How much...?'."
      },
      {
        t: "This is the {{first}} time I see snow.",
        es: "Es la primera vez que veo nieve.",
        pos: "adj",
        gram: "'first' (primero) es un número ORDINAL, no cardinal ('one'). Los ordinales indican orden/posición: first, second, third…"
      },
      {
        t: "My phone is very {{old}}.",
        es: "Mi teléfono es muy viejo.",
        pos: "adj",
        gram: "'old' (viejo) es un adjetivo regular; comparativo 'older', superlativo 'oldest' (adjetivo corto, se agrega '-er/-est')."
      },
      {
        t: "I read a {{new}} book every month.",
        es: "Leo un libro nuevo cada mes.",
        pos: "adj",
        gram: "'new' (nuevo) es un adjetivo regular; su comparativo es 'newer' y superlativo 'newest', siguiendo la regla simple de agregar '-er/-est' a adjetivos de una sílaba."
      },
      {
        t: "Wait for me {{here}}.",
        es: "Espérame aquí.",
        pos: "adv",
        gram: "'here' (aquí) es un adverbio de LUGAR; se usa sin preposición ('come here', no 'come to here')."
      },
      {
        t: "I study English {{because}} I need it.",
        es: "Estudio inglés porque lo necesito.",
        pos: "conj",
        gram: "'because' (porque) introduce la RAZÓN de algo y va seguido de sujeto + verbo (una oración completa): 'because it was cold'. No confundir con 'because of' + sustantivo."
      },
      {
        t: "Call me {{when}} you arrive.",
        es: "Llámame cuando llegues.",
        pos: "conj",
        gram: "'when' (cuando) es una conjunción de tiempo que conecta dos acciones relacionadas en el tiempo: 'when I arrived, she was sleeping'."
      },
      {
        t: "I like tea, {{but}} I prefer coffee.",
        es: "Me gusta el té, pero prefiero el café.",
        pos: "conj",
        gram: "'but' (pero) es una conjunción de CONTRASTE: conecta dos ideas opuestas dentro de la misma oración ('I like it, but it's expensive')."
      },
      {
        t: "We talk {{about}} everything.",
        es: "Hablamos de todo.",
        pos: "prep",
        gram: "'about' (sobre/acerca de) introduce el TEMA del que se habla: 'talk about', 'a book about...'. También puede significar 'aproximadamente'."
      },
      {
        t: "This gift is {{for}} you.",
        es: "Este regalo es para ti.",
        pos: "prep",
        gram: "'for' (para/por/durante) es una de las preposiciones más versátiles: propósito ('a gift for you'), duración ('for two hours') o razón."
      },
      {
        t: "He {{never}} eats meat.",
        es: "Él nunca come carne.",
        pos: "adv",
        gram: "'never' (nunca) es un adverbio de frecuencia que ya tiene sentido negativo: NO se usa junto con 'not' ('I never go', no 'I don't never go')."
      },
      {
        t: "I {{always}} wake up early.",
        es: "Siempre me despierto temprano.",
        pos: "adv",
        gram: "'always' (siempre) es un adverbio de FRECUENCIA: va antes del verbo principal ('I always eat...') pero después de 'to be' ('he is always late')."
      },
      {
        t: "Are you {{ready}} to go?",
        es: "¿Estás listo para ir?",
        pos: "adj",
        gram: "'ready' (listo/preparado) va con 'for' (algo) o 'to' + verbo: 'ready for the exam', 'ready to go'."
      },
      {
        t: "I want to {{learn}} English.",
        es: "Quiero aprender inglés.",
        pos: "v",
        gram: "'learn' es la forma base (infinitivo sin 'to') de 'to learn' (aprender). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Life}} is beautiful.",
        es: "La vida es hermosa.",
        pos: "n",
        gram: "'life' (vida) tiene un plural IRREGULAR: 'lives' (la 'f' cambia a 'v' antes de '-es'), igual que 'knife → knives' o 'wife → wives'."
      },
      {
        t: "I have no {{money}} this month.",
        es: "No tengo dinero este mes.",
        pos: "n",
        gram: "'money' (dinero) es INCONTABLE en inglés — a diferencia del español, nunca se dice 'moneys' ni 'a money'."
      },
      {
        t: "Tell me the {{truth}}.",
        es: "Dime la verdad.",
        pos: "n",
        gram: "'truth' (verdad) puede ser incontable ('the truth' en general) o contable cuando se habla de verdades concretas: 'a truth', 'truths'."
      },
      {
        t: "I {{am}} immortal.",
        es: "Soy inmortal.",
        pos: "v",
        gram: "'am' es la forma de 'to be' (ser/estar) en presente para la primera persona singular: 'I am'. Es irregular — no existe 'I be'."
      },
      {
        t: "I {{am}} attractive.",
        es: "Yo soy majo.",
        pos: "v",
        gram: "'am' es la forma de 'to be' (ser/estar) en presente para la primera persona singular: 'I am'. Es irregular — no existe 'I be'."
      },
      {
        t: "{{Am}} I taller?",
        es: "¿Soy más alto?",
        pos: "v",
        gram: "'am' es la forma de 'to be' (ser/estar) en presente para la primera persona singular: 'I am'. Es irregular — no existe 'I be'."
      },
      {
        t: "{{My}} condolences!",
        es: "Mi más sentido pésame.",
        pos: "pron",
        gram: "'my' (mi/mis) es un adjetivo POSESIVO: siempre va antes de un sustantivo ('my house') y nunca cambia con el plural ('my houses', no 'mys')."
      },
      {
        t: "{{My}} brothers!",
        es: "¡Hermanos míos!",
        pos: "pron",
        gram: "'my' (mi/mis) es un adjetivo POSESIVO: siempre va antes de un sustantivo ('my house') y nunca cambia con el plural ('my houses', no 'mys')."
      },
      {
        t: "{{My}} heart beats.",
        es: "Me late el corazón.",
        pos: "pron",
        gram: "'my' (mi/mis) es un adjetivo POSESIVO: siempre va antes de un sustantivo ('my house') y nunca cambia con el plural ('my houses', no 'mys')."
      },
      {
        t: "{{My}} pinky hurts.",
        es: "Me duele el meñique.",
        pos: "pron",
        gram: "'my' (mi/mis) es un adjetivo POSESIVO: siempre va antes de un sustantivo ('my house') y nunca cambia con el plural ('my houses', no 'mys')."
      },
      {
        t: "What {{are}} mammals?",
        es: "¿Qué son los mamíferos?",
        pos: "v",
        gram: "'are' es la forma de 'to be' (ser/estar) en presente para 'you/we/they'. Junto con 'am' e 'is', forma el verbo más irregular del inglés."
      },
      {
        t: "We {{are}} stardust.",
        es: "Somos polvo de estrellas.",
        pos: "v",
        gram: "'are' es la forma de 'to be' (ser/estar) en presente para 'you/we/they'. Junto con 'am' e 'is', forma el verbo más irregular del inglés."
      },
      {
        t: "People {{are}} people.",
        es: "La gente es gente.",
        pos: "v",
        gram: "'are' es la forma de 'to be' (ser/estar) en presente para 'you/we/they'. Junto con 'am' e 'is', forma el verbo más irregular del inglés."
      },
      {
        t: "Humans {{are}} vertebrates.",
        es: "Los humanos son vertebrados",
        pos: "v",
        gram: "'are' es la forma de 'to be' (ser/estar) en presente para 'you/we/they'. Junto con 'am' e 'is', forma el verbo más irregular del inglés."
      },
      {
        t: "This {{is}} paper.",
        es: "Esto es papel.",
        pos: "v",
        gram: "'is' es la forma de 'to be' (ser/estar) en presente para 'he/she/it' (tercera persona singular). Junto con 'am' y 'are', forma el verbo más irregular del inglés."
      },
      {
        t: "{{Is}} there another?",
        es: "¿Hay algún otro?",
        pos: "v",
        gram: "'is' es la forma de 'to be' (ser/estar) en presente para 'he/she/it' (tercera persona singular). Junto con 'am' y 'are', forma el verbo más irregular del inglés."
      },
      {
        t: "Coffee {{is}} everything.",
        es: "El café es todo.",
        pos: "v",
        gram: "'is' es la forma de 'to be' (ser/estar) en presente para 'he/she/it' (tercera persona singular). Junto con 'am' y 'are', forma el verbo más irregular del inglés."
      },
      {
        t: "Mary {{is}} indisposed.",
        es: "María está indispuesta.",
        pos: "v",
        gram: "'is' es la forma de 'to be' (ser/estar) en presente para 'he/she/it' (tercera persona singular). Junto con 'am' y 'are', forma el verbo más irregular del inglés."
      },
      {
        t: "I {{want}} privacy.",
        es: "Quiero privacidad.",
        pos: "v",
        gram: "'want' es la forma base (infinitivo sin 'to') de 'to want' (querer). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "I {{want}} juice.",
        es: "Quiero jugo.",
        pos: "v",
        gram: "'want' es la forma base (infinitivo sin 'to') de 'to want' (querer). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "I {{want}} trousers.",
        es: "Quiero pantalones.",
        pos: "v",
        gram: "'want' es la forma base (infinitivo sin 'to') de 'to want' (querer). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "We {{want}} beer!",
        es: "¡Queremos cerveza!",
        pos: "v",
        gram: "'want' es la forma base (infinitivo sin 'to') de 'to want' (querer). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "She {{has}} everything.",
        es: "Tiene todo.",
        pos: "v",
        gram: "'has' es la forma de 'to have' (tener) en presente para 'he/she/it' (tercera persona singular) — la única forma irregular de 'have' en presente simple."
      },
      {
        t: "She {{has}} kids.",
        es: "Ella tiene hijos.",
        pos: "v",
        gram: "'has' es la forma de 'to have' (tener) en presente para 'he/she/it' (tercera persona singular) — la única forma irregular de 'have' en presente simple."
      },
      {
        t: "It {{has}} water.",
        es: "Tiene agua.",
        pos: "v",
        gram: "'has' es la forma de 'to have' (tener) en presente para 'he/she/it' (tercera persona singular) — la única forma irregular de 'have' en presente simple."
      },
      {
        t: "He {{has}} water.",
        es: "Tiene agua.",
        pos: "v",
        gram: "'has' es la forma de 'to have' (tener) en presente para 'he/she/it' (tercera persona singular) — la única forma irregular de 'have' en presente simple."
      },
      {
        t: "I {{like}} pears.",
        es: "Me gustan las peras.",
        pos: "v",
        gram: "'like' es la forma base (infinitivo sin 'to') de 'to like' (gustar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "You {{like}} dancing.",
        es: "Te gusta bailar.",
        pos: "v",
        gram: "'like' es la forma base (infinitivo sin 'to') de 'to like' (gustar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "I {{like}} resting.",
        es: "Me gusta descansar.",
        pos: "v",
        gram: "'like' es la forma base (infinitivo sin 'to') de 'to like' (gustar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "People {{like}} music.",
        es: "A la gente le gusta la música.",
        pos: "v",
        gram: "'like' es la forma base (infinitivo sin 'to') de 'to like' (gustar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Go}} downstairs.",
        es: "Ve abajo.",
        pos: "v",
        gram: "'go' es la forma base (infinitivo sin 'to') de 'to go' (ir). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Go}} straight.",
        es: "Ve recto.",
        pos: "v",
        gram: "'go' es la forma base (infinitivo sin 'to') de 'to go' (ir). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Know}} thyself!",
        es: "¡Conócete a ti mismo!",
        pos: "v",
        gram: "'know' es la forma base (infinitivo sin 'to') de 'to know' (saber / conocer). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "I {{see}} nothing.",
        es: "No veo nada.",
        pos: "v",
        gram: "'see' es la forma base (infinitivo sin 'to') de 'to see' (ver). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{See}} you tomorrow?",
        es: "¿Nos vemos mañana?",
        pos: "v",
        gram: "'see' es la forma base (infinitivo sin 'to') de 'to see' (ver). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{See}} you Monday.",
        es: "Te veo el lunes.",
        pos: "v",
        gram: "'see' es la forma base (infinitivo sin 'to') de 'to see' (ver). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "I {{see}} someone.",
        es: "Veo a alguien.",
        pos: "v",
        gram: "'see' es la forma base (infinitivo sin 'to') de 'to see' (ver). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Think}} again.",
        es: "Piensa de nuevo.",
        pos: "v",
        gram: "'think' es la forma base (infinitivo sin 'to') de 'to think' (pensar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Artists {{think}} creatively.",
        es: "Los artistas piensan creativamente.",
        pos: "v",
        gram: "'think' es la forma base (infinitivo sin 'to') de 'to think' (pensar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Think}} about me.",
        es: "Piensa en mí.",
        pos: "v",
        gram: "'think' es la forma base (infinitivo sin 'to') de 'to think' (pensar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Let me {{think}}!",
        es: "¡Déjame pensar!",
        pos: "v",
        gram: "'think' es la forma base (infinitivo sin 'to') de 'to think' (pensar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Come}} calmly.",
        es: "Ven con tranquilidad.",
        pos: "v",
        gram: "'come' es la forma base (infinitivo sin 'to') de 'to come' (venir). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Come}} together.",
        es: "Vengan ambos.",
        pos: "v",
        gram: "'come' es la forma base (infinitivo sin 'to') de 'to come' (venir). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Come}} anytime.",
        es: "Ven cuando quieras.",
        pos: "v",
        gram: "'come' es la forma base (infinitivo sin 'to') de 'to come' (venir). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Time}} stopped.",
        es: "El tiempo se detuvo.",
        pos: "n",
        gram: "'time' (tiempo) es normalmente INCONTABLE ('time flies'), pero se vuelve contable cuando significa 'una vez/ocasión': 'three times' (tres veces)."
      },
      {
        t: "{{Time}} is gold.",
        es: "El tiempo es oro.",
        pos: "n",
        gram: "'time' (tiempo) es normalmente INCONTABLE ('time flies'), pero se vuelve contable cuando significa 'una vez/ocasión': 'three times' (tres veces)."
      },
      {
        t: "{{Good}} riddance.",
        es: "Hasta nunca.",
        pos: "adj",
        gram: "'good' (bueno) tiene comparativo y superlativo IRREGULARES: good → better → best (no se dice 'gooder' ni 'goodest')."
      },
      {
        t: "{{Good}} choice!",
        es: "¡Buena elección!",
        pos: "adj",
        gram: "'good' (bueno) tiene comparativo y superlativo IRREGULARES: good → better → best (no se dice 'gooder' ni 'goodest')."
      },
      {
        t: "{{Small}} world.",
        es: "El mundo es un pañuelo.",
        pos: "adj",
        gram: "'small' (pequeño) es un adjetivo regular; comparativo 'smaller', superlativo 'smallest' — adjetivo corto, se agrega '-er/-est' directamente."
      },
      {
        t: "You're {{small}}.",
        es: "Eres pequeño.",
        pos: "adj",
        gram: "'small' (pequeño) es un adjetivo regular; comparativo 'smaller', superlativo 'smallest' — adjetivo corto, se agrega '-er/-est' directamente."
      },
      {
        t: "Tom is {{small}}.",
        es: "Tom es pequeño.",
        pos: "adj",
        gram: "'small' (pequeño) es un adjetivo regular; comparativo 'smaller', superlativo 'smallest' — adjetivo corto, se agrega '-er/-est' directamente."
      },
      {
        t: "They're {{small}}.",
        es: "Son pequeños.",
        pos: "adj",
        gram: "'small' (pequeño) es un adjetivo regular; comparativo 'smaller', superlativo 'smallest' — adjetivo corto, se agrega '-er/-est' directamente."
      },
      {
        t: "{{People}} change.",
        es: "La gente cambia.",
        pos: "n",
        gram: "'people' (personas/gente) es el plural IRREGULAR de 'person' — no se dice 'persons' en el uso normal. Se comporta como un sustantivo plural: 'people are...', nunca 'people is...'."
      },
      {
        t: "Parents are {{people}}.",
        es: "Los padres son gente.",
        pos: "n",
        gram: "'people' (personas/gente) es el plural IRREGULAR de 'person' — no se dice 'persons' en el uso normal. Se comporta como un sustantivo plural: 'people are...', nunca 'people is...'."
      },
      {
        t: "Tom hates {{people}}.",
        es: "Tom odia a la gente.",
        pos: "n",
        gram: "'people' (personas/gente) es el plural IRREGULAR de 'person' — no se dice 'persons' en el uso normal. Se comporta como un sustantivo plural: 'people are...', nunca 'people is...'."
      },
      {
        t: "We're {{people}}.",
        es: "Somos personas.",
        pos: "n",
        gram: "'people' (personas/gente) es el plural IRREGULAR de 'person' — no se dice 'persons' en el uso normal. Se comporta como un sustantivo plural: 'people are...', nunca 'people is...'."
      },
      {
        t: "{{Work}} liberates.",
        es: "El trabajo libera.",
        pos: "v",
        gram: "'work' es la forma base (infinitivo sin 'to') de 'to work' (trabajar / funcionar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Work}} slowly.",
        es: "Trabajad lentamente.",
        pos: "v",
        gram: "'work' es la forma base (infinitivo sin 'to') de 'to work' (trabajar / funcionar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "I must {{work}}.",
        es: "Tengo que trabajar.",
        pos: "v",
        gram: "'work' es la forma base (infinitivo sin 'to') de 'to work' (trabajar / funcionar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "The parents {{work}}.",
        es: "Los padres trabajan.",
        pos: "v",
        gram: "'work' es la forma base (infinitivo sin 'to') de 'to work' (trabajar / funcionar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Give}} examples.",
        es: "Dé ejemplos.",
        pos: "v",
        gram: "'give' es la forma base (infinitivo sin 'to') de 'to give' (dar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "I {{give}} knowledge.",
        es: "Doy conocimiento.",
        pos: "v",
        gram: "'give' es la forma base (infinitivo sin 'to') de 'to give' (dar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Give}} me yours!",
        es: "¡Dame el tuyo!",
        pos: "v",
        gram: "'give' es la forma base (infinitivo sin 'to') de 'to give' (dar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Give}} me water.",
        es: "Dame agua.",
        pos: "v",
        gram: "'give' es la forma base (infinitivo sin 'to') de 'to give' (dar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Find}} the books.",
        es: "Encuentra los libros.",
        pos: "v",
        gram: "'find' es la forma base (infinitivo sin 'to') de 'to find' (encontrar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Some {{find}} fireworks beautiful.",
        es: "A algunos les parecen hermosos los fuegos artificiales.",
        pos: "v",
        gram: "'find' es la forma base (infinitivo sin 'to') de 'to find' (encontrar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Please {{find}} Tom.",
        es: "Por favor, encuentra a Tom.",
        pos: "v",
        gram: "'find' es la forma base (infinitivo sin 'to') de 'to find' (encontrar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Go {{find}} out.",
        es: "Ve y descúbrelo.",
        pos: "v",
        gram: "'find' es la forma base (infinitivo sin 'to') de 'to find' (encontrar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Fine. {{Where}}?",
        es: "Genial. ¿Dónde?",
        pos: "adv",
        gram: "'where' (dónde) es un adverbio interrogativo (y también conjunción) usado para preguntar o hablar de lugar: 'Where do you live?'."
      },
      {
        t: "{{Where}} is Ziri?",
        es: "¿Dónde está Ziri?",
        pos: "adv",
        gram: "'where' (dónde) es un adverbio interrogativo (y también conjunción) usado para preguntar o hablar de lugar: 'Where do you live?'."
      },
      {
        t: "{{Where}} is Samuel?",
        es: "¿Dónde está Samuel?",
        pos: "adv",
        gram: "'where' (dónde) es un adverbio interrogativo (y también conjunción) usado para preguntar o hablar de lugar: 'Where do you live?'."
      },
      {
        t: "{{Where}}'s Kabylia?",
        es: "¿Dónde está Cabilia?",
        pos: "adv",
        gram: "'where' (dónde) es un adverbio interrogativo (y también conjunción) usado para preguntar o hablar de lugar: 'Where do you live?'."
      },
      {
        t: "{{Every}} detail matters.",
        es: "Cada detalle cuenta.",
        pos: "adj",
        gram: "'every' (cada/todo) es un cuantificador que SIEMPRE va con sustantivo singular y verbo en singular: 'every day', 'every student has...' (nunca 'every students')."
      },
      {
        t: "{{Every}} word counts.",
        es: "Cada palabra cuenta.",
        pos: "adj",
        gram: "'every' (cada/todo) es un cuantificador que SIEMPRE va con sustantivo singular y verbo en singular: 'every day', 'every student has...' (nunca 'every students')."
      },
      {
        t: "{{Every}} minute counts.",
        es: "Cada minuto cuenta.",
        pos: "adj",
        gram: "'every' (cada/todo) es un cuantificador que SIEMPRE va con sustantivo singular y verbo en singular: 'every day', 'every student has...' (nunca 'every students')."
      },
      {
        t: "{{Every}} person counts.",
        es: "Cada persona cuenta.",
        pos: "adj",
        gram: "'every' (cada/todo) es un cuantificador que SIEMPRE va con sustantivo singular y verbo en singular: 'every day', 'every student has...' (nunca 'every students')."
      },
      {
        t: "He {{tells}} himself.",
        es: "Él se dice a sí mismo.",
        pos: "v",
        gram: "'tells' es la forma de tercera persona singular (he/she/it) de 'to tell' (decir / contar) en presente simple: se agrega '-s' (o '-es') a la base."
      },
      {
        t: "{{Ask}} yourselves.",
        es: "Preguntáoslo.",
        pos: "v",
        gram: "'ask' es la forma base (infinitivo sin 'to') de 'to ask' (preguntar / pedir). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Ask}} politely.",
        es: "Kibarca sor.",
        pos: "v",
        gram: "'ask' es la forma base (infinitivo sin 'to') de 'to ask' (preguntar / pedir). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Ask}} anything.",
        es: "Pregunta cualquier cosa.",
        pos: "v",
        gram: "'ask' es la forma base (infinitivo sin 'to') de 'to ask' (preguntar / pedir). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Ask}} anybody.",
        es: "Pregúntale a cualquiera.",
        pos: "v",
        gram: "'ask' es la forma base (infinitivo sin 'to') de 'to ask' (preguntar / pedir). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{In}} what sense?",
        es: "¿En qué sentido?",
        pos: "prep",
        gram: "'in' se usa para espacios delimitados (in a room), meses/años/estaciones (in July, in 2024) y periodos largos de tiempo — distinto de 'on' (días) y 'at' (horas puntuales)."
      },
      {
        t: "Go {{in}}, Gerard.",
        es: "Entre, Gerardo.",
        pos: "prep",
        gram: "'in' se usa para espacios delimitados (in a room), meses/años/estaciones (in July, in 2024) y periodos largos de tiempo — distinto de 'on' (días) y 'at' (horas puntuales)."
      },
      {
        t: "{{Eat}} healthily.",
        es: "Come sano.",
        pos: "v",
        gram: "'eat' es la forma base (infinitivo sin 'to') de 'to eat' (comer). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Look}} forward.",
        es: "Mire al frente.",
        pos: "v",
        gram: "'look' es la forma base (infinitivo sin 'to') de 'to look' (mirar / parecer). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Feel}} better.",
        es: "Mejórate.",
        pos: "v",
        gram: "'feel' es la forma base (infinitivo sin 'to') de 'to feel' (sentir). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "I {{feel}} sexy.",
        es: "Me siento sexy.",
        pos: "v",
        gram: "'feel' es la forma base (infinitivo sin 'to') de 'to feel' (sentir). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "I {{feel}} poorly.",
        es: "Me siento mal.",
        pos: "v",
        gram: "'feel' es la forma base (infinitivo sin 'to') de 'to feel' (sentir). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "I {{feel}} drowsy.",
        es: "Me siento adormilado.",
        pos: "v",
        gram: "'feel' es la forma base (infinitivo sin 'to') de 'to feel' (sentir). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Say}} goodbye.",
        es: "Decí adiós.",
        pos: "v",
        gram: "'say' es la forma base (infinitivo sin 'to') de 'to say' (decir). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Say}} nothing.",
        es: "No digas nada.",
        pos: "v",
        gram: "'say' es la forma base (infinitivo sin 'to') de 'to say' (decir). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Say}} something.",
        es: "¡Di algo!",
        pos: "v",
        gram: "'say' es la forma base (infinitivo sin 'to') de 'to say' (decir). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Say}} something!",
        es: "¡Di algo!",
        pos: "v",
        gram: "'say' es la forma base (infinitivo sin 'to') de 'to say' (decir). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Call}} security!",
        es: "¡Llama a seguridad!",
        pos: "v",
        gram: "'call' es la forma base (infinitivo sin 'to') de 'to call' (llamar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Call}} Ishmael.",
        es: "Llama a Ismael.",
        pos: "v",
        gram: "'call' es la forma base (infinitivo sin 'to') de 'to call' (llamar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Call}} Scotland Yard.",
        es: "Llama a Scotland Yard.",
        pos: "v",
        gram: "'call' es la forma base (infinitivo sin 'to') de 'to call' (llamar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Call}} a taxi.",
        es: "¡Pide un taxi!",
        pos: "v",
        gram: "'call' es la forma base (infinitivo sin 'to') de 'to call' (llamar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Do}} something.",
        es: "Haz algo.",
        pos: "v",
        gram: "'do' es la forma base (infinitivo sin 'to') de 'to do' (hacer). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Do}} something!",
        es: "¡Haz algo!",
        pos: "v",
        gram: "'do' es la forma base (infinitivo sin 'to') de 'to do' (hacer). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Do}} flies sleep?",
        es: "¿Las moscas duermen?",
        pos: "v",
        gram: "'do' es la forma base (infinitivo sin 'to') de 'to do' (hacer). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Do}} chairs exist?",
        es: "¿Existen las sillas?",
        pos: "v",
        gram: "'do' es la forma base (infinitivo sin 'to') de 'to do' (hacer). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Makes}} sense.",
        es: "Tiene sentido.",
        pos: "v",
        gram: "'makes' es la forma de tercera persona singular (he/she/it) de 'to make' (hacer / fabricar) en presente simple: se agrega '-s' (o '-es') a la base."
      },
      {
        t: "{{Leave}} already.",
        es: "Sal ya.",
        pos: "v",
        gram: "'leave' es la forma base (infinitivo sin 'to') de 'to leave' (irse / dejar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Leave}} everything.",
        es: "Déjalo todo.",
        pos: "v",
        gram: "'leave' es la forma base (infinitivo sin 'to') de 'to leave' (irse / dejar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Leave}} tomorrow.",
        es: "Sal mañana.",
        pos: "v",
        gram: "'leave' es la forma base (infinitivo sin 'to') de 'to leave' (irse / dejar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Leave}} immediately!",
        es: "¡Vete inmediatamente!",
        pos: "v",
        gram: "'leave' es la forma base (infinitivo sin 'to') de 'to leave' (irse / dejar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{How}} ridiculous!",
        es: "¡Qué ridiculez!",
        pos: "adv",
        gram: "'how' (cómo) es un adverbio interrogativo, usado para preguntar por el modo, cantidad o estado: 'How are you?', 'How much...?'."
      },
      {
        t: "{{How}} insensitive!",
        es: "¡Qué falta de sensibilidad!",
        pos: "adv",
        gram: "'how' (cómo) es un adverbio interrogativo, usado para preguntar por el modo, cantidad o estado: 'How are you?', 'How much...?'."
      },
      {
        t: "{{How}} inconsiderate!",
        es: "¡Qué desconsiderado!",
        pos: "adv",
        gram: "'how' (cómo) es un adverbio interrogativo, usado para preguntar por el modo, cantidad o estado: 'How are you?', 'How much...?'."
      },
      {
        t: "{{How}} peaceful!",
        es: "¡Qué silencio!",
        pos: "adv",
        gram: "'how' (cómo) es un adverbio interrogativo, usado para preguntar por el modo, cantidad o estado: 'How are you?', 'How much...?'."
      },
      {
        t: "Ladies {{first}}!",
        es: "¡Las damas primero!",
        pos: "adj",
        gram: "'first' (primero) es un número ORDINAL, no cardinal ('one'). Los ordinales indican orden/posición: first, second, third…"
      },
      {
        t: "Gentlemen {{first}}.",
        es: "Caballeros primero.",
        pos: "adj",
        gram: "'first' (primero) es un número ORDINAL, no cardinal ('one'). Los ordinales indican orden/posición: first, second, third…"
      },
      {
        t: "Ladies {{first}}.",
        es: "Las damas primero.",
        pos: "adj",
        gram: "'first' (primero) es un número ORDINAL, no cardinal ('one'). Los ordinales indican orden/posición: first, second, third…"
      },
      {
        t: "Tom shot {{first}}.",
        es: "Tom disparó primero.",
        pos: "adj",
        gram: "'first' (primero) es un número ORDINAL, no cardinal ('one'). Los ordinales indican orden/posición: first, second, third…"
      },
      {
        t: "They are {{old}}.",
        es: "Son ancianos.",
        pos: "adj",
        gram: "'old' (viejo) es un adjetivo regular; comparativo 'older', superlativo 'oldest' (adjetivo corto, se agrega '-er/-est')."
      },
      {
        t: "Tom was {{old}}.",
        es: "Tomás era mayor.",
        pos: "adj",
        gram: "'old' (viejo) es un adjetivo regular; comparativo 'older', superlativo 'oldest' (adjetivo corto, se agrega '-er/-est')."
      },
      {
        t: "Tom looks {{old}}.",
        es: "Tom se ve viejo.",
        pos: "adj",
        gram: "'old' (viejo) es un adjetivo regular; comparativo 'older', superlativo 'oldest' (adjetivo corto, se agrega '-er/-est')."
      },
      {
        t: "They're {{old}}.",
        es: "Son viejos.",
        pos: "adj",
        gram: "'old' (viejo) es un adjetivo regular; comparativo 'older', superlativo 'oldest' (adjetivo corto, se agrega '-er/-est')."
      },
      {
        t: "Nothing {{new}}.",
        es: "Nada nuevo.",
        pos: "adj",
        gram: "'new' (nuevo) es un adjetivo regular; su comparativo es 'newer' y superlativo 'newest', siguiendo la regla simple de agregar '-er/-est' a adjetivos de una sílaba."
      },
      {
        t: "Anything {{new}}?",
        es: "¿Nada nuevo?",
        pos: "adj",
        gram: "'new' (nuevo) es un adjetivo regular; su comparativo es 'newer' y superlativo 'newest', siguiendo la regla simple de agregar '-er/-est' a adjetivos de una sílaba."
      },
      {
        t: "Add {{new}} sentences.",
        es: "Añade oraciones nuevas.",
        pos: "adj",
        gram: "'new' (nuevo) es un adjetivo regular; su comparativo es 'newer' y superlativo 'newest', siguiendo la regla simple de agregar '-er/-est' a adjetivos de una sílaba."
      },
      {
        t: "Add {{new}} sentences!",
        es: "¡Añade frases nuevas!",
        pos: "adj",
        gram: "'new' (nuevo) es un adjetivo regular; su comparativo es 'newer' y superlativo 'newest', siguiendo la regla simple de agregar '-er/-est' a adjetivos de una sílaba."
      },
      {
        t: "{{Here}}, catch!",
        es: "¡Ahí va! ¡Cógelo!",
        pos: "adv",
        gram: "'here' (aquí) es un adverbio de LUGAR; se usa sin preposición ('come here', no 'come to here')."
      },
      {
        t: "\"Why?\" \"Just {{because}}.\"",
        es: "\"¿Por qué?\" \"Porque sí.\"",
        pos: "conj",
        gram: "'because' (porque) introduce la RAZÓN de algo y va seguido de sujeto + verbo (una oración completa): 'because it was cold'. No confundir con 'because of' + sustantivo."
      },
      {
        t: "{{Because}} I deserve it.",
        es: "Porque yo me lo merezco.",
        pos: "conj",
        gram: "'because' (porque) introduce la RAZÓN de algo y va seguido de sujeto + verbo (una oración completa): 'because it was cold'. No confundir con 'because of' + sustantivo."
      },
      {
        t: "{{Because}} you want it.",
        es: "Porque lo quieres.",
        pos: "conj",
        gram: "'because' (porque) introduce la RAZÓN de algo y va seguido de sujeto + verbo (una oración completa): 'because it was cold'. No confundir con 'because of' + sustantivo."
      },
      {
        t: "{{Because}} you sell it.",
        es: "Porque lo vendes.",
        pos: "conj",
        gram: "'because' (porque) introduce la RAZÓN de algo y va seguido de sujeto + verbo (una oración completa): 'because it was cold'. No confundir con 'because of' + sustantivo."
      },
      {
        t: "\"{{When}}?\" \"Never.\"",
        es: "\"¿Cuándo?\" \"Nunca.\"",
        pos: "conj",
        gram: "'when' (cuando) es una conjunción de tiempo que conecta dos acciones relacionadas en el tiempo: 'when I arrived, she was sleeping'."
      },
      {
        t: "{{When}} is dinner?",
        es: "¿Cuándo es la cena?",
        pos: "conj",
        gram: "'when' (cuando) es una conjunción de tiempo que conecta dos acciones relacionadas en el tiempo: 'when I arrived, she was sleeping'."
      },
      {
        t: "{{When}} pigs fly.",
        es: "Cuando las ranas críen pelo.",
        pos: "conj",
        gram: "'when' (cuando) es una conjunción de tiempo que conecta dos acciones relacionadas en el tiempo: 'when I arrived, she was sleeping'."
      },
      {
        t: "{{When}} is Halloween?",
        es: "¿Cuándo es Halloween?",
        pos: "conj",
        gram: "'when' (cuando) es una conjunción de tiempo que conecta dos acciones relacionadas en el tiempo: 'when I arrived, she was sleeping'."
      },
      {
        t: "Thanks, {{but}} no.",
        es: "Gracias, pero no.",
        pos: "conj",
        gram: "'but' (pero) es una conjunción de CONTRASTE: conecta dos ideas opuestas dentro de la misma oración ('I like it, but it's expensive')."
      },
      {
        t: "{{But}}, what happened?",
        es: "Pero, ¿qué ha pasado?",
        pos: "conj",
        gram: "'but' (pero) es una conjunción de CONTRASTE: conecta dos ideas opuestas dentro de la misma oración ('I like it, but it's expensive')."
      },
      {
        t: "{{But}} I love you!",
        es: "¡Pero te quiero!",
        pos: "conj",
        gram: "'but' (pero) es una conjunción de CONTRASTE: conecta dos ideas opuestas dentro de la misma oración ('I like it, but it's expensive')."
      },
      {
        t: "{{But}} it's huge!",
        es: "¡Pero es enorme!",
        pos: "conj",
        gram: "'but' (pero) es una conjunción de CONTRASTE: conecta dos ideas opuestas dentro de la misma oración ('I like it, but it's expensive')."
      },
      {
        t: "How {{about}} today?",
        es: "¿Qué tal hoy?",
        pos: "prep",
        gram: "'about' (sobre/acerca de) introduce el TEMA del que se habla: 'talk about', 'a book about...'. También puede significar 'aproximadamente'."
      },
      {
        t: "What {{about}} today?",
        es: "¿Qué tal hoy?",
        pos: "prep",
        gram: "'about' (sobre/acerca de) introduce el TEMA del que se habla: 'talk about', 'a book about...'. También puede significar 'aproximadamente'."
      },
      {
        t: "How {{about}} it?",
        es: "¿Qué te parece?",
        pos: "prep",
        gram: "'about' (sobre/acerca de) introduce el TEMA del que se habla: 'talk about', 'a book about...'. También puede significar 'aproximadamente'."
      },
      {
        t: "What {{about}} Portugal?",
        es: "¿Y Portugal?",
        pos: "prep",
        gram: "'about' (sobre/acerca de) introduce el TEMA del que se habla: 'talk about', 'a book about...'. También puede significar 'aproximadamente'."
      },
      {
        t: "{{For}} your consideration.",
        es: "Para su consideración.",
        pos: "prep",
        gram: "'for' (para/por/durante) es una de las preposiciones más versátiles: propósito ('a gift for you'), duración ('for two hours') o razón."
      },
      {
        t: "Thanks {{for}} everything!",
        es: "¡Gracias por todo!",
        pos: "prep",
        gram: "'for' (para/por/durante) es una de las preposiciones más versátiles: propósito ('a gift for you'), duración ('for two hours') o razón."
      },
      {
        t: "Vote {{for}} Cthulhu.",
        es: "Vota por Cthulhu.",
        pos: "prep",
        gram: "'for' (para/por/durante) es una de las preposiciones más versátiles: propósito ('a gift for you'), duración ('for two hours') o razón."
      },
      {
        t: "Call {{for}} reinforcements.",
        es: "Pedid refuerzos.",
        pos: "prep",
        gram: "'for' (para/por/durante) es una de las preposiciones más versátiles: propósito ('a gift for you'), duración ('for two hours') o razón."
      },
      {
        t: "{{Never}} doubt!",
        es: "¡Nunca dude!",
        pos: "adv",
        gram: "'never' (nunca) es un adverbio de frecuencia que ya tiene sentido negativo: NO se usa junto con 'not' ('I never go', no 'I don't never go')."
      },
      {
        t: "{{Never}} again.",
        es: "Nunca más.",
        pos: "adv",
        gram: "'never' (nunca) es un adverbio de frecuencia que ya tiene sentido negativo: NO se usa junto con 'not' ('I never go', no 'I don't never go')."
      },
      {
        t: "{{Never}} stop improvising.",
        es: "No dejes nunca de improvisar.",
        pos: "adv",
        gram: "'never' (nunca) es un adverbio de frecuencia que ya tiene sentido negativo: NO se usa junto con 'not' ('I never go', no 'I don't never go')."
      },
      {
        t: "{{Never}} stop learning.",
        es: "Nunca dejes de aprender.",
        pos: "adv",
        gram: "'never' (nunca) es un adverbio de frecuencia que ya tiene sentido negativo: NO se usa junto con 'not' ('I never go', no 'I don't never go')."
      },
      {
        t: "Almost {{always}}.",
        es: "Casi siempre.",
        pos: "adv",
        gram: "'always' (siempre) es un adverbio de FRECUENCIA: va antes del verbo principal ('I always eat...') pero después de 'to be' ('he is always late')."
      },
      {
        t: "{{Always}} be frank.",
        es: "Sé siempre franco.",
        pos: "adv",
        gram: "'always' (siempre) es un adverbio de FRECUENCIA: va antes del verbo principal ('I always eat...') pero después de 'to be' ('he is always late')."
      },
      {
        t: "They {{always}} fight.",
        es: "Ellos pelean siempre.",
        pos: "adv",
        gram: "'always' (siempre) es un adverbio de FRECUENCIA: va antes del verbo principal ('I always eat...') pero después de 'to be' ('he is always late')."
      },
      {
        t: "Truth {{always}} wins.",
        es: "La verdad siempre vence.",
        pos: "adv",
        gram: "'always' (siempre) es un adverbio de FRECUENCIA: va antes del verbo principal ('I always eat...') pero después de 'to be' ('he is always late')."
      },
      {
        t: "{{Ready}}, steady, go!",
        es: "¡En sus marcas, listos, ya!",
        pos: "adj",
        gram: "'ready' (listo/preparado) va con 'for' (algo) o 'to' + verbo: 'ready for the exam', 'ready to go'."
      },
      {
        t: "Carlos got {{ready}}.",
        es: "Carlos se preparó.",
        pos: "adj",
        gram: "'ready' (listo/preparado) va con 'for' (algo) o 'to' + verbo: 'ready for the exam', 'ready to go'."
      },
      {
        t: "She's {{ready}}.",
        es: "Está lista.",
        pos: "adj",
        gram: "'ready' (listo/preparado) va con 'for' (algo) o 'to' + verbo: 'ready for the exam', 'ready to go'."
      },
      {
        t: "He is {{ready}}.",
        es: "Está listo.",
        pos: "adj",
        gram: "'ready' (listo/preparado) va con 'for' (algo) o 'to' + verbo: 'ready for the exam', 'ready to go'."
      },
      {
        t: "{{Learn}} English.",
        es: "Aprende inglés.",
        pos: "v",
        gram: "'learn' es la forma base (infinitivo sin 'to') de 'to learn' (aprender). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Learn}} French!",
        es: "¡Aprende francés!",
        pos: "v",
        gram: "'learn' es la forma base (infinitivo sin 'to') de 'to learn' (aprender). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Learn}} Hungarian.",
        es: "Aprended húngaro.",
        pos: "v",
        gram: "'learn' es la forma base (infinitivo sin 'to') de 'to learn' (aprender). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Learn}} French.",
        es: "¡Aprende francés!",
        pos: "v",
        gram: "'learn' es la forma base (infinitivo sin 'to') de 'to learn' (aprender). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Choose {{life}}.",
        es: "Elige la vida.",
        pos: "n",
        gram: "'life' (vida) tiene un plural IRREGULAR: 'lives' (la 'f' cambia a 'v' antes de '-es'), igual que 'knife → knives' o 'wife → wives'."
      },
      {
        t: "{{Life}} is priceless.",
        es: "La vida no tiene precio.",
        pos: "n",
        gram: "'life' (vida) tiene un plural IRREGULAR: 'lives' (la 'f' cambia a 'v' antes de '-es'), igual que 'knife → knives' o 'wife → wives'."
      },
      {
        t: "Music is {{life}}.",
        es: "La música es vida.",
        pos: "n",
        gram: "'life' (vida) tiene un plural IRREGULAR: 'lives' (la 'f' cambia a 'v' antes de '-es'), igual que 'knife → knives' o 'wife → wives'."
      },
      {
        t: "{{Life}} is music.",
        es: "La vida es música.",
        pos: "n",
        gram: "'life' (vida) tiene un plural IRREGULAR: 'lives' (la 'f' cambia a 'v' antes de '-es'), igual que 'knife → knives' o 'wife → wives'."
      },
      {
        t: "Steal {{money}}.",
        es: "Roba dinero.",
        pos: "n",
        gram: "'money' (dinero) es INCONTABLE en inglés — a diferencia del español, nunca se dice 'moneys' ni 'a money'."
      },
      {
        t: "{{Money}} talks.",
        es: "El dinero mueve el mundo.",
        pos: "n",
        gram: "'money' (dinero) es INCONTABLE en inglés — a diferencia del español, nunca se dice 'moneys' ni 'a money'."
      },
      {
        t: "{{Money}} is nothing.",
        es: "El dinero no es nada.",
        pos: "n",
        gram: "'money' (dinero) es INCONTABLE en inglés — a diferencia del español, nunca se dice 'moneys' ni 'a money'."
      },
      {
        t: "This is {{money}}.",
        es: "Esto es dinero.",
        pos: "n",
        gram: "'money' (dinero) es INCONTABLE en inglés — a diferencia del español, nunca se dice 'moneys' ni 'a money'."
      },
      {
        t: "{{Truth}} matters.",
        es: "La verdad importa.",
        pos: "n",
        gram: "'truth' (verdad) puede ser incontable ('the truth' en general) o contable cuando se habla de verdades concretas: 'a truth', 'truths'."
      },
      {
        t: "{{Truth}} hurts.",
        es: "La verdad duele.",
        pos: "n",
        gram: "'truth' (verdad) puede ser incontable ('the truth' en general) o contable cuando se habla de verdades concretas: 'a truth', 'truths'."
      },
      {
        t: "{{Truth}} prevails.",
        es: "La verdad prevalece.",
        pos: "n",
        gram: "'truth' (verdad) puede ser incontable ('the truth' en general) o contable cuando se habla de verdades concretas: 'a truth', 'truths'."
      },
      {
        t: "{{Truth}} still matters.",
        es: "La verdad todavía importa.",
        pos: "n",
        gram: "'truth' (verdad) puede ser incontable ('the truth' en general) o contable cuando se habla de verdades concretas: 'a truth', 'truths'."
      }
    ]
  },
  {
    id: "ft2",
    name: "Fast Track 2 · Palabras 500–2000",
    desc: "Vocabulario del día a día: casa, viajes, comida, trabajo",
    icon: "🌿",
    sentences: [
      {
        t: "I {{wake}} up at six every day.",
        es: "Me despierto a las seis todos los días.",
        pos: "v",
        gram: "'wake' es la forma base (infinitivo sin 'to') de 'to wake' (despertar(se)). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "The {{weather}} is nice today.",
        es: "El clima está agradable hoy.",
        pos: "n",
        gram: "'weather' (clima/tiempo) es INCONTABLE: no lleva 's' ni 'a/an' ('the weather is nice', nunca 'a weather')."
      },
      {
        t: "She {{teaches}} math at a school.",
        es: "Ella enseña matemáticas en una escuela.",
        pos: "v",
        gram: "'teaches' es la forma de tercera persona singular (he/she/it) de 'to teach' (enseñar) en presente simple: se agrega '-s' (o '-es') a la base."
      },
      {
        t: "I {{lost}} my keys yesterday.",
        es: "Perdí mis llaves ayer.",
        pos: "v",
        gram: "'lost' es el pasado irregular de 'to lose' (perder). Pasado y participio son iguales: 'lost'. No confundir con el adjetivo 'lost' (perdido)."
      },
      {
        t: "We {{visited}} our grandparents last weekend.",
        es: "Visitamos a nuestros abuelos el fin de semana pasado.",
        pos: "v",
        gram: "'visited' es el pasado regular de 'to visit' (visitar): se agrega '-ed' a la base ('visit' → 'visited'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "The restaurant is very {{expensive}}.",
        es: "El restaurante es muy caro.",
        pos: "adj",
        gram: "'expensive' (caro) es un adjetivo de tres sílabas o más: su comparativo y superlativo se forman con 'more/most' ('more expensive'), no con '-er/-est'."
      },
      {
        t: "The train {{arrives}} at nine.",
        es: "El tren llega a las nueve.",
        pos: "v",
        gram: "'arrives' es la forma de tercera persona singular (he/she/it) de 'to arrive' (llegar) en presente simple: se agrega '-s' (o '-es') a la base."
      },
      {
        t: "Don't {{forget}} to bring your passport.",
        es: "No olvides traer tu pasaporte.",
        pos: "v",
        gram: "'forget' es la forma base (infinitivo sin 'to') de 'to forget' (olvidar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "I {{remember}} my first day of school.",
        es: "Recuerdo mi primer día de escuela.",
        pos: "v",
        gram: "'remember' es la forma base (infinitivo sin 'to') de 'to remember' (recordar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Can you {{lend}} me some money?",
        es: "¿Puedes prestarme dinero?",
        pos: "v",
        gram: "'lend' es la forma base (infinitivo sin 'to') de 'to lend' (prestar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "She {{borrowed}} my umbrella.",
        es: "Ella tomó prestado mi paraguas.",
        pos: "v",
        gram: "'borrowed' es el pasado regular de 'to borrow' (pedir prestado): se agrega '-ed' a la base ('borrow' → 'borrowed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "We {{stood}} in line for an hour.",
        es: "Hicimos fila durante una hora.",
        pos: "v",
        gram: "'stood' es el pasado irregular de 'to stand' (pararse / estar de pie). Cambia la vocal 'a' por 'oo' — mismo patrón que 'understand → understood'."
      },
      {
        t: "He {{missed}} his flight this morning.",
        es: "Él perdió su vuelo esta mañana.",
        pos: "v",
        gram: "'missed' es el pasado regular de 'to miss' (extrañar / perder (un evento, un tren)): se agrega '-ed' a la base ('miss' → 'missed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "I have to {{finish}} this report today.",
        es: "Tengo que terminar este informe hoy.",
        pos: "v",
        gram: "'finish' es la forma base (infinitivo sin 'to') de 'to finish' (terminar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "The movie was really {{boring}}.",
        es: "La película fue muy aburrida.",
        pos: "adj",
        gram: "'boring' (aburrido, que aburre) es un adjetivo terminado en '-ing': describe algo que CAUSA aburrimiento. Distinto de 'bored' (que SIENTE aburrimiento)."
      },
      {
        t: "That joke was very {{funny}}.",
        es: "Ese chiste fue muy gracioso.",
        pos: "adj",
        gram: "'funny' (gracioso) es un adjetivo regular; su comparativo es 'funnier' y superlativo 'funniest' (la 'y' cambia a 'i' antes de '-er/-est')."
      },
      {
        t: "My sister is {{married}} to a doctor.",
        es: "Mi hermana está casada con un médico.",
        pos: "adj",
        gram: "'married' (casado) es un adjetivo terminado en '-ed'; se usa con 'to': 'married to someone' (casado CON alguien, no 'with')."
      },
      {
        t: "We {{rented}} an apartment near the beach.",
        es: "Alquilamos un apartamento cerca de la playa.",
        pos: "v",
        gram: "'rented' es el pasado regular de 'to rent' (alquilar): se agrega '-ed' a la base ('rent' → 'rented'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "The soup {{tastes}} delicious.",
        es: "La sopa sabe deliciosa.",
        pos: "v",
        gram: "'tastes' es la forma de tercera persona singular (he/she/it) de 'to taste' (saber a / probar) en presente simple: se agrega '-s' (o '-es') a la base."
      },
      {
        t: "I {{ordered}} a pizza for dinner.",
        es: "Pedí una pizza para cenar.",
        pos: "v",
        gram: "'ordered' es el pasado regular de 'to order' (ordenar / pedir): se agrega '-ed' a la base ('order' → 'ordered'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "She {{wore}} a beautiful dress to the party.",
        es: "Ella llevó un vestido hermoso a la fiesta.",
        pos: "v",
        gram: "'wore' es el pasado irregular de 'to wear' (llevar puesto). No sigue la regla de '-ed' ('weared' no existe); hay que memorizar esta forma."
      },
      {
        t: "The store {{opens}} at ten.",
        es: "La tienda abre a las diez.",
        pos: "v",
        gram: "'opens' es la forma de tercera persona singular (he/she/it) de 'to open' (abrir) en presente simple: se agrega '-s' (o '-es') a la base."
      },
      {
        t: "He {{broke}} his leg playing soccer.",
        es: "Se rompió la pierna jugando fútbol.",
        pos: "v",
        gram: "'broke' es el pasado irregular de 'to break' (romper). Cambia la vocal 'ea' por 'o' — patrón parecido a 'speak → spoke'."
      },
      {
        t: "I need to {{practice}} my English more.",
        es: "Necesito practicar más mi inglés.",
        pos: "v",
        gram: "'practice' es la forma base (infinitivo sin 'to') de 'to practice' (practicar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "The bridge is very {{dangerous}} at night.",
        es: "El puente es muy peligroso de noche.",
        pos: "adj",
        gram: "'dangerous' (peligroso) es un adjetivo regular, formado con el sufijo '-ous' a partir de 'danger' (peligro, sustantivo)."
      },
      {
        t: "We took a lot of {{pictures}} on our trip.",
        es: "Tomamos muchas fotos en nuestro viaje.",
        pos: "n",
        gram: "'pictures' es el plural regular de 'picture' (foto/imagen): se agrega '-s'. Sustantivo contable normal."
      },
      {
        t: "The hotel room was {{dirty}}.",
        es: "La habitación del hotel estaba sucia.",
        pos: "adj",
        gram: "'dirty' (sucio) es un adjetivo regular; su comparativo es 'dirtier' y superlativo 'dirtiest' (la 'y' cambia a 'i' antes de '-er/-est')."
      },
      {
        t: "I {{spent}} all my money on books.",
        es: "Gasté todo mi dinero en libros.",
        pos: "v",
        gram: "'spent' es el pasado irregular de 'to spend' (gastar / pasar tiempo). Pasado y participio son iguales: 'spent'."
      },
      {
        t: "Please {{turn}} off the lights.",
        es: "Por favor, apaga las luces.",
        pos: "v",
        gram: "'turn' es la forma base (infinitivo sin 'to') de 'to turn' (girar / convertirse en). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "My neighbor is very {{noisy}}.",
        es: "Mi vecino es muy ruidoso.",
        pos: "adj",
        gram: "'noisy' (ruidoso) es un adjetivo regular formado con el sufijo '-y' a partir de 'noise' (ruido, sustantivo)."
      },
      {
        t: "They {{moved}} to another city.",
        es: "Se mudaron a otra ciudad.",
        pos: "v",
        gram: "'moved' es el pasado regular de 'to move' (mover(se) / mudarse): se agrega solo '-d' porque la base ya termina en 'e' ('move' → 'moved'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "I {{promise}} to call you every day.",
        es: "Prometo llamarte todos los días.",
        pos: "v",
        gram: "'promise' es la forma base (infinitivo sin 'to') de 'to promise' (prometer). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "The doctor gave me some {{medicine}}.",
        es: "El médico me dio un medicamento.",
        pos: "n",
        gram: "'medicine' (medicina, como sustancia) es INCONTABLE: no lleva 's' ni 'a/an'. Cuando significa 'la carrera de medicina' también es incontable."
      },
      {
        t: "We {{celebrated}} her birthday at home.",
        es: "Celebramos su cumpleaños en casa.",
        pos: "v",
        gram: "'celebrated' es el pasado regular de 'to celebrate' (celebrar): se agrega solo '-d' porque la base ya termina en 'e' ('celebrate' → 'celebrated'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "The exam was {{easier}} than I expected.",
        es: "El examen fue más fácil de lo que esperaba.",
        pos: "adj",
        gram: "'easier' es el comparativo de 'easy' (fácil): los adjetivos de dos sílabas terminados en 'y' forman el comparativo con '-er' y cambiando la 'y' por 'i' ('easy → easier'), no con 'more'."
      },
      {
        t: "He {{drives}} to work every day.",
        es: "Él conduce al trabajo todos los días.",
        pos: "v",
        gram: "'drives' es la forma de tercera persona singular (he/she/it) de 'to drive' (conducir) en presente simple: se agrega '-s' (o '-es') a la base."
      },
      {
        t: "I'm {{saving}} money for a new laptop.",
        es: "Estoy ahorrando dinero para una laptop nueva.",
        pos: "v",
        gram: "'saving' es el gerundio (participio presente) de 'to save' (ahorrar / guardar / salvar): se quita la 'e' final antes de '-ing' ('save' → 'saving'). Se usa en tiempos continuos ('is/are/was/were saving') o como sustantivo verbal."
      },
      {
        t: "The baby is {{crying}} again.",
        es: "El bebé está llorando otra vez.",
        pos: "v",
        gram: "'crying' es el gerundio (participio presente) de 'to cry' (llorar): se agrega '-ing' a la base ('cry' → 'crying'). Se usa en tiempos continuos ('is/are/was/were crying') o como sustantivo verbal."
      },
      {
        t: "She {{invited}} me to her wedding.",
        es: "Ella me invitó a su boda.",
        pos: "v",
        gram: "'invited' es el pasado regular de 'to invite' (invitar): se agrega solo '-d' porque la base ya termina en 'e' ('invite' → 'invited'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "The keys were {{inside}} the drawer.",
        es: "Las llaves estaban dentro del cajón.",
        pos: "prep",
        gram: "'inside' (dentro de) indica ubicación dentro de un espacio cerrado; es más específico que 'in' y enfatiza el interior."
      },
      {
        t: "I {{caught}} a cold last week.",
        es: "Me resfrié la semana pasada.",
        pos: "v",
        gram: "'caught' es el pasado irregular de 'to catch' (atrapar / alcanzar). Comparte el sonido final /ɔːt/ con 'taught', 'bought', 'brought' y 'thought'."
      },
      {
        t: "We {{climbed}} the mountain in four hours.",
        es: "Subimos la montaña en cuatro horas.",
        pos: "v",
        gram: "'climbed' es el pasado regular de 'to climb' (escalar / subir): se agrega '-ed' a la base ('climb' → 'climbed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "This road is {{narrow}} and dark.",
        es: "Este camino es angosto y oscuro.",
        pos: "adj",
        gram: "'narrow' (angosto, estrecho) es un adjetivo regular, opuesto de 'wide' (ancho)."
      },
      {
        t: "He {{fixed}} my computer in ten minutes.",
        es: "Él arregló mi computadora en diez minutos.",
        pos: "v",
        gram: "'fixed' es el pasado regular de 'to fix' (arreglar): se agrega '-ed' a la base ('fix' → 'fixed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "I fell {{asleep}} on the sofa.",
        es: "Me quedé dormido en el sofá.",
        pos: "adj",
        gram: "'asleep' (dormido) es un adjetivo que SOLO se usa después del verbo ('he is asleep', 'fall asleep'), nunca antes del sustantivo ('an asleep man' es incorrecto — se diría 'a sleeping man')."
      },
      {
        t: "The meeting {{lasted}} two hours.",
        es: "La reunión duró dos horas.",
        pos: "v",
        gram: "'lasted' es el pasado regular de 'to last' (durar): se agrega '-ed' a la base ('last' → 'lasted'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "She {{smiled}} at me.",
        es: "Ella me sonrió.",
        pos: "v",
        gram: "'smiled' es el pasado regular de 'to smile' (sonreír): se agrega solo '-d' porque la base ya termina en 'e' ('smile' → 'smiled'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "They {{built}} a new school in my neighborhood.",
        es: "Construyeron una escuela nueva en mi barrio.",
        pos: "v",
        gram: "'built' es el pasado irregular de 'to build' (construir). No sigue la regla de '-ed' ('builded' no existe); build-built-built no cambia entre pasado y participio."
      },
      {
        t: "I {{dropped}} my phone in the water.",
        es: "Se me cayó el teléfono al agua.",
        pos: "v",
        gram: "'dropped' es el pasado regular de 'to drop' (dejar caer): se dobla la consonante final antes de '-ed' porque la base termina en consonante-vocal-consonante ('drop' → 'dropped'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "The children are {{hiding}} behind the door.",
        es: "Los niños están escondidos detrás de la puerta.",
        pos: "v",
        gram: "'hiding' es el gerundio (participio presente) de 'to hide' (esconder): se quita la 'e' final antes de '-ing' ('hide' → 'hiding'). Se usa en tiempos continuos ('is/are/was/were hiding') o como sustantivo verbal."
      },
      {
        t: "{{Wake}} up, brothers!",
        es: "¡Despierten, hermanos!",
        pos: "v",
        gram: "'wake' es la forma base (infinitivo sin 'to') de 'to wake' (despertar(se)). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Wake}} up early.",
        es: "Levántense pronto.",
        pos: "v",
        gram: "'wake' es la forma base (infinitivo sin 'to') de 'to wake' (despertar(se)). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Luis, {{wake}} up.",
        es: "Luis, despiértate.",
        pos: "v",
        gram: "'wake' es la forma base (infinitivo sin 'to') de 'to wake' (despertar(se)). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Wake}} up, sheeple!",
        es: "¡Despierten, persovejas!",
        pos: "v",
        gram: "'wake' es la forma base (infinitivo sin 'to') de 'to wake' (despertar(se)). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "What {{weather}}!",
        es: "¡Qué tiempo!",
        pos: "n",
        gram: "'weather' (clima/tiempo) es INCONTABLE: no lleva 's' ni 'a/an' ('the weather is nice', nunca 'a weather')."
      },
      {
        t: "Mediterranean {{weather}} is mild.",
        es: "El clima mediterráneo es suave.",
        pos: "n",
        gram: "'weather' (clima/tiempo) es INCONTABLE: no lleva 's' ni 'a/an' ('the weather is nice', nunca 'a weather')."
      },
      {
        t: "What wonderful {{weather}}!",
        es: "¡Qué tiempo más fabuloso!",
        pos: "n",
        gram: "'weather' (clima/tiempo) es INCONTABLE: no lleva 's' ni 'a/an' ('the weather is nice', nunca 'a weather')."
      },
      {
        t: "What awful {{weather}}!",
        es: "¡Qué pésimo clima!",
        pos: "n",
        gram: "'weather' (clima/tiempo) es INCONTABLE: no lleva 's' ni 'a/an' ('the weather is nice', nunca 'a weather')."
      },
      {
        t: "Tom {{teaches}}.",
        es: "Tom enseña.",
        pos: "v",
        gram: "'teaches' es la forma de tercera persona singular (he/she/it) de 'to teach' (enseñar) en presente simple: se agrega '-s' (o '-es') a la base."
      },
      {
        t: "She {{teaches}} Dutch.",
        es: "Ella enseña holandés.",
        pos: "v",
        gram: "'teaches' es la forma de tercera persona singular (he/she/it) de 'to teach' (enseñar) en presente simple: se agrega '-s' (o '-es') a la base."
      },
      {
        t: "Esther {{teaches}} Hebrew.",
        es: "Ester enseña hebreo.",
        pos: "v",
        gram: "'teaches' es la forma de tercera persona singular (he/she/it) de 'to teach' (enseñar) en presente simple: se agrega '-s' (o '-es') a la base."
      },
      {
        t: "You {{lost}} them.",
        es: "Tú los perdiste.",
        pos: "v",
        gram: "'lost' es el pasado irregular de 'to lose' (perder). Pasado y participio son iguales: 'lost'. No confundir con el adjetivo 'lost' (perdido)."
      },
      {
        t: "They {{visited}} London.",
        es: "Ellas visitaron Londres.",
        pos: "v",
        gram: "'visited' es el pasado regular de 'to visit' (visitar): se agrega '-ed' a la base ('visit' → 'visited'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "I {{visited}} London.",
        es: "Visité Londres.",
        pos: "v",
        gram: "'visited' es el pasado regular de 'to visit' (visitar): se agrega '-ed' a la base ('visit' → 'visited'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "He {{visited}} London.",
        es: "Él visitó Londres.",
        pos: "v",
        gram: "'visited' es el pasado regular de 'to visit' (visitar): se agrega '-ed' a la base ('visit' → 'visited'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "She {{visited}} Boston.",
        es: "Ella visitó Boston.",
        pos: "v",
        gram: "'visited' es el pasado regular de 'to visit' (visitar): se agrega '-ed' a la base ('visit' → 'visited'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "How {{expensive}}!",
        es: "¡Qué caro!",
        pos: "adj",
        gram: "'expensive' (caro) es un adjetivo de tres sílabas o más: su comparativo y superlativo se forman con 'more/most' ('more expensive'), no con '-er/-est'."
      },
      {
        t: "Medicine is {{expensive}}.",
        es: "Los medicamentos son caros.",
        pos: "adj",
        gram: "'expensive' (caro) es un adjetivo de tres sílabas o más: su comparativo y superlativo se forman con 'more/most' ('more expensive'), no con '-er/-est'."
      },
      {
        t: "Sailing is {{expensive}}.",
        es: "Navegar es caro.",
        pos: "adj",
        gram: "'expensive' (caro) es un adjetivo de tres sílabas o más: su comparativo y superlativo se forman con 'more/most' ('more expensive'), no con '-er/-est'."
      },
      {
        t: "Planes are {{expensive}}.",
        es: "Los aviones son caros.",
        pos: "adj",
        gram: "'expensive' (caro) es un adjetivo de tres sílabas o más: su comparativo y superlativo se forman con 'more/most' ('more expensive'), no con '-er/-est'."
      },
      {
        t: "Death {{arrives}} uninvited.",
        es: "La muerte llega sin invitación.",
        pos: "v",
        gram: "'arrives' es la forma de tercera persona singular (he/she/it) de 'to arrive' (llegar) en presente simple: se agrega '-s' (o '-es') a la base."
      },
      {
        t: "Tom {{arrives}} today.",
        es: "Tom llega hoy.",
        pos: "v",
        gram: "'arrives' es la forma de tercera persona singular (he/she/it) de 'to arrive' (llegar) en presente simple: se agrega '-s' (o '-es') a la base."
      },
      {
        t: "You always {{forget}}.",
        es: "Siempre te olvidas.",
        pos: "v",
        gram: "'forget' es la forma base (infinitivo sin 'to') de 'to forget' (olvidar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Please {{forget}} it.",
        es: "Por favor, olvídalo.",
        pos: "v",
        gram: "'forget' es la forma base (infinitivo sin 'to') de 'to forget' (olvidar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Remember}} me.",
        es: "Acuérdate de mí.",
        pos: "v",
        gram: "'remember' es la forma base (infinitivo sin 'to') de 'to remember' (recordar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Remember}} that.",
        es: "Recuérdalo.",
        pos: "v",
        gram: "'remember' es la forma base (infinitivo sin 'to') de 'to remember' (recordar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Remember}} everything.",
        es: "Acordate todo.",
        pos: "v",
        gram: "'remember' es la forma base (infinitivo sin 'to') de 'to remember' (recordar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Lend}} me a hand.",
        es: "Dame una mano.",
        pos: "v",
        gram: "'lend' es la forma base (infinitivo sin 'to') de 'to lend' (prestar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Lend}} me your dictionary, please.",
        es: "Déjame el diccionario, por favor.",
        pos: "v",
        gram: "'lend' es la forma base (infinitivo sin 'to') de 'to lend' (prestar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Lend}} me your bicycle.",
        es: "Prestame tu bicicleta.",
        pos: "v",
        gram: "'lend' es la forma base (infinitivo sin 'to') de 'to lend' (prestar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Could you {{lend}} me a flashlight?",
        es: "¿Puedes prestarme una linterna?",
        pos: "v",
        gram: "'lend' es la forma base (infinitivo sin 'to') de 'to lend' (prestar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "She {{borrowed}} mine.",
        es: "Ella tomó el mío prestado.",
        pos: "v",
        gram: "'borrowed' es el pasado regular de 'to borrow' (pedir prestado): se agrega '-ed' a la base ('borrow' → 'borrowed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "I {{borrowed}} it.",
        es: "Yo lo tomé prestado.",
        pos: "v",
        gram: "'borrowed' es el pasado regular de 'to borrow' (pedir prestado): se agrega '-ed' a la base ('borrow' → 'borrowed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "She {{borrowed}} my scissors.",
        es: "Ella pidió prestadas mis tijeras.",
        pos: "v",
        gram: "'borrowed' es el pasado regular de 'to borrow' (pedir prestado): se agrega '-ed' a la base ('borrow' → 'borrowed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Tom {{borrowed}} my car.",
        es: "Tom me pidió prestado el carro.",
        pos: "v",
        gram: "'borrowed' es el pasado regular de 'to borrow' (pedir prestado): se agrega '-ed' a la base ('borrow' → 'borrowed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Everyone {{stood}}.",
        es: "Todo el mundo se quedó.",
        pos: "v",
        gram: "'stood' es el pasado irregular de 'to stand' (pararse / estar de pie). Cambia la vocal 'a' por 'oo' — mismo patrón que 'understand → understood'."
      },
      {
        t: "You {{stood}} up.",
        es: "Te paraste.",
        pos: "v",
        gram: "'stood' es el pasado irregular de 'to stand' (pararse / estar de pie). Cambia la vocal 'a' por 'oo' — mismo patrón que 'understand → understood'."
      },
      {
        t: "We all {{stood}}.",
        es: "Todos nos pusimos de pie.",
        pos: "v",
        gram: "'stood' es el pasado irregular de 'to stand' (pararse / estar de pie). Cambia la vocal 'a' por 'oo' — mismo patrón que 'understand → understood'."
      },
      {
        t: "She {{stood}} up.",
        es: "Ella se levantó.",
        pos: "v",
        gram: "'stood' es el pasado irregular de 'to stand' (pararse / estar de pie). Cambia la vocal 'a' por 'oo' — mismo patrón que 'understand → understood'."
      },
      {
        t: "He {{missed}} me.",
        es: "Él me echaba de menos.",
        pos: "v",
        gram: "'missed' es el pasado regular de 'to miss' (extrañar / perder (un evento, un tren)): se agrega '-ed' a la base ('miss' → 'missed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Nuja {{missed}} Skura.",
        es: "Nuja echaba de menos a Skura.",
        pos: "v",
        gram: "'missed' es el pasado regular de 'to miss' (extrañar / perder (un evento, un tren)): se agrega '-ed' a la base ('miss' → 'missed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "I {{missed}} it.",
        es: "Lo extrañaba.",
        pos: "v",
        gram: "'missed' es el pasado regular de 'to miss' (extrañar / perder (un evento, un tren)): se agrega '-ed' a la base ('miss' → 'missed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "{{Finish}} studying.",
        es: "Termine de estudiar.",
        pos: "v",
        gram: "'finish' es la forma base (infinitivo sin 'to') de 'to finish' (terminar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Finish}} this.",
        es: "Termine esto.",
        pos: "v",
        gram: "'finish' es la forma base (infinitivo sin 'to') de 'to finish' (terminar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Finish}} your food.",
        es: "Acaba tu comida.",
        pos: "v",
        gram: "'finish' es la forma base (infinitivo sin 'to') de 'to finish' (terminar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Finish}} your coffee.",
        es: "Acábate el café.",
        pos: "v",
        gram: "'finish' es la forma base (infinitivo sin 'to') de 'to finish' (terminar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Music is {{boring}}.",
        es: "La música es aburrida.",
        pos: "adj",
        gram: "'boring' (aburrido, que aburre) es un adjetivo terminado en '-ing': describe algo que CAUSA aburrimiento. Distinto de 'bored' (que SIENTE aburrimiento)."
      },
      {
        t: "Waiting is {{boring}}.",
        es: "Esperar es aburrido.",
        pos: "adj",
        gram: "'boring' (aburrido, que aburre) es un adjetivo terminado en '-ing': describe algo que CAUSA aburrimiento. Distinto de 'bored' (que SIENTE aburrimiento)."
      },
      {
        t: "What's {{funny}}?",
        es: "¿Qué es tan chistoso?",
        pos: "adj",
        gram: "'funny' (gracioso) es un adjetivo regular; su comparativo es 'funnier' y superlativo 'funniest' (la 'y' cambia a 'i' antes de '-er/-est')."
      },
      {
        t: "Are you {{funny}}?",
        es: "¿Eres gracioso?",
        pos: "adj",
        gram: "'funny' (gracioso) es un adjetivo regular; su comparativo es 'funnier' y superlativo 'funniest' (la 'y' cambia a 'i' antes de '-er/-est')."
      },
      {
        t: "Was it {{funny}}?",
        es: "¿Era gracioso?",
        pos: "adj",
        gram: "'funny' (gracioso) es un adjetivo regular; su comparativo es 'funnier' y superlativo 'funniest' (la 'y' cambia a 'i' antes de '-er/-est')."
      },
      {
        t: "That's {{funny}}!",
        es: "¡Qué gracioso!",
        pos: "adj",
        gram: "'funny' (gracioso) es un adjetivo regular; su comparativo es 'funnier' y superlativo 'funniest' (la 'y' cambia a 'i' antes de '-er/-est')."
      },
      {
        t: "Just {{married}}.",
        es: "Recién casado.",
        pos: "adj",
        gram: "'married' (casado) es un adjetivo terminado en '-ed'; se usa con 'to': 'married to someone' (casado CON alguien, no 'with')."
      },
      {
        t: "Maria {{married}} unwillingly.",
        es: "María se casó contra su voluntad.",
        pos: "adj",
        gram: "'married' (casado) es un adjetivo terminado en '-ed'; se usa con 'to': 'married to someone' (casado CON alguien, no 'with')."
      },
      {
        t: "I {{married}} young.",
        es: "Me casé joven.",
        pos: "adj",
        gram: "'married' (casado) es un adjetivo terminado en '-ed'; se usa con 'to': 'married to someone' (casado CON alguien, no 'with')."
      },
      {
        t: "They never {{married}}.",
        es: "Nunca se casaron.",
        pos: "adj",
        gram: "'married' (casado) es un adjetivo terminado en '-ed'; se usa con 'to': 'married to someone' (casado CON alguien, no 'with')."
      },
      {
        t: "They {{rented}} a house.",
        es: "Alquilaron una casa.",
        pos: "v",
        gram: "'rented' es el pasado regular de 'to rent' (alquilar): se agrega '-ed' a la base ('rent' → 'rented'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Tom {{rented}} a snowboard.",
        es: "Tom rentó una tabla de nieve.",
        pos: "v",
        gram: "'rented' es el pasado regular de 'to rent' (alquilar): se agrega '-ed' a la base ('rent' → 'rented'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "We {{rented}} the apartment.",
        es: "Alquilamos el departamento.",
        pos: "v",
        gram: "'rented' es el pasado regular de 'to rent' (alquilar): se agrega '-ed' a la base ('rent' → 'rented'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "We {{rented}} the flat.",
        es: "Alquilamos el piso.",
        pos: "v",
        gram: "'rented' es el pasado regular de 'to rent' (alquilar): se agrega '-ed' a la base ('rent' → 'rented'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "{{Tastes}} differ.",
        es: "Sobre gustos no hay disputas.",
        pos: "v",
        gram: "'tastes' es la forma de tercera persona singular (he/she/it) de 'to taste' (saber a / probar) en presente simple: se agrega '-s' (o '-es') a la base."
      },
      {
        t: "Tom {{tastes}} sweet.",
        es: "Tom sabe dulce.",
        pos: "v",
        gram: "'tastes' es la forma de tercera persona singular (he/she/it) de 'to taste' (saber a / probar) en presente simple: se agrega '-s' (o '-es') a la base."
      },
      {
        t: "That {{tastes}} terrible.",
        es: "Eso no sabe nada bueno.",
        pos: "v",
        gram: "'tastes' es la forma de tercera persona singular (he/she/it) de 'to taste' (saber a / probar) en presente simple: se agrega '-s' (o '-es') a la base."
      },
      {
        t: "This {{tastes}} good.",
        es: "Esto sabe bien.",
        pos: "v",
        gram: "'tastes' es la forma de tercera persona singular (he/she/it) de 'to taste' (saber a / probar) en presente simple: se agrega '-s' (o '-es') a la base."
      },
      {
        t: "I {{ordered}} bread.",
        es: "He pedido pan.",
        pos: "v",
        gram: "'ordered' es el pasado regular de 'to order' (ordenar / pedir): se agrega '-ed' a la base ('order' → 'ordered'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "We {{ordered}} food.",
        es: "Pedimos comida.",
        pos: "v",
        gram: "'ordered' es el pasado regular de 'to order' (ordenar / pedir): se agrega '-ed' a la base ('order' → 'ordered'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Ziri {{ordered}} champagne.",
        es: "Ziri ordenó champagne.",
        pos: "v",
        gram: "'ordered' es el pasado regular de 'to order' (ordenar / pedir): se agrega '-ed' a la base ('order' → 'ordered'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Sami {{ordered}} flowers.",
        es: "Sami encargó flores.",
        pos: "v",
        gram: "'ordered' es el pasado regular de 'to order' (ordenar / pedir): se agrega '-ed' a la base ('order' → 'ordered'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Tom {{wore}} glasses.",
        es: "Tom llevaba gafas.",
        pos: "v",
        gram: "'wore' es el pasado irregular de 'to wear' (llevar puesto). No sigue la regla de '-ed' ('weared' no existe); hay que memorizar esta forma."
      },
      {
        t: "Tom {{wore}} gloves.",
        es: "Tom llevaba guantes.",
        pos: "v",
        gram: "'wore' es el pasado irregular de 'to wear' (llevar puesto). No sigue la regla de '-ed' ('weared' no existe); hay que memorizar esta forma."
      },
      {
        t: "She {{wore}} glasses.",
        es: "Ella llevaba gafas.",
        pos: "v",
        gram: "'wore' es el pasado irregular de 'to wear' (llevar puesto). No sigue la regla de '-ed' ('weared' no existe); hay que memorizar esta forma."
      },
      {
        t: "He {{wore}} glasses.",
        es: "Él llevaba gafas.",
        pos: "v",
        gram: "'wore' es el pasado irregular de 'to wear' (llevar puesto). No sigue la regla de '-ed' ('weared' no existe); hay que memorizar esta forma."
      },
      {
        t: "Language {{opens}} worlds.",
        es: "El lenguaje abre mundos.",
        pos: "v",
        gram: "'opens' es la forma de tercera persona singular (he/she/it) de 'to open' (abrir) en presente simple: se agrega '-s' (o '-es') a la base."
      },
      {
        t: "The rope {{broke}}.",
        es: "La cuerda se rompió.",
        pos: "v",
        gram: "'broke' es el pasado irregular de 'to break' (romper). Cambia la vocal 'ea' por 'o' — patrón parecido a 'speak → spoke'."
      },
      {
        t: "A dam {{broke}}.",
        es: "Reventó una presa.",
        pos: "v",
        gram: "'broke' es el pasado irregular de 'to break' (romper). Cambia la vocal 'ea' por 'o' — patrón parecido a 'speak → spoke'."
      },
      {
        t: "You {{broke}} me.",
        es: "Me quebraste.",
        pos: "v",
        gram: "'broke' es el pasado irregular de 'to break' (romper). Cambia la vocal 'ea' por 'o' — patrón parecido a 'speak → spoke'."
      },
      {
        t: "War {{broke}} out.",
        es: "La guerra estalló.",
        pos: "v",
        gram: "'broke' es el pasado irregular de 'to break' (romper). Cambia la vocal 'ea' por 'o' — patrón parecido a 'speak → spoke'."
      },
      {
        t: "{{Practice}} mercy.",
        es: "Practica la misericordia.",
        pos: "v",
        gram: "'practice' es la forma base (infinitivo sin 'to') de 'to practice' (practicar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Practice}} make master.",
        es: "La práctica hace al maestro.",
        pos: "v",
        gram: "'practice' es la forma base (infinitivo sin 'to') de 'to practice' (practicar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Let me {{practice}}.",
        es: "Déjame practicar.",
        pos: "v",
        gram: "'practice' es la forma base (infinitivo sin 'to') de 'to practice' (practicar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Let's {{practice}}.",
        es: "Practiquemos.",
        pos: "v",
        gram: "'practice' es la forma base (infinitivo sin 'to') de 'to practice' (practicar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Bears are {{dangerous}}.",
        es: "Los osos son peligrosos.",
        pos: "adj",
        gram: "'dangerous' (peligroso) es un adjetivo regular, formado con el sufijo '-ous' a partir de 'danger' (peligro, sustantivo)."
      },
      {
        t: "Ideologies are {{dangerous}}.",
        es: "Las ideologías son peligrosas.",
        pos: "adj",
        gram: "'dangerous' (peligroso) es un adjetivo regular, formado con el sufijo '-ous' a partir de 'danger' (peligro, sustantivo)."
      },
      {
        t: "Are giraffes {{dangerous}}?",
        es: "¿Las jirafas son peligrosas?",
        pos: "adj",
        gram: "'dangerous' (peligroso) es un adjetivo regular, formado con el sufijo '-ous' a partir de 'danger' (peligro, sustantivo)."
      },
      {
        t: "It is {{dangerous}}!",
        es: "¡Es peligroso!",
        pos: "adj",
        gram: "'dangerous' (peligroso) es un adjetivo regular, formado con el sufijo '-ous' a partir de 'danger' (peligro, sustantivo)."
      },
      {
        t: "We have {{pictures}}.",
        es: "Tenemos fotos.",
        pos: "n",
        gram: "'pictures' es el plural regular de 'picture' (foto/imagen): se agrega '-s'. Sustantivo contable normal."
      },
      {
        t: "Whose {{pictures}} are those?",
        es: "¿De quién son esas fotos?",
        pos: "n",
        gram: "'pictures' es el plural regular de 'picture' (foto/imagen): se agrega '-s'. Sustantivo contable normal."
      },
      {
        t: "Are you taking {{pictures}}?",
        es: "¿Estás sacando fotos?",
        pos: "n",
        gram: "'pictures' es el plural regular de 'picture' (foto/imagen): se agrega '-s'. Sustantivo contable normal."
      },
      {
        t: "Is it {{dirty}}?",
        es: "¿Está sucio?",
        pos: "adj",
        gram: "'dirty' (sucio) es un adjetivo regular; su comparativo es 'dirtier' y superlativo 'dirtiest' (la 'y' cambia a 'i' antes de '-er/-est')."
      },
      {
        t: "Tom was {{dirty}}.",
        es: "Tom estaba sucio.",
        pos: "adj",
        gram: "'dirty' (sucio) es un adjetivo regular; su comparativo es 'dirtier' y superlativo 'dirtiest' (la 'y' cambia a 'i' antes de '-er/-est')."
      },
      {
        t: "The toilets are {{dirty}}.",
        es: "Las instalaciones sanitarias están sucias.",
        pos: "adj",
        gram: "'dirty' (sucio) es un adjetivo regular; su comparativo es 'dirtier' y superlativo 'dirtiest' (la 'y' cambia a 'i' antes de '-er/-est')."
      },
      {
        t: "Who got it {{dirty}}?",
        es: "¿Quién la ensució?",
        pos: "adj",
        gram: "'dirty' (sucio) es un adjetivo regular; su comparativo es 'dirtier' y superlativo 'dirtiest' (la 'y' cambia a 'i' antes de '-er/-est')."
      },
      {
        t: "I {{spent}} too much.",
        es: "Gasté demasiado.",
        pos: "v",
        gram: "'spent' es el pasado irregular de 'to spend' (gastar / pasar tiempo). Pasado y participio son iguales: 'spent'."
      },
      {
        t: "They {{spent}} the night studying.",
        es: "Pasaron la noche estudiando.",
        pos: "v",
        gram: "'spent' es el pasado irregular de 'to spend' (gastar / pasar tiempo). Pasado y participio son iguales: 'spent'."
      },
      {
        t: "I {{spent}} a hundred dollars.",
        es: "Gasté cien dólares.",
        pos: "v",
        gram: "'spent' es el pasado irregular de 'to spend' (gastar / pasar tiempo). Pasado y participio son iguales: 'spent'."
      },
      {
        t: "I {{spent}} a hundred euros.",
        es: "Gasté cien euros.",
        pos: "v",
        gram: "'spent' es el pasado irregular de 'to spend' (gastar / pasar tiempo). Pasado y participio son iguales: 'spent'."
      },
      {
        t: "{{Turn}} around!",
        es: "¡Date vuelta!",
        pos: "v",
        gram: "'turn' es la forma base (infinitivo sin 'to') de 'to turn' (girar / convertirse en). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Turn}} around.",
        es: "Da la vuelta.",
        pos: "v",
        gram: "'turn' es la forma base (infinitivo sin 'to') de 'to turn' (girar / convertirse en). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Ziri got {{noisy}}.",
        es: "Ziri se puso ruidosa.",
        pos: "adj",
        gram: "'noisy' (ruidoso) es un adjetivo regular formado con el sufijo '-y' a partir de 'noise' (ruido, sustantivo)."
      },
      {
        t: "Tom has {{noisy}} neighbours.",
        es: "Tom tiene vecinos ruidosos.",
        pos: "adj",
        gram: "'noisy' (ruidoso) es un adjetivo regular formado con el sufijo '-y' a partir de 'noise' (ruido, sustantivo)."
      },
      {
        t: "Tom has {{noisy}} neighbors.",
        es: "Tom tiene vecinos ruidosos.",
        pos: "adj",
        gram: "'noisy' (ruidoso) es un adjetivo regular formado con el sufijo '-y' a partir de 'noise' (ruido, sustantivo)."
      },
      {
        t: "The neighbors are {{noisy}}.",
        es: "Los vecinos son ruidosos.",
        pos: "adj",
        gram: "'noisy' (ruidoso) es un adjetivo regular formado con el sufijo '-y' a partir de 'noise' (ruido, sustantivo)."
      },
      {
        t: "The lights {{moved}}.",
        es: "Las luces se movieron.",
        pos: "v",
        gram: "'moved' es el pasado regular de 'to move' (mover(se) / mudarse): se agrega solo '-d' porque la base ya termina en 'e' ('move' → 'moved'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Yanni {{moved}} out.",
        es: "Yanni se mudó.",
        pos: "v",
        gram: "'moved' es el pasado regular de 'to move' (mover(se) / mudarse): se agrega solo '-d' porque la base ya termina en 'e' ('move' → 'moved'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Tom {{moved}} closer.",
        es: "Tom se acercó.",
        pos: "v",
        gram: "'moved' es el pasado regular de 'to move' (mover(se) / mudarse): se agrega solo '-d' porque la base ya termina en 'e' ('move' → 'moved'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "No one {{moved}}.",
        es: "No se movió nadie.",
        pos: "v",
        gram: "'moved' es el pasado regular de 'to move' (mover(se) / mudarse): se agrega solo '-d' porque la base ya termina en 'e' ('move' → 'moved'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "You {{promise}}?",
        es: "¿Lo prometes?",
        pos: "v",
        gram: "'promise' es la forma base (infinitivo sin 'to') de 'to promise' (prometer). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Promise}} me now.",
        es: "Ahora prométemelo.",
        pos: "v",
        gram: "'promise' es la forma base (infinitivo sin 'to') de 'to promise' (prometer). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Take your {{medicine}}.",
        es: "Toma tu medicina.",
        pos: "n",
        gram: "'medicine' (medicina, como sustancia) es INCONTABLE: no lleva 's' ni 'a/an'. Cuando significa 'la carrera de medicina' también es incontable."
      },
      {
        t: "This {{medicine}} tastes horrible.",
        es: "Esta medicina sabe horrible.",
        pos: "n",
        gram: "'medicine' (medicina, como sustancia) es INCONTABLE: no lleva 's' ni 'a/an'. Cuando significa 'la carrera de medicina' también es incontable."
      },
      {
        t: "Take the {{medicine}}.",
        es: "Toma la medicina.",
        pos: "n",
        gram: "'medicine' (medicina, como sustancia) es INCONTABLE: no lleva 's' ni 'a/an'. Cuando significa 'la carrera de medicina' también es incontable."
      },
      {
        t: "He buys {{medicine}}.",
        es: "Él compra medicamentos.",
        pos: "n",
        gram: "'medicine' (medicina, como sustancia) es INCONTABLE: no lleva 's' ni 'a/an'. Cuando significa 'la carrera de medicina' también es incontable."
      },
      {
        t: "We {{celebrated}} all night.",
        es: "Festejamos toda la noche.",
        pos: "v",
        gram: "'celebrated' es el pasado regular de 'to celebrate' (celebrar): se agrega solo '-d' porque la base ya termina en 'e' ('celebrate' → 'celebrated'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "They {{celebrated}} her achievements.",
        es: "Ellos celebraron sus logros.",
        pos: "v",
        gram: "'celebrated' es el pasado regular de 'to celebrate' (celebrar): se agrega solo '-d' porque la base ya termina en 'e' ('celebrate' → 'celebrated'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Ask me something {{easier}}.",
        es: "Pregúnteme algo más fácil.",
        pos: "adj",
        gram: "'easier' es el comparativo de 'easy' (fácil): los adjetivos de dos sílabas terminados en 'y' forman el comparativo con '-er' y cambiando la 'y' por 'i' ('easy → easier'), no con 'more'."
      },
      {
        t: "Conquering is {{easier}} than governing.",
        es: "Conquistar es más fácil que reinar.",
        pos: "adj",
        gram: "'easier' es el comparativo de 'easy' (fácil): los adjetivos de dos sílabas terminados en 'y' forman el comparativo con '-er' y cambiando la 'y' por 'i' ('easy → easier'), no con 'more'."
      },
      {
        t: "{{Easier}} said than done.",
        es: "Del dicho al hecho hay mucho trecho.",
        pos: "adj",
        gram: "'easier' es el comparativo de 'easy' (fácil): los adjetivos de dos sílabas terminados en 'y' forman el comparativo con '-er' y cambiando la 'y' por 'i' ('easy → easier'), no con 'more'."
      },
      {
        t: "Modern Greek is {{easier}} than Esperanto.",
        es: "El griego moderno es más fácil que el esperanto.",
        pos: "adj",
        gram: "'easier' es el comparativo de 'easy' (fácil): los adjetivos de dos sílabas terminados en 'y' forman el comparativo con '-er' y cambiando la 'y' por 'i' ('easy → easier'), no con 'more'."
      },
      {
        t: "Recognition {{drives}} achievement.",
        es: "El reconocimiento lleva al logro.",
        pos: "v",
        gram: "'drives' es la forma de tercera persona singular (he/she/it) de 'to drive' (conducir) en presente simple: se agrega '-s' (o '-es') a la base."
      },
      {
        t: "Is Algeria {{saving}} money?",
        es: "¿Está ahorrando dinero Argelia?",
        pos: "v",
        gram: "'saving' es el gerundio (participio presente) de 'to save' (ahorrar / guardar / salvar): se quita la 'e' final antes de '-ing' ('save' → 'saving'). Se usa en tiempos continuos ('is/are/was/were saving') o como sustantivo verbal."
      },
      {
        t: "I'm {{saving}} money.",
        es: "Estoy ahorrando dinero.",
        pos: "v",
        gram: "'saving' es el gerundio (participio presente) de 'to save' (ahorrar / guardar / salvar): se quita la 'e' final antes de '-ing' ('save' → 'saving'). Se usa en tiempos continuos ('is/are/was/were saving') o como sustantivo verbal."
      },
      {
        t: "Stop {{crying}}.",
        es: "No llores.",
        pos: "v",
        gram: "'crying' es el gerundio (participio presente) de 'to cry' (llorar): se agrega '-ing' a la base ('cry' → 'crying'). Se usa en tiempos continuos ('is/are/was/were crying') o como sustantivo verbal."
      },
      {
        t: "Tom {{invited}} everyone.",
        es: "Tom invitó a todos.",
        pos: "v",
        gram: "'invited' es el pasado regular de 'to invite' (invitar): se agrega solo '-d' porque la base ya termina en 'e' ('invite' → 'invited'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Tom is {{invited}}.",
        es: "Tom está invitado.",
        pos: "v",
        gram: "'invited' es el pasado regular de 'to invite' (invitar): se agrega solo '-d' porque la base ya termina en 'e' ('invite' → 'invited'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "She {{invited}} me.",
        es: "Me invitó.",
        pos: "v",
        gram: "'invited' es el pasado regular de 'to invite' (invitar): se agrega solo '-d' porque la base ya termina en 'e' ('invite' → 'invited'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "You're {{invited}}.",
        es: "Estás invitado.",
        pos: "v",
        gram: "'invited' es el pasado regular de 'to invite' (invitar): se agrega solo '-d' porque la base ya termina en 'e' ('invite' → 'invited'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Stay {{inside}}.",
        es: "Quédate adentro.",
        pos: "prep",
        gram: "'inside' (dentro de) indica ubicación dentro de un espacio cerrado; es más específico que 'in' y enfatiza el interior."
      },
      {
        t: "Step {{inside}}.",
        es: "Entra.",
        pos: "prep",
        gram: "'inside' (dentro de) indica ubicación dentro de un espacio cerrado; es más específico que 'in' y enfatiza el interior."
      },
      {
        t: "Yanni came {{inside}}.",
        es: "Yanni entró.",
        pos: "prep",
        gram: "'inside' (dentro de) indica ubicación dentro de un espacio cerrado; es más específico que 'in' y enfatiza el interior."
      },
      {
        t: "Bring him {{inside}}.",
        es: "Tráelo adentro.",
        pos: "prep",
        gram: "'inside' (dentro de) indica ubicación dentro de un espacio cerrado; es más específico que 'in' y enfatiza el interior."
      },
      {
        t: "You {{caught}} me!",
        es: "¡Me pillaste!",
        pos: "v",
        gram: "'caught' es el pasado irregular de 'to catch' (atrapar / alcanzar). Comparte el sonido final /ɔːt/ con 'taught', 'bought', 'brought' y 'thought'."
      },
      {
        t: "Sami got {{caught}}.",
        es: "Sami fue detenido.",
        pos: "v",
        gram: "'caught' es el pasado irregular de 'to catch' (atrapar / alcanzar). Comparte el sonido final /ɔːt/ con 'taught', 'bought', 'brought' y 'thought'."
      },
      {
        t: "I {{caught}} her.",
        es: "Yo la atrapé.",
        pos: "v",
        gram: "'caught' es el pasado irregular de 'to catch' (atrapar / alcanzar). Comparte el sonido final /ɔːt/ con 'taught', 'bought', 'brought' y 'thought'."
      },
      {
        t: "We {{caught}} Tom.",
        es: "Atrapamos a Tom.",
        pos: "v",
        gram: "'caught' es el pasado irregular de 'to catch' (atrapar / alcanzar). Comparte el sonido final /ɔːt/ con 'taught', 'bought', 'brought' y 'thought'."
      },
      {
        t: "I {{climbed}} the fence.",
        es: "Yo subí la valla.",
        pos: "v",
        gram: "'climbed' es el pasado regular de 'to climb' (escalar / subir): se agrega '-ed' a la base ('climb' → 'climbed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Tom {{climbed}} the fence.",
        es: "Tom subió la cerca.",
        pos: "v",
        gram: "'climbed' es el pasado regular de 'to climb' (escalar / subir): se agrega '-ed' a la base ('climb' → 'climbed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Tom {{climbed}} the ladder.",
        es: "Tom subió la escalera.",
        pos: "v",
        gram: "'climbed' es el pasado regular de 'to climb' (escalar / subir): se agrega '-ed' a la base ('climb' → 'climbed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "What {{narrow}} stairs!",
        es: "¡Qué estrechas son estas escaleras!",
        pos: "adj",
        gram: "'narrow' (angosto, estrecho) es un adjetivo regular, opuesto de 'wide' (ancho)."
      },
      {
        t: "It's {{narrow}} and uncomfortable.",
        es: "Es angosto e incómodo.",
        pos: "adj",
        gram: "'narrow' (angosto, estrecho) es un adjetivo regular, opuesto de 'wide' (ancho)."
      },
      {
        t: "She has {{narrow}} hips.",
        es: "Ella tiene caderas angostas.",
        pos: "adj",
        gram: "'narrow' (angosto, estrecho) es un adjetivo regular, opuesto de 'wide' (ancho)."
      },
      {
        t: "We went along the {{narrow}} road.",
        es: "Fuimos por el camino angosto.",
        pos: "adj",
        gram: "'narrow' (angosto, estrecho) es un adjetivo regular, opuesto de 'wide' (ancho)."
      },
      {
        t: "Nothing is {{fixed}}.",
        es: "Nada está arreglado.",
        pos: "v",
        gram: "'fixed' es el pasado regular de 'to fix' (arreglar): se agrega '-ed' a la base ('fix' → 'fixed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Tom {{fixed}} everything.",
        es: "Tom arregló todo.",
        pos: "v",
        gram: "'fixed' es el pasado regular de 'to fix' (arreglar): se agrega '-ed' a la base ('fix' → 'fixed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Is she {{asleep}}?",
        es: "¿Está dormida?",
        pos: "adj",
        gram: "'asleep' (dormido) es un adjetivo que SOLO se usa después del verbo ('he is asleep', 'fall asleep'), nunca antes del sustantivo ('an asleep man' es incorrecto — se diría 'a sleeping man')."
      },
      {
        t: "Everyone fell {{asleep}}.",
        es: "Todos se durmieron.",
        pos: "adj",
        gram: "'asleep' (dormido) es un adjetivo que SOLO se usa después del verbo ('he is asleep', 'fall asleep'), nunca antes del sustantivo ('an asleep man' es incorrecto — se diría 'a sleeping man')."
      },
      {
        t: "You were {{asleep}}.",
        es: "Tú dormías.",
        pos: "adj",
        gram: "'asleep' (dormido) es un adjetivo que SOLO se usa después del verbo ('he is asleep', 'fall asleep'), nunca antes del sustantivo ('an asleep man' es incorrecto — se diría 'a sleeping man')."
      },
      {
        t: "Everyone was {{asleep}}.",
        es: "Todos estaban dormidos.",
        pos: "adj",
        gram: "'asleep' (dormido) es un adjetivo que SOLO se usa después del verbo ('he is asleep', 'fall asleep'), nunca antes del sustantivo ('an asleep man' es incorrecto — se diría 'a sleeping man')."
      },
      {
        t: "Nobody {{smiled}}.",
        es: "No sonrió nadie.",
        pos: "v",
        gram: "'smiled' es el pasado regular de 'to smile' (sonreír): se agrega solo '-d' porque la base ya termina en 'e' ('smile' → 'smiled'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "They {{smiled}}.",
        es: "Sonrieron.",
        pos: "v",
        gram: "'smiled' es el pasado regular de 'to smile' (sonreír): se agrega solo '-d' porque la base ya termina en 'e' ('smile' → 'smiled'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Everyone {{smiled}}.",
        es: "Todos sonrieron.",
        pos: "v",
        gram: "'smiled' es el pasado regular de 'to smile' (sonreír): se agrega solo '-d' porque la base ya termina en 'e' ('smile' → 'smiled'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Tom {{built}} me.",
        es: "Tom me construyó.",
        pos: "v",
        gram: "'built' es el pasado irregular de 'to build' (construir). No sigue la regla de '-ed' ('builded' no existe); build-built-built no cambia entre pasado y participio."
      },
      {
        t: "Tom {{built}} this.",
        es: "Tom construyó esto.",
        pos: "v",
        gram: "'built' es el pasado irregular de 'to build' (construir). No sigue la regla de '-ed' ('builded' no existe); build-built-built no cambia entre pasado y participio."
      },
      {
        t: "They {{built}} it.",
        es: "Ellos lo construyeron.",
        pos: "v",
        gram: "'built' es el pasado irregular de 'to build' (construir). No sigue la regla de '-ed' ('builded' no existe); build-built-built no cambia entre pasado y participio."
      },
      {
        t: "Schools were {{built}}.",
        es: "Se construyeron escuelas.",
        pos: "v",
        gram: "'built' es el pasado irregular de 'to build' (construir). No sigue la regla de '-ed' ('builded' no existe); build-built-built no cambia entre pasado y participio."
      },
      {
        t: "You {{dropped}} something.",
        es: "Dejaste caer algo.",
        pos: "v",
        gram: "'dropped' es el pasado regular de 'to drop' (dejar caer): se dobla la consonante final antes de '-ed' porque la base termina en consonante-vocal-consonante ('drop' → 'dropped'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Prices {{dropped}} suddenly.",
        es: "Los precios bajaron súbitamente.",
        pos: "v",
        gram: "'dropped' es el pasado regular de 'to drop' (dejar caer): se dobla la consonante final antes de '-ed' porque la base termina en consonante-vocal-consonante ('drop' → 'dropped'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Mary was {{hiding}}.",
        es: "Mary se estaba escondiendo.",
        pos: "v",
        gram: "'hiding' es el gerundio (participio presente) de 'to hide' (esconder): se quita la 'e' final antes de '-ing' ('hide' → 'hiding'). Se usa en tiempos continuos ('is/are/was/were hiding') o como sustantivo verbal."
      },
      {
        t: "Are they {{hiding}}?",
        es: "¿Están escondidos?",
        pos: "v",
        gram: "'hiding' es el gerundio (participio presente) de 'to hide' (esconder): se quita la 'e' final antes de '-ing' ('hide' → 'hiding'). Se usa en tiempos continuos ('is/are/was/were hiding') o como sustantivo verbal."
      },
      {
        t: "You were {{hiding}}.",
        es: "Tú te estabas escondiendo.",
        pos: "v",
        gram: "'hiding' es el gerundio (participio presente) de 'to hide' (esconder): se quita la 'e' final antes de '-ing' ('hide' → 'hiding'). Se usa en tiempos continuos ('is/are/was/were hiding') o como sustantivo verbal."
      }
    ]
  },
  {
    id: "ft3",
    name: "Fast Track 3 · Palabras 2000–5000",
    desc: "Conversaciones con matices: opiniones, planes, trabajo",
    icon: "🌳",
    sentences: [
      {
        t: "She {{decided}} to change her job.",
        es: "Ella decidió cambiar de trabajo.",
        pos: "v",
        gram: "'decided' es el pasado regular de 'to decide' (decidir): se agrega solo '-d' porque la base ya termina en 'e' ('decide' → 'decided'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Could you {{explain}} that again, please?",
        es: "¿Podrías explicar eso otra vez, por favor?",
        pos: "v",
        gram: "'explain' es la forma base (infinitivo sin 'to') de 'to explain' (explicar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "I'm trying to {{improve}} my English.",
        es: "Estoy tratando de mejorar mi inglés.",
        pos: "v",
        gram: "'improve' es la forma base (infinitivo sin 'to') de 'to improve' (mejorar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Don't {{worry}}, everything will be fine.",
        es: "No te preocupes, todo estará bien.",
        pos: "v",
        gram: "'worry' es la forma base (infinitivo sin 'to') de 'to worry' (preocupar(se)). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "We {{arrived}} just in time for the show.",
        es: "Llegamos justo a tiempo para el espectáculo.",
        pos: "v",
        gram: "'arrived' es el pasado regular de 'to arrive' (llegar): se agrega solo '-d' porque la base ya termina en 'e' ('arrive' → 'arrived'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "The instructions were very {{clear}}.",
        es: "Las instrucciones eran muy claras.",
        pos: "adj",
        gram: "'clear' (claro) es un adjetivo regular, usado tanto antes del sustantivo ('a clear answer') como después de 'to be' ('it is clear')."
      },
      {
        t: "He {{realized}} he had made a mistake.",
        es: "Se dio cuenta de que había cometido un error.",
        pos: "v",
        gram: "'realized' es el pasado regular de 'to realize' (darse cuenta): se agrega solo '-d' porque la base ya termina en 'e' ('realize' → 'realized'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "We need to find a {{solution}} to this problem.",
        es: "Necesitamos encontrar una solución a este problema.",
        pos: "n",
        gram: "'solution' (solución) es contable: 'a solution', 'solutions'. Se usa con 'to': 'a solution to the problem' (no 'of the problem')."
      },
      {
        t: "They {{offered}} him a better salary.",
        es: "Le ofrecieron un mejor salario.",
        pos: "v",
        gram: "'offered' es el pasado regular de 'to offer' (ofrecer): se agrega '-ed' a la base ('offer' → 'offered'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "I have an {{appointment}} with the dentist.",
        es: "Tengo una cita con el dentista.",
        pos: "n",
        gram: "'appointment' (cita, turno) es contable: 'to make/have an appointment' (pedir/tener un turno), muy usado con el médico o el dentista."
      },
      {
        t: "The train was {{delayed}} because of the storm.",
        es: "El tren se retrasó por la tormenta.",
        pos: "v",
        gram: "'delayed' es el pasado regular de 'to delay' (retrasar): se agrega '-ed' a la base ('delay' → 'delayed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "You should {{avoid}} eating too much sugar.",
        es: "Deberías evitar comer demasiada azúcar.",
        pos: "v",
        gram: "'avoid' es la forma base (infinitivo sin 'to') de 'to avoid' (evitar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "He {{apologized}} for being late.",
        es: "Él se disculpó por llegar tarde.",
        pos: "v",
        gram: "'apologized' es el pasado regular de 'to apologize' (disculparse): se agrega solo '-d' porque la base ya termina en 'e' ('apologize' → 'apologized'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "The teacher gave us some useful {{advice}}.",
        es: "El profesor nos dio algunos consejos útiles.",
        pos: "n",
        gram: "'advice' (consejo) es un sustantivo INCONTABLE en inglés — nunca lleva 's' ('advices' no existe) ni 'an' delante. Para contar consejos se dice 'a piece of advice'."
      },
      {
        t: "I {{suggest}} taking the earlier flight.",
        es: "Sugiero tomar el vuelo más temprano.",
        pos: "v",
        gram: "'suggest' es la forma base (infinitivo sin 'to') de 'to suggest' (sugerir). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "It {{depends}} on the price.",
        es: "Depende del precio.",
        pos: "v",
        gram: "'depends' es la forma de tercera persona singular (he/she/it) de 'to depend' (depender) en presente simple: se agrega '-s' (o '-es') a la base."
      },
      {
        t: "She was {{disappointed}} with the results.",
        es: "Ella estaba decepcionada con los resultados.",
        pos: "adj",
        gram: "'disappointed' (decepcionado) es un adjetivo terminado en '-ed': describe cómo se SIENTE una persona. Distinto de 'disappointing' (que decepciona a otros)."
      },
      {
        t: "The company is looking for {{experienced}} workers.",
        es: "La empresa busca trabajadores con experiencia.",
        pos: "adj",
        gram: "'experienced' (experimentado, con experiencia) es un adjetivo terminado en '-ed', de la familia de 'experience' (experiencia)."
      },
      {
        t: "I can't {{afford}} a new car right now.",
        es: "No puedo permitirme un auto nuevo ahora.",
        pos: "v",
        gram: "'afford' es la forma base (infinitivo sin 'to') de 'to afford' (permitirse (algo, económicamente)). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "We had to {{return}} home early.",
        es: "Tuvimos que volver a casa temprano.",
        pos: "v",
        gram: "'return' es la forma base (infinitivo sin 'to') de 'to return' (volver / devolver). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "My phone battery is {{running}} out.",
        es: "La batería de mi teléfono se está agotando.",
        pos: "v",
        gram: "'running' es el gerundio (participio presente) de 'to run' (correr): se dobla la consonante final antes de '-ing' porque la base termina en consonante-vocal-consonante ('run' → 'running'). Se usa en tiempos continuos ('is/are/was/were running') o como sustantivo verbal."
      },
      {
        t: "She has a great sense of {{humor}}.",
        es: "Ella tiene un gran sentido del humor.",
        pos: "n",
        gram: "'humor' (humor, sentido del humor) es INCONTABLE: no lleva 's' ni 'a/an'. En inglés británico se escribe 'humour'."
      },
      {
        t: "The museum is {{worth}} visiting.",
        es: "Vale la pena visitar el museo.",
        pos: "adj",
        gram: "'worth' (que vale/merece la pena) va con sustantivo o '-ing': 'worth the money', 'worth trying' — nunca 'worth to try'."
      },
      {
        t: "He couldn't {{recall}} where he parked.",
        es: "No podía recordar dónde estacionó.",
        pos: "v",
        gram: "'recall' es la forma base (infinitivo sin 'to') de 'to recall' (recordar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "There's no {{reason}} to be afraid.",
        es: "No hay razón para tener miedo.",
        pos: "n",
        gram: "'reason' (razón, motivo) es contable: 'a reason', 'reasons'. La expresión 'the reason why' es muy común para explicar un motivo."
      },
      {
        t: "She {{pretended}} not to hear me.",
        es: "Ella fingió no escucharme.",
        pos: "v",
        gram: "'pretended' es el pasado regular de 'to pretend' (fingir): se agrega '-ed' a la base ('pretend' → 'pretended'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "The bridge {{connects}} the two cities.",
        es: "El puente conecta las dos ciudades.",
        pos: "v",
        gram: "'connects' es la forma de tercera persona singular (he/she/it) de 'to connect' (conectar) en presente simple: se agrega '-s' (o '-es') a la base."
      },
      {
        t: "I {{barely}} slept last night.",
        es: "Apenas dormí anoche.",
        pos: "adv",
        gram: "'barely' (apenas) es un adverbio de frecuencia/grado que casi siempre va antes del verbo principal, como 'never' o 'always'."
      },
      {
        t: "This city has {{grown}} a lot in recent years.",
        es: "Esta ciudad ha crecido mucho en los últimos años.",
        pos: "v",
        gram: "'grown' es el pasado irregular de 'to grow' (crecer). OJO: esta es la forma de PARTICIPIO ('grow-grew-grown'), no el pasado simple. Se usa con 'have/has/had' ('has grown') o como adjetivo."
      },
      {
        t: "I've been {{waiting}} for you for an hour.",
        es: "Te he estado esperando durante una hora.",
        pos: "v",
        gram: "'waiting' es el gerundio (participio presente) de 'to wait' (esperar): se agrega '-ing' a la base ('wait' → 'waiting'). Se usa en tiempos continuos ('is/are/was/were waiting') o como sustantivo verbal."
      },
      {
        t: "The meeting was {{canceled}} at the last minute.",
        es: "La reunión fue cancelada a último momento.",
        pos: "v",
        gram: "'canceled' es el pasado regular de 'to cancel' (cancelar): se agrega '-ed' a la base ('cancel' → 'canceled'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "I'm not sure {{whether}} he will come.",
        es: "No estoy seguro de si él vendrá.",
        pos: "conj",
        gram: "'whether' (si, al plantear una opción) introduce una pregunta indirecta o una elección entre alternativas: 'I don't know whether to go or stay'."
      },
      {
        t: "The weather {{forecast}} says it will rain.",
        es: "El pronóstico del tiempo dice que lloverá.",
        pos: "n",
        gram: "'forecast' (pronóstico) es contable, y su plural NO cambia: 'one forecast, two forecast(s)' — muchos hablantes lo dejan igual en plural, como 'sheep'."
      },
      {
        t: "You have to {{fill}} out this form.",
        es: "Tienes que llenar este formulario.",
        pos: "v",
        gram: "'fill' es la forma base (infinitivo sin 'to') de 'to fill' (llenar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "He's very good at {{solving}} problems.",
        es: "Él es muy bueno resolviendo problemas.",
        pos: "v",
        gram: "'solving' es el gerundio (participio presente) de 'to solve' (resolver): se quita la 'e' final antes de '-ing' ('solve' → 'solving'). Se usa en tiempos continuos ('is/are/was/were solving') o como sustantivo verbal."
      },
      {
        t: "The results {{surprised}} everyone.",
        es: "Los resultados sorprendieron a todos.",
        pos: "v",
        gram: "'surprised' es el pasado regular de 'to surprise' (sorprender): se agrega solo '-d' porque la base ya termina en 'e' ('surprise' → 'surprised'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "It's {{against}} the rules to smoke here.",
        es: "Va contra las reglas fumar aquí.",
        pos: "prep",
        gram: "'against' (en contra de/contra) se usa para oposición o contacto físico: 'to fight against', 'lean against the wall'."
      },
      {
        t: "The manager will {{review}} your application.",
        es: "El gerente revisará tu solicitud.",
        pos: "v",
        gram: "'review' es la forma base (infinitivo sin 'to') de 'to review' (revisar / repasar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "This job requires a lot of {{patience}}.",
        es: "Este trabajo requiere mucha paciencia.",
        pos: "n",
        gram: "'patience' (paciencia) es INCONTABLE: no lleva 's' ni 'a/an'. Ojo con la ortografía: se parece a 'patients' (pacientes), pero son palabras distintas."
      },
      {
        t: "The two teams will {{compete}} for the title.",
        es: "Los dos equipos competirán por el título.",
        pos: "v",
        gram: "'compete' es la forma base (infinitivo sin 'to') de 'to compete' (competir). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "She {{describes}} her town as quiet and safe.",
        es: "Ella describe su pueblo como tranquilo y seguro.",
        pos: "v",
        gram: "'describes' es la forma de tercera persona singular (he/she/it) de 'to describe' (describir) en presente simple: se agrega '-s' (o '-es') a la base."
      },
      {
        t: "We should {{consider}} all the options.",
        es: "Deberíamos considerar todas las opciones.",
        pos: "v",
        gram: "'consider' es la forma base (infinitivo sin 'to') de 'to consider' (considerar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "The price {{includes}} breakfast and dinner.",
        es: "El precio incluye desayuno y cena.",
        pos: "v",
        gram: "'includes' es la forma de tercera persona singular (he/she/it) de 'to include' (incluir) en presente simple: se agrega '-s' (o '-es') a la base."
      },
      {
        t: "I {{noticed}} something strange in the photo.",
        es: "Noté algo extraño en la foto.",
        pos: "v",
        gram: "'noticed' es el pasado regular de 'to notice' (notar): se agrega solo '-d' porque la base ya termina en 'e' ('notice' → 'noticed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "The company {{hired}} twenty new employees.",
        es: "La empresa contrató a veinte empleados nuevos.",
        pos: "v",
        gram: "'hired' es el pasado regular de 'to hire' (contratar): se agrega solo '-d' porque la base ya termina en 'e' ('hire' → 'hired'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "It's hard to {{concentrate}} with this noise.",
        es: "Es difícil concentrarse con este ruido.",
        pos: "v",
        gram: "'concentrate' es la forma base (infinitivo sin 'to') de 'to concentrate' (concentrarse). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "They {{shared}} the prize between them.",
        es: "Compartieron el premio entre ellos.",
        pos: "v",
        gram: "'shared' es el pasado regular de 'to share' (compartir): se agrega solo '-d' porque la base ya termina en 'e' ('share' → 'shared'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "The situation is getting {{worse}}.",
        es: "La situación está empeorando.",
        pos: "adj",
        gram: "'worse' es el comparativo IRREGULAR de 'bad' (malo): bad → worse → worst (no se dice 'badder')."
      },
      {
        t: "He gave a very {{detailed}} report.",
        es: "Él dio un informe muy detallado.",
        pos: "adj",
        gram: "'detailed' (detallado) es un adjetivo terminado en '-ed', de la familia de 'to detail' (detallar) — describe algo hecho con muchos detalles."
      },
      {
        t: "Her {{attitude}} toward work has changed.",
        es: "Su actitud hacia el trabajo ha cambiado.",
        pos: "n",
        gram: "'attitude' (actitud) es contable: 'an attitude', 'attitudes'. Se suele usar con adjetivos: 'a positive/negative attitude'."
      },
      {
        t: "Tom {{decided}}.",
        es: "Tom decidió.",
        pos: "v",
        gram: "'decided' es el pasado regular de 'to decide' (decidir): se agrega solo '-d' porque la base ya termina en 'e' ('decide' → 'decided'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "He already {{decided}}.",
        es: "Ya lo decidió.",
        pos: "v",
        gram: "'decided' es el pasado regular de 'to decide' (decidir): se agrega solo '-d' porque la base ya termina en 'e' ('decide' → 'decided'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "She already {{decided}}.",
        es: "Ya lo decidió.",
        pos: "v",
        gram: "'decided' es el pasado regular de 'to decide' (decidir): se agrega solo '-d' porque la base ya termina en 'e' ('decide' → 'decided'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "I have {{decided}}.",
        es: "Tomé mi decisión.",
        pos: "v",
        gram: "'decided' es el pasado regular de 'to decide' (decidir): se agrega solo '-d' porque la base ya termina en 'e' ('decide' → 'decided'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "{{Explain}} yourselves.",
        es: "Explicaos.",
        pos: "v",
        gram: "'explain' es la forma base (infinitivo sin 'to') de 'to explain' (explicar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Explain}} yourself!",
        es: "¡Explícate!",
        pos: "v",
        gram: "'explain' es la forma base (infinitivo sin 'to') de 'to explain' (explicar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Explain}} yourself.",
        es: "Explíquese.",
        pos: "v",
        gram: "'explain' es la forma base (infinitivo sin 'to') de 'to explain' (explicar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "We {{explain}} something.",
        es: "Explicamos algo.",
        pos: "v",
        gram: "'explain' es la forma base (infinitivo sin 'to') de 'to explain' (explicar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Improve}} your skills.",
        es: "Mejora tus habilidades.",
        pos: "v",
        gram: "'improve' es la forma base (infinitivo sin 'to') de 'to improve' (mejorar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Tom'll {{improve}}.",
        es: "Tom mejorará.",
        pos: "v",
        gram: "'improve' es la forma base (infinitivo sin 'to') de 'to improve' (mejorar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "They showed {{worry}}.",
        es: "Mostraban preocupación.",
        pos: "v",
        gram: "'worry' es la forma base (infinitivo sin 'to') de 'to worry' (preocupar(se)). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "I never {{worry}}.",
        es: "Yo nunca me preocupo.",
        pos: "v",
        gram: "'worry' es la forma base (infinitivo sin 'to') de 'to worry' (preocupar(se)). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "She {{arrived}}.",
        es: "Llegó.",
        pos: "v",
        gram: "'arrived' es el pasado regular de 'to arrive' (llegar): se agrega solo '-d' porque la base ya termina en 'e' ('arrive' → 'arrived'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Tom {{arrived}}.",
        es: "Tom llegó.",
        pos: "v",
        gram: "'arrived' es el pasado regular de 'to arrive' (llegar): se agrega solo '-d' porque la base ya termina en 'e' ('arrive' → 'arrived'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Spring {{arrived}}.",
        es: "Llegó la primavera.",
        pos: "v",
        gram: "'arrived' es el pasado regular de 'to arrive' (llegar): se agrega solo '-d' porque la base ya termina en 'e' ('arrive' → 'arrived'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "They've {{arrived}}.",
        es: "Llegaron.",
        pos: "v",
        gram: "'arrived' es el pasado regular de 'to arrive' (llegar): se agrega solo '-d' porque la base ya termina en 'e' ('arrive' → 'arrived'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "{{Clear}} the table.",
        es: "Recoge la mesa.",
        pos: "adj",
        gram: "'clear' (claro) es un adjetivo regular, usado tanto antes del sustantivo ('a clear answer') como después de 'to be' ('it is clear')."
      },
      {
        t: "Is it {{clear}}?",
        es: "¿Está claro?",
        pos: "adj",
        gram: "'clear' (claro) es un adjetivo regular, usado tanto antes del sustantivo ('a clear answer') como después de 'to be' ('it is clear')."
      },
      {
        t: "That's {{clear}}.",
        es: "Eso es claro.",
        pos: "adj",
        gram: "'clear' (claro) es un adjetivo regular, usado tanto antes del sustantivo ('a clear answer') como después de 'to be' ('it is clear')."
      },
      {
        t: "{{Clear}} the corridor!",
        es: "¡Ordenen el pasillo!",
        pos: "adj",
        gram: "'clear' (claro) es un adjetivo regular, usado tanto antes del sustantivo ('a clear answer') como después de 'to be' ('it is clear')."
      },
      {
        t: "She {{realized}}.",
        es: "Ella se dio cuenta.",
        pos: "v",
        gram: "'realized' es el pasado regular de 'to realize' (darse cuenta): se agrega solo '-d' porque la base ya termina en 'e' ('realize' → 'realized'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Tom {{realized}} Mary had fainted.",
        es: "Tom se dio cuenta de que Mary se había desmayado.",
        pos: "v",
        gram: "'realized' es el pasado regular de 'to realize' (darse cuenta): se agrega solo '-d' porque la base ya termina en 'e' ('realize' → 'realized'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "He {{realized}} his failure.",
        es: "Él reconoció su fracaso.",
        pos: "v",
        gram: "'realized' es el pasado regular de 'to realize' (darse cuenta): se agrega solo '-d' porque la base ya termina en 'e' ('realize' → 'realized'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "I {{realized}} what was happening.",
        es: "Comprendí lo que estaba pasando.",
        pos: "v",
        gram: "'realized' es el pasado regular de 'to realize' (darse cuenta): se agrega solo '-d' porque la base ya termina en 'e' ('realize' → 'realized'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "What is the {{solution}}?",
        es: "¿Cuál es la solución?",
        pos: "n",
        gram: "'solution' (solución) es contable: 'a solution', 'solutions'. Se usa con 'to': 'a solution to the problem' (no 'of the problem')."
      },
      {
        t: "Death is no {{solution}}.",
        es: "La muerte no es la solución.",
        pos: "n",
        gram: "'solution' (solución) es contable: 'a solution', 'solutions'. Se usa con 'to': 'a solution to the problem' (no 'of the problem')."
      },
      {
        t: "We need another {{solution}}.",
        es: "Necesitamos otra solución.",
        pos: "n",
        gram: "'solution' (solución) es contable: 'a solution', 'solutions'. Se usa con 'to': 'a solution to the problem' (no 'of the problem')."
      },
      {
        t: "I have the {{solution}}.",
        es: "Tengo la solución.",
        pos: "n",
        gram: "'solution' (solución) es contable: 'a solution', 'solutions'. Se usa con 'to': 'a solution to the problem' (no 'of the problem')."
      },
      {
        t: "They {{offered}} assistance.",
        es: "Ofrecieron asistencia.",
        pos: "v",
        gram: "'offered' es el pasado regular de 'to offer' (ofrecer): se agrega '-ed' a la base ('offer' → 'offered'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Make an {{appointment}}.",
        es: "Pida cita.",
        pos: "n",
        gram: "'appointment' (cita, turno) es contable: 'to make/have an appointment' (pedir/tener un turno), muy usado con el médico o el dentista."
      },
      {
        t: "I have an {{appointment}} tonight.",
        es: "Tengo una cita esta noche.",
        pos: "n",
        gram: "'appointment' (cita, turno) es contable: 'to make/have an appointment' (pedir/tener un turno), muy usado con el médico o el dentista."
      },
      {
        t: "Tom forgot his {{appointment}}.",
        es: "Tom olvidó su cita.",
        pos: "n",
        gram: "'appointment' (cita, turno) es contable: 'to make/have an appointment' (pedir/tener un turno), muy usado con el médico o el dentista."
      },
      {
        t: "I've got an {{appointment}}.",
        es: "Tengo una cita.",
        pos: "n",
        gram: "'appointment' (cita, turno) es contable: 'to make/have an appointment' (pedir/tener un turno), muy usado con el médico o el dentista."
      },
      {
        t: "Our train is {{delayed}}.",
        es: "Nuestro tren está atrasado.",
        pos: "v",
        gram: "'delayed' es el pasado regular de 'to delay' (retrasar): se agrega '-ed' a la base ('delay' → 'delayed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Almost all of them were {{delayed}}.",
        es: "Casi todos se retrasaron.",
        pos: "v",
        gram: "'delayed' es el pasado regular de 'to delay' (retrasar): se agrega '-ed' a la base ('delay' → 'delayed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Has the train been {{delayed}}?",
        es: "¿El tren se retrasó?",
        pos: "v",
        gram: "'delayed' es el pasado regular de 'to delay' (retrasar): se agrega '-ed' a la base ('delay' → 'delayed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "What is {{delayed}} may come later.",
        es: "Lo que está retrasado puede llegar más tarde.",
        pos: "v",
        gram: "'delayed' es el pasado regular de 'to delay' (retrasar): se agrega '-ed' a la base ('delay' → 'delayed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "{{Avoid}} the obstacles.",
        es: "Sortead los obstáculos.",
        pos: "v",
        gram: "'avoid' es la forma base (infinitivo sin 'to') de 'to avoid' (evitar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "I {{avoid}} Tom.",
        es: "Evito a Tom.",
        pos: "v",
        gram: "'avoid' es la forma base (infinitivo sin 'to') de 'to avoid' (evitar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Avoid}} bad company.",
        es: "Guárdese de las malas compañías.",
        pos: "v",
        gram: "'avoid' es la forma base (infinitivo sin 'to') de 'to avoid' (evitar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Be careful, {{avoid}} risks.",
        es: "Ten cuidado, evita riesgos.",
        pos: "v",
        gram: "'avoid' es la forma base (infinitivo sin 'to') de 'to avoid' (evitar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Yanni {{apologized}}.",
        es: "Yanni se disculpó.",
        pos: "v",
        gram: "'apologized' es el pasado regular de 'to apologize' (disculparse): se agrega solo '-d' porque la base ya termina en 'e' ('apologize' → 'apologized'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "I {{apologized}}.",
        es: "Me disculpé.",
        pos: "v",
        gram: "'apologized' es el pasado regular de 'to apologize' (disculparse): se agrega solo '-d' porque la base ya termina en 'e' ('apologize' → 'apologized'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Tom {{apologized}}.",
        es: "Tomás se disculpó.",
        pos: "v",
        gram: "'apologized' es el pasado regular de 'to apologize' (disculparse): se agrega solo '-d' porque la base ya termina en 'e' ('apologize' → 'apologized'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "I require {{advice}}.",
        es: "Necesito que me aconsejen.",
        pos: "n",
        gram: "'advice' (consejo) es un sustantivo INCONTABLE en inglés — nunca lleva 's' ('advices' no existe) ni 'an' delante. Para contar consejos se dice 'a piece of advice'."
      },
      {
        t: "I need {{advice}}.",
        es: "Yo necesito consejos.",
        pos: "n",
        gram: "'advice' (consejo) es un sustantivo INCONTABLE en inglés — nunca lleva 's' ('advices' no existe) ni 'an' delante. Para contar consejos se dice 'a piece of advice'."
      },
      {
        t: "Follow my {{advice}}.",
        es: "Sigue mi consejo.",
        pos: "n",
        gram: "'advice' (consejo) es un sustantivo INCONTABLE en inglés — nunca lleva 's' ('advices' no existe) ni 'an' delante. Para contar consejos se dice 'a piece of advice'."
      },
      {
        t: "This is good {{advice}}.",
        es: "Es un buen consejo.",
        pos: "n",
        gram: "'advice' (consejo) es un sustantivo INCONTABLE en inglés — nunca lleva 's' ('advices' no existe) ni 'an' delante. Para contar consejos se dice 'a piece of advice'."
      },
      {
        t: "I {{suggest}} we leave.",
        es: "Sugiero que nos vayamos.",
        pos: "v",
        gram: "'suggest' es la forma base (infinitivo sin 'to') de 'to suggest' (sugerir). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "The data {{suggest}} otherwise.",
        es: "Los datos sugieren lo contrario.",
        pos: "v",
        gram: "'suggest' es la forma base (infinitivo sin 'to') de 'to suggest' (sugerir). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "I {{suggest}} you hide.",
        es: "Te sugiero que te escondas.",
        pos: "v",
        gram: "'suggest' es la forma base (infinitivo sin 'to') de 'to suggest' (sugerir). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "That {{depends}} on you.",
        es: "Eso depende de vosotros.",
        pos: "v",
        gram: "'depends' es la forma de tercera persona singular (he/she/it) de 'to depend' (depender) en presente simple: se agrega '-s' (o '-es') a la base."
      },
      {
        t: "Tom {{depends}} on Mary.",
        es: "Tom depende de Mary.",
        pos: "v",
        gram: "'depends' es la forma de tercera persona singular (he/she/it) de 'to depend' (depender) en presente simple: se agrega '-s' (o '-es') a la base."
      },
      {
        t: "That {{depends}} on the context.",
        es: "Eso depende del contexto.",
        pos: "v",
        gram: "'depends' es la forma de tercera persona singular (he/she/it) de 'to depend' (depender) en presente simple: se agrega '-s' (o '-es') a la base."
      },
      {
        t: "She's {{disappointed}}.",
        es: "Ella estaba decepcionada.",
        pos: "adj",
        gram: "'disappointed' (decepcionado) es un adjetivo terminado en '-ed': describe cómo se SIENTE una persona. Distinto de 'disappointing' (que decepciona a otros)."
      },
      {
        t: "You are {{disappointed}}.",
        es: "Usted está desilusionado.",
        pos: "adj",
        gram: "'disappointed' (decepcionado) es un adjetivo terminado en '-ed': describe cómo se SIENTE una persona. Distinto de 'disappointing' (que decepciona a otros)."
      },
      {
        t: "Tom felt {{disappointed}}.",
        es: "Tom se sintió decepcionado.",
        pos: "adj",
        gram: "'disappointed' (decepcionado) es un adjetivo terminado en '-ed': describe cómo se SIENTE una persona. Distinto de 'disappointing' (que decepciona a otros)."
      },
      {
        t: "Are you {{disappointed}}?",
        es: "¿Estáis decepcionados?",
        pos: "adj",
        gram: "'disappointed' (decepcionado) es un adjetivo terminado en '-ed': describe cómo se SIENTE una persona. Distinto de 'disappointing' (que decepciona a otros)."
      },
      {
        t: "He's very {{experienced}}.",
        es: "Él tiene mucha experiencia.",
        pos: "adj",
        gram: "'experienced' (experimentado, con experiencia) es un adjetivo terminado en '-ed', de la familia de 'experience' (experiencia)."
      },
      {
        t: "Have you {{experienced}} xenophobia?",
        es: "¿Has experimentado la xenofobia?",
        pos: "adj",
        gram: "'experienced' (experimentado, con experiencia) es un adjetivo terminado en '-ed', de la familia de 'experience' (experiencia)."
      },
      {
        t: "He's young but {{experienced}}.",
        es: "Él es joven pero experimentado.",
        pos: "adj",
        gram: "'experienced' (experimentado, con experiencia) es un adjetivo terminado en '-ed', de la familia de 'experience' (experiencia)."
      },
      {
        t: "Have you {{experienced}} nausea recently?",
        es: "¿Has sentido nauseas últimamente?",
        pos: "adj",
        gram: "'experienced' (experimentado, con experiencia) es un adjetivo terminado en '-ed', de la familia de 'experience' (experiencia)."
      },
      {
        t: "Who can {{afford}} this?",
        es: "¿Quién se puede permitir esto?",
        pos: "v",
        gram: "'afford' es la forma base (infinitivo sin 'to') de 'to afford' (permitirse (algo, económicamente)). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "I can {{afford}} it.",
        es: "Me lo puedo permitir.",
        pos: "v",
        gram: "'afford' es la forma base (infinitivo sin 'to') de 'to afford' (permitirse (algo, económicamente)). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "We cannot {{afford}} it.",
        es: "No podemos costearlo.",
        pos: "v",
        gram: "'afford' es la forma base (infinitivo sin 'to') de 'to afford' (permitirse (algo, económicamente)). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Tom can't {{afford}} bail.",
        es: "Tomás no puede pagar la fianza.",
        pos: "v",
        gram: "'afford' es la forma base (infinitivo sin 'to') de 'to afford' (permitirse (algo, económicamente)). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Return}} this.",
        es: "Regresa esto.",
        pos: "v",
        gram: "'return' es la forma base (infinitivo sin 'to') de 'to return' (volver / devolver). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Return}} fire.",
        es: "Responded a sus disparos.",
        pos: "v",
        gram: "'return' es la forma base (infinitivo sin 'to') de 'to return' (volver / devolver). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Return}} immediately.",
        es: "Vuelve inmediatamente.",
        pos: "v",
        gram: "'return' es la forma base (infinitivo sin 'to') de 'to return' (volver / devolver). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "You might {{return}}.",
        es: "Quizá vuelva.",
        pos: "v",
        gram: "'return' es la forma base (infinitivo sin 'to') de 'to return' (volver / devolver). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Keep {{running}}.",
        es: "Seguí corriendo.",
        pos: "v",
        gram: "'running' es el gerundio (participio presente) de 'to run' (correr): se dobla la consonante final antes de '-ing' porque la base termina en consonante-vocal-consonante ('run' → 'running'). Se usa en tiempos continuos ('is/are/was/were running') o como sustantivo verbal."
      },
      {
        t: "Start {{running}}.",
        es: "Empieza a correr.",
        pos: "v",
        gram: "'running' es el gerundio (participio presente) de 'to run' (correr): se dobla la consonante final antes de '-ing' porque la base termina en consonante-vocal-consonante ('run' → 'running'). Se usa en tiempos continuos ('is/are/was/were running') o como sustantivo verbal."
      },
      {
        t: "I hate black {{humor}}.",
        es: "Detesto el humor negro.",
        pos: "n",
        gram: "'humor' (humor, sentido del humor) es INCONTABLE: no lleva 's' ni 'a/an'. En inglés británico se escribe 'humour'."
      },
      {
        t: "Do you like absurd {{humor}}?",
        es: "¿Te gusta el humor absurdo?",
        pos: "n",
        gram: "'humor' (humor, sentido del humor) es INCONTABLE: no lleva 's' ni 'a/an'. En inglés británico se escribe 'humour'."
      },
      {
        t: "He is devoid of {{humor}}.",
        es: "Él es desprovisto de humor.",
        pos: "n",
        gram: "'humor' (humor, sentido del humor) es INCONTABLE: no lleva 's' ni 'a/an'. En inglés británico se escribe 'humour'."
      },
      {
        t: "Do you not like dark {{humor}}?",
        es: "¿No le gusta el humor negro?",
        pos: "n",
        gram: "'humor' (humor, sentido del humor) es INCONTABLE: no lleva 's' ni 'a/an'. En inglés británico se escribe 'humour'."
      },
      {
        t: "Is this {{worth}} it?",
        es: "¿Vale la pena esto?",
        pos: "adj",
        gram: "'worth' (que vale/merece la pena) va con sustantivo o '-ing': 'worth the money', 'worth trying' — nunca 'worth to try'."
      },
      {
        t: "I'm {{worth}} it.",
        es: "Valgo la pena.",
        pos: "adj",
        gram: "'worth' (que vale/merece la pena) va con sustantivo o '-ing': 'worth the money', 'worth trying' — nunca 'worth to try'."
      },
      {
        t: "You're {{worth}} it.",
        es: "Tú lo vales.",
        pos: "adj",
        gram: "'worth' (que vale/merece la pena) va con sustantivo o '-ing': 'worth the money', 'worth trying' — nunca 'worth to try'."
      },
      {
        t: "Are they {{worth}} it?",
        es: "¿Valen la pena?",
        pos: "adj",
        gram: "'worth' (que vale/merece la pena) va con sustantivo o '-ing': 'worth the money', 'worth trying' — nunca 'worth to try'."
      },
      {
        t: "Can you {{recall}} the accident?",
        es: "¿Puedes recordar el accidente?",
        pos: "v",
        gram: "'recall' es la forma base (infinitivo sin 'to') de 'to recall' (recordar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "I often {{recall}} my happy childhood memories.",
        es: "A menudo rememoro los felices recuerdos de mi infancia.",
        pos: "v",
        gram: "'recall' es la forma base (infinitivo sin 'to') de 'to recall' (recordar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Try to {{recall}} what happened.",
        es: "Intenta recordar lo que pasó.",
        pos: "v",
        gram: "'recall' es la forma base (infinitivo sin 'to') de 'to recall' (recordar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "I don't {{recall}} asking you for help.",
        es: "No recuerdo haber pedido tu ayuda.",
        pos: "v",
        gram: "'recall' es la forma base (infinitivo sin 'to') de 'to recall' (recordar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "I understand the {{reason}}.",
        es: "Entiendo el motivo.",
        pos: "n",
        gram: "'reason' (razón, motivo) es contable: 'a reason', 'reasons'. La expresión 'the reason why' es muy común para explicar un motivo."
      },
      {
        t: "There's another {{reason}}.",
        es: "Hay otra razón.",
        pos: "n",
        gram: "'reason' (razón, motivo) es contable: 'a reason', 'reasons'. La expresión 'the reason why' es muy común para explicar un motivo."
      },
      {
        t: "That's the {{reason}}.",
        es: "Esa es la razón.",
        pos: "n",
        gram: "'reason' (razón, motivo) es contable: 'a reason', 'reasons'. La expresión 'the reason why' es muy común para explicar un motivo."
      },
      {
        t: "Give me a {{reason}}.",
        es: "Dame una razón.",
        pos: "n",
        gram: "'reason' (razón, motivo) es contable: 'a reason', 'reasons'. La expresión 'the reason why' es muy común para explicar un motivo."
      },
      {
        t: "I {{pretended}} to work.",
        es: "Fingí que trabajaba.",
        pos: "v",
        gram: "'pretended' es el pasado regular de 'to pretend' (fingir): se agrega '-ed' a la base ('pretend' → 'pretended'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "They {{pretended}} they were asleep.",
        es: "Fingían dormir.",
        pos: "v",
        gram: "'pretended' es el pasado regular de 'to pretend' (fingir): se agrega '-ed' a la base ('pretend' → 'pretended'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "She {{pretended}} to not care.",
        es: "Ella fingía indiferencia.",
        pos: "v",
        gram: "'pretended' es el pasado regular de 'to pretend' (fingir): se agrega '-ed' a la base ('pretend' → 'pretended'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Lisa {{pretended}} not to hear.",
        es: "Lisa fingió no escuchar.",
        pos: "v",
        gram: "'pretended' es el pasado regular de 'to pretend' (fingir): se agrega '-ed' a la base ('pretend' → 'pretended'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "This road {{connects}} the two cities.",
        es: "Este camino une a las dos ciudades.",
        pos: "v",
        gram: "'connects' es la forma de tercera persona singular (he/she/it) de 'to connect' (conectar) en presente simple: se agrega '-s' (o '-es') a la base."
      },
      {
        t: "This bus {{connects}} the two large cities.",
        es: "Este autobús comunica las dos grandes ciudades.",
        pos: "v",
        gram: "'connects' es la forma de tercera persona singular (he/she/it) de 'to connect' (conectar) en presente simple: se agrega '-s' (o '-es') a la base."
      },
      {
        t: "I {{barely}} eat meat.",
        es: "Apenas como carne.",
        pos: "adv",
        gram: "'barely' (apenas) es un adverbio de frecuencia/grado que casi siempre va antes del verbo principal, como 'never' o 'always'."
      },
      {
        t: "I {{barely}} had dinner.",
        es: "Apenas cené.",
        pos: "adv",
        gram: "'barely' (apenas) es un adverbio de frecuencia/grado que casi siempre va antes del verbo principal, como 'never' o 'always'."
      },
      {
        t: "I {{barely}} ate dinner.",
        es: "Apenas cené.",
        pos: "adv",
        gram: "'barely' (apenas) es un adverbio de frecuencia/grado que casi siempre va antes del verbo principal, como 'never' o 'always'."
      },
      {
        t: "I could {{barely}} stand.",
        es: "Apenas podía mantenerme en pie.",
        pos: "adv",
        gram: "'barely' (apenas) es un adverbio de frecuencia/grado que casi siempre va antes del verbo principal, como 'never' o 'always'."
      },
      {
        t: "You've {{grown}}.",
        es: "Has crecido.",
        pos: "v",
        gram: "'grown' es el pasado irregular de 'to grow' (crecer). OJO: esta es la forma de PARTICIPIO ('grow-grew-grown'), no el pasado simple. Se usa con 'have/has/had' ('has grown') o como adjetivo."
      },
      {
        t: "You've {{grown}} fat.",
        es: "Has engordado.",
        pos: "v",
        gram: "'grown' es el pasado irregular de 'to grow' (crecer). OJO: esta es la forma de PARTICIPIO ('grow-grew-grown'), no el pasado simple. Se usa con 'have/has/had' ('has grown') o como adjetivo."
      },
      {
        t: "How you've {{grown}}!",
        es: "¡Cómo has crecido!",
        pos: "v",
        gram: "'grown' es el pasado irregular de 'to grow' (crecer). OJO: esta es la forma de PARTICIPIO ('grow-grew-grown'), no el pasado simple. Se usa con 'have/has/had' ('has grown') o como adjetivo."
      },
      {
        t: "My children are {{grown}} up.",
        es: "Mis hijos son adultos.",
        pos: "v",
        gram: "'grown' es el pasado irregular de 'to grow' (crecer). OJO: esta es la forma de PARTICIPIO ('grow-grew-grown'), no el pasado simple. Se usa con 'have/has/had' ('has grown') o como adjetivo."
      },
      {
        t: "{{Waiting}} is boring.",
        es: "Esperar es aburrido.",
        pos: "v",
        gram: "'waiting' es el gerundio (participio presente) de 'to wait' (esperar): se agrega '-ing' a la base ('wait' → 'waiting'). Se usa en tiempos continuos ('is/are/was/were waiting') o como sustantivo verbal."
      },
      {
        t: "We're {{waiting}}.",
        es: "Esperamos.",
        pos: "v",
        gram: "'waiting' es el gerundio (participio presente) de 'to wait' (esperar): se agrega '-ing' a la base ('wait' → 'waiting'). Se usa en tiempos continuos ('is/are/was/were waiting') o como sustantivo verbal."
      },
      {
        t: "Who {{canceled}}?",
        es: "¿Quién canceló?",
        pos: "v",
        gram: "'canceled' es el pasado regular de 'to cancel' (cancelar): se agrega '-ed' a la base ('cancel' → 'canceled'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Tom {{canceled}}.",
        es: "Tom canceló.",
        pos: "v",
        gram: "'canceled' es el pasado regular de 'to cancel' (cancelar): se agrega '-ed' a la base ('cancel' → 'canceled'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "They {{canceled}}.",
        es: "Cancelaron.",
        pos: "v",
        gram: "'canceled' es el pasado regular de 'to cancel' (cancelar): se agrega '-ed' a la base ('cancel' → 'canceled'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "I {{canceled}} it.",
        es: "Yo lo cancelé.",
        pos: "v",
        gram: "'canceled' es el pasado regular de 'to cancel' (cancelar): se agrega '-ed' a la base ('cancel' → 'canceled'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "I wonder {{whether}} you understand.",
        es: "Me pregunto si entiendes.",
        pos: "conj",
        gram: "'whether' (si, al plantear una opción) introduce una pregunta indirecta o una elección entre alternativas: 'I don't know whether to go or stay'."
      },
      {
        t: "Check {{whether}} the papayas are ripe.",
        es: "Verificá si las papayas están maduras.",
        pos: "conj",
        gram: "'whether' (si, al plantear una opción) introduce una pregunta indirecta o una elección entre alternativas: 'I don't know whether to go or stay'."
      },
      {
        t: "I wonder {{whether}} Tom is angry.",
        es: "Me pregunto si Tom está enojado.",
        pos: "conj",
        gram: "'whether' (si, al plantear una opción) introduce una pregunta indirecta o una elección entre alternativas: 'I don't know whether to go or stay'."
      },
      {
        t: "Do you know {{whether}} Tom lives here?",
        es: "¿Sabes si Tom vive aquí?",
        pos: "conj",
        gram: "'whether' (si, al plantear una opción) introduce una pregunta indirecta o una elección entre alternativas: 'I don't know whether to go or stay'."
      },
      {
        t: "The {{forecast}} rain never eventuated.",
        es: "La previsión de lluvia nunca ocurrió.",
        pos: "n",
        gram: "'forecast' (pronóstico) es contable, y su plural NO cambia: 'one forecast, two forecast(s)' — muchos hablantes lo dejan igual en plural, como 'sheep'."
      },
      {
        t: "The weather is {{forecast}} scientifically.",
        es: "El clima es pronosticado científicamente.",
        pos: "n",
        gram: "'forecast' (pronóstico) es contable, y su plural NO cambia: 'one forecast, two forecast(s)' — muchos hablantes lo dejan igual en plural, como 'sheep'."
      },
      {
        t: "Rain is {{forecast}} for this evening.",
        es: "Se pronostica lluvia para esta noche.",
        pos: "n",
        gram: "'forecast' (pronóstico) es contable, y su plural NO cambia: 'one forecast, two forecast(s)' — muchos hablantes lo dejan igual en plural, como 'sheep'."
      },
      {
        t: "Today's weather {{forecast}} proved right.",
        es: "El pronóstico del tiempo acertó hoy.",
        pos: "n",
        gram: "'forecast' (pronóstico) es contable, y su plural NO cambia: 'one forecast, two forecast(s)' — muchos hablantes lo dejan igual en plural, como 'sheep'."
      },
      {
        t: "{{Fill}} this out.",
        es: "Rellena esto.",
        pos: "v",
        gram: "'fill' es la forma base (infinitivo sin 'to') de 'to fill' (llenar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Fill}} out the questionnaire.",
        es: "Rellena el cuestionario.",
        pos: "v",
        gram: "'fill' es la forma base (infinitivo sin 'to') de 'to fill' (llenar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Just {{fill}} this out.",
        es: "Limítate a rellenarlo.",
        pos: "v",
        gram: "'fill' es la forma base (infinitivo sin 'to') de 'to fill' (llenar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Fill}} up the tank.",
        es: "Llena el depósito.",
        pos: "v",
        gram: "'fill' es la forma base (infinitivo sin 'to') de 'to fill' (llenar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Try {{solving}} the problem.",
        es: "Intenta resolver el problema.",
        pos: "v",
        gram: "'solving' es el gerundio (participio presente) de 'to solve' (resolver): se quita la 'e' final antes de '-ing' ('solve' → 'solving'). Se usa en tiempos continuos ('is/are/was/were solving') o como sustantivo verbal."
      },
      {
        t: "Tom tried {{solving}} the problem.",
        es: "Tom intentó resolver el problema.",
        pos: "v",
        gram: "'solving' es el gerundio (participio presente) de 'to solve' (resolver): se quita la 'e' final antes de '-ing' ('solve' → 'solving'). Se usa en tiempos continuos ('is/are/was/were solving') o como sustantivo verbal."
      },
      {
        t: "I'm {{solving}} a puzzle.",
        es: "Estoy resolviendo un acertijo.",
        pos: "v",
        gram: "'solving' es el gerundio (participio presente) de 'to solve' (resolver): se quita la 'e' final antes de '-ing' ('solve' → 'solving'). Se usa en tiempos continuos ('is/are/was/were solving') o como sustantivo verbal."
      },
      {
        t: "He tried {{solving}} the problem.",
        es: "Él trató de resolver el problema.",
        pos: "v",
        gram: "'solving' es el gerundio (participio presente) de 'to solve' (resolver): se quita la 'e' final antes de '-ing' ('solve' → 'solving'). Se usa en tiempos continuos ('is/are/was/were solving') o como sustantivo verbal."
      },
      {
        t: "He {{surprised}} us.",
        es: "Nos sorprendió.",
        pos: "v",
        gram: "'surprised' es el pasado regular de 'to surprise' (sorprender): se agrega solo '-d' porque la base ya termina en 'e' ('surprise' → 'surprised'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "That {{surprised}} me.",
        es: "Eso me sorprendió.",
        pos: "v",
        gram: "'surprised' es el pasado regular de 'to surprise' (sorprender): se agrega solo '-d' porque la base ya termina en 'e' ('surprise' → 'surprised'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "He's {{surprised}}.",
        es: "Está sorprendido.",
        pos: "v",
        gram: "'surprised' es el pasado regular de 'to surprise' (sorprender): se agrega solo '-d' porque la base ya termina en 'e' ('surprise' → 'surprised'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "They were {{surprised}}.",
        es: "Estaban sorprendidos.",
        pos: "v",
        gram: "'surprised' es el pasado regular de 'to surprise' (sorprender): se agrega solo '-d' porque la base ya termina en 'e' ('surprise' → 'surprised'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Is she {{against}} you?",
        es: "¿Está ella en tu contra?",
        pos: "prep",
        gram: "'against' (en contra de/contra) se usa para oposición o contacto físico: 'to fight against', 'lean against the wall'."
      },
      {
        t: "Are you {{against}} them?",
        es: "¿Estás en contra de ellos?",
        pos: "prep",
        gram: "'against' (en contra de/contra) se usa para oposición o contacto físico: 'to fight against', 'lean against the wall'."
      },
      {
        t: "I stand {{against}} Israel.",
        es: "Estoy en contra de Israel.",
        pos: "prep",
        gram: "'against' (en contra de/contra) se usa para oposición o contacto físico: 'to fight against', 'lean against the wall'."
      },
      {
        t: "Some are {{against}} it.",
        es: "Algunos están en contra.",
        pos: "prep",
        gram: "'against' (en contra de/contra) se usa para oposición o contacto físico: 'to fight against', 'lean against the wall'."
      },
      {
        t: "Let's {{review}} Lesson 5.",
        es: "Vamos a repasar la Lección 5.",
        pos: "v",
        gram: "'review' es la forma base (infinitivo sin 'to') de 'to review' (revisar / repasar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Today I have to {{review}} Spanish.",
        es: "Hoy tengo que repasar español.",
        pos: "v",
        gram: "'review' es la forma base (infinitivo sin 'to') de 'to review' (revisar / repasar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "I will write a {{review}} of that book.",
        es: "Escribiré una crítica para ese libro.",
        pos: "v",
        gram: "'review' es la forma base (infinitivo sin 'to') de 'to review' (revisar / repasar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "All entries are subject to {{review}} once added.",
        es: "Todas las entradas son sujetas a revisión una vez que son agregadas.",
        pos: "v",
        gram: "'review' es la forma base (infinitivo sin 'to') de 'to review' (revisar / repasar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "You need {{patience}}.",
        es: "Necesitas paciencia.",
        pos: "n",
        gram: "'patience' (paciencia) es INCONTABLE: no lleva 's' ni 'a/an'. Ojo con la ortografía: se parece a 'patients' (pacientes), pero son palabras distintas."
      },
      {
        t: "I lack {{patience}}.",
        es: "Me falta paciencia.",
        pos: "n",
        gram: "'patience' (paciencia) es INCONTABLE: no lleva 's' ni 'a/an'. Ojo con la ortografía: se parece a 'patients' (pacientes), pero son palabras distintas."
      },
      {
        t: "Genius is eternal {{patience}}.",
        es: "El genio es paciencia eterna.",
        pos: "n",
        gram: "'patience' (paciencia) es INCONTABLE: no lleva 's' ni 'a/an'. Ojo con la ortografía: se parece a 'patients' (pacientes), pero son palabras distintas."
      },
      {
        t: "Her {{patience}} is exhausted.",
        es: "Su paciencia está agotada.",
        pos: "n",
        gram: "'patience' (paciencia) es INCONTABLE: no lleva 's' ni 'a/an'. Ojo con la ortografía: se parece a 'patients' (pacientes), pero son palabras distintas."
      },
      {
        t: "I want to {{compete}}.",
        es: "Quiero competir.",
        pos: "v",
        gram: "'compete' es la forma base (infinitivo sin 'to') de 'to compete' (competir). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "We can't {{compete}} with that.",
        es: "No podemos competir con eso.",
        pos: "v",
        gram: "'compete' es la forma base (infinitivo sin 'to') de 'to compete' (competir). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "We can't {{compete}} with Asia.",
        es: "No podemos competir con Asia.",
        pos: "v",
        gram: "'compete' es la forma base (infinitivo sin 'to') de 'to compete' (competir). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "That word {{describes}} it perfectly.",
        es: "Esa palabra lo describe perfectamente.",
        pos: "v",
        gram: "'describes' es la forma de tercera persona singular (he/she/it) de 'to describe' (describir) en presente simple: se agrega '-s' (o '-es') a la base."
      },
      {
        t: "{{Consider}} divorce.",
        es: "Consideren el divorcio.",
        pos: "v",
        gram: "'consider' es la forma base (infinitivo sin 'to') de 'to consider' (considerar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Consider}} the source.",
        es: "Considera la fuente.",
        pos: "v",
        gram: "'consider' es la forma base (infinitivo sin 'to') de 'to consider' (considerar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Consider}} yourselves lucky.",
        es: "Considérense afortunados.",
        pos: "v",
        gram: "'consider' es la forma base (infinitivo sin 'to') de 'to consider' (considerar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Consider}} yourself lucky.",
        es: "Considérate afortunado.",
        pos: "v",
        gram: "'consider' es la forma base (infinitivo sin 'to') de 'to consider' (considerar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Paella often {{includes}} snails.",
        es: "La paella a menudo incluye caracoles.",
        pos: "v",
        gram: "'includes' es la forma de tercera persona singular (he/she/it) de 'to include' (incluir) en presente simple: se agrega '-s' (o '-es') a la base."
      },
      {
        t: "This amount {{includes}} tax.",
        es: "Este monto incluye impuestos.",
        pos: "v",
        gram: "'includes' es la forma de tercera persona singular (he/she/it) de 'to include' (incluir) en presente simple: se agrega '-s' (o '-es') a la base."
      },
      {
        t: "The price {{includes}} tax.",
        es: "El precio incluye impuestos.",
        pos: "v",
        gram: "'includes' es la forma de tercera persona singular (he/she/it) de 'to include' (incluir) en presente simple: se agrega '-s' (o '-es') a la base."
      },
      {
        t: "Everyone {{noticed}}.",
        es: "Todo el mundo se dio cuenta.",
        pos: "v",
        gram: "'noticed' es el pasado regular de 'to notice' (notar): se agrega solo '-d' porque la base ya termina en 'e' ('notice' → 'noticed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Not everyone {{noticed}}.",
        es: "No todos notaron.",
        pos: "v",
        gram: "'noticed' es el pasado regular de 'to notice' (notar): se agrega solo '-d' porque la base ya termina en 'e' ('notice' → 'noticed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "We {{noticed}} the coincidence.",
        es: "Nos percatamos de la coincidencia.",
        pos: "v",
        gram: "'noticed' es el pasado regular de 'to notice' (notar): se agrega solo '-d' porque la base ya termina en 'e' ('notice' → 'noticed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "The principal {{noticed}} that.",
        es: "El director se dio cuenta de eso.",
        pos: "v",
        gram: "'noticed' es el pasado regular de 'to notice' (notar): se agrega solo '-d' porque la base ya termina en 'e' ('notice' → 'noticed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "He {{hired}} mercenaries.",
        es: "Él contrató mercenarios.",
        pos: "v",
        gram: "'hired' es el pasado regular de 'to hire' (contratar): se agrega solo '-d' porque la base ya termina en 'e' ('hire' → 'hired'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Tom was {{hired}}.",
        es: "Tom fue contratado.",
        pos: "v",
        gram: "'hired' es el pasado regular de 'to hire' (contratar): se agrega solo '-d' porque la base ya termina en 'e' ('hire' → 'hired'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Tom {{hired}} Mary.",
        es: "Tom contrató a Mary.",
        pos: "v",
        gram: "'hired' es el pasado regular de 'to hire' (contratar): se agrega solo '-d' porque la base ya termina en 'e' ('hire' → 'hired'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "I {{hired}} Tom.",
        es: "Contraté a Tom.",
        pos: "v",
        gram: "'hired' es el pasado regular de 'to hire' (contratar): se agrega solo '-d' porque la base ya termina en 'e' ('hire' → 'hired'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "{{Concentrate}}, Tom.",
        es: "Concéntrate, Tom.",
        pos: "v",
        gram: "'concentrate' es la forma base (infinitivo sin 'to') de 'to concentrate' (concentrarse). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Tom was unable to {{concentrate}}.",
        es: "Tom era incapaz de concentrarse.",
        pos: "v",
        gram: "'concentrate' es la forma base (infinitivo sin 'to') de 'to concentrate' (concentrarse). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Let him {{concentrate}}.",
        es: "Dejadlo concentrarse.",
        pos: "v",
        gram: "'concentrate' es la forma base (infinitivo sin 'to') de 'to concentrate' (concentrarse). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Let me {{concentrate}}.",
        es: "Déjame concentrarme.",
        pos: "v",
        gram: "'concentrate' es la forma base (infinitivo sin 'to') de 'to concentrate' (concentrarse). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "We {{shared}} ideas.",
        es: "Compartimos ideas.",
        pos: "v",
        gram: "'shared' es el pasado regular de 'to share' (compartir): se agrega solo '-d' porque la base ya termina en 'e' ('share' → 'shared'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "We {{shared}} everything.",
        es: "Compartíamos todo.",
        pos: "v",
        gram: "'shared' es el pasado regular de 'to share' (compartir): se agrega solo '-d' porque la base ya termina en 'e' ('share' → 'shared'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Tom got {{worse}}.",
        es: "Tom se puso peor.",
        pos: "adj",
        gram: "'worse' es el comparativo IRREGULAR de 'bad' (malo): bad → worse → worst (no se dice 'badder')."
      },
      {
        t: "Mine are {{worse}}.",
        es: "Las mías son peores.",
        pos: "adj",
        gram: "'worse' es el comparativo IRREGULAR de 'bad' (malo): bad → worse → worst (no se dice 'badder')."
      },
      {
        t: "I expected {{worse}}.",
        es: "Esperaba algo peor.",
        pos: "adj",
        gram: "'worse' es el comparativo IRREGULAR de 'bad' (malo): bad → worse → worst (no se dice 'badder')."
      },
      {
        t: "Yours is {{worse}}.",
        es: "El tuyo es peor.",
        pos: "adj",
        gram: "'worse' es el comparativo IRREGULAR de 'bad' (malo): bad → worse → worst (no se dice 'badder')."
      },
      {
        t: "I await a {{detailed}} report.",
        es: "Me espero un informe detallado.",
        pos: "adj",
        gram: "'detailed' (detallado) es un adjetivo terminado en '-ed', de la familia de 'to detail' (detallar) — describe algo hecho con muchos detalles."
      },
      {
        t: "I gave Tom {{detailed}} instructions.",
        es: "Le dí a Tom instrucciones detalladas.",
        pos: "adj",
        gram: "'detailed' (detallado) es un adjetivo terminado en '-ed', de la familia de 'to detail' (detallar) — describe algo hecho con muchos detalles."
      },
      {
        t: "Tom gave a {{detailed}} answer.",
        es: "Tom contestó con pelos y señales.",
        pos: "adj",
        gram: "'detailed' (detallado) es un adjetivo terminado en '-ed', de la familia de 'to detail' (detallar) — describe algo hecho con muchos detalles."
      },
      {
        t: "I gave him {{detailed}} instructions.",
        es: "Le di instrucciones detalladas.",
        pos: "adj",
        gram: "'detailed' (detallado) es un adjetivo terminado en '-ed', de la familia de 'to detail' (detallar) — describe algo hecho con muchos detalles."
      },
      {
        t: "Her {{attitude}} is praiseworthy.",
        es: "Su actitud es digna de elogio.",
        pos: "n",
        gram: "'attitude' (actitud) es contable: 'an attitude', 'attitudes'. Se suele usar con adjetivos: 'a positive/negative attitude'."
      },
      {
        t: "His {{attitude}} is praiseworthy.",
        es: "Su actitud es digna de elogio.",
        pos: "n",
        gram: "'attitude' (actitud) es contable: 'an attitude', 'attitudes'. Se suele usar con adjetivos: 'a positive/negative attitude'."
      },
      {
        t: "That's the {{attitude}}.",
        es: "Esa es la actitud.",
        pos: "n",
        gram: "'attitude' (actitud) es contable: 'an attitude', 'attitudes'. Se suele usar con adjetivos: 'a positive/negative attitude'."
      },
      {
        t: "I like your {{attitude}}.",
        es: "Me agrada tu actitud.",
        pos: "n",
        gram: "'attitude' (actitud) es contable: 'an attitude', 'attitudes'. Se suele usar con adjetivos: 'a positive/negative attitude'."
      }
    ]
  },
  {
    id: "ft4",
    name: "Fast Track 4 · Palabras 5000+",
    desc: "Lenguaje formal, prensa, negocios y academia",
    icon: "🎓",
    sentences: [
      {
        t: "The evidence {{suggests}} that the theory is correct.",
        es: "La evidencia sugiere que la teoría es correcta.",
        pos: "v",
        gram: "'suggests' es la forma de tercera persona singular (he/she/it) de 'to suggest' (sugerir) en presente simple: se agrega '-s' (o '-es') a la base."
      },
      {
        t: "The new policy will {{affect}} thousands of workers.",
        es: "La nueva política afectará a miles de trabajadores.",
        pos: "v",
        gram: "'affect' es la forma base (infinitivo sin 'to') de 'to affect' (afectar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "They reached an {{agreement}} after hours of discussion.",
        es: "Llegaron a un acuerdo tras horas de discusión.",
        pos: "n",
        gram: "'agreement' (acuerdo) es contable ('an agreement', 'agreements'). La expresión 'to reach an agreement' significa llegar a un acuerdo."
      },
      {
        t: "The study {{revealed}} surprising results.",
        es: "El estudio reveló resultados sorprendentes.",
        pos: "v",
        gram: "'revealed' es el pasado regular de 'to reveal' (revelar): se agrega '-ed' a la base ('reveal' → 'revealed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "There has been a {{significant}} increase in prices.",
        es: "Ha habido un aumento significativo en los precios.",
        pos: "adj",
        gram: "'significant' (significativo, importante) es un adjetivo largo: su comparativo se forma con 'more' ('more significant'), no con '-er'."
      },
      {
        t: "We need to {{address}} this issue immediately.",
        es: "Necesitamos abordar este asunto de inmediato.",
        pos: "v",
        gram: "'address' es la forma base (infinitivo sin 'to') de 'to address' (dirigirse a / abordar (un problema)). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "His argument was not very {{convincing}}.",
        es: "Su argumento no fue muy convincente.",
        pos: "adj",
        gram: "'convincing' (convincente) es un adjetivo terminado en '-ing', de la familia de 'to convince' (convencer) — describe algo que convence."
      },
      {
        t: "The government announced new {{measures}} to reduce pollution.",
        es: "El gobierno anunció nuevas medidas para reducir la contaminación.",
        pos: "n",
        gram: "'measures' (medidas, en el sentido de acciones) se usa casi siempre en plural: 'to take measures' (tomar medidas). El singular 'a measure' existe pero es menos frecuente en este sentido."
      },
      {
        t: "We must take his opinion into {{account}}.",
        es: "Debemos tener en cuenta su opinión.",
        pos: "n",
        gram: "'account' (cuenta / relato) es un sustantivo contable: 'an account', 'two accounts'. Con 'bank' forma 'bank account' (cuenta bancaria); solo, también significa 'relato/versión de los hechos'."
      },
      {
        t: "The economy is showing signs of {{recovery}}.",
        es: "La economía muestra señales de recuperación.",
        pos: "n",
        gram: "'recovery' (recuperación) es normalmente incontable cuando habla de un proceso general ('a full recovery' es la excepción común, con artículo)."
      },
      {
        t: "She {{overcame}} many obstacles to achieve her dream.",
        es: "Ella superó muchos obstáculos para lograr su sueño.",
        pos: "v",
        gram: "'overcame' es el pasado irregular de 'to overcome' (superar). Sigue el mismo patrón que 'come → came' (overcome = over + come)."
      },
      {
        t: "Her performance {{exceeded}} all expectations.",
        es: "Su actuación superó todas las expectativas.",
        pos: "v",
        gram: "'exceeded' es el pasado regular de 'to exceed' (exceder): se agrega '-ed' a la base ('exceed' → 'exceeded'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "The disease spreads {{rapidly}} in crowded areas.",
        es: "La enfermedad se propaga rápidamente en zonas concurridas.",
        pos: "adv",
        gram: "'rapidly' (rápidamente) es un adverbio de modo formado con '-ly' a partir del adjetivo 'rapid' (rápido)."
      },
      {
        t: "He was {{reluctant}} to accept the offer.",
        es: "Él estaba reacio a aceptar la oferta.",
        pos: "adj",
        gram: "'reluctant' (reacio, poco dispuesto) va con 'to' + verbo: 'reluctant to leave' (reacio a irse)."
      },
      {
        t: "She spoke with {{remarkable}} confidence.",
        es: "Ella habló con una confianza notable.",
        pos: "adj",
        gram: "'remarkable' (notable, extraordinario) es un adjetivo regular formado con el sufijo '-able' a partir de 'remark' (comentario/notar)."
      },
      {
        t: "The committee will {{assess}} the damage next week.",
        es: "El comité evaluará los daños la próxima semana.",
        pos: "v",
        gram: "'assess' es la forma base (infinitivo sin 'to') de 'to assess' (evaluar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "His behavior is completely {{unacceptable}}.",
        es: "Su comportamiento es completamente inaceptable.",
        pos: "adj",
        gram: "'unacceptable' (inaceptable) se forma con el prefijo negativo 'un-' + 'acceptable' (aceptable) — patrón muy productivo en inglés para negar adjetivos."
      },
      {
        t: "The company {{underwent}} major changes last year.",
        es: "La empresa pasó por grandes cambios el año pasado.",
        pos: "v",
        gram: "'underwent' es el pasado irregular de 'to undergo' (someterse a / atravesar (una experiencia)). Sigue el mismo patrón que 'go → went' (undergo = under + go)."
      },
      {
        t: "The results were {{consistent}} with our predictions.",
        es: "Los resultados fueron consistentes con nuestras predicciones.",
        pos: "adj",
        gram: "'consistent' (consistente, coherente) es un adjetivo regular, va con 'with': 'consistent with the facts' (coherente con los hechos)."
      },
      {
        t: "He {{acknowledged}} that he had been wrong.",
        es: "Él reconoció que había estado equivocado.",
        pos: "v",
        gram: "'acknowledged' es el pasado regular de 'to acknowledge' (reconocer / admitir): se agrega solo '-d' porque la base ya termina en 'e' ('acknowledge' → 'acknowledged'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "The two events are closely {{related}}.",
        es: "Los dos eventos están estrechamente relacionados.",
        pos: "adj",
        gram: "'related' (relacionado) es un adjetivo terminado en '-ed'; se usa con 'to': 'related to the problem' (relacionado CON el problema)."
      },
      {
        t: "The negotiations {{broke}} down after two days.",
        es: "Las negociaciones fracasaron después de dos días.",
        pos: "v",
        gram: "'broke' es el pasado irregular de 'to break' (romper). Cambia la vocal 'ea' por 'o' — patrón parecido a 'speak → spoke'."
      },
      {
        t: "The lawyer presented {{compelling}} evidence.",
        es: "El abogado presentó pruebas contundentes.",
        pos: "adj",
        gram: "'compelling' (convincente, cautivador) es un adjetivo terminado en '-ing', de la misma familia que 'to compel' (obligar/forzar la atención)."
      },
      {
        t: "The volcano could {{erupt}} at any moment.",
        es: "El volcán podría entrar en erupción en cualquier momento.",
        pos: "v",
        gram: "'erupt' es la forma base (infinitivo sin 'to') de 'to erupt' (entrar en erupción). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Scientists are {{conducting}} experiments on the new material.",
        es: "Los científicos están realizando experimentos con el nuevo material.",
        pos: "v",
        gram: "'conducting' es el gerundio (participio presente) de 'to conduct' (realizar / dirigir): se agrega '-ing' a la base ('conduct' → 'conducting'). Se usa en tiempos continuos ('is/are/was/were conducting') o como sustantivo verbal."
      },
      {
        t: "The book provides a {{thorough}} analysis of the war.",
        es: "El libro ofrece un análisis exhaustivo de la guerra.",
        pos: "adj",
        gram: "'thorough' (minucioso, exhaustivo) es un adjetivo regular; ojo con la ortografía, se parece a 'through' (a través de) pero significan cosas distintas."
      },
      {
        t: "Despite the setbacks, she {{persevered}}.",
        es: "A pesar de los contratiempos, ella perseveró.",
        pos: "v",
        gram: "'persevered' es el pasado regular de 'to persevere' (perseverar): se agrega solo '-d' porque la base ya termina en 'e' ('persevere' → 'persevered'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "The city's population has {{declined}} steadily.",
        es: "La población de la ciudad ha disminuido de forma constante.",
        pos: "v",
        gram: "'declined' es el pasado regular de 'to decline' (rechazar / declinar): se agrega solo '-d' porque la base ya termina en 'e' ('decline' → 'declined'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "His comments {{triggered}} a heated debate.",
        es: "Sus comentarios desataron un debate acalorado.",
        pos: "v",
        gram: "'triggered' es el pasado regular de 'to trigger' (desencadenar): se agrega '-ed' a la base ('trigger' → 'triggered'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "The contract contains several {{ambiguous}} clauses.",
        es: "El contrato contiene varias cláusulas ambiguas.",
        pos: "adj",
        gram: "'ambiguous' (ambiguo) es un adjetivo regular: va antes del sustantivo ('an ambiguous answer') o después de 'to be' ('it is ambiguous')."
      },
      {
        t: "The charity relies {{heavily}} on donations.",
        es: "La organización benéfica depende en gran medida de las donaciones.",
        pos: "adv",
        gram: "'heavily' (fuertemente/mucho) es un adverbio de MODO formado con '-ly' a partir del adjetivo 'heavy' (pesado/fuerte): 'rain heavily' (llover fuerte)."
      },
      {
        t: "They had to {{postpone}} the launch due to technical issues.",
        es: "Tuvieron que posponer el lanzamiento por problemas técnicos.",
        pos: "v",
        gram: "'postpone' es la forma base (infinitivo sin 'to') de 'to postpone' (posponer). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "The witness's {{testimony}} was crucial to the case.",
        es: "El testimonio del testigo fue crucial para el caso.",
        pos: "n",
        gram: "'testimony' (testimonio) es contable, con plural irregular: 'testimonies' (y → ies). En un juicio, 'to give testimony' significa declarar."
      },
      {
        t: "Her novel was {{widely}} praised by critics.",
        es: "Su novela fue ampliamente elogiada por la crítica.",
        pos: "adv",
        gram: "'widely' (ampliamente) es un adverbio de modo formado con '-ly' a partir del adjetivo 'wide' (ancho/amplio)."
      },
      {
        t: "The manager {{dismissed}} the allegations as false.",
        es: "El gerente desestimó las acusaciones por falsas.",
        pos: "v",
        gram: "'dismissed' es el pasado regular de 'to dismiss' (despedir / desestimar): se agrega '-ed' a la base ('dismiss' → 'dismissed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Access to clean water is a {{fundamental}} right.",
        es: "El acceso al agua potable es un derecho fundamental.",
        pos: "adj",
        gram: "'fundamental' (fundamental) es un adjetivo regular de origen latino, muy parecido en forma y significado al español."
      },
      {
        t: "The team {{struggled}} to meet the deadline.",
        es: "El equipo luchó por cumplir con el plazo.",
        pos: "v",
        gram: "'struggled' es el pasado regular de 'to struggle' (luchar / costarle trabajo a alguien): se agrega solo '-d' porque la base ya termina en 'e' ('struggle' → 'struggled'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "The findings {{challenge}} conventional wisdom.",
        es: "Los hallazgos cuestionan las ideas convencionales.",
        pos: "v",
        gram: "'challenge' es la forma base (infinitivo sin 'to') de 'to challenge' (desafiar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "He has a {{tendency}} to exaggerate.",
        es: "Él tiene una tendencia a exagerar.",
        pos: "n",
        gram: "'tendency' (tendencia) es contable, con plural irregular: la 'y' cambia a 'ies' ('tendencies'). Se usa con 'to' + verbo: 'a tendency to complain'."
      },
      {
        t: "The treaty was {{ratified}} by all member states.",
        es: "El tratado fue ratificado por todos los estados miembros.",
        pos: "v",
        gram: "'ratified' es el pasado regular de 'to ratify' (ratificar): la 'y' final cambia a 'i' antes de '-ed' ('ratify' → 'ratified'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "The results {{underscore}} the need for reform.",
        es: "Los resultados subrayan la necesidad de una reforma.",
        pos: "v",
        gram: "'underscore' es la forma base (infinitivo sin 'to') de 'to underscore' (subrayar / enfatizar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "The company was {{liable}} for the damages.",
        es: "La empresa era responsable de los daños.",
        pos: "adj",
        gram: "'liable' (responsable legalmente, propenso a) va con 'for' (responsabilidad: 'liable for the damage') o con 'to' + verbo (propensión: 'liable to break')."
      },
      {
        t: "His speech {{resonated}} with young voters.",
        es: "Su discurso resonó entre los votantes jóvenes.",
        pos: "v",
        gram: "'resonated' es el pasado regular de 'to resonate' (resonar): se agrega solo '-d' porque la base ya termina en 'e' ('resonate' → 'resonated'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "The policy {{hampered}} economic growth.",
        es: "La política obstaculizó el crecimiento económico.",
        pos: "v",
        gram: "'hampered' es el pasado regular de 'to hamper' (obstaculizar): se agrega '-ed' a la base ('hamper' → 'hampered'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "She gave a {{concise}} summary of the report.",
        es: "Ella dio un resumen conciso del informe.",
        pos: "adj",
        gram: "'concise' (conciso, breve) es un adjetivo regular: se usa mucho para describir textos o explicaciones cortas y claras."
      },
      {
        t: "The findings were {{corroborated}} by two studies.",
        es: "Los hallazgos fueron corroborados por dos estudios.",
        pos: "v",
        gram: "'corroborated' es el pasado regular de 'to corroborate' (corroborar): se agrega solo '-d' porque la base ya termina en 'e' ('corroborate' → 'corroborated'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "The judge {{overturned}} the previous ruling.",
        es: "El juez revocó el fallo anterior.",
        pos: "v",
        gram: "'overturned' es el pasado regular de 'to overturn' (revocar / volcar): se agrega '-ed' a la base ('overturn' → 'overturned'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "The negotiations reached a {{stalemate}}.",
        es: "Las negociaciones llegaron a un punto muerto.",
        pos: "n",
        gram: "'stalemate' (punto muerto, tablas en ajedrez) es normalmente incontable cuando describe una situación sin salida: 'to reach a stalemate'."
      },
      {
        t: "He made a {{plausible}} argument for the change.",
        es: "Él presentó un argumento plausible para el cambio.",
        pos: "adj",
        gram: "'plausible' (plausible, creíble) es un adjetivo regular, muy usado para describir explicaciones o teorías razonables."
      },
      {
        t: "The disease was {{eradicated}} decades ago.",
        es: "La enfermedad fue erradicada hace décadas.",
        pos: "v",
        gram: "'eradicated' es el pasado regular de 'to eradicate' (erradicar): se agrega solo '-d' porque la base ya termina en 'e' ('eradicate' → 'eradicated'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "How will this {{affect}} you?",
        es: "¿Cómo te afectará?",
        pos: "v",
        gram: "'affect' es la forma base (infinitivo sin 'to') de 'to affect' (afectar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Are we in {{agreement}}?",
        es: "¿Estamos de acuerdo?",
        pos: "n",
        gram: "'agreement' (acuerdo) es contable ('an agreement', 'agreements'). La expresión 'to reach an agreement' significa llegar a un acuerdo."
      },
      {
        t: "What is the {{agreement}}?",
        es: "¿Qué es el acuerdo?",
        pos: "n",
        gram: "'agreement' (acuerdo) es contable ('an agreement', 'agreements'). La expresión 'to reach an agreement' significa llegar a un acuerdo."
      },
      {
        t: "Silence is not {{agreement}}.",
        es: "El silencio no es un acuerdo.",
        pos: "n",
        gram: "'agreement' (acuerdo) es contable ('an agreement', 'agreements'). La expresión 'to reach an agreement' significa llegar a un acuerdo."
      },
      {
        t: "Everybody was in {{agreement}}.",
        es: "Todo el mundo estuvo de acuerdo.",
        pos: "n",
        gram: "'agreement' (acuerdo) es contable ('an agreement', 'agreements'). La expresión 'to reach an agreement' significa llegar a un acuerdo."
      },
      {
        t: "They {{revealed}} the matter.",
        es: "Se destapó el asunto.",
        pos: "v",
        gram: "'revealed' es el pasado regular de 'to reveal' (revelar): se agrega '-ed' a la base ('reveal' → 'revealed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Yanni {{revealed}} his spectacular abs.",
        es: "Yanni descubrió sus espectaculares abdominales.",
        pos: "v",
        gram: "'revealed' es el pasado regular de 'to reveal' (revelar): se agrega '-ed' a la base ('reveal' → 'revealed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Tom {{revealed}} his secret.",
        es: "Tomás reveló su secreto.",
        pos: "v",
        gram: "'revealed' es el pasado regular de 'to reveal' (revelar): se agrega '-ed' a la base ('reveal' → 'revealed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Tom {{revealed}} the secret.",
        es: "Tomás reveló el secreto.",
        pos: "v",
        gram: "'revealed' es el pasado regular de 'to reveal' (revelar): se agrega '-ed' a la base ('reveal' → 'revealed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "It was a {{significant}} moment.",
        es: "Fue un momento significativo.",
        pos: "adj",
        gram: "'significant' (significativo, importante) es un adjetivo largo: su comparativo se forma con 'more' ('more significant'), no con '-er'."
      },
      {
        t: "This is a very {{significant}} amendment.",
        es: "Esta es una enmienda muy significativa.",
        pos: "adj",
        gram: "'significant' (significativo, importante) es un adjetivo largo: su comparativo se forma con 'more' ('more significant'), no con '-er'."
      },
      {
        t: "Tom is Mary's {{significant}} other.",
        es: "Tom es la media naranja de Mary.",
        pos: "adj",
        gram: "'significant' (significativo, importante) es un adjetivo largo: su comparativo se forma con 'more' ('more significant'), no con '-er'."
      },
      {
        t: "He has made a {{significant}} decision.",
        es: "Él ha tomado una decisión significativa.",
        pos: "adj",
        gram: "'significant' (significativo, importante) es un adjetivo largo: su comparativo se forma con 'more' ('more significant'), no con '-er'."
      },
      {
        t: "Input your email {{address}}.",
        es: "Introduce tu dirección de email.",
        pos: "v",
        gram: "'address' es la forma base (infinitivo sin 'to') de 'to address' (dirigirse a / abordar (un problema)). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "You know the {{address}}?",
        es: "¿Sabés la dirección?",
        pos: "v",
        gram: "'address' es la forma base (infinitivo sin 'to') de 'to address' (dirigirse a / abordar (un problema)). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "What's the {{address}}?",
        es: "¿Cuál es la dirección?",
        pos: "v",
        gram: "'address' es la forma base (infinitivo sin 'to') de 'to address' (dirigirse a / abordar (un problema)). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "I forgot the {{address}}.",
        es: "He olvidado la dirección.",
        pos: "v",
        gram: "'address' es la forma base (infinitivo sin 'to') de 'to address' (dirigirse a / abordar (un problema)). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Good luck {{convincing}} her.",
        es: "Buena suerte con convencerla.",
        pos: "adj",
        gram: "'convincing' (convincente) es un adjetivo terminado en '-ing', de la familia de 'to convince' (convencer) — describe algo que convence."
      },
      {
        t: "Good luck {{convincing}} him.",
        es: "Buena suerte con convencerlo.",
        pos: "adj",
        gram: "'convincing' (convincente) es un adjetivo terminado en '-ing', de la familia de 'to convince' (convencer) — describe algo que convence."
      },
      {
        t: "A scale {{measures}} weight.",
        es: "Una balanza mide el peso.",
        pos: "n",
        gram: "'measures' (medidas, en el sentido de acciones) se usa casi siempre en plural: 'to take measures' (tomar medidas). El singular 'a measure' existe pero es menos frecuente en este sentido."
      },
      {
        t: "Desperate times, desperate {{measures}}.",
        es: "A grandes males, grandes remedios.",
        pos: "n",
        gram: "'measures' (medidas, en el sentido de acciones) se usa casi siempre en plural: 'to take measures' (tomar medidas). El singular 'a measure' existe pero es menos frecuente en este sentido."
      },
      {
        t: "Take all possible {{measures}}.",
        es: "Toma todas las medidas posibles.",
        pos: "n",
        gram: "'measures' (medidas, en el sentido de acciones) se usa casi siempre en plural: 'to take measures' (tomar medidas). El singular 'a measure' existe pero es menos frecuente en este sentido."
      },
      {
        t: "Desperate {{measures}} were taken.",
        es: "Medidas desesperadas fueron tomadas.",
        pos: "n",
        gram: "'measures' (medidas, en el sentido de acciones) se usa casi siempre en plural: 'to take measures' (tomar medidas). El singular 'a measure' existe pero es menos frecuente en este sentido."
      },
      {
        t: "Open an {{account}}.",
        es: "Abre una cuenta.",
        pos: "n",
        gram: "'account' (cuenta / relato) es un sustantivo contable: 'an account', 'two accounts'. Con 'bank' forma 'bank account' (cuenta bancaria); solo, también significa 'relato/versión de los hechos'."
      },
      {
        t: "On what {{account}}?",
        es: "¿A cuenta de qué?",
        pos: "n",
        gram: "'account' (cuenta / relato) es un sustantivo contable: 'an account', 'two accounts'. Con 'bank' forma 'bank account' (cuenta bancaria); solo, también significa 'relato/versión de los hechos'."
      },
      {
        t: "Create a savings {{account}}.",
        es: "Crea una cuenta de ahorros.",
        pos: "n",
        gram: "'account' (cuenta / relato) es un sustantivo contable: 'an account', 'two accounts'. Con 'bank' forma 'bank account' (cuenta bancaria); solo, también significa 'relato/versión de los hechos'."
      },
      {
        t: "You must concentrate entirely on your {{recovery}}.",
        es: "Debes concentrarte enteramente en tu recuperación.",
        pos: "n",
        gram: "'recovery' (recuperación) es normalmente incontable cuando habla de un proceso general ('a full recovery' es la excepción común, con artículo)."
      },
      {
        t: "After the first year, the patient's {{recovery}} stagnated.",
        es: "Después del primer año la recuperación del paciente se estancó.",
        pos: "n",
        gram: "'recovery' (recuperación) es normalmente incontable cuando habla de un proceso general ('a full recovery' es la excepción común, con artículo)."
      },
      {
        t: "There is little hope of her {{recovery}}.",
        es: "Hay pocas esperanzas de que se recupere.",
        pos: "n",
        gram: "'recovery' (recuperación) es normalmente incontable cuando habla de un proceso general ('a full recovery' es la excepción común, con artículo)."
      },
      {
        t: "There is no hope of his {{recovery}}.",
        es: "No hay ninguna expectativa de que él se recupere.",
        pos: "n",
        gram: "'recovery' (recuperación) es normalmente incontable cuando habla de un proceso general ('a full recovery' es la excepción común, con artículo)."
      },
      {
        t: "She {{overcame}} the difficulty.",
        es: "Ella superó la dificultad.",
        pos: "v",
        gram: "'overcame' es el pasado irregular de 'to overcome' (superar). Sigue el mismo patrón que 'come → came' (overcome = over + come)."
      },
      {
        t: "He {{overcame}} many difficulties.",
        es: "Él superó muchas dificultades.",
        pos: "v",
        gram: "'overcame' es el pasado irregular de 'to overcome' (superar). Sigue el mismo patrón que 'come → came' (overcome = over + come)."
      },
      {
        t: "Peter {{overcame}} a lot of difficulties before succeeding as a doctor.",
        es: "Peter superó muchas dificultades antes de tener éxito como doctor.",
        pos: "v",
        gram: "'overcame' es el pasado irregular de 'to overcome' (superar). Sigue el mismo patrón que 'come → came' (overcome = over + come)."
      },
      {
        t: "I finally {{overcame}} my shyness and asked him out on a date.",
        es: "Finalmente vencí mi timidez y le pregunté si quería salir conmigo.",
        pos: "v",
        gram: "'overcame' es el pasado irregular de 'to overcome' (superar). Sigue el mismo patrón que 'come → came' (overcome = over + come)."
      },
      {
        t: "His pain {{exceeded}} every threshold.",
        es: "Su dolor ha superado todos los umbrales.",
        pos: "v",
        gram: "'exceeded' es el pasado regular de 'to exceed' (exceder): se agrega '-ed' a la base ('exceed' → 'exceeded'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Japan's exports {{exceeded}} imports by $77.8 billion in 1998.",
        es: "Las exportaciones de Japón superaron a las importaciones por $77.8 billones en el 1998.",
        pos: "v",
        gram: "'exceeded' es el pasado regular de 'to exceed' (exceder): se agrega '-ed' a la base ('exceed' → 'exceeded'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Imports {{exceeded}} exports last year.",
        es: "La importación superó a la exportación el año pasado.",
        pos: "v",
        gram: "'exceeded' es el pasado regular de 'to exceed' (exceder): se agrega '-ed' a la base ('exceed' → 'exceeded'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Mice multiply {{rapidly}}.",
        es: "Los ratones se multiplican rápidamente.",
        pos: "adv",
        gram: "'rapidly' (rápidamente) es un adverbio de modo formado con '-ly' a partir del adjetivo 'rapid' (rápido)."
      },
      {
        t: "World population has {{rapidly}} increased.",
        es: "La población mundial ha aumentado rápidamente.",
        pos: "adv",
        gram: "'rapidly' (rápidamente) es un adverbio de modo formado con '-ly' a partir del adjetivo 'rapid' (rápido)."
      },
      {
        t: "Tom runs {{rapidly}}.",
        es: "Tom corre rápido.",
        pos: "adv",
        gram: "'rapidly' (rápidamente) es un adverbio de modo formado con '-ly' a partir del adjetivo 'rapid' (rápido)."
      },
      {
        t: "The world is changing {{rapidly}}.",
        es: "El mundo está cambiando rápidamente.",
        pos: "adv",
        gram: "'rapidly' (rápidamente) es un adverbio de modo formado con '-ly' a partir del adjetivo 'rapid' (rápido)."
      },
      {
        t: "Tom was {{reluctant}} to go.",
        es: "Tom estaba reacio a marcharse.",
        pos: "adj",
        gram: "'reluctant' (reacio, poco dispuesto) va con 'to' + verbo: 'reluctant to leave' (reacio a irse)."
      },
      {
        t: "You seem {{reluctant}} to do that.",
        es: "Pareces reacio a hacerlo.",
        pos: "adj",
        gram: "'reluctant' (reacio, poco dispuesto) va con 'to' + verbo: 'reluctant to leave' (reacio a irse)."
      },
      {
        t: "This is {{remarkable}}.",
        es: "Esto es destacable.",
        pos: "adj",
        gram: "'remarkable' (notable, extraordinario) es un adjetivo regular formado con el sufijo '-able' a partir de 'remark' (comentario/notar)."
      },
      {
        t: "Something {{remarkable}} happened.",
        es: "Ocurrió algo increíble.",
        pos: "adj",
        gram: "'remarkable' (notable, extraordinario) es un adjetivo regular formado con el sufijo '-able' a partir de 'remark' (comentario/notar)."
      },
      {
        t: "The change was {{remarkable}}.",
        es: "El cambio fue sobresaliente.",
        pos: "adj",
        gram: "'remarkable' (notable, extraordinario) es un adjetivo regular formado con el sufijo '-able' a partir de 'remark' (comentario/notar)."
      },
      {
        t: "Tom achieved {{remarkable}} results.",
        es: "Tom logró resultados extraordinarios.",
        pos: "adj",
        gram: "'remarkable' (notable, extraordinario) es un adjetivo regular formado con el sufijo '-able' a partir de 'remark' (comentario/notar)."
      },
      {
        t: "We'll {{assess}} the situation.",
        es: "Evaluaremos la situación.",
        pos: "v",
        gram: "'assess' es la forma base (infinitivo sin 'to') de 'to assess' (evaluar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "We also {{assess}} analytical ability.",
        es: "Además evaluamos la destreza analítica.",
        pos: "v",
        gram: "'assess' es la forma base (infinitivo sin 'to') de 'to assess' (evaluar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "{{Assess}} people, not based on their appearance, but on their behavior.",
        es: "Evalúa a la gente no por su apariencia, sino por su comportamiento.",
        pos: "v",
        gram: "'assess' es la forma base (infinitivo sin 'to') de 'to assess' (evaluar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "I need to {{assess}} the damage.",
        es: "Necesito evaluar el daño.",
        pos: "v",
        gram: "'assess' es la forma base (infinitivo sin 'to') de 'to assess' (evaluar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "This is {{unacceptable}}.",
        es: "Esto es inaceptable.",
        pos: "adj",
        gram: "'unacceptable' (inaceptable) se forma con el prefijo negativo 'un-' + 'acceptable' (aceptable) — patrón muy productivo en inglés para negar adjetivos."
      },
      {
        t: "That's absolutely {{unacceptable}}.",
        es: "Eso es totalmente inaceptable.",
        pos: "adj",
        gram: "'unacceptable' (inaceptable) se forma con el prefijo negativo 'un-' + 'acceptable' (aceptable) — patrón muy productivo en inglés para negar adjetivos."
      },
      {
        t: "The current indoctrination in Spanish schools is {{unacceptable}}.",
        es: "El adoctrinamiento actual en las escuelas españolas es inadmisible.",
        pos: "adj",
        gram: "'unacceptable' (inaceptable) se forma con el prefijo negativo 'un-' + 'acceptable' (aceptable) — patrón muy productivo en inglés para negar adjetivos."
      },
      {
        t: "That's {{unacceptable}}.",
        es: "Eso es inaceptable.",
        pos: "adj",
        gram: "'unacceptable' (inaceptable) se forma con el prefijo negativo 'un-' + 'acceptable' (aceptable) — patrón muy productivo en inglés para negar adjetivos."
      },
      {
        t: "My grandmother {{underwent}} surgery in Germany.",
        es: "Mi nana fue operada en Alemania.",
        pos: "v",
        gram: "'underwent' es el pasado irregular de 'to undergo' (someterse a / atravesar (una experiencia)). Sigue el mismo patrón que 'go → went' (undergo = under + go)."
      },
      {
        t: "Those who {{underwent}} blood draws were scared during the prick.",
        es: "Los que se sometían a extracciones de sangre tenían miedo durante el pinchazo.",
        pos: "v",
        gram: "'underwent' es el pasado irregular de 'to undergo' (someterse a / atravesar (una experiencia)). Sigue el mismo patrón que 'go → went' (undergo = under + go)."
      },
      {
        t: "Be {{consistent}}.",
        es: "Sé coherente.",
        pos: "adj",
        gram: "'consistent' (consistente, coherente) es un adjetivo regular, va con 'with': 'consistent with the facts' (coherente con los hechos)."
      },
      {
        t: "You're not {{consistent}}.",
        es: "No eres consistente.",
        pos: "adj",
        gram: "'consistent' (consistente, coherente) es un adjetivo regular, va con 'with': 'consistent with the facts' (coherente con los hechos)."
      },
      {
        t: "You aren't {{consistent}}.",
        es: "No eres consistente.",
        pos: "adj",
        gram: "'consistent' (consistente, coherente) es un adjetivo regular, va con 'with': 'consistent with the facts' (coherente con los hechos)."
      },
      {
        t: "You are not {{consistent}}.",
        es: "No eres consistente.",
        pos: "adj",
        gram: "'consistent' (consistente, coherente) es un adjetivo regular, va con 'with': 'consistent with the facts' (coherente con los hechos)."
      },
      {
        t: "Sami {{acknowledged}} it.",
        es: "Sami lo reconoció.",
        pos: "v",
        gram: "'acknowledged' es el pasado regular de 'to acknowledge' (reconocer / admitir): se agrega solo '-d' porque la base ya termina en 'e' ('acknowledge' → 'acknowledged'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "His achievements were {{acknowledged}}.",
        es: "Sus logros fueron reconocidos.",
        pos: "v",
        gram: "'acknowledged' es el pasado regular de 'to acknowledge' (reconocer / admitir): se agrega solo '-d' porque la base ya termina en 'e' ('acknowledge' → 'acknowledged'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Sami {{acknowledged}} that.",
        es: "Sami reconoció eso.",
        pos: "v",
        gram: "'acknowledged' es el pasado regular de 'to acknowledge' (reconocer / admitir): se agrega solo '-d' porque la base ya termina en 'e' ('acknowledge' → 'acknowledged'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Tom {{acknowledged}} his mistake.",
        es: "Tom reconoció su error.",
        pos: "v",
        gram: "'acknowledged' es el pasado regular de 'to acknowledge' (reconocer / admitir): se agrega solo '-d' porque la base ya termina en 'e' ('acknowledge' → 'acknowledged'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Are you {{related}}?",
        es: "¿Sois parientes?",
        pos: "adj",
        gram: "'related' (relacionado) es un adjetivo terminado en '-ed'; se usa con 'to': 'related to the problem' (relacionado CON el problema)."
      },
      {
        t: "The rope {{broke}}.",
        es: "La cuerda se rompió.",
        pos: "v",
        gram: "'broke' es el pasado irregular de 'to break' (romper). Cambia la vocal 'ea' por 'o' — patrón parecido a 'speak → spoke'."
      },
      {
        t: "A dam {{broke}}.",
        es: "Reventó una presa.",
        pos: "v",
        gram: "'broke' es el pasado irregular de 'to break' (romper). Cambia la vocal 'ea' por 'o' — patrón parecido a 'speak → spoke'."
      },
      {
        t: "You {{broke}} me.",
        es: "Me quebraste.",
        pos: "v",
        gram: "'broke' es el pasado irregular de 'to break' (romper). Cambia la vocal 'ea' por 'o' — patrón parecido a 'speak → spoke'."
      },
      {
        t: "War {{broke}} out.",
        es: "La guerra estalló.",
        pos: "v",
        gram: "'broke' es el pasado irregular de 'to break' (romper). Cambia la vocal 'ea' por 'o' — patrón parecido a 'speak → spoke'."
      },
      {
        t: "The scientist is {{conducting}} medical research.",
        es: "El científico está realizando una investigación médica.",
        pos: "v",
        gram: "'conducting' es el gerundio (participio presente) de 'to conduct' (realizar / dirigir): se agrega '-ing' a la base ('conduct' → 'conducting'). Se usa en tiempos continuos ('is/are/was/were conducting') o como sustantivo verbal."
      },
      {
        t: "Be {{thorough}}.",
        es: "Sé exhaustivo.",
        pos: "adj",
        gram: "'thorough' (minucioso, exhaustivo) es un adjetivo regular; ojo con la ortografía, se parece a 'through' (a través de) pero significan cosas distintas."
      },
      {
        t: "I'm {{thorough}}.",
        es: "Soy concienzudo.",
        pos: "adj",
        gram: "'thorough' (minucioso, exhaustivo) es un adjetivo regular; ojo con la ortografía, se parece a 'through' (a través de) pero significan cosas distintas."
      },
      {
        t: "Tom is {{thorough}}.",
        es: "Tom es meticuloso.",
        pos: "adj",
        gram: "'thorough' (minucioso, exhaustivo) es un adjetivo regular; ojo con la ortografía, se parece a 'through' (a través de) pero significan cosas distintas."
      },
      {
        t: "You're {{thorough}}.",
        es: "Eres meticuloso.",
        pos: "adj",
        gram: "'thorough' (minucioso, exhaustivo) es un adjetivo regular; ojo con la ortografía, se parece a 'through' (a través de) pero significan cosas distintas."
      },
      {
        t: "Your health has {{declined}}.",
        es: "Su salud tuvo una caída.",
        pos: "v",
        gram: "'declined' es el pasado regular de 'to decline' (rechazar / declinar): se agrega solo '-d' porque la base ya termina en 'e' ('decline' → 'declined'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Her health has {{declined}}.",
        es: "Su salud tuvo una caída.",
        pos: "v",
        gram: "'declined' es el pasado regular de 'to decline' (rechazar / declinar): se agrega solo '-d' porque la base ya termina en 'e' ('decline' → 'declined'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "His health has {{declined}}.",
        es: "Su salud tuvo una caída.",
        pos: "v",
        gram: "'declined' es el pasado regular de 'to decline' (rechazar / declinar): se agrega solo '-d' porque la base ya termina en 'e' ('decline' → 'declined'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Tom {{declined}} the offer.",
        es: "Tom rechazó la oferta.",
        pos: "v",
        gram: "'declined' es el pasado regular de 'to decline' (rechazar / declinar): se agrega solo '-d' porque la base ya termina en 'e' ('decline' → 'declined'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Their small protest {{triggered}} a mass demonstration.",
        es: "Su pequeña protesta dio paso a una manifestación masiva.",
        pos: "v",
        gram: "'triggered' es el pasado regular de 'to trigger' (desencadenar): se agrega '-ed' a la base ('trigger' → 'triggered'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "The Great Depression {{triggered}} a great surge in crime.",
        es: "La Gran Depresión disparó un gran oleada de crímenes.",
        pos: "v",
        gram: "'triggered' es el pasado regular de 'to trigger' (desencadenar): se agrega '-ed' a la base ('trigger' → 'triggered'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "This sentence isn't long and {{ambiguous}}.",
        es: "Esta frase no es larga y ambigua.",
        pos: "adj",
        gram: "'ambiguous' (ambiguo) es un adjetivo regular: va antes del sustantivo ('an ambiguous answer') o después de 'to be' ('it is ambiguous')."
      },
      {
        t: "{{Ambiguous}} phrases in general lead to amusing interpretations.",
        es: "Las frases ambiguas por lo general dan lugar a divertidas interpretaciones.",
        pos: "adj",
        gram: "'ambiguous' (ambiguo) es un adjetivo regular: va antes del sustantivo ('an ambiguous answer') o después de 'to be' ('it is ambiguous')."
      },
      {
        t: "Let's add {{ambiguous}} sentences more often.",
        es: "Subamos frases ambiguas más frecuentemente.",
        pos: "adj",
        gram: "'ambiguous' (ambiguo) es un adjetivo regular: va antes del sustantivo ('an ambiguous answer') o después de 'to be' ('it is ambiguous')."
      },
      {
        t: "The phrase seemed {{ambiguous}} to me, so I translated it in several ways.",
        es: "La frase se me hizo ambigua, así que la traduje de varias maneras.",
        pos: "adj",
        gram: "'ambiguous' (ambiguo) es un adjetivo regular: va antes del sustantivo ('an ambiguous answer') o después de 'to be' ('it is ambiguous')."
      },
      {
        t: "He yawned {{heavily}}.",
        es: "Bostezó profundamente.",
        pos: "adv",
        gram: "'heavily' (fuertemente/mucho) es un adverbio de MODO formado con '-ly' a partir del adjetivo 'heavy' (pesado/fuerte): 'rain heavily' (llover fuerte)."
      },
      {
        t: "It rained {{heavily}}.",
        es: "Ha llovido mucho.",
        pos: "adv",
        gram: "'heavily' (fuertemente/mucho) es un adverbio de MODO formado con '-ly' a partir del adjetivo 'heavy' (pesado/fuerte): 'rain heavily' (llover fuerte)."
      },
      {
        t: "It's snowing {{heavily}}.",
        es: "Está nevando mucho.",
        pos: "adv",
        gram: "'heavily' (fuertemente/mucho) es un adverbio de MODO formado con '-ly' a partir del adjetivo 'heavy' (pesado/fuerte): 'rain heavily' (llover fuerte)."
      },
      {
        t: "Tom is {{heavily}} armed.",
        es: "Tomás está muy armado.",
        pos: "adv",
        gram: "'heavily' (fuertemente/mucho) es un adverbio de MODO formado con '-ly' a partir del adjetivo 'heavy' (pesado/fuerte): 'rain heavily' (llover fuerte)."
      },
      {
        t: "Let's {{postpone}} dinner.",
        es: "Pospongamos la cena.",
        pos: "v",
        gram: "'postpone' es la forma base (infinitivo sin 'to') de 'to postpone' (posponer). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "We can't {{postpone}} the meeting.",
        es: "No podemos posponer la junta.",
        pos: "v",
        gram: "'postpone' es la forma base (infinitivo sin 'to') de 'to postpone' (posponer). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Can we {{postpone}} the trip?",
        es: "¿Podemos posponer el viaje?",
        pos: "v",
        gram: "'postpone' es la forma base (infinitivo sin 'to') de 'to postpone' (posponer). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Tom decided to {{postpone}} his departure.",
        es: "Tom decidió posponer su salida.",
        pos: "v",
        gram: "'postpone' es la forma base (infinitivo sin 'to') de 'to postpone' (posponer). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Then John gave this {{testimony}}.",
        es: "Entonces John dio su testimonio.",
        pos: "n",
        gram: "'testimony' (testimonio) es contable, con plural irregular: 'testimonies' (y → ies). En un juicio, 'to give testimony' significa declarar."
      },
      {
        t: "He contradicted himself several times in his {{testimony}}.",
        es: "Se contradijo varias veces en su declaración.",
        pos: "n",
        gram: "'testimony' (testimonio) es contable, con plural irregular: 'testimonies' (y → ies). En un juicio, 'to give testimony' significa declarar."
      },
      {
        t: "His account of what happened is inconsistent with {{testimony}} from other witnesses.",
        es: "Su explicación de lo que ocurrió es inconsistente con testimonio de otros testigos.",
        pos: "n",
        gram: "'testimony' (testimonio) es contable, con plural irregular: 'testimonies' (y → ies). En un juicio, 'to give testimony' significa declarar."
      },
      {
        t: "The witnesses were able to refute the false {{testimony}} of the suspect.",
        es: "Los testigos pudieron refutar el falso testimonio del sospechoso.",
        pos: "n",
        gram: "'testimony' (testimonio) es contable, con plural irregular: 'testimonies' (y → ies). En un juicio, 'to give testimony' significa declarar."
      },
      {
        t: "She is {{widely}} known.",
        es: "Ella es conocida a lo ancho.",
        pos: "adv",
        gram: "'widely' (ampliamente) es un adverbio de modo formado con '-ly' a partir del adjetivo 'wide' (ancho/amplio)."
      },
      {
        t: "This plant is {{widely}} used as medicine.",
        es: "Esta planta se emplea ampliamente como medicina.",
        pos: "adv",
        gram: "'widely' (ampliamente) es un adverbio de modo formado con '-ly' a partir del adjetivo 'wide' (ancho/amplio)."
      },
      {
        t: "That novel was {{widely}} read.",
        es: "Esa novela fue muy leída.",
        pos: "adv",
        gram: "'widely' (ampliamente) es un adverbio de modo formado con '-ly' a partir del adjetivo 'wide' (ancho/amplio)."
      },
      {
        t: "Spanish is {{widely}} spoken in South America.",
        es: "El español es muy hablado en América del Sur.",
        pos: "adv",
        gram: "'widely' (ampliamente) es un adverbio de modo formado con '-ly' a partir del adjetivo 'wide' (ancho/amplio)."
      },
      {
        t: "You are {{dismissed}}.",
        es: "Estás despedido.",
        pos: "v",
        gram: "'dismissed' es el pasado regular de 'to dismiss' (despedir / desestimar): se agrega '-ed' a la base ('dismiss' → 'dismissed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Tom was {{dismissed}} without notice.",
        es: "Tom fue despedido sin previo aviso.",
        pos: "v",
        gram: "'dismissed' es el pasado regular de 'to dismiss' (despedir / desestimar): se agrega '-ed' a la base ('dismiss' → 'dismissed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "I {{dismissed}} one.",
        es: "Yo despedí a uno.",
        pos: "v",
        gram: "'dismissed' es el pasado regular de 'to dismiss' (despedir / desestimar): se agrega '-ed' a la base ('dismiss' → 'dismissed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Tom was {{dismissed}}.",
        es: "Tom fue despedido.",
        pos: "v",
        gram: "'dismissed' es el pasado regular de 'to dismiss' (despedir / desestimar): se agrega '-ed' a la base ('dismiss' → 'dismissed'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "This is a {{fundamental}} question.",
        es: "Esta es una pregunta fundamental.",
        pos: "adj",
        gram: "'fundamental' (fundamental) es un adjetivo regular de origen latino, muy parecido en forma y significado al español."
      },
      {
        t: "In my opinion, happiness has a few {{fundamental}} requirements.",
        es: "En mi opinión, hay algunos requerimientos fundamentales para la felicidad.",
        pos: "adj",
        gram: "'fundamental' (fundamental) es un adjetivo regular de origen latino, muy parecido en forma y significado al español."
      },
      {
        t: "The government must make {{fundamental}} changes.",
        es: "El gobierno tiene que hacer cambios fundamentales.",
        pos: "adj",
        gram: "'fundamental' (fundamental) es un adjetivo regular de origen latino, muy parecido en forma y significado al español."
      },
      {
        t: "Needless to say, {{fundamental}} human rights should be respected.",
        es: "De más está decir que los derechos humanos fundamentales deben ser respetados.",
        pos: "adj",
        gram: "'fundamental' (fundamental) es un adjetivo regular de origen latino, muy parecido en forma y significado al español."
      },
      {
        t: "They {{struggled}}.",
        es: "Lo pasaron mal.",
        pos: "v",
        gram: "'struggled' es el pasado regular de 'to struggle' (luchar / costarle trabajo a alguien): se agrega solo '-d' porque la base ya termina en 'e' ('struggle' → 'struggled'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Workers {{struggled}} as factories closed.",
        es: "Los trabajadores luchaban mientras las fábricas cerraban.",
        pos: "v",
        gram: "'struggled' es el pasado regular de 'to struggle' (luchar / costarle trabajo a alguien): se agrega solo '-d' porque la base ya termina en 'e' ('struggle' → 'struggled'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Tom {{struggled}} to get free.",
        es: "Tom intentó liberarse con un forcejeo.",
        pos: "v",
        gram: "'struggled' es el pasado regular de 'to struggle' (luchar / costarle trabajo a alguien): se agrega solo '-d' porque la base ya termina en 'e' ('struggle' → 'struggled'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "The refugees {{struggled}} against hunger.",
        es: "Los refugiados lucharon contra el hambre.",
        pos: "v",
        gram: "'struggled' es el pasado regular de 'to struggle' (luchar / costarle trabajo a alguien): se agrega solo '-d' porque la base ya termina en 'e' ('struggle' → 'struggled'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "We {{challenge}} you.",
        es: "Te retamos.",
        pos: "v",
        gram: "'challenge' es la forma base (infinitivo sin 'to') de 'to challenge' (desafiar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "I accept that {{challenge}}.",
        es: "Acepto ese desafío.",
        pos: "v",
        gram: "'challenge' es la forma base (infinitivo sin 'to') de 'to challenge' (desafiar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "This is a {{challenge}}.",
        es: "Este es un desafío.",
        pos: "v",
        gram: "'challenge' es la forma base (infinitivo sin 'to') de 'to challenge' (desafiar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "I enjoy a {{challenge}}.",
        es: "Yo aprecio un desafío.",
        pos: "v",
        gram: "'challenge' es la forma base (infinitivo sin 'to') de 'to challenge' (desafiar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Tom has a {{tendency}} to ramble.",
        es: "Tom tiene tendencia a divagar.",
        pos: "n",
        gram: "'tendency' (tendencia) es contable, con plural irregular: la 'y' cambia a 'ies' ('tendencies'). Se usa con 'to' + verbo: 'a tendency to complain'."
      },
      {
        t: "Tom has a {{tendency}} to exaggerate.",
        es: "Tom tiene tendencia a exagerar.",
        pos: "n",
        gram: "'tendency' (tendencia) es contable, con plural irregular: la 'y' cambia a 'ies' ('tendencies'). Se usa con 'to' + verbo: 'a tendency to complain'."
      },
      {
        t: "People have a {{tendency}} to underestimate their future needs.",
        es: "Las personas tienden a subestimar sus necesidades futuras.",
        pos: "n",
        gram: "'tendency' (tendencia) es contable, con plural irregular: la 'y' cambia a 'ies' ('tendencies'). Se usa con 'to' + verbo: 'a tendency to complain'."
      },
      {
        t: "He has a {{tendency}} toward exaggeration.",
        es: "Él tiende a exagerarse.",
        pos: "n",
        gram: "'tendency' (tendencia) es contable, con plural irregular: la 'y' cambia a 'ies' ('tendencies'). Se usa con 'to' + verbo: 'a tendency to complain'."
      },
      {
        t: "The Blessed are beautified, the saints are sanctified and rats are {{ratified}}.",
        es: "A los beatos se les beatifica, a los santos se les santifica y a las ratas se les ratifica.",
        pos: "v",
        gram: "'ratified' es el pasado regular de 'to ratify' (ratificar): la 'y' final cambia a 'i' antes de '-ed' ('ratify' → 'ratified'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "We are {{liable}} to err.",
        es: "Somos susceptibles de errar.",
        pos: "adj",
        gram: "'liable' (responsable legalmente, propenso a) va con 'for' (responsabilidad: 'liable for the damage') o con 'to' + verbo (propensión: 'liable to break')."
      },
      {
        t: "Her texts are {{concise}}.",
        es: "Sus textos son concisos.",
        pos: "adj",
        gram: "'concise' (conciso, breve) es un adjetivo regular: se usa mucho para describir textos o explicaciones cortas y claras."
      },
      {
        t: "The essay was {{concise}} and precise.",
        es: "El ensayo era escueto y preciso.",
        pos: "adj",
        gram: "'concise' (conciso, breve) es un adjetivo regular: se usa mucho para describir textos o explicaciones cortas y claras."
      },
      {
        t: "Be more {{concise}} in your summaries!",
        es: "¡Sé más conciso en tus resúmenes!",
        pos: "adj",
        gram: "'concise' (conciso, breve) es un adjetivo regular: se usa mucho para describir textos o explicaciones cortas y claras."
      },
      {
        t: "The boat fell into a whirlpool and {{overturned}}.",
        es: "El barco cayó en un remolino y volcó.",
        pos: "v",
        gram: "'overturned' es el pasado regular de 'to overturn' (revocar / volcar): se agrega '-ed' a la base ('overturn' → 'overturned'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "The king {{overturned}} the death sentence of a woman condemned for driving.",
        es: "El rey anuló la sentencia de muerte de una mujer condenada por manejar.",
        pos: "v",
        gram: "'overturned' es el pasado regular de 'to overturn' (revocar / volcar): se agrega '-ed' a la base ('overturn' → 'overturned'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "The load of ice cream melted after the truck {{overturned}} on the highway.",
        es: "La carga de helado se derritió después de que el camión volcara en la carretera.",
        pos: "v",
        gram: "'overturned' es el pasado regular de 'to overturn' (revocar / volcar): se agrega '-ed' a la base ('overturn' → 'overturned'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "We've reached a {{stalemate}} in our relationship.",
        es: "Hemos llegado a un impasse en nuestra relación.",
        pos: "n",
        gram: "'stalemate' (punto muerto, tablas en ajedrez) es normalmente incontable cuando describe una situación sin salida: 'to reach a stalemate'."
      },
      {
        t: "Tell me if my plan is {{plausible}}.",
        es: "Dime si mi plan es viable.",
        pos: "adj",
        gram: "'plausible' (plausible, creíble) es un adjetivo regular, muy usado para describir explicaciones o teorías razonables."
      },
      {
        t: "Measles has been {{eradicated}}.",
        es: "El sarampión está erradicado.",
        pos: "v",
        gram: "'eradicated' es el pasado regular de 'to eradicate' (erradicar): se agrega solo '-d' porque la base ya termina en 'e' ('eradicate' → 'eradicated'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Has the avian flu been {{eradicated}}?",
        es: "¿La gripe aviar ha sido erradicada?",
        pos: "v",
        gram: "'eradicated' es el pasado regular de 'to eradicate' (erradicar): se agrega solo '-d' porque la base ya termina en 'e' ('eradicate' → 'eradicated'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Violence must be {{eradicated}}.",
        es: "La violencia debe ser eliminada.",
        pos: "v",
        gram: "'eradicated' es el pasado regular de 'to eradicate' (erradicar): se agrega solo '-d' porque la base ya termina en 'e' ('eradicate' → 'eradicated'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      },
      {
        t: "Corruption needs to be {{eradicated}} from Algeria.",
        es: "Es necesario erradicar la corrupción de Argelia.",
        pos: "v",
        gram: "'eradicated' es el pasado regular de 'to eradicate' (erradicar): se agrega solo '-d' porque la base ya termina en 'e' ('eradicate' → 'eradicated'). (el sonido de '-ed' cambia según la última letra de la base: /t/, /d/ o /ɪd/ si termina en 't'/'d')."
      }
    ]
  },
  {
    id: "class233",
    name: "Clase 23.3 · Lista 17",
    desc: "Vocabulario de tu clase: cine, comida y amor (25 palabras)",
    icon: "🎓",
    sentences: [
      {
        t: "I haven't slept well {{lately}}.",
        es: "No he dormido bien últimamente.",
        pos: "adv",
        gram: "'lately' (últimamente) es un adverbio de tiempo que se usa típicamente con presente perfecto: 'I haven't slept well lately'."
      },
      {
        t: "{{Lately}}, she's been working from home.",
        es: "Últimamente, ella ha estado trabajando desde casa.",
        pos: "adv",
        gram: "'lately' (últimamente) es un adverbio de tiempo que se usa típicamente con presente perfecto: 'I haven't slept well lately'."
      },
      {
        t: "They {{recently}} moved to a new apartment.",
        es: "Ellos se mudaron recientemente a un apartamento nuevo.",
        pos: "adv",
        gram: "'recently' (recientemente) es un adverbio de tiempo, similar a 'lately', usado con pasado simple o presente perfecto."
      },
      {
        t: "I {{recently}} started learning English.",
        es: "Recientemente empecé a aprender inglés.",
        pos: "adv",
        gram: "'recently' (recientemente) es un adverbio de tiempo, similar a 'lately', usado con pasado simple o presente perfecto."
      },
      {
        t: "Is there a pharmacy {{nearby}}?",
        es: "¿Hay una farmacia cerca?",
        pos: "adv",
        gram: "'nearby' aquí es adverbio de lugar (cerca): 'a pharmacy nearby'. La misma palabra también funciona como adjetivo (ver 'nearby' en Adjetivos)."
      },
      {
        t: "They live in a {{nearby}} town.",
        es: "Viven en un pueblo cercano.",
        pos: "adj",
        gram: "'nearby' aquí es adjetivo (cercano): 'a nearby town'. La misma palabra también funciona como adverbio de lugar (ver 'nearby' en Adverbios)."
      },
      {
        t: "I will remember this day {{forever}}.",
        es: "Recordaré este día para siempre.",
        pos: "adv",
        gram: "'forever' (para siempre) es un adverbio de tiempo que normalmente va al final de la oración: 'Nothing lasts forever'."
      },
      {
        t: "Nothing lasts {{forever}}.",
        es: "Nada dura para siempre.",
        pos: "adv",
        gram: "'forever' (para siempre) es un adverbio de tiempo que normalmente va al final de la oración: 'Nothing lasts forever'."
      },
      {
        t: "The {{couple}} danced all night.",
        es: "La pareja bailó toda la noche.",
        pos: "n",
        gram: "'couple' (pareja / un par de) es contable: 'a couple', 'couples'. 'A couple of' + sustantivo plural significa 'un par de' (cantidad aproximada de dos)."
      },
      {
        t: "A young {{couple}} bought the house next door.",
        es: "Una pareja joven compró la casa de al lado.",
        pos: "n",
        gram: "'couple' (pareja / un par de) es contable: 'a couple', 'couples'. 'A couple of' + sustantivo plural significa 'un par de' (cantidad aproximada de dos)."
      },
      {
        t: "He planned a {{romantic}} dinner for two.",
        es: "Él planeó una cena romántica para dos.",
        pos: "adj",
        gram: "'romantic' (romántico) es un adjetivo regular formado con el sufijo '-ic', típico de adjetivos derivados de sustantivos ('romance → romantic')."
      },
      {
        t: "Paris is a very {{romantic}} city.",
        es: "París es una ciudad muy romántica.",
        pos: "adj",
        gram: "'romantic' (romántico) es un adjetivo regular formado con el sufijo '-ic', típico de adjetivos derivados de sustantivos ('romance → romantic')."
      },
      {
        t: "It's easy to {{fall}} in love in the spring.",
        es: "Es fácil enamorarse en primavera.",
        pos: "v",
        gram: "'fall' es la forma base (infinitivo sin 'to') de 'to fall' (caer). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "He fell in {{love}} with her smile.",
        es: "Él se enamoró de su sonrisa.",
        pos: "n",
        gram: "'love' (amor) suele ser INCONTABLE ('love is...'), pero también puede ser contable cuando significa 'un amor/una historia de amor': 'a great love'."
      },
      {
        t: "We watched a {{comedy}} last night.",
        es: "Vimos una comedia anoche.",
        pos: "n",
        gram: "'comedy' (comedia) es contable: 'a comedy', y su plural cambia la 'y' por 'ies' ('comedies'), porque termina en consonante + y."
      },
      {
        t: "This {{comedy}} made everyone laugh.",
        es: "Esta comedia hizo reír a todos.",
        pos: "n",
        gram: "'comedy' (comedia) es contable: 'a comedy', y su plural cambia la 'y' por 'ies' ('comedies'), porque termina en consonante + y."
      },
      {
        t: "The {{comedian}} told very funny jokes.",
        es: "El cómico contó chistes muy graciosos.",
        pos: "n",
        gram: "'comedian' (cómico/comediante) es un sustantivo de persona, contable: 'a comedian', 'comedians'. Se forma con el sufijo '-ian', típico de oficios y nacionalidades."
      },
      {
        t: "She wants to be a {{comedian}} someday.",
        es: "Ella quiere ser cómica algún día.",
        pos: "n",
        gram: "'comedian' (cómico/comediante) es un sustantivo de persona, contable: 'a comedian', 'comedians'. Se forma con el sufijo '-ian', típico de oficios y nacionalidades."
      },
      {
        t: "The first {{scene}} of the movie is amazing.",
        es: "La primera escena de la película es increíble.",
        pos: "n",
        gram: "'scene' (escena) es contable: 'a scene', 'scenes'. Muy usado en cine/teatro: 'the first scene', 'a love scene'."
      },
      {
        t: "I cried during the last {{scene}}.",
        es: "Lloré durante la última escena.",
        pos: "n",
        gram: "'scene' (escena) es contable: 'a scene', 'scenes'. Muy usado en cine/teatro: 'the first scene', 'a love scene'."
      },
      {
        t: "The {{protagonist}} of the story is a young doctor.",
        es: "El protagonista de la historia es un médico joven.",
        pos: "n",
        gram: "'protagonist' (protagonista) es contable: 'a protagonist', 'protagonists'. Es un sinónimo más formal de 'the lead' (ver arriba)."
      },
      {
        t: "She plays the {{lead}} in the new series.",
        es: "Ella interpreta a la protagonista en la nueva serie.",
        pos: "n",
        gram: "'lead' aquí es sustantivo (el/la protagonista, el papel principal), contable: 'the lead', 'leads'. Ojo: se pronuncia /liːd/ en este sentido, distinto del metal 'lead' /lɛd/ (plomo)."
      },
      {
        t: "I will {{attempt}} to fix the car myself.",
        es: "Intentaré arreglar el auto yo mismo.",
        pos: "v",
        gram: "'attempt' es la forma base (infinitivo sin 'to') de 'to attempt' (intentar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Don't {{attempt}} to do everything alone.",
        es: "No intentes hacerlo todo solo.",
        pos: "v",
        gram: "'attempt' es la forma base (infinitivo sin 'to') de 'to attempt' (intentar). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "These keys {{belong}} to my father.",
        es: "Estas llaves pertenecen a mi padre.",
        pos: "v",
        gram: "'belong' es la forma base (infinitivo sin 'to') de 'to belong' (pertenecer). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Do you {{belong}} to any club?",
        es: "¿Perteneces a algún club?",
        pos: "v",
        gram: "'belong' es la forma base (infinitivo sin 'to') de 'to belong' (pertenecer). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Please take all your {{belongings}} with you.",
        es: "Por favor, lleva todas tus pertenencias contigo.",
        pos: "n",
        gram: "'belongings' (pertenencias) se usa SIEMPRE en plural — no existe 'a belonging' con este sentido. Es parecido a 'clothes' o 'people' en ese aspecto."
      },
      {
        t: "She packed her {{belongings}} in one suitcase.",
        es: "Ella empacó sus pertenencias en una sola maleta.",
        pos: "n",
        gram: "'belongings' (pertenencias) se usa SIEMPRE en plural — no existe 'a belonging' con este sentido. Es parecido a 'clothes' o 'people' en ese aspecto."
      },
      {
        t: "Casablanca is a {{classic}} movie.",
        es: "Casablanca es una película clásica.",
        pos: "adj",
        gram: "'classic' aquí es adjetivo (clásico, típico): 'a classic example'. Ojo: la misma palabra también existe como sustantivo (ver 'classic' en Sustantivos)."
      },
      {
        t: "That song is a {{classic}} from the eighties.",
        es: "Esa canción es un clásico de los ochenta.",
        pos: "n",
        gram: "'classic' aquí es sustantivo (un clásico, una obra clásica), contable: 'a classic', 'classics'. Ojo: la misma palabra también existe como adjetivo (ver 'classic' en Adjetivos)."
      },
      {
        t: "We always buy {{popcorn}} at the movies.",
        es: "Siempre compramos palomitas en el cine.",
        pos: "n",
        gram: "'popcorn' (palomitas) es INCONTABLE: no lleva 's' ni 'a/an'. Para una porción se dice 'a bag/bowl of popcorn'."
      },
      {
        t: "The {{popcorn}} was salty and delicious.",
        es: "Las palomitas estaban saladas y deliciosas.",
        pos: "n",
        gram: "'popcorn' (palomitas) es INCONTABLE: no lleva 's' ni 'a/an'. Para una porción se dice 'a bag/bowl of popcorn'."
      },
      {
        t: "This cake contains {{nuts}}.",
        es: "Este pastel contiene nueces.",
        pos: "n",
        gram: "'nuts' (nueces/frutos secos) se usa casi siempre en plural cuando se habla de comerlos: 'nuts', el singular 'a nut' existe pero es menos común en este sentido."
      },
      {
        t: "He eats {{nuts}} as a healthy snack.",
        es: "Él come nueces como merienda saludable.",
        pos: "n",
        gram: "'nuts' (nueces/frutos secos) se usa casi siempre en plural cuando se habla de comerlos: 'nuts', el singular 'a nut' existe pero es menos común en este sentido."
      },
      {
        t: "I ordered a pizza with {{olives}}.",
        es: "Pedí una pizza con aceitunas.",
        pos: "n",
        gram: "'olives' es el plural regular de 'olive' (aceituna): se agrega '-s' porque termina en 'e'. Es un sustantivo contable normal."
      },
      {
        t: "Green {{olives}} taste great with cheese.",
        es: "Las aceitunas verdes saben muy bien con queso.",
        pos: "n",
        gram: "'olives' es el plural regular de 'olive' (aceituna): se agrega '-s' porque termina en 'e'. Es un sustantivo contable normal."
      },
      {
        t: "The monkey ate a {{peanut}}.",
        es: "El mono se comió un cacahuete.",
        pos: "n",
        gram: "'peanut' (cacahuete/maní) es contable: 'a peanut', 'peanuts'. Con 'butter' forma 'peanut butter' (crema de cacahuete), que a su vez es incontable."
      },
      {
        t: "Is there {{peanut}} in this sauce?",
        es: "¿Esta salsa lleva cacahuete?",
        pos: "n",
        gram: "'peanut' (cacahuete/maní) es contable: 'a peanut', 'peanuts'. Con 'butter' forma 'peanut butter' (crema de cacahuete), que a su vez es incontable."
      },
      {
        t: "She spread peanut {{butter}} on her toast.",
        es: "Ella untó crema de cacahuete en su tostada.",
        pos: "n",
        gram: "'butter' (manteca/mantequilla) es un sustantivo INCONTABLE: no lleva 's' ni 'a/an'. Para una porción se dice 'a piece/stick of butter'."
      },
      {
        t: "I love peanut {{butter}} and jelly sandwiches.",
        es: "Me encantan los sándwiches de crema de cacahuete y mermelada.",
        pos: "n",
        gram: "'butter' (manteca/mantequilla) es un sustantivo INCONTABLE: no lleva 's' ni 'a/an'. Para una porción se dice 'a piece/stick of butter'."
      },
      {
        t: "He has a serious {{allergy}} to nuts.",
        es: "Él tiene una alergia grave a las nueces.",
        pos: "n",
        gram: "'allergy' (alergia) es contable; su plural es irregular en ortografía: la 'y' cambia a 'ies' ('allergies'), porque termina en consonante + y."
      },
      {
        t: "Spring gives me a terrible {{allergy}}.",
        es: "La primavera me da una alergia terrible.",
        pos: "n",
        gram: "'allergy' (alergia) es contable; su plural es irregular en ortografía: la 'y' cambia a 'ies' ('allergies'), porque termina en consonante + y."
      },
      {
        t: "I'm {{allergic}} to peanuts.",
        es: "Soy alérgico a los cacahuetes.",
        pos: "adj",
        gram: "'allergic' (alérgico) va SIEMPRE con 'to': 'allergic to nuts' (alérgico a las nueces) — no se dice 'allergic of/at'."
      },
      {
        t: "Are you {{allergic}} to any medicine?",
        es: "¿Eres alérgico a algún medicamento?",
        pos: "adj",
        gram: "'allergic' (alérgico) va SIEMPRE con 'to': 'allergic to nuts' (alérgico a las nueces) — no se dice 'allergic of/at'."
      },
      {
        t: "Put the steaks on the {{grill}}.",
        es: "Pon los filetes en la parrilla.",
        pos: "n",
        gram: "'grill' aquí es sustantivo (una parrilla), contable: 'a grill', 'grills'. La misma palabra también es verbo ('to grill' = asar a la parrilla, ver Verbos)."
      },
      {
        t: "The {{grill}} is still hot, be careful.",
        es: "La parrilla todavía está caliente, ten cuidado.",
        pos: "n",
        gram: "'grill' aquí es sustantivo (una parrilla), contable: 'a grill', 'grills'. La misma palabra también es verbo ('to grill' = asar a la parrilla, ver Verbos)."
      },
      {
        t: "We {{grill}} chicken every Sunday.",
        es: "Hacemos pollo a la parrilla todos los domingos.",
        pos: "v",
        gram: "'grill' es la forma base (infinitivo sin 'to') de 'to grill' (asar a la parrilla). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "Dad loves to {{grill}} in the backyard.",
        es: "A papá le encanta hacer parrilladas en el patio.",
        pos: "v",
        gram: "'grill' es la forma base (infinitivo sin 'to') de 'to grill' (asar a la parrilla). Se usa en presente simple con I/you/we/they, después de un modal (can, will, should…) o en imperativo."
      },
      {
        t: "We eat {{turkey}} on Thanksgiving.",
        es: "Comemos pavo en Acción de Gracias.",
        pos: "n",
        gram: "'turkey' (pavo) es incontable cuando se refiere a la carne ('to eat turkey'), pero contable cuando se refiere al animal: 'a turkey', 'turkeys'."
      },
      {
        t: "The {{turkey}} needs two more hours in the oven.",
        es: "El pavo necesita dos horas más en el horno.",
        pos: "n",
        gram: "'turkey' (pavo) es incontable cuando se refiere a la carne ('to eat turkey'), pero contable cuando se refiere al animal: 'a turkey', 'turkeys'."
      }
    ]
  },
  {
    id: "class234",
    name: "Clase 23.4 · Pasado Simple (verbos irregulares)",
    desc: "Gramática de tu clase: 28 verbos irregulares en pasado, con explicación",
    icon: "⏳",
    sentences: [
      {
        t: "I {{had}} a big breakfast this morning before work.",
        es: "Tuve un gran desayuno esta mañana antes del trabajo.",
        pos: "v",
        gram: "'had' es el pasado simple irregular de 'to have' (no se dice 'haved'). Se usa para hablar de algo que tuviste en un momento ya terminado del pasado."
      },
      {
        t: "Every day I have coffee, but yesterday I {{had}} tea instead.",
        es: "Todos los días tomo café, pero ayer tomé té en su lugar.",
        pos: "v",
        gram: "'had' es el pasado irregular de 'to have'. Comparar 'every day I have' (presente) con 'yesterday I had' (pasado) ayuda a notar el cambio de forma."
      },
      {
        t: "She {{wore}} a red dress to the party last night.",
        es: "Ella llevó puesto un vestido rojo a la fiesta anoche.",
        pos: "v",
        gram: "'wore' es el pasado irregular de 'to wear' (llevar puesto). No sigue la regla de agregar '-ed' ('weared' no existe); hay que memorizar esta forma."
      },
      {
        t: "Every day I wear sneakers, but yesterday I {{wore}} boots because it was cold.",
        es: "Todos los días uso zapatillas, pero ayer usé botas porque hacía frío.",
        pos: "v",
        gram: "'wore' es el pasado de 'to wear'. Este tipo de frase (todos los días X, ayer Y) es una buena forma de practicar el contraste presente/pasado con verbos irregulares."
      },
      {
        t: "I {{slept}} for only four hours last night.",
        es: "Dormí solo cuatro horas anoche.",
        pos: "v",
        gram: "'slept' es el pasado irregular de 'to sleep'. Cambia la vocal doble 'ee' por 'e', un patrón de acortamiento típico de varios verbos irregulares."
      },
      {
        t: "I usually sleep well, but I {{slept}} badly yesterday because of the noise.",
        es: "Normalmente duermo bien, pero ayer dormí mal por el ruido.",
        pos: "v",
        gram: "'slept' es el pasado de 'to sleep'. Con 'usually' + presente y 'yesterday' + pasado se marca claramente el contraste de tiempos."
      },
      {
        t: "He {{left}} the office early yesterday.",
        es: "Él salió de la oficina temprano ayer.",
        pos: "v",
        gram: "'left' es el pasado irregular de 'to leave' (irse/salir). Ojo: no confundir con 'left' de dirección (izquierda) — aquí es el verbo."
      },
      {
        t: "We {{left}} home at 7 a.m. to catch the bus.",
        es: "Salimos de casa a las 7 a.m. para alcanzar el autobús.",
        pos: "v",
        gram: "'left' es el pasado de 'to leave'. Se usa con 'from/home/the house' + lugar para decir de dónde te fuiste."
      },
      {
        t: "She {{told}} me a funny story yesterday.",
        es: "Ella me contó una historia graciosa ayer.",
        pos: "v",
        gram: "'told' es el pasado irregular de 'to tell' (decir/contar). 'Tell' va con la persona directamente (tell someone something); no confundir con 'said' (say something to someone)."
      },
      {
        t: "I always tell the truth, but yesterday I {{told}} a small lie.",
        es: "Siempre digo la verdad, pero ayer dije una pequeña mentira.",
        pos: "v",
        gram: "'told' es el pasado de 'to tell'. Nota el contraste 'I always tell' (presente, hábito) vs 'yesterday I told' (pasado, un momento puntual)."
      },
      {
        t: "He {{brought}} his guitar to the party.",
        es: "Él trajo su guitarra a la fiesta.",
        pos: "v",
        gram: "'brought' es el pasado irregular de 'to bring' (traer). Comparte el sonido final /ɔːt/ con 'bought', 'thought', 'taught' y 'caught' — agruparlos ayuda a recordar la pronunciación."
      },
      {
        t: "Every day I bring my lunch, but yesterday I {{brought}} a friend instead.",
        es: "Todos los días traigo mi almuerzo, pero ayer traje a un amigo en su lugar.",
        pos: "v",
        gram: "'brought' es el pasado de 'to bring'. Mismo patrón de contraste presente/pasado que 'have/had' y 'wear/wore'."
      },
      {
        t: "I {{put}} the keys on the table yesterday.",
        es: "Puse las llaves sobre la mesa ayer.",
        pos: "v",
        gram: "'put' es un verbo irregular que NO cambia de forma en pasado (put-put-put). Se reconoce por el contexto (yesterday, last week), no por la palabra en sí."
      },
      {
        t: "She {{put}} on her coat before leaving the house.",
        es: "Ella se puso el abrigo antes de salir de casa.",
        pos: "v",
        gram: "'put' en pasado se escribe y se pronuncia igual que en presente — es uno de los pocos verbos irregulares 'invisibles' del inglés."
      },
      {
        t: "He {{held}} the door open for her.",
        es: "Él sostuvo la puerta abierta para ella.",
        pos: "v",
        gram: "'held' es el pasado irregular de 'to hold' (sostener/sujetar). Cambia la vocal larga 'o' por 'e', un patrón que comparte con 'tell → told' al revés."
      },
      {
        t: "They {{held}} hands during the entire movie.",
        es: "Ellos se tomaron de la mano durante toda la película.",
        pos: "v",
        gram: "'held' es el pasado de 'to hold'. 'Hold hands' es una expresión fija muy común: tomarse de la mano."
      },
      {
        t: "She {{taught}} English for ten years.",
        es: "Ella enseñó inglés durante diez años.",
        pos: "v",
        gram: "'taught' es el pasado irregular de 'to teach' (enseñar), se pronuncia /tɔːt/ sin diptongo — igual que 'bought', 'brought', 'thought' y 'caught'."
      },
      {
        t: "My father {{taught}} me how to swim.",
        es: "Mi padre me enseñó a nadar.",
        pos: "v",
        gram: "'taught' es el pasado de 'to teach'. Estructura útil: 'teach someone to do something' — enseñarle a alguien a hacer algo."
      },
      {
        t: "He {{threw}} the ball to his son.",
        es: "Él le tiró la pelota a su hijo.",
        pos: "v",
        gram: "'threw' es el pasado irregular de 'to throw' (lanzar/tirar). Ojo con la ortografía: se parece a 'through', pero se pronuncia distinto y no tiene relación."
      },
      {
        t: "She {{threw}} away all her old clothes.",
        es: "Ella tiró toda su ropa vieja.",
        pos: "v",
        gram: "'threw' es el pasado de 'to throw'. 'Throw away' significa tirar/desechar algo, distinto de 'throw' solo (lanzar)."
      },
      {
        t: "I {{caught}} the last train home.",
        es: "Alcancé el último tren a casa.",
        pos: "v",
        gram: "'caught' es el pasado irregular de 'to catch' (atrapar/alcanzar). Comparte el sonido final /ɔːt/ con 'taught', 'bought', 'brought' y 'thought'."
      },
      {
        t: "She {{caught}} a cold last week.",
        es: "Ella se resfrió la semana pasada.",
        pos: "v",
        gram: "'caught' es el pasado de 'to catch'. 'Catch a cold' es una expresión fija: resfriarse."
      },
      {
        t: "I {{got}} home very late yesterday.",
        es: "Llegué a casa muy tarde ayer.",
        pos: "v",
        gram: "'got' es el pasado irregular de 'to get' (conseguir/llegar a). Es uno de los verbos irregulares más usados del inglés cotidiano (get up, get home, get a job)."
      },
      {
        t: "She {{got}} a new job last month.",
        es: "Ella consiguió un trabajo nuevo el mes pasado.",
        pos: "v",
        gram: "'got' es el pasado de 'to get'. En inglés americano el participio suele ser 'gotten' ('has gotten'), pero el pasado simple siempre es 'got'."
      },
      {
        t: "We {{bought}} a new car last year.",
        es: "Compramos un auto nuevo el año pasado.",
        pos: "v",
        gram: "'bought' es el pasado irregular de 'to buy' (comprar), se pronuncia /bɔːt/ sin diptongo 'ou' — mismo patrón que 'taught', 'brought', 'thought' y 'caught'."
      },
      {
        t: "I {{bought}} some bread on my way home.",
        es: "Compré pan de camino a casa.",
        pos: "v",
        gram: "'bought' es el pasado de 'to buy'. 'On my way home' (de camino a casa) es una expresión muy útil para contar qué hiciste antes de llegar a algún lugar."
      },
      {
        t: "They {{sold}} their house last spring.",
        es: "Ellos vendieron su casa la primavera pasada.",
        pos: "v",
        gram: "'sold' es el pasado irregular de 'to sell' (vender). Cambia la vocal 'e' por 'o', el mismo patrón que 'tell → told'."
      },
      {
        t: "She {{sold}} her old bicycle online.",
        es: "Ella vendió su bicicleta vieja por internet.",
        pos: "v",
        gram: "'sold' es el pasado de 'to sell'. No confundir con 'sold' de 'soldier' — aquí es solo el verbo en pasado."
      },
      {
        t: "Yesterday he {{rode}} his bike to school.",
        es: "Ayer él fue en bici a la escuela.",
        pos: "v",
        gram: "'rode' es el pasado irregular de 'to ride' (montar/andar en). Cambia la vocal 'i' por 'o', igual que 'write → wrote'."
      },
      {
        t: "She {{rode}} a horse for the first time last weekend.",
        es: "Ella montó a caballo por primera vez el fin de semana pasado.",
        pos: "v",
        gram: "'rode' es el pasado de 'to ride'. Se usa tanto para bicicletas como para caballos o motos: 'ride a bike/horse/motorcycle'."
      },
      {
        t: "We {{ate}} dinner at a new restaurant last night.",
        es: "Cenamos en un restaurante nuevo anoche.",
        pos: "v",
        gram: "'ate' es el pasado irregular de 'to eat' (comer), se pronuncia /eɪt/. No sigue ningún patrón regular; hay que memorizarlo aparte."
      },
      {
        t: "I {{ate}} too much cake at the party.",
        es: "Comí demasiado pastel en la fiesta.",
        pos: "v",
        gram: "'ate' es el pasado de 'to eat'. El participio pasado es 'eaten' ('I have eaten'), distinto del pasado simple 'ate'."
      },
      {
        t: "He {{drank}} three cups of coffee this morning.",
        es: "Él tomó tres tazas de café esta mañana.",
        pos: "v",
        gram: "'drank' es el pasado irregular de 'to drink' (beber). Cambia la vocal 'i' por 'a', un patrón que comparte con 'sing → sang' y 'swim → swam'."
      },
      {
        t: "I {{drank}} a lot of water after the run.",
        es: "Tomé mucha agua después de correr.",
        pos: "v",
        gram: "'drank' es el pasado de 'to drink'. El participio pasado es 'drunk' ('I have drunk'), distinto del pasado simple 'drank'."
      },
      {
        t: "She {{wrote}} a letter to her grandmother.",
        es: "Ella escribió una carta a su abuela.",
        pos: "v",
        gram: "'wrote' es el pasado irregular de 'to write' (escribir). Cambia la vocal 'i' por 'o', el mismo patrón que 'ride → rode'."
      },
      {
        t: "I {{wrote}} down his phone number on a napkin.",
        es: "Anoté su número de teléfono en una servilleta.",
        pos: "v",
        gram: "'wrote' es el pasado de 'to write'. 'Write down' significa anotar; el participio pasado es 'written' ('I have written')."
      },
      {
        t: "I {{read}} that book last summer.",
        es: "Leí ese libro el verano pasado.",
        pos: "v",
        gram: "'read' en pasado se escribe igual que en presente, pero se pronuncia distinto: presente /riːd/, pasado /rɛd/ (como 'red'). Es uno de los pocos verbos irregulares que solo cambian de sonido, no de letra."
      },
      {
        t: "She {{read}} the whole newspaper this morning.",
        es: "Ella leyó todo el periódico esta mañana.",
        pos: "v",
        gram: "'read' (pasado, /rɛd/) es el mismo verbo que 'read' (presente, /riːd/) — solo el contexto (this morning) te dice que es pasado."
      },
      {
        t: "I {{was}} very tired after the trip.",
        es: "Estaba muy cansado después del viaje.",
        pos: "v",
        gram: "'to be' es el único verbo en inglés con DOS formas de pasado: 'was' (I/he/she/it) y 'were' (you/we/they). Aquí 'I' va con 'was'."
      },
      {
        t: "They {{were}} at the park yesterday afternoon.",
        es: "Ellos estaban en el parque ayer por la tarde.",
        pos: "v",
        gram: "'were' es la forma de pasado de 'to be' para 'you/we/they'. Es el verbo irregular más importante del idioma, y el único con dos formas distintas de pasado."
      },
      {
        t: "She {{spoke}} to the manager about the problem.",
        es: "Ella habló con el gerente sobre el problema.",
        pos: "v",
        gram: "'spoke' es el pasado irregular de 'to speak' (hablar). Cambia 'ea' por 'o', un patrón parecido a 'break → broke'."
      },
      {
        t: "He {{spoke}} three languages fluently before he turned twenty.",
        es: "Él hablaba tres idiomas con fluidez antes de cumplir veinte.",
        pos: "v",
        gram: "'spoke' es el pasado de 'to speak'. El participio pasado es 'spoken' ('he has spoken'), distinto del pasado simple 'spoke'."
      },
      {
        t: "We {{went}} to the beach last weekend.",
        es: "Fuimos a la playa el fin de semana pasado.",
        pos: "v",
        gram: "'went' es el pasado irregular de 'to go' (ir) — uno de los verbos más irregulares del inglés, ya que no se parece en nada a su forma base."
      },
      {
        t: "She {{went}} home early because she felt sick.",
        es: "Ella se fue a casa temprano porque se sintió mal.",
        pos: "v",
        gram: "'went' es el pasado de 'to go'. El participio pasado es 'gone' ('she has gone'), completamente distinto de 'went'."
      },
      {
        t: "He {{came}} to the party a little late.",
        es: "Él llegó a la fiesta un poco tarde.",
        pos: "v",
        gram: "'came' es el pasado irregular de 'to come' (venir). Cambia la vocal 'o' por 'a', un cambio propio de este verbo."
      },
      {
        t: "They {{came}} to visit us last Christmas.",
        es: "Ellos vinieron a visitarnos la Navidad pasada.",
        pos: "v",
        gram: "'came' es el pasado de 'to come'. El participio pasado se escribe igual que el presente: 'come' ('they have come')."
      },
      {
        t: "I {{did}} my homework before dinner.",
        es: "Hice mi tarea antes de cenar.",
        pos: "v",
        gram: "'did' es el pasado irregular de 'to do' (hacer). También funciona como auxiliar para preguntas y negaciones en pasado simple: 'Did you go?', 'I didn't go'."
      },
      {
        t: "She {{did}} a great job on the project.",
        es: "Ella hizo un gran trabajo en el proyecto.",
        pos: "v",
        gram: "'did' es el pasado de 'to do'. 'Do a good/great job' es una expresión fija: hacer un buen trabajo."
      },
      {
        t: "He {{stood}} near the door during the whole meeting.",
        es: "Él estuvo parado cerca de la puerta durante toda la reunión.",
        pos: "v",
        gram: "'stood' es el pasado irregular de 'to stand' (estar de pie). Cambia la vocal 'a' por 'oo', el mismo patrón que 'understand → understood'."
      },
      {
        t: "We {{stood}} in line for almost an hour.",
        es: "Hicimos fila durante casi una hora.",
        pos: "v",
        gram: "'stood' es el pasado de 'to stand'. 'Stand in line' significa hacer fila/cola."
      },
      {
        t: "She {{sat}} next to me on the bus.",
        es: "Ella se sentó a mi lado en el autobús.",
        pos: "v",
        gram: "'sat' es el pasado irregular de 'to sit' (sentarse). Cambia la vocal 'i' por 'a', un cambio breve típico de varios verbos monosílabos irregulares."
      },
      {
        t: "We {{sat}} outside and watched the sunset.",
        es: "Nos sentamos afuera y miramos el atardecer.",
        pos: "v",
        gram: "'sat' es el pasado de 'to sit'. No confundir con 'sad' (triste) — se pronuncian distinto y no están relacionados."
      },
      {
        t: "He {{took}} a taxi to the airport.",
        es: "Él tomó un taxi al aeropuerto.",
        pos: "v",
        gram: "'took' es el pasado irregular de 'to take' (tomar/llevar). Cambia la vocal 'a' por 'oo', un patrón que comparte con 'shake → shook'."
      },
      {
        t: "I {{took}} a lot of photos on my trip.",
        es: "Tomé muchas fotos en mi viaje.",
        pos: "v",
        gram: "'took' es el pasado de 'to take'. El participio pasado es 'taken' ('I have taken'), distinto del pasado simple 'took'."
      },
      {
        t: "He {{ran}} five kilometers this morning.",
        es: "Él corrió cinco kilómetros esta mañana.",
        pos: "v",
        gram: "'ran' es el pasado irregular de 'to run' (correr). Ojo: el participio pasado es 'run', igual que el presente ('I have run'), pero el pasado simple es 'ran' ('I ran yesterday')."
      },
      {
        t: "She {{ran}} to catch the bus but missed it.",
        es: "Ella corrió para alcanzar el autobús pero lo perdió.",
        pos: "v",
        gram: "'ran' es el pasado de 'to run'. Se usa igual que en español 'corrió' para hablar de una carrera puntual, no de un hábito."
      }
    ]
  },
  {
    id: "class235",
    name: "Clase 23.5 · Lista 18",
    desc: "Estructuras de tu clase: poder en futuro, phrasal verbs, too much/many y más",
    icon: "📝",
    sentences: [
      {
        t: "I won't be {{able}} to come to class tomorrow.",
        es: "No podré venir a clase mañana.",
        pos: "adj",
        gram: "'Can' no tiene futuro — para decir 'podré/no podré' se usa 'will/won't be able to'. 'Able' es la pieza clave: 'be able to' = poder."
      },
      {
        t: "She will be {{able}} to help you next week.",
        es: "Ella podrá ayudarte la próxima semana.",
        pos: "adj",
        gram: "'Will be able to' es la forma de futuro de 'can': ella podrá = she will be able to. Nunca se dice 'she will can'."
      },
      {
        t: "Did you hear {{what}} she said?",
        es: "¿Oíste lo que ella dijo?",
        pos: "pron",
        gram: "'What' también significa 'LO QUE' dentro de una oración: 'what she said' = lo que ella dijo. No se dice 'that what' ni 'the what'."
      },
      {
        t: "I always eat {{what}} my mom cooks.",
        es: "Siempre como lo que cocina mi mamá.",
        pos: "pron",
        gram: "'What' como 'lo que': 'eat what my mom cooks' = comer lo que cocina mi mamá. Une dos ideas sin necesitar 'the thing that'."
      },
      {
        t: "This coffee is cold — give me {{another}} one.",
        es: "Este café está frío — dame otro.",
        pos: "pron",
        gram: "'Another' = OTRO cualquiera, uno más (an + other, siempre con singular). Si pides EL otro específico, es 'the other'. La Lista 18 practica justo ese contraste."
      },
      {
        t: "Where is the {{other}} sock?",
        es: "¿Dónde está el otro calcetín?",
        pos: "adj",
        gram: "'The other' = EL otro, uno específico que ambos conocen. 'Another' sería uno más cualquiera. Compará: 'give me another pen' (otro) vs 'give me the other pen' (el otro)."
      },
      {
        t: "We need to {{get}} on the next train.",
        es: "Tenemos que subirnos al próximo tren.",
        pos: "v",
        gram: "Subirse a un bus/tren/avión es 'get on', y bajarse es 'get off'. Con phrasal verbs la partícula cambia todo el significado — no se traduce 'subir' con 'go up' aquí."
      },
      {
        t: "She got {{off}} the bus at the wrong stop.",
        es: "Ella se bajó del autobús en la parada equivocada.",
        pos: "prep",
        gram: "'Get off' = bajarse (de un transporte). Lo contrario de 'get on'. 'Get back off' sería VOLVER a bajarse — 'back' agrega el 'volver a'."
      },
      {
        t: "It's cold outside — get {{back}} inside the house.",
        es: "Hace frío afuera — vuelve a entrar a la casa.",
        pos: "adv",
        gram: "'Back' mete la idea de 'volver a': get back inside = volver a entrar, get back off = volverse a bajar. El inglés dice 'volver a' con partículas, no con otro verbo."
      },
      {
        t: "There is too {{much}} sugar in this coffee.",
        es: "Hay demasiada azúcar en este café.",
        pos: "adj",
        gram: "'Too much' va con INCONTABLES (sugar, water, time): too much sugar. Con contables en plural se usa 'too many'. 'Too' solo ya indica exceso, algo negativo."
      },
      {
        t: "There were too {{many}} people at the concert.",
        es: "Había demasiada gente en el concierto.",
        pos: "adj",
        gram: "'Too many' va con CONTABLES en plural: too many people, too many cars. Ojo: 'people' es plural en inglés, por eso lleva 'many' y no 'much'."
      },
      {
        t: "This box is {{too}} heavy for me.",
        es: "Esta caja es demasiado pesada para mí.",
        pos: "adv",
        gram: "'Too + adjetivo' = demasiado: too heavy, too late. Sin sustantivo no hace falta much/many. 'It's too much for me' = es demasiado para mí (con 'much' porque no hay adjetivo)."
      },
      {
        t: "He ended up {{selling}} his car.",
        es: "Él acabó vendiendo su coche.",
        pos: "v",
        gram: "'End up + -ing' = acabar haciendo algo: ended up selling = acabó vendiendo. Después de 'end up' el verbo va SIEMPRE en -ing, nunca 'ended up to sell'."
      },
      {
        t: "We ended up {{watching}} movies all night.",
        es: "Acabamos viendo películas toda la noche.",
        pos: "v",
        gram: "'End up + -ing' para el resultado final de algo que no planeabas: acabamos viendo películas. Igual que 'Luis ended up quitting college' de tu clase."
      },
      {
        t: "You need to {{focus}} on your homework.",
        es: "Necesitas concentrarte en tu tarea.",
        pos: "v",
        gram: "'Focus' va con 'ON', nunca con 'in': focus on something. El español 'concentrarse EN' empuja al error 'focus in' — memorizá la pareja focus + on."
      },
      {
        t: "Don't worry, we can {{work}} it out together.",
        es: "No te preocupes, podemos resolverlo juntos.",
        pos: "v",
        gram: "'Work out' = resolver (un problema): work out this problem, work it out. La partícula 'out' transforma 'work' (trabajar) en 'resolver' — otro phrasal clave de tu lista."
      },
      {
        t: "If you {{keep}} practicing, you will speak English fluently.",
        es: "Si sigues practicando, hablarás inglés con fluidez.",
        pos: "v",
        gram: "'Keep + -ing' = seguir haciendo algo: keep practicing = seguir practicando. Nunca 'keep to practice'. Igual que 'if you keep eating like that' de tu clase."
      },
      {
        t: "My neighbor keeps {{making}} noise at night.",
        es: "Mi vecino sigue haciendo ruido por la noche.",
        pos: "v",
        gram: "'Keep + -ing' también expresa algo que se repite y molesta: keeps making noise = no para de hacer ruido. El verbo después de keep siempre en -ing."
      },
      {
        t: "{{Didn't}} you see my message yesterday?",
        es: "¿No viste mi mensaje ayer?",
        pos: "v",
        gram: "Pregunta negativa en pasado: empieza con 'Didn't' y el verbo queda en forma base (see, no saw): Didn't you see...? Expresa sorpresa, como '¿no que...?'. Igual que 'Didn't you have a car?'."
      },
      {
        t: "I {{was}} studying when you called me.",
        es: "Estaba estudiando cuando me llamaste.",
        pos: "v",
        gram: "Pasado continuo: was/were + verbo en -ing, para una acción en progreso en el pasado: I was studying = estaba estudiando. 'I was reading all night' usa lo mismo."
      },
      {
        t: "They {{were}} sleeping all afternoon.",
        es: "Estuvieron durmiendo toda la tarde.",
        pos: "v",
        gram: "Pasado continuo con they/we/you usa 'were': they were sleeping. Para duraciones largas ('toda la tarde/noche') este tiempo es el natural en inglés."
      },
      {
        t: "The two companies {{reached}} an agreement yesterday.",
        es: "Las dos empresas alcanzaron un acuerdo ayer.",
        pos: "v",
        gram: "'Reach an agreement' = alcanzar/llegar a un acuerdo — colocación fija (no 'arrive to an agreement'). 'Reached' es pasado regular de 'to reach'."
      },
      {
        t: "I thought there {{were}} more cookies in the box.",
        es: "Creía que había más galletas en la caja.",
        pos: "v",
        gram: "'Había' con plural = 'there were': I thought there were... Para contar personas: 'there were nine of us' = éramos nueve. 'Creía que éramos nueve' NO usa 'we were nine'."
      },
      {
        t: "How long does it {{take}} to get to your house?",
        es: "¿Cuánto se tarda en llegar a tu casa?",
        pos: "v",
        gram: "Para 'tardar', el inglés usa 'take' con 'it': it takes ten minutes = se tarda diez minutos; how long is it going to take you = cuánto vas a tardar. La cosa 'toma' tiempo, no tú."
      },
      {
        t: "It won't {{take}} me too long to finish.",
        es: "No tardaré demasiado en terminar.",
        pos: "v",
        gram: "'No tardaré' = 'it won't take me long' — el sujeto es IT, no yo: el tiempo es lo que se toma. 'I won't take too long' también se oye, pero la fórmula con 'it' es la de tu lista."
      },
      {
        t: "{{Let}} me know when you get home.",
        es: "Avísame cuando llegues a casa.",
        pos: "v",
        gram: "'Let me know' = avísame (literalmente 'déjame saber'). Fórmula fija clave: let me know if..., let me know when... También 'let him know' (avísale a él)."
      },
      {
        t: "The students took {{down}} everything the teacher said.",
        es: "Los estudiantes tomaron nota de todo lo que dijo el profesor.",
        pos: "adv",
        gram: "'Take down' = anotar/tomar nota: did you take down what I said? = ¿tomaste nota de lo que dije? Sin 'down', 'take' es solo tomar/llevar."
      },
      {
        t: "She told me {{to}} wait outside.",
        es: "Ella me dijo que esperara afuera.",
        pos: "prep",
        gram: "Órdenes reportadas: tell someone TO + verbo: 'she told me to wait' = me dijo que esperara. El inglés no usa 'que + subjuntivo' — la estructura es tell + persona + to + verbo."
      },
      {
        t: "The doctor told him to {{calm}} down.",
        es: "El médico le dijo que se calmara.",
        pos: "v",
        gram: "'Calm down' = calmarse (phrasal). Con orden reportada: told him to calm down = le dijo que se calmara — la misma estructura tell + persona + to + verbo de tu lista."
      },
      {
        t: "Why did you {{fight}} with your brother?",
        es: "¿Por qué te peleaste con tu hermano?",
        pos: "v",
        gram: "'Fight' = pelearse (fight-fought-fought). En preguntas con 'did', el verbo vuelve a la forma base: Why did you fight? — nunca 'did you fought'."
      }
    ]
  }
];
