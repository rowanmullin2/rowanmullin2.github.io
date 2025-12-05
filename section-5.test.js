const { JSDOM } = require("jsdom");
const fs = require("fs");

beforeEach(() => {
	let html = fs.readFileSync("./section-5.html", "utf8");
	let dom = new JSDOM(html);
	global.document = dom.window.document;
	store = {}
	global.localStorage = {
		getItem: jest.fn((key) => store[key] || null),
		setItem: jest.fn((key, value) => {
			store[key] = value + "";
		}),
		removeItem: jest.fn((key) => delete store[key]),
		clear: jest.fn(() => (store = {})),
	};
	init()
}) 

const { validateName, validateEmail, validateDonation, validateAmount, clearErrors, buildObject, loadData, updateTable, updateTally, deleteEntry, addInfo, init } = require("./section-5.js");

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
		const nameInput = global.document.querySelector("#name-input");
		validateName(nameInput);
		clearErrors();
		const nonExistentErr = global.document.querySelector(".err-msg");
		expect(nonExistentErr).toEqual(null);
	});

	test("displayError displays Error correctly", () => {
		const nameInput = global.document.querySelector("#name-input");
		validateName(nameInput);
		const err = global.document.querySelector(".err-msg")
		expect(err.innerHTML).toEqual("Name cannot be blank / empty.");
	});
	
	test("Total Amount of items donated calculated properly", () => {
		updateTally()
		const tally = global.document.querySelector("#number-of-donations");
		expect(tally.innerHTML).toEqual("Total Amount of Items Donated: 0");
	});
	
	test("Deleting a record updates the localStorage and table correctly.", () => {
		addInfo({name:"t",email:"t",donation:"t",amount:1,comment:""})
		expect(loadData()).toEqual({"0": {name:"t",email:"t",donation:"t",amount:1,comment:""}})
		updateTable()
		const tableElement = global.document.querySelector("table");
		expect(tableElement.innerHTML).toEqual("<tr><th>Name</th><th>Email</th><th>Donation Item</th><th>Amount</th><th>Comment</th></tr><tr><td>t</td><td>t</td><td>t</td><td>1</td><td></td><button type=\"button\">X</button></tr>");
		deleteEntry(0)
		expect(loadData()).toEqual({})
		expect(tableElement.innerHTML).toEqual("<tr><th>Name</th><th>Email</th><th>Donation Item</th><th>Amount</th><th>Comment</th></tr>");
	});
	
	test("Total volunteer hours update when a record is deleted.", () => {
		addInfo({name:"t",email:"t",donation:"t",amount:1,comment:""})
		const tally = global.document.querySelector("#number-of-donations");
		expect(tally.innerHTML).toEqual("Total Amount of Items Donated: 1");
		deleteEntry(0);
		expect(tally.innerHTML).toEqual("Total Amount of Items Donated: 0");
	});
})

describe("Integration Tests", () => {

	test("buildObject returns object correctly", () => {
		global.document.querySelector("#name-input").value = "tim";
		global.document.querySelector("#email-input").value = "j@joe.com";
		global.document.querySelector("#donation-input").value = "shovel";
		global.document.querySelector("#amount-input").value = 1;
		global.document.querySelector("#comment-input").value = "test";
		
		expect(buildObject()).toEqual({name:"tim", email:"j@joe.com", donation:"shovel", amount:1, comment:"test"});
	});

})