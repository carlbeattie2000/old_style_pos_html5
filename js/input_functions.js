import MAIN_POS from './main_pos';
import CURRENT_SALE from './current_sale';
import UI_FUNCTIONS from './ui_functions';

function barcodeEntered() {
  // get barcode value from document input value
  const barcodeToCheck = '';

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

  UI_FUNCTIONS.warningPopupWindow('no item found');
}

function discountEntered() {
  // get the discount value
  const discountToAdd = '';

  if (CURRENT_SALE.addDiscount(discountToAdd)) {
    // add to GUI
    return;
  }

  UI_FUNCTIONS.warningPopupWindow('no items to add discount too');
}

function noTaxEntered() {
  if (CURRENT_SALE.removeTaxOnSale()) {
    UI_FUNCTIONS.warningPopupWindow('tax has been removed');
    return;
  }

  UI_FUNCTIONS.warningPopupWindow('no items for tax to be canceled on');
}

function subTotalEntered() {
  if (CURRENT_SALE.calculateSubtotal()) {
    MAIN_POS.selectedFunctionChange('payment');

    UI_FUNCTIONS.warningPopupWindow('please enter payment, then type of payment');

    return;
  }

  UI_FUNCTIONS.warningPopupWindow('no items for subtotal to be calculated on');
}

function voidEntered() {
  CURRENT_SALE.resetToDefault();

  MAIN_POS.resetAfterSale();

  UI_FUNCTIONS.warningPopupWindow('sale has been voided');
}

function newFunctionSelected(functionName) {
  UI_FUNCTIONS.updateInputPlaceholderWithSelectedFunction(functionName);

  MAIN_POS.selectedFunctionChange(functionName);
}
