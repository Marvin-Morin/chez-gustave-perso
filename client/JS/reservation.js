// reservation.js

import { getUserInfo } from "./status_user.js";

window.addEventListener("load", () => {
    getUserInfo();
});




export const reservation_user = async (userData) => {
    console.log("ici");
    try {
        const response = await fetch(`http://localhost:3000/user/${userData.user._id}/reservation`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const aucune_reservation = document.getElementById('aucuneReservation');
        if (!response.ok) {
            aucune_reservation.textContent = "Vous n'avez aucune réservation.";
        } else {
            aucune_reservation.style.display = "none";
        }

        const reservationData = await response.json();

        reservationData.forEach(async (reservation) => {
            const { start_date, end_date, chef_cuisine, visite, logement } = reservation;

            const logementResponse = await fetch(`http://localhost:3000/logement/${logement}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!logementResponse.ok) {
                throw new Error("Erreur lors de la récupération des détails du logement");
            }

            const logementDetails = await logementResponse.json();

            const reservationInfo = document.createElement('div');
            reservationInfo.classList.add('reservationInfo');

            reservationInfo.innerHTML = `
                    <div class="reservation-info">
                        <h3>Réservation : </h3>
                        <p><strong>Date de début :</strong> ${start_date.slice(0, 10)}</p>
                        <p><strong>Date de fin :</strong> ${end_date.slice(0, 10)}</p>
                        <p><strong>Chef de cuisine :</strong> ${chef_cuisine ? "Oui" : "Non"}</p>
                        <p><strong>Date de visite :</strong> ${visite.slice(0, 10)}</p>
                        <hr>
                    </div>
                    <div class="logement-info">
                        <h3>Logement : </h3>
                        <p><strong>Secteur :</strong> ${logementDetails.secteur}</p>
                        <p><strong>Description :</strong> ${logementDetails.description}</p>
                        <p><strong>Tarifs :</strong> Bas - ${logementDetails.tarif_bas}€, Moyen - ${logementDetails.tarif_moyen}€, Haut - ${logementDetails.tarif_haut}€</p>
                        <p><strong>Surface :</strong> ${logementDetails.m_carre}m²</p>
                        <p><strong>Chambres :</strong> ${logementDetails.chambre}</p>
                        <p><strong>Salles de bain :</strong> ${logementDetails.salle_de_bain}</p>
                        <p><strong>Catégorie :</strong> ${logementDetails.categorie}</p>
                    </div>
                `;

            const swiperContainer = document.createElement('div');
            swiperContainer.classList.add('swiper');

            const swiperWrapper = document.createElement('div');
            swiperWrapper.classList.add('swiper-wrapper');

            logementDetails.images.forEach(image => {
                const swiperSlide = document.createElement('div');
                swiperSlide.classList.add('swiper-slide');

                const imgElement = document.createElement('img');
                imgElement.src = `../../server/src/uploads/logements/${image}`;
                imgElement.alt = "Image du logement";

                swiperSlide.appendChild(imgElement);
                swiperWrapper.appendChild(swiperSlide);
            });

            swiperContainer.appendChild(swiperWrapper);

            const pagination = document.createElement('div');
            pagination.classList.add('swiper-pagination');
            swiperContainer.appendChild(pagination);

            const prevButton = document.createElement('div');
            prevButton.classList.add('swiper-button-prev');
            swiperContainer.appendChild(prevButton);

            const nextButton = document.createElement('div');
            nextButton.classList.add('swiper-button-next');
            swiperContainer.appendChild(nextButton);

            reservationInfo.appendChild(swiperContainer);

            document.body.appendChild(reservationInfo);

            // Ajout du bouton "Supprimer" à chaque div de réservation
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add('button_supprimer');
            deleteBtn.textContent = "Annuler";
            reservationInfo.appendChild(deleteBtn);

            // Ajout de l'événement click au bouton Supprimer
            deleteBtn.addEventListener("click", async () => {
                try {
                    const deleteResponse = await fetch(`http://localhost:3000/reservation/${reservation._id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        credentials: "include"
                    });

                    if (!deleteResponse.ok) {
                        throw new Error("Erreur lors de la suppression de la réservation");
                    }

                    reservationInfo.innerHTML = "<p>La réservation a été supprimée avec succès.</p>";


                    // Vous devez implémenter la fonction logement() pour rafraîchir la liste des logements après la suppression

                } catch (error) {
                    console.error("Erreur lors de la suppression de la réservation :", error);
                    alert("Erreur lors de la suppression de la réservation. Veuillez réessayer.");
                }
            });

            new Swiper(swiperContainer, {
                loop: true,
                pagination: {
                    el: pagination,
                    clickable: true,
                },
                navigation: {
                    nextEl: nextButton,
                    prevEl: prevButton,
                },
            });
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des réservations de l'utilisateur :", error);
        // alert("Erreur lors de la récupération des réservations de l'utilisateur. Veuillez réessayer.");
    }
}
