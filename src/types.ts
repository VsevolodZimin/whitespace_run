import React from "react"

export type Reff<T> = React.MutableRefObject<T>;
export type Setter<T> = React.Dispatch<React.SetStateAction<T>>;
export type MEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;
export type SetupPageProps = {
    settings: GlobalSettings,
    setSettings: Setter<GlobalSettings>,
    setDoneSettingUp: Setter<boolean>
}

export type RacerSetupItemSettings = {
    position: number,
    racerSettings: RacerSettings,
}

export type RacerProps = {
    id: string,
    name: string,
    faceIndex: number,
}

export type GamePageProps = {
    settings: GlobalSettings,
    isRacersRegistered: boolean,
    setRacersRegistered: Setter<boolean>,
    isCountdown: boolean,
    setCountdown: Setter<boolean>,
    setRaceOver: Setter<boolean>
}


export type ButtonProps = {
    id: string,
    onClick: (e: MEvent) => void,
    reff?: React.RefObject<HTMLButtonElement>,
    className?:  string, 

} 
& React.ButtonHTMLAttributes<HTMLButtonElement>
& React.PropsWithChildren;

export type Direction = "left" | "right";

export type RandomIconButtonProps = {
    handleRandom: (e: MEvent) => void,
    id: string
} 
& React.ButtonHTMLAttributes<HTMLButtonElement>
& React.PropsWithChildren;

export type DeleteIconButtonProps = {
    handleDelete: (e: MEvent) => void,
    id: string
    reff: Reff<HTMLButtonElement | null>,
    unsquished: boolean,
} 
& React.ButtonHTMLAttributes<HTMLButtonElement>
& React.PropsWithChildren;

export type NameInputProps = {
    handleNameInput: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void
    racerSettings: RacerSettings,
    reff: Reff<HTMLInputElement | null>;
}

export type NavButtonProps = {
    id: string,
    onClick: (e: MEvent) => void
}

export type RacerSettings = {
    id: string,
    faceIndex: number
    name: string;
    racerField: HTMLDivElement | null,
}

export type GlobalSettings = {
    racerSettings: RacerSettings[],
    distance: number,
    fieldHeightProperties: HeightDimentions | null,
    composer: null | "wagner" | "rossini",
}

export type RacerData = {
    offset: number,
    position: number,
    name: string,
    progress: number
    racerBlock: HTMLDivElement | null,
    rankEl: HTMLSpanElement | null,
    faceEl: HTMLSpanElement | null,
    nameEl: HTMLSpanElement | null,
    blockPositionRef: Reff<number>,
    facePositionLeftRef: Reff<number>,
    facePositionBottomRef: Reff<number>,
    startVictoryAnimation: () => void,
    startDefeatAnimation: () => void,
    stopDefeatAnimation: () => void,
    stopVictoryAnimation: () => void
}

export type RegisterFinishFunc = (id: string) => number 

export type RegisterRacerFunc = (
    id: string, 
    name: string, 
    rankEl: HTMLElement | null, 
    faceEl: HTMLSpanElement | null, 
    racerBlock: HTMLDivElement | null, 
    nameEl: HTMLSpanElement | null, 
    blockPositionRef: Reff<number>,
    facePositionLeftRef: Reff<number>,
    facePositionBottomRef: Reff<number>,
    startVictoryAnimation: () => void,
    startDefeatAnimation: () => void,
    stopDefeatAnimation: () => void,
    stopVictoryAnimation: () => void,

) => void;

export type RegisterProgressFunc = (id: string, progress: number) => void 


export type GameContextType = {
    isDoneSettingUp: boolean,
    setDoneSettingUp: Setter<boolean>,
    isCountdown: boolean,
    setCountdown: Setter<boolean>,
    isRaceOver: boolean,
    isRaceActive: boolean,
    setRaceOver: Setter<boolean>,
    setRaceActive: Setter<boolean>,
    settings: GlobalSettings,
    setSettings: Setter<GlobalSettings>,
    backdropRef: Reff<HTMLDivElement | null>,
    isRestartedRef: Reff<boolean>,
    wagnerAudio: Reff<HTMLAudioElement>,
    rossiniAudio: Reff<HTMLAudioElement>,
    mediaQuery: MediaQueryList,
}

