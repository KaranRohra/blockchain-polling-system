import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "components/Register";
import Auth from "components/Auth";
import Home from "components/Home";
import { UserAuthContextProvider } from "context/UserAuthContext";
import ProtectedRoute from "routes/ProtectedRoute";
import PollDetails from "components/PollDetails";
import Header from "components/Header";

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
                        <Route
                            path="/polls/create"
                            element={
                                <ProtectedRoute>
                                    <Header />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/polls/:pollId"
                            element={
                                <ProtectedRoute>
                                    <Header />
                                    <PollDetails />
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
