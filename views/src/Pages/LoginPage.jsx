import React, {useState} from 'react';
import { useDispatch } from 'react-redux';



function LoginPage() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
  //  const dispatch = useDispatch()

  const  login = (event) => {
    event.preventDefault();

    let userData = {
      userName: email,
      password: password
    }

console.log(userData)
  }
  return (
    <div>
      <form action="">
        <h1>Login</h1>
        <input type="text" name="username"  placeholder='username' onChange={(event) => setEmail(event.target.value)} value={email} />
        <input type="password" name="password"  placeholder='password' onChange={(event) => setPassword(event.target.value)} value={password} />
        <button type='submit' onClick={login}>Login</button>
      </form>
    </div>
  )
}

export default LoginPage