import MAIN_POS from './main_pos.js';
import UI_FUNCTIONS from './ui_functions.js';
import { barcodeEntered, discountEntered } from './input_functions.js';

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
    default:
      break;
  }

  return true;
}

export default functionSwitch;
