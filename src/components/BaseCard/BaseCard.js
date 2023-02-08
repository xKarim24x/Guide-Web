import { Children } from "react";
import './BaseCard.css';

function BaseCard(props){
    return(
        <div className={props.className}>
            {props.children}
        </div>
    );
}

export default BaseCard;