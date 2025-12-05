// Temporary storage for volunteer entries
const volunteerEntries = [];

// Form submit handler
function handleFormSubmit(event) {
  if (event) event.preventDefault();

  // Get form elements
  const charityInput = document.getElementById("charity");
  const hoursInput = document.getElementById("hours");
  const dateInput = document.getElementById("date");
  const ratingInput = document.getElementById("rating");
  const feedback = document.getElementById("feedback");

  // Clear previous feedback
  if (feedback) feedback.textContent = "";

  // Read values
  const charity = charityInput.value.trim();
  const hours = parseFloat(hoursInput.value);
  const date = dateInput.value;
  const rating = ratingInput.value;

  // Validate inputs
  const errors = validateVolunteer({ charity, hours, date, rating });

  if (errors.length > 0) {
    if (feedback) feedback.textContent = errors.join(", ");
    return;
  }

  // Process and store entry
  const entry = processVolunteer({ charity, hours, date, rating });
  volunteerEntries.push(entry);

  if (feedback) feedback.textContent = "Volunteer entry successfully added 🎀";

  // Reset form
  const form = document.getElementById("volunteer-form");
  if (form) form.reset();
}

// Validation function
function validateVolunteer({ charity, hours, date, rating }) {
  const errors = [];
  if (!charity) errors.push("Charity name is required");
  if (isNaN(hours) || hours <= 0) errors.push("Hours volunteered must be a valid positive number");
  if (!date) errors.push("Date of volunteering is required");
  if (!rating) errors.push("Experience rating must be selected");
  return errors;
}

// Process function
function processVolunteer({ charity, hours, date, rating }) {
  return {
    charity: charity.trim(),
    hours: parseFloat(hours),
    date,
    rating: parseInt(rating)
  };
}

// Attach form listener if in browser
if (typeof document !== "undefined") {
  const form = document.getElementById("volunteer-form");
  if (form) form.addEventListener("submit", handleFormSubmit);
}

// Export for Jest testing
module.exports = {
  volunteerEntries,
  handleFormSubmit,
  validateVolunteer,
  processVolunteer
};
