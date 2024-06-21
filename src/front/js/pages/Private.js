import React from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { useState, useContext } from "react";

const Private = () => {
    const navigate = useNavigate()
    const { store, actions } = useContext(Context)
   const logout = () => {
    localStorage.removeItem("token")
    actions.userLogout()
    navigate("/")
   }
    return (
      
        <div className="d-flex justify-content-center align-items-center" style={{height: "600px"}}>
            
            <div>
                <div className="d-flex justify-content-center py-5">
                <img src="https://res.cloudinary.com/dq3mxxidu/image/upload/v1718923551/man-with-thumb-up2_vfvmea.jpg" style={{height: "300px"}}/>
                </div>
            <h1 className="py-5">Hola bienvenido esta página es solo para usuarios registrados!</h1>
            <div className="d-flex justify-content-center">
        <button className="btn btn-success " onClick={()=>{logout()}}>Log Out</button>
        </div>
        </div>
        </div>
        
    )
}

export default Private
