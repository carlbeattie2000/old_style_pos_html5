const POS_SYSTEM_DEFAULT = {
  CASH_DRAW_STATUS: false,
  OPEN_CASH_DRAW: function() {
    return this.CASH_DRAW_STATUS = true
  },
  CLOSE_CASH_DRAW: function() {
    return this.CASH_DRAW_STATUS = false
  }
}