import React, { useState } from "react";
import './buttoncss.css';
import {motion} from "framer-motion";

const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);
  
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return (
        <motion.div className="button" whileHover={{y : -15}}>
           <button
              onClick={scrollToTop}
              className={`back-to-top-button ${isVisible ? "visible" : ""}`}>
              Back to Top
            </button>
        </motion.div>
    );
  };
  
  export default BackToTopButton;