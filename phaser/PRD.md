# PRD — Brave Enough / Tienes Madera (Phaser 3 rebuild)

Rebuild of the anxiety-themed JRPG as a proper tile-based Phaser 3 game, modeled on the LennyRPG process (PRD → POC → features → polish → ship). This document is the contract: what must survive the rebuild unchanged, and what changes.

## What we preserve (from the original game, source of truth = root `game.js` + `design.md` + `translations.js`)

- **Story**: an unnamed teen (player enters name, max 12 chars) faces school anxiety across 5 levels and defeats it by learning real coping skills.
- **5 levels → 5 bosses**:
  1. El Aula del Examen → La Pluma Roja (test anxiety)
  2. El Pasillo → El Cotilleo (social anxiety/gossip)
  3. La Pista → El Foco (performance anxiety/being watched)
  4. El Escenario → El Pánico Escénico (stage fright)
  5. Tu Interior → La Ansiedad (the final inner boss)
- **Stats**: CP (Confidence Points) = HP, starts 100. Calm = MP, starts 80.
- **10 abilities** with exact costs/cooldowns from `game.js` ABILITIES (breatheDeep free, speakUp 5, reframe 8, groundYourself free/cd3, selfTalk 8, findYourPeople 10/cd2, selfCompassion 15, believeInYourself 15, powerPose 8/cd3, breakFree 20). Unlocks: lv1→[reframe, groundYourself], lv2→[selfTalk, findYourPeople], lv3→[selfCompassion, believeInYourself, powerPose], lv4→[breakFree].
- **Combat math**: damage rolls, boss HP (-30% easier difficulty), boss damage (-25%), status effects (marked, rattled…), limit-break gauge (Sin Miedo) — extracted verbatim into `systems/battle.js`.
- **Languages**: EN/ES, default **es** (Spain Spanish Gen-Z tone — "tío", "pulsa"…). `translations.js` copied verbatim, same `TRANSLATIONS.t(lang, key)` API.
- **Controls**: arrows + Enter/Space/Z, full mouse support, M = mute.
- **Flow**: Title → Name Entry → per level (Intro → Exploration → Battle → Clear) → Final Victory → Credits; Game Over → retry battle.

## What changes (the point of the rebuild)

- **Engine**: hand-rolled canvas → Phaser 3.90 (vendored, no build step, plain script tags).
- **World**: static screens → walkable tilemap levels (code-generated maps, 16px tiles, camera follow, NPCs with dialogue, calm-gem pickups, boss trigger zone).
- **Art**: fillRect → real pixel art (Ansimuz + LimeZu packs; see assets/CREDITS.md with measured frame sizes).
- **Audio**: synthesized bleeps → real chiptune music (Junkala, CC0) + Kenney SFX; OGG+M4A for Safari.
- **Battle presentation**: FX spritesheets, camera shake, tint flashes, tweened HP bars, damage numbers, typewriter dialogue.
- **New niceties**: localStorage save (continue), loading progress bar, scrolling credits with asset attribution.
- **Distribution**: GitHub Pages (free), playable link for the nephew.

## Non-goals

- No backend/leaderboard (single player gift).
- No AI-generated art (free packs only).
- No redesign of dialogue, difficulty, or ability numbers.

## Acceptance (ship checklist)

- Full ES playthrough of all 5 levels on Chrome and Safari, keyboard-only AND mouse-only.
- EN spot-check every scene.
- Audio starts on first input, respects M mute, survives tab switch.
- Refresh mid-game resumes from level start via save.
- Live GitHub Pages URL loads in incognito, level 1 completable, works on a phone (touch = tap-to-move stretch goal, at minimum playable with a bluetooth keyboard — nephew primarily plays on laptop).
