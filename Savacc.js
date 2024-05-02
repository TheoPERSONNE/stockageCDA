import React from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import Sousnav from "./Sousnav";
import "./Savacc.css";
import ban1 from "./templateSAV.jpg";
import imgForm from "./logoForm.jpg";

const Savacc = () => {
    return (
        <div>
            <Navigation />
            <div className="allSAV">
                <Sousnav />
                <h1 className="TitreSAV">SAV</h1>
                <img src={ban1} className="ban" alt="banniere" />
                <div className="Container-haut">
                    <h3>Déclaration d'incident</h3>
                    <Link to="/Tickethist" className="btn btn-primary" id="bouton">
                        Toutes mes déclarations
                    </Link>
                </div>
                <form>
                    <h3>Saisissez vos informations ici</h3>
                    <div>
                        <label htmlFor="nom">Nom</label>
                        <input type="text" id="nom" placeholder="Qui êtes-vous ?" />
                    </div>
                    <div>
                        <label htmlFor="mail">Mail</label>
                        <input type="text" id="mail" placeholder="Quelle est votre adresse Mail ?" />
                    </div>
                    <div>
                        <label htmlFor="probleme">Sélectionner votre problème</label>
                        <select id="probleme">
                            <option value="">-- Choisissez un problème --</option>
                            <option value="probleme1">Problème 1</option>
                            <option value="probleme2">Problème 2</option>
                            <option value="probleme3">Problème 3</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="numeroCommande">Numéro de commande</label>
                        <input type="text" id="numeroCommande" placeholder="Numéro de commande" />
                    </div>
                    <div>
                        <label htmlFor="msg">Information complémentaire</label>
                        <textarea id="msg" placeholder="Tapez ici votre message"></textarea>
                    </div>
                    <input class="button" type="submit" value="Envoyer" />
                </form>

            </div>
        </div>
    );
};

export default Savacc;
