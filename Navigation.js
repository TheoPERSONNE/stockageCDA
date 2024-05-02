import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import logo from "./ELECTONICSBas.png";

const Navigation = () => {
    // Fonction de déconnexion
    const handleLogout = () => {
        // Supprimer le token du localStorage
        localStorage.removeItem('authToken');
        // Rediriger vers la page de connexion ou une autre page appropriée
        window.location.href = '/'; 
    };

    return (
        <nav className="navbar">
            <div className="logo-container">
                {/* Utilisation de Link pour créer un lien vers la page d'accueil */}
                <Link to="/Accueil">
                    <img src={logo} alt="Logo" className="logo" />
                </Link>
            </div>
            <div className="nav-links">
                <Link to="/profil">Profil</Link>
                {/* Appel de la fonction handleLogout lors du clic sur le bouton */}
                <button onClick={handleLogout}>Déconnexion</button>
            </div>
        </nav>
    );
};

export default Navigation;
