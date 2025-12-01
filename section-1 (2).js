document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("donation-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page reload

    // Collect form values
    const charity = document.getElementById("charity").value.trim();
    const amount = parseFloat(document.getElementById("amount").value);
    const date = document.getElementById("date").value;
    const comment = document.getElementById("comment").value.trim();

    // Validation
    let errors = [];

    if (!charity) {
      errors.push("Charity name is required.");
    }

    if (isNaN(amount) || amount <= 0) {
      errors.push("Donation amount must be a valid positive number.");
    }

    if (!date) {
      errors.push("Date of donation is required.");
    }
    // Show errors or proceed
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    // Temporary data object
    const donationData = {
      charity,
      amount,
      date,
      comment,
    };

    // For now, just log the data (you can later push to an array or API)
    console.log("Donation recorded:", donationData);

    // Optional: give user feedback
    alert("Donation successfully added!");

    // Reset form
    form.reset();
  });
});

