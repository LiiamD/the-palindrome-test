// Importer les modules nécessaires
const express = require('express');
const path = require('path');

// Créer une instance de l'application Express
const app = express();

// Définir le port sur lequel le serveur va écouter
const PORT = 3000;

// Middleware pour servir des fichiers statiques
app.use(express.static(path.join(__dirname)));

// Définir la route principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'thePalindromeTest.html')); // Envoie le fichier HTML
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});