const UI_FUNCTIONS = {
  cashDrawOpenPopup: document.getElementById('close_cash_draw'),
  findItemsPopup: document.getElementById('find_items_popup'),
  allPOSButtons: document.querySelectorAll('.btn-pos'),
  mainPOSBody: document.querySelector('.main_pos_body'),
  keypadInputDisplay: document.getElementById('keypad_input_display'),
  totalDisplay: document.getElementById('item_display_total'),
  saleItemsDisplay: document.getElementById('items_basket'),
  warningPopupBox: document.getElementById('warning-message-popup'),

  toggleWarningPopupWindow(message = '') {
    const warningPopupMessage = document.getElementById('warning-popup-message');

    warningPopupMessage.textContent = message;

    if (this.warningPopupBox.classList.toggle('hidden')) {
      this.toggleBackgroundFunctionality('none');

      return;
    }

    this.toggleBackgroundFunctionality('Blur(4px)');
  },

  toggleFindItemPopup() {
    const findItemPopupStatus = this.findItemsPopup.classList.toggle('hidden');

    if (findItemPopupStatus) {
      this.toggleBackgroundFunctionality('none');

      return;
    }

    this.toggleBackgroundFunctionality('Blur(4px)');
  },

  openCashDrawOpenPopup() {
    this.toggleBackgroundFunctionality('Blur(4px)');

    this.cashDrawOpenPopup.classList.remove('hidden');
  },

  closeCashDrawOpenPopup() {
    this.toggleBackgroundFunctionality('none');

    this.cashDrawOpenPopup.classList.add('hidden');
  },

  clearInputValueByOneCharacter() {
    const keypadInputValueLength = this.keypadInputDisplay.value.length;

    const newKeyPadInputValue = this.keypadInputDisplay.value.slice(0, keypadInputValueLength - 1);

    this.keypadInputDisplay.value = newKeyPadInputValue;
  },

  clearInputValueFullPurge() {
    this.keypadInputDisplay.value = '';
  },

  addCharacterToInputValue(input) {
    this.keypadInputDisplay.value += input;
  },

  getKeypadInput() {
    return this.keypadInputDisplay.value;
  },

  updateInputPlaceholderWithSelectedFunction(selectedFunction) {
    this.keypadInputDisplay.placeholder = selectedFunction;
  },

  renderClientCurrencyFormat(amount) {
    return amount / 100;
  },

  addNewSaleProduct(product) {
    const newElementToAdd = `
      <tr id="${product.barcode}">
        <td>${product.barcode}</td>
        <td>${product.name}</td>
        <td id="qty_${product.barcode}">1</td>
        <td>@${this.renderClientCurrencyFormat(product.price)}</td>
        <td id="total_${product.barcode}">${this.renderClientCurrencyFormat(product.price)}</td>
      </tr>
    `;

    this.saleItemsDisplay.innerHTML += newElementToAdd;
  },

  addNewCustomTableRow(barcode = '', title, qty, totalPrice) {
    const newElementToAdd = `
      <tr id="${title}">
        <td id="${barcode}">${barcode}</td>
        <td>${title}</td>
        <td id="qty_${qty}">1</td>
        <td></td>
        <td id="total_${title}">${this.renderClientCurrencyFormat(totalPrice)}</td>
      </tr>
    `;

    this.saleItemsDisplay.innerHTML += newElementToAdd;
  },

  updateProductQty(barcode, price) {
    const qtyElement = document.getElementById(`qty_${barcode}`);
    const netSaleElement = document.getElementById(`total_${barcode}`);

    qtyElement.textContent = parseInt(qtyElement.textContent, 10) + 1;
    netSaleElement.textContent = this.renderClientCurrencyFormat(price * parseInt(qtyElement.textContent, 10));
  },

  calculateTotalSalePrice(currentSaleProducts) {
    let total = 0;

    currentSaleProducts.forEach((product) => {
      total += product.price * product.qty;
    });

    this.totalDisplay.value = `$ ${this.renderClientCurrencyFormat(total)}`;
  },

  setTotalSalePrice(price) {
    this.totalDisplay.value = `$ ${this.renderClientCurrencyFormat(price)}`;
  },

  clearProductsInSale() {
    const rowsToFilterThrough = [...this.saleItemsDisplay.childNodes];

    const filteredRows = rowsToFilterThrough.filter((tableRow) => tableRow.id);

    filteredRows.forEach((tableRow) => tableRow.remove());

    this.totalDisplay.value = '$';
  },

  toggleDisableAllMainButtons() {
    this.allPOSButtons.forEach((button) => {
      const buttonToDisable = button;

      buttonToDisable.disabled = !buttonToDisable.disabled;
    });
  },

  mainPOSBodySetFilter(filterType) {
    this.mainPOSBody.style.filter = filterType;
  },

  toggleBackgroundFunctionality(filterType) {
    this.toggleDisableAllMainButtons();
    this.mainPOSBodySetFilter(filterType);
  },

  newSaleClear() {
    this.clearInputValueFullPurge();
    this.clearProductsInSale();
    this.saleItemsDisplay.value = '';
    this.keypadInputDisplay.placeholder = 'barcode';
  },
};

UI_FUNCTIONS.totalDisplay.value = '';

export default UI_FUNCTIONS;
