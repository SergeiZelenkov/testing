import check from "./check.js";
import detectCardType from "./detectCardType.js";

export default function isValidCard(inputValue) {
  if (!/^\d+$/.test(inputValue)) return false;

  const cardType = detectCardType(inputValue);
  if (!cardType) return false;

  return check(inputValue);
}
