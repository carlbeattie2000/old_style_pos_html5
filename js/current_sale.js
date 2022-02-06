const CURRENT_SALE = {
  productsScanned: [],
  totalSalePrice: 0,
  totalTaxPayable: 0,
  defaultTaxRate: 20,
  discount: 0,
  paymentMethod: '',
  changeDue: 0,
  subtotalCalled: false,
  calculateTaxOnProduct(productPrice) {
    this.totalTaxPayable += (this.defaultTaxRate / 100) * productPrice;
  },
  scanProduct(product) {
    const productToAdd = product;

    if (this.productsScanned.includes(productToAdd)) {
      this.calculateTaxOnProduct(productToAdd.price);
      this.totalSalePrice += productToAdd.price;

      this.productsScanned[this.productsScanned.indexOf(productToAdd)].qty += 1;

      return;
    }

    this.calculateTaxOnProduct(productToAdd.price);
    this.totalSalePrice += productToAdd.price;

    productToAdd.qty = 1;

    this.productsScanned.push(productToAdd);
  },
  addDiscount(percentageAmount) {
    if (this.scanProduct.length === 0) {
      // error popup function
      return false;
    }

    this.discount += percentageAmount;

    return true;
  },
  removeTaxOnSale() {
    if (this.scanProduct.length === 0) {
      // error popup function
      return false;
    }

    this.totalTaxPayable = 0;
    this.defaultTaxRate = 0;

    return true;
  },
  calculateSubtotal() {
    if (this.subtotalCalled || this.scanProduct.length === 0) {
      // error popup function
      return false;
    }

    this.totalSalePrice += this.totalTaxPayable;
    this.totalSalePrice -= this.totalSalePrice * (this.discount / 100);

    this.subtotalCalled = true;

    return true;

    // update the total display
    // add custom row showing the tax added
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