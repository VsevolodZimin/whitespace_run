import { useEffect, useRef, useState } from "react";
import { Reff, RacerData } from "../../types";
import { config } from "../../../config";
import { useGameContext } from "../../game/context/GameContext";
import { useAnimation } from "../../game/hooks/useAnimation";
import { useScroll } from "../../game/hooks/useScroll";


function useRace() {

    const { settings, setCountdown, setRaceOver, setRaceActive, setDoneSettingUp, backdropRef } = useGameContext();
    const [isImgLoaded, setImgLoaded] = useState(false); 
    const [isRacersRegistered, setRacersRegistered] = useState(false);
    
    const { scrollTrackWithScrollEndEvent, cancelRequest } = useScroll(100);
    const raceAreaRef = useRef<HTMLDivElement>(null)
    const finishLineRef = useRef<HTMLDivElement>(null)
    const raceDataRef = useRef(new Map<string, RacerData>([]));
    const hasScrolledRef = useRef(false);
    const borderBottomRef = useRef<HTMLPreElement | null>(null);
    const borderTopRef = useRef<HTMLPreElement | null>(null);
    const scrollPoitionRef = useRef(0);
    const viewPortWidthRef = useRef(innerWidth);
    const onResetScrollRef = useRef(false);
    const [numRegistered, setNumRegistered] = useState(0); 
    const racerCountRef = useRef({ finished: 0 });
    const winner = useRef("");
    
    
    useEffect(()=>{
        if(!backdropRef.current) throw new Error("backdropRed is null");
        if(!finishLineRef.current) throw new Error("finishLineRef is null");
        if(!raceAreaRef.current) throw new Error("raceAreaRef is null");

        finishLineRef.current.style.backgroundImage = `url('${config.getImgPath('finishPattern.png')}')`;

        if(isRacersRegistered) {
            if(!settings.composer || settings.composer && isImgLoaded){
                justifyInitialFacePosition();
            }
            const { getAnimation } = useAnimation();
            const { setup, timing } = getAnimation("fade-in");
            const fadeInAnimation = backdropRef.current.animate(setup, timing); 
            fadeInAnimation.finished.then(anmt => {
                anmt.commitStyles();
                anmt.cancel();
                setCountdown(true);
            });
            calcultaeFinishLine(finishLineRef, raceAreaRef)
            calculateBorders(borderTopRef, borderBottomRef, raceAreaRef);
        }
    }, [isImgLoaded, isRacersRegistered ])



    function checkForScroll(){
        const leader = rankRacers(raceDataRef.current)[0][1].faceEl;
        if(leader){
            const covered = leader.getBoundingClientRect().right
            if(viewPortWidthRef.current - covered <= 0 && !hasScrolledRef.current){
                hasScrolledRef.current = true;
                const newPosition = scrollPoitionRef.current + innerWidth;
                scrollPoitionRef.current += covered;
                scrollTrackWithScrollEndEvent(newPosition).then(() => {
                    hasScrolledRef.current = false;
                    cancelRequest();
                });            
            }
        }
    }

    function registerProgress(id: string, progress: number){
        const oldData = raceDataRef.current.get(id);
        if(oldData){
            raceDataRef.current.set(id, { ...oldData, progress: oldData.progress + progress });
        }
    }

    //I need to understand how isFinished flag works in racer!!!!!!!!!!


    function checkIfAllFinished(){
        if(settings.racerSettings.length - racerCountRef.current.finished === 0) finishRace(raceDataRef.current);
    }

    function finishRace(newMap: Map<string, RacerData>) {
        newMap.forEach((racer) => {
            if(racer.rankEl){
                setMedal(racer.rankEl, racer.position);    
                setRaceOver(true);
                setRaceActive(false);
                if(racer.position === 1) winner.current = racer.name;
            }
        });
    }

    function setMedal(rankEl: HTMLSpanElement, rank: number) {

        if(rank === 1) {
            rankEl.classList.remove("invisible");
            rankEl.innerText = '🥇'; 
        } 
        else if(rank === 2) {
            rankEl.classList.remove("invisible");
            rankEl.innerText = '🥈'; 
        } 
        else if(rank === 3) {
            rankEl.classList.remove("invisible");
            rankEl.innerText = '🥉'; 
        } 
    }

    function rankRacers(raceProgress: Map<string, RacerData>){
        return Array.from(raceProgress.entries()).sort((a, b) => {
            return b[1].progress - a[1].progress
        })
    }

    function justifyInitialFacePosition(){
        let max = -1
        raceDataRef.current.forEach((racerData) => {
            const faceEl = racerData.faceEl;
            if(faceEl){
                max = faceEl.getBoundingClientRect().right > max ? faceEl.getBoundingClientRect().right : max;
                const x = faceEl.getBoundingClientRect().right;
                console.log()
            }
        });
        raceDataRef.current.forEach(racerData => {
            const faceEl = racerData.faceEl;
            const blockEl = racerData.racerBlock
            let offset: number;
            if(faceEl && blockEl){
                offset = max - faceEl.getBoundingClientRect().right;
                racerData.offset = offset;
                blockEl.style.transform = `translateX(${offset}px)`;
                racerData.blockPositionRef.current += offset;
            }
        });
    }

    function resetPositions(isFinished: boolean){
        raceDataRef.current.forEach((racerData, id) => {
            if(racerData.racerBlock){

                //This check prevents an attempt to load composer's on the setup screen (which would fail as composer icons are not incuded in the face array) 
                if(settings.composer && isFinished) { 
                    const rnStgs = settings.racerSettings.find(rnStgs => rnStgs.id === id);
                    if(rnStgs?.faceIndex === 1813 || rnStgs?.faceIndex === 1792){
                        rnStgs.faceIndex = 0;
                    } 
                }
                racerData.racerBlock.style.transform = `translateX(${racerData.offset}px)`;
                racerData.blockPositionRef.current = racerData.offset;
                racerData.rankEl?.classList.add("invisible");
                racerData.stopDefeatAnimation();
                racerData.stopVictoryAnimation();
            }
        });
    }

    function resetGame(){
        racerCountRef.current.finished = 0;
        resetPositions(false);
        scrollPoitionRef.current = 0;
        onResetScrollRef.current = true;
        onResetScrollRef.current = false;
        scrollTo({left: 0, behavior: "smooth"});
        setRaceOver(false);
        setCountdown(true);
    }

    function endGame(){
        racerCountRef.current.finished = 0;
        resetPositions(true);
        scrollPoitionRef.current = 0;
        setRacersRegistered(false);
        setCountdown(false);
        setRaceOver(false);
        setNumRegistered(0);
        setDoneSettingUp(false);
        raceDataRef.current = new Map<string, RacerData>([]);
    }
    

    return {
        raceDataRef,
        raceAreaRef, 
        racerCountRef,
        scrollPoitionRef,
        isImgLoaded,
        numRegistered,
        isRacersRegistered,
        finishLineRef,
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
    }
}

