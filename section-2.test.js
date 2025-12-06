const { JSDOM } = require("jsdom");

// Mock DOM for testing
const dom = new JSDOM(`
  <form id="volunteer-form">
    <input type="text" id="volunteer-name">
    <input type="number" id="volunteer-hours">
    <input type="date" id="volunteer-date">
    <select id="experience-rating">
      <option value="">Select Rating</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
  </form>
  <div id="errors"></div>
  <table>
    <tbody id="volunteer-table-body"></tbody>
  </table>
  <div id="total-hours"></div>
`);

global.document = dom.window.document;

// Import functions and temporary storage from section-2.js
const {
  volunteerEntries,
  handleVolunteerFormSubmit,
  validateVolunteer,
  processVolunteer,
  renderVolunteerTable,
  calculateTotalHours,
  updateTotalHours,
  saveVolunteerEntriesToLocalStorage,
  loadVolunteerEntriesFromLocalStorage
} = require("./section-2.js");

// Unit tests for processVolunteer
describe("processVolunteer", () => {
  test("returns object with correct values", () => {
    const input = { name: "Helping Hands", hours: 3, date: "2025-12-05", rating: "4" };
    const result = processVolunteer(input);
    expect(result.name).toBe("Helping Hands");
    expect(result.hours).toBe(3);
    expect(result.date).toBe("2025-12-05");
    expect(result.rating).toBe(4);
  });
});

// Unit tests for validateVolunteer
describe("validateVolunteer", () => {
  test("returns no errors for valid input", () => {
    const input = { name: "Helping Hands", hours: 5, date: "2025-12-05", rating: "3" };
    const errors = validateVolunteer(input);
    expect(errors.length).toBe(0);
  });

  test("returns error for empty name", () => {
    const input = { name: "", hours: 5, date: "2025-12-05", rating: "3" };
    const errors = validateVolunteer(input);
    expect(errors.join(" ")).toMatch(/Name is required/i);
  });

  test("returns error for invalid hours", () => {
    const input = { name: "Helping Hands", hours: -2, date: "2025-12-05", rating: "3" };
    const errors = validateVolunteer(input);
    expect(errors.join(" ")).toMatch(/Hours volunteered must be a valid positive number/i);
  });

  test("returns error for missing date", () => {
    const input = { name: "Helping Hands", hours: 2, date: "", rating: "3" };
    const errors = validateVolunteer(input);
    expect(errors.join(" ")).toMatch(/Date of volunteering is required/i);
  });

  test("returns error for missing rating", () => {
    const input = { name: "Helping Hands", hours: 2, date: "2025-12-05", rating: "" };
    const errors = validateVolunteer(input);
    expect(errors.join(" ")).toMatch(/Experience rating must be selected/i);
  });
});

// Integration tests for form submission and table
describe("integration: volunteer form submission", () => {
  beforeEach(() => {
    volunteerEntries.length = 0; // Reset storage
    document.getElementById("volunteer-name").value = "";
    document.getElementById("volunteer-hours").value = "";
    document.getElementById("volunteer-date").value = "";
    document.getElementById("experience-rating").value = "";
    document.getElementById("volunteer-table-body").textContent = "";
    document.getElementById("errors").textContent = "";
    document.getElementById("total-hours").textContent = "";
  });

  test("submitting valid form adds entry to volunteerEntries and updates table & total hours", () => {
    document.getElementById("volunteer-name").value = "Helping Hands";
    document.getElementById("volunteer-hours").value = "4";
    document.getElementById("volunteer-date").value = "2025-12-05";
    document.getElementById("experience-rating").value = "5";

    const fakeEvent = { preventDefault: () => {} };
    handleVolunteerFormSubmit(fakeEvent);

    // Check volunteerEntries
    expect(volunteerEntries.length).toBe(1);
    expect(volunteerEntries[0].name).toBe("Helping Hands");

    // Check table content
    const tableRow = document.querySelector("#volunteer-table-body tr");
    expect(tableRow).not.toBeNull();
    expect(tableRow.cells[0].textContent).toBe("Helping Hands");
    expect(tableRow.cells[1].textContent).toBe("4");

    // Check total hours
    expect(document.getElementById("total-hours").textContent).toBe("4");
  });

  test("deleting an entry updates table, localStorage and total hours", () => {
    // Add one entry first
    volunteerEntries.push({ name: "Helping Hands", hours: 4, date: "2025-12-05", rating: 5 });
    renderVolunteerTable();
    updateTotalHours();

    const deleteButton = document.querySelector(".delete-button");
    expect(deleteButton).not.toBeNull();

    deleteButton.click();

    // Entry removed
    expect(volunteerEntries.length).toBe(0);
    expect(document.querySelector("#volunteer-table-body tr")).toBeNull();
    expect(document.getElementById("total-hours").textContent).toBe("0");
  });
});
