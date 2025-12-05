// Temporary storage object
let tempDonationData = null;

// Validation function
function validateDonation({ charity, amount, date }) {
  const errors = [];

  if (!charity || charity.trim() === "") {
    errors.push("Charity name is required.");
  }

  const numericAmount = Number(amount);
  if (isNaN(numericAmount) || numericAmount <= 0) {
    errors.push("Donation amount must be a valid positive number.");
  }

  if (!date) {
    errors.push("Date of donation is required.");
  }

  return errors;
}

// Processing function
function processDonation({ charity, amount, date, comment }) {
  return {
    charity: charity.trim(),
    amount: Number(amount),
    date,
    comment: comment.trim(),
  };
}

// Submit handler
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
  if (errorBox) errorBox.innerHTML = "";

  if (errors.length > 0) {
    if (errorBox) {
      errorBox.innerHTML = errors.map(e => `<p>${e}</p>`).join("");
    }
    return;
  }

  tempDonationData = processDonation(donationInput);

  if (errorBox) errorBox.innerHTML = "";
  event.target.reset();
}

// Attach event listener
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("donation-form");
    if (form) form.addEventListener("submit", handleFormSubmit);
  });


// Export for Jest
if (typeof module !== "undefined") {
  module.exports = { validateDonation, processDonation, handleFormSubmit, tempDonationData };
}