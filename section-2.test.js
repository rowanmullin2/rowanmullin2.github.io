/**
 * @jest-environment jsdom
 */

import fs from "fs";
import path from "path";
import { validateVolunteer, processVolunteer } from "../section-2.js";

// Loading volunteer HTML file
const html = fs.readFileSync(
  path.resolve(__dirname, "../section-2.html"),
  "utf8"
);

//  INTEGRATION TESTS

describe("Volunteer Tracker Form – Integration Tests", () => {
  let form;
  let charityInput;
  let hoursInput;
  let dateInput;
  let ratingInput;

  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();

    require("../section-2.js");

    // Select DOM elements
    form = document.getElementById("volunteer-form");
    charityInput = document.getElementById("charity");
    hoursInput = document.getElementById("hours");
    dateInput = document.getElementById("date");
    ratingInput = document.getElementById("rating");

    // Mock alert + console.log
    global.alert = jest.fn();
    global.console.log = jest.fn();
  });

  test("Submitting valid form logs correct volunteer data", () => {
    charityInput.value = "Food Banks";
    hoursInput.value = "6";
    dateInput.value = "2025-11-29";
    ratingInput.value = "5";

    // Trigger form submit
    form.dispatchEvent(new Event("submit", { bubbles: true }));

    expect(global.console.log).toHaveBeenCalledWith(
      "Volunteer entry recorded:",
      {
        charity: "Food Banks",
        hours: 6,
        date: "2025-11-29",
        rating: 5,
      }
    );

    expect(global.alert).toHaveBeenCalledWith("Volunteer entry successfully added🎀");
  });

  test("Submitting invalid form triggers validation errors", () => {
    charityInput.value = "";
    hoursInput.value = "-1";
    dateInput.value = "";
    ratingInput.value = "";

    form.dispatchEvent(new Event("submit", { bubbles: true }));

    expect(global.alert).toHaveBeenCalledWith(
      expect.stringContaining("Charity name is required.")
    );
    expect(global.alert).toHaveBeenCalledWith(
      expect.stringContaining("Hours volunteered must be a valid positive number.")
    );
    expect(global.alert).toHaveBeenCalledWith(
      expect.stringContaining("Date of volunteering is required.")
    );
    expect(global.alert).toHaveBeenCalledWith(
      expect.stringContaining("Experience rating must be selected.")
    );

    // Should not log data
    expect(global.console.log).not.toHaveBeenCalled();
  });
});

//  UNIT TESTS

describe("Volunteer Tracker – Unit Tests", () => {

  // VALIDATION TESTS
  test("Detects empty required fields", () => {
    const errors = validateVolunteer({
      charity: "",
      hours: "",
      date: "",
      rating: ""
    });

    expect(errors).toContain("Charity name is required.");
    expect(errors).toContain("Hours volunteered must be a valid positive number.");
    expect(errors).toContain("Date of volunteering is required.");
    expect(errors).toContain("Experience rating must be selected.");
  });

  test("Flags invalid hours: non-numeric", () => {
    const errors = validateVolunteer({
      charity: "Lifewater Canada",
      hours: "abc",
      date: "2025-11-28",
      rating: "3"
    });

    expect(errors).toContain("Hours volunteered must be a valid positive number.");
  });

  test("Flags invalid hours: negative", () => {
    const errors = validateVolunteer({
      charity: "Lifewater Canada",
      hours: -4,
      date: "2025-11-28",
      rating: "4"
    });

    expect(errors).toContain("Hours volunteered must be a valid positive number.");
  });

  test("Valid input returns no errors", () => {
    const errors = validateVolunteer({
      charity: "Lifewater Canada",
      hours: 5,
      date: "2025-11-28",
      rating: "5"
    });

    expect(errors).toEqual([]); // no errors
  });

  // DATA PROCESSING TESTS

  test("Returns correct volunteer object for valid input", () => {
    const data = processVolunteer({
      charity: "Smile Foundation",
      hours: "7",
      date: "2025-11-28",
      rating: "4"
    });

    expect(data).toEqual({
      charity: "Smile Foundation",
      hours: 7,
      date: "2025-11-28",
      rating: 4
    });
  });

  test("Trims whitespace and converts numbers correctly", () => {
    const data = processVolunteer({
      charity: "  Gurshaahi  ",
      hours: "3.5",
      date: "2025-11-28",
      rating: "2"
    });

    expect(data.charity).toBe("Gurshaahi");
    expect(data.hours).toBe(3.5);
    expect(data.rating).toBe(2);
  });

});
