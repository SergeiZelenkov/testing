function check(code) {
  let sum = 0;
  let parity = code.length % 2;
  for (let i = 0; i < code.length; i++) {
    let digit = parseInt(code[i]);
    if (i % 2 === parity) digit *= 2;
    if (digit > 9) digit -= 9;
    sum += digit;
  }
  return sum % 10 === 0;
}

const cards = [
  { name: "visa", start: [4], cardlength: [13, 16, 19] },
  { name: "mastercard", start: [2221, 51, 2720], cardlength: [16] },
  { name: "americanexpress", start: [34, 37], cardlength: [15] },
  {
    name: "maestro",
    start: [5020, 5018],
    cardlength: [12, 13, 14, 15, 16, 17, 18, 19],
  },
  { name: "discover", start: [6011], cardlength: [16, 17, 18, 19] },
];

const button = document.querySelector(".pay-button");
const input = document.querySelector(".pay-input");
const cardImages = document.querySelectorAll(".pay-card");

function detectCardType(inputValue) {
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

function highlightCard(cardType) {
  cardImages.forEach((img) => {
    if (img.alt.toLowerCase().replace(/\s/g, "") === cardType) {
      img.classList.add("activ");
    } else {
      img.classList.remove("activ");
    }
  });
}

function isValidCard(inputValue) {
  if (!/^\d+$/.test(inputValue)) return false;

  const cardType = detectCardType(inputValue);
  if (!cardType) return false;
  if (!check(inputValue)) return false;

  highlightCard(cardType);
  return true;
}

button.addEventListener("click", () => {
  const value = input.value.trim();
  const isValid = isValidCard(value);
  if (!isValid) {
    cardImages.forEach((img) => img.classList.remove("activ"));
    alert("Некорректный номер карты");
  }
});
