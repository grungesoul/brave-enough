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
        'The smell of chalk and cold air.',
        'Every mistake you\'ve ever made lives here.',
        'Let\'s find out what they weigh.'
      ],
      1: [
        'Thirty-seven steps. Feels like three hundred.',
        'Every eye a judgment, every whisper a verdict.',
        'But you\'ve been through exam rooms before.',
        'Keep walking.'
      ],
      2: [
        'The lights are too bright here.',
        'They find every stumble, every slip, every moment you\'re not quite good enough.',
        'Good thing you\'re not here to be perfect.'
      ],
      3: [
        'The curtain is about to rise.',
        'They\'re all waiting. The audience of everything you\'ve ever feared.',
        'On a night like this, just walking out is the performance.'
      ],
      4: [
        'No more rooms. No more crowds.',
        'Just you, and the shape of every fear you\'ve ever had, waiting at the center of everything.',
        'This is where it started.',
        'This is where it ends.'
      ],
    },

    // ── Boss names ────────────────────────────────────────
    bossNames: ['The Red Pen', 'The Whisper', 'The Spotlight', 'Stage Fright', 'Anxiety'],

    // ── Boss taunts (per level, array of 3 taunts) ────────
    bossTaunts: [
      // Level 1 — The Red Pen
      [
        '"Every wrong answer you\'ve ever given lives in this room. I counted them."',
        '"You studied, didn\'t you? And you still don\'t know enough. You never know enough."',
        '"What will they think when they see your score? What will that say about you?"'
      ],
      // Level 2 — The Whisper
      [
        '"They looked at you in the hallway today. Did you notice? They all looked. Right at you."',
        '"What are you going to do — speak up? Perfect. Give them more material."',
        '"Even if you win here, they\'ll still be watching. They\'ll always be watching."'
      ],
      // Level 3 — The Spotlight
      [
        '"Look at them watching you. You can\'t perform when you\'re being watched, can you?"',
        '"Your form is wrong. Your timing is off. They\'re all noticing. They\'re all keeping score."',
        '"What if you fall? Right here? In front of all of them? What then?"'
      ],
      // Level 4 — Stage Fright
      [
        '"Everyone came to see you. Look at them, waiting. What are you going to give them? This?"',
        '"Forget the next line. Forget what you were going to say. That feeling — that\'s me. I live there."',
        '"You\'ll never be ready. There is no ready. There is only the terror, forever."'
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
      // Level 1 — The Red Pen: 3 attacks
      [ '"Wrong."', '"Let me show you all the ways you fell short."', '"Time\'s up. You weren\'t ready. You were never ready."' ],
      // Level 2 — The Whisper: 3 attacks
      [ '"Heard the one about you? It\'s not good."', '"Everyone. Is. Watching."', '"You can\'t outrun what everyone already knows."' ],
      // Level 3 — The Spotlight: 3 attacks
      [ '"Everyone can see you now. Everything."', '"That. Right there. Did you think nobody would notice that?"', '"There is no hiding. I see all of it."' ],
      // Level 4 — Stage Fright: 3 attacks
      [ '"Your legs aren\'t working. They\'re all watching you stand there."', '"Line forgotten. Everything forgotten. Just you and a thousand waiting eyes."', '"Your performance is over. It never really began."' ],
      // Level 5 — Anxiety: 4 attacks
      [ '"What if you\'ve already used your best moves? What if you don\'t have enough left?"', '"You knew this was coming. You should have been ready. You\'re never ready enough."', '"Remember the exam? Remember the hallway? Remember the field? Remember the stage? You\'ll never stop remembering."', '"If I go — what are you without me? I\'ve been with you your whole life."' ],
    ],

    // ── Spark intro lines per level ───────────────────────
    sparkIntros: [
      'This room has been in your head a long time, hasn\'t it? Let\'s clear it out.',
      'I know this one. This is the one where everything feels like it\'s about you. Keep walking.',
      'They\'re all here. Every face you\'ve ever tried not to disappoint. But look — the ground under your feet. You can still stand on it.',
      'I know this is the hardest one. Both things at once — the doing and the watching. But the stage is yours. They can\'t take that.',
      'You built this place. Every room we walked through — you built them. Not because you wanted to. Because you were surviving. But you\'re not just surviving anymore.',
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
      'One room cleared. You are still here.',
      'The hallway is just a hallway.',
      'You didn\'t need to be perfect. You just needed to show up.',
      'The curtain is yours now. All of it is yours.',
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
      // Level 1
      l1n1: [
        '"If I get this wrong, they\'ll know I don\'t belong here."',
        '"They\'ll all see. They\'ll all know I\'ve been faking this whole time."',
        '...',
        '"...Is that what you think too?"'
      ],
      l1n2: [
        '"Infraction logged. Wrong answer on page three. Incorrect approach on question seven."',
        '"Your margin notes suggest confusion. Confusion has been noted."',
        '"I\'m still learning."',
        '...The Monitor pauses. Writes something. Steps aside.'
      ],
      l1n3: [
        '"Hey. I\'ve seen you in here before. You always make it out."',
        '"— Someone who\'s rooting for you"'
      ],
      // Level 2
      l2n1: [
        'SHADOW A: "Oh — "',
        'SHADOW B: "— yeah, I saw —"',
        'SHADOW A: "— do you think they —"',
        'SHADOW B: "— probably."',
        'They were probably not talking about you at all. Probably.'
      ],
      l2n2: [
        '"Hey. You look like you\'re having one of those days."',
        '"I have them too. Like everything is just... a lot."',
        '"Walk with me for a second. It\'s easier when you don\'t feel like the only one."',
        '"I gotta go in here. But hey — you\'ve got this."'
      ],
      l2n3: [
        'Your reflection looks back at you.',
        'It looks scared.',
        'You realize: the scared one is also you. The brave one walking forward is also you.',
        'They are the same person.'
      ],
      // Level 3
      l3n1: [
        '"I threw up before the last game. Actual vomit. Coach saw."',
        '"I still had to go on. So I did."',
        '"I didn\'t play great. We still won, actually, but I didn\'t do much."',
        '"Still counts, right? Showing up still counts?"'
      ],
      l3n2: [
        '"Clock\'s running."',
        '"You\'re being evaluated."',
        '"Every second is being recorded. Every stumble. Every hesitation."',
        '"...Performance noted."'
      ],
      l3n3: [
        'The engraving reads: "For trying when it was terrifying."',
        'There\'s no name on it.',
        'Maybe it was meant for someone like you.'
      ],
      // Level 4
      l4n1: [
        '"Every single night. Every single night I feel like I\'m going to forget my lines."',
        '"And every night I walk out there and say them anyway."',
        '"The trick is — you don\'t wait for the fear to leave. You walk out while it\'s still there."'
      ],
      l4n2: [
        'You step up to the microphone.',
        'You don\'t have to say anything perfect.',
        'Sometimes just showing up at the mic is the whole point.'
      ],
      l4n3: [
        '"To whoever finds this:"',
        '"A performance is not a test. It is not a verdict. It is a gift — imperfect, present, given."',
        '"Go give yours."',
        '"— The Director (who has never, not once, been unafraid)"'
      ],
      // Level 5
      l5n1: [
        '"You were never as alone as it felt."',
        '"Every person who ever helped you — they were part of you too. You let them in."',
        '"That\'s brave."'
      ],
      l5n2: [
        '"I\'ve been with you the whole time. Do you know what I am?"',
        '"I\'m the part of you that wanted to keep going. That\'s all."',
        '"Every time you got up after something knocked you down — that was me. That was YOU."',
        '"I\'m not separate. I never was."',
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
    subtitle: 'Un viaje hacia adentro',
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
    resultFindPeople: (dmg) => `¡Ha llegado tu colega! ${dmg} de daño. +10 CV!`,
    resultBelieve: (dmg) => `¡Te lo has creído! ${dmg} de daño. +20 CV!`,
    resultBelieveInspired: (dmg) => `¡Te lo has creído! ${dmg} de daño. +20 CV. ¡Inspirado!`,
    resultBreakFree: (dmg) => `¡A por todas! ${dmg} de daño!`,
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
      selfTalk:          { name: 'Hazte la Cabeza',   desc: 'Cuestiona el pensamiento. Daño medio + debilita rival. (8 Calma)' },
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
        'Huele a tiza y a nervios.',
        'Todos tus fallos viven aquí. Bien guardados.',
        'Veamos cuánto pesan hoy.'
      ],
      1: [
        'Treinta y siete pasos. Se hacen eternos.',
        'Cada mirada es un juicio. Cada cuchicheo va de ti — o eso te parece.',
        'Pero has sobrevivido cosas peores.',
        'Sigue.'
      ],
      2: [
        'Los focos aquí no perdonan.',
        'Encuentran cada tropiezo, cada momento en que no das la talla.',
        'Menos mal que no venías a ser perfecto.'
      ],
      3: [
        'El telón está a punto de subir.',
        'Ahí están todos. Todo lo que alguna vez te ha dado miedo, esperando.',
        'Esta noche, con solo salir ya está.'
      ],
      4: [
        'Ya no hay más salas. Ya no hay más gente.',
        'Solo tú, y la forma de todo lo que te ha dado miedo, esperando en el centro.',
        'Aquí empezó todo esto.',
        'Aquí termina.'
      ],
    },

    // ── Boss names ────────────────────────────────────────
    bossNames: ['La Pluma Roja', 'El Cotilleo', 'El Foco', 'El Pánico Escénico', 'La Ansiedad'],

    // ── Boss taunts ───────────────────────────────────────
    bossTaunts: [
      // Level 1 — La Pluma Roja
      [
        '"Tengo apuntados todos tus fallos en esta aula. Todos. Sin excepción."',
        '"Estudiaste, ¿a que sí? Y aun así no es suficiente. Nunca va a ser suficiente."',
        '"¿Qué van a pensar cuando vean tu nota? ¿Qué dice eso de ti?"'
      ],
      // Level 2 — El Cotilleo
      [
        '"Te estaban mirando en el pasillo. ¿Lo notaste? Todos. Justo a ti."',
        '"¿Y qué vas a hacer, hablar? Genial. Dales más de qué cotillear."',
        '"Aunque me ganes hoy, van a seguir mirando. Siempre estarán mirando."'
      ],
      // Level 3 — El Foco
      [
        '"Míralos cómo te observan. No rindes cuando te están mirando, ¿verdad que no?"',
        '"Tu postura está mal. Tu timing está fatal. Lo están notando. Todos llevan la cuenta."',
        '"¿Y si te caes? ¿Aquí? ¿Delante de todos? ¿Y entonces qué?"'
      ],
      // Level 4 — El Pánico Escénico
      [
        '"Han venido todos a verte. Ahí están, esperando. ¿Qué les vas a dar? ¿Esto?"',
        '"Olvida el siguiente texto. Olvida lo que ibas a decir. Esa sensación en el pecho — soy yo."',
        '"No vas a estar listo nunca. Eso no existe. Solo existe el terror, para siempre."'
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
      // Level 1
      [ '"Incorrecto."', '"Voy a mostrarte todos los fallos que has cometido."', '"Se ha acabado el tiempo. No estabas listo. Nunca lo estarás."' ],
      // Level 2
      [ '"¿Has oído lo que están diciendo de ti? No es bueno."', '"Todo. El. Mundo. Te. Está. Mirando."', '"No puedes con lo que todos ya saben."' ],
      // Level 3
      [ '"Ahora todos te pueden ver. Todo."', '"Eso. Justo eso. ¿Pensabas que nadie se iba a dar cuenta?"', '"No hay dónde esconderse. Lo veo todo."' ],
      // Level 4
      [ '"Las piernas no te responden. Todos te están viendo ahí plantado."', '"El texto se ha ido. Todo se ha ido. Solo tú y un montón de ojos esperando."', '"Tu actuación ha terminado. En realidad nunca llegó a empezar."' ],
      // Level 5
      [ '"¿Y si ya has gastado todo lo que tenías? ¿Y si no te queda suficiente?"', '"Sabías que iba a pasar. Tenías que haberte preparado más. Nunca estás suficientemente listo."', '"¿Te acuerdas del examen? ¿Del pasillo? ¿La pista? ¿El escenario? No lo vas a olvidar."', '"Si me voy — ¿qué eres sin mí? Toda tu vida he estado aquí."' ],
    ],

    // ── Spark intro lines ─────────────────────────────────
    sparkIntros: [
      'Esta sala lleva tiempo en tu cabeza, ¿verdad? Ya toca limpiarlo.',
      'Conozco este sitio. Es el que te hace sentir que todo va de ti. Sigue, no te rajes.',
      'Están todos aquí. Cada cara a la que no querías fallar. Pero mira — el suelo está firme. Todavía puedes sostenerte.',
      'Sé que este es el más duro. Las dos cosas a la vez — hacer y que te vean. Pero este escenario es tuyo. Nadie te lo puede quitar.',
      'Tú has construido este lugar. Cada sala que hemos cruzado — tú las construiste. No porque quisieras. Porque estabas sobreviviendo. Pero ya no solo estás sobreviviendo.',
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
      'Una sala menos. Y aquí sigues, tío.',
      'El pasillo es solo un pasillo.',
      'No hacía falta ser perfecto. Solo aparecer.',
      'El escenario ya es tuyo. Todo tuyo.',
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
        '"Como me equivoque, van a saber que no pinto nada aquí."',
        '"Lo van a ver. Todos van a saber que llevo tiempo haciéndome el que sabe."',
        '...',
        '"...¿Tú también lo piensas de ti mismo?"'
      ],
      l1n2: [
        '"Infracción registrada. Respuesta incorrecta, página tres. Enfoque incorrecto, pregunta siete."',
        '"Tus notas al margen indican confusión. La confusión ha quedado registrada."',
        '"Todavía estoy aprendiendo."',
        '...El Monitor hace una pausa. Escribe algo. Se aparta.'
      ],
      l1n3: [
        '"Oye. Te he visto aquí antes. Siempre salvas el tipo."',
        '"— Alguien que te está animando"'
      ],
      // Level 2 — El Pasillo
      l2n1: [
        'SOMBRA A: "Oye, ¿has visto que —"',
        'SOMBRA B: "— sí, yo también lo vi —"',
        'SOMBRA A: "— ¿crees que ellos —"',
        'SOMBRA B: "— probablemente."',
        'Probablemente no hablaban de ti. Probablemente.'
      ],
      l2n2: [
        '"Oye. Tienes pinta de que hoy está siendo un truño."',
        '"A mí también me pasa. Como que todo se amontona demasiado, ¿no?"',
        '"Acompáñame un momento. Es más fácil cuando no sientes que eres el único."',
        '"Yo me meto aquí. Pero oye — tú puedes."'
      ],
      l2n3: [
        'Tu reflejo te mira.',
        'Parece asustado.',
        'Caes en la cuenta: el asustado también eres tú. El que sigue adelante también eres tú.',
        'Son la misma persona.'
      ],
      // Level 3 — La Pista
      l3n1: [
        '"Vomité antes del último partido. En serio. El entrenador lo vio todo."',
        '"Igual tuve que salir a jugar. Y lo hice."',
        '"No jugué bien. Igual ganamos, pero yo no aporté mucho."',
        '"Cuenta igual, ¿no? Aparecer cuenta igual, ¿verdad?"'
      ],
      l3n2: [
        '"El tiempo corre."',
        '"Te están evaluando."',
        '"Cada segundo está siendo registrado. Cada tropiezo. Cada duda."',
        '"...Rendimiento anotado."'
      ],
      l3n3: [
        'La placa dice: "Por intentarlo cuando daba miedo."',
        'No hay nombre.',
        'Quizás fue hecha para alguien como tú.'
      ],
      // Level 4 — El Escenario
      l4n1: [
        '"Cada noche. Cada noche siento que me voy a quedar en blanco."',
        '"Y cada noche salgo y lo digo de todas formas."',
        '"El truco es — no esperas a que se te pase el miedo. Sales mientras todavía lo tienes."'
      ],
      l4n2: [
        'Te acercas al micrófono.',
        'No tienes que decir nada perfecto.',
        'A veces solo llegar al micrófono ya es todo.'
      ],
      l4n3: [
        '"Para quien encuentre esto:"',
        '"Una actuación no es un examen. No es un veredicto. Es un regalo — imperfecto, presente, tuyo."',
        '"Ve a darlo."',
        '"— El Director (que nunca, ni una sola vez, ha dejado de tener miedo)"'
      ],
      // Level 5 — Tu Interior
      l5n1: [
        '"Nunca estuviste tan solo como parecía."',
        '"Cada persona que alguna vez te ayudó — también era parte de ti. Les dejaste entrar."',
        '"Eso es valentía, aunque no lo parezca."'
      ],
      l5n2: [
        '"He estado contigo todo el tiempo. ¿Sabes qué soy?"',
        '"Soy la parte de ti que quería seguir. Eso es todo."',
        '"Cada vez que te levantaste después de que algo te tumbara — ese era yo. Eras TÚ."',
        '"No soy algo aparte. Nunca lo fui."',
        '"Lo que sea que muestre ese espejo — recuerda qué soy. Recuerda qué ERES."'
      ],
    },

    // ── Credits ───────────────────────────────────────────
    creditsLines: [
      { text: 'ERES MÁS FUERTE', style: 'title', color: '#FFD700' },
      { text: '', style: 'blank' },
      { text: 'Un viaje hacia adentro', style: 'sub', color: '#00C2B5' },
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
