import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { API_URLS } from "../../constants/API_URLS";
import apiCall from '../../utils/ApiCall/apiCall';
import { ROUTE_PATH } from "../../constants/Routes";
import Label from "../../common/Label";
import InputField from "../../common/InputFeild";
import Button from "../../common/Button";

import '../../style/updateUser.scss';

export default function UpdateUser() {
    const navigate = useNavigate();
    const location = useLocation();

    const [name, setName] = useState(location?.state["UserData"]?.name1);
    const [age, setAge] = useState(location?.state["UserData"]?.age);
    const [gender, setGeder] = useState(location?.state["UserData"]?.gender);
    const [address, setAddress] = useState(location?.state["UserData"]?.address);
    const [designation, setDesignation] = useState(location?.state["UserData"]?.designation);
    const [companyName, setCompanyName] = useState(location?.state["UserData"]?.company_name);
    const [searchName, setSearchName] = useState('');

    // API CALL FOR UPDATE USER
    const UpdateUser = () => {
        if (name !== '' && age !== '' && address !== '' && designation !== '' && gender !== '' && companyName !== '') {

            const data = {
                name1: name,
                age: age,
                address: address,
                gender: gender,
                designation: designation,
                company_name: companyName
            }
            apiCall
                .put(API_URLS.PUT_USER + name, data)
                .then((response) => {
                    if (response.status === 200) {
                        console.log(response.data);
                        toast.success("Data Updated Sucessfully ! ", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 1000,
                        });
                    }
                    else {
                        toast.error("Data Not Get updated", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 1000,
                        });
                    }
                })
                .catch((e) => {
                    console.log('Error ==========>', e.response.data.message.msg);
                });
        }
        else {
            toast.error("Enter Valid data", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
            });
        }
    };

    const CancelUpdate = () => {
        navigate(ROUTE_PATH.DETAILS);
    }

    //   API CALL FOR SEARCH USER
    const SearchUser = () => {
        if (searchName !=='') {
            apiCall
                .get(API_URLS.GET_SPECIFIED_USER, {
                    params: {
                        name1: searchName,
                    }
                })
                .then((response) => {
                    const res = response.data.message.data.specific_user;
                    console.log(res);
                    if (response.data.message.status === 'success' && res.length > 0) {
                        console.log(response.data.message.data.specific_user);
                        setName(res[0].name1);
                        setAge(res[0].age);
                        setGeder(res[0].gender);
                        setAddress(res[0].address);
                        setDesignation(res[0].designation);
                        setCompanyName(res[0].company_name);

                        toast.success("User Data Retrived Sucessfully", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 1000,
                        });
                    }
                    else {
                        toast.error("User Not Found", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 1000,
                        });
                    }
                })
                .catch((e) => {
                    console.log('Error ==========>', e.response.data.message.status);

                });
        } else {
            toast.error("Enter Value For Search", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
            });
        }
    };
    return (
        <div className="container updateUser">
            <Label className="userListing" value="User Details " />
            <div className="row">
                <div className="d-flex justify-content-end">
                    <InputField
                        placeholder="Search User By Name"
                        className="search_inputFeild"
                        type="text"
                        isPassword="false"
                        onChange={(e) => {
                            setSearchName(e.target.value);
                        }}
                    ></InputField>
                    <Button className='search_btn' value="Search" onClick={SearchUser} />
                </div>

            </div>

            <div className="row mt-4 mb-5" >

                <div className="col-md-2">
                    <Label className="label_style" value="Name" />
                </div>
                <div className="col-md-4">
                    <InputField
                        placeholder="Enter Name"
                        className="input_feild_style"
                        type="text"
                        isPassword="false"
                        value={name}
                        readOnly={true}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    ></InputField>
                </div>
                <div className="col-md-2">
                    <Label className="label_style" value="Designation" />
                </div>
                <div className="col-md-4">
                    <InputField
                        placeholder="Enter Designation"
                        className="input_feild_style"
                        type="text"
                        isPassword="false"
                        value={designation}
                        onChange={(e) => {
                            setDesignation(e.target.value);
                        }}
                    ></InputField>
                </div>

                <div className="col-md-2">
                    <Label className="label_style" value="Age" />
                </div>
                <div className="col-md-4">
                    <InputField
                        placeholder="Enter Age"
                        className="input_feild_style"
                        type="text"
                        isPassword="false"
                        value={age}
                        onChange={(e) => {
                            setAge(e.target.value);
                        }}
                    ></InputField>
                </div>
                <div className="col-md-2">
                    <Label className="label_style" value="Address" />
                </div>
                <div className="col-md-4">
                    <InputField
                        placeholder="Enter Address"
                        className="input_feild_style"
                        type="text"
                        isPassword="false"
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value);
                        }}
                    ></InputField>
                </div>

                <div className="col-md-2">
                    <Label className="label_style" value="Gender" />
                </div>
                <div className="col-md-4">
                    <InputField
                        placeholder="Enter Gender"
                        className="input_feild_style"
                        type="text"
                        isPassword="false"
                        value={gender}
                        onChange={(e) => {
                            setGeder(e.target.value);
                        }}
                    ></InputField>
                </div>
                <div className="col-md-2">
                    <Label className="label_style" value="Company Name" />
                </div>
                <div className="col-md-4">
                    <InputField
                        placeholder="Company Name"
                        className="input_feild_style"
                        type="text"
                        isPassword="false"
                        value={companyName}
                        onChange={(e) => {
                            setCompanyName(e.target.value);
                        }}
                    ></InputField>
                </div>
            </div>

            <div className="btn_div_style d-flex justify-content-end">
                <Button className='cancel_btn' value="Cancel" onClick={CancelUpdate} />
                <Button className='upadte_btn' value="Update" onClick={UpdateUser} />
            </div>
            <ToastContainer />
        </div>
    );
};