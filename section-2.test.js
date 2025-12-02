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
	let html = fs.readFileSync("./section-2.html", "utf8");
	let dom = new JSDOM(html);
	global.document = dom.window.document;

	form = global.document.getElementById("volunteer-form");
    charityInput = global.document.getElementById("charity");
    hoursInput = global.document.getElementById("hours");
    dateInput = global.document.getElementById("date");
    ratingInput = global.document.getElementById("rating");
  });

  test.skip("REWRITE YOUR UNIT TESTS", () => {});
});
