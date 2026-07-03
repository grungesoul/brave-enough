// ============================================================
// BRAVE ENOUGH — translations.js
// Full EN/ES bilingual translation table
// Spanish: authentic Gen-Z Latin American, emotionally sincere
// ============================================================

'use strict';

const TRANSLATIONS = {
  en: {
    // ── UI ────────────────────────────────────────────────
    gameTitle: 'BRAVE ENOUGH',
    subtitle: 'A journey through the Mindscape',
    tagline: '"You don\'t have to be fearless. You just have to take the next step."',
    pressStart: '— PRESS ENTER OR CLICK TO BEGIN —',
    namePrompt: 'What is your name, traveler?',
    nameHint: 'Type your name, then press ENTER (max 12 chars)',
    nameConfirmSpark: (name) => `"${name}. That's a name worth remembering."`,
    thanksForPlaying: 'Thank you for playing.',

    // ── Title narration lines ─────────────────────────────
    titleNarration: [
      'Every night, the fear comes.',
      'The test tomorrow. The crowd tomorrow.',
      'The thing you have to say, out loud, in front of everyone.',
      'You\'ve been carrying this for a long time.',
      'Tonight, finally, you walk through it.'
    ],

    // ── Battle UI ─────────────────────────────────────────
    battleCp: 'CP',
    battleCalm: 'CLM',
    battleHp: 'HP',
    battleDread: 'DRD',
    battleYourTurn: 'YOUR TURN',
    battleEnemyTurn: 'ENEMY TURN',
    battleWaiting: '...',
    gotYourBack: 'Got Your Back!',
    notEnoughCalm: 'Not enough Calm!',
    pressEnterContinue: '[ ENTER / CLICK TO CONTINUE ]',
    levelClearTitle: 'LEVEL CLEAR!',
    levelClearContinue: '— PRESS ENTER TO CONTINUE —',
    continueToCredits: 'Continue to Credits →',

    // ── Ability result messages ───────────────────────────
    resultBreatheDeep: (restore) => `Breathed deep. +${restore} Calm. Grounded!`,
    resultSpeakUp: (dmg) => `Spoke up! ${dmg} damage.`,
    resultSpeakUpHeard: (dmg) => `Spoke up! ${dmg} damage. Boss heard!`,
    resultReframe: (dmg) => `Reframed! ${dmg} damage. Boss dread -10.`,
    resultReframeLonger: 'Reframed! Dread weakened longer.',
    resultFindPeople: (dmg) => `Friend arrived! ${dmg} damage. +10 CP!`,
    resultBelieve: (dmg) => `Believed! ${dmg} dmg. +20 CP!`,
    resultBelieveInspired: (dmg) => `Believed! ${dmg} dmg. +20 CP. Inspired!`,
    resultBreakFree: (dmg) => `Break Free! ${dmg} dmg!`,
    resultDesperateCourage: (dmg) => `DESPERATE COURAGE! ${dmg} dmg!`,
    resultLimitBreak: (dmg) => `FEARLESS! ${dmg} damage! All debuffs cleared!`,
    mirrorAdapts: (abilityName) => `The mirror adapts. Your ${abilityName} weakens.`,
    resultGroundYourself: () => '+20 Calm, +10 CP. Grounded!',
    resultSelfTalk: (dmg) => `Challenged the thought! ${dmg} damage. Boss weakened.`,
    resultSelfCompassion: (dmg) => `+35 CP restored. Gentle strike: ${dmg} damage.`,
    resultPowerPose: (dmg) => `Power Pose! ${dmg} damage. Inspired!`,

    // ── Abilities ─────────────────────────────────────────
    abilities: {
      breatheDeep:     { name: 'Breathe Deep',       desc: 'Restore 15 Calm. Gain Grounded for 2 turns.' },
      speakUp:         { name: 'Speak Up',            desc: 'A basic courage strike. (5 Calm)' },
      reframe:         { name: 'Reframe',             desc: 'Attack and reduce enemy Dread. (8 Calm)' },
      findYourPeople:  { name: 'Find Your People',    desc: 'Call an ally. Bonus attack. (10 Calm, cooldown 2)' },
      believeInYourself: { name: 'Believe In Yourself', desc: 'Big attack + restore 20 CP. (15 Calm)' },
      breakFree:       { name: 'Break Free',          desc: 'Ultimate strike. Desperation bonus if CP < 30. (20 Calm)' },
      groundYourself:  { name: 'Ground Yourself',    desc: '5-4-3-2-1. Restore 20 Calm + 10 CP. (Free, cooldown 3)' },
      selfTalk:        { name: 'Self-Talk',           desc: 'Challenge the thought. Medium damage + weaken boss. (8 Calm)' },
      selfCompassion:  { name: 'Self-Compassion',     desc: 'Restore 35 CP + small attack. (15 Calm)' },
      powerPose:       { name: 'Power Pose',          desc: 'Attack + Inspired for 3 turns. (8 Calm, cooldown 3)' },
      limitBreak:      { name: 'Fearless',             desc: 'Limit Break! Massive damage, clears all debuffs. Charges every 4 turns. (Free)' },
    },

    // ── Status effects ────────────────────────────────────
    statuses: {
      grounded:    'Grounded',
      inspired:    'Inspired',
      radiant:     'Radiant',
      shattered:   'Shattered',
      marked:      'Marked',
      rattled:     'Rattled',
      scrutinized: 'Scrutinized',
      overexposed: 'Overexposed',
      focusDown:   'Focus-',
      frozen:      'Frozen',
      silenced:    'Silenced',
      doubt:       'Doubt',
      mirrorBreak: 'Shattered',
      heard:       'Heard',
      reframed:    'Reframed',
    },

    // ── Level names ───────────────────────────────────────
    levelNames: [
      'The Exam Room',
      'The Hallway',
      'The Sports Field',
      'The Stage',
      'The Mindscape Core',
    ],

    // ── Level intro lines (keyed by level index as string) ──
    introLines: {
      0: [
        'Desks in neat rows, each with an exam on top.',
        'And on every exam, a red pen. Waiting for you.',
        'The chalkboard at the front already knows your name.'
      ],
      1: [
        'Lockers as far as you can see.',
        'Thirty-seven steps to the end of the hallway. They feel like three hundred.',
        'Every huddle drops its voice when you walk past. Or so it seems.',
        'Keep walking.'
      ],
      2: [
        'Fresh-cut grass and a sand track looping the field.',
        'From the tree line, it feels like the whole school is watching.',
        'Good thing you didn\'t come here to be perfect.'
      ],
      3: [
        'Old wooden boards and a single spotlight.',
        'Out there, in the dark, the audience is breathing.',
        'On a night like this, stepping into the light is the whole performance.'
      ],
      4: [
        'No more classrooms. No more hallways. No more crowd.',
        'Only crystals glowing with things you remember — and something waiting at the center.',
        'This is where it started.',
        'This is where it ends.'
      ],
    },

    // ── Boss names ────────────────────────────────────────
    bossNames: ['The Red Pen', 'The Whisper', 'The Spotlight', 'Stage Fright', 'Anxiety'],

    // ── NPC display names (per level) ─────────────────────
    npcNames: [
      ['The Anxious Echo', 'The Error Monitor', 'The Kind Note'],
      ['The Huddle', 'The Locker Friend', 'The Window Reflection'],
      ['The Benchwarmer', 'The Whistle', 'The Forgotten Trophy'],
      ['The Actor in the Wings', 'The Empty Mic', 'The Director\'s Note'],
      ['The Memory', 'The Spark'],
    ],

    // ── Boss taunts (per level, array of 3 taunts) ────────
    bossTaunts: [
      // Level 1 — The Red Pen
      [
        '"Every desk in this room keeps something of yours crossed out in red. I collect them."',
        '"You studied, didn\'t you? Doesn\'t matter. I always find something to cross out."',
        '"What will they think of you when I hand the exams back? Hm?"'
      ],
      // Level 2 — The Whisper
      [
        '"They were watching you from the lockers. Did you notice? All of them. You."',
        '"What are you going to do — speak up? Great. More material for the huddle."',
        '"Silence me today, and there\'ll be another huddle tomorrow. There always is."'
      ],
      // Level 3 — The Spotlight
      [
        '"Look at them by the tree line, at the edge of the track. Watching you."',
        '"That stride. That turn. Wrong. And they\'re all keeping score."',
        '"What if you fall in the middle of the track? In front of everyone? Then what?"'
      ],
      // Level 4 — Stage Fright
      [
        '"They all came to see you. Listen to the room. What are you going to give them? This?"',
        '"The moment you step into the spotlight, the words will go. That feeling in your chest — that\'s me."',
        '"You\'ll never be ready. \'Ready\' doesn\'t exist. Only I do, forever."'
      ],
      // Level 5 — Anxiety
      [
        '"I know every move you\'re going to make. I AM you."',
        '"All this bravery — it\'s just another performance, isn\'t it? Another thing to fail at."',
        '"I\'m the reason you survived this long. Without me, who keeps you safe?"'
      ],
    ],

    // ── Boss defeat lines (per level) ────────────────────
    bossDefeatLines: [
      // Level 1
      [
        '"I... I just wanted you to be prepared. I didn\'t want you to be embarrassed. I only ever..."',
        '"...I only ever wanted you to get it right."',
        '"Maybe right doesn\'t have to mean perfect."'
      ],
      // Level 2
      [
        '"I\'m not... I\'m not separate from you, you know."',
        '"I was just every time you felt unseen and then suddenly seen, and it hurt. I\'m what that feels like."',
        '"I wasn\'t trying to ruin you. I was trying to warn you. I just... didn\'t know how to stop."'
      ],
      // Level 3
      [
        '"I only wanted to help you improve. If you can see every flaw, you can fix every flaw."',
        '"But you weren\'t a project. You were a person."',
        '"I\'m sorry I forgot that."'
      ],
      // Level 4
      [
        '"The stage was mine. This was my stage first."',
        '"I\'m the one who made you rehearse. And rehearse. Because if you rehearsed enough, maybe it would be okay."',
        '"All this time. I was just scared too."'
      ],
      // Level 5
      [
        '"You know I\'m not going away. You know that, right?"',
        '"...Good. You know. You\'ve always known."',
        '"I\'ll still be there. Before big things. Before the things that matter. I\'ll be there."',
        '"But maybe... maybe you\'ll remember this. That you kept walking anyway."',
        '"Maybe next time, when you feel me coming, you\'ll recognize me. And you\'ll breathe."',
        '"...You were brave enough."'
      ],
    ],

    // ── Boss attack flavors (per level, per attack index) ─
    bossAttackFlavors: [
      // Level 1 — The Red Pen
      [ '"Wrong."', '"Red. Red. Red. Do you see how much red?"', '"Time\'s up. Pens down. You didn\'t make it."' ],
      // Level 2 — The Whisper
      [ '"Heard what they\'re saying about you? I have. All of it."', '"Shhh. Shhh. Feel that? They\'re talking about you."', '"You can\'t outrun what everyone already knows."' ],
      // Level 3 — The Spotlight
      [ '"Everyone can see you now. Everything."', '"That. Right there. Did you think nobody would notice?"', '"There\'s no shade on this track. I light up everything."' ],
      // Level 4 — Stage Fright
      [ '"Your legs won\'t answer. And the spotlight stays on you."', '"Lines erased. Mind blank. Just you and a whole room waiting."', '"Curtain. Your performance ended before it began."' ],
      // Level 5 — Anxiety
      [ '"What if you\'ve already used your best moves? What if you don\'t have enough left?"', '"You knew this was coming. You should have been ready. You\'re never ready enough."', '"Remember the exam? Remember the hallway? The track? The stage? You\'ll never stop remembering."', '"If I go — what are you without me? I\'ve been with you your whole life."' ],
    ],

    // ── Spark intro lines per level ───────────────────────
    sparkIntros: [
      'Look at all those desks. You\'ve sat at every one thinking you weren\'t enough. Today we walk in standing.',
      'I know this hallway. It\'s the one where everything feels like it\'s about you. It almost never is. Keep walking.',
      'They\'re all at the edge of the track. Every face you don\'t want to let down. But feel the ground: it holds. So do you.',
      'I know this is the hardest one. Doing it, and being seen doing it. But look at the spotlight — it\'s waiting for you.',
      'You built this place. Every room we crossed. Not because you wanted to — because you were surviving. But you\'re not just surviving anymore.',
    ],

    // ── Level clear texts ─────────────────────────────────
    levelClearTexts: [
      'The Red Pen is quiet now.',
      'The Whisper has no voice left.',
      'The Spotlight has dimmed.',
      'Stage Fright has fallen.',
      '',
    ],
    levelClearTexts2: [
      'One classroom down. And you\'re still standing.',
      'The hallway is just a hallway again.',
      'You didn\'t need to be perfect. Just to show up.',
      'The spotlight doesn\'t burn anymore. Now it shines.',
      '',
    ],

    // ── Spark clear lines ─────────────────────────────────
    sparkClearLines: [
      'One room down. And look — you\'re still here.',
      'You hear that? Silence. Real silence. You did that.',
      'Three down. Look how far you\'ve come from that first room.',
      'One more. The last one. When we get there — you don\'t have to destroy it. You just have to understand it.',
      '',
    ],

    // ── Unlock messages ───────────────────────────────────
    newAbilityUnlocked: (name) => `★ NEW ABILITY UNLOCKED: ${name} ★`,

    // ── Speaker names ─────────────────────────────────────
    speakerSpark: 'The Spark',
    speakerAnxiety: 'Anxiety',

    // ── Game Over ─────────────────────────────────────────
    gameOverSpark: ["It's okay. Breathe.", "We try again."],
    gameOverOptions: ['[ Try Again ]', '[ Return to Title ]'],

    // ── Final Victory speech ──────────────────────────────
    victoryLines: [
      '', // replaced with player name at runtime
      'You walked through five rooms that most people spend their whole lives walking around.',
      'Every boss, every taunt, every moment you thought you didn\'t have enough left — and you kept going.',
      'Anxiety is not a monster you destroyed tonight. It\'ll come back.',
      'Big tests, crowded rooms, stages and spotlights — it\'ll come back.',
      'But you know something now: you have walked through it. Once.',
      'And once is enough to know you can again.',
      'There is no finish line for brave.',
      'There is just today, and the next step, and the next breath.',
      'You were brave enough.'
    ],
    victoryBigText: 'YOU ARE BRAVE ENOUGH.',

    // ── NPC dialogues (per level, per NPC) ───────────────
    npcs: {
      // Level 1 — The Exam Room
      l1n1: [
        '"I sit in the front row. Where you can hear the red pen best."',
        '"If I slip up, they\'ll all know. That I\'m not good enough."',
        '...',
        '"...Does that voice talk to you too?"'
      ],
      l1n2: [
        '"Infraction logged: doubtful answer on question three."',
        '"Shaky handwriting in the margin. Noted."',
        '"I\'m still learning."',
        '...The Monitor processes. Something clicks. It steps out of your way.'
      ],
      l1n3: [
        '"I saw your name on the corkboard. Someone wrote: \'this one always makes it\'."',
        '"— Signed: someone in your class who notices you"'
      ],
      // Level 2 — The Hallway
      l2n1: [
        '"Hey, did you hear about —"',
        '"— yeah, someone told me this morning —"',
        '"— and do you think it was because —"',
        '"— probably."',
        'They were probably not talking about you. Probably.'
      ],
      l2n2: [
        '"Hey. You\'ve got that rough-day face."',
        '"I get it too. Days when this hallway feels endless."',
        '"I\'ll walk with you for a bit. It\'s easier with someone next to you."',
        '"This is my locker. But hey — you\'ve got this."'
      ],
      l2n3: [
        'You catch your reflection in the window glass.',
        'The one in the reflection looks scared.',
        'Then it clicks: the scared one is you. And the one still walking — also you.',
        'You\'re the same person.'
      ],
      // Level 3 — The Field
      l3n1: [
        '"I threw up before the last game. Seriously. Coach saw everything."',
        '"I still had to go out and play. So I did."',
        '"I didn\'t play great. We won anyway, but I didn\'t do much."',
        '"Still counts, right? Showing up counts, right?"'
      ],
      l3n2: [
        '"The clock is running."',
        '"You are being evaluated."',
        '"Every lap of the track is recorded. Every stumble. Every stop."',
        '"...Performance noted."'
      ],
      l3n3: [
        'The plaque reads: "For trying even when it was scary."',
        'There\'s no name engraved on it.',
        'Maybe they left it here for someone like you.'
      ],
      // Level 4 — The Stage
      l4n1: [
        '"Every night. Every night I think I\'m going to go blank."',
        '"And every night I step into the spotlight and say my lines anyway."',
        '"The trick isn\'t waiting for the fear to pass. It\'s walking out wearing it."'
      ],
      l4n2: [
        'You step up to the mic, right at the edge of the spotlight.',
        'You don\'t have to say anything perfect.',
        'Sometimes reaching the mic is the whole speech.'
      ],
      l4n3: [
        '"To whoever finds this note in the wings:"',
        '"A performance is not a test. Not a verdict. It\'s a gift — imperfect, present, yours."',
        '"Go out there and give it."',
        '"— The Director (who has never once walked out unafraid)"'
      ],
      // Level 5 — The Mindscape
      l5n1: [
        '"You were never as alone as it felt."',
        '"Look at the crystals: each one glows with someone who helped you. And you let them in."',
        '"That\'s brave too."'
      ],
      l5n2: [
        '"I\'ve been with you the whole way. Do you know what I am yet?"',
        '"I\'m the part of you that wanted to keep going. That\'s all."',
        '"Every time you got back up after a fall — that was me. That was YOU."',
        '"I\'m not something separate. I never was."',
        '"Whatever that mirror shows — remember what I am. Remember what YOU are."'
      ],
    },

    // ── Credits ───────────────────────────────────────────
    creditsLines: [
      { text: 'BRAVE ENOUGH', style: 'title', color: '#FFD700' },
      { text: '', style: 'blank' },
      { text: 'A journey through the Mindscape', style: 'sub', color: '#00C2B5' },
      { text: '', style: 'blank' },
      { text: '— — —', style: 'sep', color: '#334455' },
      { text: '', style: 'blank' },
      { text: 'Anxiety is real. What you feel is real.', style: 'narration', color: '#AACCDD' },
      { text: "You don't have to beat it.", style: 'narration', color: '#AACCDD' },
      { text: 'You just have to take the next step.', style: 'narration', color: '#AACCDD' },
      { text: '', style: 'blank' },
      { text: 'If the things in this game felt familiar —', style: 'narration', color: '#889999' },
      { text: "that's because they are.", style: 'narration', color: '#889999' },
      { text: "You're not alone in them.", style: 'narration', color: '#889999' },
      { text: '', style: 'blank' },
      { text: '— — —', style: 'sep', color: '#334455' },
      { text: '', style: 'blank' },
      { text: 'CREDITS', style: 'header', color: '#FFD166' },
      { text: '', style: 'blank' },
      { text: 'Game Design & Story', style: 'role', color: '#667788' },
      { text: 'Claude + David', style: 'name', color: '#FFFFFF' },
      { text: '', style: 'blank' },
      { text: 'Pixel Art & Sprites', style: 'role', color: '#667788' },
      { text: 'Claude + David', style: 'name', color: '#FFFFFF' },
      { text: '', style: 'blank' },
      { text: 'Engine & Programming', style: 'role', color: '#667788' },
      { text: 'Claude + David', style: 'name', color: '#FFFFFF' },
      { text: '', style: 'blank' },
      { text: 'Spanish Translation', style: 'role', color: '#667788' },
      { text: 'Claude + David', style: 'name', color: '#FFFFFF' },
      { text: '', style: 'blank' },
      { text: '— — —', style: 'sep', color: '#334455' },
      { text: '', style: 'blank' },
      { text: 'Made for anyone who has ever been afraid', style: 'dedic', color: '#8899AA' },
      { text: 'and kept going anyway.', style: 'dedic', color: '#8899AA' },
      { text: '', style: 'blank' },
      { text: '', style: 'blank' },
      { text: '', style: 'blank' },
      { text: 'You were brave enough.', style: 'final', color: '#FFD700' },
      { text: 'You still are.', style: 'final', color: '#00C2B5' },
      { text: '', style: 'blank' },
      { text: '', style: 'blank' },
      { text: '', style: 'blank' }
    ],
  },

  // ════════════════════════════════════════════════════════
  // ESPAÑOL DE ESPAÑA — Gen-Z peninsular, escrito en
  // español de España. No traducido. No latinoamericano.
  // Tono: como hablarle a un colega del insti.
  // ════════════════════════════════════════════════════════
  es: {
    // ── UI ────────────────────────────────────────────────
    gameTitle: 'ERES MÁS FUERTE',
    subtitle: 'Un viaje hacia dentro',
    tagline: '"No hace falta dejar de tener miedo. Solo hay que seguir."',
    pressStart: '— PULSA ENTER O HAZ CLIC PARA EMPEZAR —',
    namePrompt: 'Oye, ¿cómo te llamas?',
    nameHint: 'Escribe tu nombre y pulsa ENTER (máx. 12 letras)',
    nameConfirmSpark: (name) => `"${name}. Ese nombre no se me va a olvidar en la vida."`,
    thanksForPlaying: 'Gracias por jugar.',

    // ── Title narration lines ─────────────────────────────
    titleNarration: [
      'El miedo vuelve cada noche.',
      'El examen de mañana. El pasillo lleno.',
      'Eso que tienes que decir, en voz alta, delante de todo el mundo.',
      'Llevas un tiempo cargando con esto.',
      'Esta noche, por fin, lo atraviesas.'
    ],

    // ── Battle UI ─────────────────────────────────────────
    battleCp: 'CV',
    battleCalm: 'CLM',
    battleHp: 'PV',
    battleDread: 'PAV',
    battleYourTurn: 'TU TURNO',
    battleEnemyTurn: 'TURNO ENEMIGO',
    battleWaiting: '...',
    gotYourBack: '¡Aquí estoy, tío!',
    notEnoughCalm: '¡No te queda Calma suficiente!',
    pressEnterContinue: '[ ENTER / CLIC PARA CONTINUAR ]',
    levelClearTitle: '¡NIVEL SUPERADO!',
    levelClearContinue: '— PULSA ENTER PARA CONTINUAR —',
    continueToCredits: 'Ver créditos →',

    // ── Ability result messages ───────────────────────────
    resultBreatheDeep: (restore) => `Has respirado. +${restore} Calma. ¡Centrado!`,
    resultSpeakUp: (dmg) => `¡Lo has dicho! ${dmg} de daño.`,
    resultSpeakUpHeard: (dmg) => `¡Te han escuchado! ${dmg} de daño. ¡El enemigo lo ha notado!`,
    resultReframe: (dmg) => `¡Lo has reencuadrado! ${dmg} de daño. Pavor -10.`,
    resultReframeLonger: '¡Reencuadrado! El pavor sigue bajando.',
    resultFindPeople: (dmg) => `¡Ha llegado tu colega! ${dmg} de daño. ¡+10 CV!`,
    resultBelieve: (dmg) => `¡Te lo has creído! ${dmg} de daño. ¡+20 CV!`,
    resultBelieveInspired: (dmg) => `¡Te lo has creído! ${dmg} de daño. ¡+20 CV! ¡Inspirado!`,
    resultBreakFree: (dmg) => `¡A por todas! ¡${dmg} de daño!`,
    resultDesperateCourage: (dmg) => `¡VALENTÍA SIN FRENOS! ¡${dmg} de daño!`,
    resultLimitBreak: (dmg) => `¡SIN MIEDO! ${dmg} de daño. ¡Estados negativos eliminados!`,
    mirrorAdapts: (abilityName) => `El espejo te copia. Tu ${abilityName} se debilita.`,
    resultGroundYourself: () => '+20 Calma, +10 CV. ¡Centrado!',
    resultSelfTalk: (dmg) => `¡Has cuestionado el pensamiento! ${dmg} de daño. ¡Enemigo debilitado!`,
    resultSelfCompassion: (dmg) => `+35 CV recuperados. Golpe suave: ${dmg} de daño.`,
    resultPowerPose: (dmg) => `¡Postura de poder! ${dmg} de daño. ¡Inspirado!`,

    // ── Abilities ─────────────────────────────────────────
    abilities: {
      breatheDeep:       { name: 'Respira',           desc: 'Restaura 15 Calma. Ganas Centrado 2 turnos.' },
      speakUp:           { name: 'Suéltalo',          desc: 'Ataque básico de valentía. (5 Calma)' },
      reframe:           { name: 'Perspectiva',       desc: 'Ataca y baja el Pavor enemigo. (8 Calma)' },
      findYourPeople:    { name: 'Tus Colegas',       desc: 'Llamas a un amigo. Ataque extra. (10 Calma, recarga 2)' },
      believeInYourself: { name: 'Confía en Ti',      desc: 'Ataque fuerte + recupera 20 CV. (15 Calma)' },
      breakFree:         { name: 'A por Todas',       desc: 'Golpe definitivo. Bono si CV < 30. (20 Calma)' },
      groundYourself:    { name: 'Aquí y Ahora',      desc: '5-4-3-2-1. Restaura 20 Calma + 10 CV. (Gratis, recarga 3)' },
      selfTalk:          { name: 'Rebátelo',          desc: 'Cuestiona el pensamiento. Daño medio + debilita rival. (8 Calma)' },
      selfCompassion:    { name: 'Date un Respiro',   desc: 'Recupera 35 CV + ataque suave. (15 Calma)' },
      powerPose:         { name: 'Postura de Poder',  desc: 'Ataque + Inspirado 3 turnos. (8 Calma, recarga 3)' },
      limitBreak:        { name: 'Sin Miedo',          desc: '¡Límite roto! Daño masivo, elimina estados negativos. Se carga cada 4 turnos. (Gratis)' },
    },

    // ── Status effects ────────────────────────────────────
    statuses: {
      grounded:    'Centrado',
      inspired:    'Inspirado',
      radiant:     'Radiante',
      shattered:   'Destrozado',
      marked:      'Marcado',
      rattled:     'Nervioso',
      scrutinized: 'Expuesto',
      overexposed: 'En evidencia',
      focusDown:   'Foco-',
      frozen:      'Bloqueado',
      silenced:    'Sin voz',
      doubt:       'Duda',
      mirrorBreak: 'Fragmentado',
      heard:       'Escuchado',
      reframed:    'Reencuadrado',
    },

    // ── Level names ───────────────────────────────────────
    levelNames: [
      'El Aula del Examen',
      'El Pasillo',
      'La Pista',
      'El Escenario',
      'Tu Interior',
    ],

    // ── Level intro lines ──────────────────────────────────
    introLines: {
      0: [
        'Pupitres en fila, cada uno con su examen encima.',
        'Y sobre cada examen, un boli rojo. Esperándote.',
        'La pizarra del fondo ya sabe tu nombre.'
      ],
      1: [
        'Taquillas hasta donde llega la vista.',
        'Treinta y siete pasos hasta el final del pasillo. Se hacen eternos.',
        'Cada corrillo baja la voz cuando pasas. O eso te parece.',
        'Tú camina.'
      ],
      2: [
        'Hierba recién cortada y una pista de arena que da la vuelta al campo.',
        'Desde los árboles parece mirarte el instituto entero.',
        'Menos mal que no has venido a ser perfecto.'
      ],
      3: [
        'Tablas de madera vieja y un único foco encendido.',
        'Ahí delante, a oscuras, respira el público.',
        'Una noche así, salir a la luz ya es la actuación entera.'
      ],
      4: [
        'Ya no hay aulas, ni pasillos, ni público.',
        'Solo cristales que brillan con cosas que recuerdas — y algo esperando en el centro.',
        'Aquí empezó todo.',
        'Aquí se acaba.'
      ],
    },

    // ── Boss names ────────────────────────────────────────
    bossNames: ['La Pluma Roja', 'El Cotilleo', 'El Foco', 'El Pánico Escénico', 'La Ansiedad'],

    // ── Nombres de NPC (por nivel) ────────────────────────
    npcNames: [
      ['El Eco Ansioso', 'El Vigilante de los Fallos', 'La Nota de Ánimo'],
      ['El Corrillo', 'El Colega de la Taquilla', 'El Reflejo de la Ventana'],
      ['El Compañero de Banquillo', 'El Silbato', 'El Trofeo Olvidado'],
      ['El Actor entre Bambalinas', 'El Micro Vacío', 'La Nota del Director'],
      ['El Recuerdo', 'La Chispa'],
    ],

    // ── Boss taunts ───────────────────────────────────────
    bossTaunts: [
      // Level 1 — La Pluma Roja
      [
        '"Cada pupitre de esta aula guarda algo tuyo tachado en rojo. Los colecciono."',
        '"Has estudiado, ¿a que sí? Da igual. Siempre encuentro algo que tachar."',
        '"¿Qué van a pensar de ti cuando devuelva los exámenes? ¿Eh?"'
      ],
      // Level 2 — El Cotilleo
      [
        '"Te miraban desde las taquillas. ¿Te has dado cuenta? Todos. Justo a ti."',
        '"¿Y qué vas a hacer, hablar en alto? Genial. Más material para el corrillo."',
        '"Aunque hoy me calles, mañana habrá otro corrillo. Siempre hay otro."'
      ],
      // Level 3 — El Foco
      [
        '"Míralos ahí, entre los árboles, al borde de la pista. Mirándote a ti."',
        '"Esa zancada. Ese giro. Mal. Y todos llevan la cuenta."',
        '"¿Y si te caes en mitad de la pista? ¿Delante de todos? ¿Entonces qué?"'
      ],
      // Level 4 — El Pánico Escénico
      [
        '"Han venido todos a verte. Escucha la sala. ¿Qué piensas darles? ¿Esto?"',
        '"En cuanto pises el foco se te irá el texto. Esa sensación del pecho — soy yo."',
        '"Nunca vas a estar listo. Eso de estar listo no existe. Solo existo yo, para siempre."'
      ],
      // Level 5 — La Ansiedad
      [
        '"Sé cada movimiento que vas a hacer antes de que lo hagas. SOY tú."',
        '"Toda esta valentía — no es más que otra actuación, ¿verdad? Otra oportunidad de fastidiarla."',
        '"Soy la razón por la que llevas tanto tiempo aguantando. Sin mí, ¿quién te protege?"'
      ],
    ],

    // ── Boss defeat lines ─────────────────────────────────
    bossDefeatLines: [
      // Level 1
      [
        '"Yo... solo quería que estuvieras preparado. No quería que te fuera mal. Solo..."',
        '"...Solo quería que te saliera bien."',
        '"Quizás salir bien no tiene que ser lo mismo que ser perfecto."'
      ],
      // Level 2
      [
        '"No soy... no soy algo separado de ti, ¿sabes?"',
        '"Era solo cada vez que te ignoraron y de repente te vieron, y dolió. Soy ese dolor."',
        '"No quería fastidiarte. Quería avisarte. Solo que... no supe cómo parar."'
      ],
      // Level 3
      [
        '"Solo quería que mejoraras. Si ves cada fallo, puedes corregirlo."',
        '"Pero no eras un proyecto. Eras una persona."',
        '"Lo siento. Se me olvidó."'
      ],
      // Level 4
      [
        '"Este escenario era mío. Fue mío primero."',
        '"Fui yo quien te hizo ensayar. Y ensayar otra vez. Porque si ensayabas suficiente, quizás estaría bien."',
        '"Todo este tiempo. Yo también tenía miedo."'
      ],
      // Level 5
      [
        '"Sabes que no me voy a ir. Eso lo sabes, ¿verdad?"',
        '"...Bien. Lo sabes. Siempre lo has sabido."',
        '"Voy a estar ahí. Antes de los exámenes. Antes de lo que importa de verdad."',
        '"Pero quizás... quizás recuerdes esto. Que seguiste aunque no te apeteciera."',
        '"Quizás la próxima vez que me sientas llegar, me reconozcas. Y respires, sin más."',
        '"...Tienes madera."'
      ],
    ],

    // ── Boss attack flavors ───────────────────────────────
    bossAttackFlavors: [
      // Level 1 — La Pluma Roja
      [ '"Mal."', '"Rojo. Rojo. Rojo. ¿Ves cuánto rojo?"', '"Se acabó el tiempo. Bolis abajo. No has llegado."' ],
      // Level 2 — El Cotilleo
      [ '"¿Has oído lo que dicen de ti? Yo sí. Todo."', '"Shhh. Shhh. ¿Lo notas? Están hablando de ti."', '"No puedes huir de lo que ya sabe todo el mundo."' ],
      // Level 3 — El Foco
      [ '"Ahora se te ve todo. Todo."', '"Eso. Justo eso. ¿Creías que no se iba a notar?"', '"En esta pista no hay sombra. Lo ilumino todo."' ],
      // Level 4 — El Pánico Escénico
      [ '"Las piernas no te responden. Y el foco sigue en ti."', '"Texto borrado. Cabeza en blanco. Solo tú y la sala entera esperando."', '"Telón. Tu actuación ha terminado antes de empezar."' ],
      // Level 5 — La Ansiedad
      [ '"¿Y si ya has gastado todo lo que tenías? ¿Y si no te queda suficiente?"', '"Sabías que iba a pasar. Tenías que haberte preparado más. Nunca estás suficientemente listo."', '"¿Te acuerdas del examen? ¿Del pasillo? ¿De la pista? ¿Del escenario? No lo vas a olvidar."', '"Si me voy — ¿qué eres sin mí? Toda tu vida he estado aquí."' ],
    ],

    // ── Spark intro lines ─────────────────────────────────
    sparkIntros: [
      'Mira cuántos pupitres. En todos te has sentado a pensar que no llegabas. Hoy entramos de pie.',
      'Este pasillo lo conozco. Aquí todo parece que va de ti. Casi nunca va de ti. Sigue andando.',
      'Están todos al borde de la pista. Cada cara a la que no quieres fallar. Pero fíjate en el suelo: aguanta. Tú también.',
      'Sé que este es el más difícil. Hacerlo, y que te vean hacerlo. Pero mira el foco — te está esperando a ti.',
      'Todo esto lo construiste tú. Cada sala que hemos cruzado. No porque quisieras — porque sobrevivías. Pero ya no estás solo sobreviviendo.',
    ],

    // ── Level clear texts ─────────────────────────────────
    levelClearTexts: [
      'La Pluma Roja se ha quedado sin tinta.',
      'El Cotilleo ya no tiene de qué hablar.',
      'El Foco se ha apagado.',
      'El Pánico Escénico ha caído.',
      '',
    ],
    levelClearTexts2: [
      'Un aula menos. Y sigues de pie, tío.',
      'El pasillo vuelve a ser solo un pasillo.',
      'No hacía falta ser perfecto. Solo presentarse.',
      'El foco ya no quema. Ahora alumbra.',
      '',
    ],

    // ── Spark clear lines ─────────────────────────────────
    sparkClearLines: [
      'Una sala menos. Mira — aquí sigues.',
      '¿Lo escuchas? Silencio. Silencio de verdad. Lo has conseguido tú.',
      'Tres abajo. Mira hasta dónde has llegado desde aquella primera sala.',
      'Una más. La última. Cuando lleguemos — no tienes que destruirla. Solo entenderla.',
      '',
    ],

    // ── Unlock messages ───────────────────────────────────
    newAbilityUnlocked: (name) => `★ NUEVA HABILIDAD: ${name} ★`,

    // ── Speaker names ─────────────────────────────────────
    speakerSpark: 'La Chispa',
    speakerAnxiety: 'La Ansiedad',

    // ── Game Over ─────────────────────────────────────────
    gameOverSpark: ['Oye. Respira.', 'Lo volvemos a intentar.'],
    gameOverOptions: ['[ Volver a Intentarlo ]', '[ Volver al Inicio ]'],

    // ── Final Victory speech ──────────────────────────────
    victoryLines: [
      '',
      'Has atravesado cinco salas que la mayoría de la gente se pasa la vida evitando.',
      'Cada jefe, cada cosa que te dijeron, cada momento en que pensaste que ya no podías — y seguiste.',
      'La ansiedad no es un monstruo que has destruido esta noche. Va a volver.',
      'Exámenes, pasillos llenos, escenarios y focos — va a volver.',
      'Pero ahora sabes algo que antes no sabías: ya la has atravesado. Una vez.',
      'Y una vez es suficiente para saber que puedes hacerlo de nuevo.',
      'No hay meta para ser valiente.',
      'Solo hay hoy, el siguiente paso, y el siguiente respiro.',
      'Eres más fuerte de lo que crees.'
    ],
    victoryBigText: '¡ERES MÁS FUERTE!',

    // ── NPC dialogues ─────────────────────────────────────
    npcs: {
      // Level 1 — El Aula del Examen
      l1n1: [
        '"Yo me siento en primera fila. Donde mejor se oye el boli rojo."',
        '"Como falle, se van a enterar todos. De que no doy la talla."',
        '...',
        '"...¿A ti también te lo dice esa voz?"'
      ],
      l1n2: [
        '"Infracción registrada: respuesta dudosa en la pregunta tres."',
        '"Letra temblorosa en el margen. Queda anotado."',
        '"Yo todavía estoy aprendiendo."',
        '...El Vigilante procesa. Algo hace clic. Se aparta de tu camino.'
      ],
      l1n3: [
        '"He visto tu nombre en el corcho. Alguien escribió: \'este sale de todas\'."',
        '"— Firmado: alguien de tu clase que se fija en ti"'
      ],
      // Level 2 — El Pasillo
      l2n1: [
        '"Oye, ¿te has enterado de lo de —"',
        '"— sí, tío, me lo han contado esta mañana —"',
        '"— ¿y tú crees que fue por —"',
        '"— seguramente."',
        'Seguramente no hablaban de ti. Seguramente.'
      ],
      l2n2: [
        '"Ey. Tienes cara de día truño."',
        '"A mí también me pasa. Días en que este pasillo se hace larguísimo."',
        '"Te acompaño un trozo. Andando con alguien se nota menos."',
        '"Yo me quedo en mi taquilla. Pero oye — tú puedes con esto."'
      ],
      l2n3: [
        'Te ves reflejado en el cristal de la ventana.',
        'El del reflejo parece asustado.',
        'Y entonces caes: el que tiene miedo eres tú. Y el que sigue andando, también.',
        'Sois la misma persona.'
      ],
      // Level 3 — La Pista
      l3n1: [
        '"Vomité antes del último partido. En serio. Me vio el entrenador y todo."',
        '"Aun así tuve que salir a jugar. Y salí."',
        '"No jugué muy allá. Ganamos igualmente, pero yo no hice gran cosa."',
        '"Cuenta igual, ¿no? Presentarse también cuenta, ¿verdad?"'
      ],
      l3n2: [
        '"El crono está en marcha."',
        '"Se te está evaluando."',
        '"Cada vuelta a la pista queda registrada. Cada tropiezo. Cada parada."',
        '"...Rendimiento anotado."'
      ],
      l3n3: [
        'La placa dice: "Por intentarlo aunque diera miedo."',
        'No tiene ningún nombre grabado.',
        'Quizá lo dejaron aquí para alguien como tú.'
      ],
      // Level 4 — El Escenario
      l4n1: [
        '"Cada noche. Cada noche pienso que me voy a quedar en blanco."',
        '"Y cada noche salgo a la luz del foco y digo mi texto igualmente."',
        '"El truco no es esperar a que se pase el miedo. Es salir con el miedo puesto."'
      ],
      l4n2: [
        'Te acercas al micro, justo al borde del foco.',
        'No hace falta decir nada perfecto.',
        'A veces llegar hasta el micro ya es todo el discurso.'
      ],
      l4n3: [
        '"Para quien encuentre esta nota entre bambalinas:"',
        '"Actuar no es un examen. No es un veredicto. Es un regalo — imperfecto, presente, tuyo."',
        '"Sal ahí y dalo."',
        '"— El Director (que no ha salido sin miedo ni una sola vez)"'
      ],
      // Level 5 — Tu Interior
      l5n1: [
        '"Nunca estuviste tan solo como parecía."',
        '"Mira los cristales: en cada uno brilla alguien que te echó un cable. Y los dejaste entrar tú."',
        '"Eso también es ser valiente."'
      ],
      l5n2: [
        '"He estado contigo todo el camino. ¿Ya sabes lo que soy?"',
        '"Soy la parte de ti que quería seguir. Nada más."',
        '"Cada vez que te levantaste después de una caída — ese era yo. Eras TÚ."',
        '"No soy algo aparte. Nunca lo fui."',
        '"Enseñe lo que enseñe ese espejo — recuerda lo que soy. Recuerda lo que ERES."'
      ],
    },

    // ── Credits ───────────────────────────────────────────
    creditsLines: [
      { text: 'ERES MÁS FUERTE', style: 'title', color: '#FFD700' },
      { text: '', style: 'blank' },
      { text: 'Un viaje hacia dentro', style: 'sub', color: '#00C2B5' },
      { text: '', style: 'blank' },
      { text: '— — —', style: 'sep', color: '#334455' },
      { text: '', style: 'blank' },
      { text: 'La ansiedad es real. Lo que sientes es real.', style: 'narration', color: '#AACCDD' },
      { text: 'No tienes que vencerla.', style: 'narration', color: '#AACCDD' },
      { text: 'Solo da el siguiente paso.', style: 'narration', color: '#AACCDD' },
      { text: '', style: 'blank' },
      { text: 'Si algo de este juego te ha resultado familiar —', style: 'narration', color: '#889999' },
      { text: 'es porque lo es.', style: 'narration', color: '#889999' },
      { text: 'No estás solo en esto.', style: 'narration', color: '#889999' },
      { text: '', style: 'blank' },
      { text: '— — —', style: 'sep', color: '#334455' },
      { text: '', style: 'blank' },
      { text: 'CRÉDITOS', style: 'header', color: '#FFD166' },
      { text: '', style: 'blank' },
      { text: 'Diseño y Narrativa', style: 'role', color: '#667788' },
      { text: 'Claude + David', style: 'name', color: '#FFFFFF' },
      { text: '', style: 'blank' },
      { text: 'Arte Pixel y Sprites', style: 'role', color: '#667788' },
      { text: 'Claude + David', style: 'name', color: '#FFFFFF' },
      { text: '', style: 'blank' },
      { text: 'Motor y Programación', style: 'role', color: '#667788' },
      { text: 'Claude + David', style: 'name', color: '#FFFFFF' },
      { text: '', style: 'blank' },
      { text: 'Traducción', style: 'role', color: '#667788' },
      { text: 'Claude + David', style: 'name', color: '#FFFFFF' },
      { text: '', style: 'blank' },
      { text: '— — —', style: 'sep', color: '#334455' },
      { text: '', style: 'blank' },
      { text: 'Hecho para quien alguna vez tuvo miedo', style: 'dedic', color: '#8899AA' },
      { text: 'y siguió adelante de todas formas.', style: 'dedic', color: '#8899AA' },
      { text: '', style: 'blank' },
      { text: '', style: 'blank' },
      { text: '', style: 'blank' },
      { text: 'Tienes madera.', style: 'final', color: '#FFD700' },
      { text: 'Siempre la has tenido.', style: 'final', color: '#00C2B5' },
      { text: '', style: 'blank' },
      { text: '', style: 'blank' },
      { text: '', style: 'blank' }
    ],
  }
};

