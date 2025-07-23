const alphabet = "abcdefghijklmnopqrstuvwxyz";

function encryptLetter(letter, shiftValue) {
  const index = alphabet.indexOf(letter.toLowerCase());
  if (index === -1) return letter;
  const newIndex = (index + (shiftValue % alphabet.length)) % alphabet.length;
  const encrypted = alphabet[newIndex];
  return encrypted;
}

function encryptMessage(word, shiftValue) {
  let encryptedMessage = "";

  for (let i = 0; i < word.length; i++) {
    encryptedMessage += encryptLetter(word[i], shiftValue);
  }
  return encryptedMessage;
}

function decryptLetter(letter, shiftValue) {
  const index = alphabet.indexOf(letter.toLowerCase());
  if (index === -1) return letter;
  const normalizedShift = shiftValue % alphabet.length;
  const newIndex =
    (index - normalizedShift + alphabet.length) % alphabet.length;
  return alphabet[newIndex];
}

function decryptMessage(word, shiftValue) {
  let decryptedMessage = "";
  for (let e = 0; e < word.length; e++) {
    decryptedMessage += decryptLetter(word[e], shiftValue);
  }
  return decryptedMessage;
}

function getRandomLetter() {
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  return alphabet[randomIndex];
}

function insertRandomLetters(text) {
  let result = "";
  let letterCount = 0;
  for (const char of text) {
    result += char;
    if (alphabet.includes(char.toLowerCase())) {
      letterCount++;
      if (letterCount % 2 === 0) {
        result += getRandomLetter();
      }
    }
  }
  return result;
}

function encryptWithRandomLetters(Message, shiftValue) {
  const encrypted = encryptMessage(Message, shiftValue);
  return insertRandomLetters(encrypted);
}

function subtractRandomLetters(message) {
  let result = "";
  let letterCount = 0;
  for (let i = 0; i < message.length; i++) {
    const char = message[i];
    if (alphabet.includes(char.toLowerCase())) {
      letterCount++;
      result += char;
      if (letterCount % 2 === 0) {
        i++; // skip fake letter
      }
    } else {
      result += char;
    }
  }
  return result;
}

function decryptWithRandomLetters(message, shiftValue) {
  const decrypted = subtractRandomLetters(message);
  return decryptMessage(decrypted, shiftValue);
}


document.getElementById("encryptBtn").addEventListener("click",() => {
  const message = document.getElementById("inputText").value;
  const shift = parseInt(document.getElementById("shift").value);
   const encrypted = encryptWithRandomLetters(message, shift);
  document.getElementById("output").textContent = encrypted;
})

document.getElementById("decryptBtn").addEventListener("click",() => {
  const message = document.getElementById("inputText").value;
  const shift = parseInt(document.getElementById("shift").value);
  const decrypted = decryptWithRandomLetters(message, shift);
  document.getElementById("output").textContent = decrypted;
})