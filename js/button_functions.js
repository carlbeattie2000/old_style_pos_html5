const handleKeyPadInput = value => KEYPAD_INPUT_DISPLAY.value += value;
const handleKeyPadClear = value => KEYPAD_INPUT_DISPLAY.value = value;
const handleKeyPadClearFull = () => KEYPAD_INPUT_DISPLAY.value = "";

const handleKeyPadInputTypeChange = newType => {
  POS_SYSTEM_VARIABLES.CHANGE_KEYPAD_INPUT_TYPE(newType);
  KEYPAD_INPUT_DISPLAY.placeholder = newType;
}