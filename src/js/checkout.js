// src/js/checkout.js
import { loadHeaderFooter } from './utils.mjs';
import { setupFormValidation } from './validation.mjs';

// 1. Load dynamic header and footer partials
loadHeaderFooter();

// 2. Initialize form validation once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    setupFormValidation('#checkout-form');
});