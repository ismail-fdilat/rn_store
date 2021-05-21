export const productSimple = {
  id: 100,
  type: 'simple',
  image:
    'https://sc02.alicdn.com/kf/HTB1_KAlgMoQMeJjy0Fnq6z8gFXaA/221796755/HTB1_KAlgMoQMeJjy0Fnq6z8gFXaA.jpg_.webp',
  price: '18',
  name: 'Asym metric',
  regular_price: '20',
  sale_price: '18',
  price_format: {
    regular_price: '$20',
    sale_price: '$18',
  },
  sku: 'SKU1000',
  stock_quantity: '1000',
  manage_stock: false,
  catalog_visibility: 'catalog',
};

export const productSimple2 = {
  id: 101,
  type: 'simple',
  image:
    'https://sc02.alicdn.com/kf/HTB1_KAlgMoQMeJjy0Fnq6z8gFXaA/221796755/HTB1_KAlgMoQMeJjy0Fnq6z8gFXaA.jpg_.webp',
  name: 'Print Tshirt',
  price: '18',
  regular_price: '18',
  sale_price: '',
  price_format: {
    regular_price: '$18',
    sale_price: '',
  },
  sku: 'SKU1001',
  stock_quantity: '4432',
  manage_stock: false,
  catalog_visibility: 'search',
};

export const productVariation = {
  id: 200,
  type: 'variable',
  price: '34',
  regular_price: '34',
  sale_price: '',
  name: 'Cotton Shirt ',
  image:
    'https://sc02.alicdn.com/kf/HTB1_KAlgMoQMeJjy0Fnq6z8gFXaA/221796755/HTB1_KAlgMoQMeJjy0Fnq6z8gFXaA.jpg_.webp',
  price_format: {
    regular_price: '$34',
    sale_price: '',
  },
  sku: 'SKU1001',
  stock_quantity: '234',
  manage_stock: true,
  catalog_visibility: 'visible',
};

export const listProducts = [productSimple, productSimple2, productVariation];
