import { useSetupContext } from "../../context/SetupContext"

function RightSidePane(){

    const { runButtonRef } = useSetupContext()

    return (
        <div id="right-side-pane">
            
            <button ref={runButtonRef} type="button">run</button>
        </div>
    )
}
export { RightSidePane }