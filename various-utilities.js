// Reverse given string
function reverseString(str) {
  return str.split('').reverse().join('');
}

// Sum all values from given array
function sumOfArray(numbers) {
  return numbers.reduce((total, number) => total + number, 0);
}

// Copy given text to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}
