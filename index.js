import React from "react";
        import ReactDOM from "react-dom";
        import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
        import "./index.css";
        import reportWebVitals from "./reportWebVitals";
        import Accueil from "./components/Accueil";
        import Profil from "./components/Profil";
        import Actualites from "./components/Actualites";
        import Commandehist from "./components/Commandehist";
        import Tickethist from "./components/Tickethist";
        import CommandeInfo from "./components/CommandeInfo";
        import TicketInfo from "./components/TicketInfo";
        import Connexion from "./components/Connexion";
        import Modification from "./components/Modification";
        import Newsletter from "./components/Newletter";
        import Savacc from "./components/Savacc";
        import Footer from "./components/Footer";
        import Admin from "./components/Admin";
        import Commercial from "./components/Commercial";
import CreateUser from "./components/CreateUser";
import CreateCommande from "./components/CreateCommande";
import CreateArticle from "./components/CreateArticle";
        import Nouvelleuser from "./components/Nouvelleuser"
import PrivacyPolicy from "./components/PrivacyPolicy";
import { createRoot } from 'react-dom/client';
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import FAQ from "./components/FAQ";
import GestionArticle from "./components/GestionArticle";
import ModifArticle from "./components/ModifArticle";
        
        const root = ReactDOM.createRoot(document.getElementById("root"));
        root.render(
          <Router>
            <div className="all">
              <Routes>
                {" "}
                <Route path="/" element={<Connexion />} />
                <Route path="/Accueil" element={<Accueil />} />
                <Route path="/profil" element={<Profil />} />
                <Route path="/actualites" element={<Actualites />} />
                <Route path="/commandes" element={<Commandehist />} />
                <Route path="/services" element={<Tickethist />} />
                  <Route path="/CommandeInfo/:numeroCommande" element={<CommandeInfo />} />

                <Route path="/Ticketinfo" element={<TicketInfo />} />
                <Route path="/Modification" element={<Modification />} />
                <Route path="/Newletter" element={<Newsletter />} />
                <Route path="/Sav" element={<Savacc />} />
                <Route path="/Tickethist" element={<Tickethist />} />
                <Route path="/Admin" element={<Admin />} />
                <Route path="/Commercial" element={<Commercial />} />
                        <Route path="/Nouvelleuser" element={<Nouvelleuser />} />
                        <Route path="/CreateUser" element={<CreateUser />} />
                        <Route path="/CreateArticle" element={<CreateArticle />} />
                        <Route path="/CreateCommande" element={<CreateCommande />} />
                        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
                        <Route path="/AboutUs" element={<AboutUs />} />
                        <Route path="/ContactUs" element={<ContactUs />} />
                        <Route path="/FAQ" element={<FAQ />} />
                        <Route path="/GestionArticle" element={<GestionArticle />} />
                        <Route path="/ModifArticle" element={<ModifArticle />} />

              </Routes>
            </div>
            <Footer />
          </Router>
        );