import { useEffect, useLayoutEffect, useRef } from "react";
import { useFaceAnimation } from "./useFaceAnimation";
import { useRaceContext } from "../context/RaceContext";
import { useGameContext } from "../../game/context/GameContext";
import { useGame } from "../../game/hooks/useGame";

function useRacer(id: string, name: string, faceIndex: number) {

    const { isRaceActive,  settings } = useGameContext()
    const { registerProgress, checkForScroll, raceDataRef, racerCountRef, checkIfAllFinished, numRegistered, setNumRegistered, setRacersRegistered, finishLineRef } = useRaceContext()

    const scrollAnimationFrame = useRef<number | null>(null);
    const racerBlockRef = useRef<HTMLDivElement>(null);
    const faceRef = useRef<HTMLPreElement>(null);
    const nameRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const rankRef = useRef<HTMLSpanElement>(null);
    const faceBottomDefaultPosition = useRef(0);
    const lastScrollCheckTime = useRef(0);
    const blockPositionRef = useRef<number>(0);
    const facePositionLeftRef = useRef<number>(0);
    const facePositionBottomRef = useRef<number>(0);
    const directionRef = useRef("up");
    const hasFinishedRef = useRef(false);
    const widestFace = useRef(0);

    const { startVictoryAnimation, startDefeatAnimation, stopDefeatAnimation, stopVictoryAnimation } = useFaceAnimation(faceRef, faceIndex, finishLineRef, racerBlockRef);

    useEffect(() => {
        if(!racerBlockRef.current) throw new Error("racerBlockRef is null");
        if(!trackRef.current) throw new Error("trackRef is null");
        
        const racerBlockWidth = parseFloat(getComputedStyle(racerBlockRef.current).width);
        racerBlockRef.current.style.width = `${racerBlockWidth}px`;

        if(numRegistered < settings.racerSettings.length) {
            registerRacer();
        }
        else {
            setRacersRegistered(true);
        }
    }, [numRegistered]); //IF I REMOVE THIS THE GAME WILL NOT START. BECAUSE IT IS USED IN CONTEXT AND NOT IN THE COMPONENT???

    useEffect(()=>{
        if(isRaceActive){
            run(); 
        }
    }, [isRaceActive]);

    function registerRacer(){
        if(!rankRef.current || !faceRef.current) throw new Error("rankRef or faceRef are null");
        raceDataRef.current.set(id, { 
            position: 0, 
            name, 
            rankEl: rankRef.current, 
            faceEl: faceRef.current, 
            progress: 0, 
            offset: 0, 
            racerBlock: racerBlockRef.current, 
            nameEl: nameRef.current, 
            blockPositionRef,
            facePositionLeftRef,
            facePositionBottomRef,
            startVictoryAnimation,
            startDefeatAnimation,
            stopDefeatAnimation,
            stopVictoryAnimation,   
        });
        setNumRegistered(oldVal => oldVal + 1);
    }

    function run(){
        const trackEl = trackRef.current;
        const faceEl = faceRef.current;
        const blockEl = racerBlockRef.current;

        if(trackEl && faceEl && blockEl) {
            const end = trackEl.clientWidth;
            const offset = faceEl.offsetWidth + faceEl.offsetLeft + blockEl.offsetLeft;
            move(blockEl, faceEl, end, performance.now(), offset);
        }
    }

    function move(blockEl: HTMLElement, faceEl: HTMLElement, end: number, time: DOMHighResTimeStamp, offset: number){

        const advance = Math.random() * 1.3 + ((Math.random() * 10 < 5) ? 0 : 2.5);
        blockPositionRef.current += advance;
        if(blockPositionRef.current < end - offset - 12) {
            facePositionBottomRef.current = fluct(facePositionBottomRef.current);
            faceEl.style.transform = `translateY(${facePositionBottomRef.current}px)`;
            blockEl.style.transform = `translateX(${blockPositionRef.current}px)`;
            registerProgress(id, advance);
            if(lastScrollCheckTime.current === 0){
                lastScrollCheckTime.current = time;
            }
            const delta = time - lastScrollCheckTime.current;
            if(delta > 500){
                checkForScroll();
                lastScrollCheckTime.current = time - (delta % 500);
            }
            scrollAnimationFrame.current = requestAnimationFrame((time: DOMHighResTimeStamp) => move(blockEl, faceEl, end, time, offset));
        }
        else {
            hasFinishedRef.current = true;
            const place = registerFinish();
            place === 1 ? startVictoryAnimation() : startDefeatAnimation();
            checkIfAllFinished();
            scrollAnimationFrame.current && cancelAnimationFrame(scrollAnimationFrame.current);
        }
    }

    function registerFinish() { 
        racerCountRef.current.finished += 1;   
        const racerData = raceDataRef.current.get(id);
        if(racerData){
            raceDataRef.current.set(id, { ...racerData, position: racerCountRef.current.finished});
        }
        return racerCountRef.current.finished;
    }

    function fluct(oldVal: number){
        const def = faceBottomDefaultPosition.current;
            if(oldVal - def <= 0){
                directionRef.current = "up";
            }
            else if(oldVal - def >= 5){
                directionRef.current = "down";
            }
            if(directionRef.current === "up"){
                return oldVal + 0.4;
            }
            else if (directionRef.current === "down" ){
                return oldVal - 0.4;
            }
        return oldVal;
    }

    return { 
        blockRef: racerBlockRef,
        faceRef,
        nameRef,
        trackRef,
        rankRef,
        blockPositionRef,
        facePositionLeftRef,
        facePositionBottomRef 
    }
}

export { useRacer }
