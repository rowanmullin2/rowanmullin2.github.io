let nameInputElement;
let emailInputElement;
let donationInputElement;
let amountInputElement;
let commentsInputElement;
let submitButtonElement;

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
        console.log("invalid input")
        return false
    } else {
        console.log(new_object);
        return new_object
    }
}

function init() {
    nameInputElement = document.querySelector("#name-input");
    emailInputElement = document.querySelector("#email-input");
    donationInputElement = document.querySelector("#donation-input");
    amountInputElement = document.querySelector("#amount-input");
    commentsInputElement = document.querySelector("#comment-input");
    submitButtonElement = document.querySelector("#submit-button");

    submitButtonElement.addEventListener('click', (e) => {
        e.preventDefault();
        buildObject();
    })
}

if (typeof window === "undefined") {
    module.exports = {validateName, validateEmail, validateDonation, validateAmount, clearErrors, displayError, buildObject, init};
} else {
    init()
}