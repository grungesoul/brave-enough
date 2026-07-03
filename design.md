# BRAVE ENOUGH
## Complete Game Design Document
### Version 1.0 — Single Source of Truth

---

## TABLE OF CONTENTS

1. Game Title & Logline
2. Story Overview
3. Player Setup
4. Ability System
5. Levels (Full Detail)
6. Dialogue Scripts
7. UI & Visual Design Notes
8. Game States
9. Audio Notes

---

---

# SECTION 1: GAME TITLE & LOGLINE

## Title
**Brave Enough**

## Tagline
*"You don't have to be fearless. You just have to take the next step."*

## Subtitle (shown on title screen beneath logo)
*A journey through the Mindscape*

## Genre Statement (internal reference)
Classic turn-based JRPG. Pixel art. Browser-native HTML5 Canvas. Emotional tone: validating, never preachy. The game never tells the player anxiety is "no big deal" — it says anxiety is real, heavy, and survivable.

---

---

# SECTION 2: STORY OVERVIEW

## The Hero

A teenager — 15 to 17 years old, gender unspecified in all dialogue (refer only as "you" in narration, or by the player-entered name). The hero attends a regular high school. They are not dramatically special. They are smart enough, kind enough, trying hard enough — but everything feels like it costs twice what it should. Raising their hand in class is a negotiation with their own heartbeat. Walking down a crowded hallway is a gauntlet. The thought of standing in front of people makes their chest feel like a closing fist.

They have always gotten through things. That's the quiet tragedy: they've been "fine" for years. But fine is not the same as free.

## The Mindscape

One evening, the hero falls asleep at their desk — homework unfinished, test tomorrow, three unread texts on their phone. The world goes dark. When they open their eyes, they are standing at the entrance to a dungeon — or what looks like one.

This is the **Mindscape**: the inner world of the hero's mind, made visible. The anxieties they have been carrying — the exam dread, the fear of judgment, the stage terror, the suffocating certainty that everyone is watching and finding them wanting — have crystallized into a dungeon. Five chambers. Five guardians. One final boss at the heart of it all.

A small glowing figure — the **Spark**, a fragment of the hero's own self-belief — appears and speaks: *"You've been running from these rooms for a long time. Tonight, we walk through them."*

The hero has no choice but to go forward.

## Emotional Arc Across 5 Levels

**Level 1 — The Exam Room (Performance Anxiety: Fear of Failure)**
The hero begins afraid of being wrong, of being exposed as not-smart-enough. The dungeon here is a crushing, ink-stained classroom. Beating the boss means accepting: mistakes are data, not verdicts.

**Level 2 — The Hallway (Social Anxiety: Fear of Judgment)**
The crowd feels like a jury. Every pair of eyes is a sentence being passed. Beating the boss means understanding: most people are too busy with their own fear to be looking at you. And the ones who are — their opinions are not your cage.

**Level 3 — The Sports Field (Performance Anxiety: Fear of Public Failure)**
The spotlight is physical here. It burns. Beating the boss means realizing: your effort is not the same as your worth. You can fail in front of everyone and still be whole.

**Level 4 — The Stage (Social + Performance: Fear of Being Seen)**
This is where both anxieties fuse. The theater is a place where failure is witnessed. Beating the boss means discovering: being seen is not the same as being destroyed. You are allowed to exist in front of people.

**Level 5 — The Mindscape Core (The Root of All Anxiety)**
The final chamber. Here the architecture breaks down — it is surreal, half-beautiful and half-terrible. The boss is not an external fear. It is a dark mirror image of the hero themselves: Anxiety in its truest form. Beating it does not mean destroying it. It means making peace with it — seeing it clearly, naming it, and choosing to act anyway.

## The Ending

The hero wakes up at their desk. The homework is still unfinished. The test is still tomorrow. But something has shifted. The Spark lingers — a small warm light in their chest. They open their notebook. They begin to write.

The final text on screen: *"You were brave enough."*

---

---

# SECTION 3: PLAYER SETUP

## Title Screen Flow

1. Title screen animates in (pixel-art logo, atmospheric background, see Section 7)
2. Title screen narration lines appear one at a time (see Section 6)
3. Player presses ENTER or clicks START
4. Name entry screen appears

## Name Entry Screen

**Prompt text:** *"What is your name, traveler?"*

- Single text input field, pixel-art styled, max 12 characters
- Accepts letters, numbers, hyphens, apostrophes
- Default placeholder: cursor blink only (no default name — the game waits)
- After entry, the Spark says: *"[NAME]. That's a name worth remembering."*
- Confirm button: "Begin" (or ENTER key)
- Name is stored and used in all subsequent boss dialogue and the final victory speech

## Starting Stats

| Stat | Starting Value | Description |
|------|---------------|-------------|
| Courage Points (CP) | 100 / 100 | The hero's HP equivalent. Represents emotional resilience. Hits from bosses drain CP. Reaching 0 means Game Over. |
| Calm (MP) | 50 / 50 | The hero's MP equivalent. Powers special abilities. Restores partially each new battle (10 Calm restored at battle start). Does NOT restore fully between battles — resource management matters. |

## CP / Calm Restoration Between Levels

When a boss is defeated, the hero gains a **Level Clear Restoration**:
- CP restored to full (100)
- Calm restored to full (50)

This happens narratively as the Spark says a healing line. There is no mid-level restoration except via Breathe Deep.

## Starting Abilities

The hero begins with 2 abilities:
1. **Breathe Deep** (Calm ability)
2. **Speak Up** (Attack ability)

New abilities unlock after each boss defeat (see Section 4).

---

---

# SECTION 4: ABILITY SYSTEM

## Overview

All abilities are used in battle via a menu. The battle action menu shows:
- FIGHT (opens ability submenu)
- BREATHE (always available, same as Breathe Deep — costs 5 Calm, minor restore)
- ITEM (not in this game — removed for scope)
- RUN (always available — returns to level intro; costs nothing but is marked as "retreat, not defeat")

## Complete Ability Table

---

### ABILITY 1: BREATHE DEEP
- **Unlock:** Available from the start
- **Type:** Recovery / Defense
- **MP Cost:** 5 Calm
- **In-game flavor text:** *"Slow the breath. Slow the spiral. The fear is there — but so are you."*
- **Mechanical effect:**
  - Restores 15 Calm to the hero
  - Grants +5 Defense buff for 2 turns (displayed as "Grounded" status)
  - Deals 0 damage to the enemy
- **Visual:** Soft blue-white pulse radiates from the hero sprite. Small particle swirls (breath wisps) float upward.
- **Notes:** This is the hero's safety valve. Players who are panicking about losing will instinctively reach for it. Let them.

---

### ABILITY 2: SPEAK UP
- **Unlock:** Available from the start
- **Type:** Attack
- **MP Cost:** 8 Calm
- **In-game flavor text:** *"Say the thing. Say it out loud. A voice, even shaking, is still a voice."*
- **Mechanical effect:**
  - Deals 20–28 CP damage to the enemy (randomized in range)
  - Slight chance (15%) to apply "Heard" status to enemy — reduces enemy's Dread stat by 5 for 2 turns
- **Visual:** A bright pixel-art speech bubble erupts from the hero, expands, and crashes into the boss. The text inside reads "…!" in pixel font.
- **Notes:** Starter attack. Simple, reliable, thematically anchors the game's core message.

---

### ABILITY 3: REFRAME
- **Unlock:** After defeating Level 1 boss (The Red Pen)
- **Type:** Attack / Debuff
- **MP Cost:** 12 Calm
- **In-game flavor text:** *"A bad grade is not a bad life. A wrong answer is not a wrong person. Look again."*
- **Mechanical effect:**
  - Deals 18–25 CP damage to the enemy
  - Reduces enemy Dread (attack stat) by 10 for 3 turns (displayed as "Reframed" status on enemy)
  - If the enemy is already "Reframed," extends the duration by 2 turns instead of dealing extra damage
- **Visual:** The hero sprite extends a hand; a small glowing lens appears. Light bends through it. The boss briefly shows distorted, less threatening colors (desaturated for 1 second).
- **Notes:** Tactically important in Level 2 and onward. Teaches the player that weakening the enemy's power over you is a valid strategy.

---

### ABILITY 4: FIND YOUR PEOPLE
- **Unlock:** After defeating Level 2 boss (The Whisper)
- **Type:** Summon / Ally
- **MP Cost:** 15 Calm
- **In-game flavor text:** *"You were never supposed to do this alone. Nobody is."*
- **Mechanical effect:**
  - Summons a **Friend Ally** for 1 turn
  - The Friend deals 25–35 CP damage to the enemy (their attack is called "Got Your Back")
  - Additionally: restores 10 CP to the hero when they appear
  - Cannot be used twice in a row (the Friend is "still catching their breath" — ability grayed out for 1 turn after use)
- **Visual:** A second pixel-art character silhouette appears beside the hero — intentionally simple, gender-neutral, small. They raise a hand toward the boss. After their action they give the hero a fist-bump animation and fade.
- **Notes:** The friend character does NOT have a name. They are whoever the player imagines. This is intentional.

---

### ABILITY 5: BELIEVE IN YOURSELF
- **Unlock:** After defeating Level 3 boss (The Spotlight)
- **Type:** Heavy Attack / Self-Heal
- **MP Cost:** 20 Calm
- **In-game flavor text:** *"Not because you're certain. Not because it's easy. Because you choose to."*
- **Mechanical effect:**
  - Deals 35–45 CP damage to the enemy (the highest single-target damage in the game)
  - Simultaneously restores 20 CP to the hero
  - Has a 20% chance to cause "Inspired" status on the hero — next attack costs 0 Calm
