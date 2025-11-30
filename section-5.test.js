const { JSDOM } = require("jsdom");

beforeEach(() => {
	const dom = new JSDOM(`<!DOCTYPE html><input id="name-input" value="tim">`);
	global.document = dom.window.document; 
}) 

const { validateName, validateEmail, validateDonation, validateAmount, clearErrors, displayError, buildObject } = require("./section-5.js");

describe("Unit Tests", () => {

	test("validateName validates correctly", () => {
		
		expect(validateName(global.document.getElementById("name-input"))).toBe("tim");
	});
})

describe("Integration Tests", () => {
	test.skip("Fake Test", () => {})
})