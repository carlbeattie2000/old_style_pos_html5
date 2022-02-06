const MAIN_POS = {
  cashInRegister: 300,
  currentStatus: 'WAITING_FOR_FUNCTION',
  currentSelectedFunction: 'barcode',
  cashDrawStatus: false,
  findItemWindowStatus: false,
  POSItemList: [],
  transactions: [],
  accounting: {
    profit: 0,
    loss: 0,
  },
  resetAfterSale() {
    this.currentStatus = 'WAITING_FOR_FUNCTION';
    this.currentSelectedFunction = 'barcode';
    this.cashDrawStatus = false;
    this.findItemWindowStatus = false;
  },
  selectedFunctionChange(newFunctionSelected) {
    this.currentSelectedFunction = newFunctionSelected;
  },
};
