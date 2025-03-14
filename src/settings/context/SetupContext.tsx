import { createContext, ReactNode, SetStateAction, useContext, useEffect } from "react";
import { useSettingsPage } from "../hooks/useSettingPage";
import { GlobalSettings, SetupContext as SetupContext, SetupProviderType } from "../../types";

const SetupContext = createContext<SetupContext | null>(null);

function SetupProvider({ children }: SetupProviderType){

    const { 
        errorMessageRef, 
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
        racerListHeaderRef,

    } = useSettingsPage()

    return <SetupContext.Provider value={{
        errorMessageRef, 
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
        racerListHeaderRef,
    }}>
        {children}
    </SetupContext.Provider>
}

function useSetupContext(){
    const context = useContext(SetupContext);
    if(!context) throw new Error("using SetupContext outside SetupProvider")
    return context;
}

export { SetupProvider, useSetupContext };