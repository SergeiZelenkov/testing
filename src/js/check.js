export default function check(code) {
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
