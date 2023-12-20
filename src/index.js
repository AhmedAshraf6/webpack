import preset from 'jss-preset-default';
import jss from 'jss';
import { classes } from './styles/zidStyles';
jss.setup(preset());

import axios from 'axios';
import Swiper from 'swiper';

import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';

// Get Data (Reusable)
class GetData {
  async getMyData() {
    try {
      const response = await axios.get(
        'https://dashboard.tuskup.appsbunches.com/api/script-content?store_name=qsekts.zid.store'
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
}
// Handle Any Api Data (Reusable)
class HandleAPi {
  async addToCart(product) {
    const message = new AlertMessages();
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
      message.showMessage({
        image:
          'https://dashboard.tuskup.appsbunches.com/frontend/img/success.svg',
        color: '#91268F',
        bgColor: '#F3F5F7',
        message: `${response?.data?.message}`,
      });
    } catch (error) {
      message.showMessage({
        image:
          'https://dashboard.tuskup.appsbunches.com/frontend/img/success.svg',
        color: '#91268F',
        bgColor: '#F3F5F7',
        message: `${error?.data?.message}`,
      });
    }
  }
}

// Handle Any Error Messages (Reusable)
class AlertMessages {
  showMessage({ image, bgColor, color, message }) {
    if (document.querySelector('.MessageAlert')) {
      document.querySelector('.MessageAlert').remove();
    }
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
    document.querySelector('.cancelMessage').addEventListener('click', () => {
      document.querySelector('.MessageAlert').remove();
    });
  }
}

class Ui {
  // Create Product Modal Structure
  setupProductModal(products) {
    // popUp
    this.createPopup();
    this.createHeader('اضف المزيد من المنتجات ذات الصلة');
    this.createSwiper(products);
  }
  // Create Category Modal Structure
  setupCategoryModal(categories) {
    // popUp
    this.createPopup();
    this.createHeader('اضف المزيد من المنتجات ذات الصلة');
    this.createTabs(categories);
    this.createSwiper(categories[0].products);
  }

  // create popup for Category or Product (Reusable)
  createPopup() {
    const popUp = document.createElement('div');
    popUp.classList.add(classes.popUp); // classes.popUp
    popUp.classList.add('popup');
    const overlay = document.createElement('div');
    overlay.classList.add(classes.overlay);
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    document.querySelector('.cart').appendChild(popUp);
    // closing modal
    popUp.addEventListener('click', function (event) {
      if (event.target.classList.contains('close')) {
        this.remove();
        overlay.remove();
      }
    });
  }
  // Create Header (Reusable)
  createHeader(text) {
    const Header = document.createElement('div');
    Header.classList.add(classes.popUpHeader);
    Header.innerHTML = `<h5 class="${classes.popUpHeaderHead} ${classes.resetSpace}">${text}</h5>
          <img src='https://dashboard.tuskup.appsbunches.com/frontend/img/close.svg' class='${classes.closeImg} close' />
          `;
    this.addElementToPopup(Header);
  }

  // Create Swiper For Category Modal (Reusable)
  createSwiper(products) {
    if (document.querySelector('.swiper')) {
      document.querySelector('.swiper').remove();
    }
    const sw = document.createElement('div');
    sw.classList.add('swiper');
    sw.classList.add(classes.mySwiper);
    // Swiper Wrapper
    let swiperWrapper = document.createElement('div');
    swiperWrapper.classList.add('swiper-wrapper');
    swiperWrapper.classList.add(classes.swiperContainer);

    sw.appendChild(swiperWrapper);
    this.addElementToPopup(sw);
    this.setProducts(products);

    // swiperWrapper.textContent = '';
    let mySwiper = new Swiper('.swiper', {
      slidesPerView: products.length < 2 ? products.length : '2', // Show 2 slides by default
      spaceBetween: 20, // Space between slides
      breakpoints: {
        1024: {
          slidesPerView: products.length < 4 ? products.length : '4',
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
        totalWidth += 300;
      });
      console.log(totalWidth);
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
    } else {
      const prev = document.querySelector('.swiper-button-prev');
      const next = document.querySelector('.swiper-button-next');
      if (prev || next) {
        prev.remove();
        next.remove();
      }
    }
  }

  // Set Products For Product Modal (Reusable)
  setProducts(products) {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    const handleApi = new HandleAPi();
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
          handleApi.addToCart(item);
        });
      }
    }
  }

  // Add Eny ELement Created to popup (Reusable)
  addElementToPopup(element) {
    const popup = document.querySelector('.popup');
    popup.appendChild(element);
  }
  // Create Tabs For Categories Only for Category Modal
  createTabs(categories) {
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
          this.createSwiper(cat.products);
        }
      });
    };
    this.addElementToPopup(categoriesPopupTabs);
  }
}
class ProductOptions extends Ui {
  setupProductOption() {
    this.createPopupOptions();
    this.makeHeader();
    this.createForm();
    this.createInput('text', 'اختر اللون', 'اختر اللون');
    this.createInputNumber({ label: 'الكمية' });
    this.createDropdown({ label: 'اختر اللون' });
  }
  // Create popupOptions
  createPopupOptions() {
    const popupOptions = document.createElement('div');
    popupOptions.classList.add(classes.popupOptions);
    popupOptions.classList.add('popupOptions');
    popupOptions.addEventListener('click', function (event) {
      if (event.target.classList.contains('clo se')) {
        popupOptions.remove();
      }
    });
    document.querySelector('.cart').appendChild(popupOptions);
  }
  // Create Header
  makeHeader() {
    const Header = document.createElement('div');
    Header.classList.add(classes.popUpHeader);
    Header.innerHTML = `<h5 class="${classes.popUpHeaderHead} ${classes.resetSpace}">اختر المزيد من خيارات المنتج</h5>
          <img src='https://dashboard.tuskup.appsbunches.com/frontend/img/close.svg' class='${classes.closeImg} close' />
          `;
    this.appendDataToPopup(Header);
  }

