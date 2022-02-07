/* eslint-disable import/extensions */
import CURRENT_SALE from './current_sale.js';
import UI_FUNCTIONS from './ui_functions.js';
import { noTaxEntered, voidEntered, newFunctionSelected } from './input_functions.js';
import functionSwitch from './input_function_switcher.js';
import MAIN_POS from './main_pos.js';

const POS_BUTTONS = {
  openCashRegister: document.getElementById('cash_register_open'),
  closeCashRegister: document.getElementById('close_cash_draw_button'),
  employeeDiscount: document.getElementById('employee_discount_button'),
  dayEnd: document.getElementById('day_end_button'),
  findItems: document.getElementById('find_button'),
  closeFindItems: document.getElementById('close_item_lookup'),
  noTax: document.getElementById('no_tax_button'),
  weight: document.getElementById('weight_button'),
  overTwentyFive: document.getElementById('over_25_button'),
  voidSale: document.getElementById('void_button'),
  refundSale: document.getElementById('refund_button'),
  discountSale: document.getElementById('discount_percentage_button'),
  price: document.getElementById('price_button'),
  clearInput: document.getElementById('clear_button'),
  barcode: document.getElementById('barcode_button'),
  keypadButtons: document.querySelectorAll('.keypad_button'),
  subtotal: document.getElementById('subtotal_button'),
  enter: document.getElementById('enter_button'),
  check: document.getElementById('check_button'),
  coupon: document.getElementById('coupon_button'),
  giftCard: document.getElementById('gift_card_button'),
  voucher: document.getElementById('voucher_button'),
  card: document.getElementById('card_button'),
  cash: document.getElementById('cash_button'),
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

POS_BUTTONS.dayEnd.addEventListener('click', () => {
  UI_FUNCTIONS.toggleWarningPopupWindow('need to add popup that displays window with previous transactions etc for the day');
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

POS_BUTTONS.weight.addEventListener('click', () => {
  newFunctionSelected('weight');
});

POS_BUTTONS.overTwentyFive.addEventListener('click', () => {
  UI_FUNCTIONS.addNewCustomTableRow('age', 'Age Check Verified', 1, 0);
});

POS_BUTTONS.voidSale.addEventListener('click', () => {
  voidEntered();
});

POS_BUTTONS.refundSale.addEventListener('click', () => {
  newFunctionSelected('refund');
});

POS_BUTTONS.discountSale.addEventListener('click', () => {
  newFunctionSelected('discount');
});

POS_BUTTONS.price.addEventListener('click', () => {
  newFunctionSelected('price');
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

POS_BUTTONS.subtotal.addEventListener('click', () => {
  const returnedValueOfCalculatedSubTotal = CURRENT_SALE.calculateSubtotal();
  if (returnedValueOfCalculatedSubTotal) {
    UI_FUNCTIONS.setTotalSalePrice(returnedValueOfCalculatedSubTotal);

    MAIN_POS.currentStatus = 'WAITING_FOR_PAYMENT';
  }
});

POS_BUTTONS.enter.addEventListener('click', () => {
  functionSwitch();

  UI_FUNCTIONS.clearInputValueFullPurge();
});

POS_BUTTONS.check.addEventListener('click', () => {
  console.log("testing");
});

POS_BUTTONS.coupon.addEventListener('click', () => {
  console.log("testing");
});

POS_BUTTONS.giftCard.addEventListener('click', () => {
  console.log("testing");
});

POS_BUTTONS.voucher.addEventListener('click', () => {
  console.log("testing");
});

POS_BUTTONS.card.addEventListener('click', () => {
  console.log("testing");
});

POS_BUTTONS.cash.addEventListener('click', () => {
  console.log("testing");
});

POS_BUTTONS.warningPopupClose.addEventListener('click', () => {
  UI_FUNCTIONS.toggleWarningPopupWindow();
});
