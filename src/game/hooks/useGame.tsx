import {  useRef, useState } from "react";
import { GlobalSettings } from "../../types";
import { generateId } from "../utils";
import { config } from "../../../config";
import { useMediaQuery } from "./useMediaQuery";

function useGame() {
    const [settings, setSettings] = useState<GlobalSettings>({
        racerSettings: [
          {
            id: generateId(),
            faceIndex: 0,
            name: "",
            racerField: null,
          },
          {
            id: generateId(),
            faceIndex: 0,
            name: "",
            racerField: null,
          }
        ],
        distance: 0,
        composer: null,
        fieldHeightProperties: null,
      }); 

console.log(`count in useGame: ${settings.racerSettings.length}`);

    const rossiniAudio = useRef(new Audio(config.getSoundPath('william-tell.mp3')));
    const wagnerAudio = useRef(new Audio(config.getSoundPath('ride-of-the-valkyries.mp3')));
    const backdropRef = useRef<HTMLDivElement | null>(null);
    const [isDoneSettingUp, setDoneSettingUp] = useState(false);
    const [isCountdown, setCountdown] = useState(false);
    const [isRaceOver, setRaceOver] = useState(false);
    const [isRaceActive, setRaceActive] = useState(false);
    const isRestartedRef = useRef(false);
    const { mediaQuery } = useMediaQuery('(max-width: 560px)');

    return { 
        settings,
        isDoneSettingUp,
        setDoneSettingUp,
        isCountdown,
        setCountdown,
        isRaceOver,
        setRaceOver,
        isRaceActive, 
        setRaceActive,
        backdropRef,
        setSettings,
        isRestartedRef,
        rossiniAudio,
        wagnerAudio, 
        mediaQuery,
    }
}

export { useGame }