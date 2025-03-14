import { Racer } from "../Racer/Racer"
import { useRaceContext } from "../../context/RaceContext";
import { useGameContext } from "../../../game/context/GameContext";
import styles from './RacePage.module.css';

function RacePage(){

    const { settings } = useGameContext();
    const { raceAreaRef, finishLineRef, borderTopRef, borderBottomRef } = useRaceContext();
    
    return(
        <div id="game-page" className={styles['game-page']}>
            <pre ref={borderTopRef} id="border"></pre>
            <div className="flex">
                <div>
                    <div id="race-area" style={{width: `${settings.distance * 10}px` }} ref={raceAreaRef}>
                        {settings.racerSettings.map( rnstgs => {
                            return <Racer key={rnstgs.id} id={rnstgs.id} faceIndex={rnstgs.faceIndex} name={rnstgs.name}/>
                        })}
                    </div>
                </div>
                <div ref={finishLineRef} className={styles['finish-line']}></div>
            </div>
            <pre ref={borderBottomRef} id="border"></pre>
        </div>
    )
}   

export { RacePage }