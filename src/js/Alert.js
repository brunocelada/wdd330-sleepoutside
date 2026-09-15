export default class Alert {
    async init() {
        try {
            const response = await fetch("/json/alerts.json");
            if (!response.ok) return;
            const alerts = await response.json();

            if (alerts && alerts.length > 0) {
                const alertSection = document.createElement("section");
                alertSection.classList.add("alert-list");

                alerts.forEach((alertData) => {
                    const p = document.createElement("p");
                    p.textContent = alertData.message;
                    p.style.backgroundColor = alertData.background || "darkorange";
                    p.style.color = alertData.color || "white";
                    p.style.padding = "10px";
                    p.style.textAlign = "center";
                    alertSection.appendChild(p);
                });

                const main = document.querySelector("main") || document.body;
                main.prepend(alertSection);
            }
        } catch (error) {
            console.error("Error loading alerts:", error);
        }
    }
}