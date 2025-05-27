const ctx = document.getElementById("salesChart").getContext("2d");
new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sales (Rs.)",
        data: [1200, 1900, 3000, 2500, 3200],
        fill: true,
        backgroundColor: "rgba(13, 110, 253, 0.2)",
        borderColor: "#0d6efd",
        tension: 0.3,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

// Order Chart Data

const ctxOrders = document.getElementById("ordersChart").getContext("2d");

let ordersChart; // reference for updating

const chartDataSets = {
  daily: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    data: [15, 25, 20, 10, 30, 22, 18],
  },
  weekly: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    data: [120, 150, 100, 170],
  },
  monthly: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    data: [300, 400, 350, 500, 450, 600],
  },
  yearly: {
    labels: ["2020", "2021", "2022", "2023", "2024"],
    data: [3200, 3800, 4100, 4500, 4900],
  },
};

function createOrdersChart(type) {
  const chartInfo = chartDataSets[type];

  if (ordersChart) {
    ordersChart.destroy(); // destroy previous chart to avoid duplicates
  }

  ordersChart = new Chart(ctxOrders, {
    type: "bar",
    data: {
      labels: chartInfo.labels,
      datasets: [
        {
          label: "Orders",
          data: chartInfo.data,
          backgroundColor: "#4e73df",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// On page load
createOrdersChart("monthly");

// Event listener for dropdown
document.getElementById("orderRangeSelect").addEventListener("change", (e) => {
  createOrdersChart(e.target.value);
});
