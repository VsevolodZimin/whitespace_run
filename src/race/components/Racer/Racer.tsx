import { useCallback, useEffect, useRef, useState } from "react"
import { useFaces } from "../../../game/hooks/useFaces";
import { useRace } from "../../hooks/useRace";
import { useRaceContext } from "../../context/RaceContext";
import styles from './Racer.module.css';
import { RacerProps } from "../../../types";
import { useRacer } from "../../hooks/useRacer";

function Racer({ id, name, faceIndex }: RacerProps){
    
    const { getFace, getSrc } = useFaces(0);
    const { setImgLoaded  } = useRaceContext();

    const { blockRef, faceRef, nameRef, trackRef, rankRef } = useRacer(id, name, faceIndex);
    

    return(
        <div className={styles.flex}>
            <div ref={trackRef} id="track" className={styles.track}>
                <div ref={blockRef} className={styles['racer-block']}>
                    <pre ref={faceRef} id="face">
                        {faceIndex === 1792 || faceIndex === 1813 
                            ? <img alt="symbol face" src={getSrc(faceIndex)} onLoad={() => setImgLoaded(true)}/>
                            : getFace(faceIndex)
                        }
                    </pre>
                    <div ref={nameRef} id="name">
                        <span className={styles.rank} ref={rankRef}></span>
                        <span>{name}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Racer }


