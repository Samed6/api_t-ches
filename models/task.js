//Model de donnee pour une tache
class Task{
    constructor(id,titre,description,status = "à faire" ){
        this.id = id;
        this.titre = titre;
        this.description = description;
        this.status = status;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
//Stockage en memeoire des tâches 
let tasks = [];
let nextId = 1;

//fonction pour manipuler les tâches 

const TaskModel = {
    //recuperer toutes les tâches 
    getAll: () =>{
        return tasks;
    },

    //recuperer une tâche par son ID 

    getById: (id) => {
        return tasks.find((task) => task.id === parseInt(id));
    },

    //creer une nouvelle tâche
    create: (taskData) => {
        const task = new Task(
            nextId++,
            taskData.titre,
            taskData.description,
            taskData.status
        );
        tasks.push(task);
        return task;
    },

    //mettre à jour une tâche

    update: (id, taskData)=> {
        const index = tasks.findIndex((task)=> task.id === parseInt(id));
        if(index !== -1) {
            const task = tasks[index];
            task.titre = taskData.titre || task.titre;
            task.description = taskData.description || task.description;
            task.status = taskData.status || task.status;
            task.updatedAt = new Date();
            return task; 
        }
        return null; 
    },

    //supprime une tâche 
    delete: (id) => {
        const index = tasks.findIndex((task) => task.id === parseInt(id));
        if(index !== -1){
            const deletedTask = tasks [index];
            tasks = tasks.filter((task) => task.id !== parseInt(id))
            return deletedTask;
        }
        return null;
    },
};
module.exports = TaskModel;