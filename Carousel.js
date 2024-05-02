import React, { useState, useEffect } from "react";
import "./Carousel.css";
import car1 from "./template1.PNG";
import car2 from "./template3.PNG";
import car3 from "./template1.PNG";
import car4 from "./template3.PNG";

const Carousel = () => {
  const images = [car1, car2, car3, car4];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="carousel-container">
      <img
        src={images[currentIndex]}
        alt={`Carousel Slide ${currentIndex + 1}`}
      />
    </div>
  );
};

export default Carousel;
