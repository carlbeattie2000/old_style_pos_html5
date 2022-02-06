// This whole page is a complete mess, and i'm not sure how nearly all of it, is going to actually connect to anything else vise versa.

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
  },
  CURRENT_FUNCTION_ACTIVE: "barcode",
  SET_CURRENT_FUNCTION: function(type) {
    this.CURRENT_FUNCTION_ACTIVE = type;
  }
}

const POS_ACCOUNTING = {
  cashInRegisterStartOfDay: 300,
  cashInRegister: 300,
  profit: 0,
  loss: 0,
  transactions: [],
  newTransaction: function(details) {
    // wow, need sleep before approaching this again, was about to forget about this, before somehow breaking through my tired blank mind,
    // and remembering i will need to calac the amount a customer givens in money and the change we give back.
    this.cashInRegister += details.price;
    return this.transactions.push(details)
  }
}

const POS_PRODUCTS_CURRENT_CUSTOMER = {
  products: [],
  totalPrice: 0,
  taxRate: 10,
  totalTax: 0,
  discounts: 0,
  paymentMethod: "",
  refund: false,
  refundAmount: 0,
  cashback: 0,
  lotteryPayout: 0,
  changeDue: 0,
  subTotalCalled: false,
  addNewProduct: function(product) {

    if (this.products.includes(product)) {

      this.totalTax += (this.taxRate / 100) * product.price;
      this.totalPrice += product.price;

      return this.products[this.products.indexOf(product)].qty += 1;
    }

    this.totalTax += (this.taxRate / 100) * product.price;
    this.totalPrice += product.price;

    product.qty = 1;

    return this.products.push(product);

  },
  addDiscount: function(amount) {
    return this.discounts += amount;
  },
  subTotal: function() {
    if (this.subTotalCalled || this.totalPrice === 0) {
      return true
    }

    this.totalPrice += this.totalTax;
    this.totalPrice -= this.totalPrice * (this.discounts / 100);
    this.subTotalCalled = true;

    updateTotalDisplay(handleCurrencyFormat(this.totalPrice));

    return CUSTOMER_ITEMS_DISPLAY.innerHTML += customTaxTableRow(handleCurrencyFormat(this.totalTax));
  },
  noTax: function() {
    this.taxRate = 0;
    this.totalTax = 0;
  },
  cashPayment: function(amount) {

    console.log(amount, this.totalPrice);

    if (amount < this.totalPrice) {
      return false
    }

    this.changeDue =  amount - this.totalPrice;

    return ({
      cashGive: amount,
      change: handleCurrencyFormat(this.changeDue)
    })

  },
  reset: function() {
    this.products = [];
    this.totalPrice = 0;
    this.taxRate = 10;
    this.totalTax = 0;
    this.discounts = 0;
    this.paymentMethod = "";
    this.refund = false;
    this.refundAmount = 0;
    this.cashback = 0;
    this.lotteryPayout = 0;
    this.changeDue = 0;
    this.subTotalCalled = false;
  }
}

const POS_SYSTEM_ACTIONS = {
  addingProductToOrder: function() {

    const barcode = KEYPAD_INPUT_DISPLAY.value;

    POS_SYSTEM_VARIABLES.ITEMS_LIST.forEach(product => {

      if (product.barcode == barcode && !POS_PRODUCTS_CURRENT_CUSTOMER.subTotalCalled && !itemAlreadyInTable(product)) {
        CUSTOMER_ITEMS_DISPLAY.innerHTML += addProductTableRow(product);

        POS_PRODUCTS_CURRENT_CUSTOMER.addNewProduct(product);

        return calcTotal();
      }

    })

    return POS_BUTTON_ACTIONS.handleKeyPadClearFull();

  },
  paymentProcessing: function() {
    const paymentAmount = POS_BUTTON_ACTIONS.getKeypadInputValue();

    switch (POS_SYSTEM_VARIABLES.KEYPAD_INPUT_TYPE) {
      case "cash":
        const processCashPayment = POS_PRODUCTS_CURRENT_CUSTOMER.cashPayment(paymentAmount);

        if (!processCashPayment) return KEYPAD_INPUT_DISPLAY.value = "PLEASE ENTER A VALUE GREATER THAN TOTAL!"

        return CHANGE_DUE_POPUP_DISPLAY.textContent = processCashPayment.change;
      default:
        break
    }
  }
}

const POS_BUTTON_ACTIONS = {
  toggleCashDrawGUI: function() {
    if (POS_SYSTEM_VARIABLES.CASH_DRAW_STATUS) {
      POS_SYSTEM_VARIABLES.CLOSE_CASH_DRAW();

      ALL_BUTTON_ON_SCREEN.forEach(button => button.disabled  = false);
      MAIN_POS_BODY.style.filter = "none";

      return CLOSE_CASH_DRAW_POPUP.classList.add("hidden");
    }

    ALL_BUTTON_ON_SCREEN.forEach(button => button.disabled = true);
    MAIN_POS_BODY.style.filter = "Blur(4px)";
    POS_SYSTEM_VARIABLES.OPEN_CASH_DRAW();
    CLOSE_CASH_DRAW_POPUP.classList.remove("hidden");
  },
  toggleFindItemsGUI: function() {
    if(POS_SYSTEM_VARIABLES.FIND_ITEMS_STATUS) {
      POS_SYSTEM_VARIABLES.FIND_ITEMS_TOGGLE();

      ALL_BUTTON_ON_SCREEN.forEach(button => button.disabled = false);
      MAIN_POS_BODY.style.filter = "none";

      return FIND_ITEMS_POPUP.classList.add("hidden");
    }

    ALL_BUTTON_ON_SCREEN.forEach(button => button.disabled = true);
    MAIN_POS_BODY.style.filter = "Blur(4px)";
    POS_SYSTEM_VARIABLES.FIND_ITEMS_TOGGLE();
    FIND_ITEMS_POPUP.classList.remove("hidden");
  },
  handleKeyPadInput: function(value) {
    KEYPAD_INPUT_DISPLAY.value += value;
  },
  handleKeyPadClear: function(value) {
    KEYPAD_INPUT_DISPLAY.value = value;
  },
  handleKeyPadClearFull: function() {
    KEYPAD_INPUT_DISPLAY.value = "";
  },
  handleKeyPadInputTypeChange: function(newType) {
    POS_SYSTEM_VARIABLES.CHANGE_KEYPAD_INPUT_TYPE(newType);
    POS_SYSTEM_VARIABLES.SET_CURRENT_FUNCTION(newType);

    KEYPAD_INPUT_DISPLAY.placeholder = newType;
  },
  getKeypadInputValue: function() {
    return KEYPAD_INPUT_DISPLAY.value;
  },
  runCurrentSystemFunction: function() {

    switch(POS_SYSTEM_VARIABLES.CURRENT_FUNCTION_ACTIVE) {
      case "barcode":
        POS_SYSTEM_ACTIONS.addingProductToOrder();
        break
      default:
        break 
    }

  },
  VOID: function() {
    itemDisplayRemoveItems();
    KEYPAD_INPUT_DISPLAY.value = "";
    CUSTOMER_ITEMS_DISPLAY_TOTAL.value = "";
    this.handleKeyPadInputTypeChange("barcode");
    POS_PRODUCTS_CURRENT_CUSTOMER.reset();
    
  }
}