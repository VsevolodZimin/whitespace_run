import { createContext, ReactNode, useContext } from "react";
import { useRace } from "../hooks/useRace";
import { RaceContext } from "../../types";

const RaceContext = createContext<RaceContext | null>(null);

function RaceProvider({ children }: { children: ReactNode }){
    
    const { raceDataRef,
        raceAreaRef, 
        scrollPoitionRef,
        isImgLoaded,
        numRegistered,
        isRacersRegistered,
        finishLineRef,
        racerCountRef,
        registerProgress, 
        checkForScroll,
        resetGame, 
        endGame, 
        checkIfAllFinished,
        setImgLoaded,
        setNumRegistered,
        setRacersRegistered,
        borderBottomRef,
        borderTopRef,
        winner,
     } = useRace();

    return <RaceContext.Provider value={{
        raceDataRef,
        raceAreaRef, 
        scrollPoitionRef,
        isImgLoaded,
        numRegistered,
        isRacersRegistered,
        finishLineRef,
        racerCountRef,
        registerProgress, 
        checkForScroll,
        resetGame, 
        endGame, 
        checkIfAllFinished,
        setImgLoaded,
        setNumRegistered,
        setRacersRegistered,
        borderBottomRef,
        borderTopRef,
        winner,

        }}>
        { children }
    </RaceContext.Provider>
}

export { RaceProvider }

function useRaceContext(){
    const context = useContext(RaceContext);
    if(!context) throw new Error("RaceContext is used outside Race Provider");
    return context;
}

export { useRaceContext }
