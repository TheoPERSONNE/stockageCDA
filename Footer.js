import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";


const Footer = () => {
  return (
    <div className="allfooter">
        
          <footer class="site-footer">
              <div class="container">
                  <div class="row">
                      <div class="col-sm-12 col-md-6">
                          <h6>About</h6>
                          <p class="text-justify">Service dedier au client et commerciaux de gestion de commande et de ticket s.a.v réaliser pour faciliter les resolution de vos probleme</p>
                      </div>

                    
                      <div class="col-xs-6 col-md-3">
                          <h6>Quick Links</h6>
                          <ul class="footer-links">
                              <li><Link to="/AboutUs">
                                  About Us
                              </Link></li>
                              <li><Link to="/ContactUs">
                                  Contact Us
                              </Link></li>
                              <li>  <Link to="/PrivacyPolicy">
                                  Privacy Policy
                              </Link></li>
                          </ul>
                      </div>
                  </div>
                  <hr/>
              </div>
              <div class="container">
                  <div class="row">
                      <div class="col-md-8 col-sm-6 col-xs-12">
                          <p class="copyright-text">Copyright &copy; 2024 All Rights Reserved by
                              <a href="#">Creative Electronic</a>.
                          </p>
                      </div>


                  </div>
              </div>
          </footer>
    </div>
  );
};

export default Footer;
