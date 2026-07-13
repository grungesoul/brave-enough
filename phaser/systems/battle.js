// Pure combat logic ported verbatim from the original game.js battle system
// (executePlayerAbility / executeBossTurn / applyDmgModifiers / effects).
// No Phaser dependencies: BattleCore mutates hero/boss state and returns event
// objects; BattleScene turns those into FX, dialogue and floaters.
'use strict';

function rollDmg(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class BattleCore {
  // hero: { cp, maxCp, calm, maxCalm, unlockedAbilities, abilityUseCount,
  //         activeBuffs, activeDebuffs, findPeopleCooldown, groundYourselfCooldown,
  //         powerPoseCooldown, limitBreakCharge }
  // levelIndex: 0-based; bossData from LEVELS[levelIndex].boss
  constructor(hero, levelIndex) {
    this.hero = hero;
    this.levelIndex = levelIndex;
    const b = LEVELS[levelIndex].boss;
    this.boss = {
      hp: b.hp, maxHp: b.maxHp, dread: b.dread, focus: b.focus,
      dreadMod: 0, focusMod: 0, attacks: b.attacks,
      statusEffects: [], shattered: false,
      phase: 1, phase2: b.phase2 || null,
      // Octopath-style break system: hitting a weakness chips the shield;
      // at 0 the boss BREAKS (skips its turn, takes x1.5 damage) then resets.
      weaknesses: b.weaknesses || [], shield: b.shield || 0, maxShield: b.shield || 0,
      revealed: [], broken: false
    };
    this.turnCount = 0;
    this.tauntIndex = 0;
    this.bossLastAttack = -1;
    this.mirrorAdaptAbility = null;

    // Battle-start rules from initBattle()
    hero.calm = Math.min(hero.maxCalm, hero.calm + 10);
    hero.activeBuffs = hero.activeBuffs.filter(b2 => b2.persistent);
    hero.activeDebuffs = [];
    hero.findPeopleCooldown = Math.max(0, hero.findPeopleCooldown - 1);
    hero.groundYourselfCooldown = Math.max(0, hero.groundYourselfCooldown - 1);
    hero.powerPoseCooldown = Math.max(0, hero.powerPoseCooldown - 1);
    hero.limitBreakCharge = 0;
  }

  availableAbilities() {
    return [ABILITIES.limitBreak, ...this.hero.unlockedAbilities.map(id => ABILITIES[id]).filter(Boolean)];
  }

  effectiveCost(abilityId) {
    let cost = ABILITIES[abilityId].cost;
    if (this.hero.activeBuffs.find(b => b.id === 'radiant')) cost = Math.max(0, cost - 5);
    if (this.hero.activeBuffs.find(b => b.id === 'inspired')) cost = 0;
    if (abilityId === 'speakUp' && this.hero.activeDebuffs.find(d => d.id === 'silenced')) cost += 5;
    if (abilityId === 'believeInYourself' && this.hero.activeDebuffs.find(d => d.id === 'doubt')) cost += 5;
    return cost;
  }

  canUse(abilityId) {
    const h = this.hero;
    if (abilityId === 'limitBreak') return h.limitBreakCharge >= 4;
    if (abilityId === 'findYourPeople' && h.findPeopleCooldown > 0) return false;
    if (abilityId === 'groundYourself' && h.groundYourselfCooldown > 0) return false;
    if (abilityId === 'powerPose' && h.powerPoseCooldown > 0) return false;
    if (abilityId === 'breatheDeep' && h.activeDebuffs.find(d => d.id === 'frozen')) return false;
    return h.calm >= this.effectiveCost(abilityId);
  }

  cooldownFor(abilityId) {
    const h = this.hero;
    if (abilityId === 'findYourPeople') return h.findPeopleCooldown;
    if (abilityId === 'groundYourself') return h.groundYourselfCooldown;
    if (abilityId === 'powerPose') return h.powerPoseCooldown;
    return 0;
  }

  // Returns { events: [...], resultKey, resultArgs, dmg, victory, mirrorAdapted }
  useAbility(abilityId) {
    const h = this.hero;
    if (!this.canUse(abilityId)) return null;

    const cost = this.effectiveCost(abilityId);
    h.calm -= cost;
    h.abilityUseCount[abilityId] = (h.abilityUseCount[abilityId] || 0) + 1;
    if (h.activeBuffs.find(b => b.id === 'inspired')) {
      h.activeBuffs = h.activeBuffs.filter(b => b.id !== 'inspired');
    }
    if (abilityId === 'findYourPeople') h.findPeopleCooldown = 2;
    if (abilityId === 'groundYourself') h.groundYourselfCooldown = 3;
    if (abilityId === 'powerPose') h.powerPoseCooldown = 3;

    let dmg = 0;
    let resultKey = '', resultArgs = [];
    const events = [];

    switch (abilityId) {
      case 'breatheDeep': {
        let restore = 15;
        if (h.activeDebuffs.find(d => d.id === 'rattled')) restore = Math.floor(restore / 2);
        h.calm = Math.min(h.maxCalm, h.calm + restore);
        this.addHeroBuff('grounded', 2, 5);
        resultKey = 'resultBreatheDeep'; resultArgs = [restore];
        break;
      }
      case 'speakUp': {
        dmg = this.applyDmgModifiers(rollDmg(20, 28), abilityId);
        this.dealDamageToBoss(dmg, events);
        if (Math.random() < 0.15) {
          this.addBossStatus('heard', 2, -5, 'dread');
          resultKey = 'resultSpeakUpHeard';
        } else {
          resultKey = 'resultSpeakUp';
        }
        resultArgs = [dmg];
        break;
      }
      case 'reframe': {
        dmg = this.applyDmgModifiers(rollDmg(18, 25), abilityId);
        const existing = this.boss.statusEffects.find(s => s.id === 'reframed');
        if (existing) {
          existing.turnsLeft += 2;
          this.dealDamageToBoss(Math.floor(dmg * 0.5), events);
          resultKey = 'resultReframeLonger'; resultArgs = [];
        } else {
          this.dealDamageToBoss(dmg, events);
          this.addBossStatus('reframed', 3, -10, 'dread');
          resultKey = 'resultReframe'; resultArgs = [dmg];
        }
        break;
      }
      case 'findYourPeople': {
        const friendDmg = rollDmg(25, 35);
        this.dealDamageToBoss(friendDmg, events);
        h.cp = Math.min(h.maxCp, h.cp + 10);
        events.push({ type: 'friendAlly' });
        resultKey = 'resultFindPeople'; resultArgs = [friendDmg];
        break;
      }
      case 'believeInYourself': {
        dmg = this.applyDmgModifiers(rollDmg(35, 45), abilityId);
        this.dealDamageToBoss(dmg, events);
        h.cp = Math.min(h.maxCp, h.cp + 20);
        if (Math.random() < 0.20) {
          this.addHeroBuff('inspired', 1, 0);
          resultKey = 'resultBelieveInspired';
        } else {
          resultKey = 'resultBelieve';
        }
        resultArgs = [dmg];
        break;
      }
      case 'breakFree': {
        let minDmg = 50, maxDmg = 65;
        const desperation = h.cp < 30;
        if (desperation) { minDmg = 65; maxDmg = 80; }
        dmg = this.applyDmgModifiers(rollDmg(minDmg, maxDmg), abilityId);
        this.dealDamageToBoss(dmg, events);
        this.addBossStatus('shattered', 999, -15, 'both');
        this.boss.shattered = true;
        this.addHeroBuff('radiant', 2, -5);
        resultKey = desperation ? 'resultDesperateCourage' : 'resultBreakFree';
        resultArgs = [dmg];
        break;
      }
      case 'groundYourself': {
        h.calm = Math.min(h.maxCalm, h.calm + 20);
        h.cp = Math.min(h.maxCp, h.cp + 10);
        this.addHeroBuff('grounded', 3, 5);
        resultKey = 'resultGroundYourself'; resultArgs = [];
        break;
      }
      case 'selfTalk': {
        dmg = this.applyDmgModifiers(Math.floor(Math.random() * 18) + 12, abilityId);
        this.dealDamageToBoss(dmg, events);
        this.boss.dreadMod -= 4;
        this.addHeroBuff('reframed', 2, 0);
        resultKey = 'resultSelfTalk'; resultArgs = [dmg];
        break;
      }
      case 'selfCompassion': {
        h.cp = Math.min(h.maxCp, h.cp + 35);
        dmg = this.applyDmgModifiers(Math.floor(Math.random() * 10) + 8, abilityId);
        this.dealDamageToBoss(dmg, events);
        resultKey = 'resultSelfCompassion'; resultArgs = [dmg];
        break;
      }
      case 'powerPose': {
        dmg = this.applyDmgModifiers(Math.floor(Math.random() * 20) + 15, abilityId);
        this.dealDamageToBoss(dmg, events);
        this.addHeroBuff('inspired', 3, 5);
        resultKey = 'resultPowerPose'; resultArgs = [dmg];
        break;
      }
      case 'limitBreak': {
        dmg = 50 + Math.floor(Math.random() * 16);
        this.dealDamageToBoss(dmg, events);
        h.activeDebuffs = [];
        h.calm = Math.min(h.maxCalm, h.calm + 10);
        h.limitBreakCharge = 0;
        resultKey = 'resultLimitBreak'; resultArgs = [dmg];
        break;
      }
    }

    // Break check: using a weakness technique chips the shield (even the
    // non-damaging ones — breathing at Anxiety IS the counter to it)
    const boss = this.boss;
    if (boss.weaknesses.includes(abilityId)) {
      if (!boss.revealed.includes(abilityId)) boss.revealed.push(abilityId);
      if (!boss.broken && boss.shield > 0 && boss.hp > 0) {
        boss.shield--;
        events.push({ type: 'weakHit', shield: boss.shield });
        if (boss.shield === 0) {
          boss.broken = true;
          events.push({ type: 'break' });
        }
      }
    }

    this.tickBossStatuses();
    this.turnCount++;
    if (abilityId !== 'limitBreak') {
      h.limitBreakCharge = Math.min(4, h.limitBreakCharge + 1);
    }

    const victory = this.boss.hp <= 0;
    let mirrorAdapted = null;
    if (!victory && this.levelIndex === 4 && this.turnCount % 3 === 0) {
      mirrorAdapted = this.triggerMirrorAdaptation();
    }

    return { events, resultKey, resultArgs, dmg, victory, mirrorAdapted };
  }

  applyDmgModifiers(dmg, abilityId) {
    const h = this.hero;
    if (h.activeDebuffs.find(d => d.id === 'marked')) {
      dmg = Math.floor(dmg * 0.7);
      h.activeDebuffs = h.activeDebuffs.filter(d => d.id !== 'marked');
    }
    if (this.mirrorAdaptAbility === abilityId) {
      dmg = Math.floor(dmg * 0.7);
    }
    if (this.boss.broken) dmg = Math.floor(dmg * 1.5); // break bonus
    return Math.max(1, dmg);
  }

  dealDamageToBoss(dmg, events) {
    const focusDef = Math.max(0, this.boss.focus + this.boss.focusMod) / 4;
    const reduced = Math.max(1, Math.round(dmg - focusDef));
    this.boss.hp = Math.max(0, this.boss.hp - reduced);
    events.push({ type: 'bossDamage', amount: reduced });

    // Two-phase bosses transform instead of dying at the end of phase 1.
    const boss = this.boss;
    if (boss.hp <= 0 && boss.phase === 1 && boss.phase2) {
      const p2 = boss.phase2;
      boss.phase = 2;
      boss.hp = p2.hp; boss.maxHp = p2.maxHp;
      boss.dread = p2.dread; boss.focus = p2.focus;
      boss.attacks = p2.attacks;
      // fresh slate: phase-1 debuffs on the boss don't carry over
      boss.statusEffects = [];
      boss.dreadMod = 0; boss.focusMod = 0;
      // phase 2 brings its own weaknesses and a fresh shield
      boss.weaknesses = p2.weaknesses || boss.weaknesses;
      boss.shield = p2.shield || boss.maxShield;
      boss.maxShield = boss.shield;
      boss.revealed = []; boss.broken = false;
      this.bossLastAttack = -1;
      events.push({ type: 'phaseChange' });
    }
  }

  // Returns { attackIndex, totalDmg, effect, taunt, defeat, selfWeakened }
  bossTurn() {
    const boss = this.boss;
    // Broken boss loses its turn, then recovers its shield
    if (boss.broken) {
      boss.broken = false;
      boss.shield = boss.maxShield;
      // buff/debuff ticking still happens via afterBossTurn, as on a normal turn
      return { stunned: true, attackIndex: -1, totalDmg: 0, hits: 0, effect: null, tauntIdx: -1, selfWeaken: false, defeat: false };
    }
    const attacks = boss.attacks;
    let available = attacks.filter(a => !a.hpThreshold || boss.hp <= a.hpThreshold);
    if (available.length === 0) available = attacks;

    let chosen;
    if (available.length > 1) {
      const filtered = available.filter((_, i) => i !== this.bossLastAttack % available.length);
      chosen = filtered[Math.floor(Math.random() * filtered.length)];
    } else {
      chosen = available[0];
    }
    this.bossLastAttack = attacks.indexOf(chosen);

    const hits = chosen.hits || 1;
    let totalDmg = 0;
    for (let hI = 0; hI < hits; hI++) {
      let dmg = rollDmg(chosen.dmgMin, chosen.dmgMax);
      if (this.hero.activeBuffs.find(b => b.id === 'grounded')) dmg = Math.floor(dmg * 0.7);
      if (this.hero.activeDebuffs.find(d => d.id === 'overexposed')) dmg += 3;
      totalDmg += dmg;
    }
    totalDmg = Math.max(1, totalDmg);
    this.hero.cp = Math.max(0, this.hero.cp - totalDmg);

    if (chosen.effect) this.applyBossAttackEffect(chosen.effect);

    // Taunt every 3rd turn (matches original: turnCount % 3 === 2)
    const tauntNow = this.turnCount % 3 === 2;
    let tauntIdx = -1;
    if (tauntNow) { tauntIdx = this.tauntIndex; this.tauntIndex++; }

    return {
      attackIndex: this.bossLastAttack,
      totalDmg,
      hits,
      effect: chosen.effect,
      tauntIdx,
      selfWeaken: !!(chosen.effect === 'mirrorBreak' && chosen.selfWeaken),
      defeat: this.hero.cp <= 0
    };
  }

  // Called after the boss-attack dialogue finishes (matches original ordering)
  afterBossTurn(result) {
    if (result.selfWeaken) this.boss.dread = Math.max(0, this.boss.dread - 20);
    this.tickHeroBuffsDebuffs();
  }

  applyBossAttackEffect(effect) {
    const h = this.hero;
    switch (effect) {
      case 'marked': this.addHeroDebuff('marked', 1, -0.3); break;
      case 'rattled': this.addHeroDebuff('rattled', 2, 0); break;
      case 'scrutinized': this.addHeroDebuff('scrutinized', 1, 0); break;
      case 'overexposed': this.addHeroDebuff('overexposed', 2, -10); break;
      case 'focusDown': this.addHeroDebuff('focusDown', 2, -8); break;
      case 'frozen': this.addHeroDebuff('frozen', 2, 0); break;
      case 'blankMind': h.activeBuffs = h.activeBuffs.filter(b => b.id !== 'grounded'); break;
      case 'silenced': this.addHeroDebuff('silenced', 2, 5); break;
      case 'whatIf': h.calm = Math.max(0, h.calm - 8); break;
      case 'doubt': this.addHeroDebuff('doubt', 2, 5); break;
      case 'mirrorBreak':
        h.calm = Math.max(0, h.calm - 12);
        this.addHeroDebuff('mirrorBreak', 2, 0);
        break;
    }
  }

  addHeroBuff(id, turns, value) {
    const h = this.hero;
    h.activeBuffs = h.activeBuffs.filter(b => b.id !== id);
    h.activeBuffs.push({ id, turnsLeft: turns, value });
  }

  addHeroDebuff(id, turns, value) {
    const h = this.hero;
    h.activeDebuffs = h.activeDebuffs.filter(d => d.id !== id);
    h.activeDebuffs.push({ id, turnsLeft: turns, value });
  }

  addBossStatus(id, turns, value, stat) {
    const boss = this.boss;
    boss.statusEffects = boss.statusEffects.filter(s => s.id !== id);
    boss.statusEffects.push({ id, turnsLeft: turns, value, stat });
    if (stat === 'dread') boss.dreadMod += value;
    else if (stat === 'focus') boss.focusMod += value;
    else if (stat === 'both') { boss.dreadMod += value; boss.focusMod += value; }
  }

  tickBossStatuses() {
    const boss = this.boss;
    for (const s of boss.statusEffects) s.turnsLeft--;
    boss.statusEffects = boss.statusEffects.filter(s => {
      if (s.turnsLeft <= 0) {
        if (s.stat === 'dread') boss.dreadMod -= s.value;
        else if (s.stat === 'focus') boss.focusMod -= s.value;
        else if (s.stat === 'both') { boss.dreadMod -= s.value; boss.focusMod -= s.value; }
        return false;
      }
      return true;
    });
  }

  tickHeroBuffsDebuffs() {
    const h = this.hero;
    for (const b of h.activeBuffs) b.turnsLeft--;
    h.activeBuffs = h.activeBuffs.filter(b => b.turnsLeft > 0);
    for (const d of h.activeDebuffs) d.turnsLeft--;
    h.activeDebuffs = h.activeDebuffs.filter(d => d.turnsLeft > 0);
  }

  triggerMirrorAdaptation() {
    let maxCount = 0, topAbility = null;
    for (const [id, count] of Object.entries(this.hero.abilityUseCount)) {
      if (count > maxCount) { maxCount = count; topAbility = id; }
    }
    if (topAbility && topAbility !== this.mirrorAdaptAbility) {
      this.mirrorAdaptAbility = topAbility;
      return topAbility;
    }
    return null;
  }
}
