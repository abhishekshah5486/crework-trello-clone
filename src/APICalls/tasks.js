const { axiosInstance } = require('./index');

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