function calculateBorders(
    top: Reff<HTMLPreElement | null>, 
    bottom: Reff<HTMLPreElement | null>, 
    raceAreaRef: Reff<HTMLDivElement | null>){
    
        if(!raceAreaRef.current) throw new Error("raceAreaRef is null");
        if(!bottom.current) throw new Error("bottom is null");
        if(!top.current) throw new Error("top is null");

        let borderStr = "";
        const targetWidth = raceAreaRef.current.offsetWidth;
        let calcEl: HTMLPreElement | null = document.createElement('pre');
        calcEl.style.visibility = 'hidden';
        calcEl.style.position = 'absolute';
        document.body.append(calcEl);
        
        while(calcEl.offsetWidth < targetWidth) {
            borderStr += "ᨒ ";
            calcEl.textContent = calcEl.textContent + "ᨒ ";
        }

        calcEl.remove();
        calcEl = null;
        top.current.innerText = borderStr;
        bottom.current.innerText = borderStr;
} 

function calcultaeFinishLine(finishLineRef: Reff<HTMLDivElement | null>, raceAreaRef: Reff<HTMLDivElement | null>){
    if(!raceAreaRef.current) throw new Error("raceAreaRef is null");
    if(!finishLineRef.current) throw new Error("finishLineRef is null");

    finishLineRef.current.style.height = `${raceAreaRef.current.offsetHeight}px`;
}

export { useRace }



