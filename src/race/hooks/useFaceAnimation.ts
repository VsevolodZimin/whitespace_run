import { useRef } from "react";
import { useAnimationFrame } from "../../game/hooks/useAnimationFrame";
import { Reff } from "../../types";

function useFaceAnimation(
    faceRef: React.RefObject<HTMLPreElement>, 
    faceIndex: number,
    finishLineRef: Reff<HTMLDivElement | null>, 
    racerBlockRef: Reff<HTMLDivElement | null>
){

    const currDefeatFrameRef = useRef(0);
    const currVictoryFrameRef = useRef(0);
    const preAnimationFaceRef = useRef("");
    const isAdjusted = useRef(false);

    const defeatAnimations = [
        "(⩾﹏⩽' )",
        "(ಥ_ಥ' )",
        "(ಥ_ಥ' )",
        "(ಥ_ಥ' )",
        "( '⩾﹏⩽)",
        "( 'ಥ_ಥ)",
        "( 'ಥ_ಥ)",
        "( 'ಥ_ಥ)",
        "('⩾﹏⩽ )",
        "('ಥ_ಥ )",
        "('ಥ_ಥ )",
        "('ಥ_ಥ )",
    ];
        
    const victoryAnimation = [
        "\\(   •‿• )/",
        "\\(   -‿- )/",
        "\\(   •‿• )/",
        "\\(   -‿- )/",
        "\\(   •‿• )/",
        "\\( •‿•   )/",
        "\\( -‿-   )/",
        "\\( •‿•   )/",
        "\\( -‿-   )/",
        "\\( •‿•   )/",
        ".(   -‿- )*",
        ".-(   -‿- )-*",
        ".(   -‿- )*",
        ".-(   -‿- )-*",
        ".(   -‿- )*",
        "*( -‿-   ).",
        "*-( -‿-   )-.",
        "*( -‿-   ).",
        "*-( -‿-   )-.",
        "*( -‿-   ).",
        ".(   -‿-  )*",
        "*(   -‿-  ).",
        ".(   -‿-  )*",
        "*(   -‿-  ).",
        ".(   -‿-  ).",
        "*(   -‿- )*",
        ".(   -‿-  ).",
        "*(   -‿-  )*",
        ".(   -‿-  )."
    ];

    const WIN_MAX = victoryAnimation.length;
    const LOSE_MAX = defeatAnimations.length;
        
    const { startAnimation: startVictory, cancelRequest: cancelVictory } = useAnimationFrame(200);   
    const { startAnimation: startDefeat, cancelRequest: cancelDefeat } = useAnimationFrame(500);   

    function startVictoryAnimation() {
        if(!faceRef.current) throw new Error("faceRef is null");
        if(faceIndex !== 1813 && faceIndex !== 1792){
            preAnimationFaceRef.current = faceRef.current.innerHTML;
            startVictory(runVictoryAnimation);
        }
    }

    function startDefeatAnimation(){
        if(faceRef.current  && (faceIndex !== 1813 && faceIndex !== 1792)){
            preAnimationFaceRef.current = faceRef.current.innerHTML;
            startDefeat(runDefeatAnimation);
        }
    }

    function stopVictoryAnimation(){
        if(faceRef.current  && (faceIndex !== 1813 && faceIndex !== 1792)){
            faceRef.current.innerHTML = preAnimationFaceRef.current;
            currVictoryFrameRef.current = 0;
            cancelVictory();
        }
    }

    function stopDefeatAnimation(){
        if(faceRef.current  && (faceIndex !== 1813 && faceIndex !== 1792)){
            faceRef.current.innerHTML = preAnimationFaceRef.current;
            currDefeatFrameRef.current = 0;        
            cancelDefeat();
        }
    }

    function runVictoryAnimation(){
        if(!faceRef.current) throw new Error('faceRef is null');
        if(!racerBlockRef.current) throw new Error('racerBlockRef is null');
        if(!isAdjusted.current){
            let beforeFaceWidth = faceRef.current.offsetWidth;
            let afterFaceWidth;
            let beforeBiggerBy;
            faceRef.current.innerText = victoryAnimation[currVictoryFrameRef.current];
            afterFaceWidth = faceRef.current.offsetWidth;
            beforeBiggerBy = beforeFaceWidth - afterFaceWidth;
            if(beforeBiggerBy > 0){
                
                const match = racerBlockRef.current.style.transform.match(/\d.+(?=px)/);
                if(!match) throw new Error("the pattern didn't yield a match");
                const currTransformInPx = Number(match[0]);
                racerBlockRef.current.style.transform = `translateX(${currTransformInPx + beforeBiggerBy / 2}px)`;
            }
            isAdjusted.current = true;
        }
        else {
            faceRef.current.innerText = victoryAnimation[currVictoryFrameRef.current];
            currVictoryFrameRef.current = (currVictoryFrameRef.current + 1) % WIN_MAX;
        }
        
    }

    function runDefeatAnimation(){
        if(!faceRef.current) throw new Error("faceRef is null");
        if(!racerBlockRef.current) throw new Error("faceRef is null");
        if(!isAdjusted.current){
            let beforeFaceWidth = faceRef.current.offsetWidth;
            let afterFaceWidth;
            let beforeBiggerBy;
            faceRef.current.innerText = victoryAnimation[currVictoryFrameRef.current];
            afterFaceWidth = faceRef.current.offsetWidth;
            beforeBiggerBy = beforeFaceWidth - afterFaceWidth;
            if(beforeBiggerBy > 0){
                
                const match = racerBlockRef.current.style.transform.match(/\d.+(?=px)/);
                if(!match) throw new Error("the pattern didn't yield a match");
                const currTransformInPx = Number(match[0]);
                racerBlockRef.current.style.transform = `translateX(${currTransformInPx + beforeBiggerBy / 2}px)`;
            }
            isAdjusted.current = true;
        }
        else {
            faceRef.current.innerText = defeatAnimations[currDefeatFrameRef.current];
            currDefeatFrameRef.current = (currDefeatFrameRef.current + 1) % LOSE_MAX;
        }
        
    }
    
    function justifyInitialFaceAnimationPosition(){
        if(!finishLineRef.current) throw new Error("finishLineRef is null");
        if(!faceRef.current) throw new Error("faceRef is null");
        if(!racerBlockRef.current) throw new Error("racerBlockRef is null");

        const faceRightEdge = faceRef.current.getBoundingClientRect().right;
        const finishLineLeftEdge = finishLineRef.current.getBoundingClientRect().left
        const distance = faceRightEdge - finishLineLeftEdge;
        if(distance > 10) {
            racerBlockRef.current.style.transform = `translateX(${distance - 10}px)`;
        }
    }

    return { startVictoryAnimation, startDefeatAnimation, stopVictoryAnimation, stopDefeatAnimation }
}

export { useFaceAnimation }