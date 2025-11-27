const eventNameInput = document.querySelector("#event-name");
const representativeNameInput = document.querySelector("#representative-name");
const representativeEmailInput = document.querySelector("#representative-email");
const roleSelected = document.querySelector("#company-role");
const submitButton = document.querySelector("#submit");

function showError(inputNode, message) {
    let error = document.createElement("div");
    error.classList.add('error');
    error.innerHTML = message;
    inputNode.parentNode.insertBefore(error, inputNode.nextSibling);
    console.log('Error Displayed')
}

