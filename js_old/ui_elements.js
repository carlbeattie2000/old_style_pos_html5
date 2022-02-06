const CLOSE_CASH_DRAW_POPUP = document.getElementById("close_cash_draw");
const FIND_ITEMS_POPUP = document.getElementById("find_items_popup");
const FIND_ITEMS_ITEM_DISPLAY = document.getElementById("item_lookup_display_items");
const MAIN_POS_BODY = document.querySelector(".main_pos_body");
const KEYPAD_INPUT_DISPLAY = document.getElementById("keypad_input_display");
const CUSTOMER_ITEMS_DISPLAY = document.getElementById("items_basket");
const CUSTOMER_ITEMS_DISPLAY_TOTAL = document.getElementById("item_display_total");
const CHANGE_DUE_POPUP_DISPLAY = document.getElementById("close_cash_draw_change_due");

// reset values, will be moved to POS_DEFAULT
CUSTOMER_ITEMS_DISPLAY_TOTAL.value = "";
KEYPAD_INPUT_DISPLAY.value = "";