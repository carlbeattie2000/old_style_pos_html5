import { clientSideCurrencyRendering, barcodeEntered } from './input_functions.js';

const MAIN_POS = {
  startingCashInRegister: 3000,
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
        <button class="add-item-btn" value="${barcode}">Add</button>
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

function loadFindItemsSearchEvent() {
  const searchInput = document.getElementById('itemSearch');

  searchInput.addEventListener('input', (e) => {
    const foundResults = MAIN_POS.POSItemList
      .filter((item) => {
        if (item.name.toLowerCase().includes(e.target.value) || item.category.toLowerCase().includes(e.target.value)) {
          return item;
        }
      });

    loadItemsIntoGUI(foundResults);
  });
}

function loadFindItemsAddButtons() {
  const buttons = document.querySelectorAll('.add-item-btn');

  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      barcodeEntered(e.target.value);
    });
  });
}

loadItemsIntoMainPosList()
  .then((items) => {
    MAIN_POS.POSItemList = items.products;
  })
  .finally(() => {
    loadItemsIntoGUI(MAIN_POS.POSItemList);
    loadFindItemsSearchEvent();
    loadFindItemsAddButtons();
  });

export default MAIN_POS;
