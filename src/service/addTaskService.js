const { addTask } = require("../db/DAO")

async function addTaskService(task) {
    const addThis = await addTask(task)
    return addThis
}

module.exports = { addTaskService }