import React from "react";
import Edit from '../../images/edit.svg';
import '../../style/common.scss';
const EditButton =(props)=>{

    return(
        <button onClick={props.onClick} className="table_button_edit"><img src={Edit} alt="Edit"></img></button>
    )

}
export default EditButton;