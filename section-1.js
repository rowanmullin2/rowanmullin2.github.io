// Validates a donation input object and returns an array of error messages
function validateDonation({ charity, amount, date }) {
  const errors = [];

  // Check charity name
  if(!charity || charity.trim() === "") {
    errors.push("Charity name is required.");
  }

  // Check amount (must be a positive number)
  const numericAmount = Number(amount);
  if (isNaN(numericAmount) || numericAmount <= 0) {
    errors.push("Donation amount must be a valid positive number.");
  }

  // Check date
  if (!date) {
    errors.push("Date of donation is required.");
  }

  return errors;
}

// Cleans up and converts the raw input into the final donation object
function processDonation({ charity, amount, date, comment }) {
  return {
    charity: charity.trim(),
    amount: Number(amount),
    date,
    comment: comment.trim(),
  };
}

// Export functions for Jest (Node)
if (typeof module !== "undefined" && module.exports) {
  module.exports = { validateDonation, processDonation };
}

// Attach DOM logic immediately if document exists
if (typeof document !== "undefined") {
  const form = document.getElementById("donation-form");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent page reload

      // Collect raw form values
      const donationInput = {
        charity: document.getElementById("charity").value,
        amount: document.getElementById("amount").value,
        date: document.getElementById("date").value,
        comment: document.getElementById("comment").value,
      };

      // Run validation
      const errors = validateDonation(donationInput);

      if (errors.length > 0) {
        alert(errors.join("\n"));
        return;
      }

      // Build the final donation object
      const donationData = processDonation(donationInput);

      // Log the data (this is what your test checks)
      console.log("Donation recorded:", donationData);

      // Give user feedback
      alert("Donation successfully added!");

      // Reset the form
      form.reset();
    });
  }
}

// Storage Helpers

function loadDonations() {
  const data = localStorage.getItem("donations");
  return data ? JSON.parse(data) : [];
}

function saveDonations(donations) {
  localStorage.setItem("donations", JSON.stringify(donations));
}


// Summary Calculation

function calculateTotal(donations) {
  return donations.reduce((sum, d) => sum + d.amount, 0);
}


// Table Rendering

function renderTable() {
  const donations = loadDonations();
  const tbody = document.querySelector("#donation-table tbody");
  const totalDisplay = document.getElementById("total-amount");

  tbody.innerHTML = "";

  donations.forEach((donation) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${donation.charity}</td>
      <td>${donation.amount.toFixed(2)}</td>
      <td>${donation.date}</td>
      <td>${donation.comment}</td>
      <td><button class="delete-btn" data-id="${donation.id}">Delete</button></td>
    `;

    tbody.appendChild(row);
  });

  totalDisplay.textContent = calculateTotal(donations).toFixed(2);
}


// Delete Handler

function deleteDonation(id) {
  const donations = loadDonations().filter((d) => d.id !== id);
  saveDonations(donations);
  renderTable();
}


// Submit Handler

function handleFormSubmit(event) {
  event.preventDefault();

  const donationInput = {
    charity: document.getElementById("charity").value,
    amount: document.getElementById("amount").value,
    date: document.getElementById("date").value,
    comment: document.getElementById("comment").value,
  };

  const errors = validateDonation(donationInput);
  const errorBox = document.getElementById("errors");
  errorBox.innerHTML = "";

  if (errors.length > 0) {
    errorBox.innerHTML = errors.map((e) => `<p>${e}</p>`).join("");
    return;
  }

  const donation = processDonation(donationInput);
  const donations = loadDonations();
  donations.push(donation);
  saveDonations(donations);

  renderTable();
  event.target.reset();
}


// DOM Setup 

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    renderTable();

    const form = document.getElementById("donation-form");
    if (form) form.addEventListener("submit", handleFormSubmit);

    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) {
        const id = Number(e.target.dataset.id);
        deleteDonation(id);
      }
    });
  });
}


// Exports for Jest

if (typeof module !== "undefined") {
  module.exports = {
    validateDonation,
    processDonation,
    calculateTotal,
    deleteDonation,
    loadDonations,
    saveDonations,
    renderTable,
  };
}
