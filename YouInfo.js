import React, { useState, useEffect } from "react";
import axios from "axios";
import "./YouInfo.css";

const YouInfo = () => {
    // State to store the fetched products

    const [userVille, setUserVille] = useState('');
    const [userCodePostal, setUserCodePostal] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userTelephone, setUserTelephone] = useState('');
    const [userFixe, setUserFixe] = useState('');
    const [error, setError] = useState(null);

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

                    const { userEmail, userCodePostal, userFixe, userTelephone, userVille } = response.data;
                    console.log(userEmail);

                    setUserEmail(userEmail);
                    setUserVille(userVille);
                    setUserCodePostal(userCodePostal);
                    setUserTelephone(userTelephone);
                    setUserFixe(userFixe);
                    setError(error);
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

    return (
        <div className="you-info-container">
            {error ? (
                <div className="error-message">{error}</div>
            ) : (
                <>
                    <div className="left-info">

                            <p className="infop">Ville: {userVille}</p>
                            <p className="infop">Code Postal: {userCodePostal}</p>
                        <p className="infop">Email: {userEmail}</p>
                    </div>
                    <div className="separatorinfo"></div>
                    <div className="right-info">
                        <p className="infop">Téléphone Fixe: {userTelephone}</p>
                        <p className="infop">Téléphone Mobile: {userFixe}</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default YouInfo;
