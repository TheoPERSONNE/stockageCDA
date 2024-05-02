import React, { useState } from "react";
import Sousnav from "./Sousnav";
import Navigation from "./Navigation";
import "./Nouvelleuser.css";

const AjoutArticle = () => {
    const [article, setArticle] = useState({
        titre: "",
        soustitre: "",
        discriptif: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArticle({ ...article, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://localhost:7162/api/Products/ajoutArticle/ajoutArticle", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(article),
            });

            if (response.ok) {
                const newArticle = await response.json();
                console.log("Nouvel utilisateur ajouté :", newArticle);

            } else {
                console.error("Erreur lors de l'ajout de l'utilisateur :", response.statusText);
            }
        } catch (error) {
            console.error("Erreur lors de la requête :", error);
        }
    };
    return (
        <div>
            <Navigation />
            <Sousnav />
            <div className="nouvelle-article">
                <h1>Nouvel article</h1>
                <div>
                    <p>Veuillez entrer les informations correspondantes pour la création d'un nouvel article</p>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="titre-input">
                            Titre:
                            <input
                                type="text"
                                id="titre-input"
                                name="titre"
                                value={article.titre}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label htmlFor="soustitre-input">
                            Sous-Titre:
                            <input
                                type="text"
                                id="soutitre-input"
                                name="soustitre"
                                value={article.soustitre}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        <label htmlFor="descrptif-input">
                            Descriptif:
                            <input
                                type="text"
                                id="descriptif-input"
                                name="descriptif"
                                value={article.descriptif}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label htmlFor="descriptif-select">
                            actif:
                            <select
                                id="actif-select"
                                name="actif"
                                value={article.actif}
                                onChange={handleChange}
                                required
                            >
                                <option value="selection">Valeur</option>
                                <option value="admin">Actif</option>
                                <option value="utilisateur">Inactif</option>
                            </select>
                        </label>
                        <div className="btnA-savdiv">
                            <button type="submit" className="btnA-sav" id="boutonA">
                                Envoyer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AjoutArticle;