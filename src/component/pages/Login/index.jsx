import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../../common/Button';
import Label from '../../common/Label';
import InputField from '../../common/InputFeild';

import { API_URLS } from '../../constants/API_URLS';
import { setEmailState, storeToken } from '../../utils/Reducer/loginreducer';
import { ROUTE_PATH } from '../../constants/Routes';
import apiCall from '../../utils/ApiCall/apiCall';

import '../../style/login.scss';
import Login_Img from '../../images/login.jpg';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  dispatch(storeToken(''));
  dispatch(setEmailState(''));
  
  // LOGIN API CALL
  const handleSubmit = () => {
    apiCall
      .get(API_URLS.GET_LOGIN, {
        params: {
          usr: email,
          pwd: password,
        }
      })
      .then((response) => {
        if (response?.data?.message?.msg === 'success') {
          const token = response?.data?.message?.data?.access_token;
          dispatch(storeToken(token));
          dispatch(setEmailState(email));
          navigate(ROUTE_PATH.DETAILS);
        }
        else if (response.data.message.msg === 'error') {
          toast.error("Invalid Credantials", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
        }
      })
      .catch((e) => {
        console.error('Error ==========>', e.response.data.message.msg);

      });
  };

  return (
    <div className=" container Login mresp">
      <div className="row">
        <div className="col-md-8 leftside_style">
          <div className="d-flex justify-content-center">
            <img className="img_padding" src={Login_Img} alt="login_img"></img>
          </div>
        </div>

        <div className="col-md-12 col-lg-4 col-sm-12 rightside_style">
          <div className="content_style justify-content-center">
            <div className="ms-2">
              <div>
                <Label className="header" value="LOGIN" />
              </div>
              <div className="d-grid mt-4">
                <Label className="text-style" value="Welcome!" />
                <Label className="text-style text-nowrap" value="Please login to your account" />
              </div>
              <div className="d-grid mt-5">
                <Label className="input-label" htmlFor="i1" value="Email ID" />
                <InputField
                  placeholder="Enter Email ID"
                  className="manage-inputs img1"
                  id="i1"
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></InputField>
              </div>
              <div className="mt-3 d-grid">
                <Label className="input-label" htmlFor="i2" value="Password" />
                <InputField
                  placeholder="Enter Password"
                  className="manage-inputs"
                  type="password"
                  isPassword="true"
                  id="i2"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></InputField>
              </div>
              <div className="mt-4 d-grid">
                <Button className="manage-button mb-5" value="LOGIN" onClick={handleSubmit}></Button>
              </div>
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};