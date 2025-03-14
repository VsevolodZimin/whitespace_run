import { config } from "../../../../config";
import { NavButtonProps } from "../../../types";
import styles from './PrevNavButton.module.css';

const { getImgPath } = config

function PrevNavButton({ id, onClick }: NavButtonProps){
    
    return(
        <button 
            id={`prev-nav-button-${id}`} 
            className={styles["prev-nav-button"]}
            onClick={(e) => onClick(e)}
            type="button" 
        >    
            <img
                id={`prev-nav-icon-${id}`} 
                className={styles["prev-nav-icon"]}
                src={`${getImgPath(`left64.png`)}`}
                alt="navigation button" 
            />
        </button>
    )
}

export { PrevNavButton }