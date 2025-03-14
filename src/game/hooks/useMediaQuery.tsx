import { useEffect, useState } from "react";
import { useEventListener } from "./useEventListener";

function useMediaQuery(query: string){
    const [mediaQuery, setMediaQuery] = useState(matchMedia(query)); 
    const { reg, rmv } = useEventListener(); 
    useEffect(() => {
        const mq = matchMedia(query);
        reg(mq, 'change', () => {
          setMediaQuery(mq);
          rmv();  
        })
    }, [query])
    return { mediaQuery }
}

export { useMediaQuery }