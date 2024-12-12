// invitation.js
import { getUserInfo } from './status_user.js';


export const invitation = async (data) => {

  const invitationForm = document.getElementById("invitationForm");
  const formMessage = document.getElementById("successMessage");

  invitationForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = {
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    try {
      // const userInfo = await getUserInfo();

      if (!data || !data.token) {
        formMessage.textContent = "Erreur de récupération du token. Veuillez vous reconnecter.";
        formMessage.className = "error";
        return;
      }

      const response = await fetch("http://localhost:3000/invitation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include"
      });

      const result = await response.json();

      if (response.ok) {
        formMessage.style.display = "flex";
        invitationForm.reset(); // Effacer le formulaire après envoi réussi
      } else {
        formMessage.textContent = result.message;
        formMessage.className = "error";
      }
    } catch (error) {
      formMessage.textContent = "Une erreur est survenue. Veuillez réessayer plus tard.";
      formMessage.className = "error";
    }
  });
}