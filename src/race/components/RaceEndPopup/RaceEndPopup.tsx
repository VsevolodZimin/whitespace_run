import { useEndGameDialog } from "../../hooks/useEndgameDialog"
import styles from './RaceEndPopup.module.css';

function RaceEndPopup(){
    
    const { dialogRef, textElRef, handleGameEnd, handleRetry } = useEndGameDialog();

    return (
        <dialog ref={dialogRef} data-called-by="" className={styles.dialog}>
            <div className={styles['dialog-body']}>
                <p ref={textElRef} className={styles['text']}></p>
                <div className={styles['end-game-button-group']}>
                    <button type="button" id="reset" className={`ui-button ${styles['end-game-button']}`} onClick={handleRetry}>Try again?</button>
                    <button type="button" id="back" className={`ui-button ${styles['end-game-button']}`} onClick={handleGameEnd}>Go back</button>
                </div>
            </div>
        </dialog>
    )
}

export { RaceEndPopup }