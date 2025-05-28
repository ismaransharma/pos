window.onload = function () {
  document.getElementById("barcode").focus();
};

// Optional: Handle Enter key after scanning (common in scanners)
document.getElementById("barcode").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault(); // Stop form submission if inside a form
    console.log("Barcode scanned:", this.value);
    // You can trigger form submission or additional logic here
  }
});
