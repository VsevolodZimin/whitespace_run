import { RacerSetupItemSettings } from "../../../types";
import { RandomIconButton } from "../RandomIconButton/RandomIconButton";
import { NameInput } from "../NameInput/NameInput";
import { PrevNavButton } from "../PrevNavButton/PrevNavButton";
import { useFaces } from "../../../game/hooks/useFaces";
import { useSetupContext } from "../../context/SetupContext";
import { DeleteIconButton } from "../DeleteIconButton/DeleteIconButton";
import styles from './RacerField.module.css';
import { NextNavButton } from "../NextNavButton/NextNavButton";
import { useRacerSetupItem } from "../../hooks/useRacerSetupItem";
import { useGameContext } from "../../../game/context/GameContext";

function RacerField({racerSettings, position }: RacerSetupItemSettings){
    
    const { handleRandom, handleNameInput, handleDelete } = useSetupContext();
    const { getFace } = useFaces(racerSettings.faceIndex);
    const { faceRef, racerRef, deleteButtonRef, nameInputRef, lineRef, prevFace, nextFace } = useRacerSetupItem(racerSettings);
    const { settings } = useGameContext();
    const id = racerSettings.id;
    

    return(
        <div 
            id={`racer-setup-item-${racerSettings.id}`} 
            className={`racer-setup-item ${styles['racer-setup-item']}`}
            ref={racerRef} 
            data-position={position} 
        >
            <div 
                id={`racer-title-${racerSettings.id}`}
                className={`racer-title ${styles['racer-title']}`} 
            >
                <div id={`racer-list-position-${racerSettings.id}`}>{position}.</div> 
                <div className={styles['face-navigation-group']}>
                    <PrevNavButton id={racerSettings.id} onClick={prevFace}/>
                    <pre 
                        id={`racer-face-${racerSettings.id}`} 
                        className={styles.face} ref={faceRef} 
                        onClick={nextFace}
                    >
                        {getFace(racerSettings.faceIndex)}
                    </pre>
                    <NextNavButton id={racerSettings.id} onClick={nextFace}/>
                </div>
            </div>

            <div className={styles.flex}>
                <NameInput racerSettings={racerSettings} handleNameInput={handleNameInput} reff={nameInputRef}/>
                <div id="racer-button-group" className={styles['item-button-group']}>
                    <RandomIconButton id={`random-${racerSettings.id}`} handleRandom={() => handleRandom(id, nameInputRef)}/>
                    <DeleteIconButton reff={deleteButtonRef} unsquished={settings.racerSettings.length >= 3} id={`delete-${racerSettings.id}`} handleDelete={(e) => handleDelete(e, racerSettings.id, lineRef)}/>
                </div>
            </div>
            <div ref={lineRef} className={styles.line}></div>
        </div>
    );
}

export { RacerField }
