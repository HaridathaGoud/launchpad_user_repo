interface ToasterType{
    message:string,
    callback?:Function,
    type?:string,
    position?:string,
    timeout?:number,
    callbackTimeout?:number
}
interface ErrorType{
    message:string;
    onCloseCallback?:Function;
}
export interface OutletReducerModal{
    error:ErrorType;
    toaster?:ToasterType;
}


export const outletReducerState={
    error:{
        message:''
    },
    toaster:{
        message:''
    },
}
const outletReducer=(state:OutletReducerModal=outletReducerState,action)=>{
    switch(action.type){
        case 'setError':
            state={...state,error:action.payload};
            break;
        case 'setToaster':
            state={...state,toaster:action.payload};
            break;
        default:
            state={...state};
        }
    return state;
}

export default outletReducer;