const isErrorDispaly = (objValue: any) => {
  if (objValue.data && typeof objValue.data === 'string') {
    return objValue.data;
  } else if (objValue.originalError && typeof objValue.originalError.message === 'string') {
    return objValue.originalError.message;
  } else {
    return 'Something went wrong please try again!';
  }
};
export { isErrorDispaly };
