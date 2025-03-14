import { AnimationTiming, HeightDimentions } from "../../types";
import { deleteIconWidth } from "../utils";


function useAnimation(){

    const slideDownSetup = [
        { transform: "translateY(-100%)" },
        { transform: "translateY(0)" }
    ];
    
    const slideUpSetup = [
        { transform: "translateY(0)" },
        { transform: "translateY(-100%)" },
    ];

    const appearSetup = [
        { opacity: 0 },
        { opacity: 1 },
    ];
    
    const disappearSetup = [
        { opacity: 1 },
        { opacity: 0 },
    ];

    const strikeOutSetup = [
        { transform: "scale(0)" },
        { transform: "scale(1)" },
    ];

    const buttonSetup = [
        // { transform: 'scale(1.0)' },
        { transform: 'scale(0.98)' },
        { transform: 'scale(1.0)' },
        // { transform: 'scale(1.0)' },
    ];

    const navButtonSetup = [
        { transform: 'scale(0.8)' },
        { transform: 'scale(1.4)' },
        { transform: 'scale(0.8)' },
    ];

    const faceSetup = [
        { transform: 'scale(0.8)' },
        { transform: 'scale(1.3)' },
        { transform: 'scale(0.8)' },
    ]

    const whitespaceSetup = [
        {
            opacity: 0,
            transform: "translateX(6%)",
            color: "rgba(0, 0, 0, 0)", 
        },
        { 
            opacity: 1,
            transform: "translateX(0%)",
            color: "rgb(84, 50, 19)",
        }
    ]

    const runSetup = [
        {
            opacity: 1,
            transform: "translateX(-320%) skewX(0deg)",
            color: "rgba(0, 0, 0, 0)",
        },
        { 
            opacity: 1,
            transform: "translateX(-20%) skewX(14deg)",
            color: "rgb(84, 50, 19)",
        },
        { 
            opacity: 1,
            transform: "translateX(24%) skewX(-40deg)",
            color: "rgb(84, 50, 19)",
        },
        { 
            opacity: 1,
            transform: "translateX(0%) skewX(0deg)",
            color: "rgb(84, 50, 19)",
        }
    ]

    const blackOutSetup = [
        { 
            clipPath: "circle(0%)",
            backgroundColor: "rgb(84, 50, 19)",
         },
        { 
            clipPath: "circle(100%)",
            backgroundColor: "black",

        },
    ];

    const fadeInSetup = [
        { 
            clipPath: "circle(100%)",
            backgroundColor: "black"
        },
        { 
            clipPath: "circle(75%)",
            backgroundColor: "black"
        },
        { 
            clipPath: "circle(50%)",
            backgroundColor: "black"
        },
        { 
            clipPath: "circle(25%)",
            backgroundColor: "black"
        },
        { 
            clipPath: "circle(0%)",
            backgroundColor: "rgb(84, 50, 19)"
        },
    ];

    const errorAnimation = [
        {
            opacity: "0",
            marginTop: "0",
            marginBottom: "0",
            height: "0"
        },
        {
            opacity: 1,
            marginTop: "0.6rem",
            marginBottom: "0.6rem",
            height: "1.5ch"
        },
    ]

    const noErrorAnimation = [
        {
            opacity: 1,
            marginTop: "0.6rem",
            marginBottom: "0.6rem",
            height: "1.5ch"
        },
        {
            opacity: "0",
            marginTop: "0",
            marginBottom: "0",
            height: "0"
        },
    ];
    const appearFromLeft = [
        {
            opacity: 0,
            transform: "translateX(-8%)"
        },
        {
            opacity: 1,
            transform: "translateX(0%)"
        },
    ];
    const appearFromRight = [
        {
            opacity: 0,
            transform: "translateX(8%)"
        },
        {
            opacity: 1,
            transform: "translateX(0%)"
        },
    ];

    const deleteIcon = [
        { scale: '0.7' },
        { scale: '1' },
    ]



    const rotateSetup = [
        { transform: "rotate(0deg) scale(1)",},
        { transform: "rotate(360deg) scale(0.5)" },
        { transform: "rotate(720deg) scale(1)" },
    ];
    const forwardsEase100: AnimationTiming = {
        duration: 100,
        fill: 'forwards',
        easing: 'ease',
    }
    const forwardsEase200: AnimationTiming = {
        duration: 200,
        fill: 'forwards',
        easing: 'ease',
    }
    const forwardsEase250: AnimationTiming = {
        duration: 250,
        fill: 'forwards',
        easing: 'ease',
    }
    const forwardsEase300: AnimationTiming = {
        duration: 300,
        fill: 'forwards',
        easing: 'ease',
    }

    const forwardsEase400: AnimationTiming = {
        duration: 400,
        fill: 'forwards',
        easing: 'ease',
    }

    const forwardsEaseOut400: AnimationTiming = {
        duration: 600,
        fill: 'forwards',
        easing: 'ease-out',
    }

    const forwardsEase500: AnimationTiming = {
        duration: 500,
        easing: "ease-out",
        fill: "forwards"
    };

    const forwardsEase1000: AnimationTiming = {
        duration: 800,
        fill: 'forwards',
        easing: 'ease-in',
    }


    const duration300: AnimationTiming = {
        duration: 300,
    }

    function getAnimation(type: 'disappear'|'strike-out'|'create'|"rotate"|"black-out"|'fade-in'| "slide-down" | "slide-up" | 'whitespace' | 'run' | 'navButton' | 'face' | 'button' | 'nav-button' | 'error' | 'no-error' | 'appear-from-left' | 'appear-from-right' | 'delete-icon'){
        switch(type){
            case "disappear": return {
                setup: disappearSetup,
                timing: forwardsEase250,
            }
            case "strike-out": return {
                setup: strikeOutSetup,
                timing: forwardsEase300,
            }
            case "create": return {
                setup: appearSetup,
                timing: forwardsEase100,
            }
            case "rotate": return {
                setup: rotateSetup,
                timing: forwardsEase400,
            }
            case "black-out": return {
                setup: blackOutSetup,
                timing: forwardsEase1000,
            }
            case "fade-in": return {
                setup: fadeInSetup,
                timing: forwardsEase1000,
            }
            case "slide-down": return {
                setup: slideDownSetup,
                timing: forwardsEase400,
            }            
            case "slide-up": return {
                setup: slideUpSetup,
                timing: forwardsEase400,
            }
            case "whitespace": return {
                setup: whitespaceSetup,
                timing: forwardsEase500,
            }
            case "run": return {
                setup: runSetup,
                timing: forwardsEase1000,
            }
            case "button": return {
                setup: buttonSetup,
                timing: duration300,
            }
            case "nav-button": return {
                setup: navButtonSetup,
                timing: duration300,
            }

            case "error": return {
                setup: errorAnimation,
                timing: forwardsEase300,
            }

            case "no-error": return {
                setup: noErrorAnimation,
                timing: forwardsEase300,
            }
            case "appear-from-left": return {
                setup: appearFromLeft,
                timing: forwardsEase200,
            }
            case "appear-from-right": return {
                setup: appearFromRight,
                timing: forwardsEase200,
            }
            case "delete-icon": return {
                setup: deleteIcon,
                timing: forwardsEase400,
            }
            default: throw new Error("No animation with this name");
        }
    }


    function getHeightSquishAnimation(dims: HeightDimentions){
        const setup = [
            { 
                borderTop: `${dims.borderTop}px`,
                marginTop: `${dims.marginTop}px`,
                paddingTop: `${dims.paddingTop}px`,
                height: `${dims.height}px`,
                paddingBottom: `${dims.paddingBottom}px`,
                marginBottom: `${dims.marginBottom}px`,
                borderBottom: `${dims.borderBottom}px`,
            },
            { 
                borderTop: `0px`,
                marginTop: `0px`,
                paddingTop: `0px`,
                height: `0px`,
                paddingBottom: `0px`,
                marginBottom: `0px`,
                borderBottom: `0px`,
            },
        ];
        
        const timing: AnimationTiming = {
            duration: 300,
            fill: 'forwards',
            easing: 'ease',
        };

        return { setup, timing }
    } 


    function getWidthSquishAnimation(){
        const setup = [
            { width: `${deleteIconWidth}px`},
            { width: `0px`},
        ];
        
        const timing: AnimationTiming = {
            duration: 300,
            fill: 'forwards',
            easing: 'ease',
        };

        return { setup, timing }
    }

    function getWidthUnsquishAnimation(){
        const setup = [
            { width: `0px`},
            { width: `${deleteIconWidth}px`},
        ];
        
        const timing: AnimationTiming = {
            duration: 300,
            fill: 'forwards',
            easing: 'ease',
        };

        return { setup, timing }
    }
    
    function getGapSquishAnimation(before: number){
        const setup = [
            { gap: `${before}px`},
            { gap: `0px`},
        ];
        
        const timing: AnimationTiming = {
            duration: 300,
            fill: 'forwards',
            easing: 'ease',
        };

        return { setup, timing }
    }

    function getGapUnsquishAnimation(val: number){
        const setup = [
            { gap: `0px`},
            { gap: `${val}px`},
        ];
        
        const timing: AnimationTiming = {
            duration: 300,
            fill: 'forwards',
            easing: 'ease',
        };

        return { setup, timing }
    }

    return { 
        getAnimation, 
        getHeightSquishAnimation, 
        getWidthSquishAnimation, 
        getGapSquishAnimation,
        getWidthUnsquishAnimation,
        getGapUnsquishAnimation,
    }
}

export { useAnimation };