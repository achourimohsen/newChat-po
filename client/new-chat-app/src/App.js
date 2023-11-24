import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";

import ChatPage from "./components/ChatPage";
import LoginRgister from "./components/Login-Rgister";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginRgister />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
