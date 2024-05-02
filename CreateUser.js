import React, { useState, useEffect } from "react";
import './CreateUser.css';
import { Link } from "react-router-dom";
import logo from "./ELECTONICSBas.png";

function CreateUser() {
    const [formData, setFormData] = useState({
    
        nom: "",
        prenom: "",
        email: "",
        telephone: 0,
        role: "",
        photopath: "",
        age: 5,
        newsletter: true,
        ville: "",
        codePostal: 87654,
        numeroclient: "",
        motdepasse: ""
    });

    const [nextId, setNextId] = useState(1);

    useEffect(() => {

        const fetchNextId = async () => {
            try {
                const response = await fetch("http://localhost:5177/api/Products/getUtilisateur");
                if (response.ok) {
                    const existingUsers = await response.json();
                    const maxId = Math.max(...existingUsers.map(user => user.idUtilisateur), 0); 
                    setNextId(maxId + 1); // Set the next available ID
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des ID utilisateur :", error.message);
            }
        };

        fetchNextId();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          
            console.log("Contenu de formData avant l'envoi du formulaire :", setFormData);

            const response = await fetch("http://localhost:5177/api/Products/ajout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Utilisateur créé avec succès !", data);

                setFormData(prevState => ({
                    ...prevState,
                    idUtilisateur: String(nextId) 
                }));
            } else {
                console.error("Erreur lors de la création de l'utilisateur :", data);
            }
        } catch (error) {
            console.error("Erreur lors de la création de l'utilisateur :", error.message);
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
                <h1 className="titrePrincipaleCreateUser">Créer un utilisateur</h1>
                <form className="formCreateUser" onSubmit={handleSubmit}>
                   
                    <div className="form-group">
                        <label htmlFor="nom">Nom</label>
                        <input type="text" id="nom" name="nom" className="form-control" value={formData.nom} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="prenom">Prenom</label>
                        <input type="text" id="prenom" name="prenom" className="form-control" value={formData.prenom} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="telephone">Telephone</label>
                        <input type="number" id="telephone" name="telephone" className="form-control" value={formData.telephone} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <input type="text" id="role" name="role" className="form-control" value={formData.role} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="photopath">Photo Path</label>
                        <input type="text" id="photopath" name="photopath" className="form-control" value={formData.photopath} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input type="number" id="age" name="age" className="form-control" value={formData.age} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newsletter">Newsletter</label>
                        <input type="number" id="newsletter" name="newsletter" className="form-control" value={formData.newsletter} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="ville">Ville</label>
                        <input type="text" id="ville" name="ville" className="form-control" value={formData.ville} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="codePostal">Code Postal</label>
                        <input type="number" id="codePostal" name="codePostal" className="form-control" value={formData.codePostal} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="numeroclient">Numéro Client</label>
                        <input type="text" id="numeroclient" name="numeroclient" className="form-control" value={formData.numeroclient} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="motdepasse">Mot De Passe</label>
                        <input type="text" id="motdepasse" name="motdepasse" className="form-control" value={formData.motdepasse} onChange={handleChange} />
                    </div>

                    <button type="submit" className="btn btn-primary">Creer Utilisateur</button>
                </form>
            </div>
        </div>
    );

}
export default CreateUser;


