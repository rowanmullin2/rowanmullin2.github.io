/**
 * ensures script only runs after all HTML document is loaded.*/
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("volunteer-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents page reload

    // Collects form input values
    //Retrieves value of fields
    const charity = document.getElementById("charity").value.trim();
    const hours = parseFloat(document.getElementById("hours").value);
    const date = document.getElementById("date").value;
    const rating = document.getElementById("rating").value;

    // Validation
    let errors = [];

    if (!charity) {
      errors.push("Charity name is required.");
    }

    if (isNaN(hours) || hours <= 0) {
      errors.push("Hours volunteered must be a valid positive number.");
    }

    if (!date) {
      errors.push("Date of volunteering is required.");
    }

    if (!rating) {
      errors.push("Experience rating must be selected.");
    }

    // Shows the errors or proceeds
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    // Temporary data object
    const volunteerData = {
      charity,
      hours,
      date,
      rating: parseInt(rating)
    };

    // For now, log data (later is stored in array or backend)
    console.log("Volunteer entry recorded:", volunteerData);

    // User feedback
    alert("Volunteer entry successfully added🎀");

    // Reset form
    form.reset();
  });
});