- **Visual:** Hero sprite flashes golden-white. A star-like burst radiates outward from the hero's chest. The attack launches as a wave of light. Screen briefly dims except for the hero and the burst.
- **Notes:** This is the mid-game power spike moment. The player should feel genuinely powerful using it for the first time. Worth it.

---

### ABILITY 6: BREAK FREE
- **Unlock:** After defeating Level 4 boss (Stage Fright)
- **Type:** Ultimate Attack
- **MP Cost:** 30 Calm
- **In-game flavor text:** *"All of it — the fear, the shame, the weight of every 'what if' — gone. You are more than all of it."*
- **Mechanical effect:**
  - Deals 50–65 CP damage to the enemy (massive — intended as a finisher)
  - Applies "Shattered" status to the enemy: reduces both Dread and Focus by 15 for the remainder of the battle
  - If used when the hero's CP is below 30, damage increases to 65–80 (desperation bonus, called "Desperate Courage")
  - After use, hero gains "Radiant" status for 2 turns: all other abilities cost 5 less Calm
- **Visual:** Full-screen animation: the hero rises, the dungeon background cracks like glass, light floods through. The attack is a full-body luminous strike. The boss recoils dramatically. This is the most visually elaborate attack in the game.
- **Notes:** Reserved for the final boss. The MP cost (30) means the player must have been managing Calm carefully. Make them feel they earned it.

---

## Ability Unlock Summary Table

| After Defeating | Ability Unlocked |
|----------------|-----------------|
| Game Start | Breathe Deep, Speak Up |
| Level 1 Boss (Red Pen) | Reframe |
| Level 2 Boss (The Whisper) | Find Your People |
| Level 3 Boss (The Spotlight) | Believe In Yourself |
| Level 4 Boss (Stage Fright) | Break Free |
| Level 5 Boss (Anxiety) | Game complete |

---

---

# SECTION 5: LEVELS (FULL DETAIL)

---

## LEVEL 1: THE EXAM ROOM

### Setting Description (for sprite artist)

**Mood:** Oppressive, institutional, shrinking. The room feels too small and too large at the same time.

