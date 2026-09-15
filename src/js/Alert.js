export default class Alert {
    constructor(jsonPath = '/json/alerts.json') { // or '/alerts.json' depending on your folder layout
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
        const alertSection = document.createElement('section');
        alertSection.classList.add('alert-list');

        alerts.forEach((alertData) => {
            const alertParagraph = document.createElement('p');
            alertParagraph.textContent = alertData.message;

            if (alertData.background) {
                alertParagraph.style.backgroundColor = alertData.background;
            }
            if (alertData.color) {
                alertParagraph.style.color = alertData.color;
            }

            alertParagraph.style.padding = '1rem';
            alertParagraph.style.textAlign = 'center';

            alertSection.appendChild(alertParagraph);
        });

        const mainElement = document.querySelector('main');
        if (mainElement) {
            mainElement.prepend(alertSection);
        }
    }
}