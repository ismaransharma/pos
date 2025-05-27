document.addEventListener("DOMContentLoaded", function () {
  let totalPrice = 0;
  let orderIndex = 1; // Start indexing from 1 for additional product rows

  const totalPriceElement = document.getElementById("total-price");
  const paidAmountInput = document.getElementById("paidAmount");
  const creditAmountInput = document.getElementById("creditAmount");
  const discountAmountInput = document.getElementById("discountAmount");
  const paymentMethodSelect = document.getElementById("paymentMethod");

  if (!totalPriceElement) {
    console.error("Total price element not found in the DOM.");
    return;
  }

  function togglePaymentFields() {
    const paymentMethod = paymentMethodSelect.value;

    document.getElementById("paidAmountWrapper").style.display = "none";
    document.getElementById("creditAmountWrapper").style.display = "none";

    if (paymentMethod === "cash") {
      document.getElementById("paidAmountWrapper").style.display = "block";
    } else if (paymentMethod === "credit") {
      document.getElementById("creditAmountWrapper").style.display = "block";
    } else if (paymentMethod === "cash_and_credit") {
      document.getElementById("paidAmountWrapper").style.display = "block";
      document.getElementById("creditAmountWrapper").style.display = "block";
    }
  }

  function updateTotalPrice() {
    totalPrice = 0;

    const productSelects = document.querySelectorAll(".product-select");
    const quantityInputs = document.querySelectorAll(".quantity-input");

    productSelects.forEach((select, index) => {
      const price =
        parseFloat(select.options[select.selectedIndex]?.dataset.price) || 0;
      const quantity = parseInt(quantityInputs[index]?.value) || 0;
      totalPrice += price * quantity;
    });

    const discountAmount = parseFloat(discountAmountInput.value) || 0;
    const finalAmount = totalPrice - discountAmount;

    totalPriceElement.textContent = `Rs ${finalAmount.toFixed(2)}`;
    updateCreditAmount(finalAmount);
  }

  function updateCreditAmount(finalAmount) {
    let paidAmount = parseFloat(paidAmountInput.value) || 0;
    let creditAmount = Math.max(0, finalAmount - paidAmount);
    creditAmountInput.value = creditAmount.toFixed(2);
  }

  document
    .querySelector(".order-items")
    .addEventListener("click", function (e) {
      if (e.target.closest(".add-more")) {
        const productRow = document.querySelector(".product-selection");
        const newRow = productRow.cloneNode(true);

        const newProductSelect = newRow.querySelector(".product-select");
        const newQuantityInput = newRow.querySelector(".quantity-input");

        // Reset values
        newProductSelect.selectedIndex = 0;
        newQuantityInput.value = 1;

        // ✅ Update name attributes for new fields
        newProductSelect.name = `orders[${orderIndex}][product_id]`;
        newQuantityInput.name = `orders[${orderIndex}][quantity]`;

        // Replace "Add" button with "Remove"
        newRow.querySelector(".add-more").outerHTML = `
                <button type="button" class="btn btn-danger remove-item">
                    <i class="bi bi-x-lg"></i> Remove
                </button>`;

        document.querySelector(".order-items").appendChild(newRow);

        updateTotalPrice();
        orderIndex++; // Increment for the next clone
      }
    });

  document
    .querySelector(".order-items")
    .addEventListener("click", function (e) {
      if (e.target.closest(".remove-item")) {
        e.target.closest(".product-selection").remove();
        updateTotalPrice();
      }
    });

  document
    .querySelector(".order-items")
    .addEventListener("change", function (e) {
      if (
        e.target.classList.contains("quantity-input") ||
        e.target.classList.contains("product-select")
      ) {
        updateTotalPrice();
      }
    });

  if (paidAmountInput && creditAmountInput) {
    paidAmountInput.addEventListener("input", function () {
      updateTotalPrice();
    });
  }

  if (discountAmountInput) {
    discountAmountInput.addEventListener("input", function () {
      updateTotalPrice();
    });
  }

  if (paymentMethodSelect) {
    paymentMethodSelect.addEventListener("change", function () {
      togglePaymentFields();
    });
  }

  updateTotalPrice();
  togglePaymentFields();
});
