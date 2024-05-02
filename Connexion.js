import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Utilisez useNavigate pour la navigation
import "./Connexion.css";
import logo from "./ELECTONICSBas.png";

const Connexion = () => {
    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");

    const navigate = useNavigate(); // Utilisez useNavigate pour la navigation

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            console.log("Données envoyées:", { email, motDePasse });
            const response = await fetch("http://localhost:5177/api/Products/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, motDePasse }),
            });

            if (response.ok) {
                const { token } = await response.json(); // Récupération du token JWT de la réponse
                localStorage.setItem('authToken', token); // Stockage du token JWT dans le localStorage
                navigate("/Accueil"); // Utilisez navigate() pour la navigation
            } else {
                alert("Nom d'utilisateur ou mot de passe incorrect");
            }
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
        }
    };


    return (
        <div className="allConn">
            <div className="container-fluid" id="bodyForm">
                <div className="container" id="details">
                    <div className="row">
                        <div className="col-xl-6" id="image">
                            <img
                                src="https://colorlib.com/etc/lf/Login_v1/images/img-01.png"
                                alt="ordinateur"
                            />
                        </div>
                        <div className="col-xl-6" id="Form">
                            <h2 className="titreCo">Bienvenue !</h2>
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        placeholder="Password"
                                        value={motDePasse}
                                        onChange={(e) => setMotDePasse(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary" id="bouton">
                                    Connexion
                                </button>
                            </form>
                            <p></p>
                        </div>
                    </div>
                </div>
                <div className="container-fluid2" id="bodyForm2">
                    <h1>Electronics</h1>

                    <img src={logo} alt="Logo" className="logoCo" />
                </div>
            </div>
        </div>
    );
};

export default Connexion;
