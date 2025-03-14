import React, { useEffect, useRef } from "react";
import { useName } from "../../game/hooks/useName";
import { config } from "../../../config";
import { useSetupAnimation } from "./useSetupAnimation";
import { calculateHeightFromDims } from "../../game/utils";
import { useGameContext } from "../../game/context/GameContext";
import { useAnimation } from "../../game/hooks/useAnimation";
import { useScroll } from "../../game/hooks/useScroll";
import { MEvent, Reff } from "../../types";

function useSettingsPage(){

    const {settings, setDoneSettingUp,  backdropRef, setSettings, isRestartedRef, mediaQuery, racerFields} = useGameContext();
    const { getRandomName } = useName(); 
    const okRef = useRef(false); 
    const whitespaceRef = useRef<HTMLSpanElement | null>(null); 
    const runRef = useRef<HTMLSpanElement | null>(null); 
    const runButtonRef = useRef<HTMLButtonElement | null>(null); 
    const deleteAudio = useRef(new Audio(config.getSoundPath("delete.wav")));
    const createAudio = useRef(new Audio(config.getSoundPath("create.mp3")));
    const randomAudio = useRef(new Audio(config.getSoundPath("random.mp3")));
    const startGameAudio = useRef(new Audio(config.getSoundPath("startGame.mp3")));
    const isListLoadedRef = useRef(false);
    const distanceFieldRef = useRef<HTMLInputElement | null>(null);
    const addButtonRef = useRef<HTMLButtonElement | null>(null);
    const racerListHeaderRef = useRef<HTMLDivElement | null>(null);
    const hasAudioLoadedRef = useRef(false);
    const isErrorMessageShown = useRef(false);
    const { animateDelete, animateCreate, animateLoading, animateRandom, animateShowErrorMessage, animateHideErrorMessage, animateLayout } = useSetupAnimation(isListLoadedRef);
    const { getAnimation } = useAnimation();
    const { setup, timing } = getAnimation('delete-icon');
    const { scrollListUpWithScrollEndEvent, cancelRequest } = useScroll(100);
    createAudio.current.volume = 0.26;
    deleteAudio.current.volume = 0.26;
    randomAudio.current.volume = 0.5;
    const errorMessageRef = useRef<HTMLDivElement>(null);


    console.log(`count in useSettings: ${settings.racerSettings.length}`);


    useEffect(() => {
        //if is mobile
        if(mediaQuery.matches){
            if(runButtonRef.current && backdropRef.current && whitespaceRef.current && runRef.current && distanceFieldRef.current && addButtonRef.current && racerListHeaderRef.current){
                //This check avoids triggering fade-in effect on the first render
                if(isRestartedRef.current){
                    const { setup, timing } = getAnimation('fade-in'); 
                    const fadeInAnimation = backdropRef.current.animate(setup, timing);
                    fadeInAnimation.finished.then(anmt => {
                        anmt.commitStyles();
                        anmt.cancel();
                    });
                    animateLoading(0);
                    addButtonRef.current.style.opacity = '1';
                    whitespaceRef.current.style.opacity = '1';
                    runRef.current.style.opacity = '1';
                    distanceFieldRef.current.style.opacity = '1';
                    runButtonRef.current.style.opacity = '1';
                    racerListHeaderRef.current.style.opacity = '1';
                    
                }
                else {
                    animateLayout(distanceFieldRef, addButtonRef, runButtonRef, racerListHeaderRef, whitespaceRef, runRef);
                }
            }  
        }
 
    }, [runButtonRef.current,
        backdropRef.current,
        whitespaceRef.current,
        runRef.current,
        distanceFieldRef.current,
        addButtonRef.current,
        racerListHeaderRef.current
    ])


    useEffect(() => {
        if(!mediaQuery.matches){
            if(runButtonRef.current && whitespaceRef.current && runRef.current && distanceFieldRef.current && addButtonRef.current && racerListHeaderRef.current){
                if(isRestartedRef.current){
                    animateLoading(0);
                    addButtonRef.current.style.opacity = '1';
                    whitespaceRef.current.style.opacity = '1';
                    runRef.current.style.opacity = '1';
                    distanceFieldRef.current.style.opacity = '1';
                    runButtonRef.current.style.opacity = '1';
                    racerListHeaderRef.current.style.opacity = '1';
                    
                }
                else {
                    animateLayout(distanceFieldRef, addButtonRef, runButtonRef, racerListHeaderRef, whitespaceRef, runRef);
                }
            }   
        }

    }, [runButtonRef.current,
        whitespaceRef.current,
        runRef.current,
        distanceFieldRef.current,
        addButtonRef.current,
        racerListHeaderRef.current
    ])

    function validateDistance(value: number) {
        if(errorMessageRef.current) {
            const distance = value;
            if(distance < 100 || distance > 2000) {
                if(!isErrorMessageShown.current){
                    animateShowErrorMessage(errorMessageRef, "Distance must be between 100 and 2000");
                    isErrorMessageShown.current = true;
                }
                return false;
            }
            else if(distance % 1 !== 0) {
                if(!isErrorMessageShown.current){
                    animateShowErrorMessage(errorMessageRef, "only whole numbers go");
                    isErrorMessageShown.current = true;
                }
                return false;
            }
            else {
                if(isErrorMessageShown.current){
                    animateHideErrorMessage(errorMessageRef);
                    isErrorMessageShown.current = false;
                }
                return true;
            }
        }
        else {
            throw new Error("errorMessageRef.current is null!");
        }
    }

    function handleDistanceInput(e: React.ChangeEvent<HTMLInputElement>) {
        okRef.current = validateDistance(Number(e.target.value));
        settings.distance = Number(e.target.value);
    }

    function handleCreate(e: MEvent, id: string, faceIndex: number) {
        const button = e.target as HTMLButtonElement;
        const {setup, timing} = getAnimation("button");
        button.animate(setup, timing);
        
        if(settings.racerSettings.length < 7) {
            setSettings(oldSettings => {
                createAudio.current.currentTime = 0
                createAudio.current.play();
                return {
                    ...oldSettings,
                    racerSettings: [...oldSettings.racerSettings, { id, faceIndex, name: "", racerField: null }]
                }
            })
        }
    }


    function handleDelete(e: MEvent, id: string, lineRef: Reff<HTMLDivElement | null>) {
        //Playing delete sound
        deleteAudio.current.currentTime = 0
        deleteAudio.current.play();

        const icon = e.target as HTMLImageElement;
        const toDeleteFieldRef = racerFields.current.get(id);
        const deleteButtons: HTMLButtonElement[] = Array.from(document.querySelectorAll(".delete-button"));
        const addButton: HTMLButtonElement | null = document.querySelector(".delete-button");

        if(!icon) throw new Error('icon is not found');
        if(!addButton) throw new Error('addButton not found');
        if(!toDeleteFieldRef) throw new Error('No ref found by this id');
        if(!toDeleteFieldRef.current) throw new Error('toDeleteFieldRef is null');
        
        const toDeleteField = toDeleteFieldRef.current;
        const toDeletePosition = toDeleteField.dataset.position;
        
        //Deleting racer item from ref map
        racerFields.current.delete(id);

        //Updateing positions for the remaining items 
        let position = 1;
        racerFields.current.forEach((field, id) => {
            if(!field.current) throw new Error('Error');
            field.current.dataset.position = String(position++);
        })
                
        //Running delete icon animation
        icon.animate(setup, timing);
        
        //Blocking "delete" and "add" buttons until animation is done
        deleteButtons.forEach(button => button.disabled = true);
        addButton.disabled = true;

        //Running delete animation
        const animationPromise = animateDelete(toDeleteField, lineRef);
        
        //Once animation finishes...
        animationPromise.then(_ => {

            const count = settings.racerSettings.length;

            //If deleted the last item - scroll up and when the and then resolve, otherwise - return resolved promise
            const scrollPromise = scrollListUpWithScrollEndEvent(calculateHeightFromDims(settings.fieldHeightProperties), Number(toDeletePosition) === count);
            scrollPromise.then(() => {
            
            //Deleteing racer item from settings 
                let newRacerSettings = settings.racerSettings.filter(rnStgs => rnStgs.id !== id);
                setSettings(oldSettings => ({...oldSettings, racerSettings: newRacerSettings }));
                cancelRequest();
            })
            TODO: //Enable add button (better later as there is still chance that the effect will run before re-rendering finishes)
            addButton.disabled = false;
        });
    }


    function handleRandom (id: string, nameInputRef: Reff<HTMLInputElement | null>) {
        if(nameInputRef.current){
            // randomAudio.current.pause();
            randomAudio.current.currentTime = 0
            randomAudio.current.play();
            const name = getRandomName();
            nameInputRef.current.value = name;
            animateRandom(id);
            setSettings(oldSettings => {
                return {
                    ...oldSettings,
                    racerSettings: oldSettings.racerSettings.map(rnStgs => {
                        if(rnStgs.id === id) {
                            return { ...rnStgs, name }
                        }
                        else {
                            return rnStgs
                        };
                    })
                }
            })
        }
    }

    const handleNameInput = (id: string, e: React.ChangeEvent<HTMLInputElement | null>) => {
        setSettings(oldSettings => {
            return {
                ...oldSettings,
                racerSettings: oldSettings.racerSettings.map(rnStgs => {
                    if(rnStgs.id === id) {
                        return  { ...rnStgs, name: e.target.value } 
                    }
                    else {
                        return rnStgs;
                    }
                })
            }
        })
    }

    function handleRun(e: MEvent){
        const button = e.target as HTMLButtonElement;
        const { setup, timing } = getAnimation("button");
        button.animate(setup, timing);
        
        okRef.current = validateDistance(settings.distance)
        
        if(!backdropRef.current) throw new Error('backdropRef is null');
        if(okRef.current){   
            let composer: "rossini" | "wagner" | null = null; 
            let newRunner;    
            const newRacerSettings = settings.racerSettings.map(rnStgs => {
                newRunner = { ...rnStgs }
                if(!rnStgs.name) {
                    newRunner.name = getRandomName() 
                };
                if(rnStgs.name.toLocaleLowerCase().trim() === "gioacchino rossini" && settings.distance === 296){
                    newRunner.faceIndex = 1792;
                    composer = "rossini";
                }
                else if(rnStgs.name.toLowerCase().trim() === "wilhelm richard wagner" && settings.distance === 756){
                    newRunner.faceIndex = 1813;
                    composer = "wagner";
                }
                return newRunner;
            });

            const { setup, timing } = getAnimation("black-out");
            const blackOutAnimation = backdropRef.current.animate(setup, timing);
            blackOutAnimation.finished.then( anmt => {
                anmt.commitStyles();
                anmt.cancel();
                setSettings(oldSettings => ({ ...oldSettings, racerSettings: newRacerSettings, composer }));
                setDoneSettingUp(true);
            })
        }
    }

    function navigateFace(id: string, faceRef: Reff<HTMLPreElement | null>, directionCallback: () => number, getFace: (index: number) => string, e?: MEvent, ) {
        if(faceRef.current) {
            const i = directionCallback();
            const face = getFace(i);
            faceRef.current.innerText = face;
            if(e && e.target){
                const button = e.target as HTMLButtonElement;
                const {setup: navButtonSetup, timing: navButtonTiming} = getAnimation("nav-button")
                button.animate(navButtonSetup, navButtonTiming);  
            }

            const newRacerSettings = settings.racerSettings.map(rnStgs => {
                if(rnStgs.id === id){
                    return {...rnStgs, faceIndex: i};
                }
                return rnStgs;
            });

            setSettings(oldSettings => {
                return {
                    ...oldSettings,
                    racerSettings: newRacerSettings            
                }
            });
        }
    }

    return { errorMessageRef, 
        handleCreate, 
        handleDistanceInput, 
        handleDelete, 
        handleRun, 
        navigateFace, 
        handleRandom, 
        handleNameInput, 
        isListLoadedRef, 
        animateCreate, 
        animateLoading,
        whitespaceRef,
        runRef,
        runButtonRef,
        distanceFieldRef,
        addButtonRef,
        racerListHeaderRef
    }

}

export { useSettingsPage }