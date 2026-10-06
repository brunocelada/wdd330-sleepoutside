const STORAGE_KEY = "sleepoutside-registration-cta";

function createRegistrationModal() {
    const modal = document.createElement("div");

    modal.className = "registration-modal";
    modal.id = "registration-modal";

    modal.innerHTML = `
    <div class="registration-modal__overlay"></div>

    <div
      class="registration-modal__content"
      role="dialog"
      aria-modal="true"
      aria-labelledby="registration-modal-title"
    >
      <button
        class="registration-modal__close"
        id="registration-modal-close"
        type="button"
        aria-label="Close registration offer"
      >
        &times;
      </button>

      <div id="registration-offer">
        <h2 id="registration-modal-title">
          Join the SleepOutside Giveaway!
        </h2>

        <p>
          Register with SleepOutside for your chance to win a
          <strong>$100 SleepOutside gift card!</strong>
        </p>

        <p>
          It's free to register and you'll be ready to shop for your
          next outdoor adventure.
        </p>

        <button
          class="registration-modal__button"
          id="registration-start"
          type="button"
        >
          Register Now
        </button>
      </div>

      <form id="registration-form" class="registration-form" hidden>
        <h2>Register with SleepOutside</h2>

        <label for="registration-name">Name</label>
        <input
          id="registration-name"
          name="name"
          type="text"
          required
        />

        <label for="registration-email">Email</label>
        <input
          id="registration-email"
          name="email"
          type="email"
          required
        />

        <button
          class="registration-modal__button"
          type="submit"
        >
          Enter Giveaway
        </button>
      </form>

      <div id="registration-success" hidden>
        <h2>You're registered!</h2>
        <p>
          Thanks for registering with SleepOutside.
          Good luck in the giveaway!
        </p>
      </div>
    </div>
  `;

    return modal;
}

function initRegistrationCTA() {
    const hasSeenCTA = localStorage.getItem(STORAGE_KEY);

    if (hasSeenCTA) {
        return;
    }

    const modal = createRegistrationModal();
    document.body.appendChild(modal);

    const closeButton = document.querySelector("#registration-modal-close");
    const overlay = document.querySelector(".registration-modal__overlay");
    const startButton = document.querySelector("#registration-start");
    const offer = document.querySelector("#registration-offer");
    const form = document.querySelector("#registration-form");
    const success = document.querySelector("#registration-success");

    function closeModal() {
        modal.remove();
        localStorage.setItem(STORAGE_KEY, "closed");
    }

    closeButton.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);

    startButton.addEventListener("click", () => {
        offer.hidden = true;
        form.hidden = false;
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        form.hidden = true;
        success.hidden = false;

        localStorage.setItem(STORAGE_KEY, "registered");
    });
}

export default initRegistrationCTA;