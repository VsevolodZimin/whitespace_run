import { useMemo, useRef, useState } from "react";
import { GlobalSettings } from "../../types";
import { config } from "../../../config";

function useFaces(startIndex: number){

    const [currentIndex, setCurrentIndex] = useState(startIndex);
    const DEFAULT_INDEX = 0;
    const facesArray = useMemo(()=> [
        "( 'ಠ_ಠ)",
        "ʕ  • ᴥ •ʔ",
        "(   ͡° - ͡° )",
        "(✿)❛▿❛)",
        "( ɾ⚈-⚈)",
        "(   •‿•)",
        "(✿◡_◡)",
        "꒰๑･‿･꒱",
        "(  ට˳ට )",
        "( ◝‿◜)",
        "(   ≖-≖)",
        "(    ･ᴗ･)",
        "(｡✿.✿)",
        "( ? ●.● )",
        "(  ✺-✺)",
        "( ⌐■_■)",
        "(つ▀¯▀)つ",
        '༼ つ ◕_◕ ༽つ',
        "(╭ರ_•́ )",
        "(  ◣_◢)",
        "(  Ò‸Ó)", 
        "(╯°益°）╯", 
        "(  •᷄⌓•᷅ )",
        "༼  '⁰o⁰ ༽",
        "༼  ಡ_ಡ ༽",
        "(  ര‸ര)",
        "─=≡Σ((( つ◕ل͜◕)つ",
        '༼つಠ益ಠ༽つ',
        "(҂ -`_-`)",
        "ฅ( ◕ᴥ◕)ฅ",
        "( ง •̀_•́ )ง",
        "( ｡❤‿❤) ",
        "(╯°□°）╯",
        "\/|\\(^._.^)/|\\",
        "༼ ▀̿̿Ĺ̯̿̿▀̿ ̿༽",
        "ԅ(≖‿≖ԅ)",
        "( ｡◕‿◕｡)",
        '(︶︹︶)',
        '(҂◡_◡) ᕤ',
        '[ ¬ º-°]¬'
    ], []);

    function getDefaultIndex(){
        return DEFAULT_INDEX; 
    };

    function getIndexFromSettings(settings: GlobalSettings, id: string){
        const rnStgs = settings.racerSettings.find(rnStgs => rnStgs.id === id)
        if(rnStgs){
            return rnStgs.faceIndex;
        }
        else throw new Error("no settings found by this id")
    }

    function getNextIndex() {
        const nextFace = currentIndex === facesArray.length-1 ? 0 : currentIndex + 1;
        setCurrentIndex(nextFace);   
        return nextFace;
    };

    function getPreviousIndex(){
        const prevFace = currentIndex === 0 ? facesArray.length-1 : currentIndex - 1;
        setCurrentIndex(prevFace);   
        return prevFace;
    };

    function getFace(index: number){
        return facesArray[index]    
    }

    function getSrc(index: number){
        if(index === 1792) {
            return config.getImgPath('rossini-70.png');
        }
        else {
            return config.getImgPath('wagner-60.png');
        };
    }

    return { getNextIndex, getPreviousIndex, getDefaultIndex, getFace, getSrc, setCurrentIndex, getIndexFromSettings }
}

export { useFaces };