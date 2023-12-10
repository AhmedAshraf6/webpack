import jss from 'jss';
import devices from '../utils/sizes';

const styles = {
  // start main styles
  resetSpace: {
    margin: '0',
    padding: '0',
  },
  link: {
    'text-decoration': 'none',
  },
  makeGap: {
    display: 'flex',
    gap: '3px',
    'align-items': 'center',
  },
  // main popup
  popUp: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    'max-width': '90%',
    'max-height': '90vh',
    background: '#fff',
    transform: 'translate(-50%, -50%)',
    'border-radius': '24px',
    border: '1px solid #ccc',
    'z-index': '10',
  },
  // Header
  popUpHeader: {
    display: 'flex',
    'justify-content': 'space-between',
    'align-items': 'center',
    'background-color': '#F5F7F7',
    'border-radius': ' 20px 20px 0 0',
    padding: '15px 30px',
  },
  popUpHeaderHead: {
    'font-size': '22px',
    color: '#121212',
    'font-weight': 'lighter',
  },
  closeImg: {
    width: '20px',
    height: '20px',
    cursor: 'pointer',
  },
  // Cards

  popUpCard: {
    display: 'flex',
    'flex-direction': 'column',
    gap: '20px',
    'max-width': '256px',
  },
  con: {
    position: 'absolute',
    display: 'flex',
    'justify-content': 'space-between',
    'align-items': 'center',
    'z-index': '10',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
  },
  // swiper
  swiperSlide: {
    display: 'grid !important',
    'place-items': 'center',
  },
  mySwiper: {
    padding: '60px 0 !important',
  },

  popUpContainerImg: {
    'background-color': '#E1E2E2',
    'max-width': '256px',
    height: '256px',
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    'border-radius': '12px',
  },
  popUpImg: {
    'max-height': '100%',
    'max-width': '100%',
    'object-fit': 'contain',
    'border-radius': '12px',
  },
  popUpCardHead: {
    'font-size': '16px',
    'font-weight': 'bold',
    color: '#000',
  },
  popUpCardFooter: {
    display: 'flex',
    'justify-content': 'space-between',
    'align-items': 'center',
    gap: '10px',
  },
  popUpCardPrice: {
    color: '#91268F',
  },
  popUpCardLineThrough: {
    'text-decoration': 'line-through',
    color: '#BDBDBD',
  },
  popUpCardSalePrice: {
    color: '#5b5b5b',
    color: 'red',
  },
  popUpCardCartImgContainer: {
    border: '1px solid #91268F',
    'border-radius': '50%',
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    padding: '6px',
  },
  popUpCardCartImg: {
    width: '20px',
    height: '20px',
    'object-fit': 'contain',
  },
  // Footer
  popUpFooter: {
    display: 'flex',
    'justify-content': 'center',
    margin: '10px 0',
  },
  popUpFooterButton: {
    'background-color': '#6464de',
    'border-radius': '28px',
    color: '#fff',
    border: '0',
    'font-size': '18px',
    cursor: 'pointer',
    padding: '5px 20px',
  },

  [devices.md]: {
    popUpFooterButton: {
      padding: '10px 100px',
    },
  },
  [devices.lg]: {
    con: {
      display: 'none',
    },
  },
};

export const { classes } = jss.createStyleSheet(styles).attach();
