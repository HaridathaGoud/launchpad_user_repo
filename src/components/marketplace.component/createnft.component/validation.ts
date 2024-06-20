import { FormValues } from "./models";
import {
  validateContentRule,
  validateUrl,
  acceptOnlyAlphabets,
} from "../../../utils/validation";

export const validateForm = (form: FormValues) => {
  const {
    imageUrl,
    name,
    externalLink,
    description,
    collection,
    properties,
    supply,
    network,
    royalities,
    isPutonSale,
    isPutOnAuction,
    isUnlockPurchased,
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
    }
  };
  validateField(imageUrl || "", "imageUrl", true);
  validateField(
    name || "",
    "name",
    true,
    (value: string) => acceptOnlyAlphabets(value),
    "Invalid first name"
  );
  validateField(collection || "", "collection", true);
  validateField(properties || "", "properties", true);
  validateField(network || "", "network", true);
  validateField(
    description || "",
    "description",
    true,
    (value: string) => validateContentRule(value),
    "Invalid discord Id"
  );
  validateField(
    externalLink,
    "externalLink",
    false,
    (value: string) => validateUrl(value),
    "Invalid external link"
  );
  return errors;
};

export const validateProperties = (properties: any) => {
  let isValid: boolean = true;
  if (!properties || properties?.length === 0) {
    isValid=false
    return {isValid,error:"Please add atleast one property",errors:null}
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
    const type = validateField(
      property.type || "",
      "type",
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
    if (type || value) isValid = false;
    return { type, value };
  });
  return {isValid,errors,error:''}
};
