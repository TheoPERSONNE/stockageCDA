import React, { useState, useEffect } from "react";
import "./TicketInfo.css";
import Sousnav from "./Sousnav";
import Navigation from "./Navigation";
import axios from 'axios';

const TicketInfo = () => {
    const [userNumeroClient, setUserNumeroClient] = useState('');
    const [userRole, setUserRole] = useState('');
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        const getUserInfo = async () => {
            try {
                const response = await axios.get('https://localhost:5177/api/Products/userinfo', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const { userNumeroClient, userRole } = response.data;

                setUserNumeroClient(userNumeroClient);
                setUserRole(userRole);

                const ordersResponse = await axios.get(`https://localhost:7162/api/Products/getTicket/${userNumeroClient}`);
                setOrders(ordersResponse.data);
                console.log(ordersResponse);

            } catch (error) {
                console.error("Erreur lors de la récupération des informations de l'utilisateur :", error);
            }
        };

        getUserInfo();
    }, []);

    const sortedOrders = orders.map((order, index) => ({
        IdTicket: order.idTicket || `N/A-${index}`,
        StatutTicket: order.statutTicket || 'N/A',
        ProblemeTicket: order.problemeTicket || 'N/A',
        DescriptionTicket: order.descriptionTicket || 'N/A',
        CommencementTicket: order.commencementTicket || null, // Ajout de la propriété CommencementTicket
    })).sort((a, b) => a.IdTicket - b.IdTicket);

    return (
        <div>
            <Navigation />
            <Sousnav />
            <div className="ticket-info-container">
                <h2>Détails du Ticket SAV</h2>
                <p className="infoAdresse">
                    <strong>Numéro de ticket :</strong> {sortedOrders[0]?.IdTicket || 'N/A'}
                </p>
                <p className="infoAdresse">
                    <strong>Date de création :</strong> {sortedOrders[0]?.CommencementTicket ? new Date(sortedOrders[0].CommencementTicket).toLocaleDateString() : 'N/A'}
                </p>
                <p className="infoAdresse">
                    <strong>Statut :</strong> {sortedOrders[0]?.StatutTicket || 'N/A'}
                </p>

                <h2 className="titleTicket">Description du Problème</h2>
                <p className="infoAdresse">
                    {sortedOrders[0]?.DescriptionTicket || 'N/A'}
                </p>

                <h2 className="titleTicket">Actions Récentes</h2>
                <ul>
                    <li>14 août 2023 - Ticket créé</li>
                    <li>15 août 2023 - Évaluation initiale effectuée</li>
                    <li>16 août 2023 - Renvoi en cours des produits manquants</li>
                </ul>

                {/* Ajoutez ici le reste des éléments nécessaires à votre composant */}
            </div>
        </div>
    );
};

export default TicketInfo;
