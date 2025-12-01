const { JSDOM } = require("jsdom");
const fs = require("fs");

beforeEach(() => {
	let html = fs.readFileSync("./section-5.html", "utf8");
	let dom = new JSDOM(html);
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
		expect(validateEmail(emailInput)).toBe("tim@gmail.com");
	});

	test("validateDonation validates correctly", () => {
		const donationInput = global.document.querySelector("#donation-input")
		donationInput.value = "shovel"
		expect(validateDonation(donationInput)).toBe("shovel");
	});

	test("validateAmount validates correctly", () => {
		const amountInput = global.document.querySelector("#amount-input")
		amountInput.value = "1"
		expect(validateAmount(amountInput)).toEqual(1);
	});

	test("clearErrors clears DOM", () => {
		const nameInput = global.document.querySelector("#name-input")
		validateName(nameInput)
		clearErrors()
		const nonExistentErr = global.document.querySelector(".err-msg")
		expect(nonExistentErr).toEqual(null);
	});

	test("displayError displays Error correctly", () => {
		const nameInput = global.document.querySelector("#name-input")
		validateName(nameInput)
		const err = global.document.querySelector(".err-msg")
		expect(err.innerHTML).toEqual("Name cannot be blank / empty.");
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