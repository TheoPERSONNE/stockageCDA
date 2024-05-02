import React, { useState } from "react";
import "./ContactUs.css"; 
import Navigation from "./Navigation";

function ContactUs() {

    const [formContactUs, setFormContactUs] = useState({
        email: "",
        question: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormContactUs(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Contenu de formData avant l'envoi du formulaire :", formContactUs);

            const response = await fetch("http://localhost:5177/api/Products/ajoutContactUs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formContactUs)
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Commande créée avec succès !", data);

                setFormContactUs(prevState => ({
                    ...prevState,
                    idContactUs: data.idContactUs
                }));
            } else {
                console.error("Erreur lors de la création de la contactus :", data);
            }
        } catch (error) {
            console.error("Erreur lors de la création de la contactus :", error.message);
        }
    };

    return (
        <div>
            <Navigation />
        <div className="contact-container">
            <h2>Contactez-nous</h2>
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email :</label>
                        <input type="text" id="Email" name="Email" className="form-control" value={formContactUs.Email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                        <label htmlFor="question">Question :</label>
                        <input type="text" id="question" name="question" className="form-control" value={formContactUs.question} onChange={handleChange} required />
                </div>
                <button type="submit">Envoyer</button>
            </form>
        </div>
        </div>
    );
}

export default ContactUs;
