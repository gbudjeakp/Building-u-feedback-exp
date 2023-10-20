export const USER_REGISTER = "userRegister";

export const USER_LOGIN = "userLogin";


export const USER_IS_AUTHENTICATED = "userIsAuthenticated";


export const USER_IS_UNAUTHENTICATED = "userIsUnauthenticated";




//FEEDBACK AND FEEDBACK REQUEST FORMS ACTIONS//////
/////////////// ALL ACTION TYPES ASSOCIATED WITH FEEDBACK AND FEEDBACK REQUEST FORMS ARE BELOW/////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////


/*This action type allows the interns to request for feedback using the request feedback forms.
 */
export const FEEDBACK_REQUEST_ADDED = "feedbackRequestAdded";


/*This action type allows the Code leads to add feedbacks to the feedback requests made by the interns 
*/
export const FEEDBACK_ADDED = "feedback";


//@TODO
//Allow deletion of feedback request forms
// export const FEEDBACKREQUEST_REMOVED = "feedbackRequest";


/*This action type allows the code leads to assign feedback requests to themselves.
*/
export const FEEDBACKREQUEST_ISASSIGNED = "feedbackRequestIsAssigned";


/*This action type retrieves every single feedback requests made by the interns.
*/
export const GET_ALLFEEDBACK_REQUEST_FORMS = "getAllFeedbackRequestForms";


/*This Gets all the intern feedback request forms for the intern  that is logged in. 
*/
export const GET_CURRENT_USER_FEEDBACK_REQUEST_FORMS ="getCurrentUserFeedbackRequestForms";


/*This action type gets all the feedback by a  code leads on specific  feedback request forms
*/
export const GET_MENTOR_FEEDBACK = "getMentorFeedback";


export const GET_ASSIGNED_FEEDBACK_REQUEST_FORMS = "getAssignedFeedbackRequestForms"
