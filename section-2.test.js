/**
 * @jest-environment jsdom
 */
const fs = require("fs");
const path = require("path");
const { handleFormSubmit, validateVolunteer, processVolunteer } = require("./section-2.js");

// Load HTML into JSDOM
const html = fs.readFileSync(path.resolve(__dirname, "section-2.html"), "utf8");

describe("Volunteer Tracker Form – Integration Tests", () => {
  let form;
  let charityInput;
  let hoursInput;
  let dateInput;
  let ratingInput;

  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();

    form = document.getElementById("volunteer-form");
    charityInput = document.getElementById("charity");
    hoursInput = document.getElementById("hours");
    dateInput = document.getElementById("date");
    ratingInput = document.getElementById("rating");

    // Mock alert and console.log
    global.alert = jest.fn();
    global.console.log = jest.fn();
  });

  test("Submitting valid form logs correct volunteer data", () => {
    charityInput.value = "Food Banks";
    hoursInput.value = "6";
    dateInput.value = "2025-11-29";
    ratingInput.value = "5";

    // Call the handler directly
    handleFormSubmit({ preventDefault: () => {} });

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

    handleFormSubmit({ preventDefault: () => {} });

    const alertCalls = global.alert.mock.calls.join("\n");
    expect(alertCalls).toMatch(/Charity name is required./);
    expect(alertCalls).toMatch(/Hours volunteered must be a valid positive number./);
    expect(alertCalls).toMatch(/Date of volunteering is required./);
    expect(alertCalls).toMatch(/Experience rating must be selected./);

    expect(global.console.log).not.toHaveBeenCalled();
  });
});
