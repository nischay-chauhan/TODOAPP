const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.get('/' , async(req , res) => {
    try{
        const tasks = await Task.find();
        res.json(tasks);
    } catch(error){
        console.log(error);
        res.status(500).json({error : 'Internal Server Error'})
    }
});

router.post('/' , async(req , res) => {
    const {title , description } = req.body;
    try{
        const newTask = new Task({title , description });
        await newTask.save();
        res.json(newTask);
    }catch(error){
        console.log(error);
        res.status(500).json({error : 'Internal Server Error'})
    }
});

router.put('/:id' , async(req , res) => {
    const taskId = req.params.id;
    const {title , description} = req.body;

    try{
        const updateTask = await Task.findByIdAndUpdate(taskId , {title , description} , {new : true});
        res.json(updateTask);   
    }catch(error){
        console.log(error);
        res.status(500).json({error : 'Internal Server Error'})
    }
});

router.delete('/:id' , async(req , res) => {
    const taskID = req.params.id;
    try{
        await Task.findByIdAndDelete(taskID);
        res.json({message : 'Task Deleted Successfully'});
    } catch(error){
        console.log(error);
        res.status(500).json({error : 'Internal Server Error'})
    }
})

module.exports = router;