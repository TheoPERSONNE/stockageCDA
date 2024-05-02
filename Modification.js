import React from "react";
import { Link } from "react-router-dom";
import Sousnav from "./Sousnav";
import Navigation from "./Navigation";
import "./Modification.css";

const Modification = () => {
  return (
    <div>
      <Navigation />
      <div className="allmodif">
              <Sousnav />
              <h1 className="titreModif">Modifier vos information</h1>
        <div>
                  <p className="infoAdresse">Veuillez changer les information erronées</p>
          <div className="columnform">
            <div>
              <p className="empla">Nom :</p>
              <p className="empla">Prénom :</p>
              <p className="empla">Téléphone :</p>
              <p className="empla">Fixe :</p>
              <p className="empla">Ville :</p>
              <p className="empla">Email :</p>
            </div>
            <div className="inputmodif">
              <div>
                <label for="nom-select">
                  {" "}
                  <input
                    className="empla"
                    placeholder="Dupont"
                    type="text"
                    id="desc"
                    name="description"
                    rows="2"
                    cols="10"
                  ></input>
                </label>
              </div>
              <div>
                <label for="prenom-select">
                  <input
                    className="empla"
                    placeholder="Maria"
                    type="text"
                    id="desc"
                    name="description"
                    rows="2"
                    cols="10"
                  ></input>
                </label>
              </div>
              <label for="telephone-select">
                <input
                  className="empla"
                  placeholder="0678654587"
                  type="text"
                  id="desc"
                  name="description"
                  rows="2"
                  cols="10"
                ></input>
              </label>
              <label for="fixe-select">
                <input
                  className="empla"
                  placeholder="0125675645"
                  type="text"
                  id="desc"
                  name="description"
                  rows="2"
                  cols="10"
                ></input>
              </label>
              <label for="ville-select">
                <input
                  className="empla"
                  placeholder="Paris"
                  type="text"
                  id="desc"
                  name="description"
                  rows="2"
                  cols="10"
                ></input>
              </label>
              <label for="email-select">
                <input
                  className="empla"
                  placeholder="maria.dupont@hotmail.com"
                  type="text"
                  id="desc"
                  name="description"
                  rows="2"
                  cols="10"
                ></input>
              </label>
              <div className="btn-savdiv"></div>
            </div>
          </div>
          <Link to="/Acceuil" className="btn-savm">
            Envoyer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Modification;
