import React, { useState, useEffect } from 'react';
import Sousnav from "./Sousnav";
import imgArt from "./Article.png";
import Navigation from "./Navigation";
import axios from 'axios';
import "./Actualites.css";

const Actualites = () => {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5177/api/Products/getArticle');
                const data = response.data;
                console.log(data);
                setArticles(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        console.log(articles);
    }, [articles]);

    return (
        <div>
            <Navigation />
            <div className="contenerActu">
                <Sousnav />
                <div className="allActu">
                    <div className="articles-container">
                        {articles.map((article) => (
                            <div className="articleActu" key={article.id}>
                                <img src={imgArt} alt={article.title} />
                                <div className="article-content">
                                    <h2>{article.title}</h2>
                                    <h2>{article.description}</h2>
                                    <p className="descp">{article.description}</p>
                                    <hr></hr>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );


};

export default Actualites;
