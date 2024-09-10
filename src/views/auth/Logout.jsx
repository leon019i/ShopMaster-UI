import { useEffect, useState } from 'react';
import { logout } from '../../utils/auth';
import { Link, useNavigate } from 'react-router-dom';

function Logout() {
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function handleLogout() {
            try {
                await logout(); // Assuming logout is an async function that handles session removal
                setIsLoggedOut(true);
                // Redirect after a brief delay (optional)
                setTimeout(() => {
                    navigate('/login');
                }, 4000); // Redirect after 2 seconds
            } catch (error) {
                console.error("Failed to logout:", error);
            }
        }

        handleLogout();
    }, [navigate]);

    return (
        <>
            <main style={{ marginBottom: 100, marginTop: 50 }}>
                <div className="container">
                    <section>
                        <div className="row d-flex justify-content-center">
                            <div className="col-xl-5 col-md-8">
                                <div className="card rounded-5">
                                    <div className="card-body p-4 text-center">
                                        {isLoggedOut ? (
                                            <>
                                                <h3>You have been logged out</h3>
                                                <p>Redirecting to login...</p>
                                                <div className="mt-3">
                                                    <Link className="btn btn-primary" to="/register">
                                                        Register <i className="fas fa-user-plus"></i>
                                                    </Link>
                                                    <Link className="btn btn-primary mx-4" to="/login">
                                                        Login <i className="fas fa-sign-in"></i>
                                                    </Link>
                                                </div>
                                            </>
                                        ) : (
                                            <div>
                                                <p>Logging you out...</p>
                                                <div className="spinner-border text-primary" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

export default Logout;
