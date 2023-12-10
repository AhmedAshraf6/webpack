import preset from 'jss-preset-default';
import jss from 'jss';
import { classes } from './styles/zidStyles';
jss.setup(preset());
import axios from 'axios';
import arrowLeft from './assets/arrowLeft.svg';
import arrowRight from './assets/arrowRight.svg';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';

document.addEventListener('DOMContentLoaded', async function () {
  try {
    const response = await axios.get(
      'https://dashboard.tuskup.appsbunches.com/api/script-content?store_name=qsekts.zid.store'
    );
    if (response.data.data.products.length > 0) {
      // popUp
      const popUp = document.createElement('div');
      popUp.classList.add(classes.popUp);
      // Header
      const Header = document.createElement('div');
      Header.classList.add(classes.popUpHeader);
      Header.innerHTML = `<h5 class="${classes.popUpHeaderHead} ${classes.resetSpace}">اضف المزيد من المنتجات ذات الصلة</h5>
      <img src='https://learnandedu.com/frontend/img/close.png' class='${classes.closeImg} close' />
      `;
      popUp.appendChild(Header);
      // closing modal
      popUp.addEventListener('click', function (event) {
        if (event.target.classList.contains('close')) {
          this.style.display = 'none';
        }
      });

      // Swiper
      const sw = document.createElement('div');
      sw.classList.add('swiper');
      sw.classList.add(classes.mySwiper);

      // Swiper Wrapper
      const swiperWrapper = document.createElement('div');
      swiperWrapper.classList.add('swiper-wrapper');
      swiperWrapper.classList.add(classes.swiperContainer);
      sw.appendChild(swiperWrapper);
      // append Swiper in popUp
      popUp.appendChild(sw);
      // Append popUp to Body
      document.querySelector('.products-cart').appendChild(popUp);

      // Create and append slides
      for (let i = 0; i < response.data.data.products.length; i++) {
        const item = response.data.data.products[i];
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');
        slide.classList.add(classes.swiperSlide);

        const mySLide = `<div class=${classes.popUpCard}>
          <div class=${classes.popUpContainerImg}>
            <img src=${item?.main_image} alt="img" class=${classes.popUpImg} >
          </div>
          <a class="${classes.link}" href="#">
              <h5 class="${classes.popUpCardHead} ${classes.resetSpace} ">${
          item?.name.ar
        }</h5>  
          </a>
          <div class="${classes.popUpCardFooter}">
            ${
              item?.sale_price?.amount !== null &&
              item?.sale_price?.amount !== undefined
                ? `<span class="${classes.popUpCardSalePrice}">
                        <div class=${classes.makeGap}>
                  ${item?.sale_price?.amount}
                  ${item?.sale_price?.currency}
                    </div>
                </span>
                `
                : ''
            }
            <span class="${
              item?.sale_price?.amount > 0
                ? classes.popUpCardLineThrough
                : classes.popUpCardPrice
            }">
              <div class=${classes.makeGap}>
                ${item?.price.amount}
                ${item?.price.currency}
              </div>
            </span>
            <div class="${classes.popUpCardCartImgContainer}">
                <img
                  src="https://learnandedu.com/frontend/img/cart2.png"
                  class=${classes.popUpCardCartImg}
                />
            </div>
          </div>
        </div>`;

        slide.innerHTML = mySLide;
        swiperWrapper.appendChild(slide);
      }

      // Initialize Swiper
      const mySwiper = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        centeredSlides: false,
        initialSlide: 2,

        breakpoints: {
          400: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },

          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        },
        modules: [Navigation],

        // Add other configurations as needed
      });
      // prev and next
      // const prev = document.createElement('div');
      // prev.classList.add('swiper-button-prev');
      // const next = document.createElement('div');
      // next.classList.add('swiper-button-next');
      // sw.appendChild(prev);
      // sw.appendChild(next);
      const con = document.createElement('div');
      con.classList.add(classes.con);

      const prevButton = document.createElement('img');
      prevButton.src = arrowRight;
      prevButton.addEventListener('click', () => mySwiper.slidePrev());

      const nextButton = document.createElement('img');
      nextButton.src = arrowLeft;
      nextButton.addEventListener('click', () => mySwiper.slideNext());

      con.appendChild(prevButton);
      con.appendChild(nextButton);
      sw.appendChild(con);
    }
  } catch (error) {
    console.log(error);
  }

  // end
  // const cart = document.querySelector('.products-cart');
  // cart.appendChild(sw);
});
