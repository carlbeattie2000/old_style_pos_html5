function addProductTableRow(product) {

  return (
    `
    <tr id="${product.barcode}">
      <td>${product.barcode}</td>
      <td>${product.name}</td>
      <td id="qty_${product.barcode}">1</td>
      <td>@${handleCurrencyFormat(product.price)}</td>
      <td id="total_${product.barcode}">${handleCurrencyFormat(product.price)}</td>
    </tr>
  `
  )

}

function itemAlreadyInTable(product) {
  let found = false;

  Object.values(CUSTOMER_ITEMS_DISPLAY.children).forEach(row => {

     if (row.childNodes[0].id == product.barcode) {
      POS_PRODUCTS_CURRENT_CUSTOMER.addNewProduct(product);

      const qty = document.getElementById(`qty_${product.barcode}`);
      const total = document.getElementById(`total_${product.barcode}`);

      qty.textContent = parseInt(qty.textContent) + 1;

      total.textContent = handleCurrencyFormat(parseInt(qty.textContent) * product.price);

      found = true;

      calcTotal();
     }

  })

  return found
}

function calcTotal() {
  let total = 0;

  POS_PRODUCTS_CURRENT_CUSTOMER.products.forEach(product => {
    total += product.price * product.qty;
  })

  return CUSTOMER_ITEMS_DISPLAY_TOTAL.value = "$" + handleCurrencyFormat(total);
  
}

function updateTotalDisplay(amount) {
  CUSTOMER_ITEMS_DISPLAY_TOTAL.value = "$" + amount;
}

function customTaxTableRow (taxAmount) {
  return (
    `
    <tr id="tax">
      <td></td>
      <td>Tax</td>
      <td>1</td>
      <td></td>
      <td>${taxAmount}</td>
    </tr>
  `
  )
}

function itemDisplayRemoveItems() {
  Object.values(CUSTOMER_ITEMS_DISPLAY.children).forEach(row => {
    row.childNodes.forEach(row_item => {
      if (row_item.id) {
        row_item.remove();
      }
    })
  })
}