import { useRef, useState } from "react"

/**
 * 1) startAnimation(callback) passes an arrow function 
 * with requestAnimationFrame calling animate(callback).
 * 
 * 2) animate compares current time (CURR) with the TESLE.
 * if CURR - TESLE >= offset => callback fires and TESLE = CURR
 * otherwise, nothing happens and a new animation frame is scheduled.  
 * 
 * 3) The process continues until cancel request is called.
 */


function useAnimationFrame(frameInterval = -1){
    const isRunning = useRef(false);
    const requestID = useRef<number | null>(null);

    //Time elspased since the last callback execution (TESLE)
    const timeSinceLastFrame = useRef(0);

    //Animates one frame
    function animate(callback: () => void, currentTime: DOMHighResTimeStamp){
        if(timeSinceLastFrame.current === 0) {
            timeSinceLastFrame.current = currentTime;
        }
        const deltaTime = currentTime - timeSinceLastFrame.current;
        if(frameInterval < 0 || deltaTime >= frameInterval){
            callback();
            timeSinceLastFrame.current = currentTime - (deltaTime % frameInterval);
        }
        requestID.current = requestAnimationFrame((time: DOMHighResTimeStamp) => animate(callback, time));
    }

    //Animation entry point
    function startAnimation(callback: () => void){
        if(isRunning.current) return;
        isRunning.current = true;
        timeSinceLastFrame.current = 0;
        requestAnimationFrame((time: DOMHighResTimeStamp) => animate(callback, time));
    }
    
    // called from the outside to cancel the animation frame request
    function cancelRequest(){
        if(requestID.current){
            cancelAnimationFrame(requestID.current);
        }
        isRunning.current = false;
        timeSinceLastFrame.current = 0;
    }

    return { startAnimation, cancelRequest, timeSinceLastFrame }
}

export { useAnimationFrame }