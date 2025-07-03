import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const ErrorNotFound = () => {

    const navigate = useNavigate();

    return (
        <div>
            <div className="flex flex-wrap justify-center"><h1>ERROR 404: NOT FOUND</h1></div>
            <div className="flex flex-wrap justify-center">
                <button
                    className="btn btn-primary btn-lg"
                    onClick={() => navigate("/")}
                >

                    Home
                </button>
            </div>
        </div>);

}


export default ErrorNotFound;