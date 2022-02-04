function toggleCloseCashDrawPopup() {
  const allChildrenButtons = Object.values(document.querySelector(".main_pos_body").getElementsByTagName("button"));

  if (POS_SYSTEM_DEFAULT.CASH_DRAW_STATUS) {
    POS_SYSTEM_DEFAULT.CLOSE_CASH_DRAW();

    allChildrenButtons.forEach(button => button.disabled = false);
    MAIN_POS_BODY.style.filter = "none";

    return CLOSE_CASH_DRAW_POPUP.classList.add("hidden");
  }

  allChildrenButtons.forEach(button => button.disabled = true);
  MAIN_POS_BODY.style.filter = "Blur(4px)";
  POS_SYSTEM_DEFAULT.OPEN_CASH_DRAW();
  CLOSE_CASH_DRAW_POPUP.classList.remove("hidden");
}

const handleKeyPadInput = value => KEYPAD_INPUT_DISPLAY.value += value;
const handleKeyPadClear = value => KEYPAD_INPUT_DISPLAY.value = value;
const handleKeyPadClearFull = () => KEYPAD_INPUT_DISPLAY.value = "";