import React from "react";
import './editcartcss.css';

function EditCart (props){
    return(props.trigger) ? ( 
        <div className="popup1">
           <div className="popup-inner1">
                  <button className="close-btn" onClick={() => props.setTrigger(false)}>x</button>
                  {props.children}

           </div>
        </div>
    ): "";
}

export default EditCart;