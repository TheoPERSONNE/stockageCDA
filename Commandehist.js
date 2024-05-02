import React, { useState, useEffect } from "react";
import "./Commandehist.css";
import Sousnav from "./Sousnav";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";
import axios from 'axios';

const Commandehist = () => {

    const [userNumeroClient, setUserNumeroClient] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (token) {

            console.log('Le token JWT est présent dans le localStorage :', token);


            const getUserInfo = async () => {
                try {
                    const response = await axios.get('http://localhost:5177/api/Products/userinfo', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    console.log('Objet de réponse complet :', response.data);

                    const { userNumeroClient } = response.data;
                    console.log(userNumeroClient);

         
                  
                    setUserNumeroClient(userNumeroClient);
                } catch (error) {
                    if (error.response) {

                        console.error("Erreur de réponse HTTP :", error.response.status, error.response.data);
                    } else if (error.request) {

                        console.error("Pas de réponse reçue :", error.request);
                    } else {

                        console.error("Erreur lors de la configuration de la requête :", error.message);
                    }
                }
            };


            getUserInfo();
        } else {

            console.log('Le token JWT n\'est pas présent dans le localStorage.');
        }
    }, []);
    const [orders, setOrders] = useState(null); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5177/api/Products/getCommande');
                const data = response.data;
                console.log(data);
                setOrders(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        console.log(orders);
    }, [orders]); 

    return (
        <div>
            <Navigation />
            <div className="Commandehist">
                <Sousnav />
                <div className="Commall">
                    <h2>Historique des commandes</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Numéro de commande</th>
                                <th>Statut</th>
                                <th>Date de livraison</th>
                                <th>Informations</th>

                            </tr>
                        </thead>
                        <tbody>
                            {orders && orders.map((order) => (
                                typeof order.numeroClient === 'string' && order.numeroClient === userNumeroClient ? (
                                    <tr>
                                        <td key={order.idCommande}>{order.numeroCommande}</td>
                                        <td key={order.idCommande} className="status">{order.statutCommande}</td>
                                        <td key={order.idCommande} className="date">{order.dateDeLivraisonCommande}</td>
                                        <td key={order.idCommande}>
                                            <Link to={`/CommandeInfo/${order.numeroCommande}`}>Voir plus→</Link>
                                        </td>
                                    </tr>
                                ) : null
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Commandehist;
