<<<<<<< HEAD
// This line declares a constant array that will temporarily store volunteer entries while the page is open
const volunteerEntries = [];

// This line gets the volunteer form element from the page using its id
const volunteerForm = document.getElementById("volunteer-form");
// This line gets the Charity Name input element from the page using its id
const charityInput = document.getElementById("charity");
// This line gets the Hours input element from the page using its id
const hoursInput = document.getElementById("hours");
// This line gets the Date input element from the page using its id
const dateInput = document.getElementById("date");
// This line gets the Rating select element from the page using its id
const ratingInput = document.getElementById("rating");
// This line gets the feedback container element where messages will be shown
const volunteerFeedback = document.getElementById("errors");
// This line gets the table body element where volunteer rows will be displayed
const volunteerTableBody = document.getElementById("volunteer-table").querySelector("tbody");
// This line gets the element that will display the total volunteer hours in the summary section
const totalHoursSpan = document.getElementById("total-hours");
// This line declares a string constant that will be used as the key for storing volunteer data in localStorage
const VOLUNTEER_STORAGE_KEY = "volunteerEntries";

// This line defines a function that creates a volunteer object from individual field values
function createVolunteerEntry(charity, hours, date, rating) {
    return {
        charity: charity,
        hours: parseFloat(hours),
        date: date,
        rating: rating
    };
}

// This line defines a function that checks the volunteer data for any problems
function validateVolunteerData(entry) {
    const errors = [];
    if (!entry.charity) errors.push("Charity name is required.");
    if (entry.hours === null || entry.hours === "" || isNaN(entry.hours)) errors.push("Hours are required.");
    if (!entry.date) errors.push("Date is required.");
    if (!entry.rating) errors.push("Rating is required.");
    return errors;
}

// This line defines a function that shows validation errors inside the feedback container
function displayVolunteerErrors(errors) {
    volunteerFeedback.textContent = errors.join(" ");
    volunteerFeedback.classList.remove("success-text");
    volunteerFeedback.classList.add("error-text");
}

// This line defines a function that shows a success message after a valid volunteer entry is added
function displayVolunteerSuccess(message) {
    volunteerFeedback.textContent = message;
    volunteerFeedback.classList.remove("error-text");
    volunteerFeedback.classList.add("success-text");
}

// This line defines a function that calculates the total hours volunteered
function calculateTotalHours() {
    return volunteerEntries.reduce((sum, entry) => sum + entry.hours, 0);
}

// This line defines a function that updates the total hours in the page
function updateTotalHours() {
    if (!totalHoursSpan) return;
    totalHoursSpan.textContent = calculateTotalHours();
}

// This line defines a function that rebuilds the volunteer table using the volunteerEntries array
function renderVolunteerTable() {
    if (!volunteerTableBody) return;
    volunteerTableBody.textContent = "";

    volunteerEntries.forEach((entry, index) => {
        const row = document.createElement("tr");

        const charityCell = document.createElement("td");
        charityCell.textContent = entry.charity;
        row.appendChild(charityCell);

        const hoursCell = document.createElement("td");
        hoursCell.textContent = entry.hours;
        row.appendChild(hoursCell);

        const dateCell = document.createElement("td");
        dateCell.textContent = entry.date;
        row.appendChild(dateCell);

        const ratingCell = document.createElement("td");
        ratingCell.textContent = entry.rating;
        row.appendChild(ratingCell);

        const actionsCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            volunteerEntries.splice(index, 1);
            saveVolunteerEntriesToLocalStorage();
            renderVolunteerTable();
        });
        actionsCell.appendChild(deleteButton);
        row.appendChild(actionsCell);

        volunteerTableBody.appendChild(row);
    });

    updateTotalHours();
}

// This line defines a function that saves the volunteerEntries array into localStorage
function saveVolunteerEntriesToLocalStorage() {
    if (typeof localStorage === "undefined") return;
    localStorage.setItem(VOLUNTEER_STORAGE_KEY, JSON.stringify(volunteerEntries));
}

// This line defines a function that loads volunteer entries from localStorage back into the volunteerEntries array
function loadVolunteerEntriesFromLocalStorage() {
    if (typeof localStorage === "undefined") return;

    const stored = localStorage.getItem(VOLUNTEER_STORAGE_KEY);
    if (!stored) return;

    try {
        const parsedEntries = JSON.parse(stored);
        volunteerEntries.length = 0;
        parsedEntries.forEach(entry => volunteerEntries.push(entry));
        renderVolunteerTable();
    } catch (error) {
        console.error("Unable to read volunteer entries from localStorage", error);
    }
}

// This line defines a function that handles the volunteer form submit event
function handleVolunteerFormSubmit(event) {
    event.preventDefault();

    const entry = createVolunteerEntry(
        charityInput.value,
        hoursInput.value,
        dateInput.value,
        ratingInput.value
    );

    const errors = validateVolunteerData(entry);
    if (errors.length > 0) {
        displayVolunteerErrors(errors);
        return;
    }

    volunteerEntries.push(entry);
    saveVolunteerEntriesToLocalStorage();
    renderVolunteerTable();
    volunteerForm.reset();
    displayVolunteerSuccess("Volunteer entry added successfully.");
}

// This line adds an event listener so the handleVolunteerFormSubmit function runs when the form is submitted
volunteerForm.addEventListener("submit", handleVolunteerFormSubmit);

// This line checks that the code is running in a browser window before trying to load any saved volunteer data
if (typeof window !== "undefined") {
    loadVolunteerEntriesFromLocalStorage();
}

// This line exports functions for Jest testing
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        volunteerEntries,
        createVolunteerEntry,
        validateVolunteerData,
        handleVolunteerFormSubmit,
        renderVolunteerTable,
        saveVolunteerEntriesToLocalStorage,
        loadVolunteerEntriesFromLocalStorage,
        calculateTotalHours,
        updateTotalHours,
        VOLUNTEER_STORAGE_KEY
    };
}
=======

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
>>>>>>> origin/main
