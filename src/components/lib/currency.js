const USD_TO_NPR = 133;

export const formatNPR = (usdPrice) => {
  const nprPrice = usdPrice * USD_TO_NPR;
  return `NPR ${nprPrice.toLocaleString('en-NP', { maximumFractionDigits: 0 })}`;
};

export const convertToNPR = (usdPrice) => {
  return usdPrice * USD_TO_NPR;
};
