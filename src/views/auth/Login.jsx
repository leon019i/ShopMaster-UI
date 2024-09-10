import React, { useState, useEffect } from 'react'
import { login } from '../../utils/auth'
import { useNavigate, Link } from 'react-router-dom'
import { userAuthStore } from '../../store/auth'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const isLoggedIn = userAuthStore((state) => state.isLoggedIn)

    console.log(email);

    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/')
        }
    }, [isLoggedIn, navigate]) // Added dependency array

    const resetForm = () => {
        setEmail("")
        setPassword("")
    }

    const handleLogin = (e) => {
        e.preventDefault() // Corrected the typo here
        setIsLoading(true)

        const { error } = login(email, password)
        if (error) {
            alert(error)
        } else {
            navigate("/")
            resetForm()
        }
        setIsLoading(false)
    }

    return (
        <div>
            <h2>Welcome Back</h2>
            <p>Login To Continue</p>
            <form onSubmit={handleLogin}>
                <input type="text"
                    name='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <br />
                <input type="password"
                    name='password'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login
