/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");

// Get functions from your JS file
const { validateDonation, processDonation } = require("./section-1.js");

// Load the HTML file into memory
const html = fs.readFileSync(
  path.resolve(__dirname, "./index.html"),
  "utf8"
);

// Integration Tests
describe("Donation Tracker Form Integration Tests", () => {
  let form;
  let charityInput;
  let amountInput;
  let dateInput;
  let commentInput;

  beforeEach(() => {
    // Reset modules so section-1(2).js re-runs for each test
    jest.resetModules();

    // Reset DOM before each test
    document.body.innerHTML = html.toString();

    // Import the JS file that attaches event listeners
    require("./section-1.js");

    // Get form and inputs
    form = document.getElementById("donation-form");
    charityInput = document.getElementById("charity");
    amountInput = document.getElementById("amount");
    dateInput = document.getElementById("date");
    commentInput = document.getElementById("comment");

    

    // Mock alert and console.log so we can test them
    global.alert = jest.fn();
    global.console.log = jest.fn();
  });

  test("Submitting valid form updates temporary data object correctly", () => {
    // Fill in valid values
    charityInput = "Red Cross";
    amountInput = 100;
    dateInput = "2025-11-28";
    commentInput = "Keep up the great work!";

    // Trigger submit
    form.dispatchEvent(new Event("submit", { bubbles: true }));

    // Check console.log was called with donation object
    expect(global.console.log).toHaveBeenCalledWith("Donation recorded:", {
      charity: "Red Cross",
      amount: "100",
      date: "2025-11-28",
      comment: "Keep up the great work!",
    });

    // Check success alert
    expect(global.alert).toHaveBeenCalledWith("Donation successfully added!");
  });

  test("Submitting invalid form triggers validation feedback", () => {
    // Leave charity empty and amount invalid
    charityInput = "";
    amountInput = "-50";
    dateInput = "";

    // Trigger submit
    form.dispatchEvent(new Event("submit", { bubbles: true }));

    // Check alert contains validation errors
    expect(global.alert).toHaveBeenCalledWith(
      expect.stringContaining("Charity name is required.")
    );
    expect(global.alert).toHaveBeenCalledWith(
      expect.stringContaining("Donation amount must be a valid positive number.")
    );
    expect(global.alert).toHaveBeenCalledWith(
      expect.stringContaining("Date of donation is required.")
    );

    // Ensure donation object was NOT logged
    expect(global.console.log).not.toHaveBeenCalled();
  });
});

describe("Donation Tracker Unit Tests", () => {
  test("Identifies empty required fields", () => {
    const errors = validateDonation({ charity: "", amount: "", date: "" });
    expect(errors).toContain("Charity name is required.");
    expect(errors).toContain("Donation amount must be a valid positive number.");
    expect(errors).toContain("Date of donation is required.");
  });

  test("Flags invalid donation amounts (non-numeric)", () => {
    const errors = validateDonation({
      charity: "UNICEF",
      amount: "abc",
      date: "2025-11-28",
    });
    expect(errors).toContain(
      "Donation amount must be a valid positive number."
    );
  });

  test("Flags invalid donation amounts (negative)", () => {
    const errors = validateDonation({
      charity: "UNICEF",
      amount: -50,
      date: "2025-11-28",
    });
    expect(errors).toContain(
      "Donation amount must be a valid positive number."
    );
  });

  test("Returns no errors for valid input", () => {
    const errors = validateDonation({
      charity: "UNICEF",
      amount: 100,
      date: "2025-11-28",
    });
    expect(errors).toEqual([]); // no errors
  });

  // DATA PROCESSING TESTS

  test("Returns correct donation object for valid inputs", () => {
    const donation = processDonation({
      charity: " Red Cross ",
      amount: "200",
      date: "2025-11-28",
      comment: " Great work! ",
    });

    expect(donation).toEqual({
      charity: "Red Cross", // trimmed
      amount: 200,          // parsed to number
      date: "2025-11-28",
      comment: "Great work!", // trimmed
    });
  });

  test("Handles optional comment gracefully", () => {
    const donation = processDonation({
      charity: "UNICEF",
      amount: "50",
      date: "2025-11-28",
      comment: "",
    });

    expect(donation.comment).toBe(""); // empty string if no comment
  });
});
