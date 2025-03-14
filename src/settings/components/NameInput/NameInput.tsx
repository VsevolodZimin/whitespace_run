import { useState } from "react"
import { NameInputProps } from "../../../types";
import styles from './NameInput.module.css'
function NameInput({racerSettings, handleNameInput, reff}: NameInputProps){

    return(
        <input 
            ref={reff}
            id={`name-input-${racerSettings.id}`} 
            className={styles["name-input"]}
            type="text" maxLength={25} 
            onChange={(e) => handleNameInput(racerSettings.id, e)} 
            placeholder="Player's name goes here"
            defaultValue={racerSettings.name}
        />
    )
}

export { NameInput };