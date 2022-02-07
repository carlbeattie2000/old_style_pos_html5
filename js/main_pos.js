import { clientSideCurrencyRendering } from './input_functions.js';

const MAIN_POS = {
  cashInRegister: 30000,
  currentStatus: 'WAITING_FOR_FUNCTION',
  currentSelectedFunction: 'barcode',
  POSItemList: [],
  transactions: [],
  accounting: {
    profit: 0,
    loss: 0,
  },
  resetAfterSale() {
    this.currentStatus = 'WAITING_FOR_FUNCTION';
    this.currentSelectedFunction = 'barcode';
    this.cashDrawStatus = false;
    this.findItemWindowStatus = false;
  },
  selectedFunctionChange(newFunctionSelected) {
    this.currentSelectedFunction = newFunctionSelected;
  },
};

async function loadItemsIntoMainPosList() {
  const getItems = await fetch('./json/products.json');
  const itemsToAdd = await getItems.json();

  return itemsToAdd;
}

function itemDivTemplate(
  {
    category, price, weight, imageURL, barcode,
  },
) {
  return (
    `
    <div class="lookup-item">
      <img src="${imageURL}">
      <div class="item-details">
        <p>$${clientSideCurrencyRendering(price)}</p>
        <p>${weight}g</p>
        <p>${category}</p>
        <p>${barcode}</p>
      </div>
      <div class="add-item">
        <button>Add</button>
      </div>
    </div>
    `
  );
}

function loadItemsIntoGUI(items) {
  const findElementsGridID = document.getElementById('item_lookup_display_items');

  let newElementsToAdd = '';

  items.forEach((item) => {
    newElementsToAdd += itemDivTemplate(item);
  });

  findElementsGridID.innerHTML = newElementsToAdd;
}

loadItemsIntoMainPosList()
  .then((items) => {
    MAIN_POS.POSItemList = items.products;
  })
  .finally(() => {
    loadItemsIntoGUI(MAIN_POS.POSItemList);
  });

export default MAIN_POS;
