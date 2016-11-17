const express = require('express');
const tasks = express.Router();
const db = require('../model/task');
const sendJSONresp = (req, res) => res.json(res.rows);
// tasks/:id
// this is more specific than the /tasks, so it goes above
tasks.route('/:taskID')
.put((req, res) => res.json(`put tasks/${req.params.taskID}`))
.delete((req, res) => res.json(`delete tasks/${req.params.taskID}`));

// this is the most general route so it goes last
tasks.route('/')
.get(db.getTasks, sendJSONresp)
.post(db.addTask, sendJSONresp);

module.exports = tasks;
