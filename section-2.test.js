const { JSDOM } = require("jsdom");
const fs = require("fs");

// ----------------------
// Setup initial DOM
// ----------------------
const dom = new JSDOM(`
  <form id="volunteer-form">
    <input type="text" id="charity">
    <input type="number" id="hours">
    <input type="date" id="date">
    <input type="text" id="rating">
    <button type="submit">Add</button>
  </form>
  <div id="errors"></div>
  <table id="volunteer-table">
    <tbody id="volunteer-table-body"></tbody>
  </table>
  <span id="total-hours"></span>
`);
global.document = dom.window.document;

// ----------------------
// Import functions & array
// ----------------------
const {
  volunteerEntries,
  createVolunteerEntry,
  validateVolunteerData,
  handleVolunteerFormSubmit,
  saveVolunteerEntriesToLocalStorage,
  loadVolunteerEntriesFromLocalStorage,
  calculateTotalHours,
  renderVolunteerTable,
  deleteVolunteerEntry
} = require("./section-2.js");

// ----------------------
// Unit Tests
// ----------------------
describe("createVolunteerEntry", () => {
  test("returns object with correct fields", () => {
    const entry = createVolunteerEntry("Red Cross", 5, "2025-12-05", "A+");
    expect(entry.charity).toBe("Red Cross");
    expect(entry.hours).toBe(5);
    expect(entry.date).toBe("2025-12-05");
    expect(entry.rating).toBe("A+");
  });
});

describe("validateVolunteerData", () => {
  test("returns no errors for valid entry", () => {
    const validEntry = createVolunteerEntry("Red Cross", 5, "2025-12-05", "A+");
    expect(validateVolunteerData(validEntry).length).toBe(0);
  });

  test("returns error if charity missing", () => {
    const invalidEntry = createVolunteerEntry("", 5, "2025-12-05", "A+");
    expect(validateVolunteerData(invalidEntry).join(" ")).toMatch(/charity/i);
  });

  test("returns error if hours missing or invalid", () => {
    const invalidEntry = createVolunteerEntry("Red Cross", 0, "2025-12-05", "A+");
    expect(validateVolunteerData(invalidEntry).join(" ")).toMatch(/hours/i);
  });
});

// ----------------------
// Integration Tests: Form Submission
// ----------------------
describe("integration: volunteer form submission", () => {
  beforeEach(() => {
    volunteerEntries.length = 0;
    document.getElementById("charity").value = "";
    document.getElementById("hours").value = "";
    document.getElementById("date").value = "";
    document.getElementById("rating").value = "";
    document.getElementById("errors").textContent = "";
  });

  test("valid submission adds entry", () => {
    document.getElementById("charity").value = "Red Cross";
    document.getElementById("hours").value = "3";
    document.getElementById("date").value = "2025-12-05";
    document.getElementById("rating").value = "A+";

    handleVolunteerFormSubmit({ preventDefault: () => {} });

    expect(volunteerEntries.length).toBe(1);
    expect(volunteerEntries[0].charity).toBe("Red Cross");
  });

  test("invalid submission shows error and does not add", () => {
    document.getElementById("charity").value = "";
    document.getElementById("hours").value = "3";
    document.getElementById("date").value = "2025-12-05";
    document.getElementById("rating").value = "A+";

    handleVolunteerFormSubmit({ preventDefault: () => {} });

    expect(volunteerEntries.length).toBe(0);
    expect(document.getElementById("errors").textContent).toMatch(/charity/i);
  });
});

// ----------------------
// Stage Two: localStorage Tests
// ----------------------
let localStore = {};
global.localStorage = {
  getItem: jest.fn((key) => localStore[key] || null),
  setItem: jest.fn((key, value) => { localStore[key] = value; }),
  removeItem: jest.fn((key) => { delete localStore[key]; }),
  clear: jest.fn(() => { localStore = {}; })
};

describe("localStorage", () => {
  beforeEach(() => {
    volunteerEntries.length = 0;
    localStore = {};
    document.getElementById("volunteer-table-body").textContent = "";
  });

  test("save and load entries from localStorage", () => {
    const entry = createVolunteerEntry("Red Cross", 3, "2025-12-05", "A+");
    volunteerEntries.push(entry);

    saveVolunteerEntriesToLocalStorage();
    expect(localStore['volunteerEntries']).toBe(JSON.stringify(volunteerEntries));

    volunteerEntries.length = 0;
    loadVolunteerEntriesFromLocalStorage();
    expect(volunteerEntries.length).toBe(1);
    expect(volunteerEntries[0].charity).toBe("Red Cross");
  });
});

// ----------------------
// Table rendering and delete tests
// ----------------------
describe("Volunteer Table & Total Hours", () => {
  beforeEach(() => {
    volunteerEntries.length = 0;
    localStore = {};
    document.getElementById("volunteer-table-body").textContent = "";
    document.getElementById("total-hours").textContent = "";
  });

  test("renderVolunteerTable displays entries in table", () => {
    const entry = createVolunteerEntry("Red Cross", 3, "2025-12-05", "A+");
    volunteerEntries.push(entry);
    renderVolunteerTable();

    const rows = document.getElementById("volunteer-table-body").querySelectorAll("tr");
    expect(rows.length).toBe(1);
    expect(rows[0].children[0].textContent).toBe("Red Cross");
    expect(rows[0].children[1].textContent).toBe("3");
  });

  test("deleteVolunteerEntry removes entry and updates table & total hours", () => {
    const first = createVolunteerEntry("Red Cross", 3, "2025-12-05", "A+");
    const second = createVolunteerEntry("Food Bank", 2, "2025-12-05", "B");
    volunteerEntries.push(first, second);
    renderVolunteerTable();

    deleteVolunteerEntry(0); // delete first entry
    expect(volunteerEntries.length).toBe(1);
    expect(volunteerEntries[0].charity).toBe("Food Bank");

    const rows = document.getElementById("volunteer-table-body").querySelectorAll("tr");
    expect(rows.length).toBe(1);

    const totalHours = document.getElementById("total-hours").textContent;
    expect(totalHours).toBe("2");
  });
});