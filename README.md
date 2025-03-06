# Mon Projet d'API de Gestion de Tâches

J'ai créé cette API pour apprendre à gérer des tâches .

## Ce que fait mon application

Cette API permet de :

- Créer des tâches
- Voir la liste des tâches
- Modifier des tâches
- Supprimer des tâches

Chaque tâche a un titre, une description, une date de début, une date de fin et un statut.

## Ce dont vous aurez besoin pour lancer mon projet

- Node.js
- Express.js
- npm

## Comment installer mon projet

1. Téléchargez les fichiers :

   ```
   git clone git@github.com:Samed6/api_t-ches.git
   cd api_tache
   ```

2. Installez les programmes nécessaires :
   ```
   npm install
   ```
3. Créez un fichier `.env` avec :
   ```
   PORT=3000
   ```

## Comment démarrer l'application

Tapez cette commande dans le terminal :

```
npm start
```

Le serveur se lancera sur http://localhost:3000


## Comment ajouter ou modifier une tâche

Voici un exemple de données à envoyer :

```
{
  "titre": "Developpement",
  "description": "Mettre en place une platforme",
  "dateDebut": "2023-10-01",
  "dateEcheance": "2023-10-02",
  "statut": "À faire"
}
```

## Comment tester

J'ai utilisé Postman pour tester mon API.

## Ce que j'ai appris et utilisé

- Node.js pour exécuter le serveur
- Express.js pour créer les routes de l'API
- Stockage en mémoire (array) pour gérer les données
- Comment créer une API REST

## Fait par

DJIBRIL Abdel Samed
