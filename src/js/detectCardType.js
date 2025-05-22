import { cards } from "./data.js";

export default function detectCardType(inputValue) {
  for (let card of cards) {
    if (!card.cardlength.includes(inputValue.length)) continue;
    for (let prefix of card.start) {
      const prefixStr = prefix.toString();
      if (inputValue.startsWith(prefixStr)) {
        return card.name;
      }
    }
  }
  return null;
}

