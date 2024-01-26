import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AccountMenu from './components/menu/menu';
import SignUp from './pages/SignUpPage/SignUpPage';
import SignIn from './pages/SignInPage/SignInPage';
import UserProfile from './pages/UserProfilePage/UserProfilePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import HomePage from './pages/HomePage/HomePage';
import PrivateRoute from './components/private-route/private-route';

function App() {
    return (
        <Router>
            <div>
                { < AccountMenu /> }
                <Routes>
                    <Route path="/" exact element={< HomePage />} />
                    <Route path="/signup" element={< SignUp />} />
                    <Route path="/signin" element={< SignIn />} />
                    <Route 
                        path="/profile" 
                        element={
                            <PrivateRoute>
                            < UserProfile />
                            </PrivateRoute>
                        } 
                    />
                    <Route path="*" element={< NotFoundPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;