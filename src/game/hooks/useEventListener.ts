import { useEffect, useRef } from "react";

function useEventListener() {
    
    const isRegisteredRef = useRef(false);
    const abortController = new AbortController();
    
    useEffect(()=>{
        return () => {
            rmv();
        }   
    }, [])

    function reg<T extends keyof HTMLElementEventMap>(target: EventTarget, type: T, callback: (e: HTMLElementEventMap[T]) => void){
        if (!isRegisteredRef.current) {
            target.addEventListener(type, callback as EventListenerOrEventListenerObject, {signal: abortController.signal});
            isRegisteredRef.current = true;
        }
    }

    function rmv(){
        abortController.abort();
    }

    return { reg, rmv }
}

export { useEventListener }