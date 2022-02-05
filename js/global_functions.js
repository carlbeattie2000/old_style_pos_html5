var measureTimeFromClickStartToEnd;

function startClickMeasurement() {
    start_time = new Date();
}
function endClickMeasurement() {
    var now = new Date();
    return now-start_time
}

document.body.onload = () => {
  getProducts()
    .then(returnedProducts =>{
    POS_SYSTEM_DEFAULT.LOAD_ITEMS_LIST(returnedProducts["products"]);
    })
    .finally(() => {
      let elementsToAdd = '';

      POS_SYSTEM_DEFAULT.ITEMS_LIST.forEach(product => {
        elementsToAdd += `
          <div class="lookup-item">
            <img src="${product.imageURL}">
            <div class="item-details">
              <p>$${product.price}</p>
              <p>${product.weight}g</p>
              <p>${product.tax}%</p>
              <p>${product.category}</p>
            </div>
            <div class="add-item">
              <button>Add</button>
            </div>
          </div>
        `
      })
      
      FIND_ITEMS_ITEM_DISPLAY.innerHTML = elementsToAdd
    })
}