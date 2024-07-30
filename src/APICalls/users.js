const { axiosInstance } = require('./index');

// Register New User
export const RegisterUser = async (value) => {
    try {
        const response = await axiosInstance.post('/signup', value);
        return response.data;
    } catch (err) {
        console.log(err.message);
    }
}

// Login a user
export const LoginUser = async (value) => {
    try {
        const response = await axiosInstance.post('/login', value);
        return response.data;
    } catch (err) {
        console.log(err.message);
    }
}