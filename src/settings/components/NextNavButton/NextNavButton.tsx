import { config } from "../../../../config";
import { NavButtonProps } from "../../../types";
import styles from './NextNavButton.module.css';

const { getImgPath } = config

function NextNavButton({ id, onClick }: NavButtonProps){
    
    return(
        <button 
            id={`next-nav-button-${id}`} 
            className={styles["next-nav-button"]}
            onClick={
                (e) => {
                    onClick(e)}
            }
            type="button" 
        >   
            <img 
                id={`next-nav-icon-${id}`} 
                className={styles["next-nav-icon"]}
                src={`${getImgPath('right64.png')}`}
                alt="navigation button" 
            />
        </button>
    )
}

export { NextNavButton }