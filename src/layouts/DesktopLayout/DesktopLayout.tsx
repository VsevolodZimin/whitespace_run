import { useGameContext } from "../../game/context/GameContext"
import { RacePage } from "../../race/components/RacePage/RacePage"
import { RightSidePane } from "../../settings/components/RightSidePane/RightSidePane";
import { LeftSidePane } from "../../settings/components/LeftSidePane/LeftSidePane";
import { MainHeading } from "../../settings/components/MainHeading/MainHeading";
import { SetupForm } from "../../settings/components/SetupForm/SetupForm";
import { SetupPage } from "../../settings/components/SetupPage/SetupPage"
import { SetupProvider } from "../../settings/context/SetupContext";
import styles from './DesktopLayout.module.css';

function DesktopLayout(){
    
    const { isRaceActive, isRaceOver, setRaceActive, setRaceOver, isDoneSettingUp, setDoneSettingUp } = useGameContext();

    return (
        <SetupProvider>
            <div className={styles['grid-layout']}>
                <div id="left-side">
                    {isDoneSettingUp ? <LeftSidePane/>
                    :<SetupPage>
                        <MainHeading/>
                        <SetupForm/>
                    </SetupPage>}           
                </div>
                <div id="right-side">
                    {isDoneSettingUp ? <RacePage/> : <RightSidePane/>}
                </div>
            </div>
        </SetupProvider>

    )
}

export { DesktopLayout }
