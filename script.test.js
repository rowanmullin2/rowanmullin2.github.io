/**
 * @jest-environment jsdom
 */

import fs from "fs";
import path from "path";

// Load the HTML file into JSDOM
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

describe("Donation Tracker Form Integration Tests", () => {
  let form;
  let charityInput;
  let amountInput;
  let dateInput;
  let commentInput;

  beforeEach(() => {
    // Reset DOM before each test
    document.documentElement.innerHTML = html.toString();

    // Import the JS file that attaches event listeners
    require("../section-1.js");

    // Get form and inputs
    form = document.getElementById("donation-form");
    charityInput = document.getElementById("charity");
    amountInput = document.getElementById("amount");
    dateInput = document.getElementById("date");
    commentInput = document.getElementById("comment");
