const express = require("express");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/taskroutes");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// Configuration du serveur
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de sécurité
app.use(helmet());

// Middleware CORS
app.use(cors());

// Middleware de limitation de taux
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, 
	standardHeaders: true,
	legacyHeaders: false,
	message: { message: "Trop de requêtes, veuillez réessayer plus tard" },
});
app.use(limiter);

// Middleware de parsing du corps des requêtes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware de journalisation simple
app.use((req, res, next) => {
	console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
	next();
});

// Routes
app.use("/tasks", taskRoutes);

// Route de test
app.get("/", (req, res) => {
	res.json({ message: "Bienvenue sur l'API de gestion de tâches!" });
});

// Gestion des erreurs de route non trouvée
app.use((req, res) => {
	res.status(404).json({ message: "Route non trouvée" });
});

// Middleware de gestion globale des erreurs
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		message: "Une erreur interne s'est produite",
		error: process.env.NODE_ENV === "development" ? err.message : undefined,
	});
});

// Démarrage du serveur
app.listen(PORT, () => {
	console.log(`Serveur démarré sur le port ${PORT}`);
});
