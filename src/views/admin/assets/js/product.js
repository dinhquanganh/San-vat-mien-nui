let products = '<%-products%>';
let totalShowProduct = 0;

products.forEach((product) => {
  if (product.show == 'on') {
    totalShowProduct++;
  }
});
document.querySelector('#total-show-product').innerHTML = totalShowProduct;
