import { useEffect, useRef } from "react";
import { useEventListener } from "../../game/hooks/useEventListener";
import { config } from "../../../config";
import { useGameContext } from "../../game/context/GameContext";
import { useAnimation } from "../../game/hooks/useAnimation";
import { useRaceContext } from "../context/RaceContext";
import { calculateHeightFromDOMObject } from "../../game/utils";

const END_GAME_BUTTONS = {
    RESET: "reset",
    BACK: "back"
} as const;

function useEndGameDialog(){

    const { wagnerAudio, rossiniAudio, settings, backdropRef, isRestartedRef } = useGameContext();
    const { resetGame, endGame, winner } = useRaceContext();

    const dialogRef = useRef<HTMLDialogElement>(null);
    const textElRef = useRef<HTMLParagraphElement>(null); 
    const slideAudio = useRef(new Audio(config.getSoundPath('slide.mp3')));
    const { getAnimation } = useAnimation();

    useEffect(() => {
        const dialog = dialogRef.current;
        const textEl = textElRef.current;
        if(!dialog) throw new Error("dialogRef is null");
        if(!textEl) throw new Error("textElRef is null");

        const interval = setTimeout(()=>{
            let slideTo;
          
            dialog.showModal();
            textEl.textContent = `Congrats, ${winner.current}`;
            const height = calculateHeightFromDOMObject(dialog);
            slideTo = height / window.innerHeight * 100;
            dialog.close();
            dialog.style.height = `${slideTo}svh`;
            
            dialog.showModal();
            const { setup, timing } = getAnimation("slide-down");
            const animation = dialog.animate(setup, timing);
            slideAudio.current.play();
            animation.finished.then(anmt => {
                anmt.commitStyles();
                anmt.cancel();
            })
            
            clearTimeout(interval);
        }, 2000)    
    }, [])

    function handleRetry(){
        slideAudio.current.play();
        if(dialogRef.current && backdropRef.current){
            resetBackgroundMusic();
            const { setup, timing } = getAnimation("slide-up");
            const slideUpAnimation = dialogRef.current.animate(setup, timing);
            slideUpAnimation.finished.then(anmt => {
                anmt.commitStyles();
                anmt.cancel();
                resetGame();
            })        
        }
    }
    
    function handleGameEnd(){
        slideAudio.current.play();
        const dialog = dialogRef.current;
        const backdrop = backdropRef.current;
        if(!backdrop || !dialog ) throw new Error('backdrop and/or dialog are null');
        resetBackgroundMusic();
        
        const { setup: slideUpSetup, timing: slideUpTiming }= getAnimation("slide-up");
        const { setup: blackoutSetup, timing: blackoutTiming } = getAnimation("black-out"); 
        const slideUpAnimation = dialog.animate(slideUpSetup, slideUpTiming);
        slideUpAnimation.finished.then(anmt => {
            anmt.commitStyles();
            anmt.cancel();
            const blackOutAnimation = backdrop.animate(blackoutSetup, blackoutTiming);
            blackOutAnimation.finished.then(anmt => {
                anmt.commitStyles();
                anmt.cancel();
                endGame();
                isRestartedRef.current = true;
            })
        })        
    }

    function resetBackgroundMusic(){
        if(settings.composer === "wagner") {
            wagnerAudio.current.pause();
            wagnerAudio.current.currentTime = 0;
        }
        if(settings.composer === "rossini") {
            rossiniAudio.current.pause();
            rossiniAudio.current.currentTime = 0;
        }
    }


    return { dialogRef, textElRef, handleRetry, handleGameEnd }
}

export { useEndGameDialog };







