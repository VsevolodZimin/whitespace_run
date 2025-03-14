
import { Button } from "../../../game/components/Button/Button";
import { useSetupContext } from "../../context/SetupContext";
import styles from './RunButton.module.css';

function RunButton({ isLeft } : { isLeft: boolean }){
    
    const { runButtonRef, handleRun } = useSetupContext();
    
    return (
        <Button className={ `ui-button ${isLeft ? styles.left : styles.right}`} reff={runButtonRef} id="run-button" onClick={(e) => handleRun(e)}>run</Button>
    )
}

export { RunButton }