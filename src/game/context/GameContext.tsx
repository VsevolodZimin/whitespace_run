import { createContext, useContext } from "react";
import { GameContextType } from "../../types";
import { useGame } from "../hooks/useGame";


export const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }){

    const { 
      isDoneSettingUp, 
      isCountdown, 
      isRaceOver, 
      setDoneSettingUp, 
      setRaceOver, 
      setCountdown, 
      settings,
      isRaceActive,
      setRaceActive,
      backdropRef,
      setSettings,
      isRestartedRef,
      wagnerAudio,
      rossiniAudio,
      mediaQuery,
      racerFields,
    } = useGame();

    return (
        <GameContext.Provider value={{
          settings, 
          isDoneSettingUp, 
          isCountdown, 
          isRaceOver, 
          setDoneSettingUp, 
          setCountdown, 
          setRaceOver, 
          isRaceActive,
          setRaceActive,
          backdropRef,
          setSettings,
          isRestartedRef,
          wagnerAudio,
          rossiniAudio,
          mediaQuery,
          racerFields,
        }}>
            { children }
        </GameContext.Provider>
    )
}

export function useGameContext(){
    const context = useContext(GameContext);
    if(!context)
        throw new Error("useGameContext used outside gameProvider")
    return context;
}


