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
    rotateTitle: 'ROTATE YOUR PHONE',
    rotateBody: 'This game plays best in landscape. Turn your phone sideways for a wider view and comfier controls.',
    rotateSkip: 'Keep playing in portrait',
    namePrompt: 'What is your name, traveler?',
    nameHint: 'Type your name, then press ENTER (max 12 chars)',
    nameConfirmSpark: (name) => `"${name}. That's a name worth remembering."`,
    thanksForPlaying: 'Thank you for playing.',

    // ── Title narration lines ─────────────────────────────
    titleNarration: [
      'Every night, the fear comes.',
      'The new people tomorrow. The group tomorrow.',
      'The exam that decides everything, circled in red on the calendar.',
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
    resultBelieve: (dmg) => `Evidence counted! ${dmg} dmg. +20 CP!`,
    resultBelieveInspired: (dmg) => `Evidence counted! ${dmg} dmg. +20 CP. Inspired!`,
    resultBreakFree: (dmg) => `Break Free! ${dmg} dmg!`,
    resultDesperateCourage: (dmg) => `DESPERATE COURAGE! ${dmg} dmg!`,
    resultLimitBreak: (dmg) => `FEARLESS! ${dmg} damage! All debuffs cleared!`,
    mirrorAdapts: (abilityName) => `The mirror adapts. Your ${abilityName} weakens.`,
    resultGroundYourself: () => 'Back in the room. +20 Calm, +10 CP. Grounded!',
    resultSelfTalk: (dmg) => `If-then plan armed! ${dmg} damage. Boss weakened.`,
    resultSelfCompassion: (dmg) => `+35 CP restored. Gentle strike: ${dmg} damage.`,
    resultPowerPose: (dmg) => `Power Pose! ${dmg} damage. Inspired!`,

    // ── Abilities ─────────────────────────────────────────
    // Each ability IS a real, evidence-based technique — the desc teaches it.
    abilities: {
      breatheDeep:     { name: 'Breathe Deep',       desc: 'Two sips of air in, one long exhale out. +15 Calm. (5 Calm)' },
      speakUp:         { name: 'Speak Up',            desc: 'Say it out loud, as unpolished as it is. (5 Calm)' },
      reframe:         { name: 'Reframe',             desc: 'Test the thought like a prediction. Hit + Dread down. (8 Calm)' },
      findYourPeople:  { name: 'Find Your People',    desc: 'Asking for backup is a skill. Ally hit +10 CP. (10 Calm, CD 2)' },
      believeInYourself: { name: 'Believe In Yourself', desc: 'Count the evidence you\'ve survived. Big hit +20 CP. (15 Calm)' },
      breakFree:       { name: 'Break Free',          desc: 'Drop the rope. Stop fighting the feeling — act. (20 Calm)' },
      groundYourself:  { name: 'Ground Yourself',    desc: '5-4-3-2-1: back to the room. +20 Calm +10 CP. (Free, CD 3)' },
      selfTalk:        { name: 'If-Then Plan',        desc: 'IF I go blank, THEN long exhale, re-read. Hit + weaken. (8 Calm)' },
      selfCompassion:  { name: 'Self-Compassion',     desc: 'Like you\'d talk to a friend. +35 CP + light hit. (15 Calm)' },
      powerPose:       { name: 'Power Pose',          desc: 'Stand tall. Label the rush: fuel. Hit + Inspired. (8 Calm, CD 3)' },
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
      'The First Day',
      'The Group Project',
      'The Presentation',
      'The Final Exam',
      'The Mindscape Core',
    ],

    // ── Level intro lines (keyed by level index as string) ──
    introLines: {
      0: [
        'First day. New school, new faces — and everyone seems to already know everyone.',
        'Lockers as far as you can see. Thirty-seven steps to the end of the hallway.',
        'Every huddle seems to drop its voice when you walk past. Or so it seems.',
        'Keep walking.'
      ],
      1: [
        'A classroom rearranged into islands of desks. Group project day.',
        'Somewhere in this room there\'s a group with an empty chair. Yours.',
        'You don\'t have to say something brilliant. You just have to pull up the chair.'
      ],
      2: [
        'Old wooden boards and a single spotlight.',
        'Out there, in the dark, the audience is breathing.',
        'On a night like this, stepping into the light is the whole performance.'
      ],
      3: [
        'The exam hall. Desks in rows that seem to go on forever.',
        'On every desk, a red pen. Waiting.',
        'Your heart is loud. Good — that\'s blood and oxygen reporting for duty.',
        'You prepared for this. Walk in.'
      ],
      4: [
        'No more classrooms. No more hallways. No more crowd.',
        'Only crystals glowing with things you remember — and something waiting at the center.',
        'This is where it started.',
        'This is where it ends.'
      ],
    },

    // ── Boss names ────────────────────────────────────────
    bossNames: ['The Whisper', 'The Spotlight', 'Stage Fright', 'The Red Pen', 'Anxiety'],

    // ── Two-phase bosses: second-form names + transformation lines ──
    bossPhase2Names: [null, null, null, 'The Blank Page', null],
    bossPhase2Lines: [
      null, null, null,
      [
        '"The pen is dry. Did you think that was the end?"',
        '"I\'m what comes after: the empty page. The mind gone white."',
        '"No more corrections. Now there is nothing at all."'
      ],
      null
    ],

    // ── NPC display names (per level) ─────────────────────
    npcNames: [
      ['The Huddle', 'The Locker Friend', 'The Window Reflection'],
      ['The Quiet Groupmate', 'The Idea Notebook', 'The Returning Student'],
      ['The Actor in the Wings', 'The Empty Mic', 'The Director\'s Note'],
      ['The Front-Row Student', 'The Practice Sheet', 'The Kind Note'],
      ['The Memory', 'The Spark'],
    ],

    // ── Boss taunts (per level, array of 3 taunts) ────────
    bossTaunts: [
      // Level 1 — The Whisper (mind reading)
      [
        '"They were watching you from the lockers. Did you notice? All of them. You."',
        '"What are you going to do — speak up? Great. More material for the huddle."',
        '"Silence me today, and there\'ll be another huddle tomorrow. There always is."'
      ],
      // Level 2 — The Spotlight (the spotlight effect)
      [
        '"They all saw you walk in. They\'re still thinking about it. They think about you a lot."',
        '"Say your idea. Go on. I\'ll make sure every eye in the room is on you when you do."',
        '"Everything you do in here gets noticed. Filed. Remembered forever."'
      ],
      // Level 3 — Stage Fright (catastrophizing)
      [
        '"They all came to see you. Listen to the room. What are you going to give them? This?"',
        '"The moment you step into the spotlight, the words will go. That feeling in your chest — that\'s me."',
        '"You\'ll never be ready. \'Ready\' doesn\'t exist. Only I do, forever."'
      ],
      // Level 4 — The Red Pen (perfectionism / all-or-nothing)
      [
        '"Every desk in this room keeps something of yours crossed out in red. I collect them."',
        '"You studied, didn\'t you? Doesn\'t matter. I always find something to cross out."',
        '"Perfect, or nothing. Those are the only two grades I give."'
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
      // Level 1 — The Whisper: names the mind-reading trap
      [
        '"...You checked. You actually talked to them."',
        '"I only ever worked while you were guessing what people think. That guessing game — that was me."',
        '"Nobody can read minds. Not even me. Especially not me."'
      ],
      // Level 2 — The Spotlight: names the spotlight effect
      [
        '"I made you feel like the whole room was a camera pointed at you."',
        '"But here\'s my secret: everyone\'s busy starring in their own film. They barely have footage of you."',
        '"Turn the camera around. The room is just a room."'
      ],
      // Level 3 — Stage Fright
      [
        '"The stage was mine. This was my stage first."',
        '"I\'m the one who made you rehearse. And rehearse. Because if you rehearsed enough, maybe it would be okay."',
        '"All this time. I was just scared too."'
      ],
      // Level 4 — The Red Pen / The Blank Page: perfectionism, named
      [
        '"...You breathed. You re-read the question. You came back."',
        '"I always told you it had to be perfect or it was nothing. That was the lie."',
        '"You prepared, and you kept writing while I screamed. That\'s what prepared actually means."'
      ],
      // Level 5 — Anxiety
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
      // Level 1 — The Whisper
      [ '"Heard what they\'re saying about you? I have. All of it."', '"Shhh. Shhh. Feel that? They\'re talking about you."', '"You can\'t outrun what everyone already knows."' ],
      // Level 2 — The Spotlight
      [ '"Everyone can see you now. Everything."', '"That. Right there. Did you think nobody would notice?"', '"There\'s nowhere to sit that I don\'t light up."' ],
      // Level 3 — Stage Fright
      [ '"Your legs won\'t answer. And the spotlight stays on you."', '"Lines erased. Mind blank. Just you and a whole room waiting."', '"Curtain. Your performance ended before it began."' ],
      // Level 4 — The Red Pen (phase 1)
      [ '"Wrong."', '"Red. Red. Red. Do you see how much red?"', '"Time\'s up. Pens down. You didn\'t make it."' ],
      // Level 5 — Anxiety
      [ '"What if you\'ve already used your best moves? What if you don\'t have enough left?"', '"You knew this was coming. You should have been ready. You\'re never ready enough."', '"Remember the hallway? The group? The stage? The exam? You\'ll never stop remembering."', '"If I go — what are you without me? I\'ve been with you your whole life."' ],
    ],

    // ── Phase-2 attack flavors (two-phase bosses only) ────
    bossPhase2AttackFlavors: [
      null, null, null,
      [ '"Blank. The word was right there and now it\'s gone."', '"Frozen. The clock moves. You don\'t."', '"What if you fail? What if that proves everything?"' ],
      null
    ],

    // ── Spark intro lines per level ───────────────────────
    sparkIntros: [
      'New hallway, new faces. Your mind will spend all day guessing what they think of you. Guesses aren\'t facts. Let\'s go check.',
      'A group is just a few people as unsure as you, sitting closer together. Pull up the chair — that\'s the whole first step.',
      'I know this is a hard one. Doing it, and being seen doing it. But look at the spotlight — it\'s waiting for you, not hunting you.',
      'This is the big one. So remember: you trained for this. A pounding heart is your body showing up to help. Let it.',
      'You built this place. Every room we crossed. Not because you wanted to — because you were surviving. But you\'re not just surviving anymore.',
    ],

    // ── Level clear texts ─────────────────────────────────
    levelClearTexts: [
      'The Whisper has no voice left.',
      'The Spotlight has dimmed.',
      'Stage Fright has fallen.',
      'The Red Pen is out of ink. And the Blank Page is blank again.',
      '',
    ],
    levelClearTexts2: [
      'Nobody was keeping score. And you walked the whole hallway anyway.',
      'You said your idea out loud. The ceiling did not fall in.',
      'You didn\'t need the fear to leave. You went on stage wearing it.',
      'You passed WITH the anxiety, not without it. That\'s the bigger win.',
      '',
    ],

    // ── Spark clear lines (each ends on a small real-world quest) ──
    sparkClearLines: [
      'One down. Side quest for the real world: this week, ask one person one small question. Then check what actually happens.',
      'You spoke and the group listened. Real-world version: say one idea out loud this week, exactly as unpolished as it is.',
      'Three down. Next time your heart races before something big, try calling it "fuel". See if it changes the ride.',
      'You did the hardest room. One more — and this one we don\'t fight to destroy. We go in to understand it.',
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
      // Level 1 — The First Day (hallway)
      l1n1: [
        '"Hey, did you hear about —"',
        '"— yeah, someone told me this morning —"',
        '"— and do you think it was because —"',
        '"— probably."',
        'They were probably not talking about you. Probably.'
      ],
      l1n2: [
        '"Hey. New, right? I could tell by the way you scanned the hallway."',
        '"Little game I play on rough days: before I talk to someone, I bet on the odds they blow me off. Then I go check."',
        '"My bets say 90%. Reality says... almost never. My mind is a terrible bookie."',
        '"Go on, test one. Worst case, you walk away with data."'
      ],
      l1n3: [
        'You catch yourself in the window glass, checking how you look. Again.',
        'Your mind has been filming you from the inside all morning.',
        'Try turning the camera around: the hallway, the posters, the faces. Nobody is filming you.',
        'The one still walking — that\'s you too.'
      ],
      // Level 2 — The Group Project (classroom + library)
      l2n1: [
        '"I had the right answer twenty minutes ago. I\'ve been rehearsing how to say it ever since."',
        '"If I say it wrong, they\'ll think I\'m useless. If I say nothing, at least nothing happens."',
        '"...Except nothing happening is also a result, isn\'t it?"',
        '"Okay. Next round, I say it badly. Out loud. Watch me."'
      ],
      l2n2: [
        '"Experiment log, entry 14: subject predicted the group would laugh at their idea. Stated probability: 90%."',
        '"Observed outcome: two nods. One \'good point\'. Zero laughter."',
        '"Prediction error: 90 points. Conclusion: the forecaster is broken, not the subject."',
        '"...One experiment slot still open. It has your name on it."'
      ],
      l2n3: [
        '"Thirty-four. Yeah, I know — the oldest one in the class. I came back to finish what I left half done."',
        '"First week, I was certain everyone was thinking \'what is SHE doing here\'. Know how long that lasted? Two days. Then I was just... a classmate."',
        '"People are far too busy with their own stuff to run a commentary on yours."',
        '"Sit with us if you want. The empty chair is worse than any group."'
      ],
      // Level 3 — The Presentation (stage)
      l3n1: [
        '"Every night. Every night I think I\'m going to go blank."',
        '"And every night I step into the spotlight and say my lines anyway."',
        '"The trick isn\'t waiting for the fear to pass. It\'s walking out wearing it."'
      ],
      l3n2: [
        'You step up to the mic, right at the edge of the spotlight.',
        'Your heart is hammering. That\'s not a malfunction — that\'s your body shipping oxygen to your brain.',
        'The same engine runs fear and excitement. You get to pick the label.',
        'Sometimes reaching the mic is the whole speech.'
      ],
      l3n3: [
        '"To whoever finds this note in the wings:"',
        '"A performance is not a test. Not a verdict. It\'s a gift — imperfect, present, yours."',
        '"Go out there and give it."',
        '"— The Director (who has never once walked out unafraid)"'
      ],
      // Level 4 — The Final Exam (exam hall)
      l4n1: [
        '"I sit in the front row. I used to think I was the only one whose hands shake when the exams come out."',
        '"Then I looked around. Half the room breathes like they\'re about to dive into cold water."',
        '"Shaking hands can still write. I\'ve checked. Every single time."'
      ],
      l4n2: [
        '"I am a practice test. I am not graded. That is the entire point of me."',
        '"Every question you get wrong with me is one the real exam loses forever."',
        '"Quiz yourself before the exam quizzes you."',
        '"...Practice complete. The real one has fewer surprises now."'
      ],
      l4n3: [
        'A note on the desk, in handwriting you almost recognize:',
        '"You don\'t need to feel calm to do this. You need to do it with whatever you\'re feeling."',
        '"If your mind goes blank: one long breath out, re-read the question, start with any piece you know."',
        '"— someone who passed this exam terrified"'
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
      { text: 'And if it weighs on you most days,', style: 'narration', color: '#889999' },
      { text: 'talking to someone helps. Asking for help', style: 'narration', color: '#889999' },
      { text: 'is a skill, not a defeat.', style: 'narration', color: '#889999' },
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
      { text: 'Ansimuz · Pipoya · Ninja Adventure · Junkala · Kenney', style: 'name', color: '#AABBCC' },
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
    rotateTitle: '¡GIRA EL MÓVIL!',
    rotateBody: 'Este juego se juega mejor en horizontal. Gira el móvil para ver más pantalla y jugar más cómodo.',
    rotateSkip: 'Seguir en vertical',
    namePrompt: 'Oye, ¿cómo te llamas?',
    nameHint: 'Escribe tu nombre y pulsa ENTER (máx. 12 letras)',
    nameConfirmSpark: (name) => `"${name}. Ese nombre no se me va a olvidar en la vida."`,
    thanksForPlaying: 'Gracias por jugar.',

    // ── Title narration lines ─────────────────────────────
    titleNarration: [
      'El miedo vuelve cada noche.',
      'La gente nueva de mañana. El grupo de mañana.',
      'El examen que lo decide todo, marcado en rojo en el calendario.',
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
    resultBelieve: (dmg) => `¡Pruebas contadas! ${dmg} de daño. ¡+20 CV!`,
    resultBelieveInspired: (dmg) => `¡Pruebas contadas! ${dmg} de daño. ¡+20 CV! ¡Inspirado!`,
    resultBreakFree: (dmg) => `¡A por todas! ¡${dmg} de daño!`,
    resultDesperateCourage: (dmg) => `¡VALENTÍA SIN FRENOS! ¡${dmg} de daño!`,
    resultLimitBreak: (dmg) => `¡SIN MIEDO! ${dmg} de daño. ¡Estados negativos eliminados!`,
    mirrorAdapts: (abilityName) => `El espejo te copia. Tu ${abilityName} se debilita.`,
    resultGroundYourself: () => 'De vuelta a la sala. +20 Calma, +10 CV. ¡Centrado!',
    resultSelfTalk: (dmg) => `¡Plan si-entonces activado! ${dmg} de daño. ¡Enemigo debilitado!`,
    resultSelfCompassion: (dmg) => `+35 CV recuperados. Golpe suave: ${dmg} de daño.`,
    resultPowerPose: (dmg) => `¡Postura de poder! ${dmg} de daño. ¡Inspirado!`,

    // ── Abilities ─────────────────────────────────────────
    // Cada habilidad ES una técnica real con evidencia — la descripción la enseña.
    abilities: {
      breatheDeep:       { name: 'Respira',           desc: 'Dos sorbos de aire, una exhalación larga. +15 Calma. (5 Calma)' },
      speakUp:           { name: 'Suéltalo',          desc: 'Dilo en voz alta, así de imperfecto como está. (5 Calma)' },
      reframe:           { name: 'Perspectiva',       desc: 'Pon a prueba el pensamiento. Golpe + baja el Pavor. (8 Calma)' },
      findYourPeople:    { name: 'Tus Colegas',       desc: 'Pedir refuerzos es una habilidad. Golpe aliado +10 CV. (10, rec 2)' },
      believeInYourself: { name: 'Confía en Ti',      desc: 'Cuenta las pruebas: has salido de todas. Golpe +20 CV. (15 Calma)' },
      breakFree:         { name: 'A por Todas',       desc: 'Suelta la cuerda: deja de pelear con la sensación. (20 Calma)' },
      groundYourself:    { name: 'Aquí y Ahora',      desc: '5-4-3-2-1: vuelve a la sala. +20 Calma +10 CV. (Gratis, rec 3)' },
      selfTalk:          { name: 'Plan Si-Entonces',  desc: 'SI me quedo en blanco, ENTONCES exhalo y releo. (8 Calma)' },
      selfCompassion:    { name: 'Date un Respiro',   desc: 'Háblate como a un colega. +35 CV + golpe suave. (15 Calma)' },
      powerPose:         { name: 'Postura de Poder',  desc: 'Espalda recta. Etiqueta: combustible. Golpe + Inspirado. (8, rec 3)' },
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
      'El Primer Día',
      'El Trabajo en Grupo',
      'La Presentación',
      'El Examen Final',
      'Tu Interior',
    ],

    // ── Level intro lines ──────────────────────────────────
    introLines: {
      0: [
        'Primer día. Centro nuevo, caras nuevas — y aquí parece que ya se conocen todos.',
        'Taquillas hasta donde llega la vista. Treinta y siete pasos hasta el final del pasillo.',
        'Cada corrillo parece bajar la voz cuando pasas. O eso te parece.',
        'Tú camina.'
      ],
      1: [
        'Un aula recolocada en islas de pupitres. Día de trabajo en grupo.',
        'En algún sitio de esta sala hay un grupo con una silla vacía. La tuya.',
        'No hace falta decir nada brillante. Solo acercar la silla.'
      ],
      2: [
        'Tablas de madera vieja y un único foco encendido.',
        'Ahí delante, a oscuras, respira el público.',
        'Una noche así, salir a la luz ya es la actuación entera.'
      ],
      3: [
        'El aula grande de los exámenes. Filas de pupitres que no parecen acabarse.',
        'Sobre cada pupitre, un boli rojo. Esperando.',
        'El corazón te va fuerte. Bien — eso es sangre y oxígeno presentándose a trabajar.',
        'Te lo has preparado. Entra.'
      ],
      4: [
        'Ya no hay aulas, ni pasillos, ni público.',
        'Solo cristales que brillan con cosas que recuerdas — y algo esperando en el centro.',
        'Aquí empezó todo.',
        'Aquí se acaba.'
      ],
    },

    // ── Boss names ────────────────────────────────────────
    bossNames: ['El Cotilleo', 'El Foco', 'El Pánico Escénico', 'La Pluma Roja', 'La Ansiedad'],

    // ── Jefes de dos fases: nombre y líneas de transformación ──
    bossPhase2Names: [null, null, null, 'El Folio en Blanco', null],
    bossPhase2Lines: [
      null, null, null,
      [
        '"La pluma se ha quedado sin tinta. ¿Creías que eso era el final?"',
        '"Yo soy lo que viene después: el folio vacío. La mente en blanco."',
        '"Ya no hay correcciones. Ahora no hay nada de nada."'
      ],
      null
    ],

    // ── Nombres de NPC (por nivel) ────────────────────────
    npcNames: [
      ['El Corrillo', 'El Colega de la Taquilla', 'El Reflejo de la Ventana'],
      ['El Compañero Callado', 'El Cuaderno de Ideas', 'La Que Volvió a Estudiar'],
      ['El Actor entre Bambalinas', 'El Micro Vacío', 'La Nota del Director'],
      ['El de Primera Fila', 'La Hoja de Práctica', 'La Nota Amable'],
      ['El Recuerdo', 'La Chispa'],
    ],

    // ── Boss taunts ───────────────────────────────────────
    bossTaunts: [
      // Level 1 — El Cotilleo (leer la mente)
      [
        '"Te miraban desde las taquillas. ¿Te has dado cuenta? Todos. Justo a ti."',
        '"¿Y qué vas a hacer, hablar en alto? Genial. Más material para el corrillo."',
        '"Aunque hoy me calles, mañana habrá otro corrillo. Siempre hay otro."'
      ],
      // Level 2 — El Foco (efecto foco)
      [
        '"Todos te han visto entrar. Y siguen pensando en ello. Piensan mucho en ti."',
        '"Di tu idea, venga. Yo me encargo de que todos los ojos de la clase estén en ti."',
        '"Todo lo que haces aquí dentro se nota. Se apunta. Se recuerda para siempre."'
      ],
      // Level 3 — El Pánico Escénico (catastrofismo)
      [
        '"Han venido todos a verte. Escucha la sala. ¿Qué piensas darles? ¿Esto?"',
        '"En cuanto pises el foco se te irá el texto. Esa sensación del pecho — soy yo."',
        '"Nunca vas a estar listo. Eso de estar listo no existe. Solo existo yo, para siempre."'
      ],
      // Level 4 — La Pluma Roja (perfeccionismo / todo-o-nada)
      [
        '"Cada pupitre de esta aula guarda algo tuyo tachado en rojo. Los colecciono."',
        '"Has estudiado, ¿a que sí? Da igual. Siempre encuentro algo que tachar."',
        '"Perfecto, o nada. Son las dos únicas notas que pongo."'
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
      // Level 1 — El Cotilleo: nombra la trampa de leer la mente
      [
        '"...Lo has comprobado. Has ido y les has hablado."',
        '"Yo solo funcionaba mientras adivinabas lo que piensa la gente. Ese juego de adivinar — ese era yo."',
        '"Nadie sabe leer mentes. Ni siquiera yo. Sobre todo yo."'
      ],
      // Level 2 — El Foco: nombra el efecto foco
      [
        '"Te hacía sentir que la clase entera era una cámara apuntándote."',
        '"Pero te cuento mi secreto: cada uno va de protagonista en su propia película. De ti apenas tienen metraje."',
        '"Gira la cámara. La clase es solo una clase."'
      ],
      // Level 3 — El Pánico Escénico
      [
        '"Este escenario era mío. Fue mío primero."',
        '"Fui yo quien te hizo ensayar. Y ensayar otra vez. Porque si ensayabas suficiente, quizás estaría bien."',
        '"Todo este tiempo. Yo también tenía miedo."'
      ],
      // Level 4 — La Pluma Roja / El Folio en Blanco: perfeccionismo, nombrado
      [
        '"...Has respirado. Has releído la pregunta. Has vuelto."',
        '"Siempre te dije que o salía perfecto o no valía nada. Esa era la mentira."',
        '"Te lo preparaste, y seguiste escribiendo mientras yo gritaba. Eso es lo que significa ir preparado."'
      ],
      // Level 5 — La Ansiedad
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
      // Level 1 — El Cotilleo
      [ '"¿Has oído lo que dicen de ti? Yo sí. Todo."', '"Shhh. Shhh. ¿Lo notas? Están hablando de ti."', '"No puedes huir de lo que ya sabe todo el mundo."' ],
      // Level 2 — El Foco
      [ '"Ahora se te ve todo. Todo."', '"Eso. Justo eso. ¿Creías que no se iba a notar?"', '"No hay sitio donde sentarse que yo no ilumine."' ],
      // Level 3 — El Pánico Escénico
      [ '"Las piernas no te responden. Y el foco sigue en ti."', '"Texto borrado. Cabeza en blanco. Solo tú y la sala entera esperando."', '"Telón. Tu actuación ha terminado antes de empezar."' ],
      // Level 4 — La Pluma Roja (fase 1)
      [ '"Mal."', '"Rojo. Rojo. Rojo. ¿Ves cuánto rojo?"', '"Se acabó el tiempo. Bolis abajo. No has llegado."' ],
      // Level 5 — La Ansiedad
      [ '"¿Y si ya has gastado todo lo que tenías? ¿Y si no te queda suficiente?"', '"Sabías que iba a pasar. Tenías que haberte preparado más. Nunca estás suficientemente listo."', '"¿Te acuerdas del pasillo? ¿Del grupo? ¿Del escenario? ¿Del examen? No lo vas a olvidar."', '"Si me voy — ¿qué eres sin mí? Toda tu vida he estado aquí."' ],
    ],

    // ── Phase-2 attack flavors (solo jefes de dos fases) ──
    bossPhase2AttackFlavors: [
      null, null, null,
      [ '"En blanco. Lo tenías en la punta de la lengua y ya no está."', '"Bloqueado. El reloj avanza. Tú no."', '"¿Y si suspendes? ¿Y si eso lo confirma todo?"' ],
      null
    ],

    // ── Spark intro lines ─────────────────────────────────
    sparkIntros: [
      'Pasillo nuevo, caras nuevas. Tu cabeza se va a pasar el día adivinando lo que piensan de ti. Las suposiciones no son hechos. Vamos a comprobarlo.',
      'Un grupo es solo gente tan insegura como tú, sentada más junta. Acerca la silla — ese es todo el primer paso.',
      'Sé que este es difícil. Hacerlo, y que te vean hacerlo. Pero mira el foco — te está esperando, no te está cazando.',
      'Este es el grande. Así que recuerda: te lo has preparado. El corazón a mil es tu cuerpo presentándose a ayudar. Déjale.',
      'Todo esto lo construiste tú. Cada sala que hemos cruzado. No porque quisieras — porque sobrevivías. Pero ya no estás solo sobreviviendo.',
    ],

    // ── Level clear texts ─────────────────────────────────
    levelClearTexts: [
      'El Cotilleo ya no tiene de qué hablar.',
      'El Foco se ha apagado.',
      'El Pánico Escénico ha caído.',
      'La Pluma Roja se ha quedado sin tinta. Y el Folio en Blanco, en blanco.',
      '',
    ],
    levelClearTexts2: [
      'Nadie llevaba la cuenta. Y aun así has cruzado el pasillo entero.',
      'Has dicho tu idea en voz alta. No se ha hundido el techo.',
      'No hacía falta que el miedo se fuera. Has salido al escenario con él puesto.',
      'Has aprobado CON la ansiedad, no sin ella. Esa es la victoria grande.',
      '',
    ],

    // ── Spark clear lines (cada una acaba en misión del mundo real) ──
    sparkClearLines: [
      'Una menos. Misión secundaria para el mundo real: esta semana, hazle a alguien una pregunta pequeña. Y comprueba qué pasa de verdad.',
      'Has hablado y el grupo ha escuchado. Versión mundo real: esta semana di una idea en voz alta, así de imperfecta como esté.',
      'Tres menos. La próxima vez que el corazón se te acelere antes de algo grande, prueba a llamarlo "combustible". A ver si cambia el viaje.',
      'Has superado la sala más difícil. Queda una — y a esa no vamos a destruirla. Vamos a entrar a entenderla.',
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
      // Level 1 — El Primer Día (pasillo)
      l1n1: [
        '"Oye, ¿te has enterado de lo de —"',
        '"— sí, tío, me lo han contado esta mañana —"',
        '"— ¿y tú crees que fue por —"',
        '"— seguramente."',
        'Seguramente no hablaban de ti. Seguramente.'
      ],
      l1n2: [
        '"Ey. Nuevo, ¿no? Se te nota en cómo ibas escaneando el pasillo."',
        '"Un juego que hago los días malos: antes de hablar con alguien, apuesto qué probabilidad hay de que pase de mí. Y luego lo compruebo."',
        '"Mis apuestas dicen 90%. La realidad dice... casi nunca. Mi cabeza es malísima haciendo pronósticos."',
        '"Prueba una, venga. En el peor de los casos, te llevas datos."'
      ],
      l1n3: [
        'Te pillas mirándote en el cristal de la ventana. Comprobando qué pinta tienes. Otra vez.',
        'Tu cabeza lleva toda la mañana grabándote desde dentro.',
        'Prueba a girar la cámara: el pasillo, los carteles, las caras. Nadie te está grabando a ti.',
        'El que sigue andando — ese también eres tú.'
      ],
      // Level 2 — El Trabajo en Grupo (aula + biblioteca)
      l2n1: [
        '"Tenía la respuesta buena hace veinte minutos. Desde entonces estoy ensayando cómo decirla."',
        '"Si la digo mal, pensarán que no aporto. Si no digo nada, al menos no pasa nada."',
        '"...Aunque que no pase nada también es un resultado, ¿no?"',
        '"Vale. A la siguiente la digo mal. En voz alta. Mírame."'
      ],
      l2n2: [
        '"Registro de experimentos, entrada 14: el sujeto predijo que el grupo se reiría de su idea. Probabilidad declarada: 90%."',
        '"Resultado observado: dos asentimientos. Un \'buen apunte\'. Cero risas."',
        '"Error de predicción: 90 puntos. Conclusión: lo que falla es el pronóstico, no el sujeto."',
        '"...Queda un hueco libre para otro experimento. Lleva tu nombre."'
      ],
      l2n3: [
        '"Treinta y cuatro. Sí, ya — la mayor de la clase. Volví para terminar lo que dejé a medias."',
        '"La primera semana estaba convencida de que todos pensaban \'¿y esta qué hace aquí?\'. ¿Sabes cuánto me duró? Dos días. Luego era... una compañera más."',
        '"La gente va demasiado liada con lo suyo como para ir comentando lo tuyo."',
        '"Siéntate con nosotros si quieres. La silla vacía es peor que cualquier grupo."'
      ],
      // Level 3 — La Presentación (escenario)
      l3n1: [
        '"Cada noche. Cada noche pienso que me voy a quedar en blanco."',
        '"Y cada noche salgo a la luz del foco y digo mi texto igualmente."',
        '"El truco no es esperar a que se pase el miedo. Es salir con el miedo puesto."'
      ],
      l3n2: [
        'Te acercas al micro, justo al borde del foco.',
        'El corazón te martillea. No es una avería — es tu cuerpo mandando oxígeno al cerebro.',
        'El mismo motor sirve para el miedo y para las ganas. La etiqueta la eliges tú.',
        'A veces llegar hasta el micro ya es todo el discurso.'
      ],
      l3n3: [
        '"Para quien encuentre esta nota entre bambalinas:"',
        '"Actuar no es un examen. No es un veredicto. Es un regalo — imperfecto, presente, tuyo."',
        '"Sal ahí y dalo."',
        '"— El Director (que no ha salido sin miedo ni una sola vez)"'
      ],
      // Level 4 — El Examen Final (aula grande)
      l4n1: [
        '"Yo me siento en primera fila. Antes creía que era el único al que le tiemblan las manos cuando reparten los exámenes."',
        '"Luego miré alrededor. Media clase respira como si fuera a tirarse a una piscina fría."',
        '"Con las manos temblando también se escribe. Lo tengo comprobado. Todas las veces."'
      ],
      l4n2: [
        '"Soy una hoja de práctica. No cuento para nota. Precisamente para eso existo."',
        '"Cada pregunta que fallas conmigo es una que el examen de verdad pierde para siempre."',
        '"Ponte a prueba tú antes de que te ponga a prueba el examen."',
        '"...Práctica completada. Al de verdad le quedan menos sorpresas."'
      ],
      l4n3: [
        'Una nota sobre el pupitre, con una letra que casi reconoces:',
        '"No necesitas sentirte tranquilo para hacer esto. Necesitas hacerlo con lo que estés sintiendo."',
        '"Si te quedas en blanco: una exhalación larga, relee la pregunta, empieza por cualquier trozo que sepas."',
        '"— alguien que aprobó este examen muerto de miedo"'
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
      { text: 'Y si esto te pesa casi cada día,', style: 'narration', color: '#889999' },
      { text: 'hablarlo con alguien ayuda. Pedir ayuda', style: 'narration', color: '#889999' },
      { text: 'es una habilidad, no una derrota.', style: 'narration', color: '#889999' },
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
      { text: 'Ansimuz · Pipoya · Ninja Adventure · Junkala · Kenney', style: 'name', color: '#AABBCC' },
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
