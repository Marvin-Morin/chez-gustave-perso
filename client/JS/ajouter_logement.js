document.addEventListener('DOMContentLoaded', async () => {
    const typeSelect = document.getElementById('type');
    const equipementsList = document.getElementById('equipements-list');

    // Fonction pour charger les types
    const loadTypes = async () => {
        try {
            const response = await fetch('http://localhost:3000/type');
            const types = await response.json();
            types.forEach(type => {
                const option = document.createElement('option');
                option.value = type._id;
                option.textContent = type.tag;
                typeSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Erreur lors du chargement des types:', error);
        }
    };

    // Fonction pour charger les équipements
    const loadEquipements = async () => {
        try {
            const response = await fetch('http://localhost:3000/equipement');
            const equipements = await response.json();
            equipements.forEach(equipement => {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = `equipement-${equipement._id}`;
                checkbox.value = equipement._id;
                const label = document.createElement('label');
                label.htmlFor = checkbox.id;
                label.textContent = equipement.name;
                equipementsList.appendChild(label);
                equipementsList.appendChild(checkbox);
                equipementsList.appendChild(document.createElement('br'));
            });
        } catch (error) {
            console.error('Erreur lors du chargement des équipements:', error);
        }
    };

    await loadTypes();
    await loadEquipements();
});

document.getElementById('add-image').addEventListener('click', () => {
    const imagesInput = document.getElementById('images');
    const imagesList = document.getElementById('images-list');
    imagesList.innerHTML = ''; // vide la liste avant de l'actualiser

    for (let file of imagesInput.files) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const img = document.createElement('img');
            img.src = event.target.result;
            img.width = 100;
            img.height = 100;
            img.alt = file.name; // ajoute le nom de l'image comme texte alternatif
            imagesList.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('logement-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData();
    const imagesInput = document.getElementById('images');
    for (let file of imagesInput.files) {
        formData.append('images', file);
    }

    formData.append('secteur', document.getElementById('secteur').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('tarif_bas', document.getElementById('tarif_bas').value);
    formData.append('tarif_moyen', document.getElementById('tarif_moyen').value);
    formData.append('tarif_haut', document.getElementById('tarif_haut').value);
    formData.append('m_carre', document.getElementById('m_carre').value);
    formData.append('chambre', document.getElementById('chambre').value);
    formData.append('salle_de_bain', document.getElementById('salle_de_bain').value);
    formData.append('categorie', document.getElementById('categorie').value);
    formData.append('type', document.getElementById('type').value);

    const equipementsChecked = document.querySelectorAll('#equipements-list input:checked');
    const equipements = Array.from(equipementsChecked).map(equipement => equipement.value);
    equipements.forEach(equipement => formData.append('equipements', equipement));

    formData.append('adulte', document.getElementById('adulte').value);
    formData.append('enfant', document.getElementById('enfant').value);
    formData.append('animaux', document.getElementById('animaux').value);

    try {
        const response = await fetch('http://localhost:3000/logement', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Erreur lors de l\'ajout du logement');
        }

        const result = await response.json();
        document.getElementById('logement-form').reset();
        document.getElementById('images-list').innerHTML = '';
        document.getElementById('equipements-list').innerHTML = '';
        console.log('Logement ajouté avec succès:', result);
        window.location.assign("index.html");
        alert('Logement ajouté avec succès');
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de l\'ajout du logement');
    }
});

document.getElementById('reset-form').addEventListener('click', () => {
    document.getElementById('logement-form').reset();
    document.getElementById('images-list').innerHTML = '';
});
