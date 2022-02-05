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

const POS_NEXT_PRODUCT_ADDING = {
  name: "",
  barcode: "",
  qty: 1,
  tax,
  price: 0,
  updateWithNewProduct: function({name, price, tax, barcode}) {
    this.name = name;
    this.barcode = barcode;
    this.price = price;
    this.tax = tax
  },
  setProductQty: function(qty) {
    this.qty += qty;
  },
  retrieveProduct: function() {
    return (
      {
        name: this.name,
        barcode: this.barcode,
        qty: this.qty,
        tax: this.tax,
        price: this.price
      }
    )
  }
}

const POS_PRODUCTS_CURRENT_CUSTOMER = {
  products: [],
  totalPrice: 0,
  totalTax: 0,
  discounts: 0,
  paymentMethod: "",
  refund: false,
  refundAmount: 0,
  cashback: 0,
  lotteryPayout: 0,
  changeDue: 0,
  addNewProduct: function(product) {
    this.totalTax += Math.round(product.price * (product.tax / 100));
    this.totalPrice += product.price;
    this.products.push(product);

    return
  },
  addDiscount: function(amount) {
    return this.discounts += amount;
  }
}