export type GOOOO = {
    registerFinish: (id: string) => number,
    registerProgress: (id: string, progress: number) => void,
    checkForScroll: () => void,
    registerRacer: RegisterRacerFunc;
    isRacersRegistered: boolean,
    setRacersRegistered: Setter<boolean>,
    resetGame: () => void,
    raceArea:  React.RefObject<HTMLDivElement>,
    checkIfAllFinished: () => void, 
    generateId: () => `${string}-${string}-${string}-${string}-${string}`,
    endGame: () => void,
    rossiniAudio: Reff<HTMLAudioElement>,
    wagnerAudio: Reff<HTMLAudioElement>,
    setImgLoaded: Setter<boolean>,
    isImgLoaded: boolean,
    numRegistered: number,
    setNumRegistered: Setter<number>,
    finishLineRef: React.RefObject<HTMLDivElement>,
}

export type SetupProviderType = { 
    children: React.ReactNode, 
}

export type SetupContext = {
    errorMessageRef: React.RefObject<HTMLDivElement>, 
    handleCreate:  (e: MEvent, id: string, faceIndex: number) => void, 
    handleDistanceInput: (e: React.ChangeEvent<HTMLInputElement>) => void, 
    handleDelete: (e: React. MouseEvent<HTMLButtonElement, MouseEvent>, id: string, lineRef: Reff<HTMLDivElement | null>) => void, 
    handleRun: (e: MEvent) => void,
    handleRandom: (id: string, nameInputRef: Reff<HTMLInputElement | null>) => void, 
    handleNameInput: (id: string, e: React.ChangeEvent<HTMLInputElement | null>) => void,
    navigateFace: (
        id: string, 
        faceRef: Reff<HTMLPreElement | null>, 
        directionCallback: () => number, 
        getFace: (index: number) => string, 
        e?: MEvent) => void,
    
    isListLoadedRef: Reff<boolean>,
    animateCreate: (racerRef: HTMLDivElement | Reff<HTMLDivElement | null>) => void,
    animateLoading: (n: number) => void,
    whitespaceRef: Reff<HTMLSpanElement | null>,
    runRef: Reff<HTMLSpanElement | null>,
    runButtonRef: Reff<HTMLButtonElement | null>,
    distanceFieldRef: Reff<HTMLInputElement | null>,
    addButtonRef: Reff<HTMLButtonElement | null>,
    racerListHeaderRef: Reff<HTMLDivElement | null>,
}


export type AnimationTiming = {
    duration: number,
    delay?: number,
    easing?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out',
    iterations?: number,
    direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse',
    fill?: 'none' | 'forwards' | 'backwards' | 'both'
}

export type MoveUpAnimationMapEntry = {
    target: Element,
    animation: {
        setup: Record<string, string>[],
        timing: AnimationTiming
    }
}

export type MoveUpAnimationMap = MoveUpAnimationMapEntry[];

export type EventTypeString = keyof WindowEventMap |  keyof HTMLElementEventMap | keyof DocumentEventMap;

export type Composer = null | "wagner" | "rossini";

export type GenericFunc<T extends unknown[], R> = (...args: T) => R;

export type HeightDimentions = {
    height: number,
    marginTop: number,
    marginBottom: number,
    paddingTop: number,
    paddingBottom: number,
    borderTop: number,
    borderBottom: number,
};

export type RaceContext = {
    raceDataRef: Reff<Map<string, RacerData>>,
    raceAreaRef: React.RefObject<HTMLDivElement>,
    scrollPoitionRef: Reff<number>,
    isImgLoaded: boolean,
    numRegistered: number,
    isRacersRegistered: boolean,
    finishLineRef: React.RefObject<HTMLDivElement>,
    registerProgress: (id: string, progress: number) => void,
    checkForScroll: () => void,
    resetGame: () => void,
    endGame: () => void,
    checkIfAllFinished: () => void,
    setImgLoaded: Setter<boolean>,
    setNumRegistered: Setter<number>,
    setRacersRegistered: Setter<boolean>,
    racerCountRef: Reff<{
        finished: number;
    }>,
    borderBottomRef: Reff<HTMLPreElement | null>,
    borderTopRef: Reff<HTMLPreElement | null>,
    winner: Reff<string>,
}

export type ComposerData = { 
    exists: boolean, 
    composer: 'rossini' | 'wagner' | null, 
} 