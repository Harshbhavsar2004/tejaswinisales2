import React, { useState } from 'react'
import './CSS/Loginsignup.css'
const LoginSignup = () => {

  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""

  })
  const changehandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const signup = async () => {

    console.log("Sign up Function excuted", formData);
    let responseData;
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        Accept: "application/form-data",
        'Content-Type': "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json())
      .then((Data) => responseData = Data)

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    }

    else {
      alert(responseData.errors)
    }
  }

  const login = async () => {
    console.log("Login Function excuted", formData)
    let responseData;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: "application/form-data",
        'Content-Type': "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json())
      .then((Data) => responseData = Data)

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    }

    else {
      alert(responseData.errors)
    }

  }

  return (
    <div className='LoginSignup'>
      <div className="loginsignup-container">
        <h1>
          {state}
        </h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? <input name='username' value={formData.username} onChange={changehandler} type="text" placeholder='Your name' required /> : <></>}
          <input onChange={changehandler} name='email' value={formData.email} type="email" placeholder='Email Address' required />
          <input onChange={changehandler} name='password' value={formData.password} type="password" placeholder='Password' required />
        </div>
        <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>
        {state === "Sign Up" ? <p className='loginsignup-login'>Already have an account <span onClick={() => { setState("Login") }}>Login here</span></p> : <p className='loginsignup-login'>Create an account?<span onClick={() => { setState("Sign Up") }}>Click here</span></p>}
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup