import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Admin.css";

const Admin = () => {
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
        <div className="pageadmin">
            <h2 className="h2admin">Bonjour monsieur Dupont</h2>
            <div>
                <h3 className="h3admin">Gestion Client</h3>
                <div className="alla">
                    <div className="alladmin">
                        <div>
                            <div className="padmin">
                                <p>Accéder à une vue utilisateur</p>
                            </div>
                        </div>
                        {/* Le reste du code pour la vue utilisateur */}
                    </div>
                    <div className="alladmin">
                        <div>
                            <div className="padmin">
                                <p>Supprimer l'utilisateur sélectionné</p>
                            </div>
                        </div>
                        <div className="container-select">
                            <div>
                                <select
                                    className="admin-select"
                                    name="delete"
                                    id="delete-select"
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
                                <button onClick={handleDelete} className="btn-admin" id="bouton">
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
