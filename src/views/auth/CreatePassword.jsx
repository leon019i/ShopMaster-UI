import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

function CreatePassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);  // For error feedback
    const [isLoading, setIsLoading] = useState(false);  // Loading state
    const [successMessage, setSuccessMessage] = useState(null); // Success message

    const [searchParam] = useSearchParams();
    const otp = searchParam.get("otp");
    const uidb64 = searchParam.get("uidb64");

    const navigate = useNavigate();

    // Form validation and submission handler
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);

        // Client-side validation: ensure passwords match and are sufficiently strong
        if (password.length < 8) {
            setErrorMessage("Password must be at least 8 characters long.");
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        // Show loading state
        setIsLoading(true);

        try {
            // Simulate an API call for password reset
            const formdata = {
                password,
                otp,
                uidb64
            };

            // Replace with your actual API call
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay for API call

            setSuccessMessage("Password reset successfully! Redirecting to login...");
            setTimeout(() => {
                navigate('/login');  // Redirect to login page after success
            }, 2000);
        } catch (error) {
            setErrorMessage("There was an issue resetting the password. Please try again.");
        } finally {
            setIsLoading(false);
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
                                        <h3 className="text-center">Create New Password</h3>
                                        <br />

                                        <div className="tab-content">
                                            <div className="tab-pane fade show active" id="pills-login" role="tabpanel">
                                                <form onSubmit={handlePasswordSubmit}>
                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="password">
                                                            Enter New Password
                                                        </label>
                                                        <input
                                                            type="password"
                                                            id="password"
                                                            required
                                                            className="form-control"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                        />
                                                    </div>

                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="confirmPassword">
                                                            Confirm New Password
                                                        </label>
                                                        <input
                                                            type="password"
                                                            id="confirmPassword"
                                                            required
                                                            className="form-control"
                                                            value={confirmPassword}
                                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                                        />
                                                    </div>

                                                    {/* Display error messages */}
                                                    {errorMessage && (
                                                        <div className="alert alert-danger" role="alert">
                                                            {errorMessage}
                                                        </div>
                                                    )}

                                                    {/* Display success messages */}
                                                    {successMessage && (
                                                        <div className="alert alert-success" role="alert">
                                                            {successMessage}
                                                        </div>
                                                    )}

                                                    <div className="text-center">
                                                        <button
                                                            type="submit"
                                                            className="btn btn-primary w-100"
                                                            disabled={isLoading}
                                                        >
                                                            {isLoading ? "Processing..." : "Reset Password"}
                                                        </button>
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

export default CreatePassword;
