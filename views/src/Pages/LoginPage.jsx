import React from 'react'

function LoginPage() {

  const handleName = (e) => {
    console.log(e.target.value)
  }
  const handlePassword = (e) => {
    console.log(e.target.value)
  }

  const  login = () => {
    alert('Logged In')
  }
  return (
    <div>
      <form action="">
        <h1>Login</h1>
        <input type="text" name="username"  placeholder='username' onChange={handleName} />
        <input type="password" name="password"  placeholder='password' onChange={handlePassword} />
        <button type='submit' onClick={login}>Login</button>
      </form>
    </div>
  )
}

export default LoginPage