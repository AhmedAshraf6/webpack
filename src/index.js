import preset from 'jss-preset-default';
import jss from 'jss';
import { classes } from './styles/zidStyles';
jss.setup(preset());
import axios from 'axios';

document.addEventListener('DOMContentLoaded', async function () {
  if (window.location.pathname === '/cart/view') {
    try {
      const response = await axios.get(
        'https://learnandedu.com/api/script-products?store_name=qsekts.zid.store'
      );
      if (response.data.data.products.length > 0) {
        const carouselItems = response.data.data.products
          .map(
            (item) => `
              <div class=${classes.relatedProductCard}>
                    <a href="#">
                        <img src=${item.main_image} alt="img" class=${
              classes.relatedProductImg
            } >

                    </a>
                    <a class=${classes.link} href="#">
                        <h5 class=${classes.relatedProductCardHead}>${
              item.name.ar
            }</h5>
                    </a>
                    <div class=${classes.relatedProductCardFooter}>
                      <span class=${
                        item.sale_price.amount > 0
                          ? classes.relatedProductCardLineThrough
                          : ''
                      }>
                        ${item?.price?.amount}${item?.price?.currency}
                      </span>
                      ${
                        item?.sale_price?.amount !== null &&
                        item?.sale_price?.amount !== undefined
                          ? `<span class=${classes.relatedProductCardSalePrice}>${item?.sale_price?.amount}${item?.sale_price?.currency}</span>`
                          : ''
                      }
                      <div class=${classes.relatedProductCardCartImgContainer}>
                         <img src='https://learnandedu.com/frontend/img/cart2.png' class=${
                           classes.relatedProductCardCartImg
                         } />
                      </div>
                    </div>

                </div>
            `
          )
          .join('');
        // main popup
        const relatedProduct = document.createElement('div');
        relatedProduct.classList.add(classes.relatedProduct);

        // Header
        const relatedProductHeader = document.createElement('div');
        relatedProductHeader.classList.add(classes.relatedProductHeader);
        relatedProductHeader.innerHTML = `<h5 class=${classes.relatedProductHeaderHead}>اضف المزيد من المنتجات ذات الصلة</h5>
      <img src='https://learnandedu.com/frontend/img/close.png' class='${classes.closeImg} close' />
      `;
        relatedProduct.appendChild(relatedProductHeader);
        // closing modal
        relatedProduct.addEventListener('click', function (event) {
          if (event.target.classList.contains('close')) {
            this.style.display = 'none';
          }
        });

        // Card Container
        const relatedProductCards = document.createElement('div');
        relatedProductCards.classList.add(classes.relatedProductCards);
        relatedProductCards.innerHTML = carouselItems;
        relatedProduct.appendChild(relatedProductCards);

        // Footer
        //   const relatedProductCardFooter = document.createElement('div');
        //   relatedProductCardFooter.classList.add(classes.relatedProductFooter);
        //   relatedProductCardFooter.innerHTML = `<button class=${classes.relatedProductFooterButton}>التقدم لاتمام الطلب</button>
        // `;
        //   relatedProduct.appendChild(relatedProductCardFooter);

        // end
        const renderedData = document.querySelector('.cart');
        renderedData.appendChild(relatedProduct);
      }
    } catch (error) {
      console.error('There was an error:', error);
    }
  }
});
