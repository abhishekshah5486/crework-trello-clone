const { axiosInstance } = require('./index');

// Retrieve Task by TaskID
export const retrieveTaskById = async (taskId) => {
    try {
        const response = await axiosInstance.get(`/tasks/${taskId}`);
        return response.data;
    } catch (err) {
        console.log(err.message);
    }
}

// Create a new task
export const createTask = async (value) => {
    try {
        const response = await axiosInstance.post('/tasks', value);
        return response.data;
    } catch (err) {
        console.log(err.message);
    }
}

// Update a task by ID
export const updateTaskById = async (taskId, value) => {
    try {
        const response = await axiosInstance.patch(`/tasks/${taskId}`, value);
        return response.data;
    } catch (err) {
        console.log(err.message);
    }   
}

// Delete a task by ID
export const deleteTaskById = async (taskId) => {
    try {
        const response = await axiosInstance.delete(`/tasks/${taskId}`);
        return response.data;
    } catch (err) {
        console.log(err.message);
    }
}

// Retrieve all tasks by status
export const retrieveTasksByStatus = async (status) => {
    try {
        const response = await axiosInstance.get(`/tasks/status/${status}`);
        return response.data;
    } catch (err) {
        console.log(err.message);
    }
}

// Update task status by id
export const updateTaskStatusById = async (taskId, value) => {
    try {
        const response = await axiosInstance.patch(`/tasks/status/${taskId}`, value);
        return response.data;
    } catch (err) {
        console.log(err.message);
    }
}