CASH_BUTTON.addEventListener("click", () => {
  POS_BUTTON_ACTIONS.toggleCashDrawGUI();
})

CLOSE_CASH_DRAW_BUTTON.addEventListener("click", () => {
  POS_BUTTON_ACTIONS.toggleCashDrawGUI();
})

FIND_BUTTON.addEventListener("click", () => {
  POS_BUTTON_ACTIONS.toggleFindItemsGUI();
})

CLOSE_ITEM_LOOKUP.addEventListener("click", () => {
  POS_BUTTON_ACTIONS.toggleFindItemsGUI();
})

CLEAR_BUTTON.addEventListener("click", () => {
  const newKeyPadValue = KEYPAD_INPUT_DISPLAY.value.slice(0, KEYPAD_INPUT_DISPLAY.value.length-1);
  POS_BUTTON_ACTIONS.handleKeyPadClear(newKeyPadValue);
})

// hold down click functionally, clears whole input value
CLEAR_BUTTON.addEventListener("mousedown", () => {
  startClickMeasurement();
})

CLEAR_BUTTON.addEventListener("mouseup", () => {
  if (endClickMeasurement() > 700) {
    POS_BUTTON_ACTIONS.handleKeyPadClearFull();
  }
})

DISCOUNT_PERCENTAGE_BUTTON.addEventListener("click", () => {
  POS_BUTTON_ACTIONS.handleKeyPadClearFull();

  handleKeyPadInputTypeChange("%");
})

PRICE_BUTTON.addEventListener("click", () => {
  POS_BUTTON_ACTIONS.handleKeyPadClearFull();

  handleKeyPadInputTypeChange("$");
})

PLU_BUTTON.addEventListener("click", () => {
  POS_BUTTON_ACTIONS.handleKeyPadClearFull();

  handleKeyPadInputTypeChange("PLU");
})

BARCODE_BUTTON.addEventListener("click", () => {
  POS_BUTTON_ACTIONS.handleKeyPadClearFull();

  handleKeyPadInputTypeChange("barcode");
})

WEIGHT_BUTTON.addEventListener("click", () => {
  POS_BUTTON_ACTIONS.handleKeyPadClearFull();

  handleKeyPadInputTypeChange("g");
})

COUPON_BUTTON.addEventListener("click", () => {
  POS_BUTTON_ACTIONS.handleKeyPadClearFull();

  handleKeyPadInputTypeChange("coupon_code");
})

GIFT_CARD_BUTTON.addEventListener("click", () => {
  POS_BUTTON_ACTIONS.handleKeyPadClearFull();

  handleKeyPadInputTypeChange("gift_card_code");
})

CHECK_BUTTON.addEventListener("click", () => {
  POS_BUTTON_ACTIONS.handleKeyPadClearFull();
  
  handleKeyPadInputTypeChange("check_number")
})


// KEYPAD BUTTON
const KEYPAD_BUTTONS = document.querySelectorAll(".keypad_button");

KEYPAD_BUTTONS.forEach(button => button.addEventListener("click", (e) => handleKeyPadInput(e.target.value)));