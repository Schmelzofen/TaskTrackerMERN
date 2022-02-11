const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const app = express();
const path = require("path")
// Services
const { addTaskService } = require("./src/service/addTaskService")
const { deleteTaskService } = require("./src/service/deleteTaskService")
const { getTasksService } = require("./src/service/getTasksService")
app.use(express.static(path.resolve(__dirname, "./client/build/")));
app.use(cors())
app.use(express.json())
console.log(__dirname + "/client/build")
app.get("/api/todos/all", (req, res) => {
    getTasksService()
        .then((todos) => {
            res.send({ todos })
        })
        .catch((err) => {
            res.send({ "Error:": err })
        })
})

app.post("/api/todos/delete/:id", (req, res) => {
    const id = req.params.id
    deleteTaskService(id)
        .then(() => {
            res.send({ "Result": "Task has been deleted" })
        })
        .catch((err) => {
            res.send({ "Error": err.message })
        })
})

app.post("/api/todos/post", (req, res) => {
    const todo = {
        task: req.body.task,
        reminder: req.body.reminder,
        date: req.body.date,
    }
    addTaskService(todo)
        .then((result) => {
            res.status(201).send({ "Response": result })
        })
        .catch((err) => {
            res.status(400).send({ err: err.message })
        })
})

app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/build/", "index.html"));
});

app.use((_, res) => {
    res.status(404).send({ err: "404 not found" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, function () {
    console.log("Server running on port " + PORT);
})