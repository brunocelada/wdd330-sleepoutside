// src/js/validation.mjs

export function setupFormValidation(formSelector) {
    const form = document.querySelector(formSelector);
    if (!form) return;

    form.addEventListener('submit', (event) => {
        // 1. Check native HTML5 form constraints (e.g., required, minlength, type)
        if (!form.checkValidity()) {
            event.preventDefault();
            alert('Please fill out all required fields correctly before submitting.');
            return;
        }

        // 2. Custom Validation Example (e.g., matching fields or exact lengths)
        const zipInput = form.querySelector('#zip');
        if (zipInput && zipInput.value.length !== 5) {
            event.preventDefault();
            alert('Zip code must be exactly 5 digits.');
            zipInput.focus();
            return;
        }

        // If all validation checks pass successfully
        console.log('Form passed validation checks!');
    });
}