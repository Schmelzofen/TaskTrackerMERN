const { ObjectId } = require('mongodb');
const { connect } = require('./connection');

async function getTasks() {
    const db = await connect()
    const tasks = await db.collection("todos")
        .find()
        .toArray()
    return tasks
}

async function addTask(task) {
    const db = await connect()
    const newTask = db.collection("todos").insertOne(task)
    return newTask
}

async function deleteTask(id) {
    const db = await connect()
    const deleteThis = db.collection("todos").deleteOne({ _id: ObjectId(id) })
    return deleteThis
}

module.exports = {
    getTasks,
    addTask,
    deleteTask,
}