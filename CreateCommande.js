import React, { useState } from "react";
import './CreateUser.css';
import { Link } from "react-router-dom";
import logo from "./ELECTONICSBas.png";

function CreateCommande() {
    const [formCommande, setFormCommande] = useState({
        numeroCommande: "",
        statutCommande: "",
        numeroClient: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormCommande(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Contenu de formData avant l'envoi du formulaire :", formCommande);

            const response = await fetch("http://localhost:5177/api/Products/ajoutCommande", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formCommande)
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Commande créée avec succès !", data);

                setFormCommande(prevState => ({
                    ...prevState,
                    idCommande: data.idCommande
                }));
            } else {
                console.error("Erreur lors de la création de la commande :", data);
            }
        } catch (error) {
            console.error("Erreur lors de la création de la commande :", error.message);
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
                <h1 className="titrePrincipaleCreateUser">Créer une commande</h1>
                <form className="formCreateUser" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="numerodelacommande">Numero De La Commande</label>
                        <input type="text" id="numerodelacommande" name="numeroCommande" className="form-control" value={formCommande.numeroCommande} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="statutcommande">Statut De La Commande</label>
                        <input type="text" id="statutcommande" name="statutCommande" className="form-control" value={formCommande.statutCommande} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="numeroClient">Numéro Client</label>
                        <input type="text" id="numeroClient" name="numeroClient" className="form-control" value={formCommande.numeroClient} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Créer Une Commande</button>
                </form>
            </div>
        </div>
    );
}

export default CreateCommande;
