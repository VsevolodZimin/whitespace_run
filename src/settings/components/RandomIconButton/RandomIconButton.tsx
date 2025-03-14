import { config } from "../../../../config";
import { RandomIconButtonProps } from "../../../types"
import styles from "./RandomIconButton.module.css";
const { getImgPath } = config;

function RandomIconButton({ id, handleRandom }: RandomIconButtonProps){

    return (
        <button id={`random-button-${id}`} className={`random-button ${styles["random-button"]}`} onClick={handleRandom} type="button">
            <img id={`random-icon-${id}`} className={`random-icon ${styles["random-icon"]}`} src={getImgPath("random35.png")} alt='random button'/>
        </button>
    )
}

export { RandomIconButton }