**Color palette:** Deep grays (#2A2A35), sickly fluorescent yellow-green (#B8CC60), white paper white (#F0EEE0), red ink (#CC2222). The lighting is harsh overhead fluorescent — no warmth, no shadows that comfort. Everything is edges.

**Tile types needed:**
- Gray linoleum floor tiles with subtle crack details
- Rows of wooden school desks (darker brown, scratched, worn)
- Chalkboard (dark green-black, covered in equations and red X marks that were NOT written by the hero — they are the room's oppression, not the student's mistakes)
- Tall windows with bars of shadow (venetian blinds, partially open)
- Clock on the wall — stuck at 2 minutes to the hour, hands trembling
- Overhead fluorescent lights — flickering slightly (animated, 1-second flicker loop, subtle)
- Stacks of papers on every desk — all marked with red ink

**Ambient animation:** Papers rustle without wind. The clock ticks audibly in visual feedback (a pixel-tick animation on the second hand, no sound). Red ink drips slowly from the board.

**Navigation:** Hero enters from the left. Three NPC encounters spaced across the room. Boss at the far right, in front of the chalkboard.

---

### Story Beat

The hero enters the Mindscape and immediately recognizes where they are: the worst classroom they've ever sat in. Not a real classroom — a feeling of classroom. Every wrong answer they've ever given. Every test returned face-down. Every teacher's pause before saying "close, but..." lives in the walls here.

The Spark says: *"This room has been in your head a long time, hasn't it? Let's clear it out."*

---

### NPC Encounters (Level 1)

**NPC 1: The Anxious Echo**
- Appearance: A translucent, slightly-see-through version of the hero, hunched over a desk, writing and erasing, writing and erasing
- Location: First desk row
- Dialogue:
  > "If I get this wrong, they'll know I don't belong here."
  > "They'll all see. They'll all know I've been faking this whole time."
  > [HERO NAME] pause.
  > "...Is that what you think too?"
  > *(The Echo looks up, surprised anyone spoke to them. Then fades.)*

**NPC 2: The Hall Monitor of Mistakes**
- Appearance: A stiff, rigid figure in a gray uniform, clipboard in hand, face blank
- Location: Midway through the room, blocking the aisle
- Dialogue:
  > "Infraction logged. Wrong answer on page three. Incorrect approach on question seven."
  > "Your margin notes suggest confusion. Confusion has been noted."
  > [Hero choice: RESPOND or STEP PAST]
  > [RESPOND]: "I'm still learning." → Hall Monitor pauses. Writes something. Steps aside.
  > [STEP PAST]: Hall Monitor does not react. Also steps aside.
  > *(Both choices work. The player cannot be blocked here.)*

**NPC 3: The Encouraging Scrawl**
- Appearance: A piece of paper on a desk, glowing faintly. The message on it is handwritten in warm gold ink.
- Location: Desk just before the boss
- Interaction: Approach and read
- Text: *"Hey. I've seen you in here before. You always make it out. — Someone who's rooting for you"*
- Mechanical effect: Restores 10 Calm when read

---

### Boss: THE RED PEN

**Full Name:** The Red Pen, Arbiter of Errors

**Visual Description (for sprite artist):**
- A massive, oversized fountain pen — roughly 4x the height of the hero sprite
- Deep crimson body (#8B0000) with a black nib that drips red ink constantly
- The pen is not rigid — it moves, it bends, it looms. The tip is sharp and ink-wet.
- Two eyes sit near the top clip of the pen: cold, white, oval, pupil-less — like correction marks
- When attacking: the pen slashes forward with a stroke motion, leaving red ink trails in the air that fade over 0.5 seconds
- When taking damage: the pen recoils, ink spatters upward, a small "X" appears and dissolves
- When defeated: the pen cracks lengthwise, ink floods out, it falls — and the ink spreads into letters that read *"…good enough."* before dissolving

**Boss Stats:**
| Stat | Value |
|------|-------|
| HP (Courage Points it has) | 120 |
| Dread (attack power) | 18 |
| Focus (defense) | 10 |

**Boss Attacks:**

1. **Red Mark** (single-target, Dread-based)
   - The pen strikes a slash across the screen, landing on the hero
   - Damage: 12–18 CP
   - Flavor: *"Wrong."*

2. **Corrections Due** (damage + debuff)
   - The pen writes a word above the hero's head: "INSUFFICIENT"
   - Damage: 8 CP + applies "Marked" debuff: hero's next attack deals 30% less damage
   - Duration: 1 turn
   - Flavor: *"Let me show you all the ways you fell short."*

3. **Final Exam** (heavy attack, used at ≤40 HP)
   - The pen writes furiously — the screen fills with red X marks that then converge on the hero
   - Damage: 20–26 CP
   - Flavor: *"Time's up. You weren't ready. You were never ready."*

**Boss Dialogue (Taunts During Battle):**
1. *"Every wrong answer you've ever given lives in this room. I counted them."*
2. *"You studied, didn't you? And you still don't know enough. You never know enough."*
3. *"What will they think when they see your score? What will that say about you?"*

**Boss Defeat Dialogue:**
> *"I... I just wanted you to be prepared. I didn't want you to be embarrassed. I only ever..."*
> *(The pen's voice drops. It sounds almost tired.)*
> *"...I only ever wanted you to get it right."*
> *(A long pause. Then, very quietly:)*
> *"Maybe right doesn't have to mean perfect."*

---

### Victory Reward
- **New ability unlocked:** Reframe
- **Story beat:** The red ink on the chalkboard fades. Where the X marks were, the board now shows a simple equation — incomplete, but no longer threatening. The Spark floats over and touches the hero's chest. *"One room down. And look — you're still here."*
- **CP and Calm:** Fully restored

### Transition Text to Level 2
> *The Exam Room dissolves behind you. The walls rearrange themselves into something else — something louder, more crowded, more watching.*
> *The Hallway.*

---

---

## LEVEL 2: THE HALLWAY

### Setting Description (for sprite artist)

**Mood:** Overstimulated, exposed, watched. The kind of social dread where your own footsteps sound too loud.

**Color palette:** Institutional beige-yellow (#D4C4A0), cold blue-gray lockers (#6B8FAB), shadow-purple (#3D3050) for the crowd figures, warm spotlight gold (#FFD166) only in small isolated patches (the "safe zones"), deep shadow at the periphery.

**Tile types needed:**
- Checkered tile floor (beige/gray alternating, perspective-corrected for depth illusion)
- Rows of metal lockers on both sides — tall, dented, some hanging open
- Overhead fluorescent lighting (same as Exam Room, continuity)
- Ceiling tiles — low, pressing, visible
- Crowd background layer: silhouettes of students, 2D, flat, semi-transparent purple-gray. They do not move individually — they shift as a mass, subtly, like a slow current
- Eyes: embedded in the crowd silhouettes — small white oval shapes that track the hero's X position (they rotate to follow — this is the hallway's signature horror)
- Lockers have messages scratched into them (flavor text, readable on approach): *"everyone saw," "nice try," "don't look"*

**Ambient animation:** The crowd silhouettes sway gently. The eyes track the hero. Whisper-text floats from the crowd in small pixel-font bubbles that drift upward and fade — illegible except for one word each: *"look," "weird," "why," "them"* — rotating through slowly.

**Navigation:** Hero moves right. NPC encounters placed near locker clusters. Boss at the end of the hall, near a set of double doors.

---

### Story Beat

The hero has barely recovered when the Hallway materializes. This is the daily gauntlet — the 47 steps from math class to lunch that feel like walking across a stage. Every pair of eyes in every crowd is a judgment being formed. Every whisper might be about them.

The Spark stays close: *"I know this one. This is the one where everything feels like it's about you. Keep walking."*

---

### NPC Encounters (Level 2)

**NPC 1: The Gossiping Silhouettes**
- Appearance: Two crowd-figure silhouettes huddled together, leaning in, faces toward each other — but both pairs of white oval eyes swing toward the hero as they approach
- Location: Early in the hall
- Dialogue (the silhouettes speak but their voices are overlapping, hard to parse):
  > SHADOW A: *"Oh — "*
  > SHADOW B: *"— yeah, I saw —"*
  > SHADOW A: *"— do you think they —"*
  > SHADOW B: *"— probably."*
  > *(They fall silent and separate as the hero passes. They were probably not talking about the hero at all. Probably.)*

**NPC 2: The Friend at a Locker**
- Appearance: A warm-toned silhouette — not purple-gray like the crowd, but a gentle amber (#E8A44A), slightly glowing. They are alone at a locker.
- Location: Midway
- Dialogue:
  > "Hey. You look like you're having one of those days."
  > "I have them too. Like everything is just... a lot."
  > [If player chose RESPOND in NPC 1 Hall Monitor equivalent]: "Walk with me for a second. It's easier when you don't feel like the only one."
  > *(The Friend walks with the hero to the next point, then pauses at a classroom door.)*
  > "I gotta go in here. But hey — you've got this."
  > *(They disappear into the classroom. A brief warmth lingers.)*
- Mechanical effect: Restores 5 CP

**NPC 3: The Mirror Locker**
- Appearance: One locker with a small mirror inside the open door. The hero sees their own reflection — but the reflection looks more frightened than they feel.
- Location: Near the end of the hall, before the boss
- Interaction: Approach and look
- Text sequence:
  > *Your reflection looks back at you.*
  > *It looks scared.*
  > *You realize: the scared one is also you. The brave one walking forward is also you.*
  > *They are the same person.*
- Mechanical effect: Restores 8 Calm

---

### Boss: THE WHISPER

**Full Name:** The Whisper, Crowd-Voice Incarnate

**Visual Description (for sprite artist):**
- A roiling, shifting mass of shadow — roughly humanoid but constantly changing shape, as if made of condensed crowd silhouettes pressing against each other
- Color: Deep shadow-purple (#3D3050) with veins of sickly yellow-green (#B8CC60) light pulsing through it like bioluminescence
- Multiple mouths appear and disappear across its surface — pixel-art lips, opening and closing, some visible mid-taunt
- Eyes: dozens of small white oval eyes that open and close across the whole form — never more than 6 visible at once, never the same position twice
- When attacking: a wave of shadowy arms extends from the mass, gesturing, pointing — the arms leave trails of whisper-text
- When taking damage: the form destabilizes, some of the mouths scream silently, parts of it scatter and reconverge
- When defeated: the mass collapses inward, the mouths all open at once, and the whispers become one clear sentence before everything fades

**Boss Stats:**
| Stat | Value |
|------|-------|
| HP | 140 |
| Dread | 22 |
| Focus | 12 |

**Boss Attacks:**

1. **What Did They Say** (psychic attack, damage + status)
   - A wave of whisper-text washes over the hero — illegible but overwhelming
   - Damage: 15–20 CP + applies "Rattled" status: hero's Calm-gaining effects (like Breathe Deep) are 50% less effective for 2 turns
   - Flavor: *"Heard the one about you? It's not good."*

2. **Eyes On You** (high-Dread single attack)
   - Every eye on the boss opens simultaneously and focuses on the hero
   - Damage: 20–28 CP
   - Flavor: *"Everyone. Is. Watching."*

3. **The Rumor Mill** (heavy AoE-feeling attack, used at ≤50 HP)
   - Shadow hands spread across the screen, pointing in from all edges — the hero is surrounded
   - Damage: 25–32 CP
   - Also reduces hero's Focus (defense) by 8 for 2 turns
   - Flavor: *"You can't outrun what everyone already knows."*

**Boss Dialogue (Taunts During Battle):**
1. *"They looked at you in the hallway today. Did you notice? They all looked. Right at you."*
2. *"What are you going to do — speak up? Perfect. Give them more material."*
3. *"Even if you win here, they'll still be watching. They'll always be watching."*

**Boss Defeat Dialogue:**
> *"I'm not... I'm not separate from you, you know."*
> *(The mass reforms briefly into something smaller, less threatening.)*
> *"I was just every time you felt unseen and then suddenly seen, and it hurt. Every time you walked into a room and felt the air change. I'm what that feels like."*
> *"I wasn't trying to ruin you. I was trying to warn you. I just... didn't know how to stop."*

---

### Victory Reward
- **New ability unlocked:** Find Your People
- **Story beat:** The hallway goes quiet. The eyes in the lockers close. The crowd silhouettes turn away — not hostile now, just people going somewhere. The Spark: *"You hear that? Silence. Real silence. You did that."*
- **CP and Calm:** Fully restored

### Transition Text to Level 3
> *The crowd thins. The lockers give way to open air — too much open air. Grass under your feet. Bleachers rising. The roar of something like a crowd, but outside.*
> *The Sports Field.*

---

---

## LEVEL 3: THE SPORTS FIELD

### Setting Description (for sprite artist)

**Mood:** Exposed, overlit, stadium-huge. The vast-ness is part of the dread. You are a small thing in a large, watched space.

**Color palette:** Night-sky navy (#0D1B2A), stadium light white-gold (#FFF5CC), artificial turf green (#3A7D44), bleacher gray (#8A8A9A), track rust-red (#8B3A2A), spotlight cone (#FFFACD with 60% opacity — the cone of light visible in air).

**Tile types needed:**
- Artificial turf tiles (slightly shiny, grid-lined)
- Running track border tiles (rubber texture, rust-red)
- Bleacher seating rising on both sides — rows of gray seats filled with the same crowd-silhouettes from Level 2, but now in stadium rows, stretching up into darkness
- Massive stadium lights on poles — four visible, two active, casting hard-edged cones of light
- The playing field itself is enormous — the hero sprite is noticeably small relative to the environment
- A scoreboard in the background: no score displayed, just blinking "---" on both sides
- Field lines marked in white — perspective lines that draw the eye toward the boss encounter zone

**Ambient animation:** The bleacher crowd sways slowly. The stadium lights flicker occasionally. The scoreboard blinks. Distant crowd noise should be conveyed visually — crowd silhouettes occasionally raise arms (pixel-art "cheer" animation, slow, collective, unsettling in its silence).

**Navigation:** Hero enters from a tunnel on the left. Field stretches right. NPC encounters on the track. Boss in the center of the field, in the main spotlight.

---

### Story Beat

This field is every try-out, every gym class, every moment when the body was supposed to perform and the mind made it impossible. The pressure here is physical — the lights are genuinely hot (heat shimmer animation above the hero), the eyes in the bleachers are constant.

The Spark: *"They're all here. Every face you've ever tried not to disappoint. But look — look at the ground under your feet. It's still the same ground. You can still stand on it."*

---

### NPC Encounters (Level 3)

**NPC 1: The Teammate on the Bench**
- Appearance: A hunched figure in sports gear, sitting on the sideline bench, elbows on knees, head down. Warm amber tone like the Level 2 Friend — maybe even the same silhouette.
- Location: Near the tunnel entrance
- Dialogue:
  > "I threw up before the last game. Actual vomit. Coach saw."
  > "I still had to go on. So I did."
  > "I didn't play great. We still won, actually, but I didn't do much."
  > "Still counts, right? Showing up still counts?"
  > *(Hero does not respond — this is a statement, not a question. The Teammate pulls their knees up and watches the field.)*

**NPC 2: The Whistle**
- Appearance: A referee figure — stark black and white stripes, face obscured by the brim of a cap, holding a stopwatch
- Location: On the track, blocking the path to the field
- Dialogue:
  > "Clock's running."
  > "You're being evaluated."
  > "Every second is being recorded. Every stumble. Every hesitation."
  > [Hero: Step forward]
  > *(The Whistle blows — but the sound is silent. It just puffs a visual burst. The referee steps aside.)*
  > "...Performance noted."
  > *(Their tone is not cruel. Just clinical. And somehow that's worse.)*

**NPC 3: The Left-Behind Trophy**
- Appearance: A small, dented trophy sitting at the edge of the field. A small flame burns inside it — warm gold, not threatening.
- Location: Field edge before center
- Interaction: Approach and examine
- Text:
  > *The engraving reads: "For trying when it was terrifying."*
  > *There's no name on it.*
  > *Maybe it was meant for someone like you.*
- Mechanical effect: Restores 10 Calm

---

### Boss: THE SPOTLIGHT

**Full Name:** The Spotlight, Exposer of Imperfections

**Visual Description (for sprite artist):**
- A massive, hovering orb of concentrated light — not a gentle light, a burning, clinical, surgical light that misses nothing
- Core color: Blinding white (#FFFFFF) at center, fading to harsh yellow (#FFE566), fading to hot orange (#FF8C42) at the halo edges
- The orb has no face — but it has a lens. A large, dark glass eye at its center: a camera aperture design (bladed iris, mechanical, cold)
- Around the orb: shadow tentacles — the parts of the hero the light has thrown into shadow. They writhe and reach.
- When attacking: the lens focuses, the cone narrows to a beam, it burns
- When taking damage: the lens cracks slightly (each hit adds a crack line), the light flickers, the shadow tentacles recoil
- When defeated: the lens shatters completely, the light explodes in all directions — a burst of warmth, not harm — and the shadow tentacles fall still

**Boss Stats:**
| Stat | Value |
|------|-------|
| HP | 155 |
| Dread | 25 |
| Focus | 14 |

**Boss Attacks:**

1. **Exposed** (burn damage + debuff)
   - The lens focuses directly on the hero — a searing white beam
   - Damage: 18–24 CP + applies "Scrutinized" status: hero's CP and Calm values are displayed larger and more prominently for the turn (visual intimidation — no mechanical change, but it feels heavier)
   - Flavor: *"Everyone can see you now. Everything."*

2. **Magnified Flaw** (targeted high-damage strike)
   - The light finds one thing — a specific pixel of the hero sprite — and expands it, zooms in, makes it enormous
   - Damage: 22–30 CP
   - Flavor: *"That. Right there. Did you think nobody would notice that?"*

3. **Total Illumination** (boss's heavy attack, used at ≤55 HP)
   - The orb expands to fill the arena — every shadow burned away, nowhere to stand that isn't lit
   - Damage: 28–36 CP
   - Also applies "Overexposed" status: reduces hero's Focus by 10 for 2 turns
   - Flavor: *"There is no hiding. There has never been any hiding. I see all of it."*

**Boss Dialogue (Taunts During Battle):**
1. *"Look at them watching you. Look at all those eyes. You can't perform when you're being watched, can you?"*
2. *"Your form is wrong. Your timing is off. They're all noticing. They're all keeping score."*
3. *"What if you fall? Right here? In front of all of them? What then?"*

**Boss Defeat Dialogue:**
> *"I only wanted to help you improve. If you can see every flaw, you can fix every flaw."*
> *(A beat. The lens flickers.)*
> *"That's what I told myself. That I was making you better."*
> *"But you weren't a project. You were a person."*
> *(The light softens — genuinely softer, not a trick — for just a moment.)*
> *"I'm sorry I forgot that."*

---

### Victory Reward
- **New ability unlocked:** Believe In Yourself
- **Story beat:** The stadium lights go out one by one. The bleachers empty. The field is quiet and dark and just... a field. The Spark lands on the hero's shoulder. *"Three down. Look how far you've come from that first room."*
- **CP and Calm:** Fully restored

### Transition Text to Level 4
> *The field folds away. The ground becomes wooden boards — a stage floor, old and resonant under every step.*
> *Curtains ahead. A light beyond them. The low murmur of an audience.*
> *The Stage.*

---

---

## LEVEL 4: THE STAGE

### Setting Description (for sprite artist)

**Mood:** Theatrical, beautiful, and deeply frightening. The stage is gorgeous — it makes you want to be on it and flee from it in the same breath. The beauty is part of the trap.

**Color palette:** Deep velvet red-purple (#4A1535) for the curtains, warm gold (#C9A84C) for the footlights, deep stage black (#0A0A12) for the wings and audience, dusty wood-plank brown (#8B6914) for the stage floor, soft spotlight pale (#F5EFDF) for the center-stage light.

**Tile types needed:**
- Wooden stage plank flooring (horizontal plank tiles, slightly worn, with stage tape marks in white)
- Tall velvet curtains on both sides, framing the view — slightly transparent at the edges to show shadow beyond
- Footlights along the stage front: a row of warm amber orbs at floor level
- A backdrop painting: a painted scene of a nighttime city, slightly faded and cracked — the kind you'd see in a school play
- Audience: the same crowd silhouettes, now seated in rows receding into infinite darkness beyond the stage edge. The darkness of the audience is complete — you cannot see where the audience ends.
- A single microphone stand, stage center: silver, tall, very old
- Stage wings (left and right entrances): pure shadow with occasional dim light

**Ambient animation:** The curtains billow gently in no wind. The footlights flicker like candles. The audience silhouettes shift — they lean forward, as if anticipating. The stage boards creak (visual: hairline crack animation at the hero's feet, subtle).

**Navigation:** Hero enters from stage left (left wing). Three NPC encounters across the stage. Boss manifests at stage center, at the microphone.

---

### Story Beat

This is the fusion level — both anxieties present, fully, simultaneously. The hero must perform AND be seen. The audience is real here — the fullest crowd yet. But the Spark says something different this time:

*"I know this is the hardest one. Both things at once — the doing and the watching. But you know something? You've done four other hard things. And you know something else? The stage is yours. They can't take that."*

---

### NPC Encounters (Level 4)

**NPC 1: The Actor in the Wings**
- Appearance: A figure in costume — elaborate, a bit worn, paint on their face, clearly a theatrical character. Warm amber tone. They are pacing in the stage wing.
- Location: Stage wing, left
- Dialogue:
  > "Every single night. Every single night I feel like I'm going to forget my lines."
  > "And every night I walk out there and say them anyway."
  > "The trick is — you don't wait for the fear to leave. You walk out while it's still there."
  > *(They straighten their costume, take a breath, and walk out onto the stage — not into the hero's path, but off into another part of the stage. They perform, briefly, for no one. It's beautiful.)*

**NPC 2: The Empty Microphone**
- Appearance: The microphone stand, center stage, alone. A dim spotlight on it.
- Location: Stage center-left
- Interaction: Approach the microphone. Choose to speak.
  > [HERO NAME] steps up to the microphone.
  > [SPEAK]: The hero says... nothing. But the act of stepping up sends a ripple through the audience. The crowd silhouettes sit straighter. Something in the air changes.
  > *You don't have to say anything perfect. Sometimes just showing up at the mic is the whole point.*
- Mechanical effect: Restores 15 CP and 10 Calm

**NPC 3: The Director's Note**
- Appearance: A folded piece of paper on a music stand near stage right, illuminated by a thin beam of light
- Location: Before the boss, stage right
- Interaction: Read the note
- Text:
  > *"To whoever finds this:*
  > *A performance is not a test. It is not a verdict. It is a gift — imperfect, present, given.*
  > *Go give yours.*
  > *— The Director (who has never, not once, been unafraid)"*
- Mechanical effect: Restores 12 Calm

---

### Boss: STAGE FRIGHT

**Full Name:** Stage Fright, the Freezing Specter

**Visual Description (for sprite artist):**
- A tall, wispy specter — clearly once humanoid, now stretched and distorted into something elongated and theatrical: it wears the tattered remains of a stage costume (opera-esque, grand, decayed)
- Color: Ghostly pale blue-white (#C8E6F5) with deep shadow-black (#0A0A12) at the edges, patches of the velvet red-purple from the curtains (#4A1535) like wounds in its form
- Face: a theater mask — or rather, two masks layered: comedy over tragedy, but the comedy mask has slipped, and the tragedy face beneath is the real one, and it is terrified
- When attacking: it expands upward, filling the top of the screen, and cold blue mist rolls down toward the hero
- When taking damage: parts of the costume disintegrate, the tragedy mask shows more clearly, the cold mist wavers
- When defeated: the specter collapses to a small point of blue-white light, the masks both fall from its face, and beneath them is just a figure, small, ordinary, scared — before it dissolves

**Boss Stats:**
| Stat | Value |
|------|-------|
| HP | 170 |
| Dread | 28 |
| Focus | 16 |

**Boss Attacks:**

1. **Stage Freeze** (paralysis-adjacent, debuff + damage)
   - Cold blue mist floods the stage around the hero's feet
   - Damage: 16–22 CP + applies "Frozen" status: hero cannot use Breathe Deep for 2 turns (the fear has seized the very act of calming)
   - Flavor: *"Your legs aren't working. Your mouth won't open. They're all watching you stand there and do nothing."*

2. **The Blank Mind** (heavy attack, debuff)
   - The specter places both hands to its mask — and everything in the hero's mind goes white
   - Damage: 22–30 CP + removes the hero's "Grounded" buff if active (takes away any existing Breathe Deep defense bonus)
   - Flavor: *"Line forgotten. Everything forgotten. Just you and a thousand waiting eyes."*

3. **Curtain Call** (devastating attack, ≤60 HP)
   - The stage curtains begin to close — the specter throws them like wings
   - Damage: 30–38 CP
   - Also applies "Silenced" status: hero's Speak Up ability costs 5 more Calm for 2 turns
   - Flavor: *"Your performance is over. It never really began."*

**Boss Dialogue (Taunts During Battle):**
1. *"Everyone came to see you. Look at them, waiting. What are you going to give them? This?"*
2. *"Forget the next line. Forget what you were going to say. Forget why you're here. That feeling — that's me. I live there."*
3. *"You'll never be ready. There is no ready. There is only the terror, forever."*

**Boss Defeat Dialogue:**
> *"The stage was mine. This was my stage first."*
> *(The specter is smaller now, and its voice is smaller.)*
> *"I'm the one who made you rehearse. And rehearse. And rehearse. Because if you rehearsed enough, maybe... maybe it would be okay. Maybe they wouldn't see how scared you were."*
> *"All this time. I was just scared too."*

---

### Victory Reward
- **New ability unlocked:** Break Free
- **Story beat:** The stage curtains open fully — all the way. The audience is gone. Beyond the stage, through where they sat, is a vast and beautiful darkness, scattered with small lights like stars. The Spark is brighter than it's been. *"One more. The last one. And I want you to know — when we get there, you don't have to destroy it. You just have to understand it."*
- **CP and Calm:** Fully restored

### Transition Text to Level 5
> *The stage becomes unreal. The wood softens, the light bends, the architecture stops making sense.*
> *You are going somewhere that has never had walls — and has always had them.*
> *You are going to the center of yourself.*
> *The Mindscape Core.*

---

---

## LEVEL 5: THE MINDSCAPE CORE

### Setting Description (for sprite artist)

**Mood:** Surreal, liminal, beautiful and terrible and deeply personal. This is the inside of the hero's mind — not a metaphor anymore, the literal architecture of their psyche. It is both the most frightening and the most stunning place in the game.

**Color palette:** This level uses ALL prior palette colors, fragmentarily — they appear in tiles and light shafts as memory: exam-room fluorescent green (#B8CC60), hallway shadow-purple (#3D3050), stadium light gold (#FFD166), stage velvet red-purple (#4A1535). Underlying everything: deep void black (#050508) and bioluminescent teal (#00C2B5) — this is the hero's core color, their truest self-shade.

**Tile types needed:**
- Floor: cracked mirror tiles — each tile shows a reflection of a different memory (exam desk, locker, bleacher seat, stage board). As the hero walks, the reflection under each step cracks and reforms.
- Walls: not walls, exactly — they are columns of light in different colors, translucent, shifting. The space feels open and contained simultaneously.
- Ceiling: absent. The above is pure void with stars made of the bioluminescent teal — like neurons firing.
- Floating geometric shapes: the memories of the game — small pixel-art thumbnails of the Exam Room, Hallway, Sports Field, and Stage drift slowly past in the mid-ground
- Central path: a corridor of slightly brighter floor tiles leads the hero forward, clearly, even as the rest of the space is disorienting
- At the end: a large, still, mirror — floor to ceiling, perfectly black. The hero sees their own sprite reflected. Then the reflection starts to change.

**Ambient animation:** The mirror tiles pulse slowly. The floating memories rotate gently. The teal neuron-stars above flicker independently. The column walls shift their colors slowly. The overall effect is meditative and strange — like a dream that hasn't decided to be a nightmare yet.

**Navigation:** Linear path — fewer NPCs here. The Mindscape Core is more internal. 2 encounters only, then the boss.

---

### Story Beat

There are no school rooms here. No crowds. No fields or stages. Just the mind, made visible, and the hero walking through it.

The Spark is at its brightest and its quietest. *"You built this place. Every room we walked through — you built them. Not because you wanted to. Because you were surviving. This is what surviving looks like."*

*"But you're not just surviving anymore."*

The hero walks to the mirror. Their reflection stares back. Then it steps out.

---

### NPC Encounters (Level 5)

**NPC 1: The Memory**
- Appearance: A translucent figure that cycles through the appearances of all four prior NPCs — the Echo, the Friend, the Teammate, the Actor — slowly morphing, not settling
- Location: Early in the Core
- Dialogue:
  > *(Each line is spoken by a different face in the cycle)*
  > "You were never as alone as it felt."
  > "Every person who ever helped you — they were part of you too. You let them in."
  > "That's brave."
  > *(The figure completes one full cycle and then simply... smiles. Every face at once. And dissolves into the teal neuron-light above.)*
- Mechanical effect: Restores 20 CP and 15 Calm (the largest restore of any NPC)

**NPC 2: The Spark's Full Form**
- Appearance: The Spark, who has been a small glowing shape throughout the game, briefly manifests a fuller form here — a warm, human-shaped light, not quite a person, not quite not
- Location: Just before the final mirror/boss
- Dialogue:
  > "I've been with you the whole time. Do you know what I am?"
  > "I'm the part of you that wanted to keep going. That's all."
  > "Every time you got up after something knocked you down — that was me. That was YOU."
  > "I'm not separate. I never was."
  > *(The Spark reaches toward the hero. The hero's sprite glows softly for a moment.)*
  > "Whatever that mirror shows — remember what I am. Remember what YOU are."
  > *(The Spark reduces back to its small form. But it's brighter now. The brightest it's been.)*
- Mechanical effect: Fully restores CP and Calm (the only mid-final-level restore in the game — because the player needs it, and because it's earned)

---

### Boss: ANXIETY

**Full Name:** Anxiety — The Dark Mirror, the Final Form

**Visual Description (for sprite artist):**
- The boss is the hero. Or rather: a dark mirror image of the hero sprite, corrupted.
- Same dimensions, same pose — but the colors are inverted: where the hero is warm, this is cold; where the hero glows teal-gold, this pulses dark-purple and shadow.
- Around the Dark Mirror: a corona of all the previous boss elements — a faint red pen scratch pattern, whisper-text floating in rings, a spotlight corona at the edges, a theater-mask fragment overlaying its face
- The face: the hero's own face, but the expression is one of exhaustion — not malice. Tired. So tired. The anxiety is not an enemy — it is the hero's exhausted coping, given form.
- When attacking: it moves like the hero would move — same animations — but in cold shadow colors, with a slight delay (an echo that arrives a moment late, slightly off)
- When taking damage: pieces of the corona fall away — first the whisper-text, then the spotlight, then the pen marks, then the theater mask. The Dark Mirror becomes less composite with each hit.
- When defeated: the dark mirror cracks, not violently, but like ice in warm water — slowly, gently — and beneath the cracks, the same teal-gold warmth from the hero and the Spark shines through. The final image before victory: the hero's sprite and the mirror sprite, face to face, both glowing, both cracks and light at once.

**Boss Stats:**
| Stat | Value |
|------|-------|
| HP | 200 |
| Dread | 32 |
| Focus | 20 |

**Special mechanic — Mirror Adaptation:** Every 3 turns, the Dark Mirror "adapts" — it gains a temporary buff equal to the hero's most-used ability's element. This forces the player to vary their strategy. (Implementation note: track which ability the player has used most; give the boss +10 defense against that ability's damage type for 3 turns when Mirror Adaptation triggers.)

**Boss Attacks:**

1. **What If** (psychic damage + morale drain)
   - The Dark Mirror speaks — its mouth moves, and a wave of "What if" questions erupts as text in the air, surrounding the hero
   - Text fragments visible: *"what if you fail," "what if they laugh," "what if it's too late," "what if you're wrong"*
   - Damage: 20–26 CP + reduces hero's Calm by 8 (directly costs MP)
   - Flavor: *"What if you've already used your best moves? What if you don't have enough left?"*

2. **You Should Have Known Better** (targeted strike, self-doubt attack)
   - The mirror extends a hand, same gesture as Believe In Yourself — but aimed at the hero
   - Damage: 25–32 CP + applies "Doubt" status: Believe In Yourself costs 5 more Calm for 2 turns
   - Flavor: *"You knew this was coming. You should have been ready. You're never ready enough."*

3. **The Spiral** (devastating multi-hit, used at ≤80 HP)
   - The Dark Mirror fragments briefly into all four prior bosses' silhouettes — the exam room red pen, the whisper mass, the spotlight, the specter — and they all strike in sequence
   - Each hit: 12–16 CP (4 hits — total potential 48–64 CP damage)
   - Flavor between hits: *"Remember the exam?" / "Remember the hallway?" / "Remember the field?" / "Remember the stage?"*
   - Flavor final: *"You'll never stop remembering."*

4. **Mirror Break** (desperation attack, used at ≤30 HP)
   - The Dark Mirror cracks itself — uses its own damage to fuel one last enormous attack
   - Damage: 35–45 CP
   - But: afterward, Dread is reduced by 20 permanently (the desperate attack weakened it)
   - Flavor: *"If I go — what are you without me? I've been with you your whole life."*

**Boss Dialogue (Taunts During Battle):**
1. *"I know every move you're going to make. I AM you."*
2. *"All this bravery — it's just another performance, isn't it? Another thing to fail at."*
3. *"I'm the reason you survived this long. Without me, who keeps you safe?"*

**Boss Defeat Dialogue:**
> *(The Dark Mirror is cracking. The cracks glow teal-gold.)*
> *"You know I'm not going away. You know that, right?"*
> *(A silence. Then:)*
> *"...Good. You know. You've always known."*
> *"I'll still be there. Before big things. Before the things that matter. I'll be there."*
> *"But maybe... maybe you'll remember this. That you kept walking anyway."*
> *"Maybe next time, when you feel me coming, you'll recognize me. And you'll breathe."*
> *(The mirror cracks completely. The teal-gold light floods out. The Dark Mirror is gone — not destroyed. Just... quiet.)*
> *"...You were brave enough."*

---

### Victory Reward
- No new ability (the hero is complete)
- **Story beat:** The Mindscape Core fills with light. All the colors from all five levels bloom together — a moment of full chroma, overwhelming warmth. The Spark rises from the hero's chest, expands, fills the screen — and resolves into the hero's own reflection, smiling, in the now-healed mirror.
- **Full victory sequence triggers (see Section 6 — Final Victory Speech)**

---

---

# SECTION 6: DIALOGUE SCRIPTS

## Title Screen Intro Narration

*(Lines appear one at a time, centered on screen, pixel font, white text on dark background. Each line fades in over 0.8 seconds, holds for 2.5 seconds, then fades as the next appears.)*

> *Every night, the fear comes.*
> *The test tomorrow. The crowd tomorrow. The thing you have to say, out loud, in front of everyone.*
> *You've been carrying this for a long time.*
> *Tonight, finally, you walk through it.*

*(After the fourth line, the game logo pulses in — "BRAVE ENOUGH" — and the START prompt appears.)*

---

## Name Entry Prompt

> *"What is your name, traveler?"*
> *(Text field appears. Cursor blinks.)*

After name entered and confirmed — Spark line:
> *"[NAME]. That's a name worth remembering."*

---

## Level Intro Narrations

*(Each appears as text over a fade-in of the level's environment. Pixel font, atmospheric.)*

**Level 1 — The Exam Room:**
> *The smell of chalk and cold air.*
> *Every mistake you've ever made lives here.*
> *Let's find out what they weigh.*

**Level 2 — The Hallway:**
> *Thirty-seven steps. Feels like three hundred.*
> *Every eye a judgment, every whisper a verdict.*
> *But you've been through exam rooms before.*
> *Keep walking.*

**Level 3 — The Sports Field:**
> *The lights are too bright here.*
> *They find every stumble, every slip, every moment you're not quite good enough.*
> *Good thing you're not here to be perfect.*

**Level 4 — The Stage:**
> *The curtain is about to rise.*
> *They're all waiting. The audience of everything you've ever feared.*
> *On a night like this, just walking out is the performance.*

**Level 5 — The Mindscape Core:**
> *No more rooms. No more crowds.*
> *Just you, and the shape of every fear you've ever had, waiting at the center of everything.*
> *This is where it started.*
> *This is where it ends.*

---

## NPC Encounter Dialogue (Full Scripts)

All NPC encounters are written in full in Section 5. Reference the per-level NPC sections above. Below are the complete scripts extracted for dev use:

### Level 1 NPCs

**The Anxious Echo:**
> "If I get this wrong, they'll know I don't belong here."
> "They'll all see. They'll all know I've been faking this whole time."
> *(pause)*
> "...Is that what you think too?"

**Hall Monitor of Mistakes:**
> "Infraction logged. Wrong answer on page three. Incorrect approach on question seven."
> "Your margin notes suggest confusion. Confusion has been noted."
> [RESPOND]: "I'm still learning."
> *Hall Monitor pauses. Writes something. Steps aside.*
> [STEP PAST]: *Hall Monitor does not react. Steps aside.*

**The Encouraging Scrawl:**
> "Hey. I've seen you in here before. You always make it out. — Someone who's rooting for you"

### Level 2 NPCs

**Gossiping Silhouettes:**
> SHADOW A: "Oh — "
> SHADOW B: "— yeah, I saw —"
> SHADOW A: "— do you think they —"
> SHADOW B: "— probably."

**The Friend at a Locker:**
> "Hey. You look like you're having one of those days."
> "I have them too. Like everything is just... a lot."
> "Walk with me for a second. It's easier when you don't feel like the only one."
> *(later)* "I gotta go in here. But hey — you've got this."

**The Mirror Locker:**
> *Your reflection looks back at you.*
> *It looks scared.*
> *You realize: the scared one is also you. The brave one walking forward is also you.*
> *They are the same person.*

### Level 3 NPCs

**The Teammate on the Bench:**
> "I threw up before the last game. Actual vomit. Coach saw."
> "I still had to go on. So I did."
> "I didn't play great. We still won, actually, but I didn't do much."
> "Still counts, right? Showing up still counts?"

**The Whistle:**
> "Clock's running."
> "You're being evaluated."
> "Every second is being recorded. Every stumble. Every hesitation."
> *(Hero steps forward. Whistle puffs. Steps aside.)*
> "...Performance noted."

**The Left-Behind Trophy:**
> *The engraving reads: "For trying when it was terrifying."*
> *There's no name on it.*
> *Maybe it was meant for someone like you.*

### Level 4 NPCs

**The Actor in the Wings:**
> "Every single night. Every single night I feel like I'm going to forget my lines."
> "And every night I walk out there and say them anyway."
> "The trick is — you don't wait for the fear to leave. You walk out while it's still there."

**The Empty Microphone:**
> *[HERO NAME] steps up to the microphone.*
> *You don't have to say anything perfect. Sometimes just showing up at the mic is the whole point.*

**The Director's Note:**
> "To whoever finds this:"
> "A performance is not a test. It is not a verdict. It is a gift — imperfect, present, given."
> "Go give yours."
> "— The Director (who has never, not once, been unafraid)"

### Level 5 NPCs

**The Memory:**
> "You were never as alone as it felt."
> "Every person who ever helped you — they were part of you too. You let them in."
> "That's brave."

**The Spark's Full Form:**
> "I've been with you the whole time. Do you know what I am?"
> "I'm the part of you that wanted to keep going. That's all."
> "Every time you got up after something knocked you down — that was me. That was YOU."
> "I'm not separate. I never was."
> "Whatever that mirror shows — remember what I am. Remember what YOU are."

---

## Boss Battle Taunts

*(These lines cycle during battle — displayed as text above the boss sprite in the boss's color palette, pixel font, brief pop-in animation)*

**The Red Pen:**
1. "Every wrong answer you've ever given lives in this room. I counted them."
2. "You studied, didn't you? And you still don't know enough. You never know enough."
3. "What will they think when they see your score? What will that say about you?"

**The Whisper:**
1. "Heard the one about you? It's not good."
2. "What are you going to do — speak up? Perfect. Give them more material."
3. "Even if you win here, they'll still be watching. They'll always be watching."

**The Spotlight:**
1. "Look at them watching you. Look at all those eyes. You can't perform when you're being watched, can you?"
2. "Your form is wrong. Your timing is off. They're all noticing. They're all keeping score."
3. "What if you fall? Right here? In front of all of them? What then?"

**Stage Fright:**
1. "Everyone came to see you. Look at them, waiting. What are you going to give them? This?"
2. "Forget the next line. Forget what you were going to say. Forget why you're here. That feeling — that's me. I live there."
3. "You'll never be ready. There is no ready. There is only the terror, forever."

**Anxiety (Final Boss):**
1. "I know every move you're going to make. I AM you."
2. "All this bravery — it's just another performance, isn't it? Another thing to fail at."
3. "I'm the reason you survived this long. Without me, who keeps you safe?"

---

## Boss Defeat Lines

*(Displayed in a text box after battle ends, before Level Clear screen. The tone is never triumphant here — these are moments of understanding, not humiliation.)*

**The Red Pen:**
> "I... I just wanted you to be prepared. I didn't want you to be embarrassed. I only ever..."
> "...I only ever wanted you to get it right."
> *(A long pause. Then, very quietly:)*
> "Maybe right doesn't have to mean perfect."

**The Whisper:**
> "I'm not... I'm not separate from you, you know. I was just every time you felt unseen and then suddenly seen, and it hurt. Every time you walked into a room and felt the air change. I'm what that feels like."
> "I wasn't trying to ruin you. I was trying to warn you. I just... didn't know how to stop."

**The Spotlight:**
> "I only wanted to help you improve. If you can see every flaw, you can fix every flaw."
> "But you weren't a project. You were a person."
> "I'm sorry I forgot that."

**Stage Fright:**
> "The stage was mine. This was my stage first."
> "I'm the one who made you rehearse. And rehearse. And rehearse. Because if you rehearsed enough, maybe it would be okay. Maybe they wouldn't see how scared you were."
> "All this time. I was just scared too."

**Anxiety (Final Boss):**
> "You know I'm not going away. You know that, right?"
> "...Good. You know. You've always known."
> "I'll still be there. Before big things. Before the things that matter. I'll be there."
> "But maybe... maybe you'll remember this. That you kept walking anyway."
> "Maybe next time, when you feel me coming, you'll recognize me. And you'll breathe."
> "...You were brave enough."

---

## Level Clear Fanfare Text

*(Displayed on Level Clear screen, over the background of the cleared level — now quieter, softer-lit. One or two lines, large pixel font, warm color.)*

**Level 1 Clear:**
> "The Red Pen is quiet now."
> "One room cleared. You are still here."

**Level 2 Clear:**
> "The Whisper has no voice left."
> "The hallway is just a hallway."

**Level 3 Clear:**
> "The Spotlight has dimmed."
> "You didn't need to be perfect. You just needed to show up."

**Level 4 Clear:**
> "Stage Fright has fallen."
> "The curtain is yours now. All of it is yours."

**Level 5 Clear / Final:**
> *(This transitions directly to Final Victory — no separate level clear text)*

---

## Final Victory Speech

*(Full-screen event. Background: the healed Mindscape Core, warm teal-gold light. The hero sprite stands in the center. The Spark, now large and bright, hovers beside them. Text appears in a text box, the Spark's voice — or the game's voice — speaking directly to the player. Lines appear one at a time.)*

> "[NAME]."
> "You walked through five rooms that most people spend their whole lives walking around."
> "Every boss, every taunt, every moment you thought you didn't have enough left — and you kept going."
> "Anxiety is not a monster you destroyed tonight. It'll come back. Big tests, crowded rooms, stages and spotlights — it'll come back."
> "But you know something now that you didn't know before: you have walked through it. Once. And once is enough to know you can again."
> "There is no finish line for brave. There is just today, and the next step, and the next breath."
> "You were brave enough."

*(After the last line, the screen holds for 3 seconds. Then: a cascade of teal-gold particle stars falls from the top of the screen. The hero sprite raises their arms. The word BRAVE ENOUGH appears in the largest pixel font in the game.)*

*(After 5 seconds: the scene shifts to the WAKING UP scene — the hero at their desk, the homework, the night outside. A single small teal-gold light glows in the hero's chest sprite.)*

*(Then: CREDITS)*

---

## Ending Credits Narration

*(Credits roll — simple pixel-art credit scroll against a clean dark background with faint neuron-star animations. These lines appear above the credits, cycling slowly.)*

> *Anxiety is real. What you feel is real.*
> *You don't have to beat it. You just have to take the next step.*
> *If the things in this game felt familiar — that's because they are. You're not alone in them.*
> *And if you ever need someone to walk through a room with you — there are people who will.*
> *(Small, quiet:) You were brave enough. You still are.*

---

---

# SECTION 7: UI & VISUAL DESIGN NOTES

## Color Palettes Per Level

| Level | Primary | Secondary | Accent | Dread/Boss Color |
|-------|---------|-----------|--------|-----------------|
| Title Screen | #050508 (void black) | #00C2B5 (teal) | #FFD166 (gold) | — |
| Level 1 (Exam Room) | #2A2A35 (deep gray) | #B8CC60 (fluorescent green-yellow) | #F0EEE0 (paper white) | #CC2222 (red ink) |
| Level 2 (Hallway) | #D4C4A0 (institutional beige) | #6B8FAB (locker blue-gray) | #3D3050 (shadow purple) | #3D3050 + #B8CC60 (boss mix) |
| Level 3 (Sports Field) | #0D1B2A (night navy) | #3A7D44 (turf green) | #FFD166 (stadium light gold) | #FFFFFF + #FF8C42 (spotlight) |
| Level 4 (Stage) | #4A1535 (velvet red-purple) | #8B6914 (stage wood) | #C9A84C (footlight gold) | #C8E6F5 + #0A0A12 (specter) |
| Level 5 (Core) | #050508 (void black) | #00C2B5 (teal) | All prior accent colors | Dark invert of hero colors |
| Victory Screen | #050508 base → floods with #00C2B5 and #FFD166 | | | |

---

## Battle Screen Layout

```
┌─────────────────────────────────────────────────────────┐
│  LEVEL NAME (top-left, small pixel font)                │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   [BOSS SPRITE — top-right quadrant, large]             │
│        Boss HP bar (red, below boss name)                │
│        Boss name text                                    │
│                                                          │
│                     [BATTLE FIELD BG — level-themed]    │
│                                                          │
│   [HERO SPRITE — bottom-left quadrant, smaller]         │
│                                                          │
├─────────────────────────────────────────────────────────┤
│  [NAME] CP: ████████░░  100/100    CALM: ████░░  50/50  │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────┐   │
│  │  > FIGHT          BREATHE                        │   │
│  │    [ability list when FIGHT selected]            │   │
│  │    RUN                                           │   │
│  └──────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│  [Battle log — last 2 lines of action text, scrolling]  │
└─────────────────────────────────────────────────────────┘
```

**Pixel grid:** 480x270 base resolution, scaled up to browser window. Integer scaling only (no anti-aliasing).

**Sprite sizes:**
- Hero sprite: 32x48px base (width x height)
- Boss sprites: 64x80px to 96x96px (boss-specific, see Section 5)
- NPC sprites: 24x32px base

---

## Health and MP Bar Styling

**Courage Points (CP) Bar:**
- Bar container: dark gray border (#1A1A24), 2px rounded pixel corners
- Full health fill color: brave green (#4CAF70)
- Medium health (50-30%): amber-yellow (#FFB347)
- Low health (below 30%): warning red (#E84040)
- The transition between colors should be instant (no gradient between states — pixel-sharp)
- Depleting animation: the bar drains left-to-right in the direction of the drain, briefly flashes white before settling
- Restoring animation: bar fills with a pulse of warm gold before settling to its health color

**Calm (MP) Bar:**
- Full calm fill color: teal (#00C2B5)
- Medium calm (50-25%): dusty blue (#6B9EC4)
- Low calm (below 25%): pale gray-blue (#A0B4C2) (calm is running thin)
- Depleting animation: small bubble particles drift upward from the depleted section
- Restoring animation: ripple effect across the bar

**Status Effects display:**
- Small icon + text label below the CP/Calm bars
- Hero statuses: green for buffs (Grounded, Inspired, Radiant), amber for debuffs (Marked, Rattled, Frozen, Doubt)
- Enemy statuses: display above boss HP bar, small pill labels: teal for debuffs on enemy (Reframed, Heard, Shattered)

---

## Victory Celebration Screen

**Trigger:** After the final boss defeat dialogue concludes.

**Sequence:**
1. **Screen flash** — full-screen white flash, 0.2 seconds, then clears to the Mindscape Core background (now warm, healed)
2. **Hero sprite center** — hero stands, arms at sides. Over 1 second, arms raise (simple 2-frame animation loop — arms lift, hold)
3. **Particle cascade** — teal and gold particles (#00C2B5, #FFD166) fall from the top of the screen in three waves, starting dense and spacing out. Particles are 2x2px stars and 4x4px sparks. Duration: 8 seconds, continuous
4. **Title emerge** — BRAVE ENOUGH appears in the largest font used in the game (32px pixel font), letter by letter, center screen, gold (#FFD166) with teal shadow offset (#00C2B5, 2px right, 2px down)
5. **Final Victory Speech text box** — appears after the title is fully displayed, runs through all 7 lines with player input between each (press ENTER or click to advance)
6. **Waking up scene** — fade to black, then fade to: hero at desk, night, lamp, homework. Small teal point of light in the hero's chest. Holds for 4 seconds.
7. **Credits roll**

**Screen background during victory:** The void-black (#050508) of the Mindscape Core, but now veined with teal light-rivers — like the mirror tiles healed. The neuron-stars above are active, bright, celebrating.

**No music cue described** (see Section 9), but visually: everything should feel expansive, warm, and earned. This is not a flashy celebration. It is a quiet, profound, real one.

---

---

# SECTION 8: GAME STATES

The frontend must handle exactly these game states. Each state has a defined entry condition, exit condition, and active UI elements.

---

## STATE: TITLE

**Entry:** Game first loads.
**Active UI:** Animated title background (pixel-art logo, atmospheric particles), narration text overlay, START prompt.
**User input:** Any key or click to proceed.
**Exit → NAME_ENTRY:** User presses start.

---

## STATE: NAME_ENTRY

**Entry:** After TITLE.
**Active UI:** Text prompt, text input field, confirm button.
**Validation:** 1–12 characters, no empty submission.
**Spark response line:** Appears after confirmation.
**User input:** Keyboard text entry + ENTER or click to confirm.
**Exit → LEVEL_INTRO:** Name confirmed.
**State data set:** `playerName` string.

---

## STATE: LEVEL_INTRO

**Entry:** After NAME_ENTRY (Level 1), or after LEVEL_CLEAR (Levels 2-5).
**Active UI:** Level environment background, narration text overlay (2-3 lines, advance with input), level name display.
**User input:** Any key or click to advance narration lines.
**Exit → EXPLORATION:** All narration lines shown and advanced.
**State data:** current level number, which narration lines to show.

---

## STATE: EXPLORATION

**Entry:** After LEVEL_INTRO.
**Active UI:** Level environment, hero sprite, NPC sprites. Hero can move left/right. Approach an NPC to trigger dialogue. Dialogue displayed in text box at bottom.
**NPC dialogue:** Advance with ENTER or click. Some NPCs have branching choice (see Level 1 Hall Monitor).
**Mechanical triggers:** Some NPCs restore CP/Calm on interaction (see Section 5). These trigger immediately on NPC dialogue completion.
**Exit → BATTLE:** Hero reaches boss trigger zone (right edge of level, beyond all NPCs).
**State data:** which NPCs have been spoken to (for tracking progress), current CP/Calm values.

---

## STATE: BATTLE

**Entry:** Hero reaches boss trigger zone in EXPLORATION.
**Entry animation:** Brief boss intro — boss sprite slides in, brief shake effect, boss name displayed large then recedes to normal battle position.
**Active UI:** Full battle screen (see Section 7 layout). Boss sprite, hero sprite, CP/Calm bars, status effects, action menu, battle log.
**Action menu states:**
- Root menu: FIGHT, BREATHE, RUN
- FIGHT submenu: list of unlocked abilities with CP costs. Grayed-out if insufficient Calm.
- BREATHE: shortcut for Breathe Deep (always available)
- RUN: triggers RUN confirmation dialog ("Retreat? Your progress this level will be preserved, but the battle must be started fresh." → YES/NO)

**Turn order:** Hero acts first each round. Boss acts second. Boss uses attacks on a defined rotation with randomized damage within range.
**Defeat condition:** Hero CP reaches 0 → GAME_OVER state.
**Victory condition:** Boss HP reaches 0 → boss defeat dialogue sequence → ability unlock cutscene → LEVEL_CLEAR state.
**State data:** Boss current HP, hero current CP and Calm, active status effects (hero and boss), turn counter, ability use tracking (for boss Mirror Adaptation in Level 5), boss attack rotation index.

---

## STATE: LEVEL_CLEAR

**Entry:** After boss defeat dialogue sequence completes.
**Active UI:** Level environment (now brightened/calmed — reuse assets with lighting adjustment), Level Clear fanfare text, ability unlock display (new ability name, flavor text, mechanical description shown in a card popup), CP/Calm restored to full (animated).
**Ability unlock display:** Full ability card: name, icon, flavor text, mechanical effect. User presses ENTER to dismiss.
**User input:** ENTER or click to proceed.
**Exit → LEVEL_INTRO** (for next level) or **FINAL_VICTORY** (after Level 5 boss).

---

## STATE: GAME_OVER

**Entry:** Hero CP reaches 0 in BATTLE.
**Entry animation:** Hero sprite falls (simple 2-frame: upright → slumped). Screen desaturates. Gentle dark vignette closes in.
**Active UI:** GAME OVER text (not harsh — pixel-art, but not RED DEATH SCREEN — softer, dimmer). Two options displayed: TRY AGAIN (restart the current battle, restoring CP/Calm to pre-battle values) and RETURN TO TITLE.
**Tone note:** The game should not shame the player for a Game Over. The Spark says: *"It's okay. Breathe. We try again."* before the options appear.
**TRY AGAIN:** Returns to BATTLE state, same boss, CP/Calm restored to values at battle start (NOT full — if the player had used resources before the battle, those are gone. This is intentional — resource management matters).
**RETURN TO TITLE:** Returns to TITLE state. Progress is lost (this is a small game — no save system needed).
**State data:** Preserved: current level, current boss. Restored: CP to battle-start value, Calm to battle-start value.

---

## STATE: FINAL_VICTORY

**Entry:** After Level 5 boss defeat dialogue sequence completes.
**Active UI:** Full victory celebration sequence (see Section 7). Then: final victory speech text box (7 lines, player advances each). Then: waking-up scene.
**User input:** ENTER or click to advance victory speech lines. Final ENTER after waking-up scene → CREDITS.
**No exit back to gameplay — this is terminal (game complete).**

---

## STATE: CREDITS

**Entry:** After FINAL_VICTORY scene completes.
**Active UI:** Scrolling credits (names/roles — placeholder for dev to fill), credits narration lines cycling above the scroll, neuron-star particle background.
**Speed:** Credits scroll at comfortable reading pace (approximately 60px per second at base resolution).
**User input:** ENTER or click to skip to end of credits (jumps to final frame of credits, holds 3 seconds, then loops to TITLE).
**After credits:** Return to TITLE state (fresh start).

---

---

# SECTION 9: AUDIO NOTES

*There are no audio files in this game. All sound-equivalent feedback must be conveyed through visual animation. This section defines what the "feel" of each audio moment is and how to translate it into canvas/CSS animation.*

---

## General Principle

Sound conveys immediacy and emotional texture. In the absence of sound, **timing, screen shake, flash, particle density, and color shift** carry these roles. Every "sound" described below is a visual directive.

---

## "Music" Equivalents by Level

**Title Screen — feel: quiet, lonely, hopeful**
- Slow particle drift (downward, sparse, teal) with occasional teal pulse on the logo
- No high-frequency visual movement — everything breathes slowly
- Star-pixel particles, 0.5px/frame drift speed

**Level 1 (Exam Room) — feel: tense, clockwork dread**
- Clock-tick animation (second hand micro-jump) at regular 1-second intervals
- Fluorescent light flicker: random interval 8-15 seconds, duration 3 frames
- Papers rustle: 1-2 paper sprites rotate slightly (±2°) in a slow sine wave

**Level 2 (Hallway) — feel: murmuring crowd, psychic noise**
- Whisper-text particles float upward from crowd silhouettes (slow, low opacity)
- Crowd silhouettes sway on a 4-second sine cycle
- Eyes in crowd track hero X position with a 0.3-second delay

**Level 3 (Sports Field) — feel: stadium electricity, too much light**
- Stadium light cones flicker slightly (±5% brightness on a random 3-7s cycle)
- Crowd in bleachers raises arms periodically (mass wave animation, 10-15 second intervals)
- Scoreboard blinks: "---" pulses at 2-second intervals

**Level 4 (Stage) — feel: theatrical tension, held breath**
- Curtains billow: gentle sine wave (period 6 seconds, amplitude 4px at curtain edge)
- Footlights flicker like candles: independent 2-4s random intervals, ±10% brightness
- Stage board creak: hairline crack animation at hero feet, appears briefly (0.5s) then fades

**Level 5 (Mindscape Core) — feel: profound, otherworldly, interior**
- Neuron-star particles above fire independently and randomly (teal, 2x2px, brief flash)
- Memory fragments (floating level thumbnails) rotate gently on independent axes
- Mirror tiles pulse: slow brightness cycle (4s period, ±15% brightness)

---

## Battle "Sound Effects" as Visual Events

| Event | Visual Equivalent |
|-------|------------------|
| Hero attacks | Brief screen flash (1 frame, white), hero sprite lunges forward 8px then snaps back |
| Boss attacks | Screen shake (±4px horizontal, 3 frames) + brief color tint (boss's accent color, 0.2s) |
| Hero takes damage | Hero sprite flashes red (alternating, 4 frames), CP bar drains with white flash |
| Boss takes damage | Boss sprite inverts color briefly (2 frames), boss HP bar shakes |
| Breathe Deep | Soft blue-white radial pulse from hero, no screen shake |
| Speak Up | Screen flash white, speech bubble expands rapidly then contracts |
| Reframe | Hero extends hand, lens particle effect (geometric), boss briefly desaturates |
| Find Your People | Second sprite materializes (fade-in, 0.5s), warm amber pulse when they attack |
| Believe In Yourself | Full hero flash (gold-white, 3 frames), radial star burst, screen dims briefly |
| Break Free | Full-screen crack animation (background fragments), hero luminous burst, screen-wide flash |
| Level up / ability unlock | Card popup with glow border pulse, three small star particles orbit the card |
| Boss defeat | Boss sprite collapses (pixel art animation, 4-6 frames), then fades to black, defeat dialogue text box appears |
| Game Over | Screen desaturates over 1 second, hero falls (2-frame animation), vignette closes |
| Victory | White flash → particle cascade (see Section 7) → warm scene |

---

## Battle Action Selection

| Action | Visual Feedback |
|--------|----------------|
| Hovering over menu item | Item text brightens (#FFD166), cursor pixel flickers |
| Selecting action | Brief menu flash (white border, 2 frames), menu closes |
| Ability unavailable (not enough Calm) | Item is gray, cursor bounces back from it (2px recoil), a small "NOT ENOUGH CALM" text appears in the battle log |

---

## Transition Animations Between States

| Transition | Animation |
|-----------|-----------|
| TITLE → NAME_ENTRY | Cross-fade (0.5s) |
| NAME_ENTRY → LEVEL_INTRO | Fade to black (0.5s), fade in on level |
| LEVEL_INTRO → EXPLORATION | Text fades out, hero sprite fades in on left side |
| EXPLORATION → BATTLE | Boss slides in from right (0.4s), battle layout snaps into place |
| BATTLE → LEVEL_CLEAR | Boss defeat animation, screen brightens (level's healed palette), clear fanfare text fades in |
| LEVEL_CLEAR → LEVEL_INTRO | Fade to black (0.5s), fade in on next level |
| Any → GAME_OVER | Desaturate + vignette (1s) |
| GAME_OVER → BATTLE (retry) | Brief flash, battle layout re-initializes |
| Level 5 clear → FINAL_VICTORY | Extended: Mindscape Core brightens dramatically (2s), particle cascade begins |
| FINAL_VICTORY → CREDITS | Waking-up scene, fade to black, credits roll begins |
| CREDITS → TITLE | Fade to black (1s), title screen fades in |

---

---

# APPENDIX: QUICK REFERENCE TABLES

## Boss Quick Reference

| Level | Boss | HP | Dread | Focus | Reward |
|-------|------|----|-------|-------|--------|
| 1 | The Red Pen | 120 | 18 | 10 | Reframe |
| 2 | The Whisper | 140 | 22 | 12 | Find Your People |
| 3 | The Spotlight | 155 | 25 | 14 | Believe In Yourself |
| 4 | Stage Fright | 170 | 28 | 16 | Break Free |
| 5 | Anxiety | 200 | 32 | 20 | (Game complete) |

## Ability Quick Reference

| Ability | Unlock | Cost | Effect |
|---------|--------|------|--------|
| Breathe Deep | Start | 5 Calm | +15 Calm restore, +5 Defense 2 turns |
| Speak Up | Start | 8 Calm | 20–28 damage, 15% Dread debuff |
| Reframe | Level 1 | 12 Calm | 18–25 damage, -10 Dread 3 turns |
| Find Your People | Level 2 | 15 Calm | Ally deals 25–35 + heals 10 CP |
| Believe In Yourself | Level 3 | 20 Calm | 35–45 damage + 20 CP heal |
| Break Free | Level 4 | 30 Calm | 50–65 damage (65–80 low HP) + shatters both stats |

## NPC CP/Calm Restores

| Level | NPC | Restore |
|-------|-----|---------|
| 1 | Encouraging Scrawl (paper) | +10 Calm |
| 2 | Friend at Locker | +5 CP |
| 2 | Mirror Locker | +8 Calm |
| 3 | Left-Behind Trophy | +10 Calm |
| 4 | Empty Microphone | +15 CP, +10 Calm |
| 4 | Director's Note | +12 Calm |
| 5 | The Memory | +20 CP, +15 Calm |
| 5 | The Spark's Full Form | Full CP + Calm restore |

---

*End of Document.*
*Version 1.0 — Brave Enough Game Design Document*
*All content is original. All character names, level designs, boss mechanics, and dialogue are original creative work specific to this project.*
