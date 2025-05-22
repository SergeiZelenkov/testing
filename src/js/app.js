import isValidCard from "./isValidCard.js";
import detectCardType from "./detectCardType.js";

export default function appInit() {
  const button = document.querySelector(".pay-button");
  const input = document.querySelector(".pay-input");
  const cardImages = document.querySelectorAll(".pay-card");
  const valid = document.querySelector(".valid");
  function highlightCard(cardType) {
    cardImages.forEach((img) => {
      if (img.alt === cardType) {
        img.classList.add("activ");
        valid.innerHTML = cardType;
      } else {
        img.classList.remove("activ");
      }
    });
  }

  button.addEventListener("click", () => {
    const value = input.value.trim();

    if (!isValidCard(value)) {
      cardImages.forEach((img) => img.classList.remove("activ"));
      valid.innerHTML = "";
      alert("Некорректный номер карты");
      return;
    }

    const cardType = detectCardType(value);
    highlightCard(cardType);
  });
}
