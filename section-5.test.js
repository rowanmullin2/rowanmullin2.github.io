const { JSDOM } = require("jsdom");

beforeEach(() => {
	const dom = new JSDOM(`
		<!DOCTYPE html>
		<html lang="en">
			<div id="navbar-container"></div>
			<form>
				<div id="name-input-container">
					<label for="name-input">Name:</label>
					<input type="text" id="name-input" placeholder="eg. John Smith">
				</div>
				<div id="email-input-container">
					<label for="email-input">Email:</label>
					<input type="text" id="email-input" placeholder="eg. JSmith@example.com">
				</div>
				<div id="donation-input-container">
					<label for="donation-input">Donation Item:</label>
					<input type="text" id="donation-input" placeholder="eg. Shovel">
				</div>
				<div id="amount-input-container">
					<label for="amount-input">Amount:</label>
					<input type="number" id="amount-input" placeholder="eg. 5">
				</div>
				<div id="comments-input-container">
					<label for="comment-input">Comments:</label>
					<input type="text" id="comment-input" placeholder="eg. Enjoy the shovels!">
				</div>
				<button id="submit-button" type="button">Submit</button>
			</form>
			<div id="footer-container"></div>
		</html>
		`);
    global.document = dom.window.document;
}) 

const { validateName, validateEmail, validateDonation, validateAmount, clearErrors, displayError, buildObject, init } = require("./section-5.js");

describe("Unit Tests", () => {

	test("validateName validates correctly", () => {
		const nameInput = global.document.querySelector("#name-input")
		nameInput.value = "tim"
		expect(validateName(nameInput)).toBe("tim");
	});

	test("validateEmail validates correctly", () => {
		const emailInput = global.document.querySelector("#email-input")
		emailInput.value = "tim@gmail.com"
		expect(validateName(emailInput)).toBe("tim@gmail.com");
	});

	test("validateDonation validates correctly", () => {
		const donationInput = global.document.querySelector("#donation-input")
		donationInput.value = "shovel"
		expect(validateName(donationInput)).toBe("shovel");
	});

	test("validateAmount validates correctly", () => {
		const amountInput = global.document.querySelector("#amount-input")
		amountInput.value = "1"
		expect(validateName(amountInput)).toEqual("1");
	});
	
})

describe("Integration Tests", () => {

	test("buildObject returns object correctly", () => {
		init()
		global.document.querySelector("#name-input").value = "tim";
        global.document.querySelector("#email-input").value = "j@joe.com";
        global.document.querySelector("#donation-input").value = "shovel";
        global.document.querySelector("#amount-input").value = 1;
        global.document.querySelector("#comment-input").value = "test";
		
		expect(buildObject()).toEqual({name:"tim", email:"j@joe.com", donation:"shovel", amount:1, comment:"test"});
	});

})