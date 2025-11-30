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

// setup other validations

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

// setup error check manager

function buildObject() {
    clearErrors();
    let new_object = {
        name:validateName(nameInput),
        email:emailInput.value,
        donation:donationInput.value,
        amount:amountInput.value,
        comment:commentsInput.value
    }
    console.log(new_object);
}

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    buildObject();
})


if (typeof window === "undefined") {
    module.exports = {buildObject};
}