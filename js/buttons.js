import UI_FUNCTIONS from './ui_functions.js';

const POS_BUTTONS = {
  openCashRegister: document.getElementById('cash_register_open'),
};

POS_BUTTONS.openCashRegister.addEventListener('click', () => {
  UI_FUNCTIONS.openCashDrawOpenPopup();
});
