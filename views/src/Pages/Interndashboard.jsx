import React from 'react'
import Feedbackform from "../components/FeedbackrequestForm"


function Interndashboard() {
    const getData = () =>{
     console.log("TEST")
    }

  return (
    <div>
      <h1>Intern Dashboard</h1>

     <Feedbackform />
     {/* <button onClick={getData}>Click for data</button> */}
    </div>
  )
}

export default Interndashboard