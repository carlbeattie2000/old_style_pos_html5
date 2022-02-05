function addProductTableRow(product) {

  return (`
    <tr id="${product.barcode}">
      <td>${product.barcode}</td>
      <td>${product.name}</td>
      <td id="qty_${product.barcode}">1</td>
      <td>@${product.price}</td>
      <td>${product.price}</td>
    </tr>
  `)
  
}

function itemAlreadyInTable(barcode) {
  let found = false;

  Object.values(CUSTOMER_ITEMS_DISPLAY.children).forEach(row => {

     if (row.childNodes[0].id == barcode) {
       const qty = document.getElementById(`qty_${barcode}`);

       qty.textContent = parseInt(qty.textContent) + 1;
       found = true;
     }

  })

  return found
}