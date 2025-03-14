import React, { useEffect, useMemo, useRef, useState } from "react";
import { useEventListener } from "../../game/hooks/useEventListener";
import { GlobalSettings, MoveUpAnimationMap, Reff } from "../../types";
import { calculateWidth, extractDOMItems } from "../../game/utils";
import { useAnimation } from "../../game/hooks/useAnimation";
import { useGameContext } from "../../game/context/GameContext";
import { useSetupContext } from "../context/SetupContext";

function useSetupAnimation(isListLoadedRef: React.MutableRefObject<boolean>){

    const { settings, racerFields } = useGameContext(); 

    const { getAnimation, getHeightSquishAnimation, getWidthSquishAnimation, getWidthUnsquishAnimation, getGapSquishAnimation, getGapUnsquishAnimation } = useAnimation();

    function animateLayout(
        nameFieldRef: Reff<HTMLInputElement | null> , 
        addButtonRef: Reff<HTMLButtonElement | null>, 
        runButtonRef: Reff<HTMLButtonElement | null>, 
        racerListHeaderRef: Reff<HTMLDivElement | null>,
        whitespaceRef: Reff<HTMLSpanElement | null>,
        runRef: Reff<HTMLSpanElement | null>,
    ){
        const add = addButtonRef.current;
        const nameField = nameFieldRef.current;
        const header = racerListHeaderRef.current;
        const whitespace = whitespaceRef.current;
        const run = runRef.current;
        const runButton = runButtonRef.current;

        if(!nameField) throw new Error("nameFieldRef is null");
        if(!add) throw new Error("addButtonRef is null");
        if(!header) throw new Error("racerListHeaderRef is null");
        if(!whitespace) throw new Error("whitespaceRef is null");
        if(!run) throw new Error("runRef is null");
        if(!runButton) throw new Error("runButtonRef is null");

        const { setup: leftSetup, timing: leftTiming } = getAnimation('appear-from-left');
        const { setup: rightSetup, timing: rightTiming } = getAnimation('appear-from-right');
        const { setup: whitespaceSetup, timing: whitespaceTiming } = getAnimation("whitespace");
        const { setup: runSetup, timing: runTiming } = getAnimation("run");

        const nameFieldAnimation = nameField.animate(leftSetup, leftTiming);
        nameFieldAnimation.finished.then(anmt => {
            anmt.commitStyles();
            anmt.cancel;
            add.animate(rightSetup, rightTiming);
            const addAnimation = add.animate(rightSetup, rightTiming);
            addAnimation.finished.then(anmt => {
                anmt.commitStyles();
                anmt.cancel();
                const headerAnimation = header.animate(leftSetup, leftTiming);
                headerAnimation.finished.then(anmt => {
                    anmt.commitStyles();
                    anmt.cancel();

                    whitespace.animate(whitespaceSetup, whitespaceTiming);
                    const runAnimation = run.animate(runSetup, runTiming);
                    runAnimation.finished.then(anmt => {
                        anmt.commitStyles();
                        anmt.cancel();
                        animateLoading(0);
                    })
                })
            })
        });
        const runButtonAnimation = runButton.animate(rightSetup, rightTiming);
        runButtonAnimation.finished.then(anmt => {
            anmt.commitStyles();
            anmt.cancel();
        })
    }

    function animateLoading(index: number){   
        const items = extractDOMItems(racerFields)

        if(index < items.length){
            const { setup, timing } = getAnimation("create");
            const createAnimation = items[index].animate(setup, timing);
            createAnimation.finished.then((anmt) => {
                anmt.commitStyles();
                anmt.cancel();
                animateLoading(index + 1);
            })
        }
        isListLoadedRef.current = true;
    }

    function animateCreate(racer: HTMLDivElement | Reff<HTMLElement | null>){
        const el = racer instanceof HTMLDivElement ? racer : racer.current;
        if(!el) throw new Error('blackout is null');

        const { setup, timing } = getAnimation("create");
        const createAnimation = el.animate(setup, timing); 
        createAnimation.finished.then((anmt) => {
            anmt.commitStyles();
            anmt.cancel();
        })
        if(settings.racerSettings.length === 3){
            const deleteIcons = Array.from(document.querySelectorAll(".delete-icon"));
            const buttonGroups = Array.from(document.querySelectorAll("#racer-button-group"));

            //Without the following three lines the button group in the first three items will have 0px gap, while others will have it set to 0.6rem.  
            const buttonGroupGapRem = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--button-group-gap"));
            const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            const buttonGroupGapPx = buttonGroupGapRem * fontSize;

            if(deleteIcons.length === 0 || buttonGroups.length === 0) throw new Error("Some DOM elements are missing");
            
            deleteIcons.forEach(icon => {
                const { setup: squishWidthAnimationSetup, timing: squishWidthAnimationTiming } = getWidthUnsquishAnimation();
                icon.animate(squishWidthAnimationSetup, squishWidthAnimationTiming);
            });

            buttonGroups.forEach(bg => {
                const { setup: randomButtonSetup, timing: randomButtonTiming } = getGapUnsquishAnimation(buttonGroupGapPx);
                bg.animate(randomButtonSetup, randomButtonTiming);
            });
        }
    }
    
    function animateRandom(id: string){
        const field = racerFields.current.get(id)?.current;
        if(!field) throw new Error("field with this id not found or its racerField property is null");
        const icon = field.querySelector('.random-icon');
        if(!icon) throw new Error("icon is not found");
        const { setup, timing } = getAnimation('rotate');
        const randomAnimation = icon.animate(setup, timing);
        randomAnimation.finished.then((anmt) => {
            anmt.commitStyles();
            anmt.cancel();
        })
    }

    function animateDelete(toDeleteField: HTMLDivElement, lineRef: Reff<HTMLDivElement | null>){
        const line = lineRef.current;
        if(!line) throw Error("line is null");
        
        if(!toDeleteField) throw new Error('racerField with this id not found');
        if(!settings.fieldHeightProperties) throw new Error('fieldHeightProperties are null');

        const { setup: strikeOutSetup, timing: strikeOutTiming } = getAnimation('strike-out');
        const { setup: disappearSetup, timing: disappearTiming } = getAnimation('disappear');
        const { setup: squishHeightAnimationSetup, timing: squishHeightAnimationTiming } = getHeightSquishAnimation(settings.fieldHeightProperties);

        const strikeOutAnimation = line.animate(strikeOutSetup, strikeOutTiming);
        if(settings.racerSettings.length === 3){
            const deleteIcons = Array.from(document.querySelectorAll(".delete-icon"));
            const buttonGroups = Array.from(document.querySelectorAll("#racer-button-group"));

            const deleteIconWidth = calculateWidth(deleteIcons[0]);
            const buttonBoxGapWidth = parseFloat(getComputedStyle(buttonGroups[0]).gap);

            if(deleteIcons.length === 0 || buttonGroups.length === 0) throw new Error("Some DOM elements are missing");
            
            deleteIcons.forEach(icon => {
                const { setup: squishWidthAnimationSetup, timing: squishWidthAnimationTiming } = getWidthSquishAnimation();
                icon.animate(squishWidthAnimationSetup, squishWidthAnimationTiming);
            });

            buttonGroups.forEach(bg => {
                const { setup: randomButtonSetup, timing: randomButtonTiming } = getGapSquishAnimation(buttonBoxGapWidth);
                bg.animate(randomButtonSetup, randomButtonTiming);
            });
        }
        const strikeOutAnimationPromise = strikeOutAnimation.finished
        .then(strike => {
            strike.commitStyles();
            strike.cancel();
            const disappearAnimation = toDeleteField.animate(disappearSetup, disappearTiming);
            return disappearAnimation.finished
        })
        .then(disappear => {
            if(!toDeleteField.dataset.position) throw new Error('"position" data attribute is not defined')
            disappear.commitStyles();
            disappear.cancel();
            if(settings.racerSettings.length !== Number(toDeleteField.dataset.position)){
                const squishAnimation = toDeleteField.animate(squishHeightAnimationSetup, squishHeightAnimationTiming);
                return squishAnimation.finished;
            }
        })
        return strikeOutAnimationPromise;
    }

    function animateShowErrorMessage(errorMessageRef: Reff<HTMLDivElement | null>, errStr: string){
        if(!errorMessageRef.current) throw new Error("errorMessageRef is null");

        const { setup, timing } = getAnimation('error');
        errorMessageRef.current.innerText = errStr;
        const animation = errorMessageRef.current.animate(setup, timing);
        animation.finished.then(anmt => {
            anmt.commitStyles();
            anmt.cancel();
        })
    }

    function animateHideErrorMessage(errorMessageRef: Reff<HTMLDivElement | null>){
        if(!errorMessageRef.current) throw new Error("errorMessageRef is null");

        const { setup, timing } = getAnimation('no-error');
        const animation = errorMessageRef.current.animate(setup, timing);
        animation.finished.then(anmt => {
            anmt.commitStyles();
            anmt.cancel();
        })
    }

    return { animateRandom, animateDelete, animateCreate, animateLoading, animateShowErrorMessage, animateHideErrorMessage, animateLayout }
}

export { useSetupAnimation }