let nameInputElement;
let emailInputElement;
let donationInputElement;
let amountInputElement;
let commentsInputElement;
let submitButtonElement;
let tableElement;
let tallyElement;

function validateName(nameInput) {
    const nameStr = nameInput.value.trim();
    if (nameStr == "") {
        displayError(nameInput, "Name cannot be blank / empty.");
    } else {
        return nameStr;
    }
}

function validateEmail(emailInput) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/
    const emailStr = emailInput.value.trim();
    if (emailStr == "") {
        displayError(emailInput, "Email cannot be blank / empty.");
    } else if(emailRegex.test(emailStr)) {
        displayError(emailInput, "Email must be valid.");
    } else {
        return emailStr;
    }
}

function validateDonation(donationInput) {
    const donationStr = donationInput.value.trim();
    if (donationStr == "") {
        displayError(donationInput, "Donation Item cannot be blank / empty.");
    } else {
        return donationStr;
    }
}

function validateAmount(amountInput) {
    const amountInt = parseInt(amountInput.value);
    if (isNaN(amountInt)) {
        displayError(amountInput, "Please enter an amount.");
    } else if (amountInt <= 0) {
        displayError(amountInput, "amount must be at least 1.");
    } else {
        return amountInt;
    }
}

function clearErrors() {
    const errs = document.querySelectorAll('.err-msg');
    errs.forEach(err => {
        err.remove();
    });
}

function displayError(element, msg) {
    let err = document.createElement("div");
    err.innerHTML = msg;
    err.classList = "err-msg"
    element.parentNode.appendChild(err);
}

function buildObject() {
    clearErrors();
    let new_object = {
        name:validateName(nameInputElement),
        email:validateEmail(emailInputElement),
        donation:validateDonation(donationInputElement),
        amount:validateAmount(amountInputElement),
        comment:commentsInputElement.value
    }
    if (document.querySelector(".err-msg")) {
        console.log("invalid input");
        return false;
    } else {
        console.log(new_object);
        return new_object;
    }
}

function clearTable() {
    tableElement.innerHTML = "";

    let tableHead = document.createElement("tr");
    tableElement.appendChild(tableHead);

    let h1 = document.createElement("th");
    h1.innerHTML = "Name";
    tableHead.appendChild(h1);
    
    let h2 = document.createElement("th");
    h2.innerHTML = "Email";
    tableHead.appendChild(h2);

    let h3 = document.createElement("th")
    h3.innerHTML = "Donation Item"
    tableHead.appendChild(h3)
    
    let h4 = document.createElement("th");
    h4.innerHTML = "Amount";
    tableHead.appendChild(h4);
    
    let h5 = document.createElement("th");
    h5.innerHTML = "Comment";
    tableHead.appendChild(h5);
}

function loadData() {
    const data = localStorage.getItem("section-5");
    return (!data) ? {} : JSON.parse(data);
}

function updateTally() {
    let data = loadData();
    let tally = 0;

    Object.values(data).forEach(entry => {
        tally += entry.amount
    })

    tallyElement.innerHTML = `Total Amount of Items Donated: ${tally}`
}

function updateTable() {
    clearTable()
    Object.entries(loadData()).forEach((entry) => {
        let index = entry[0];
        let data = entry[1];
        let tr = document.createElement("tr");
        tableElement.appendChild(tr);

        let nameDisplay = document.createElement("td");
        nameDisplay.innerHTML = data.name;
        tr.appendChild(nameDisplay);

        let emailDisplay = document.createElement("td");
        emailDisplay.innerHTML = data.email;
        tr.appendChild(emailDisplay);

        let donationDisplay = document.createElement("td");
        donationDisplay.innerHTML = data.donation;
        tr.appendChild(donationDisplay);

        let amountDisplay = document.createElement("td");
        amountDisplay.innerHTML = data.amount;
        tr.appendChild(amountDisplay);

        let commentDisplay = document.createElement("td");
        commentDisplay.innerHTML = data.comment;
        tr.appendChild(commentDisplay);

        let deleteButton = document.createElement("button");
        deleteButton.setAttribute("type","button");
        deleteButton.innerHTML = "X";

        deleteButton.addEventListener("click", () => {
            deleteEntry(index);
        })

        tr.appendChild(deleteButton);
    })
    updateTally();
}

function deleteEntry(id) {
    let data = loadData();

    Object.entries(data).forEach(entry => {
        if (entry[0] >= id) {delete data[entry[0]];}
    })

    Object.entries(loadData()).forEach(entry => {
        if (entry[0] > id) {data[entry[0]-1] = entry[1];}
    })

    localStorage.setItem("section-5",JSON.stringify(data));
    updateTable();
}

function addInfo(newInfo) {
    let data = loadData();
    let entryCount = Object.keys(data).length;
    data[entryCount] = newInfo;

    localStorage.setItem("section-5",JSON.stringify(data));
    updateTable();
}

function init() {
    nameInputElement = document.querySelector("#name-input");
    emailInputElement = document.querySelector("#email-input");
    donationInputElement = document.querySelector("#donation-input");
    amountInputElement = document.querySelector("#amount-input");
    commentsInputElement = document.querySelector("#comment-input");
    submitButtonElement = document.querySelector("#submit-button");
    tableElement = document.querySelector("table");
    tallyElement = document.querySelector("#number-of-donations");

    updateTable()

    submitButtonElement.addEventListener('click', (e) => {
        e.preventDefault();
        let entry = buildObject();
        if (entry !== false) {
            addInfo(entry);
        }
    })
}

if (typeof window === "undefined") {
    module.exports = {validateName, validateEmail, validateDonation, validateAmount, clearErrors, displayError, buildObject, init};
} else {
    init();
}