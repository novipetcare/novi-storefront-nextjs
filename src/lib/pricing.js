export function hasDiscount(product) {
  return typeof product.mrp === "number" && product.mrp > product.price;
}

export function getDiscountPercent(product) {
  if (!hasDiscount(product)) return 0;
  return Math.round(((product.mrp - product.price) / product.mrp) * 100);
}
