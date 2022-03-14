const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const formatPrice = (price: number | string): string => {
  return formatter.format(Number(price));
};

export default formatPrice;
