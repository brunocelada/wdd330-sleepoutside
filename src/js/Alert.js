export default class Alert {
    constructor() {
        this.pathPrefix = "/json/alerts.json"; // Adjust path if your json folder is located elsewhere
    }

    async getAlerts() {
        try {
            const response = await fetch(this.pathPrefix);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.error("Error loading alerts:", error);
        }
        return [];
    }

    async init() {
        const alerts = await this.getAlerts();

        if (alerts && alerts.length > 0) {
            // Create the <section class="alert-list"> element
            const alertSection = document.createElement("section");
            alertSection.classList.add("alert-list");

            // Loop through the alerts and build a <p> for each
            alerts.forEach((alertData) => {
                const alertParagraph = document.createElement("p");
                alertParagraph.textContent = alertData.message;

                // Apply specified background and foreground colors
                alertParagraph.style.backgroundColor = alertData.background;
                alertParagraph.style.color = alertData.color;
                // Optional padding/styling for better appearance
                alertParagraph.style.padding = "10px";
                alertParagraph.style.textAlign = "center";

                alertSection.appendChild(alertParagraph);
            });

            // Prepend the <section> to the main element on the index page
            const mainElement = document.querySelector("main");
            if (mainElement) {
                mainElement.prepend(alertSection);
            }
        }
    }
}