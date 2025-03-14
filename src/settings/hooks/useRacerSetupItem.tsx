import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { useSetupContext } from "../context/SetupContext";
import { useGameContext } from "../../game/context/GameContext";
import { initFieldDimentions } from "../../game/utils";
import { useAnimation } from "../../game/hooks/useAnimation";
import { useSetupAnimation } from "./useSetupAnimation";
import { RacerSetupItemSettings, RacerSettings, MEvent } from "../../types";
import { useFaces } from "../../game/hooks/useFaces";

function useRacerSetupItem(racerSettings: RacerSettings){

    const lineRef = useRef<HTMLDivElement | null>(null);
    const faceRef = useRef<HTMLPreElement>(null);
    const racerRef = useRef<HTMLDivElement | null>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);
    const deleteButtonRef = useRef<HTMLButtonElement>(null);
    const id = racerSettings.id;
    
    const { isListLoadedRef, navigateFace } = useSetupContext()
    const { settings, setSettings } = useGameContext();
    const { animateCreate } = useSetupAnimation(isListLoadedRef, settings);
    const { getFace, getNextIndex, getPreviousIndex } = useFaces(0);

    useEffect(() => {
        const field = racerRef.current;
        if(!field) throw new Error("racerRef is null");
        const newRacerSettings = settings.racerSettings.map(rnStgs => {
            if(rnStgs.id === id){
                rnStgs.racerField = racerRef.current;  WHAT IF I JUST CREATE AN ARRAY OF REFS WHERE I STORE ALL THESE??
            }
            return rnStgs
        })
        
        setSettings(oldData => {
            return { 
                ...oldData,
                racerSettings: newRacerSettings,
                fieldHeightProperties: settings.fieldHeightProperties ? settings.fieldHeightProperties : initFieldDimentions(field),
            }
        })

        //Do not load the default racer fields (the 2 at the beginning or the ones you have after the race)
        if(isListLoadedRef.current){
            animateCreate(racerRef); 
            console.log(`racerCount: ${settings.racerSettings.length}`);
        }
    }, []);

    useLayoutEffect(() => {
        if(!racerRef.current) throw new Error("racerRef is null");
        if(deleteButtonRef.current){
            deleteButtonRef.current.disabled = false;
        }    
        racerRef.current.style.transform = "translateY(0%)";
    }, [settings]);

    

    return { lineRef, faceRef, racerRef, nameInputRef, deleteButtonRef, prevFace, nextFace }
}

export { useRacerSetupItem }

const prevFace = (e: MEvent) => navigateFace(id, faceRef, getPreviousIndex, getFace, e);
const nextFace = (e: MEvent) => navigateFace(id, faceRef, getNextIndex, getFace, e);