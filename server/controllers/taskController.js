
const Task = require("../models/Task");

async function getTasks(req, res) {
    try{
        const tasks = await Task.find();
        res.json(tasks);
    } catch(error){
        console.log(error);
        res.status(500).json({
            message: "failed"
        });
    }
}

async function createTask(req, res) {
    try {
        if (!req.body.name || !req.body.date || !req.body.priority) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        const task = new Task({
            name:  req.body.name,
            date: req.body.date,
            priority: req.body.priority
        });
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Failed to create task"
        });
   }
}

async function updateTask(req, res) {
    try{
        const task = await  Task.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                date:  req.body.date,
                priority:  req.body.priority
            },
            { new: true }
        );
        if(!task){
            return res.status(404).json({
                message: "Task not found"
            });
        }
        res.json(task);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to update task"
        });
    }
}

async function deleteTask(req, res) {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }
        res.json({
            message: "Task deleted"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to delete task"
        });
    }
}

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};