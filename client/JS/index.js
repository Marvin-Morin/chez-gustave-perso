import { getUserInfo } from "./status_user.js";


window.addEventListener("load", function () {
  // Sélectionne l'élément de chargement
  const loadingDiv = document.getElementById("loading");
  getUserInfo();

  // Cache l'élément de chargement après le chargement de la page
  loadingDiv.style.display = "none";
});





// Initialized the tenary operator to false by default
// Initialiser l'opérateur ternaire à faux par defaut
let bool = false;

// Take the button element from the navigation bar menu and store it in the "menu_icon" property variable
// Prendre l'élément boutton de la barre de navigation et le stocker dans la variable "menu-icon"
const menu_icon = document.getElementById("menu-icon");

// Add an listen event on the button of the menu to navbar
// Ajouter une écoute d'évènement sur le boutton du menu de la barre de navigation
menu_icon.addEventListener("click", () => {
  // Take the list of the navbar
  // Prendre la list de la barre de navigation
  let ul = document.querySelector("ul");

  // Take the spans of the navbar button
  // Prendre les spans du bouton de la barre de navigation
  const spans = menu_icon.querySelectorAll("span");

  // Initialized of the operator tenary of the operator in reverse of the default initilization so that it is different each time the navbar button clicked
  // Initialisation de l'opérateur ternaire à l'inverse de l'initilization par defaut pour qu'il sois différent à chaque clique sur le boutton de la barre de navigation
  bool = !bool;

  // Change the button of menu at each click
  // Changer le boutton du menu à chaque clique
  if (bool) {
    spans[0].style.animation = "first_span 1s forwards";
    spans[1].style.visibility = "hidden";
    spans[2].style.animation = "third_span 1s forwards";
  } else {
    // Else, renitialize the navbar button animation
    // Sinon, rénitialiser l'animation du bouton de la barre de navigation
    spans[0].style.animation = ""; //
    spans[1].style.visibility = "visible";
    spans[2].style.animation = "";
  }

  // If the button of navbar is clicked, put the list in visible
  // Si le bouton de la barre de navigation est cliqué, mettre la liste en visible
  ul.style.display = bool ? "flex" : "none";
});







// DECONNEXION
document.getElementById("logoutButton").addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:3000/auth/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Pour inclure les cookies dans la requête
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
    } else {
      // Déconnexion réussie, recharger la page
      window.location.href = "index.html"
    }
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
    alert("Erreur lors de la déconnexion");
  }
});











// export const fetchReservations = async (logementId) => {
//   try {
//     const url = `http://localhost:3000/reservations`;
//     const response = await fetch(url, {
//       method: "GET",
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     });

//     if (!response.ok) {
//       throw new Error(`Erreur lors de la récupération des réservations pour le logement ${logementId}`);
//     }

//     const reservations = await response.json();
//     return reservations;
//   } catch (error) {
//     console.error("Erreur lors de la récupération des réservations:", error);
//     return [];
//   }
// };



