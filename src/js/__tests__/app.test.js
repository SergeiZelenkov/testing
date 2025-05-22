import detectCardType from "../detectCardType.js";
import check from "../check.js";
import isValidCard from "../isValidCard.js";
import appInit from "../app.js";

beforeAll(() => {
  document.body.innerHTML = `
    <button class="pay-button"></button>
    <input class="pay-input" />
    <div class="pay-card"></div>
  `;
  appInit();
});

const validCards = [
  { name: "visa", number: "4111111111111111" },
  { name: "mastercard", number: "5105105105105100" },
  { name: "americanexpress", number: "378282246310005" },
  { name: "discover", number: "6011111111111117" },
  { name: "jcb", number: "3536635718286859" },
  { name: "mir", number: "2202200223948454" },
  { name: "maestro", number: "6759649826438453" },
];

describe("check() — Luhn algorithm", () => {
  test("returns true for valid card number", () => {
    expect(check("4111111111111111")).toBe(true);
  });

  test("returns false for invalid card number", () => {
    expect(check("1234567890123456")).toBe(false);
  });
});

describe("detectCardType()", () => {
  test.each(validCards)("detects card type: $name", ({ number, name }) => {
    expect(detectCardType(number)).toBe(name);
  });

  test("returns null for unknown prefix", () => {
    expect(detectCardType("9999999999999999")).toBe(null);
  });
});

describe("isValidCard()", () => {
  test.each(validCards)("validates and recognizes $name card", ({ number }) => {
    if (check(number)) {
      expect(isValidCard(number)).toBe(true);
    }
  });

  test("returns false for invalid number", () => {
    expect(isValidCard("1234567890123456")).toBe(false);
  });

  test("returns false for non-digit input", () => {
    expect(isValidCard("abcd1234efgh5678")).toBe(false);
  });
});
