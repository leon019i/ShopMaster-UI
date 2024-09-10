import React, { useState } from 'react';
import apiInstance from '../../utils/axios';
import { useNavigate, Link } from 'react-router-dom';

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false); // To manage loading state
    const [errorMessage, setErrorMessage] = useState(""); // For error messages
    const [successMessage, setSuccessMessage] = useState(""); // For success messages

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Basic validation
        if (!email) {
            setErrorMessage("Email is required.");
            return;
        }

        setIsLoading(true); // Start loading
        setErrorMessage(""); // Reset any previous error
        setSuccessMessage(""); // Reset success message

        try {
            const res = await apiInstance.get(`user/password-reset/${email}/`);
            setSuccessMessage("An email has been sent to you. Please check your inbox.");
            setTimeout(() => {
                navigate('/create-new-password'); // Navigate after success
            }, 2000); // Wait 2 seconds before navigating
        } catch (error) {
            console.error(error);
            setErrorMessage("Email does not exist or an error occurred.");
        } finally {
            setIsLoading(false); // End loading
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
                                        <h3 className="text-center">Forgot Password</h3>
                                        <br />

                                        <div className="tab-content">
                                            <div
                                                className="tab-pane fade show active"
                                                id="pills-login"
                                                role="tabpanel"
                                                aria-labelledby="tab-login"
                                            >
                                                <form onSubmit={handleSubmit}>
                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="email">
                                                            Email Address
                                                        </label>
                                                        <input
                                                            type="email"
                                                            id="email"
                                                            name="email"
                                                            className="form-control"
                                                            placeholder="Enter your email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            required
                                                        />
                                                    </div>


                                                    <div className="text-center">
                                                        <button
                                                            className="btn btn-primary w-100 mb-4"
                                                            type="submit"
                                                            disabled={isLoading} // Disable button when loading
                                                        >
                                                            {isLoading ? (
                                                                <>
                                                                    Sending... <i className="fas fa-spinner fa-spin"></i>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    Send Email <i className="fas fa-paper-plane"></i>
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>

                                                    {/* Show error message */}
                                                    {errorMessage && (
                                                        <div className="alert alert-danger" role="alert">
                                                            {errorMessage}
                                                        </div>
                                                    )}

                                                    {/* Show success message */}
                                                    {successMessage && (
                                                        <div className="alert alert-success" role="alert">
                                                            {successMessage}
                                                        </div>
                                                    )}

                                                    <div className="text-center">
                                                        <p>Not a member? <Link to={'/register'}>Register</Link></p>
                                                        <p>Want to sign in? <Link to={'/login'}>Login</Link></p>
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

export default ForgotPassword;
