import { BUG_ADDED, BUG_REMOVED, RESOLVE_BUG } from "./actionTypes";

let lastId = 0; 
 
 const reducer = (state = [], action) => {

  switch (action.type) {
    case BUG_ADDED:
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false
        },
      ];

    case BUG_REMOVED:
        return state.filter(bug => bug.id  !==action.payload.id)
        // return state

    case RESOLVE_BUG:
        return state.map(bug => bug.id !== action.payload.id ? bug : {...bug, resolved: true});

    default: 
       return state;
  } 

};


export default reducer