
// Form submit handler
function handleFormSubmit(event) {
  if (event) event.preventDefault();

  const charityInput = document.getElementById("charity");
  const hoursInput = document.getElementById("hours");
  const dateInput = document.getElementById("date");
  const ratingInput = document.getElementById("rating");

  const charity = charityInput.value.trim();
  const hours = parseFloat(hoursInput.value);
  const date = dateInput.value;
  const rating = ratingInput.value;

  const errors = validateVolunteer({ charity, hours, date, rating });

  if (errors.length > 0) {
    alert(errors.join("\n"));
    return;
  }

  const volunteerData = processVolunteer({ charity, hours, date, rating });

  console.log("Volunteer entry recorded:", volunteerData);
  alert("Volunteer entry successfully added🎀");

  // Reset form
  const form = document.getElementById("volunteer-form");
  if (form) form.reset();
}

// Validation

function validateVolunteer({ charity, hours, date, rating }) {
  const errors = [];
  if (!charity) errors.push("Charity name is required.");
  if (isNaN(hours) || hours <= 0) errors.push("Hours volunteered must be a valid positive number.");
  if (!date) errors.push("Date of volunteering is required.");
  if (!rating) errors.push("Experience rating must be selected.");
  return errors;
}

function processVolunteer({ charity, hours, date, rating }) {
  return {
    charity: charity.trim(),
    hours: parseFloat(hours),
    date,
    rating: parseInt(rating)
  };
}

// Attach listener 
if (typeof document !== "undefined") {
  const form = document.getElementById("volunteer-form");
  if (form) form.addEventListener("submit", handleFormSubmit);
}

// Exports\

module.exports = { handleFormSubmit, validateVolunteer, processVolunteer };
