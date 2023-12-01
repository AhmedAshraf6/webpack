import jss from 'jss';
import devices from '../utils/sizes';

const styles = {
  // start main styles
  link: {
    'text-decoration': 'none',
  },
  // main popup
  relatedProduct: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    width: '90%',
    'max-height': '90vh',
    background: '#fff',
    transform: 'translate(-50%, -50%)',
    'border-radius': '20px',
    border: '1px solid #ccc',
    'z-index': '10',
  },
  // Header
  relatedProductHeader: {
    display: 'flex',
    'justify-content': 'space-between',
    'align-items': 'center',
    'background-color': '#ddd',
    'border-radius': ' 20px 20px 0 0',
    padding: '5px 10px',
  },
  relatedProductHeaderHead: {
    'font-size': '16px',
    'font-weight': 'bold',
  },
  closeImg: {
    width: '20px',
    height: '20px',
    cursor: 'pointer',
  },
  // Cards
  relatedProductCards: {
    display: 'grid',
    'grid-template-columns': 'repeat(auto-fit, minmax(200px, 1fr))',
    padding: '30px 20px',
    gap: '20px',
    'overflow-y': 'auto',
    'overflow-x': 'hidden',
    'max-height': '60vh',
  },
  relatedProductCard: {
    display: "'flex'",
    'flex-direction': 'column',
    gap: '20px',
    height: '100%',
  },
  relatedProductCardHead: {
    'font-size': '16px',
    'font-weight': 'bold',
    color: '#000',
  },
  relatedProductImg: {
    height: '240px',
    'object-fit': 'fill',
    background: '#e1e2e2',
    'border-radius': '20px',
    width: '100%',
  },
  relatedProductCardFooter: {
    display: 'flex',
    'justify-content': 'space-between',
    'align-items': 'center',
    gap: '10px',
  },
  relatedProductCardPrice: {
    color: '#000',
  },
  relatedProductCardLineThrough: {
    'text-decoration': 'line-through',
  },
  relatedProductCardSalePrice: {
    color: '#5b5b5b',
    color: 'red',
  },
  relatedProductCardCartImgContainer: {
    border: '1px solid #6464de',
    'border-radius': '50%',
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    padding: '6px',
  },
  relatedProductCardCartImg: {
    width: '20px',
    height: '20px',
    'object-fit': 'contain',
  },
  // Footer
  relatedProductFooter: {
    display: 'flex',
    'justify-content': 'center',
    margin: '10px 0',
  },
  relatedProductFooterButton: {
    'background-color': '#6464de',
    'border-radius': '28px',
    color: '#fff',
    border: '0',
    'font-size': '18px',
    cursor: 'pointer',
    padding: '5px 20px',
  },
  [devices.md]: {
    relatedProductFooterButton: {
      padding: '10px 100px',
    },
  },
};

export const { classes } = jss.createStyleSheet(styles).attach();
