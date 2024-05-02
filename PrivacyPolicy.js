import React from 'react';
import Navigation from './Navigation';
import "./PrivicyPolicy.css";

function PrivacyPolicy() { 

    return (
        <div className="Container-PP">
            <Navigation />
            <div className="privacy-policy">
                <h1>Politique de confidentialite</h1>
                <p>Nous nous engageons a proteger votre vie privee. Cette politique de confidentialite decrit les informations que nous collectons et comment nous les utilisons. En utilisant nos services, vous consentez a la collecte et a l'utilisation de vos informations conformement a cette politique.</p>

                <h2>Collecte d'informations</h2>
                <p>Nous recueillons des informations lorsque vous vous inscrivez sur notre site, passez une commande, vous abonnez a notre newsletter, repondez a un sondage ou remplissez un formulaire.</p>
                <p>Les informations recueillies incluent votre nom, votre adresse e-mail, votre adresse postale, votre numero de telephone ou votre carte de credit. Vous pouvez toutefois visiter notre site de maniere anonyme.</p>

                <h2>Utilisation des informations</h2>
                <p>Les informations que nous recueillons aupres de vous peuvent etre utilisees pour :</p>
                <ul>
                    <li>Personnaliser votre experience et repondre a vos besoins individuels</li>
                    <li>Fournir un contenu publicitaire personnalise</li>
                    <li>Ameliorer notre site Web</li>
                    <li>Ameliorer le service client et vos besoins de support</li>
                    <li>Vous contacter par e-mail</li>
                    <li>Administrer un concours, une promotion, ou un enquete</li>
                </ul>

                <h2>Protection des informations</h2>
                <p>Nous mettons en oeuvre une variete de mesures de securite pour preserver la securite de vos informations personnelles. Nous utilisons un cryptage de pointe pour proteger les informations sensibles transmises en ligne.</p>

                <h2>Divulgation a des tiers</h2>
                <p>Nous ne vendons, n'echangeons ni ne transferons vos informations personnelles identifiables a des tiers. Cela n'inclut pas les tiers de confiance qui nous aident a exploiter notre site Web ou a mener nos affaires, tant que ces parties acceptent de garder ces informations confidentielles.</p>

                <h2>Consentement</h2>
                <p>En utilisant notre site, vous consentez a notre politique de confidentialite en ligne.</p>

                <h2>Mises a jour de la politique de confidentialite</h2>
                <p>Si nous decidons de changer notre politique de confidentialite, nous publierons ces changements sur cette page.</p>

                <h2>Contactez-nous</h2>
                <p>Si vous avez des questions concernant cette politique de confidentialite, vous pouvez nous contacter en utilisant les informations ci-dessous :</p>
                <p>[Votre entreprise]<br />[Adresse]<br />[Ville, Code Postal]<br />[Pays]<br />[Adresse e-mail]<br />[Numero de telephone]</p>

                <p>
                    Derniere mise a jour : [date de la derniere mise a jour de la politique de confidentialite]
                </p>
            </div>
        </div>
        );
    }


export default PrivacyPolicy;
