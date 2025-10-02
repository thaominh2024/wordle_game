// UI.js - tạo bàn phím ảo
const keyboardDiv = document.getElementById("keyboard");
const keys = [
  ..."QWERTYUIOP",
  ..."ASDFGHJKL",
  ..."ZXCVBNM",
  "ENTER",
  "⌫"
];

keys.forEach((key) => {
  let keyBtn = document.createElement("button");
  keyBtn.innerText = key;
  keyBtn.classList.add("key");
  keyBtn.addEventListener("click", () => handleKey(key));
  keyboardDiv.appendChild(keyBtn);
});

// UI.js - tạo bảng nguyên âm, phụ âm
const vowelsList = ["A","E","I","O","U"];
const consonantsList = [
  "B","C","D","F","G","H","J","K","L","M","N","P",
  "Q","R","S","T","V","W","X","Y","Z"
];

const vowelsDiv = document.getElementById("vowels");
const consonantsDiv = document.getElementById("consonants");

function renderLetters(list, container) {
  list.forEach(ch => {
    let div = document.createElement("div");
    div.innerText = ch;
    div.classList.add("letter");
    div.setAttribute("id", "letter-" + ch);
    container.appendChild(div);
  });
}

renderLetters(vowelsList, vowelsDiv);
renderLetters(consonantsList, consonantsDiv);
