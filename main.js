// main.js - logic trò chơi

const rows = 6; 
const cols = 5; 
let currentRow = 0;
let currentCol = 0;
let answer = "";
let secretLoaded = false;

const board = document.getElementById("board");

// tạo board
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    let tile = document.createElement("div");
    tile.classList.add("tile");
    tile.setAttribute("id", r + "-" + c);
    board.appendChild(tile);
  }
}

// nguyên âm và phụ âm
const vowels = ["A","E","I","O","U"];
const consonants = [
  "B","C","D","F","G","H","J","K","L","M",
  "N","P","Q","R","S","T","V","W","X","Y","Z"
];

// hiển thị bảng chữ
function renderAlphabet() {
  const vowelsDiv = document.getElementById("vowels");
  const consonantsDiv = document.getElementById("consonants");

  vowels.forEach(ch => {
    let el = document.createElement("div");
    el.classList.add("letter-tile");
    el.setAttribute("id", "letter-" + ch);
    el.innerText = ch;
    vowelsDiv.appendChild(el);
  });

  consonants.forEach(ch => {
    let el = document.createElement("div");
    el.classList.add("letter-tile");
    el.setAttribute("id", "letter-" + ch);
    el.innerText = ch;
    consonantsDiv.appendChild(el);
  });
}
renderAlphabet();

// lấy từ mới từ word.txt
let validWords = []; 
async function getNewWord() {
  try {
    let response = await fetch("words.txt");
    let text = await response.text();
    let words = text.split("\n").map(w => w.trim().toUpperCase());

    // lọc chỉ lấy từ 5 ký tự
    validWords = words.filter(w => w.length === 5);
    console.log("Filtered words:", validWords.length);

    // chọn random từ làm đáp án
    let randomIndex = Math.floor(Math.random() * validWords.length);
    answer = validWords[randomIndex];
    console.log("Word to guess:", answer);

    secretLoaded = true;
  } catch (err) {
    console.error("Error loading words.txt:", err);
  }
}

getNewWord();

// bắt phím từ bàn phím thật
document.addEventListener("keydown", (e) => {
  if (!secretLoaded) return; // chưa có từ thì chưa cho chơi

  if (e.key.match(/^[a-zA-Z]$/)) {
    handleKey(e.key.toUpperCase());
  } else if (e.key === "Enter") {
    handleKey("ENTER");
  } else if (e.key === "Backspace") {
    handleKey("⌫");
  }
});

// xử lý phím nhập
function handleKey(key) {
  if (currentRow >= rows) return;

  if (key === "ENTER") {
    checkWord();
    return;
  }

  if (key === "⌫") {
    deleteLetter();
    return;
  }

  if (currentCol < cols && key.length === 1) {
    const tile = document.getElementById(currentRow + "-" + currentCol);
    tile.innerText = key;
    currentCol++;
  }
}

// xóa chữ
function deleteLetter() {
  if (currentCol > 0) {
    currentCol--;
    const tile = document.getElementById(currentRow + "-" + currentCol);
    tile.innerText = "";
  }
}

// kiểm tra từ nhập
function checkWord() {
  if (currentCol < cols) {
    document.getElementById("status").innerText = "⚠️ Not enough letters!";
    return;
  }

  let guess = "";
  for (let c = 0; c < cols; c++) {
    let tile = document.getElementById(currentRow + "-" + c);
    guess += tile.innerText;
  }

  guess = guess.toUpperCase();

  if (!validWords.includes(guess)) {
    document.getElementById("status").innerText = "❌ Not in word list!";
    return;
  }

  colorTiles(guess);

  if (guess === answer) {
    document.getElementById("status").innerText = "🎉 You win!";
    currentRow = rows; // khóa game
    return;
  }

  currentRow++;
  currentCol = 0;

  if (currentRow === rows) {
    document.getElementById("status").innerText = "❌ Game Over! Answer: " + answer;
  }
}

// tô màu
function colorTiles(guess) {
  for (let c = 0; c < cols; c++) {
    let tile = document.getElementById(currentRow + "-" + c);
    let letter = guess[c];
    if (letter === answer[c]) {
      tile.style.backgroundColor = "green";
      tile.style.color = "white";
      markLetter(letter, "green");
    } else if (answer.includes(letter)) {
      tile.style.backgroundColor = "gold";
      tile.style.color = "white";
      markLetter(letter, "gold");
    } else {
      tile.style.backgroundColor = "gray";
      tile.style.color = "white";
      markLetter(letter, "darkgray"); 
    }
  }
}

// cập nhật bảng chữ cái
function markLetter(letter, color) {
  let el = document.getElementById("letter-" + letter);
  if (el) {
    if (color === "darkgray") {
      el.style.backgroundColor = "darkgray";
      el.style.color = "white";
    } else if (color === "gold") {
      if (el.style.backgroundColor !== "green") { 
        el.style.backgroundColor = "gold";
        el.style.color = "black";
      }
    } else if (color === "green") {
      el.style.backgroundColor = "green";
      el.style.color = "white";
    }
  }
}

// replay game
document.getElementById("restart-btn").addEventListener("click", () => {
  location.reload();
});

// show answer
document.getElementById("show-btn").addEventListener("click", () => {
  alert("Answer: " + answer);
});
