const { validateDonation, processDonation } = require("./section-1.js");

describe("validateDonation", () => {
  test("identifies empty required fields", () => {
    const errors = validateDonation({ charity: "", amount: "", date: "" });
    expect(errors).toContain("Charity name is required.");
    expect(errors).toContain("Donation amount must be a valid positive number.");
    expect(errors).toContain("Date of donation is required.");
  });

  test("flags invalid donation amounts", () => {
    const errors = validateDonation({ charity: "UNICEF", amount: -10, date: "2025-01-01" });
    expect(errors).toContain("Donation amount must be a valid positive number.");
  });

  test("returns no errors for valid input", () => {
    const errors = validateDonation({ charity: "UNICEF", amount: 50, date: "2025-01-01" });
    expect(errors).toEqual([]);
  });
});

describe("processDonation", () => {
  test("returns correct temporary data object", () => {
    const input = {
      charity: "  UNICEF  ",
      amount: "25",
      date: "2025-01-01",
      comment: "  Great work! "
    };

    const result = processDonation(input);

    expect(result).toEqual({
      charity: "UNICEF",
      amount: 25,
      date: "2025-01-01",
      comment: "Great work!"
    });
  });
});

/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");
const { handleFormSubmit, tempDonationData } = require("./section-1.js");

beforeEach(() => {
  document.body.innerHTML = `
    <form id="donation-form">
      <input id="charity" />
      <input id="amount" />
      <input id="date" />
      <textarea id="comment"></textarea>
      <div id="errors"></div>
    </form>
  `;
});

describe("Integration: Form Submission", () => {
  test("updates temporary data object on valid submission", () => {
    document.getElementById("charity").value = "UNICEF";
    document.getElementById("amount").value = "50";
    document.getElementById("date").value = "2025-01-01";
    document.getElementById("comment").value = "Keep it up!";

    const form = document.getElementById("donation-form");
    form.dispatchEvent(new Event("submit"));

    expect(tempDonationData).toEqual({
      charity: "UNICEF",
      amount: 50,
      date: "2025-01-01",
      comment: "Keep it up!"
    });
  });

  test("shows validation errors in the DOM", () => {
    const form = document.getElementById("donation-form");
    form.dispatchEvent(new Event("submit"));

    const errorBox = document.getElementById("errors").innerHTML;

    expect(errorBox).toContain("Charity name is required.");
    expect(errorBox).toContain("Donation amount must be a valid positive number.");
    expect(errorBox).toContain("Date of donation is required.");
  });
});