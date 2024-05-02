import React from "react";
import Sousnav from "./Sousnav";
import Navigation from "./Navigation";
import "./Profil.css";
import You from "./You";
import YouInfo from "./YouInfo";

const MyProfil = () => {
  return (
    <div>
      <Navigation />
      <div className="contente">
        <Sousnav />
        <You />
        <YouInfo />
      </div>
    </div>
  );
};

export default MyProfil;
