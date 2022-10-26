
import React, { useState } from 'react';


function App() {

    const [usernameReg, setUsernameReg] = useState("")
    const [passwordReg, setPasswordReg] = useState("")

    const changeHandler: (event:React.ChangeEvent<HTMLInputElement>) =>void = (event) => { 
            setPasswordReg(event.target.value);
    
    const usernamechangerHandler: (event:React.ChangeEvent<HTMLInputElement>) =>void = (event) =>{
            setUsernameReg(event.target.value);
    }
     }

    return 
        <h1>Welcome to the show</h1>;
     <React.Fragment>
    <div className="App">
        <div className="registration">
            <h1>Registration</h1>
            <label>Username</label>
            <input type="text"
                onChange={(e) => {
                    setUsernameReg(e.target.value);
                } } />
            <label>Password</label>
            <input type="text"
                onChange={changeHandler} ></input>
            <button> Register</button>
    </div><div className="login">
            <h1>Login</h1>
            <input type="text" placeholder="Username..." />
            <input type="password" placeholder="Password..." />
            <button> Register</button>
    </div >
  </div >
     </React.Fragment>
}

export default App;