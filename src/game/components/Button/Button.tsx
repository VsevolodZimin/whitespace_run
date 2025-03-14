import { ButtonProps } from "../../../types";

function Button({className, reff, id, type = "button", children, onClick }: ButtonProps){
    

    return(
        <button 
            ref={reff} 
            className={className} 
            id={id} 
            type={type} 
            onClick={(e) => onClick(e)}
        >
            {children}
        </button>
    )   
}

export { Button }