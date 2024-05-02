import React, { useState, useEffect } from "react";
import './CreateUser.css';
import { Link } from "react-router-dom";
import logo from "./ELECTONICSBas.png";

function CreateArticle() {
    const [formArticle, setFormArticle] = useState({

        titre: "",
        sousTitre: "",
        description: "",
        actif: "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormArticle(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            console.log("Contenu de formArticel avant l'envoi du formulaire :", setFormArticle);

            const response = await fetch("http://localhost:5177/api/Products/ajoutArticle", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formArticle)
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Commande créé avec succès !", data);

                setFormArticle(prevState => ({
                    ...prevState,
                    idArticle: String(formArticle)
                }));
            } else {
                console.error("Erreur lors de la création de l'article :", data);
            }
        } catch (error) {
            console.error("Erreur lors de la création de l'article :", error.message);
        }
    };

    return (
        <div>
            <div className="containerLogoAdmin">
                <Link to="/Accueil">
                    <img src={logo} alt="Logo" className="logoNavAdmin" />
                </Link>
            </div>
            <div className="containerCreateUser">
                <h1 className="titrePrincipaleCreateUser">Créer un article</h1>
                <form className="formCreateUser" onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="titre">Titre</label>
                        <input type="text" id="titre" name="titre" className="form-control" value={formArticle.titre} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="soustitre">Sous-Titre</label>
                        <input type="text" id="soustitre" name="sousTitre" className="form-control" value={formArticle.sousTitre} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="descritpion">Description</label>
                        <input type="text" id="descritpion" name="description" className="form-control" value={formArticle.description} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="actif">Actif</label>
                        <input type="text" id="actif" name="actif" className="form-control" value={formArticle.actif} onChange={handleChange} required />
                    </div>


                    <button type="submit" className="btn btn-primary">Creer Un Article</button>
                </form>
            </div>
        </div>
    );

}
export default CreateArticle;


