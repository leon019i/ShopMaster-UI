import { userAuthStore } from "../store/auth";

import axios from './axios'
import jwt_decode from 'jwt-decode'
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true
})

export const login = async (email, password) => {
    try {
        const response = await axios.post("user/token/", { email, password });

        if (response && response.data && response.status === 200) {
            const { data } = response;
            setAuthUser(data.access, data.refresh);
            Toast.fire({
                icon: "success",
                title: "Login Successfull"

            })
            // Alert - Sign In Successfully
            return { data, error: null };
        } else {
            throw new Error('Unexpected response structure');

        }
    } catch (error) {
        console.log("Login error:", error);

        return {
            data: null,
            error: error.response?.data?.detail || error.message || 'Something went wrong'
        };
    }
}

// export const register = async (full_name, email, phone, password, password2) => {
//     try {
//         const { data } = await axios.post('user/register/', {
//             full_name, email, phone, password, password2
//         })
//         await login(email, password)
//         // Alert - Signed Up Successfully
//         return { data, error: null }
//     }
//     catch (error) {
//         return {
//             data: null,
//             error: error.response?.data?.detail || 'Something went wrong'
//         }
//     }
// }


export const register = async (full_name, email, phone, password, password2) => {
    try {
        const { data } = await axios.post('user/register/', {
            full_name, email, phone, password, password2
        });

        await login(email, password);
        Toast.fire({
            icon: "success",
            title: "Account Created Successfully"

        })
        return { data, error: null };
    } catch (error) {
        console.error('Registration error:', error.response?.data || error.message);

        return {
            data: null,
            error: error.response?.data?.detail || 'Something went wrong'
        };
    }
};

export const logout = () => {
    Cookies.remove("access_token")
    Cookies.remove("refresh_token")
    userAuthStore.getState().setUser(null)

    // Alert - Signed Out Successfully
}

export const setUser = async () => {
    const accessToken = Cookies.get("access_token")
    const refreshToken = Cookies.get("refresh_token")
    if (!accessToken || !refreshToken) {
        return;
    }
    if (isAccessTokenExpired(accessToken)) {
        const response = await getRefreshToken(refreshToken)
        setAuthUser(response.access, response.refresh)
    } else {
        setAuthUser(accessToken, refreshToken)
    }
}

export const setAuthUser = (access_token, refresh_token) => {
    Cookies.set('access_token', access_token,
        {
            expires: 1,
            secure: true
        }
    )
    Cookies.set('refresh_token', refresh_token,
        {
            expires: 7,
            secure: true
        })
    const user = jwt_decode(access_token) ?? null

    if (user) {
        userAuthStore.getState().setUser(user)
    }
    userAuthStore.getState().setLoading(false)
}


export const getRefreshToken = async () => {
    const refresh_token = Cookies.get("refresh_token")
    const response = await axios.post('user/token/refresh/', { refresh: refresh_token })
    return response.data
}

export const isAccessTokenExpired = (accessToken) => {
    try {
        const decodedToken = jwt_decode(accessToken)
        return decodedToken.exp < Date.now() / 100

    } catch (error) {
        console.log(error);
        return True
    }
}