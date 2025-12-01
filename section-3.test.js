const { JSDOM } = require("jsdom");

beforeEach(() => {
    const dom = new JSDOM(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="events.css">
            <title>Event Signup Page</title>
        </head>
        <body>
            <form action="" method="post" class="event-form">
                <label for="event-name" >Event Name: <input type="text" id="event-name" placeholder="Event's name"></label>
                <label for="representative-name" >Company Representative's Name: <input type="text" id="representative-name" placeholder="Company's Representative Name"></label>
                <label for="representative-email" >Representative's Email: <input type="email" id="representative-email" placeholder="Representative's email address"></label>
                <label for="company-role">Role Selection:<select name="role-selection" id="company-role" >
                    <option value="" disabled selected>Choose role...</option>
                    <option value="sponsor">Sponsor</option>
                    <option value="participant">Participant</option>
                    <option value="organizer">Organizer</option>
                </select></label>
                <button type="button" id="submit">Submit</button>
            </form>
            <script src="events.js"></script>
        </body>
        </html>`)
        global.document = dom.window.document
})
const {storeInput, formStorage, isValidForm, init} = require("./section-3.js");

describe("Unit Tests", () => {
    test("is valid form returns true", () => {
        init()
        expect(isValidForm("t", "to", "d@gmail.com", "Sponsor")).toBe(true);
    });
    
    test("is valid form returns false when 1 input is blank", () => {
        init()
        expect(isValidForm("", "to", "d@gmail.com", "Sponsor")).toBe(false);
    })

    test("is valid form returns false when email input is invalid", () => {
        init()
        expect(isValidForm("t", "to", "", "Sponsor")).toBe(false);
    })

    test("is valid form returns false when role select blank", () => {
        init()
        expect(isValidForm("t", "to", "d@gmail.com", "")).toBe(false);
    })
})

