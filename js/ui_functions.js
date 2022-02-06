const UI_FUNCTIONS = {
  cashDrawOpenPopup: document.getElementById('close_cash_draw'),
  findItemsPopup: document.getElementById('find_items_popup'),
  allPOSButtons: document.querySelectorAll('.btn-pos'),
  mainPOSBody: document.querySelector('.main_pos_body'),
  keypadInputDisplay: document.getElementById('keypad_input_display'),

  openWarningPopupWindow(message) {
    console.error(new Error(message)); // will show popup window with error message
  },

  closeWarningPopupWindow() {
    // code to close warning popup window
  },

  openFindItemPopup() {
    // run code to open find item popup
  },

  closeFindItemPopup() {
    // run code to close find item popup
  },

  openCashDrawOpenPopup() {
    this.toggleDisableAllMainButtons();

    this.mainPOSBodySetFilter('Blur(4px)');

    this.cashDrawOpenPopup.classList.remove('hidden');
  },

  closeCashDrawOpenPopup() {
    this.toggleDisableAllMainButtons();

    this.mainPOSBodySetFilter('none');

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

  updateInputPlaceholderWithSelectedFunction(selectedFuntion) {

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
};

export default UI_FUNCTIONS;
