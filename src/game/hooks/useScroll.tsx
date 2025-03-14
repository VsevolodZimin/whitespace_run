
import { useAnimationFrame } from "./useAnimationFrame";

function useScroll(scrollCheckFrequency: number){
    let isScrolling = false;
    const { startAnimation, cancelRequest } = useAnimationFrame(scrollCheckFrequency);
    
    function scrollListUpWithScrollEndEvent(scrollDistance: number, isLastField: boolean) {
        const adjustedScrollDistance = scrollDistance + 1;
        return new Promise<void>((resolve, reject) => {
            if(scrollY > 0 && isLastField) {

                //Register scroll listener 
                document.addEventListener('scroll', () => {
                    isScrolling = true;
                });
                
                //calculating and adjusting real scroll distance to avoid negative scroll
                const delta = scrollY - adjustedScrollDistance;
                const scrollPosition = delta > 0 ? delta : 0;
                
                //Triggering scrolling
                scrollTo({ top: scrollPosition, behavior: "smooth" });    
                
                //Checking if scroll is in progress every 100ms; 
                startAnimation(checkIfScrolling);

                function checkIfScrolling(){
                    if(isScrolling){
                        isScrolling = false; 
                    }

                    else {
                        resolve();                
                    }
                }
            }
            else {
                resolve();
            }
        })
    }

    function scrollTrackWithScrollEndEvent(scrollDistance: number) {
        return new Promise<void>((resolve, reject) => {

            //Register scroll listener 
            document.addEventListener('scroll', () => {
                isScrolling = true;
            });
            
            //Triggering scrolling
            scrollTo({ left: scrollDistance, behavior: "smooth" });    
            
            //Checking if scroll is in progress every 100ms; 
            startAnimation(checkIfScrolling);

            function checkIfScrolling(){
                if(isScrolling){
                    isScrolling = false; 
                }
                else {
                    resolve();                
                }
            }
        })
    }

    return { scrollTrackWithScrollEndEvent, scrollListUpWithScrollEndEvent, cancelRequest };
}
export { useScroll} 

