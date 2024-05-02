import React from "react";
import { Link } from "react-router-dom";
import "./GestionArticle.css"; // Import du fichier CSS pour les styles

const GestionArticle = () => {
    return (
        <div className="gestion-article-container">
            <h2>Gestion des articles</h2>
            <div className="action-links">
                <Link to="/createArticle" className="action-link">
                    Creer un article
                </Link>
                <Link to="/ModifArticle" className="action-link">
                    Modifier un article
                </Link>
            </div>
        </div>
    );
};

export default GestionArticle;
