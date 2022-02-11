const { getTasks } = require("../db/DAO")

async function getTasksService() {
    const tasks = await getTasks()
    return tasks
}

module.exports = { getTasksService }