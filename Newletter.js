import React from "react";
import "./Newletter.css";

const Newsletter = () => {
  return (
    <div className="newsletter-container">
      <h2>Inscrit toi a notre Newsletter</h2>
      <p>Reste informé des dernières nouveautés.</p>
      <form>
        <input type="email" placeholder="Entre ton email" />
        <button type="submit">Je m'abonne</button>
      </form>
    </div>
  );
};

export default Newsletter;
