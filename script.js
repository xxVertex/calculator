const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let current = "";
let resetNext = false;

function updateDisplay() {
  display.textContent = current || "0";
}

function appendValue(value) {
  if (resetNext) {
    current = "";
    resetNext = false;
  }
  current += value;
  updateDisplay();
}

function clearAll() {
  current = "";
  resetNext = false;
  updateDisplay();
}

function deleteLast() {
  current = current.slice(0, -1);
  updateDisplay();
}

function calculate() {
  try {
    current = eval(current).toString();
  } catch {
    current = "Error";
  }
  resetNext = true;
  updateDisplay();
}

/* Button Clicks */
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.value;
    const action = btn.dataset.action;

    if (value) appendValue(value);
    if (action === "clear") clearAll();
    if (action === "delete") deleteLast();
    if (action === "equals") calculate();
  });
});

/* Keyboard Support */
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key) || "+-*/.".includes(key)) {
    appendValue(key);
  }

  if (key === "Enter") calculate();
  if (key === "Backspace") deleteLast();
  if (key === "Escape") clearAll();
});