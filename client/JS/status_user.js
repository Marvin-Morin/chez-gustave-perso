// getUserInfo.js

import { updateNav } from './nav.js';
import { reservation_user } from './reservation.js';
import { logement } from './index.js'
import { invitation } from './invitation.js'

let fetchingUserInfo = false;


export async function getUserInfo() {

    if (fetchingUserInfo) return; // Si déjà en train de récupérer les infos, ne pas relancer

    fetchingUserInfo = true;

    try {
        const response = await fetch("http://localhost:3000/auth/get-logged-in-user", {
            method: "GET",
            credentials: "include",
        });
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        if (!response.ok) {
            if (response.status != 401) {
                throw new Error('Erreur lors de la récupération du statut utilisateur');
            }
        }

        const data = await response.json();

        updateNav(data);
        reservation_user(data)
        logement(data)
        invitation(data)

        return data;


    } catch (error) {
        console.error("Erreur lors de la récupération des informations de l'utilisateur :", error);
        throw error; // Re-lancer l'erreur pour que le gestionnaire approprié puisse la gérer
    } finally {
        fetchingUserInfo = false;
    }
}


export async function isLoggedIn() {
    const userInfo = await getUserInfo();
    return userInfo !== null;
};