document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  try {
    const response = await fetch("http://localhost:3000/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include", // Envoyer les cookies avec la requête
    });

    // Vérifier si la réponse est OK avant d'essayer de la parser
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // console.log("Data received: ", data);

  } catch (error) {
    errorMessage.textContent = "Erreur lors de la connexion";
    console.error("Erreur:", error);
  }
 
    attendre();
});

const attendre = () => {
  setTimeout(() => {
    window.location.href = "http://127.0.0.1:5500/client/index.html";
  }, 500);
}