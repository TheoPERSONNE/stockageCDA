import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Article.css";
import art from "./Article.png";

const Article = () => {

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
        <div className="article-container">
            {articles.map(article => (
                article.actif === 1 && (
                    <div className="article" key={article.id}>
                        <img src={art} alt={"Article " + article.id} className="article-image" />
                        <h2>{article.titre}</h2>
                        <p>{article.description}</p>
                    </div>
                )
            ))}
        </div>
    );

};

export default Article;
