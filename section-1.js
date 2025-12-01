// Validates a donation input object and returns an array of error messages
function validateDonation({ charity, amount, date }) {
  const errors = [];

  // Check charity name
  if (!charity || charity.trim() === "") {
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

// Export functions for Jest (Node) but avoid errors in the browser
if (typeof window === "undefined") {
    module.exports = {validateDonation, processDonation};
}

// DOM logic: runs in the browser when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("donation-form");
  if (!form) return;

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
});