export const logement = async (data) => {
  try {
    const logementSection = document.getElementById("logement");
    logementSection.innerHTML = '';

    const response = await fetch("http://localhost:3000/logement", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données');
    }

    const logements = await response.json();
    console.log("logements", logements);

    for (const logement of logements) {
      try {
        const url = `http://localhost:3000/logement/${logement._id}/reservations`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`Erreur lors de la récupération des réservations pour le logement ${logement._id}`);
        }

        const reservations = await response.json();
        logement.reservationDetails = reservations.flat();
      } catch (error) {
        console.error("Erreur lors de la récupération des réservations:", error);
        logement.reservationDetails = [];
      }

      const logementContainer = document.createElement('div');
      logementContainer.classList.add('logement-item');

      const swiperContainer = document.createElement('div');
      swiperContainer.classList.add('swiper');

      const swiperWrapper = document.createElement('div');
      swiperWrapper.classList.add('swiper-wrapper');

      logement.images.forEach(image => {
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

      logementContainer.appendChild(swiperContainer);

      const formContainer = document.createElement('div');
      formContainer.classList.add('reservation-form-container');
      formContainer.innerHTML = `
        <form id="reservationForm-${logement._id}" class="styled-form">
          <label for="start_date-${logement._id}">Date de début :</label>
          <input type="date" id="start_date-${logement._id}" name="start_date" required>
          
          <label for="end_date-${logement._id}">Date de fin :</label>
          <input type="date" id="end_date-${logement._id}" name="end_date" required>
          
          <label for="chef_cuisine-${logement._id}">Chef de cuisine :</label>
          <input type="checkbox" id="chef_cuisine-${logement._id}" name="chef_cuisine">
          
          <label for="visite-${logement._id}">Date de visite :</label>
          <input type="date" id="visite-${logement._id}" name="visite" required>
          
          <button type="submit">Réserver</button>
          <button type="button" id="resetButton-${logement._id}">Tout effacer</button>
        </form>
      `;

      const closeButton = document.createElement('button');
      closeButton.classList.add("close-form");
      closeButton.textContent = "×";
      formContainer.style.display = "none";
      logementContainer.appendChild(formContainer);
      formContainer.appendChild(closeButton);

      if (data && data.message !== "Not authenticated") {
        const showFormButton = document.createElement('button');
        showFormButton.classList.add("add_reservation");
        showFormButton.textContent = "Je réserve!";

        showFormButton.addEventListener('click', () => {
          formContainer.style.display = "block";
          showFormButton.style.display = "none";
          secteurElement.style.display = "none";
          descriptionElement.style.display = "none";
          tarifsElement.style.display = "none";
          detailsElement.style.display = "none";
          adult_enfant_animeaux.style.display = "none";
          reservationsElement.style.display = "none";
          typeElement.style.display = "none";
          equipementsElement.style.display = "none";
        });

        logementContainer.appendChild(showFormButton);

        closeButton.addEventListener('click', () => {
          formContainer.style.display = "none";
          showFormButton.style.display = "block";
          secteurElement.style.display = "block";
          descriptionElement.style.display = "block";
          tarifsElement.style.display = "block";
          detailsElement.style.display = "block";
          adult_enfant_animeaux.style.display = "block";
          reservationsElement.style.display = "block";
          typeElement.style.display = "block";
          equipementsElement.style.display = "block";
        });
      }

      const secteurElement = document.createElement('h3');
      secteurElement.textContent = logement.secteur;
      logementContainer.appendChild(secteurElement);

      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = logement.description;
      logementContainer.appendChild(descriptionElement);

      const tarifsElement = document.createElement('p');
      tarifsElement.textContent = `Tarifs: Bas - ${logement.tarif_bas}€, Moyen - ${logement.tarif_moyen}€, Haut - ${logement.tarif_haut}€`;
      logementContainer.appendChild(tarifsElement);

      const detailsElement = document.createElement('p');
      detailsElement.textContent = `Surface: ${logement.m_carre}m², Chambres: ${logement.chambre}, Salles de bain: ${logement.salle_de_bain}, Catégorie: ${logement.categorie}`;
      logementContainer.appendChild(detailsElement);

      const adult_enfant_animeaux = document.createElement('p');
      adult_enfant_animeaux.textContent = `Accepte : Animaux: ${logement.animaux}, Adulte : ${logement.adulte}, Enfant : ${logement.enfant}`;
      logementContainer.appendChild(adult_enfant_animeaux);

      const reservationsElement = document.createElement('div');
      reservationsElement.classList.add('reservations');
      reservationsElement.innerHTML = ''; // Réinitialiser le contenu

      logement.reservationDetails.forEach(reservation => {
        if (reservation.start_date && reservation.end_date) {
          const startDateShort = reservation.start_date.slice(0, 10);
          const endDateShort = reservation.end_date.slice(0, 10);

          const startDate = new Date(startDateShort);
          const endDate = new Date(endDateShort);

          if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
            const detailsReservation = document.createElement('p');
            detailsReservation.classList.add("date_reserve");
            detailsReservation.textContent = `Réservé du ${startDate.toLocaleDateString()} au ${endDate.toLocaleDateString()}`;
            reservationsElement.appendChild(detailsReservation);
          } else {
            console.error("Ce bien n'est pas reservé, profitez-en!");
          }
        } else {
          console.error("Les dates de réservation ne sont pas définies :", reservation.start_date, reservation.end_date);
        }
      });

      logementContainer.appendChild(reservationsElement);
      logementSection.appendChild(logementContainer);

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

      const reservationForm = document.getElementById(`reservationForm-${logement._id}`);
      reservationForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const startDate = document.getElementById(`start_date-${logement._id}`).value;
        const endDate = document.getElementById(`end_date-${logement._id}`).value;
        const chefCuisine = document.getElementById(`chef_cuisine-${logement._id}`).checked;
        const visite = document.getElementById(`visite-${logement._id}`).value;

        try {
          const url = `http://localhost:3000/reservation`;
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({
              start_date: startDate,
              end_date: endDate,
              chef_cuisine: chefCuisine,
              visite: visite,
              logement: logement._id
            }),
          });

          console.log("reeeeeponse : ", response);

          if (!response.ok) {
            throw new Error('Erreur lors de la réservation');
          }

          // Si la réponse est 201 (Created), il n'y a pas de contenu JSON à traiter
          // Vous pouvez simplement vérifier que la réponse est ok (status 200-299)

          alert("Réservation ajoutée avec succès !");
          window.location.reload();  // Recharge la page pour refléter les mises à jour

          reservationForm.reset();
          formContainer.style.display = "none";
          showFormButton.style.display = "block";

        } catch (error) {
          console.error("Erreur lors de la réservation:", error);
          alert("Une erreur est survenue lors de la réservation.");
        }
      });

      const resetButton = document.getElementById(`resetButton-${logement._id}`);
      resetButton.addEventListener('click', () => {
        reservationForm.reset();
      });
    }
  } catch (error) {
    console.error("Erreur:", error);
  }
};

