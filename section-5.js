const nameInput = document.querySelector("#name-input");
const emailInput = document.querySelector("#email-input");
const donationInput = document.querySelector("#donation-input");
const amountInput = document.querySelector("#amount-input");
const commentsInput = document.querySelector("#comment-input");
const submitButton = document.querySelector("#submit-button");

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
        name:validateName(nameInput),
        email:validateEmail(emailInput),
        donation:validateDonation(donationInput),
        amount:validateAmount(amountInput),
        comment:commentsInput.value
    }
    if (document.querySelector(".err-msg")) {
        console.log("invalid input")
    } else {
        console.log(new_object);
    }
}

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    buildObject();
})


if (typeof window === "undefined") {
    module.exports = {validateName, validateEmail, validateDonation, validateAmount, clearErrors, displayError, buildObject};
}