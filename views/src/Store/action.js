// import * as actions from "./actionTypes"
import { BUG_ADDED, BUG_REMOVED, RESOLVE_BUG } from "./actionTypes"


export function bugAdded(description){
   return {
        type: BUG_ADDED,
        payload: {
            description: description
        }
    }
}

export function bugRemoved(id){
   return  {
        type: BUG_REMOVED,
        payload:{
            id: id
        }
    }
    
}


export function resolveBug(id){
    return{
        type: RESOLVE_BUG,
        payload: {
            id
        }
    }
}