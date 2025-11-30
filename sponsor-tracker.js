// This line declares a constant array that will temporarily store sponsor entries while the page is open
const sponsorEntries = [];

// This line gets the sponsor form element from the page using its id
const sponsorForm = document.getElementById("sponsor-form");
// This line gets the Brand/Company input element from the page using its id
const sponsorBrandInput = document.getElementById("sponsor-brand");
// This line gets the Name input element from the page using its id
const sponsorNameInput = document.getElementById("sponsor-name");
// This line gets the Email input element from the page using its id
const sponsorEmailInput = document.getElementById("sponsor-email");
// This line gets the Comment textarea element from the page using its id
const sponsorCommentInput = document.getElementById("sponsor-comment");
// This line gets the Event Sponsored input element from the page using its id
const sponsorEventInput = document.getElementById("sponsor-event");
// This line gets the feedback container element where messages will be shown
const sponsorFeedback = document.getElementById("sponsor-feedback");

// This line defines a function that creates a sponsor object from individual field values
function createSponsorEntry(brand, name, email, comment, eventName) {
	// This line creates an object that groups all sponsor information into one value
	const sponsor = {
		// This line stores the brand or company name inside the sponsor object
		brand: brand,
		// This line stores the sponsor contact's name inside the sponsor object
		name: name,
		// This line stores the sponsor email address inside the sponsor object
		email: email,
		// This line stores the sponsor comment inside the sponsor object
		comment: comment,
		// This line stores the sponsored event name inside the sponsor object
		event: eventName,
	};
	// This line returns the sponsor object so other code can use it
	return sponsor;
}

// This line defines a function that checks the sponsor data for any problems
function validateSponsorData(sponsorData) {
	// This line creates an empty array that will hold any error messages
	const errors = [];
	// This line checks if the brand value is an empty string
	if (sponsorData.brand === "") {
		// This line adds an error message when the brand field is empty
		errors.push("Brand or company name is required.");
	}
	// This line checks if the name value is an empty string
	if (sponsorData.name === "") {
		// This line adds an error message when the name field is empty
		errors.push("Contact name is required.");
	}
	// This line checks if the email value is an empty string
	if (sponsorData.email === "") {
		// This line adds an error message when the email field is empty
		errors.push("Email address is required.");
	} else {
		// This line declares a variable that tracks whether an @ symbol has been found in the email
		let hasAtSymbol = false;
		// This line starts a loop that checks each character in the email string
		for (let index = 0; index < sponsorData.email.length; index++) {
			// This line checks if the current character is an @ symbol
			if (sponsorData.email[index] === "@") {
				// This line marks that an @ symbol has been found
				hasAtSymbol = true;
			}
		}
		// This line checks if no @ symbol was found after the loop finishes
		if (hasAtSymbol === false) {
			// This line adds an error message when the email does not contain the @ symbol
			errors.push("Email must contain the @ symbol.");
		}
	}
	// This line checks if the event value is an empty string
	if (sponsorData.event === "") {
		// This line adds an error message when the event field is empty
		errors.push("Event sponsored is required.");
	}
	// This line returns the array of error messages to the caller
	return errors;
}

// This line defines a function that shows validation errors inside the feedback container
function displaySponsorErrors(errors) {
	// This line joins all error messages into one string separated by spaces
	sponsorFeedback.textContent = errors.join(" ");
	// This line removes the success-text class so previous success styling is cleared
	sponsorFeedback.classList.remove("success-text");
	// This line adds the error-text class so the message is styled as an error
	sponsorFeedback.classList.add("error-text");
}

// This line defines a function that shows a success message after a valid sponsor is added
function displaySponsorSuccess(message) {
	// This line sets the feedback container text to the provided success message
	sponsorFeedback.textContent = message;
	// This line removes the error-text class so previous error styling is cleared
	sponsorFeedback.classList.remove("error-text");
	// This line adds the success-text class so the message is styled as a success
	sponsorFeedback.classList.add("success-text");
}

// This line defines a function that handles the sponsor form submit event
function handleSponsorFormSubmit(event) {
	// This line prevents the browser from performing its default form submission behaviour
	event.preventDefault();
	// This line creates a sponsor object from the current values in the form inputs
	const sponsorData = createSponsorEntry(
		// This line passes the current Brand/Company value into the createSponsorEntry function
		sponsorBrandInput.value,
		// This line passes the current Name value into the createSponsorEntry function
		sponsorNameInput.value,
		// This line passes the current Email value into the createSponsorEntry function
		sponsorEmailInput.value,
		// This line passes the current Comment value into the createSponsorEntry function
		sponsorCommentInput.value,
		// This line passes the current Event value into the createSponsorEntry function
		sponsorEventInput.value
	);
	// This line calls the validation function and stores any returned error messages
	const errors = validateSponsorData(sponsorData);
	// This line checks if any errors were found
	if (errors.length > 0) {
		// This line displays the error messages in the feedback container
		displaySponsorErrors(errors);
		// This line stops the function so invalid data is not stored
		return;
	}
	// This line adds the valid sponsor object to the sponsorEntries array for temporary storage
	sponsorEntries.push(sponsorData);
	// This line resets the form fields so the user can add another sponsor
	sponsorForm.reset();
	// This line shows a success message saying the sponsor was added correctly
	displaySponsorSuccess("Sponsor added successfully.");
	// This line logs the current sponsorEntries array to the console for debugging
	console.log("Current sponsor entries:", sponsorEntries);
}

// This line adds an event listener so the handleSponsorFormSubmit function runs when the form is submitted
sponsorForm.addEventListener("submit", handleSponsorFormSubmit);
