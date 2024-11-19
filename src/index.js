const express = require("express");
const { ObjectId, MongoClient } = require("mongodb");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// URL de MongoDB sur le port 27017, le protocole est mongodb:// l'hôte est localhost utilisez les information de configuration de docker comme référence.
const mongoUrl = "mongodb://localhost:27017";

// Utilisez bodyParser pour parser les requêtes JSON
app.use(bodyParser.json());

// Utilisez express.static pour servir les fichiers statiques
app.use(express.static("src/public"));

// Route pour envoyer des données à l'API
app.post("/sendData", async (req, res) => {
  const dataContent = req.body.data;

  try {
    // Établir une connexion avec la base de données
    const client = new MongoClient(mongoUrl);
    await client.connect();

    // Sélectionne la base de données et la collection
    const collection = client.db("test").collection("data");

    // Insérer une nouvelle donnée dans la collection
    await collection.insertOne({ content: dataContent });

    // Fermer la connexion
    await client.close();

    res.json({ message: "Data added successfully" });
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route pour récupérer des données depuis l'API
app.get("/list", async (req, res) => {
  try {
    // Établir une connexion avec la base de données
    const client = new MongoClient(mongoUrl);
    await client.connect();

    // Sélectionner la collection
    const collection = client.db("test").collection("etudiants");

    // Récupérer les données de la collection et les formatter en tableau JSON
    const list = await collection.find().toArray();

    // Fermer la connexion
    await client.close();

    // Renvoyer le tableau JSON à l'utilisateur
    res.json({ list });
  } catch (error) {
    console.error("Error reading data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route pour récupérer un document étudiant depuis l'API
app.get("/etudiant/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    // à vous de compléter

    // Établir une connexion avec la base de données
    const client = new MongoClient(mongoUrl);
    await client.connect();

    // Sélectionner la collection
    const collection = client.db("test").collection("etudiants");

    const etudiant = await collection.find({ _id: id }).toArray();

    // Fermer la connexion
    await client.close();

    // Renvoyer le tableau JSON à l'utilisateur
    res.json({ etudiant });
  } catch (error) {
    console.error("Error reading data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route pour modifier un document depuis l'API
app.post("/edit/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    // à vous de compléter

    // Établir une connexion avec la base de données
    const client = new MongoClient(mongoUrl);
    await client.connect();

    // Sélectionner la collection
    const collection = client.db("test").collection("etudiants");

    const etudiant = await collection.updateOne(
      { _id: id },
      { $set: { nom: "Matheo" } }
    );

    // Fermer la connexion
    await client.close();

    // Renvoyer le tableau JSON à l'utilisateur
    res.json({ etudiant });
  } catch (error) {
    console.error("Error reading data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ... (autres routes)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
