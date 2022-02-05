async function getProducts() {
  const products = await fetch("../json/products.json");
  const results = await products.json();

  return results
}