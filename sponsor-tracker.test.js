const { JSDOM } = require("jsdom");
const dom = new JSDOM(`<form id="sponsor-form">
		<input type="text" id="sponsor-brand">
		<input type="text" id="sponsor-name">
		<input type="email" id="sponsor-email">
		<textarea id="sponsor-comment"></textarea>
		<input type="text" id="sponsor-event">
	</form>
	<div id="sponsor-feedback"></div>
`);
global.document = dom.window.document;


// This line imports the temporary data array and functions we want to test from the sponsor-tracker module using Node's require function
const {
	sponsorEntries,
	createSponsorEntry,
	validateSponsorData,
	handleSponsorFormSubmit,
} = require("./sponsor-tracker.js");

// This line starts a Jest describe block that groups tests related to the createSponsorEntry function
describe("createSponsorEntry", () => {
	// This line defines a Jest test that checks whether createSponsorEntry returns an object with the supplied values
	test("returns an object with the supplied field values", () => {
		// This line calls createSponsorEntry with example sponsor information and stores the returned object in a variable
		const sponsor = createSponsorEntry(
			"Acme Corp",
			"Jane Doe",
			"jane@example.com",
			"Happy to support the community.",
			"River Cleanup"
		);
		// This line checks that the brand property on the returned object matches the first value we passed in
		expect(sponsor.brand).toBe("Acme Corp");
		// This line checks that the name property on the returned object matches the second value we passed in
		expect(sponsor.name).toBe("Jane Doe");
		// This line checks that the email property on the returned object matches the third value we passed in
		expect(sponsor.email).toBe("jane@example.com");
		// This line checks that the comment property on the returned object matches the fourth value we passed in
		expect(sponsor.comment).toBe("Happy to support the community.");
		// This line checks that the event property on the returned object matches the fifth value we passed in
		expect(sponsor.event).toBe("River Cleanup");
	});
});

// This line starts a Jest describe block that groups tests related to the validateSponsorData function (unit tests)
describe("validateSponsorData", () => {
	// This line defines a test that confirms no errors are returned when all fields are valid
	test("returns no errors for a completely valid sponsor", () => {
		// This line creates a valid sponsor object that should pass all validation checks
		const validSponsor = {
			// This line sets a non-empty brand value on the sponsor object
			brand: "Acme Corp",
			// This line sets a non-empty contact name on the sponsor object
			name: "Jane Doe",
			// This line sets an email value that correctly contains the @ symbol
			email: "jane@example.com",
			// This line sets a comment value, which is optional but allowed
			comment: "Happy to support the community.",
			// This line sets a non-empty event value on the sponsor object
			event: "River Cleanup",
		};
		// This line calls validateSponsorData with the valid sponsor and stores any returned errors in a variable
		const errors = validateSponsorData(validSponsor);
		// This line checks that the errors array has a length of zero, meaning no validation problems were found
		expect(errors.length).toBe(0);
	});

	// This line defines a test that checks the error returned when the brand field is missing
	test("returns an error when brand is empty", () => {
		// This line creates a sponsor object with an empty brand value but valid values for other fields
		const sponsorMissingBrand = {
			// This line sets the brand value to an empty string to simulate missing data
			brand: "",
			// This line sets a valid contact name
			name: "Jane Doe",
			// This line sets a valid email value containing the @ symbol
			email: "jane@example.com",
			// This line sets a comment value
			comment: "Comment text",
			// This line sets a valid event value
			event: "River Cleanup",
		};
		// This line calls validateSponsorData with the sponsorMissingBrand object and stores the result
		const errors = validateSponsorData(sponsorMissingBrand);
		// This line checks that the returned errors array contains at least one error message
		expect(errors.length).toBeGreaterThan(0);
		// This line checks that at least one error message mentions the brand or company name
		expect(errors.join(" ")).toMatch(/Brand or company name is required/i);
	});

	// This line defines a test that checks the error returned when the name field is missing
	test("returns an error when contact name is empty", () => {
		// This line creates a sponsor object with an empty name value but valid values for other fields
		const sponsorMissingName = {
			// This line sets a valid brand value
			brand: "Acme Corp",
			// This line sets the name value to an empty string to simulate missing data
			name: "",
			// This line sets a valid email address
			email: "jane@example.com",
			// This line sets a comment value
			comment: "Comment text",
			// This line sets a valid event value
			event: "River Cleanup",
		};
		// This line calls validateSponsorData with the sponsorMissingName object and stores the result
		const errors = validateSponsorData(sponsorMissingName);
		// This line checks that at least one error message is returned
		expect(errors.length).toBeGreaterThan(0);
		// This line checks that at least one error message mentions that a contact name is required
		expect(errors.join(" ")).toMatch(/Contact name is required/i);
	});

	// This line defines a test that checks the error returned when the email field is missing
	test("returns an error when email is empty", () => {
		// This line creates a sponsor object with an empty email value but valid values for other fields
		const sponsorMissingEmail = {
			// This line sets a valid brand value
			brand: "Acme Corp",
			// This line sets a valid contact name
			name: "Jane Doe",
			// This line sets the email value to an empty string to simulate missing data
			email: "",
			// This line sets a comment value
			comment: "Comment text",
			// This line sets a valid event value
			event: "River Cleanup",
		};
		// This line calls validateSponsorData with the sponsorMissingEmail object and stores the result
		const errors = validateSponsorData(sponsorMissingEmail);
		// This line checks that at least one error message is returned
		expect(errors.length).toBeGreaterThan(0);
		// This line checks that at least one error message mentions that an email address is required
		expect(errors.join(" ")).toMatch(/Email address is required/i);
	});

	// This line defines a test that checks the error returned when the email is missing the @ symbol
	test("returns an error when email does not contain @", () => {
		// This line creates a sponsor object with an email address that lacks the @ symbol
		const sponsorBadEmail = {
			// This line sets a valid brand value
			brand: "Acme Corp",
			// This line sets a valid contact name
			name: "Jane Doe",
			// This line sets an email value that is missing the @ symbol to trigger validation
			email: "jane.example.com",
			// This line sets a comment value
			comment: "Comment text",
			// This line sets a valid event value
			event: "River Cleanup",
		};
		// This line calls validateSponsorData with the sponsorBadEmail object and stores the result
		const errors = validateSponsorData(sponsorBadEmail);
		// This line checks that at least one error message is returned
		expect(errors.length).toBeGreaterThan(0);
		// This line checks that at least one error message mentions the @ symbol requirement
		expect(errors.join(" ")).toMatch(/@ symbol/i);
	});

	// This line defines a test that checks the error returned when the event field is missing
	test("returns an error when event field is empty", () => {
		// This line creates a sponsor object with an empty event value but valid values for other fields
		const sponsorMissingEvent = {
			// This line sets a valid brand value
			brand: "Acme Corp",
			// This line sets a valid contact name
			name: "Jane Doe",
			// This line sets a valid email address
			email: "jane@example.com",
			// This line sets a comment value
			comment: "Comment text",
			// This line sets the event value to an empty string to simulate missing data
			event: "",
		};
		// This line calls validateSponsorData with the sponsorMissingEvent object and stores the result
		const errors = validateSponsorData(sponsorMissingEvent);
		// This line checks that at least one error message is returned
		expect(errors.length).toBeGreaterThan(0);
		// This line checks that at least one error message mentions that the event is required
		expect(errors.join(" ")).toMatch(/Event sponsored is required/i);
	});
});

