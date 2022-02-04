CASH_BUTTON.addEventListener("click", () => {
  toggleCloseCashDrawPopup();
})

CLOSE_CASH_DRAW_BUTTON.addEventListener("click", () => {
  toggleCloseCashDrawPopup();
})

CLEAR_BUTTON.addEventListener("click", () => {
  const newKeyPadValue = KEYPAD_INPUT_DISPLAY.value.slice(0, KEYPAD_INPUT_DISPLAY.value.length-1);
  handleKeyPadClear(newKeyPadValue);
})

// hold down click functionally, clears whole input value
CLEAR_BUTTON.addEventListener("mousedown", () => {
  startClickMeasurement();
})

CLEAR_BUTTON.addEventListener("mouseup", () => {
  if (endClickMeasurement() > 700) {
    handleKeyPadClearFull();
  }
})


// KEYPAD BUTTON
const KEYPAD_BUTTONS = document.querySelectorAll(".keypad_button");

KEYPAD_BUTTONS.forEach(button => button.addEventListener("click", (e) => handleKeyPadInput(e.target.value)));