// ── Helper: traverse dot-path key ────────────────────────────
TRANSLATIONS.t = function(lang, key) {
  const parts = key.split('.');
  let val = TRANSLATIONS[lang];
  for (const p of parts) {
    if (val == null) break;
    val = val[p];
  }
  if (val === undefined && lang !== 'en') {
    // Fallback to English
    val = TRANSLATIONS['en'];
    for (const p of parts) {
      if (val == null) break;
      val = val[p];
    }
  }
  return val ?? key;
};

// ── Helper: replace {name} or other placeholders ─────────────
TRANSLATIONS.interpolate = function(str, vars) {
  if (typeof str !== 'string') return str;
  return str.replace(/\{(\w+)\}/g, (_, k) => (vars && vars[k] != null) ? vars[k] : '');
};

// ── Helper: get NPC line with fallback ───────────────────────
// levelIdx: 0-based, npcIdx: 0-based, lineIdx: 0-based
TRANSLATIONS.getNPCLine = function(lang, levelIdx, npcIdx, lineIdx) {
  const key = `l${levelIdx + 1}n${npcIdx + 1}`;
  const lines = TRANSLATIONS[lang] && TRANSLATIONS[lang].npcs && TRANSLATIONS[lang].npcs[key];
  if (lines && lines[lineIdx] !== undefined) return lines[lineIdx];
  // Fallback to English
  const enLines = TRANSLATIONS['en'].npcs[key];
  if (enLines && enLines[lineIdx] !== undefined) return enLines[lineIdx];
  return '';
};
