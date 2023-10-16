import {motion} from "framer-motion";
import  BackToTopButton from './button.js';
import './footercss.css';

function Footer() {
    return(
        <footer>
            
            {/* <img src="./Img/pet-love.png"></img> */}

            <div class="back">
             
                <div class="info">
                   <motion.img class="logo-f"src="/Img/pet-love.png" animate={{rotate : [0, 8, 8, 0]}} transition={{repeat: Infinity, duration: 1}}></motion.img>
                   <h2 className="info-h2">Hotline : 45 919 596<br></br>
                       Email us : fur-everFriends@pet.com
                    </h2> 
                    <div class="icon-info">
                      <a href="#"><motion.img src="/Img/facebook.png" whileHover={{y : -15}}></motion.img></a>
                      <a href="#"><motion.img src="/Img/twitter.png" whileHover={{y : -15}}></motion.img></a>
                      <a href="#"><motion.img src="/Img/instagram.png" whileHover={{y : -15}}></motion.img></a>
                      <a href="#"><motion.img src="/Img/snapchat.png" whileHover={{y : -15}}></motion.img></a>
                    </div>

                    <h4 class="rights">© 2023 Fur-ever Frineds. All rights reserved</h4>
                    
                </div>

                <div class="map">
                <motion.iframe whileHover={{y : -15}} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2983.6977044816463!2d-73.92473347566184!3d41.59742204487405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89dd39719e2459c5%3A0xb47cc1b049d66a06!2sFurEver%20Friends%20Hudson%20Valley!5e0!3m2!1sen!2s!4v1681604182629!5m2!1sen!2s" width="600" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></motion.iframe>
                </div>

                <div class="button-up">
                     <BackToTopButton/>
                </div>
            </div>
        </footer>
    );
}

export default Footer;