import React, { useState, useEffect } from "react";
import axios from 'axios';
import int from "./interrogation.png";

function FAQ() {
    const [contactus, setContactus] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5177/api/Products/getContactUs');
                const data = response.data;
                console.log(data);
                setContactus(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        console.log(contactus);
    }, [contactus]);

    return (
        <div className="contactus-container">
            {contactus.map(contact => (
                <div className="contactus" key={contact.id}>
                    {/* Assurez-vous que chaque article a une propriété id, email et contactus */}
                    <img src={int} alt={"Contactus " + contactus.id} className="contactus-image" />
                    <h2>{contact.email}</h2>
                    <p>{contact.question}</p>
                </div>
            ))}
        </div>
    );
}

export default FAQ;
