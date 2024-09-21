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
export const updateTask = async (value) => {
    try {
        const response = await axiosInstance.patch('/tasks/:id', value);
        return response.data;
    } catch (err) {
        console.log(err.message);
    }   
}

// Delete a task by ID
export const deleteTask = async () => {
    try {
        const response = await axiosInstance.delete('/tasks/:id');
    } catch (err) {
        console.log(err.message);
    }
}

// Retrieve all tasks by status
export const retrieveTasksByStatus = async (status) => {
    try {
        const response = await axiosInstance.get(`/tasks/${status}`);
        return response.data;
    } catch (err) {
        console.log(err.message);
    }
}