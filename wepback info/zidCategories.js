import preset from 'jss-preset-default';
import jss from 'jss';
import { classes } from './styles/zidCategories';
jss.setup(preset());
import axios from 'axios';

document.addEventListener('DOMContentLoaded', async function () {
  if (window.location.pathname === '/cart/view') {
    try {
      const response = await axios.get(
        'https://learnandedu.com/api/script-categories?store_name=qsekts.zid.store'
      );
      const { categories } = response.data.data;
      const [categoryOne, categoryTwo] = categories;
      if (categories.length > 0) {
        // main popup
        const categoriesPopup = document.createElement('div');
        categoriesPopup.classList.add(classes.categoriesPopup);

        // Header
        const categoriesPopupHeader = document.createElement('div');
        categoriesPopupHeader.classList.add(classes.categoriesPopupHeader);
        categoriesPopupHeader.innerHTML = `<h5 class=${classes.categoriesPopupHeaderHead}>اضف المزيد من المنتجات  </h5>
      <img src='https://learnandedu.com/frontend/img/close.png' class='${classes.closeImg} close' />
      `;
        categoriesPopup.appendChild(categoriesPopupHeader);
        // closing modal
        categoriesPopup.addEventListener('click', function (event) {
          if (event.target.classList.contains('close')) {
            this.style.display = 'none';
          }
        });

        // Tabs
        const categoriesPopupCards = document.createElement('div');
        categoriesPopupCards.classList.add(classes.categoriesPopupCards);
        const categoriesPopupTabs = document.createElement('div');
        categoriesPopupTabs.classList.add(classes.categoriesPopupTabs);
        categoriesPopupTabs.innerHTML = `<span id=${categoryOne.id} class='${classes.category} ${classes.categoryActive}'>${categoryOne.name}</span>
                                 <span id=${categoryTwo.id} class='${classes.category}' >${categoryTwo.name}</span>
                                      `;
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
        categoriesPopup.appendChild(categoriesPopupTabs);

        // Categories Tabs
        let categoriesOfTabs = [];
        function changeCategoriesInsideTabs(cats) {
          categoriesOfTabs = cats
            .map(
              (item) => `
                <div class=${classes.categoriesPopupCard}>
                      <a href="#">
                          <img src=${item.main_image} alt="img" class=${
                classes.categoriesPopupImg
              } >
                      </a>
                      <a class=${classes.link} href="#">
                          <h5 class=${classes.categoriesPopupCardHead}>${
                item.name.ar
              }</h5>
                      </a>
                      <div class=${classes.categoriesPopupCardFooter}>
                        <span class=${
                          item.sale_price.amount > 0
                            ? classes.categoriesPopupCardLineThrough
                            : ''
                        }>
                          ${item?.price?.amount}${item?.price?.currency}
                        </span>
                        ${
                          item?.sale_price?.amount !== null &&
                          item?.sale_price?.amount !== undefined
                            ? `<span class=${classes.categoriesPopupCardSalePrice}>${item?.sale_price?.amount}${item?.sale_price?.currency}</span>`
                            : ''
                        }
                        <div class=${
                          classes.categoriesPopupCardCartImgContainer
                        }>
                           <img src='https://learnandedu.com/frontend/img/cart2.png' class=${
                             classes.categoriesPopupCardCartImg
                           } />
                        </div>
                      </div>
                  </div>
              `
            )
            .join('');
          categoriesPopupCards.innerHTML = categoriesOfTabs;
          categoriesPopup.appendChild(categoriesPopupCards);
        }
        changeCategoriesInsideTabs(categoryOne.products);

        // Card Container

        // Footer
        //   const categoriesPopupCardFooter = document.createElement('div');
        //   categoriesPopupCardFooter.classList.add(classes.categoriesPopupFooter);
        //   categoriesPopupCardFooter.innerHTML = `<button class=${classes.categoriesPopupFooterButton}>التقدم لاتمام الطلب</button>
        // `;
        //   categoriesPopup.appendChild(categoriesPopupCardFooter);

        // end
        const renderedData = document.querySelector('.cart');
        renderedData.appendChild(categoriesPopup);
      }
    } catch (error) {
      console.error('There was an error:', error);
    }
  }
});
