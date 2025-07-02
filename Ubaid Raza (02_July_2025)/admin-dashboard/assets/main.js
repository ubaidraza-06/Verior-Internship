// === Sidebar controls ===
const sidebar = document.getElementById("sidebar");
const openBtn = document.getElementById("sidebarOpen");
const closeBtn = document.getElementById("sidebarClose");

function openSidebar() {
  sidebar.classList.remove("-translate-x-full");
}

function closeSidebar() {
  sidebar.classList.add("-translate-x-full");
}

openBtn?.addEventListener("click", openSidebar);
closeBtn?.addEventListener("click", closeSidebar);

// === Dark mode toggle ===
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

if (localStorage.getItem("theme") === "dark") {
  root.classList.add("dark");
  themeToggle.checked = true;
}

if (localStorage.getItem("theme") === "light") {
  root.classList.remove("dark");
  themeToggle.checked = false;
}

themeToggle?.addEventListener("change", (e) => {
  if (e.target.checked) {
    root.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    root.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
});