// This line starts a Jest describe block that groups the integration tests for full form submission behaviour
describe("integration: sponsor form submission", () => {
	// This line defines an integration test that checks whether submitting a valid form adds a sponsor to the temporary data array
	test("submitting valid form adds sponsor to temporary storage", () => {
		// This line clears any existing entries in the sponsorEntries array so this test starts from a known state
		sponsorEntries.length = 0;
		// This line sets the Brand/Company input value to a valid string
		document.getElementById("sponsor-brand").value = "Acme Corp";
		// This line sets the Name input value to a valid string
		document.getElementById("sponsor-name").value = "Jane Doe";
		// This line sets the Email input value to a valid address containing the @ symbol
		document.getElementById("sponsor-email").value = "jane@example.com";
		// This line sets the Comment textarea value to some optional text
		document.getElementById("sponsor-comment").value =
			"Happy to support the community.";
		// This line sets the Event sponsored input value to a valid event name
		document.getElementById("sponsor-event").value = "River Cleanup";
		// This line creates a fake event object with a preventDefault function so the handler can call it without an actual browser submit event
		const fakeEvent = { preventDefault: () => {} };
		// This line calls the submit handler with the fake event to simulate submitting the form
		handleSponsorFormSubmit(fakeEvent);
		// This line checks that the sponsorEntries array now contains exactly one entry after submission
		expect(sponsorEntries.length).toBe(1);
		// This line checks that the stored sponsor entry has the expected brand value
		expect(sponsorEntries[0].brand).toBe("Acme Corp");
		// This line checks that the stored sponsor entry has the expected contact name value
		expect(sponsorEntries[0].name).toBe("Jane Doe");
		// This line checks that the stored sponsor entry has the expected email value
		expect(sponsorEntries[0].email).toBe("jane@example.com");
		// This line checks that the stored sponsor entry has the expected event value
		expect(sponsorEntries[0].event).toBe("River Cleanup");
	});

	// This line defines an integration test that checks whether submitting invalid data shows an error and does not add to temporary storage
	test("submitting form with missing email shows error and does not add sponsor", () => {
		// This line clears any existing entries in the sponsorEntries array so the test starts empty
		sponsorEntries.length = 0;
		// This line sets the Brand/Company input value to a valid string
		document.getElementById("sponsor-brand").value = "Acme Corp";
		// This line sets the Name input value to a valid string
		document.getElementById("sponsor-name").value = "Jane Doe";
		// This line leaves the Email input empty to make the data invalid
		document.getElementById("sponsor-email").value = "";
		// This line sets the Comment textarea value to some optional text
		document.getElementById("sponsor-comment").value = "Comment text";
		// This line sets the Event sponsored input value to a valid event name
		document.getElementById("sponsor-event").value = "River Cleanup";
		// This line creates a fake event object with a preventDefault function for the handler
		const fakeEvent = { preventDefault: () => {} };
		// This line calls the submit handler with the fake event to simulate submitting the form with invalid data
		handleSponsorFormSubmit(fakeEvent);
		// This line checks that sponsorEntries is still empty because invalid data should not be stored
		expect(sponsorEntries.length).toBe(0);
		// This line gets the feedback element from the DOM so we can inspect the error message shown to the user
		const feedbackElement = document.getElementById("sponsor-feedback");
		// This line checks that the feedback text mentions that an email address is required
		expect(feedbackElement.textContent).toMatch(/Email address is required/i);
	});
});
