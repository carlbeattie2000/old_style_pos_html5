const UI_FUNCTIONS = {
  cashDrawOpenPopup: document.getElementById('close_cash_draw'),
  findItemsPopup: document.getElementById('find_items_popup'),
  allPOSButtons: document.querySelectorAll('.btn-pos'),
  mainPOSBody: document.querySelector('.main_pos_body'),
  keypadInputDisplay: document.getElementById('keypad_input_display'),
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
};

export default UI_FUNCTIONS;
