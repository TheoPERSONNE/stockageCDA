import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Tickethist.css";
import Sousnav from "./Sousnav";
import Navigation from "./Navigation";
import axios from 'axios';

const Tickethist = () => {
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

                // Fetch orders where NumeroClient matches userNumeroClient
                const ordersResponse = await axios.get(`https://localhost:5177/api/Products/getTicket/${userNumeroClient}`);
                setOrders(ordersResponse.data);
                console.log(ordersResponse)

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
        DescriptionTicket: order.descriptionTicket || 'N/A'
    })).sort((a, b) => a.IdTicket - b.IdTicket);

    return (
        <div>
            <Navigation />
            <div className="Tickethist">
                <Sousnav />
                <div className="Ticketall">
                    <h2>Historique des tickets&nbsp;&nbsp;</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Ticket</th>
                                <th>Statut</th>
                                <th>Problème</th>
                                <th>Description</th>
                                <th>Actions</th> {/* Nouvelle colonne pour les liens */}
                            </tr>
                        </thead>
                        <tbody>
                            {sortedOrders.map((order) => (
                                <tr key={order.IdTicket}>
                                    <td>{order.IdTicket}</td>
                                    <td className="status">{order.StatutTicket}</td>
                                    <td className="problemeTicket">{order.ProblemeTicket}</td>
                                    <td className="descriptionTicket">{order.DescriptionTicket}</td>
                                    <td>
                                        <Link to={`/TicketInfo/${order.IdTicket}`}>Voir plus→</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Tickethist;
