import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "components/Register";
import Auth from "components/Auth";
import Home from "components/Home";
import { UserAuthContextProvider } from "context/UserAuthContext";
import ProtectedRoute from "routes/ProtectedRoute";

function App() {
    return (
        <div>
            <Router>
                <UserAuthContextProvider>
                    <Routes>
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <Home />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </UserAuthContextProvider>
            </Router>
        </div>
    );
}

export default App;
