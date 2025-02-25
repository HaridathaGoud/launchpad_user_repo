const emojiRejex =
  /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff]|[\u2010-\u2017])/g;

export const validateContentRule = (value: any) => {
  const reg = /<(.|\n)*?>/g;
  if (value && (reg.test(value) || value.match(emojiRejex))) {
    return true;
  }
  return false;
};

export const emailValidation = (value: any) => {
  const reg = /<(.|\n)*?>/g;
  const emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
    value
  );
  if (
    value &&
    (reg.test(value) || value.match(emojiRejex) || emailReg !== true)
  ) {
    return true;
  }
  return false;
};

export const validateContent = (value: any) => {
  const reg = /<(.|\n)*?>/g;
  if (reg.test(value)) {
    return false;
  }
  return true;
};

export const validateUrl =(value:any)=>{
  validateContentRule(value)
  const reg = /^(?:(?:https?|ftp|file):\/\/|www\.)[^\s/$.?#].[^\s]*$/;
  if (!reg.test(value) || emojiRejex.test(value)) {
    return true;
  }
  return false;
};

export const acceptOnlyAlphabets = (value:any)=>{
  validateContentRule(value)
  const reg = /^[\p{L} ]+$/u;
  if ( value && reg.test(value)) {
    return false;
  }
  return true;
}
export const acceptAlphaNumbericSpecialCharacters = (value:any) =>{
  validateContentRule(value)
  const reg = /(^[A-Za-z]+$)|(^(?=.*[A-Za-z])(?=.*[\d\W])[A-Za-z\d\W]+$)/
  if (!reg.test(value) || emojiRejex.test(value)) {
    return true;
  }
  return false;
}