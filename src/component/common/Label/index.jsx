import React  from "react";


const Label=(props)=>{

    return(
        <label className={props.className} onClick={props.onClick}>{props.value}</label>
    )
}
export default Label;