import { validateContentRule, emailValidation } from "../../utils/validation";
import { ProfileModel } from "./models";
export const validateForm = (form: ProfileModel) => {
  const {
    firstName,
    lastName,
    phoneNo,
    email,
    countryCode,
    country,
    discordId,
  } = form;
  const errors: ProfileModel = {};
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
  validateField(
    firstName || "",
    "firstName",
    true,
    (value: string) => validateContentRule(value),
    "Invalid first name"
  );
  validateField(
    lastName || "",
    "lastName",
    true,
    (value: string) => validateContentRule(value),
    "Invalid last name"
  );
  validateField(
    phoneNo || "",
    "phoneNo",
    true,
    (value: string) =>
      validateContentRule(value) || value.length < 6 || value.length > 12,
    "Invalid phone number"
  );
  validateField(
    email || "",
    "email",
    true,
    (value: string) => emailValidation(value),
    "Invalid email address"
  );
  validateField(
    countryCode || "",
    "countryCode",
    true,
    undefined,
    "Is required"
  );
  validateField(country || "", "country", true, undefined, "Is required");
  validateField(
    discordId || "",
    "discordId",
    true,
    (value: string) => validateContentRule(value),
    "Invalid discord Id"
  );
  return errors;
};

export const isErrorDispaly = (objValue: any) => {
  if (objValue?.data && typeof objValue?.data === "string") {
    return objValue.data;
  } else if (
    objValue?.response.data &&
    objValue?.response.data.title &&
    typeof objValue?.response.data.title
  ) {
    return objValue?.response.data.title;
  } else if (
    objValue?.originalError &&
    typeof objValue?.originalError.message === "string"
  ) {
    return objValue?.originalError.message;
  } else {
    return "Something went wrong please try again!";
  }
};
