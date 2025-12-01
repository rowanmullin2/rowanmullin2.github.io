const { JSDOM } = require("jsdom");
const fs = require("fs");
const { handleFormSubmit, validateVolunteer, processVolunteer } = require("./section-2.js");

describe("Volunteer Tracker Form – Integration Tests", () => {
  let form;
  let charityInput;
  let hoursInput;
  let dateInput;
  let ratingInput;

  beforeEach(() => {
    let html = fs.readFileSync("./section-5.html", "utf8");
    let dom = new JSDOM(html);
	global.document = dom.window.document;

	form = global.document.getElementById("volunteer-form");
    charityInput = global.document.getElementById("charity");
    hoursInput = global.document.getElementById("hours");
    dateInput = global.document.getElementById("date");
    ratingInput = global.document.getElementById("rating");
  });

  test("Submitting valid form logs correct volunteer data", () => {
    charityInput.value = "Food Banks";
    hoursInput.value = "6";
    dateInput.value = "2025-11-29";
    ratingInput.value = "5";

    // Call the handler directly

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
