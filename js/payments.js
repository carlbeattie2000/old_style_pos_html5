import CURRENT_SALE from "./current_sale.js";
import MAIN_POS from "./main_pos.js";
import UI_FUNCTIONS from "./ui_functions.js";

function newSale() {
  MAIN_POS.resetAfterSale();
  CURRENT_SALE.resetToDefault();
  MAIN_POS.selectedFunctionChange('barcode');
  UI_FUNCTIONS.newSaleClear();
}

function convertKeypadCurrencyInput(value) {
  return parseInt(value * 100, 10);
}

function saveTransaction(amountGiven, type = '') {
  if (amountGiven < CURRENT_SALE.totalSalePrice) {
    UI_FUNCTIONS.toggleWarningPopupWindow('inefficient amount given');
    return false;
  }

  let changeGiven = 0;

  if (type === 'cash') {
    changeGiven = amountGiven - CURRENT_SALE.totalSalePrice;
  }

  const transaction = {
    items: CURRENT_SALE.productsScanned,
    total: CURRENT_SALE.totalSalePrice,
    tax: CURRENT_SALE.totalTaxPayable,
    change: changeGiven,
  };

  const cashDrawChangeDue = document.getElementById('close_cash_draw_change_due');

  cashDrawChangeDue.textContent = `$${UI_FUNCTIONS.renderClientCurrencyFormat(changeGiven)}`;

  MAIN_POS.cashInRegister += CURRENT_SALE.totalSalePrice - changeGiven;
  MAIN_POS.transactions.push(transaction);

  UI_FUNCTIONS.openCashDrawOpenPopup();

  return true;
}

const PAYMENT_SYSTEM = {
  check(keypadInput) {
    if (!keypadInput) {
      UI_FUNCTIONS.toggleWarningPopupWindow('check number has not been input');

      return false;
    }

    saveTransaction(convertKeypadCurrencyInput(keypadInput));

    newSale();

    return true;
  },
  coupon(keypadInput) {
    if (!keypadInput) {
      UI_FUNCTIONS.toggleWarningPopupWindow('coupon code has not been input');

      return false;
    }

    saveTransaction(convertKeypadCurrencyInput(keypadInput));

    newSale();

    return true;
  },
  giftCard(keypadInput) {
    if (!keypadInput) {
      UI_FUNCTIONS.toggleWarningPopupWindow('gift card code has not been input or not valid');

      return false;
    }

    saveTransaction(convertKeypadCurrencyInput(keypadInput));

    newSale();

    return true;
  },
  voucher(keypadInput) {
    if (!keypadInput) {
      UI_FUNCTIONS.toggleWarningPopupWindow('voucher code has not been input');

      return false;
    }

    saveTransaction(convertKeypadCurrencyInput(keypadInput));

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

    saveTransaction(convertKeypadCurrencyInput(keypadInput), 'cash');

    newSale();

    return true;
  },
};

export default PAYMENT_SYSTEM;
