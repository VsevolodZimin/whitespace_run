import { useSetupContext } from "../../context/SetupContext";
import styles from './ErrorMessage.module.css';

function ErrorMessage(){

    const {errorMessageRef} = useSetupContext();

    return <div id="error-message" className={styles['error-message']} ref={errorMessageRef}></div>

}
export { ErrorMessage }