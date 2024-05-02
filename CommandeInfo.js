import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sousnav from "./Sousnav";
import Navigation from "./Navigation";
import axios from 'axios';

const CommandeInfo = () => {
    // Récupérer le numéro de commande depuis les paramètres de l'URL
    let { numeroCommande } = useParams();
    const [commande, setCommande] = useState(null);

    useEffect(() => {
        const fetchCommande = async () => {
            try {
                const response = await axios.get(`http://localhost:5177/api/Products/getCommande/${numeroCommande}`);
                const data = response.data;
                console.log(data);
                setCommande(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données de la commande :", error);
            }
        };

        fetchCommande();
    }, [numeroCommande]); // Exécuter ce useEffect lorsque le numéro de commande change

    return (
        <div>
            <Navigation />
            <Sousnav />
            <div className="commande-info-container">
                {commande ? (
                    <>
                        <h2>Informations générales de la commande {numeroCommande}</h2>
                        <p>Date de commande : {commande.dateDeLivraisonCommande}</p>
                        <p>Statut : {commande.statutCommande}</p>
                        {/* Ajoutez d'autres informations de commande */}
                    </>
                ) : (
                    <p>Chargement en cours...</p>
                )}
            </div>
        </div>
    );
};

export default CommandeInfo;
