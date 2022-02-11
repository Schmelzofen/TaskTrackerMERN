const { deleteTask } = require("../db/DAO")

async function deleteTaskService(id) {
    const deleteThis = await deleteTask(id)
    return deleteThis
}

module.exports = { deleteTaskService }