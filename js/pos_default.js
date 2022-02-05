const POS_SYSTEM_VARIABLES = {
  KEYPAD_INPUT_TYPE: "barcode",
  CHANGE_KEYPAD_INPUT_TYPE: function(type) {
    this.KEYPAD_INPUT_TYPE = type
  },
  CASH_DRAW_STATUS: false,
  OPEN_CASH_DRAW: function() {
    return this.CASH_DRAW_STATUS = true
  },
  CLOSE_CASH_DRAW: function() {
    return this.CASH_DRAW_STATUS = false
  },
  FIND_ITEMS_STATUS: false,
  FIND_ITEMS_TOGGLE: function() {
    this.FIND_ITEMS_STATUS = !this.FIND_ITEMS_STATUS
  },
  ITEMS_LIST: [],
  LOAD_ITEMS_LIST: function(list) {
    this.ITEMS_LIST = list;
  }
}