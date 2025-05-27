const sidebar = document.getElementById("sidebar");
const hamburger = document.getElementById("hamburgerBtn");
const overlay = document.getElementById("overlay");

hamburger.addEventListener("click", () => {
  const isOpen = sidebar.classList.contains("open");

  sidebar.classList.toggle("open");
  sidebar.classList.toggle("closed");
  overlay.classList.toggle("show");

  // Toggle icon
  hamburger.textContent = isOpen ? "☰" : "✖";
  hamburger.setAttribute("aria-expanded", String(!isOpen));
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("open");
  sidebar.classList.add("closed");
  overlay.classList.remove("show");

  // Reset hamburger icon
  hamburger.textContent = "☰";
  hamburger.setAttribute("aria-expanded", "false");
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    sidebar.classList.remove("closed", "open");
    overlay.classList.remove("show");
    hamburger.textContent = "☰"; // Reset icon
  } else {
    sidebar.classList.add("closed");
  }
});

// Initialize on load
if (window.innerWidth <= 768) {
  sidebar.classList.add("closed");
}

document.querySelectorAll(".sidebar-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));

    const ul = button.nextElementSibling;
    if (!expanded) {
      ul.removeAttribute("hidden");
    } else {
      ul.setAttribute("hidden", "");
    }
  });
});
