/* eslint-disable import/extensions */
import MAIN_POS from './main_pos.js';
import CURRENT_SALE from './current_sale.js';
import UI_FUNCTIONS from './ui_functions.js';

function barcodeEntered(barcodeToCheck) {
  const searchThroughItems = MAIN_POS.POSItemList;

  searchThroughItems
    .forEach((product) => {
      if (product.barcode === barcodeToCheck) {
        // function to add item to GUI

        CURRENT_SALE.scanProduct(product.barcode);

        // function to calc the total
        return
      }
    });

  UI_FUNCTIONS.toggleWarningPopupWindow('no item found');
}

function discountEntered(discountToAdd) {
  if (CURRENT_SALE.addDiscount(discountToAdd)) {
    // add to GUI
    return;
  }

  UI_FUNCTIONS.toggleWarningPopupWindow('no items to add discount too');
}

function noTaxEntered() {
  if (CURRENT_SALE.removeTaxOnSale()) {
    UI_FUNCTIONS.toggleWarningPopupWindow('tax has been removed');
    return;
  }

  UI_FUNCTIONS.toggleWarningPopupWindow('no items for tax to be canceled on');
}

function subTotalEntered() {
  if (CURRENT_SALE.calculateSubtotal()) {
    MAIN_POS.selectedFunctionChange('payment');

    UI_FUNCTIONS.toggleWarningPopupWindow('please enter payment, then type of payment');

    return;
  }

  UI_FUNCTIONS.toggleWarningPopupWindow('no items for subtotal to be calculated on');
}

function voidEntered() {
  CURRENT_SALE.resetToDefault();

  MAIN_POS.resetAfterSale();

  UI_FUNCTIONS.clearInputValueFullPurge();

  UI_FUNCTIONS.toggleWarningPopupWindow('sale has been voided');
}

function newFunctionSelected(functionName) {
  UI_FUNCTIONS.updateInputPlaceholderWithSelectedFunction(functionName);

  MAIN_POS.selectedFunctionChange(functionName);
}

function clientSideCurrencyRendering(amount) {
  return amount / 100;
}

export {
  barcodeEntered,
  discountEntered,
  noTaxEntered,
  subTotalEntered,
  voidEntered,
  newFunctionSelected,
  clientSideCurrencyRendering
};
