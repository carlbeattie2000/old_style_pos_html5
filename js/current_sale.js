import { newFunctionSelected } from "./input_functions.js";
import UI_FUNCTIONS from "./ui_functions.js";

const CURRENT_SALE = {
  productsScanned: [],
  totalSalePrice: 0,
  totalTaxPayable: 0,
  defaultTaxRate: 20,
  discount: 0,
  paymentMethod: '',
  changeDue: 0,
  subtotalCalled: false,
  calculateTaxOnProduct(cost) {
    const taxPayable = Math.floor((this.defaultTaxRate / 100) * cost);

    this.totalTaxPayable += taxPayable;

    return taxPayable;
  },
  scannedProductAlreadyExist(product) {
    if (this.productsScanned.includes(product)) {
      this.totalSalePrice += product.price;

      return true;
    }

    return false;
  },
  scanProduct(product) {
    const productToAdd = product;

    if (this.scannedProductAlreadyExist(productToAdd)) {
      this.productsScanned[this.productsScanned.indexOf(productToAdd)].qty += 1;

      return false;
    }

    this.totalSalePrice += productToAdd.price;

    productToAdd.qty = 1;

    this.productsScanned.push(productToAdd);

    return true;
  },
  addDiscount(percentageAmount) {
    if (this.productsScanned.length === 0 || percentageAmount > 100) {
      return false;
    }

    this.discount += percentageAmount;

    return true;
  },
  removeTaxOnSale() {
    if (this.productsScanned.length === 0) {
      return false;
    }

    this.totalTaxPayable = 0;
    this.defaultTaxRate = 0;

    return true;
  },
  calculateSubtotal() {
    if (this.subtotalCalled || this.productsScanned.length === 0) {
      UI_FUNCTIONS.toggleWarningPopupWindow('Error: subtotal cannot be calculated');

      return false;
    }

    this.totalSalePrice += this.calculateTaxOnProduct(this.totalSalePrice);

    UI_FUNCTIONS.addNewCustomTableRow('000TAX000', 'Tax', 1, this.totalTaxPayable);

    if (this.discount > 0) {
      this.totalSalePrice -= Math.floor(this.totalSalePrice * (this.discount / 100));

      const discountAmount = Math.floor(this.totalSalePrice * (this.discount / 100));

      UI_FUNCTIONS.addNewCustomTableRow('discount_00', 'Discount', 1, `${discountAmount}`);
    }

    this.subtotalCalled = true;

    newFunctionSelected('waiting_for_payment');

    return this.totalSalePrice;
  },
  resetToDefault() {
    this.productsScanned = [];
    this.totalSalePrice = 0;
    this.totalTaxPayable = 0;
    this.defaultTaxRate = 20;
    this.discount = 0;
    this.paymentMethod = '';
    this.changeDue = 0;
    this.subtotalCalled = false;
  },
};

export default CURRENT_SALE;
