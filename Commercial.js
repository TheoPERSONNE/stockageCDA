import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import manquant
import "./Commercial.css";

const Commercial = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");

    useEffect(() => {
        // Effectuer une requête GET pour récupérer la liste des utilisateurs
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:5177/api/Products/getUtilisateur");
                setUsers(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des utilisateurs :", error);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async () => {
        try {
            console.log("Utilisateur sélectionné :", selectedUser);
            const response = await axios.delete(`http://localhost:5177/api/Products/deleteUtilisateur/${selectedUser.idUtilisateur}`);
            console.log("Réponse de la requête DELETE :", response);
            // Logique supplémentaire après la suppression, si nécessaire
            console.log(`L'utilisateur avec l'ID ${selectedUser.idUtilisateur} a été supprimé avec succès.`);
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur :", error);
        }
    };

    return (
        <div className="allcommercial">
            <h2>Bonjour monsieur Dupont</h2>
            <div className="boitegestion">
                <div>
                    <h3>Gestion Client</h3>
                </div>
                <div className="containerselectcommercial">
                <div>
                    <p>Supprimer un Utilisateur</p>
                </div>
                <div>
                    <select
                        name="utilisateur"
                        className="utilisateur-select"
                        onChange={(e) => setSelectedUser(JSON.parse(e.target.value))}
                    >
                        <option value=""></option>
                        {users.map((user, index) => (
                            <option key={index} value={JSON.stringify(user)}>
                                {user.nom} {user.prenom}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <button onClick={handleDelete} className="btn-savc" id="bouton">
                        Supprimer
                    </button>
                </div>
                <div>
                    <p>Acceder a une vue Utilisateur</p>
                </div>
                <div>
                    <select
                        name="utilisateur"
                        className="utilisateur-select"
                    >
                        <option value=""></option>
                       
                    </select>
                </div>
                <div>
                    <button className="btn-savc" id="bouton">
                        Acceder
                    </button>
                </div>
                </div>
                <div className="linkcommercial">
                    <Link to="/Commercial" className="btn-savc" id="bouton">
                        Acceder a la vue
                    </Link>
                    <Link to="/createUser" className="btn-savc" id="bouton">
                        Creer un utilisateur
                    </Link>
                    <Link to="/createCommande" className="btn-savc" id="bouton">
                        Creer une commande
                    </Link>
                    <Link to="/GestionArticle" className="btn-savc" id="bouton">
                        Gestion article
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Commercial;
