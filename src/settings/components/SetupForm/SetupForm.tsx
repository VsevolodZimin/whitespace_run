import { RunButton } from "../RunButton/RunButton";
import styles from './SetupForm.module.css';
import { AddButton } from "../AddButton/AddButton";
import { DistanceInput } from "../DistanceInput/DistanceInput";
import { RacerList } from "../RacerList/RacerList";
import { RacerListHeader } from "../RacerListHeading/RacerListHeading";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

function SetupForm({ children } : { children?: React.ReactNode }){

    return (
        <form id="setup-form">
            <div id="distance-group" className={styles['distance-group']}>
                <div id="distance-group-top-row" className={styles['distance-group-top-row']}>
                    <label className="hidden" htmlFor="distance-field">Distance:</label>
                    <DistanceInput/>
                    { children ? children : null }                
                    </div>
                <ErrorMessage/>
                <AddButton/>
            </div>
            <RacerListHeader/>
            <RacerList/>
        </form>
    )}

export { SetupForm }