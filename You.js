import React from "react";
import { Link } from "react-router-dom";
import pp from "./pp.jpg";
import "./You.css";

const You = () => {
  return (
    <div className="you-container">
      <div className="info-container">
        <h2>Maria Dupont</h2>
        <p>
          <Link to="/Modification" className="textProfil">
            Modifier mes info
          </Link>
        </p>
        <p className="textProfil">Réinitialiser mon mot de passe</p>
      </div>
      <div className="photo-container">
        <img
          src={pp}
          alt="Article 3"
          className="photo"
          width="150"
          height="150"
        />
        <p className="youp">Modifier ma photo</p>
      </div>
    </div>
  );
};

export default You;
