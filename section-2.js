// Temporary storage for volunteer entries
const volunteerEntries = [];

// DOM references (from original Section-2.js)
const volunteerForm = document.getElementById("volunteer-form");
const nameInput = document.getElementById("volunteer-name");
const hoursInput = document.getElementById("volunteer-hours");
const dateInput = document.getElementById("volunteer-date");
const ratingInput = document.getElementById("experience-rating");
const volunteerFeedback = document.getElementById("errors");
const volunteerTableBody = document.getElementById("volunteer-table-body");
const totalHoursElement = document.getElementById("total-hours");

const VOLUNTEER_STORAGE_KEY = "volunteerEntries";

//
// CREATE ENTRY
//
function processVolunteer({ name, hours, date, rating }) {
  return {
    name: name.trim(),
    hours: Number(hours),
    date,
    rating: Number(rating)
  };
}

//
// VALIDATE ENTRY
//
function validateVolunteer({ name, hours, date, rating }) {
  const errors = [];
  if (!name || name.trim() === "") errors.push("Name is required");
  if (isNaN(hours) || Number(hours) <= 0) errors.push("Hours volunteered must be a valid positive number");
  if (!date) errors.push("Date of volunteering is required");
  if (!rating || isNaN(rating) || Number(rating) === 0) errors.push("Experience rating must be selected");
  return errors;
}

//
// FEEDBACK
//
function displayVolunteerErrors(errors) {
  if (volunteerFeedback) volunteerFeedback.textContent = errors.join(", ");
}

function displayVolunteerSuccess(message) {
  if (volunteerFeedback) volunteerFeedback.textContent = message;
}

//
// TABLE RENDERING
//
function renderVolunteerTable() {
  if (!volunteerTableBody) return;

  volunteerTableBody.textContent = "";

  volunteerEntries.forEach((entry, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.hours}</td>
      <td>${entry.date}</td>
      <td>${entry.rating}</td>
      <td><button class="delete-button">Delete</button></td>
    `;

    row.querySelector(".delete-button").addEventListener("click", () => {
      volunteerEntries.splice(index, 1);
      saveVolunteerEntriesToLocalStorage();
      renderVolunteerTable();
      updateTotalHours();
    });

    volunteerTableBody.appendChild(row);
  });
}

//
// TOTAL HOURS
//
function calculateTotalHours() {
  return volunteerEntries.reduce((total, entry) => total + entry.hours, 0);
}

function updateTotalHours() {
  if (totalHoursElement) totalHoursElement.textContent = calculateTotalHours();
}

//
// LOCAL STORAGE
//
function saveVolunteerEntriesToLocalStorage() {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(VOLUNTEER_STORAGE_KEY, JSON.stringify(volunteerEntries));
}

function loadVolunteerEntriesFromLocalStorage() {
  if (typeof localStorage === "undefined") return;

  const stored = localStorage.getItem(VOLUNTEER_STORAGE_KEY);
  if (!stored) return;

  try {
    const parsed = JSON.parse(stored);
    volunteerEntries.length = 0;
    parsed.forEach(entry => volunteerEntries.push(entry));
    renderVolunteerTable();
    updateTotalHours();
  } catch (e) {
    console.error("Error loading volunteer entries", e);
  }
}

//
// FORM SUBMIT HANDLER
//
function handleVolunteerFormSubmit(event) {
  event.preventDefault();

  const entryData = {
    name: nameInput.value,
    hours: hoursInput.value,
    date: dateInput.value,
    rating: ratingInput.value
  };

  const errors = validateVolunteer(entryData);
  if (errors.length > 0) {
    displayVolunteerErrors(errors);
    return;
  }

  const entry = processVolunteer(entryData);
  volunteerEntries.push(entry);

  saveVolunteerEntriesToLocalStorage();
  renderVolunteerTable();
  updateTotalHours();

  volunteerForm.reset();
  displayVolunteerSuccess("Volunteer entry successfully added 🎀");
}

// Attach form listener
if (volunteerForm) {
  volunteerForm.addEventListener("submit", handleVolunteerFormSubmit);
}

// Load stored entries on page load
if (typeof window !== "undefined") {
  loadVolunteerEntriesFromLocalStorage();
}

// Export for Jest testing
if (typeof module !== "undefined") {
  module.exports = {
    volunteerEntries,
    handleVolunteerFormSubmit,
    validateVolunteer,
    processVolunteer,
    renderVolunteerTable,
    saveVolunteerEntriesToLocalStorage,
    loadVolunteerEntriesFromLocalStorage,
    calculateTotalHours,
    updateTotalHours
  };
}
