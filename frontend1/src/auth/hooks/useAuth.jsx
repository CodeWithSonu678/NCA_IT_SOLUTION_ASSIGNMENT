import { register } from "../service";

export const registerHandle = async (
    username,
    email,
    mobile,
    password
) => {
    try {
        const response = await register(
            username,
            email,
            mobile,
            password
        );


        return response.data;

    } catch (error) {
        const message =
            error.response?.data?.message ||
            error.message ||
            "Registration failed!";

        console.error("Registration error:", message);

        return {
            success: false,
            message,
        };
    }


};
