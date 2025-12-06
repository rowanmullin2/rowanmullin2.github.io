let eventNameInput;
let representativeNameInput;
let representativeEmailInput;
let roleSelected;

const { JSDOM } = require("jsdom");
const fs = require("fs");

beforeEach(() => {
    let html = fs.readFileSync("./section-3.html", "utf8");
	let dom = new JSDOM(html, { url: "http://localhost" });
	global.document = dom.window.document;
	global.window = dom.window;

    global.localStorage = {
        store: {},

        getItem(key) {
            return this.store[key] || null;
        },

        setItem(key, value) {
            this.store[key] = value.toString();
        },

        removeItem(key) {
            delete this.store[key];
        },

        clear() {
            this.store = {};
        }
    };

    eventNameInput = global.document.querySelector("#event-name");
    representativeNameInput = global.document.querySelector("#representative-name");
    representativeEmailInput = global.document.querySelector("#representative-email");
    roleSelected = global.document.querySelector("#company-role");
    
    init();
});


const {storeInput, isValidForm, displayTableData, removeFormData, init } = require("./section-3.js");


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

test("storeInput returns correct inputs", () => {
    let result = storeInput("Event A", "Michael", "mike@gmail.com", "sponsor");

    expect(result.eventName).toBe("Event A");
    expect(result.repreName).toBe("Michael");
    expect(result.repreEmail).toBe("mike@gmail.com");
    expect(result.repreRole).toBe("sponsor");
});

test("table and localStorage update when a record is deleted", () => {

    // Arrange: Add sample records
    const sampleData = [
        { eventName: "Event1", repreName: "A", repreEmail: "a@gmail.com", repreRole: "sponsor" },
        { eventName: "Event2", repreName: "B", repreEmail: "b@gmail.com", repreRole: "participant" }
    ];
    localStorage.setItem("formData", JSON.stringify(sampleData));

    displayTableData(); // render table

    // Act: Remove the first record
    removeFormData(0);

    // Assert localStorage updated
    let updatedData = JSON.parse(localStorage.getItem("formData"));
    expect(updatedData.length).toBe(1);
    expect(updatedData[0].eventName).toBe("Event2");

    // Assert table updated
    let rows = document.querySelectorAll("#formdata-table tbody tr");
    expect(rows.length).toBe(1);

    // Check row contains second event
    expect(rows[0].innerHTML.includes("Event2")).toBe(true);
});


