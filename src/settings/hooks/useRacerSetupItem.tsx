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
    
    const { navigateFace, isListLoadedRef } = useSetupContext()
    const { settings, setSettings, racerFields } = useGameContext();
    const { animateCreate } = useSetupAnimation();
    const { getFace, getNextIndex, getPreviousIndex } = useFaces(0);

    const prevFace = (e: MEvent) => navigateFace(id, faceRef, getPreviousIndex, getFace, e);
    const nextFace = (e: MEvent) => navigateFace(id, faceRef, getNextIndex, getFace, e);

    useEffect(() => {

        racerFields.current.set(id, racerRef);
        
        setSettings(oldData => {
            return { 
                ...oldData,
                fieldHeightProperties: settings.fieldHeightProperties ? settings.fieldHeightProperties : initFieldDimentions(racerRef),
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