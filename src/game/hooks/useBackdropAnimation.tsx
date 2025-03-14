import { AnimationTiming } from "../../types";

function useBackdropAnimation() {
    const backdropSetup = [
        { clipPath: 'circle(0%)', backgroundColor: 'rgb(84, 50, 19)' },
        { clipPath: 'circle(100%)', backgroundColor: 'black'}
    ];

    const backdropTiming: AnimationTiming = {
        duration: 500,
        fill: "forwards",
        easing: "ease", 
    };

    function getBackdropAnimation(el: Element){
        return el.animate(backdropSetup, backdropTiming);
    }

    return { getBackdropAnimation }
}

export { useBackdropAnimation }