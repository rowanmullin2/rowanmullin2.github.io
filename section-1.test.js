const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

// Import functions from your JS file
const {
  validateDonation,
  processDonation,
  calculateTotal,
  deleteDonation,
  saveDonations,
  loadDonations,
  renderTable,
} = require("./section-1.js");


// INTEGRATION TESTS

describe("Donation Tracker Integration Tests", () => {
  let dom;
  let document;
  global.window = dom.window;
  global.document = dom.window.document;
  global.localStorage = dom.window.localStorage;


  beforeEach(() => {
    const html = fs.readFileSync("./section-1.html", "utf8");
    dom = new JSDOM(html, { url: "http://localhost" });

    global.window = dom.window;
    global.document = dom.window.document;
    global.localStorage = dom.window.localStorage;

    // Load script AFTER DOM exists
    require("./section-1.js");
  });

  test("User can submit a donation and it appears in the table", () => {
    const form = document.getElementById("donation-form");
    const charityInput = document.getElementById("charity");
    const amountInput = document.getElementById("amount");
    const dateInput = document.getElementById("date");
    const commentInput = document.getElementById("comment");

    // Simulate user input
    charityInput.value = "UNICEF";
    amountInput.value = "50";
    dateInput.value = "2025-01-01";
    commentInput.value = "Great";

    // Submit form
    form.dispatchEvent(new dom.window.Event("submit"));

    // Check table updated
    const rows = document.querySelectorAll("#donation-table tbody tr");
    expect(rows.length).toBe(1);
    expect(rows[0].children[0].textContent).toBe("UNICEF");
    expect(rows[0].children[1].textContent).toBe("50.00");

    // Check localStorage updated
    const stored = JSON.parse(localStorage.getItem("donations"));
    expect(stored.length).toBe(1);
  });
});


// UNIT TESTS

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
    expect(errors).toContain("Donation amount must be a valid positive number.");
  });

  test("Flags invalid donation amounts (negative)", () => {
    const errors = validateDonation({
      charity: "UNICEF",
      amount: -50,
      date: "2025-11-28",
    });
    expect(errors).toContain("Donation amount must be a valid positive number.");
  });

  test("Returns no errors for valid input", () => {
    const errors = validateDonation({
      charity: "UNICEF",
      amount: 100,
      date: "2025-11-28",
    });
    expect(errors).toEqual([]);
  });

  test("Returns correct donation object for valid inputs", () => {
    const donation = processDonation({
      charity: "Red Cross",
      amount: "200",
      date: "2025-11-28",
      comment: "Great work!",
    });

    expect(donation).toMatchObject({
      charity: "Red Cross",
      amount: 200,
      date: "2025-11-28",
      comment: "Great work!",
    });
  });

  test("Handles optional comment gracefully", () => {
    const donation = processDonation({
      charity: "UNICEF",
      amount: "50",
      date: "2025-11-28",
      comment: "",
    });

    expect(donation.comment).toBe("");
  });
});


// STORAGE + TABLE TESTS

describe("Donation Tracker Storage + Table Tests", () => {
  let dom;
  let document;
  


  beforeEach(() => {
    const html = fs.readFileSync("./section-1.html", "utf8");
    dom = new JSDOM(html, { url: "http://localhost" });

    global.window = dom.window;
    global.document = dom.window.document;
    global.localStorage = dom.window.localStorage;

    require("./section-1.js");
  });

  test("calculateTotal returns correct sum", () => {
    const donations = [
      { amount: 10 },
      { amount: 20 },
      { amount: 5 },
    ];
    expect(calculateTotal(donations)).toBe(35);
  });

  test("deleteDonation removes the correct record", () => {
    const donations = [
      { id: 1, amount: 10 },
      { id: 2, amount: 20 },
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
      { id: 2, amount: 20 },
    ];

    saveDonations(donations);
    deleteDonation(1);

    const updated = loadDonations();
    expect(calculateTotal(updated)).toBe(20);
  });

  test("table updates after adding data to localStorage", () => {
    saveDonations([
      { id: 1, charity: "UNICEF", amount: 50, date: "2025-01-01", comment: "Nice" },
    ]);

    renderTable();

    const rows = document.querySelectorAll("#donation-table tbody tr");
    expect(rows.length).toBe(1);
    expect(rows[0].children[0].textContent).toBe("UNICEF");
  });

  test("data persists and loads correctly into table", () => {
    saveDonations([
      { id: 1, charity: "Red Cross", amount: 100, date: "2025-02-01", comment: "Help" },
    ]);

    renderTable();

    const rows = document.querySelectorAll("#donation-table tbody tr");
    expect(rows.length).toBe(1);
    expect(rows[0].children[1].textContent).toBe("100.00");
  });
});