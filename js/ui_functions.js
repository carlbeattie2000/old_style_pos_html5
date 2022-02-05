function addProductTableRow(product) {

  return (
    `
    <tr id="${product.barcode}">
      <td>${product.barcode}</td>
      <td>${product.name}</td>
      <td id="qty_${product.barcode}">1</td>
      <td>@${product.price}</td>
      <td id="total_${product.barcode}">${product.price}</td>
    </tr>
  `
  )

}

function itemAlreadyInTable(barcode, price) {
  let found = false;

  Object.values(CUSTOMER_ITEMS_DISPLAY.children).forEach(row => {

     if (row.childNodes[0].id == barcode) {
       const qty = document.getElementById(`qty_${barcode}`);
       const total = document.getElementById(`total_${barcode}`);

       qty.textContent = parseInt(qty.textContent) + 1;

       total.textContent = parseInt(qty.textContent) * price;

       found = true;

       calcTotal();
     }

  })

  return found
}

function calcTotal() {
  let total = 0;

  Object.values(CUSTOMER_ITEMS_DISPLAY.children).forEach(row => {

    row.childNodes[0].childNodes.forEach(row_item => {

      if (row_item.id) {
        row_item.id.includes("total") ? total += parseFloat(row_item.textContent) : null 
      }

    })

  })

  return CUSTOMER_ITEMS_DISPLAY_TOTAL.value = "$" + total
  
}