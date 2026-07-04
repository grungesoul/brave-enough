// Mobile touch controls: Game Boy-style D-pad + A button overlay.
// Emits synthetic keyboard events on window, so every scene's existing
// keyboard handlers work unchanged. Enabled on touch devices; force with
// ?touch=1, disable with ?touch=0.
'use strict';

const TouchControls = (() => {
  const qs = new URLSearchParams(location.search);
  const forced = qs.get('touch');
  const enabled = forced === '1' || (forced !== '0' &&
    (('ontouchstart' in window) || navigator.maxTouchPoints > 0));

  const KEYS = {
    up:    { key: 'ArrowUp',    code: 'ArrowUp',    keyCode: 38 },
    down:  { key: 'ArrowDown',  code: 'ArrowDown',  keyCode: 40 },
    left:  { key: 'ArrowLeft',  code: 'ArrowLeft',  keyCode: 37 },
    right: { key: 'ArrowRight', code: 'ArrowRight', keyCode: 39 },
    a:     { key: 'Enter',      code: 'Enter',      keyCode: 13 },
    mute:  { key: 'm',          code: 'KeyM',       keyCode: 77 }
  };

  // KeyboardEvent init ignores keyCode, but Phaser reads it — shadow the getter.
  function sendKey(type, k) {
    const ev = new KeyboardEvent(type, { key: k.key, code: k.code, bubbles: true, cancelable: true });
    Object.defineProperty(ev, 'keyCode', { value: k.keyCode });
    Object.defineProperty(ev, 'which', { value: k.keyCode });
    window.dispatchEvent(ev);
  }

  if (!enabled) {
    return { enabled: false, showNameInput() { return false; }, hideNameInput() {} };
  }

  document.body.classList.add('touch');

  const root = document.createElement('div');
  root.id = 'tc';
  root.innerHTML =
    '<div id="tc-dpad">' +
      '<div class="tc-arm tc-up" data-dir="up"></div>' +
      '<div class="tc-arm tc-left" data-dir="left"></div>' +
      '<div class="tc-center"></div>' +
      '<div class="tc-arm tc-right" data-dir="right"></div>' +
      '<div class="tc-arm tc-down" data-dir="down"></div>' +
    '</div>' +
    '<div id="tc-a">A</div>' +
    '<div id="tc-mute">&#9834;</div>';
  document.body.appendChild(root);

  const pad = root.querySelector('#tc-dpad');
  const btnA = root.querySelector('#tc-a');
  const btnMute = root.querySelector('#tc-mute');
  const arms = {};
  root.querySelectorAll('.tc-arm').forEach(el => { arms[el.dataset.dir] = el; });

  // ── D-pad: one pointer drives up to two directions (8-way), slide to change ──
  let padPointer = null;
  let activeDirs = new Set();

  function updateDirs(clientX, clientY) {
    const r = pad.getBoundingClientRect();
    const dx = clientX - (r.left + r.width / 2);
    const dy = clientY - (r.top + r.height / 2);
    const next = new Set();
    if (Math.hypot(dx, dy) > r.width * 0.12) {
      const ax = Math.abs(dx), ay = Math.abs(dy);
      if (ax > ay * 0.45) next.add(dx < 0 ? 'left' : 'right');
      if (ay > ax * 0.45) next.add(dy < 0 ? 'up' : 'down');
    }
    for (const d of activeDirs) if (!next.has(d)) { sendKey('keyup', KEYS[d]); arms[d].classList.remove('on'); }
    for (const d of next) if (!activeDirs.has(d)) { sendKey('keydown', KEYS[d]); arms[d].classList.add('on'); }
    activeDirs = next;
  }

  function releasePad() {
    for (const d of activeDirs) { sendKey('keyup', KEYS[d]); arms[d].classList.remove('on'); }
    activeDirs = new Set();
    padPointer = null;
  }

  pad.addEventListener('pointerdown', e => {
    e.preventDefault();
    if (padPointer !== null) return;
    padPointer = e.pointerId;
    try { pad.setPointerCapture(e.pointerId); } catch (_) {}
    updateDirs(e.clientX, e.clientY);
  });
  pad.addEventListener('pointermove', e => {
    if (e.pointerId === padPointer) updateDirs(e.clientX, e.clientY);
  });
  pad.addEventListener('pointerup', e => { if (e.pointerId === padPointer) releasePad(); });
  pad.addEventListener('pointercancel', e => { if (e.pointerId === padPointer) releasePad(); });

  // ── A button (confirm / talk / advance) ──
  let aDown = false;
  btnA.addEventListener('pointerdown', e => {
    e.preventDefault();
    try { btnA.setPointerCapture(e.pointerId); } catch (_) {}
    if (!aDown) { aDown = true; btnA.classList.add('on'); sendKey('keydown', KEYS.a); }
  });
  const aUp = () => { if (aDown) { aDown = false; btnA.classList.remove('on'); sendKey('keyup', KEYS.a); } };
  btnA.addEventListener('pointerup', aUp);
  btnA.addEventListener('pointercancel', aUp);

  // ── Mute toggle ──
  btnMute.addEventListener('pointerdown', e => {
    e.preventDefault();
    sendKey('keydown', KEYS.mute);
    sendKey('keyup', KEYS.mute);
    btnMute.classList.toggle('muted');
  });

  // Block long-press context menus on the controls
  root.addEventListener('contextmenu', e => e.preventDefault());

  // ── Hidden text field for NameEntry: opens the native soft keyboard ──
  // Invisible band positioned over the canvas name area; the game canvas
  // keeps rendering the typed name, this field just captures the input.
  let nameField = null;
  let nameOpts = null;

  function positionNameField() {
    if (!nameField) return;
    const canvas = document.querySelector('#game canvas');
    if (!canvas) return;
    const r = canvas.getBoundingClientRect();
    // logical name row is at y≈150 of 320 — cover a generous band around it
    nameField.style.left = r.left + 'px';
    nameField.style.width = r.width + 'px';
    nameField.style.top = (r.top + r.height * (115 / 320)) + 'px';
    nameField.style.height = (r.height * (70 / 320)) + 'px';
  }

  function showNameInput(opts) {
    hideNameInput();
    nameOpts = opts;
    nameField = document.createElement('input');
    nameField.id = 'tc-name';
    nameField.type = 'text';
    nameField.autocomplete = 'off';
    nameField.autocapitalize = 'words';
    nameField.setAttribute('enterkeyhint', 'done');
    nameField.maxLength = opts.maxLength || 12;
    nameField.value = opts.value || '';
    nameField.addEventListener('input', () => {
      // same charset the desktop key handler accepts
      const clean = nameField.value.replace(/[^\p{L}\p{N} '-]/gu, '').slice(0, nameField.maxLength);
      if (clean !== nameField.value) nameField.value = clean;
      opts.onInput(clean);
    });
    nameField.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation(); // keep Phaser's window listener from double-firing
        nameField.blur();
        opts.onEnter();
      }
    });
    document.body.appendChild(nameField);
    positionNameField();
    nameField.focus(); // opens the keyboard on Android; iOS needs the tap below
    return true;
  }

  function hideNameInput() {
    if (nameField) { nameField.remove(); nameField = null; nameOpts = null; }
  }

  window.addEventListener('resize', positionNameField);

  return { enabled: true, showNameInput, hideNameInput };
})();
