import React from "react";
import "./Sousnav.css"; // Import du fichier CSS
import { Link } from "react-router-dom";

const Sousnav = () => {
  return (
    <div className="sous-nav">
      <div className="onglet">
        <Link to="/actualites">Actualité</Link>
      </div>
      <div className="separator"></div>
      <div className="onglet">
        <Link to="/commandes">Commande</Link>
      </div>
      <div className="separator"></div>
      <div className="onglet">
        <Link to="/Sav">Service</Link>
      </div>
    </div>
  );
};

export default Sousnav;
