function toggleCloseCashDrawPopup() {
  const allChildrenButtons = Object.values(document.querySelector(".main_pos_body").getElementsByTagName("button"));

  if (POS_SYSTEM_VARIABLES.CASH_DRAW_STATUS) {
    POS_SYSTEM_VARIABLES.CLOSE_CASH_DRAW();

    allChildrenButtons.forEach(button => button.disabled = false);
    MAIN_POS_BODY.style.filter = "none";

    return CLOSE_CASH_DRAW_POPUP.classList.add("hidden");
  }

  allChildrenButtons.forEach(button => button.disabled = true);
  MAIN_POS_BODY.style.filter = "Blur(4px)";
  POS_SYSTEM_VARIABLES.OPEN_CASH_DRAW();
  CLOSE_CASH_DRAW_POPUP.classList.remove("hidden");
}

function toggleFindItemsPopup() {
  const allChildrenButtons = Object.values(document.querySelector(".main_pos_body").getElementsByTagName("button"));

  if (POS_SYSTEM_VARIABLES.FIND_ITEMS_STATUS) {
    POS_SYSTEM_VARIABLES.FIND_ITEMS_TOGGLE();

    allChildrenButtons.forEach(button => button.disabled = false);
    MAIN_POS_BODY.style.filter = "none";

    return FIND_ITEMS_POPUP.classList.add("hidden");
  }

  allChildrenButtons.forEach(button => button.disabled = true);
  MAIN_POS_BODY.style.filter = "Blur(4px)";
  POS_SYSTEM_VARIABLES.FIND_ITEMS_TOGGLE();
  FIND_ITEMS_POPUP.classList.remove("hidden");
}

const handleKeyPadInput = value => KEYPAD_INPUT_DISPLAY.value += value;
const handleKeyPadClear = value => KEYPAD_INPUT_DISPLAY.value = value;
const handleKeyPadClearFull = () => KEYPAD_INPUT_DISPLAY.value = "";

const handleKeyPadInputTypeChange = newType => {
  POS_SYSTEM_VARIABLES.CHANGE_KEYPAD_INPUT_TYPE(newType);
  KEYPAD_INPUT_DISPLAY.placeholder = newType;
}