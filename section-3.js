let eventNameInput;
let representativeNameInput;
let representativeEmailInput;
let roleSelected;
let submitButton;

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
    let valid = true;

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

function saveFormData(formData) {
    const formDataStore = JSON.parse(localStorage.getItem("formData")) || [];
    formDataStore.push(formData);
    localStorage.setItem("formData", JSON.stringify(formDataStore));

    console.log(localStorage.getItem("formData"))
}

function storeInput(eventName, repreName, repreEmail, repreRole) {
    const formStorage ={
        eventName, 
        repreName, 
        repreEmail, 
        repreRole};
        console.log(formStorage);
        return formStorage
    }

function init() {
    eventNameInput = document.querySelector("#event-name");
    representativeNameInput = document.querySelector("#representative-name");
    representativeEmailInput = document.querySelector("#representative-email");
    roleSelected = document.querySelector("#company-role");
    submitButton = document.querySelector("#submit");
    
    submitButton.addEventListener("click", (e) => {
        e.preventDefault()
        let isValid = isValidForm(eventNameInput, representativeNameInput, representativeEmailInput, roleSelected)
        if (isValid === true) {
            clearSessionStorage()
            
            storeFormData()
            let formData = getStoredFormData()
    
            saveFormData(formData)
        }

    })
    
}

if (typeof window === "undefined") {
    module.exports = { isValidForm, storeInput, formStorage, init};
} else {
    init()
}