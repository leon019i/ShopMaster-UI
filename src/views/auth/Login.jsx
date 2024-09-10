import React, { useState, useEffect } from 'react';
import { login } from '../../utils/auth';
import { useNavigate, Link } from 'react-router-dom';
import { userAuthStore } from '../../store/auth';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const isLoggedIn = userAuthStore((state) => state.isLoggedIn);

    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    const resetForm = () => {
        setEmail("");
        setPassword("");
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { error } = await login(email, password); // Await the async login function
            if (error) {
                alert(error);
            } else {
                resetForm();
                navigate("/");
            }
        } catch (err) {
            console.error('Login failed:', err);
            alert('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false); // Ensure isLoading is reset even if an error occurs
        }
    };

    return (
        <section>
            <main className="" style={{ marginBottom: 100, marginTop: 50 }}>
                <div className="container">
                    <section className="">
                        <div className="row d-flex justify-content-center">
                            <div className="col-xl-5 col-md-8">
                                <div className="card rounded-5">
                                    <div className="card-body p-4">
                                        <h3 className="text-center">Login</h3>
                                        <br />

                                        <div className="tab-content">
                                            <div
                                                className="tab-pane fade show active"
                                                id="pills-login"
                                                role="tabpanel"
                                                aria-labelledby="tab-login"
                                            >
                                                <form onSubmit={handleLogin}>
                                                    {/* Email input */}
                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="Full Name">
                                                            Email Address
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="username"
                                                            name="username"
                                                            className="form-control"
                                                            placeholder="Email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                    </div>

                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="loginPassword">
                                                            Password
                                                        </label>
                                                        <input
                                                            type="password"
                                                            id="password"
                                                            name="password"
                                                            className="form-control"
                                                            placeholder="Password"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                        />
                                                    </div>

                                                    {isLoading ? (
                                                        <button className="btn btn-primary w-100" type="submit" disabled>
                                                            <span className="mr-2">Processing </span>
                                                            <i className="fas fa-spinner fa-spin" />
                                                        </button>
                                                    ) : (
                                                        <button className="btn btn-primary w-100" type="submit">
                                                            <span className="mr-2">Sign In </span>
                                                            <i className="fas fa-sign-in-alt" />
                                                        </button>
                                                    )}

                                                    <div className="text-center">
                                                        <p className="mt-4">
                                                            Don't have an account? <Link to="/register">Register</Link>
                                                        </p>
                                                        <p className="mt-0">
                                                            <Link to="/forgot-password/" className="text-danger">Forgot Password?</Link>
                                                        </p>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </section>
    );
}

export default Login;
