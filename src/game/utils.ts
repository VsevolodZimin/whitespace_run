import { HeightDimentions, RacerData, RacerSettings, Reff } from "../types";

export const deleteIconWidth = 29;

export function generateId(){
    return crypto.randomUUID();
}

export function initFieldDimentions(fieldRef: Reff<HTMLDivElement | null>){
    if(!fieldRef.current) throw new Error('fieldRef is null');
    const fieldComputedStyles = getComputedStyle(fieldRef.current);

    return {
        height: parseFloat(fieldComputedStyles.height),
        marginTop: parseFloat(fieldComputedStyles.marginTop),
        marginBottom: parseFloat(fieldComputedStyles.marginBottom),
        paddingTop: parseFloat(fieldComputedStyles.paddingTop),
        paddingBottom: parseFloat(fieldComputedStyles.paddingBottom),
        borderBottom: parseFloat(fieldComputedStyles.borderBottom),
        borderTop: parseFloat(fieldComputedStyles.borderTop),
    }
}

export function calculateHeightFromDims(dims: HeightDimentions | null){
    if(!dims) throw new Error("dims is null");
    return dims.marginTop  
    + dims.borderTop 
    + dims.marginTop 
    + dims.paddingTop
    + dims.height
    + dims.paddingBottom
    + dims.borderBottom
    + dims.marginBottom
} 

export function calculateHeightFromDOMObject(el: HTMLElement){
    const cs = getComputedStyle(el);
    const height = parseFloat(cs.height); 
    return height
}

export function calculateWidth(el: Element | null){
    if(!el) throw new Error("el is null");
    const elStyles = getComputedStyle(el);
    return parseFloat(elStyles.marginLeft) 
    + parseFloat(elStyles.borderLeft) 
    + parseFloat(elStyles.paddingLeft) 
    + parseFloat(elStyles.width) 
    + parseFloat(elStyles.paddingRight) 
    + parseFloat(elStyles.borderRight) 
    + parseFloat(elStyles.marginRight) 
}

// export function getFieldByID(id: string, racerSetupItemRef: Reff<HTMLDivElement | null>){
//     if(!racerSetupItemRef) throw new Error('racerSetupItemRef is null');
//     const rnStgs = racerSettings.find(rnStgs => {
//         if(!rnStgs.racerField) throw new Error("A nullish racer field in the array");
//         return rnStgs.id ===  id
//     });

//     if(!rnStgs) throw new Error('No settings with this ID');
//     if(!rnStgs.racerField) throw new Error('racerField is null');
//     return rnStgs.racerField;
// }

export function justifyInitialFacePosition(raceDataRef: Reff<Map<string, RacerData>>){
    let max = -1
    raceDataRef.current.forEach((racerData) => {
        const faceEl = racerData.faceEl;
        if(faceEl){
            max = faceEl.getBoundingClientRect().right > max ? faceEl.getBoundingClientRect().right : max;
            const x = faceEl.getBoundingClientRect().right;
            console.log()
        }
    });
    raceDataRef.current.forEach(racerData => {
        const faceEl = racerData.faceEl;
        const blockEl = racerData.racerBlock
        let offset: number;
        if(faceEl && blockEl){
            offset = max - faceEl.getBoundingClientRect().right;
            racerData.offset = offset;
            blockEl.style.transform = `translateX(${offset}px)`;
            racerData.blockPositionRef.current += offset;
        }
    });
}

export function extractDOMItems(racerFields: Reff<Map<string, Reff<HTMLDivElement | null>>>){
    return Array
    .from(racerFields.current.entries())
    .map(entry => entry[1])
    .map(itemRef => itemRef.current)
    .map(item => {
        if(!item) throw new Error('item is null');
        else return item;
    });
}

