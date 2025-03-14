import { useSetupContext } from "../../context/SetupContext"
import styles from './RacerListHeading.module.css';

function RacerListHeader(){
    
    const { racerListHeaderRef } = useSetupContext()

    return (             
    <h2 
        id="racer-list-heading" 
        className={styles['racer-list-heading']} 
        ref={racerListHeaderRef}>
        Participation list:
    </h2>
    )
}

export { RacerListHeader }