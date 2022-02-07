import CURRENT_SALE from "./current_sale";
import UI_FUNCTIONS from "./ui_functions";

function newSale() {
  // do something
}

const PAYMENT_SYSTEM = {
  check(keypadInput) {
    if (!keypadInput) {
      UI_FUNCTIONS.toggleWarningPopupWindow('check number has not been input');

      return false;
    }

    newSale();

    return true;
  },
  coupon(keypadInput) {
    if (!keypadInput) {
      UI_FUNCTIONS.toggleWarningPopupWindow('coupon code has not been input');

      return false;
    }

    newSale();

    return true;
  },
  giftCard(keypadInput) {
    if (!keypadInput) {
      UI_FUNCTIONS.toggleWarningPopupWindow('gift card code has not been input or not valid');

      return false;
    }

    newSale();

    return true;
  },
  voucher(keypadInput) {
    if (!keypadInput) {
      UI_FUNCTIONS.toggleWarningPopupWindow('voucher code has not been input');

      return false;
    }

    newSale();

    return true;
  },
  card() {
    newSale();
  },
  cash(keypadInput) {
    if (!keypadInput) {
      UI_FUNCTIONS.toggleWarningPopupWindow('cash amount has not been input');

      return false;
    }

    newSale();

    return true;
  },
};

export default PAYMENT_SYSTEM;
