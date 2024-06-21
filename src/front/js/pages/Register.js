import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login";

const Register = ()=>{
  const navigate = useNavigate()
  const {store, actions} = useContext(Context)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const enviarDatos = async (e) => {
   e.preventDefault()
   if (email == "" && password == "") {
    alert("Hay campos vacios")
   } else {
    const result = await actions.registerUser(email, password)
    if (result) {
      navigate("/login")
    }
   }
  }

    return (
        <div className="body d-flex justify-content-center py-5" >
        <form onSubmit={enviarDatos}>
      
        <h1 className="h3 mb-3 fw-normal text-center">Register</h1>
    
        <div className="form-floating pb-2">
          <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={email} onChange={(e)=> {
            setEmail(e.target.value)
          }}/>
          <label for="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(e)=>{
            setPassword(e.target.value)
          }}/>
          <label for="floatingPassword">Password</label>
        </div>
    
        <div className="form-check text-start my-3">
          <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
          <label className="form-check-label" for="flexCheckDefault">
            Remember me
          </label>
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit">Register</button>
          <hr></hr>
          <Link to={"/login"}>
    <button className="btn btn-success mt-1">Login</button>
    </Link>
      </form>
           </div>
    )
}

export default Register