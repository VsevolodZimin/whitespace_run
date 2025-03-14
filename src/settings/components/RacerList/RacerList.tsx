import { useGameContext } from "../../../game/context/GameContext";
import { RacerField } from "../RacerField/RacerField";

function RacerList(){
    
    const { settings } = useGameContext()
    let listPosition = 0;

    return (
        <div id="racers">
        {settings.racerSettings.map(s => {
            listPosition++;
            return <RacerField key={s.id} position={listPosition} racerSettings={s}/>
        })}
    </div>
    )
}

export { RacerList }