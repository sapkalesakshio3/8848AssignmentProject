
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { API_URLS } from "../../constants/API_URLS";
import apiCall from '../../utils/ApiCall/apiCall';
import { ROUTE_PATH } from "../../constants/Routes";
import CommonTable from "../../common/Table";
import EditButton from "../../common/EditButton";
import Label from "../../common/Label";

import '../../style/common.scss';

export default function Userdetails() {
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();

    const updateUser = (data) => {
        if (data?.name1) {
            navigate(ROUTE_PATH.UPDATE_USER, {
                state: { UserData: data },
            });
        }
    };

    const actionColumn = {
        name: "Action",
        width: "90px",
        cell: (row) => (
            <div >
                <EditButton
                    onClick={() => {
                        updateUser(row);
                    }}
                />
            </div>
        ),
    };

    const columns = [
        {
            name: "Name",
            selector: (row) => row.name1,
            width: "160px",
        },
        {
            name: "Age",
            selector: (row) => row.age,
            width: "140px",
        },
        {
            name: "Gender",
            selector: (row) => row.gender,
            width: "140px",
        },
        {
            name: "Designation",
            selector: (row) => row.designation,
            width: "200px",
        },
        {
            name: "Address",
            selector: (row) => row.address,
            width: "190px",
        },
        {
            name: "Company Name",
            selector: (row) => row.company_name,
            width: "200px",
        },
    ];
    columns.push(actionColumn);

    //   API CALL FOR GET ALL USER
    const GetAllUser = () => {
        apiCall
            .get(API_URLS.GET_ALL_USERS,)
            .then((response) => {
                if (response.data.message.status === 'success') {
                    console.log(response.data.message.status);

                    let result = response.data.message.data;
                    result = result.map((item) => {
                        let newItem = {
                            name1: item.name1,
                            age: item.age,
                            gender: item.gender,
                            designation: item.designation,
                            address: item.address,
                            company_name: item.company_name,
                        };
                        return newItem;
                    });
                    if (result?.length > 0) {
                        setUserData([...result]);
                    }

                }
                else if (response.data.message.status === 'error') {
                    toast.error("Faield To Featch Data", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 1000,
                    });
                }
            })
            .catch((e) => {
                console.log('Error ==========>', e.response.data.message.msg);

            });
    };
    useEffect(() => {
        GetAllUser();
    }, [])
    return (
        <div className="container">
            <Label className="userListing" value="User Listing " />
            <div className="justify-content-center">
                <CommonTable
                    columns={columns}
                    data={userData}
                    onRowClicked={updateUser}
                />
            </div>
            <ToastContainer />
        </div>
    );
};