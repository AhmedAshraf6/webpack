import preset from 'jss-preset-default';
import jss from 'jss';
import { classes } from './styles/zidStyles';
jss.setup(preset());
import axios from 'axios';
import close from './assets/close.png';
import cart2 from './assets/cart2.png';

document.addEventListener('DOMContentLoaded', function () {
  // end
  const relatedProduct = document.createElement('div');
  relatedProduct.textContent = 'asd';
  const renderedData = document.querySelector('.products-cart');
  renderedData.appendChild(relatedProduct);
});
