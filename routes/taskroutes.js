const express = require("express");
const router = express.Router();
const TaskModel = require("../models/task");

// Middleware de validation des données pour les tâches
const validateTaskData = (req, res, next) => {
    //validation pour POST  et PUT 
    if (["POST", "PUT"].includes(req.method)) {
        if (req.method === "POST" && !req.body.titre){
            return res.status(400).json({message:"Le titre est obligatoire"});
        }

        if (req.body.titre === ""){
            return res
                .status(400)
                .json({message: "Le titre ne peut être vide"});
        }
        
        if( req.body.status && 
            !["à faire", "en cours", "terminé"].includes(req.body.status)){
            return res.status(400).json({
                message: "Le statut doit être 'à faire', 'en cours' ou 'terminé'"
            });
        }
    }

    next();
}

//Middleware de vérification d'existence de tâche
const checkTaskExists = (req, res, next) =>{
    const taskId = req.params.id;
    const task = TaskModel.getById(taskId);

    if(!task){
        return res.status(404).json({message: "Tâche non trouvée"});
    }
    //attacher la tâche à l'objet req pour y accéder plus tard
    req.task = task;
    next();
}

//recuperer toute les tâches 

router.get("/", (req, res)=>{
    const tasks = TaskModel.getAll();
    res.json(tasks);
});

//recuperer une tâche spécifique par son ID

router.get("/:id", checkTaskExists, (req, res) => {
    res.json(req.task);
});

//creer une nouvelle tâche

router.post("/", validateTaskData, (req,res) => {
    const task = TaskModel.create(req.body);
    res.status(201).json(task);
});

//mettre à jour une tâche 

router.put("/:id", checkTaskExists, validateTaskData, (req, res) => {
    const updatedTask = TaskModel.update(req.params.id, req.body);
    res.json(updatedTask);
});

//supprimer une tâche

router.delete("/:id", checkTaskExists, (req, res) =>{
    const deletedTask = TaskModel.delete(req.params.id);
    res.json({message: "Tâche supprimée avec succès" , task: deletedTask});
});

module.exports = router;
