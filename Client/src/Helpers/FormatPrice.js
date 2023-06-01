const FormatPrice = ({ price }) => {
  return Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 2,
  }).format(price);
};

export default FormatPrice;
