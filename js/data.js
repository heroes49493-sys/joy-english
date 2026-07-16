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
        pos: "v"
      },
      {
        t: "This is {{my}} house.",
        es: "Esta es mi casa.",
        pos: "pron"
      },
      {
        t: "We {{are}} good friends.",
        es: "Somos buenos amigos.",
        pos: "v"
      },
      {
        t: "He {{is}} at work now.",
        es: "Él está en el trabajo ahora.",
        pos: "v"
      },
      {
        t: "I {{want}} more coffee.",
        es: "Quiero más café.",
        pos: "v"
      },
      {
        t: "She {{has}} a new car.",
        es: "Ella tiene un auto nuevo.",
        pos: "v"
      },
      {
        t: "I {{like}} this song.",
        es: "Me gusta esta canción.",
        pos: "v"
      },
      {
        t: "We {{go}} to the park on Sundays.",
        es: "Vamos al parque los domingos.",
        pos: "v"
      },
      {
        t: "I {{know}} the answer.",
        es: "Sé la respuesta.",
        pos: "v"
      },
      {
        t: "Can you {{see}} the moon?",
        es: "¿Puedes ver la luna?",
        pos: "v"
      },
      {
        t: "I {{think}} you are right.",
        es: "Creo que tienes razón.",
        pos: "v"
      },
      {
        t: "They {{come}} from Mexico.",
        es: "Ellos vienen de México.",
        pos: "v"
      },
      {
        t: "What {{time}} is it?",
        es: "¿Qué hora es?",
        pos: "n"
      },
      {
        t: "Today is a {{good}} day.",
        es: "Hoy es un buen día.",
        pos: "adj"
      },
      {
        t: "My house is very {{small}}.",
        es: "Mi casa es muy pequeña.",
        pos: "adj"
      },
      {
        t: "The {{people}} here are friendly.",
        es: "La gente aquí es amable.",
        pos: "n"
      },
      {
        t: "I {{work}} from Monday to Friday.",
        es: "Trabajo de lunes a viernes.",
        pos: "v"
      },
      {
        t: "Please {{give}} me the book.",
        es: "Por favor, dame el libro.",
        pos: "v"
      },
      {
        t: "I can't {{find}} my phone.",
        es: "No puedo encontrar mi teléfono.",
        pos: "v"
      },
      {
        t: "{{Where}} do you live?",
        es: "¿Dónde vives?",
        pos: "adv"
      },
      {
        t: "He works {{every}} day.",
        es: "Él trabaja todos los días.",
        pos: "adj"
      },
      {
        t: "She {{tells}} me everything.",
        es: "Ella me cuenta todo.",
        pos: "v"
      },
      {
        t: "I want to {{ask}} you something.",
        es: "Quiero preguntarte algo.",
        pos: "v"
      },
      {
        t: "Your keys are {{in}} the car.",
        es: "Tus llaves están en el auto.",
        pos: "prep"
      },
      {
        t: "We {{eat}} together every night.",
        es: "Comemos juntos todas las noches.",
        pos: "v"
      },
      {
        t: "Please {{look}} at this photo.",
        es: "Por favor, mira esta foto.",
        pos: "v"
      },
      {
        t: "I {{feel}} very tired.",
        es: "Me siento muy cansado.",
        pos: "v"
      },
      {
        t: "Don't {{say}} that word.",
        es: "No digas esa palabra.",
        pos: "v"
      },
      {
        t: "He {{gets}} home late.",
        es: "Él llega tarde a casa.",
        pos: "v"
      },
      {
        t: "I will {{call}} you tomorrow.",
        es: "Te llamaré mañana.",
        pos: "v"
      },
      {
        t: "We can {{do}} it together.",
        es: "Podemos hacerlo juntos.",
        pos: "v"
      },
      {
        t: "She {{makes}} the best cakes.",
        es: "Ella hace los mejores pasteles.",
        pos: "v"
      },
      {
        t: "I have to {{leave}} now.",
        es: "Tengo que irme ahora.",
        pos: "v"
      },
      {
        t: "{{How}} old are you?",
        es: "¿Cuántos años tienes?",
        pos: "adv"
      },
      {
        t: "This is the {{first}} time I see snow.",
        es: "Es la primera vez que veo nieve.",
        pos: "adj"
      },
      {
        t: "My phone is very {{old}}.",
        es: "Mi teléfono es muy viejo.",
        pos: "adj"
      },
      {
        t: "I read a {{new}} book every month.",
        es: "Leo un libro nuevo cada mes.",
        pos: "adj"
      },
      {
        t: "Wait for me {{here}}.",
        es: "Espérame aquí.",
        pos: "adv"
      },
      {
        t: "I study English {{because}} I need it.",
        es: "Estudio inglés porque lo necesito.",
        pos: "conj"
      },
      {
        t: "Call me {{when}} you arrive.",
        es: "Llámame cuando llegues.",
        pos: "conj"
      },
      {
        t: "I like tea, {{but}} I prefer coffee.",
        es: "Me gusta el té, pero prefiero el café.",
        pos: "conj"
      },
      {
        t: "We talk {{about}} everything.",
        es: "Hablamos de todo.",
        pos: "prep"
      },
      {
        t: "This gift is {{for}} you.",
        es: "Este regalo es para ti.",
        pos: "prep"
      },
      {
        t: "He {{never}} eats meat.",
        es: "Él nunca come carne.",
        pos: "adv"
      },
      {
        t: "I {{always}} wake up early.",
        es: "Siempre me despierto temprano.",
        pos: "adv"
      },
      {
        t: "Are you {{ready}} to go?",
        es: "¿Estás listo para ir?",
        pos: "adj"
      },
      {
        t: "I want to {{learn}} English.",
        es: "Quiero aprender inglés.",
        pos: "v"
      },
      {
        t: "{{Life}} is beautiful.",
        es: "La vida es hermosa.",
        pos: "n"
      },
      {
        t: "I have no {{money}} this month.",
        es: "No tengo dinero este mes.",
        pos: "n"
      },
      {
        t: "Tell me the {{truth}}.",
        es: "Dime la verdad.",
        pos: "n"
      },
      {
        t: "I {{am}} immortal.",
        es: "Soy inmortal.",
        pos: "v"
      },
      {
        t: "I {{am}} attractive.",
        es: "Yo soy majo.",
        pos: "v"
      },
      {
        t: "{{Am}} I taller?",
        es: "¿Soy más alto?",
        pos: "v"
      },
      {
        t: "{{My}} condolences!",
        es: "Mi más sentido pésame.",
        pos: "pron"
      },
      {
        t: "{{My}} brothers!",
        es: "¡Hermanos míos!",
        pos: "pron"
      },
      {
        t: "{{My}} heart beats.",
        es: "Me late el corazón.",
        pos: "pron"
      },
      {
        t: "{{My}} pinky hurts.",
        es: "Me duele el meñique.",
        pos: "pron"
      },
      {
        t: "What {{are}} mammals?",
        es: "¿Qué son los mamíferos?",
        pos: "v"
      },
      {
        t: "We {{are}} stardust.",
        es: "Somos polvo de estrellas.",
        pos: "v"
      },
      {
        t: "People {{are}} people.",
        es: "La gente es gente.",
        pos: "v"
      },
      {
        t: "Humans {{are}} vertebrates.",
        es: "Los humanos son vertebrados",
        pos: "v"
      },
      {
        t: "This {{is}} paper.",
        es: "Esto es papel.",
        pos: "v"
      },
      {
        t: "{{Is}} there another?",
        es: "¿Hay algún otro?",
        pos: "v"
      },
      {
        t: "Coffee {{is}} everything.",
        es: "El café es todo.",
        pos: "v"
      },
      {
        t: "Mary {{is}} indisposed.",
        es: "María está indispuesta.",
        pos: "v"
      },
      {
        t: "I {{want}} privacy.",
        es: "Quiero privacidad.",
        pos: "v"
      },
      {
        t: "I {{want}} juice.",
        es: "Quiero jugo.",
        pos: "v"
      },
      {
        t: "I {{want}} trousers.",
        es: "Quiero pantalones.",
        pos: "v"
      },
      {
        t: "We {{want}} beer!",
        es: "¡Queremos cerveza!",
        pos: "v"
      },
      {
        t: "She {{has}} everything.",
        es: "Tiene todo.",
        pos: "v"
      },
      {
        t: "She {{has}} kids.",
        es: "Ella tiene hijos.",
        pos: "v"
      },
      {
        t: "It {{has}} water.",
        es: "Tiene agua.",
        pos: "v"
      },
      {
        t: "He {{has}} water.",
        es: "Tiene agua.",
        pos: "v"
      },
      {
        t: "I {{like}} pears.",
        es: "Me gustan las peras.",
        pos: "v"
      },
      {
        t: "You {{like}} dancing.",
        es: "Te gusta bailar.",
        pos: "v"
      },
      {
        t: "I {{like}} resting.",
        es: "Me gusta descansar.",
        pos: "v"
      },
      {
        t: "People {{like}} music.",
        es: "A la gente le gusta la música.",
        pos: "v"
      },
      {
        t: "{{Go}} downstairs.",
        es: "Ve abajo.",
        pos: "v"
      },
      {
        t: "{{Go}} straight.",
        es: "Ve recto.",
        pos: "v"
      },
      {
        t: "{{Know}} thyself!",
        es: "¡Conócete a ti mismo!",
        pos: "v"
      },
      {
        t: "I {{see}} nothing.",
        es: "No veo nada.",
        pos: "v"
      },
      {
        t: "{{See}} you tomorrow?",
        es: "¿Nos vemos mañana?",
        pos: "v"
      },
      {
        t: "{{See}} you Monday.",
        es: "Te veo el lunes.",
        pos: "v"
      },
      {
        t: "I {{see}} someone.",
        es: "Veo a alguien.",
        pos: "v"
      },
      {
        t: "{{Think}} again.",
        es: "Piensa de nuevo.",
        pos: "v"
      },
      {
        t: "Artists {{think}} creatively.",
        es: "Los artistas piensan creativamente.",
        pos: "v"
      },
      {
        t: "{{Think}} about me.",
        es: "Piensa en mí.",
        pos: "v"
      },
      {
        t: "Let me {{think}}!",
        es: "¡Déjame pensar!",
        pos: "v"
      },
      {
        t: "{{Come}} calmly.",
        es: "Ven con tranquilidad.",
        pos: "v"
      },
      {
        t: "{{Come}} together.",
        es: "Vengan ambos.",
        pos: "v"
      },
      {
        t: "{{Come}} anytime.",
        es: "Ven cuando quieras.",
        pos: "v"
      },
      {
        t: "{{Time}} stopped.",
        es: "El tiempo se detuvo.",
        pos: "n"
      },
      {
        t: "{{Time}} is gold.",
        es: "El tiempo es oro.",
        pos: "n"
      },
      {
        t: "{{Good}} riddance.",
        es: "Hasta nunca.",
        pos: "adj"
      },
      {
        t: "{{Good}} choice!",
        es: "¡Buena elección!",
        pos: "adj"
      },
      {
        t: "{{Small}} world.",
        es: "El mundo es un pañuelo.",
        pos: "adj"
      },
      {
        t: "You're {{small}}.",
        es: "Eres pequeño.",
        pos: "adj"
      },
      {
        t: "Tom is {{small}}.",
        es: "Tom es pequeño.",
        pos: "adj"
      },
      {
        t: "They're {{small}}.",
        es: "Son pequeños.",
        pos: "adj"
      },
      {
        t: "{{People}} change.",
        es: "La gente cambia.",
        pos: "n"
      },
      {
        t: "Parents are {{people}}.",
        es: "Los padres son gente.",
        pos: "n"
      },
      {
        t: "Tom hates {{people}}.",
        es: "Tom odia a la gente.",
        pos: "n"
      },
      {
        t: "We're {{people}}.",
        es: "Somos personas.",
        pos: "n"
      },
      {
        t: "{{Work}} liberates.",
        es: "El trabajo libera.",
        pos: "v"
      },
      {
        t: "{{Work}} slowly.",
        es: "Trabajad lentamente.",
        pos: "v"
      },
      {
        t: "I must {{work}}.",
        es: "Tengo que trabajar.",
        pos: "v"
      },
      {
        t: "The parents {{work}}.",
        es: "Los padres trabajan.",
        pos: "v"
      },
      {
        t: "{{Give}} examples.",
        es: "Dé ejemplos.",
        pos: "v"
      },
      {
        t: "I {{give}} knowledge.",
        es: "Doy conocimiento.",
        pos: "v"
      },
      {
        t: "{{Give}} me yours!",
        es: "¡Dame el tuyo!",
        pos: "v"
      },
      {
        t: "{{Give}} me water.",
        es: "Dame agua.",
        pos: "v"
      },
      {
        t: "{{Find}} the books.",
        es: "Encuentra los libros.",
        pos: "v"
      },
      {
        t: "Some {{find}} fireworks beautiful.",
        es: "A algunos les parecen hermosos los fuegos artificiales.",
        pos: "v"
      },
      {
        t: "Please {{find}} Tom.",
        es: "Por favor, encuentra a Tom.",
        pos: "v"
      },
      {
        t: "Go {{find}} out.",
        es: "Ve y descúbrelo.",
        pos: "v"
      },
      {
        t: "Fine. {{Where}}?",
        es: "Genial. ¿Dónde?",
        pos: "adv"
      },
      {
        t: "{{Where}} is Ziri?",
        es: "¿Dónde está Ziri?",
        pos: "adv"
      },
      {
        t: "{{Where}} is Samuel?",
        es: "¿Dónde está Samuel?",
        pos: "adv"
      },
      {
        t: "{{Where}}'s Kabylia?",
        es: "¿Dónde está Cabilia?",
        pos: "adv"
      },
      {
        t: "{{Every}} detail matters.",
        es: "Cada detalle cuenta.",
        pos: "adj"
      },
      {
        t: "{{Every}} word counts.",
        es: "Cada palabra cuenta.",
        pos: "adj"
      },
      {
        t: "{{Every}} minute counts.",
        es: "Cada minuto cuenta.",
        pos: "adj"
      },
      {
        t: "{{Every}} person counts.",
        es: "Cada persona cuenta.",
        pos: "adj"
      },
      {
        t: "He {{tells}} himself.",
        es: "Él se dice a sí mismo.",
        pos: "v"
      },
      {
        t: "{{Ask}} yourselves.",
        es: "Preguntáoslo.",
        pos: "v"
      },
      {
        t: "{{Ask}} politely.",
        es: "Kibarca sor.",
        pos: "v"
      },
      {
        t: "{{Ask}} anything.",
        es: "Pregunta cualquier cosa.",
        pos: "v"
      },
      {
        t: "{{Ask}} anybody.",
        es: "Pregúntale a cualquiera.",
        pos: "v"
      },
      {
        t: "{{In}} what sense?",
        es: "¿En qué sentido?",
        pos: "prep"
      },
      {
        t: "Go {{in}}, Gerard.",
        es: "Entre, Gerardo.",
        pos: "prep"
      },
      {
        t: "{{Eat}} healthily.",
        es: "Come sano.",
        pos: "v"
      },
      {
        t: "{{Look}} forward.",
        es: "Mire al frente.",
        pos: "v"
      },
      {
        t: "{{Feel}} better.",
        es: "Mejórate.",
        pos: "v"
      },
      {
        t: "I {{feel}} sexy.",
        es: "Me siento sexy.",
        pos: "v"
      },
      {
        t: "I {{feel}} poorly.",
        es: "Me siento mal.",
        pos: "v"
      },
      {
        t: "I {{feel}} drowsy.",
        es: "Me siento adormilado.",
        pos: "v"
      },
      {
        t: "{{Say}} goodbye.",
        es: "Decí adiós.",
        pos: "v"
      },
      {
        t: "{{Say}} nothing.",
        es: "No digas nada.",
        pos: "v"
      },
      {
        t: "{{Say}} something.",
        es: "¡Di algo!",
        pos: "v"
      },
      {
        t: "{{Say}} something!",
        es: "¡Di algo!",
        pos: "v"
      },
      {
        t: "{{Call}} security!",
        es: "¡Llama a seguridad!",
        pos: "v"
      },
      {
        t: "{{Call}} Ishmael.",
        es: "Llama a Ismael.",
        pos: "v"
      },
      {
        t: "{{Call}} Scotland Yard.",
        es: "Llama a Scotland Yard.",
        pos: "v"
      },
      {
        t: "{{Call}} a taxi.",
        es: "¡Pide un taxi!",
        pos: "v"
      },
      {
        t: "{{Do}} something.",
        es: "Haz algo.",
        pos: "v"
      },
      {
        t: "{{Do}} something!",
        es: "¡Haz algo!",
        pos: "v"
      },
      {
        t: "{{Do}} flies sleep?",
        es: "¿Las moscas duermen?",
        pos: "v"
      },
      {
        t: "{{Do}} chairs exist?",
        es: "¿Existen las sillas?",
        pos: "v"
      },
      {
        t: "{{Makes}} sense.",
        es: "Tiene sentido.",
        pos: "v"
      },
      {
        t: "{{Leave}} already.",
        es: "Sal ya.",
        pos: "v"
      },
      {
        t: "{{Leave}} everything.",
        es: "Déjalo todo.",
        pos: "v"
      },
      {
        t: "{{Leave}} tomorrow.",
        es: "Sal mañana.",
        pos: "v"
      },
      {
        t: "{{Leave}} immediately!",
        es: "¡Vete inmediatamente!",
        pos: "v"
      },
      {
        t: "{{How}} ridiculous!",
        es: "¡Qué ridiculez!",
        pos: "adv"
      },
      {
        t: "{{How}} insensitive!",
        es: "¡Qué falta de sensibilidad!",
        pos: "adv"
      },
      {
        t: "{{How}} inconsiderate!",
        es: "¡Qué desconsiderado!",
        pos: "adv"
      },
      {
        t: "{{How}} peaceful!",
        es: "¡Qué silencio!",
        pos: "adv"
      },
      {
        t: "Ladies {{first}}!",
        es: "¡Las damas primero!",
        pos: "adj"
      },
      {
        t: "Gentlemen {{first}}.",
        es: "Caballeros primero.",
        pos: "adj"
      },
      {
        t: "Ladies {{first}}.",
        es: "Las damas primero.",
        pos: "adj"
      },
      {
        t: "Tom shot {{first}}.",
        es: "Tom disparó primero.",
        pos: "adj"
      },
      {
        t: "They are {{old}}.",
        es: "Son ancianos.",
        pos: "adj"
      },
      {
        t: "Tom was {{old}}.",
        es: "Tomás era mayor.",
        pos: "adj"
      },
      {
        t: "Tom looks {{old}}.",
        es: "Tom se ve viejo.",
        pos: "adj"
      },
      {
        t: "They're {{old}}.",
        es: "Son viejos.",
        pos: "adj"
      },
      {
        t: "Nothing {{new}}.",
        es: "Nada nuevo.",
        pos: "adj"
      },
      {
        t: "Anything {{new}}?",
        es: "¿Nada nuevo?",
        pos: "adj"
      },
      {
        t: "Add {{new}} sentences.",
        es: "Añade oraciones nuevas.",
        pos: "adj"
      },
      {
        t: "Add {{new}} sentences!",
        es: "¡Añade frases nuevas!",
        pos: "adj"
      },
      {
        t: "{{Here}}, catch!",
        es: "¡Ahí va! ¡Cógelo!",
        pos: "adv"
      },
      {
        t: "\"Why?\" \"Just {{because}}.\"",
        es: "\"¿Por qué?\" \"Porque sí.\"",
        pos: "conj"
      },
      {
        t: "{{Because}} I deserve it.",
        es: "Porque yo me lo merezco.",
        pos: "conj"
      },
      {
        t: "{{Because}} you want it.",
        es: "Porque lo quieres.",
        pos: "conj"
      },
      {
        t: "{{Because}} you sell it.",
        es: "Porque lo vendes.",
        pos: "conj"
      },
      {
        t: "\"{{When}}?\" \"Never.\"",
        es: "\"¿Cuándo?\" \"Nunca.\"",
        pos: "conj"
      },
      {
        t: "{{When}} is dinner?",
        es: "¿Cuándo es la cena?",
        pos: "conj"
      },
      {
        t: "{{When}} pigs fly.",
        es: "Cuando las ranas críen pelo.",
        pos: "conj"
      },
      {
        t: "{{When}} is Halloween?",
        es: "¿Cuándo es Halloween?",
        pos: "conj"
      },
      {
        t: "Thanks, {{but}} no.",
        es: "Gracias, pero no.",
        pos: "conj"
      },
      {
        t: "{{But}}, what happened?",
        es: "Pero, ¿qué ha pasado?",
        pos: "conj"
      },
      {
        t: "{{But}} I love you!",
        es: "¡Pero te quiero!",
        pos: "conj"
      },
      {
        t: "{{But}} it's huge!",
        es: "¡Pero es enorme!",
        pos: "conj"
      },
      {
        t: "How {{about}} today?",
        es: "¿Qué tal hoy?",
        pos: "prep"
      },
      {
        t: "What {{about}} today?",
        es: "¿Qué tal hoy?",
        pos: "prep"
      },
      {
        t: "How {{about}} it?",
        es: "¿Qué te parece?",
        pos: "prep"
      },
      {
        t: "What {{about}} Portugal?",
        es: "¿Y Portugal?",
        pos: "prep"
      },
      {
        t: "{{For}} your consideration.",
        es: "Para su consideración.",
        pos: "prep"
      },
      {
        t: "Thanks {{for}} everything!",
        es: "¡Gracias por todo!",
        pos: "prep"
      },
      {
        t: "Vote {{for}} Cthulhu.",
        es: "Vota por Cthulhu.",
        pos: "prep"
      },
      {
        t: "Call {{for}} reinforcements.",
        es: "Pedid refuerzos.",
        pos: "prep"
      },
      {
        t: "{{Never}} doubt!",
        es: "¡Nunca dude!",
        pos: "adv"
      },
      {
        t: "{{Never}} again.",
        es: "Nunca más.",
        pos: "adv"
      },
      {
        t: "{{Never}} stop improvising.",
        es: "No dejes nunca de improvisar.",
        pos: "adv"
      },
      {
        t: "{{Never}} stop learning.",
        es: "Nunca dejes de aprender.",
        pos: "adv"
      },
      {
        t: "Almost {{always}}.",
        es: "Casi siempre.",
        pos: "adv"
      },
      {
        t: "{{Always}} be frank.",
        es: "Sé siempre franco.",
        pos: "adv"
      },
      {
        t: "They {{always}} fight.",
        es: "Ellos pelean siempre.",
        pos: "adv"
      },
      {
        t: "Truth {{always}} wins.",
        es: "La verdad siempre vence.",
        pos: "adv"
      },
      {
        t: "{{Ready}}, steady, go!",
        es: "¡En sus marcas, listos, ya!",
        pos: "adj"
      },
      {
        t: "Carlos got {{ready}}.",
        es: "Carlos se preparó.",
        pos: "adj"
      },
      {
        t: "She's {{ready}}.",
        es: "Está lista.",
        pos: "adj"
      },
      {
        t: "He is {{ready}}.",
        es: "Está listo.",
        pos: "adj"
      },
      {
        t: "{{Learn}} English.",
        es: "Aprende inglés.",
        pos: "v"
      },
      {
        t: "{{Learn}} French!",
        es: "¡Aprende francés!",
        pos: "v"
      },
      {
        t: "{{Learn}} Hungarian.",
        es: "Aprended húngaro.",
        pos: "v"
      },
      {
        t: "{{Learn}} French.",
        es: "¡Aprende francés!",
        pos: "v"
      },
      {
        t: "Choose {{life}}.",
        es: "Elige la vida.",
        pos: "n"
      },
      {
        t: "{{Life}} is priceless.",
        es: "La vida no tiene precio.",
        pos: "n"
      },
      {
        t: "Music is {{life}}.",
        es: "La música es vida.",
        pos: "n"
      },
      {
        t: "{{Life}} is music.",
        es: "La vida es música.",
        pos: "n"
      },
      {
        t: "Steal {{money}}.",
        es: "Roba dinero.",
        pos: "n"
      },
      {
        t: "{{Money}} talks.",
        es: "El dinero mueve el mundo.",
        pos: "n"
      },
      {
        t: "{{Money}} is nothing.",
        es: "El dinero no es nada.",
        pos: "n"
      },
      {
        t: "This is {{money}}.",
        es: "Esto es dinero.",
        pos: "n"
      },
      {
        t: "{{Truth}} matters.",
        es: "La verdad importa.",
        pos: "n"
      },
      {
        t: "{{Truth}} hurts.",
        es: "La verdad duele.",
        pos: "n"
      },
      {
        t: "{{Truth}} prevails.",
        es: "La verdad prevalece.",
        pos: "n"
      },
      {
        t: "{{Truth}} still matters.",
        es: "La verdad todavía importa.",
        pos: "n"
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
        pos: "v"
      },
      {
        t: "The {{weather}} is nice today.",
        es: "El clima está agradable hoy.",
        pos: "n"
      },
      {
        t: "She {{teaches}} math at a school.",
        es: "Ella enseña matemáticas en una escuela.",
        pos: "v"
      },
      {
        t: "I {{lost}} my keys yesterday.",
        es: "Perdí mis llaves ayer.",
        pos: "v"
      },
      {
        t: "We {{visited}} our grandparents last weekend.",
        es: "Visitamos a nuestros abuelos el fin de semana pasado.",
        pos: "v"
      },
      {
        t: "The restaurant is very {{expensive}}.",
        es: "El restaurante es muy caro.",
        pos: "adj"
      },
      {
        t: "The train {{arrives}} at nine.",
        es: "El tren llega a las nueve.",
        pos: "v"
      },
      {
        t: "Don't {{forget}} to bring your passport.",
        es: "No olvides traer tu pasaporte.",
        pos: "v"
      },
      {
        t: "I {{remember}} my first day of school.",
        es: "Recuerdo mi primer día de escuela.",
        pos: "v"
      },
      {
        t: "Can you {{lend}} me some money?",
        es: "¿Puedes prestarme dinero?",
        pos: "v"
      },
      {
        t: "She {{borrowed}} my umbrella.",
        es: "Ella tomó prestado mi paraguas.",
        pos: "v"
      },
      {
        t: "We {{stood}} in line for an hour.",
        es: "Hicimos fila durante una hora.",
        pos: "v"
      },
      {
        t: "He {{missed}} his flight this morning.",
        es: "Él perdió su vuelo esta mañana.",
        pos: "v"
      },
      {
        t: "I have to {{finish}} this report today.",
        es: "Tengo que terminar este informe hoy.",
        pos: "v"
      },
      {
        t: "The movie was really {{boring}}.",
        es: "La película fue muy aburrida.",
        pos: "adj"
      },
      {
        t: "That joke was very {{funny}}.",
        es: "Ese chiste fue muy gracioso.",
        pos: "adj"
      },
      {
        t: "My sister is {{married}} to a doctor.",
        es: "Mi hermana está casada con un médico.",
        pos: "adj"
      },
      {
        t: "We {{rented}} an apartment near the beach.",
        es: "Alquilamos un apartamento cerca de la playa.",
        pos: "v"
      },
      {
        t: "The soup {{tastes}} delicious.",
        es: "La sopa sabe deliciosa.",
        pos: "v"
      },
      {
        t: "I {{ordered}} a pizza for dinner.",
        es: "Pedí una pizza para cenar.",
        pos: "v"
      },
      {
        t: "She {{wore}} a beautiful dress to the party.",
        es: "Ella llevó un vestido hermoso a la fiesta.",
        pos: "v"
      },
      {
        t: "The store {{opens}} at ten.",
        es: "La tienda abre a las diez.",
        pos: "v"
      },
      {
        t: "He {{broke}} his leg playing soccer.",
        es: "Se rompió la pierna jugando fútbol.",
        pos: "v"
      },
      {
        t: "I need to {{practice}} my English more.",
        es: "Necesito practicar más mi inglés.",
        pos: "v"
      },
      {
        t: "The bridge is very {{dangerous}} at night.",
        es: "El puente es muy peligroso de noche.",
        pos: "adj"
      },
      {
        t: "We took a lot of {{pictures}} on our trip.",
        es: "Tomamos muchas fotos en nuestro viaje.",
        pos: "n"
      },
      {
        t: "The hotel room was {{dirty}}.",
        es: "La habitación del hotel estaba sucia.",
        pos: "adj"
      },
      {
        t: "I {{spent}} all my money on books.",
        es: "Gasté todo mi dinero en libros.",
        pos: "v"
      },
      {
        t: "Please {{turn}} off the lights.",
        es: "Por favor, apaga las luces.",
        pos: "v"
      },
      {
        t: "My neighbor is very {{noisy}}.",
        es: "Mi vecino es muy ruidoso.",
        pos: "adj"
      },
      {
        t: "They {{moved}} to another city.",
        es: "Se mudaron a otra ciudad.",
        pos: "v"
      },
      {
        t: "I {{promise}} to call you every day.",
        es: "Prometo llamarte todos los días.",
        pos: "v"
      },
      {
        t: "The doctor gave me some {{medicine}}.",
        es: "El médico me dio un medicamento.",
        pos: "n"
      },
      {
        t: "We {{celebrated}} her birthday at home.",
        es: "Celebramos su cumpleaños en casa.",
        pos: "v"
      },
      {
        t: "The exam was {{easier}} than I expected.",
        es: "El examen fue más fácil de lo que esperaba.",
        pos: "adj"
      },
      {
        t: "He {{drives}} to work every day.",
        es: "Él conduce al trabajo todos los días.",
        pos: "v"
      },
      {
        t: "I'm {{saving}} money for a new laptop.",
        es: "Estoy ahorrando dinero para una laptop nueva.",
        pos: "v"
      },
      {
        t: "The baby is {{crying}} again.",
        es: "El bebé está llorando otra vez.",
        pos: "v"
      },
      {
        t: "She {{invited}} me to her wedding.",
        es: "Ella me invitó a su boda.",
        pos: "v"
      },
      {
        t: "The keys were {{inside}} the drawer.",
        es: "Las llaves estaban dentro del cajón.",
        pos: "prep"
      },
      {
        t: "I {{caught}} a cold last week.",
        es: "Me resfrié la semana pasada.",
        pos: "v"
      },
      {
        t: "We {{climbed}} the mountain in four hours.",
        es: "Subimos la montaña en cuatro horas.",
        pos: "v"
      },
      {
        t: "This road is {{narrow}} and dark.",
        es: "Este camino es angosto y oscuro.",
        pos: "adj"
      },
      {
        t: "He {{fixed}} my computer in ten minutes.",
        es: "Él arregló mi computadora en diez minutos.",
        pos: "v"
      },
      {
        t: "I fell {{asleep}} on the sofa.",
        es: "Me quedé dormido en el sofá.",
        pos: "adj"
      },
      {
        t: "The meeting {{lasted}} two hours.",
        es: "La reunión duró dos horas.",
        pos: "v"
      },
      {
        t: "She {{smiled}} at me.",
        es: "Ella me sonrió.",
        pos: "v"
      },
      {
        t: "They {{built}} a new school in my neighborhood.",
        es: "Construyeron una escuela nueva en mi barrio.",
        pos: "v"
      },
      {
        t: "I {{dropped}} my phone in the water.",
        es: "Se me cayó el teléfono al agua.",
        pos: "v"
      },
      {
        t: "The children are {{hiding}} behind the door.",
        es: "Los niños están escondidos detrás de la puerta.",
        pos: "v"
      },
      {
        t: "{{Wake}} up, brothers!",
        es: "¡Despierten, hermanos!",
        pos: "v"
      },
      {
        t: "{{Wake}} up early.",
        es: "Levántense pronto.",
        pos: "v"
      },
      {
        t: "Luis, {{wake}} up.",
        es: "Luis, despiértate.",
        pos: "v"
      },
      {
        t: "{{Wake}} up, sheeple!",
        es: "¡Despierten, persovejas!",
        pos: "v"
      },
      {
        t: "What {{weather}}!",
        es: "¡Qué tiempo!",
        pos: "n"
      },
      {
        t: "Mediterranean {{weather}} is mild.",
        es: "El clima mediterráneo es suave.",
        pos: "n"
      },
      {
        t: "What wonderful {{weather}}!",
        es: "¡Qué tiempo más fabuloso!",
        pos: "n"
      },
      {
        t: "What awful {{weather}}!",
        es: "¡Qué pésimo clima!",
        pos: "n"
      },
      {
        t: "Tom {{teaches}}.",
        es: "Tom enseña.",
        pos: "v"
      },
      {
        t: "She {{teaches}} Dutch.",
        es: "Ella enseña holandés.",
        pos: "v"
      },
      {
        t: "Esther {{teaches}} Hebrew.",
        es: "Ester enseña hebreo.",
        pos: "v"
      },
      {
        t: "You {{lost}} them.",
        es: "Tú los perdiste.",
        pos: "v"
      },
      {
        t: "They {{visited}} London.",
        es: "Ellas visitaron Londres.",
        pos: "v"
      },
      {
        t: "I {{visited}} London.",
        es: "Visité Londres.",
        pos: "v"
      },
      {
        t: "He {{visited}} London.",
        es: "Él visitó Londres.",
        pos: "v"
      },
      {
        t: "She {{visited}} Boston.",
        es: "Ella visitó Boston.",
        pos: "v"
      },
      {
        t: "How {{expensive}}!",
        es: "¡Qué caro!",
        pos: "adj"
      },
      {
        t: "Medicine is {{expensive}}.",
        es: "Los medicamentos son caros.",
        pos: "adj"
      },
      {
        t: "Sailing is {{expensive}}.",
        es: "Navegar es caro.",
        pos: "adj"
      },
      {
        t: "Planes are {{expensive}}.",
        es: "Los aviones son caros.",
        pos: "adj"
      },
      {
        t: "Death {{arrives}} uninvited.",
        es: "La muerte llega sin invitación.",
        pos: "v"
      },
      {
        t: "Tom {{arrives}} today.",
        es: "Tom llega hoy.",
        pos: "v"
      },
      {
        t: "You always {{forget}}.",
        es: "Siempre te olvidas.",
        pos: "v"
      },
      {
        t: "Please {{forget}} it.",
        es: "Por favor, olvídalo.",
        pos: "v"
      },
      {
        t: "{{Remember}} me.",
        es: "Acuérdate de mí.",
        pos: "v"
      },
      {
        t: "{{Remember}} that.",
        es: "Recuérdalo.",
        pos: "v"
      },
      {
        t: "{{Remember}} everything.",
        es: "Acordate todo.",
        pos: "v"
      },
      {
        t: "{{Lend}} me a hand.",
        es: "Dame una mano.",
        pos: "v"
      },
      {
        t: "{{Lend}} me your dictionary, please.",
        es: "Déjame el diccionario, por favor.",
        pos: "v"
      },
      {
        t: "{{Lend}} me your bicycle.",
        es: "Prestame tu bicicleta.",
        pos: "v"
      },
      {
        t: "Could you {{lend}} me a flashlight?",
        es: "¿Puedes prestarme una linterna?",
        pos: "v"
      },
      {
        t: "She {{borrowed}} mine.",
        es: "Ella tomó el mío prestado.",
        pos: "v"
      },
      {
        t: "I {{borrowed}} it.",
        es: "Yo lo tomé prestado.",
        pos: "v"
      },
      {
        t: "She {{borrowed}} my scissors.",
        es: "Ella pidió prestadas mis tijeras.",
        pos: "v"
      },
      {
        t: "Tom {{borrowed}} my car.",
        es: "Tom me pidió prestado el carro.",
        pos: "v"
      },
      {
        t: "Everyone {{stood}}.",
        es: "Todo el mundo se quedó.",
        pos: "v"
      },
      {
        t: "You {{stood}} up.",
        es: "Te paraste.",
        pos: "v"
      },
      {
        t: "We all {{stood}}.",
        es: "Todos nos pusimos de pie.",
        pos: "v"
      },
      {
        t: "She {{stood}} up.",
        es: "Ella se levantó.",
        pos: "v"
      },
      {
        t: "He {{missed}} me.",
        es: "Él me echaba de menos.",
        pos: "v"
      },
      {
        t: "Nuja {{missed}} Skura.",
        es: "Nuja echaba de menos a Skura.",
        pos: "v"
      },
      {
        t: "I {{missed}} it.",
        es: "Lo extrañaba.",
        pos: "v"
      },
      {
        t: "{{Finish}} studying.",
        es: "Termine de estudiar.",
        pos: "v"
      },
      {
        t: "{{Finish}} this.",
        es: "Termine esto.",
        pos: "v"
      },
      {
        t: "{{Finish}} your food.",
        es: "Acaba tu comida.",
        pos: "v"
      },
      {
        t: "{{Finish}} your coffee.",
        es: "Acábate el café.",
        pos: "v"
      },
      {
        t: "Music is {{boring}}.",
        es: "La música es aburrida.",
        pos: "adj"
      },
      {
        t: "Waiting is {{boring}}.",
        es: "Esperar es aburrido.",
        pos: "adj"
      },
      {
        t: "What's {{funny}}?",
        es: "¿Qué es tan chistoso?",
        pos: "adj"
      },
      {
        t: "Are you {{funny}}?",
        es: "¿Eres gracioso?",
        pos: "adj"
      },
      {
        t: "Was it {{funny}}?",
        es: "¿Era gracioso?",
        pos: "adj"
      },
      {
        t: "That's {{funny}}!",
        es: "¡Qué gracioso!",
        pos: "adj"
      },
      {
        t: "Just {{married}}.",
        es: "Recién casado.",
        pos: "adj"
      },
      {
        t: "Maria {{married}} unwillingly.",
        es: "María se casó contra su voluntad.",
        pos: "adj"
      },
      {
        t: "I {{married}} young.",
        es: "Me casé joven.",
        pos: "adj"
      },
      {
        t: "They never {{married}}.",
        es: "Nunca se casaron.",
        pos: "adj"
      },
      {
        t: "They {{rented}} a house.",
        es: "Alquilaron una casa.",
        pos: "v"
      },
      {
        t: "Tom {{rented}} a snowboard.",
        es: "Tom rentó una tabla de nieve.",
        pos: "v"
      },
      {
        t: "We {{rented}} the apartment.",
        es: "Alquilamos el departamento.",
        pos: "v"
      },
      {
        t: "We {{rented}} the flat.",
        es: "Alquilamos el piso.",
        pos: "v"
      },
      {
        t: "{{Tastes}} differ.",
        es: "Sobre gustos no hay disputas.",
        pos: "v"
      },
      {
        t: "Tom {{tastes}} sweet.",
        es: "Tom sabe dulce.",
        pos: "v"
      },
      {
        t: "That {{tastes}} terrible.",
        es: "Eso no sabe nada bueno.",
        pos: "v"
      },
      {
        t: "This {{tastes}} good.",
        es: "Esto sabe bien.",
        pos: "v"
      },
      {
        t: "I {{ordered}} bread.",
        es: "He pedido pan.",
        pos: "v"
      },
      {
        t: "We {{ordered}} food.",
        es: "Pedimos comida.",
        pos: "v"
      },
      {
        t: "Ziri {{ordered}} champagne.",
        es: "Ziri ordenó champagne.",
        pos: "v"
      },
      {
        t: "Sami {{ordered}} flowers.",
        es: "Sami encargó flores.",
        pos: "v"
      },
      {
        t: "Tom {{wore}} glasses.",
        es: "Tom llevaba gafas.",
        pos: "v"
      },
      {
        t: "Tom {{wore}} gloves.",
        es: "Tom llevaba guantes.",
        pos: "v"
      },
      {
        t: "She {{wore}} glasses.",
        es: "Ella llevaba gafas.",
        pos: "v"
      },
      {
        t: "He {{wore}} glasses.",
        es: "Él llevaba gafas.",
        pos: "v"
      },
      {
        t: "Language {{opens}} worlds.",
        es: "El lenguaje abre mundos.",
        pos: "v"
      },
      {
        t: "The rope {{broke}}.",
        es: "La cuerda se rompió.",
        pos: "v"
      },
      {
        t: "A dam {{broke}}.",
        es: "Reventó una presa.",
        pos: "v"
      },
      {
        t: "You {{broke}} me.",
        es: "Me quebraste.",
        pos: "v"
      },
      {
        t: "War {{broke}} out.",
        es: "La guerra estalló.",
        pos: "v"
      },
      {
        t: "{{Practice}} mercy.",
        es: "Practica la misericordia.",
        pos: "v"
      },
      {
        t: "{{Practice}} make master.",
        es: "La práctica hace al maestro.",
        pos: "v"
      },
      {
        t: "Let me {{practice}}.",
        es: "Déjame practicar.",
        pos: "v"
      },
      {
        t: "Let's {{practice}}.",
        es: "Practiquemos.",
        pos: "v"
      },
      {
        t: "Bears are {{dangerous}}.",
        es: "Los osos son peligrosos.",
        pos: "adj"
      },
      {
        t: "Ideologies are {{dangerous}}.",
        es: "Las ideologías son peligrosas.",
        pos: "adj"
      },
      {
        t: "Are giraffes {{dangerous}}?",
        es: "¿Las jirafas son peligrosas?",
        pos: "adj"
      },
      {
        t: "It is {{dangerous}}!",
        es: "¡Es peligroso!",
        pos: "adj"
      },
      {
        t: "We have {{pictures}}.",
        es: "Tenemos fotos.",
        pos: "n"
      },
      {
        t: "Whose {{pictures}} are those?",
        es: "¿De quién son esas fotos?",
        pos: "n"
      },
      {
        t: "Are you taking {{pictures}}?",
        es: "¿Estás sacando fotos?",
        pos: "n"
      },
      {
        t: "Is it {{dirty}}?",
        es: "¿Está sucio?",
        pos: "adj"
      },
      {
        t: "Tom was {{dirty}}.",
        es: "Tom estaba sucio.",
        pos: "adj"
      },
      {
        t: "The toilets are {{dirty}}.",
        es: "Las instalaciones sanitarias están sucias.",
        pos: "adj"
      },
      {
        t: "Who got it {{dirty}}?",
        es: "¿Quién la ensució?",
        pos: "adj"
      },
      {
        t: "I {{spent}} too much.",
        es: "Gasté demasiado.",
        pos: "v"
      },
      {
        t: "They {{spent}} the night studying.",
        es: "Pasaron la noche estudiando.",
        pos: "v"
      },
      {
        t: "I {{spent}} a hundred dollars.",
        es: "Gasté cien dólares.",
        pos: "v"
      },
      {
        t: "I {{spent}} a hundred euros.",
        es: "Gasté cien euros.",
        pos: "v"
      },
      {
        t: "{{Turn}} around!",
        es: "¡Date vuelta!",
        pos: "v"
      },
      {
        t: "{{Turn}} around.",
        es: "Da la vuelta.",
        pos: "v"
      },
      {
        t: "Ziri got {{noisy}}.",
        es: "Ziri se puso ruidosa.",
        pos: "adj"
      },
      {
        t: "Tom has {{noisy}} neighbours.",
        es: "Tom tiene vecinos ruidosos.",
        pos: "adj"
      },
      {
        t: "Tom has {{noisy}} neighbors.",
        es: "Tom tiene vecinos ruidosos.",
        pos: "adj"
      },
      {
        t: "The neighbors are {{noisy}}.",
        es: "Los vecinos son ruidosos.",
        pos: "adj"
      },
      {
        t: "The lights {{moved}}.",
        es: "Las luces se movieron.",
        pos: "v"
      },
      {
        t: "Yanni {{moved}} out.",
        es: "Yanni se mudó.",
        pos: "v"
      },
      {
        t: "Tom {{moved}} closer.",
        es: "Tom se acercó.",
        pos: "v"
      },
      {
        t: "No one {{moved}}.",
        es: "No se movió nadie.",
        pos: "v"
      },
      {
        t: "You {{promise}}?",
        es: "¿Lo prometes?",
        pos: "v"
      },
      {
        t: "{{Promise}} me now.",
        es: "Ahora prométemelo.",
        pos: "v"
      },
      {
        t: "Take your {{medicine}}.",
        es: "Toma tu medicina.",
        pos: "n"
      },
      {
        t: "This {{medicine}} tastes horrible.",
        es: "Esta medicina sabe horrible.",
        pos: "n"
      },
      {
        t: "Take the {{medicine}}.",
        es: "Toma la medicina.",
        pos: "n"
      },
      {
        t: "He buys {{medicine}}.",
        es: "Él compra medicamentos.",
        pos: "n"
      },
      {
        t: "We {{celebrated}} all night.",
        es: "Festejamos toda la noche.",
        pos: "v"
      },
      {
        t: "They {{celebrated}} her achievements.",
        es: "Ellos celebraron sus logros.",
        pos: "v"
      },
      {
        t: "Ask me something {{easier}}.",
        es: "Pregúnteme algo más fácil.",
        pos: "adj"
      },
      {
        t: "Conquering is {{easier}} than governing.",
        es: "Conquistar es más fácil que reinar.",
        pos: "adj"
      },
      {
        t: "{{Easier}} said than done.",
        es: "Del dicho al hecho hay mucho trecho.",
        pos: "adj"
      },
      {
        t: "Modern Greek is {{easier}} than Esperanto.",
        es: "El griego moderno es más fácil que el esperanto.",
        pos: "adj"
      },
      {
        t: "Recognition {{drives}} achievement.",
        es: "El reconocimiento lleva al logro.",
        pos: "v"
      },
      {
        t: "Is Algeria {{saving}} money?",
        es: "¿Está ahorrando dinero Argelia?",
        pos: "v"
      },
      {
        t: "I'm {{saving}} money.",
        es: "Estoy ahorrando dinero.",
        pos: "v"
      },
      {
        t: "Stop {{crying}}.",
        es: "No llores.",
        pos: "v"
      },
      {
        t: "Tom {{invited}} everyone.",
        es: "Tom invitó a todos.",
        pos: "v"
      },
      {
        t: "Tom is {{invited}}.",
        es: "Tom está invitado.",
        pos: "v"
      },
      {
        t: "She {{invited}} me.",
        es: "Me invitó.",
        pos: "v"
      },
      {
        t: "You're {{invited}}.",
        es: "Estás invitado.",
        pos: "v"
      },
      {
        t: "Stay {{inside}}.",
        es: "Quédate adentro.",
        pos: "prep"
      },
      {
        t: "Step {{inside}}.",
        es: "Entra.",
        pos: "prep"
      },
      {
        t: "Yanni came {{inside}}.",
        es: "Yanni entró.",
        pos: "prep"
      },
      {
        t: "Bring him {{inside}}.",
        es: "Tráelo adentro.",
        pos: "prep"
      },
      {
        t: "You {{caught}} me!",
        es: "¡Me pillaste!",
        pos: "v"
      },
      {
        t: "Sami got {{caught}}.",
        es: "Sami fue detenido.",
        pos: "v"
      },
      {
        t: "I {{caught}} her.",
        es: "Yo la atrapé.",
        pos: "v"
      },
      {
        t: "We {{caught}} Tom.",
        es: "Atrapamos a Tom.",
        pos: "v"
      },
      {
        t: "I {{climbed}} the fence.",
        es: "Yo subí la valla.",
        pos: "v"
      },
      {
        t: "Tom {{climbed}} the fence.",
        es: "Tom subió la cerca.",
        pos: "v"
      },
      {
        t: "Tom {{climbed}} the ladder.",
        es: "Tom subió la escalera.",
        pos: "v"
      },
      {
        t: "What {{narrow}} stairs!",
        es: "¡Qué estrechas son estas escaleras!",
        pos: "adj"
      },
      {
        t: "It's {{narrow}} and uncomfortable.",
        es: "Es angosto e incómodo.",
        pos: "adj"
      },
      {
        t: "She has {{narrow}} hips.",
        es: "Ella tiene caderas angostas.",
        pos: "adj"
      },
      {
        t: "We went along the {{narrow}} road.",
        es: "Fuimos por el camino angosto.",
        pos: "adj"
      },
      {
        t: "Nothing is {{fixed}}.",
        es: "Nada está arreglado.",
        pos: "v"
      },
      {
        t: "Tom {{fixed}} everything.",
        es: "Tom arregló todo.",
        pos: "v"
      },
      {
        t: "Is she {{asleep}}?",
        es: "¿Está dormida?",
        pos: "adj"
      },
      {
        t: "Everyone fell {{asleep}}.",
        es: "Todos se durmieron.",
        pos: "adj"
      },
      {
        t: "You were {{asleep}}.",
        es: "Tú dormías.",
        pos: "adj"
      },
      {
        t: "Everyone was {{asleep}}.",
        es: "Todos estaban dormidos.",
        pos: "adj"
      },
      {
        t: "Nobody {{smiled}}.",
        es: "No sonrió nadie.",
        pos: "v"
      },
      {
        t: "They {{smiled}}.",
        es: "Sonrieron.",
        pos: "v"
      },
      {
        t: "Everyone {{smiled}}.",
        es: "Todos sonrieron.",
        pos: "v"
      },
      {
        t: "Tom {{built}} me.",
        es: "Tom me construyó.",
        pos: "v"
      },
      {
        t: "Tom {{built}} this.",
        es: "Tom construyó esto.",
        pos: "v"
      },
      {
        t: "They {{built}} it.",
        es: "Ellos lo construyeron.",
        pos: "v"
      },
      {
        t: "Schools were {{built}}.",
        es: "Se construyeron escuelas.",
        pos: "v"
      },
      {
        t: "You {{dropped}} something.",
        es: "Dejaste caer algo.",
        pos: "v"
      },
      {
        t: "Prices {{dropped}} suddenly.",
        es: "Los precios bajaron súbitamente.",
        pos: "v"
      },
      {
        t: "Mary was {{hiding}}.",
        es: "Mary se estaba escondiendo.",
        pos: "v"
      },
      {
        t: "Are they {{hiding}}?",
        es: "¿Están escondidos?",
        pos: "v"
      },
      {
        t: "You were {{hiding}}.",
        es: "Tú te estabas escondiendo.",
        pos: "v"
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
        pos: "v"
      },
      {
        t: "Could you {{explain}} that again, please?",
        es: "¿Podrías explicar eso otra vez, por favor?",
        pos: "v"
      },
      {
        t: "I'm trying to {{improve}} my English.",
        es: "Estoy tratando de mejorar mi inglés.",
        pos: "v"
      },
      {
        t: "Don't {{worry}}, everything will be fine.",
        es: "No te preocupes, todo estará bien.",
        pos: "v"
      },
      {
        t: "We {{arrived}} just in time for the show.",
        es: "Llegamos justo a tiempo para el espectáculo.",
        pos: "v"
      },
      {
        t: "The instructions were very {{clear}}.",
        es: "Las instrucciones eran muy claras.",
        pos: "adj"
      },
      {
        t: "He {{realized}} he had made a mistake.",
        es: "Se dio cuenta de que había cometido un error.",
        pos: "v"
      },
      {
        t: "We need to find a {{solution}} to this problem.",
        es: "Necesitamos encontrar una solución a este problema.",
        pos: "n"
      },
      {
        t: "They {{offered}} him a better salary.",
        es: "Le ofrecieron un mejor salario.",
        pos: "v"
      },
      {
        t: "I have an {{appointment}} with the dentist.",
        es: "Tengo una cita con el dentista.",
        pos: "n"
      },
      {
        t: "The train was {{delayed}} because of the storm.",
        es: "El tren se retrasó por la tormenta.",
        pos: "v"
      },
      {
        t: "You should {{avoid}} eating too much sugar.",
        es: "Deberías evitar comer demasiada azúcar.",
        pos: "v"
      },
      {
        t: "He {{apologized}} for being late.",
        es: "Él se disculpó por llegar tarde.",
        pos: "v"
      },
      {
        t: "The teacher gave us some useful {{advice}}.",
        es: "El profesor nos dio algunos consejos útiles.",
        pos: "n"
      },
      {
        t: "I {{suggest}} taking the earlier flight.",
        es: "Sugiero tomar el vuelo más temprano.",
        pos: "v"
      },
      {
        t: "It {{depends}} on the price.",
        es: "Depende del precio.",
        pos: "v"
      },
      {
        t: "She was {{disappointed}} with the results.",
        es: "Ella estaba decepcionada con los resultados.",
        pos: "adj"
      },
      {
        t: "The company is looking for {{experienced}} workers.",
        es: "La empresa busca trabajadores con experiencia.",
        pos: "adj"
      },
      {
        t: "I can't {{afford}} a new car right now.",
        es: "No puedo permitirme un auto nuevo ahora.",
        pos: "v"
      },
      {
        t: "We had to {{return}} home early.",
        es: "Tuvimos que volver a casa temprano.",
        pos: "v"
      },
      {
        t: "My phone battery is {{running}} out.",
        es: "La batería de mi teléfono se está agotando.",
        pos: "v"
      },
      {
        t: "She has a great sense of {{humor}}.",
        es: "Ella tiene un gran sentido del humor.",
        pos: "n"
      },
      {
        t: "The museum is {{worth}} visiting.",
        es: "Vale la pena visitar el museo.",
        pos: "adj"
      },
      {
        t: "He couldn't {{recall}} where he parked.",
        es: "No podía recordar dónde estacionó.",
        pos: "v"
      },
      {
        t: "There's no {{reason}} to be afraid.",
        es: "No hay razón para tener miedo.",
        pos: "n"
      },
      {
        t: "She {{pretended}} not to hear me.",
        es: "Ella fingió no escucharme.",
        pos: "v"
      },
      {
        t: "The bridge {{connects}} the two cities.",
        es: "El puente conecta las dos ciudades.",
        pos: "v"
      },
      {
        t: "I {{barely}} slept last night.",
        es: "Apenas dormí anoche.",
        pos: "adv"
      },
      {
        t: "This city has {{grown}} a lot in recent years.",
        es: "Esta ciudad ha crecido mucho en los últimos años.",
        pos: "v"
      },
      {
        t: "I've been {{waiting}} for you for an hour.",
        es: "Te he estado esperando durante una hora.",
        pos: "v"
      },
      {
        t: "The meeting was {{canceled}} at the last minute.",
        es: "La reunión fue cancelada a último momento.",
        pos: "v"
      },
      {
        t: "I'm not sure {{whether}} he will come.",
        es: "No estoy seguro de si él vendrá.",
        pos: "conj"
      },
      {
        t: "The weather {{forecast}} says it will rain.",
        es: "El pronóstico del tiempo dice que lloverá.",
        pos: "n"
      },
      {
        t: "You have to {{fill}} out this form.",
        es: "Tienes que llenar este formulario.",
        pos: "v"
      },
      {
        t: "He's very good at {{solving}} problems.",
        es: "Él es muy bueno resolviendo problemas.",
        pos: "v"
      },
      {
        t: "The results {{surprised}} everyone.",
        es: "Los resultados sorprendieron a todos.",
        pos: "v"
      },
      {
        t: "It's {{against}} the rules to smoke here.",
        es: "Va contra las reglas fumar aquí.",
        pos: "prep"
      },
      {
        t: "The manager will {{review}} your application.",
        es: "El gerente revisará tu solicitud.",
        pos: "v"
      },
      {
        t: "This job requires a lot of {{patience}}.",
        es: "Este trabajo requiere mucha paciencia.",
        pos: "n"
      },
      {
        t: "The two teams will {{compete}} for the title.",
        es: "Los dos equipos competirán por el título.",
        pos: "v"
      },
      {
        t: "She {{describes}} her town as quiet and safe.",
        es: "Ella describe su pueblo como tranquilo y seguro.",
        pos: "v"
      },
      {
        t: "We should {{consider}} all the options.",
        es: "Deberíamos considerar todas las opciones.",
        pos: "v"
      },
      {
        t: "The price {{includes}} breakfast and dinner.",
        es: "El precio incluye desayuno y cena.",
        pos: "v"
      },
      {
        t: "I {{noticed}} something strange in the photo.",
        es: "Noté algo extraño en la foto.",
        pos: "v"
      },
      {
        t: "The company {{hired}} twenty new employees.",
        es: "La empresa contrató a veinte empleados nuevos.",
        pos: "v"
      },
      {
        t: "It's hard to {{concentrate}} with this noise.",
        es: "Es difícil concentrarse con este ruido.",
        pos: "v"
      },
      {
        t: "They {{shared}} the prize between them.",
        es: "Compartieron el premio entre ellos.",
        pos: "v"
      },
      {
        t: "The situation is getting {{worse}}.",
        es: "La situación está empeorando.",
        pos: "adj"
      },
      {
        t: "He gave a very {{detailed}} report.",
        es: "Él dio un informe muy detallado.",
        pos: "adj"
      },
      {
        t: "Her {{attitude}} toward work has changed.",
        es: "Su actitud hacia el trabajo ha cambiado.",
        pos: "n"
      },
      {
        t: "Tom {{decided}}.",
        es: "Tom decidió.",
        pos: "v"
      },
      {
        t: "He already {{decided}}.",
        es: "Ya lo decidió.",
        pos: "v"
      },
      {
        t: "She already {{decided}}.",
        es: "Ya lo decidió.",
        pos: "v"
      },
      {
        t: "I have {{decided}}.",
        es: "Tomé mi decisión.",
        pos: "v"
      },
      {
        t: "{{Explain}} yourselves.",
        es: "Explicaos.",
        pos: "v"
      },
      {
        t: "{{Explain}} yourself!",
        es: "¡Explícate!",
        pos: "v"
      },
      {
        t: "{{Explain}} yourself.",
        es: "Explíquese.",
        pos: "v"
      },
      {
        t: "We {{explain}} something.",
        es: "Explicamos algo.",
        pos: "v"
      },
      {
        t: "{{Improve}} your skills.",
        es: "Mejora tus habilidades.",
        pos: "v"
      },
      {
        t: "Tom'll {{improve}}.",
        es: "Tom mejorará.",
        pos: "v"
      },
      {
        t: "They showed {{worry}}.",
        es: "Mostraban preocupación.",
        pos: "v"
      },
      {
        t: "I never {{worry}}.",
        es: "Yo nunca me preocupo.",
        pos: "v"
      },
      {
        t: "She {{arrived}}.",
        es: "Llegó.",
        pos: "v"
      },
      {
        t: "Tom {{arrived}}.",
        es: "Tom llegó.",
        pos: "v"
      },
      {
        t: "Spring {{arrived}}.",
        es: "Llegó la primavera.",
        pos: "v"
      },
      {
        t: "They've {{arrived}}.",
        es: "Llegaron.",
        pos: "v"
      },
      {
        t: "{{Clear}} the table.",
        es: "Recoge la mesa.",
        pos: "adj"
      },
      {
        t: "Is it {{clear}}?",
        es: "¿Está claro?",
        pos: "adj"
      },
      {
        t: "That's {{clear}}.",
        es: "Eso es claro.",
        pos: "adj"
      },
      {
        t: "{{Clear}} the corridor!",
        es: "¡Ordenen el pasillo!",
        pos: "adj"
      },
      {
        t: "She {{realized}}.",
        es: "Ella se dio cuenta.",
        pos: "v"
      },
      {
        t: "Tom {{realized}} Mary had fainted.",
        es: "Tom se dio cuenta de que Mary se había desmayado.",
        pos: "v"
      },
      {
        t: "He {{realized}} his failure.",
        es: "Él reconoció su fracaso.",
        pos: "v"
      },
      {
        t: "I {{realized}} what was happening.",
        es: "Comprendí lo que estaba pasando.",
        pos: "v"
      },
      {
        t: "What is the {{solution}}?",
        es: "¿Cuál es la solución?",
        pos: "n"
      },
      {
        t: "Death is no {{solution}}.",
        es: "La muerte no es la solución.",
        pos: "n"
      },
      {
        t: "We need another {{solution}}.",
        es: "Necesitamos otra solución.",
        pos: "n"
      },
      {
        t: "I have the {{solution}}.",
        es: "Tengo la solución.",
        pos: "n"
      },
      {
        t: "They {{offered}} assistance.",
        es: "Ofrecieron asistencia.",
        pos: "v"
      },
      {
        t: "Make an {{appointment}}.",
        es: "Pida cita.",
        pos: "n"
      },
      {
        t: "I have an {{appointment}} tonight.",
        es: "Tengo una cita esta noche.",
        pos: "n"
      },
      {
        t: "Tom forgot his {{appointment}}.",
        es: "Tom olvidó su cita.",
        pos: "n"
      },
      {
        t: "I've got an {{appointment}}.",
        es: "Tengo una cita.",
        pos: "n"
      },
      {
        t: "Our train is {{delayed}}.",
        es: "Nuestro tren está atrasado.",
        pos: "v"
      },
      {
        t: "Almost all of them were {{delayed}}.",
        es: "Casi todos se retrasaron.",
        pos: "v"
      },
      {
        t: "Has the train been {{delayed}}?",
        es: "¿El tren se retrasó?",
        pos: "v"
      },
      {
        t: "What is {{delayed}} may come later.",
        es: "Lo que está retrasado puede llegar más tarde.",
        pos: "v"
      },
      {
        t: "{{Avoid}} the obstacles.",
        es: "Sortead los obstáculos.",
        pos: "v"
      },
      {
        t: "I {{avoid}} Tom.",
        es: "Evito a Tom.",
        pos: "v"
      },
      {
        t: "{{Avoid}} bad company.",
        es: "Guárdese de las malas compañías.",
        pos: "v"
      },
      {
        t: "Be careful, {{avoid}} risks.",
        es: "Ten cuidado, evita riesgos.",
        pos: "v"
      },
      {
        t: "Yanni {{apologized}}.",
        es: "Yanni se disculpó.",
        pos: "v"
      },
      {
        t: "I {{apologized}}.",
        es: "Me disculpé.",
        pos: "v"
      },
      {
        t: "Tom {{apologized}}.",
        es: "Tomás se disculpó.",
        pos: "v"
      },
      {
        t: "I require {{advice}}.",
        es: "Necesito que me aconsejen.",
        pos: "n"
      },
      {
        t: "I need {{advice}}.",
        es: "Yo necesito consejos.",
        pos: "n"
      },
      {
        t: "Follow my {{advice}}.",
        es: "Sigue mi consejo.",
        pos: "n"
      },
      {
        t: "This is good {{advice}}.",
        es: "Es un buen consejo.",
        pos: "n"
      },
      {
        t: "I {{suggest}} we leave.",
        es: "Sugiero que nos vayamos.",
        pos: "v"
      },
      {
        t: "The data {{suggest}} otherwise.",
        es: "Los datos sugieren lo contrario.",
        pos: "v"
      },
      {
        t: "I {{suggest}} you hide.",
        es: "Te sugiero que te escondas.",
        pos: "v"
      },
      {
        t: "That {{depends}} on you.",
        es: "Eso depende de vosotros.",
        pos: "v"
      },
      {
        t: "Tom {{depends}} on Mary.",
        es: "Tom depende de Mary.",
        pos: "v"
      },
      {
        t: "That {{depends}} on the context.",
        es: "Eso depende del contexto.",
        pos: "v"
      },
      {
        t: "She's {{disappointed}}.",
        es: "Ella estaba decepcionada.",
        pos: "adj"
      },
      {
        t: "You are {{disappointed}}.",
        es: "Usted está desilusionado.",
        pos: "adj"
      },
      {
        t: "Tom felt {{disappointed}}.",
        es: "Tom se sintió decepcionado.",
        pos: "adj"
      },
      {
        t: "Are you {{disappointed}}?",
        es: "¿Estáis decepcionados?",
        pos: "adj"
      },
      {
        t: "He's very {{experienced}}.",
        es: "Él tiene mucha experiencia.",
        pos: "adj"
      },
      {
        t: "Have you {{experienced}} xenophobia?",
        es: "¿Has experimentado la xenofobia?",
        pos: "adj"
      },
      {
        t: "He's young but {{experienced}}.",
        es: "Él es joven pero experimentado.",
        pos: "adj"
      },
      {
        t: "Have you {{experienced}} nausea recently?",
        es: "¿Has sentido nauseas últimamente?",
        pos: "adj"
      },
      {
        t: "Who can {{afford}} this?",
        es: "¿Quién se puede permitir esto?",
        pos: "v"
      },
      {
        t: "I can {{afford}} it.",
        es: "Me lo puedo permitir.",
        pos: "v"
      },
      {
        t: "We cannot {{afford}} it.",
        es: "No podemos costearlo.",
        pos: "v"
      },
      {
        t: "Tom can't {{afford}} bail.",
        es: "Tomás no puede pagar la fianza.",
        pos: "v"
      },
      {
        t: "{{Return}} this.",
        es: "Regresa esto.",
        pos: "v"
      },
      {
        t: "{{Return}} fire.",
        es: "Responded a sus disparos.",
        pos: "v"
      },
      {
        t: "{{Return}} immediately.",
        es: "Vuelve inmediatamente.",
        pos: "v"
      },
      {
        t: "You might {{return}}.",
        es: "Quizá vuelva.",
        pos: "v"
      },
      {
        t: "Keep {{running}}.",
        es: "Seguí corriendo.",
        pos: "v"
      },
      {
        t: "Start {{running}}.",
        es: "Empieza a correr.",
        pos: "v"
      },
      {
        t: "I hate black {{humor}}.",
        es: "Detesto el humor negro.",
        pos: "n"
      },
      {
        t: "Do you like absurd {{humor}}?",
        es: "¿Te gusta el humor absurdo?",
        pos: "n"
      },
      {
        t: "He is devoid of {{humor}}.",
        es: "Él es desprovisto de humor.",
        pos: "n"
      },
      {
        t: "Do you not like dark {{humor}}?",
        es: "¿No le gusta el humor negro?",
        pos: "n"
      },
      {
        t: "Is this {{worth}} it?",
        es: "¿Vale la pena esto?",
        pos: "adj"
      },
      {
        t: "I'm {{worth}} it.",
        es: "Valgo la pena.",
        pos: "adj"
      },
      {
        t: "You're {{worth}} it.",
        es: "Tú lo vales.",
        pos: "adj"
      },
      {
        t: "Are they {{worth}} it?",
        es: "¿Valen la pena?",
        pos: "adj"
      },
      {
        t: "Can you {{recall}} the accident?",
        es: "¿Puedes recordar el accidente?",
        pos: "v"
      },
      {
        t: "I often {{recall}} my happy childhood memories.",
        es: "A menudo rememoro los felices recuerdos de mi infancia.",
        pos: "v"
      },
      {
        t: "Try to {{recall}} what happened.",
        es: "Intenta recordar lo que pasó.",
        pos: "v"
      },
      {
        t: "I don't {{recall}} asking you for help.",
        es: "No recuerdo haber pedido tu ayuda.",
        pos: "v"
      },
      {
        t: "I understand the {{reason}}.",
        es: "Entiendo el motivo.",
        pos: "n"
      },
      {
        t: "There's another {{reason}}.",
        es: "Hay otra razón.",
        pos: "n"
      },
      {
        t: "That's the {{reason}}.",
        es: "Esa es la razón.",
        pos: "n"
      },
      {
        t: "Give me a {{reason}}.",
        es: "Dame una razón.",
        pos: "n"
      },
      {
        t: "I {{pretended}} to work.",
        es: "Fingí que trabajaba.",
        pos: "v"
      },
      {
        t: "They {{pretended}} they were asleep.",
        es: "Fingían dormir.",
        pos: "v"
      },
      {
        t: "She {{pretended}} to not care.",
        es: "Ella fingía indiferencia.",
        pos: "v"
      },
      {
        t: "Lisa {{pretended}} not to hear.",
        es: "Lisa fingió no escuchar.",
        pos: "v"
      },
      {
        t: "This road {{connects}} the two cities.",
        es: "Este camino une a las dos ciudades.",
        pos: "v"
      },
      {
        t: "This bus {{connects}} the two large cities.",
        es: "Este autobús comunica las dos grandes ciudades.",
        pos: "v"
      },
      {
        t: "I {{barely}} eat meat.",
        es: "Apenas como carne.",
        pos: "adv"
      },
      {
        t: "I {{barely}} had dinner.",
        es: "Apenas cené.",
        pos: "adv"
      },
      {
        t: "I {{barely}} ate dinner.",
        es: "Apenas cené.",
        pos: "adv"
      },
      {
        t: "I could {{barely}} stand.",
        es: "Apenas podía mantenerme en pie.",
        pos: "adv"
      },
      {
        t: "You've {{grown}}.",
        es: "Has crecido.",
        pos: "v"
      },
      {
        t: "You've {{grown}} fat.",
        es: "Has engordado.",
        pos: "v"
      },
      {
        t: "How you've {{grown}}!",
        es: "¡Cómo has crecido!",
        pos: "v"
      },
      {
        t: "My children are {{grown}} up.",
        es: "Mis hijos son adultos.",
        pos: "v"
      },
      {
        t: "{{Waiting}} is boring.",
        es: "Esperar es aburrido.",
        pos: "v"
      },
      {
        t: "We're {{waiting}}.",
        es: "Esperamos.",
        pos: "v"
      },
      {
        t: "Who {{canceled}}?",
        es: "¿Quién canceló?",
        pos: "v"
      },
      {
        t: "Tom {{canceled}}.",
        es: "Tom canceló.",
        pos: "v"
      },
      {
        t: "They {{canceled}}.",
        es: "Cancelaron.",
        pos: "v"
      },
      {
        t: "I {{canceled}} it.",
        es: "Yo lo cancelé.",
        pos: "v"
      },
      {
        t: "I wonder {{whether}} you understand.",
        es: "Me pregunto si entiendes.",
        pos: "conj"
      },
      {
        t: "Check {{whether}} the papayas are ripe.",
        es: "Verificá si las papayas están maduras.",
        pos: "conj"
      },
      {
        t: "I wonder {{whether}} Tom is angry.",
        es: "Me pregunto si Tom está enojado.",
        pos: "conj"
      },
      {
        t: "Do you know {{whether}} Tom lives here?",
        es: "¿Sabes si Tom vive aquí?",
        pos: "conj"
      },
      {
        t: "The {{forecast}} rain never eventuated.",
        es: "La previsión de lluvia nunca ocurrió.",
        pos: "n"
      },
      {
        t: "The weather is {{forecast}} scientifically.",
        es: "El clima es pronosticado científicamente.",
        pos: "n"
      },
      {
        t: "Rain is {{forecast}} for this evening.",
        es: "Se pronostica lluvia para esta noche.",
        pos: "n"
      },
      {
        t: "Today's weather {{forecast}} proved right.",
        es: "El pronóstico del tiempo acertó hoy.",
        pos: "n"
      },
      {
        t: "{{Fill}} this out.",
        es: "Rellena esto.",
        pos: "v"
      },
      {
        t: "{{Fill}} out the questionnaire.",
        es: "Rellena el cuestionario.",
        pos: "v"
      },
      {
        t: "Just {{fill}} this out.",
        es: "Limítate a rellenarlo.",
        pos: "v"
      },
      {
        t: "{{Fill}} up the tank.",
        es: "Llena el depósito.",
        pos: "v"
      },
      {
        t: "Try {{solving}} the problem.",
        es: "Intenta resolver el problema.",
        pos: "v"
      },
      {
        t: "Tom tried {{solving}} the problem.",
        es: "Tom intentó resolver el problema.",
        pos: "v"
      },
      {
        t: "I'm {{solving}} a puzzle.",
        es: "Estoy resolviendo un acertijo.",
        pos: "v"
      },
      {
        t: "He tried {{solving}} the problem.",
        es: "Él trató de resolver el problema.",
        pos: "v"
      },
      {
        t: "He {{surprised}} us.",
        es: "Nos sorprendió.",
        pos: "v"
      },
      {
        t: "That {{surprised}} me.",
        es: "Eso me sorprendió.",
        pos: "v"
      },
      {
        t: "He's {{surprised}}.",
        es: "Está sorprendido.",
        pos: "v"
      },
      {
        t: "They were {{surprised}}.",
        es: "Estaban sorprendidos.",
        pos: "v"
      },
      {
        t: "Is she {{against}} you?",
        es: "¿Está ella en tu contra?",
        pos: "prep"
      },
      {
        t: "Are you {{against}} them?",
        es: "¿Estás en contra de ellos?",
        pos: "prep"
      },
      {
        t: "I stand {{against}} Israel.",
        es: "Estoy en contra de Israel.",
        pos: "prep"
      },
      {
        t: "Some are {{against}} it.",
        es: "Algunos están en contra.",
        pos: "prep"
      },
      {
        t: "Let's {{review}} Lesson 5.",
        es: "Vamos a repasar la Lección 5.",
        pos: "v"
      },
      {
        t: "Today I have to {{review}} Spanish.",
        es: "Hoy tengo que repasar español.",
        pos: "v"
      },
      {
        t: "I will write a {{review}} of that book.",
        es: "Escribiré una crítica para ese libro.",
        pos: "v"
      },
      {
        t: "All entries are subject to {{review}} once added.",
        es: "Todas las entradas son sujetas a revisión una vez que son agregadas.",
        pos: "v"
      },
      {
        t: "You need {{patience}}.",
        es: "Necesitas paciencia.",
        pos: "n"
      },
      {
        t: "I lack {{patience}}.",
        es: "Me falta paciencia.",
        pos: "n"
      },
      {
        t: "Genius is eternal {{patience}}.",
        es: "El genio es paciencia eterna.",
        pos: "n"
      },
      {
        t: "Her {{patience}} is exhausted.",
        es: "Su paciencia está agotada.",
        pos: "n"
      },
      {
        t: "I want to {{compete}}.",
        es: "Quiero competir.",
        pos: "v"
      },
      {
        t: "We can't {{compete}} with that.",
        es: "No podemos competir con eso.",
        pos: "v"
      },
      {
        t: "We can't {{compete}} with Asia.",
        es: "No podemos competir con Asia.",
        pos: "v"
      },
      {
        t: "That word {{describes}} it perfectly.",
        es: "Esa palabra lo describe perfectamente.",
        pos: "v"
      },
      {
        t: "{{Consider}} divorce.",
        es: "Consideren el divorcio.",
        pos: "v"
      },
      {
        t: "{{Consider}} the source.",
        es: "Considera la fuente.",
        pos: "v"
      },
      {
        t: "{{Consider}} yourselves lucky.",
        es: "Considérense afortunados.",
        pos: "v"
      },
      {
        t: "{{Consider}} yourself lucky.",
        es: "Considérate afortunado.",
        pos: "v"
      },
      {
        t: "Paella often {{includes}} snails.",
        es: "La paella a menudo incluye caracoles.",
        pos: "v"
      },
      {
        t: "This amount {{includes}} tax.",
        es: "Este monto incluye impuestos.",
        pos: "v"
      },
      {
        t: "The price {{includes}} tax.",
        es: "El precio incluye impuestos.",
        pos: "v"
      },
      {
        t: "Everyone {{noticed}}.",
        es: "Todo el mundo se dio cuenta.",
        pos: "v"
      },
      {
        t: "Not everyone {{noticed}}.",
        es: "No todos notaron.",
        pos: "v"
      },
      {
        t: "We {{noticed}} the coincidence.",
        es: "Nos percatamos de la coincidencia.",
        pos: "v"
      },
      {
        t: "The principal {{noticed}} that.",
        es: "El director se dio cuenta de eso.",
        pos: "v"
      },
      {
        t: "He {{hired}} mercenaries.",
        es: "Él contrató mercenarios.",
        pos: "v"
      },
      {
        t: "Tom was {{hired}}.",
        es: "Tom fue contratado.",
        pos: "v"
      },
      {
        t: "Tom {{hired}} Mary.",
        es: "Tom contrató a Mary.",
        pos: "v"
      },
      {
        t: "I {{hired}} Tom.",
        es: "Contraté a Tom.",
        pos: "v"
      },
      {
        t: "{{Concentrate}}, Tom.",
        es: "Concéntrate, Tom.",
        pos: "v"
      },
      {
        t: "Tom was unable to {{concentrate}}.",
        es: "Tom era incapaz de concentrarse.",
        pos: "v"
      },
      {
        t: "Let him {{concentrate}}.",
        es: "Dejadlo concentrarse.",
        pos: "v"
      },
      {
        t: "Let me {{concentrate}}.",
        es: "Déjame concentrarme.",
        pos: "v"
      },
      {
        t: "We {{shared}} ideas.",
        es: "Compartimos ideas.",
        pos: "v"
      },
      {
        t: "We {{shared}} everything.",
        es: "Compartíamos todo.",
        pos: "v"
      },
      {
        t: "Tom got {{worse}}.",
        es: "Tom se puso peor.",
        pos: "adj"
      },
      {
        t: "Mine are {{worse}}.",
        es: "Las mías son peores.",
        pos: "adj"
      },
      {
        t: "I expected {{worse}}.",
        es: "Esperaba algo peor.",
        pos: "adj"
      },
      {
        t: "Yours is {{worse}}.",
        es: "El tuyo es peor.",
        pos: "adj"
      },
      {
        t: "I await a {{detailed}} report.",
        es: "Me espero un informe detallado.",
        pos: "adj"
      },
      {
        t: "I gave Tom {{detailed}} instructions.",
        es: "Le dí a Tom instrucciones detalladas.",
        pos: "adj"
      },
      {
        t: "Tom gave a {{detailed}} answer.",
        es: "Tom contestó con pelos y señales.",
        pos: "adj"
      },
      {
        t: "I gave him {{detailed}} instructions.",
        es: "Le di instrucciones detalladas.",
        pos: "adj"
      },
      {
        t: "Her {{attitude}} is praiseworthy.",
        es: "Su actitud es digna de elogio.",
        pos: "n"
      },
      {
        t: "His {{attitude}} is praiseworthy.",
        es: "Su actitud es digna de elogio.",
        pos: "n"
      },
      {
        t: "That's the {{attitude}}.",
        es: "Esa es la actitud.",
        pos: "n"
      },
      {
        t: "I like your {{attitude}}.",
        es: "Me agrada tu actitud.",
        pos: "n"
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
        pos: "v"
      },
      {
        t: "The new policy will {{affect}} thousands of workers.",
        es: "La nueva política afectará a miles de trabajadores.",
        pos: "v"
      },
      {
        t: "They reached an {{agreement}} after hours of discussion.",
        es: "Llegaron a un acuerdo tras horas de discusión.",
        pos: "n"
      },
      {
        t: "The study {{revealed}} surprising results.",
        es: "El estudio reveló resultados sorprendentes.",
        pos: "v"
      },
      {
        t: "There has been a {{significant}} increase in prices.",
        es: "Ha habido un aumento significativo en los precios.",
        pos: "adj"
      },
      {
        t: "We need to {{address}} this issue immediately.",
        es: "Necesitamos abordar este asunto de inmediato.",
        pos: "v"
      },
      {
        t: "His argument was not very {{convincing}}.",
        es: "Su argumento no fue muy convincente.",
        pos: "adj"
      },
      {
        t: "The government announced new {{measures}} to reduce pollution.",
        es: "El gobierno anunció nuevas medidas para reducir la contaminación.",
        pos: "n"
      },
      {
        t: "We must take his opinion into {{account}}.",
        es: "Debemos tener en cuenta su opinión.",
        pos: "n"
      },
      {
        t: "The economy is showing signs of {{recovery}}.",
        es: "La economía muestra señales de recuperación.",
        pos: "n"
      },
      {
        t: "She {{overcame}} many obstacles to achieve her dream.",
        es: "Ella superó muchos obstáculos para lograr su sueño.",
        pos: "v"
      },
      {
        t: "Her performance {{exceeded}} all expectations.",
        es: "Su actuación superó todas las expectativas.",
        pos: "v"
      },
      {
        t: "The disease spreads {{rapidly}} in crowded areas.",
        es: "La enfermedad se propaga rápidamente en zonas concurridas.",
        pos: "adv"
      },
      {
        t: "He was {{reluctant}} to accept the offer.",
        es: "Él estaba reacio a aceptar la oferta.",
        pos: "adj"
      },
      {
        t: "She spoke with {{remarkable}} confidence.",
        es: "Ella habló con una confianza notable.",
        pos: "adj"
      },
      {
        t: "The committee will {{assess}} the damage next week.",
        es: "El comité evaluará los daños la próxima semana.",
        pos: "v"
      },
      {
        t: "His behavior is completely {{unacceptable}}.",
        es: "Su comportamiento es completamente inaceptable.",
        pos: "adj"
      },
      {
        t: "The company {{underwent}} major changes last year.",
        es: "La empresa pasó por grandes cambios el año pasado.",
        pos: "v"
      },
      {
        t: "The results were {{consistent}} with our predictions.",
        es: "Los resultados fueron consistentes con nuestras predicciones.",
        pos: "adj"
      },
      {
        t: "He {{acknowledged}} that he had been wrong.",
        es: "Él reconoció que había estado equivocado.",
        pos: "v"
      },
      {
        t: "The two events are closely {{related}}.",
        es: "Los dos eventos están estrechamente relacionados.",
        pos: "adj"
      },
      {
        t: "The negotiations {{broke}} down after two days.",
        es: "Las negociaciones fracasaron después de dos días.",
        pos: "v"
      },
      {
        t: "The lawyer presented {{compelling}} evidence.",
        es: "El abogado presentó pruebas contundentes.",
        pos: "adj"
      },
      {
        t: "The volcano could {{erupt}} at any moment.",
        es: "El volcán podría entrar en erupción en cualquier momento.",
        pos: "v"
      },
      {
        t: "Scientists are {{conducting}} experiments on the new material.",
        es: "Los científicos están realizando experimentos con el nuevo material.",
        pos: "v"
      },
      {
        t: "The book provides a {{thorough}} analysis of the war.",
        es: "El libro ofrece un análisis exhaustivo de la guerra.",
        pos: "adj"
      },
      {
        t: "Despite the setbacks, she {{persevered}}.",
        es: "A pesar de los contratiempos, ella perseveró.",
        pos: "v"
      },
      {
        t: "The city's population has {{declined}} steadily.",
        es: "La población de la ciudad ha disminuido de forma constante.",
        pos: "v"
      },
      {
        t: "His comments {{triggered}} a heated debate.",
        es: "Sus comentarios desataron un debate acalorado.",
        pos: "v"
      },
      {
        t: "The contract contains several {{ambiguous}} clauses.",
        es: "El contrato contiene varias cláusulas ambiguas.",
        pos: "adj"
      },
      {
        t: "The charity relies {{heavily}} on donations.",
        es: "La organización benéfica depende en gran medida de las donaciones.",
        pos: "adv"
      },
      {
        t: "They had to {{postpone}} the launch due to technical issues.",
        es: "Tuvieron que posponer el lanzamiento por problemas técnicos.",
        pos: "v"
      },
      {
        t: "The witness's {{testimony}} was crucial to the case.",
        es: "El testimonio del testigo fue crucial para el caso.",
        pos: "n"
      },
      {
        t: "Her novel was {{widely}} praised by critics.",
        es: "Su novela fue ampliamente elogiada por la crítica.",
        pos: "adv"
      },
      {
        t: "The manager {{dismissed}} the allegations as false.",
        es: "El gerente desestimó las acusaciones por falsas.",
        pos: "v"
      },
      {
        t: "Access to clean water is a {{fundamental}} right.",
        es: "El acceso al agua potable es un derecho fundamental.",
        pos: "adj"
      },
      {
        t: "The team {{struggled}} to meet the deadline.",
        es: "El equipo luchó por cumplir con el plazo.",
        pos: "v"
      },
      {
        t: "The findings {{challenge}} conventional wisdom.",
        es: "Los hallazgos cuestionan las ideas convencionales.",
        pos: "v"
      },
      {
        t: "He has a {{tendency}} to exaggerate.",
        es: "Él tiene una tendencia a exagerar.",
        pos: "n"
      },
      {
        t: "The treaty was {{ratified}} by all member states.",
        es: "El tratado fue ratificado por todos los estados miembros.",
        pos: "v"
      },
      {
        t: "The results {{underscore}} the need for reform.",
        es: "Los resultados subrayan la necesidad de una reforma.",
        pos: "v"
      },
      {
        t: "The company was {{liable}} for the damages.",
        es: "La empresa era responsable de los daños.",
        pos: "adj"
      },
      {
        t: "His speech {{resonated}} with young voters.",
        es: "Su discurso resonó entre los votantes jóvenes.",
        pos: "v"
      },
      {
        t: "The policy {{hampered}} economic growth.",
        es: "La política obstaculizó el crecimiento económico.",
        pos: "v"
      },
      {
        t: "She gave a {{concise}} summary of the report.",
        es: "Ella dio un resumen conciso del informe.",
        pos: "adj"
      },
      {
        t: "The findings were {{corroborated}} by two studies.",
        es: "Los hallazgos fueron corroborados por dos estudios.",
        pos: "v"
      },
      {
        t: "The judge {{overturned}} the previous ruling.",
        es: "El juez revocó el fallo anterior.",
        pos: "v"
      },
      {
        t: "The negotiations reached a {{stalemate}}.",
        es: "Las negociaciones llegaron a un punto muerto.",
        pos: "n"
      },
      {
        t: "He made a {{plausible}} argument for the change.",
        es: "Él presentó un argumento plausible para el cambio.",
        pos: "adj"
      },
      {
        t: "The disease was {{eradicated}} decades ago.",
        es: "La enfermedad fue erradicada hace décadas.",
        pos: "v"
      },
      {
        t: "How will this {{affect}} you?",
        es: "¿Cómo te afectará?",
        pos: "v"
      },
      {
        t: "Are we in {{agreement}}?",
        es: "¿Estamos de acuerdo?",
        pos: "n"
      },
      {
        t: "What is the {{agreement}}?",
        es: "¿Qué es el acuerdo?",
        pos: "n"
      },
      {
        t: "Silence is not {{agreement}}.",
        es: "El silencio no es un acuerdo.",
        pos: "n"
      },
      {
        t: "Everybody was in {{agreement}}.",
        es: "Todo el mundo estuvo de acuerdo.",
        pos: "n"
      },
      {
        t: "They {{revealed}} the matter.",
        es: "Se destapó el asunto.",
        pos: "v"
      },
      {
        t: "Yanni {{revealed}} his spectacular abs.",
        es: "Yanni descubrió sus espectaculares abdominales.",
        pos: "v"
      },
      {
        t: "Tom {{revealed}} his secret.",
        es: "Tomás reveló su secreto.",
        pos: "v"
      },
      {
        t: "Tom {{revealed}} the secret.",
        es: "Tomás reveló el secreto.",
        pos: "v"
      },
      {
        t: "It was a {{significant}} moment.",
        es: "Fue un momento significativo.",
        pos: "adj"
      },
      {
        t: "This is a very {{significant}} amendment.",
        es: "Esta es una enmienda muy significativa.",
        pos: "adj"
      },
      {
        t: "Tom is Mary's {{significant}} other.",
        es: "Tom es la media naranja de Mary.",
        pos: "adj"
      },
      {
        t: "He has made a {{significant}} decision.",
        es: "Él ha tomado una decisión significativa.",
        pos: "adj"
      },
      {
        t: "Input your email {{address}}.",
        es: "Introduce tu dirección de email.",
        pos: "v"
      },
      {
        t: "You know the {{address}}?",
        es: "¿Sabés la dirección?",
        pos: "v"
      },
      {
        t: "What's the {{address}}?",
        es: "¿Cuál es la dirección?",
        pos: "v"
      },
      {
        t: "I forgot the {{address}}.",
        es: "He olvidado la dirección.",
        pos: "v"
      },
      {
        t: "Good luck {{convincing}} her.",
        es: "Buena suerte con convencerla.",
        pos: "adj"
      },
      {
        t: "Good luck {{convincing}} him.",
        es: "Buena suerte con convencerlo.",
        pos: "adj"
      },
      {
        t: "A scale {{measures}} weight.",
        es: "Una balanza mide el peso.",
        pos: "n"
      },
      {
        t: "Desperate times, desperate {{measures}}.",
        es: "A grandes males, grandes remedios.",
        pos: "n"
      },
      {
        t: "Take all possible {{measures}}.",
        es: "Toma todas las medidas posibles.",
        pos: "n"
      },
      {
        t: "Desperate {{measures}} were taken.",
        es: "Medidas desesperadas fueron tomadas.",
        pos: "n"
      },
      {
        t: "Open an {{account}}.",
        es: "Abre una cuenta.",
        pos: "n"
      },
      {
        t: "On what {{account}}?",
        es: "¿A cuenta de qué?",
        pos: "n"
      },
      {
        t: "Create a savings {{account}}.",
        es: "Crea una cuenta de ahorros.",
        pos: "n"
      },
      {
        t: "You must concentrate entirely on your {{recovery}}.",
        es: "Debes concentrarte enteramente en tu recuperación.",
        pos: "n"
      },
      {
        t: "After the first year, the patient's {{recovery}} stagnated.",
        es: "Después del primer año la recuperación del paciente se estancó.",
        pos: "n"
      },
      {
        t: "There is little hope of her {{recovery}}.",
        es: "Hay pocas esperanzas de que se recupere.",
        pos: "n"
      },
      {
        t: "There is no hope of his {{recovery}}.",
        es: "No hay ninguna expectativa de que él se recupere.",
        pos: "n"
      },
      {
        t: "She {{overcame}} the difficulty.",
        es: "Ella superó la dificultad.",
        pos: "v"
      },
      {
        t: "He {{overcame}} many difficulties.",
        es: "Él superó muchas dificultades.",
        pos: "v"
      },
      {
        t: "Peter {{overcame}} a lot of difficulties before succeeding as a doctor.",
        es: "Peter superó muchas dificultades antes de tener éxito como doctor.",
        pos: "v"
      },
      {
        t: "I finally {{overcame}} my shyness and asked him out on a date.",
        es: "Finalmente vencí mi timidez y le pregunté si quería salir conmigo.",
        pos: "v"
      },
      {
        t: "His pain {{exceeded}} every threshold.",
        es: "Su dolor ha superado todos los umbrales.",
        pos: "v"
      },
      {
        t: "Japan's exports {{exceeded}} imports by $77.8 billion in 1998.",
        es: "Las exportaciones de Japón superaron a las importaciones por $77.8 billones en el 1998.",
        pos: "v"
      },
      {
        t: "Imports {{exceeded}} exports last year.",
        es: "La importación superó a la exportación el año pasado.",
        pos: "v"
      },
      {
        t: "Mice multiply {{rapidly}}.",
        es: "Los ratones se multiplican rápidamente.",
        pos: "adv"
      },
      {
        t: "World population has {{rapidly}} increased.",
        es: "La población mundial ha aumentado rápidamente.",
        pos: "adv"
      },
      {
        t: "Tom runs {{rapidly}}.",
        es: "Tom corre rápido.",
        pos: "adv"
      },
      {
        t: "The world is changing {{rapidly}}.",
        es: "El mundo está cambiando rápidamente.",
        pos: "adv"
      },
      {
        t: "Tom was {{reluctant}} to go.",
        es: "Tom estaba reacio a marcharse.",
        pos: "adj"
      },
      {
        t: "You seem {{reluctant}} to do that.",
        es: "Pareces reacio a hacerlo.",
        pos: "adj"
      },
      {
        t: "This is {{remarkable}}.",
        es: "Esto es destacable.",
        pos: "adj"
      },
      {
        t: "Something {{remarkable}} happened.",
        es: "Ocurrió algo increíble.",
        pos: "adj"
      },
      {
        t: "The change was {{remarkable}}.",
        es: "El cambio fue sobresaliente.",
        pos: "adj"
      },
      {
        t: "Tom achieved {{remarkable}} results.",
        es: "Tom logró resultados extraordinarios.",
        pos: "adj"
      },
      {
        t: "We'll {{assess}} the situation.",
        es: "Evaluaremos la situación.",
        pos: "v"
      },
      {
        t: "We also {{assess}} analytical ability.",
        es: "Además evaluamos la destreza analítica.",
        pos: "v"
      },
      {
        t: "{{Assess}} people, not based on their appearance, but on their behavior.",
        es: "Evalúa a la gente no por su apariencia, sino por su comportamiento.",
        pos: "v"
      },
      {
        t: "I need to {{assess}} the damage.",
        es: "Necesito evaluar el daño.",
        pos: "v"
      },
      {
        t: "This is {{unacceptable}}.",
        es: "Esto es inaceptable.",
        pos: "adj"
      },
      {
        t: "That's absolutely {{unacceptable}}.",
        es: "Eso es totalmente inaceptable.",
        pos: "adj"
      },
      {
        t: "The current indoctrination in Spanish schools is {{unacceptable}}.",
        es: "El adoctrinamiento actual en las escuelas españolas es inadmisible.",
        pos: "adj"
      },
      {
        t: "That's {{unacceptable}}.",
        es: "Eso es inaceptable.",
        pos: "adj"
      },
      {
        t: "My grandmother {{underwent}} surgery in Germany.",
        es: "Mi nana fue operada en Alemania.",
        pos: "v"
      },
      {
        t: "Those who {{underwent}} blood draws were scared during the prick.",
        es: "Los que se sometían a extracciones de sangre tenían miedo durante el pinchazo.",
        pos: "v"
      },
      {
        t: "Be {{consistent}}.",
        es: "Sé coherente.",
        pos: "adj"
      },
      {
        t: "You're not {{consistent}}.",
        es: "No eres consistente.",
        pos: "adj"
      },
      {
        t: "You aren't {{consistent}}.",
        es: "No eres consistente.",
        pos: "adj"
      },
      {
        t: "You are not {{consistent}}.",
        es: "No eres consistente.",
        pos: "adj"
      },
      {
        t: "Sami {{acknowledged}} it.",
        es: "Sami lo reconoció.",
        pos: "v"
      },
      {
        t: "His achievements were {{acknowledged}}.",
        es: "Sus logros fueron reconocidos.",
        pos: "v"
      },
      {
        t: "Sami {{acknowledged}} that.",
        es: "Sami reconoció eso.",
        pos: "v"
      },
      {
        t: "Tom {{acknowledged}} his mistake.",
        es: "Tom reconoció su error.",
        pos: "v"
      },
      {
        t: "Are you {{related}}?",
        es: "¿Sois parientes?",
        pos: "adj"
      },
      {
        t: "The rope {{broke}}.",
        es: "La cuerda se rompió.",
        pos: "v"
      },
      {
        t: "A dam {{broke}}.",
        es: "Reventó una presa.",
        pos: "v"
      },
      {
        t: "You {{broke}} me.",
        es: "Me quebraste.",
        pos: "v"
      },
      {
        t: "War {{broke}} out.",
        es: "La guerra estalló.",
        pos: "v"
      },
      {
        t: "The scientist is {{conducting}} medical research.",
        es: "El científico está realizando una investigación médica.",
        pos: "v"
      },
      {
        t: "Be {{thorough}}.",
        es: "Sé exhaustivo.",
        pos: "adj"
      },
      {
        t: "I'm {{thorough}}.",
        es: "Soy concienzudo.",
        pos: "adj"
      },
      {
        t: "Tom is {{thorough}}.",
        es: "Tom es meticuloso.",
        pos: "adj"
      },
      {
        t: "You're {{thorough}}.",
        es: "Eres meticuloso.",
        pos: "adj"
      },
      {
        t: "Your health has {{declined}}.",
        es: "Su salud tuvo una caída.",
        pos: "v"
      },
      {
        t: "Her health has {{declined}}.",
        es: "Su salud tuvo una caída.",
        pos: "v"
      },
      {
        t: "His health has {{declined}}.",
        es: "Su salud tuvo una caída.",
        pos: "v"
      },
      {
        t: "Tom {{declined}} the offer.",
        es: "Tom rechazó la oferta.",
        pos: "v"
      },
      {
        t: "Their small protest {{triggered}} a mass demonstration.",
        es: "Su pequeña protesta dio paso a una manifestación masiva.",
        pos: "v"
      },
      {
        t: "The Great Depression {{triggered}} a great surge in crime.",
        es: "La Gran Depresión disparó un gran oleada de crímenes.",
        pos: "v"
      },
      {
        t: "This sentence isn't long and {{ambiguous}}.",
        es: "Esta frase no es larga y ambigua.",
        pos: "adj"
      },
      {
        t: "{{Ambiguous}} phrases in general lead to amusing interpretations.",
        es: "Las frases ambiguas por lo general dan lugar a divertidas interpretaciones.",
        pos: "adj"
      },
      {
        t: "Let's add {{ambiguous}} sentences more often.",
        es: "Subamos frases ambiguas más frecuentemente.",
        pos: "adj"
      },
      {
        t: "The phrase seemed {{ambiguous}} to me, so I translated it in several ways.",
        es: "La frase se me hizo ambigua, así que la traduje de varias maneras.",
        pos: "adj"
      },
      {
        t: "He yawned {{heavily}}.",
        es: "Bostezó profundamente.",
        pos: "adv"
      },
      {
        t: "It rained {{heavily}}.",
        es: "Ha llovido mucho.",
        pos: "adv"
      },
      {
        t: "It's snowing {{heavily}}.",
        es: "Está nevando mucho.",
        pos: "adv"
      },
      {
        t: "Tom is {{heavily}} armed.",
        es: "Tomás está muy armado.",
        pos: "adv"
      },
      {
        t: "Let's {{postpone}} dinner.",
        es: "Pospongamos la cena.",
        pos: "v"
      },
      {
        t: "We can't {{postpone}} the meeting.",
        es: "No podemos posponer la junta.",
        pos: "v"
      },
      {
        t: "Can we {{postpone}} the trip?",
        es: "¿Podemos posponer el viaje?",
        pos: "v"
      },
      {
        t: "Tom decided to {{postpone}} his departure.",
        es: "Tom decidió posponer su salida.",
        pos: "v"
      },
      {
        t: "Then John gave this {{testimony}}.",
        es: "Entonces John dio su testimonio.",
        pos: "n"
      },
      {
        t: "He contradicted himself several times in his {{testimony}}.",
        es: "Se contradijo varias veces en su declaración.",
        pos: "n"
      },
      {
        t: "His account of what happened is inconsistent with {{testimony}} from other witnesses.",
        es: "Su explicación de lo que ocurrió es inconsistente con testimonio de otros testigos.",
        pos: "n"
      },
      {
        t: "The witnesses were able to refute the false {{testimony}} of the suspect.",
        es: "Los testigos pudieron refutar el falso testimonio del sospechoso.",
        pos: "n"
      },
      {
        t: "She is {{widely}} known.",
        es: "Ella es conocida a lo ancho.",
        pos: "adv"
      },
      {
        t: "This plant is {{widely}} used as medicine.",
        es: "Esta planta se emplea ampliamente como medicina.",
        pos: "adv"
      },
      {
        t: "That novel was {{widely}} read.",
        es: "Esa novela fue muy leída.",
        pos: "adv"
      },
      {
        t: "Spanish is {{widely}} spoken in South America.",
        es: "El español es muy hablado en América del Sur.",
        pos: "adv"
      },
      {
        t: "You are {{dismissed}}.",
        es: "Estás despedido.",
        pos: "v"
      },
      {
        t: "Tom was {{dismissed}} without notice.",
        es: "Tom fue despedido sin previo aviso.",
        pos: "v"
      },
      {
        t: "I {{dismissed}} one.",
        es: "Yo despedí a uno.",
        pos: "v"
      },
      {
        t: "Tom was {{dismissed}}.",
        es: "Tom fue despedido.",
        pos: "v"
      },
      {
        t: "This is a {{fundamental}} question.",
        es: "Esta es una pregunta fundamental.",
        pos: "adj"
      },
      {
        t: "In my opinion, happiness has a few {{fundamental}} requirements.",
        es: "En mi opinión, hay algunos requerimientos fundamentales para la felicidad.",
        pos: "adj"
      },
      {
        t: "The government must make {{fundamental}} changes.",
        es: "El gobierno tiene que hacer cambios fundamentales.",
        pos: "adj"
      },
      {
        t: "Needless to say, {{fundamental}} human rights should be respected.",
        es: "De más está decir que los derechos humanos fundamentales deben ser respetados.",
        pos: "adj"
      },
      {
        t: "They {{struggled}}.",
        es: "Lo pasaron mal.",
        pos: "v"
      },
      {
        t: "Workers {{struggled}} as factories closed.",
        es: "Los trabajadores luchaban mientras las fábricas cerraban.",
        pos: "v"
      },
      {
        t: "Tom {{struggled}} to get free.",
        es: "Tom intentó liberarse con un forcejeo.",
        pos: "v"
      },
      {
        t: "The refugees {{struggled}} against hunger.",
        es: "Los refugiados lucharon contra el hambre.",
        pos: "v"
      },
      {
        t: "We {{challenge}} you.",
        es: "Te retamos.",
        pos: "v"
      },
      {
        t: "I accept that {{challenge}}.",
        es: "Acepto ese desafío.",
        pos: "v"
      },
      {
        t: "This is a {{challenge}}.",
        es: "Este es un desafío.",
        pos: "v"
      },
      {
        t: "I enjoy a {{challenge}}.",
        es: "Yo aprecio un desafío.",
        pos: "v"
      },
      {
        t: "Tom has a {{tendency}} to ramble.",
        es: "Tom tiene tendencia a divagar.",
        pos: "n"
      },
      {
        t: "Tom has a {{tendency}} to exaggerate.",
        es: "Tom tiene tendencia a exagerar.",
        pos: "n"
      },
      {
        t: "People have a {{tendency}} to underestimate their future needs.",
        es: "Las personas tienden a subestimar sus necesidades futuras.",
        pos: "n"
      },
      {
        t: "He has a {{tendency}} toward exaggeration.",
        es: "Él tiende a exagerarse.",
        pos: "n"
      },
      {
        t: "The Blessed are beautified, the saints are sanctified and rats are {{ratified}}.",
        es: "A los beatos se les beatifica, a los santos se les santifica y a las ratas se les ratifica.",
        pos: "v"
      },
      {
        t: "We are {{liable}} to err.",
        es: "Somos susceptibles de errar.",
        pos: "adj"
      },
      {
        t: "Her texts are {{concise}}.",
        es: "Sus textos son concisos.",
        pos: "adj"
      },
      {
        t: "The essay was {{concise}} and precise.",
        es: "El ensayo era escueto y preciso.",
        pos: "adj"
      },
      {
        t: "Be more {{concise}} in your summaries!",
        es: "¡Sé más conciso en tus resúmenes!",
        pos: "adj"
      },
      {
        t: "The boat fell into a whirlpool and {{overturned}}.",
        es: "El barco cayó en un remolino y volcó.",
        pos: "v"
      },
      {
        t: "The king {{overturned}} the death sentence of a woman condemned for driving.",
        es: "El rey anuló la sentencia de muerte de una mujer condenada por manejar.",
        pos: "v"
      },
      {
        t: "The load of ice cream melted after the truck {{overturned}} on the highway.",
        es: "La carga de helado se derritió después de que el camión volcara en la carretera.",
        pos: "v"
      },
      {
        t: "We've reached a {{stalemate}} in our relationship.",
        es: "Hemos llegado a un impasse en nuestra relación.",
        pos: "n"
      },
      {
        t: "Tell me if my plan is {{plausible}}.",
        es: "Dime si mi plan es viable.",
        pos: "adj"
      },
      {
        t: "Measles has been {{eradicated}}.",
        es: "El sarampión está erradicado.",
        pos: "v"
      },
      {
        t: "Has the avian flu been {{eradicated}}?",
        es: "¿La gripe aviar ha sido erradicada?",
        pos: "v"
      },
      {
        t: "Violence must be {{eradicated}}.",
        es: "La violencia debe ser eliminada.",
        pos: "v"
      },
      {
        t: "Corruption needs to be {{eradicated}} from Algeria.",
        es: "Es necesario erradicar la corrupción de Argelia.",
        pos: "v"
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
        pos: "adv"
      },
      {
        t: "{{Lately}}, she's been working from home.",
        es: "Últimamente, ella ha estado trabajando desde casa.",
        pos: "adv"
      },
      {
        t: "They {{recently}} moved to a new apartment.",
        es: "Ellos se mudaron recientemente a un apartamento nuevo.",
        pos: "adv"
      },
      {
        t: "I {{recently}} started learning English.",
        es: "Recientemente empecé a aprender inglés.",
        pos: "adv"
      },
      {
        t: "Is there a pharmacy {{nearby}}?",
        es: "¿Hay una farmacia cerca?",
        pos: "adv"
      },
      {
        t: "They live in a {{nearby}} town.",
        es: "Viven en un pueblo cercano.",
        pos: "adj"
      },
      {
        t: "I will remember this day {{forever}}.",
        es: "Recordaré este día para siempre.",
        pos: "adv"
      },
      {
        t: "Nothing lasts {{forever}}.",
        es: "Nada dura para siempre.",
        pos: "adv"
      },
      {
        t: "The {{couple}} danced all night.",
        es: "La pareja bailó toda la noche.",
        pos: "n"
      },
      {
        t: "A young {{couple}} bought the house next door.",
        es: "Una pareja joven compró la casa de al lado.",
        pos: "n"
      },
      {
        t: "He planned a {{romantic}} dinner for two.",
        es: "Él planeó una cena romántica para dos.",
        pos: "adj"
      },
      {
        t: "Paris is a very {{romantic}} city.",
        es: "París es una ciudad muy romántica.",
        pos: "adj"
      },
      {
        t: "It's easy to {{fall}} in love in the spring.",
        es: "Es fácil enamorarse en primavera.",
        pos: "v"
      },
      {
        t: "He fell in {{love}} with her smile.",
        es: "Él se enamoró de su sonrisa.",
        pos: "n"
      },
      {
        t: "We watched a {{comedy}} last night.",
        es: "Vimos una comedia anoche.",
        pos: "n"
      },
      {
        t: "This {{comedy}} made everyone laugh.",
        es: "Esta comedia hizo reír a todos.",
        pos: "n"
      },
      {
        t: "The {{comedian}} told very funny jokes.",
        es: "El cómico contó chistes muy graciosos.",
        pos: "n"
      },
      {
        t: "She wants to be a {{comedian}} someday.",
        es: "Ella quiere ser cómica algún día.",
        pos: "n"
      },
      {
        t: "The first {{scene}} of the movie is amazing.",
        es: "La primera escena de la película es increíble.",
        pos: "n"
      },
      {
        t: "I cried during the last {{scene}}.",
        es: "Lloré durante la última escena.",
        pos: "n"
      },
      {
        t: "The {{protagonist}} of the story is a young doctor.",
        es: "El protagonista de la historia es un médico joven.",
        pos: "n"
      },
      {
        t: "She plays the {{lead}} in the new series.",
        es: "Ella interpreta a la protagonista en la nueva serie.",
        pos: "n"
      },
      {
        t: "I will {{attempt}} to fix the car myself.",
        es: "Intentaré arreglar el auto yo mismo.",
        pos: "v"
      },
      {
        t: "Don't {{attempt}} to do everything alone.",
        es: "No intentes hacerlo todo solo.",
        pos: "v"
      },
      {
        t: "These keys {{belong}} to my father.",
        es: "Estas llaves pertenecen a mi padre.",
        pos: "v"
      },
      {
        t: "Do you {{belong}} to any club?",
        es: "¿Perteneces a algún club?",
        pos: "v"
      },
      {
        t: "Please take all your {{belongings}} with you.",
        es: "Por favor, lleva todas tus pertenencias contigo.",
        pos: "n"
      },
      {
        t: "She packed her {{belongings}} in one suitcase.",
        es: "Ella empacó sus pertenencias en una sola maleta.",
        pos: "n"
      },
      {
        t: "Casablanca is a {{classic}} movie.",
        es: "Casablanca es una película clásica.",
        pos: "adj"
      },
      {
        t: "That song is a {{classic}} from the eighties.",
        es: "Esa canción es un clásico de los ochenta.",
        pos: "n"
      },
      {
        t: "We always buy {{popcorn}} at the movies.",
        es: "Siempre compramos palomitas en el cine.",
        pos: "n"
      },
      {
        t: "The {{popcorn}} was salty and delicious.",
        es: "Las palomitas estaban saladas y deliciosas.",
        pos: "n"
      },
      {
        t: "This cake contains {{nuts}}.",
        es: "Este pastel contiene nueces.",
        pos: "n"
      },
      {
        t: "He eats {{nuts}} as a healthy snack.",
        es: "Él come nueces como merienda saludable.",
        pos: "n"
      },
      {
        t: "I ordered a pizza with {{olives}}.",
        es: "Pedí una pizza con aceitunas.",
        pos: "n"
      },
      {
        t: "Green {{olives}} taste great with cheese.",
        es: "Las aceitunas verdes saben muy bien con queso.",
        pos: "n"
      },
      {
        t: "The monkey ate a {{peanut}}.",
        es: "El mono se comió un cacahuete.",
        pos: "n"
      },
      {
        t: "Is there {{peanut}} in this sauce?",
        es: "¿Esta salsa lleva cacahuete?",
        pos: "n"
      },
      {
        t: "She spread peanut {{butter}} on her toast.",
        es: "Ella untó crema de cacahuete en su tostada.",
        pos: "n"
      },
      {
        t: "I love peanut {{butter}} and jelly sandwiches.",
        es: "Me encantan los sándwiches de crema de cacahuete y mermelada.",
        pos: "n"
      },
      {
        t: "He has a serious {{allergy}} to nuts.",
        es: "Él tiene una alergia grave a las nueces.",
        pos: "n"
      },
      {
        t: "Spring gives me a terrible {{allergy}}.",
        es: "La primavera me da una alergia terrible.",
        pos: "n"
      },
      {
        t: "I'm {{allergic}} to peanuts.",
        es: "Soy alérgico a los cacahuetes.",
        pos: "adj"
      },
      {
        t: "Are you {{allergic}} to any medicine?",
        es: "¿Eres alérgico a algún medicamento?",
        pos: "adj"
      },
      {
        t: "Put the steaks on the {{grill}}.",
        es: "Pon los filetes en la parrilla.",
        pos: "n"
      },
      {
        t: "The {{grill}} is still hot, be careful.",
        es: "La parrilla todavía está caliente, ten cuidado.",
        pos: "n"
      },
      {
        t: "We {{grill}} chicken every Sunday.",
        es: "Hacemos pollo a la parrilla todos los domingos.",
        pos: "v"
      },
      {
        t: "Dad loves to {{grill}} in the backyard.",
        es: "A papá le encanta hacer parrilladas en el patio.",
        pos: "v"
      },
      {
        t: "We eat {{turkey}} on Thanksgiving.",
        es: "Comemos pavo en Acción de Gracias.",
        pos: "n"
      },
      {
        t: "The {{turkey}} needs two more hours in the oven.",
        es: "El pavo necesita dos horas más en el horno.",
        pos: "n"
      }
    ]
  }
];
