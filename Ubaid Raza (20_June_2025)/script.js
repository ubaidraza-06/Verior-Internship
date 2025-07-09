let count = 0;
let isTextChanged = false;

function updateDisplay() {
  document.getElementById("count").textContent = count;
}
function increment() {
    count++;
    updateDisplay();
}
function decrement() {
    count--;
    updateDisplay();
}
function reset() {
    count = 0;
    updateDisplay();
    document.getElementById("mainText").textContent = "Simple Counter";
    isTextChanged = false;
}
function changeText() {
    const mainText = document.getElementById("mainText");
    
    if(isTextChanged) {
        mainText.innerHTML = "Simple Counter";
    }
    else {
        mainText.innerHTML = "My Cool Counter";
    }
    isTextChanged = !isTextChanged;
}
function toggleDarkMode() {
    document.getElementById("body").classList.toggle("dark-mode");
}