  createForm() {
    const form = document.createElement('form');
    form.classList.add(classes.form);
    form.classList.add('AnaqidForm');
    this.appendDataToPopup(form);
  }

  // Create input
  createInput(type, placeholder, label) {
    const inputContainer = document.createElement('div');
    inputContainer.classList.add(classes.inputContainer);
    inputContainer.innerHTML = `<label class="${classes.label}">${label}</label><input class=${classes.input} type=${type} placeholder=${placeholder}/>`;
    document.querySelector('.AnaqidForm').appendChild(inputContainer);
  }
  // Number Input
  createInputNumber({ type, placeholder, label }) {
    const inputContainer = document.createElement('div');
    inputContainer.classList.add(classes.inputContainer);
    inputContainer.innerHTML = `<label class="${classes.label}">${label}</label><input type="number" min="0" max="100" value="10" class=${classes.inputNumber} />`;
    //   inputContainer.innerHTML = `<input type="number" min="0" max="100" value="10" class=${classes.input} />
    // <img src=${img2} alt="Decrement" class="${classes.InputIcon} ${classes.inputIconDecrement}" />
    // <img src=${img1} alt="Increment" class="${classes.InputIcon} ${classes.inputIconIncrement}"/>`;
    document.querySelector('.AnaqidForm').appendChild(inputContainer);
  }
  // Dropdown
  createDropdown({ type, placeholder, label }) {
    const inputContainer = document.createElement('div');
    inputContainer.classList.add(classes.inputContainer);
    inputContainer.innerHTML = `<label class="${classes.label}"  >${label}</label><select id="mySelect" class=${classes.input}>
                                    <option value="option1">Option 1</option>
                                    <option value="option2">Option 2</option>
                                    <option value="option3">Option 3</option>
                                </select>`;

    document.querySelector('.AnaqidForm').appendChild(inputContainer);
  }
  // Checkbox
  createCheckbox({ type, placeholder, label }) {
    const inputContainer = document.createElement('div');
    inputContainer.classList.add(classes.inputContainer);
    inputContainer.innerHTML = `<label class="${classes.label}"  >${label}</label><select id="mySelect" class=${classes.input}>
                                    <option value="option1">Option 1</option>
                                    <option value="option2">Option 2</option>
                                    <option value="option3">Option 3</option>
                                </select>`;

    document.querySelector('.AnaqidForm').appendChild(inputContainer);
  }

  // append any elements to popUpOption
  appendDataToPopup(element) {
    const popupOptions = document.querySelector('.popupOptions');
    popupOptions.appendChild(element);
  }
}

document.addEventListener('DOMContentLoaded', async function () {
  // if (window.location.pathname === '/cart/view') {
  const productsData = new GetData();
  const ui = new Ui();
  const productoption = new ProductOptions();
  productsData.getMyData().then((data) => {
    if (data?.products?.length > 0) {
      ui.setupProductModal(data?.products);
      productoption.setupProductOption();
    } else if (data?.categories?.length > 0) {
      ui.setupCategoryModal(data?.categories);
      productoption.setupProductOption();
    }
  });
  // }
});
