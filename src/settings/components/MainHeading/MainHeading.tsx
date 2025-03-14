import { Reff } from "../../../types"
import { useSetupContext } from "../../context/SetupContext";
import styles from './MainHeading.module.css';

function MainHeading(){
    
    const { whitespaceRef, runRef } = useSetupContext();

    return (
        <h1 className={styles["main-heading"]}>
            <span className={styles.whitespace} ref={whitespaceRef}>Whitespace</span>
            <span className={styles.run} ref={runRef}>Run</span>
        </h1>
    )}

export { MainHeading }