function initKontaktFormular() {
  const form = document.getElementById("kontakt-formular");
  const status = document.getElementById("kontakt-status");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      betreff: form.betreff.value,
      nachricht: form.nachricht.value.trim(),
    };

    if (!data.name || !data.email || !data.betreff || !data.nachricht) {
      status.textContent = "Bitte alle Felder ausfüllen.";
      return;
    }

    console.log("Kontakt-Formular:", data);
    status.textContent = "Danke! Deine Nachricht wurde gesendet.";
    form.reset();
  });
}

function initNewsletterFormular() {
  const form = document.getElementById("newsletter-formular");
  const status = document.getElementById("newsletter-status");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = form.email.value.trim();

    if (!email) {
      status.textContent = "Bitte eine E-Mail-Adresse eingeben.";
      return;
    }

    console.log("Newsletter-Anmeldung:", email);
    status.textContent = "Du wurdest erfolgreich angemeldet!";
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initKontaktFormular();
  initNewsletterFormular();
});
