const { JSDOM } = require("jsdom")
const fs = require("fs");

// Get functions from your JS file
const { validateDonation, processDonation, calculateTotal, deleteDonation,
  saveDonations, loadDonations } = require("./section-1.js");

// Integration Tests
describe("Donation Tracker Form Integration Tests", () => {
  let form;
  let charityInput;
  let amountInput;
  let dateInput;
  let commentInput;

  beforeEach(() => {

	let html = fs.readFileSync("./section-1.html", "utf8");
	let dom = new JSDOM(html);
	global.document = dom.window.document;

    // Import the JS file that attaches event listeners
    require("./section-1.js");

    // Get form and inputs
    form = global.document.getElementById("donation-form");
    charityInput = global.document.getElementById("charity");
    amountInput = global.document.getElementById("amount");
    dateInput = global.document.getElementById("date");
    commentInput = global.document.getElementById("comment");
  });

  test.skip("REDO YOUR INTEGRATION TESTS", () => {})
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

beforeEach(() => {
  localStorage.clear();
});

test("calculateTotal returns correct sum", () => {
  const donations = [
    { amount: 10 },
    { amount: 20 },
    { amount: 5 }
  ];

  expect(calculateTotal(donations)).toBe(35);
});

test("deleteDonation removes the correct record", () => {
  const donations = [
    { id: 1, amount: 10 },
    { id: 2, amount: 20 }
  ];

  saveDonations(donations);
  deleteDonation(1);

  const updated = loadDonations();
  expect(updated.length).toBe(1);
  expect(updated[0].id).toBe(2);
});

test("total updates after deletion", () => {
  const donations = [
    { id: 1, amount: 10 },
    { id: 2, amount: 20 }
  ];

  saveDonations(donations);
  deleteDonation(1);

  const updated = loadDonations();
  expect(calculateTotal(updated)).toBe(20);
});

beforeEach(() => {
  document.body.innerHTML = fs.readFileSync(
    path.resolve(__dirname, "index.html"),
    "utf8"
  );
  localStorage.clear();
});

test("table updates after adding data to localStorage", () => {
  saveDonations([
    { id: 1, charity: "UNICEF", amount: 50, date: "2025-01-01", comment: "Nice" }
  ]);

  renderTable();

  const rows = document.querySelectorAll("#donation-table tbody tr");
  expect(rows.length).toBe(1);
  expect(rows[0].children[0].textContent).toBe("UNICEF");
});

test("data persists and loads correctly into table", () => {
  saveDonations([
    { id: 1, charity: "Red Cross", amount: 100, date: "2025-02-01", comment: "Help" }
  ]);

  renderTable();

  const rows = document.querySelectorAll("#donation-table tbody tr");
  expect(rows.length).toBe(1);
  expect(rows[0].children[1].textContent).toBe("100.00");
});