// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { useEventListener } from "../../app/useEventListener";
// import { useAnimation } from "../../global/useAnimation";
// import { GlobalSettings, MoveUpAnimationMap } from "../../types";
// import { calculateFieldHeight } from "../../global/utils";

// function useListAnimation(isListLoadedRef: Reff<boolean>, settings: GlobalSettings, setSettings: React.Dispatch<React.SetStateAction<GlobalSettings>> ){

//     const hasMovedUp = useRef(false);
//     const [racerAnimationKey, setRacerAnimationKey] = useState(0);
//     const { reg: regCreateAnimationEnd, rmv: rmvCreateAnimationEnd } = useEventListener();
//     const { reg: regMoveUpAnimationEnd, rmv: rmvMoveAnimationEnd } = useEventListener();
//     const { reg: regDisappearAnimationEnd, rmv: rmvDisappearAnimationEnd } = useEventListener();
//     const { reg: regStrikeOutAnimationEnd, rmv: rmvStrikeOutAnimationEnd } = useEventListener();
//     const { reg: regScrollUp, rmv: rmvScrollUp } = useEventListener();

//     const { getAnimation, getMoveUpAnimation } = useAnimation();



//     function animateLoading(index: number){   
//         const fields = getFieldsFromSettings();
//         const isNull = fields.find( f => f === null);
//         if(isNull) throw new Error("A nullish racer field in the array");
//         if(index < fields.length){
//             const { setup, timing } = getAnimation("create");
//             const createAnimation = fields[index].animate(setup, timing);
//             createAnimation.finished.then((anmt) => {
//                 anmt.commitStyles();
//                 anmt.cancel();
//                 animateLoading(index + 1);
//             })
//         }
//         isListLoadedRef.current = true;
//     }

//     function animateCreate(racer: HTMLDivElement | Reff<HTMLElement | null>){
//         const el = racer instanceof HTMLDivElement ? racer : racer.current;
//         if(!el) throw new Error('blackout is null');
//         const { setup, timing } = getAnimation("create");
//         const createAnimation = el.animate(setup, timing); 
//         createAnimation.finished.then((anmt) => {
//             anmt.commitStyles();
//             anmt.cancel();
//         })
//     }
    
//     function animateRandom(id: string){
//         const field = settings.racerSettings.find(rnStgs => rnStgs.id === id);
//         if(!field || !field.racerField) throw new Error("field with this id not found or its racerField property is null");
//         const icon = field.racerField?.querySelector(`#random-${id}`);
//         if(!icon) throw new Error("icon is not found");
//         const { setup, timing } = getAnimation('rotate');
//         const randomAnimation = icon.animate(setup, timing);
//         randomAnimation.finished.then((anmt) => {
//             anmt.commitStyles();
//             anmt.cancel();
//         })
//     }

//     function animateDelete(id: string, lineRef: Reff<HTMLDivElement | null>){
//         const line = lineRef.current;
//         if(!line) throw Error("line is null");
//         const fields = getFieldsFromSettings();

//         const toDeleteField = fields.find(field => {
//             return field.id === id
//         });
        
//         if(!toDeleteField) throw new Error('racerField with this id not found!');
//         const position = Number(toDeleteField.dataset.position);

//         const { setup: strikeOutSetup, timing: strikeOutTiming } = getAnimation('strike-out');
//         const { setup: disappearSetup, timing: disappearTiming } = getAnimation('disappear');
//         const moveUpAnimationMap: MoveUpAnimationMap = [];

//         const strikeOutAnimation = line.animate(strikeOutSetup, strikeOutTiming);
//         const strikeOutAnimationPromise = strikeOutAnimation.finished
//         .then(strike => {
//             strike.commitStyles();
//             strike.cancel();
//             const disappearAnimation = toDeleteField.animate(disappearSetup, disappearTiming);
//             return disappearAnimation.finished
//         })
//         .then(disappear => {
//             disappear.commitStyles();
//             disappear.cancel();
//             fields.forEach(f => {
//                 const fieldPosition = Number(f.dataset.position);
//                 if(!fieldPosition || !position) {
//                     throw new Error("dataSet is not set");
//                 }
//                 else if(position < fieldPosition){
//                     moveUpAnimationMap.push({target: f, animation: getMoveUpAnimation(calculateFieldHeight(toDeleteField, settings))});
//                 }
//             });
//             const promises: Promise<Animation>[] = [];
//             moveUpAnimationMap.forEach(entry => {
//                 const moveUpAnimation = entry.target.animate(entry.animation.setup, entry.animation.timing);
//                 promises.push(moveUpAnimation.finished);
//             });
//             return Promise.all([
//                 ...promises.map(promise => promise.then(a => {
//                     a.commitStyles();
//                     a.cancel();
//                 }))
//             ])
//         })
//         return strikeOutAnimationPromise;
//     }

//     function getFieldsFromSettings(){
//         return settings.racerSettings.map(rnStgs => {
//             if(!rnStgs.racerField) throw new Error("A nullish racer field in the array");
//             return rnStgs.racerField;
//         });
//     }

//     return { animateRandom, animateDelete, animateCreate, animateLoading, racerAnimationKey, hasMovedUp }
// }

// export { useListAnimation }