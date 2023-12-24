import jss from 'jss';
import devices from '../utils/sizes';

const styles = {
  // start main styles
  // main color:#91268F
  resetSpace: {
    margin: '0',
    padding: '0',
  },
  overlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: '#000',
    opacity: '50%',
    'z-index': '99',
  },
  link: {
    'text-decoration': 'none',
  },
  makeGap: {
    display: 'flex',
    gap: '3px',
    'align-items': 'center',
  },
  cursorPointer: {
    cursor: 'pointer',
  },
  // main popup
  // main popup
  popUp: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    // width: '200px',
    'max-width': '1200px',
    background: '#fff',
    transform: 'translate(-50%, -50%)',
    'border-radius': '24px',
    border: '1px solid #ccc',
    'z-index': '999',
    overflow: 'hidden',
  },

  popupOptions: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    width: '500px',
    'max-width': '1200px',
    'max-height': '90vh',
    background: '#fff',
    transform: 'translate(-50%, -50%)',
    'border-radius': '24px',
    border: '1px solid #ccc',
    'z-index': '99999',
    overflow: 'hidden',
  },
  // Tabs
  categoriesPopupTabs: {
    margin: '20px 0',
    'border-bottom': '1px solid #ccc',
    display: 'flex',
    'justify-content': 'space-around',
    'align-items': 'center',
  },
  category: {
    cursor: 'pointer',
    '&:hover': {
      background: '#f4f4f4',
    },
    color: '#9a9a9a',
    'font-weight': 'bold',
    'padding-bottom': '7px',
  },
  categoryActive: {
    color: '#91268F',
    'border-bottom': '3px solid #91268F',
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
    width: '12px',
    height: '12px',
    cursor: 'pointer',
  },
  // Cards
  swiperSlide: {
    display: 'flex !important',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center',
  },
  popUpCard: {
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'space-between',
    gap: '20px',
    'max-width': '256px',
    width: '100%',
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

  imgArrows: {
    width: '42px!important',
    height: '42px!important',
    cursor: 'pointer',
  },
  mySwiper: {
    padding: '60px 40px !important',
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
    height: '40px',
    overflow: 'hidden',
    'line-height': '20px',
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
    cursor: 'pointer',
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
  // Error Messages
  Messages: {
    position: 'fixed',
    top: '10%',
    left: '50%',
    width: '300px',
    'max-height': '90vh',
    background: '#fff',
    transform: 'translateX(-50%)',
    'border-radius': '12px',
    'z-index': '9999',
    overflow: 'hidden',
    padding: '20px 40px',
  },
  containerMessages: {
    display: 'flex',
    'justify-content': 'space-between',
    'align-items': 'center',
  },
  containerMessagesContent: {
    display: 'flex',
    'align-items': 'center',
    gap: '15px',
  },
  MessagesContentHead: {
    'font-size': '16px',
    'font-weight': 'bold',
  },

  // PopupOptions
  popupOptions: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '700px',
    'max-width': '700px',
    'max-height': '700px',
    background: '#fff',
    'border-radius': '24px',
    border: '1px solid #ccc',
    'z-index': '99999',
    overflow: 'hidden',
  },
  form: {
    padding: '40px 30px',
    display: 'flex',
    'flex-direction': 'column',
    gap: '20px',
    height: '300px',
    'overflow-y': 'auto',
  },
  twoInputsContainer: {
    display: 'flex',
    // 'align-items': 'center',
    gap: '10px',
  },
  inputFlex2: {
    flex: '2',
  },
  inputFlex1: {
    flex: '1',
  },
  label: {
    'font-weight': 'bold',
  },
  checkBox: {
    // display: 'none',
    '&:hover': {
      // Styles for hover state
      backgroundColor: 'lightgray', // Change background color on hover
    },
  },
  input: {
    padding: '10px 5px',
    border: '1px solid #91268F',
    'border-radius': '10px',
    // color: '#9A9A9A',
    'font-size': '16px',
    'font-weight': 'bold',
    outline: 'none',
  },
  inputContainer: {
    display: 'flex',
    'flex-direction': 'column',
    gap: '6px',
  },
  buttonSubmit: {
    position: 'absolute',
    bottom: '7%',
    left: '50%',
    transform: 'translate(-50%)',
    background: '#91268F',
    outline: 'none',
    'font-weight': 'bold',
    color: '#fff',
    'border-radius': '28px',
    border: 'none',
    cursor: 'pointer',
    width: '300px',
    height: '26px',
    'font-size': '16px',
  },
  inputNumber: {
    padding: '10px 5px',
    border: '1px solid #91268F',
    'border-radius': '10px',
    outline: 'none',
  },
  inputNumberContainer: {
    position: 'relative',
    display: 'inline-block',
  },
  InputIcon: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    userSelect: 'none',
  },
  inputIconDecrement: {
    left: '0',
  },
  inputIconIncrement: {
    right: '0',
  },
  // PopupOptions

  // Screen SIzes
  [devices.md]: {
    popUpFooterButton: {
      padding: '10px 100px',
    },
  },
  [devices.lg]: {
    Messages: {
      width: '500px',
    },
    buttonSubmit: {
      width: '400px',
      height: '35px',
      'font-size': '18px',
    },
    // con: {
    //   display: 'none',
    // },
  },
  // Screen SIzes
};

export const { classes } = jss.createStyleSheet(styles).attach();
