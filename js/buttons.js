import UI_FUNCTIONS from './ui_functions.js';

const POS_BUTTONS = {
  openCashRegister: document.getElementById('cash_register_open'),
  closeCashRegister: document.getElementById('close_cash_draw_button'),
};

POS_BUTTONS.openCashRegister.addEventListener('click', () => {
  UI_FUNCTIONS.openCashDrawOpenPopup();
});

POS_BUTTONS.closeCashRegister.addEventListener('click', () => {
  UI_FUNCTIONS.closeCashDrawOpenPopup();
});
