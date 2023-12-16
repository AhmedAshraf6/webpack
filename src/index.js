import preset from 'jss-preset-default';
import jss from 'jss';
import { classes } from './styles/zidStyles';
jss.setup(preset());
import axios from 'axios';
import Swiper from 'swiper';

import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';

document.addEventListener('DOMContentLoaded', async function () {
  if (window.location.pathname === '/cart/view') {
    try {
      const response = await axios.get(
        'https://dashboard.tuskup.appsbunches.com/api/script-content?store_name=qsekts.zid.store'
      );
      const { products, categories } = response.data.data;
      if (products?.length > 0) {
        // AlertMessages
        function AlertMessages({ image, bgColor, color, message }) {
          const errorMessage = document.createElement('div');
          errorMessage.classList.add(classes.Messages);
          errorMessage.classList.add('MessageAlert');
          errorMessage.style.borderRight = `12px solid ${color}`;
          errorMessage.style.color = color;
          errorMessage.style.background = bgColor;
          const box = `<div class=${classes.containerMessages}>
        <div class="${classes.containerMessagesContent}">
          <img src="${image}" alt='img'/>
          <h3 class="${classes.MessagesContentHead} ${classes.resetSpace}">${message}</h3>
        </div>
        <span class="${classes.cursorPointer} cancelMessage">
          <img src='https://dashboard.tuskup.appsbunches.com/frontend/img/cancel.svg' alt='img' />
        </span>
      </div>
      `;
          errorMessage.innerHTML = box;
          document.body.appendChild(errorMessage);
          setTimeout(() => {
            if (document.querySelector('.MessageAlert')) {
              document.querySelector('.MessageAlert').remove();
            }
          }, 10000);
          document
            .querySelector('.cancelMessage')
            .addEventListener('click', () => {
              document.querySelector('.MessageAlert').remove();
            });
        }

        // popUp
        const popUp = document.createElement('div');
        popUp.classList.add(classes.popUp);
        popUp.classList.add('popup');
        const overlay = document.createElement('div');
        overlay.classList.add(classes.overlay);
        document.body.appendChild(overlay);
        // Header
        const Header = document.createElement('div');
        Header.classList.add(classes.popUpHeader);
        Header.innerHTML = `<h5 class="${classes.popUpHeaderHead} ${classes.resetSpace}">اضف المزيد من المنتجات ذات الصلة</h5>
          <img src='https://dashboard.tuskup.appsbunches.com/frontend/img/close.svg' class='${classes.closeImg} close' />
          `;
        popUp.appendChild(Header);
        // closing modal
        popUp.addEventListener('click', function (event) {
          if (event.target.classList.contains('close')) {
            this.style.display = 'none';
            document.body.removeChild(overlay);
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
        document.querySelector('.cart').appendChild(popUp);

        // Create and append slides
        for (let i = 0; i < products.length; i++) {
          const item = products[i];
          const slide = document.createElement('div');
          slide.classList.add('swiper-slide');
          slide.classList.add(classes.swiperSlide);

          const mySLide = `<div class=${classes.popUpCard}>
              <a class=${
                classes.popUpContainerImg
              } href="https://qsekts.zid.store/products/${item.id}">
                <img src=${item?.main_image} alt="img" class=${
            classes.popUpImg
          } target='_blank'>
              </a>
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
                <div class="${
                  classes.popUpCardCartImgContainer
                } buttonCartToAdd">
                    <img
                      src="https://dashboard.tuskup.appsbunches.com/frontend/img/cart.svg"
                      class=${classes.popUpCardCartImg}
                    />
                </div>
              </div>
            </div>`;

          slide.innerHTML = mySLide;
          swiperWrapper.appendChild(slide);
          const cartButton = slide.querySelector('.buttonCartToAdd');
          if (cartButton) {
            cartButton.addEventListener('click', function () {
              addToCart(item);
            });
          }
        }

        async function addToCart(product) {
          try {
            const response = await axios.post(
              'https://dashboard.tuskup.appsbunches.com/api/add-to-cart',
              {
                product,
                'cart-session-id': window.cartObj.session_id,
                'domain-store': window.location.hostname,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
            AlertMessages({
              image:
                'https://dashboard.tuskup.appsbunches.com/frontend/img/success.svg',
              color: '#91268F',
              bgColor: '#F3F5F7',
              message: `${response.data.message}`,
            });

            console.log('Product added to cart:');
            console.log(response.data);
          } catch (error) {
            AlertMessages({
              image:
                'https://dashboard.tuskup.appsbunches.com/frontend/img/error.svg',
              color: '#CB1818',
              bgColor: '#F1DFDF',
              message: `${error.response?.data?.message}`,
            });
            console.log(error);
          }
        }

        // Initialize Swiper
        const mySwiper = new Swiper('.swiper', {
          slidesPerView: products.length < 2 ? products.length : '2', // Show 2 slides by default
          spaceBetween: 20, // Space between slides
          breakpoints: {
            1024: {
              slidesPerView: products.length < 4 ? products.length : 4,
              spaceBetween: 20,
            },
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });

        const lenSlides = Array.from(
          { length: mySwiper.params.slidesPerView },
          (_, index) => {
            return index + 1;
          }
        );
        let totalWidth = 0;
        if (window.innerWidth < 576) {
          document.querySelector('.popup').style.width = `90vw`;
        } else {
          lenSlides.forEach((slide) => {
            const a = document.querySelector('.swiper-slide');
            totalWidth += a.offsetWidth + 150;
          });
          document.querySelector('.popup').style.width = `${totalWidth}px`;
        }

        if (products.length > mySwiper.params.slidesPerView) {
          const prevButton = document.createElement('img');
          prevButton.src =
            'https://dashboard.tuskup.appsbunches.com/frontend/img/Arrow%20-%20Right.svg';
          prevButton.classList.add(classes.imgArrows);
          prevButton.classList.add('swiper-button-prev');
          sw.appendChild(prevButton);
          prevButton.addEventListener('click', () => mySwiper.slidePrev());

          const nextButton = document.createElement('img');
          nextButton.src =
            'https://dashboard.tuskup.appsbunches.com/frontend/img/Arrow%20-%20Left.svg';
          nextButton.classList.add(classes.imgArrows);
          nextButton.classList.add('swiper-button-next');
          sw.appendChild(nextButton);
          nextButton.addEventListener('click', () => mySwiper.slideNext());
        }
      }
      if (categories?.length > 0) {
        function AlertMessages({ image, bgColor, color, message }) {
          const errorMessage = document.createElement('div');
          errorMessage.classList.add(classes.Messages);
          errorMessage.classList.add('MessageAlert');
          errorMessage.style.borderRight = `12px solid ${color}`;
          errorMessage.style.color = color;
          errorMessage.style.background = bgColor;
          const box = `<div class=${classes.containerMessages}>
        <div class="${classes.containerMessagesContent}">
          <img src="${image}" alt='img'/>
          <h3 class="${classes.MessagesContentHead} ${classes.resetSpace}">${message}</h3>
        </div>
        <span class="${classes.cursorPointer} cancelMessage">
          <img src='https://dashboard.tuskup.appsbunches.com/frontend/img/cancel.svg' alt='img' />
        </span>
      </div>
      `;
          errorMessage.innerHTML = box;
          document.body.appendChild(errorMessage);
          setTimeout(() => {
            if (document.querySelector('.MessageAlert')) {
              document.querySelector('.MessageAlert').remove();
            }
          }, 4000);
          document
            .querySelector('.cancelMessage')
            .addEventListener('click', () => {
              document.querySelector('.MessageAlert').remove();
            });
        }
        // popUp
        const popUp = document.createElement('div');
        popUp.classList.add(classes.popUp);
        popUp.classList.add('popup');
        const overlay = document.createElement('div');
        overlay.classList.add(classes.overlay);
        document.body.appendChild(overlay);
        // Header
        const Header = document.createElement('div');
        Header.classList.add(classes.popUpHeader);
        Header.innerHTML = `<h5 class="${classes.popUpHeaderHead} ${classes.resetSpace}">اضف المزيد من المنتجات ذات الصلة</h5>
          <img src='https://dashboard.tuskup.appsbunches.com/frontend/img/close.svg' class='${classes.closeImg} close' />
          `;
        popUp.appendChild(Header);
        // closing modal
        popUp.addEventListener('click', function (event) {
          if (event.target.classList.contains('close')) {
            this.style.display = 'none';
            document.body.removeChild(overlay);
          }
        });
        // tabs
        const categoriesPopupTabs = document.createElement('div');
        categoriesPopupTabs.classList.add(classes.categoriesPopupTabs);
        const allCatTabs = categories.map(
          (cat) =>
            `<span id=${cat.id} class='${classes.category} ${
              cat.id === categories[0].id && classes.categoryActive
            }'>${cat.name}</span>`
        );
        categoriesPopupTabs.innerHTML = allCatTabs;

        const categoryElements = categoriesPopupTabs.querySelectorAll(
          `.${classes.category}`
        );
        categoryElements.forEach((element) => {
          element.addEventListener('click', () => {
            toggleActiveCategory(element.id);
          });
        });
        const toggleActiveCategory = (clickedId) => {
          categoryElements.forEach((element) => {
            if (element.id === clickedId) {
              element.classList.add(classes.categoryActive);
            } else {
              element.classList.remove(classes.categoryActive);
            }
          });
          categories.forEach((cat) => {
            if (cat.id === clickedId) {
              changeCategoriesInsideTabs(cat.products);
            }
          });
        };
        popUp.appendChild(categoriesPopupTabs);

        // Swiper
        const sw = document.createElement('div');
        sw.classList.add('swiper');
        sw.classList.add(classes.mySwiper);

        // Swiper Wrapper
        let swiperWrapper = document.createElement('div');
        swiperWrapper.classList.add('swiper-wrapper');
        swiperWrapper.classList.add(classes.swiperContainer);
        sw.appendChild(swiperWrapper);
        // append Swiper in popUp
        popUp.appendChild(sw);
        // Append popUp to Body
        document.querySelector('.cart').appendChild(popUp);

        // function change categories
        function changeCategoriesInsideTabs(products) {
          // Create and append slides
          swiperWrapper.textContent = '';
          for (let i = 0; i < products.length; i++) {
            const item = products[i];
            const slide = document.createElement('div');
            slide.classList.add('swiper-slide');
            slide.classList.add(classes.swiperSlide);

            const mySLide = `<div class=${classes.popUpCard}>
              <a class=${
                classes.popUpContainerImg
              } href="https://qsekts.zid.store/products/${item.id}">
                  <img src=${item?.main_image} alt="img" class=${
              classes.popUpImg
            } target='_blank'>
              </a>
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
                <div class="${
                  classes.popUpCardCartImgContainer
                } buttonCartToAdd">
                    <img
                      src="https://dashboard.tuskup.appsbunches.com/frontend/img/cart.svg"
                      class=${classes.popUpCardCartImg}
                    />
                </div>
              </div>
            </div>`;

            slide.innerHTML = mySLide;
            swiperWrapper.appendChild(slide);
            const cartButton = slide.querySelector('.buttonCartToAdd');
            if (cartButton) {
              cartButton.addEventListener('click', function () {
                addToCart(item);
              });
            }
          }
          async function addToCart(product) {
            try {
              const response = await axios.post(
                'https://dashboard.tuskup.appsbunches.com/api/add-to-cart',
                {
                  product,
                  'cart-session-id': window.cartObj.session_id,
                  'domain-store': window.location.hostname,
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
              );
              AlertMessages({
                image:
                  'https://dashboard.tuskup.appsbunches.com/frontend/img/success.svg',
                color: '#91268F',
                bgColor: '#F3F5F7',
                message: `${response.data.message}`,
              });
              console.log('Product added to cart:', response.data);
            } catch (error) {
              AlertMessages({
                image:
                  'https://dashboard.tuskup.appsbunches.com/frontend/img/error.svg',
                color: '#CB1818',
                bgColor: '#F1DFDF',
                message: `${error.response?.data?.message}`,
              });
              console.error('Error adding product to cart:', error);
            }
          }
          let mySwiper = new Swiper('.swiper', {
            slidesPerView: products.length < 2 ? products.length : '2', // Show 2 slides by default
            spaceBetween: 20, // Space between slides
            breakpoints: {
              1024: {
                slidesPerView: products.length < 4 ? products.length : 4,
                spaceBetween: 20,
              },
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          });
          const lenSlides = Array.from(
            { length: mySwiper.params.slidesPerView },
            (_, index) => {
              return index + 1;
            }
          );
          let totalWidth = 0;
          if (window.innerWidth < 576) {
            document.querySelector('.popup').style.width = `90vw`;
          } else {
            lenSlides.forEach((slide) => {
              const a = document.querySelector('.swiper-slide');
              totalWidth += 256;
            });
            console.log(totalWidth);
            document.querySelector('.popup').style.width = `${totalWidth}px`;
          }
          // prev and next
          let con = document.createElement('div');
          con.classList.add('arrowsContainer');
          if (products.length > mySwiper.params.slidesPerView) {
            const prevButton = document.createElement('img');
            prevButton.src =
              'https://dashboard.tuskup.appsbunches.com/frontend/img/Arrow%20-%20Right.svg';
            prevButton.classList.add(classes.imgArrows);
            prevButton.classList.add('swiper-button-prev');
            sw.appendChild(prevButton);
            prevButton.addEventListener('click', () => mySwiper.slidePrev());

            const nextButton = document.createElement('img');
            nextButton.src =
              'https://dashboard.tuskup.appsbunches.com/frontend/img/Arrow%20-%20Left.svg';
            nextButton.classList.add(classes.imgArrows);
            nextButton.classList.add('swiper-button-next');
            sw.appendChild(nextButton);
            nextButton.addEventListener('click', () => mySwiper.slideNext());
          } else {
            const prev = document.querySelector('.swiper-button-prev');
            const next = document.querySelector('.swiper-button-next');
            if (prev || next) {
              prev.remove();
              next.remove();
            }
          }
        }
        changeCategoriesInsideTabs(categories[0].products);
      }
    } catch (error) {
      console.log(error);
    }
  }
});
