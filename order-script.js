document.addEventListener("DOMContentLoaded", function () {
  const products = {
    drinks: [
      { id: 1, title: "Orange Juice", price: 120 },
      { id: 2, title: "Lemonade", price: 90 },
    ],
    snacks: [
      { id: 3, title: "Chips", price: 50 },
      { id: 4, title: "Cookies", price: 70 },
    ],
    dairy: [
      { id: 5, title: "Milk", price: 60 },
      { id: 6, title: "Cheese", price: 150 },
    ],
    momo: [
      { id: 7, title: "C Momo", price: 140 },
      { id: 8, title: "Fry Momo", price: 150 },
    ],
  };

  const categoryCards = document.querySelectorAll(".category-card");
  const categoryGrid = document.getElementById("category-grid");
  const productSection = document.getElementById("product-section");
  const selectedCategoryTitle = document.getElementById(
    "selected-category-title"
  );
  const productList = document.getElementById("product-list");
  const orderList = document.querySelector(".orderList");
  const totalPriceElement = document.getElementById("total-price");

  function updateTotalPrice() {
    let total = 0;
    const selects = document.querySelectorAll(".product-select");
    const quantities = document.querySelectorAll(".quantity-input");

    selects.forEach((select, index) => {
      const price = parseFloat(select.selectedOptions[0].dataset.price || 0);
      const quantity = parseInt(quantities[index]?.value || 1);
      total += price * quantity;
    });

    totalPriceElement.textContent = `Rs ${total.toFixed(2)}`;
  }

  function addProductToOrder({ id, title, price }) {
    // Check if the product is already added
    const existingRow = Array.from(
      orderList.querySelectorAll(".product-selection")
    ).find((row) => {
      const select = row.querySelector(".product-select");
      return parseInt(select.value) === id;
    });

    if (existingRow) {
      // If found, increase quantity
      const quantityInput = existingRow.querySelector(".quantity-input");
      quantityInput.value = parseInt(quantityInput.value) + 1;
      updateTotalPrice();
      return;
    }

    // If not found, create a new row
    const row = document.createElement("div");
    row.className = "row mb-2 product-selection";

    row.innerHTML = `
    <div class="col-md-6">
      <select class="form-select product-select">
        <option value="${id}" data-price="${price}" selected>${title} - Rs ${price}</option>
      </select>
    </div>
    <div class="col-md-3">
      <input type="number" class="form-control quantity-input" min="1" value="1" />
    </div>
    <div class="col-md-3">
      <button type="button" class="btn btn-danger remove-product">Remove</button>
    </div>
  `;

    row
      .querySelector(".quantity-input")
      .addEventListener("input", updateTotalPrice);
    row.querySelector(".remove-product").addEventListener("click", () => {
      row.remove();
      updateTotalPrice();
    });

    orderList.appendChild(row);
    updateTotalPrice();
  }

  categoryCards.forEach((card) => {
    card.addEventListener("click", function () {
      const category = this.dataset.category;
      const categoryProducts = products[category];
      selectedCategoryTitle.textContent =
        category.charAt(0).toUpperCase() + category.slice(1);
      productList.innerHTML = "";

      categoryProducts.forEach((product) => {
        const card = document.createElement("div");
        card.className = "col-md-3 mb-3";
        card.innerHTML = `
          <div class="card">
            <div class="card-body text-center">
              <h5>${product.title}</h5>
              <p>Rs ${product.price}</p>
              <button class="btn btn-primary">Add to Order</button>
            </div>
          </div>
        `;
        card
          .querySelector("button")
          .addEventListener("click", () => addProductToOrder(product));
        productList.appendChild(card);
      });

      categoryGrid.style.display = "none";
      productSection.style.display = "block";
    });
  });

  document
    .getElementById("back-to-categories")
    .addEventListener("click", () => {
      productSection.style.display = "none";
      categoryGrid.style.display = "flex";
    });
});
