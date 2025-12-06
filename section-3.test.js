let eventNameInput;
let representativeNameInput;
let representativeEmailInput;
let roleSelected;

const { JSDOM } = require("jsdom");
const fs = require("fs");

beforeEach(() => {
    let html = fs.readFileSync("./section-3.html", "utf8");
	let dom = new JSDOM(html);
	global.document = dom.window.document;

    eventNameInput = global.document.querySelector("#event-name");
    representativeNameInput = global.document.querySelector("#representative-name");
    representativeEmailInput = global.document.querySelector("#representative-email");
    roleSelected = global.document.querySelector("#company-role");
    
    init()
})

const {storeInput, formStorage, isValidForm, init} = require("./section-3.js");

describe("Unit Tests", () => {
    test("is valid form returns true", () => {
        eventNameInput.value = "t"
        representativeNameInput.value = "to"
        representativeEmailInput.value = "d@gmail.com"
        roleSelected.value = "sponsor"
        expect(isValidForm()).toBe(true);
    });
    
    test("is valid form returns false when name input is blank", () => {
        eventNameInput.value = ""
        representativeNameInput.value = "to"
        representativeEmailInput.value = "d@gmail.com"
        roleSelected.value = "sponsor"
        expect(isValidForm()).toBe(false);
    })

    test("is valid form returns false when email input is invalid", () => {
        eventNameInput.value = "t"
        representativeNameInput.value = "to"
        representativeEmailInput.value = ""
        roleSelected.value = "sponsor"
        expect(isValidForm()).toBe(false);
    })

    test("is valid form returns false when role select blank", () => {
        eventNameInput.value = "t"
        representativeNameInput.value = "to"
        representativeEmailInput.value = "d@gmail.com"
        roleSelected.value = ""
        expect(isValidForm()).toBe(false);
    })
})

