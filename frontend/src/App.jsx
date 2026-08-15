// ============================================================
// File: App.jsx
// Purpose: Root component of HMSPro.
// ============================================================

import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.jsx";

import AppRoutes from "./routes/AppRoutes.jsx";


// ============================================================
// HMSPro Application
// ============================================================

function App() {

    return (

        <BrowserRouter>

            <AuthProvider>

                <AppRoutes />

            </AuthProvider>

        </BrowserRouter>

    );

}


export default App;