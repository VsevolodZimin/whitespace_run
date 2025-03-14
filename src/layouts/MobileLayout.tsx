import { Backdrop } from "../game/components/Backdrop/Backdrop"
import { useGameContext } from "../game/context/GameContext";
import { CountDownPane } from "../race/components/CountdownPane/CountDownPane";
import { RaceEndPopup } from "../race/components/RaceEndPopup/RaceEndPopup";
import { RacePage } from "../race/components/RacePage/RacePage";
import { RaceProvider } from "../race/context/RaceContext";
import { MainHeading } from "../settings/components/MainHeading/MainHeading";
import { RunButton } from "../settings/components/RunButton/RunButton";
import { SetupForm } from "../settings/components/SetupForm/SetupForm";
import { SetupPage } from "../settings/components/SetupPage/SetupPage";
import { SetupProvider } from "../settings/context/SetupContext";

function MobileLayout(){

    const { 
        settings, 
        isRaceOver, 
        isCountdown, 
        isDoneSettingUp, 
        setDoneSettingUp, 
        backdropRef, 
      } = useGameContext();

    return ( 
    <>
      <Backdrop/>
      {isCountdown && <CountDownPane/>}
      {isDoneSettingUp 
      ? <RaceProvider>
          {isRaceOver && <RaceEndPopup/>}
          <RacePage/> 
        </RaceProvider>

      : <SetupProvider {...{settings, setDoneSettingUp }}>
          <SetupPage>
            <MainHeading/>
            <SetupForm>
              <RunButton isLeft={true}/>
            </SetupForm>
          </SetupPage>
      </SetupProvider>}
</>)
}

export { MobileLayout }
