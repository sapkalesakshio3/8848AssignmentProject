import React from 'react';
import { Eye } from 'react-bootstrap-icons';
import '../../style/common.scss';

const InputField = (props) => {
  const handelPasswordShowHide = () => {
    const icon = document.getElementById(`eyeIcon-${props.id}`);
    const element = document.getElementById(props.id);
    icon.classList.toggle('active');
    if (element.type === 'password') {
      element.type = 'text';
    } else {
      element.type = 'password';
    }
  };

  return (
    <div className="common_InputFeild">
      {props.isPassword === 'true' && <Eye id={`eyeIcon-${props.id}`} onClick={handelPasswordShowHide} className="eye-icon" />}
      <input type={props.type} id={props.id} name={props.name} className={props.className} placeholder={props.placeholder} onChange={props.onChange} onBlur={props.onBlur} maxLength={props.maxLength} onKeyUp={props.onKeyUp}
        value={props.value} required={props.required} readOnly={props.readOnly}

      />
    </div>
  );
};
export default InputField;