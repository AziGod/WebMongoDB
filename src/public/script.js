function sendData() {
  const dataInput = document.getElementById("dataInput");
  const outputDiv = document.getElementById("output");

  const data = dataInput.value;

  // Utilisez fetch pour envoyer des données au serveur
  fetch("/sendData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  })
    .then((response) => response.json())
    .then((result) => {
      outputDiv.innerText = `Server Response: ${result.message}`;
    })
    .catch((error) => {
      console.error("Error sending data:", error);
    });
}

async function getData() {
  const outputDiv = document.getElementById("output");

  data = await fetch("/list");

  dataJson = await data.json();

  // Vide la div avant d'afficher de nouvelles données
  outputDiv.innerHTML = "";

  dataJson.list.forEach((etudiant) => {
    // Création d'un conteneur pour chaque étudiant
    const studentDiv = document.createElement("div");
    studentDiv.style.marginBottom = "15px";

    // Ajout du nom de l'étudiant
    const studentName = document.createElement("h3");
    studentName.textContent = `Nom : ${etudiant.nom}`;
    studentDiv.appendChild(studentName);

    // Ajout de la liste des matières
    const subjectList = document.createElement("ul");
    subjectList.style.listStyleType = "none"; // Retire les puces
    subjectList.style.paddingLeft = "0"; // Retire le retrait à gauche

    etudiant.matières.forEach((matière) => {
      const subjectItem = document.createElement("li");
      subjectItem.textContent = matière;
      subjectList.appendChild(subjectItem);
    });
    studentDiv.appendChild(subjectList);

    // Ajout de l'étudiant formaté à la div principale
    outputDiv.appendChild(studentDiv);
  });
}
