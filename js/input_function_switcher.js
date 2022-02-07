import MAIN_POS from './main_pos.js';
import UI_FUNCTIONS from './ui_functions.js';
import { barcodeEntered, discountEntered, customItem, customWeightItem } from './input_functions.js';

function convertKeypadCurrencyInput(value) {
  return parseInt(value * 100, 10);
}

function functionSwitch() {
  if (MAIN_POS.currentStatus === 'WAITING_FOR_PAYMENT') {
    UI_FUNCTIONS.toggleWarningPopupWindow('Error: waiting for payment');

    return false;
  }

  const keypadInput = UI_FUNCTIONS.getKeypadInput();

  if (!keypadInput) {
    UI_FUNCTIONS.toggleWarningPopupWindow('Error: no keypad input');

    return false;
  }

  const { currentSelectedFunction } = MAIN_POS;

  switch (currentSelectedFunction) {
    case 'barcode':
      barcodeEntered(keypadInput);
      break;
    case 'discount':
      discountEntered(keypadInput);
      break;
    case 'price':
      customItem(convertKeypadCurrencyInput(keypadInput));
      break;
    case 'weight':
      customWeightItem(keypadInput);
      break;
    case 'refund':
      MAIN_POS.cashInRegister -= convertKeypadCurrencyInput(keypadInput);

      UI_FUNCTIONS.toggleWarningPopupWindow(`$${keypadInput} has been refunded! \n cash in register $${UI_FUNCTIONS.renderClientCurrencyFormat(MAIN_POS.cashInRegister)}`);
      break;
    default:
      break;
  }

  return true;
}

export default functionSwitch;
