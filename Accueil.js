import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import Sousnav from './Sousnav';
import Carousel from './Carousel';
import Newsletter from './Newletter';
import Article from './Article';
import axios from 'axios';
import "./Accueil.css";

const Accueil = () => {
    const [userFirstName, setUserFirstName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (token) {

            console.log('Le token JWT est pr�sent dans le localStorage :', token);

            
            const getUserInfo = async () => {
                try {
                    const response = await axios.get('http://localhost:5177/api/Products/userinfo', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    console.log('Objet de r�ponse complet :', response.data); 

                    const { userName, userEmail, userRole } = response.data;
                    console.log(userName);

                    setUserFirstName(userName);
                    setUserRole(userRole); 
                    setUserEmail(userEmail);
                } catch (error) {
                    if (error.response) {
          
                        console.error("Erreur de r�ponse HTTP :", error.response.status, error.response.data);
                    } else if (error.request) {
                 
                        console.error("Pas de r�ponse re�ue :", error.request);
                    } else {

                        console.error("Erreur lors de la configuration de la requ�te :", error.message);
                    }
                }
            };


            getUserInfo();
        } else {
         
            console.log('Le token JWT n\'est pas pr�sent dans le localStorage.');
        }
    }, []);

  
    return (
        <div>
            <Navigation />
            <Sousnav />
            <h1 className="ban">Bienvenue {userFirstName}</h1>
            <Carousel />
            <Newsletter />
            <Article />
        </div>
    );
}

export default Accueil;
