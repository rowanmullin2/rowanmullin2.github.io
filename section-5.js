const nameInput = document.querySelector("#name-input");
const emailInput = document.querySelector("#email-input");
const donationInput = document.querySelector("#donation-input");
const amountInput = document.querySelector("#amount-input");
const commentsInput = document.querySelector("#comment-input");
const submitButton = document.querySelector("#submit-button");

function validateName(nameInput) {
    const nameStr = nameInput.value.strip();
    if (nameStr == "") {
        displayError(nameInput, "Name cannot be blank / empty.");
    } else {
        return nameStr;
    }
}

function displayError(element, msg) {
    let err = document.createElement("div");
    err.innerHTML = msg;
    element.appendChild(err);
}

function buildObject() {
    let new_object = {
        name:nameInput.value,
        email:emailInput.value,
        donation:donationInput.value,
        amount:amountInput.value,
        comment:commentsInput.value
    }
    console.log(new_object)
}

submitButton.addEventListener('click', (e) => {
    e.preventDefault()
    buildObject()
})


if (typeof window === "undefined") {
    module.exports = {buildObject};
}