import { useGameContext } from "../../context/GameContext"
import styles from './Backdrop.module.css';

function Backdrop(){
    const { backdropRef } = useGameContext();
    return <div ref={backdropRef} id="backdrop" className={styles.backdrop}></div>
}

export { Backdrop }