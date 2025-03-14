import { useEffect, useRef, useState } from "react";
import { config } from "../../../../config";
import { useGameContext } from "../../../game/context/GameContext";
import styles from "./CountDownPane.module.css";

function CountDownPane(){
    const [num, setNum] = useState(3);
    const intervalRef = useRef(0);
    const isPlaying = useRef(false);
    const { setCountdown, wagnerAudio, rossiniAudio, settings, setRaceActive } = useGameContext();
    let soundtrack;
    let shot = useRef(new Audio(config.getSoundPath("shot.mp3")));
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setNum(oldVal => oldVal - 1);
        }, 1000)
    }, [])

    useEffect(()=>{
        if(num === 0) {
            shot.current.play();
            if(settings.composer && !isPlaying.current){
                soundtrack = settings.composer === "wagner" ? wagnerAudio.current : rossiniAudio.current;
                soundtrack.play();
                isPlaying.current = true;
            }
            setCountdown(_ => {
                return false;
            });
            setRaceActive(true);
            clearInterval(intervalRef.current);
        };
    }, [num])

    return (
        <div id='countdown-pane' className={styles['countdown-pane']}>
            <div id='countdown-digits' className={styles['countdown-digits']}>{num}</div>
        </div>
    );
}

export { CountDownPane }