export function displayErrors(errors) {
    for (const fieldName in errors) {
        const field = document.getElementById(fieldName);
        if (field) {
            const errorMessages = errors[fieldName];
            const errorElement = document.createElement("div");
            errorElement.classList.add("invalid-feedback");
            errorElement.innerHTML = errorMessages.join("<br>"); // is error message is array
            field.parentNode.appendChild(errorElement);
            field.classList.add("is-invalid");
        }
    }
}

// function clear error from form
export function clearErrors() {
    const errorElements = document.querySelectorAll(".invalid-feedback");
    errorElements.forEach((element) => element.remove());
    const fields = document.querySelectorAll(".is-invalid");
    fields.forEach((field) => field.classList.remove("is-invalid"));
}
