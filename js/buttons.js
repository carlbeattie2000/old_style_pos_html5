/* eslint-disable import/extensions */
import CURRENT_SALE from './current_sale.js';
import UI_FUNCTIONS from './ui_functions.js';
import { noTaxEntered, voidEntered, newFunctionSelected } from './input_functions.js';
import functionSwitch from './input_function_switcher.js';

const POS_BUTTONS = {
  openCashRegister: document.getElementById('cash_register_open'),
  closeCashRegister: document.getElementById('close_cash_draw_button'),
  employeeDiscount: document.getElementById('employee_discount_button'),
  findItems: document.getElementById('find_button'),
  closeFindItems: document.getElementById('close_item_lookup'),
  noTax: document.getElementById('no_tax_button'),
  voidSale: document.getElementById('void_button'),
  discountSale: document.getElementById('discount_percentage_button'),
  clearInput: document.getElementById('clear_button'),
  barcode: document.getElementById('barcode_button'),
  keypadButtons: document.querySelectorAll('.keypad_button'),
  enter: document.getElementById('enter_button'),
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

POS_BUTTONS.findItems.addEventListener('click', () => {
  UI_FUNCTIONS.toggleFindItemPopup();
});

POS_BUTTONS.closeFindItems.addEventListener('click', () => {
  UI_FUNCTIONS.toggleFindItemPopup();
});

POS_BUTTONS.noTax.addEventListener('click', () => {
  noTaxEntered();
});

POS_BUTTONS.voidSale.addEventListener('click', () => {
  voidEntered();
});

POS_BUTTONS.discountSale.addEventListener('click', () => {
  newFunctionSelected('discount');
});

POS_BUTTONS.clearInput.addEventListener('click', () => {
  UI_FUNCTIONS.clearInputValueByOneCharacter();
});

POS_BUTTONS.barcode.addEventListener('click', () => {
  newFunctionSelected('barcode');
});

POS_BUTTONS.keypadButtons.forEach((keypadButton) => {
  const keypadButtonSelected = keypadButton;

  keypadButtonSelected.addEventListener('click', (e) => {
    UI_FUNCTIONS.addCharacterToInputValue(e.target.value);
  });
});

POS_BUTTONS.enter.addEventListener('click', () => {
  functionSwitch();

  UI_FUNCTIONS.clearInputValueFullPurge();
});

POS_BUTTONS.warningPopupClose.addEventListener('click', () => {
  UI_FUNCTIONS.toggleWarningPopupWindow();
});
