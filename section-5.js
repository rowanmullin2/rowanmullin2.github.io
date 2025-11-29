const nameInput = document.querySelector("#name-input")
const emailInput = document.querySelector("#email-input")
const donationInput = document.querySelector("#donation-input")
const amountInput = document.querySelector("#amount-input")
const commentsInput = document.querySelector("#comment-input")
const submitButton = document.querySelector("#submit-button")

submitButton.addEventListener('click', (e) => {
    e.preventDefault()
    buildObject()
})


if (typeof window === "undefined") {
    module.exports = {buildObject};
}