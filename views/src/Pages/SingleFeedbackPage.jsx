import React from 'react';
import { useSelector } from 'react-redux'

function SingleFeedbackPage({ match }) {
    const { feedbackrequestId } = match.params;

    const feedbackForm =  useSelector(state => state.forms.find(feedbackrequestId.id))


  return (
    <div>SingleFeedbackPage</div>
  )
}

export default SingleFeedbackPage