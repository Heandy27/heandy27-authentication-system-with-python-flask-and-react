import React, { useState, useContext } from "react";
import Register from "./Register";
import { Context } from "../store/appContext";
import { Link, Navigate, useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate()
  const { store, actions } = useContext(Context)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errormessage, setErrorMessage] = useState('')


  const enviarDatosUsuario = async (e) => {
    e.preventDefault()
    if (email == "" && password == "") {
      alert("Hay campos vacios")
    } else {
      const result = await actions.loginUser(email, password)
      if (result) {
        navigate("/private")
        console.log(result);
      }
    }
  }
/*
  function enviarDatos(e) {
    e.preventDefault();
    try {
      actions.login(email, password)
      
    } catch {
      console.log("error en el login");
    }
    console.log("send data");
    console.log(email, password);
    console.log(store.auth_admin);
    
    
    
    }
  */



    return (
      <>
      
       <div className="body d-flex justify-content-center py-5" >
        
    <form onSubmit={enviarDatosUsuario}>
  
    <h1 className="h3 mb-3 fw-normal text-center">Login</h1>

    <div className="form-floating pb-2">
      <input type="email" className="form-control" id="email" placeholder="name@example.com" name="email" value={email} onChange={(e)=>{
        setEmail(e.target.value);
      }} required/>
      <label for="floatingInput">Email address</label>
    </div>
    <div className="form-floating">
      <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={password} onChange={(e)=>{
        setPassword(e.target.value);
      }}/>
      <label for="floatingPassword">Password</label>
    </div>

    <div className="form-check text-start my-3">
      <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
      <label className="form-check-label" for="flexCheckDefault">
        Remember me
      </label>
    </div>
    <button className="btn btn-primary w-100 py-2" type="submit">Login</button>
      <hr></hr>
      
      <Link to={"/register"}>
    <button className="btn btn-success mt-1">Register</button>
    </Link>
    
  </form>
  
       </div>
      
       </>
    )
}

export default Login