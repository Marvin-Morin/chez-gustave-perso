import { getUserInfo, isLoggedIn } from './status_user.js'; // Importez la fonction getUserInfo

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('invitationForm');
    const formMessage = document.getElementById('formMessage');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const tel = document.getElementById('tel').value;

        try {
            // Récupérer les données de l'utilisateur lors du chargement de la page
            const userInfo = await getUserInfo();

            // Vérifiez si l'utilisateur est connecté
            const loggedIn = await isLoggedIn();

            if (!loggedIn) {
                // Rediriger l'utilisateur vers la page de connexion si non connecté
                window.location.href = '/login.html'; // Adapter à votre structure de projet
                return;
            }

            // Construction de l'objet à envoyer dans le corps de la requête
            const formData = {
                name: name,
                email: email,
                tel: tel
            };

            // Envoi de la requête POST vers l'endpoint spécifié
            const response = await fetch('http://localhost:3000/demande-invitation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Inclure le token JWT dans les headers Authorization
                    'Authorization': `Bearer ${userInfo.token}`
                },
                body: JSON.stringify(formData),
                credentials: 'include' // Inclure les cookies dans la requête
            });

            const data = await response.json();

            if (response.ok) {
                // Succès : afficher un message de succès
                formMessage.innerHTML = `<p class="success">${data.message}</p>`;
                form.reset(); // Réinitialiser le formulaire après succès
            } else {
                // Erreur : afficher le message d'erreur retourné par le serveur
                formMessage.innerHTML = `<p>${data.message}</p>`;
            }
        } catch (error) {
            // Erreur : afficher l'erreur dans la console et dans le message
            console.error('Erreur lors de l\'envoi de la demande :', error);
            formMessage.innerHTML = `<p>Une erreur s'est produite lors de l'envoi de la demande.</p>`;
        }
    });
});
