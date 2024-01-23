import { isErrorDispaly } from "./errorHandling"

const formatErrorMessage=(error)=>{
    if(error && typeof error!=='string'){
        return isErrorDispaly(error)
    }
    return error;

}

export default formatErrorMessage;