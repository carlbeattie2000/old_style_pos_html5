/* eslint-disable import/extensions */
import MAIN_POS from './main_pos.js';
import CURRENT_SALE from './current_sale.js';
import UI_FUNCTIONS from './ui_functions.js';

function randomBarcode() {
  return Math.floor(Math.random() * 100000);
}

function barcodeEntered(barcodeToCheck) {
  const searchThroughItems = MAIN_POS.POSItemList;

  let itemFound = false;

  searchThroughItems
    .forEach((product) => {
      if (product.barcode === barcodeToCheck) {
        if (CURRENT_SALE.scanProduct(product)) {
          UI_FUNCTIONS.addNewSaleProduct(product);
        } else {
          UI_FUNCTIONS.updateProductQty(product.barcode, product.price);
        }

        itemFound = true;

        UI_FUNCTIONS.calculateTotalSalePrice(CURRENT_SALE.productsScanned);

        return true;
      }

      return false;
    });

  if (!itemFound) {
    UI_FUNCTIONS.toggleWarningPopupWindow('no item found');
  }
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

  UI_FUNCTIONS.clearProductsInSale();

  UI_FUNCTIONS.toggleWarningPopupWindow('sale has been voided');
}

function customItem(price) {
  CURRENT_SALE.scanProduct({ price });

  UI_FUNCTIONS.addNewCustomTableRow(randomBarcode(), 'NO_NAME', 1, price);

  UI_FUNCTIONS.calculateTotalSalePrice(CURRENT_SALE.productsScanned);
}

function customWeightItem(weight) {
  const costPerG = 56;
  const totalCost = weight * costPerG;

  CURRENT_SALE.scanProduct({ price: totalCost });

  UI_FUNCTIONS.addNewCustomTableRow(randomBarcode(), `${weight} g`, 1, totalCost);

  UI_FUNCTIONS.calculateTotalSalePrice(CURRENT_SALE.productsScanned);
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
  clientSideCurrencyRendering,
  customItem,
  customWeightItem,
};
