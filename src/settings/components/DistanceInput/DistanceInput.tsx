import { useGameContext } from '../../../game/context/GameContext';
import { useSetupContext } from '../../context/SetupContext';
import styles from './DistanceInut.module.css';

function DistanceInput(){

    const { distanceFieldRef, handleDistanceInput } = useSetupContext();
    const { settings } = useGameContext();

    return (
        <input 
            id="distance-field" 
            className={styles['distance-field']}
            name="distance-field" 
            ref={distanceFieldRef}
            min="100" 
            max="2000" 
            type="number" 
            defaultValue={settings.distance || ""} 
            placeholder="Distance" 
            onChange={(e) => handleDistanceInput(e)}/>
    )
}

export { DistanceInput }