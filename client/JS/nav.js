// nav.js

export function updateNav(userData) {
    const logoutButton = document.getElementById("logoutButton");
    const mesReservationsLink = document.getElementById("reservation");
    const parrainage = document.getElementById("parrainage");
    const invitation = document.getElementById("invitation");
    const ajouter_logement = document.getElementById("ajouter_logement");
    const ul_nav = document.querySelector("ul");

    if (userData && userData.user) {
        // Utilisateur connecté
        logoutButton.style.display = "block"; // Afficher le bouton de déconnexion
        
        // Vérifier et afficher parrainage si défini
        if (parrainage) {
            parrainage.style.display = "block";
        }

        // Vérifier si l'utilisateur est administrateur pour afficher l'invitation
        if (userData.user.is_admin === true && invitation) {
            invitation.style.display = "block";
        } else if (invitation) {
            invitation.style.display = "none";
        }

        // Vérifier et afficher ajouter_logement si défini et si l'utilisateur est administrateur
        if (ajouter_logement && userData.user.is_admin === true) {
            ajouter_logement.style.display = "block";
        } else if (ajouter_logement) {
            ajouter_logement.style.display = "none";
        }

        // Vérifier et supprimer le lien de connexion s'il est présent
        if (ul_nav && ul_nav.contains(document.getElementById("loginLink"))) {
            ul_nav.removeChild(document.getElementById("loginLink"));
        }

        // Afficher le lien "Mes réservations" s'il est défini
        if (mesReservationsLink) {
            mesReservationsLink.style.display = "inline-block";
        }
    } else {
        // Utilisateur non connecté ou données utilisateur non disponibles
        console.log("Utilisateur non trouvé");
        logoutButton.style.display = "none"; // Cacher le bouton de déconnexion

        // Ajouter le lien de connexion s'il est absent
        if (ul_nav && !ul_nav.contains(document.getElementById("loginLink"))) {
            const loginLink = document.createElement("a");
            loginLink.id = "loginLink";
            loginLink.href = "/client/login_form.html";
            loginLink.innerHTML = "<li>Connexion</li>";
            ul_nav.appendChild(loginLink);
        }

        // Cacher le lien "Mes réservations" s'il est défini
        if (mesReservationsLink) {
            mesReservationsLink.style.display = "none";
        }

        // Cacher parrainage, invitation et ajouter_logement s'ils sont définis
        if (parrainage) {
            parrainage.style.display = "none";
        }
        if (invitation) {
            invitation.style.display = "none";
        }
        if (ajouter_logement) {
            ajouter_logement.style.display = "none";
        }
    }
}
