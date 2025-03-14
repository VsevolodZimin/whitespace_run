import { Button } from "../../../game/components/Button/Button";
import { useFaces } from "../../../game/hooks/useFaces";
import { generateId } from "../../../game/utils";
import { useSetupContext } from "../../context/SetupContext"
import styles from './AddButton.module.css';

function AddButton(){

    const { addButtonRef, handleCreate } = useSetupContext();
    const { getDefaultIndex } = useFaces(0);
    const newId = generateId();

    return <Button id="add" className={`ui-button ${styles['add']}`} reff={addButtonRef} onClick={(e) => handleCreate(e, newId, getDefaultIndex())}>add</Button>
}

export { AddButton }