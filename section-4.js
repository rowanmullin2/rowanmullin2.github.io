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
// This line gets the table body element where sponsor rows will be displayed
const sponsorTableBody = document.getElementById("sponsor-table-body");

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

// This line defines a function that rebuilds the sponsor table using the sponsorEntries array
function renderSponsorTable() {
	// This line checks whether the sponsorTableBody element exists before trying to use it
	if (!sponsorTableBody) {
		// This line exits the function early when the table body is not present, such as in some Jest tests
		return;
	}
	// This line clears any existing rows from the table body so we can rebuild it from scratch
	sponsorTableBody.textContent = "";
	// This line starts a loop that runs once for each sponsor object stored in sponsorEntries
	for (let index = 0; index < sponsorEntries.length; index++) {
		// This line stores the sponsor object for the current loop position in a local variable
		const sponsor = sponsorEntries[index];
		// This line creates a new table row element that will hold the sponsor data cells
		const row = document.createElement("tr");
		// This line creates a table cell element for the sponsor brand or company name
		const brandCell = document.createElement("td");
		// This line sets the text inside the brand cell to the sponsor's brand value
		brandCell.textContent = sponsor.brand;
		// This line appends the brand cell into the current table row
		row.appendChild(brandCell);
		// This line creates a table cell element for the sponsor contact name
		const nameCell = document.createElement("td");
		// This line sets the text inside the name cell to the sponsor's contact name value
		nameCell.textContent = sponsor.name;
		// This line appends the name cell into the current table row
		row.appendChild(nameCell);
		// This line creates a table cell element for the sponsor email address
		const emailCell = document.createElement("td");
		// This line sets the text inside the email cell to the sponsor's email value
		emailCell.textContent = sponsor.email;
		// This line appends the email cell into the current table row
		row.appendChild(emailCell);
		// This line creates a table cell element for the sponsor comment
		const commentCell = document.createElement("td");
		// This line sets the text inside the comment cell to the sponsor's comment value
		commentCell.textContent = sponsor.comment;
		// This line appends the comment cell into the current table row
		row.appendChild(commentCell);
		// This line creates a table cell element for the sponsored event name
		const eventCell = document.createElement("td");
		// This line sets the text inside the event cell to the sponsor's event value
		eventCell.textContent = sponsor.event;
		// This line appends the event cell into the current table row
		row.appendChild(eventCell);
		// This line creates a table cell element that will hold the delete button
		const actionsCell = document.createElement("td");
		// This line creates a button element that will later be wired up to delete this sponsor entry
		const deleteButton = document.createElement("button");
		// This line sets the button type to button so clicking it does not submit the form
		deleteButton.type = "button";
		// This line sets a CSS class on the delete button so it can be styled in the stylesheet
		deleteButton.className = "sponsor-delete-button";
		// This line sets the text label that appears on the delete button
		deleteButton.textContent = "Delete";
		// This line appends the delete button into the actions table cell
		actionsCell.appendChild(deleteButton);
		// This line appends the actions cell into the current table row
		row.appendChild(actionsCell);
		// This line appends the completed row into the sponsor table body in the page
		sponsorTableBody.appendChild(row);
	}
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
	// This line calls renderSponsorTable so the new sponsor appears in the table on the page
	renderSponsorTable();
	// This line resets the form fields so the user can add another sponsor
	sponsorForm.reset();
	// This line shows a success message saying the sponsor was added correctly
	displaySponsorSuccess("Sponsor added successfully.");
	// This line logs the current sponsorEntries array to the console for debugging
	console.log("Current sponsor entries:", sponsorEntries);
}

// This line adds an event listener so the handleSponsorFormSubmit function runs when the form is submitted
sponsorForm.addEventListener("submit", handleSponsorFormSubmit);

// This line checks whether the special module object exists so Jest tests can import functions in a Node environment
if (typeof module !== "undefined" && module.exports) {
	// This line exports selected values so that Jest tests can import and use these functions and the temporary data array
	module.exports = {
		// This line exposes the sponsorEntries array so integration tests can inspect how form submissions change temporary storage
		sponsorEntries: sponsorEntries,
		// This line exposes the createSponsorEntry function so unit tests can verify the object it builds
		createSponsorEntry: createSponsorEntry,
		// This line exposes the validateSponsorData function so unit tests can verify its validation rules
		validateSponsorData: validateSponsorData,
		// This line exposes the handleSponsorFormSubmit function so integration tests can simulate submitting the form with Jest
		handleSponsorFormSubmit: handleSponsorFormSubmit,
		// This line exposes the renderSponsorTable function so future Jest tests can confirm the table output
		renderSponsorTable: renderSponsorTable,
	};
}
