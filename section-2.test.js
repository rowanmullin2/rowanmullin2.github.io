const { JSDOM } = require("jsdom");

// Mock DOM for testing
const dom = new JSDOM(`
  <form id="volunteer-form">
    <input type="text" id="charity">
    <input type="number" id="hours">
    <input type="date" id="date">
    <select id="rating">
      <option value="">Select Rating</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
  </form>
  <div id="feedback"></div>
`);

global.document = dom.window.document;

// Import functions and temporary storage from section-2.js
const {
  volunteerEntries,
  handleFormSubmit,
  validateVolunteer,
  processVolunteer,
} = require("./section-2.js");

// Unit tests for processVolunteer
describe("processVolunteer", () => {
  test("returns object with correct values", () => {
    const input = { charity: "Helping Hands", hours: 3, date: "2025-12-05", rating: "4" };
    const result = processVolunteer(input);
    expect(result.charity).toBe("Helping Hands");
    expect(result.hours).toBe(3);
    expect(result.date).toBe("2025-12-05");
    expect(result.rating).toBe(4);
  });
});

// Unit tests for validateVolunteer
describe("validateVolunteer", () => {
  test("returns no errors for valid input", () => {
    const input = { charity: "Helping Hands", hours: 5, date: "2025-12-05", rating: "3" };
    const errors = validateVolunteer(input);
    expect(errors.length).toBe(0);
  });

  test("returns error for empty charity", () => {
    const input = { charity: "", hours: 5, date: "2025-12-05", rating: "3" };
    const errors = validateVolunteer(input);
    expect(errors.join(" ")).toMatch(/Charity name is required/i);
  });

  test("returns error for invalid hours", () => {
    const input = { charity: "Helping Hands", hours: -2, date: "2025-12-05", rating: "3" };
    const errors = validateVolunteer(input);
    expect(errors.join(" ")).toMatch(/Hours volunteered must be a valid positive number/i);
  });

  test("returns error for missing date", () => {
    const input = { charity: "Helping Hands", hours: 2, date: "", rating: "3" };
    const errors = validateVolunteer(input);
    expect(errors.join(" ")).toMatch(/Date of volunteering is required/i);
  });

  test("returns error for missing rating", () => {
    const input = { charity: "Helping Hands", hours: 2, date: "2025-12-05", rating: "" };
    const errors = validateVolunteer(input);
    expect(errors.join(" ")).toMatch(/Experience rating must be selected/i);
  });
});

// Integration tests for form submission
describe("integration: volunteer form submission", () => {
  beforeEach(() => {
    volunteerEntries.length = 0; // Reset storage
  });

  test("submitting valid form adds entry to volunteerEntries", () => {
    document.getElementById("charity").value = "Helping Hands";
    document.getElementById("hours").value = "4";
    document.getElementById("date").value = "2025-12-05";
    document.getElementById("rating").value = "5";

    const fakeEvent = { preventDefault: () => {} };
    handleFormSubmit(fakeEvent);

    expect(volunteerEntries.length).toBe(1);
    expect(volunteerEntries[0].charity).toBe("Helping Hands");
    expect(volunteerEntries[0].hours).toBe(4);
    expect(volunteerEntries[0].date).toBe("2025-12-05");
    expect(volunteerEntries[0].rating).toBe(5);
  });

  test("submitting form with missing charity shows error and does not add entry", () => {
    document.getElementById("charity").value = "";
    document.getElementById("hours").value = "3";
    document.getElementById("date").value = "2025-12-05";
    document.getElementById("rating").value = "4";

    const fakeEvent = { preventDefault: () => {} };
    handleFormSubmit(fakeEvent);

    expect(volunteerEntries.length).toBe(0);
  });
});
