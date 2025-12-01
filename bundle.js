(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

function clearError () {
    let errors = document.querySelectorAll(".error");
    errors.forEach((error) => {
        error.remove();
    })
    console.log("Errors cleared")
}

function isValidForm() {
    let errs = [];
    valid = true;

    clearError();

    // Event name
    if (eventNameInput.value.trim() === "") {
        console.log("Error: Event name is empty");
        valid = false;
        errs.push({
            inputNode: eventNameInput,
            message: "Please enter the Event name."
        })
    }

    // Company's representative name
    if (representativeNameInput.value.trim() === "") {
        console.log("Error: Representative's name is empty");
        valid = false;
        errs.push({
            inputNode: representativeNameInput,
            message: "Please enter company's representative name."
        })
    }
    
    // Company's representative email
    if (representativeEmailInput.value.trim() === "") {
        console.log("Error: Representative's email is empty");
        valid = false;
        errs.push({
            inputNode: representativeEmailInput,
            message: "Please enter company's representative email."
        })
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(representativeEmailInput.value.trim())) {
        console.log("Error: Representative's email is invalid");
        valid = false;
        errs.push({
            inputNode: representativeEmailInput,
            message: "Please enter a valid email."
        })
    }

    // Company's representative name
    if (roleSelected.value.trim() === "") {
        console.log("Error: Role selection is empty");
        valid = false;
        errs.push({
            inputNode: roleSelected,
            message: "Please enter company's role."
        })
    }

    if (errs.length === 0) {
        console.log("Form is valid");
    }

    errs.forEach((err) => {
        showError(err.inputNode, err.message)
    })

    return valid
}

submitButton.addEventListener("click", (e) => {
    e.preventDefault()
    let isValid = isValidForm()
    if (isValid === true) {
        storeInput(
        eventNameInput.value, 
        representativeNameInput.value, 
        representativeEmailInput.value, 
        roleSelected.value);
    }
})

const formStorage = [];
function storeInput(eveNameInput, repreName, repreEmail, repreRole) {
    formStorage.push({
        eveNameInput, 
        repreName, 
        repreEmail, 
        repreRole});
    console.log(formStorage);
}
},{}]},{},[1]);
