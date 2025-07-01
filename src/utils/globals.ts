let lastInputWasKeyboard = false;

export function setupInputTracker() {
  window.addEventListener('keydown', e => {
    if (e.key === 'Tab') lastInputWasKeyboard = true;
  });

  window.addEventListener('mousedown', () => {
    lastInputWasKeyboard = false;
  });
}

export function wasLastInputKeyboard() {
  return lastInputWasKeyboard;
}
