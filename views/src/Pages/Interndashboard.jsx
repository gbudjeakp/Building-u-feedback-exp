import React from 'react'


function Interndashboard() {
    const getData = () =>{
     console.log("TEST")
    }

  return (
    <div>
      <h1>Intern Dashboard</h1>


     <button onClick={getData}>Click for data</button>
    </div>
  )
}

export default Interndashboard