const { axiosInstance } = require('./index');

// Register New User
export const RegisterUser = async (value) => {
    try {
        const response = await axiosInstance.post('/users/signup', value);
        return response.data;
    } catch (err) {
        console.log(err.message);
    }
}

// Login a user
export const LoginUser = async (value) => {
    try {
        const response = await axiosInstance.post('/users/login', value);
        return response.data;
    } catch (err) {
        console.log(err.message);
    }
}

// Logout a user
export const LogoutUser = async (userId) => {
    try {
        const response = await axiosInstance.post(`/users/logout/${userId}`);
        return response.data;
    } catch (err) {
        console.log(err.message);
    }
}

// Get current user
export const getCurrentUser = async () => {
    try {
        const response = await axiosInstance.get('/get-current-user');
        return response.data;
    } catch (err) {
        console.log(err.message);
    }
}