import { config } from "../../../../config"
import { DeleteIconButtonProps } from "../../../types";
import styles from './DeleteIconButton.module.css';

const { getImgPath } = config;

function DeleteIconButton({ unsquished, reff, id, handleDelete }: DeleteIconButtonProps){
    
    return (
        <button 
            id={`delete-button-${id}`}
            className={`delete-button ${styles['delete-button']} ${unsquished ? "" : styles.squished}`}  
            ref={reff} 
            type="button" 
            onClick={handleDelete}
        >
            
            <img 
                id={`delete-icon-${id}`}
                src={getImgPath("delete35.png")} 
                className={`delete-icon ${styles['delete-icon']} ${unsquished ? "" : styles.squished }`}
                alt='delete icon' 
            />
        </button>
    )
}

export { DeleteIconButton }