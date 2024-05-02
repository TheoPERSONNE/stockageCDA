import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ModifArticle.css";

const ModifArticle = () => {
    const [articles, setArticles] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [newValues, setNewValues] = useState({
        titre: "",
        sousTitre: "",
        description: "",
        actif: 0 // Initialisez avec 0 (inactif) par défaut
    });

    useEffect(() => {
        // Effectuer une requête GET pour récupérer les articles
        const fetchArticles = async () => {
            try {
                const response = await axios.get("http://localhost:5177/api/Products/getArticle");
                setArticles(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des articles :", error);
            }
        };

        fetchArticles();
    }, []);

    const handleOpenPopup = (article) => {
        setSelectedArticle(article);
        setNewValues({
            titre: article.titre,
            sousTitre: article.sousTitre,
            description: article.description,
            actif: article.actif
        });
    };

    const handleClosePopup = () => {
        setSelectedArticle(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            // Effectuer une requête PUT pour mettre à jour l'article
            const response = await axios.put(`http://localhost:5177/api/Products/updateArticle/${selectedArticle.idArticle}`, newValues);
            console.log("Réponse de la requête PUT :", response);
            // Mettre à jour localement les données de l'article modifié
            const updatedArticles = articles.map(article => {
                if (article.idArticle === selectedArticle.idArticle) {
                    return {
                        ...article,
                        titre: newValues.titre,
                        sousTitre: newValues.sousTitre,
                        description: newValues.description,
                        actif: newValues.actif
                    };
                } else {
                    return article;
                }
            });
            setArticles(updatedArticles);
            // Fermer la pop-up de modification
            handleClosePopup();
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'article :", error);
        }
    };

    return (
        <div>
            <h2>Modifier un article</h2>
            <table>
                <thead>
                    <tr>
                        <th>Titre</th>
                        <th>Sous-titre</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map(article => (
                        <tr key={article.idArticle}>
                            <td>{article.titre}</td>
                            <td>{article.sousTitre}</td>
                            <td>{article.description}</td>
                            <td>
                                <button onClick={() => handleOpenPopup(article)}>Modifier</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pop-up de modification */}
            {selectedArticle && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={handleClosePopup}>&times;</span>
                        <h3>Modifier l'article</h3>
                        <label>
                            Titre:
                            <input
                                type="text"
                                name="titre"
                                value={newValues.titre}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Sous-titre:
                            <input
                                type="text"
                                name="sousTitre"
                                value={newValues.sousTitre}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Actif:
                            <input
                                type="number"
                                name="actif"
                                value={newValues.actif}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Description:
                            <textarea
                                name="description"
                                value={newValues.description}
                                onChange={handleChange}
                            />
                        </label>
                        <button onClick={handleSubmit}>Enregistrer</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModifArticle;
