import CURRENT_SALE from './current_sale.js';
import UI_FUNCTIONS from './ui_functions.js';

const POS_BUTTONS = {
  openCashRegister: document.getElementById('cash_register_open'),
  closeCashRegister: document.getElementById('close_cash_draw_button'),
  employeeDiscount: document.getElementById('employee_discount_button'),
  clearInput: document.getElementById('clear_button'),
  keypadButtons: document.querySelectorAll('.keypad_button'),
  warningPopupClose: document.getElementById('warning-popup-close'),
};

POS_BUTTONS.openCashRegister.addEventListener('click', () => {
  UI_FUNCTIONS.openCashDrawOpenPopup();
});

POS_BUTTONS.closeCashRegister.addEventListener('click', () => {
  UI_FUNCTIONS.closeCashDrawOpenPopup();
});

POS_BUTTONS.employeeDiscount.addEventListener('click', () => {
  CURRENT_SALE.addDiscount(30);
});

POS_BUTTONS.clearInput.addEventListener('click', () => {
  UI_FUNCTIONS.clearInputValueByOneCharacter();
});

POS_BUTTONS.keypadButtons.forEach((keypadButton) => {
  const keypadButtonSelected = keypadButton;

  keypadButtonSelected.addEventListener('click', (e) => {
    UI_FUNCTIONS.addCharacterToInputValue(e.target.value);
  });
});

POS_BUTTONS.warningPopupClose.addEventListener('click', () => {
  UI_FUNCTIONS.closeWarningPopupWindow();
});
