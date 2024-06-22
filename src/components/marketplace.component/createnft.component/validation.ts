import { FormValues } from "./models";
import {
  validateContentRule,
} from "../../../utils/validation";
const commonReg = (value: any) => /<(.|\n)*?>/g.test(value);
const checkpercent = (value: any) => /^\d+(\.\d{1,2})?$/.test(value);
const emojiRejex = (value:any)=> {
  const hasEmojis=value.match(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff]|[\u2010-\u2017])/g);
  return hasEmojis ? true:false
}
const containsHTMLTags = (value: any) => /<\/?[a-z][\s\S]*>/i.test(value);
const containsEmoji = (value: any) => /[\u{1F300}-\u{1F6FF}]/u.test(value);
const containsNonAlphabetic = (value: any) => !/^[\p{L} ,.;]+$/u.test(value);
const urlPattern = (value: any) => /^(ftp|http|https):\/\/[^ "]+$/.test(value);
const isNumber = (value: any) => /^[0-9].*$/.test(value);
export const validateForm = (form: FormValues) => {
  const {
    imageUrl,
    name,
    externalLink,
    description,
    collection,
    properties,
    network,
    royalities,
    salePrice,
    auctionPrice,
    unlockDescription,
  } = form;
  const errors: any = {};
  const validateField = (
    field: string,
    fieldName: string,
    required = true,
    validationFunc?: (value: string) => boolean,
    errorMessage?: string
  ) => {
    if (required && (!field || field === "")) {
      errors[fieldName] = "Is required";
    } else if (validationFunc?.(field)) {
      errors[fieldName] = errorMessage || `Invalid ${fieldName.toLowerCase()}`;
    }else{
      errors[fieldName]=''
    }
  };
  validateField(imageUrl || "", "imageUrl", true);
  validateField(
    name || "",
    "name",
    true,
    (value: string) => containsHTMLTags(value) || containsEmoji(value) || containsNonAlphabetic(value),
    "Invalid Name"
  );
  validateField(collection || "", "collection", true);
  validateField(properties || "", "properties", true);
  validateField(network || "", "network", true);
  validateField(
    description || "",
    "description",
    true,
    (value: string) => commonReg(value) || emojiRejex(value),
    "Invalid description"
  );
  validateField(
    externalLink,
    "externalLink",
    true,
    (value: string) => !urlPattern(value) || commonReg(value) || emojiRejex(value),
    "Invalid external link"
  );
  validateField(
    royalities,
    "royalities",
    true,
    (value: string) => !isNumber(value) ||commonReg(value) || emojiRejex(value) || !checkpercent(value),
    "Invalid royality fee"
  );
  validateField(
    salePrice,
    "salePrice",
    false,
    (value: string) => value ? (!isNumber(value) ||commonReg(value) || emojiRejex(value)):false,
    "Invalid sale price"
  );
  validateField(
    auctionPrice,
    "auctionPrice",
    false,
    (value: string) => value ? (!isNumber(value) ||commonReg(value) || emojiRejex(value)):false,
    "Invalid auction price"
  );
  validateField(
    unlockDescription,
    "unlockDescription",
    false,
    (value: string) => value ? (commonReg(value) || emojiRejex(value)):false,
    "Invalid Unlock Description"
  );
  let isValid=true
  if(Object.keys(errors).length>0){
    isValid=false
  }
  return {isValid,errors};
};

export const validateProperties = (properties: any) => {
  let isValid: boolean = true;
  if (!properties || properties?.length === 0) {
    isValid = false;
    return { isValid, error: "Please add atleast one property", errors: null };
  }
  const validateField = (
    field: string,
    fieldName: string,
    required = true,
    validationFunc?: (value: string) => boolean,
    errorMessage?: string
  ) => {
    if (required && (!field || field === "")) {
      return "Is required";
    } else if (validationFunc?.(field)) {
      return errorMessage || `Invalid ${fieldName.toLowerCase()}`;
    } else {
      return "";
    }
  };
  const errors = properties.map((property: any) => {
    const trait_type = validateField(
      property.trait_type || "",
      "trait_type",
      true,
      (value: string) => validateContentRule(value),
      "Invalid type"
    );
    const value = validateField(
      property.value || "",
      "value",
      true,
      (value: string) => validateContentRule(value),
      "Invalid value"
    );
    if (trait_type || value) isValid = false;
    return { trait_type, value };
  });
  return { isValid, errors, error: "" };
};
