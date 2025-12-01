// Validates the donation fields and returns any error messages
export function validateDonation({ charity, amount, date }) {
  const errors = [];

  // check charity name
  if (!charity || charity.trim() === "") {
    errors.push("Charity name is required.");
  }

  // check amount (must be a positive number)
  const numericAmount = Number(amount);
  if (isNaN(numericAmount) || numericAmount <= 0) {
    errors.push("Donation amount must be a valid positive number.");
  }

  // check date
  if (!date) {
    errors.push("Date of donation is required.");
  }

  return errors;
}

// Cleans up the inputs and returns the final donation object
export function processDonation({ charity, amount, date, comment }) {
  return {
    charity: charity.trim(),
    amount: Number(amount),
    date: date,
    comment: comment.trim(),
  };
}

// DOM code: runs when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("donation-form");
  if (!form) return; // avoid errors during testing

  // Handle the form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // stop page reload

    // get all form values
    const donationInput = {
      charity: document.getElementById("charity").value,
      amount: document.getElementById("amount").value,
      date: document.getElementById("date").value,
      comment: document.getElementById("comment").value,
    };

    // run validation
    const errors = validateDonation(donationInput);

    if (errors.length > 0) {
      // show all validation messages
      alert(errors.join("\n"));
      return;
    }

    // format the final donation object
    const donationData = processDonation(donationInput);

    // for now we just log it (matches the test expectations)
    console.log("Donation recorded:", donationData);
    alert("Donation successfully added!");

    // clear form after submitting
    form.reset();
  });
});
