// Get all the elemnts of the DOM
const inputText = document.getElementById("input-text");
const outputText = document.getElementById("output-text");
const forceNumber = document.getElementById("span-force");
const InputEcryptForce = document.getElementById("encrypt-force");
const buttons = document.querySelectorAll("button");

// Execution block and listeners
InputEcryptForce.addEventListener("input", (e) => {
  forceNumber.textContent = e.target.value;
});

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (inputText.value === "") {
      outputText.value = "";
      outputText.placeholder = "Please enter some text to encrypt or decrypt.";
    } else {
      if (btn.id === "encrypt") {
        outputText.value = encrytp(
          inputText.value,
          parseInt(InputEcryptForce.value),
          alphabet,
        );
      } else if (btn.id === "decrypt") {
        outputText.value = decrypt(
          inputText.value,
          parseInt(InputEcryptForce.value),
          alphabet,
        );
      }
    }
  });
});

const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

// fucntion to encrypt the text
function encrytp(string, force, alphabet) {
  const stringToReturn = [];
  stringLower = string.toLowerCase();

  for (let letter of stringLower) {
    if (alphabet.indexOf(letter) >= 0) {
      letterIndex = alphabet.indexOf(letter) + force;
      if (letterIndex > 25) {
        letterIndex = letterIndex - 26;
      }
      stringToReturn.push(alphabet[letterIndex]);
    } else {
      stringToReturn.push(letter);
    }
  }
  return stringToReturn.join("");
}

// function to decrypt the text
function decrypt(string, force, alphabet) {
  const stringToReturn = [];
  stringLower = string.toLowerCase();

  for (let letter of stringLower) {
    if (alphabet.indexOf(letter) >= 0) {
      letterIndex = alphabet.indexOf(letter) - force;
      if (letterIndex < 0) {
        letterIndex = letterIndex + 26;
      }
      stringToReturn.push(alphabet[letterIndex]);
    } else {
      stringToReturn.push(letter);
    }
  }
  return stringToReturn.join("");
}
