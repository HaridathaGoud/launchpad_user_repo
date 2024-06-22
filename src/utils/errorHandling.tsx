const isErrorDispaly = (objValue: any) => {
  console.log(objValue)
  if (objValue?.data && typeof objValue?.data === 'string') {
    return objValue?.data;
  } else if (objValue?.response?.data && typeof objValue?.response?.data === "object") {
    if (objValue?.response?.data?.error?.message.toLowerCase().includes("modelstate")) {
      const messages = objValue?.response?.data?.error?.validationErrors || [];
      let result = "";
      messages.forEach((item, indx) => {
        result += item.message + (indx !== messages.length - 1 ? ", " : "");
      });
      // return result;
      return objValue?.response?.data?.error?.message;
    }
  else if(objValue?.response?.data?.title){
    return objValue?.response?.data?.title
  }
  }  else if (objValue?.originalError && typeof objValue?.originalError?.message === 'string') {
    return objValue?.originalError?.message;
  } else if (typeof objValue?.response?.data ==='object') {
    // if(objValue?.response?.data?.error.code && typeof objValue?.response?.data?.error.code==='string'){
    //   return objValue?.response?.data?.error.code
    // }
    if(objValue?.response?.data?.error?.message && typeof objValue?.response?.data?.error?.message==='string'){
      return objValue?.response?.data?.error?.message
    }
  }else if (typeof objValue?.data ==='object') {
    // if(objValue?.data?.error.code && typeof objValue?.data?.error.code==='string'){
    //   return objValue?.data?.error.code
    // }
    if(objValue?.data?.error?.message && typeof objValue?.data?.error?.message==='string'){
      return objValue?.data?.error?.message
    }
  }
  else if(objValue?.response?.data?.error?.message){
    return objValue?.response?.data?.error?.message
  }
  else if (objValue?.response?.statusText) {
    return objValue?.response?.statusText
  }
  else if (typeof objValue == 'string') {
    return objValue
  }
  // if (typeof objValue === 'string') {
  //     return "Insufficient Funds";
  // }
  // else if (objValue && typeof objValue === 'object') {
  //     return "Insufficient Funds";
  // }
  else {
    return 'Something went wrong please try again!';
  }
};
export { isErrorDispaly };
