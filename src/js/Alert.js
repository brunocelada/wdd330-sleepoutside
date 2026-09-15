export default class Alert {
    constructor(jsonPath = '/json/alerts.json') {  // Use absolute path from root
        this.jsonPath = jsonPath;
    }

    async init() {
        try {
            const response = await fetch(this.jsonPath);
            if (!response.ok) return;

            const alerts = await response.json();
            if (alerts && alerts.length > 0) {
                this.renderAlerts(alerts);
            }
        } catch (error) {
            console.error('Error loading alerts:', error);
        }
    }

    renderAlerts(alerts) {
        // Create the <section class="alert-list"> element
        const alertSection = document.createElement('section');
        alertSection.classList.add('alert-list');

        // Loop through each alert and create a <p> element
        alerts.forEach((alertData) => {
            const alertParagraph = document.createElement('p');
            alertParagraph.textContent = alertData.message;

            // Apply custom background and text colors
            if (alertData.background) {
                alertParagraph.style.backgroundColor = alertData.background;
            }
            if (alertData.color) {
                alertParagraph.style.color = alertData.color;
            }

            // Optional styling padding/margins
            alertParagraph.style.padding = '1rem';
            alertParagraph.style.textAlign = 'center';

            alertSection.appendChild(alertParagraph);
        });

        // Prepend the <section> directly to the <main> element
        const mainElement = document.querySelector('main');
        if (mainElement) {
            mainElement.prepend(alertSection);
        }
    }
}