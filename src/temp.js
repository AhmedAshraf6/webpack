import preset from 'jss-preset-default';
import jss from 'jss';
import { classes } from './styles/zidStyles';
jss.setup(preset());
import axios from 'axios';

// // import Swiper JS
// import Swiper from 'swiper';
// import { Navigation } from 'swiper/modules';

// // import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';

document.addEventListener('DOMContentLoaded', async function () {
  // if (window.location.pathname === '/cart/view') {
  try {
    const response = await axios.get(
      'https://dashboard.tuskup.appsbunches.com/api/script-content?store_name=qsekts.zid.store'
    );
    const swiperStyles = document.createElement('link');
    swiperStyles.rel = 'stylesheet';
    swiperStyles.href = './swiper/swiper-bundle.min.css';
    document.head.appendChild(swiperStyles);

    // Create a <script> element to load Swiper's JavaScript file
    const swiperScript = document.createElement('script');
    swiperScript.src = './swiper/swiper-bundle.min.js';

    if (response.data.data.products.length > 0) {
      const carouselItems = response.data.data.products
        .map(
          (item) => `
              <div class='swiper-slide'>
                        <img src=${item.main_image} alt="img" class=${classes.relatedProductImg} >
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
      relatedProductCards.classList.add('swiper');
      const swiperWrapper = document.createElement('div');
      swiperWrapper.classList.add('swiper-wrapper');
      swiperWrapper.innerHTML = carouselItems;
      relatedProductCards.appendChild(swiperWrapper);
      // Append navigation elements
      const swiperPrev = document.createElement('div');
      swiperPrev.classList.add('swiper-button-prev');
      const swiperNext = document.createElement('div');
      swiperNext.classList.add('swiper-button-next');
      relatedProductCards.appendChild(swiperPrev);
      relatedProductCards.appendChild(swiperNext);
      relatedProduct.appendChild(relatedProductCards);
      // Initialize Swiper

      swiperScript.onload = function () {
        new Swiper('.swiper', {
          slidesPerView: 1,
          //  modules: [Navigation],
        });
      };
      document.body.appendChild(swiperScript);

      // end
      const renderedData = document.querySelector('.products-cart');
      renderedData.appendChild(relatedProduct);
    }
  } catch (error) {
    console.error('There was an error:', error);
  }
  // }
});
